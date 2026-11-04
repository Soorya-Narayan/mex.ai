import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, FileText } from "lucide-react";

export function CtaBand() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[380px] bg-gradient-to-r from-brand-magenta/10 via-brand-blue/15 to-brand-cyan/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-10 sm:p-16 lg:p-20 text-center overflow-hidden shadow-2xl">
          {/* Subtle gradient accent along top border */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-magenta via-brand-blue to-brand-cyan" />

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan">
              Ready for Turnkey Modernization?
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Deploy Proven Industrial AI on Your Lines This Quarter.
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Schedule an on-site feasibility walk or connect with a MEX application engineer to discuss pilot deployment on your high-risk assets.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?interest=request-demo"
                className="w-full sm:w-auto relative group overflow-hidden rounded-xl p-[1px] focus-visible:ring-2 focus-visible:ring-brand-cyan shadow-xl shadow-brand-blue/25"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-magenta via-brand-blue to-brand-cyan transition-all group-hover:scale-105" />
                <span className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-[11px] bg-background text-foreground font-bold text-base transition-colors group-hover:bg-background/90">
                  <PhoneCall className="w-4 h-4 text-brand-cyan" />
                  Schedule Technical Discovery
                  <ArrowRight className="w-4 h-4 text-brand-cyan group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/contact?interest=catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border/80 bg-background/60 hover:bg-muted text-foreground font-semibold text-base transition-all"
              >
                <FileText className="w-4 h-4 text-muted-foreground" />
                Request Technical Specifications (PDF)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

