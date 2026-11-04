import React from "react";
import { Hero } from "@/components/home/Hero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { ProductGrid } from "@/components/home/ProductGrid";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { WhyMexSection } from "@/components/home/WhyMexSection";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { InsightsTeaser } from "@/components/home/InsightsTeaser";
import { CtaBand } from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ClientLogos />
      <ProductGrid />
      <IndustriesSection />
      <WhyMexSection />
      <CaseStudiesSection />
      <InsightsTeaser />
      <CtaBand />
    </div>
  );
}
