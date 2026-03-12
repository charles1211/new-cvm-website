"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { CreditCard, Smartphone, Building2, Banknote, Layers } from "lucide-react";

const paymentCategories = [
  {
    type: "E-Wallet",
    icon: Smartphone,
    methods: [
      { id: 1, name: "GCash", pChannel: "GCASH", pMethod: "ewallet", isEnabled: true },
      { id: 2, name: "PayMaya", pChannel: "PAYMAYA", pMethod: "ewallet", isEnabled: true },
      { id: 3, name: "ShopeePay", pChannel: "SHOPEEPAY", pMethod: "ewallet", isEnabled: false },
    ],
  },
  {
    type: "Non-bank Over the Counter",
    icon: Banknote,
    methods: [
      { id: 4, name: "7-Eleven", pChannel: "711", pMethod: "otc", isEnabled: true },
      { id: 5, name: "Bayad Center", pChannel: "BAYAD", pMethod: "otc", isEnabled: true },
      { id: 6, name: "LBC", pChannel: "LBC", pMethod: "otc", isEnabled: false },
    ],
  },
  {
    type: "Online Bank Transfer",
    icon: Building2,
    methods: [
      { id: 7, name: "BDO", pChannel: "BDO", pMethod: "bank", isEnabled: true },
      { id: 8, name: "BPI", pChannel: "BPI", pMethod: "bank", isEnabled: true },
      { id: 9, name: "UnionBank", pChannel: "UNIONBANK", pMethod: "bank", isEnabled: false },
    ],
  },
];

function PaymentOptionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelect = (method: { id: number; name: string; pChannel: string; pMethod: string; isEnabled: boolean }) => {
    if (!method.isEnabled) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", String(method.id));
    params.set("type", method.pMethod);
    params.set("pname", method.name);
    router.push(`/payment-summary?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background py-32 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-7 h-7 text-secondary" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary">Choose a Payment Method</h1>
          <p className="text-slate-500 mt-2 text-sm">Click one of the options below to continue</p>
        </div>

        <div className="space-y-6">
          {paymentCategories.map((cat) => (
            <div key={cat.type} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-card">
              <div className="flex items-center gap-3 px-6 py-4 bg-primary/5 border-b border-slate-100">
                <cat.icon className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-primary text-sm">{cat.type}</h2>
              </div>
              <div className="p-4 grid grid-cols-3 gap-3">
                {cat.methods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleSelect(method)}
                    disabled={!method.isEnabled}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                      method.isEnabled
                        ? "border-slate-100 hover:border-primary hover:shadow-card cursor-pointer active:scale-95"
                        : "border-slate-50 opacity-30 cursor-not-allowed"
                    }`}
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                      <Layers className="w-6 h-6 text-slate-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{method.name}</span>
                    {!method.isEnabled && (
                      <span className="absolute -top-1 -right-1 bg-red-100 text-red-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full">Maintenance</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PaymentOptionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <PaymentOptionContent />
    </Suspense>
  );
}
