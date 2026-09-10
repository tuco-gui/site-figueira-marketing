import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

const layers = [
  {
    number: "01",
    label: "CAMADA 01",
    name: "Raízes",
    description: "Antes de qualquer campanha, a Figueira realiza um diagnóstico completo: ICP (Perfil de Cliente Ideal) validado com dados, mapeamento do funil de vendas atual, análise de CAC e LTV, rastreamento configurado no GA4 e no CRM. Aqui nascem o posicionamento, as metas e a base de dados que sustentará todas as decisões. Sem raízes sólidas, qualquer crescimento é provisório."
  },
  {
    number: "02",
    label: "CAMADA 02",
    name: "Tronco",
    description: "O tronco é a operação: processo comercial, CRM, cadências, responsabilidades e indicadores definidos de acordo com a realidade da empresa. É o que transforma ações isoladas em um processo que pode ser acompanhado e melhorado."
  },
  {
    number: "03",
    label: "CAMADA 03",
    name: "Galhos",
    description: "Com a base estruturada, a Figueira opera os canais de crescimento: tráfego pago (Meta Ads e Google Ads), SEO, criativos de performance, landing pages de conversão, automação comercial, CRM e campanhas de retenção — com rastreamento real e otimização contínua. É aqui que o investimento começa a virar resultado mensurável."
  },
  {
    number: "04",
    label: "CAMADA 04",
    name: "Frutos",
    description: "Os frutos são os resultados que importam para cada negócio: mais oportunidades qualificadas, melhor conversão, eficiência de aquisição, retenção, margem e clareza para decidir onde investir."
  },
];

const indicators = [
  { value: "CAC", label: "Eficiência de aquisição" },
  { value: "CVR", label: "Conversão por etapa" },
  { value: "LTV", label: "Valor e retenção" },
  { value: "ROI", label: "Retorno sobre investimento" },
];

export default function ShowcaseSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-display font-black text-3xl text-[#C4191F] leading-none">08</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider border border-border">
              O Método Figueira
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Um sistema de crescimento construído com <span className="text-[#C4191F]">raízes, processo e propósito</span>.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Quatro camadas para enxergar estratégia, operação, canais e resultado como partes do mesmo negócio.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-0">
          {layers.map((layer, i) => (
            <AnimatedSection key={layer.number} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white border border-border rounded-2xl p-6 h-full hover:border-primary/20 hover:shadow-md transition-all duration-200"
              >
                <div className="font-mono text-xs font-bold text-[#C4191F] uppercase tracking-wider mb-3">
                  {layer.label}
                </div>
                <h3 className="font-display font-black text-xl mb-3">{layer.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{layer.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Metrics bar */}
        <AnimatedSection delay={0.3}>
          <div className="mt-8 bg-[#111111] rounded-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {indicators.map((ind, i) => (
                <div key={i} className="px-6 py-8 text-center">
                  <div className="font-display font-black text-2xl lg:text-3xl text-[#C4191F] mb-1">{ind.value}</div>
                  <p className="text-xs text-white/50 leading-relaxed">{ind.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}