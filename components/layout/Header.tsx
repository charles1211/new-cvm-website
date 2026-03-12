"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/branches", label: "BRANCHES" },
  { href: "/loan-calculator", label: "LOAN CALCULATOR" },
  { href: "/contacts", label: "CONTACT US" },
  { href: "/about", label: "ABOUT US" },
  { href: "/news", label: "NEWS" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white/20 flex items-center justify-center">
            <Image
              src="/cvmlogo.ico"
              alt="CVM Finance Logo"
              width={40}
              height={40}
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className={cn("transition-colors duration-300", isTransparent ? "text-white" : "text-primary")}>
            <p className="font-extrabold text-base leading-tight">CVM Finance</p>
            <p className="text-xs opacity-70 leading-tight">and Credit Corporation</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-xs font-bold tracking-wider rounded-lg transition-all duration-200 relative group",
                  isTransparent
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-primary hover:bg-primary/10",
                  isActive && (isTransparent ? "text-secondary" : "text-secondary")
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-secondary transition-all duration-300 rounded-full",
                  isActive ? "w-4/5" : "w-0 group-hover:w-4/5"
                )} />
              </Link>
            );
          })}
          <Button variant="secondary" size="sm" className="ml-3" asChild>
            <Link href="/contacts">Inquire Now</Link>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn("rounded-xl", isTransparent ? "text-white hover:bg-white/10" : "text-primary")}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-primary text-white border-none p-0">
            <div className="flex flex-col h-full pt-6 px-6">
              <div className="flex items-center gap-3 mb-8">
                <Image
                  src="/cvmlogo.ico"
                  alt="CVM Finance"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
                <div>
                  <p className="font-extrabold text-sm">CVM Finance</p>
                  <p className="text-xs text-white/60">and Credit Corporation</p>
                </div>
              </div>
              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200",
                        pathname === link.href
                          ? "bg-secondary text-primary"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="pb-8 pt-4">
                <Button variant="secondary" size="lg" className="w-full" asChild>
                  <Link href="/contacts" onClick={() => setMobileOpen(false)}>Inquire Now</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
