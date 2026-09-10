import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";
import { TrendingUp, ArrowRight } from "lucide-react";

const cases = [
  {
    industry: "E-commerce",
    title: "De R$200k para R$1.2M em faturamento mensal",
    description: "Reestruturação completa do funil de aquisição, implementação de CRM e otimização de mídia paga com ROAS de 14x.",
    metrics: [
      { label: "Crescimento", value: "+500%" },
      { label: "ROAS", value: "14x" },
      { label: "CAC", value: "-60%" },
    ],
  },
  {
    industry: "SaaS B2B",
    title: "0 a 500 leads qualificados por mês em 90 dias",
    description: "Estratégia de conteúdo + mídia paga + automações de nutrição que gerou pipeline previsível para o time comercial.",
    metrics: [
      { label: "Leads/mês", value: "500+" },
      { label: "MQL → SQL", value: "32%" },
      { label: "Ciclo de vendas", value: "-40%" },
    ],
  },
  {
    industry: "Serviços Profissionais",
    title: "Redução de 45% no CAC com operação integrada",
    description: "Implantação de CRM, automações e dashboards de BI que unificaram marketing e vendas em uma operação eficiente.",
    metrics: [
      { label: "CAC", value: "-45%" },
      { label: "LTV", value: "+120%" },
      { label: "Retenção", value: "94%" },
    ],
  },
  {
    industry: "Educação",
    title: "3x mais matrículas com o mesmo investimento",
    description: "Otimização de landing pages, criativos e segmentação de público que triplicou a conversão mantendo o mesmo budget.",
    metrics: [
      { label: "Conversão", value: "+200%" },
      { label: "CPL", value: "-65%" },
      { label: "ROI", value: "8.5x" },
    ],
  },
];

export default function Cases() {
  return (
    <div className="pt-24">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Cases de Sucesso
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[0.95] mb-6">
              Resultados que <span className="text-primary">falam por si</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Conheça alguns dos resultados que geramos para nossos clientes através 
              de operações integradas de crescimento.
            </p>
          </motion.div>

          <div className="space-y-8">
            {cases.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group p-8 lg:p-10 rounded-2xl border border-border bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-xs font-mono font-medium text-primary uppercase tracking-wider mb-4">
                        {item.industry}
                      </span>
                      <h3 className="font-display font-bold text-xl lg:text-2xl mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex gap-6 lg:justify-end">
                      {item.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="font-display font-black text-2xl lg:text-3xl text-primary">{metric.value}</div>
                          <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="text-center mt-16">
            <GreenCTA text="Quero resultados como esses" size="lg" />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}