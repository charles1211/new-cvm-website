import Link from "next/link";
import { XCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-32">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-primary mb-3">Transaction Cancelled</h1>
        <p className="text-slate-500 mb-8 text-sm">Your transaction has been cancelled. No charges were made.</p>
        <div className="flex flex-col gap-3">
          <Button variant="default" size="lg" asChild>
            <Link href="/payment-form">Try Again</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/"><Home className="w-4 h-4 mr-2" />Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
