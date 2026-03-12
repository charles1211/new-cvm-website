import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden", className)}>
      <div className="h-48 bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
        <div className="h-4 bg-slate-100 rounded-lg w-full" />
        <div className="h-4 bg-slate-100 rounded-lg w-2/3" />
        <div className="h-10 bg-slate-200 rounded-xl w-full mt-4" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2 animate-pulse", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn("h-4 bg-slate-200 rounded", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}
