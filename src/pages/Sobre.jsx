import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";

const values = [
  { title: "Resultado Acima de Tudo", description: "Toda decisão é orientada por métricas reais de negócio. Se não gera resultado, não faz parte da estratégia." },
  { title: "Transparência Radical", description: "Dados abertos, acesso total e comunicação clara. Você sempre sabe o que está acontecendo." },
  { title: "Pensamento Sistêmico", description: "Cada ação é uma engrenagem conectada. Marketing, vendas e tecnologia operando como um sistema único." },
  { title: "Melhoria Contínua", description: "Ciclos semanais de análise e otimização. Nunca paramos de buscar performance superior." },
];

export default function Sobre() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider mb-6">
                Sobre nós
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] mb-6">
                Construímos <span className="text-primary">sistemas de crescimento</span>, não campanhas
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A Figueira conecta estratégia, marketing, tecnologia e processo comercial para resolver gargalos reais de crescimento — sem tratar cada entrega como uma peça isolada.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What we do / who we serve / who builds it */}
      <section className="py-16 lg:py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight mb-3">O que a Figueira faz</h2>
            <p className="text-muted-foreground leading-relaxed">
              Atuamos em estratégia e growth, mídia paga, criativos, sites e landing pages, CRM, automações, dados, tecnologia e processo comercial. Cada projeto pode começar por uma necessidade específica, mas sempre enxergamos como aquela entrega se conecta ao restante da operação.
            </p>
          </div>
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight mb-3">Para quem é a Figueira</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trabalhamos com empresas que já têm um produto ou serviço real, precisam melhorar aquisição, presença digital, vendas ou operação e querem tomar decisões com mais clareza. O formato pode ser um projeto pontual ou um acompanhamento mais amplo, conforme o momento e a necessidade do negócio.
            </p>
          </div>
          <div>
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight mb-3">Quem constrói a Figueira</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Figueira Marketing é liderada por Guilherme França Júnior, com trajetória em vendas, marketing, tecnologia e operações comerciais. Conforme o projeto, reunimos as competências necessárias para executar estratégia, mídia, criação, desenvolvimento, automação e dados sem perder a visão do negócio como um todo.
            </p>
          </div>
        </div>
      </section>

      {/* Team photo */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/c363d9485_generated_8b943bad.png"
                alt="Equipe Figueira Marketing trabalhando em ambiente colaborativo moderno"
                className="w-full h-64 sm:h-96 lg:h-[480px] object-cover"
                width={1200}
                height={480}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-4">
              Nossos <span className="text-primary">valores</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Os princípios que guiam cada decisão, cada entrega e cada relacionamento.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-8 rounded-2xl border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="font-mono text-xs text-primary font-semibold mb-3">0{i + 1}</div>
                  <h3 className="font-heading font-bold text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-4">
              Quer entender onde podemos ajudar?
            </h2>
            <p className="text-white/60 mb-8">
              Conte o cenário atual da sua empresa. A primeira conversa é para entender o problema antes de propor qualquer solução.
            </p>
            <GreenCTA text="Falar com a Figueira" size="lg" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}