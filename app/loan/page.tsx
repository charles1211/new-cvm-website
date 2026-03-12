import type { Metadata } from "next";
import { MapPin, Globe, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionReveal from "@/components/shared/SectionReveal";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "How to Loan",
  description: "Learn how to apply for a CVM Finance loan. Step-by-step guide for branch and online loan application.",
};

const branchSteps = [
  { step: 1, en: "Inquire at nearest branch", tl: "Magtanong sa pinakamalapit na sangay" },
  { step: 2, en: "Choose preferred product/service", tl: "Pumili ng gustong produkto/serbisyo" },
  { step: 3, en: "Complete requirements", tl: "Kumpletuhin ang mga kinakailangan" },
  { step: 4, en: "Submit requirements to branch", tl: "Isumite ang mga kinakailangan sa sangay" },
  { step: 5, en: "Wait for Credit Investigation schedule", tl: "Maghintay ng schedule ng Credit Investigation" },
  { step: 6, en: "Wait for approval or rejection result", tl: "Maghintay ng resulta ng pag-apruba/pagtanggi" },
  { step: 7, en: "Reapply after 3 months if rejected", tl: "Mag-apply ulit pagkatapos ng 3 buwan kung tinanggihan" },
  { step: 8, en: "Retrieve your approved loan", tl: "Kunin ang aprubadong loan" },
  { step: 9, en: "Renew your loan after the first term", tl: "I-renew ang loan pagkatapos ng unang termino" },
];

const onlineSteps = [
  { step: 1, text: "Visit the CVM Facebook page", hasLink: true, linkLabel: "Visit Facebook Page", href: "https://www.facebook.com/cvmfinancecredit" },
  { step: 2, text: "Provide your loan details for renewal or extension" },
  { step: 3, text: "Provide your GCash or bank account details for cash refund" },
  { step: 4, text: "Wait for branch message regarding your schedule" },
  { step: 5, text: "Prepare all required documents for your visit" },
  { step: 6, text: "Visit the official website for additional information", hasLink: true, linkLabel: "Visit Website", href: "/" },
];

export default function LoanPage() {
  return (
    <>
      {/* Yellow header banner */}
      <section className="pt-32 pb-16 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(8,71,124,0.3) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <SectionReveal>
            <span className="inline-block bg-primary/15 text-primary border border-primary/20 rounded-full text-xs font-bold tracking-widest uppercase px-4 py-1.5 mb-5">CVM Finance Guide</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight mb-3">Paano Mag-Loan?</h1>
            <p className="text-primary/70 text-lg">
              Mag loan na sa pinaka malapit na CVM Finance Branches!
            </p>
            <p className="text-primary/50 text-sm mt-2 italic">(How to get a loan at the nearest CVM Finance branch!)</p>
          </SectionReveal>
        </div>
      </section>

      {/* Branch process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Branch Process" title="Apply at a" titleHighlight="Branch Near You" subtitle="Visit any of our 56+ branches and follow these 9 simple steps." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {branchSteps.map((step, i) => (
              <SectionReveal key={step.step} delay={i * 0.05}>
                <div className="group flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-primary/20 hover:shadow-card transition-all duration-300">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-md transition-all duration-300 group-hover:scale-110 ${
                      step.step <= 3 ? "bg-primary text-secondary" :
                      step.step <= 6 ? "bg-secondary text-primary" :
                      "bg-slate-800 text-secondary"
                    }`}>
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-primary text-sm leading-tight mb-1">{step.en}</p>
                    <p className="text-slate-400 text-xs italic leading-relaxed">{step.tl}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Online process */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Online Process" title="Apply" titleHighlight="Online" subtitle="For loan renewals and extensions, you can also process online through our Facebook page." />
          <div className="space-y-4">
            {onlineSteps.map((step, i) => (
              <SectionReveal key={step.step} delay={i * 0.08}>
                <div className="flex gap-5 p-5 bg-white border border-slate-100 rounded-2xl hover:border-primary/20 hover:shadow-card transition-all duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-secondary font-extrabold text-sm group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-700 font-semibold text-sm leading-relaxed">{step.text}</p>
                    {step.hasLink && (
                      <a
                        href={step.href}
                        target={step.href?.startsWith("http") ? "_blank" : undefined}
                        rel={step.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 text-primary text-xs font-bold mt-2 hover:text-secondary transition-colors group/link"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        {step.linkLabel}
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-center">
        <div className="max-w-2xl mx-auto px-4">
          <SectionReveal>
            <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Apply?</h2>
            <p className="text-white/70 mb-8">Visit your nearest branch or contact us today to start your loan application.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/branches" className="inline-flex items-center gap-2 bg-secondary text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 transition-all duration-300">
                <MapPin className="w-4 h-4" />
                Find a Branch
              </Link>
              <Link href="/contacts" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300">
                Contact Us
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
