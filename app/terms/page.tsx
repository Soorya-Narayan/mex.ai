import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions governing the use of MEX Automation's website (mexautomation.in) and informational resources.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">Terms &amp; Conditions</span>
        </nav>

        {/* Legal review notice */}
        <div className="mb-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-foreground">
            <strong>Legal Review Required:</strong> These Terms &amp; Conditions
            are a draft and{" "}
            <strong>must be reviewed and approved by a qualified lawyer</strong>{" "}
            before publication. All bracketed placeholders must be completed by
            MEX Automation.
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          <strong>Last Updated:</strong> November 4, 2026 &middot;{" "}
          <strong>Effective Date:</strong> November 4, 2026
        </p>

        <div className="space-y-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the website{" "}
              <strong>mexautomation.in</strong> (&ldquo;Website&rdquo;) operated
              by MEX Automation (&ldquo;MEX&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;), you agree to be bound by these Terms &amp;
              Conditions. If you do not agree with any part of these terms, you
              must discontinue use of the Website immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              2. Permitted Use of the Website
            </h2>
            <p>
              This Website and its technical brochures, specifications, case
              studies, and articles are provided for informational and business
              evaluation purposes. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Attempt to disrupt, probe, scrape, or bypass security controls,
                rate-limiting, or authentication mechanisms on the Website.
              </li>
              <li>
                Submit false, misleading, or automated spam inquiries through
                any form on the Website.
              </li>
              <li>
                Reproduce, redistribute, or commercially exploit MEX&apos;s
                proprietary documentation, branding, or software descriptions
                without prior written consent.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content on this Website — including the MEX Automation name,
              3D ribbon logo mark, product names (HeatWatch, MEX Digital Twin,
              MEX Vision Systems, MEX EMS, MEX Data Logger, MEX Dashboards),
              visual designs, schematics, and text — is the intellectual
              property of MEX Automation and is protected under applicable
              Indian copyright and trademark laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              4. Technical Specifications &amp; Commercial Agreements
            </h2>
            <p>
              Product specifications, performance metrics, and case study
              figures published on the Website are indicative and subject to
              site-specific engineering validation. Supply, commissioning,
              warranties, and service-level commitments for any MEX hardware or
              software are governed exclusively by a separate written commercial
              contract executed between MEX Automation and the customer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              5. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable Indian law, the
              Website is provided on an &ldquo;as-is&rdquo; and
              &ldquo;as-available&rdquo; basis without warranties of any kind.
              MEX Automation shall not be liable for any indirect, incidental,
              consequential, or punitive damages arising out of your access to,
              or inability to access, this Website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms &amp; Conditions are governed by and construed in
              accordance with the laws of the Republic of India. Any disputes
              arising out of or relating to the use of this Website shall be
              subject to the exclusive jurisdiction of the competent courts in{" "}
              <span className="font-mono text-foreground">
                [JURISDICTION CITY, STATE, INDIA]
              </span>
              {/* TODO: Confirm exclusive court jurisdiction city and state */}
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              7. Contact Information
            </h2>
            <p>
              For any legal inquiries regarding these Terms &amp; Conditions,
              please contact us at{" "}
              <span className="font-mono text-foreground">[EMAIL]</span> or by
              mail at{" "}
              <span className="font-mono text-foreground">[ADDRESS]</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

