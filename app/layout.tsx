import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import {
  JsonLd,
  getOrganizationJsonLd,
  getWebSiteJsonLd,
} from "@/components/seo/JsonLd";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "../public/fonts/space-grotesk-latin.woff2",
  variable: "--font-heading",
  display: "swap",
  weight: "500 700",
});

const inter = localFont({
  src: "../public/fonts/inter-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "400 700",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://mexautomation.in"),
  title: {
    default: "MEX Automation | Intelligent Industrial AI & Automation",
    template: "%s | MEX Automation",
  },
  description:
    "Indian industrial automation & AI powerhouse. Next-gen digital twins, continuous thermal profiling (HeatWatch), vision inspection, and plant-wide EMS.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  authors: [{ name: "MEX Automation Pvt. Ltd." }],
  creator: "MEX Automation",
  publisher: "MEX Automation",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mexautomation.in",
    siteName: "MEX Automation",
    title: "MEX Automation | Intelligent Industrial AI & Automation",
    description:
      "Indian industrial automation & AI powerhouse. Next-gen digital twins, continuous thermal profiling (HeatWatch), vision inspection, and plant-wide EMS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MEX Automation | Intelligent Industrial AI & Automation",
    description:
      "Indian industrial automation & AI powerhouse. Next-gen digital twins, continuous thermal profiling (HeatWatch), vision inspection, and plant-wide EMS.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#05050A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-brand-blue selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <CookieConsentBanner />
          <JsonLd data={getOrganizationJsonLd()} />
          <JsonLd data={getWebSiteJsonLd()} />
        </ThemeProvider>
      </body>
    </html>
  );
}
