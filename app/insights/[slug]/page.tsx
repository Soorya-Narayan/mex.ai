import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, getAllInsights, readingTime } from "@/lib/content";
import { MdxContent } from "@/components/mdx/MdxContent";
import {
  ChevronRight,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllInsights();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    alternates: {
      canonical: `/insights/${post.slug}`,
    },
  };
}

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const { frontmatter: p, content } = post;
  const mins = readingTime(content);
  const formattedDate = new Date(p.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Strip duplicate leading `# Title` line if present in MDX body
  const bodyWithoutDuplicateH1 = content
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim()
    .replace(/^#\s+.+\n+/, "");

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-14 border-b border-border/40 overflow-hidden">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/insights"
              className="hover:text-foreground transition-colors"
            >
              Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground line-clamp-1">{p.title}</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-5">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-6">
            {p.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <User className="w-4 h-4 text-brand-cyan" />
              <strong className="text-foreground">{p.author}</strong>
              {p.authorRole && <span>({p.authorRole})</span>}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-magenta" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-cyan" />
              {mins} min read
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <MdxContent content={bodyWithoutDuplicateH1} />

          {/* Follow on LinkedIn CTA */}
          <div className="mt-14 rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-foreground mb-1">
                Follow MEX Automation on LinkedIn
              </h2>
              <p className="text-sm text-muted-foreground">
                Get technical field notes, deployment stories, and product
                updates directly in your feed.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/company/mexai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow hover:opacity-90 transition-opacity flex-shrink-0"
            >
              Follow on LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-border/40">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all Insights
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

