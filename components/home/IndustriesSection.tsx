import React from "react";
import Link from "next/link";
import { Utensils, Zap, Cpu, ArrowRight } from "lucide-react";

export const industries = [
  {
    title: "Dairy & Food Processing",
    slug: "dairy-food",
    badge: "Primary Sector",
    icon: Utensils,
    summary:
      "Vision-based crate & pouch counting and bottle counting on packing lines, round-the-clock RTD temperature monitoring for pasteurisers and cold rooms, and 1-second PLC process data logging.",
    keyBenefit: "Packing Line Vision AI & Process Telemetry",
  },
  {
    title: "Energy & Solar Monitoring",
    slug: "energy",
    badge: "Primary Sector",
    icon: Zap,
    summary:
      "Real-time energy dashboards tracking solar generation, inverter MPPT status, grid quality, battery state of charge, and load consumption with one-click reports.",
    keyBenefit: "Solar, Grid, Battery & Load Visibility",
  },
  {
    title: "Process Skids & Virtual Commissioning",
    slug: "capabilities",
    badge: "Capabilities",
    icon: Cpu,
    summary:
      "Deterministic 100 ms process skid simulation over OPC UA for testing PLC logic, safety interlocks, fault injection, and automated Factory Acceptance Tests before reaching site.",
    keyBenefit: "Offline & Hardware-in-the-Loop FAT",
  },
];

export function IndustriesSection() {
  return (
    <section className="py-20 md:py-28 bg-card/30 border-y border-border/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-3">
              Sectors &amp; Capabilities
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Focused on Dairy, Food Processing &amp; Energy
            </h2>
          </div>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:underline"
          >
            Explore Sectors &amp; Capabilities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.slug}
                className="p-7 rounded-2xl border border-border/60 bg-background/60 hover:bg-background hover:border-brand-blue/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-brand-cyan" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground">
                      {ind.badge}
                    </span>
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
