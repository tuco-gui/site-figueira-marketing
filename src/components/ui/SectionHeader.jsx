import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function SectionHeader({ number, label, title, subtitle, dark = false }) {
  return (
    <AnimatedSection className="mb-12 lg:mb-16">
      <div className="grid grid-cols-[auto_1fr] items-center gap-3 mb-5">
        <span className="font-display font-black text-3xl text-[#C4191F] leading-none">{number}</span>
        <span className={`justify-self-start inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider ${
          dark ? "bg-white/10 text-white/60 border border-white/10" : "bg-secondary text-muted-foreground border border-border"
        }`}>
          {label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-6 lg:gap-14 items-end">
        {title && (
          <h2 className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-[-0.045em] leading-[0.96] ${dark ? "text-white" : ""}`}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p className={`text-base lg:text-lg leading-relaxed max-w-xl lg:justify-self-end ${dark ? "text-white/55" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        )}
      </div>
    </AnimatedSection>
  );
}