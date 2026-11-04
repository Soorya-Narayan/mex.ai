import React from "react";
import Link from "next/link";
import { ArrowRight, Linkedin, Calendar, Clock } from "lucide-react";

export const sampleInsights = [
  {
    slug: "edge-vs-cloud-manufacturing",
    title: "Why Edge AI Outperforms Cloud Architectures in High-Speed Stamping [PLACEHOLDER]",
    excerpt:
      "A deep dive into jitter, round-trip network delays, and why 10ms deterministic cycles require on-premise neural accelerator silicon.",
    date: "Oct 24, 2026",
    readingTime: "5 min read",
    category: "Architecture",
  },
  {
    slug: "iso-50001-energy-telemetry",
    title: "Closing the Gap on Specific Energy Consumption: An ISO 50001 Guide [PLACEHOLDER]",
    excerpt:
      "How synchronized sub-metering and variable frequency drive (VFD) harmonic analysis uncover hidden energy leakage across motor banks.",
    date: "Nov 02, 2026",
    readingTime: "7 min read",
    category: "Energy Management",
  },
];

export function InsightsTeaser() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-3">
              Engineering Notes & Analysis
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Industrial AI Perspectives
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/mexai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/80 bg-card hover:bg-muted text-xs font-semibold text-foreground transition-colors"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              Follow on LinkedIn
            </a>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:underline"
            >
              All Articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleInsights.map((insight) => (
            <Link
              key={insight.slug}
              href={`/insights/${insight.slug}`}
              className="group p-8 rounded-2xl border border-border/60 bg-card/40 hover:bg-card/80 hover:border-brand-cyan/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-muted text-foreground/80 font-semibold text-[11px]">
                    {insight.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {insight.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {insight.readingTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-cyan transition-colors">
                  {insight.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/40 inline-flex items-center gap-2 text-xs font-semibold text-brand-cyan group-hover:translate-x-1 transition-transform">
                Read Full Engineering Analysis <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

