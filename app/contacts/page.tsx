import type { Metadata } from "next";
import PageBanner from "@/components/shared/PageBanner";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with CVM Finance. We're here to help with your loan inquiry, existing account, or any concerns.",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="We're Here to Help"
        subtitle="Have a question or ready to apply? Reach out to our friendly team."
        eyebrow="Contact Us"
      />
      <ContactSection />
    </>
  );
}
