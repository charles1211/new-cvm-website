"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  Landmark,
  Fish,
  TreePine,
  Utensils,
  Cpu,
  Warehouse,
  ShoppingBag,
  Banknote,
  Crown,
} from "lucide-react";

/* ── Company data with industry icons ── */
const parent = "St. Joseph Group Inc.";
const flagship = "CVM Finance and Credit Corporation";

const affiliates = [
  { name: "CVM Pawnshop and Money Changer", icon: Banknote, industry: "Finance" },
  { name: "WPM Resources Development Corp.", icon: Building2, industry: "Real Estate" },
  { name: "Omnivet Corporation", icon: TreePine, industry: "Veterinary" },
  { name: "Cameo Fishing Corporation", icon: Fish, industry: "Aquaculture" },
  { name: "Seven Eleven Fishing Corporation", icon: Fish, industry: "Aquaculture" },
  { name: "CVM Orchard and Eco Park", icon: TreePine, industry: "Agriculture" },
  { name: "CVM Land Inc.", icon: Landmark, industry: "Real Estate" },
  { name: "Kai-Anya Foods Inc.", icon: Utensils, industry: "Food & Beverage" },
  { name: "Info Alchemy Corporation", icon: Cpu, industry: "Technology" },
  { name: "We Select Inc.", icon: ShoppingBag, industry: "Retail" },
  { name: "St. Joseph Fish Brokerage", icon: Fish, industry: "Trade" },
  { name: "Crystal Cold Storage", icon: Warehouse, industry: "Logistics" },
];

/* ── Staggered container ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 16 },
  },
};

/* ── Connector line SVG ── */
function HierarchyConnector() {
  return (
    <div className="flex justify-center my-2 pointer-events-none select-none">
      <svg width="2" height="32" viewBox="0 0 2 32" fill="none">
        <motion.line
          x1="1" y1="0" x2="1" y2="32"
          stroke="#FDDC00"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

export default function AffiliatesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0F1E]">
      {/* ── Background: fine grid ── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(253,220,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(253,220,0,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#08477C]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FDDC00]/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-[#FDDC00]/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* ── Top border accent ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FDDC00]/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FDDC00]/10 text-[#FDDC00] border border-[#FDDC00]/20 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-5">
            <span className="w-1.5 h-1.5 bg-[#FDDC00] rounded-full animate-pulse" />
            Our Family
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Mother Company &{" "}
            <span className="text-[#FDDC00]">Affiliates</span>
          </h2>
          <div className="flex justify-center mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#FDDC00]/60 to-transparent" />
          </div>
        </motion.div>

        {/* ── Hierarchy tree ── */}
        <div className="flex flex-col items-center">

          {/* Parent company */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.1 }}
            className="relative group"
          >
            <div className="relative bg-gradient-to-br from-[#FDDC00] to-[#f0ce00] rounded-2xl px-8 py-5 flex items-center gap-4 shadow-[0_0_40px_rgba(253,220,0,0.2)] border border-[#FDDC00]/40">
              {/* Glow pulse */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-[#FDDC00]/20"
                animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-[#FDDC00]" />
              </div>
              <div className="relative">
                <div className="text-[10px] font-extrabold text-primary/60 tracking-[0.2em] uppercase mb-0.5">
                  Parent Company
                </div>
                <p className="text-primary font-extrabold text-base leading-tight">{parent}</p>
              </div>
            </div>
          </motion.div>

          {/* Connector to flagship */}
          <HierarchyConnector />

          {/* Flagship */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 130, damping: 18, delay: 0.25 }}
            className="relative w-full max-w-xl group"
          >
            <div className="relative bg-[#08477C]/70 border border-[#08477C] rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm overflow-hidden">
              {/* Shimmer line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FDDC00]/80 to-transparent"
                initial={{ x: "-100%" }}
                animate={isInView ? { x: "100%" } : {}}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              />
              <div className="w-12 h-12 bg-[#FDDC00] rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(253,220,0,0.4)]">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-extrabold text-[#FDDC00]/70 tracking-[0.2em] uppercase mb-0.5">
                  Flagship Company
                </div>
                <p className="text-white font-extrabold text-base leading-tight truncate">{flagship}</p>
              </div>
              <span className="flex-shrink-0 bg-[#FDDC00]/15 border border-[#FDDC00]/30 text-[#FDDC00] text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-wider">
                PRIMARY
              </span>
            </div>
          </motion.div>

          {/* Connector to affiliates */}
          <HierarchyConnector />

          {/* "Under the same umbrella" label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-white/40 text-xs font-bold tracking-[0.18em] uppercase mb-6"
          >
            Affiliate Companies
          </motion.p>

          {/* Affiliates grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 w-full"
          >
            {affiliates.map((company, i) => {
              const Icon = company.icon;
              return (
                <motion.div
                  key={company.name}
                  variants={itemVariants}
                  whileHover={{
                    y: -3,
                    borderColor: "rgba(253,220,0,0.35)",
                    backgroundColor: "rgba(255,255,255,0.07)",
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="group relative flex items-center gap-3.5 px-4 py-3.5 rounded-xl border border-white/[0.07] bg-white/[0.03] cursor-default overflow-hidden"
                >
                  {/* Number badge */}
                  <span className="absolute top-2 right-2.5 text-[10px] font-extrabold text-white/15 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] group-hover:bg-[#FDDC00]/15 border border-white/[0.06] group-hover:border-[#FDDC00]/25 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-[#FDDC00]/80 transition-colors duration-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-white/65 group-hover:text-white/90 text-[13px] font-semibold leading-snug transition-colors duration-300 truncate">
                      {company.name}
                    </p>
                    <span className="text-[10px] text-white/25 group-hover:text-[#FDDC00]/50 font-medium transition-colors duration-300">
                      {company.industry}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-10 text-white/25 text-sm text-center"
          >
            {affiliates.length + 1} companies under{" "}
            <span className="text-[#FDDC00]/50 font-semibold">{parent}</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
