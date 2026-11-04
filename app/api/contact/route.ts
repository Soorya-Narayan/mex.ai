import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import DOMPurify from "isomorphic-dompurify";
import { ContactFormSchema } from "@/lib/schemas/contact";
import { env } from "@/lib/env";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { LeadNotificationEmail } from "@/emails/LeadNotificationEmail";
import { LeadAutoReplyEmail } from "@/emails/LeadAutoReplyEmail";

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
        prefix: "mex:ratelimit:contact",
      })
    : null;

const memoryBuckets = new Map<string, number[]>();

async function checkRateLimit(ip: string): Promise<boolean> {
  if (upstashLimiter) {
    try {
      const { success } = await upstashLimiter.limit(ip);
      return success;
    } catch {
      // Fallback to in-memory limiter if Upstash is unreachable
    }
  }

  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const timestamps = (memoryBuckets.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );

  if (timestamps.length >= 5) {
    memoryBuckets.set(ip, timestamps);
    return false;
  }

  timestamps.push(now);
  memoryBuckets.set(ip, timestamps);
  return true;
}

// ─── Turnstile Server Verification ───────────────────────────────────────────

async function verifyTurnstileToken(
  token: string | undefined,
  ip: string
): Promise<boolean> {
  // Always-pass test secret key or local dev bypass token
  if (
    env.CLOUDFLARE_TURNSTILE_SECRET_KEY ===
      "1x0000000000000000000000000000000AA" &&
    (token === "dev-pass" || token === "brochure-gate" || !token)
  ) {
    return true;
  }

  if (!token) return false;

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
  } catch {
    // If running in an offline test environment with the test secret key, allow
    return (
      env.CLOUDFLARE_TURNSTILE_SECRET_KEY ===
      "1x0000000000000000000000000000000AA"
    );
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
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "127.0.0.1";

    // 1. Rate limit check (5 per IP per 10 minutes)
    const allowed = await checkRateLimit(ip);
    if (!allowed) {
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
    const parsed = ContactFormSchema.safeParse(body);
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
    const sanitizedLead = {
      name: cleanText(parsed.data.name),
      company: cleanText(parsed.data.company),
      email: cleanText(parsed.data.email).toLowerCase(),
      phone: parsed.data.phone ? cleanText(parsed.data.phone) : null,
      productInterest: cleanText(parsed.data.productInterest),
      message: cleanText(parsed.data.message),
      consent: Boolean(parsed.data.consent),
    };

    // 6. Store lead in Neon Postgres via Drizzle parameterized INSERT
    const isSampleDb = env.DATABASE_URL.includes("ep-sample.aws.neon.tech");
    if (!isSampleDb) {
      await db.insert(leads).values(sanitizedLead);
    }

    // 7. Send notification email to SALES_EMAIL + auto-reply to submitter via Resend
    const isSampleResend = env.RESEND_API_KEY === "re_sample_key";
    if (!isSampleResend) {
      const resend = new Resend(env.RESEND_API_KEY);
      await Promise.allSettled([
        resend.emails.send({
          from: env.EMAIL_FROM,
          to: [env.SALES_EMAIL],
          replyTo: sanitizedLead.email,
          subject: `[MEX Lead] ${sanitizedLead.company} — ${sanitizedLead.productInterest}`,
          react: LeadNotificationEmail({
            name: sanitizedLead.name,
            company: sanitizedLead.company,
            email: sanitizedLead.email,
            phone: sanitizedLead.phone ?? undefined,
            productInterest: sanitizedLead.productInterest,
            message: sanitizedLead.message,
          }),
        }),
        resend.emails.send({
          from: env.EMAIL_FROM,
          to: [sanitizedLead.email],
          subject: "We received your inquiry — MEX Automation",
          react: LeadAutoReplyEmail({
            name: sanitizedLead.name,
            productInterest: sanitizedLead.productInterest,
          }),
        }),
      ]);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    // Generic error message — never leak internal stack traces or DB details
    return NextResponse.json(
      {
        error:
          "We could not process your request right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}
