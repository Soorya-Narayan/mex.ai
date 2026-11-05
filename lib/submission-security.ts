import { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import * as Sentry from "@sentry/nextjs";
import DOMPurify from "isomorphic-dompurify";
import { env } from "@/lib/env";

// ─── Rate Limiter (5 submissions per IP per 10 minutes) ──────────────────────

const upstashLimiter =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: env.UPSTASH_REDIS_REST_URL,
          token: env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        analytics: false,
        prefix: "mex:ratelimit:submission",
      })
    : null;

export function getClientIp(req: NextRequest): string {
  const netlifyIp = req.headers.get("x-nf-client-connection-ip")?.trim();
  if (netlifyIp) return netlifyIp;

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length > 0) {
      // Take the last entry appended by the trusted proxy, never the spoofable first entry
      return parts[parts.length - 1];
    }
  }

  return "127.0.0.1";
}

export type RateLimitStatus = "allowed" | "rate_limited" | "unavailable";

const devMemoryBuckets = new Map<string, number[]>();

export async function checkRateLimit(ip: string): Promise<RateLimitStatus> {
  if (env.NODE_ENV === "production") {
    if (!upstashLimiter) {
      return "unavailable";
    }
    try {
      const { success } = await upstashLimiter.limit(ip);
      return success ? "allowed" : "rate_limited";
    } catch (err) {
      Sentry.captureException(err);
      return "unavailable";
    }
  }

  // Non-production local development/testing fallback
  if (upstashLimiter) {
    try {
      const { success } = await upstashLimiter.limit(ip);
      return success ? "allowed" : "rate_limited";
    } catch (err) {
      Sentry.captureException(err);
      return "unavailable";
    }
  }

  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const timestamps = (devMemoryBuckets.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );

  if (timestamps.length >= 5) {
    devMemoryBuckets.set(ip, timestamps);
    return "rate_limited";
  }

  timestamps.push(now);
  devMemoryBuckets.set(ip, timestamps);
  return "allowed";
}

// ─── Turnstile Server Verification ───────────────────────────────────────────

const CF_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

export async function verifyTurnstileToken(
  token: string | undefined,
  ip: string
): Promise<boolean> {
  if (!token || !token.trim()) {
    return false;
  }

  const isDevTestKey =
    env.NODE_ENV === "development" &&
    env.CLOUDFLARE_TURNSTILE_SECRET_KEY === CF_TEST_SECRET_KEY;

  if (isDevTestKey) {
    return true;
  }

  // Reject Cloudflare test secret key if accidentally used outside development
  if (env.CLOUDFLARE_TURNSTILE_SECRET_KEY === CF_TEST_SECRET_KEY) {
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) return false;
    const outcome = (await res.json()) as { success?: boolean };
    return Boolean(outcome.success);
  } catch (err) {
    Sentry.captureException(err);
    return false;
  }
}

export function cleanText(input: string): string {
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

