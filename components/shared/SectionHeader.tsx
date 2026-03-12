import { cn } from "@/lib/utils";
import SectionReveal from "./SectionReveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-14", centered && "text-center max-w-3xl mx-auto", className)}>
      {eyebrow && (
        <SectionReveal>
          <span
            className={cn(
              "inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4",
              light
                ? "bg-white/15 text-secondary border border-secondary/30"
                : "bg-primary/10 text-primary border border-primary/20"
            )}
          >
            {eyebrow}
          </span>
        </SectionReveal>
      )}
      <SectionReveal delay={0.1}>
        <h2
          className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4",
            light ? "text-white" : "text-primary"
          )}
        >
          {title}{" "}
          {titleHighlight && <span className="text-secondary">{titleHighlight}</span>}
        </h2>
      </SectionReveal>
      {subtitle && (
        <SectionReveal delay={0.2}>
          <p
            className={cn(
              "text-lg leading-relaxed",
              light ? "text-white/75" : "text-slate-500"
            )}
          >
            {subtitle}
          </p>
        </SectionReveal>
      )}
    </div>
  );
}
