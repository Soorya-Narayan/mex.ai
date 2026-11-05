import React from "react";
import Image from "next/image";

type ProductCardPreviewProps = {
  slug: string;
  title: string;
  heroImage?: string;
  category?: string;
  priority?: boolean;
  variant?: "card" | "hero";
};

const WINDOW_META: Record<
  string,
  { host: string; badge: string; accent: string }
> = {
  heatwatch: {
    host: "heatwatch-kiosk.local",
    badge: "8-CH LIVE",
    accent: "from-cyan-500/20 via-blue-500/10 to-emerald-500/15",
  },
  "data-logger": {
    host: "plc-telemetry.local",
    badge: "30 TAGS · 1s",
    accent: "from-blue-500/20 via-cyan-500/10 to-indigo-500/15",
  },
  dashboards: {
    host: "ems-dashboard.cloud",
    badge: "SYSTEM ONLINE",
    accent: "from-emerald-500/20 via-cyan-500/15 to-blue-500/20",
  },
  "twinforge-studio": {
    host: "twinforge.studio",
    badge: "HIL · FAT SUITE",
    accent: "from-fuchsia-500/20 via-blue-500/15 to-cyan-500/20",
  },
  "crate-pouch-counting": {
    host: "vision-crate.local",
    badge: "YOLOv8s · LIVE",
    accent: "from-cyan-500/20 via-blue-500/15 to-emerald-500/15",
  },
  "bottle-counting": {
    host: "vision-bottle.local",
    badge: "YOLOv8n · ONNX",
    accent: "from-cyan-500/20 via-indigo-500/15 to-blue-500/15",
  },
};

export function ProductCardPreview({
  slug,
  title,
  heroImage,
  priority = false,
  variant = "card",
}: ProductCardPreviewProps) {
  const meta = WINDOW_META[slug] ?? {
    host: `${slug}.mex.local`,
    badge: "LIVE HMI",
    accent: "from-brand-magenta/20 via-brand-blue/15 to-brand-cyan/20",
  };

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200/70 to-slate-100 dark:from-[#080D1A] dark:via-[#0D1527] dark:to-[#070B14] ${
        variant === "card"
          ? "p-3.5 sm:p-4 border-b border-border/50"
          : "p-4 sm:p-6 rounded-2xl border border-border/60 shadow-2xl shadow-brand-blue/15"
      }`}
    >
      {/* Ambient category glow */}
      <div
        className={`pointer-events-none absolute -inset-4 bg-gradient-to-tr ${meta.accent} blur-2xl opacity-75 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Subtle technical dot matrix */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(56, 189, 248, 0.7) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Framed HMI / Browser Mockup Window */}
      <div className="relative rounded-xl border border-slate-300/80 dark:border-white/15 bg-white dark:bg-[#0B101E] shadow-[0_12px_28px_-10px_rgba(15,23,42,0.22)] dark:shadow-[0_14px_34px_-10px_rgba(0,0,0,0.75)] overflow-hidden transition-all duration-500 group-hover:scale-[1.015] group-hover:border-brand-cyan/50">
        {/* Top Window Chrome Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#0F172A] border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/75" />
            <span className="w-2 h-2 rounded-full bg-amber-400/75" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/75" />
            <span className="ml-2 text-[10px] font-mono text-slate-400 truncate max-w-[150px] sm:max-w-[200px]">
              {meta.host}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] font-mono font-semibold tracking-wider text-emerald-300">
              {meta.badge}
            </span>
          </div>
        </div>

        {/* Screen Viewport */}
        {heroImage ? (
          <div className="relative aspect-[16/9.25] w-full bg-[#0B101E] overflow-hidden">
            <Image
              src={heroImage}
              alt={`${title} interface preview`}
              fill
              priority={priority}
              sizes={
                variant === "hero"
                  ? "(max-width: 1024px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              className="object-contain object-center"
            />
            {/* Subtle screen glass inner ring */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
          </div>
        ) : slug === "crate-pouch-counting" ? (
          <CratePouchVisionHud />
        ) : (
          <BottleCountingVisionHud />
        )}
      </div>
    </div>
  );
}

function CratePouchVisionHud() {
  return (
    <div className="relative aspect-[16/9.25] w-full bg-[#070C17] p-3 sm:p-4 flex flex-col justify-between overflow-hidden select-none">
      {/* Top HUD Telemetry Row — uses only verified MDX spec figures */}
      <div className="flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
            CRATE &amp; POUCH AUDIT
          </span>
        </div>
        <div className="text-right">
          <span className="text-emerald-400 font-bold text-[10px]">
            98.25% mAP@50
          </span>
        </div>
      </div>

      {/* Simulated Conveyor Belt & Bounding Boxes */}
      <div className="relative my-2 flex-1 rounded-lg border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 flex items-center justify-around px-3 overflow-hidden">
        {/* Conveyor guide rails */}
        <div className="absolute inset-x-0 top-2 h-px bg-slate-700/60" />
        <div className="absolute inset-x-0 bottom-2 h-px bg-slate-700/60" />
        {/* Optical counting line */}
        <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-gradient-to-b from-cyan-400/20 via-cyan-400 to-cyan-400/20 shadow-[0_0_8px_#22d3ee]" />

        {/* Crate 1 */}
        <div className="relative w-20 sm:w-24 h-16 sm:h-20 rounded border-2 border-emerald-400/90 bg-emerald-500/10 p-1.5 flex flex-col justify-between">
          <span className="-mt-3.5 self-start px-1 py-0.2 rounded bg-emerald-500 text-[8px] font-mono font-bold text-slate-950">
            CRATE VERIFIED
          </span>
          <div className="grid grid-cols-3 gap-1 my-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-2.5 rounded-sm bg-cyan-400/30 border border-cyan-300/50"
              />
            ))}
          </div>
          <span className="text-[8px] font-mono text-emerald-300 text-center">
            20 POUCHES
          </span>
        </div>

        {/* Crate 2 crossing line */}
        <div className="relative w-20 sm:w-24 h-16 sm:h-20 rounded border-2 border-cyan-400 bg-cyan-500/10 p-1.5 flex flex-col justify-between shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <span className="-mt-3.5 self-start px-1 py-0.2 rounded bg-cyan-400 text-[8px] font-mono font-bold text-slate-950">
            PACK VARIANT
          </span>
          <div className="grid grid-cols-3 gap-1 my-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-2.5 rounded-sm bg-cyan-400/40 border border-cyan-200/60"
              />
            ))}
          </div>
          <span className="text-[8px] font-mono text-cyan-200 text-center">
            COLOUR MATCH
          </span>
        </div>
      </div>

      {/* Bottom Status Strip — from MDX specs */}
      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
        <span>DECISION: &lt;31 ms / CRATE</span>
        <span className="text-cyan-300">24 CRATES/MIN</span>
      </div>
    </div>
  );
}

function BottleCountingVisionHud() {
  return (
    <div className="relative aspect-[16/9.25] w-full bg-[#070C17] p-3 sm:p-4 flex flex-col justify-between overflow-hidden select-none">
      {/* Top HUD Telemetry Row — uses only verified MDX spec figures */}
      <div className="flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 font-semibold">
            BOTTLE CONVEYOR FEED
          </span>
        </div>
        <div className="text-right">
          <span className="text-cyan-400 font-bold text-[10px]">
            98.4% mAP@50
          </span>
        </div>
      </div>

      {/* Simulated Single-File Bottle Track */}
      <div className="relative my-2 flex-1 rounded-lg border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 flex items-center justify-evenly px-2 overflow-hidden">
        <div className="absolute inset-x-0 bottom-3 h-1 bg-slate-800" />
        <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-gradient-to-b from-cyan-400/20 via-cyan-400 to-cyan-400/20 shadow-[0_0_8px_#22d3ee]" />

        {[false, false, true, false, false].map((active, idx) => (
          <div
            key={idx}
            className={`relative w-10 sm:w-12 h-16 sm:h-20 rounded border ${
              active
                ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
                : "border-emerald-400/75 bg-emerald-500/10"
            } flex flex-col items-center justify-between p-1`}
          >
            <span
              className={`text-[7px] font-mono font-bold px-1 rounded ${
                active
                  ? "bg-cyan-400 text-slate-950"
                  : "bg-emerald-500/80 text-slate-950"
              }`}
            >
              {active ? "COUNTED" : "BOTTLE"}
            </span>
            {/* Bottle silhouette */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-2.5 rounded-t-sm bg-slate-300/70" />
              <div className="w-4 h-7 rounded-t-md rounded-b-sm bg-slate-200/40 border border-white/30" />
            </div>
            <span className="text-[7px] font-mono text-slate-300">TRACKED</span>
          </div>
        ))}
      </div>

      {/* Bottom Status Strip — from MDX specs */}
      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
        <span>PRECISION: 93.9% · RECALL: 97.0%</span>
        <span className="text-emerald-400">ONNX EDGE</span>
      </div>
    </div>
  );
}
