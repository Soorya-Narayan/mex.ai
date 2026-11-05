import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { getAllProducts } from "@/lib/content";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Request a Demo",
  description:
    "Contact MEX Automation to schedule a live product demo, request a plant scoping assessment, or speak with our industrial AI engineering team.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const resolvedParams = await searchParams;
  const defaultInterest = resolvedParams.interest || "request-demo";
  const products = getAllProducts();
  const productTitles = products.map((p) => p.frontmatter.title).join(", ");
  const interestOptions = [
    ...products.map((p) => ({
      value: p.slug,
      label: p.frontmatter.title,
    })),
    { value: "request-demo", label: "Request a Demo" },
    { value: "general-inquiry", label: "General Inquiry" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-14 border-b border-border/40 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">Contact</span>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-cyan mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-5">
              Speak With an{" "}
              <span className="text-brand-gradient">Application Engineer</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Request a live demonstration of {productTitles} — or schedule an
              on-site scoping assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Send an Inquiry
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Complete the form below and our engineering team will respond
                within one business day.
              </p>
              <ContactForm
                defaultInterest={defaultInterest}
                options={interestOptions}
              />
            </div>

            {/* Info & Map Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-bold text-foreground">
                  Direct Contact Details
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Registered Office & Engineering Lab
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        {/* TODO: Replace [ADDRESS] with official MEX Automation address */}
                        [ADDRESS]
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-brand-magenta flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <p className="text-muted-foreground mt-0.5">
                        {/* TODO: Replace [PHONE] with official MEX phone number */}
                        [PHONE]
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground mt-0.5">
                        {/* TODO: Replace [EMAIL] with official MEX sales email */}
                        [EMAIL]
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Operating Hours
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        Monday – Saturday, 09:30 AM – 06:30 PM IST
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp click-to-chat button */}
                <div className="pt-4 border-t border-border/40">
                  <p className="text-xs text-muted-foreground mb-3">
                    Prefer instant messaging with our sales engineers?{" "}
                    <span className="font-mono">[WHATSAPP NUMBER]</span>
                  </p>
                  <a
                    href="https://wa.me/910000000000?text=Hello%20MEX%20Automation%2C%20I%20would%20like%20to%20inquire%20about%20your%20industrial%20AI%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 px-5 py-3 text-sm font-bold text-emerald-400 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp ([WHATSAPP NUMBER])
                  </a>
                </div>
              </div>

              {/* Embedded Map (free Google Maps embed iframe; no API key) */}
              <div className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    Location Map
                  </span>
                  {/* TODO: Update map embed coordinates with exact office pin */}
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.8567437!3d18.5204303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07f4b3e9b39%3A0x6b8a90000!2sPune%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1699999999999"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MEX Automation office location map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

