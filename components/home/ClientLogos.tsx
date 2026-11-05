import React from "react";
import { Factory, Shield, Cpu, Gauge, Zap, Boxes } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

// TODO: Populate with verified customer logos and written consent before setting SITE_CONFIG.showVerifiedCustomerData = true
const verifiedClients = [
  { name: "Automotive OEM Partner", tag: "Automotive Stamping", icon: Factory },
  { name: "Steel & Alloy Partner", tag: "Continuous Casting", icon: Shield },
  { name: "Pharma Manufacturing Partner", tag: "Cleanroom Packaging", icon: Boxes },
  { name: "Precision Engineering Partner", tag: "High-Tolerance Machining", icon: Gauge },
  { name: "Power Utility Partner", tag: "Substation Monitoring", icon: Zap },
  { name: "Electronics Manufacturing Partner", tag: "SMT & Assembly", icon: Cpu },
];

export function ClientLogos() {
  if (!SITE_CONFIG.showVerifiedCustomerData) {
    return null;
  }

  return (
    <section className="py-12 border-y border-border/40 bg-card/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by Industrial Manufacturing Leaders Across India
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {verifiedClients.map((client, idx) => {
            const Icon = client.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/40 bg-background/50 hover:border-brand-cyan/40 transition-colors text-center group"
              >
                <Icon className="w-8 h-8 text-muted-foreground group-hover:text-brand-cyan transition-colors mb-2" />
                <span className="text-sm font-semibold text-foreground/90 group-hover:text-foreground">
                  {client.name}
                </span>
                <span className="text-[10px] text-muted-foreground tracking-tight">
                  {client.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
