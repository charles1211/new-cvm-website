"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { CreditCard, User, Package, Hash, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

function PaymentSummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paying, setPaying] = useState(false);

  const fname = searchParams.get("fname") || "";
  const lname = searchParams.get("lname") || "";
  const pname = searchParams.get("pname") || "";
  const type = searchParams.get("type") || "";
  const product = searchParams.get("product") || "";
  const loanno = searchParams.get("loanno") || "";
  const amount = parseFloat(searchParams.get("amount") || "0");

  const handlePay = async () => {
    setPaying(true);
    try {
      // Simulate payment processing
      await new Promise((r) => setTimeout(r, 2000));
      router.push("/payment-successful?id=demo");
    } catch {
      router.push("/payment-error");
    }
  };

  const rows = [
    { icon: CreditCard, label: "Payment Type", value: type || "—" },
    { icon: Package, label: "Payment Method", value: pname || "—" },
    { icon: User, label: "Full Name", value: `${fname} ${lname}`.trim() || "—" },
    { icon: Package, label: "Product", value: product || "—" },
    { icon: Hash, label: "Loan Number", value: loanno || "—" },
    { icon: DollarSign, label: "Amount", value: amount > 0 ? formatCurrency(amount) : "—" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-32 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="bg-primary px-8 py-6">
            <h1 className="text-xl font-extrabold text-white">Payment Summary</h1>
            <p className="text-white/60 text-xs mt-1">Please review before proceeding</p>
          </div>
          <div className="p-6 space-y-3">
            {rows.map((row) => (
              <div key={row.label} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
                <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <row.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400">{row.label}</p>
                  <p className="text-slate-800 font-semibold text-sm">{row.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-4 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-primary">Total Amount</span>
              <span className="text-2xl font-extrabold text-primary">{amount > 0 ? formatCurrency(amount) : "—"}</span>
            </div>
            <Button onClick={handlePay} size="xl" className="w-full" disabled={paying}>
              {paying ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : "PAY NOW"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSummaryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <PaymentSummaryContent />
    </Suspense>
  );
}
