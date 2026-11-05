# Content Authoring Guide (`CONTENT.md`)

All structured marketing content for **MEX Automation** lives in version-controlled MDX files under `/content`. Frontmatter is strictly validated at build time using Zod schemas defined in [`lib/content.ts`](./lib/content.ts). If a required field is missing or mistyped, `pnpm build` will fail immediately with a clear error message.

---

## Directory Structure

```text
content/
├── products/          # /products and /products/[slug]
├── case-studies/      # /case-studies and /case-studies/[slug]
├── insights/          # /insights and /insights/[slug]
└── careers/           # /careers
```

---

## 1. Adding or Editing a Product (`content/products/<slug>.mdx`)

Create or edit `<slug>.mdx` in `content/products/`. Every product file must include the following frontmatter:

```yaml
---
title: "HeatWatch"
slug: "heatwatch"
tagline: "Continuous Thermal Intelligence for Mission-Critical Processes"
overview: "2–3 sentence executive summary displayed in the product hero."
features:
  - "Feature bullet 1"
  - "Feature bullet 2"
useCases:
  - "Industry use case 1"
  - "Industry use case 2"
howItWorks: "Paragraph explaining the sensing, edge-AI, and integration workflow."
specs:
  - { label: "Thermal Resolution", value: "≤ 0.05 °C (NETD)" }
  - { label: "Enclosure Rating", value: "IP67" }
brochureFile: "heatwatch-brochure.pdf" # Place corresponding PDF in /private/brochures/ (served via /api/brochures with a short-lived signed token)
heroImage: "/brand/product-heatwatch.jpg"
gallery: []
faq:
  - question: "Does HeatWatch require an internet connection?"
    answer: "No. Inference runs entirely at the edge."
order: 1
published: true
---

## Deep-Dive Section

Write standard Markdown below the frontmatter (`##` headings, lists, blockquotes, code blocks, and Markdown tables are all supported).
```

### Private Brochure PDFs (`private/brochures/`) — TODO Before Launch
Brochure PDFs are stored outside `/public` in `private/brochures/` and served exclusively through `/api/brochures` after a Turnstile-verified form submission using a short-lived HMAC-signed token:
- [ ] **TODO:** `private/brochures/heatwatch-brochure.pdf` — Replace placeholder PDF with final HeatWatch datasheet
- [ ] **TODO:** `private/brochures/digital-twin-brochure.pdf` — Replace placeholder PDF with final Digital Twin datasheet
- [ ] **TODO:** `private/brochures/vision-systems-brochure.pdf` — Replace placeholder PDF with final Vision Systems datasheet
- [ ] **TODO:** `private/brochures/ems-brochure.pdf` — Replace placeholder PDF with final Energy Monitoring Systems datasheet
- [ ] **TODO:** `private/brochures/data-logger-brochure.pdf` — Replace placeholder PDF with final Data Logger datasheet
- [ ] **TODO:** `private/brochures/dashboards-brochure.pdf` — Replace placeholder PDF with final Dashboards datasheet

---

## 2. Adding or Editing a Case Study (`content/case-studies/<slug>.mdx`)

Create `<slug>.mdx` in `content/case-studies/`:

```yaml
---
title: "28% Energy Reduction at a Rotary Kiln Cement Plant"
slug: "cement-plant-energy-reduction"
client: "Client Name (or Anonymised Label)"
industry: "Cement"
challenge: "Summary of the operational problem before MEX deployment."
solution: "Summary of the MEX hardware/software deployed and commissioning approach."
results:
  - "28% reduction in kiln SEC"
  - "ISO 50001 certification achieved"
heroImage: "/brand/case-study-cement.jpg"
date: "2025-09-01"
published: true
---

## Background

Detailed narrative of the deployment, findings, and client quote.
```

---

## 3. Adding or Editing a Blog Post (`content/insights/<slug>.mdx`)

Create `<slug>.mdx` in `content/insights/`:

```yaml
---
title: "Why Physics-Informed AI Beats Pure ML for Industrial Predictive Maintenance"
slug: "physics-informed-ai-vs-ml"
date: "2025-10-20"
author: "MEX Engineering Team"
authorRole: "R&D"
excerpt: "1–2 sentence summary shown on the Insights index and meta description."
tags: ["AI", "Predictive Maintenance", "Digital Twin"]
heroImage: "/brand/insight-pinns.jpg"
published: true
---

Write the article body in standard Markdown. Reading time is calculated automatically (200 words/min).
```

---

## 4. Adding or Removing a Job Opening (`content/careers/<slug>.mdx`)

Create `<slug>.mdx` in `content/careers/` (or set `published: false` to hide a closed role):

```yaml
---
title: "Senior Automation Engineer"
slug: "senior-automation-engineer"
department: "Engineering"
location: "Pune, Maharashtra (Hybrid)"
type: "Full-time" # One of: "Full-time" | "Part-time" | "Contract" | "Internship"
experience: "4–8 years"
description: "Short summary of the role."
responsibilities:
  - "Responsibility 1"
  - "Responsibility 2"
requirements:
  - "Requirement 1"
  - "Requirement 2"
published: true
---
```

