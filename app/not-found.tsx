import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Large 404 text */}
        <div className="relative mb-8">
          <p className="text-[180px] font-extrabold text-primary/5 leading-none select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary/10 rounded-3xl flex items-center justify-center">
              <span className="text-5xl font-extrabold text-primary">?</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-primary mb-3">404 Not Found</h1>
        <p className="text-slate-500 mb-2">Oops, Looks like this page is missing.</p>
        <p className="text-slate-400 text-sm mb-10">If you still need help, our team is always here for you.</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-primary-600 transition-all duration-300 hover:shadow-glow-blue active:scale-95"
          >
            <Home className="w-4 h-4" />
            GO TO HOMEPAGE
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-primary/10 transition-all duration-300 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Contact Support
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
          {[
            { href: "/products", label: "Products" },
            { href: "/branches", label: "Branches" },
            { href: "/loan-calculator", label: "Calculator" },
            { href: "/about", label: "About Us" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
