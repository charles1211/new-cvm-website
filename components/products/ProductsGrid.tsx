"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, MessageSquare, DollarSign, Calendar, Percent, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SectionReveal from "@/components/shared/SectionReveal";

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
    badgeStyle: "bg-[#FDDC00] text-[#08477C]",
    category: "Pension",
    accentHex: "#FDDC00",
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
      "Requirements": [
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
    badgeStyle: "bg-blue-100 text-blue-700",
    category: "Employment",
    accentHex: "#3b82f6",
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
      "Requirements": [
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
    badgeStyle: "bg-emerald-100 text-emerald-700",
    category: "Collateral",
    accentHex: "#10b981",
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
      "Requirements": [
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
    badgeStyle: "bg-purple-100 text-purple-700",
    category: "Collateral",
    accentHex: "#a855f7",
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
      "Requirements": [
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

/* ─────────────────────────────────────────────
   MODAL — split-panel: dark left + white right
───────────────────────────────────────────── */
function ProductDetailModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const isYellow = product.accentHex === "#FDDC00";
  const ctaTextColor = isYellow ? "#08477C" : "#ffffff";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal shell — bottom-sheet on mobile, centered split-panel on sm+ */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 48, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] z-10 flex flex-col sm:flex-row max-h-[92vh] sm:max-h-[85vh]"
      >

        {/* ── LEFT: Identity panel ── */}
        <div
          className="relative sm:w-[42%] flex-shrink-0 flex flex-col p-7 overflow-hidden"
          style={{ background: "linear-gradient(155deg, #031D33 0%, #08477C 100%)" }}
        >
          {/* Accent radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 25% 15%, ${product.accentHex}30 0%, transparent 60%)`,
            }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#031D33]/60 to-transparent pointer-events-none" />

          {/* Close button — visible on mobile only (sm: hidden, right panel has its own) */}
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

          {/* Category + Name + Subtitle */}
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

          {/* Divider */}
          <div className="relative z-10 h-px bg-white/[0.08] mb-5" />

          {/* Loan stats */}
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

            {/* Apply CTA — left panel */}
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

        {/* ── RIGHT: Requirements panel ── */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden min-h-0">

          {/* Header */}
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

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {Object.entries(product.extendedProperties || {}).map(([section, items], sIdx) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: sIdx * 0.07 }}
              >
                {/* Section heading */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-1 h-4 rounded-full flex-shrink-0"
                    style={{ background: isYellow ? "#08477C" : product.accentHex }}
                  />
                  <h5 className="font-bold text-[#08477C] text-sm">{section}</h5>
                </div>

                {/* Items */}
                <ul className="space-y-2.5 pl-3.5">
                  {(items as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Section separator */}
                {sIdx < Object.keys(product.extendedProperties || {}).length - 1 && (
                  <div className="mt-5 h-px bg-slate-100" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Sticky footer */}
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

/* ─────────────────────────────────────────────
   GRID
───────────────────────────────────────────── */
export default function ProductsGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-slate-500 text-lg leading-relaxed">
              CVM Finance is the partner you can trust for accessible, affordable, and reliable loan products designed for every Filipino.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.filter((p) => p.isEnabled).map((product, i) => (
              <SectionReveal key={product.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_rgba(8,71,124,0.12)] hover:border-slate-200 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Card Hero */}
                  <div className={`relative bg-gradient-to-br ${product.heroGradient} border-b ${product.heroBorder} px-6 pt-6 pb-5`}>
                    {product.badge && (
                      <span className={`absolute top-4 right-4 text-[11px] font-extrabold px-2.5 py-1 rounded-full ${product.badgeStyle}`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="mb-4">
                      <span className={`inline-flex items-center text-[10px] font-bold tracking-[0.15em] uppercase ${product.accentText} ${product.accentBg} border ${product.accentBorder} px-2.5 py-1 rounded-full`}>
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="relative inline-flex">
                        <div className={`absolute inset-0 ${product.iconGlow} rounded-2xl blur-xl opacity-60 scale-110 group-hover:opacity-90 transition-opacity duration-300`} />
                        <div className={`relative w-[72px] h-[72px] ${product.iconRing} border-2 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                          <Image src={product.icon} alt={product.name} width={48} height={48} className="object-contain drop-shadow" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-medium mb-0.5">Max Loanable</p>
                        <p className={`font-extrabold text-base leading-tight ${product.accentText}`}>
                          {product.description1.replace("Up to ", "")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-extrabold text-[#08477C] text-lg leading-tight mb-0.5">{product.name}</h3>
                    <p className="text-slate-400 text-xs mb-4">{product.subtitle}</p>

                    <div className={`grid grid-cols-2 gap-2 mb-5 p-3 rounded-xl ${product.accentBg} border ${product.accentBorder}`}>
                      <div>
                        <p className="text-slate-400 text-[10px] font-medium mb-0.5">Terms</p>
                        <p className={`font-bold text-xs ${product.statColor}`}>{product.description2}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] font-medium mb-0.5">Rate / month</p>
                        <p className={`font-bold text-xs ${product.statColor}`}>{product.description3.replace(" per month", "")}</p>
                      </div>
                    </div>

                    <div className="flex-1" />

                    <div className="flex flex-col gap-2 mt-2">
                      <Link
                        href="/contacts"
                        className="w-full bg-[#08477C] text-white font-bold py-2.5 rounded-xl text-sm text-center hover:bg-[#063a66] transition-colors flex items-center justify-center gap-2 active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Inquire Now
                      </Link>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full border border-slate-200 text-slate-500 font-semibold py-2.5 rounded-xl text-sm hover:bg-slate-50 hover:border-slate-300 hover:text-[#08477C] transition-all flex items-center justify-center gap-1.5 group/btn"
                      >
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        View Requirements
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
