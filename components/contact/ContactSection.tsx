"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Facebook,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  User,
  Mail,
  FileText,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

/* ── Schema ── */
const contactSchema = z.object({
  type: z.string().min(1, "Please select an inquiry type"),
  name: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  age: z
    .string()
    .refine((v) => Number(v) > 0 && Number(v) < 120, {
      message: "Please enter a valid age",
    }),
  mobileNo: z
    .string()
    .length(11, "Mobile number must be exactly 11 digits")
    .regex(/^[0-9]+$/, "Numbers only"),
  email: z.string().email("Please enter a valid email address"),
  loanInquiry: z.string().min(10, "Please describe your loan inquiry"),
  message: z.string().min(10, "Please enter your message"),
  agreeToTerms: z
    .boolean()
    .refine((v) => v === true, {
      message: "You must agree to the Terms and Conditions",
    }),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ── Data ── */
const inquiryTypes = [
  "New Loan Inquiry",
  "Existing Client Support",
  "Payment Assistance",
  "Other Concern",
];

const phoneChannels = [
  { label: "Smart", value: "0918-XXX-XXXX", href: "tel:09180000000" },
  { label: "Globe", value: "0917-XXX-XXXX", href: "tel:09170000000" },
  { label: "Landline", value: "(049) 501-0900", href: "tel:04995010900" },
];

const officeHours = [
  { day: "Monday – Friday", time: "8:00 AM – 5:00 PM", open: true },
  { day: "Saturday", time: "8:00 AM – 12:00 PM", open: true },
  { day: "Sunday", time: "Closed", open: false },
];

const FORM_STEPS = [
  { label: "Inquiry", icon: FileText },
  { label: "Personal", icon: User },
  { label: "Contact", icon: Mail },
  { label: "Message", icon: MessageSquare },
];

/* ── Helpers ── */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
    >
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </motion.p>
  );
}

function SectionLabel({
  icon: Icon,
  label,
  step,
}: {
  icon: React.ElementType;
  label: string;
  step: number;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-[#08477C] text-white text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
          {step}
        </span>
        <div className="w-7 h-7 bg-[#08477C]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-[#08477C]" />
        </div>
      </div>
      <h4 className="text-[#08477C] font-extrabold text-sm tracking-wide">
        {label}
      </h4>
      <div className="flex-1 h-px bg-gradient-to-r from-[#08477C]/20 to-transparent" />
    </div>
  );
}

/* ── Sidebar ── */
function ContactSidebar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="lg:col-span-2"
    >
      <div
        className="sticky top-24 rounded-2xl overflow-hidden text-white"
        style={{ background: "linear-gradient(155deg, #021628 0%, #08477C 60%, #0a5a9c 100%)" }}
      >
        {/* Fine dot grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1.5px 1.5px, rgba(253,220,0,0.8) 1.5px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDDC00]/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/[0.08] rounded-full blur-2xl pointer-events-none" />
        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FDDC00]/60 to-transparent" />

        <div className="relative z-10 p-7 space-y-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 text-[#FDDC00] text-[10px] font-extrabold tracking-[0.22em] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FDDC00] animate-pulse" />
              CVM Finance
            </span>
            <h2 className="text-2xl font-extrabold leading-tight mb-1.5">
              We&apos;re Here
              <br />
              <span className="text-[#FDDC00]">to Help You</span>
            </h2>
            <p className="text-white/45 text-sm leading-relaxed">
              Reach out through any channel, or use the form to send us a message.
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-white/[0.08]" />

          {/* Phone numbers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <p className="text-white/30 text-[10px] font-extrabold tracking-[0.18em] uppercase mb-3 flex items-center gap-2">
              <Phone className="w-3 h-3 text-[#FDDC00]" />
              Phone Numbers
            </p>
            <div className="space-y-1.5">
              {phoneChannels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.08] transition-colors duration-200 cursor-pointer"
                >
                  <span className="w-8 h-8 bg-white/[0.08] border border-white/[0.1] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#FDDC00] group-hover:border-[#FDDC00] transition-all duration-200">
                    <Phone className="w-3.5 h-3.5 group-hover:text-[#08477C] transition-colors" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/35 text-[10px] font-medium">{c.label}</p>
                    <p className="text-white font-semibold text-sm">{c.value}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#FDDC00] opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-white/[0.08]" />

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-white/30 text-[10px] font-extrabold tracking-[0.18em] uppercase mb-3 flex items-center gap-2">
              <Facebook className="w-3 h-3 text-[#FDDC00]" />
              Social Channels
            </p>
            <div className="space-y-1.5">
              {[
                {
                  href: "https://m.me/cvmfinancecredit",
                  icon: MessageSquare,
                  sublabel: "Facebook Messenger",
                  name: "@cvmfinancecredit",
                  color: "bg-sky-500/20 border-sky-400/20 group-hover:bg-sky-500 group-hover:border-sky-500",
                  iconColor: "text-sky-300 group-hover:text-white",
                },
                {
                  href: "https://www.facebook.com/cvmfinancecredit",
                  icon: Facebook,
                  sublabel: "Facebook Page",
                  name: "CVM Finance and Credit",
                  color: "bg-blue-600/20 border-blue-500/20 group-hover:bg-blue-600 group-hover:border-blue-600",
                  iconColor: "text-blue-300 group-hover:text-white",
                },
              ].map((s) => (
                <motion.a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.08] transition-colors duration-200"
                >
                  <span
                    className={`w-8 h-8 border rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${s.color}`}
                  >
                    <s.icon className={`w-3.5 h-3.5 transition-colors ${s.iconColor}`} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/35 text-[10px] font-medium">{s.sublabel}</p>
                    <p className="text-white font-semibold text-sm truncate">{s.name}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-[#FDDC00] opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-white/[0.08]" />

          {/* Office hours */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-white/30 text-[10px] font-extrabold tracking-[0.18em] uppercase mb-3 flex items-center gap-2">
              <Clock className="w-3 h-3 text-[#FDDC00]" />
              Office Hours
            </p>
            <div className="space-y-2">
              {officeHours.map((h) => (
                <div key={h.day} className="flex items-center justify-between">
                  <span className="text-white/50 text-xs">{h.day}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        h.open ? "bg-emerald-400 animate-pulse" : "bg-white/25"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        h.open ? "text-white" : "text-red-400"
                      }`}
                    >
                      {h.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Head office */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="p-4 rounded-xl border border-[#FDDC00]/20 bg-[#FDDC00]/[0.05]"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FDDC00]/15 border border-[#FDDC00]/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#FDDC00]" />
              </div>
              <div>
                <p className="text-[#FDDC00]/80 text-[10px] font-extrabold tracking-widest uppercase mb-1">
                  Head Office
                </p>
                <p className="text-white/70 text-xs leading-relaxed">
                  #163 FEMS Bldg. L. Wood St. Pantayin
                  <br />
                  Brgy. Dolores, Taytay, Rizal, Philippines
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main export ── */
export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-60px" });

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
  const onSubmit = async (_data: ContactFormData) => {
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
    <section className="py-16 bg-[#F8FAFC] relative overflow-hidden">
      {/* Subtle background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#08477C]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FDDC00]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Sidebar */}
          <ContactSidebar />

          {/* ── Form card ── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(8,71,124,0.09)] border border-slate-100/80 overflow-hidden">

              {/* Form top bar */}
              <div className="px-7 pt-7 pb-5 border-b border-slate-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#08477C] mb-1">
                      Get in Touch With Us
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Fill out the form below — we&apos;ll respond within 24 hours.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-700 text-[10px] font-extrabold tracking-wide">
                      ONLINE
                    </span>
                  </div>
                </div>

                {/* Progress steps */}
                <div className="flex items-center gap-1 mt-5">
                  {FORM_STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-center flex-1">
                      <div className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-7 h-7 rounded-full bg-[#08477C]/10 border border-[#08477C]/20 flex items-center justify-center">
                          <step.icon className="w-3 h-3 text-[#08477C]/60" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 hidden sm:block">
                          {step.label}
                        </span>
                      </div>
                      {i < FORM_STEPS.length - 1 && (
                        <div className="flex-1 h-px bg-gradient-to-r from-[#08477C]/20 to-[#08477C]/10 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form body */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success state ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center py-16 px-7"
                  >
                    {/* Animated rings */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full border border-emerald-300/30"
                          initial={{ width: 80, height: 80, opacity: 0 }}
                          animate={{
                            width: [80, 120 + i * 24],
                            height: [80, 120 + i * 24],
                            opacity: [0.6, 0],
                          }}
                          transition={{
                            duration: 1.8,
                            delay: i * 0.3,
                            repeat: Infinity,
                            repeatDelay: 0.4,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                      <div className="relative w-20 h-20 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
                        >
                          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </motion.div>
                      </div>
                    </div>
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl font-extrabold text-[#08477C] mb-2"
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed"
                    >
                      Thank you for reaching out. We&apos;ll review your inquiry and
                      get back to you within 24 hours.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#08477C]/20 text-[#08477C] font-semibold text-sm rounded-xl hover:bg-[#08477C]/5 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-7 space-y-8"
                  >
                    {/* Step 1: Inquiry Type */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <SectionLabel icon={FileText} label="Inquiry Type" step={1} />
                      <Label
                        htmlFor="type"
                        className="text-slate-600 text-xs font-semibold mb-1.5 block"
                      >
                        What can we help you with?{" "}
                        <span className="text-red-400">*</span>
                      </Label>
                      <Select
                        value={selectedType}
                        onValueChange={(val) => {
                          setSelectedType(val);
                          setValue("type", val);
                        }}
                      >
                        <SelectTrigger
                          className={`h-11 text-sm transition-all ${
                            errors.type
                              ? "border-red-300 focus:ring-red-200"
                              : "hover:border-[#08477C]/40 focus:border-[#08477C]"
                          }`}
                        >
                          <SelectValue placeholder="Select inquiry type..." />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError message={errors.type?.message} />
                    </motion.div>

                    {/* Step 2: Personal Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 }}
                    >
                      <SectionLabel icon={User} label="Personal Information" step={2} />
                      <div className="space-y-4">
                        {/* Name + Age */}
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <Label
                              htmlFor="name"
                              className="text-slate-600 text-xs font-semibold mb-1.5 block"
                            >
                              Full Name <span className="text-red-400">*</span>
                            </Label>
                            <Input
                              id="name"
                              placeholder="Juan dela Cruz"
                              {...register("name")}
                              className={`h-11 text-sm transition-all hover:border-[#08477C]/40 focus:border-[#08477C] ${
                                errors.name ? "border-red-300" : ""
                              }`}
                            />
                            <FieldError message={errors.name?.message} />
                          </div>
                          <div>
                            <Label
                              htmlFor="age"
                              className="text-slate-600 text-xs font-semibold mb-1.5 block"
                            >
                              Age <span className="text-red-400">*</span>
                            </Label>
                            <Input
                              id="age"
                              type="number"
                              placeholder="35"
                              {...register("age")}
                              className={`h-11 text-sm transition-all hover:border-[#08477C]/40 focus:border-[#08477C] ${
                                errors.age ? "border-red-300" : ""
                              }`}
                            />
                            <FieldError message={errors.age?.message} />
                          </div>
                        </div>
                        {/* Address */}
                        <div>
                          <Label
                            htmlFor="address"
                            className="text-slate-600 text-xs font-semibold mb-1.5 block"
                          >
                            Address <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="address"
                            placeholder="123 Main St, San Pablo City, Laguna"
                            {...register("address")}
                            className={`h-11 text-sm transition-all hover:border-[#08477C]/40 focus:border-[#08477C] ${
                              errors.address ? "border-red-300" : ""
                            }`}
                          />
                          <FieldError message={errors.address?.message} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 3: Contact Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.26 }}
                    >
                      <SectionLabel icon={Mail} label="Contact Information" step={3} />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="mobile"
                            className="text-slate-600 text-xs font-semibold mb-1.5 block"
                          >
                            Mobile Number <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="mobile"
                            placeholder="09171234567"
                            maxLength={11}
                            {...register("mobileNo")}
                            className={`h-11 text-sm transition-all hover:border-[#08477C]/40 focus:border-[#08477C] ${
                              errors.mobileNo ? "border-red-300" : ""
                            }`}
                          />
                          <FieldError message={errors.mobileNo?.message} />
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-slate-600 text-xs font-semibold mb-1.5 block"
                          >
                            Email Address <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="juan@example.com"
                            {...register("email")}
                            className={`h-11 text-sm transition-all hover:border-[#08477C]/40 focus:border-[#08477C] ${
                              errors.email ? "border-red-300" : ""
                            }`}
                          />
                          <FieldError message={errors.email?.message} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Step 4: Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.34 }}
                    >
                      <SectionLabel icon={MessageSquare} label="Your Message" step={4} />
                      <div className="space-y-4">
                        <div>
                          <Label
                            htmlFor="loanInquiry"
                            className="text-slate-600 text-xs font-semibold mb-1.5 block"
                          >
                            Loan Inquiry <span className="text-red-400">*</span>
                          </Label>
                          <Textarea
                            id="loanInquiry"
                            placeholder="Describe your loan needs (type, amount, purpose)..."
                            rows={3}
                            {...register("loanInquiry")}
                            className={`text-sm resize-none transition-all hover:border-[#08477C]/40 focus:border-[#08477C] ${
                              errors.loanInquiry ? "border-red-300" : ""
                            }`}
                          />
                          <FieldError message={errors.loanInquiry?.message} />
                        </div>
                        <div>
                          <Label
                            htmlFor="message"
                            className="text-slate-600 text-xs font-semibold mb-1.5 block"
                          >
                            Additional Message <span className="text-red-400">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Any additional information or questions..."
                            rows={3}
                            {...register("message")}
                            className={`text-sm resize-none transition-all hover:border-[#08477C]/40 focus:border-[#08477C] ${
                              errors.message ? "border-red-300" : ""
                            }`}
                          />
                          <FieldError message={errors.message?.message} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Terms */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-start gap-3 p-4 bg-[#08477C]/[0.04] rounded-xl border border-[#08477C]/10"
                    >
                      <Checkbox
                        id="agreeToTerms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) =>
                          setValue("agreeToTerms", checked as boolean)
                        }
                        className="mt-0.5 flex-shrink-0 border-[#08477C]/30 data-[state=checked]:bg-[#08477C] data-[state=checked]:border-[#08477C]"
                      />
                      <div>
                        <label
                          htmlFor="agreeToTerms"
                          className="text-sm text-slate-600 cursor-pointer leading-relaxed"
                        >
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
                    </motion.div>

                    {/* Submit error */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center gap-2.5 text-red-600 text-sm"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {submitError}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.46 }}
                      whileHover={{ scale: submitting ? 1 : 1.01, y: submitting ? 0 : -1 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full relative flex items-center justify-center gap-2.5 text-white font-bold py-4 rounded-xl text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-shadow duration-200 overflow-hidden shadow-[0_6px_24px_rgba(8,71,124,0.3)] hover:shadow-[0_8px_32px_rgba(8,71,124,0.4)]"
                      style={{
                        background:
                          "linear-gradient(135deg, #08477C 0%, #0a5a9c 50%, #08477C 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {/* Shimmer on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                      <span className="relative flex items-center gap-2.5">
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── Map section ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(8,71,124,0.10)] border border-slate-100"
        >
          {/* Map header */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              background: "linear-gradient(135deg, #021628 0%, #08477C 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-9 h-9 bg-[#FDDC00]/15 border border-[#FDDC00]/30 rounded-xl flex items-center justify-center"
              >
                <MapPin className="w-4.5 h-4.5 text-[#FDDC00]" />
              </motion.div>
              <div>
                <p className="font-extrabold text-white text-sm">
                  Head Office Location
                </p>
                <p className="text-white/45 text-xs">
                  #163 FEMS Bldg. L. Wood St., Brgy. Dolores, Taytay, Rizal
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=163+L+Wood+Street+Taytay+Rizal+Philippines"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#FDDC00] text-xs font-semibold hover:text-[#FDDC00]/80 transition-colors flex-shrink-0"
            >
              Open in Maps
              <ExternalLink className="w-3.5 h-3.5" />
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
        </motion.div>
      </div>
    </section>
  );
}
