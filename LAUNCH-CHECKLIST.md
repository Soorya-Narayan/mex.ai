# MEX Automation — Pre-Launch Checklist (`LAUNCH-CHECKLIST.md`)

Use this checklist to verify every content, legal, security, and infrastructure item before pointing `mexautomation.in` to production.

---

## 1. Content & Brand Placeholders (`[TODO: confirm]` / `SITE_CONFIG`)
- [x] Unpublished all draft MDX entries (`published: false` in `content/case-studies/*.mdx`, `content/insights/*.mdx`, and `content/careers/senior-automation-engineer.mdx`) so they do not appear in `/sitemap.xml` or public routes.
- [x] Hid `ClientLogos` and unverified homepage stat cards behind `SITE_CONFIG.showVerifiedCustomerData` in `lib/site-config.ts`.
- [x] Removed all `[PLACEHOLDER]` text from public pages and marked every unverified technical specification in `content/products/*.mdx` with `[TODO: confirm]`.
- [x] Deleted `public/brand-preview.html` and updated `LICENSE` to `"Copyright (c) 2026 MEX Automation. All rights reserved."`
- [ ] Replace `[TODO: confirm]` values in `content/products/*.mdx` with engineering-verified specifications.
- [ ] Replace the 6 placeholder PDF datasheets in `private/brochures/` (`heatwatch-brochure.pdf`, `digital-twin-brochure.pdf`, `vision-systems-brochure.pdf`, `ems-brochure.pdf`, `data-logger-brochure.pdf`, `dashboards-brochure.pdf`) with final engineering datasheets.
- [ ] Populate verified customer case studies (`content/case-studies/*.mdx`), engineering articles (`content/insights/*.mdx`), and open roles (`content/careers/*.mdx`) before setting `published: true`.
- [ ] Populate verified client logos and homepage stats, then set `SITE_CONFIG.showVerifiedCustomerData = true` in `lib/site-config.ts`.
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
- [x] Production environment validation (`lib/env.ts`) fails the build when `NODE_ENV=production` and any required secret (`DATABASE_URL`, `RESEND_API_KEY`, `CLOUDFLARE_TURNSTILE_SECRET_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) is missing or uses a sample/test value.
- [x] Removed all `isSample...` skips and Turnstile bypasses from `app/api/contact/route.ts`; test keys work only in `NODE_ENV=development`; Sentry captures DB/email errors; returns HTTP 500 if both DB insert and sales email fail.
- [x] Brochure PDFs moved out of `/public` into `private/brochures/` and served via `/api/brochures` using a 15-minute HMAC-signed token after a Turnstile-verified lead submission in `BrochureGateModal`.
- [x] Rate limiting extracts client IP from `x-nf-client-connection-ip` (falling back to the last trusted forwarded IP), removes in-memory fallback in production, and fails closed (HTTP 503) if Upstash is unreachable.
- [ ] Provision Neon Serverless Postgres database (`ap-south-1` Mumbai recommended) and run `db/migrations/0000_create_leads.sql`.
- [ ] Create the least-privilege Postgres role (`mex_app_writer` with `INSERT` on `leads` only) and set `DATABASE_URL` in Netlify.
- [ ] Verify domain `mexautomation.in` in Resend (`SPF` + `DKIM`), create API key, and set `RESEND_API_KEY`, `SALES_EMAIL`, and `EMAIL_FROM`.
- [ ] Create Cloudflare Turnstile widget for `mexautomation.in` and set `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` and `CLOUDFLARE_TURNSTILE_SECRET_KEY`.
- [ ] Create Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

## 4. Security, CSP & HTTPS
- [x] Restored per-request nonce-based `Content-Security-Policy` in `middleware.ts` only (removed duplicate from `next.config.ts`) using `'strict-dynamic'` without `'unsafe-inline'` or `'unsafe-eval'` in `script-src`, removed `*.upstash.io` from `connect-src`, and passed the nonce to `next-themes`, GA4, Turnstile, and JSON-LD scripts.
- [x] Removed `preload` from `Strict-Transport-Security` (`max-age=63072000; includeSubDomains`).
- [ ] Confirm custom domain `mexautomation.in` and `www.mexautomation.in` are attached in Netlify with Let's Encrypt TLS certificate active.
- [ ] Confirm `http://` and `https://www.mexautomation.in` redirect (301/308) to `https://mexautomation.in`.

## 5. CI, SEO, Analytics & Monitoring
- [x] Configured `.github/workflows/ci.yml` to run `pnpm tsc --noEmit`, `pnpm lint`, `pnpm build`, Playwright smoke + `@axe-core/playwright` accessibility tests, `linkinator` broken-link checks, and Lighthouse CI (`@lhci/cli`).
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and confirm GA4 network requests fire **only after** accepting Analytics cookies, and stop when consent is withdrawn.
- [ ] Verify `https://mexautomation.in/sitemap.xml` and `https://mexautomation.in/robots.txt` load cleanly.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Set `NEXT_PUBLIC_SENTRY_DSN` and verify Sentry receives a test event.
- [ ] Configure UptimeRobot free monitor for `https://mexautomation.in`.
