import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Utensils,
  Zap,
  Cpu,
} from "lucide-react";
import { getAllProducts, resolveProductCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "MEX Automation builds vision counting, temperature monitoring, PLC data logging, energy dashboards, and virtual commissioning systems for dairy & food processing and energy systems.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  const allProducts = getAllProducts();

  // Group products dynamically from MDX frontmatter so future product edits need no code changes
  const dairyProducts = allProducts.filter((p) => {
    const text = `${p.frontmatter.tagline} ${p.frontmatter.overview} ${p.frontmatter.useCases.join(" ")}`.toLowerCase();
    return (
      text.includes("dairy") ||
      text.includes("milk") ||
      text.includes("pasteur") ||
      text.includes("pouch") ||
      text.includes("bottle")
    );
  });

  const energyProducts = allProducts.filter((p) => {
    const text = `${p.frontmatter.tagline} ${p.frontmatter.overview} ${p.frontmatter.useCases.join(" ")}`.toLowerCase();
    return (
      text.includes("energy") ||
      text.includes("solar") ||
      resolveProductCategory(p.frontmatter) === "Monitoring & Data"
    );
  });

  const simulationAndVisionProducts = allProducts.filter((p) => {
    const cat = resolveProductCategory(p.frontmatter);
    return cat === "Simulation" || cat === "Vision AI";
  });

  const industries = [
    {
      id: "dairy-food",
      badge: "Primary Sector",
      icon: Utensils,
      title: "Dairy & Food Processing",
      keyBenefit:
        "Vision pouch and bottle counting on packing conveyors, pasteuriser and cold-room temperature monitoring, PLC data logging, and virtual skid commissioning.",
      description:
        "Dairy and food processing plants run continuous pasteurisation, chilling, cold storage, and high-speed pouch and bottle packing lines. MEX systems count milk pouches in crates and bottles on conveyors in real time, monitor RTD temperature channels with local alarms and audit-ready exports, log PLC process tags second by second, and simulate pasteuriser and batch mixing skids for virtual commissioning.",
      products: dairyProducts.length > 0 ? dairyProducts : allProducts,
    },
    {
      id: "energy",
      badge: "Primary Sector",
      icon: Zap,
      title: "Energy & Solar Monitoring",
      keyBenefit:
        "Real-time visibility across solar generation, grid supply, battery storage, and plant loads.",
      description:
        "Facilities running solar, hybrid, and grid power systems need a clear view of power flow, inverter MPPT status, battery state of charge, grid frequency, and load consumption. MEX builds real-time dashboards and data logging pipelines that connect to existing gateways, historians, or REST APIs and export PDF, Excel, and CSV reports in one click.",
      products: energyProducts.length > 0 ? energyProducts : allProducts,
    },
    {
      id: "capabilities",
      badge: "Capabilities",
      icon: Cpu,
      title: "Process OEMs, Skids & Packaging Lines (Capabilities)",
      keyBenefit:
        "Adaptable computer vision, PLC data acquisition, and OPC UA virtual commissioning for broader industrial lines.",
      description:
        "Beyond dairy and energy, our core engineering capabilities apply to process equipment OEMs, system integrators, and packaging lines: custom-trained YOLO detection and segmentation models for container counting, modular PLC tag logging with automatic shift reports, and deterministic hardware-in-the-loop simulation for Factory Acceptance Testing (FAT) over OPC UA.",
      products:
        simulationAndVisionProducts.length > 0
          ? simulationAndVisionProducts
          : allProducts,
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-16 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gradient-to-r from-brand-magenta/25 via-brand-blue/25 to-brand-cyan/25 rounded-full blur-[110px]" />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Industries</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4">
              Sectors &amp; Capabilities
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Built for{" "}
              <span className="text-brand-gradient">
                Dairy, Food Processing &amp; Energy
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our deployed work focuses on dairy and food processing plants and
              real-time energy monitoring, backed by adaptable vision AI, edge
              data logging, and virtual commissioning capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Industry sections */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <article
                key={industry.id}
                id={industry.id}
                className="glow-card rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8 scroll-mt-24"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl border border-brand-cyan/30 bg-brand-cyan/10 flex items-center justify-center text-brand-cyan flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {industry.title}
                      </h2>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-border/80 bg-background/80 text-muted-foreground">
                        {industry.badge}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-brand-cyan mb-4">
                      {industry.keyBenefit}
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {industry.description}
                    </p>
                  </div>

                  <div className="md:w-72 flex-shrink-0 pt-2 md:pt-0 md:border-l md:border-border/40 md:pl-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Relevant MEX Products
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {industry.products.map((product) => (
                        <li key={product.slug}>
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-block rounded-lg border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand-cyan hover:text-brand-cyan transition-colors"
                          >
                            {product.frontmatter.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/60 bg-card/40 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Have a dairy, food processing, or energy monitoring requirement?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Our engineers can assess your conveyor line, PLC setup, or energy
              data sources and recommend the right configuration.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-8 py-4 font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              Speak With an Engineer <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
