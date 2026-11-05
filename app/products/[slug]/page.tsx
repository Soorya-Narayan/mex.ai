import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProduct } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import { BrochureGateModal } from "@/components/products/BrochureGateModal";
import {
  JsonLd,
  getProductJsonLd,
  getBreadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Image as ImageIcon,
} from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.frontmatter.title,
    description: product.frontmatter.tagline,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const { frontmatter: p, content } = product;

  return (
    <main className="min-h-screen">
      <JsonLd
        data={getProductJsonLd({
          title: p.title,
          slug: p.slug,
          overview: p.overview,
          tagline: p.tagline,
        })}
      />
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: p.title, path: `/products/${p.slug}` },
        ])}
      />
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-15">
          <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-r from-brand-magenta/30 via-brand-blue/30 to-brand-cyan/30 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{p.title}</span>
          </nav>

          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4">
              MEX Product
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-5">
              {p.title}
            </h1>
            <p className="text-xl text-brand-gradient font-semibold mb-6">
              {p.tagline}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-10">
              {p.overview}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/contact?interest=${p.slug}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-gradient text-white font-bold text-base shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-brand-cyan outline-none"
              >
                Request a Demo <ArrowRight className="w-5 h-5" />
              </Link>
              {p.brochureFile && (
                <BrochureGateModal
                  productTitle={p.title}
                  productSlug={p.slug}
                  brochureFile={p.brochureFile}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-10">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl bg-card/40 border border-border/40"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 border-b border-border/40 bg-card/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Use Cases</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Proven deployment scenarios across Indian manufacturing verticals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {p.useCases.map((useCase, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-border/40 bg-background"
              >
                <span className="text-brand-cyan font-mono text-xs mr-2">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span className="text-sm text-foreground">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works + Deep Dive MDX */}
      <section className="py-20 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              {p.howItWorks}
            </p>
            <MdxContent content={content} />
          </div>
        </div>
      </section>

      {/* Technical Specs Table */}
      <section className="py-20 border-b border-border/40 bg-card/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-10">
            Technical Specifications
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40 bg-card/60">
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">
                    Parameter
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {p.specs.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border/40 ${
                      i % 2 === 0 ? "bg-background" : "bg-card/30"
                    }`}
                  >
                    <td className="px-5 py-3 font-medium text-foreground">
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Gallery — shown when product gallery images are configured */}
      {p.gallery.length > 0 && (
        <section className="py-20 border-b border-border/40">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Product Gallery &amp; Architecture
                </h2>
                <p className="text-sm text-muted-foreground">
                  Hardware enclosures, deployment topologies, and operator UI
                  views.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {p.gallery.map((caption, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-border/60 bg-card/30 overflow-hidden flex flex-col"
                >
                  <div className="aspect-video bg-gradient-to-br from-brand-magenta/10 via-brand-blue/10 to-brand-cyan/10 flex flex-col items-center justify-center p-6 text-center border-b border-border/40">
                    <ImageIcon className="w-8 h-8 text-brand-cyan/60 mb-2" />
                    <span className="text-xs font-mono text-muted-foreground">
                      {caption}
                    </span>
                  </div>
                  <div className="p-4 text-xs text-muted-foreground">
                    {caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {p.faq.length > 0 && (
        <section className="py-20 border-b border-border/40 bg-card/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-foreground mb-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {p.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-border/40 bg-card/40"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 font-semibold text-foreground list-none">
                      {item.question}
                      <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl p-[1px] bg-brand-gradient overflow-hidden shadow-2xl shadow-brand-blue/20">
            <div className="rounded-[15px] bg-background dark:bg-[#05050A] px-8 py-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to deploy {p.title}?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Book a no-obligation scoping call. Our engineers will assess
                your site and recommend the right configuration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/contact?interest=${p.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-gradient text-white font-bold shadow-lg hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-brand-cyan outline-none"
                >
                  Request a Demo <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border/80 bg-card/40 hover:bg-muted/60 text-foreground font-semibold transition-all focus-visible:ring-2 focus-visible:ring-brand-cyan outline-none"
                >
                  All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
