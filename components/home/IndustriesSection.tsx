import React from "react";
import Link from "next/link";
import {
  Factory,
  Car,
  Pill,
  Package,
  Zap,
  Cpu,
  ArrowRight,
} from "lucide-react";

export const industries = [
  {
    title: "Steel & Metals",
    slug: "steel",
    icon: Factory,
    summary:
      "Blast furnace refractory lining monitoring, continuous billet casting inspection, and predictive ladle anomaly detection.",
    keyBenefit: "Continuous Furnace & Slab Surveillance",
  },
  {
    title: "Automotive & Auto Components",
    slug: "automotive",
    icon: Car,
    summary:
      "Battery pack thermal monitoring during cell assembly, robotic welding bead verification, and precision stamping inspection.",
    keyBenefit: "Inline Surface & Weld Verification",
  },
  {
    title: "Pharmaceuticals & Life Sciences",
    slug: "pharma",
    icon: Pill,
    summary:
      "Audit-ready environmental data logging, sterile blister packaging inspection, and lyophilization temperature tracking.",
    keyBenefit: "End-to-End Batch Traceability",
  },
  {
    title: "Food & Beverage",
    slug: "food-beverage",
    icon: Package,
    summary:
      "High-speed bottle cap alignment, OCR label expiry verification, and specific energy monitoring across refrigeration loops.",
    keyBenefit: "Cold-Chain & Packaging Integrity",
  },
  {
    title: "Oil, Gas & Petrochemicals",
    slug: "oil-gas",
    icon: Zap,
    summary:
      "High-voltage switchgear hot-spot detection, rotating asset health modelling, and continuous thermal safety surveillance.",
    keyBenefit: "Early Thermal & Asset Anomaly Detection",
  },
  {
    title: "Cement & Building Materials",
    slug: "cement",
    icon: Cpu,
    summary:
      "Rotary kiln shell thermal profiling, cooler hot-spot detection, and plant-wide specific energy consumption (SEC) analytics.",
    keyBenefit: "Kiln Thermal & Energy Optimization",
  },
];

export function IndustriesSection() {
  return (
    <section className="py-20 md:py-28 bg-card/30 border-y border-border/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-3">
              Sector Specializations
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Built for India&apos;s Most Demanding Production Floors
            </h2>
          </div>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:underline"
          >
            Explore All Industry Use Cases <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.slug}
                className="p-7 rounded-2xl border border-border/60 bg-background/60 hover:bg-background hover:border-brand-blue/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {ind.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="font-semibold text-brand-cyan">
                    {ind.keyBenefit}
                  </span>
                  <Link
                    href={`/industries#${ind.slug}`}
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

