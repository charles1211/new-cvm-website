import type { Metadata } from "next";
import PageBanner from "@/components/shared/PageBanner";
import BranchesSection from "@/components/branches/BranchesSection";

export const metadata: Metadata = {
  title: "Our Branches",
  description: "Find CVM Finance branches near you. Over 56 branches nationwide across the Philippines.",
};

export default function BranchesPage() {
  return (
    <>
      <PageBanner
        title="Our Branches"
        subtitle="With 55+ branches across Luzon, we're always near you. Find your closest CVM Finance branch."
        eyebrow="Locations"
      />
      <BranchesSection />
    </>
  );
}
