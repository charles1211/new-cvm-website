"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function PaymentSuccessfulContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-32">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-primary mb-3">Payment Successful!</h1>
        <p className="text-slate-500 mb-2 text-sm">Your payment has been processed successfully.</p>
        {id && <p className="text-slate-400 text-xs mb-8">Reference: <span className="font-mono font-bold">{id}</span></p>}
        <Button variant="default" size="lg" asChild className="w-full">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function PaymentSuccessfulPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <PaymentSuccessfulContent />
    </Suspense>
  );
}
