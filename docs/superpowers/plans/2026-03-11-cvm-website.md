# CVM Finance Website — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-stack, visually stunning Next.js 14 website for CVM Finance and Credit Corporation, covering 17 pages with premium animations, brand identity, and API-connected content.

**Architecture:** Next.js 14 App Router with TypeScript; Tailwind CSS for utility styling; Framer Motion for scroll-triggered/hover animations; API routes proxy to the legacy backend. Each page is a React Server Component (async) where possible; client components used only for interactivity (forms, carousels, counters).

**Tech Stack:** Next.js 14.2.x · TypeScript · Tailwind CSS v3 · tailwindcss-animate · Framer Motion v11 · Lucide React · shadcn/ui (manual) · React Hook Form + Zod · Recharts · Embla Carousel · react-barcode · react-google-recaptcha · lottie-react

---

## Chunk 1: Project Bootstrap & Global Foundation

### Task 1: Scaffold Next.js 14 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.js`
- Create: `app/globals.css`
- Create: `app/layout.tsx`

- [ ] **Step 1: Initialize project**

```bash
cd "c:/CharlesBackUp/CompanyProjects/new-cvm-website"
npx create-next-app@14.2.29 . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
```

Expected: Project scaffolded with Next.js 14.2.29

- [ ] **Step 2: Install all dependencies**

```bash
npm install framer-motion@11 lucide-react embla-carousel-react embla-carousel-autoplay
npm install react-hook-form @hookform/resolvers zod
npm install recharts
npm install lottie-react
npm install react-barcode
npm install react-google-recaptcha @types/react-google-recaptcha
npm install clsx tailwind-merge class-variance-authority
npm install tailwindcss-animate
npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-accordion @radix-ui/react-checkbox @radix-ui/react-toast
```

- [ ] **Step 3: Update `tailwind.config.ts` with brand colors and animation**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#08477C",
          50: "#E6F0F9",
          100: "#CCE1F3",
          200: "#99C3E7",
          300: "#66A5DB",
          400: "#3387CF",
          500: "#08477C",
          600: "#063963",
          700: "#042B4A",
          800: "#031C32",
          900: "#010E19",
        },
        secondary: {
          DEFAULT: "#FDDC00",
          50: "#FFFDE6",
          100: "#FFFBCC",
          200: "#FFF799",
          300: "#FFF266",
          400: "#FEEE33",
          500: "#FDDC00",
          600: "#CAB000",
          700: "#978400",
          800: "#645800",
          900: "#322C00",
        },
        background: "#F8FAFC",
        foreground: "#0F172A",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "counter-up": "counterUp 2s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideInLeft: { "0%": { opacity: "0", transform: "translateX(-30px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        slideInRight: { "0%": { opacity: "0", transform: "translateX(30px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        counterUp: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #08477C 0%, #0d5fa3 100%)",
        "gradient-yellow": "linear-gradient(135deg, #FDDC00 0%, #f5c800 100%)",
        "gradient-dark": "linear-gradient(135deg, #031D33 0%, #08477C 100%)",
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(8, 71, 124, 0.3)",
        "glow-yellow": "0 0 30px rgba(253, 220, 0, 0.4)",
        "card": "0 4px 24px rgba(8, 71, 124, 0.08)",
        "card-hover": "0 8px 40px rgba(8, 71, 124, 0.16)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

- [ ] **Step 4: Update `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

:root {
  --font-plus-jakarta: 'Plus Jakarta Sans', sans-serif;
}

@layer base {
  * {
    @apply border-border;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold tracking-tight;
  }
}

@layer components {
  .section-padding {
    @apply py-16 md:py-24 px-4 md:px-8 lg:px-16;
  }

  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent;
  }

  .glass-card {
    @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl;
  }

  .yellow-highlight {
    @apply text-secondary font-bold;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f5f9; }
::-webkit-scrollbar-thumb { background: #08477C; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #063963; }

/* Print styles for payment instruction page */
@media print {
  .no-print { display: none !important; }
  .print-only { display: block !important; }
}
```

- [ ] **Step 5: Update `next.config.mjs`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cvmfinancediag.blob.core.windows.net' },
      { protocol: 'https', hostname: '**.blob.core.windows.net' },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 6: Commit bootstrap**

```bash
git init && git add -A && git commit -m "chore: bootstrap Next.js 14 project with all dependencies"
```

---

### Task 2: Utility library & shared types

**Files:**
- Create: `lib/utils.ts`
- Create: `lib/api.ts`
- Create: `types/index.ts`

- [ ] **Step 1: Create `lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-PH").format(num);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}
```

- [ ] **Step 2: Create `types/index.ts`**

```typescript
export interface Information {
  id: number;
  type: string;
  name: string;
  url?: string;
  value?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: number;
  name: string;
  location: string;
  mobileNo: string;
  telNo: string;
  imagePath: string;
  googleMapUrl?: string;
  faceBookUrl?: string;
}

export interface Product {
  id: number;
  name: string;
  description1?: string;
  description2?: string;
  description3?: string;
  extendedProperties?: Record<string, unknown>;
  imagePath: string;
  isEnabled: boolean;
}

export interface PaymentMethod {
  id: number;
  name: string;
  type: string;
  imgurl: string;
  pChannel: string;
  pMethod: string;
  order: number;
  isEnabled: boolean;
}

export interface StreamlineProduct {
  id: number;
  name: string;
  description?: string;
}

export interface ContactFormData {
  type: string;
  name: string;
  address: string;
  age: number;
  mobileNo: string;
  email: string;
  loanInquiry: string;
  message: string;
  agreeToTerms: boolean;
  recaptchaToken: string;
}

export interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  product: string;
  loanNumber: string;
  amount: number;
  noEmail: boolean;
}

export interface LoanCalculation {
  loanAmount: number;
  netProceeds: number;
  monthlyPayment: number;
  totalInterest: number;
}
```

- [ ] **Step 3: Create `lib/api.ts` (API base URL helper)**

```typescript
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.cvmfinance.com";

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Information helpers
export async function getInformation(type?: string) {
  const data = await fetchAPI<{ id: number; type: string; name: string; url?: string; value?: string }[]>("/api/information");
  if (type) return data.filter((item) => item.type === type);
  return data;
}

export async function getProducts() {
  return fetchAPI<import("@/types").Product[]>("/api/product");
}

export async function getBranches() {
  return fetchAPI<import("@/types").Branch[]>("/api/branch");
}

export async function getPaymentMethods() {
  return fetchAPI<import("@/types").PaymentMethod[]>("/api/paymentmethod");
}

export async function getStreamlineProducts() {
  return fetchAPI<import("@/types").StreamlineProduct[]>("/api/streamlineproduct");
}
```

- [ ] **Step 4: Commit utilities**

```bash
git add -A && git commit -m "feat: add shared types, utilities, and API helpers"
```

---

## Chunk 2: Shared Layout — Header & Footer

### Task 3: shadcn/ui base components

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/label.tsx`
- Create: `components/ui/textarea.tsx`
- Create: `components/ui/select.tsx`
- Create: `components/ui/checkbox.tsx`
- Create: `components/ui/dialog.tsx`
- Create: `components/ui/sheet.tsx`
- Create: `components/ui/accordion.tsx`
- Create: `components/ui/skeleton.tsx`
- Create: `components/ui/toast.tsx`
- Create: `components/ui/toaster.tsx`
- Create: `components/ui/tabs.tsx`
- Create: `components/ui/slider.tsx`

- [ ] **Step 1: Create `components/ui/button.tsx`**

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-600 shadow-md hover:shadow-glow-blue",
        secondary: "bg-secondary text-primary hover:bg-secondary-600 shadow-md hover:shadow-glow-yellow font-bold",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
        ghost: "text-primary hover:bg-primary/10",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        link: "text-primary underline-offset-4 hover:underline",
        white: "bg-white text-primary hover:bg-gray-100 shadow-md",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-13 px-8 py-3 text-base",
        xl: "h-14 px-10 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 2: Create remaining UI components (card, badge, input, label, textarea, select, checkbox, dialog, sheet, accordion, skeleton, toast, toaster, tabs, slider) — see full component code in implementation**

Full implementations for each shadcn/ui component follow standard shadcn patterns with brand-aligned styling.

- [ ] **Step 3: Commit UI components**

```bash
git add -A && git commit -m "feat: add shadcn/ui base components with brand styling"
```

---

### Task 4: Header component

**Files:**
- Create: `components/layout/Header.tsx`

- [ ] **Step 1: Create `components/layout/Header.tsx`**

```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/branches", label: "BRANCHES" },
  { href: "/loan-calculator", label: "LOAN CALCULATOR" },
  { href: "/contacts", label: "CONTACT US" },
  { href: "/about", label: "ABOUT US" },
  { href: "/news", label: "NEWS" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-xl">
            <Image
              src="https://cvmfinancediag.blob.core.windows.net/cvmfcc-website/CVMFCCLogo.webp"
              alt="CVM Finance Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className={cn("transition-colors duration-300", scrolled ? "text-primary" : "text-white")}>
            <p className="font-extrabold text-lg leading-tight">CVM Finance</p>
            <p className="text-xs opacity-70">and Credit Corporation</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all duration-200 relative group",
                scrolled
                  ? "text-primary hover:text-primary hover:bg-primary/10"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-4/5 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn("rounded-xl", scrolled ? "text-primary" : "text-white")}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-primary text-white border-none">
            <div className="flex flex-col h-full pt-4">
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="https://cvmfinancediag.blob.core.windows.net/cvmfcc-website/CVMFCCLogo.webp"
                  alt="CVM Finance"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-6 h-6 text-white/70 hover:text-white" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto pb-8 px-4">
                <Button variant="secondary" size="lg" className="w-full" asChild>
                  <Link href="/contacts">Inquire Now</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit Header**

```bash
git add -A && git commit -m "feat: add Header with transparent-to-solid scroll, mobile sheet nav"
```

---

### Task 5: Footer component

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Footer.tsx`**

Fetches contact numbers, operating hours, and social media links from API. Shows skeleton while loading. Three-column layout. Facebook Messenger chat widget embedded.

```typescript
import Link from "next/link";
import Image from "next/image";
import { Phone, Clock, Facebook, Instagram, Youtube } from "lucide-react";

// NOTE: In production, fetch from /api/information
// Using static fallback for build stability
const contactNumbers = ["(049) 501-0900", "(049) 501-0901"];
const operatingHours = [
  { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 12:00 PM" },
];
const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/cvmfinance", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/cvmfinance", icon: Instagram },
  { name: "YouTube", href: "https://www.youtube.com/@cvmfinance", icon: Youtube },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://cvmfinancediag.blob.core.windows.net/cvmfcc-website/CVMFCCLogo.webp"
                alt="CVM Finance"
                width={48}
                height={48}
                className="rounded-xl"
              />
              <div>
                <p className="font-extrabold text-lg leading-tight">CVM Finance</p>
                <p className="text-xs text-white/60">and Credit Corporation</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              SEC Registered · BSP Supervised. Financing Filipino dreams since 1994.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-secondary hover:text-primary transition-all duration-300"
                  aria-label={s.name}
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-secondary mb-4 text-sm tracking-widest uppercase">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/products", label: "Our Products" },
                { href: "/branches", label: "Our Branches" },
                { href: "/loan-calculator", label: "Loan Calculator" },
                { href: "/loan", label: "How to Loan" },
                { href: "/about", label: "About Us" },
                { href: "/news", label: "News" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-secondary mb-4 text-sm tracking-widest uppercase">Contact Us</h3>
            <ul className="space-y-3">
              {contactNumbers.map((num) => (
                <li key={num}>
                  <a
                    href={`tel:${num.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 text-white/70 text-sm hover:text-secondary transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                    {num}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="font-bold text-secondary mb-4 text-sm tracking-widest uppercase">Office Hours</h3>
            <ul className="space-y-3">
              {operatingHours.map((h) => (
                <li key={h.day} className="flex items-start gap-2 text-sm">
                  <Clock className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/90 font-medium">{h.day}</p>
                    <p className="text-white/60">{h.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center">
            © {currentYear} CVM Finance and Credit Corporation. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <Link href="/terms-and-condition" className="hover:text-secondary transition-colors">Terms & Conditions</Link>
            <span>·</span>
            <Link href="/contacts" className="hover:text-secondary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Update `app/layout.tsx` to include Header + Footer + fonts**

```typescript
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
    "CVM Finance and Credit Corporation — SEC Registered, BSP Supervised lending institution. Offering pension loans, private teacher loans, sangla ORCR/titulo, and more across 56+ branches in the Philippines.",
  keywords: ["CVM Finance", "loan Philippines", "pension loan", "sangla ORCR", "sangla titulo", "lending company"],
  openGraph: {
    siteName: "CVM Finance and Credit Corporation",
    locale: "en_PH",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit layout**

```bash
git add -A && git commit -m "feat: add Header, Footer, and root layout with Plus Jakarta Sans font"
```

---

## Chunk 3: Shared Animated Components

### Task 6: Animation wrapper components

**Files:**
- Create: `components/shared/SectionReveal.tsx`
- Create: `components/shared/AnimatedCounter.tsx`
- Create: `components/shared/SectionHeader.tsx`
- Create: `components/shared/PageBanner.tsx`
- Create: `components/shared/SkeletonCard.tsx`

- [ ] **Step 1: Create `components/shared/SectionReveal.tsx`**

```typescript
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
}

export default function SectionReveal({ children, className, delay = 0, direction = "up" }: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `components/shared/AnimatedCounter.tsx`**

```typescript
"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2, className }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = value / (duration * 60);
    const timer = setInterval(() => {
      start = Math.min(start + step, value);
      setCount(Math.floor(start));
      if (start >= value) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
```

- [ ] **Step 3: Create `components/shared/SectionHeader.tsx`**

```typescript
import { cn } from "@/lib/utils";
import SectionReveal from "./SectionReveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({ eyebrow, title, titleHighlight, subtitle, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={cn("mb-14", centered && "text-center max-w-3xl mx-auto")}>
      {eyebrow && (
        <SectionReveal>
          <span className={cn(
            "inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4",
            light ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
          )}>
            {eyebrow}
          </span>
        </SectionReveal>
      )}
      <SectionReveal delay={0.1}>
        <h2 className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4",
          light ? "text-white" : "text-primary"
        )}>
          {title}{" "}
          {titleHighlight && (
            <span className="text-secondary">{titleHighlight}</span>
          )}
        </h2>
      </SectionReveal>
      {subtitle && (
        <SectionReveal delay={0.2}>
          <p className={cn("text-lg leading-relaxed", light ? "text-white/80" : "text-slate-600")}>
            {subtitle}
          </p>
        </SectionReveal>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create `components/shared/PageBanner.tsx`**

```typescript
import { cn } from "@/lib/utils";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgColor?: string;
  className?: string;
}

export default function PageBanner({ title, subtitle, bgColor = "bg-primary", className }: PageBannerProps) {
  return (
    <section className={cn("relative pt-32 pb-20 overflow-hidden", bgColor, className)}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      <div className="container-custom relative">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            CVM Finance
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/80 text-lg leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `components/shared/SkeletonCard.tsx`**

```typescript
import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-2xl bg-slate-100 overflow-hidden", className)}>
      <div className="h-48 bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Commit shared components**

```bash
git add -A && git commit -m "feat: add SectionReveal, AnimatedCounter, SectionHeader, PageBanner, SkeletonCard"
```

---

## Chunk 4: Home Page

### Task 7: Home Page — Hero Carousel

**Files:**
- Create: `components/home/HeroCarousel.tsx`

- [ ] **Step 1: Create `components/home/HeroCarousel.tsx`**

Full-viewport-height hero carousel using Embla Carousel with autoplay. Each slide is a full-width clickable image. Smooth crossfade transitions, left/right arrows, dot indicators.

```typescript
"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Static slides for build stability
const slides = [
  {
    id: 1,
    url: "https://cvmfinancediag.blob.core.windows.net/cvmfcc-website/carousel1.jpg",
    link: "/products",
    title: "Financing Filipino Dreams",
    subtitle: "Fast, reliable, and accessible loans for every Filipino.",
    cta: "View Products",
  },
  {
    id: 2,
    url: "https://cvmfinancediag.blob.core.windows.net/cvmfcc-website/carousel2.jpg",
    link: "/loan-calculator",
    title: "Calculate Your Loan Today",
    subtitle: "Get an instant estimate of your loan amount and monthly payments.",
    cta: "Try Calculator",
  },
  {
    id: 3,
    url: "https://cvmfinancediag.blob.core.windows.net/cvmfcc-website/carousel3.jpg",
    link: "/branches",
    title: "56+ Branches Nationwide",
    subtitle: "Find the nearest CVM Finance branch and get your loan today.",
    cta: "Find a Branch",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-primary">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={slide.id} className="relative flex-[0_0_100%] h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent z-10" />
                <div className="w-full h-full bg-primary/80 flex items-center justify-center">
                  {/* Placeholder — replace with actual Image when assets are available */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-900 to-primary-800" />
                </div>
              </div>
              {/* Content */}
              <div className="relative z-20 h-full flex items-center">
                <div className="container-custom">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={selected === i ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <span className="inline-block bg-secondary/20 text-secondary border border-secondary/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                        SEC Registered · BSP Supervised
                      </span>
                      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-none mb-6">
                        {slide.title}
                      </h1>
                      <p className="text-white/80 text-xl mb-8 leading-relaxed max-w-lg">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a
                          href={slide.link}
                          className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-8 py-4 rounded-xl hover:bg-secondary-400 transition-all duration-300 hover:shadow-glow-yellow active:scale-95"
                        >
                          {slide.cta}
                        </a>
                        <a
                          href="/contacts"
                          className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 active:scale-95"
                        >
                          Inquire Now
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-secondary hover:text-primary text-white transition-all duration-300 border border-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-secondary hover:text-primary text-white transition-all duration-300 border border-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              selected === i ? "bg-secondary w-8" : "bg-white/40 w-2 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-30 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase rotate-90 mb-2">Scroll</span>
        <div className="w-0.5 h-12 bg-white/30 relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full bg-secondary"
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ height: "40%" }}
          />
        </div>
      </div>
    </section>
  );
}
```

---

### Task 8: Home Page — Trust Strip, Products, Testimonials, CTA sections

**Files:**
- Create: `components/home/TrustStrip.tsx`
- Create: `components/home/FeaturedProducts.tsx`
- Create: `components/home/HowItWorks.tsx`
- Create: `components/home/PaymentPartners.tsx`
- Create: `components/home/Testimonials.tsx`
- Create: `components/home/StatsSection.tsx`
- Create: `components/home/CTABanner.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Create `components/home/TrustStrip.tsx`** — ISO badge + trust indicators

- [ ] **Step 2: Create `components/home/FeaturedProducts.tsx`** — 4 dark glassmorphism cards with staggered animation + qualification modal

- [ ] **Step 3: Create `components/home/HowItWorks.tsx`** — 3-step visual explanation

- [ ] **Step 4: Create `components/home/PaymentPartners.tsx`** — Infinite marquee of partner logos

- [ ] **Step 5: Create `components/home/Testimonials.tsx`** — 3 static testimonials in card carousel

- [ ] **Step 6: Create `components/home/StatsSection.tsx`** — Animated counters: 56+ branches, 30,000+ clients, 16 products, 28+ years

- [ ] **Step 7: Create `components/home/CTABanner.tsx`** — Strong yellow CTA section

- [ ] **Step 8: Assemble `app/page.tsx`**

- [ ] **Step 9: Commit home page**

```bash
git add -A && git commit -m "feat: build complete home page with all sections"
```

---

## Chunk 5: Core Pages

### Task 9: Products Page (`/products`)

**Files:**
- Create: `app/products/page.tsx`
- Create: `components/products/ProductCard.tsx`
- Create: `components/products/ProductModal.tsx`

- [ ] Steps: PageBanner + responsive product grid + detail modal with extendedProperties rendering

### Task 10: Loan Calculator Page (`/loan-calculator`)

**Files:**
- Create: `app/loan-calculator/page.tsx`
- Create: `components/calculator/PensionLoanForm.tsx`

- [ ] Steps: Two-panel layout, real-time calculation as user types, animated result cards

### Task 11: Branches Page (`/branches`)

**Files:**
- Create: `app/branches/page.tsx`
- Create: `components/branches/BranchCard.tsx`
- Create: `components/branches/BranchSearch.tsx`

- [ ] Steps: PageBanner + live search + responsive branch card grid with map/Facebook links

### Task 12: Contact Page (`/contacts`)

**Files:**
- Create: `app/contacts/page.tsx`
- Create: `components/contact/ContactForm.tsx`
- Create: `app/api/contact/route.ts`

- [ ] Steps: Two-column layout, validated form with reCAPTCHA, toast notifications

### Task 13: About Page (`/about`)

**Files:**
- Create: `app/about/page.tsx`
- Create: `components/about/Timeline.tsx`
- Create: `components/about/MVVCards.tsx`

- [ ] Steps: History, Mission/Vision/Values cards, animated timeline, Quality Policy, Mother Company

---

## Chunk 6: Supporting Pages

### Task 14: News Page (`/news`)

**Files:**
- Create: `app/news/page.tsx`

- [ ] Steps: Article layout with ISO certification story, 3 images, modern card wrapper

### Task 15: How to Loan Page (`/loan`)

**Files:**
- Create: `app/loan/page.tsx`

- [ ] Steps: Yellow header, 9 branch steps + 6 online steps, animated step cards

### Task 16: Terms & Conditions (`/terms-and-condition`)

**Files:**
- Create: `app/terms-and-condition/page.tsx`

- [ ] Steps: Yellow banner + 3 legal paragraphs

### Task 17: 404 Page (`/not-found`)

**Files:**
- Create: `app/not-found.tsx`

- [ ] Steps: Centered layout, Lottie animation fallback, GO TO HOMEPAGE button

---

## Chunk 7: Payment Flow Pages

### Task 18: Payment Form (`/payment-form`)

**Files:**
- Create: `app/payment-form/page.tsx`

### Task 19: Payment Option (`/payment-option`)

**Files:**
- Create: `app/payment-option/page.tsx`

### Task 20: Payment Summary (`/payment-summary`)

**Files:**
- Create: `app/payment-summary/page.tsx`
- Create: `app/api/payment/route.ts`

### Task 21: Payment Result Pages

**Files:**
- Create: `app/payment-instruction/page.tsx`
- Create: `app/payment-successful/page.tsx`
- Create: `app/payment-cancel/page.tsx`
- Create: `app/payment-error/page.tsx`

---

## Chunk 8: API Routes

### Task 22: Contact API Route

**Files:**
- Create: `app/api/contact/route.ts`

- [ ] POST handler: Zod validation + mock reCAPTCHA check + email sending (Nodemailer)

### Task 23: Calculator API Route

**Files:**
- Create: `app/api/calculator/route.ts`

- [ ] POST handler: pension loan calculation formula from PRD

### Task 24: Build verification

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: No TypeScript errors, no build errors.

- [ ] **Step 2: Fix any type errors**
- [ ] **Step 3: Final commit**

```bash
git add -A && git commit -m "feat: complete CVM Finance website — all 17 pages + API routes"
```
