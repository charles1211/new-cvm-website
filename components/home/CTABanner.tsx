"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Banknote, Clock, TrendingDown, CheckCircle2 } from "lucide-react";

const stats = [
  { icon: Banknote, label: "Max Loan", value: "₱2,000,000" },
  { icon: TrendingDown, label: "Rate from", value: "1.0% / mo" },
  { icon: Clock, label: "Processing", value: "3–5 Days" },
];

const perks = [
  "No hidden fees",
  "Flexible payment terms",
  "Friendly loan officers",
];

export default function CTABanner() {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* ── Yellow background with gradient depth ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFE824] via-[#FDDC00] to-[#F5C800]" />

        {/* Blue ambient blobs for depth */}
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-[#08477C]/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-[#08477C]/[0.06] rounded-full blur-3xl" />

        {/* Dot grid in brand blue */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #08477C 1.5px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Diagonal stripe accent (very subtle) */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #08477C 0, #08477C 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Top edge — blue accent bar */}
      <div className="relative h-[3px] bg-gradient-to-r from-transparent via-[#08477C]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-24">

          {/* ── LEFT: Content ── */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-[#08477C]/10 border border-[#08477C]/20 text-[#08477C] text-xs font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 bg-[#08477C] rounded-full animate-pulse" />
                Start Today
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-[#08477C] leading-[1.1] mb-5"
            >
              Ready to Achieve
              <br />
              Your{" "}
              <span className="relative inline-block">
                Financial Goals?
                {/* Underline accent in blue */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6C60 2 120 1 180 3C220 4.5 260 5.5 298 3"
                    stroke="#08477C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                </svg>
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="text-[#08477C]/65 text-lg leading-relaxed mb-8"
            >
              Talk to our friendly loan officers today. We&apos;re here to help you find the right loan product for your needs.
            </motion.p>

            {/* Perks */}
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-x-5 gap-y-2 mb-10"
            >
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-[#08477C]/75 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#08477C] flex-shrink-0" />
                  {p}
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contacts"
                className="group inline-flex items-center gap-3 bg-[#08477C] text-white font-black px-8 py-4 rounded-xl hover:bg-[#063a66] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(8,71,124,0.35)] active:scale-95 text-base"
              >
                Inquire Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+6349501900"
                className="group inline-flex items-center gap-3 border-2 border-[#08477C]/30 text-[#08477C] font-bold px-8 py-4 rounded-xl hover:bg-[#08477C]/10 hover:border-[#08477C]/50 transition-all duration-300 active:scale-95 text-base"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </motion.div>

            {/* Hours */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="text-[#08477C]/45 text-sm mt-6 flex items-center gap-2"
            >
              <Clock className="w-3.5 h-3.5" />
              Available Monday–Saturday 7:30AM–6:00PM
            </motion.p>
          </div>

          {/* ── RIGHT: Floating loan card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Outer glow ring — blue on yellow */}
              <div className="absolute inset-0 bg-[#08477C]/15 rounded-3xl blur-2xl scale-105" />

              {/* White card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-[0_24px_64px_rgba(8,71,124,0.18)] border border-[#08477C]/[0.08]">

                {/* Card header */}
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <p className="text-[#08477C]/40 text-xs font-bold tracking-widest uppercase mb-1">Loan Overview</p>
                    <p className="text-[#08477C] font-extrabold text-xl">CVM Finance</p>
                  </div>
                  <div className="w-12 h-12 bg-[#FDDC00] rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(253,220,0,0.4)]">
                    <Banknote className="w-6 h-6 text-[#08477C]" />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-7">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                      className="bg-[#08477C]/[0.05] rounded-xl p-3.5 text-center border border-[#08477C]/[0.08]"
                    >
                      <s.icon className="w-4 h-4 text-[#08477C] mx-auto mb-2" />
                      <p className="text-[#08477C] font-extrabold text-sm leading-tight">{s.value}</p>
                      <p className="text-[#08477C]/40 text-[10px] mt-0.5">{s.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#08477C]/[0.08] mb-6" />

                {/* Progress bar */}
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#08477C]/50 text-xs">Approval rate</span>
                    <span className="text-[#08477C] font-bold text-xs">95%</span>
                  </div>
                  <div className="h-1.5 bg-[#08477C]/[0.10] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-[#08477C] to-[#1a6bb5] rounded-full"
                    />
                  </div>
                </div>

                {/* Client satisfaction */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Stacked avatars — bordered in yellow */}
                    <div className="flex -space-x-2">
                      {["bg-blue-500", "bg-emerald-500", "bg-rose-400", "bg-amber-400"].map((c, i) => (
                        <div
                          key={i}
                          className={`w-7 h-7 ${c} rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold shadow-sm`}
                        >
                          {["M", "J", "R", "+"][i]}
                        </div>
                      ))}
                    </div>
                    <span className="text-[#08477C]/50 text-xs">30K+ clients</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-3.5 h-3.5 fill-[#FDDC00] drop-shadow-sm" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom edge — blue accent bar */}
      <div className="relative h-[3px] bg-gradient-to-r from-transparent via-[#08477C]/30 to-transparent" />
    </section>
  );
}
