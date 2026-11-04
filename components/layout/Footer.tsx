"use client";

import React from "react";
import Link from "next/link";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleOpenCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).CookieConsent) {
      (window as any).CookieConsent.showPreferences();
    }
  };

  return (
    <footer className="w-full bg-card/60 border-t border-border mt-auto" role="contentinfo">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="lockup" height={38} />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md pt-2">
              MEX Automation delivers next-generation industrial AI, digital twins, thermal imaging, and rugged edge intelligence to empower autonomous, zero-downtime manufacturing across India and beyond.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/mexai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-brand-cyan hover:border-brand-cyan transition-colors focus-visible:ring-2 focus-visible:ring-brand-cyan"
                aria-label="MEX Automation on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@mexautomation.in"
                className="w-10 h-10 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-brand-cyan hover:border-brand-cyan transition-colors focus-visible:ring-2 focus-visible:ring-brand-cyan"
                aria-label="Email MEX Automation"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Products
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/products/heatwatch" className="hover:text-brand-cyan transition-colors">
                  HeatWatch
                </Link>
              </li>
              <li>
                <Link href="/products/digital-twin" className="hover:text-brand-cyan transition-colors">
                  Digital Twin
                </Link>
              </li>
              <li>
                <Link href="/products/vision-systems" className="hover:text-brand-cyan transition-colors">
                  Vision Systems
                </Link>
              </li>
              <li>
                <Link href="/products/energy-monitoring-systems" className="hover:text-brand-cyan transition-colors">
                  Energy Monitoring (EMS)
                </Link>
              </li>
              <li>
                <Link href="/products/data-logger" className="hover:text-brand-cyan transition-colors">
                  Data Logger
                </Link>
              </li>
              <li>
                <Link href="/products/dashboards" className="hover:text-brand-cyan transition-colors">
                  Dashboards
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/industries" className="hover:text-brand-cyan transition-colors">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-brand-cyan transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-cyan transition-colors">
                  About MEX
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-brand-cyan transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-brand-cyan transition-colors">
                  Insights & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-cyan transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Reach Us
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>[ADDRESS: Industrial Corridor, Pune / Bengaluru, India]</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                <a href="tel:+919876543210" className="hover:text-brand-cyan transition-colors">
                  [PHONE: +91 98765 43210]
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <a href="mailto:contact@mexautomation.in" className="hover:text-brand-cyan transition-colors">
                  contact@mexautomation.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-10 mt-10 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © {currentYear} MEX Automation Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy (DPDP Act)
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <button
              type="button"
              onClick={handleOpenCookieSettings}
              className="hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
