import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico Completo",
    tagline: "Antes de agir, entender.",
    description: "Mapeamos canais, processos, métricas e stack tecnológico atual. Identificamos os pontos de maior vazamento e as oportunidades mais rápidas.",
  },
  {
    number: "02",
    title: "Definição de Fundamentos",
    tagline: "Raízes antes de galhos.",
    description: "Definimos ICP, proposta de valor, métricas-âncora, critérios de sucesso e a verdade única dos dados. Nada é construído em cima de areia.",
  },
  {
    number: "03",
    title: "Planejamento Estratégico",
    tagline: "O mapa antes do movimento.",
    description: "Construímos o plano de crescimento com prioridades claras, alocação de verba por canal, cronograma e responsabilidades definidas.",
  },
  {
    number: "04",
    title: "Infraestrutura e Rastreamento",
    tagline: "Sem dado correto, não há decisão certa.",
    description: "Configuramos tracking completo, integramos ferramentas, estruturamos o CRM e garantimos que cada ação é rastreável de ponta a ponta.",
  },
  {
    number: "05",
    title: "Execução e Ativação",
    tagline: "Velocidade com método.",
    description: "Ativamos campanhas, automações, páginas e processos de vendas com base no planejamento — sem improvisar, sem pular etapas.",
  },
  {
    number: "06",
    title: "Otimização Contínua",
    tagline: "O que não se mede, não se melhora.",
    description: "Ciclos semanais de análise e ajuste. O que está funcionando recebe mais investimento. O que não está, é corrigido ou descartado.",
  },
  {
    number: "07",
    title: "Escala e Autonomia",
    tagline: "O objetivo final é que você não precise de nós para funcionar.",
    description: "Transferimos o conhecimento, documentamos os processos e escalamos o que provou funcionar — construindo autonomia, não dependência.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-display font-black text-3xl text-[#C4191F] leading-none">10</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider border border-border">
              Processo
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Como a Figueira implementa o <span className="text-[#C4191F]">crescimento</span> — etapa por etapa
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sete etapas estruturadas que transformam a realidade atual da sua empresa em um sistema de crescimento previsível.
          </p>
        </AnimatedSection>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-8 left-8 right-8 h-0.5 bg-border" />
          <div className="grid grid-cols-7 gap-3 relative">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4 z-10">
                    <div className={`w-5 h-5 rounded-full border-2 bg-white ${i === 0 ? 'border-[#C4191F] bg-[#C4191F]' : 'border-border'}`}>
                      {i === 0 && <div className="absolute inset-0 rounded-full bg-[#C4191F] animate-ping opacity-20" />}
                    </div>
                  </div>
                  <div className={`font-mono text-xs font-bold mb-1 ${i === 0 ? 'text-[#C4191F]' : 'text-muted-foreground'}`}>
                    {step.number}
                  </div>
                  <h3 className="font-heading font-bold text-xs mb-1 leading-tight">{step.title}</h3>
                  <p className="text-[10px] text-[#C4191F] italic mb-2">{step.tagline}</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed px-1">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
          <div className="space-y-8">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.08}>
                <div className="flex gap-4">
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full border-2 bg-white ${i === 0 ? 'border-[#C4191F] bg-[#C4191F]' : 'border-border'}`}>
                      {i === 0 && <div className="absolute inset-0 rounded-full bg-[#C4191F] animate-ping opacity-20" />}
                    </div>
                  </div>
                  <div>
                    <div className={`font-mono text-xs font-bold mb-0.5 ${i === 0 ? 'text-[#C4191F]' : 'text-muted-foreground'}`}>
                      {step.number} · {step.title}
                    </div>
                    <p className="text-xs text-[#C4191F] italic mb-1">{step.tagline}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}