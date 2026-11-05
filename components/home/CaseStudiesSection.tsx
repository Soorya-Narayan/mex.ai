import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { getAllCaseStudies } from "@/lib/content";
import { SITE_CONFIG } from "@/lib/site-config";

export function CaseStudiesSection() {
  const publishedStudies = getAllCaseStudies();

  if (!SITE_CONFIG.showVerifiedCustomerData || publishedStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-card/20 border-y border-border/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-3">
              Proven Field Impact
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Real Shopfloors. Quantified Returns.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:underline"
          >
            Read All Field Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {publishedStudies.slice(0, 2).map((study) => (
            <div
              key={study.slug}
              className="p-8 rounded-2xl border border-border/70 bg-background/80 hover:border-brand-blue/60 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="font-semibold text-brand-cyan uppercase tracking-wider">
                    {study.frontmatter.client}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-6 group-hover:text-brand-cyan transition-colors">
                  {study.frontmatter.title}
                </h3>

                <div className="space-y-4 mb-8 text-sm">
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/40">
                    <div className="flex items-center gap-2 text-xs font-semibold text-destructive mb-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      The Challenge
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {study.frontmatter.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border/40">
                    <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      The MEX Solution
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {study.frontmatter.solution}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/60">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold text-foreground transition-colors"
                >
                  Read Full Architecture &amp; Implementation
                  <ArrowRight className="w-4 h-4 text-brand-cyan" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
