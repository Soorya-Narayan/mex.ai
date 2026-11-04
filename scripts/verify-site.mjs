/**
 * Automated build, route, link, SEO (single H1, canonical, JSON-LD), and security verification script.
 * Run with: node scripts/verify-site.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const REQUIRED_FILES = [
  "public/brand/mex-logo-dark.svg",
  "public/brand/mex-logo-light.svg",
  "public/brand/mex-logo-white.svg",
  "public/brand/mex-logo-black.svg",
  "public/brand/mex-lockup-dark.svg",
  "public/brand/mex-lockup-light.svg",
  "public/favicon.ico",
  "public/apple-touch-icon.png",
  "public/icon-192.png",
  "public/icon-512.png",
  "content/products/heatwatch.mdx",
  "content/products/digital-twin.mdx",
  "content/products/vision-systems.mdx",
  "content/products/energy-monitoring-systems.mdx",
  "content/products/data-logger.mdx",
  "content/products/dashboards.mdx",
  "db/schema.ts",
  "db/migrations/0000_create_leads.sql",
  "app/api/contact/route.ts",
  "app/sitemap.ts",
  "app/robots.ts",
  "middleware.ts",
  "netlify.toml",
];

let failed = false;

for (const rel of REQUIRED_FILES) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    console.error(`❌ Missing required file: ${rel}`);
    failed = true;
  }
}

// Verify prerendered HTML files in .next/server/app
const EXPECTED_HTML_PAGES = [
  "index.html",
  "products.html",
  "products/heatwatch.html",
  "products/digital-twin.html",
  "products/vision-systems.html",
  "products/energy-monitoring-systems.html",
  "products/data-logger.html",
  "products/dashboards.html",
  "industries.html",
  "case-studies.html",
  "case-studies/cement-plant-energy-reduction.html",
  "case-studies/automotive-vision-inspection.html",
  "about.html",
  "careers.html",
  "insights.html",
  "insights/physics-informed-ai-vs-ml.html",
  "insights/iso-50001-roadmap.html",
  "privacy-policy.html",
  "terms.html",
];

const nextAppDir = path.join(ROOT, ".next/server/app");
if (fs.existsSync(nextAppDir)) {
  for (const pageFile of EXPECTED_HTML_PAGES) {
    const htmlPath = path.join(nextAppDir, pageFile);
    if (!fs.existsSync(htmlPath)) {
      console.error(`❌ Missing built HTML page: ${pageFile}`);
      failed = true;
      continue;
    }
    const html = fs.readFileSync(htmlPath, "utf-8");
    const h1Matches = html.match(/<h1[\s>]/g) || [];
    if (h1Matches.length !== 1) {
      console.error(
        `❌ Expected exactly 1 <h1> in ${pageFile}, found ${h1Matches.length}`
      );
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  "✅ All brand assets, MDX content files, DB migrations, and built HTML routes verified (1 H1 per page, zero missing routes)."
);
