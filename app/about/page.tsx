import type { Metadata } from "next";
import PageBanner from "@/components/shared/PageBanner";
import SectionReveal from "@/components/shared/SectionReveal";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import TimelineSection from "@/components/about/TimelineSection";
import AffiliatesSection from "@/components/about/AffiliatesSection";
import {
  Heart,
  Eye,
  Target,
  MapPin,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CVM Finance and Credit Corporation — our history, mission, vision, and core values since 1994.",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const timeline = [
  {
    year: "1994",
    title: "The Beginning",
    desc: "Founded with 2 employees, 1 product, and 100 clients in Laguna, Philippines.",
    stats: ["2 employees", "1 product", "100 clients"],
    color: "from-[#08477C] to-[#042B4A]",
  },
  {
    year: "1999",
    title: "First Expansion",
    desc: "Opened our first branch, growing to 6 employees and 2 products with 300 clients.",
    stats: ["1 branch", "6 employees", "300 clients"],
    color: "from-[#0a5a9e] to-[#08477C]",
  },
  {
    year: "2003",
    title: "CVMFCC Born",
    desc: "Name changed to CVM Finance and Credit Corporation. Now 2 branches, 10 employees, 1,000 clients.",
    stats: ["2 branches", "10 employees", "1,000 clients"],
    color: "from-[#08477C] to-[#0a5a9e]",
  },
  {
    year: "2013",
    title: "Rapid Growth",
    desc: "Expanded to 12 branches, 115 employees, 5 products, and 4,000 clients. Implemented LAS system.",
    stats: ["12 branches", "115 employees", "4,000 clients"],
    color: "from-[#042B4A] to-[#08477C]",
  },
  {
    year: "2019",
    title: "Major Milestone",
    desc: "Reached 56 branches, 288 employees, 16 products, and 30,000 clients. Achieved ISO 9001:2015 certification.",
    stats: ["50 branches", "288 employees", "30,000 clients"],
    color: "from-[#031D33] to-[#042B4A]",
  },
];

const coreValues = [
  { label: "WE CHOOSE LOVE", icon: Heart, desc: "Leading with empathy and genuine care for every client." },
  { label: "WE BREATHE INTEGRITY", icon: ShieldCheck, desc: "Honest, transparent, and accountable in every action." },
  { label: "WE RUN AS ONE", icon: Users, desc: "United team working toward a shared Filipino dream." },
  { label: "BIDA BEST", icon: Sparkles, desc: "Always striving for excellence beyond expectations." },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About CVM Finance"
        subtitle="Three decades of financing Filipino dreams. Learn our story, our mission, and what drives us forward."
        eyebrow="Our Story"
      />

      {/* ══════════════════════════════════════
          COMPANY HISTORY
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <SectionReveal direction="left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/8 text-primary border border-primary/15 rounded-full text-[11px] font-extrabold tracking-[0.18em] uppercase mb-6">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Our History
              </span>
              <h2 className="text-4xl font-extrabold text-primary mb-6 leading-tight">
                30+ Years of Financing<br />
                <span className="text-[#08477C]/70">Filipino Dreams</span>
              </h2>

              {/* Pull quote */}
              <div className="relative border-l-4 border-[#FDDC00] pl-5 mb-6">
                <p className="text-primary font-bold text-base leading-snug italic">
                  &ldquo;Built on a simple but powerful vision: to provide accessible and affordable financial services to Filipinos who need them most.&rdquo;
                </p>
              </div>

              <div className="space-y-4 text-slate-600 text-[15px] leading-7">
                <p>
                  CVM Finance and Credit Corporation was founded in 1994, starting from humble beginnings with just 2 employees and 100 clients in Laguna, Philippines.
                </p>
                <p>
                  From serving government employees and pensioners to expanding into the private sector, CVM Finance has grown into one of the most trusted lending institutions in the Philippines. Our commitment to quality led us to achieve ISO 9001:2015 certification in 2019.
                </p>
                <p>
                  Today, with 50+ branches nationwide, 288+ employees, and over 30,000 satisfied clients, we continue to grow while staying true to our founding mission.
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mt-7">
                {[

                  { icon: Award, label: "ISO 9001:2015" },

                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {label}
                  </span>
                ))}
              </div>
            </SectionReveal>

            {/* Stats grid */}
            <SectionReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 50, suffix: "+", label: "Branches", sublabel: "Nationwide", icon: MapPin, bg: "bg-primary text-white" },
                  { value: 30000, suffix: "+", label: "Clients Served", sublabel: "And counting", icon: Users, bg: "bg-[#FDDC00] text-primary" },
                  { value: 288, suffix: "+", label: "Employees", sublabel: "Strong team", icon: TrendingUp, bg: "bg-slate-800 text-white" },
                  { value: 30, suffix: "+", label: "Years", sublabel: "Of experience", icon: Award, bg: "bg-primary/10 text-primary" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  const isLight = i === 1;
                  const isDark = i === 0 || i === 2;
                  return (
                    <div
                      key={stat.label}
                      className={`${stat.bg} rounded-2xl p-6 text-center group hover:scale-[1.03] transition-all duration-300 cursor-default relative overflow-hidden`}
                    >
                      <div className="absolute top-3 right-3 opacity-15">
                        <Icon className="w-10 h-10" />
                      </div>
                      <div className={`text-4xl font-extrabold mb-1 ${isDark ? "text-white" : isLight ? "text-primary" : "text-primary"}`}>
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className={`font-bold text-sm ${isDark ? "text-white/90" : isLight ? "text-primary" : "text-primary"}`}>
                        {stat.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-white/50" : isLight ? "text-primary/60" : "text-slate-400"}`}>
                        {stat.sublabel}
                      </p>
                    </div>
                  );
                })}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION, VISION, CORE VALUES (Bento)
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Foundation" title="Mission, Vision &" titleHighlight="Core Values" />

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Mission — large, hero card */}
            <SectionReveal delay={0} className="md:row-span-1">
              <div className="relative bg-primary rounded-3xl p-8 md:p-10 h-full overflow-hidden group hover:shadow-[0_12px_40px_rgba(8,71,124,0.25)] transition-shadow duration-500">
                {/* Background decoration */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#FDDC00]/[0.08] rounded-full" />
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-white/[0.04] rounded-full" />
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(253,220,0,1) 1.5px, transparent 0)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[#FDDC00]/20 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-[#FDDC00]" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-[#FDDC00]/15 text-[#FDDC00] text-[10px] font-extrabold tracking-[0.2em] uppercase rounded-full mb-4">
                    Our Mission
                  </div>
                  <p className="text-white text-base leading-7 font-medium">
                    To provide relevant financial solutions that empower individuals, businesses, and families across the Philippines. We are dedicated to fostering financial inclusion and enabling growth opportunities for members of our society.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Vision */}
            <SectionReveal delay={0.1}>
              <div className="relative bg-[#FDDC00] rounded-3xl p-8 md:p-10 h-full overflow-hidden group hover:shadow-[0_12px_40px_rgba(253,220,0,0.3)] transition-shadow duration-500">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/[0.07] rounded-full" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary/15 rounded-2xl flex items-center justify-center mb-6">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-primary/15 text-primary text-[10px] font-extrabold tracking-[0.2em] uppercase rounded-full mb-4">
                    Our Vision
                  </div>
                  <p className="text-primary text-base leading-7 font-semibold">
                    To be the trusted provider of financial services in the Philippines, recornized for our core values, We strive to create a more prosperous and resilient nation by empowering our clients to achieve their financial goals.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Core Values — full width */}
            <SectionReveal delay={0.15} className="md:col-span-2">
              <div className="relative bg-slate-900 rounded-3xl p-8 md:p-10 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,1) 1.5px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute -top-16 right-8 w-48 h-48 bg-[#FDDC00]/[0.05] rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-[#FDDC00]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold text-[#FDDC00]/70 tracking-[0.2em] uppercase mb-0.5">Our Core Values</div>
                      <div className="text-white font-extrabold text-lg leading-tight">What We Stand For</div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {coreValues.map((val) => {
                      const Icon = val.icon;
                      return (
                        <div
                          key={val.label}
                          className="group/val bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-[#FDDC00]/30 rounded-2xl p-5 transition-all duration-300 cursor-default"
                        >
                          <div className="w-9 h-9 bg-[#FDDC00]/15 rounded-xl flex items-center justify-center mb-3 group-hover/val:bg-[#FDDC00]/25 transition-colors">
                            <Icon className="w-4.5 h-4.5 text-[#FDDC00]" />
                          </div>
                          <div className="text-[#FDDC00] font-extrabold text-xs tracking-wide mb-2">{val.label}</div>
                          <p className="text-white/55 text-[13px] leading-relaxed">{val.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Milestones" title="Our Growth" titleHighlight="Timeline" />

          <TimelineSection timeline={timeline} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          QUALITY POLICY
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#FDDC00] relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, rgba(8,71,124,1) 1.5px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Decorative arc */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-72 h-72 border-[24px] border-primary/[0.07] rounded-full" />
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-48 border-[16px] border-primary/[0.06] rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary border border-primary/15 rounded-full text-[11px] font-extrabold tracking-[0.18em] uppercase mb-5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Quality Policy
            </span>
            <h2 className="text-4xl font-extrabold text-primary leading-tight">Our Commitment to Excellence</h2>
          </SectionReveal>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[0_8px_40px_rgba(8,71,124,0.12)] space-y-6 text-slate-600 text-[15px] leading-7">
            <p>
              Our commitment to quality is deeply ingrained in our organizational culture. Inspired by our esteemed founder, Carmelita Vicencio Manlapaz, we have cultivated a culture of &ldquo;Tiwala and Malasakit&rdquo; (Trust and Compassion). After 30 years. our compnay has evolved into a stronger value-based culture together with 2nd generation of the Manlapaz family, spearheaded by our Chairman, Christian V. Manlapaz. The Company is now running under the Entreprenuerial Management System (EOS) that supports a value-based leadership, service and culture. Our dedicated team of servant leaders is trained to uphold the inherent value of every employee and deliver our products and services with unwavering integrity and the highest quality standards.            </p>
            <p>
              We take pride in offering our relevant and accessible range of financial solutions in a community-based approach, forged through official partnerships with local institutions and private organizations, and digital approach expanding our presence to bigger audience making our services accessible to more customers. It is our solemn resposibility to ensure that all our products and services comply meticulously with the laws and regulations set forth by both government and private regulating agencies.           </p>
            <p>
              Through continuous improvement. adherence to regulatory standards, and a customer-centric approach, we strive to exceed the expectations of our clients and stakeholders, fostering long-lasting relationships built on love, integrity, teamwork and excellence.
            </p>
            <p>
              This quality policy serves as a testament to our dedication to quality, integrity, and customer satisfaction, guiding us in our pursuit of excellence as we continue to empower individuals and communities accress the Philippines.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="relative bg-primary/6 border border-primary/15 rounded-2xl p-5 overflow-hidden">
                <div className="absolute top-3 right-3 opacity-10">
                  <Target className="w-10 h-10 text-primary" />
                </div>
                <p className="font-extrabold text-primary text-[11px] uppercase tracking-wider mb-2">Our Core Focus</p>
                <p className="text-primary font-semibold text-[15px]">We are driven by a singular purposes: financing Filipino dreams to build happy lives. Our mission is to empower individuals and businesses, providing them with the financial support they need to pursue their aspirations and achieve meaningful lives.</p>
              </div>
              <div className="relative bg-primary/6 border border-primary/15 rounded-2xl p-5 overflow-hidden">
                <div className="absolute top-3 right-3 opacity-10">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <p className="font-extrabold text-primary text-[11px] uppercase tracking-wider mb-2">Our Niche</p>
                <p className="text-primary font-semibold text-[15px] mb-4">Our niche lies in our ability to customize loan facilities for our customers, enabling them to make a meaningful impact in the lives of Filipinos, By understanding the unique needs and aspirations of our clients, we tailor our financial solutions to address their specific requirements, ensuring that they receive the support they need to achieve their goals.</p>
                <p className="text-primary font-semibold text-[15px]">We aim to continually improve the suitability, adequacy and effectiveness of our quality management system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AffiliatesSection />
    </>
  );
}
