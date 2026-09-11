import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const models = [
  {
    name: "Time Compartilhado",
    label: "Operação integrada",
    description: "A Figueira reúne as competências necessárias para operar o escopo acordado junto à sua empresa. É uma forma de ter estratégia, execução e acompanhamento conectados sem montar toda a estrutura internamente.",
    bullets: ["Estratégia e execução no mesmo desenho", "Especialistas acionados conforme necessidade", "Rituais de acompanhamento", "Escopo e responsabilidades definidos"],
  },
  {
    name: "Time Dedicado",
    label: "Mais profundidade",
    description: "Para operações que exigem maior cadência, volume e proximidade, estruturamos uma frente com dedicação ampliada e rotina adaptada à complexidade do negócio.",
    bullets: ["Prioridade ampliada para a operação", "Maior cadência de execução", "Integração próxima com o time interno", "Modelo ajustado à complexidade"],
  },
  {
    name: "Projetos Pontuais",
    label: "Problema específico",
    description: "Quando o gargalo é claro, o trabalho pode começar e terminar em um projeto: site, landing page, CRM, automação, tracking, dashboard, agente de IA, integração ou solução sob medida.",
    bullets: ["Escopo fechado", "Entregáveis definidos", "Cronograma combinado antes do início", "Documentação da solução"],
  },
  {
    name: "Figueira Performance",
    label: "Modelo especial",
    description: "Em cenários específicos, podemos estruturar uma relação comercial com componente variável ligado ao resultado. Esse formato depende de diagnóstico, capacidade de mensuração e alinhamento de responsabilidades.",
    bullets: ["Avaliação caso a caso", "Métrica e atribuição definidas antes", "Responsabilidades explícitas", "Componente variável somente quando fizer sentido"],
  },
];

function ModelGlyph({ index }) {
  const marks = [
    <path key="1" d="M4 12h16M8 6h8M8 18h8" />,
    <path key="2" d="M6 18V8l6-4 6 4v10M9 12h6" />,
    <path key="3" d="M5 5h14v14H5zM8 9h8M8 13h5" />,
    <path key="4" d="M4 17c4-8 8-8 12 0m-8-7 4-4 4 4" />,
  ];
  return <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{marks[index]}</g></svg>
}

export default function DeliveryModels() {
  const [active, setActive] = useState(0);
  const model = models[active];

  return (
    <section className="py-24 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          label="COMO TRABALHAMOS"
          title={<>O formato acompanha o <span className="text-[#C4191F]">problema e o momento</span> da empresa.</>}
          subtitle="Nem toda necessidade pede uma operação completa. O desenho pode ser contínuo, dedicado, pontual ou especial."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[.72fr_1.28fr] gap-5 lg:gap-8">
          <div className="border border-border rounded-[22px] overflow-hidden">
            {models.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setActive(i)}
                className={`w-full grid grid-cols-[58px_1fr] gap-4 px-5 py-5 text-left border-b last:border-b-0 border-border transition-colors ${active === i ? "bg-[#111111] text-white" : "bg-white hover:bg-secondary/60"}`}
              >
                <span className={`w-11 h-11 rounded-full border flex items-center justify-center ${active === i ? "border-white/20 text-[#4BDF6A]" : "border-foreground/15 text-[#C4191F]"}`}>
                  <ModelGlyph index={i} />
                </span>
                <span>
                  <span className={`block font-mono text-[9px] uppercase tracking-[0.18em] mb-1 ${active === i ? "text-white/45" : "text-muted-foreground"}`}>{m.label}</span>
                  <span className="block font-display font-black text-lg">{m.name}</span>
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="relative bg-[#F7F6F2] border border-border rounded-[24px] p-8 lg:p-10 overflow-hidden min-h-[430px]"
            >
              <div className="absolute right-[-30px] top-[-30px] font-display font-black text-[190px] leading-none text-black/[0.035]">{String(active + 1).padStart(2, "0")}</div>
              <div className="relative z-10 max-w-2xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C4191F] mb-7">{model.label}</div>
                <h3 className="font-display font-black text-4xl lg:text-5xl tracking-[-0.045em] leading-[0.95] mb-6">{model.name}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-9">{model.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 border-t border-border">
                  {model.bullets.map((b, i) => (
                    <div key={b} className="grid grid-cols-[28px_1fr] gap-2 py-4 border-b border-border">
                      <span className="font-mono text-[10px] text-[#C4191F]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}