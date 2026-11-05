"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export function IntroSplash() {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase("fading");
    window.setTimeout(() => {
      setPhase("done");
    }, 450);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip only for automated headless test runners (Playwright / Lighthouse)
    if (navigator.webdriver === true) {
      setPhase("done");
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1.35;
      video.play().catch(() => {
        finishIntro();
      });
    }

    // Safety fallback if video playback is blocked by the browser
    const fallbackTimer = window.setTimeout(() => {
      finishIntro();
    }, 3500);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [finishIntro]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    // Begin the smooth crossfade into the live website as the video completes its dark fade
    if (video.duration && video.currentTime >= video.duration - 0.35) {
      finishIntro();
    }
  };

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] pointer-events-auto overflow-hidden select-none bg-[#FEFEFE] transition-opacity duration-450 ease-out ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = 1.35;
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={finishIntro}
        onError={finishIntro}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
