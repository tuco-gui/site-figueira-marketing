import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features = [
  { title: "Diagnóstico do negócio", description: "Entendemos oferta, público, canais, processo comercial, dados, operação e restrições antes de propor qualquer plano. Estratégia sem contexto vira apresentação." },
  { title: "Posicionamento e proposta de valor", description: "Revisamos como a empresa se apresenta, o que realmente diferencia a oferta, quais problemas resolve e quais argumentos ajudam o mercado a entender por que escolher você." },
  { title: "ICP e segmentação", description: "Organizamos hipóteses de público ideal usando histórico, dados disponíveis, ticket, margem, ciclo de venda, recorrência e capacidade de entrega, não apenas uma persona inventada." },
  { title: "Funil e jornada", description: "Mapeamos da primeira atenção à venda e ao pós-venda, identificando onde oportunidade se perde e quais etapas precisam de canal, conteúdo, automação ou processo." },
  { title: "Prioridades e experimentos", description: "Transformamos problemas em hipóteses testáveis, ordenando iniciativas por impacto, esforço, velocidade de aprendizado e dependências reais." },
  { title: "Métricas e governança", description: "Definimos o que acompanhar, com que frequência, quem decide e quais sinais indicam manter, corrigir ou interromper uma iniciativa." },
];

const questions = [
  "O que estamos tentando crescer: receita, margem, pipeline, recorrência, ticket ou retenção?",
  "Qual oferta merece investimento agora e qual ainda precisa ser ajustada?",
  "Quem compra melhor, fecha mais rápido e permanece mais tempo?",
  "Em qual ponto da jornada estamos perdendo mais oportunidade?",
  "Quais dados são confiáveis o suficiente para decidir?",
  "O que precisa acontecer nos próximos 30, 60 e 90 dias? O que pode esperar?",
];

export default function EstrategiaGrowth() {
  return (
    <SolutionPageLayout
      badge="Estratégia & Growth"
      title="Growth não é fazer mais."
      titleAccent="É escolher melhor."
      description="A Figueira transforma um cenário cheio de ações, ferramentas e opiniões em prioridades claras. Estratégia serve para decidir onde concentrar energia, orçamento e capacidade operacional, além do que não fazer agora."
      heroImage="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=1000&fit=crop&auto=format"
      features={features}
    >
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C4191F] mb-4">Perguntas antes do plano</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.94]">
                Estratégia começa pela pergunta certa.
              </h2>
            </div>
            <div className="border-t border-border">
              {questions.map((q, i) => (
                <div key={q} className="grid grid-cols-[42px_1fr] gap-5 py-7 border-b border-border">
                  <span className="font-mono text-xs text-[#C4191F]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-display font-bold text-xl sm:text-2xl leading-snug">{q}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-5xl mb-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C4191F] mb-4">Growth na prática</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.94] mb-6">
              Aquisição é só uma das alavancas.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
              Dependendo do negócio, o maior ganho pode estar em melhorar oferta, aumentar conversão da página, responder mais rápido, recuperar follow-ups, reduzir churn, automatizar uma etapa ou organizar dados. Growth é encontrar a alavanca com maior potencial e criar um ciclo de aprendizado em volta dela.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {["Aquisição","Conversão","Vendas","Retenção","Ticket","Recorrência","Eficiência","Produto"].map((item,i)=>(
              <div key={item} className="bg-[#111111] p-6 sm:p-8 min-h-[150px] flex flex-col justify-between">
                <span className="font-mono text-[10px] text-[#C4191F]">{String(i+1).padStart(2,"0")}</span>
                <strong className="font-display font-black text-xl">{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SolutionPageLayout>
  );
}