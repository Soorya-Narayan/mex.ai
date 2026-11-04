import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().url().default("postgresql://mex_user:mex_password@ep-sample.aws.neon.tech/mex_db?sslmode=require"),
  RESEND_API_KEY: z.string().min(1).default("re_sample_key"),
  SALES_EMAIL: z.string().email().default("sales@mexautomation.in"),
  EMAIL_FROM: z.string().default("MEX Automation <contact@mexautomation.in>"),
  CLOUDFLARE_TURNSTILE_SECRET_KEY: z.string().min(1).default("1x0000000000000000000000000000000AA"),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: z.string().default("1x00000000000000000000AA"),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

const isServer = typeof window === "undefined";

const merged = serverSchema.merge(clientSchema);

export type Env = z.infer<typeof merged>;

function validateEnv(): Env {
  const envSource = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SALES_EMAIL: process.env.SALES_EMAIL,
    EMAIL_FROM: process.env.EMAIL_FROM,
    CLOUDFLARE_TURNSTILE_SECRET_KEY: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  };

  const parsed = isServer ? merged.safeParse(envSource) : clientSchema.safeParse(envSource);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables. Check terminal logs.");
  }

  return parsed.data as Env;
}

export const env = validateEnv();

