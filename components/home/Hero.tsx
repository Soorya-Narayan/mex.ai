import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Zap, Activity } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Ambient Glow & Wave Motif echoing logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-brand-magenta/15 via-brand-blue/15 to-brand-cyan/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Subtle Logo Ribbon Motif in SVG background */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-20 dark:opacity-25 flex items-center justify-center">
        <svg
          viewBox="0 0 1000 550"
          className="w-full max-w-5xl h-auto animate-ribbon-wave"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 120 400 C 180 200, 320 180, 420 320 C 500 450, 620 450, 720 250 C 780 150, 880 280, 920 420"
            stroke="url(#heroRibbonGrad)"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <circle cx="830" cy="130" r="32" fill="#12EEF5" />
          <defs>
            <linearGradient id="heroRibbonGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#E81CE6" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#8A0CF0" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#1A2BDB" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#1FA9F0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#12EEF5" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
            Autonomous Precision.{" "}
            <span className="text-brand-gradient">Zero Downtime.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            MEX Automation builds edge-deployed vision AI counting systems, wireless temperature and PLC data loggers, industrial energy dashboards, and virtual commissioning tools for Indian dairy, food processing, and energy plants.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <Link
              href="/contact?interest=request-demo"
              className="w-full sm:w-auto relative group overflow-hidden rounded-xl p-[1px] focus-visible:ring-2 focus-visible:ring-brand-cyan shadow-xl shadow-brand-blue/20"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-magenta via-brand-blue to-brand-cyan transition-all duration-300 group-hover:scale-105" />
              <span className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-[11px] bg-background text-foreground font-bold text-base transition-colors group-hover:bg-background/90">
                Request a Live Demo
                <ArrowRight className="w-5 h-5 text-brand-cyan group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/products"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border/80 bg-card/60 backdrop-blur-md hover:bg-muted/80 text-foreground font-semibold text-base transition-all focus-visible:ring-2 focus-visible:ring-brand-cyan"
            >
              Explore Products
            </Link>
          </div>

          {/* Key Stats Bar / Trust Indicators — gated behind SITE_CONFIG.showVerifiedCustomerData */}
          {SITE_CONFIG.showVerifiedCustomerData && (
            <div className="mt-16 pt-10 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="p-4 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-cyan mb-1 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5" />
                  Edge Latency
                </div>
                <div className="text-2xl font-bold text-foreground">
                  &lt; 12ms
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Local deterministic closed-loop inference
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-magenta mb-1 uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" />
                  Thermal Sensitivity
                </div>
                <div className="text-2xl font-bold text-foreground">0.05°C</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Micro-bolometer continuous monitoring
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  Energy Reduction
                </div>
                <div className="text-2xl font-bold text-foreground">
                  Up to 28%
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Specific energy consumption optimization
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue mb-1 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Rugged Architecture
                </div>
                <div className="text-2xl font-bold text-foreground">
                  IP67 Edge
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Built for high ambient heat &amp; dust
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

