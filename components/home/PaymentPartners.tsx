"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    name: "GCash",
    logo: "/images/gcashIcon.png",
    tagline: "Mobile Wallet",
    brandColor: "#007DFF",
    bg: "#EFF6FF",
  },
  {
    name: "Maya",
    logo: "/images/paymaya.webp",
    tagline: "Digital Payments",
    brandColor: "#00B388",
    bg: "#F0FDF9",
  },
  {
    name: "BDO",
    logo: "/images/bdoIcon.jpg",
    tagline: "Bank Transfer",
    brandColor: "#031D33",
    bg: "#FEF2F2",
  },
  {
    name: "7-Eleven",
    logo: "/images/711Icon.png",
    tagline: "Over-the-Counter",
    brandColor: "#D62300",
    bg: "#FEF2F2",
  },
  {
    name: "Bayad Center",
    logo: "/images/bayadCenterIcon.webp",
    tagline: "Bills Payment",
    brandColor: "#E57C00",
    bg: "#FFF7ED",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function PaymentPartners() {
  return (
    <section className="py-16 bg-[#F8FAFC] border-y border-slate-100 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-black tracking-[0.2em] uppercase text-primary/40 mb-2"
        >
          Accepted Payment Partners
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-2xl sm:text-3xl font-extrabold text-primary leading-tight"
        >
          Pay Your Way, <span className="text-secondary">Anywhere</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="text-slate-500 text-sm mt-2 max-w-md mx-auto"
        >
          Convenient payment options through your preferred channels — online or over-the-counter.
        </motion.p>
      </div>

      {/* Partner grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-5"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={item}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 p-5 flex flex-col items-center text-center cursor-default overflow-hidden"
            >
              {/* Brand color top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: partner.brandColor }}
              />

              {/* Logo */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300"
                style={{ backgroundColor: partner.bg }}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={52}
                  height={52}
                  className="object-contain w-12 h-12"
                />
              </div>

              {/* Name */}
              <p className="font-bold text-sm text-slate-800 leading-tight">{partner.name}</p>

              {/* Tagline */}
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{partner.tagline}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
