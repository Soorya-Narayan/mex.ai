"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export type NormalizedGalleryItem = {
  src?: string;
  alt: string;
  caption: string;
};

export function ProductGallery({
  productTitle,
  items,
}: {
  productTitle: string;
  items: NormalizedGalleryItem[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % items.length
        );
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + items.length) % items.length
        );
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, items.length]);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group rounded-2xl border border-border/60 bg-card/30 overflow-hidden flex flex-col transition-all duration-300 hover:border-brand-cyan/50 hover:shadow-xl hover:shadow-black/20"
          >
            {item.src ? (
              <button
                type="button"
                onClick={() => setActiveIndex(idx)}
                className="relative w-full overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200/70 to-slate-100 dark:from-[#080D1A] dark:via-[#0D1527] dark:to-[#070B14] p-3 border-b border-border/50 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
                aria-label={`View larger screenshot: ${item.alt}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.1]"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(56, 189, 248, 0.7) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />
                <div className="relative aspect-[16/9.5] w-full rounded-xl border border-slate-300/80 dark:border-white/15 bg-white dark:bg-[#0B101E] shadow-lg overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                    <span className="text-[10px] font-mono text-white/80 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      VIEW {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white border border-white/15">
                      <Maximize2 className="w-3.5 h-3.5 text-brand-cyan" />
                      Expand
                    </span>
                  </div>
                </div>
              </button>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-brand-magenta/10 via-brand-blue/10 to-brand-cyan/10 flex flex-col items-center justify-center p-6 text-center border-b border-border/40">
                <span className="text-xs font-mono text-muted-foreground">
                  {item.caption}
                </span>
              </div>
            )}
            <div className="p-4 flex flex-col gap-1 flex-1 justify-between">
              <p className="text-xs font-semibold text-foreground leading-snug">
                {item.alt}
              </p>
              {item.caption && item.caption !== item.alt && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && activeItem.src && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${productTitle} screenshot preview`}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-w-6xl w-full rounded-2xl border border-border/80 bg-background overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 bg-card/60">
              <div className="pr-4">
                <p className="text-sm font-bold text-foreground">
                  {activeItem.alt}
                </p>
                {activeItem.caption && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {activeItem.caption}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground px-2">
                  {activeIndex + 1} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close preview"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="95vw"
                className="object-contain"
                priority
              />

              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        (activeIndex - 1 + items.length) % items.length
                      )
                    }
                    aria-label="Previous screenshot"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((activeIndex + 1) % items.length)
                    }
                    aria-label="Next screenshot"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/15 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

