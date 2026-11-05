import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudy, getAllCaseStudies } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import { JsonLd, getBreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.frontmatter.title,
    description: cs.frontmatter.challenge.slice(0, 150),
    alternates: {
      canonical: `/case-studies/${cs.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const { frontmatter, content } = cs;

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <main className="min-h-screen">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: frontmatter.title, path: `/case-studies/${cs.slug}` },
        ])}
      />
      {/* Hero */}
      <section className="relative pt-20 pb-16 border-b border-border/40 overflow-hidden">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/case-studies"
              className="hover:text-foreground transition-colors"
            >
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{frontmatter.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full border border-brand-magenta/30 bg-brand-magenta/10 px-3 py-1 text-xs font-semibold text-brand-magenta">
              {frontmatter.industry}
            </span>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Client:</strong>{" "}
            {frontmatter.client}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Main Column */}
            <div className="lg:col-span-7 space-y-10">
              <div className="p-6 rounded-2xl border border-border/60 bg-card/30">
                <h2 className="text-lg font-bold text-brand-cyan mb-2">
                  The Challenge
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {frontmatter.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/60 bg-card/30">
                <h2 className="text-lg font-bold text-brand-cyan mb-2">
                  MEX Solution
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {frontmatter.solution}
                </p>
              </div>

              <div>
                <MdxContent content={content} />
              </div>
            </div>

            {/* Results Sidebar */}
            <aside className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Measured Results
                </h2>
                <div className="space-y-3">
                  {frontmatter.results.map((result, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl border border-brand-cyan/25 bg-brand-cyan/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground">
                        {result}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border/40">
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Facing a similar operational challenge?
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Book a scoping call with our application engineers.
                  </p>
                  <Link
                    href="/contact?interest=request-demo"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
                  >
                    Request a Demo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
