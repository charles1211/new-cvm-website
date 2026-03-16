import HeroCarousel from "@/components/home/HeroCarousel";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseCVM from "@/components/home/WhyChooseCVM";
import PaymentPartners from "@/components/home/PaymentPartners";
import Testimonials from "@/components/home/Testimonials";
import NewsSection from "@/components/home/NewsSection";
import SocialHighlights from "@/components/home/SocialHighlights";
import CTABanner from "@/components/home/CTABanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CVM Finance and Credit Corporation — Financing Filipino Dreams",
  description:
    "CVM Finance and Credit Corporation — SEC Registered, BSP Supervised. Offering pension loans, private teacher loans, Sangla ORCR & Titulo across 56+ branches in the Philippines.",
};

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <TrustStrip />
      <FeaturedProducts />
      <HowItWorks />
      <StatsSection />
      <WhyChooseCVM />
      <PaymentPartners />
      <Testimonials />
      <NewsSection />
      <SocialHighlights />
      <CTABanner />
    </>
  );
}
