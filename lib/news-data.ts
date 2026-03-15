import {
  Award,
  Building2,
  Handshake,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import type { ElementType } from "react";

/* ── Types ─────────────────────────────────────── */

export type NewsCategory =
  | "All"
  | "Achievement"
  | "Company News"
  | "Updates"
  | "Community"
  | "Partnership";

export interface NewsArticle {
  id: string;
  category: Exclude<NewsCategory, "All">;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  icon: ElementType;
  gradient: string;
  featured?: boolean;
  imagePattern?: string;
}

/* ── Category styles ───────────────────────────── */

export const categoryStyles: Record<Exclude<NewsCategory, "All">, string> = {
  Achievement: "bg-[#FDDC00] text-[#08477C]",
  "Company News": "bg-[#08477C] text-white",
  Updates: "bg-emerald-500 text-white",
  Community: "bg-purple-500 text-white",
  Partnership: "bg-orange-500 text-white",
};

export const newsCategories: NewsCategory[] = [
  "All",
  "Achievement",
  "Company News",
  "Updates",
  "Community",
  "Partnership",
];

/* ── Articles ──────────────────────────────────── */

export const articles: NewsArticle[] = [
  {
    id: "iso-recertification-2023",
    category: "Achievement",
    date: "November 2023",
    readTime: "5 min read",
    title:
      "ISO 9001:2015 Standard Recertification Success for CVM Finance and Credit Corporation",
    excerpt:
      "CVM Finance and Credit Corporation proudly announces its successful recertification under the ISO 9001:2015 Quality Management Standard — a testament to our unwavering commitment to excellence in financial services.",
    icon: Award,
    gradient: "from-[#08477C] via-[#0a5a9e] to-[#042B4A]",
    featured: true,
    imagePattern: "iso",
  },
  {
    id: "new-branch-cebu-2024",
    category: "Company News",
    date: "March 2024",
    readTime: "3 min read",
    title: "CVM Finance Expands Reach: New Branch Opens in Cebu City",
    excerpt:
      "Strengthening our commitment to serve more Filipinos across the Visayas, CVM Finance officially opens its newest branch in Cebu City, bringing our total to 56+ locations nationwide.",
    icon: Building2,
    gradient: "from-[#042B4A] via-[#08477C] to-[#0a5a9e]",
    imagePattern: "branch",
  },
  {
    id: "gcash-partnership-2024",
    category: "Partnership",
    date: "February 2024",
    readTime: "3 min read",
    title:
      "CVM Finance Partners with Leading Digital Wallets for Easier Loan Payments",
    excerpt:
      "We've integrated GCash, Maya, and other digital payment platforms so clients can settle loan payments anytime, anywhere — no branch visit required.",
    icon: Handshake,
    gradient: "from-[#0a5a9e] via-[#08477C] to-[#031D33]",
    imagePattern: "partner",
  },
  {
    id: "30-years-milestone-2024",
    category: "Achievement",
    date: "January 2024",
    readTime: "4 min read",
    title: "Celebrating 30 Years of Financing Filipino Dreams",
    excerpt:
      "Since 1994, CVM Finance has disbursed billions in loans, supported over 30,000 clients, and built a team of 288+ dedicated employees. We celebrate three decades of meaningful impact.",
    icon: Star,
    gradient: "from-[#031D33] via-[#08477C] to-[#0a5a9e]",
    imagePattern: "milestone",
  },
  {
    id: "pension-loan-rates-2024",
    category: "Updates",
    date: "January 2024",
    readTime: "2 min read",
    title: "Pension Loan Rate Update: Competitive Rates Starting at 1.0% Monthly",
    excerpt:
      "CVM Finance announces updated pension loan rates effective January 2024 — competitive monthly rates from 1.0% with flexible terms up to 60 months and loan amounts up to ₱2,000,000.",
    icon: TrendingUp,
    gradient: "from-[#08477C] via-[#042B4A] to-[#031D33]",
    imagePattern: "rates",
  },
  {
    id: "financial-literacy-2023",
    category: "Community",
    date: "December 2023",
    readTime: "3 min read",
    title:
      "Financial Literacy Drive: Empowering SSS Pensioners Across the Philippines",
    excerpt:
      "CVM Finance launched a nationwide financial literacy campaign reaching 5,000+ SSS pensioners, providing workshops on loan management, budgeting, and responsible borrowing.",
    icon: Users,
    gradient: "from-[#042B4A] via-[#031D33] to-[#08477C]",
    imagePattern: "community",
  },
];
