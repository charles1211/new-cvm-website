"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Shield,
  ChevronRight,
} from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

const contactNumbers = [
  { label: "Landline 1", number: "(02) 8 285 4069" },
  { label: "Landline 2", number: "(02) 8 288 1605" },
];
const operatingHours = [
  { day: "Monday – Saturday", hours: "7:30 AM – 6:00 PM", open: true },
  { day: "Sunday", hours: "Closed", open: false },
];
const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/cvmfinanceandcreditcorp", Icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/cvmfinance_ph/", Icon: Instagram },
  { name: "YouTube", href: "https://www.youtube.com/@CVMFinanceCreditCorp", Icon: Youtube },
  { name: "TikTok", href: "https://www.tiktok.com/@cvm.finance.credit.corp", Icon: TikTokIcon },
];
const quickLinks = [
  { href: "/products", label: "Our Products" },
  { href: "/branches", label: "Our Branches" },
  { href: "/loan-calculator", label: "Loan Calculator" },
  { href: "/loan", label: "How to Loan" },
  { href: "/payment-form", label: "Online Payment" },
  { href: "/about", label: "About Us" },
  { href: "/news", label: "News" },
  { href: "/contacts", label: "Contact Us" },
];
const stats = [
  { value: "50+", label: "Branches" },
  { value: "30K+", label: "Clients" },
  { value: "1994", label: "Founded" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const colVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#08477C] text-white overflow-hidden">
      {/* Dot-grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.06) 1.5px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow blobs */}
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-[#FDDC00]/[0.05] blur-3xl pointer-events-none" />

      {/* ── Top gradient accent bar ── */}
      <div className="relative h-[3px] bg-gradient-to-r from-transparent via-[#FDDC00] to-transparent" />


      {/* ── Main footer grid ── */}
      <div className="relative container-custom py-14 lg:py-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* ── Brand Column ── */}
          <motion.div variants={colVariants} className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-[#FDDC00]/20 blur-md" />
                <div className="relative bg-white rounded-xl p-1.5 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]">
                  <Image
                    src="https://cvmfinancediag.blob.core.windows.net/cvmfcc-website/CVMFCCLogo.webp"
                    alt="CVM Finance"
                    width={42}
                    height={42}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div>
                <p className="font-extrabold text-base leading-tight tracking-tight">CVM Finance</p>
                <p className="text-[11px] text-white/50 leading-tight">and Credit Corporation</p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Financing Filipino dreams since 1994.<br />
              56+ branches across Luzon.
            </p>

            {/* Stat chips */}
            <div className="flex gap-2 flex-wrap mb-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center bg-white/[0.07] border border-white/[0.10] rounded-lg px-3 py-1.5"
                >
                  <span className="text-[#FDDC00] font-extrabold text-sm leading-tight">{s.value}</span>
                  <span className="text-white/45 text-[10px] leading-tight">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="group relative w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.10] flex items-center justify-center text-white/60 hover:bg-[#FDDC00] hover:text-[#08477C] hover:border-[#FDDC00] hover:shadow-[0_0_16px_rgba(253,220,0,0.35)] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Quick Links ── */}
          <motion.div variants={colVariants}>
            <h3 className="text-[10px] font-bold tracking-[0.18em] text-[#FDDC00] uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 text-sm py-1 hover:text-white transition-colors duration-150"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#FDDC00]/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#FDDC00]" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-px w-0 bg-[#FDDC00]/60 group-hover:w-full transition-all duration-200" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div variants={colVariants}>
            <h3 className="text-[10px] font-bold tracking-[0.18em] text-[#FDDC00] uppercase mb-5">
              Contact Us
            </h3>

            <ul className="space-y-2.5 mb-6">
              {contactNumbers.map((c) => (
                <li key={c.number}>
                  <a
                    href={`tel:${c.number.replace(/\D/g, "")}`}
                    className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.10] hover:border-[#FDDC00]/30 transition-all duration-200"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#FDDC00]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FDDC00]/20 transition-colors duration-200">
                      <Phone className="w-3.5 h-3.5 text-[#FDDC00]" />
                    </span>
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors duration-150">
                      {c.number}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Address */}
            <div className="flex gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
              <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#FDDC00]" />
              </span>
              <div>
                <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-0.5">
                  Head Office
                </p>
                <p className="text-white/65 text-xs leading-relaxed">
                  #163 FEMS Bldg. L. Wood St. Pantayin<br />
                  Brgy. Dolores, Taytay, Philippines
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Office Hours ── */}
          <motion.div variants={colVariants}>
            <h3 className="text-[10px] font-bold tracking-[0.18em] text-[#FDDC00] uppercase mb-5">
              Office Hours
            </h3>

            <ul className="space-y-2.5 mb-6">
              {operatingHours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07]"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className={`w-3.5 h-3.5 ${h.open ? "text-[#FDDC00]" : "text-white/30"}`} />
                  </span>
                  <div>
                    <p className="text-white/80 font-semibold text-xs mb-0.5">{h.day}</p>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${h.open ? "bg-emerald-400" : "bg-white/25"
                          }`}
                      />
                      <p className={`text-sm ${h.open ? "text-white/60" : "text-white/35"}`}>
                        {h.hours}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* ISO badge */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDDC00]/[0.08] border border-[#FDDC00]/20">
              <div className="w-7 h-7 rounded-lg bg-[#FDDC00]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-3.5 h-3.5 text-[#FDDC00]" />
              </div>
              <div>
                <p className="text-[#FDDC00] text-xs font-bold leading-tight">ISO 9001:2015 Certified</p>
                <p className="text-white/45 text-[10px] mt-0.5 leading-snug">Quality Management System</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-white/[0.08]">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-white/30 text-[11px] text-center order-last sm:order-none">
            © {currentYear} CVM Finance and Credit Corporation
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-4 text-[11px] text-white/35">
            <Link href="/terms-and-condition" className="hover:text-[#FDDC00] transition-colors duration-150">
              Terms & Conditions
            </Link>
            <span className="text-white/15">·</span>
            <Link href="/contacts" className="hover:text-[#FDDC00] transition-colors duration-150">
              Contact
            </Link>
            <span className="text-white/15">·</span>
            <Link href="/about" className="hover:text-[#FDDC00] transition-colors duration-150">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
