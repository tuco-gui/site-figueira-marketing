import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

const differentials = [
  {
    title: "Não vendemos ações soltas. Construímos sistema.",
    description: "Cada entrega é pensada dentro do contexto do negócio. Canais, processos e dados precisam conversar para que seja possível entender o que está funcionando."
  },
  {
    title: "Não prometemos o que não pode ser medido.",
    description: "Sempre que o projeto permite, definimos antes de começar como a entrega será acompanhada e quais indicadores ajudam a avaliar seu impacto."
  },
  {
    title: "Não tomamos decisões por opinião. Tomamos por dado.",
    description: "Rastreamento correto, atribuição honesta e análise de verdade. Relatório de vaidade não muda decisão."
  },
  {
    title: "Não buscamos apenas clique. Buscamos confiança.",
    description: "Performance sustentável nasce de marca forte. Reputação e resultado caminham juntos no nosso método."
  },
  {
    title: "Não separamos performance de reputação.",
    description: "Criativo que converte também constrói marca. Mensagem que vende também gera confiança. As duas coisas juntas."
  },
  {
    title: "Não iniciamos sem escopo, SLA e critérios claros.",
    description: "Escopo, entregáveis, responsabilidades e critérios de acompanhamento são alinhados antes da execução para reduzir ruído durante o projeto."
  },
  {
    title: "Não crescemos a qualquer custo.",
    description: "Crescimento sem olhar para margem e capacidade operacional pode virar um problema maior. Resultado precisa fazer sentido para o negócio, não apenas para o relatório."
  },
];

export default function WhyFigueira({ teamImage }) {
  return (
    <section className="py-20 lg:py-32 bg-foreground text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-display font-black text-3xl text-[#C4191F] leading-none">06</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono font-medium text-white/60 uppercase tracking-[0.2em]">
                  Os Diferenciais
                </span>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.05em] leading-[0.94] mb-10">
                Por que a Figueira é diferente de uma <span className="text-[#C4191F]">agência convencional</span>?
              </h2>
            </AnimatedSection>

            <div className="space-y-6">
              {differentials.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-200 cursor-default"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#C4191F] flex-shrink-0 mt-2" />
                    <div>
                      <h3 className="font-heading font-bold text-base mb-1">{item.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection delay={0.3} direction="left" className="hidden lg:block">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={teamImage}
                  alt="Equipe Figueira Marketing"
                  className="w-full h-auto rounded-2xl"
                  width={700}
                  height={500}
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}