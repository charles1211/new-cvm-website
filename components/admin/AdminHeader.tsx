"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LogOut, ShieldCheck, User } from "lucide-react";
import { logout, getUsername } from "@/lib/auth";

export function AdminHeader() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(getUsername());
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://cvmfinancediag.blob.core.windows.net/cvmfcc-website/CVMFCCLogo.webp"
            alt="CVM Finance"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-extrabold text-[#08477C] text-sm hidden sm:block">
            CVM Finance
          </span>
          <span className="inline-flex items-center gap-1 bg-[#08477C] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            ADMIN
          </span>
        </div>
        <div className="flex items-center gap-3">
          {username && (
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500">
              <User className="w-3.5 h-3.5" />
              <span className="font-medium">{username}</span>
            </div>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
