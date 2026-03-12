import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  icons: {
    icon: "/cvmlogo.ico",
  },
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
