import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight, Cpu, ShieldCheck, Users, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MEX Automation's mission, engineering philosophy, and team building industrial AI and automation systems for Indian manufacturing.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    icon: Cpu,
    title: "Physics-First Innovation",
    description:
      "We combine first-principles industrial engineering with edge-deployed AI so our models remain trustworthy in safety-critical environments.",
  },
  {
    icon: ShieldCheck,
    title: "Shop-Floor Reliability",
    description:
      "Every enclosure, sensor interface, and inference pipeline is built for high ambient heat, dust, electrical noise, and offline operation.",
  },
  {
    icon: Users,
    title: "Operator-Centric Design",
    description:
      "Technology only creates value when operators use it. Our interfaces are built for clarity on the control-room floor, not just the boardroom.",
  },
  {
    icon: Wrench,
    title: "Engineered for India",
    description:
      "From brown-field PLC integration to rapid local commissioning, we design around the real-world constraints and economics of Indian factories.",
  },
];

const team = [
  {
    name: "[PLACEHOLDER: Founder / CEO Name]",
    role: "[PLACEHOLDER: Co-Founder & Chief Executive Officer]",
    bio: "[PLACEHOLDER: 2–3 sentences covering background in industrial automation, education, and domain experience. To be supplied by MEX team.]",
  },
  {
    name: "[PLACEHOLDER: CTO / Head of AI Name]",
    role: "[PLACEHOLDER: Co-Founder & Chief Technology Officer]",
    bio: "[PLACEHOLDER: 2–3 sentences covering background in edge AI, computer vision, physics-informed modelling, and systems architecture.]",
  },
  {
    name: "[PLACEHOLDER: Head of Field Engineering Name]",
    role: "[PLACEHOLDER: VP, Field Operations & Commissioning]",
    bio: "[PLACEHOLDER: 2–3 sentences covering experience deploying SCADA, PLC, and instrumentation across Indian process plants.]",
  },
];

export default function AboutPage() {
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
            <span className="text-foreground">About</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4">
              About MEX Automation
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Engineering the Autonomous{" "}
              <span className="text-brand-gradient">Industrial Future</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MEX Automation builds mission-critical thermal intelligence,
              physics-informed digital twins, computer vision systems, and
              energy management platforms for Indian industry.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-20 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {/* TODO: Replace with verified founding story from MEX leadership */}
                <span className="font-mono text-xs text-brand-cyan">
                  [PLACEHOLDER — Founding Story Paragraph 1]
                </span>{" "}
                Indian manufacturing is entering a decisive decade. While global
                Industry 4.0 software often assumes pristine greenfield plants
                and cloud-first connectivity, real factories operate a mix of
                legacy controllers, harsh environments, and strict uptime
                demands.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="font-mono text-xs text-brand-cyan">
                  [PLACEHOLDER — Founding Story Paragraph 2]
                </span>{" "}
                MEX Automation was founded to close the gap between cutting-edge
                industrial AI and practical shop-floor engineering — combining
                edge-deployed hardware with physics-informed models that work
                reliably from day one.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="font-mono text-xs text-brand-cyan">
                  [PLACEHOLDER — Founding Story Paragraph 3]
                </span>{" "}
                Today, our six-product platform helps process and discrete
                manufacturers detect thermal anomalies early, eliminate quality
                escape, optimize specific energy consumption, and unify plant
                telemetry.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="glow-card rounded-2xl border border-border/60 bg-card/50 p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-magenta mb-3">
                  Our Mission
                </p>
                <blockquote className="text-xl sm:text-2xl font-bold text-foreground leading-snug mb-4">
                  &ldquo;To make deterministic, physics-informed industrial
                  intelligence accessible to every manufacturer in India.&rdquo;
                </blockquote>
                <p className="text-xs text-muted-foreground">
                  {/* TODO: Confirm official mission statement with MEX leadership */}
                  [PLACEHOLDER: Mission statement draft — to be confirmed by MEX
                  leadership]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-b border-border/40 bg-card/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Engineering Values
            </h2>
            <p className="text-muted-foreground">
              The principles that guide how we design hardware, train models,
              and commission systems on our customers&apos; floors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl border border-border/60 bg-background p-6 flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Leadership Team
            </h2>
            <p className="text-muted-foreground">
              {/* TODO: Replace placeholder team cards with real leadership photos and bios */}
              Multidisciplinary engineers and researchers across industrial
              automation, embedded systems, and machine learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/60 bg-card/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-magenta/30 via-brand-blue/30 to-brand-cyan/30 border border-border/60 flex items-center justify-center text-lg font-bold text-foreground mb-4">
                    M{i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-cyan mt-1 mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Want to build with us or tour a live deployment?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Connect with our engineering team to discuss your plant&apos;s
            roadmap or explore open roles at MEX Automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-8 py-4 font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/40 hover:bg-muted/60 px-8 py-4 font-semibold text-foreground transition-colors"
            >
              View Open Roles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

