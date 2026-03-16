import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { PublicLayout } from "@/components/layout/PublicLayout";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CVM Finance and Credit Corporation",
    default: "CVM Finance and Credit Corporation — Financing Filipino Dreams",
  },
  description:
    "CVM Finance and Credit Corporation — SEC Registered, BSP Supervised. Offering pension loans, private teacher loans, sangla ORCR, sangla titulo across 56+ branches in the Philippines.",
  keywords: ["CVM Finance", "loan Philippines", "pension loan", "sangla ORCR", "sangla titulo", "lending"],
  icons: { icon: "/cvmlogo.ico" },
  openGraph: {
    siteName: "CVM Finance and Credit Corporation",
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <PublicLayout>{children}</PublicLayout>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
