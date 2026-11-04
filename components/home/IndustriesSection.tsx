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
    title: "Heavy Engineering & Metals",
    slug: "heavy-engineering-metals",
    icon: Factory,
    summary:
      "Blast furnace refractory lining monitoring, continuous billet casting inspection, and predictive ladle breakout prevention.",
    keyBenefit: "-75% Ladle Breakout Incidents [PLACEHOLDER]",
  },
  {
    title: "Automotive & Electric Vehicles",
    slug: "automotive-ev",
    icon: Car,
    summary:
      "Battery pack thermal runaway prevention during cell assembly, robotic welding bead verification, and precision stamping inspection.",
    keyBenefit: "100% Thermal Weld Traceability [PLACEHOLDER]",
  },
  {
    title: "Pharmaceuticals & Cleanrooms",
    slug: "pharmaceuticals-cleanrooms",
    icon: Pill,
    summary:
      "21 CFR Part 11 compliant audit logging, sterile blister packaging leak detection, and lyophilization temperature uniformity.",
    keyBenefit: "Zero Defect Release Audit Trail [PLACEHOLDER]",
  },
  {
    title: "FMCG, Food & Packaging",
    slug: "fmcg-packaging",
    icon: Package,
    summary:
      "High-speed bottle cap alignment, OCR label expiry verification, and specific energy reduction across high-tonnage chiller loops.",
    keyBenefit: "1,200 PPM Line Speed Inspection [PLACEHOLDER]",
  },
  {
    title: "Power Generation & Utilities",
    slug: "power-generation-utilities",
    icon: Zap,
    summary:
      "High-voltage switchgear hot-spot detection, transformer oil thermal gradient tracking, and peak-demand penalty avoidance.",
    keyBenefit: "Avoided \$350K In Unscheduled Outages [PLACEHOLDER]",
  },
  {
    title: "Electronics & Semiconductor",
    slug: "electronics-semiconductor",
    icon: Cpu,
    summary:
      "Surface mount technology (SMT) solder joint defect verification, reflow oven thermal profiling, and component placement checks.",
    keyBenefit: "99.99% First-Pass Yield [PLACEHOLDER]",
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

