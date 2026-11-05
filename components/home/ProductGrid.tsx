import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import { getAllProducts, resolveProductCategory } from "@/lib/content";

export function ProductGrid() {
  const products = getAllProducts();

  return (
    <section className="py-20 md:py-28 bg-background relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-3">
            Products
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Practical Automation Built for Real Plant Lines.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Vision counting on high-speed conveyors, round-the-clock temperature
            and PLC data logging, real-time energy dashboards, and virtual
            commissioning before you reach site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const p = product.frontmatter;
            const category = resolveProductCategory(p);

            return (
              <div
                key={product.slug}
                className="group relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/50 hover:shadow-2xl hover:shadow-black/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md">
                      {category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-cyan transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {p.tagline}
                  </p>

                  <ul className="space-y-2 mb-8 pt-4 border-t border-border/40">
                    {p.features.slice(0, 3).map((feature, i) => (
                      <li
                        key={i}
                        className="text-xs text-foreground/80 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:text-brand-cyan/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md"
                >
                  Explore {p.title}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border/80 bg-card/60 hover:bg-muted text-foreground font-semibold text-sm transition-all focus-visible:ring-2 focus-visible:ring-brand-cyan"
          >
            View All Products by Category
            <ArrowRight className="w-4 h-4 text-brand-cyan" />
          </Link>
        </div>
      </div>
    </section>
  );
}
