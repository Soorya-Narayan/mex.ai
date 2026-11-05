"use client";

import React, { useState, useEffect, useRef } from "react";
import { Download, X, CheckCircle2, Loader2 } from "lucide-react";

interface BrochureGateModalProps {
  productTitle: string;
  productSlug: string;
  brochureFile: string;
}

export function BrochureGateModal({
  productTitle,
  productSlug,
  brochureFile,
}: BrochureGateModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [turnstileToken, setTurnstileToken] = useState(
    process.env.NODE_ENV === "development" ? "dev-turnstile-token" : ""
  );
  const [downloadUrl, setDownloadUrl] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const turnstileRef = useRef<HTMLDivElement | null>(null);

  const siteKey =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
    "1x00000000000000000000AA";

  useEffect(() => {
    if (!open || status === "success") return;

    const renderWidget = () => {
      if (
        turnstileRef.current &&
        window.turnstile &&
        turnstileRef.current.childElementCount === 0
      ) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
        });
      }
    };

    const existingScript = document.getElementById("cf-turnstile-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      const nonce = document
        .querySelector('meta[name="csp-nonce"]')
        ?.getAttribute("content");
      if (nonce) script.nonce = nonce;
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.body.appendChild(script);
    } else {
      renderWidget();
    }
  }, [open, status, siteKey]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setErrorMsg(
        "Please agree to the privacy consent to download the brochure."
      );
      setStatus("error");
      return;
    }

    if (!turnstileToken) {
      setErrorMsg("Please complete the security verification.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company: company || "Brochure Request",
          email,
          phone: "",
          productInterest: productSlug,
          message: `Requested product brochure (${brochureFile}) for ${productTitle}.`,
          consent: true,
          website,
          turnstileToken,
          brochureFile,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        downloadUrl?: string;
      };

      if (!res.ok || !data.downloadUrl) {
        throw new Error(
          data.error || "Unable to process brochure request right now."
        );
      }

      setDownloadUrl(data.downloadUrl);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border/80 bg-card/60 hover:bg-muted/80 text-foreground font-semibold transition-all focus-visible:ring-2 focus-visible:ring-brand-cyan outline-none"
      >
        <Download className="w-4 h-4 text-brand-cyan" />
        Download Brochure
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="brochure-modal-title"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border/80 bg-background p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {status === "success" ? (
              <div className="py-6 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-foreground">
                  Brochure Ready
                </h3>
                <p className="text-sm text-muted-foreground">
                  Thank you! Your verified download link for{" "}
                  <strong className="text-foreground">{productTitle}</strong> is
                  active for the next 15 minutes.
                </p>
                <div className="pt-2">
                  <a
                    href={downloadUrl}
                    download={brochureFile}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-gradient text-white font-semibold text-sm shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF ({brochureFile})
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                    Technical Datasheet
                  </span>
                  <h3
                    id="brochure-modal-title"
                    className="text-xl font-bold text-foreground mt-1"
                  >
                    Download {productTitle} Brochure
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your work email to unlock a signed download link for
                    the specification sheet PDF.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div>
                    <label
                      htmlFor="brochure-name"
                      className="block text-xs font-semibold text-foreground mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="brochure-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rajesh Sharma"
                      className="w-full rounded-xl border border-border/80 bg-card/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brochure-company"
                      className="block text-xs font-semibold text-foreground mb-1.5"
                    >
                      Company / Plant *
                    </label>
                    <input
                      id="brochure-company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Apex Manufacturing Ltd."
                      className="w-full rounded-xl border border-border/80 bg-card/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="brochure-email"
                      className="block text-xs font-semibold text-foreground mb-1.5"
                    >
                      Work Email *
                    </label>
                    <input
                      id="brochure-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rajesh@company.in"
                      className="w-full rounded-xl border border-border/80 bg-card/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-border text-brand-cyan focus:ring-brand-cyan"
                    />
                    <span>
                      I agree to receive the product brochure and allow MEX
                      Automation to contact me regarding my inquiry in accordance
                      with the Privacy Policy.
                    </span>
                  </label>

                  {/* Cloudflare Turnstile Widget Container */}
                  <div ref={turnstileRef} className="min-h-[2px]" />

                  {status === "error" && errorMsg && (
                    <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-gradient text-white font-bold text-sm shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying &amp; Preparing Link...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Unlock Brochure PDF
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
