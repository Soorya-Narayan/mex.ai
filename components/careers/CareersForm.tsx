"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CareersFormSchema,
  type CareersFormValues,
} from "@/lib/schemas/careers";
import { useNonce } from "@/components/theme/ThemeProvider";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function CareersForm({ roles }: { roles: string[] }) {
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
  } = useForm<CareersFormValues>({
    resolver: zodResolver(CareersFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: roles[0] || "General Application",
      resumeUrl: "",
      note: "",
      consent: false,
      website: "",
      turnstileToken: "",
    },
  });

  const nonce = useNonce();
  const siteKey =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
    "1x00000000000000000000AA";

  useEffect(() => {
    const existingScript = document.getElementById("cf-turnstile-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      const resolvedNonce =
        nonce ||
        document
          .querySelector('meta[name="csp-nonce"]')
          ?.getAttribute("content") ||
        undefined;
      if (resolvedNonce) {
        script.nonce = resolvedNonce;
      }
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const container = document.getElementById(
          "careers-turnstile-container"
        );
        if (container && window.turnstile) {
          window.turnstile.render(container, {
            sitekey: siteKey,
            callback: (token: string) => setTurnstileToken(token),
          });
        }
      };
      document.body.appendChild(script);
    } else {
      const container = document.getElementById(
        "careers-turnstile-container"
      );
      if (container && window.turnstile && container.childElementCount === 0) {
        window.turnstile.render(container, {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
        });
      }
    }
  }, [siteKey, nonce]);

  async function onSubmit(values: CareersFormValues) {
    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/careers", {
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
            "We could not process your application right now. Please try again shortly."
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
          Application Submitted
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Thank you for applying to MEX Automation. We have received your
          application and sent a confirmation email. Our engineering leads
          will review your profile and reach out if there is a match.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="inline-flex items-center justify-center rounded-xl border border-border/80 bg-background px-6 py-2.5 text-xs font-semibold text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Submit Job Application"
    >
      {/* Honeypot field — hidden from human users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="careers-website">Website</label>
        <input
          id="careers-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="career-name"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            Full Name *
          </label>
          <input
            id="career-name"
            type="text"
            placeholder="Priya Nair"
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
            htmlFor="career-email"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            Email Address *
          </label>
          <input
            id="career-email"
            type="email"
            placeholder="priya@example.com"
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="career-phone"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            Phone Number (Optional)
          </label>
          <input
            id="career-phone"
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

        <div>
          <label
            htmlFor="career-role"
            className="block text-xs font-semibold text-foreground mb-1.5"
          >
            Role Applying For *
          </label>
          <select
            id="career-role"
            aria-invalid={!!errors.role}
            {...register("role")}
            className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
            <option value="General Application">General Application</option>
          </select>
          {errors.role && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.role.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="career-resume"
          className="block text-xs font-semibold text-foreground mb-1.5"
        >
          Resume / LinkedIn / GitHub URL *
        </label>
        <input
          id="career-resume"
          type="url"
          placeholder="https://linkedin.com/in/priyanair or https://github.com/..."
          aria-invalid={!!errors.resumeUrl}
          {...register("resumeUrl")}
          className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
        />
        {errors.resumeUrl && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.resumeUrl.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="career-note"
          className="block text-xs font-semibold text-foreground mb-1.5"
        >
          Brief Note on Your Experience *
        </label>
        <textarea
          id="career-note"
          rows={4}
          placeholder="Tell us about a challenging industrial, embedded, or AI project you've worked on..."
          aria-invalid={!!errors.note}
          {...register("note")}
          className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
        />
        {errors.note && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.note.message}
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
            I consent to the processing of my application and contact details
            in accordance with the{" "}
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
      <div id="careers-turnstile-container" className="min-h-[2px]" />

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
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting Application...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Application
          </>
        )}
      </button>
    </form>
  );
}
