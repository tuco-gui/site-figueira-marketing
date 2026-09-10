import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";

export default function GrowthMarketing() {
  return (
    <div className="pt-24">
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Recurso
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] mb-6">
              O que é <span className="text-primary">Growth Marketing</span> e como aplicar na sua empresa
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Growth marketing é a disciplina que unifica aquisição, ativação, retenção e receita em um único sistema orientado por dados. Entenda os princípios, as etapas e os resultados que essa abordagem gera para empresas que vendem no digital.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <AnimatedSection>
            <div className="prose-content space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Growth marketing é uma abordagem sistemática para crescimento que trata o marketing como um processo mensurável, iterativo e orientado por dados. Em vez de concentrar esforços apenas no topo do funil — atrair visitantes e gerar leads —, o growth marketing olha para a jornada completa do cliente, da primeira impressão à retenção e à expansão de receita. O objetivo não é gerar cliques, mas construir uma máquina de aquisição rentável e escalável.
              </p>
              <p>
                A diferença entre marketing tradicional e growth marketing está na mentalidade. O marketing tradicional costuma trabalhar com campanhas isoladas, metas de awareness e relatórios retrospectivos. O growth marketing opera com experimentos contínuos, hipóteses testáveis e ciclos curtos de aprendizado. Cada cano, criativo e página é tratado como uma variável que pode ser otimizada com base em evidência, não em opinião.
              </p>
              <p>
                Para aplicar growth marketing, uma empresa precisa de quatro elementos conectados. O primeiro é uma estratégia clara, que define segmento, proposta de valor e metas de receita. O segundo é uma operação de aquisição eficiente, com mídia paga, criativos e páginas de conversão alinhadas a um custo de aquisição sustentável. O terceiro é um processo comercial estruturado, com CRM, automações e acompanhamento de lead até o fechamento. O quarto é uma camada de dados e BI que transforma tudo isso em um dashboard de decisão, onde ROI, CAC e LTV orientam cada movimento.
              </p>
              <p>
                Empresas que adotam growth marketing corretamente reduzem o custo de aquisição, aumentam a previsibilidade de receita e ganham capacidade de escalar sem perder rentabilidade. O Método Figueira, desenvolvido pela Figueira Marketing, organiza esses elementos em quatro camadas — raízes, tronco, galhos e frutos — que garantem que cada decisão de marketing esteja conectada a um resultado de negócio mensurável. O crescimento deixa de ser uma promessa e passa a ser um sistema.
              </p>
              <p>
                Se a sua empresa já tem um produto validado e faturamento recorrente, o próximo passo é diagnosticar onde está o maior gargalo — aquisição, conversão, retenção ou dados. Um diagnóstico bem-feito responde essa pergunta e define por onde começar a construir o sistema de crescimento.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="pt-8">
            <GreenCTA text="Agendar diagnóstico gratuito" size="lg" />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}