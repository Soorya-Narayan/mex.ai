import type { MetadataRoute } from "next";
import {
  getAllProducts,
  getAllCaseStudies,
  getAllInsights,
} from "@/lib/content";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://mexautomation.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/industries",
    "/case-studies",
    "/about",
    "/careers",
    "/insights",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/products" ? 0.9 : 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = getAllCaseStudies().map(
    (cs) => ({
      url: `${BASE_URL}/case-studies/${cs.slug}`,
      lastModified: new Date(cs.frontmatter.date),
      changeFrequency: "monthly",
      priority: 0.75,
    })
  );

  const insightRoutes: MetadataRoute.Sitemap = getAllInsights().map((post) => ({
    url: `${BASE_URL}/insights/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...caseStudyRoutes,
    ...insightRoutes,
  ];
}

