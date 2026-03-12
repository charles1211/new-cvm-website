"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}

export default function PageBanner({
  title,
  subtitle,
  eyebrow = "CVM Finance",
  className,
}: PageBannerProps) {
  return (
    <section className={cn("relative pt-36 pb-24 overflow-hidden", className)}>

      {/* ── Background layers ── */}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#031D33] via-[#08477C] to-[#042B4A]" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,1) 1.5px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient radial glow — yellow, top-right */}
      <div className="absolute -top-32 -right-20 w-[560px] h-[560px] bg-[#FDDC00]/[0.09] rounded-full blur-[120px] pointer-events-none" />

      {/* Ambient radial glow — blue, bottom-left */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-300/[0.08] rounded-full blur-3xl pointer-events-none" />

      {/* ── Yellow top accent bar ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#FDDC00] to-transparent z-10" />

      {/* ── Right-side geometric decoration ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[38%] w-[420px] h-[420px] pointer-events-none select-none">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-[#FDDC00]/[0.08]" />
        {/* Mid ring */}
        <div className="absolute inset-[18%] rounded-full border border-[#FDDC00]/[0.12]" />
        {/* Inner filled circle */}
        <div className="absolute inset-[38%] rounded-full bg-[#FDDC00]/[0.06] border border-[#FDDC00]/[0.18]" />
        {/* Cross lines */}
        <div className="absolute inset-[49%] top-0 bottom-0 w-px bg-[#FDDC00]/[0.06]" />
        <div className="absolute inset-y-[49%] left-0 right-0 h-px bg-[#FDDC00]/[0.06]" />
      </div>

      {/* ── Bottom-right corner accent ── */}
      <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-36 h-36 border-[16px] border-[#FDDC00]/[0.07] rounded-full" />
      </div>

      {/* ── Diagonal stripe band (very subtle) ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #FDDC00 0, #FDDC00 1px, transparent 0, transparent 50%)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Content ── */}
      <div className="container-custom relative z-10">
        <div className="max-w-2xl">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#FDDC00]/[0.12] text-[#FDDC00] border border-[#FDDC00]/[0.22] rounded-full text-[10px] font-extrabold tracking-[0.22em] uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-[#FDDC00] rounded-full animate-pulse" />
              {eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.08] tracking-tight mb-4"
          >
            {title}
          </motion.h1>

          {/* Yellow rule — animated slide-in */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="origin-left mb-5"
          >
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#FDDC00] to-transparent rounded-full" />
          </motion.div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
              className="text-white/60 text-lg leading-relaxed max-w-xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

    </section>
  );
}
