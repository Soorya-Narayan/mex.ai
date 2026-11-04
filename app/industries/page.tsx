import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "MEX Automation delivers industrial intelligence across cement, steel, automotive, food & beverage, pharma, and oil & gas sectors in India.",
  alternates: {
    canonical: "/industries",
  },
};

interface Industry {
  id: string;
  emoji: string;
  title: string;
  description: string;
  products: { name: string; href: string }[];
  keyBenefit: string;
}

const industries: Industry[] = [
  {
    id: "cement",
    emoji: "🏗️",
    title: "Cement & Building Materials",
    description:
      "Cement plants operate under extreme heat, dust, and continuous-process constraints that demand real-time visibility across kilns, mills, and conveyors. MEX solutions monitor thermal profiles, detect equipment anomalies early, and unify plant-wide energy data to reduce per-tonne clinker costs.",
    products: [
      { name: "HeatWatch", href: "/products/heatwatch" },
      { name: "Digital Twin", href: "/products/digital-twin" },
      {
        name: "Energy Monitoring Systems (EMS)",
        href: "/products/energy-monitoring-systems",
      },
      { name: "Data Logger", href: "/products/data-logger" },
    ],
    keyBenefit:
      "Detect rotary kiln and cooler hot-spots early and reduce specific energy consumption.",
  },
  {
    id: "steel",
    emoji: "⚙️",
    title: "Steel & Metals",
    description:
      "Steel and metals manufacturing involves high-temperature furnaces, rolling mills, and complex metallurgical processes where quality deviations are costly and safety-critical. MEX thermal imaging and digital twin platforms provide continuous furnace monitoring, slab-temperature tracking, and surface defect inspection.",
    products: [
      { name: "HeatWatch", href: "/products/heatwatch" },
      { name: "Digital Twin", href: "/products/digital-twin" },
      { name: "Vision Systems", href: "/products/vision-systems" },
      {
        name: "Energy Monitoring Systems (EMS)",
        href: "/products/energy-monitoring-systems",
      },
    ],
    keyBenefit:
      "Maintain consistent slab temperatures and catch surface defects inline before downstream rolling.",
  },
  {
    id: "automotive",
    emoji: "🚗",
    title: "Automotive & Auto Components",
    description:
      "Automotive assembly and Tier-1 component manufacturing demand zero-defect quality at high throughput. MEX Vision Systems perform automated surface inspection, weld verification, and dimensional checking on lines where manual inspection cannot keep pace.",
    products: [
      { name: "Vision Systems", href: "/products/vision-systems" },
      { name: "Dashboards", href: "/products/dashboards" },
      { name: "Digital Twin", href: "/products/digital-twin" },
      { name: "Data Logger", href: "/products/data-logger" },
    ],
    keyBenefit:
      "Catch stamping, casting, and weld defects at line speed before dispatch.",
  },
  {
    id: "food-beverage",
    emoji: "🥤",
    title: "Food & Beverage",
    description:
      "Food and beverage plants must balance regulatory compliance, shelf-life consistency, and high-speed packaging with minimal wastage. MEX temperature monitoring and vision systems ensure cold-chain integrity, verify labels and seals, and log process parameters for audit trails.",
    products: [
      { name: "HeatWatch", href: "/products/heatwatch" },
      { name: "Vision Systems", href: "/products/vision-systems" },
      {
        name: "Energy Monitoring Systems (EMS)",
        href: "/products/energy-monitoring-systems",
      },
      { name: "Data Logger", href: "/products/data-logger" },
    ],
    keyBenefit:
      "Maintain cold-chain integrity and produce continuous digital audit trails for compliance.",
  },
  {
    id: "pharma",
    emoji: "💊",
    title: "Pharmaceuticals & Life Sciences",
    description:
      "Pharmaceutical manufacturing operates under stringent GMP and regulatory requirements where every process parameter must be recorded and traceable. MEX Data Loggers and Dashboards provide high-integrity data capture for temperature, humidity, and critical process variables across formulation and packaging lines.",
    products: [
      { name: "Data Logger", href: "/products/data-logger" },
      { name: "Dashboards", href: "/products/dashboards" },
      { name: "Vision Systems", href: "/products/vision-systems" },
      {
        name: "Energy Monitoring Systems (EMS)",
        href: "/products/energy-monitoring-systems",
      },
    ],
    keyBenefit:
      "Achieve end-to-end batch traceability and audit-ready environmental logs across every line.",
  },
  {
    id: "oil-gas",
    emoji: "🛢️",
    title: "Oil, Gas & Petrochemicals",
    description:
      "Refineries and chemical complexes involve continuous operations where equipment failure carries both safety and financial consequences. MEX thermal surveillance detects hot-spots on switchgear, pipe joints, and rotating equipment, while physics-informed digital twins model compressor and pump health.",
    products: [
      { name: "HeatWatch", href: "/products/heatwatch" },
      { name: "Digital Twin", href: "/products/digital-twin" },
      {
        name: "Energy Monitoring Systems (EMS)",
        href: "/products/energy-monitoring-systems",
      },
      { name: "Data Logger", href: "/products/data-logger" },
    ],
    keyBenefit:
      "Spot equipment hot-spots and rotating asset degradation early with edge-deployed AI.",
  },
];

export default function IndustriesPage() {
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
              Sectors We Serve
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Industrial Intelligence{" "}
              <span className="text-brand-gradient">Across Every Sector</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MEX Automation systems are engineered for the dust, ambient heat,
              legacy protocols, and continuous-process demands of Indian heavy
              and discrete manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Industry sections */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          {industries.map((industry) => (
            <article
              key={industry.id}
              id={industry.id}
              className="glow-card rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8 scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3.5 mb-3">
                    <span
                      className="text-3xl"
                      role="img"
                      aria-label={industry.title}
                    >
                      {industry.emoji}
                    </span>
                    <h2 className="text-2xl font-bold text-foreground">
                      {industry.title}
                    </h2>
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
                    Applicable MEX Products
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {industry.products.map((product) => (
                      <li key={product.href}>
                        <Link
                          href={product.href}
                          className="inline-block rounded-lg border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand-cyan hover:text-brand-cyan transition-colors"
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/60 bg-card/40 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Operating a specialized process plant?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Our hardware and edge-AI pipelines adapt to custom machinery,
              legacy PLCs, and bespoke inspection criteria.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-8 py-4 font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              Speak With an Application Engineer{" "}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
