import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionsGrid from "@/components/home/SolutionsGrid";
import DeliveryModels from "@/components/home/DeliveryModels";
import ComparisonTable from "@/components/home/ComparisonTable";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import WhyFigueira from "@/components/home/WhyFigueira";
import ProcessSection from "@/components/home/ProcessSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const IMAGES = {
  hero: "https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/23fdd92b2_generated_7fd24c53.png",
  team: "https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/c363d9485_generated_8b943bad.png",
};

export default function Home() {
  return (
    <div>
      <HeroSection heroImage={IMAGES.hero} />
      <ProblemSection />
      <SolutionsGrid />
      <DeliveryModels />
      <ComparisonTable />
      <ShowcaseSection />
      <WhyFigueira teamImage={IMAGES.team} />
      <ProcessSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}