"use client";
import { useState, useMemo } from "react";
import { Search, MapPin, Phone, Facebook, Map, X, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/shared/SectionReveal";

const branches = [
  { id: 1, name: "MAIN BRANCH", location: "San Pablo City, Laguna", mobileNo: "0917-123-4567", telNo: "(049) 501-0900", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit" },
  { id: 2, name: "STA. CRUZ", location: "Sta. Cruz, Laguna", mobileNo: "0917-123-4568", telNo: "(049) 501-0901", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit" },
  { id: 3, name: "CALAMBA", location: "Calamba City, Laguna", mobileNo: "0917-123-4569", telNo: "(049) 501-0902", googleMapUrl: "https://maps.google.com", faceBookUrl: null },
  { id: 4, name: "LOS BAÑOS", location: "Los Baños, Laguna", mobileNo: "0917-123-4570", telNo: "(049) 501-0903", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit" },
  { id: 5, name: "BI–ÑAN", location: "Biñan City, Laguna", mobileNo: "0917-123-4571", telNo: "(049) 501-0904", googleMapUrl: "https://maps.google.com", faceBookUrl: null },
  { id: 6, name: "CABUYAO", location: "Cabuyao City, Laguna", mobileNo: "0917-123-4572", telNo: "(049) 501-0905", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit" },
  { id: 7, name: "LIPA CITY", location: "Lipa City, Batangas", mobileNo: "0917-123-4573", telNo: "(043) 501-0906", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit" },
  { id: 8, name: "BATANGAS CITY", location: "Batangas City, Batangas", mobileNo: "0917-123-4574", telNo: "(043) 501-0907", googleMapUrl: "https://maps.google.com", faceBookUrl: null },
  { id: 9, name: "LUCENA", location: "Lucena City, Quezon", mobileNo: "0917-123-4575", telNo: "(042) 501-0908", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit" },
  { id: 10, name: "ANTIPOLO", location: "Antipolo City, Rizal", mobileNo: "0917-123-4576", telNo: "(02) 501-0909", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit" },
  { id: 11, name: "CAINTA", location: "Cainta, Rizal", mobileNo: "0917-123-4577", telNo: "(02) 501-0910", googleMapUrl: "https://maps.google.com", faceBookUrl: null },
  { id: 12, name: "TAYTAY", location: "Taytay, Rizal", mobileNo: "0917-123-4578", telNo: "(02) 501-0911", googleMapUrl: "https://maps.google.com", faceBookUrl: "https://www.facebook.com/cvmfinancecredit" },
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
            {/* Search input */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by branch name or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#08477C] focus:ring-4 focus:ring-[#08477C]/10 transition-all duration-200 text-sm shadow-sm"
              />
              {/* Clear button */}
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

            {/* Result count */}
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
                whileHover={{ y: -5 }}
                className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_rgba(8,71,124,0.12)] hover:border-slate-200 transition-all duration-300 flex flex-col"
              >
                {/* ── Card Header — branded dark zone ── */}
                <div className="relative bg-gradient-to-br from-[#08477C] to-[#031D33] px-5 pt-5 pb-6 overflow-hidden">
                  {/* Dot grid texture */}
                  <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {/* Giant decorative pin */}
                  <MapPin className="absolute -bottom-3 -right-3 w-24 h-24 text-white/[0.05] pointer-events-none" />
                  {/* Subtle yellow glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDDC00]/[0.08] rounded-full blur-2xl pointer-events-none" />

                  {/* Branch index pill */}
                  <div className="absolute top-4 right-4 w-7 h-7 bg-white/[0.10] border border-white/[0.12] rounded-full flex items-center justify-center text-white/50 text-[10px] font-bold">
                    {branch.id}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <span className="text-[#FDDC00] text-[10px] font-extrabold tracking-[0.22em] uppercase mb-2.5 block">
                      CVM Finance
                    </span>
                    <h3 className="text-white font-extrabold text-xl leading-tight mb-3">
                      {branch.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/55 text-xs">
                      <MapPin className="w-3 h-3 text-[#FDDC00] flex-shrink-0" />
                      {branch.location}
                    </div>
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div className="p-5 flex flex-col flex-1">

                  {/* Phone numbers */}
                  <div className="space-y-2 mb-5">
                    {branch.mobileNo && (
                      <a
                        href={`tel:${branch.mobileNo.replace(/\D/g, "")}`}
                        className="group/phone flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#08477C]/[0.05] transition-colors"
                      >
                        <span className="w-7 h-7 bg-[#08477C]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/phone:bg-[#08477C]/20 transition-colors">
                          <Phone className="w-3.5 h-3.5 text-[#08477C]" />
                        </span>
                        <div>
                          <p className="text-[10px] text-slate-400 font-medium leading-none mb-0.5">Mobile</p>
                          <p className="text-slate-700 text-sm font-semibold group-hover/phone:text-[#08477C] transition-colors">{branch.mobileNo}</p>
                        </div>
                      </a>
                    )}
                    {branch.telNo && (
                      <a
                        href={`tel:${branch.telNo.replace(/\D/g, "")}`}
                        className="group/phone flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#08477C]/[0.05] transition-colors"
                      >
                        <span className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/phone:bg-[#08477C]/10 transition-colors">
                          <Phone className="w-3.5 h-3.5 text-slate-400 group-hover/phone:text-[#08477C] transition-colors" />
                        </span>
                        <div>
                          <p className="text-[10px] text-slate-400 font-medium leading-none mb-0.5">Landline</p>
                          <p className="text-slate-600 text-sm font-semibold group-hover/phone:text-[#08477C] transition-colors">{branch.telNo}</p>
                        </div>
                      </a>
                    )}
                  </div>

                  <div className="flex-1" />

                  {/* Divider */}
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
