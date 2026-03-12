"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Financing Filipino Dreams",
    subtitle: "Fast, reliable, and accessible loans for every Filipino.",
    cta: { label: "View Products", href: "/products" },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80",
    overlayFrom: "from-[#08477C]/90",
    overlayVia: "via-[#08477C]/65",
    overlayTo: "to-[#031D33]/50",
  },
  {
    id: 2,
    title: "Calculate Your Loan Today",
    subtitle: "Get an instant estimate of your loan amount and monthly payments with our easy calculator.",
    cta: { label: "Try Calculator", href: "/loan-calculator" },
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80",
    overlayFrom: "from-[#063963]/90",
    overlayVia: "via-[#08477C]/65",
    overlayTo: "to-[#0a5a96]/40",
  },
  {
    id: 3,
    title: "50+ branches across Luzon",
    subtitle: "Find the nearest CVM Finance branch and get your loan approved today.",
    cta: { label: "Find a Branch", href: "/branches" },
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80",
    overlayFrom: "from-[#031D33]/90",
    overlayVia: "via-[#08477C]/70",
    overlayTo: "to-[#0d5fa3]/40",
  },
];

/* ─── Typewriter hook ─── */
function useTypewriter(text: string, delay = 600, speed = 38) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setStarted(false);
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [started, text, speed]);

  return displayed;
}

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const typedSubtitle = useTypewriter(slides[selected].subtitle, 700, 36);
  const isTypingDone = typedSubtitle.length === slides[selected].subtitle.length;

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={slide.id} className="relative flex-[0_0_100%] h-full bg-[#08477C]">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayFrom} ${slide.overlayVia} ${slide.overlayTo}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031D33]/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,220,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,220,0,1) 1px, transparent 1px)",
                  backgroundSize: "80px 80px",
                }}
              />
              {/* Floating blobs */}
              <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-20 right-40 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={selected === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      {/* ── ISO 9001:2015 Badge — Outstanding ── */}
                      <div className="flex items-center gap-3 mb-7">
                        <div className="relative flex items-center">
                          {/* Pulsing glow rings */}
                          <span className="absolute inset-0 rounded-full bg-[#FDDC00]/30 animate-ping scale-125" />
                          <span className="absolute inset-0 rounded-full bg-[#FDDC00]/15 animate-ping scale-150" style={{ animationDelay: "0.4s" }} />
                          {/* Icon container */}
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

                        {/* Verified pill */}
                        <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#FDDC00]/15 border border-[#FDDC00]/30 text-[#FDDC00] text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-[#FDDC00] rounded-full" />
                          Verified
                        </span>
                      </div>

                      {/* Headline */}
                      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-none mb-6">
                        {slide.title.split(" ").map((word, wi) =>
                          ["Dreams", "Today", "Nationwide", "Luzon"].includes(word) ? (
                            <span key={wi} className="text-secondary"> {word}</span>
                          ) : (
                            <span key={wi}> {word}</span>
                          )
                        )}
                      </h1>

                      {/* ── Typewriter subtitle ── */}
                      {selected === i && (
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
                      )}

                      {/* CTA buttons */}
                      <AnimatePresence>
                        {selected === i && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-wrap gap-4"
                          >
                            <Link
                              href={slide.cta.href}
                              className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-all duration-300 hover:shadow-glow-yellow active:scale-95 text-base"
                            >
                              {slide.cta.label}
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

                      {/* Stats row */}
                      <div className="flex gap-8 mt-12">
                        {[
                          { value: "50+", label: "Branches" },
                          { value: "30K+", label: "Clients" },
                          { value: "6", label: "Products" },
                        ].map((stat) => (
                          <div key={stat.label} className="text-center">
                            <p className="text-2xl font-extrabold text-secondary leading-none">{stat.value}</p>
                            <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${selected === i ? "bg-secondary w-8" : "bg-white/40 w-2 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-center gap-2 opacity-50">
        <div className="w-0.5 h-12 bg-white/30 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 w-full bg-secondary rounded-full"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ height: "40%" }}
          />
        </div>
        <span className="text-white text-xs tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
      </div>
    </section>
  );
}
