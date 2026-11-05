import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import * as Sentry from "@sentry/nextjs";
import DOMPurify from "isomorphic-dompurify";
import { CareersFormSchema } from "@/lib/schemas/careers";
import { env } from "@/lib/env";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { CareerNotificationEmail } from "@/emails/CareerNotificationEmail";
import { CareerAutoReplyEmail } from "@/emails/CareerAutoReplyEmail";

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
        prefix: "mex:ratelimit:careers",
      })
    : null;

function getClientIp(req: NextRequest): string {
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

type RateLimitStatus = "allowed" | "rate_limited" | "unavailable";

const devMemoryBuckets = new Map<string, number[]>();

async function checkRateLimit(ip: string): Promise<RateLimitStatus> {
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

async function verifyTurnstileToken(
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

function cleanText(input: string): string {
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // 1. Rate limit check (5 per IP per 10 minutes)
    const rateLimitStatus = await checkRateLimit(ip);
    if (rateLimitStatus === "unavailable") {
      return NextResponse.json(
        {
          error:
            "We could not process your application right now. Please try again in a few moments.",
        },
        { status: 503 }
      );
    }
    if (rateLimitStatus === "rate_limited") {
      return NextResponse.json(
        {
          error:
            "Too many submissions from your network. Please wait 10 minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body: unknown = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    // 2. Honeypot check — silently succeed so bots don't retry
    const rawWebsite = (body as Record<string, unknown>).website;
    if (typeof rawWebsite === "string" && rawWebsite.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 3. Server-side Zod validation
    const parsed = CareersFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            "Please check the form fields and ensure all required information is valid.",
        },
        { status: 400 }
      );
    }

    // 4. Turnstile verification
    const turnstileValid = await verifyTurnstileToken(
      parsed.data.turnstileToken,
      ip
    );
    if (!turnstileValid) {
      return NextResponse.json(
        {
          error:
            "Security verification failed. Please refresh the page and try again.",
        },
        { status: 400 }
      );
    }

    // 5. Sanitize all stored values against XSS
    const sanitizedCandidate = {
      name: cleanText(parsed.data.name),
      role: cleanText(parsed.data.role),
      email: cleanText(parsed.data.email).toLowerCase(),
      phone: parsed.data.phone ? cleanText(parsed.data.phone) : null,
      resumeUrl: cleanText(parsed.data.resumeUrl),
      note: cleanText(parsed.data.note),
      consent: Boolean(parsed.data.consent),
    };

    // 6. Store application in Neon Postgres `leads` table with productInterest: "careers"
    let dbSuccess = false;
    try {
      await db.insert(leads).values({
        name: sanitizedCandidate.name,
        company: `Applicant (${sanitizedCandidate.role})`,
        email: sanitizedCandidate.email,
        phone: sanitizedCandidate.phone,
        productInterest: "careers",
        message: `Role: ${sanitizedCandidate.role}\nResume/Profile: ${sanitizedCandidate.resumeUrl}\n\nNote:\n${sanitizedCandidate.note}`,
        consent: sanitizedCandidate.consent,
      });
      dbSuccess = true;
    } catch (dbErr) {
      Sentry.captureException(dbErr);
    }

    // 7. Send notification email to CAREERS_EMAIL + auto-reply to candidate via Resend
    let careersEmailSuccess = false;
    const resend = new Resend(env.RESEND_API_KEY);

    try {
      const careersResult = await resend.emails.send({
        from: env.EMAIL_FROM,
        to: [env.CAREERS_EMAIL],
        replyTo: sanitizedCandidate.email,
        subject: `[MEX Careers] Application: ${sanitizedCandidate.name} — ${sanitizedCandidate.role}`,
        react: CareerNotificationEmail({
          name: sanitizedCandidate.name,
          email: sanitizedCandidate.email,
          phone: sanitizedCandidate.phone ?? undefined,
          role: sanitizedCandidate.role,
          resumeUrl: sanitizedCandidate.resumeUrl,
          note: sanitizedCandidate.note,
        }),
      });

      if (careersResult.error) {
        Sentry.captureException(new Error(careersResult.error.message));
      } else {
        careersEmailSuccess = true;
      }
    } catch (emailErr) {
      Sentry.captureException(emailErr);
    }

    try {
      const autoReplyResult = await resend.emails.send({
        from: env.EMAIL_FROM,
        to: [sanitizedCandidate.email],
        subject: "We received your application — MEX Automation Careers",
        react: CareerAutoReplyEmail({
          name: sanitizedCandidate.name,
          role: sanitizedCandidate.role,
        }),
      });

      if (autoReplyResult.error) {
        Sentry.captureException(new Error(autoReplyResult.error.message));
      }
    } catch (autoReplyErr) {
      Sentry.captureException(autoReplyErr);
    }

    // If both the database insert and the careers notification email fail, return an error
    if (!dbSuccess && !careersEmailSuccess) {
      return NextResponse.json(
        {
          error:
            "We could not process your application right now. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    Sentry.captureException(err);
    // Generic error message — never leak internal stack traces or DB details
    return NextResponse.json(
      {
        error:
          "We could not process your application right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}
