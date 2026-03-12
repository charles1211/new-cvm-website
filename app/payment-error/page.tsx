import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-32">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-primary mb-3">Payment Error</h1>
        <p className="text-slate-500 mb-2 text-sm">Sorry, our third party for this transaction is currently unavailable or under maintenance.</p>
        <p className="text-slate-400 text-sm mb-8">Please try again later.</p>
        <div className="flex flex-col gap-3">
          <Button variant="default" size="lg" asChild>
            <Link href="/payment-form">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/"><Home className="w-4 h-4 mr-2" />Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
