import React from "react";
import Link from "next/link";
import { getAllProducts } from "@/lib/content";
import { JsonLd, getBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import {
  ArrowRight,
  ChevronRight,
  Flame,
  Layers,
  Eye,
  Zap,
  HardDrive,
  LayoutDashboard,
  Cpu,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore MEX Automation's industrial AI products: HeatWatch thermal monitoring, Digital Twin, Vision Systems, Energy Monitoring, Data Logger, and Dashboards.",
  alternates: {
    canonical: "/products",
  },
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  heatwatch: Flame,
  "digital-twin": Layers,
  "vision-systems": Eye,
  "energy-monitoring-systems": Zap,
  "data-logger": HardDrive,
  dashboards: LayoutDashboard,
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-brand-magenta/20 via-brand-blue/20 to-brand-cyan/20 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Products</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4">
              Industrial AI Platform
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Purpose-Built for{" "}
              <span className="text-brand-gradient">Indian Industry</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Six tightly integrated products covering thermal intelligence,
              physics-informed simulation, computer vision, energy management,
              data acquisition, and operations dashboards — engineered for the
              conditions and constraints of Indian manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const Icon = ICON_MAP[product.slug] ?? Cpu;
              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group glow-card rounded-2xl border border-border/60 bg-card/40 p-6 flex flex-col gap-4 transition-all hover:border-border/80 hover:-translate-y-1 duration-300 focus-visible:ring-2 focus-visible:ring-brand-cyan outline-none"
                >
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl border border-brand-cyan/30 bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title + tagline */}
                  <div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-brand-cyan transition-colors mb-1.5">
                      {product.frontmatter.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {product.frontmatter.tagline}
                    </p>
                  </div>

                  {/* Top 3 features */}
                  <ul className="space-y-1.5 flex-1">
                    {product.frontmatter.features.slice(0, 3).map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="w-1 h-1 rounded-full bg-brand-cyan mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-cyan group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Demo CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Not sure which product is right for your process?
            </p>
            <Link
              href="/contact?interest=request-demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-gradient text-white font-bold text-base shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-brand-cyan outline-none"
            >
              Book a free scoping call <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
