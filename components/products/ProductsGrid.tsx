"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  CheckCircle2,
  X,
  MessageSquare,
  DollarSign,
  Calendar,
  Percent,
  ArrowRight,
  Phone,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ── Data ─────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "Pension Loan",
    subtitle: "For Government Pensioners",
    description1: "Up to ₱2,000,000",
    description2: "3 – 60 months",
    description3: "1.0% – 2.5% per month",
    icon: "/images/productsIcon/PensionLoanIcon.png",
    isEnabled: true,
    badge: "FEATURED",
    category: "Pension",
    accentHex: "#FDDC00",
    num: "01",
    heroGradient: "from-[#FDDC00]/20 via-[#FDDC00]/8 to-[#08477C]/5",
    heroBorder: "border-[#FDDC00]/20",
    iconGlow: "bg-[#FDDC00]/50",
    iconRing: "bg-[#FDDC00]/15 border-[#FDDC00]/25",
    accentText: "text-[#b8960a]",
    accentBg: "bg-[#FDDC00]/10",
    accentBorder: "border-[#FDDC00]/20",
    statColor: "text-[#08477C]",
    extendedProperties: {
      "Who are Qualified": [
        "Government pensioners (GSIS/SSS)",
        "At least 60 years old",
        "Must have active pension",
        "No existing loan obligations that would affect eligibility",
      ],
      Requirements: [
        "Valid government-issued ID (2 copies, photocopied)",
        "Proof of pension (ATM card or passbook)",
        "2x2 ID photo (2 copies)",
        "Completely filled-out CVM application form",
        "Barangay Clearance or Residence Certificate",
      ],
      "Loan Details": [
        "Loanable Amount: Up to ₱2,000,000",
        "Loan Terms: 3 to 60 months",
        "Interest Rate: 1.0% – 2.5% per month",
        "Processing Fee applies",
      ],
    },
  },
  {
    id: 2,
    name: "Private Teacher's Loan",
    subtitle: "Exclusively for Educators",
    description1: "Up to ₱500,000",
    description2: "6 – 36 months",
    description3: "1.5% – 2.5% per month",
    icon: "/images/productsIcon/SBLLogoIcon.png",
    isEnabled: true,
    badge: "NEW",
    category: "Employment",
    accentHex: "#3b82f6",
    num: "02",
    heroGradient: "from-blue-500/15 via-blue-400/6 to-[#08477C]/5",
    heroBorder: "border-blue-200/40",
    iconGlow: "bg-blue-400/40",
    iconRing: "bg-blue-500/10 border-blue-400/25",
    accentText: "text-blue-700",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    statColor: "text-blue-700",
    extendedProperties: {
      "Who are Qualified": [
        "Employed teachers in private schools",
        "Minimum 1 year of continuous service",
        "Active employment status",
        "Filipino citizen",
      ],
      Requirements: [
        "School employment certificate",
        "Last 3 months payslips",
        "Valid government-issued ID",
        "2x2 photo (2 copies)",
        "Barangay Clearance",
      ],
    },
  },
  {
    id: 3,
    name: "Sangla ORCR",
    subtitle: "Vehicle OR/CR as Collateral",
    description1: "Up to ₱500,000",
    description2: "6 – 24 months",
    description3: "2.0% – 2.5% per month",
    icon: "/images/productsIcon/sanglaORCR.png",
    isEnabled: true,
    badge: "NEW",
    category: "Collateral",
    accentHex: "#10b981",
    num: "03",
    heroGradient: "from-emerald-500/15 via-emerald-400/6 to-[#08477C]/5",
    heroBorder: "border-emerald-200/40",
    iconGlow: "bg-emerald-400/40",
    iconRing: "bg-emerald-500/10 border-emerald-400/25",
    accentText: "text-emerald-700",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    statColor: "text-emerald-700",
    extendedProperties: {
      "Who are Qualified": [
        "Vehicle owners with clear title",
        "Filipino citizen",
        "18 years old and above",
        "No existing encumbrance on the vehicle",
      ],
      Requirements: [
        "Original OR (Official Receipt)",
        "Original CR (Certificate of Registration)",
        "Valid government-issued ID",
        "Proof of income or employment",
        "Vehicle photos (all sides)",
        "2x2 photo",
      ],
    },
  },
  {
    id: 4,
    name: "Sangla Titulo",
    subtitle: "Real Estate as Collateral",
    description1: "Up to ₱2,000,000",
    description2: "12 – 60 months",
    description3: "1.5% – 2.5% per month",
    icon: "/images/productsIcon/sanglaTitulo.png",
    isEnabled: true,
    badge: "NEW",
    category: "Collateral",
    accentHex: "#a855f7",
    num: "04",
    heroGradient: "from-purple-500/15 via-purple-400/6 to-[#08477C]/5",
    heroBorder: "border-purple-200/40",
    iconGlow: "bg-purple-400/40",
    iconRing: "bg-purple-500/10 border-purple-400/25",
    accentText: "text-purple-700",
    accentBg: "bg-purple-50",
    accentBorder: "border-purple-200",
    statColor: "text-purple-700",
    extendedProperties: {
      "Who are Qualified": [
        "Real property owners",
        "Clean and transferable title (no encumbrance)",
        "Filipino citizen",
        "18 years old and above",
      ],
      Requirements: [
        "Original Transfer Certificate of Title (TCT) or Condominium Certificate of Title (CCT)",
        "Updated Tax Declaration",
        "Real Property Tax receipts (latest 3 years)",
        "Valid government-issued ID",
        "Proof of income",
        "2x2 photo",
      ],
    },
  },
];

type Product = (typeof products)[0];
const CATEGORIES = ["All", "Pension", "Employment", "Collateral"] as const;
type Category = (typeof CATEGORIES)[number];

/* ── Tilt hook ─────────────────────────────────── */
function useTilt() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-80, 80], [5, -5]);
  const rotateY = useTransform(mx, [-80, 80], [-5, 5]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set(e.clientX - r.left - r.width / 2);
      my.set(e.clientY - r.top - r.height / 2);
    },
    [mx, my]
  );
  const onMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ── Modal ─────────────────────────────────────── */
function ProductDetailModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const isYellow = product.accentHex === "#FDDC00";
  const ctaTextColor = isYellow ? "#08477C" : "#ffffff";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 56, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 56, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] z-10 flex flex-col sm:flex-row max-h-[92vh] sm:max-h-[85vh]"
      >
        {/* LEFT panel */}
        <div
          className="relative sm:w-[42%] flex-shrink-0 flex flex-col p-7 overflow-hidden"
          style={{ background: "linear-gradient(155deg, #021628 0%, #08477C 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 25% 15%, ${product.accentHex}30 0%, transparent 60%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#021628]/60 to-transparent pointer-events-none" />

          <button
            onClick={onClose}
            className="sm:hidden absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-20"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>

          {/* Icon */}
          <div className="relative z-10 mb-6">
            <div className="relative inline-flex">
              <div
                className="absolute inset-0 rounded-2xl blur-2xl scale-[2]"
                style={{ background: `${product.accentHex}40` }}
              />
              <div
                className="relative w-[74px] h-[74px] rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: `${product.accentHex}18`,
                  border: `1.5px solid ${product.accentHex}38`,
                }}
              >
                <Image
                  src={product.icon}
                  alt={product.name}
                  width={46}
                  height={46}
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 mb-6">
            <span
              className="inline-block text-[10px] font-extrabold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full mb-3"
              style={{
                background: `${product.accentHex}18`,
                border: `1px solid ${product.accentHex}30`,
                color: product.accentHex,
              }}
            >
              {product.category}
            </span>
            <h3 className="text-white font-extrabold text-2xl leading-tight mb-1.5">
              {product.name}
            </h3>
            <p className="text-white/45 text-sm leading-relaxed">{product.subtitle}</p>
          </div>

          <div className="relative z-10 h-px bg-white/[0.08] mb-5" />

          <div className="relative z-10 mt-auto">
            <p
              className="text-[10px] font-extrabold tracking-[0.2em] uppercase mb-4"
              style={{ color: `${product.accentHex}60` }}
            >
              Loan Details
            </p>
            <div className="space-y-3.5">
              {[
                { icon: DollarSign, label: "Loanable", value: product.description1 },
                { icon: Calendar, label: "Terms", value: product.description2 },
                { icon: Percent, label: "Rate / month", value: product.description3 },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${product.accentHex}14` }}
                    >
                      <s.icon className="w-3 h-3" style={{ color: product.accentHex }} />
                    </div>
                    <span className="text-white/40 text-xs">{s.label}</span>
                  </div>
                  <span className="font-bold text-sm" style={{ color: product.accentHex }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/contacts"
              onClick={onClose}
              className="mt-7 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:brightness-105 active:scale-95"
              style={{ background: product.accentHex, color: ctaTextColor }}
            >
              <Phone className="w-4 h-4" />
              Apply Now
            </Link>
          </div>
        </div>

        {/* RIGHT panel */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden min-h-0">
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div>
              <h4 className="font-extrabold text-[#08477C] text-base leading-tight">
                Requirements & Qualifications
              </h4>
              <p className="text-slate-400 text-xs mt-0.5">Who can apply · What to bring</p>
            </div>
            <button
              onClick={onClose}
              className="hidden sm:flex w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 items-center justify-center transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {Object.entries(product.extendedProperties || {}).map(([section, items], sIdx) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: sIdx * 0.07 }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-1 h-4 rounded-full flex-shrink-0"
                    style={{ background: isYellow ? "#08477C" : product.accentHex }}
                  />
                  <h5 className="font-bold text-[#08477C] text-sm">{section}</h5>
                </div>
                <ul className="space-y-2.5 pl-3.5">
                  {(items as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {sIdx < Object.keys(product.extendedProperties || {}).length - 1 && (
                  <div className="mt-5 h-px bg-slate-100" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex-shrink-0 border-t border-slate-100 px-6 py-4 flex gap-3 bg-white">
            <Link
              href="/contacts"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-[#08477C] text-white hover:bg-[#063a66] transition-colors active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              Inquire Now
            </Link>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-slate-200 text-slate-500 font-semibold py-3 rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Featured Card ──────────────────────────────── */
function FeaturedCard({
  product,
  onViewDetails,
}: {
  product: Product;
  onViewDetails: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(145deg, #021628 0%, #042a4a 55%, #08477C 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, rgba(253,220,0,0.9) 1.5px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FDDC00]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FDDC00]/18 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-80 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FDDC00]/70 to-transparent" />
      {/* Ghost watermark */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden">
        <span className="text-[180px] md:text-[220px] font-black text-white/[0.025] leading-none pr-4">
          {product.num}
        </span>
      </div>

      {/* Shimmer on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-10">

        {/* Left: Icon cluster */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-6 md:gap-6 md:w-56 flex-shrink-0">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 16 }}
            className="inline-flex items-center gap-1.5 bg-[#FDDC00] text-[#08477C] text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest flex-shrink-0"
          >
            <Star className="w-3 h-3" fill="currentColor" />
            FEATURED
          </motion.span>

          {/* Icon with animated rings */}
          <div className="relative flex-shrink-0">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-3xl border border-[#FDDC00]/20 pointer-events-none"
                style={{ inset: -(i + 1) * 10 }}
                animate={{ scale: [1, 1.06 + i * 0.04, 1], opacity: [0.5, 0, 0.5] }}
                transition={{
                  duration: 2.5 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
            <div
              className="absolute inset-0 rounded-2xl blur-2xl scale-150 pointer-events-none"
              style={{ background: `${product.accentHex}30` }}
            />
            <div
              className="relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(253,220,0,0.25)]"
              style={{
                background: `${product.accentHex}15`,
                border: `2px solid ${product.accentHex}35`,
              }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={product.icon}
                  alt={product.name}
                  width={58}
                  height={58}
                  className="object-contain drop-shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col">
          {/* Category tag */}
          <span
            className="inline-flex self-start text-[10px] font-extrabold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
            style={{
              background: `${product.accentHex}15`,
              border: `1px solid ${product.accentHex}30`,
              color: product.accentHex,
            }}
          >
            {product.category}
          </span>

          <h3 className="text-white font-extrabold text-3xl md:text-4xl leading-tight mb-1.5">
            {product.name}
          </h3>
          <p className="text-white/45 text-base mb-6">{product.subtitle}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: DollarSign, label: "Max Loanable", value: product.description1 },
              { icon: Calendar, label: "Terms", value: product.description2 },
              {
                icon: Percent,
                label: "Rate / month",
                value: product.description3.replace(" per month", ""),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 p-4 rounded-xl"
                style={{
                  background: `${product.accentHex}10`,
                  border: `1px solid ${product.accentHex}20`,
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center"
                    style={{ background: `${product.accentHex}22` }}
                  >
                    <stat.icon className="w-3 h-3" style={{ color: product.accentHex }} />
                  </div>
                  <span className="text-white/35 text-[10px] font-medium leading-tight">
                    {stat.label}
                  </span>
                </div>
                <span
                  className="font-extrabold text-base leading-tight"
                  style={{ color: product.accentHex }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Qualification pills */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-6">
            {["Government pensioners (GSIS/SSS)", "60 years old & above", "Active pension required"].map(
              (q) => (
                <span
                  key={q}
                  className="flex items-center gap-1.5 text-xs text-white/55 bg-white/[0.06] border border-white/[0.08] px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  {q}
                </span>
              )
            )}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mt-auto">
            <Link
              href="/contacts"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-[0_0_30px_rgba(253,220,0,0.2)]"
              style={{ background: product.accentHex, color: "#08477C" }}
            >
              <Phone className="w-4 h-4" />
              Apply Now
            </Link>
            <motion.button
              whileHover={{ x: 3 }}
              onClick={onViewDetails}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white/60 border border-white/15 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all duration-200"
            >
              View Requirements
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Regular Product Card ────────────────────────── */
function ProductCard({
  product,
  index,
  onViewDetails,
}: {
  product: Product;
  index: number;
  onViewDetails: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative rounded-2xl overflow-hidden flex flex-col cursor-default"
    >
      {/* Card background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(145deg, #021628 0%, #042840 55%, #08477C 100%)" }}
      />
      {/* Accent glow sphere */}
      <div
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none"
        style={{ background: product.accentHex }}
      />
      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${product.accentHex}, transparent)` }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Top accent border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${product.accentHex}, transparent)` }}
      />
      {/* Ghost number watermark */}
      <div className="absolute bottom-3 right-4 pointer-events-none select-none">
        <span className="text-[64px] font-black text-white/[0.04] leading-none">
          {product.num}
        </span>
      </div>
      {/* Shimmer on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col flex-1 p-6">

        {/* Top row: badge + category */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-[10px] font-extrabold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
            style={{
              color: product.accentHex,
              background: `${product.accentHex}18`,
              border: `1px solid ${product.accentHex}30`,
            }}
          >
            {product.category}
          </span>
          {product.badge && product.badge !== "FEATURED" && (
            <span
              className="text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/15 text-white/50"
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Outer pulse ring */}
            <motion.div
              className="absolute rounded-2xl border pointer-events-none"
              style={{
                inset: -10,
                borderColor: `${product.accentHex}25`,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-2xl blur-xl scale-150 pointer-events-none transition-opacity duration-300 group-hover:opacity-80"
              style={{ background: `${product.accentHex}25`, opacity: 0.5 }}
            />
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: `${product.accentHex}15`,
                border: `1.5px solid ${product.accentHex}30`,
              }}
            >
              <Image
                src={product.icon}
                alt={product.name}
                width={44}
                height={44}
                className="object-contain drop-shadow-lg"
              />
            </motion.div>
          </div>
        </div>

        {/* Name + subtitle */}
        <div className="text-center mb-5">
          <h3 className="font-extrabold text-white text-lg leading-tight mb-1 group-hover:text-white transition-colors">
            {product.name}
          </h3>
          <p className="text-white/40 text-xs">{product.subtitle}</p>
        </div>

        {/* Stats */}
        <div
          className="rounded-xl p-3 mb-5 space-y-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            { icon: DollarSign, label: "Max Loanable", value: product.description1 },
            { icon: Calendar, label: "Terms", value: product.description2 },
            { icon: Percent, label: "Rate / month", value: product.description3.replace(" per month", "") },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${product.accentHex}18` }}
                >
                  <stat.icon className="w-2.5 h-2.5" style={{ color: product.accentHex }} />
                </div>
                <span className="text-white/30 text-[10px]">{stat.label}</span>
              </div>
              <span
                className="font-bold text-xs"
                style={{ color: product.accentHex }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1" />

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <Link
            href="/contacts"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{ background: product.accentHex, color: "#08477C" }}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Inquire Now
          </Link>
          <button
            onClick={onViewDetails}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-semibold text-sm text-white/50 border border-white/[0.10] hover:bg-white/[0.07] hover:text-white/80 hover:border-white/20 transition-all duration-200 group/btn"
          >
            View Requirements
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Category Filter ────────────────────────────── */
function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange: (c: Category) => void;
}) {
  const counts: Record<Category, number> = {
    All: products.filter((p) => p.isEnabled).length,
    Pension: products.filter((p) => p.category === "Pension" && p.isEnabled).length,
    Employment: products.filter((p) => p.category === "Employment" && p.isEnabled).length,
    Collateral: products.filter((p) => p.category === "Collateral" && p.isEnabled).length,
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(cat)}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
            style={{
              color: isActive ? "#FDDC00" : "rgba(255,255,255,0.45)",
              background: isActive
                ? "rgba(253,220,0,0.12)"
                : "rgba(255,255,255,0.05)",
              border: isActive
                ? "1px solid rgba(253,220,0,0.3)"
                : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {isActive && (
              <motion.span
                layoutId="filterGlow"
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(253,220,0,0.06)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative">{cat}</span>
            <span
              className="relative text-[10px] font-extrabold px-1.5 py-0.5 rounded-full"
              style={{
                background: isActive ? "rgba(253,220,0,0.2)" : "rgba(255,255,255,0.08)",
                color: isActive ? "#FDDC00" : "rgba(255,255,255,0.3)",
              }}
            >
              {counts[cat]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ── Main export ────────────────────────────────── */
export default function ProductsGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const enabled = products.filter((p) => p.isEnabled);
  const featuredProduct = enabled.find((p) => p.badge === "FEATURED");

  /* Decide which products show as regular cards */
  const regularProducts =
    activeCategory === "All"
      ? enabled.filter((p) => p.badge !== "FEATURED")
      : activeCategory === "Pension"
        ? [] // featured card handles pension
        : enabled.filter((p) => p.category === activeCategory);

  const showFeatured =
    activeCategory === "All" ||
    (activeCategory === "Pension" && !!featuredProduct);

  return (
    <>
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #080E1A 0%, #0A1628 60%, #061223 100%)" }}>
        {/* Global ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#08477C]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FDDC00]/[0.06] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-600/[0.08] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* ── Category filter ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-10"
          >
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          </motion.div>

          {/* ── Products ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Featured card */}
              {showFeatured && featuredProduct && (
                <FeaturedCard
                  product={featuredProduct}
                  onViewDetails={() => setSelectedProduct(featuredProduct)}
                />
              )}

              {/* Regular cards */}
              {regularProducts.length > 0 && (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${regularProducts.length === 3
                      ? "xl:grid-cols-3"
                      : regularProducts.length === 2
                        ? "xl:grid-cols-2"
                        : "xl:grid-cols-3"
                    }`}
                >
                  {regularProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                      onViewDetails={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 text-center"
          >
            <p className="text-white/35 text-sm mb-5">
              Not sure which product is right for you?
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-[#08477C] text-sm hover:brightness-105 active:scale-[0.98] transition-all duration-200 shadow-[0_0_40px_rgba(253,220,0,0.2)]"
              style={{ background: "linear-gradient(135deg, #FDDC00 0%, #f0ce00 100%)" }}
            >
              <MessageSquare className="w-4 h-4" />
              Talk to Our Team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
