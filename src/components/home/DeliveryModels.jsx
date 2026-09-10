import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

const models = [
  {
    name: "Time Compartilhado",
    description: "Um squad multidisciplinar da Figueira dedicado à sua operação em compartilhamento com outros clientes. Ideal para empresas que precisam de estrutura completa com custo otimizado.",
    bullets: [
      "Estratégia, mídia, criativos e dados integrados",
      "Reuniões semanais de alinhamento",
      "Dashboard de resultado em tempo real",
      "SLA definido e documentado",
    ],
  },
  {
    name: "Time Dedicado",
    description: "Squad 100% exclusivo para a sua empresa. Mesma estrutura do time compartilhado, mas com dedicação total — sem divisão de atenção com outros clientes.",
    bullets: [
      "Foco exclusivo na sua operação",
      "Maior velocidade de execução e otimização",
      "Acesso direto ao time a qualquer momento",
      "Ideal para operações de maior volume e complexidade",
    ],
  },
  {
    name: "Projetos Pontuais",
    description: "Para empresas que precisam de uma entrega específica — sem contrato de longo prazo. Implantação de CRM, configuração de GA4, criação de landing page, auditoria de campanhas ou treinamento comercial.",
    bullets: [
      "Escopo fechado com entregáveis definidos",
      "Prazo e preço acordados antes de começar",
      "Sem mensalidade — você paga pelo projeto",
      "Documentação completa ao final",
    ],
  },
  {
    name: "Figueira Performance",
    subtitle: "Parceria por resultado — crescemos juntos ou não crescemos.",
    description: "Modelo ideal para empresas com produto validado que querem escalar as vendas reduzindo o risco do investimento. A Figueira entra como parceira do resultado — não apenas como fornecedora.",
    bullets: [
      "Mensalidade reduzida de gestão e tráfego pago",
      "A Figueira opera as campanhas com total dedicação",
      "Comissão proporcional sobre resultados gerados",
      "Modelo definido caso a caso — justo para os dois lados",
      "Alinhamento total de interesses: só ganhamos se você ganhar",
    ],
    badge: "EXCLUSIVO FIGUEIRA",
  },
];

export default function DeliveryModels() {
  const [active, setActive] = useState(0);
  const model = models[active];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          label="COMO FAZEMOS"
          title={<>Escolha o modelo de entrega ideal para <span className="text-[#C4191F]">sua empresa</span></>}
          subtitle="Cada empresa está em um momento diferente. Por isso a Figueira oferece quatro formas de trabalhar juntos."
        />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {models.map((m, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <button
                onClick={() => setActive(i)}
                className={`relative w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  active === i
                    ? 'border-[#C4191F] bg-[#C4191F]/5'
                    : 'border-border bg-white hover:border-[#C4191F]/30'
                }`}
              >
                {m.badge && (
                  <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-[#C4191F] text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                    {m.badge}
                  </span>
                )}
                <div className={`font-mono text-xs font-bold mb-2 ${active === i ? 'text-[#C4191F]' : 'text-muted-foreground'}`}>
                  0{i + 1}
                </div>
                <h3 className={`font-heading font-bold text-sm ${active === i ? 'text-[#C4191F]' : 'text-foreground'}`}>
                  {m.name}
                </h3>
              </button>
            </AnimatedSection>
          ))}
        </div>

        {/* Expanded content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-secondary/30 border border-border rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display font-black text-2xl mb-2">{model.name}</h3>
                {model.subtitle && (
                  <p className="text-[#C4191F] font-heading font-bold text-sm mb-4 italic">{model.subtitle}</p>
                )}
                <p className="text-muted-foreground leading-relaxed">{model.description}</p>
              </div>
              <div>
                <ul className="space-y-3">
                  {model.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="text-[#C4191F] font-bold flex-shrink-0 mt-0.5">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}