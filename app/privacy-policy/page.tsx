import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy (DPDP Act 2023)",
  description:
    "MEX Automation's Privacy Policy drafted in accordance with India's Digital Personal Data Protection (DPDP) Act, 2023.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
          <span className="text-foreground">Privacy Policy</span>
        </nav>

        {/* Legal review notice */}
        <div className="mb-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-foreground">
            <strong>Legal Review Required:</strong> This Privacy Policy is a
            structured draft prepared for India&apos;s Digital Personal Data
            Protection Act, 2023 (DPDP Act 2023). It{" "}
            <strong>must be reviewed and approved by a qualified lawyer</strong>{" "}
            and all bracketed placeholders (<code className="font-mono">[NAME, EMAIL]</code>,{" "}
            <code className="font-mono">[ADDRESS]</code>) must be populated
            before production launch.
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          <strong>Last Updated:</strong> November 4, 2026 &middot;{" "}
          <strong>Effective Date:</strong> November 4, 2026
        </p>

        <div className="space-y-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              1. Introduction & Data Fiduciary Identity
            </h2>
            <p>
              MEX Automation (&ldquo;MEX&rdquo;, &ldquo;we&rdquo;,
              &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operating the website{" "}
              <strong>mexautomation.in</strong> and having its office at{" "}
              <span className="font-mono text-foreground">[ADDRESS]</span>, acts
              as a <strong>Data Fiduciary</strong> under the Digital Personal
              Data Protection Act, 2023 (&ldquo;DPDP Act 2023&rdquo;) of India.
              This Privacy Policy explains how we collect, process, store, and
              protect the digital personal data of website visitors, prospective
              customers, and job applicants (&ldquo;Data Principals&rdquo;).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              2. Personal Data We Collect
            </h2>
            <p>
              We collect only the minimum personal data necessary to fulfil
              specified business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contact & Demo Inquiries:</strong> Full name, company or
                plant name, work email address, optional phone/WhatsApp number,
                product interest, and inquiry message when you submit our
                Contact or Brochure Download forms.
              </li>
              <li>
                <strong>Career Applications:</strong> Name, email address, role
                applied for, resume/portfolio URL, and cover note.
              </li>
              <li>
                <strong>Security & Rate-Limiting Metadata:</strong> Anonymized
                or truncated IP address and Cloudflare Turnstile verification
                tokens strictly for spam prevention and security protection.
              </li>
              <li>
                <strong>Analytics Data (Strictly Opt-In):</strong> Aggregated
                page-view and interaction metrics via Google Analytics 4,
                collected <em>only if and after</em> you grant explicit consent
                in our Cookie Banner.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              3. Purpose of Processing & Lawful Basis
            </h2>
            <p>
              We process your personal data solely for the following specified
              purposes based on your free, specific, informed, unconditional,
              and unambiguous consent:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Responding to your technical inquiries, scheduling product
                demonstrations, and delivering requested product brochures.
              </li>
              <li>
                Evaluating job applications for open positions at MEX
                Automation.
              </li>
              <li>
                Protecting our website and infrastructure against automated spam,
                abuse, and unauthorized access.
              </li>
              <li>
                Improving website usability and content relevance (where
                Analytics cookies are explicitly accepted).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              4. Consent & How to Withdraw Consent
            </h2>
            <p>
              Under Section 6 of the DPDP Act 2023, you have the right to
              withdraw your consent at any time with the same ease with which it
              was given:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>For Cookies & Analytics:</strong> Click the{" "}
                <strong>&ldquo;Cookie Settings&rdquo;</strong> link in the
                website footer at any time to reject non-essential cookies.
                Withdrawing consent immediately disables Google Analytics 4 and
                clears analytics cookies.
              </li>
              <li>
                <strong>For Contact & Marketing Records:</strong> Send an email
                to our Grievance Officer at{" "}
                <span className="font-mono text-foreground">[NAME, EMAIL]</span>{" "}
                with the subject line <em>&ldquo;Withdrawal of Consent&rdquo;</em>{" "}
                or click the unsubscribe instructions in any communication from
                us.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              5. Data Retention
            </h2>
            <p>
              We retain personal data only as long as necessary to fulfil the
              purpose for which it was collected, or as required by applicable
              Indian law. Inquiry leads are retained for up to{" "}
              <span className="font-mono text-foreground">
                [PLACEHOLDER: e.g., 24 months]
              </span>{" "}
              from the last interaction unless erasure is requested earlier.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              6. Data Sharing & Sub-Processors
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal
              data. We share data only with trusted infrastructure
              Data Processors bound by confidentiality and security obligations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Neon Serverless Postgres:</strong> Encrypted database
                storage for lead inquiries.
              </li>
              <li>
                <strong>Resend:</strong> Transactional email delivery for
                inquiry notifications and auto-replies.
              </li>
              <li>
                <strong>Cloudflare Turnstile & Upstash:</strong> Bot protection
                and IP rate-limiting.
              </li>
              <li>
                <strong>Google Analytics 4:</strong> Website analytics (loaded
                only after explicit opt-in consent).
              </li>
              <li>
                <strong>Sentry:</strong> Application error monitoring.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              7. Cookies & Tracking Technologies
            </h2>
            <p>
              Our website uses a strict opt-in cookie consent manager with three
              categories: <strong>Necessary</strong> (theme preference, consent
              record, security), <strong>Analytics</strong> (Google Analytics 4),
              and <strong>Marketing</strong>. Non-essential scripts never load
              prior to your affirmative consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              8. Your Rights as a Data Principal (DPDP Act 2023)
            </h2>
            <p>
              Under the DPDP Act 2023, you have the following rights regarding
              your digital personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Right to Access Information:</strong> Request a summary
                of personal data being processed by us and the identities of all
                Data Processors with whom it has been shared.
              </li>
              <li>
                <strong>Right to Correction and Erasure:</strong> Request
                correction of inaccurate or misleading personal data, completion
                of incomplete data, or erasure of your personal data.
              </li>
              <li>
                <strong>Right to Grievance Redressal:</strong> Register a
                grievance with our Grievance Officer if you have any concerns
                regarding data processing.
              </li>
              <li>
                <strong>Right to Nominate:</strong> Nominate another individual
                to exercise your rights under the DPDP Act 2023 in the event of
                death or incapacity.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              9. Grievance Officer Contact Details
            </h2>
            <div className="rounded-xl border border-border/60 bg-card/40 p-5 space-y-1.5 text-sm">
              <p>
                <strong>Grievance Officer:</strong>{" "}
                <span className="font-mono text-foreground">[NAME, EMAIL]</span>
              </p>
              <p>
                <strong>Company:</strong> MEX Automation
              </p>
              <p>
                <strong>Postal Address:</strong>{" "}
                <span className="font-mono text-foreground">[ADDRESS]</span>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <span className="font-mono text-foreground">[PHONE]</span>
              </p>
              <p className="text-xs text-muted-foreground pt-2">
                We acknowledge all grievances within 48 hours and endeavour to
                resolve them within the statutory timeframe prescribed under the
                DPDP Act 2023.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
