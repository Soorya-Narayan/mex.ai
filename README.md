# MEX Automation — Marketing Website (`mexautomation.in`)

Production-ready marketing website for **MEX Automation**, an Indian industrial automation and AI company. Built from scratch on a 100% free-tier stack with Next.js 15 (App Router), TypeScript (strict mode), Tailwind CSS, Drizzle ORM (Neon Serverless Postgres), Resend + React Email, Cloudflare Turnstile, Upstash Ratelimit, and `vanilla-cookieconsent`.

---

## 1. Tech Stack (All Free Tier)

| Layer | Technology | Free-Tier Plan |
|---|---|---|
| Framework | Next.js 15 (App Router) + TypeScript strict | Open source |
| Styling & UI | Tailwind CSS + Radix primitives + `lucide-react` | Open source |
| Fonts | Self-hosted `Space Grotesk` (headings) + `Inter` (body) via `next/font/local` | Self-hosted |
| Content | Local MDX files in `/content` validated at build time with Zod | Free |
| Database | Neon Serverless Postgres via Drizzle ORM (`leads` table) | Neon Free Tier |
| Transactional Email | Resend + React Email | Resend Free (3,000 emails/mo) |
| Bot & Spam Protection | Cloudflare Turnstile + Honeypot + Upstash Redis Ratelimit | Turnstile Free + Upstash Free |
| Cookie Consent & Analytics | `vanilla-cookieconsent` + Google Analytics 4 (strict opt-in) | Free |
| Error Monitoring | Sentry (`@sentry/nextjs`) | Sentry Developer Free Plan |
| Hosting | Netlify (`netlify.toml` configured for Next.js runtime) | Netlify Starter Free Plan |

---

## 2. Local Development Setup

### Prerequisites
- **Node.js** 20+ (v22 recommended)
- **pnpm** 9+

### Installation & Dev Server

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables template
cp .env.example .env

# 3. Start local development server (http://localhost:3000)
pnpm dev

# 4. Run strict TypeScript check and production build
pnpm tsc --noEmit
pnpm build
node scripts/verify-site.mjs
```

---

## 3. Environment Variables

All environment variables are validated at startup in `lib/env.ts` using Zod. Only `NEXT_PUBLIC_*` variables are exposed to the browser, and none of them are secrets. See `.env.example` for the full template:

| Variable | Scope | Description |
|---|---|---|
| `DATABASE_URL` | Server-only | Neon Postgres connection string using the least-privilege `mex_app_writer` role |
| `RESEND_API_KEY` | Server-only | Resend API key (`re_...`) |
| `SALES_EMAIL` | Server-only | Recipient email for new lead notifications (e.g., `sales@mexautomation.in`) |
| `EMAIL_FROM` | Server-only | Verified sender identity in Resend (e.g., `MEX Automation <contact@mexautomation.in>`) |
| `CLOUDFLARE_TURNSTILE_SECRET_KEY` | Server-only | Turnstile secret key for server-side token verification |
| `UPSTASH_REDIS_REST_URL` | Server-only | Upstash Redis REST URL for IP rate-limiting (5 req / 10 min) |
| `UPSTASH_REDIS_REST_TOKEN` | Server-only | Upstash Redis REST token |
| `NEXT_PUBLIC_APP_URL` | Client-safe | Canonical site URL (`https://mexautomation.in`) |
| `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` | Client-safe | Turnstile public widget site key |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client-safe | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_SENTRY_DSN` | Client-safe | Sentry public DSN |

---

## 4. Database Setup (Neon Serverless Postgres & Least-Privilege Role)

1. Create a free project at [neon.tech](https://neon.tech) (select nearest region, e.g., AWS Mumbai `ap-south-1` or Singapore `ap-southeast-1`).
2. Run the migration file `db/migrations/0000_create_leads.sql` in the Neon SQL Editor (or run `pnpm db:migrate` using the admin connection string).
3. Create the least-privilege writer role (`mex_app_writer`) that has **`INSERT` permission on `leads` only** (included in `db/migrations/0000_create_leads.sql`):
   ```sql
   CREATE ROLE mex_app_writer WITH LOGIN PASSWORD 'YOUR_STRONG_PASSWORD';
   GRANT CONNECT ON DATABASE neondb TO mex_app_writer;
   GRANT USAGE ON SCHEMA public TO mex_app_writer;
   GRANT INSERT ON TABLE public.leads TO mex_app_writer;
   GRANT USAGE, SELECT ON SEQUENCE public.leads_id_seq TO mex_app_writer;
   REVOKE SELECT, UPDATE, DELETE, TRUNCATE ON TABLE public.leads FROM mex_app_writer;
   ```
4. Set `DATABASE_URL` in Netlify to use `mex_app_writer`.

### Manual Database Backups (`pg_dump`)
Because Neon's free tier has a limited point-in-time history window, export regular encrypted backups using `pg_dump` with your read-capable admin connection string:

```bash
pg_dump "postgresql://neondb_owner:PASSWORD@ep-xyz.ap-south-1.aws.neon.tech/neondb?sslmode=require" \
  --table=public.leads \
  --format=custom \
  --file="mex-leads-backup-$(date +%F).dump"
```

To export as CSV for sales/CRM import:
```bash
psql "postgresql://neondb_owner:PASSWORD@ep-xyz.ap-south-1.aws.neon.tech/neondb?sslmode=require" \
  -c "\copy (SELECT id, name, company, email, phone, product_interest, message, consent, created_at FROM public.leads ORDER BY created_at DESC) TO 'mex-leads-$(date +%F).csv' WITH CSV HEADER"
```

---

## 5. External Services Setup Guide

### Resend (Email)
1. Sign up at [resend.com](https://resend.com) (Free tier: 3,000 emails/month, 100/day).
2. Add and verify the domain `mexautomation.in` via DNS (`DKIM` and `SPF` TXT records).
3. Create an API key with `Sending access` and set `RESEND_API_KEY`, `SALES_EMAIL`, and `EMAIL_FROM`.

### Cloudflare Turnstile (Bot Protection)
1. Open the Cloudflare Dashboard → **Turnstile** → **Add Site**.
2. Add domain `mexautomation.in` (and `localhost` for testing), choose **Managed** widget mode.
3. Copy the **Site Key** to `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY` and **Secret Key** to `CLOUDFLARE_TURNSTILE_SECRET_KEY`.

### Upstash Redis (Rate Limiting)
1. Create a free Redis database at [upstash.com](https://upstash.com).
2. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your environment variables.

### Google Analytics 4 & Search Console
1. Create a GA4 property at [analytics.google.com](https://analytics.google.com) and set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`. GA4 will only load after the user clicks **Accept all** or enables **Analytics** in the cookie banner.
2. Verify `mexautomation.in` in [Google Search Console](https://search.google.com/search-console) via DNS TXT record and submit `https://mexautomation.in/sitemap.xml`.

### Sentry & UptimeRobot
1. Create a Next.js project in [sentry.io](https://sentry.io) (Free Developer plan) and set `NEXT_PUBLIC_SENTRY_DSN`.
2. Create a free HTTPS monitor in [uptimerobot.com](https://uptimerobot.com) pointing to `https://mexautomation.in` at a 5-minute interval with email alerts.

---

## 6. Deploying to Netlify & Connecting `mexautomation.in`

1. Push this repository to GitHub/GitLab.
2. In **Netlify**, click **Add new site → Import an existing project** and select the repository.
3. Netlify automatically detects `netlify.toml` (`pnpm build`, Next.js runtime).
4. Add all environment variables from `.env.example` under **Site configuration → Environment variables**.
5. Under **Domain management**, add custom domain `mexautomation.in` (primary) and `www.mexautomation.in` (automatically redirected to `https://mexautomation.in` via `middleware.ts` and `netlify.toml`).
6. Enable **HTTPS (Let's Encrypt)** and **Force HTTPS** in Netlify Domain Settings.

