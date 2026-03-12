"use client";

import { motion } from "framer-motion";
import { Award, Users, Building2 } from "lucide-react";

const trustItems = [
  {
    icon: Award,
    stat: "ISO",
    statSuffix: "9001:2015",
    label: "Quality Certified",
    sublabel: "Quality Management System",
  },
  {
    icon: Users,
    stat: "30,000+",
    statSuffix: "",
    label: "Happy Clients",
    sublabel: "Nationwide since 1994",
  },
  {
    icon: Building2,
    stat: "50+",
    statSuffix: "",
    label: "Branch Offices",
    sublabel: "All over the Philippines",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative bg-[#FDDC00] overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #08477C 1px, transparent 0)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#08477C]/20 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-4 group px-8 py-3 cursor-default"
            >
              {/* Hover highlight */}
              <div className="absolute inset-0 rounded-xl bg-[#08477C]/0 group-hover:bg-[#08477C]/8 transition-colors duration-300" />

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.12, rotate: -5 }}
                transition={{ type: "spring", stiffness: 380, damping: 14 }}
                className="relative z-10 w-11 h-11 rounded-xl bg-[#08477C] flex items-center justify-center shadow-md flex-shrink-0"
              >
                <item.icon className="w-5 h-5 text-[#FDDC00]" strokeWidth={2} />
              </motion.div>

              {/* Text */}
              <div className="relative z-10 text-left">
                <div className="flex items-baseline gap-1">
                  <span className="text-[#08477C] font-black text-xl leading-none tracking-tight">
                    {item.stat}
                  </span>
                  {item.statSuffix && (
                    <span className="text-[#08477C]/65 font-bold text-sm leading-none">
                      {item.statSuffix}
                    </span>
                  )}
                </div>
                <p className="text-[#08477C] font-semibold text-sm leading-tight mt-0.5">
                  {item.label}
                </p>
                <p className="text-[#08477C]/55 text-[11px] font-medium leading-tight mt-0.5">
                  {item.sublabel}
                </p>
              </div>

              {/* Divider */}
              {i < trustItems.length - 1 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-9 bg-gradient-to-b from-transparent via-[#08477C]/25 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#08477C]/20 to-transparent" />
    </section>
  );
}
