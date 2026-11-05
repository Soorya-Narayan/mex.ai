"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormSchema,
  type ContactFormValues,
  PRODUCT_INTEREST_OPTIONS,
} from "@/lib/schemas/contact";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function ContactForm({
  defaultInterest = "request-demo",
}: {
  defaultInterest?: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(
    process.env.NODE_ENV === "development" ? "dev-turnstile-token" : ""
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      productInterest: defaultInterest,
      message: "",
      consent: false,
      website: "",
      turnstileToken: "",
    },
  });

  const siteKey =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
    "1x00000000000000000000AA";

  useEffect(() => {
    // Load Cloudflare Turnstile script if not already loaded
    const existingScript = document.getElementById("cf-turnstile-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const container = document.getElementById("turnstile-container");
        if (container && window.turnstile) {
          window.turnstile.render(container, {
            sitekey: siteKey,
            callback: (token: string) => setTurnstileToken(token),
          });
        }
      };
      document.body.appendChild(script);
    } else {
      const container = document.getElementById("turnstile-container");
      if (container && window.turnstile && container.childElementCount === 0) {
        window.turnstile.render(container, {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
        });
      }
    }
  }, [siteKey]);

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          turnstileToken,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        success?: boolean;
      };

      if (!response.ok) {
        throw new Error(
          data.error ||
            "We could not process your request right now. Please try again shortly."
        );
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
        <h3 className="text-2xl font-bold text-foreground">
          Inquiry Received
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Thank you for reaching out to MEX Automation. Our application
          engineering team has received your inquiry and sent a confirmation to
          your email. We typically respond within 1 business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="inline-flex items-center justify-center rounded-xl border border-border/80 bg-background px-6 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/60 transition-colors"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Contact MEX Automation"
    >
      {/* Honeypot field — hidden from human users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Rajesh Sharma"
            aria-invalid={!!errors.name}
            {...register("name")}
            className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-company"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            Company / Plant Name *
          </label>
          <input
            id="contact-company"
            type="text"
            placeholder="Apex Steels Pvt. Ltd."
            aria-invalid={!!errors.company}
            {...register("company")}
            className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          />
          {errors.company && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            Work Email *
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="rajesh@apexsteels.in"
            aria-invalid={!!errors.email}
            {...register("email")}
            className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            Phone / WhatsApp Number
          </label>
          <input
            id="contact-phone"
            type="tel"
            placeholder="+91 98765 43210"
            aria-invalid={!!errors.phone}
            {...register("phone")}
            className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-interest"
          className="block text-xs font-semibold text-foreground mb-1.5"
        >
          Product Interest *
        </label>
        <select
          id="contact-interest"
          aria-invalid={!!errors.productInterest}
          {...register("productInterest")}
          className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
        >
          {PRODUCT_INTEREST_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.productInterest && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.productInterest.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold text-foreground mb-1.5"
        >
          How Can We Help? *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Tell us about your plant process, equipment, or what you'd like to see in a demo..."
          aria-invalid={!!errors.message}
          {...register("message")}
          className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 rounded border-border text-brand-cyan focus:ring-brand-cyan"
          />
          <span>
            I agree to be contacted by MEX Automation regarding my inquiry and
            consent to the processing of my personal data in accordance with the{" "}
            <Link
              href="/privacy-policy"
              className="text-brand-cyan underline underline-offset-4 hover:opacity-80"
            >
              Privacy Policy
            </Link>{" "}
            (DPDP Act 2023). *
          </span>
        </label>
        {errors.consent && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>

      {/* Cloudflare Turnstile Widget Container */}
      <div id="turnstile-container" className="min-h-[2px]" />

      {status === "error" && serverError && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

