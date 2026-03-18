"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AUTOPLAY_MS = 8000;

const slides = [
  {
    id: 1,
    title: "Financing Filipino Dreams",
    subtitle: "Fast, reliable, and accessible loans for every Filipino.",
    cta: { label: "View Products", href: "/products" },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
    panFrom: { scale: 1.08, x: "0%", y: "0%" },
    panTo:   { scale: 1.18, x: "2%",  y: "-1%" },
  },
  {
    id: 2,
    title: "Calculate Your Loan Today",
    subtitle: "Get an instant estimate of your loan amount and monthly payments with our easy calculator.",
    cta: { label: "Try Calculator", href: "/loan-calculator" },
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80",
    panFrom: { scale: 1.10, x: "2%",  y: "0%" },
    panTo:   { scale: 1.20, x: "-2%", y: "-1%" },
  },
  {
    id: 3,
    title: "50+ Branches Nationwide",
    subtitle: "Find the nearest CVM Finance branch and get your loan approved today.",
    cta: { label: "Find a Branch", href: "/branches" },
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80",
    panFrom: { scale: 1.06, x: "-1%", y: "0%" },
    panTo:   { scale: 1.15, x: "1%",  y: "-2%" },
  },
];

/* ── 3D content slide variants ── */
const contentVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "32%" : "-32%",
    rotateY: dir > 0 ? 22 : -22,
    opacity: 0,
    scale: 0.84,
  }),
  center: {
    x: "0%",
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-32%" : "32%",
    rotateY: dir > 0 ? -22 : 22,
    opacity: 0,
    scale: 0.84,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Typewriter hook ── */
function useTypewriter(text: string, delay = 700, speed = 36) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setStarted(false);
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [started, text, speed]);

  return displayed;
}

export default function HeroCarousel() {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* ── Autoplay timer ── */
  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setSelected((s) => (s + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startTimer]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setSelected((s) => (s === 0 ? slides.length - 1 : s - 1));
    startTimer();
  }, [startTimer]);

  const goNext = useCallback(() => {
    setDirection(1);
    setSelected((s) => (s + 1) % slides.length);
    startTimer();
  }, [startTimer]);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > selected ? 1 : -1);
      setSelected(i);
      startTimer();
    },
    [selected, startTimer]
  );

  const typedSubtitle = useTypewriter(slides[selected].subtitle, 700, 36);
  const isTypingDone = typedSubtitle.length === slides[selected].subtitle.length;
  const slideNum = String(selected + 1).padStart(2, "0");
  const totalNum = String(slides.length).padStart(2, "0");

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-[#031D33]">

      {/* ── Background images: all in DOM for preload + Ken Burns ── */}
      {slides.map((slide, i) => (
        <motion.div
          key={`bg-${slide.id}`}
          className="absolute inset-0"
          animate={{ opacity: selected === i ? 1 : 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        >
          {/* Ken Burns: key flip between on/off restarts the animation cleanly */}
          <motion.div
            key={`kb-${slide.id}-${selected === i ? "on" : "off"}`}
            className="absolute inset-[-10%] bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url('${slide.image}')` }}
            initial={slide.panFrom}
            animate={selected === i ? slide.panTo : slide.panFrom}
            transition={
              selected === i
                ? { duration: AUTOPLAY_MS / 1000 + 1.5, ease: "linear" }
                : { duration: 0 }
            }
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#031D33]/90 via-[#08477C]/60 to-[#FDDC00]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031D33]/88 via-[#031D33]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#031D33]/40 via-transparent to-transparent" />
        </motion.div>
      ))}

      {/* ── Ambient: grid texture + glow orb ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,220,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,220,0,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl z-[1] pointer-events-none"
        style={{ background: "rgba(253,220,0,0.07)" }} />

      {/* ── 3D content — perspective wrapper (isolated) ── */}
      <div className="absolute inset-0 z-[2]" style={{ perspective: "1100px" }}>
        <AnimatePresence custom={direction} mode="sync">
          <motion.div
            key={selected}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <div
                    className="p-8 md:p-10 rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(3,29,51,0.72) 0%, rgba(8,71,124,0.38) 70%, rgba(253,220,0,0.06) 100%)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(253,220,0,0.12)",
                      boxShadow:
                        "0 8px 56px rgba(3,29,51,0.55), inset 0 1px 0 rgba(253,220,0,0.07)",
                    }}
                  >
                    {/* ── ISO badge ── */}
                    <div className="flex items-center gap-3 mb-7">
                      <div className="relative flex items-center">
                        <span className="absolute inset-0 rounded-full bg-[#FDDC00]/30 animate-ping scale-125" />
                        <span
                          className="absolute inset-0 rounded-full bg-[#FDDC00]/15 animate-ping scale-150"
                          style={{ animationDelay: "0.4s" }}
                        />
                        <div className="relative w-11 h-11 bg-gradient-to-br from-[#FDDC00] to-[#f5c800] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(253,220,0,0.5)] z-10">
                          <Award className="w-5 h-5 text-[#08477C]" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#FDDC00] font-black text-base sm:text-lg leading-none tracking-wide">
                          ISO 9001:2015
                        </span>
                        <span className="text-white/60 text-[10px] font-bold tracking-[0.18em] uppercase mt-0.5">
                          Quality Management Certified
                        </span>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#FDDC00]/15 border border-[#FDDC00]/30 text-[#FDDC00] text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 bg-[#FDDC00] rounded-full" />
                        Verified
                      </span>
                    </div>

                    {/* ── Headline ── */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-none mb-6">
                      {slides[selected].title.split(" ").map((word, wi) =>
                        ["Dreams", "Today", "Nationwide", "Luzon"].includes(word) ? (
                          <span key={wi} className="text-secondary"> {word}</span>
                        ) : (
                          <span key={wi}> {word}</span>
                        )
                      )}
                    </h1>

                    {/* ── Typewriter subtitle ── */}
                    <div className="text-white/75 text-lg sm:text-xl mb-10 leading-relaxed max-w-lg min-h-[3.5rem] flex items-start">
                      <span>
                        {typedSubtitle}
                        {!isTypingDone && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
                            className="inline-block w-0.5 h-5 bg-[#FDDC00] ml-0.5 align-middle rounded-full"
                          />
                        )}
                      </span>
                    </div>

                    {/* ── CTA buttons ── */}
                    <AnimatePresence>
                      {isTypingDone && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-wrap gap-4"
                        >
                          <Link
                            href={slides[selected].cta.href}
                            className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-all duration-300 hover:shadow-glow-yellow active:scale-95 text-base"
                          >
                            {slides[selected].cta.label}
                            <ChevronRight className="w-5 h-5" />
                          </Link>
                          <Link
                            href="/contacts"
                            className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 active:scale-95 text-base"
                          >
                            Inquire Now
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ── Stats row ── */}
                    <div className="flex gap-8 mt-12">
                      {[
                        { value: "50+", label: "Branches" },
                        { value: "30K+", label: "Clients" },
                        { value: "6", label: "Products" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className="text-2xl font-extrabold text-secondary leading-none">
                            {stat.value}
                          </p>
                          <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Slide counter: top-right ── */}
      <div className="absolute top-8 right-8 z-30 hidden md:flex items-center gap-2 select-none">
        <span className="text-white font-extrabold text-xl tracking-wider">{slideNum}</span>
        <div className="w-8 h-px bg-white/25" />
        <span className="text-white/30 font-bold text-sm tracking-wider">{totalNum}</span>
      </div>

      {/* ── Navigation arrows ── */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Dot indicators with autoplay progress fill ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative overflow-hidden rounded-full transition-all duration-300"
            style={{
              width: selected === i ? 40 : 8,
              height: 4,
              background:
                selected === i ? "transparent" : "rgba(255,255,255,0.30)",
            }}
          >
            {selected === i && (
              <>
                <div className="absolute inset-0 rounded-full bg-white/20" />
                <motion.div
                  key={`progress-${selected}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-[#FDDC00]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              </>
            )}
          </button>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-center gap-2 opacity-40">
        <div className="w-0.5 h-12 bg-white/30 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 w-full bg-secondary rounded-full"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ height: "40%" }}
          />
        </div>
        <span
          className="text-white text-xs tracking-widest uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
