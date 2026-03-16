"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Facebook, ExternalLink, Users, Bell } from "lucide-react";

/* ── replace IDs / URLs / counts with real data ── */
const YOUTUBE_VIDEOS = [
  {
    id: "yt-1",
    embedId: "UL0r4f39k1Y", // ← real YouTube video ID
    title: "CVM Finance: Loan Application Made Easy",
    views: "12K views",
    date: "Mar 2025",
    featured: true,
  },
  {
    id: "yt-2",
    embedId: "F6dNMcd6Oxo", // ← real YouTube video ID
    title: "How to Apply for a Pension Loan — Step by Step Guide",
    views: "8.4K views",
    date: "Feb 2025",
    featured: false,
  },
];

const FACEBOOK_VIDEOS = [
  {
    id: "fb-1",
    href: "https://www.facebook.com/reel/2405406276577607", // ← real URL
    title: "CVM Finance Branch Opening Highlight",
    date: "Mar 2025",
    featured: true,
  },
  {
    id: "fb-2",
    href: "https://www.facebook.com/reel/923957890032324", // ← real URL
    title: "Client Testimonials — Trusted Since 1994",
    date: "Jan 2025",
    featured: false,
  },
];

const PLATFORMS = {
  youtube: {
    key: "youtube" as const,
    label: "YouTube",
    Icon: Youtube,
    color: "#FF0000",
    glow: "rgba(255,0,0,0.18)",
    stat: "2.1K subscribers",
    ctaLabel: "Subscribe",
    ctaHref: "https://www.youtube.com/@CVMFinanceCreditCorp",
    ctaHoverBg: "#cc0000",
  },
  facebook: {
    key: "facebook" as const,
    label: "Facebook",
    Icon: Facebook,
    color: "#1877F2",
    glow: "rgba(24,119,242,0.18)",
    stat: "15K followers",
    ctaLabel: "Follow Page",
    ctaHref: "https://www.facebook.com/cvmfinanceandcreditcorp",
    ctaHoverBg: "#1565d8",
  },
};

type Tab = "youtube" | "facebook";

/* ── YouTube Featured Card ── */
function YoutubeFeatured({ video }: { video: typeof YOUTUBE_VIDEOS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        boxShadow: hovered
          ? "0 0 0 1px rgba(255,0,0,0.35), 0 20px 60px rgba(255,0,0,0.18)"
          : "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Red top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF0000] z-20 pointer-events-none" />

      {/* Video embed */}
      <div className="relative w-full aspect-video bg-[#0D0D0D]">
        <iframe
          src={`https://www.youtube.com/embed/${video.embedId}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Meta bar */}
      <div className="bg-[#0F1A2B] border-t border-white/[0.06] px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center flex-shrink-0">
            <Youtube className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm leading-snug truncate">{video.title}</p>
            <p className="text-white/35 text-xs mt-0.5">{video.views} · {video.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold tracking-widest uppercase px-2 py-1 rounded-full bg-[#FF0000]/15 text-[#FF0000] border border-[#FF0000]/20">
            LATEST
          </span>
          <a
            href={`https://www.youtube.com/watch?v=${video.embedId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 hover:text-[#FF0000] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── YouTube Side Card ── */
function YoutubeSideCard({ video, delay }: { video: typeof YOUTUBE_VIDEOS[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#0F1A2B] rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#FF0000]/30 transition-all duration-300 flex-1"
      style={{ minHeight: 0 }}
    >
      <div className="relative w-full aspect-video bg-[#0D0D0D]">
        <iframe
          src={`https://www.youtube.com/embed/${video.embedId}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="p-4 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-white/85 text-xs leading-snug line-clamp-2">{video.title}</p>
          <p className="text-white/30 text-[10px] mt-1">{video.views} · {video.date}</p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${video.embedId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-white/20 hover:text-[#FF0000] transition-colors mt-0.5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

/* ── Facebook Video Card ── */
function FacebookCard({ video, index }: { video: typeof FACEBOOK_VIDEOS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        boxShadow: hovered
          ? "0 0 0 1px rgba(24,119,242,0.4), 0 16px 50px rgba(24,119,242,0.18)"
          : "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Facebook blue top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1877F2] z-20 pointer-events-none" />

      <div className="relative w-full aspect-video bg-[#0D0D0D]">
        <iframe
          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.href)}&show_text=0&width=560&height=315`}
          title={video.title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      </div>

      <div className="bg-[#0F1A2B] border-t border-white/[0.06] px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0">
            <Facebook className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm leading-snug truncate">{video.title}</p>
            <p className="text-white/35 text-xs mt-0.5">{video.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {video.featured && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold tracking-widest uppercase px-2 py-1 rounded-full bg-[#1877F2]/15 text-[#1877F2] border border-[#1877F2]/20">
              LATEST
            </span>
          )}
          <a
            href={video.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 hover:text-[#1877F2] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Export ── */
export default function SocialHighlights() {
  const [activeTab, setActiveTab] = useState<Tab>("youtube");
  const platform = PLATFORMS[activeTab];

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #080E1A 0%, #0A1628 100%)" }}>

      {/* Animated ambient glow — shifts per platform */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + "-glow"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute pointer-events-none"
          style={{
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${platform.glow} 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-[0.2em] uppercase"
                style={{ background: `${platform.color}18`, color: platform.color, border: `1px solid ${platform.color}30` }}>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: platform.color }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                Live Feed
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.07 }}
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3"
            >
              Follow Us &amp;{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: platform.color }}
                >
                  Stay Updated
                </motion.span>
              </AnimatePresence>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="text-white/40 text-base max-w-md"
            >
              Watch our latest videos and announcements from CVM Finance.
            </motion.p>
          </div>

          {/* Platform stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-3 flex-shrink-0"
          >
            {Object.values(PLATFORMS).map(({ key, Icon, color, stat, ctaLabel, ctaHref }) => (
              <a
                key={key}
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: key === activeTab ? `${color}15` : "rgba(255,255,255,0.04)",
                  borderColor: key === activeTab ? `${color}35` : "rgba(255,255,255,0.08)",
                }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
                <div className="hidden sm:block">
                  <p className="text-white font-bold text-xs leading-none">{ctaLabel}</p>
                  <p className="text-white/35 text-[10px] mt-0.5">{stat}</p>
                </div>
                <Users className="w-3 h-3 text-white/25" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Platform tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex gap-2 mb-8 p-1 bg-white/[0.04] border border-white/[0.07] rounded-2xl w-fit"
        >
          {Object.values(PLATFORMS).map(({ key, label, Icon, color }) => {
            const isActive = activeTab === key;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(key)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-200"
                style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.35)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tabBg"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: color }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {label}
                  {isActive && (
                    <motion.span
                      className="flex items-center gap-1 text-[10px] font-extrabold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Bell className="w-3 h-3" />
                    </motion.span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Video layout ── */}
        <AnimatePresence mode="wait">
          {activeTab === "youtube" && (
            <motion.div
              key="youtube-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-5"
            >
              {/* Featured large — left 3 cols */}
              <div className="lg:col-span-3">
                <YoutubeFeatured video={YOUTUBE_VIDEOS[0]} />
              </div>

              {/* Sidebar — right 2 cols */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <YoutubeSideCard video={YOUTUBE_VIDEOS[1]} delay={0.15} />

                {/* Subscribe CTA card */}
                <motion.a
                  href={PLATFORMS.youtube.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex-shrink-0 relative rounded-xl overflow-hidden border border-[#FF0000]/20 hover:border-[#FF0000]/50 transition-all duration-300 p-6 flex flex-col justify-between"
                  style={{ background: "linear-gradient(135deg, #1A0505 0%, #2A0808 100%)" }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="w-10 h-10 rounded-xl bg-[#FF0000] flex items-center justify-center mb-4">
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-extrabold text-base mb-1">Subscribe to Our Channel</p>
                    <p className="text-white/40 text-xs mb-4">Get notified on new videos &amp; updates</p>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF0000] text-white text-xs font-bold group-hover:bg-[#cc0000] transition-colors">
                      <Bell className="w-3.5 h-3.5" />
                      Subscribe
                    </span>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          )}

          {activeTab === "facebook" && (
            <motion.div
              key="facebook-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {FACEBOOK_VIDEOS.map((video, i) => (
                  <FacebookCard key={video.id} video={video} index={i} />
                ))}
              </div>

              {/* Facebook follow banner */}
              <motion.a
                href={PLATFORMS.facebook.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group relative flex items-center justify-between gap-6 px-8 py-6 rounded-2xl overflow-hidden border border-[#1877F2]/20 hover:border-[#1877F2]/50 transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #040D1F 0%, #071428 100%)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#1877F2]/[0.06] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-64 bg-[#1877F2]/[0.05] rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-4 relative">
                  <div className="w-12 h-12 rounded-2xl bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-extrabold text-lg leading-tight">Follow CVM Finance</p>
                    <p className="text-white/40 text-sm">Stay connected — 15K+ followers &amp; growing</p>
                  </div>
                </div>
                <span className="relative flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1877F2] text-white font-bold text-sm group-hover:bg-[#1565d8] transition-colors shadow-[0_4px_20px_rgba(24,119,242,0.35)]">
                  <Users className="w-4 h-4" />
                  Follow Page
                </span>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
