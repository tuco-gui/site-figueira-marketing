import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const steps = [
  { number: "01", title: "Diagnosticar", eyebrow: "Ler o sistema", description: "Entendemos economia, oferta, público, aquisição, site, atendimento, processo comercial, dados e restrições. O objetivo é separar sintoma de causa." },
  { number: "02", title: "Formular hipótese", eyebrow: "Definir causa provável", description: "Transformamos o diagnóstico em hipóteses claras. Cada hipótese precisa explicar o que pode estar limitando o resultado e qual evidência confirmaria isso." },
  { number: "03", title: "Priorizar", eyebrow: "Escolher onde agir", description: "Ordenamos iniciativas por impacto possível, urgência, esforço, capacidade interna e velocidade de aprendizado. Nem tudo entra ao mesmo tempo." },
  { number: "04", title: "Executar", eyebrow: "Colocar no mundo", description: "Ativamos a frente necessária: mídia, página, CRM, automação, agente, processo comercial, dados, tecnologia ou uma combinação delas." },
  { number: "05", title: "Medir", eyebrow: "Observar o que mudou", description: "Acompanhamos os sinais definidos antes da execução e registramos contexto para não confundir coincidência com aprendizado." },
  { number: "06", title: "Aprender", eyebrow: "Comparar hipótese e realidade", description: "O que aconteceu vira decisão. Mantemos, corrigimos, aprofundamos ou encerramos a iniciativa com base no que os dados permitem concluir." },
  { number: "07", title: "Escalar ou corrigir", eyebrow: "Mover a próxima peça", description: "Quando algo funciona, ampliamos com critério. Quando não funciona, voltamos ao diagnóstico e atacamos a próxima restrição sem maquiar o resultado." },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section className="py-24 lg:py-36 bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14">
          <div className="grid grid-cols-[auto_1fr] gap-3 items-center mb-5">
            <span className="font-display font-black text-3xl text-[#C4191F]">07</span>
            <span className="justify-self-start inline-flex px-3 py-1 rounded-full border border-border bg-white font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Processo</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-7 lg:gap-14 items-end">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.05em] leading-[0.94]">
              Diagnóstico, hipótese, execução e aprendizado. <span className="text-[#C4191F]">Sem efeito de palco.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl lg:justify-self-end">
              Clique nas etapas para entender como uma decisão vira execução e como a execução volta para a estratégia.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[.78fr_1.22fr] gap-5 lg:gap-8">
          <div className="border border-border bg-white rounded-[22px] overflow-hidden">
            {steps.map((item, i) => (
              <button
                key={item.number}
                onClick={() => setActive(i)}
                className={`w-full grid grid-cols-[52px_1fr] gap-3 items-center px-5 py-5 border-b last:border-b-0 border-border text-left transition-colors ${active === i ? "bg-[#111111] text-white" : "hover:bg-secondary/60"}`}
              >
                <span className={`font-mono text-xs ${active === i ? "text-[#4BDF6A]" : "text-[#C4191F]"}`}>{item.number}</span>
                <span className="font-display font-black text-lg">{item.title}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="relative min-h-[470px] bg-[#C4191F] text-white rounded-[26px] p-8 sm:p-10 lg:p-12 overflow-hidden"
            >
              <div className="absolute right-[-40px] top-[-30px] text-[220px] lg:text-[280px] font-display font-black leading-none text-white/[0.06] select-none">
                {step.number}
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-8">{step.eyebrow}</div>
                <div className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-[-0.055em] leading-[0.9] mb-7">{step.title}</div>
                <p className="text-lg lg:text-xl text-white/80 leading-relaxed">{step.description}</p>
              </div>

              <div className="absolute left-8 sm:left-10 lg:left-12 bottom-8 right-8 flex items-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Abrir etapa ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all ${active === i ? "w-12 bg-[#4BDF6A]" : "w-5 bg-white/25 hover:bg-white/45"}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}