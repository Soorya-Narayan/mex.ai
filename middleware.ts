import { NextRequest, NextResponse } from "next/server";

const VALID_PRODUCT_SLUGS = new Set([
  "heatwatch",
  "crate-pouch-counting",
  "bottle-counting",
  "data-logger",
  "dashboards",
  "twinforge-studio",
]);

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";
  const proto = request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "");

  // Return HTTP 404 for unknown product, case-study, or insight slugs before streaming layout
  const productMatch = url.pathname.match(/^\/products\/([^/]+)\/?$/);
  if (productMatch && !VALID_PRODUCT_SLUGS.has(productMatch[1])) {
    url.pathname = "/_not-found";
    return NextResponse.rewrite(url, { status: 404 });
  }

  // 1. Canonical www -> non-www and HTTP -> HTTPS redirect in production
  const isLocal =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.endsWith(".local");

  if (!isLocal) {
    if (host.startsWith("www.")) {
      const bareHost = host.replace(/^www\./, "");
      return NextResponse.redirect(
        `https://${bareHost}${url.pathname}${url.search}`,
        308
      );
    }
    if (proto === "http") {
      return NextResponse.redirect(
        `https://${host}${url.pathname}${url.search}`,
        308
      );
    }
  }

  // 2. Security headers & nonce-based Content-Security-Policy
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://browser.sentry-cdn.com"
    : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com https://www.googletagmanager.com https://browser.sentry-cdn.com`;

  const cspDirectives = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com",
    "media-src 'self'",
    "font-src 'self' data:",
    "connect-src 'self' https://challenges.cloudflare.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.ingest.sentry.io",
    "frame-src 'self' https://challenges.cloudflare.com https://www.google.com https://maps.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];

  if (!isLocal) {
    cspDirectives.push("upgrade-insecure-requests");
  }

  const cspHeader = cspDirectives.join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains"
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2|ico|pdf|mp4|webm)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

