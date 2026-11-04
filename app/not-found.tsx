import React from "react";
import Link from "next/link";
import { Home, Cpu, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border/80 bg-card/60 text-xs font-mono text-brand-cyan">
          ERROR 404 &middot; SIGNAL LOST
        </div>

        <p className="text-7xl sm:text-8xl font-extrabold tracking-tighter text-brand-gradient">
          404
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          The route or document you requested does not exist or has been moved.
          Use the links below to navigate back to MEX Automation.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/60 hover:bg-muted/80 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors"
          >
            <Cpu className="w-4 h-4 text-brand-cyan" />
            Explore Products
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/60 hover:bg-muted/80 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors"
          >
            <Mail className="w-4 h-4 text-brand-magenta" />
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}

