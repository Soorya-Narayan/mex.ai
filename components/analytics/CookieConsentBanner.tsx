"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

function enableGoogleAnalytics(measurementId: string) {
  if (!measurementId || typeof window === "undefined") return;

  window[`ga-disable-${measurementId}`] = false;

  if (!document.getElementById("ga4-gtag-script")) {
    const script = document.createElement("script");
    script.id = "ga4-gtag-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      measurementId
    )}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", measurementId, {
    anonymize_ip: true,
    cookie_flags: "SameSite=Lax;Secure",
  });
}

function disableGoogleAnalytics(measurementId: string) {
  if (!measurementId || typeof window === "undefined") return;

  // Immediately stop GA4 tracking
  window[`ga-disable-${measurementId}`] = true;

  // Remove injected GA4 script tag if present
  const script = document.getElementById("ga4-gtag-script");
  if (script) {
    script.remove();
  }
}

export function CookieConsentBanner() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

  useEffect(() => {
    const syncConsentState = () => {
      if (!gaId) return;
      if (CookieConsent.acceptedCategory("analytics")) {
        enableGoogleAnalytics(gaId);
      } else {
        disableGoogleAnalytics(gaId);
      }
    };

    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box inline",
          position: "bottom left",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: false,
          autoClear: {
            cookies: [{ name: /^(_ga|_gid|_gat)/ }],
          },
        },
        marketing: {
          enabled: false,
        },
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "Privacy & Cookie Preferences",
              description:
                "We use strictly necessary cookies to run this site and optional analytics/marketing cookies to improve your experience. Non-essential scripts (such as Google Analytics 4) never load unless you explicitly accept them.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Customize",
              footer:
                '<a href="/privacy-policy">Privacy Policy (DPDP Act 2023)</a> · <a href="/terms">Terms</a>',
            },
            preferencesModal: {
              title: "Customize Cookie Preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
              closeIconLabel: "Close modal",
              sections: [
                {
                  title: "Your Data & Privacy Choices",
                  description:
                    "In compliance with India's Digital Personal Data Protection (DPDP) Act 2023, you can choose which optional cookie categories to allow and withdraw your consent at any time.",
                },
                {
                  title: "Strictly Necessary Cookies",
                  description:
                    "Required for core website functionality, theme preferences, spam protection (Cloudflare Turnstile), and storing your cookie consent choice.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics Cookies (Google Analytics 4)",
                  description:
                    "Helps us understand aggregated page visits and site performance. Loaded only after you opt in, and stopped immediately if withdrawn.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Marketing Cookies",
                  description:
                    "Used to measure the effectiveness of industrial events, campaigns, and LinkedIn outreach.",
                  linkedCategory: "marketing",
                },
              ],
            },
          },
        },
      },
      onFirstConsent: syncConsentState,
      onConsent: syncConsentState,
      onChange: syncConsentState,
    });
  }, [gaId]);

  return null;
}
