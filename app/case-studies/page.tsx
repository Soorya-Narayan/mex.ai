import type { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/content";
import { ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore how Indian manufacturers use MEX Automation's thermal intelligence, vision systems, and energy management to reduce downtime and costs.",
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-16 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-brand-magenta/25 via-brand-blue/25 to-brand-cyan/25 rounded-full blur-[110px]" />
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
            <span className="text-foreground">Case Studies</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4">
              Field Proven Impact
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Measured Outcomes on the{" "}
              <span className="text-brand-gradient">Shop Floor</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every MEX deployment is benchmarked against clear operational
              metrics — energy reduction, defect elimination, and unplanned
              downtime prevention.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group glow-card rounded-2xl border border-border/60 bg-card/40 p-8 flex flex-col justify-between transition-all hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-magenta/10 text-brand-magenta border border-brand-magenta/30">
                        {cs.frontmatter.industry}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {cs.frontmatter.client}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground group-hover:text-brand-cyan transition-colors mb-3">
                      {cs.frontmatter.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {cs.frontmatter.challenge}
                    </p>

                    <div className="space-y-2 mb-6 border-t border-border/40 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Key Results
                      </p>
                      {cs.frontmatter.results.slice(0, 3).map((res, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan group-hover:gap-2.5 transition-all">
                    Read full case study <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Deployment Case Studies Coming Soon
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                We are currently compiling verified production data and client-approved
                metrics across our dairy and food processing deployments — covering
                high-speed vision counting, round-the-clock temperature monitoring,
                PLC data logging, and virtual commissioning. Contact our engineering team
                to request a private technical briefing or live demonstration.
              </p>
              <Link
                href="/contact?interest=request-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity"
              >
                Request a Technical Briefing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
