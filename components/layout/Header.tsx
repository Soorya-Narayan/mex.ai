"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Eye,
  Activity,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";
import type { ProductCategory, ProductNavItem } from "@/lib/content";

const CATEGORY_ICON_MAP: Record<
  ProductCategory,
  React.ComponentType<{ className?: string }>
> = {
  "Vision AI": Eye,
  "Monitoring & Data": Activity,
  Simulation: Cpu,
};

const navLinks = [
  { name: "Industries", href: "/industries" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

export interface HeaderProps {
  productGroups: {
    category: ProductCategory;
    products: ProductNavItem[];
  }[];
}

export function Header({ productGroups }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-lg shadow-black/5"
          : "bg-background/60 backdrop-blur-sm border-b border-border/30"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo variant="lockup" height={38} priority />

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2"
          aria-label="Main navigation"
        >
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdownOpen(true)}
            onMouseLeave={() => setProductsDropdownOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-cyan",
                pathname.startsWith("/products")
                  ? "text-brand-cyan font-semibold"
                  : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
              )}
              aria-expanded={productsDropdownOpen}
              aria-haspopup="true"
              onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
            >
              Products
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  productsDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Menu Panel — grouped by category from MDX */}
            {productsDropdownOpen && (
              <div className="absolute top-full left-0 w-[640px] p-5 bg-card/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl shadow-black/20 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="pb-2 border-b border-border/50 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Products by Category
                  </span>
                  <Link
                    href="/products"
                    className="text-xs font-medium text-brand-cyan hover:underline inline-flex items-center gap-1"
                  >
                    View All Products <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {productGroups.map((group) => {
                    const GroupIcon = CATEGORY_ICON_MAP[group.category] ?? Cpu;
                    return (
                      <div key={group.category}>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-cyan mb-2 px-1">
                          <GroupIcon className="w-3.5 h-3.5" />
                          <span>{group.category}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {group.products.map((product) => (
                            <Link
                              key={product.slug}
                              href={`/products/${product.slug}`}
                              className="group p-2.5 rounded-xl hover:bg-muted/60 transition-all flex flex-col justify-between border border-transparent hover:border-border/60"
                            >
                              <div className="text-sm font-semibold text-foreground group-hover:text-brand-cyan transition-colors">
                                {product.title}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                {product.tagline}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Standard Navigation Links */}
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-cyan",
                  isActive
                    ? "text-brand-cyan font-semibold"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted/60"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Theme toggle + Request a Demo CTA) */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact?interest=request-demo"
            className="relative group overflow-hidden rounded-xl p-[1px] focus-visible:ring-2 focus-visible:ring-brand-cyan"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-brand-magenta via-brand-blue to-brand-cyan opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-[11px] bg-background/90 group-hover:bg-background/80 text-foreground font-semibold text-sm transition-all">
              Request a Demo
              <ArrowRight className="w-4 h-4 text-brand-cyan group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-border bg-background/80 text-foreground focus-visible:ring-2 focus-visible:ring-brand-cyan"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-background/98 backdrop-blur-2xl z-40 p-6 overflow-y-auto border-t border-border flex flex-col justify-between">
          <div className="space-y-6">
            {productGroups.map((group) => (
              <div key={group.category}>
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-cyan mb-2">
                  {group.category}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {group.products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="flex flex-col p-3 rounded-xl bg-card/60 border border-border/60 hover:border-brand-cyan/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-semibold text-sm text-foreground">
                        {p.title}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {p.tagline}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border/60">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Navigation
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-base font-medium rounded-lg text-foreground hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-border/80">
            <Link
              href="/contact?interest=request-demo"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-magenta via-brand-blue to-brand-cyan text-white font-bold text-base shadow-lg shadow-brand-blue/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request a Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
