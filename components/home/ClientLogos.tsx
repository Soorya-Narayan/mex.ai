import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";

// Keep behind SITE_CONFIG.showVerifiedCustomerData (default: false) until client permissions and logos are approved.
const clients = [
  "Milma (Kottayam)",
  "Muralya Dairy (Thiruvananthapuram)",
  "Anik Dairy (Bhopal)",
  "Zoladyne (Coimbatore)",
  "Lactalis (Navi Mumbai)",
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
            Trusted by
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
          {clients.map((client) => (
            <div
              key={client}
              className="flex items-center justify-center px-4 py-3.5 rounded-xl border border-border/40 bg-background/50 text-center"
            >
              <span className="text-sm font-semibold text-foreground/90">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
