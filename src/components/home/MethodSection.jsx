import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

const layers = [
  {
    number: "01",
    name: "Raízes",
    description: "Antes de qualquer campanha, a Figueira realiza um diagnóstico completo: ICP (Perfil de Cliente Ideal) validado com dados, mapeamento do funil de vendas atual, análise de CAC e LTV, rastreamento configurado no GA4 e no CRM. Aqui nascem o posicionamento, as metas e a base de dados que sustentará todas as decisões. Sem raízes sólidas, qualquer crescimento é provisório."
  },
  {
    number: "02",
    name: "Tronco",
    description: "O tronco é a operação: CRM configurado, funil comercial estruturado, cadências de follow-up definidas, SLAs claros, rituais de revisão com OKRs e dashboards de marketing. O que mantém a empresa em movimento — sem depender de improviso. O processo é o que separa o crescimento acidental do crescimento previsível."
  },
  {
    number: "03",
    name: "Galhos",
    description: "Com a base estruturada, a Figueira opera os canais de crescimento: tráfego pago (Meta Ads e Google Ads), SEO, criativos de performance, landing pages de conversão, automação comercial, CRM e campanhas de retenção — com rastreamento real e otimização contínua. É aqui que o investimento começa a virar resultado mensurável."
  },
  {
    number: "04",
    name: "Frutos",
    description: "O resultado do sistema não é só faturamento. É CAC controlado, LTV crescente, NPS positivo, margem preservada e reputação construída. Crescer de forma que o negócio aguente — sem comprometer a qualidade. Lucro é fruto, não raiz."
  },
];

const indicators = [
  { label: "ROI mínimo 5:1", text: "Cada real investido em marketing deve gerar ao menos cinco de retorno" },
  { label: "CAC ≤ LTV / 3", text: "Aquisição sustentável com margem saudável no longo prazo" },
  { label: "Retenção ≥ 80%", text: "Clientes que permanecem porque veem valor — não porque dependem" },
  { label: "NPS > 60", text: "Satisfação que se transforma em indicação e reputação de mercado" },
];

export default function MethodSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            O Método Figueira: como transformamos marketing de performance em sistema de crescimento
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Da aquisição à retenção — cada camada da operação comercial conectada, mensurada e orientada a resultado previsível.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto mb-16">
          <p className="text-muted-foreground leading-relaxed text-center">
            Crescimento previsível não nasce de uma campanha de tráfego pago isolada. Nasce de uma estrutura integrada. Assim como uma árvore precisa de raízes antes de dar fruto, um negócio precisa de fundamentos antes de escalar.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {layers.map((layer, i) => (
            <AnimatedSection key={layer.number} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white border border-border rounded-2xl p-6 h-full hover:border-primary/20 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg border-2 border-[#C4191F] flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-black text-lg text-[#C4191F]">{layer.number}</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#C4191F] uppercase tracking-wider">
                    Camada {layer.number}
                  </div>
                </div>
                <h3 className="font-display font-black text-xl mb-3">{layer.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{layer.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {indicators.map((ind, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="bg-white border border-border rounded-xl p-6 text-center hover:border-primary/20 hover:shadow-sm transition-all duration-200"
              >
                <div className="font-display font-black text-2xl text-[#C4191F] mb-2">{ind.label}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{ind.text}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}