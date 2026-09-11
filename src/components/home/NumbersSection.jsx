import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const stats = [
  { value: "[ A definir ]", label: "Clientes atendidos" },
  { value: "[ A definir ]", label: "Gerenciados em mídia" },
  { value: "[ A definir ]", label: "ROI médio entregue" },
  { value: "[ A definir ]", label: "Anos de operação" },
];

export default function NumbersSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-display font-black text-3xl text-[#C4191F] leading-none">05</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
              A FIGUEIRA EM NÚMEROS
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Resultados que a gente pode <span className="text-[#C4191F]">mostrar</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-black text-3xl lg:text-4xl text-white mb-2">{s.value}</div>
                <p className="text-sm text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-center mt-10 text-xs text-white/30">
            * Dados atualizados conforme fechamento de cada período.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}