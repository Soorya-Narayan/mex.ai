import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

// ─── Schemas ────────────────────────────────────────────────────────────────

export const SpecRowSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const FaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const ProductFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  overview: z.string(),
  category: z
    .enum(["Vision AI", "Monitoring & Data", "Simulation"])
    .optional(),
  features: z.array(z.string()),
  useCases: z.array(z.string()),
  howItWorks: z.string(),
  specs: z.array(SpecRowSchema),
  brochureFile: z.string().optional(),
  heroImage: z.string().optional(),
  gallery: z
    .array(z.string())
    .optional()
    .transform((v) => v ?? []),
  faq: z
    .array(FaqSchema)
    .optional()
    .transform((v) => v ?? []),
  order: z
    .number()
    .optional()
    .transform((v) => v ?? 99),
  published: z
    .boolean()
    .optional()
    .transform((v) => v ?? true),
});

export const CaseStudyFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  client: z.string(),
  industry: z.string(),
  challenge: z.string(),
  solution: z.string(),
  results: z.array(z.string()),
  heroImage: z.string().optional(),
  date: z.string(),
  published: z
    .boolean()
    .optional()
    .transform((v) => v ?? true),
});

export const InsightFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  author: z.string(),
  authorRole: z.string().optional(),
  excerpt: z.string(),
  tags: z
    .array(z.string())
    .optional()
    .transform((v) => v ?? []),
  heroImage: z.string().optional(),
  published: z
    .boolean()
    .optional()
    .transform((v) => v ?? true),
});

export const CareerFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  department: z.string(),
  location: z.string(),
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  experience: z.string(),
  description: z.string(),
  responsibilities: z.array(z.string()),
  requirements: z.array(z.string()),
  published: z
    .boolean()
    .optional()
    .transform((v) => v ?? true),
});

// ─── Types ───────────────────────────────────────────────────────────────────
// Use z.output to get post-transform types (after .transform() / .default())

export type ProductFrontmatter = z.output<typeof ProductFrontmatterSchema>;
export type CaseStudyFrontmatter = z.output<typeof CaseStudyFrontmatterSchema>;
export type InsightFrontmatter = z.output<typeof InsightFrontmatterSchema>;
export type CareerFrontmatter = z.output<typeof CareerFrontmatterSchema>;

export type ContentItem<T> = {
  frontmatter: T;
  content: string;
  slug: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readMDXDir<S extends z.ZodTypeAny>(
  dir: string,
  schema: S
): ContentItem<z.output<S>>[] {
  const contentDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = schema.parse(data) as z.output<S>;
      const slug = file.replace(/\.(mdx|md)$/, "");
      return { frontmatter, content, slug };
    });
}

function readMDXFile<S extends z.ZodTypeAny>(
  dir: string,
  slug: string,
  schema: S
): ContentItem<z.output<S>> | null {
  const contentDir = path.join(process.cwd(), dir);
  const mdxPath = path.join(contentDir, `${slug}.mdx`);
  const mdPath = path.join(contentDir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = schema.parse(data) as z.output<S>;
  return { frontmatter, content, slug };
}

// ─── Public API ──────────────────────────────────────────────────────────────

export type ProductCategory = "Vision AI" | "Monitoring & Data" | "Simulation";

export type ProductNavItem = {
  slug: string;
  title: string;
  tagline: string;
  order: number;
  category: ProductCategory;
};

export type ProductGroup = {
  category: ProductCategory;
  products: ContentItem<ProductFrontmatter>[];
};

const SLUG_CATEGORY_MAP: Record<string, ProductCategory> = {
  "crate-pouch-counting": "Vision AI",
  "bottle-counting": "Vision AI",
  heatwatch: "Monitoring & Data",
  "data-logger": "Monitoring & Data",
  dashboards: "Monitoring & Data",
  "twinforge-studio": "Simulation",
};

const GROUP_ORDER: ProductCategory[] = [
  "Vision AI",
  "Monitoring & Data",
  "Simulation",
];

export function resolveProductCategory(
  frontmatter: ProductFrontmatter
): ProductCategory {
  return (
    frontmatter.category ??
    SLUG_CATEGORY_MAP[frontmatter.slug] ??
    "Monitoring & Data"
  );
}

export function getAllProducts(): ContentItem<ProductFrontmatter>[] {
  return readMDXDir("content/products", ProductFrontmatterSchema)
    .filter((p) => p.frontmatter.published)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getProductGroups(): ProductGroup[] {
  const all = getAllProducts();
  return GROUP_ORDER.map((category) => ({
    category,
    products: all.filter(
      (p) => resolveProductCategory(p.frontmatter) === category
    ),
  })).filter((g) => g.products.length > 0);
}

export function getProductNavGroups(): {
  category: ProductCategory;
  products: ProductNavItem[];
}[] {
  return getProductGroups().map((group) => ({
    category: group.category,
    products: group.products.map((p) => ({
      slug: p.slug,
      title: p.frontmatter.title,
      tagline: p.frontmatter.tagline,
      order: p.frontmatter.order,
      category: group.category,
    })),
  }));
}

export function getProduct(slug: string): ContentItem<ProductFrontmatter> | null {
  const item = readMDXFile("content/products", slug, ProductFrontmatterSchema);
  if (!item || !item.frontmatter.published) return null;
  return item;
}

export function getAllCaseStudies(): ContentItem<CaseStudyFrontmatter>[] {
  return readMDXDir("content/case-studies", CaseStudyFrontmatterSchema)
    .filter((p) => p.frontmatter.published)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getCaseStudy(
  slug: string
): ContentItem<CaseStudyFrontmatter> | null {
  const item = readMDXFile("content/case-studies", slug, CaseStudyFrontmatterSchema);
  if (!item || !item.frontmatter.published) return null;
  return item;
}

export function getAllInsights(): ContentItem<InsightFrontmatter>[] {
  return readMDXDir("content/insights", InsightFrontmatterSchema)
    .filter((p) => p.frontmatter.published)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getInsight(
  slug: string
): ContentItem<InsightFrontmatter> | null {
  const item = readMDXFile("content/insights", slug, InsightFrontmatterSchema);
  if (!item || !item.frontmatter.published) return null;
  return item;
}

export function getAllCareers(): ContentItem<CareerFrontmatter>[] {
  return readMDXDir("content/careers", CareerFrontmatterSchema).filter(
    (p) => p.frontmatter.published
  );
}

/** Rough reading-time estimator (200 wpm) */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
