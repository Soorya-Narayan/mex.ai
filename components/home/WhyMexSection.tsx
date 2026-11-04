import React from "react";
import { Shield, Cpu, RefreshCw, Wrench } from "lucide-react";

const pillars = [
  {
    title: "Edge-Native Determinism",
    description:
      "All AI model inference, defect categorization, and emergency PLC trips happen locally on IP67 field controllers. Your production line never halts due to internet lag or cloud outages.",
    icon: Cpu,
  },
  {
    title: "Built for Indian Factory Floors",
    description:
      "Engineered to withstand unconditioned ambient temperatures up to 75°C, airborne conductive dust, and high line voltage fluctuations common in domestic manufacturing hubs.",
    icon: Shield,
  },
  {
    title: "Non-Invasive Retrofitting",
    description:
      "Zero rip-and-replace. We integrate with your existing Siemens, Rockwell, Schneider, or Mitsubishi PLCs via native industrial fieldbuses (OPC-UA, Modbus, Profinet).",
    icon: RefreshCw,
  },
  {
    title: "Direct Domestic Support",
    description:
      "Local field application engineers based across industrial corridors in Maharashtra, Karnataka, Gujarat, and Tamil Nadu for swift on-site commissioning and turnkey SLAs.",
    icon: Wrench,
  },
];

export function WhyMexSection() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-3">
              Why MEX Automation
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.15]">
              Industrial Intelligence Without the Cloud Vulnerability.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Generic IoT platforms fail on the heavy manufacturing floor. MEX combines hardened edge electronics, high-speed machine vision, and physics-driven digital twins into unified production safeguards.
            </p>

            {/* Stat callout card */}
            <div className="p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md space-y-4">
              <div className="text-3xl font-extrabold text-brand-gradient">
                99.99% Field Uptime <span className="text-xs font-normal text-muted-foreground block">[PLACEHOLDER]</span>
              </div>
              <p className="text-xs text-muted-foreground leading-normal">
                Validated across 50,000+ continuous operating hours across automotive stamping, steel casting, and thermal packaging lines [PLACEHOLDER].
              </p>
            </div>
          </div>

          {/* Right Column: 4 Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-border/60 bg-card/40 hover:border-brand-cyan/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

