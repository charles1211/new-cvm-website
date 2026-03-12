"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, MessageSquare, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/shared/SectionHeader";

const products = [
  {
    id: 1,
    name: "Pension Loan",
    subtitle: "For Government Pensioners",
    featured: true,
    badge: null,
    loanable: "Up to ₱2,000,000",
    terms: "3 – 60 months",
    rate: "1.0% – 2.5%",
    icon: "/images/productsIcon/PensionLoanIcon.png",
    accentHex: "#FDDC00",
    features: [
      "No collateral required",
      "Fast processing",
      "Competitive interest rates",
      "Flexible payment terms",
      "For SSS & GSIS pensioners",
    ],
    qualifications: {
      "Who are Qualified": [
        "Government pensioners (GSIS/SSS)",
        "At least 60 years old",
        "Must have active pension",
        "No outstanding loans",
      ],
      "Requirements": [
        "Valid government-issued ID",
        "Proof of pension (ATM card or passbook)",
        "2x2 photo",
        "Filled-out application form",
      ],
    },
  },
  {
    id: 2,
    name: "Private Teacher's Loan",
    subtitle: "Exclusively for Educators",
    featured: false,
    badge: "NEW",
    loanable: "Up to ₱500,000",
    terms: "6 – 36 months",
    rate: "1.5% – 2.5%",
    icon: "/images/productsIcon/SBLLogoIcon.png",
    accentHex: "#3b82f6",
    features: [
      "Designed for private teachers",
      "Low monthly deductions",
      "Transparent pricing",
      "Quick approval process",
    ],
    qualifications: {
      "Who are Qualified": [
        "Employed private school teachers",
        "Minimum 1 year of service",
        "Active employment status",
      ],
      "Requirements": [
        "School employment certificate",
        "Last 3 months payslips",
        "Valid ID",
        "2x2 photo",
      ],
    },
  },
  {
    id: 3,
    name: "Sangla ORCR",
    subtitle: "Vehicle OR/CR as Collateral",
    featured: false,
    badge: "NEW",
    loanable: "Up to ₱500,000",
    terms: "6 – 24 months",
    rate: "2.0% – 2.5%",
    icon: "/images/productsIcon/sanglaORCR.png",
    accentHex: "#10b981",
    features: [
      "Use vehicle documents",
      "Keep using your vehicle",
      "Fast cash release",
      "Simple requirements",
    ],
    qualifications: {
      "Who are Qualified": [
        "Vehicle owners with clear title",
        "Filipino citizen",
        "18 years old and above",
      ],
      "Requirements": [
        "Original OR & CR",
        "Valid government ID",
        "Proof of income",
        "Vehicle photos",
      ],
    },
  },
  {
    id: 4,
    name: "Sangla Titulo",
    subtitle: "Real Estate as Collateral",
    featured: false,
    badge: "NEW",
    loanable: "Up to ₱2,000,000",
    terms: "12 – 60 months",
    rate: "1.5% – 2.5%",
    icon: "/images/productsIcon/sanglaTitulo.png",
    accentHex: "#a855f7",
    features: [
      "Use land title as collateral",
      "High loanable amounts",
      "Flexible terms",
      "Low interest rates",
    ],
    qualifications: {
      "Who are Qualified": [
        "Real property owners",
        "Clean title (no encumbrance)",
        "Filipino citizen",
        "18 years old and above",
      ],
      "Requirements": [
        "Original Transfer Certificate of Title",
        "Tax Declaration",
        "Valid government ID",
        "Proof of income",
      ],
    },
  },
];

type Product = (typeof products)[0];

interface QualificationModalProps {
  product: Product;
  onClose: () => void;
}

function QualificationModal({ product, onClose }: QualificationModalProps) {
  const isYellow = product.accentHex === "#FDDC00";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal shell */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 32 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.55)] z-10 flex flex-col lg:flex-row max-h-[90vh]"
      >
        {/* ── LEFT PANEL: Product identity ── */}
        <div
          className="relative lg:w-[42%] flex-shrink-0 flex flex-col justify-between p-8 overflow-hidden"
          style={{ background: "linear-gradient(155deg, #031D33 0%, #08477C 100%)" }}
        >
          {/* Accent radial glow */}
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              background: `radial-gradient(ellipse at 30% 20%, ${product.accentHex} 0%, transparent 58%)`,
            }}
          />
          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#031D33]/50 to-transparent" />

          {/* Icon */}
          <div className="relative z-10">
            <div className="relative inline-flex mb-6">
              <div
                className="absolute inset-0 rounded-2xl blur-2xl scale-[2.2]"
                style={{ background: `${product.accentHex}45` }}
              />
              <div
                className="relative w-[78px] h-[78px] rounded-2xl flex items-center justify-center"
                style={{
                  background: `${product.accentHex}1a`,
                  border: `1.5px solid ${product.accentHex}40`,
                }}
              >
                <Image
                  src={product.icon}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>

            <h3 className="text-white font-extrabold text-2xl leading-tight mb-1.5">
              {product.name}
            </h3>
            <p className="text-white/45 text-sm">{product.subtitle}</p>
          </div>

          {/* Loan stats */}
          <div className="relative z-10 mt-8">
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              Loan Details
            </p>
            <div className="space-y-3">
              {[
                { label: "Loanable", value: product.loanable },
                { label: "Terms", value: product.terms },
                { label: "Rate", value: `${product.rate} / mo` },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-white/40 text-xs">{s.label}</span>
                  <span
                    className="font-bold text-sm"
                    style={{ color: product.accentHex }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Qualifications ── */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
            <div>
              <h4 className="font-extrabold text-[#08477C] text-lg">Qualifications</h4>
              <p className="text-slate-400 text-xs mt-0.5">Who can apply &amp; what to bring</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Scrollable sections */}
          <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
            {Object.entries(product.qualifications).map(([section, items]) => (
              <div key={section}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-1 h-4 rounded-full flex-shrink-0"
                    style={{
                      background: isYellow ? "#08477C" : product.accentHex,
                    }}
                  />
                  <h5 className="font-bold text-[#08477C] text-sm">{section}</h5>
                </div>
                <ul className="space-y-2.5 pl-3.5">
                  {(items as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer CTAs */}
          <div className="px-7 py-5 border-t border-slate-100 flex gap-3">
            <Link
              href="/contacts"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "#08477C", color: "#fff" }}
            >
              <MessageSquare className="w-4 h-4" />
              Inquire Now
            </Link>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-slate-200 text-slate-500 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section className="py-20 bg-[#031D33] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            eyebrow="Our Products"
            title="Loan Products Made"
            titleHighlight="For Filipinos"
            subtitle="Choose from our range of accessible loan products designed to meet your financial needs."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product, i) => {
              const isYellow = product.accentHex === "#FDDC00";
              const ctaTextColor = isYellow ? "#08477C" : "#ffffff";
              const loanableAmount = product.loanable.replace("Up to ", "");

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -7 }}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group flex flex-col"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.02) 100%)",
                    border: product.featured
                      ? `1px solid ${product.accentHex}38`
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 4px 28px rgba(0,0,0,0.28)",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] group-hover:w-[4px] transition-all duration-500"
                    style={{
                      background: `linear-gradient(180deg, ${product.accentHex} 0%, ${product.accentHex}28 100%)`,
                    }}
                  />

                  {/* Hover radial glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${product.accentHex}0e 0%, transparent 65%)`,
                    }}
                  />

                  <div className="relative z-10 p-6 pl-7 flex flex-col flex-1">
                    {/* Icon + Badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="relative">
                        <div
                          className="absolute inset-0 rounded-xl blur-xl scale-[1.7] opacity-45 group-hover:opacity-75 transition-opacity duration-300"
                          style={{ background: `${product.accentHex}30` }}
                        />
                        <div
                          className="relative w-[58px] h-[58px] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                          style={{
                            background: `${product.accentHex}14`,
                            border: `1px solid ${product.accentHex}2e`,
                          }}
                        >
                          <Image
                            src={product.icon}
                            alt={product.name}
                            width={36}
                            height={36}
                            className="object-contain drop-shadow-sm"
                          />
                        </div>
                      </div>

                      {product.featured && (
                        <span
                          className="text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wide"
                          style={{ background: product.accentHex, color: ctaTextColor }}
                        >
                          FEATURED
                        </span>
                      )}
                      {product.badge && !product.featured && (
                        <span
                          className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.75)",
                          }}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Name + Subtitle */}
                    <h3 className="text-white font-bold text-lg leading-tight mb-1 pr-2">
                      {product.name}
                    </h3>
                    <p className="text-white/60 text-xs mb-5">{product.subtitle}</p>

                    {/* Hero: loanable amount */}
                    <div className="mb-5">
                      <p className="text-white/50 text-[9px] font-bold uppercase tracking-[0.22em] mb-1.5">
                        Loanable up to
                      </p>
                      <p
                        className="font-extrabold text-[1.9rem] leading-none tracking-tight"
                        style={{ color: product.accentHex }}
                      >
                        {loanableAmount}
                      </p>
                    </div>

                    {/* Rate + Terms pills */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {[
                        { label: "Rate / mo", value: product.rate },
                        { label: "Terms", value: product.terms },
                      ].map((d) => (
                        <div
                          key={d.label}
                          className="rounded-xl p-3 text-center"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <p className="text-white/50 text-[9px] font-bold uppercase tracking-wider mb-1">
                            {d.label}
                          </p>
                          <p className="text-white/90 font-bold text-[11px] leading-tight">
                            {d.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-2 flex-1 mb-6">
                      {product.features.slice(0, 3).map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2.5 text-xs text-white">
                          <div
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: product.accentHex }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTAs */}
                    <div className="flex flex-col gap-2 mt-auto">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:bg-white/10 active:scale-95"
                        style={{
                          border: "1px solid rgba(255,255,255,0.20)",
                          color: "rgba(255,255,255,0.80)",
                        }}
                      >
                        <Info className="w-3.5 h-3.5" />
                        Who are Qualified
                      </button>
                      <Link
                        href="/contacts"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 hover:brightness-110"
                        style={{ background: product.accentHex, color: ctaTextColor }}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Inquire Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View all */}
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-secondary/70 hover:text-secondary font-semibold text-sm transition-colors group"
            >
              View all loan products
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Qualification Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <QualificationModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
