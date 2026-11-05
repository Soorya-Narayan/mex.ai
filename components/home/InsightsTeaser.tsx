import React from "react";
import Link from "next/link";
import { ArrowRight, Linkedin, Calendar, Clock } from "lucide-react";
import { getAllInsights, readingTime } from "@/lib/content";

export function InsightsTeaser() {
  const posts = getAllInsights();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-3">
              Engineering Notes &amp; Analysis
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

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.slice(0, 2).map((post) => {
              const mins = readingTime(post.content);
              return (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group p-8 rounded-2xl border border-border/60 bg-card/40 hover:bg-card/80 hover:border-brand-cyan/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="px-2.5 py-1 rounded-md bg-muted text-foreground/80 font-semibold text-[11px]">
                        {post.frontmatter.tags[0] || "Engineering"}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.frontmatter.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {mins} min read
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-cyan transition-colors">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {post.frontmatter.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/40 inline-flex items-center gap-2 text-xs font-semibold text-brand-cyan group-hover:translate-x-1 transition-transform">
                    Read Full Engineering Analysis{" "}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-border/60 bg-card/30 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                Technical Field Notes &amp; Architecture Updates
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Our engineering team publishes technical deep dives on
                physics-informed neural networks, edge thermal monitoring, and
                ISO 50001 energy management. Follow MEX Automation on LinkedIn
                for the latest updates.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/company/mexai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-xs font-bold text-white shadow hover:opacity-90 transition-opacity shrink-0"
            >
              <Linkedin className="w-4 h-4" />
              Follow on LinkedIn
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
