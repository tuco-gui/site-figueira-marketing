import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const motors = [
  {
    key: "DEMANDA",
    title: "Demanda",
    text: "Colocar a empresa diante das pessoas certas com mensagem, canal e oferta coerentes com a economia do negócio.",
    items: ["Mídia paga", "Conteúdo", "Aquisição", "Segmentação"],
  },
  {
    key: "ENGAJAMENTO",
    title: "Engajamento",
    text: "Transformar atenção em compreensão, confiança e intenção por meio de marca, experiência, copy, criativos e páginas.",
    items: ["Sites", "Landing pages", "Criativos", "Branding"],
  },
  {
    key: "RECEITA",
    title: "Receita",
    text: "Transformar intenção em venda com processo comercial, CRM, velocidade de resposta, follow-up, automação e gestão de pipeline.",
    items: ["CRM", "Vendas", "BDR", "Automações"],
  },
  {
    key: "EXPANSÃO",
    title: "Expansão",
    text: "Transformar clientes em permanência, maior valor, indicação, reputação e novas oportunidades de crescimento.",
    items: ["Retenção", "Sucesso", "Reengajamento", "Expansão"],
  },
];

function MotorGlyph({ index }) {
  const paths = [
    <path key="1" d="M4 12h16M13 5l7 7-7 7" />,
    <path key="2" d="M5 12c3-5 11-5 14 0-3 5-11 5-14 0Zm7-2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />,
    <path key="3" d="M5 7h14v10H5zM8 10h8M8 14h5" />,
    <path key="4" d="M6 17c1-6 4-9 6-11 2 2 5 5 6 11M9 13h6" />,
  ];
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">{paths[index]}</g>
    </svg>
  );
}

export default function ShowcaseSection() {
  const [active, setActive] = useState(0);
  const motor = motors[active];

  return (
    <section className="py-24 lg:py-36 bg-[#F7F6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 lg:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-display font-black text-3xl text-[#C4191F]">05</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-[0.2em] border border-border">
              Método Figueira
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-8 lg:gap-16 items-end">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.05em] leading-[0.94]">
              A base sustenta. <span className="text-[#C4191F]">Quatro motores movem o crescimento.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl lg:justify-self-end">
              Antes dos canais, olhamos economia, mercado, oferta, capacidade operacional e restrições. Depois identificamos qual motor precisa de atenção agora.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr] border border-border rounded-[22px] overflow-hidden bg-white">
            <div className="p-6 lg:p-7 bg-[#111111] text-white">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#4BDF6A] mb-8">Base estratégica</div>
              <div className="space-y-3 text-sm text-white/65">
                <div>Economia do negócio</div>
                <div>Mercado e cliente</div>
                <div>Oferta e posicionamento</div>
                <div>Capacidade operacional</div>
                <div>Princípios e restrições</div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4">
              {motors.map((item, i) => (
                <button
                  key={item.key}
                  onClick={() => setActive(i)}
                  className={`relative text-left p-6 lg:p-7 min-h-[190px] border-b lg:border-b-0 border-r last:border-r-0 border-border transition-colors ${active === i ? "bg-[#C4191F] text-white" : "bg-white hover:bg-secondary/60"}`}
                >
                  <div className={`mb-9 ${active === i ? "text-[#4BDF6A]" : "text-[#C4191F]"}`}>
                    <MotorGlyph index={i} />
                  </div>
                  <div className={`font-mono text-[9px] tracking-[0.18em] mb-2 ${active === i ? "text-white/55" : "text-muted-foreground"}`}>0{i + 1}</div>
                  <div className="font-display font-black text-xl">{item.title}</div>
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={motor.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-10 bg-[#111111] text-white rounded-[24px] p-8 lg:p-10"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4BDF6A] mb-5">{motor.key}</div>
              <h3 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.045em] mb-5">{motor.title}</h3>
              <p className="text-lg text-white/65 leading-relaxed max-w-2xl">{motor.text}</p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 self-stretch">
              {motor.items.map((item, i) => (
                <div key={item} className="bg-[#111111] p-5 min-h-[96px] flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-[#C4191F]">{String(i + 1).padStart(2, "0")}</span>
                  <strong className="text-sm">{item}</strong>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}