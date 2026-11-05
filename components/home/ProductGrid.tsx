import React from "react";
import Link from "next/link";
import {
  Flame,
  Layers,
  Eye,
  Zap,
  HardDrive,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const homeProducts = [
  {
    slug: "heatwatch",
    name: "HeatWatch",
    tagline: "Continuous Industrial Thermal Profiling",
    description:
      "Real-time non-contact radiometric thermal imaging and autonomous hotspot containment for critical furnaces, boilers, switchgear, and refractory linings.",
    icon: Flame,
    color: "text-amber-500",
    gradient: "from-amber-500/20 to-brand-magenta/20",
    borderHover: "group-hover:border-amber-500/50",
    features: [
      "Sub-degree thermal resolution (0.05°C)",
      "Automated alarm trigger with PLC cut-off",
      "High-ambient rugged housing (up to 75°C ambient)",
    ],
    categoryBadge: "Thermal Intelligence",
  },
  {
    slug: "digital-twin",
    name: "Digital Twin",
    tagline: "Physics-Informed Real-Time Virtualization",
    description:
      "Dynamic computational models synchronized with real-time shop-floor sensors to simulate operational stress, test parameter tweaks, and forecast mechanical failures.",
    icon: Layers,
    color: "text-brand-blue",
    gradient: "from-brand-blue/20 to-brand-cyan/20",
    borderHover: "group-hover:border-brand-blue/50",
    features: [
      "Bi-directional SCADA & PLC data binding",
      "Stress & wear simulation under varying load",
      "Synthetic sensor prediction for inaccessible zones",
    ],
    categoryBadge: "Physics-Informed AI",
  },
  {
    slug: "vision-systems",
    name: "Vision Systems",
    tagline: "Sub-Millimeter Automated Quality Inspection",
    description:
      "High-speed line-scan and area-scan computer vision deployed on edge NPUs to detect micro-cracks, dimensional deviations, and surface blemishes at line speed.",
    icon: Eye,
    color: "text-brand-cyan",
    gradient: "from-brand-cyan/20 to-brand-blue/20",
    borderHover: "group-hover:border-brand-cyan/50",
    features: [
      "Sub-millimeter dimensional verification",
      "High-speed inline throughput capacity",
      "Pneumatic reject arm synchronization",
    ],
    categoryBadge: "Machine Vision",
  },
  {
    slug: "energy-monitoring-systems",
    name: "Energy Monitoring (EMS)",
    tagline: "ISO 50001 Plant-Wide Telemetry",
    description:
      "Granular energy analytics tracking power factor, specific energy consumption per product unit, harmonics, and peak demand charges across motors, compressors, and chillers.",
    icon: Zap,
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-brand-sky/20",
    borderHover: "group-hover:border-emerald-500/50",
    features: [
      "Real-time Specific Energy Consumption (SEC) tracking",
      "Automated peak-shaving and tariff alerts",
      "Comprehensive carbon footprint & ESG reporting",
    ],
    categoryBadge: "ISO 50001 EMS",
  },
  {
    slug: "data-logger",
    name: "Data Logger",
    tagline: "Rugged Industrial Edge Telemetry Gateways",
    description:
      "Industrial multi-protocol edge data loggers supporting Modbus, Profinet, Ethernet/IP, and OPC-UA with onboard storage buffering to prevent telemetry drops during line brownouts.",
    icon: HardDrive,
    color: "text-indigo-400",
    gradient: "from-indigo-500/20 to-brand-violet/20",
    borderHover: "group-hover:border-indigo-500/50",
    features: [
      "Zero-loss edge buffering during network outages",
      "Multi-bus support: Modbus RTU/TCP, CANopen, MQTT",
      "DIN-rail mountable with IP65/67 options",
    ],
    categoryBadge: "Edge Acquisition",
  },
  {
    slug: "dashboards",
    name: "Dashboards",
    tagline: "Unified Plant OEE & Control Center",
    description:
      "High-throughput visualization suite synthesizing telemetry from thousands of shopfloor nodes into clean role-tailored dashboards for shift operators and plant leadership.",
    icon: LayoutDashboard,
    color: "text-brand-magenta",
    gradient: "from-brand-magenta/20 to-brand-violet/20",
    borderHover: "group-hover:border-brand-magenta/50",
    features: [
      "Real-time Overall Equipment Effectiveness (OEE)",
      "Role-based views: C-suite, maintenance, operations",
      "Configurable WhatsApp & SMS alarm routing",
    ],
    categoryBadge: "Unified Operations",
  },
];

export function ProductGrid() {
  return (
    <section className="py-20 md:py-28 bg-background relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-3">
            Core Technology Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Engineered for Harsh Environments. Designed for Autonomy.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every MEX solution is built from the ground up to integrate seamlessly with existing legacy PLCs, sensors, and production line machinery without disruptive overhauls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homeProducts.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.slug}
                className={`group relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 ${product.borderHover} flex flex-col justify-between`}
              >
                <div>
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} border border-border flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${product.color}`} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-md">
                      {product.categoryBadge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-cyan transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-xs font-semibold text-brand-cyan mb-3">
                    {product.tagline}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <ul className="space-y-2 mb-8 pt-4 border-t border-border/40">
                    {product.features.map((feature, i) => (
                      <li key={i} className="text-xs text-foreground/80 flex items-start gap-2">
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
                  Explore Specifications & Architecture
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
            Compare All Products & Technical Specifications
            <ArrowRight className="w-4 h-4 text-brand-cyan" />
          </Link>
        </div>
      </div>
    </section>
  );
}

