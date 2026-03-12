"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Printer, CheckCircle2 } from "lucide-react";

function PaymentInstructionContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref") || "REF-000000";
  const expiry = searchParams.get("expiry") || "N/A";

  return (
    <div className="min-h-screen bg-background py-32 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
          <div className="bg-amber-500 px-8 py-5 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-white" />
            <div>
              <h1 className="text-lg font-extrabold text-white">TRANSACTION PENDING</h1>
              <p className="text-white/70 text-xs">Follow the instructions below to complete payment</p>
            </div>
          </div>
          <div className="p-8">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 mb-6 text-sm text-slate-700 leading-relaxed">
              <p className="font-bold text-primary mb-2">Payment Instructions</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Go to any participating payment outlet (7-Eleven, Bayad Center, etc.)</li>
                <li>Present this reference number to the cashier</li>
                <li>Pay the exact amount shown in your Payment Summary</li>
                <li>Keep your receipt as proof of payment</li>
              </ol>
            </div>

            {/* Barcode placeholder */}
            <div className="text-center mb-6">
              <div className="inline-block bg-white border-2 border-slate-200 rounded-xl p-4">
                <div className="flex gap-0.5 h-16 items-end justify-center mb-2">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-slate-800"
                      style={{
                        width: i % 3 === 0 ? "3px" : "1.5px",
                        height: `${50 + (i % 5) * 5}%`,
                      }}
                    />
                  ))}
                </div>
                <p className="font-mono text-sm font-bold text-slate-700 tracking-widest">{reference}</p>
              </div>
            </div>

            <div className="text-center text-xs text-slate-400 mb-6">
              Payment slip valid until: <span className="font-semibold text-slate-600">{expiry}</span>
            </div>

            <button
              onClick={() => window.print()}
              className="no-print w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-600 transition-colors"
            >
              <Printer className="w-5 h-5" />
              Print Payment Slip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentInstructionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <PaymentInstructionContent />
    </Suspense>
  );
}
