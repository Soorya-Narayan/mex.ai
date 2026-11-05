"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function applyDomTheme(theme: "dark" | "light") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    if (!root.classList.contains("dark")) root.classList.add("dark");
    if (root.classList.contains("light")) root.classList.remove("light");
    root.style.colorScheme = "dark";
  } else {
    if (root.classList.contains("dark")) root.classList.remove("dark");
    if (!root.classList.contains("light")) root.classList.add("light");
    root.style.colorScheme = "light";
  }
}

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    const root = document.documentElement;
    const stored = window.localStorage.getItem("theme");
    const initialTheme: "dark" | "light" =
      stored === "light" ? "light" : "dark";

    applyDomTheme(initialTheme);
    setIsDark(initialTheme === "dark");

    const observer = new MutationObserver(() => {
      const saved = window.localStorage.getItem("theme");
      if (saved === "light" && !root.classList.contains("light")) {
        applyDomTheme("light");
        setIsDark(false);
        return;
      }
      if (saved === "dark" && !root.classList.contains("dark")) {
        applyDomTheme("dark");
        setIsDark(true);
        return;
      }
      setIsDark(!root.classList.contains("light"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    const root = document.documentElement;
    const currentlyDark = !root.classList.contains("light");
    const nextTheme: "dark" | "light" = currentlyDark ? "light" : "dark";

    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {
      // ignore storage errors
    }
    applyDomTheme(nextTheme);
    setIsDark(nextTheme === "dark");
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-10 h-10 rounded-xl flex items-center justify-center border border-border/80 bg-card/70 hover:bg-muted/80 text-foreground transition-all focus-visible:ring-2 focus-visible:ring-brand-cyan cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-brand-blue transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
