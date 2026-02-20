import { NextRequest } from "next/server";
import { apiSuccess, apiError, checkRateLimit, fetchWithCache, ErrorCodes } from "@/lib/api";
import { demoGithubData } from "@/lib/constants";

const SIX_HOURS = 1000 * 60 * 60 * 6;

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`github:${ip}`, 30, 60000)) {
      return apiError(ErrorCodes.RATE_LIMITED, "Too many requests", 429);
    }

    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;

    if (!token || !username) {
      // Return demo data if not configured
      return Response.json(apiSuccess(demoGithubData), {
        headers: { "Cache-Control": "public, s-maxage=3600" },
      });
    }

    const data = await fetchWithCache(
      "github-stats",
      async () => {
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) throw new Error("GitHub API error");
        const user = await userRes.json();

        // Fetch contribution data via GraphQL
        const graphqlRes = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                user(login: "${username}") {
                  contributionsCollection {
                    totalCommitContributions
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          contributionCount
                        }
                      }
                    }
                  }
                  repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
                    nodes {
                      languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                        edges {
                          size
                          node { name color }
                        }
                      }
                    }
                  }
                }
              }
            `,
          }),
        });

        if (!graphqlRes.ok) throw new Error("GitHub GraphQL error");
        const graphqlData = await graphqlRes.json();
        const userData = graphqlData.data.user;

        // Calculate top languages
        const langMap = new Map<string, { size: number; color: string }>();
        for (const repo of userData.repositories.nodes) {
          for (const edge of repo.languages.edges) {
            const existing = langMap.get(edge.node.name);
            langMap.set(edge.node.name, {
              size: (existing?.size || 0) + edge.size,
              color: edge.node.color || "#6c5ce7",
            });
          }
        }

        const totalSize = Array.from(langMap.values()).reduce((s, v) => s + v.size, 0);
        const topLanguages = Array.from(langMap.entries())
          .sort((a, b) => b[1].size - a[1].size)
          .slice(0, 5)
          .map(([name, { size, color }]) => ({
            name,
            percentage: Math.round((size / totalSize) * 100),
            color,
          }));

        // Format contribution calendar
        const weeks = userData.contributionsCollection.contributionCalendar.weeks;
        const contributionCalendar = weeks.map((w: { contributionDays: { contributionCount: number }[] }) =>
          w.contributionDays.map((d: { contributionCount: number }) =>
            Math.min(d.contributionCount, 4)
          )
        );

        return {
          totalContributions:
            userData.contributionsCollection.contributionCalendar.totalContributions,
          totalCommits:
            userData.contributionsCollection.totalCommitContributions,
          publicRepos: user.public_repos,
          topLanguages,
          contributionCalendar,
        };
      },
      SIX_HOURS
    );

    return Response.json(apiSuccess(data), {
      headers: { "Cache-Control": "public, s-maxage=21600" },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    // Fallback to demo data
    return Response.json(apiSuccess(demoGithubData), {
      headers: { "Cache-Control": "public, s-maxage=3600" },
    });
  }
}
