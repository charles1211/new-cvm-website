"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  stats: string[];
  color: string;
}

/* ── Animated progress line ── */
function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-7 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none">
      {/* Base track */}
      <div className="absolute inset-0 bg-slate-100" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-primary/60 via-primary to-[#FDDC00]"
        style={{ scaleY, bottom: 0 }}
      />
    </div>
  );
}

/* ── Single timeline entry ── */
function TimelineEntry({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -60 : 60,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 18,
        delay: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.4, rotate: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.85 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 160,
        damping: 14,
        delay: 0.35 + i * 0.08,
      },
    }),
  };

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* ── Year badge (center) ── */}
      <div className="relative flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6 z-20">
        {/* Ping rings — only when in view */}
        {isInView && (
          <>
            <motion.div
              className="absolute inset-0 rounded-2xl bg-primary/25"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl bg-primary/15"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
            />
          </>
        )}

        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`relative w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(8,71,124,0.35)] border-2 border-white`}
        >
          <span className="text-[#FDDC00] font-extrabold text-[11px] leading-none tracking-tight">
            {item.year.slice(0, 2)}
          </span>
          <span className="text-[#FDDC00] font-extrabold text-[11px] leading-none tracking-tight">
            {item.year.slice(2)}
          </span>
          {/* Shine overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* ── Content card ── */}
      <div
        className={`md:w-[calc(50%-4rem)] ${
          isEven ? "md:mr-auto md:pr-2" : "md:ml-auto md:pl-2"
        } ml-8 md:ml-0 w-full`}
      >
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_2px_20px_rgba(8,71,124,0.06)] overflow-hidden cursor-default"
          whileHover={{
            y: -4,
            boxShadow: "0 16px 48px rgba(8,71,124,0.14)",
            borderColor: "rgba(8,71,124,0.2)",
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          {/* Accent corner */}
          <motion.div
            className={`absolute top-0 ${isEven ? "right-0" : "left-0"} w-24 h-1 bg-gradient-to-r from-primary to-[#FDDC00]`}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: isEven ? "right" : "left" }}
          />

          {/* Ghost year */}
          <motion.span
            className="absolute -bottom-3 -right-2 text-7xl font-extrabold text-primary/[0.045] select-none pointer-events-none leading-none"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {item.year}
          </motion.span>

          {/* Year label */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xs font-extrabold text-primary/40 tracking-[0.2em] uppercase mb-1"
          >
            {item.year}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold text-primary text-xl mb-2"
          >
            {item.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-500 text-sm leading-relaxed mb-5"
          >
            {item.desc}
          </motion.p>

          {/* Stats chips */}
          <div className="flex flex-wrap gap-2">
            {item.stats.map((s, si) => (
              <motion.span
                key={s}
                custom={si}
                variants={statVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-flex items-center gap-1.5 bg-primary/6 hover:bg-primary/12 text-primary text-xs font-bold px-3 py-1.5 rounded-xl border border-primary/10 transition-colors duration-200 cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function TimelineSection({ timeline }: { timeline: TimelineItem[] }) {
  return (
    <div className="relative mt-4">
      <TimelineLine />
      <div className="space-y-10">
        {timeline.map((item, i) => (
          <TimelineEntry key={item.year} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
