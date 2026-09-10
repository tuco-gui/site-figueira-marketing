import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Link } from "react-router-dom";

const cards = [
  "[ INSERIR CASE REAL ]",
  "[ INSERIR DEPOIMENTO REAL ]",
  "[ INSERIR CASE REAL ]",
];

export default function CasesPlaceholder() {
  return (
    <section className="py-20 lg:py-32 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="07"
          label="RESULTADOS"
          dark
          title={<>Sistemas que entregam <span className="text-[#C4191F]">resultados</span> com nome e número</>}
          subtitle="Cada case abaixo tem rastreamento real — não estimativa, não projeção."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[200px] flex items-center justify-center text-center">
                <p className="text-white/30 font-mono text-sm">{card}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold text-sm rounded-lg hover:bg-white/5 transition-colors duration-200"
          >
            Ver todos os cases →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}