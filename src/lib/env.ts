import { z } from "zod";

const envSchema = z.object({
  // Public
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),

  // GitHub (optional)
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_USERNAME: z.string().optional(),

  // WakaTime (optional)
  WAKATIME_API_KEY: z.string().optional(),

  // Contact
  CONTACT_EMAIL: z.string().email().optional(),

  // Sentry (optional)
  SENTRY_DSN: z.string().url().optional().or(z.literal("")),

  // Redis (optional)
  UPSTASH_REDIS_REST_URL: z.string().url().optional().or(z.literal("")),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    // Don't crash in development, just warn
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables");
    }
  }

  return (parsed.data ?? process.env) as Env;
}

export const env = validateEnv();
