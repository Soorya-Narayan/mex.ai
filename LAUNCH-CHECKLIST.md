# MEX Automation — Pre-Launch Checklist (`LAUNCH-CHECKLIST.md`)

Use this checklist to verify every content, legal, security, and infrastructure item before pointing `mexautomation.in` to production.

---

## 1. Content & Brand Specifications
- [x] Flat content structure: all 6 product MDX files reside directly in `content/products/` with canonical slugs (`bottle-counting`, `crate-pouch-counting`, `dashboards`, `data-logger`, `heatwatch`, `twinforge-studio`).
- [x] ProductCardPreview grounded strictly in MDX specs: removed all invented numbers (e.g., 99.8%, 300+ BPM, 312 BPM, fake confidence lists); cards show only verified MDX specs (e.g., "98.25% mAP@50", "<31 ms / CRATE", "24 CRATES/MIN").
- [x] Copy cleanup: purged all ungrounded industrial claims (cement, steel, automotive, kiln, micro-bolometer, thermal surveillance, "99.99% uptime") from `app/` and `components/`.
- [x] Homepage stats replaced with verified figures (98%+ vision accuracy, 1-second process telemetry, 24/7 temperature alarms, <31 ms crate audit speed).
- [x] Case studies and insights intros rewritten around core focus: dairy and food processing, vision counting, temperature monitoring, telemetry/data logging, and virtual commissioning.
- [x] Contact form placeholders updated to neutral examples ("Your company name", "you@company.com").
- [x] Unpublished all draft MDX entries (`published: false` in `content/case-studies/*.mdx`, `content/insights/*.mdx`, and `content/careers/senior-automation-engineer.mdx`) so they do not appear in `/sitemap.xml` or public routes.
- [x] Hid `ClientLogos` and unverified customer data behind `SITE_CONFIG.showVerifiedCustomerData` in `lib/site-config.ts`.
- [x] Removed all `[PLACEHOLDER]` text from public pages and marked every unverified technical specification in `content/products/*.mdx` with `[TODO: confirm]`.
- [x] Deleted `public/brand-preview.html` and updated `LICENSE` to `"Copyright (c) 2026 MEX Automation. All rights reserved."`
- [ ] Replace `[TODO: confirm]` values in `content/products/*.mdx` with engineering-verified specifications.
- [x] Deleted old placeholder PDF datasheets from `private/brochures/` and hid the brochure download button on any product without a `brochureFile`.
- [ ] Add final engineering PDF datasheets to `private/brochures/` and set `brochureFile` in `content/products/*.mdx` when ready.
- [ ] Fill in `[TODO]` business results and obtain client approval for the 4 draft case studies (`milma-kottayam-crate-pouch-counting`, `muralya-dairy-bottle-counting`, `anik-dairy-data-logger`, `zoladyne-energy-dashboard`), engineering articles (`content/insights/*.mdx`), and open roles (`content/careers/*.mdx`) before setting `published: true`.
- [ ] Confirm client permissions for `Milma (Kottayam)`, `Muralya Dairy (Thiruvananthapuram)`, `Anik Dairy (Bhopal)`, `Zoladyne (Coimbatore)`, and `Lactalis (Navi Mumbai)` in `components/home/ClientLogos.tsx`, then set `SITE_CONFIG.showVerifiedCustomerData = true` in `lib/site-config.ts`.
- [ ] Replace `[ADDRESS]`, `[PHONE]`, `[EMAIL]`, and `[WHATSAPP NUMBER]` in:
  - [ ] `app/contact/page.tsx` (including the Google Maps iframe coordinates and `wa.me` number)
  - [ ] `components/layout/Footer.tsx`
  - [ ] `components/layout/WhatsAppButton.tsx`
  - [ ] `app/careers/page.tsx`

## 2. Legal & DPDP Act 2023 Compliance
- [ ] Have a qualified Indian lawyer review and approve `app/privacy-policy/page.tsx` (drafted for the DPDP Act 2023) and remove the draft banner.
- [ ] Populate Grievance Officer `[NAME, EMAIL]`, `[ADDRESS]`, `[PHONE]`, and `[RETENTION PERIOD]` in `app/privacy-policy/page.tsx`.
- [ ] Have a qualified lawyer review and approve `app/terms/page.tsx`, fill in `[JURISDICTION CITY, STATE, INDIA]`, `[EMAIL]`, and `[ADDRESS]`, and remove the draft banner.
- [ ] Verify that the Cookie Banner (`Accept all` / `Reject all` / `Customize`) opens on first visit and reopens when clicking **Cookie Settings** in the footer.

## 3. Forms, Brochure Gate, Database & Email Infrastructure
- [x] Dedicated `/api/careers` submission route: reuses contact route security stack (Zod schema validation, Turnstile verification, honeypot detection, IP rate limiting, HTML sanitisation), stores applications in `leads` table with `productInterest: "careers"`, and dispatches notification emails to `CAREERS_EMAIL`. Personal data is submitted via POST and never exposed in URLs.
- [x] Production environment validation (`lib/env.ts`): enforces real production secrets when `NODE_ENV=production`, strictly rejecting any sample/mock/test/ci values unless `CI_BUILD=true` (CI runners only; never on Netlify).
- [x] Removed all `isSample...` skips and Turnstile bypasses from `app/api/contact/route.ts` and `app/api/careers/route.ts`; test keys work only in `NODE_ENV=development`; Sentry captures DB/email errors; returns HTTP 500 if both DB insert and notification email fail.
- [x] Brochure PDFs moved out of `/public` into `private/brochures/` and served via `/api/brochures` using a 15-minute HMAC-signed token after a Turnstile-verified lead submission in `BrochureGateModal`.
- [x] Rate limiting extracts client IP from `x-nf-client-connection-ip` (falling back to the last trusted forwarded IP), removes in-memory fallback in production, and fails closed (HTTP 503) if Upstash is unreachable.
- [ ] Provision Neon Serverless Postgres database (`ap-south-1` Mumbai recommended) and run `db/migrations/0000_create_leads.sql`.
- [ ] Create the least-privilege Postgres role (`mex_app_writer` with `INSERT` on `leads` only) and set `DATABASE_URL` in Netlify.
- [ ] Verify domain `mexautomation.in` in Resend (`SPF` + `DKIM`), create API key, and set `RESEND_API_KEY`, `SALES_EMAIL`, `CAREERS_EMAIL`, and `EMAIL_FROM`.
- [ ] Create Cloudflare Turnstile widget for `mexautomation.in` and set `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` and `CLOUDFLARE_TURNSTILE_SECRET_KEY`.
- [ ] Create Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

## 4. Security, CSP & HTTPS
- [x] Restored per-request nonce-based `Content-Security-Policy` in `middleware.ts` only (removed duplicate from `next.config.ts`) using `'strict-dynamic'` without `'unsafe-inline'` or `'unsafe-eval'` in `script-src`, removed `*.upstash.io` from `connect-src`, and passed the nonce to `next-themes`, GA4, Turnstile, and JSON-LD scripts.
- [x] Removed `preload` from `Strict-Transport-Security` (`max-age=63072000; includeSubDomains`).
- [ ] Confirm custom domain `mexautomation.in` and `www.mexautomation.in` are attached in Netlify with Let's Encrypt TLS certificate active.
- [ ] Confirm `http://` and `https://www.mexautomation.in` redirect (301/308) to `https://mexautomation.in`.

## 5. CI, SEO, Analytics & Monitoring
- [x] Configured `.github/workflows/ci.yml` with explicit `ci-not-a-real-...` dummy keys guarded by `CI_BUILD: "true"` to run `pnpm tsc --noEmit`, `pnpm lint`, `pnpm build`, Playwright smoke + `@axe-core/playwright` accessibility tests (31 test suites), `linkinator` broken-link checks, and Lighthouse CI (`@lhci/cli`).
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and confirm GA4 network requests fire **only after** accepting Analytics cookies, and stop when consent is withdrawn.
- [ ] Verify `https://mexautomation.in/sitemap.xml` and `https://mexautomation.in/robots.txt` load cleanly.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Set `NEXT_PUBLIC_SENTRY_DSN` and verify Sentry receives a test event.
- [ ] Configure UptimeRobot free monitor for `https://mexautomation.in`.
