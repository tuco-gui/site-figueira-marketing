import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function SectionHeader({ number, label, title, subtitle, dark = false }) {
  return (
    <AnimatedSection className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="font-display font-black text-3xl text-[#C4191F] leading-none">{number}</span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider ${
          dark ? 'bg-white/10 text-white/60' : 'bg-secondary text-muted-foreground border border-border'
        }`}>
          {label}
        </span>
      </div>
      {title && (
        <h2 className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 ${dark ? 'text-white' : ''}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}