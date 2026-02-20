import { NextRequest } from "next/server";
import { apiSuccess, apiError, checkRateLimit, fetchWithCache, ErrorCodes } from "@/lib/api";
import { demoWakatimeData } from "@/lib/constants";

const ONE_HOUR = 1000 * 60 * 60;

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`wakatime:${ip}`, 30, 60000)) {
      return apiError(ErrorCodes.RATE_LIMITED, "Too many requests", 429);
    }

    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
      // Return demo data if not configured
      return Response.json(apiSuccess(demoWakatimeData), {
        headers: { "Cache-Control": "public, s-maxage=3600" },
      });
    }

    const data = await fetchWithCache(
      "wakatime-stats",
      async () => {
        const headers = {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        };

        // Fetch stats
        const statsRes = await fetch(
          "https://wakatime.com/api/v1/users/current/stats/last_7_days",
          { headers }
        );

        if (!statsRes.ok) throw new Error("WakaTime API error");
        const stats = await statsRes.json();

        const languages = stats.data.languages
          .slice(0, 6)
          .map((lang: { name: string; total_seconds: number }) => ({
            name: lang.name,
            hours: Math.round(lang.total_seconds / 3600),
            color:
              lang.name === "TypeScript"
                ? "#3178c6"
                : lang.name === "JavaScript"
                ? "#f7df1e"
                : lang.name === "Python"
                ? "#3776ab"
                : lang.name === "CSS"
                ? "#264de4"
                : lang.name === "HTML"
                ? "#e34f26"
                : "#6c5ce7",
          }));

        return {
          totalHours: Math.round(stats.data.total_seconds / 3600),
          dailyAverage: stats.data.human_readable_daily_average || "0h 0m",
          topLanguage: stats.data.languages[0]?.name || "N/A",
          languages,
          weeklyActivity: demoWakatimeData.weeklyActivity, // WakaTime free doesn't have daily breakdown
        };
      },
      ONE_HOUR
    );

    return Response.json(apiSuccess(data), {
      headers: { "Cache-Control": "public, s-maxage=3600" },
    });
  } catch (error) {
    console.error("WakaTime API error:", error);
    return Response.json(apiSuccess(demoWakatimeData), {
      headers: { "Cache-Control": "public, s-maxage=3600" },
    });
  }
}
