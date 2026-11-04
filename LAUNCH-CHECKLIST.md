# MEX Automation — Pre-Launch Checklist (`LAUNCH-CHECKLIST.md`)

Use this checklist to verify every content, legal, security, and infrastructure item before pointing `mexautomation.in` to production.

---

## 1. Content & Brand Placeholders (`[PLACEHOLDER]` / `TODO`)
- [ ] Replace all `[PLACEHOLDER]` metrics and `<!-- TODO -->` comments in `content/products/*.mdx` with engineering-verified specifications.
- [ ] Upload final PDF datasheets to `public/brochures/` matching each product's `brochureFile` frontmatter field.
- [ ] Replace placeholder client names, quotes, and metrics in `content/case-studies/*.mdx` (ensure written client permission is on file).
- [ ] Replace founding story, mission confirmation, and leadership team bios/photos in `app/about/page.tsx`.
- [ ] Replace `[ADDRESS]`, `[PHONE]`, `[EMAIL]`, and `[WHATSAPP NUMBER]` in:
  - [ ] `app/contact/page.tsx` (including the Google Maps iframe coordinates and `wa.me` number)
  - [ ] `components/layout/Footer.tsx`
  - [ ] `components/layout/WhatsAppButton.tsx`

## 2. Legal & DPDP Act 2023 Compliance
- [ ] Have a qualified Indian lawyer review and approve `app/privacy-policy/page.tsx` (drafted for the DPDP Act 2023) and remove the draft banner.
- [ ] Populate Grievance Officer `[NAME, EMAIL]`, `[ADDRESS]`, and `[PHONE]` in `app/privacy-policy/page.tsx`.
- [ ] Have a qualified lawyer review and approve `app/terms/page.tsx`, fill in the court jurisdiction city/state, and remove the draft banner.
- [ ] Verify that the Cookie Banner (`Accept all` / `Reject all` / `Customize`) opens on first visit and reopens when clicking **Cookie Settings** in the footer.

## 3. Forms, Database & Email Infrastructure
- [ ] Provision Neon Serverless Postgres database (`ap-south-1` Mumbai recommended) and run `db/migrations/0000_create_leads.sql`.
- [ ] Create the least-privilege Postgres role (`mex_app_writer` with `INSERT` on `leads` only) and set `DATABASE_URL` in Netlify.
- [ ] Verify domain `mexautomation.in` in Resend (`SPF` + `DKIM`), create API key, and set `RESEND_API_KEY`, `SALES_EMAIL`, and `EMAIL_FROM`.
- [ ] Create Cloudflare Turnstile widget for `mexautomation.in` and set `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` and `CLOUDFLARE_TURNSTILE_SECRET_KEY`.
- [ ] Create Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- [ ] Submit a live test lead on `/contact` and verify:
  - [ ] Row inserted in Neon `leads` table
  - [ ] Notification email received at `SALES_EMAIL`
  - [ ] Auto-reply email received by submitter
  - [ ] 6th rapid submission within 10 minutes returns HTTP 429

## 4. Security & HTTPS
- [ ] Confirm custom domain `mexautomation.in` and `www.mexautomation.in` are attached in Netlify with Let's Encrypt TLS certificate active.
- [ ] Confirm `http://` and `https://www.mexautomation.in` redirect (301/308) to `https://mexautomation.in`.
- [ ] Inspect response headers on production and verify presence of:
  - [ ] `Content-Security-Policy` (with per-request nonce)
  - [ ] `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - [ ] `X-Frame-Options: DENY`
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin`
  - [ ] `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## 5. SEO, Analytics & Monitoring
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and confirm GA4 network requests fire **only after** accepting Analytics cookies, and stop when consent is withdrawn.
- [ ] Verify `https://mexautomation.in/sitemap.xml` and `https://mexautomation.in/robots.txt` load cleanly.
- [ ] Submit `sitemap.xml` in Google Search Console.
- [ ] Test Open Graph preview cards for `/`, `/products/heatwatch`, `/case-studies/cement-plant-energy-reduction`, and `/insights/physics-informed-ai-vs-ml`.
- [ ] Set `NEXT_PUBLIC_SENTRY_DSN` and verify Sentry receives a test event.
- [ ] Configure UptimeRobot free monitor for `https://mexautomation.in`.

