import type { Metadata } from "next";
import PageBanner from "@/components/shared/PageBanner";
import ProductsGrid from "@/components/products/ProductsGrid";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Explore CVM Finance loan products: Pension Loan, Private Teacher's Loan, Sangla ORCR, Sangla Titulo, and more.",
};

export default function ProductsPage() {
  return (
    <>
      <PageBanner
        title="Our Loan Products"
        subtitle="Choose the perfect loan product tailored to your financial needs. Competitive rates, flexible terms."
        eyebrow="Products"
      />
      <ProductsGrid />
    </>
  );
}
