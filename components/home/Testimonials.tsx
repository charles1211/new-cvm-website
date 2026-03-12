"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    role: "SSS Pensioner, Laguna",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "CVM Finance helped me get my pension loan approved in just 3 days. The staff was very helpful and the interest rate was very reasonable. I will definitely recommend them to my friends and family.",
    product: "Pension Loan",
    productColor: "#08477C",
  },
  {
    id: 2,
    name: "Juan dela Cruz",
    role: "Private Teacher, Calamba",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    text: "As a private school teacher, I was surprised to find a lending company that specifically has a product for us. The process was straightforward and I got my loan within a week. Very satisfied!",
    product: "Teacher's Loan",
    productColor: "#2563eb",
  },
  {
    id: 3,
    name: "Rosario Reyes",
    role: "Business Owner, Sta. Rosa",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "I used my land title as collateral and was able to borrow enough to expand my business. CVM Finance's Sangla Titulo product was exactly what I needed. Highly recommended!",
    product: "Sangla Titulo",
    productColor: "#7c3aed",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);
  const next = () => go((current + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-20 bg-[#031D33] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#FDDC00]/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase text-[#FDDC00]/60 mb-2">
            Client Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            What Our Clients{" "}
            <span className="text-[#FDDC00]">Say About Us</span>
          </h2>
          <p className="text-white/40 text-sm mt-3 max-w-md mx-auto">
            Real stories from real Filipinos who trusted CVM Finance with their financial needs.
          </p>
        </motion.div>

        {/* Main card */}
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row min-h-[420px]">

            {/* ─── LEFT: Big photo panel ─── */}
            <div className="relative lg:w-[42%] h-72 lg:h-auto overflow-hidden flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`photo-${current}`}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 hidden lg:block" />

              {/* Yellow top-left accent bar */}
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#FDDC00] via-[#FDDC00]/50 to-transparent" />

              {/* Product tag — top right */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tag-${current}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="absolute top-5 right-5"
                >
                  <span
                    className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full text-white shadow-lg"
                    style={{ backgroundColor: t.productColor }}
                  >
                    {t.product}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Client name overlay — bottom */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`name-${current}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="absolute bottom-5 left-6 right-6"
                >
                  <p className="text-white font-extrabold text-xl leading-tight drop-shadow-lg">
                    {t.name}
                  </p>
                  <p className="text-white/65 text-sm mt-0.5">{t.role}</p>
                </motion.div>
              </AnimatePresence>

              {/* Thumbnail switcher — bottom strip */}
              <div className="absolute bottom-5 right-5 hidden lg:flex flex-col gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => go(i)}
                    className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      i === current
                        ? "border-[#FDDC00] scale-110 shadow-lg"
                        : "border-white/20 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={item.photo}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: Content panel ─── */}
            <div className="flex-1 flex flex-col justify-between p-8 lg:p-10">
              {/* Large quote mark */}
              <div>
                <Quote className="w-12 h-12 text-[#FDDC00]/20 mb-5" strokeWidth={1} />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FDDC00] text-[#FDDC00]" />
                  ))}
                </div>

                {/* Quote text */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`text-${current}`}
                    initial={{ opacity: 0, y: direction * 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: direction * -16 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white/80 text-lg lg:text-xl leading-relaxed italic font-light"
                  >
                    &ldquo;{t.text}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Bottom: mobile client info + navigation */}
              <div className="mt-8 pt-6 border-t border-white/10">
                {/* Mobile client info */}
                <div className="flex items-center gap-3 mb-6 lg:hidden">
                  <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#FDDC00]/50 flex-shrink-0">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                  </div>
                </div>

                {/* Navigation row */}
                <div className="flex items-center justify-between">
                  {/* Counter */}
                  <p className="text-white/30 text-sm font-mono">
                    <span className="text-[#FDDC00] font-bold">
                      {String(current + 1).padStart(2, "0")}
                    </span>
                    {" / "}
                    {String(testimonials.length).padStart(2, "0")}
                  </p>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => go(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          current === i ? "bg-[#FDDC00] w-8" : "bg-white/20 w-2 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Arrow buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center text-white/60 hover:border-[#FDDC00]/60 hover:text-[#FDDC00] transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      className="w-10 h-10 rounded-xl bg-[#FDDC00] flex items-center justify-center text-[#08477C] hover:bg-yellow-300 transition-all duration-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/25 text-xs mt-8 tracking-wide"
        >
          Trusted by 30,000+ Filipinos nationwide since 1994
        </motion.p>
      </div>
    </section>
  );
}
