"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Globe,
  ArrowRight,
  MessageCircle,
  LayoutGrid,
  ClipboardList,
  Send,
  CalendarDays,
  Clock,
  RotateCcw,
  Wallet,
  RefreshCw,
  Facebook,
  FileText,
  Smartphone,
  Bell,
  Folder,
  ChevronRight,
  Sparkles,
  Building2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

type Phase = {
  id: string;
  label: string;
  color: string;
  accent: string;
  textColor: string;
  steps: BranchStep[];
};

type BranchStep = {
  step: number;
  en: string;
  tl: string;
  icon: React.ElementType;
  tip?: string;
};

const phases: Phase[] = [
  {
    id: "inquire",
    label: "Inquire",
    color: "from-[#08477C] to-[#0a5a9e]",
    accent: "#FDDC00",
    textColor: "text-white",
    steps: [
      { step: 1, en: "Inquire at nearest branch", tl: "Magtanong sa pinakamalapit na sangay", icon: MessageCircle, tip: "Visit any of our 56+ branches" },
      { step: 2, en: "Choose preferred product/service", tl: "Pumili ng gustong produkto/serbisyo", icon: LayoutGrid, tip: "We offer pension, salary, and business loans" },
    ],
  },
  {
    id: "prepare",
    label: "Prepare",
    color: "from-[#FDDC00] to-[#f0ce00]",
    accent: "#08477C",
    textColor: "text-primary",
    steps: [
      { step: 3, en: "Complete requirements", tl: "Kumpletuhin ang mga kinakailangan", icon: ClipboardList, tip: "Valid IDs, payslips, and supporting documents" },
      { step: 4, en: "Submit requirements to branch", tl: "Isumite ang mga kinakailangan sa sangay", icon: Send, tip: "Our staff will assist you" },
    ],
  },
  {
    id: "process",
    label: "Process",
    color: "from-[#1e293b] to-[#0f172a]",
    accent: "#FDDC00",
    textColor: "text-white",
    steps: [
      { step: 5, en: "Wait for Credit Investigation schedule", tl: "Maghintay ng schedule ng Credit Investigation", icon: CalendarDays, tip: "We'll notify you of your CI schedule" },
      { step: 6, en: "Wait for approval or rejection result", tl: "Maghintay ng resulta ng pag-apruba/pagtanggi", icon: Clock, tip: "Results usually within 3–5 business days" },
      { step: 7, en: "Reapply after 3 months if rejected", tl: "Mag-apply ulit pagkatapos ng 3 buwan kung tinanggihan", icon: RotateCcw, tip: "Use the time to improve your documents" },
    ],
  },
  {
    id: "collect",
    label: "Collect",
    color: "from-[#065f46] to-[#047857]",
    accent: "#FDDC00",
    textColor: "text-white",
    steps: [
      { step: 8, en: "Retrieve your approved loan", tl: "Kunin ang aprubadong loan", icon: Wallet, tip: "Bring a valid ID when claiming" },
      { step: 9, en: "Renew your loan after the first term", tl: "I-renew ang loan pagkatapos ng unang termino", icon: RefreshCw, tip: "Loyal clients enjoy faster renewal" },
    ],
  },
];

const onlineSteps = [
  { step: 1, text: "Visit the CVM Facebook page", icon: Facebook, hasLink: true, linkLabel: "Visit Facebook Page", href: "https://www.facebook.com/cvmfinancecredit", note: "Message us directly for faster response" },
  { step: 2, text: "Provide your loan details for renewal or extension", icon: FileText, note: "Include your account number and loan type" },
  { step: 3, text: "Provide your GCash or bank account details for cash refund", icon: Smartphone, note: "Required for digital disbursement" },
  { step: 4, text: "Wait for branch message regarding your schedule", icon: Bell, note: "Expect a reply within 1–2 business days" },
  { step: 5, text: "Prepare all required documents for your visit", icon: Folder, note: "Valid ID and existing loan documents" },
  { step: 6, text: "Visit the official website for additional information", icon: Globe, hasLink: true, linkLabel: "Visit Website", href: "/", note: "Find branches, products, and more" },
];

/* ─────────────────────────────────────────────
   PHASE CARD
───────────────────────────────────────────── */

function PhaseSection({ phase, phaseIndex }: { phase: Phase; phaseIndex: number }) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const isYellow = phase.id === "prepare";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: phaseIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Phase header */}
      <div className="flex items-center gap-4 mb-5">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${phase.color} shadow-lg`}>
          <span className={`text-[10px] font-extrabold tracking-[0.2em] uppercase ${phase.textColor}`}>
            Phase {phaseIndex + 1}
          </span>
          <span className="w-px h-3 bg-white/30" />
          <span className={`text-sm font-extrabold ${phase.textColor}`}>{phase.label}</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
      </div>

      {/* Steps grid */}
      <div className={`grid gap-4 ${phase.steps.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {phase.steps.map((step, si) => {
          const Icon = step.icon;
          const isActive = activeStep === step.step;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: phaseIndex * 0.1 + si * 0.07, type: "spring", stiffness: 120, damping: 16 }}
              onHoverStart={() => setActiveStep(step.step)}
              onHoverEnd={() => setActiveStep(null)}
              className="relative group cursor-default"
            >
              <motion.div
                className="relative h-full bg-white border border-slate-100 rounded-2xl p-6 overflow-hidden"
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 50px rgba(8,71,124,0.13)",
                  borderColor: "rgba(8,71,124,0.2)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                {/* Phase color top bar */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${phase.color}`}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: phaseIndex * 0.1 + si * 0.07 + 0.3 }}
                  style={{ transformOrigin: "left" }}
                />

                {/* Ghost step number */}
                <div className="absolute -bottom-3 -right-2 text-8xl font-extrabold text-slate-50 select-none pointer-events-none leading-none">
                  {step.step}
                </div>

                {/* Step number badge */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg`}>
                    <Icon className={`w-5 h-5 ${isYellow ? "text-primary" : "text-white"}`} />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="text-[10px] font-extrabold text-slate-300 tracking-[0.18em] uppercase mb-1">
                      Step {step.step}
                    </div>
                    <h3 className="font-extrabold text-primary text-[15px] leading-snug mb-1.5">
                      {step.en}
                    </h3>
                    <p className="text-slate-400 text-xs italic leading-relaxed mb-3">{step.tl}</p>

                    {/* Tip — reveals on hover */}
                    <AnimatePresence>
                      {isActive && step.tip && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-start gap-1.5 bg-primary/5 border border-primary/10 rounded-xl px-3 py-2">
                            <Sparkles className="w-3 h-3 text-primary/50 flex-shrink-0 mt-0.5" />
                            <span className="text-[11px] text-primary/70 font-medium leading-relaxed">{step.tip}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ONLINE STEP
───────────────────────────────────────────── */

function OnlineStep({ step, index }: { step: typeof onlineSteps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 18, delay: index * 0.07 }}
      className="group relative flex items-start gap-5"
    >
      {/* Connector line */}
      {index < onlineSteps.length - 1 && (
        <div className="absolute left-5 top-12 w-px h-[calc(100%+1rem)] bg-gradient-to-b from-primary/20 to-transparent" />
      )}

      {/* Icon */}
      <motion.div
        className="relative flex-shrink-0 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(8,71,124,0.25)] z-10"
        whileHover={{ scale: 1.15, rotate: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Ping on entry */}
        {isInView && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-primary/40"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1, delay: index * 0.07 + 0.3 }}
          />
        )}
        <Icon className="w-4.5 h-4.5 text-[#FDDC00]" />
      </motion.div>

      {/* Card */}
      <motion.div
        className="flex-1 bg-white border border-slate-100 rounded-2xl p-5 mb-4 overflow-hidden"
        whileHover={{
          y: -3,
          boxShadow: "0 12px 40px rgba(8,71,124,0.1)",
          borderColor: "rgba(8,71,124,0.2)",
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-[10px] font-extrabold text-primary/30 tracking-[0.2em] uppercase mb-1">Step {step.step}</div>
            <p className="font-bold text-primary text-[15px] leading-snug mb-1">{step.text}</p>
            <p className="text-slate-400 text-xs leading-relaxed">{step.note}</p>
          </div>
          <div className="flex-shrink-0 text-4xl font-extrabold text-slate-50 leading-none select-none">
            {step.step}
          </div>
        </div>

        {step.hasLink && (
          <motion.a
            href={step.href}
            target={step.href?.startsWith("http") ? "_blank" : undefined}
            rel={step.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 mt-3 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
            whileHover={{ x: 2 }}
          >
            <Globe className="w-3.5 h-3.5" />
            {step.linkLabel}
            <ArrowRight className="w-3 h-3" />
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function LoanPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="pt-32 pb-20 bg-[#FDDC00] relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(8,71,124,1) 1.5px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/[0.05] rounded-full blur-3xl pointer-events-none" />



        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              CVM Finance Guide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-extrabold text-primary leading-[1.05] tracking-tight mb-4"
          >
            Paano<br />
            <span className="relative">
              Mag-Loan?
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-[4px] bg-primary/30 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-primary/70 text-xl font-semibold mb-2"
          >
            Mag loan na sa pinaka malapit na CVM Finance Branches!
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="text-primary/45 text-sm italic mb-10"
          >
            How to get a loan at the nearest CVM Finance branch!
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { label: "9 Branch Steps", icon: Building2 },
              // { label: "6 Online Steps", icon: Globe },
              { label: "56 Branches", icon: MapPin },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-primary/15 text-primary text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm">
                <Icon className="w-4 h-4" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BRANCH STEPS
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 text-[11px] font-extrabold text-primary/50 tracking-[0.22em] uppercase mb-3"
            >
              <span className="w-8 h-px bg-primary/30" />
              Branch Process
              <span className="w-8 h-px bg-primary/30" />
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl font-extrabold text-primary leading-tight"
            >
              Apply at a{" "}
              <span className="relative">
                Branch Near You
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#FDDC00] rounded-full" />
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-slate-500 text-base mt-4 max-w-lg mx-auto"
            >
              Visit any of our 50+ branches and follow these 9 simple steps.
            </motion.p>
          </div>

          {/* Phase flow */}
          <div className="space-y-10">
            {phases.map((phase, pi) => (
              <div key={phase.id}>
                <PhaseSection phase={phase} phaseIndex={pi} />
                {/* Arrow connector between phases */}
                {pi < phases.length - 1 && (
                  <motion.div
                    className="flex justify-center my-4"
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-6 bg-gradient-to-b from-slate-200 to-primary/30" />
                      <ChevronRight className="w-5 h-5 text-primary/30 rotate-90" />
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ONLINE STEPS
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[11px] font-extrabold text-primary/50 tracking-[0.22em] uppercase mb-3"
            >
              <span className="w-8 h-px bg-primary/30" />
              Online Process
              <span className="w-8 h-px bg-primary/30" />
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl font-extrabold text-primary leading-tight"
            >
              Apply{" "}
              <span className="relative">
                Online
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#FDDC00] rounded-full" />
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-slate-500 text-base mt-4"
            >
              For loan renewals and extensions, you can also process online through our Facebook page.
            </motion.p>
          </div>

          {/* Online steps list */}
          <div>
            {onlineSteps.map((step, i) => (
              <OnlineStep key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#08477C] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(253,220,0,1) 1.5px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FDDC00]/30 to-transparent" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-[#FDDC00]/[0.05] rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FDDC00]/15 text-[#FDDC00] border border-[#FDDC00]/25 rounded-full text-[11px] font-extrabold tracking-[0.2em] uppercase mb-5">
              <span className="w-1.5 h-1.5 bg-[#FDDC00] rounded-full animate-pulse" />
              Start Today
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Ready to Apply?
            </h2>
            <p className="text-white/60 text-lg max-w-md mx-auto">
              Visit your nearest branch or contact us today to start your loan application.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto"
          >
            {/* Find Branch */}
            <Link href="/branches">
              <motion.div
                className="group flex items-center gap-4 bg-[#FDDC00] rounded-2xl p-5 cursor-pointer"
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(253,220,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-[#FDDC00]" />
                </div>
                <div>
                  <p className="font-extrabold text-primary text-base leading-tight">Find a Branch</p>
                  <p className="text-primary/60 text-xs mt-0.5">50+ locations nationwide</p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary ml-auto group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>

            {/* Contact Us */}
            <Link href="/contacts">
              <motion.div
                className="group flex items-center gap-4 bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 hover:border-white/30 rounded-2xl p-5 cursor-pointer"
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-extrabold text-white text-base leading-tight">Contact Us</p>
                  <p className="text-white/50 text-xs mt-0.5">Get in touch with our team</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/50 ml-auto group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
