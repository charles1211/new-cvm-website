"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone, Facebook, MessageSquare, Send, CheckCircle2,
  AlertCircle, Clock, MapPin, User, Mail, FileText, ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import SectionReveal from "@/components/shared/SectionReveal";

const contactSchema = z.object({
  type: z.string().min(1, "Please select an inquiry type"),
  name: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  age: z.string().refine((v) => Number(v) > 0 && Number(v) < 120, { message: "Please enter a valid age" }),
  mobileNo: z.string().length(11, "Mobile number must be exactly 11 digits").regex(/^[0-9]+$/, "Numbers only"),
  email: z.string().email("Please enter a valid email address"),
  loanInquiry: z.string().min(10, "Please describe your loan inquiry"),
  message: z.string().min(10, "Please enter your message"),
  agreeToTerms: z.boolean().refine((v) => v === true, { message: "You must agree to the Terms and Conditions" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inquiryTypes = [
  "New Loan Inquiry",
  "Existing Client Support",
  "Payment Assistance",
  "Other Concern",
];

const contactDetails = [
  { label: "Smart", value: "0918-XXX-XXXX", href: "tel:09180000000" },
  { label: "Globe", value: "0917-XXX-XXXX", href: "tel:09170000000" },
  { label: "Landline", value: "(049) 501-0900", href: "tel:04995010900" },
];

const officeHours = [
  { day: "Monday – Friday", time: "8:00 AM – 5:00 PM", open: true },
  { day: "Saturday", time: "8:00 AM – 12:00 PM", open: true },
  { day: "Sunday", time: "Closed", open: false },
];

/* Small reusable error message */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  );
}

/* Section group label inside the form */
function FormSection({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-5">
      <div className="w-7 h-7 bg-[#08477C]/10 rounded-lg flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-[#08477C]" />
      </div>
      <h4 className="text-[#08477C] font-bold text-sm tracking-wide">{label}</h4>
    </div>
  );
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { agreeToTerms: false },
  });

  const agreeToTerms = watch("agreeToTerms");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
      reset();
      setSelectedType("");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* ── Main grid: Sidebar + Form ── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

          {/* ══ LEFT: Contact details sidebar ══ */}
          <div className="lg:col-span-2">
            <SectionReveal>
              <div
                className="sticky top-24 rounded-2xl overflow-hidden text-white"
                style={{ background: "linear-gradient(155deg, #031D33 0%, #08477C 100%)" }}
              >
                {/* Background texture */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#FDDC00]/[0.08] rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/[0.06] rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 p-7">

                  {/* Header */}
                  <div className="mb-7">
                    <span className="text-[#FDDC00] text-[10px] font-extrabold tracking-[0.22em] uppercase block mb-2">
                      CVM Finance
                    </span>
                    <h2 className="text-2xl font-extrabold leading-tight mb-2">Contact Details</h2>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Reach out through any channel below, or use the form to send us a message.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.08] mb-6" />

                  {/* Phone numbers */}
                  <div className="mb-6">
                    <p className="text-white/30 text-[10px] font-extrabold tracking-[0.18em] uppercase mb-3">
                      Phone Numbers
                    </p>
                    <div className="space-y-2">
                      {contactDetails.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.07] transition-colors duration-200"
                        >
                          <span className="w-8 h-8 bg-white/[0.08] border border-white/[0.10] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#FDDC00] group-hover:border-[#FDDC00] transition-all duration-200">
                            <Phone className="w-3.5 h-3.5 group-hover:text-[#08477C] transition-colors" />
                          </span>
                          <div>
                            <p className="text-white/35 text-[10px] font-medium">{c.label}</p>
                            <p className="text-white font-semibold text-sm">{c.value}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.08] mb-6" />

                  {/* Social channels */}
                  <div className="mb-6">
                    <p className="text-white/30 text-[10px] font-extrabold tracking-[0.18em] uppercase mb-3">
                      Social Channels
                    </p>
                    <div className="space-y-2">
                      <a
                        href="https://m.me/cvmfinancecredit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.07] transition-colors duration-200"
                      >
                        <span className="w-8 h-8 bg-blue-500/20 border border-blue-400/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-200">
                          <MessageSquare className="w-3.5 h-3.5 text-blue-300 group-hover:text-white transition-colors" />
                        </span>
                        <div>
                          <p className="text-white/35 text-[10px] font-medium">Facebook Messenger</p>
                          <p className="text-white font-semibold text-sm">@cvmfinancecredit</p>
                        </div>
                      </a>
                      <a
                        href="https://www.facebook.com/cvmfinancecredit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.07] transition-colors duration-200"
                      >
                        <span className="w-8 h-8 bg-blue-600/20 border border-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-200">
                          <Facebook className="w-3.5 h-3.5 text-blue-300 group-hover:text-white transition-colors" />
                        </span>
                        <div>
                          <p className="text-white/35 text-[10px] font-medium">Facebook Page</p>
                          <p className="text-white font-semibold text-sm">CVM Finance and Credit</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.08] mb-6" />

                  {/* Office hours */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-3.5 h-3.5 text-[#FDDC00]" />
                      <p className="text-white/30 text-[10px] font-extrabold tracking-[0.18em] uppercase">
                        Office Hours
                      </p>
                    </div>
                    <div className="space-y-2">
                      {officeHours.map((h) => (
                        <div key={h.day} className="flex items-center justify-between">
                          <span className="text-white/50 text-xs">{h.day}</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${h.open ? "bg-emerald-400" : "bg-white/25"}`} />
                            <span className={`text-xs font-semibold ${h.open ? "text-white" : "text-red-400"}`}>
                              {h.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Head office address */}
                  <div className="p-3.5 bg-white/[0.05] border border-white/[0.08] rounded-xl">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#FDDC00] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/35 text-[10px] font-extrabold tracking-widest uppercase mb-1">
                          Head Office
                        </p>
                        <p className="text-white/70 text-xs leading-relaxed">
                          #163 FEMS Bldg. L. Wood St. Pantayin<br />
                          Brgy. Dolores, Taytay, Rizal, Philippines
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* ══ RIGHT: Contact form ══ */}
          <div className="lg:col-span-3">
            <SectionReveal direction="right">
              <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(8,71,124,0.08)] border border-slate-100 p-7 lg:p-8">

                {/* Form header */}
                <div className="mb-7">
                  <h2 className="text-2xl font-extrabold text-[#08477C] mb-1.5">Get in Touch With Us</h2>
                  <p className="text-slate-400 text-sm">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* ── Success state ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center py-14"
                    >
                      <div className="relative inline-flex mb-5">
                        <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl scale-150" />
                        <div className="relative w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                      </div>
                      <h3 className="text-xl font-extrabold text-[#08477C] mb-2">Message Sent!</h3>
                      <p className="text-slate-500 text-sm mb-7 max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. We&apos;ll review your inquiry and get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#08477C]/20 text-[#08477C] font-semibold text-sm rounded-xl hover:bg-[#08477C]/5 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    /* ── Form ── */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* ── Section: Inquiry Type ── */}
                      <div>
                        <FormSection icon={FileText} label="Inquiry Type" />
                        <div>
                          <Label htmlFor="type" className="text-slate-600 text-xs font-semibold mb-1.5 block">
                            What can we help you with? <span className="text-red-400">*</span>
                          </Label>
                          <Select
                            value={selectedType}
                            onValueChange={(val) => { setSelectedType(val); setValue("type", val); }}
                          >
                            <SelectTrigger className={`h-11 text-sm ${errors.type ? "border-red-300 focus:ring-red-200" : ""}`}>
                              <SelectValue placeholder="Select inquiry type..." />
                            </SelectTrigger>
                            <SelectContent>
                              {inquiryTypes.map((t) => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FieldError message={errors.type?.message} />
                        </div>
                      </div>

                      {/* ── Section: Personal Info ── */}
                      <div>
                        <FormSection icon={User} label="Personal Information" />
                        <div className="space-y-4">
                          {/* Name + Age */}
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2">
                              <Label htmlFor="name" className="text-slate-600 text-xs font-semibold mb-1.5 block">
                                Full Name <span className="text-red-400">*</span>
                              </Label>
                              <Input
                                id="name"
                                placeholder="Juan dela Cruz"
                                {...register("name")}
                                className={`h-11 text-sm ${errors.name ? "border-red-300" : ""}`}
                              />
                              <FieldError message={errors.name?.message} />
                            </div>
                            <div>
                              <Label htmlFor="age" className="text-slate-600 text-xs font-semibold mb-1.5 block">
                                Age <span className="text-red-400">*</span>
                              </Label>
                              <Input
                                id="age"
                                type="number"
                                placeholder="35"
                                {...register("age")}
                                className={`h-11 text-sm ${errors.age ? "border-red-300" : ""}`}
                              />
                              <FieldError message={errors.age?.message} />
                            </div>
                          </div>

                          {/* Address */}
                          <div>
                            <Label htmlFor="address" className="text-slate-600 text-xs font-semibold mb-1.5 block">
                              Address <span className="text-red-400">*</span>
                            </Label>
                            <Input
                              id="address"
                              placeholder="123 Main St, San Pablo City, Laguna"
                              {...register("address")}
                              className={`h-11 text-sm ${errors.address ? "border-red-300" : ""}`}
                            />
                            <FieldError message={errors.address?.message} />
                          </div>
                        </div>
                      </div>

                      {/* ── Section: Contact Info ── */}
                      <div>
                        <FormSection icon={Mail} label="Contact Information" />
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="mobile" className="text-slate-600 text-xs font-semibold mb-1.5 block">
                              Mobile Number <span className="text-red-400">*</span>
                            </Label>
                            <Input
                              id="mobile"
                              placeholder="09171234567"
                              maxLength={11}
                              {...register("mobileNo")}
                              className={`h-11 text-sm ${errors.mobileNo ? "border-red-300" : ""}`}
                            />
                            <FieldError message={errors.mobileNo?.message} />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-slate-600 text-xs font-semibold mb-1.5 block">
                              Email Address <span className="text-red-400">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="juan@example.com"
                              {...register("email")}
                              className={`h-11 text-sm ${errors.email ? "border-red-300" : ""}`}
                            />
                            <FieldError message={errors.email?.message} />
                          </div>
                        </div>
                      </div>

                      {/* ── Section: Inquiry Details ── */}
                      <div>
                        <FormSection icon={MessageSquare} label="Inquiry Details" />
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="loanInquiry" className="text-slate-600 text-xs font-semibold mb-1.5 block">
                              Loan Inquiry <span className="text-red-400">*</span>
                            </Label>
                            <Textarea
                              id="loanInquiry"
                              placeholder="Describe your loan needs (type, amount, purpose)..."
                              rows={3}
                              {...register("loanInquiry")}
                              className={`text-sm resize-none ${errors.loanInquiry ? "border-red-300" : ""}`}
                            />
                            <FieldError message={errors.loanInquiry?.message} />
                          </div>
                          <div>
                            <Label htmlFor="message" className="text-slate-600 text-xs font-semibold mb-1.5 block">
                              Additional Message <span className="text-red-400">*</span>
                            </Label>
                            <Textarea
                              id="message"
                              placeholder="Any additional information or questions..."
                              rows={3}
                              {...register("message")}
                              className={`text-sm resize-none ${errors.message ? "border-red-300" : ""}`}
                            />
                            <FieldError message={errors.message?.message} />
                          </div>
                        </div>
                      </div>

                      {/* Terms checkbox */}
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <Checkbox
                          id="agreeToTerms"
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => setValue("agreeToTerms", checked as boolean)}
                          className="mt-0.5 flex-shrink-0"
                        />
                        <div>
                          <label htmlFor="agreeToTerms" className="text-sm text-slate-600 cursor-pointer leading-relaxed">
                            I agree to the{" "}
                            <Link
                              href="/terms-and-condition"
                              className="text-[#08477C] font-semibold hover:underline"
                              target="_blank"
                            >
                              Terms and Conditions
                            </Link>{" "}
                            and consent to the collection and processing of my personal data.
                          </label>
                          <FieldError message={errors.agreeToTerms?.message} />
                        </div>
                      </div>

                      {/* Submit error */}
                      {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center gap-2.5 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {submitError}
                        </div>
                      )}

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2.5 bg-[#08477C] text-white font-bold py-3.5 rounded-xl text-sm hover:bg-[#063a66] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99] shadow-[0_4px_16px_rgba(8,71,124,0.25)]"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* ── Google Maps embed — full width ── */}
        <SectionReveal delay={0.2}>
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(8,71,124,0.10)] border border-slate-100">
            {/* Map header */}
            <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#08477C]/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#08477C]" />
                </div>
                <div>
                  <p className="font-bold text-[#08477C] text-sm">Head Office Location</p>
                  <p className="text-slate-400 text-xs">#163 FEMS Bldg. L. Wood St., Brgy. Dolores, Taytay, Rizal</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=163+L+Wood+Street+Taytay+Rizal+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#08477C] text-xs font-semibold hover:underline flex-shrink-0"
              >
                Open in Maps
                <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
              </a>
            </div>

            {/* Map iframe */}
            <div className="relative w-full h-[380px] bg-slate-100">
              <iframe
                src="https://maps.google.com/maps?q=Taytay+Rizal+Philippines&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CVM Finance Head Office Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}
