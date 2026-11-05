"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const applyTheme = (nextTheme: "dark" | "light") => {
    setTheme(nextTheme);
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (nextTheme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.style.colorScheme = "light";
      }
    }
  };

  if (!mounted) {
    return (
      <div
        className="inline-flex items-center rounded-xl border border-border bg-card/60 p-1 h-10"
        aria-label="Theme switcher"
      >
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-blue/20 text-brand-cyan text-xs font-semibold">
          <Moon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dark</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-muted-foreground text-xs font-medium">
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Light</span>
        </span>
      </div>
    );
  }

  const isDark = resolvedTheme !== "light";

  return (
    <div
      role="group"
      aria-label="Color theme switcher"
      className="inline-flex items-center rounded-xl border border-border/80 bg-card/70 backdrop-blur-md p-1 h-10 shadow-sm"
    >
      <button
        type="button"
        onClick={() => applyTheme("dark")}
        aria-pressed={isDark}
        aria-label="Switch to Dark mode"
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-brand-cyan",
          isDark
            ? "bg-brand-blue text-white shadow-sm shadow-brand-blue/40"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Dark</span>
      </button>

      <button
        type="button"
        onClick={() => applyTheme("light")}
        aria-pressed={!isDark}
        aria-label="Switch to Light mode"
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-brand-cyan",
          !isDark
            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Light</span>
      </button>
    </div>
  );
}
