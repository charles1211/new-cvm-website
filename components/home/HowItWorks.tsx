import { Search, FileText, CheckCircle, Banknote } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import SectionReveal from "@/components/shared/SectionReveal";
import Link from "next/link";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Choose Your Loan",
    description: "Browse our loan products and find the one that best fits your needs and financial situation.",
    color: "bg-blue-50 text-primary",
    iconBg: "bg-primary",
  },
  {
    step: "02",
    icon: FileText,
    title: "Submit Requirements",
    description: "Prepare and submit the required documents at your nearest CVM Finance branch.",
    color: "bg-yellow-50 text-primary",
    iconBg: "bg-secondary",
  },
  {
    step: "03",
    icon: CheckCircle,
    title: "Get Approved",
    description: "Our team will process your application and notify you of the approval status.",
    color: "bg-green-50 text-primary",
    iconBg: "bg-green-500",
  },
  {
    step: "04",
    icon: Banknote,
    title: "Receive Your Loan",
    description: "Once approved, receive your loan proceeds and start achieving your financial goals.",
    color: "bg-purple-50 text-primary",
    iconBg: "bg-purple-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How It Works"
          title="Get Your Loan in"
          titleHighlight="4 Simple Steps"
          subtitle="Our streamlined process makes getting a loan easy, fast, and transparent."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="absolute top-12 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 hidden lg:block" />

          {steps.map((step, i) => (
            <SectionReveal key={step.step} delay={i * 0.1} direction="up">
              <div className="relative flex flex-col items-center text-center group">
                {/* Step number bubble */}
                <div className="relative mb-5">
                  <div className={`w-20 h-20 rounded-2xl ${step.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-primary rounded-full flex items-center justify-center text-primary text-xs font-extrabold shadow-md">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.4} className="text-center mt-12">
          <Link
            href="/loan"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-600 transition-all duration-300 hover:shadow-glow-blue"
          >
            Learn the Full Process
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
