import AnimatedCounter from "@/components/shared/AnimatedCounter";
import SectionReveal from "@/components/shared/SectionReveal";

const stats = [
  { value: 50, suffix: "+", label: "Branches Nationwide", sublabel: "Across the Philippines" },
  { value: 30000, suffix: "+", label: "Happy Clients", sublabel: "And growing" },
  { value: 6, suffix: "", label: "Loan Products", sublabel: "Tailored for you" },
  { value: 30, suffix: "+", label: "Years of Service", sublabel: "Since 1994" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(253,220,0,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1} className="text-center">
              <div className="group">
                <div className="text-4xl sm:text-5xl font-extrabold text-secondary mb-1 tabular-nums">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <p className="text-white font-semibold text-base mb-0.5">{stat.label}</p>
                <p className="text-white/50 text-xs">{stat.sublabel}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
