"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const paymentFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email required").or(z.literal("")),
  noEmail: z.boolean(),
  product: z.string().min(1, "Product is required"),
  loanNumber: z.string().min(3, "Loan number is required"),
  amount: z.string().refine((v) => Number(v) > 0, { message: "Amount must be greater than 0" }),
}).refine((d) => d.noEmail || d.email.length > 0, {
  message: "Email is required unless you select No Email",
  path: ["email"],
});

type FormData = z.infer<typeof paymentFormSchema>;

const loanPlaceholders = ["SBL-10XXX00", "LR-101XXX0", "PMB-201XXX", "SBL-30XXX00"];
const products = ["Pension Loan", "Private Teacher's Loan", "Sangla ORCR", "Sangla Titulo", "Business Loan"];

export default function PaymentFormPage() {
  const router = useRouter();
  const [phIdx, setPhIdx] = useState(0);
  const [noEmail, setNoEmail] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: { noEmail: false, email: "" },
  });

  useEffect(() => {
    const t = setInterval(() => setPhIdx((i) => (i + 1) % loanPlaceholders.length), 2000);
    return () => clearInterval(t);
  }, []);

  const onSubmit = (data: FormData) => {
    const params = new URLSearchParams({
      fname: data.firstName,
      lname: data.lastName,
      email: data.noEmail ? "" : data.email,
      product: data.product,
      loanno: data.loanNumber,
      amount: data.amount,
    });
    router.push(`/payment-option?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-32">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-8 py-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white">Payment Form</h1>
              <p className="text-white/60 text-xs">Enter your payment details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">First Name <span className="text-red-500">*</span></Label>
                <Input placeholder="Juan" {...register("firstName")} className={errors.firstName ? "border-red-300" : ""} />
                {errors.firstName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName.message}</p>}
              </div>
              <div>
                <Label className="mb-2 block">Last Name <span className="text-red-500">*</span></Label>
                <Input placeholder="dela Cruz" {...register("lastName")} className={errors.lastName ? "border-red-300" : ""} />
                {errors.lastName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label className="mb-2 block">Email Address {!noEmail && <span className="text-red-500">*</span>}</Label>
              <Input
                type="email"
                placeholder="juan@example.com"
                disabled={noEmail}
                {...register("email")}
                className={errors.email ? "border-red-300" : ""}
              />
              {errors.email && !noEmail && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
              <div className="flex items-center gap-2 mt-2">
                <Checkbox
                  id="noEmail"
                  checked={noEmail}
                  onCheckedChange={(checked) => {
                    setNoEmail(!!checked);
                    setValue("noEmail", !!checked);
                    if (checked) setValue("email", "");
                  }}
                />
                <label htmlFor="noEmail" className="text-sm text-slate-500 cursor-pointer">No Email Address</label>
              </div>
            </div>

            {/* Product */}
            <div>
              <Label className="mb-2 block">Product <span className="text-red-500">*</span></Label>
              <select
                className={`w-full h-11 px-4 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${errors.product ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"}`}
                {...register("product")}
              >
                <option value="">Select a product...</option>
                {products.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.product && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.product.message}</p>}
            </div>

            {/* Loan number */}
            <div>
              <Label className="mb-2 block">Loan Number <span className="text-red-500">*</span></Label>
              <Input
                placeholder={loanPlaceholders[phIdx]}
                {...register("loanNumber")}
                className={errors.loanNumber ? "border-red-300" : ""}
              />
              {errors.loanNumber && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.loanNumber.message}</p>}
            </div>

            {/* Amount */}
            <div>
              <Label className="mb-2 block">Payment Amount <span className="text-red-500">*</span></Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₱</span>
                <Input
                  type="number"
                  className={`pl-8 ${errors.amount ? "border-red-300" : ""}`}
                  placeholder="0.00"
                  min={1}
                  step="0.01"
                  {...register("amount")}
                />
              </div>
              {errors.amount && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.amount.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              Next — Choose Payment Method
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
