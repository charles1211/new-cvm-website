"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Newspaper, Star, Tag } from "lucide-react";

import { articles, categoryStyles } from "@/lib/news-data";
import type { NewsArticle } from "@/lib/news-data";

/* ── Image pattern (same as news page) ─────────── */
function ArticleImagePattern({
  pattern,
  gradient,
}: {
  pattern?: string;
  gradient: string;
}) {
  const patterns: Record<string, React.ReactNode> = {
    iso: (
      <svg viewBox="0 0 200 120" className="w-full h-full opacity-20" fill="none">
        <circle cx="100" cy="60" r="45" stroke="#FDDC00" strokeWidth="1.5" />
        <circle cx="100" cy="60" r="32" stroke="#FDDC00" strokeWidth="1" />
        <circle cx="100" cy="60" r="18" stroke="#FDDC00" strokeWidth="0.8" />
        <path d="M100 15 L100 105 M55 60 L145 60" stroke="#FDDC00" strokeWidth="0.6" />
        <text x="100" y="65" textAnchor="middle" fill="#FDDC00" fontSize="10" fontWeight="bold">ISO 9001</text>
        <path d="M85 48 L95 58 L115 38" stroke="#FDDC00" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    branch: (
      <svg viewBox="0 0 200 120" className="w-full h-full opacity-20" fill="none">
        <rect x="70" y="30" width="60" height="70" stroke="#FDDC00" strokeWidth="1.2" />
        <polygon points="60,30 140,30 100,10" stroke="#FDDC00" strokeWidth="1.2" fill="none" />
        <rect x="85" y="65" width="14" height="20" stroke="#FDDC00" strokeWidth="0.8" />
        <rect x="101" y="65" width="14" height="20" stroke="#FDDC00" strokeWidth="0.8" />
      </svg>
    ),
    partner: (
      <svg viewBox="0 0 200 120" className="w-full h-full opacity-20" fill="none">
        <circle cx="75" cy="60" r="25" stroke="#FDDC00" strokeWidth="1.2" />
        <circle cx="125" cy="60" r="25" stroke="#FDDC00" strokeWidth="1.2" />
        <circle cx="100" cy="60" r="3" fill="#FDDC00" opacity="0.6" />
      </svg>
    ),
    milestone: (
      <svg viewBox="0 0 200 120" className="w-full h-full opacity-20" fill="none">
        <text x="100" y="70" textAnchor="middle" fill="#FDDC00" fontSize="36" fontWeight="bold" opacity="0.4">30</text>
        <text x="100" y="88" textAnchor="middle" fill="#FDDC00" fontSize="8">YEARS</text>
        <path d="M20 95 Q50 70 80 80 Q110 90 140 65 Q170 40 185 50" stroke="#FDDC00" strokeWidth="1.2" fill="none" />
      </svg>
    ),
    rates: (
      <svg viewBox="0 0 200 120" className="w-full h-full opacity-20" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={30 + i * 30} y={85 - i * 12} width="20" height={20 + i * 12} stroke="#FDDC00" strokeWidth="0.8" />
        ))}
        <path d="M30 85 Q65 60 95 68 Q125 76 155 50 Q170 35 185 30" stroke="#FDDC00" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    community: (
      <svg viewBox="0 0 200 120" className="w-full h-full opacity-20" fill="none">
        {[75, 100, 125].map((cx, i) => (
          <g key={i}>
            <circle cx={cx} cy="48" r="12" stroke="#FDDC00" strokeWidth="1" />
            <path d={`M${cx - 18} 85 Q${cx} 60 ${cx + 18} 85`} stroke="#FDDC00" strokeWidth="1" fill="none" />
          </g>
        ))}
      </svg>
    ),
  };

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(253,220,0,1) 1.5px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      {pattern && patterns[pattern]}
    </div>
  );
}

/* ── Featured news card ─────────────────────────── */
function FeaturedNewsCard({ article }: { article: NewsArticle }) {
  const Icon = article.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-[0_4px_32px_rgba(8,71,124,0.09)] overflow-hidden hover:shadow-[0_8px_48px_rgba(8,71,124,0.15)] transition-shadow duration-500 flex flex-col md:flex-row"
    >
      {/* Left: image panel */}
      <div className="md:w-[40%] min-h-[220px] md:min-h-0 relative overflow-hidden flex-shrink-0">
        <ArticleImagePattern pattern={article.imagePattern} gradient={article.gradient} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
        {/* Featured badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDDC00] text-[#08477C] text-[10px] font-extrabold tracking-[0.15em] uppercase rounded-full shadow">
            <Star className="w-3 h-3" fill="currentColor" />
            Featured
          </span>
        </div>
        {/* Category chip bottom */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3 py-2">
          <Icon className="w-4 h-4 text-[#FDDC00]" />
          <span className="text-white text-xs font-bold">{article.category}</span>
        </div>
      </div>

      {/* Right: content */}
      <div className="flex-1 p-7 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold tracking-wide rounded-full ${categoryStyles[article.category]}`}>
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#08477C]/40" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#08477C]/40" />
              {article.readTime}
            </span>
          </div>

          <h3 className="font-extrabold text-[#08477C] text-lg md:text-xl leading-snug mb-3 group-hover:text-[#063a66] transition-colors">
            {article.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        <Link
          href="/news"
          className="mt-6 self-start inline-flex items-center gap-2 text-[#08477C] font-bold text-sm hover:gap-3 transition-all duration-300 group/link"
        >
          Read Full Article
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}


/* ── Main export ────────────────────────────────── */
export default function NewsSection() {
  const featured = articles.find((a) => a.featured)!;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle decorative glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#08477C]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FDDC00]/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#08477C]/10 text-[#08477C] border border-[#08477C]/15 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-4"
            >
              <Newspaper className="w-3.5 h-3.5" />
              Latest News
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-extrabold text-[#0F172A] leading-tight"
            >
              News &{" "}
              <span className="text-[#08477C]">Updates</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-[3px] w-12 bg-[#FDDC00] rounded-full mt-3 origin-left"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#08477C] border-2 border-[#08477C]/20 hover:bg-[#08477C] hover:text-white hover:border-[#08477C] transition-all duration-300 group/cta"
            >
              View All News
              <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ── Featured article (latest only) ── */}
        <FeaturedNewsCard article={featured} />
      </div>
    </section>
  );
}
