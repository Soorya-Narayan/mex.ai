"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "mark" | "lockup" | "banner";
  height?: number;
  priority?: boolean;
}

export function Logo({
  className,
  variant = "lockup",
  height = 40,
  priority = false,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute aspect ratio and dimensions:
  // Mark: 1000x550 (aspect ratio ~ 1.818)
  // Lockup: 2400x400 (aspect ratio 6.0)
  // Banner: 2172x724 (aspect ratio 3.0)
  let width = Math.round(height * 6.0);
  let srcDark = "/brand/mex-lockup-dark.svg";
  let srcLight = "/brand/mex-lockup-light.svg";

  if (variant === "mark") {
    width = Math.round(height * 1.818);
    srcDark = "/brand/mex-logo-dark.svg";
    srcLight = "/brand/mex-logo-light.svg";
  } else if (variant === "banner") {
    width = Math.round(height * 3.0);
    srcDark = "/brand/mex-banner-dark.svg";
    srcLight = "/brand/mex-banner-light.svg";
  }

  // To prevent theme flash before hydration, render both and toggle via CSS dark selector
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md", className)}
      aria-label="MEX Automation Home"
    >
      <div className="relative flex items-center" style={{ height, width }}>
        {/* Dark Mode Logo (hidden in light mode via CSS) */}
        <Image
          src={srcDark}
          alt="MEX Automation Logo"
          width={width}
          height={height}
          priority={priority}
          className="hidden dark:block h-full w-auto object-contain select-none"
        />
        {/* Light Mode Logo (hidden in dark mode via CSS) */}
        <Image
          src={srcLight}
          alt="MEX Automation Logo"
          width={width}
          height={height}
          priority={priority}
          className="block dark:hidden h-full w-auto object-contain select-none"
        />
      </div>
    </Link>
  );
}

