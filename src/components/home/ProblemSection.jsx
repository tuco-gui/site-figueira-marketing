import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const pains = [
  ["Marketing", "Campanhas e conteúdo geram movimento, mas ninguém consegue ligar esforço a oportunidade e venda."],
  ["Comercial", "Leads chegam e ficam sem próximo passo, sem prioridade ou sem uma cadência clara de acompanhamento."],
  ["Site", "A empresa entrega bem, mas a presença digital explica pouco, transmite menos confiança e não conduz a decisão."],
  ["Dados", "Mídia, analytics, CRM e financeiro contam histórias diferentes e a gestão perde tempo discutindo qual número vale."],
  ["Automação", "Ferramentas existem, porém o processo continua manual, frágil e dependente de alguém lembrar do que fazer."],
  ["Operação", "Algumas ações funcionam, outras não. Sem processo e aprendizado registrado, fica difícil repetir o que deu certo."],
];

function PainGlyph({ index }) {
  const paths = [
    <path key="1" d="M4 18V8h6v10m4 0V4h6v14M3 18h18" />,
    <path key="2" d="M5 6h14M5 12h9M5 18h5m7-8 3 2-3 2" />,
    <path key="3" d="M4 5h16v14H4zM4 9h16M8 15h4" />,
    <path key="4" d="M4 18V10m5 8V6m5 12v-5m5 5V3" />,
    <path key="5" d="M5 8h5l2-4 2 8 2-4h3M5 16h14" />,
    <path key="6" d="M6 18 12 6l6 12M8.5 14h7" />,
  ];
  return <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[index % paths.length]}</g></svg>;
}

export default function ProblemSection() {
  return (
    <section className="py-24 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 lg:mb-20">
          <div className="grid grid-cols-[auto_1fr] gap-3 items-center mb-5">
            <span className="font-display font-black text-3xl text-[#C4191F]">01</span>
            <span className="justify-self-start inline-flex px-3 py-1 rounded-full border border-border bg-secondary font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">O problema</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-8 lg:gap-16 items-end">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.05em] leading-[0.95]">
              O investimento pode estar entrando por um lado e <span className="text-[#C4191F]">escapando por outro.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl lg:justify-self-end">
              Às vezes o gargalo está na aquisição. Em outras, na página, no atendimento, no follow-up ou no dado. O problema não é ter várias frentes. É não saber qual delas mais limita o resultado agora.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {pains.map(([title, description], i) => (
            <AnimatedSection key={title} delay={i * 0.05}>
              <motion.article
                whileHover={{ backgroundColor: "rgba(196,25,31,0.035)" }}
                className="min-h-[245px] p-7 lg:p-8 border-r border-b border-border flex flex-col"
              >
                <div className="flex items-start justify-between mb-12">
                  <span className="w-12 h-12 rounded-full border border-foreground/15 flex items-center justify-center text-[#C4191F]">
                    <PainGlyph index={i} />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display font-black text-xl lg:text-2xl mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-12 items-center bg-[#111111] text-white rounded-[24px] p-7 lg:p-10">
            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-[#4BDF6A]">
              <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true"><path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg>
            </div>
            <p className="font-display font-bold text-xl lg:text-2xl max-w-4xl">
              Antes de comprar mais mídia, trocar o CRM ou reconstruir o site, vale descobrir onde a oportunidade está sendo perdida.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}