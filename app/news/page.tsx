"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageBanner from "@/components/shared/PageBanner";
import SectionReveal from "@/components/shared/SectionReveal";
import {
  Calendar,
  Clock,
  Award,
  ArrowRight,
  ChevronDown,
  FileText,
  Tag,
  Star,
  BookOpen,
} from "lucide-react";

/* ─────────────────────────────────────────────
   NEWS DATA
───────────────────────────────────────────── */

import {
  articles,
  newsCategories as categoriesData,
  categoryStyles,
  type NewsCategory as Category,
  type NewsArticle,
} from "@/lib/news-data";

const categories = categoriesData;



/* ─────────────────────────────────────────────
   IMAGE PATTERN COMPONENTS
───────────────────────────────────────────── */

function ArticleImagePattern({ pattern, gradient }: { pattern?: string; gradient: string }) {
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
        <rect x="80" y="45" width="12" height="12" stroke="#FDDC00" strokeWidth="0.7" />
        <rect x="108" y="45" width="12" height="12" stroke="#FDDC00" strokeWidth="0.7" />
        {[0, 20, 40, 60, 80].map(x => (
          <line key={x} x1={x} y1="100" x2={x + 200} y2="100" stroke="#FDDC00" strokeWidth="0.3" opacity="0.4" />
        ))}
      </svg>
    ),
    partner: (
      <svg viewBox="0 0 200 120" className="w-full h-full opacity-20" fill="none">
        <circle cx="75" cy="60" r="25" stroke="#FDDC00" strokeWidth="1.2" />
        <circle cx="125" cy="60" r="25" stroke="#FDDC00" strokeWidth="1.2" />
        <path d="M88 52 C88 52 95 60 100 60 C105 60 112 52 112 52" stroke="#FDDC00" strokeWidth="1.2" />
        <path d="M88 68 C88 68 95 60 100 60 C105 60 112 68 112 68" stroke="#FDDC00" strokeWidth="1.2" />
        <circle cx="100" cy="60" r="3" fill="#FDDC00" opacity="0.6" />
      </svg>
    ),
    milestone: (
      <svg viewBox="0 0 200 120" className="w-full h-full opacity-20" fill="none">
        <text x="100" y="70" textAnchor="middle" fill="#FDDC00" fontSize="36" fontWeight="bold" opacity="0.4">30</text>
        <text x="100" y="88" textAnchor="middle" fill="#FDDC00" fontSize="8">YEARS</text>
        {[0,1,2,3,4,5,6,7].map(i => (
          <circle key={i} cx={25 + i * 25} cy="100" r="3" fill="#FDDC00" opacity={0.2 + i * 0.1} />
        ))}
        <path d="M20 95 Q50 70 80 80 Q110 90 140 65 Q170 40 185 50" stroke="#FDDC00" strokeWidth="1.2" fill="none" />
      </svg>
    ),
    rates: (
      <svg viewBox="0 0 200 120" className="w-full h-full opacity-20" fill="none">
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={30 + i * 30} y={85 - i * 12} width="20" height={20 + i * 12} stroke="#FDDC00" strokeWidth="0.8" />
        ))}
        <path d="M30 85 Q65 60 95 68 Q125 76 155 50 Q170 35 185 30" stroke="#FDDC00" strokeWidth="1.5" fill="none" />
        <circle cx="185" cy="30" r="4" fill="#FDDC00" opacity="0.5" />
        <text x="100" y="115" textAnchor="middle" fill="#FDDC00" fontSize="7">1.0% - 2.5% / month</text>
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
        <path d="M40 60 C40 60 50 50 60 55" stroke="#FDDC00" strokeWidth="0.8" />
        <path d="M140 60 C140 60 150 50 160 55" stroke="#FDDC00" strokeWidth="0.8" />
        <circle cx="55" cy="45" r="9" stroke="#FDDC00" strokeWidth="0.8" />
        <circle cx="145" cy="45" r="9" stroke="#FDDC00" strokeWidth="0.8" />
      </svg>
    ),
  };

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
      {/* Dot pattern overlay */}
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

/* ─────────────────────────────────────────────
   FEATURED ARTICLE FULL CONTENT
───────────────────────────────────────────── */

function FeaturedArticleContent() {
  const highlights = [
    {
      letter: "A",
      title: "Documentation Review",
      desc: "Comprehensive review of all quality management documentation, procedures, and policies to ensure alignment with ISO 9001:2015 requirements.",
    },
    {
      letter: "B",
      title: "Management System Evaluation",
      desc: "In-depth evaluation of our management systems, leadership commitment, and organizational structure supporting quality objectives.",
    },
    {
      letter: "C",
      title: "Process Performance",
      desc: "Assessment of key business processes, operational efficiency, and performance metrics across all 56+ branch locations.",
    },
    {
      letter: "D",
      title: "Customer Satisfaction",
      desc: "Analysis of customer feedback, complaint resolution processes, and continuous improvement initiatives driven by client needs.",
    },
  ];

  return (
    <div className="space-y-8 text-slate-700 leading-relaxed">
      {/* Section divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Full Article</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-black">1</span>
            Introduction
          </h2>
          <p className="text-slate-600 text-[15px] leading-7">
            CVM Finance and Credit Corporation has successfully achieved recertification under the ISO 9001:2015
            Quality Management Standard. This milestone reflects our organization&apos;s continuous commitment to
            delivering exceptional financial services and maintaining world-class operational standards for our
            clients across the Philippines.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-black">2</span>
            Background
          </h2>
          <p className="text-slate-600 text-[15px] leading-7">
            ISO 9001:2015 is the internationally recognized standard for Quality Management Systems, providing a
            framework for organizations to consistently deliver products and services that meet customer and
            regulatory requirements. CVM Finance first achieved this prestigious certification in 2019, and this
            recertification demonstrates our sustained commitment to quality.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-black">3</span>
            Recertification Process
          </h2>
          <p className="text-slate-600 text-[15px] leading-7">
            The recertification process involved a comprehensive audit methodology conducted by accredited
            third-party auditors. The process evaluated all aspects of our quality management system, ensuring
            continuous improvement and alignment with international best practices in financial services.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-black">4</span>
            Key Highlights
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {highlights.map((item) => (
              <div
                key={item.letter}
                className="group bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/20 rounded-2xl p-5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-secondary font-extrabold text-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {item.letter}
                  </div>
                  <h3 className="font-bold text-primary text-sm">{item.title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-black">5</span>
            Results and Achievements
          </h2>
          <p className="text-slate-600 text-[15px] leading-7">
            The successful recertification confirms that CVM Finance and Credit Corporation has maintained and
            enhanced its quality management practices. Our auditors commended the organization for its systematic
            approach to continuous improvement, strong leadership commitment, and dedication to client satisfaction
            across all service touchpoints.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-extrabold text-primary mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-black">6</span>
            Conclusion
          </h2>
          <div className="relative bg-gradient-to-r from-primary/8 to-primary/4 border-l-4 border-primary rounded-r-2xl p-6 overflow-hidden">
            <div className="absolute top-3 right-4 opacity-10">
              <Award className="w-12 h-12 text-primary" />
            </div>
            <p className="text-primary font-semibold text-[15px] leading-7 relative z-10">
              CVM Finance and Credit Corporation reaffirms its commitment to excellence in every service we
              provide. This recertification is not just an achievement — it is a promise to our 30,000+ clients
              that we will continue to uphold the highest standards of quality in our mission to finance Filipino
              dreams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURED ARTICLE CARD
───────────────────────────────────────────── */

function FeaturedCard({ article }: { article: NewsArticle }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = article.icon;

  return (
    <SectionReveal>
      <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-[0_4px_40px_rgba(8,71,124,0.08)] overflow-hidden hover:shadow-[0_8px_60px_rgba(8,71,124,0.14)] transition-shadow duration-500">
        {/* Featured badge */}
        <div className="absolute top-5 left-5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDDC00] text-[#08477C] text-[10px] font-extrabold tracking-[0.15em] uppercase rounded-full shadow-lg">
            <Star className="w-3 h-3" fill="currentColor" />
            Featured
          </span>
        </div>

        <div className="grid lg:grid-cols-5">
          {/* Image area */}
          <div className="lg:col-span-2 min-h-[240px] lg:min-h-[380px] relative overflow-hidden">
            <ArticleImagePattern pattern={article.imagePattern} gradient={article.gradient} />
            {/* Bottom gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
            {/* Icon chip */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3 py-2">
              <Icon className="w-4 h-4 text-[#FDDC00]" />
              <span className="text-white text-xs font-bold">{article.category}</span>
            </div>
          </div>

          {/* Content area */}
          <div className="lg:col-span-3 p-8 flex flex-col justify-between">
            {/* Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-extrabold tracking-wide rounded-full ${categoryStyles[article.category]}`}>
                  <Tag className="w-3 h-3" />
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-primary/40" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-primary/40" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-extrabold text-primary leading-tight mb-4 group-hover:text-primary/90 transition-colors">
                {article.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {article.excerpt}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { label: "Certified Since", value: "2019" },
                  { label: "Standard", value: "ISO 9001:2015" },
                  { label: "Scope", value: "56+ Branches" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-center min-w-[80px]">
                    <div className="text-sm font-extrabold text-primary">{stat.value}</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Read more toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="group/btn self-start flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:gap-3 hover:shadow-[0_4px_20px_rgba(8,71,124,0.3)]"
            >
              {expanded ? (
                <>
                  <span>Collapse Article</span>
                  <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                </>
              ) : (
                <>
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Expandable full content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-slate-100 mx-8 mb-0" />
              <div className="px-8 pt-8 pb-10">
                <FeaturedArticleContent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}

/* ─────────────────────────────────────────────
   NEWS CARD
───────────────────────────────────────────── */

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const Icon = article.icon;

  return (
    <SectionReveal delay={index * 0.08}>
      <div className="group h-full flex flex-col bg-white rounded-2xl border border-slate-100 shadow-[0_2px_20px_rgba(8,71,124,0.06)] overflow-hidden hover:shadow-[0_8px_40px_rgba(8,71,124,0.14)] hover:-translate-y-1 transition-all duration-400">
        {/* Image area */}
        <div className="h-48 relative overflow-hidden flex-shrink-0">
          <ArticleImagePattern pattern={article.imagePattern} gradient={article.gradient} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          {/* Category chip */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-extrabold tracking-wide rounded-full ${categoryStyles[article.category]}`}>
              {article.category}
            </span>
          </div>
          {/* Icon */}
          <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl flex items-center justify-center">
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <Calendar className="w-3 h-3 text-primary/40" />
              {article.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <Clock className="w-3 h-3 text-primary/40" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-primary text-[15px] leading-snug mb-3 group-hover:text-primary/80 transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-3 flex-1 mb-5">
            {article.excerpt}
          </p>

          {/* Read indicator */}
          <div className="flex items-center gap-2 text-primary text-[13px] font-bold group-hover:gap-3 transition-all duration-300">
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-[3px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </SectionReveal>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY FILTER
───────────────────────────────────────────── */

function CategoryFilter({
  active,
  onChange,
  counts,
}: {
  active: Category;
  onChange: (c: Category) => void;
  counts: Record<Category, number>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
            active === cat
              ? "bg-primary text-white shadow-[0_4px_16px_rgba(8,71,124,0.3)] scale-105"
              : "bg-white text-slate-500 border border-slate-200 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
          }`}
        >
          <span>{cat}</span>
          <span
            className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
              active === cat ? "bg-white/25 text-white" : "bg-slate-100 text-slate-400"
            }`}
          >
            {counts[cat]}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NEWSLETTER STRIP
───────────────────────────────────────────── */

function NewsletterStrip() {
  return (
    <SectionReveal>
      <div className="relative bg-gradient-to-r from-[#08477C] to-[#042B4A] rounded-3xl overflow-hidden p-8 md:p-12">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(253,220,0,1) 1.5px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#FDDC00]/[0.06] rounded-full blur-3xl" />
        <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-blue-300/[0.06] rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#FDDC00] rounded-full animate-pulse" />
              <span className="text-[#FDDC00] text-xs font-extrabold tracking-widest uppercase">Stay Updated</span>
            </div>
            <h3 className="text-white text-2xl font-extrabold leading-tight">
              Never miss a CVM Finance update
            </h3>
            <p className="text-white/60 text-sm mt-1.5 max-w-md">
              Get the latest news, rate updates, and announcements delivered straight to your inbox.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl text-sm outline-none focus:border-[#FDDC00]/60 focus:bg-white/15 transition-all"
            />
            <button className="flex-shrink-0 bg-[#FDDC00] hover:bg-[#FDDC00]/90 text-primary font-extrabold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(253,220,0,0.4)] whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const featured = articles.find((a) => a.featured)!;
  const rest = articles.filter((a) => !a.featured);

  const filtered =
    activeCategory === "All"
      ? rest
      : rest.filter((a) => a.category === activeCategory);

  const counts = categories.reduce((acc, cat) => {
    acc[cat] =
      cat === "All"
        ? articles.length
        : articles.filter((a) => a.category === cat).length;
    return acc;
  }, {} as Record<Category, number>);

  return (
    <>
      <PageBanner
        title="News & Updates"
        subtitle="Stay informed with the latest achievements, announcements, and stories from CVM Finance and Credit Corporation."
        eyebrow="News"
      />

      {/* ── Main content ── */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section heading ── */}
          <SectionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="inline-block text-[11px] font-extrabold text-primary/60 tracking-[0.2em] uppercase mb-2">
                  Latest Stories
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary">
                  CVM Finance in the News
                </h2>
                <div className="h-[3px] w-12 bg-[#FDDC00] rounded-full mt-3" />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <FileText className="w-4 h-4 text-primary/40" />
                <span className="font-medium">{articles.length} articles published</span>
              </div>
            </div>
          </SectionReveal>

          {/* ── Featured article ── */}
          <div className="mb-14">
            <FeaturedCard article={featured} />
          </div>

          {/* ── More articles ── */}
          <div className="mb-8">
            <SectionReveal>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-extrabold text-primary">More Stories</h3>
                <CategoryFilter
                  active={activeCategory}
                  onChange={setActiveCategory}
                  counts={counts}
                />
              </div>
            </SectionReveal>

            {/* Articles grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.length > 0 ? (
                  filtered.map((article, i) => (
                    <NewsCard key={article.id} article={article} index={i} />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-semibold">No articles in this category yet.</p>
                    <button
                      onClick={() => setActiveCategory("All")}
                      className="mt-3 text-primary text-sm font-bold hover:underline"
                    >
                      View all articles
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Newsletter CTA ── */}
          <div className="mt-14">
            <NewsletterStrip />
          </div>
        </div>
      </section>
    </>
  );
}
