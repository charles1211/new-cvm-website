"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, ImageIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AdminProduct } from "@/types";
import { DynamicListEditor } from "./DynamicListEditor";

export const productSchema = z.object({
  name: z.string().min(1, "Required"),
  subtitle: z.string().optional(),
  category: z.enum(["Pension", "Employment", "Collateral"]),
  badge: z.enum(["", "FEATURED", "NEW"]),
  num: z.string().min(1, "Required"),
  isEnabled: z.boolean(),
  description1: z.string().min(1, "Required"),
  description2: z.string().min(1, "Required"),
  description3: z.string().min(1, "Required"),
  accentHex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),
});

export type FormValues = z.infer<typeof productSchema>;

interface Props {
  product?: AdminProduct;
  onSubmit: (
    data: FormValues,
    extProps: AdminProduct["extendedProperties"],
    iconFile?: File
  ) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

type Section = "basic" | "stats" | "appearance" | "extended";

function AccordionSection({
  title, id, open, onToggle, children,
}: {
  title: string; id: Section; open: boolean;
  onToggle: (id: Section) => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden">
      <button type="button" onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left">
        <span className="font-bold text-sm text-[#08477C]">{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="p-5 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const inputCls = "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#08477C] focus:ring-2 focus:ring-[#08477C]/10 transition-all";
const selectCls = inputCls + " bg-white";

export function ProductForm({ product, onSubmit, onCancel, loading }: Props) {
  const isEdit = !!product;

  const [openSections, setOpenSections] = useState<Record<Section, boolean>>({
    basic: true, stats: !isEdit, appearance: !isEdit, extended: !isEdit,
  });

  const [qualified, setQualified] = useState<string[]>(
    product?.extendedProperties["Who are Qualified"] ?? []
  );
  const [requirements, setRequirements] = useState<string[]>(
    product?.extendedProperties["Requirements"] ?? []
  );
  const [loanDetails, setLoanDetails] = useState<string[]>(
    product?.extendedProperties["Loan Details"] ?? []
  );
  const [listErrors, setListErrors] = useState<Record<string, string>>({});
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>(product?.imagePath ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      subtitle: product?.subtitle ?? "",
      category: product?.category ?? "Pension",
      badge: product?.badge ?? "",
      num: product?.num ?? "",
      isEnabled: product?.isEnabled ?? true,
      description1: product?.description1 ?? "",
      description2: product?.description2 ?? "",
      description3: product?.description3 ?? "",
      accentHex: product?.accentHex ?? "#08477C",
    },
  });

  const category = watch("category");
  const accentHex = watch("accentHex");
  const toggleSection = (id: Section) => setOpenSections((s) => ({ ...s, [id]: !s[id] }));

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (values: FormValues) => {
    const errs: Record<string, string> = {};
    if (qualified.filter(Boolean).length === 0) errs.qualified = "At least one qualification required";
    if (requirements.filter(Boolean).length === 0) errs.requirements = "At least one requirement required";
    if (Object.keys(errs).length) {
      setListErrors(errs);
      setOpenSections((s) => ({ ...s, extended: true }));
      return;
    }
    setListErrors({});
    await onSubmit(
      values,
      {
        "Who are Qualified": qualified.filter(Boolean),
        Requirements: requirements.filter(Boolean),
        ...(category === "Pension" && loanDetails.filter(Boolean).length
          ? { "Loan Details": loanDetails.filter(Boolean) } : {}),
      },
      iconFile ?? undefined
    );
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-3">

        <AccordionSection title="1 — Basic Info" id="basic" open={openSections.basic} onToggle={toggleSection}>
          <Field label="Product Name" error={errors.name?.message}>
            <input {...register("name")} className={inputCls} placeholder="e.g. Pension Loan" />
          </Field>
          <Field label="Subtitle">
            <input {...register("subtitle")} className={inputCls} placeholder="e.g. For Government Pensioners" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category" error={errors.category?.message}>
              <select {...register("category")} className={selectCls}>
                <option value="Pension">Pension</option>
                <option value="Employment">Employment</option>
                <option value="Collateral">Collateral</option>
              </select>
            </Field>
            <Field label="Badge">
              <select {...register("badge")} className={selectCls}>
                <option value="">None</option>
                <option value="FEATURED">FEATURED</option>
                <option value="NEW">NEW</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Display Number" error={errors.num?.message}>
              <input {...register("num")} className={inputCls} placeholder="01" />
            </Field>
            <Field label="Visible on Site">
              <div className="flex items-center gap-3 mt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" {...register("isEnabled")} className="sr-only peer" />
                  <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-[#08477C] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:translate-x-5" />
                </label>
                <span className="text-xs text-slate-500">Enabled</span>
              </div>
            </Field>
          </div>
        </AccordionSection>

        <AccordionSection title="2 — Loan Stats" id="stats" open={openSections.stats} onToggle={toggleSection}>
          <Field label="Max Loanable" error={errors.description1?.message}>
            <input {...register("description1")} className={inputCls} placeholder="₱2,000,000" />
          </Field>
          <Field label="Loan Terms" error={errors.description2?.message}>
            <input {...register("description2")} className={inputCls} placeholder="3–60 months" />
          </Field>
          <Field label="Interest Rate" error={errors.description3?.message}>
            <input {...register("description3")} className={inputCls} placeholder="1.0–2.5% per month" />
          </Field>
        </AccordionSection>

        <AccordionSection title="3 — Icon & Appearance" id="appearance" open={openSections.appearance} onToggle={toggleSection}>
          <Field label="Product Icon">
            <div
              className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-[#08477C]/40 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFileChange(e.dataTransfer.files[0] ?? null); }}
            >
              {iconPreview ? (
                <div className="flex flex-col items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={iconPreview} alt="Icon preview" className="w-16 h-16 object-contain rounded-lg" />
                  <p className="text-xs text-slate-400">Click to replace</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-2">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                  <p className="text-sm font-medium text-slate-500">Drop image here</p>
                  <p className="text-xs text-slate-400">or click to browse</p>
                  <Upload className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
          </Field>
          <Field label="Accent Color" error={errors.accentHex?.message}>
            <div className="flex items-center gap-3">
              <input type="color" value={accentHex}
                onChange={(e) => setValue("accentHex", e.target.value, { shouldValidate: true })}
                className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white"
              />
              <input {...register("accentHex")} className={inputCls + " font-mono"} placeholder="#08477C" maxLength={7} />
            </div>
          </Field>
        </AccordionSection>

        <AccordionSection title="4 — Qualifications & Requirements" id="extended" open={openSections.extended} onToggle={toggleSection}>
          <Field label="Who are Qualified">
            <DynamicListEditor items={qualified} onChange={setQualified}
              placeholder="e.g. Government pensioners (GSIS/SSS)" error={listErrors.qualified} />
          </Field>
          <Field label="Requirements">
            <DynamicListEditor items={requirements} onChange={setRequirements}
              placeholder="e.g. Valid government ID" error={listErrors.requirements} />
          </Field>
          {category === "Pension" && (
            <Field label="Loan Details (Pension only)">
              <DynamicListEditor items={loanDetails} onChange={setLoanDetails}
                placeholder="e.g. Loan amount based on net monthly pension" />
            </Field>
          )}
        </AccordionSection>
      </div>

      <div className="flex-shrink-0 border-t border-slate-100 px-5 py-4 flex gap-3 bg-white">
        <button type="submit" disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-[#08477C] hover:bg-[#063a66] disabled:opacity-60 transition-colors">
          {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {loading ? "Saving..." : (isEdit ? "Save Changes" : "Create Product")}
        </button>
        <button type="button" onClick={onCancel}
          className="flex-1 py-3 rounded-xl font-semibold text-sm text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
