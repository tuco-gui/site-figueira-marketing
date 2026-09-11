import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "A Figueira trabalha só com tráfego pago?",
    answer: "Não. Tráfego pode ser uma parte da solução, mas nosso trabalho também envolve estratégia, sites e landing pages, CRM, automações, dados, tecnologia e processo comercial. A combinação depende do gargalo de cada empresa."
  },
  {
    question: "Vocês fazem sites e landing pages?",
    answer: "Sim. Criamos e modernizamos sites institucionais, landing pages e páginas comerciais com foco em clareza, experiência mobile, conversão e integração com o restante da operação."
  },
  {
    question: "A Figueira implanta CRM e automações?",
    answer: "Sim. Estruturamos funis, etapas, cadências, integrações e automações de marketing e vendas de acordo com o processo real da empresa e com as ferramentas mais adequadas ao projeto."
  },
  {
    question: "Preciso contratar todas as soluções?",
    answer: "Não. Podemos atuar em um projeto específico ou em uma operação mais integrada. O ponto de partida é entender o que está travando o resultado agora e priorizar o que faz sentido."
  },
  {
    question: "Em quanto tempo um projeto começa a gerar resultado?",
    answer: "Depende do ponto de partida, do tipo de projeto e do ciclo de venda da empresa. Antes de começar, alinhamos escopo, prioridades e como o resultado será acompanhado; sem prometer prazo ou número que não dependa apenas da nossa execução."
  },
  {
    question: "Como vocês acompanham os resultados?",
    answer: "Definimos indicadores adequados ao projeto e conectamos, quando necessário, mídia, analytics, CRM e dados comerciais. O objetivo é permitir decisões baseadas no que realmente está acontecendo na operação."
  },
  {
    question: "Vocês trabalham com empresas de qualquer tamanho?",
    answer: "Atendemos negócios em diferentes estágios. O mais importante é existir uma necessidade real que possamos resolver com clareza de escopo, acesso aos dados necessários e compromisso com a execução."
  },
  {
    question: "Como começa?",
    answer: "Com uma conversa sobre o negócio e o cenário atual. A partir daí identificamos o principal gargalo e definimos se faz sentido avançar com diagnóstico, projeto pontual ou acompanhamento contínuo."
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-[0.2em] border border-border mb-4">
            FAQ
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95] mb-4">
            Perguntas <span className="text-primary">frequentes</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-6 data-[state=open]:border-primary/20 data-[state=open]:shadow-sm transition-all duration-200"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-sm sm:text-base hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}