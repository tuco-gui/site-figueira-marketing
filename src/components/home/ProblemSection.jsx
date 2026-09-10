import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

const painCards = [
  {
    title: "Marketing sem visão do todo",
    description: "Campanhas, conteúdo, site e vendas funcionam como peças separadas — e ninguém enxerga claramente onde o resultado se perde."
  },
  {
    title: "Leads sem processo comercial",
    description: "O contato chega, mas não existe uma rotina clara de qualificação, acompanhamento e follow-up até a decisão."
  },
  {
    title: "Site que não ajuda a vender",
    description: "A empresa entrega bem, mas a presença digital não transmite a mesma confiança nem conduz o visitante para o próximo passo."
  },
  {
    title: "Dados espalhados",
    description: "Mídia, analytics, CRM e financeiro contam histórias diferentes. Sem uma visão única, a decisão vira opinião."
  },
  {
    title: "Automação sem estratégia",
    description: "Ferramentas existem, mas os processos continuam manuais, frágeis ou desconectados da operação comercial."
  },
  {
    title: "Crescimento difícil de repetir",
    description: "Alguns meses funcionam, outros não. Sem método e processo, fica difícil entender o que repetir, corrigir ou escalar."
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-display font-black text-3xl text-[#C4191F] leading-none">01</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider border border-border">
              O Problema
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Marketing não deveria ser um conjunto de <span className="text-[#C4191F]">ações soltas</span>.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            O problema aparece quando mídia, site, atendimento, CRM, automações e dados trabalham separados. A Figueira entra justamente para conectar essas partes.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto mb-12">
          <p className="text-muted-foreground leading-relaxed">
            Às vezes o gargalo está na aquisição. Em outras, no site, no atendimento, no follow-up ou na falta de dados confiáveis. Nosso trabalho começa entendendo onde a operação está perdendo oportunidade e o que realmente precisa ser corrigido primeiro.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {painCards.map((card, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white border border-border rounded-xl p-5 h-full hover:border-primary/20 hover:shadow-sm transition-all duration-200"
              >
                <span className="text-[#C4191F] font-bold text-lg">•</span>
                <h3 className="font-heading font-bold text-sm mt-2 mb-2">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-foreground text-white rounded-2xl py-8 px-8 text-center">
            <p className="text-lg font-heading font-bold">
              Antes de adicionar mais uma ferramenta ou campanha, precisamos descobrir onde está o gargalo.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}