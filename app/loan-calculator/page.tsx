import type { Metadata } from "next";
import PageBanner from "@/components/shared/PageBanner";
import PensionLoanCalculator from "@/components/calculator/PensionLoanCalculator";

export const metadata: Metadata = {
  title: "Loan Calculator",
  description: "Calculate your CVM Finance pension loan. Instantly see your loanable amount, net proceeds, and monthly payments.",
};

export default function LoanCalculatorPage() {
  return (
    <>
      <PageBanner
        title="Loan Calculator"
        subtitle="Calculate your estimated loan amount and net proceeds instantly. No commitment required."
        eyebrow="Tools"
      />
      <PensionLoanCalculator />
    </>
  );
}
