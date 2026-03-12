"use client";
import { useState, useCallback } from "react";
import {
  Calculator,
  Info,
  TrendingUp,
  DollarSign,
  AlertCircle,
  ChevronRight,
  Minus,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CalcResult {
  loanAmount: number;
  grossInterest: number;
  docFee: number;
  comFee: number;
  spf: number;
  netProceeds: number;
}

const DEFAULT_INTEREST_RATE = 1.8;
const DOC_FEE = 500;
const COM_FEE_RATE = 0.01;
const SPF_RATE = 0.005;

function calculateLoan(monthly: number, terms: number, rate: number): CalcResult {
  const loanAmount = monthly * terms;
  const grossInterest = loanAmount * (rate / 100) * terms;
  const comFee = loanAmount * COM_FEE_RATE;
  const spf = loanAmount * SPF_RATE;
  const netProceeds = loanAmount - grossInterest - DOC_FEE - comFee - spf;
  return { loanAmount, grossInterest, docFee: DOC_FEE, comFee, spf, netProceeds };
}

const TERM_PRESETS = [6, 12, 24, 36, 48, 60];

const feeItems = [
  {
    icon: TrendingUp,
    label: "Interest Rate",
    value: `${DEFAULT_INTEREST_RATE}% / month`,
    sub: "Fixed rate",
  },
  {
    icon: DollarSign,
    label: "Documentation Fee",
    value: "₱500",
    sub: "One-time flat fee",
  },
  {
    icon: TrendingUp,
    label: "Commission Fee",
    value: "1.0%",
    sub: "Of gross loan amount",
  },
  {
    icon: Info,
    label: "Service & Processing Fee",
    value: "0.5%",
    sub: "Of gross loan amount",
  },
];

export default function PensionLoanCalculator() {
  const [monthly, setMonthly] = useState<string>("");
  const [terms, setTerms] = useState<string>("");
  const [errors, setErrors] = useState<{ monthly?: string; terms?: string }>({});
  const [result, setResult] = useState<CalcResult | null>(null);

  const validate = useCallback(() => {
    const errs: { monthly?: string; terms?: string } = {};
    const m = parseFloat(monthly);
    const t = parseInt(terms);
    if (!monthly || isNaN(m) || m < 2000)
      errs.monthly = "Monthly pension must be at least ₱2,000";
    if (!terms || isNaN(t) || t <= 0) errs.terms = "Terms must be greater than 0";
    return errs;
  }, [monthly, terms]);

  const handleCalculate = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setResult(calculateLoan(parseFloat(monthly), parseInt(terms), DEFAULT_INTEREST_RATE));
    }
  };

  const handleInput = (field: "monthly" | "terms", value: string) => {
    if (field === "monthly") setMonthly(value);
    else setTerms(value);
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    const m = field === "monthly" ? parseFloat(value) : parseFloat(monthly);
    const t = field === "terms" ? parseInt(value) : parseInt(terms);
    if (m >= 2000 && t > 0 && !isNaN(m) && !isNaN(t)) {
      setResult(calculateLoan(m, t, DEFAULT_INTEREST_RATE));
    }
  };

  const handleTermPreset = (t: number) => {
    handleInput("terms", String(t));
  };

  const deductionTotal = result
    ? result.grossInterest + result.docFee + result.comFee + result.spf
    : 0;
  const netPct = result && result.loanAmount > 0
    ? Math.max(0, (result.netProceeds / result.loanAmount) * 100)
    : 0;

  return (
    <section className="py-16 bg-[#F0F4F8] relative overflow-hidden">
      {/* Faint background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">

          {/* ── LEFT PANEL: Info ── */}
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{ background: "linear-gradient(150deg, #031D33 0%, #08477C 100%)" }}
          >
            {/* Yellow glow top-right */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FDDC00]/10 rounded-full blur-3xl pointer-events-none" />
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative z-10 p-8 lg:p-10">
              {/* Icon + title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FDDC00]/30 rounded-2xl blur-lg scale-125" />
                  <div className="relative w-14 h-14 bg-[#FDDC00]/15 border border-[#FDDC00]/30 rounded-2xl flex items-center justify-center">
                    <Calculator className="w-7 h-7 text-[#FDDC00]" />
                  </div>
                </div>
                <div>
                  <p className="text-[#FDDC00]/60 text-[10px] font-bold tracking-[0.2em] uppercase">
                    Pension Loan
                  </p>
                  <h2 className="text-white font-extrabold text-xl leading-tight">
                    Loan Calculator
                  </h2>
                </div>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-8">
                For SSS and GSIS pensioners. Enter your monthly pension and loan term to get an instant breakdown of your estimated proceeds.
              </p>

              {/* Fee structure */}
              <div className="mb-8">
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.18em] mb-4">
                  Fee Structure
                </p>
                <div className="space-y-3">
                  {feeItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 py-3 px-4 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div className="w-8 h-8 bg-[#FDDC00]/10 border border-[#FDDC00]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-[#FDDC00]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/45 text-[10px]">{item.label}</p>
                        <p className="text-white font-bold text-sm">{item.value}</p>
                      </div>
                      <p className="text-white/30 text-[10px] text-right flex-shrink-0">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div className="mb-8 space-y-2">
                {[
                  "No collateral required",
                  "Fast 3–5 day processing",
                  "For SSS & GSIS pensioners",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-white/65">
                    <CheckCircle2 className="w-4 h-4 text-[#FDDC00] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(253,220,0,0.06)",
                  border: "1px solid rgba(253,220,0,0.18)",
                }}
              >
                <p className="text-[#FDDC00] text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  Estimate Only
                </p>
                <p className="text-white/50 text-xs leading-relaxed">
                  Actual amounts may vary. Visit your nearest branch for a precise, personalized quote.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Form ── */}
          <div className="rounded-3xl bg-white shadow-[0_8px_40px_rgba(8,71,124,0.10)] border border-slate-100 overflow-hidden">
            {/* Header bar */}
            <div
              className="px-8 py-5 border-b border-slate-100"
              style={{ background: "linear-gradient(90deg, #f8fafc 0%, #f0f7ff 100%)" }}
            >
              <h3 className="text-[#08477C] font-extrabold text-lg">Enter Your Details</h3>
              <p className="text-slate-400 text-xs mt-0.5">Results update automatically as you type</p>
            </div>

            <div className="p-8 space-y-6">
              {/* Monthly Pension */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Monthly Pension <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <span className="text-[#08477C] font-extrabold text-base">₱</span>
                    <div className="w-px h-4 bg-slate-200" />
                  </div>
                  <input
                    type="number"
                    min={2000}
                    placeholder="e.g. 15000"
                    value={monthly}
                    onChange={(e) => handleInput("monthly", e.target.value)}
                    className={`w-full h-[52px] pl-12 pr-4 rounded-2xl border-2 text-slate-800 font-semibold text-base transition-all duration-200 focus:outline-none focus:border-[#08477C] focus:shadow-[0_0_0_4px_rgba(8,71,124,0.08)] ${
                      errors.monthly
                        ? "border-red-300 bg-red-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {errors.monthly && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-1.5 text-red-500 text-xs mt-2"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.monthly}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Loan Term <span className="text-red-500">*</span>
                </label>

                {/* Quick preset pills */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {TERM_PRESETS.map((t) => {
                    const isActive = parseInt(terms) === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleTermPreset(t)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95"
                        style={
                          isActive
                            ? {
                                background: "#08477C",
                                color: "#fff",
                                boxShadow: "0 2px 12px rgba(8,71,124,0.3)",
                              }
                            : {
                                background: "#F1F5F9",
                                color: "#64748B",
                                border: "1px solid #E2E8F0",
                              }
                        }
                      >
                        {t}mo
                      </button>
                    );
                  })}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={60}
                    placeholder="or enter custom months"
                    value={terms}
                    onChange={(e) => handleInput("terms", e.target.value)}
                    className={`w-full h-[52px] px-4 rounded-2xl border-2 text-slate-800 font-semibold text-base transition-all duration-200 focus:outline-none focus:border-[#08477C] focus:shadow-[0_0_0_4px_rgba(8,71,124,0.08)] ${
                      errors.terms
                        ? "border-red-300 bg-red-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">
                    months
                  </span>
                </div>
                <AnimatePresence>
                  {errors.terms && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-1.5 text-red-500 text-xs mt-2"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.terms}
                    </motion.p>
                  )}
                </AnimatePresence>
                <p className="text-slate-400 text-xs mt-2">Maximum: 60 months</p>
              </div>

              {/* Interest rate badge */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Interest Rate
                </label>
                <div
                  className="h-[52px] px-4 rounded-2xl flex items-center justify-between"
                  style={{
                    background: "linear-gradient(90deg, rgba(8,71,124,0.04) 0%, rgba(8,71,124,0.02) 100%)",
                    border: "2px solid rgba(8,71,124,0.10)",
                  }}
                >
                  <span className="text-[#08477C] font-extrabold text-base">
                    {DEFAULT_INTEREST_RATE}% per month
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#08477C]/8 text-[#08477C]/60 uppercase tracking-wider">
                    Fixed
                  </span>
                </div>
              </div>

              {/* Calculate button */}
              <button
                onClick={handleCalculate}
                className="w-full h-[52px] bg-[#08477C] text-white font-bold rounded-2xl hover:bg-[#063a66] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(8,71,124,0.35)] active:scale-[0.98] flex items-center justify-center gap-2.5 text-sm"
              >
                <Calculator className="w-5 h-5" />
                Calculate My Loan
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* ── Results ── */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mx-8 mb-8 rounded-2xl overflow-hidden border border-slate-100">
                    {/* Results header */}
                    <div
                      className="px-5 py-3.5 flex items-center justify-between"
                      style={{ background: "linear-gradient(90deg, #f0f7ff 0%, #e8f4ff 100%)" }}
                    >
                      <p className="text-[#08477C] font-extrabold text-sm">Estimated Loan Summary</p>
                      <span className="text-[10px] font-bold text-[#08477C]/40 uppercase tracking-widest">
                        Live Preview
                      </span>
                    </div>

                    <div className="p-5">
                      {/* Net proceeds hero */}
                      <motion.div
                        key={result.netProceeds}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="rounded-xl p-5 mb-5 text-center"
                        style={{
                          background:
                            result.netProceeds > 0
                              ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
                              : "linear-gradient(135deg, #fff5f5 0%, #fecaca40 100%)",
                          border: `1px solid ${result.netProceeds > 0 ? "#bbf7d0" : "#fca5a5"}`,
                        }}
                      >
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                          You will receive
                        </p>
                        <p
                          className="text-4xl font-extrabold leading-none"
                          style={{ color: result.netProceeds > 0 ? "#16a34a" : "#dc2626" }}
                        >
                          {formatCurrency(result.netProceeds)}
                        </p>
                        <p className="text-xs text-slate-400 mt-1.5">Net Proceeds</p>

                        {/* Visual net % bar */}
                        {result.netProceeds > 0 && (
                          <div className="mt-4 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${netPct}%` }}
                              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
                            />
                          </div>
                        )}
                        {result.netProceeds > 0 && (
                          <p className="text-[10px] text-slate-400 mt-1.5">
                            {netPct.toFixed(1)}% of gross loan
                          </p>
                        )}
                      </motion.div>

                      {/* Breakdown rows */}
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Gross Loan Amount</span>
                          <span className="font-bold text-[#08477C]">
                            {formatCurrency(result.loanAmount)}
                          </span>
                        </div>

                        <div className="border-t border-dashed border-slate-100 my-2" />

                        {[
                          { label: "Gross Interest", value: result.grossInterest },
                          { label: "Documentation Fee", value: result.docFee },
                          { label: "Commission Fee (1%)", value: result.comFee },
                          { label: "Service Fee (0.5%)", value: result.spf },
                        ].map((row) => (
                          <div key={row.label} className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1.5 text-slate-500">
                              <Minus className="w-3 h-3 text-red-400" />
                              {row.label}
                            </span>
                            <span className="font-semibold text-red-500">
                              -{formatCurrency(row.value)}
                            </span>
                          </div>
                        ))}

                        <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-sm">
                          <span className="text-slate-500">Total Deductions</span>
                          <span className="font-bold text-slate-700">
                            -{formatCurrency(deductionTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="px-8 pb-8 flex gap-3">
                    <Link
                      href="/contacts"
                      className="flex-1 bg-[#08477C] text-white font-bold py-3.5 rounded-2xl text-sm text-center hover:bg-[#063a66] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(8,71,124,0.3)] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/branches"
                      className="flex-1 border-2 border-[#08477C]/20 text-[#08477C] font-bold py-3.5 rounded-2xl text-sm text-center hover:bg-[#08477C]/5 hover:border-[#08477C]/40 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Find Branch
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
