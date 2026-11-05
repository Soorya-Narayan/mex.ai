import type { Metadata } from "next";
import Link from "next/link";
import { getAllCareers } from "@/lib/content";
import {
  ChevronRight,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join MEX Automation and build industrial AI, computer vision, and automation systems deployed across Indian manufacturing plants.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  const roles = getAllCareers();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-16 border-b border-border/40 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Careers</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4">
              Careers at MEX
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Build Systems That Run{" "}
              <span className="text-brand-gradient">Real Factories</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We look for engineers who love bridging software and the physical
              world — from embedded edge inference and PLC protocols to
              physics-informed machine learning.
            </p>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 border-b border-border/40">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Open Roles ({roles.length})
          </h2>

          {roles.length === 0 ? (
            <div className="rounded-2xl border border-border/60 bg-card/30 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                There are no specific role listings published right now, but we
                are always interested in meeting exceptional industrial
                automation, embedded systems, and machine-learning engineers.
                Submit a general application below.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {roles.map((role) => {
                const r = role.frontmatter;
                return (
                  <article
                    key={role.slug}
                    className="glow-card rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                          {r.department}
                        </span>
                        <h3 className="text-2xl font-bold text-foreground mt-1">
                          {r.title}
                        </h3>
                      </div>
                      <a
                        href="#apply-form"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity"
                      >
                        Apply for Role <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/60 bg-background">
                        <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                        {r.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/60 bg-background">
                        <Briefcase className="w-3.5 h-3.5 text-brand-magenta" />
                        {r.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/60 bg-background">
                        <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                        {r.experience}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                      {r.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border/40">
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-3">
                          Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {r.responsibilities.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground mb-3">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {r.requirements.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="w-4 h-4 text-brand-magenta flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* General Application Form */}
      <section id="apply-form" className="py-20 scroll-mt-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Submit Your Application
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Don&apos;t see an exact fit? Send your profile below or email your
              CV directly to{" "}
              <a
                href="mailto:sales@mexautomation.in"
                className="font-mono text-brand-cyan hover:underline"
              >
                sales@mexautomation.in
              </a>
              .
            </p>

            <form action="/contact" method="get" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="career-name"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="career-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Priya Nair"
                    className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  />
                </div>
                <div>
                  <label
                    htmlFor="career-email"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="career-email"
                    name="email"
                    type="email"
                    required
                    placeholder="priya@example.com"
                    className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="career-role"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Role Applying For *
                  </label>
                  <select
                    id="career-role"
                    name="role"
                    className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  >
                    {roles.map((r) => (
                      <option key={r.slug} value={r.frontmatter.title}>
                        {r.frontmatter.title}
                      </option>
                    ))}
                    <option value="General Application">
                      General Application
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="career-resume"
                    className="block text-xs font-semibold text-foreground mb-1.5"
                  >
                    Resume / LinkedIn / GitHub URL *
                  </label>
                  <input
                    id="career-resume"
                    name="resumeUrl"
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/..."
                    className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="career-note"
                  className="block text-xs font-semibold text-foreground mb-1.5"
                >
                  Brief Note on Your Experience
                </label>
                <textarea
                  id="career-note"
                  name="note"
                  rows={4}
                  placeholder="Tell us about a challenging industrial or AI system you've built or commissioned..."
                  className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                />
              </div>

              <input type="hidden" name="interest" value="general-inquiry" />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-8 py-4 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
              >
                Continue to Application Submission{" "}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

