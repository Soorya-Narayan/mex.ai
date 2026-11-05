import type { Metadata } from "next";
import Link from "next/link";
import { getAllInsights, readingTime } from "@/lib/content";
import { ChevronRight, ArrowRight, Clock, Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights & Engineering Blog",
  description:
    "Technical articles on physics-informed AI, industrial thermal monitoring, machine vision, and ISO 50001 energy management from MEX Automation.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsPage() {
  const posts = getAllInsights();

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
            <span className="text-foreground">Insights</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4">
              Engineering & Operations Blog
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Field Notes on{" "}
              <span className="text-brand-gradient">Industrial AI</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Deep dives into vision counting, round-the-clock temperature
              monitoring, PLC data logging, and virtual commissioning for
              Indian dairy and food processing plants.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => {
                const p = post.frontmatter;
                const mins = readingTime(post.content);
                const formattedDate = new Date(p.date).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                  <Link
                    key={post.slug}
                    href={`/insights/${post.slug}`}
                    className="group glow-card rounded-2xl border border-border/60 bg-card/40 p-8 flex flex-col justify-between transition-all hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-2xl font-bold text-foreground group-hover:text-brand-cyan transition-colors mb-3 leading-snug">
                        {p.title}
                      </h2>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {p.excerpt}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border/40 pt-4 mb-4">
                        <span className="inline-flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-brand-cyan" />
                          {p.author}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-brand-magenta" />
                          {formattedDate}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                          {mins} min read
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan group-hover:gap-2.5 transition-all">
                        Read article <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/60 bg-card/40 p-10 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Engineering Articles Coming Soon
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Our engineering team is preparing practical field notes and technical
                deep dives on conveyor vision counting, continuous temperature
                monitoring, PLC data logging, and virtual commissioning for dairy and
                food processing operations.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity"
              >
                Speak With Our Engineering Team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

