import React from "react";
import { getAllProducts } from "@/lib/content";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://mexautomation.in";

export function JsonLd({
  data,
  nonce,
}: {
  data: Record<string, unknown>;
  nonce?: string;
}) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      suppressHydrationWarning
      // Trusted server-constructed JSON-LD only
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function getOrganizationJsonLd() {
  const productTitles = getAllProducts().map((p) => p.frontmatter.title);
  const productListText =
    productTitles.length > 0
      ? productTitles.join(", ")
      : "HeatWatch, Crate & Pouch Counting, Bottle Detection & Counting, Data Logger, Dashboards, TwinForge Studio";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MEX Automation",
    url: BASE_URL,
    logo: `${BASE_URL}/brand/mex-logo-dark-512.png`,
    description: `Indian industrial automation and AI company delivering ${productListText}.`,
    sameAs: [
      "https://www.linkedin.com/company/mexai",
      "https://github.com/MEX-AI-Kochi",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@mexautomation.in",
      url: `${BASE_URL}/contact`,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MEX Automation",
    url: BASE_URL,
    publisher: {
      "@type": "Organization",
      name: "MEX Automation",
      url: BASE_URL,
    },
  };
}

export function getBreadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

export function getProductJsonLd(product: {
  title: string;
  slug: string;
  overview: string;
  tagline: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `MEX ${product.title}`,
    description: product.overview,
    slogan: product.tagline,
    url: `${BASE_URL}/products/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "MEX Automation",
    },
    manufacturer: {
      "@type": "Organization",
      name: "MEX Automation",
      url: BASE_URL,
    },
  };
}

export function getArticleJsonLd(article: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "MEX Automation",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/brand/mex-logo-dark-512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/insights/${article.slug}`,
    },
  };
}

