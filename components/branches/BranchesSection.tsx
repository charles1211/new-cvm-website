"use client";
import { useState, useMemo } from "react";
import { Search, MapPin, Phone, Facebook, Map, X, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionReveal from "@/components/shared/SectionReveal";

const branches = [
  { id: 1,  name: "MAIN BRANCH",    location: "San Pablo City, Laguna",   mobileNo: "0917-123-4567", telNo: "(049) 501-0900", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit", image: "https://picsum.photos/seed/branch-1/480/180" },
  { id: 2,  name: "STA. CRUZ",      location: "Sta. Cruz, Laguna",        mobileNo: "0917-123-4568", telNo: "(049) 501-0901", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit", image: "https://picsum.photos/seed/branch-2/480/180" },
  { id: 3,  name: "CALAMBA",        location: "Calamba City, Laguna",     mobileNo: "0917-123-4569", telNo: "(049) 501-0902", googleMapUrl: "https://maps.google.com", faceBookUrl: null,                                         image: "https://picsum.photos/seed/branch-3/480/180" },
  { id: 4,  name: "LOS BAÑOS",      location: "Los Baños, Laguna",        mobileNo: "0917-123-4570", telNo: "(049) 501-0903", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit", image: "https://picsum.photos/seed/branch-4/480/180" },
  { id: 5,  name: "BI–ÑAN",         location: "Biñan City, Laguna",       mobileNo: "0917-123-4571", telNo: "(049) 501-0904", googleMapUrl: "https://maps.google.com", faceBookUrl: null,                                         image: "https://picsum.photos/seed/branch-5/480/180" },
  { id: 6,  name: "CABUYAO",        location: "Cabuyao City, Laguna",     mobileNo: "0917-123-4572", telNo: "(049) 501-0905", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit", image: "https://picsum.photos/seed/branch-6/480/180" },
  { id: 7,  name: "LIPA CITY",      location: "Lipa City, Batangas",      mobileNo: "0917-123-4573", telNo: "(043) 501-0906", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit", image: "https://picsum.photos/seed/branch-7/480/180" },
  { id: 8,  name: "BATANGAS CITY",  location: "Batangas City, Batangas",  mobileNo: "0917-123-4574", telNo: "(043) 501-0907", googleMapUrl: "https://maps.google.com", faceBookUrl: null,                                         image: "https://picsum.photos/seed/branch-8/480/180" },
  { id: 9,  name: "LUCENA",         location: "Lucena City, Quezon",      mobileNo: "0917-123-4575", telNo: "(042) 501-0908", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit", image: "https://picsum.photos/seed/branch-9/480/180" },
  { id: 10, name: "ANTIPOLO",       location: "Antipolo City, Rizal",     mobileNo: "0917-123-4576", telNo: "(02) 501-0909",  googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit", image: "https://picsum.photos/seed/branch-10/480/180" },
  { id: 11, name: "CAINTA",         location: "Cainta, Rizal",            mobileNo: "0917-123-4577", telNo: "(02) 501-0910",  googleMapUrl: "https://maps.google.com", faceBookUrl: null,                                         image: "https://picsum.photos/seed/branch-11/480/180" },
  { id: 12, name: "TAYTAY",         location: "Taytay, Rizal",            mobileNo: "0917-123-4578", telNo: "(02) 501-0911",  googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit", image: "https://picsum.photos/seed/branch-12/480/180" },
];


export default function BranchesSection() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      branches.filter(
        (b) =>
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.location.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Search + Stats bar ── */}
        <SectionReveal className="mb-10">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by branch name or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#08477C] focus:ring-4 focus:ring-[#08477C]/10 transition-all duration-200 text-sm shadow-sm"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5 text-slate-500" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <p className="text-slate-500 text-sm">
                Showing{" "}
                <span className="font-bold text-[#08477C]">{filtered.length}</span>
                {" "}of{" "}
                <span className="font-bold text-[#08477C]">{branches.length}</span>
                {" "}branches
                {search && (
                  <span className="text-slate-400">
                    {" "}matching &ldquo;<span className="text-[#08477C] font-medium">{search}</span>&rdquo;
                  </span>
                )}
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* ── Branch cards grid ── */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((branch, i) => (
              <motion.div
                key={branch.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_rgba(8,71,124,0.12)] hover:border-slate-200 transition-all duration-300 flex flex-col"
              >
                {/* ── Banner image ── */}
                <div className="relative h-[180px] overflow-hidden flex-shrink-0">
                  <Image
                    src={branch.image}
                    alt={`${branch.name} branch`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* dark overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* branch id badge — top right */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-white text-[10px] font-bold">
                    #{branch.id}
                  </div>

                  {/* CVM label — top left */}
                  <span className="absolute top-3 left-3 text-[#FDDC00] text-[9px] font-extrabold tracking-[0.2em] uppercase drop-shadow">
                    CVM Finance
                  </span>

                </div>

                {/* ── Name + location ── */}
                <div className="pt-4 pb-4 px-5 text-center">
                  <h3 className="font-extrabold text-[#08477C] text-lg leading-tight mb-1">
                    {branch.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-xs">
                    <MapPin className="w-3 h-3 text-[#08477C]/40 flex-shrink-0" />
                    {branch.location}
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div className="px-5 pb-5 flex flex-col flex-1">
                  <div className="h-px bg-slate-100 mb-4" />

                  {/* Phone numbers — compact inline rows */}
                  <div className="space-y-1 mb-4">
                    {branch.mobileNo && (
                      <a
                        href={`tel:${branch.mobileNo.replace(/\D/g, "")}`}
                        className="group/phone flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#08477C]/[0.05] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-[#08477C]/60 flex-shrink-0" />
                          <span className="text-[10px] text-slate-400 font-medium">Mobile</span>
                        </div>
                        <span className="text-slate-700 text-xs font-semibold group-hover/phone:text-[#08477C] transition-colors">{branch.mobileNo}</span>
                      </a>
                    )}
                    {branch.telNo && (
                      <a
                        href={`tel:${branch.telNo.replace(/\D/g, "")}`}
                        className="group/phone flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#08477C]/[0.05] transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-slate-300 flex-shrink-0" />
                          <span className="text-[10px] text-slate-400 font-medium">Landline</span>
                        </div>
                        <span className="text-slate-600 text-xs font-semibold group-hover/phone:text-[#08477C] transition-colors">{branch.telNo}</span>
                      </a>
                    )}
                  </div>

                  <div className="flex-1" />
                  <div className="h-px bg-slate-100 mb-4" />

                  {/* Action buttons */}
                  <div className="flex gap-2.5">
                    <a
                      href={branch.googleMapUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#08477C] text-white font-bold py-2.5 rounded-xl text-xs hover:bg-[#063a66] active:scale-95 transition-all duration-200"
                    >
                      <Map className="w-3.5 h-3.5" />
                      View Map
                    </a>
                    {branch.faceBookUrl ? (
                      <a
                        href={branch.faceBookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#1877F2] text-white font-bold py-2.5 rounded-xl text-xs hover:bg-[#1565c0] active:scale-95 transition-all duration-200"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                        Facebook
                      </a>
                    ) : (
                      <div className="flex-1 flex items-center justify-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-300 font-semibold py-2.5 rounded-xl text-xs cursor-not-allowed select-none">
                        <Facebook className="w-3.5 h-3.5" />
                        Facebook
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* ── Empty state ── */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-slate-300" />
              </div>
              <h4 className="text-slate-700 font-bold text-lg mb-1">No branches found</h4>
              <p className="text-slate-400 text-sm mb-5">
                No results for &ldquo;<span className="text-[#08477C] font-medium">{search}</span>&rdquo; — try a different city or branch name.
              </p>
              <button
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#08477C] text-white font-semibold text-sm rounded-xl hover:bg-[#063a66] transition-colors active:scale-95"
              >
                <X className="w-4 h-4" />
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer note ── */}
        {filtered.length > 0 && (
          <SectionReveal delay={0.3} className="text-center mt-10">
            <p className="text-slate-400 text-sm">
              Showing sample branches. Visit our{" "}
              <a href="/contacts" className="text-[#08477C] font-semibold hover:underline">
                Contact page
              </a>{" "}
              or call us for the complete list of{" "}
              <span className="font-semibold text-[#08477C]">56+ branches</span> nationwide.
            </p>
          </SectionReveal>
        )}
      </div>
    </section>
  );
}
