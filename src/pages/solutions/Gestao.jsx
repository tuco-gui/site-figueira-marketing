import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features=[
 {title:"Planejamento operacional",description:"Transformamos estratégia em agenda de execução: prioridades, responsáveis, dependências, prazos, orçamento e critérios de acompanhamento."},
 {title:"Gestão de demandas",description:"Organizamos entrada, triagem e prioridade de demandas para reduzir urgência artificial, retrabalho e tarefas que ocupam o time sem mover resultado."},
 {title:"Rituais de decisão",description:"Estruturamos reuniões, pautas, indicadores e registros para que o time saia com decisão, responsável e próximo passo — não apenas com mais uma conversa."},
 {title:"Integração marketing e vendas",description:"Marketing não termina no lead. Aproximamos mídia, conteúdo, atendimento e comercial para que feedback de qualidade e conversão volte para quem decide aquisição."},
 {title:"Gestão por indicadores",description:"Escolhemos poucos indicadores úteis por frente e criamos uma rotina de leitura que separa sinal de ruído e ajuda a priorizar correções."},
 {title:"Modelo de operação",description:"Podemos atuar junto ao time interno, coordenar fornecedores, operar frentes específicas ou montar uma camada de gestão compartilhada conforme a realidade da empresa."},
];

export default function Gestao(){
 return <SolutionPageLayout
  badge="Gestão de Marketing"
  title="Estratégia sem gestão"
  titleAccent="vira intenção"
  description="A Figueira organiza a operação para que marketing, vendas e tecnologia executem com prioridade, cadência e responsabilidade claras. Gestão é o que transforma boas ideias em movimento consistente."
  heroImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&h=1000&fit=crop&auto=format"
  features={features}
 >
  <section className="py-24 lg:py-32 bg-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection className="max-w-5xl mb-12">
     <div className="font-mono text-[11px] tracking-[.2em] uppercase text-[#C4191F] mb-4">Sistema de gestão</div>
     <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-.045em] leading-[.94] mb-6">Menos reunião sobre trabalho. Mais trabalho saindo da reunião.</h2>
     <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">A operação precisa responder quatro perguntas simples: o que é prioridade agora, quem é responsável, quando revisamos e qual dado muda a próxima decisão. Quando isso não está claro, tudo parece urgente e ninguém enxerga o que realmente está parado.</p>
    </AnimatedSection>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
     {[
      ["01","PRIORIDADE","O que entra agora e o que fica fora."],
      ["02","RESPONSÁVEL","Uma pessoa dona do próximo passo."],
      ["03","CADÊNCIA","Quando executar, revisar e decidir."],
      ["04","EVIDÊNCIA","Qual dado confirma avanço ou pede correção."],
     ].map(([n,t,d])=><div key={n} className="bg-white p-8 min-h-[220px]"><span className="font-mono text-xs text-[#C4191F]">{n}</span><h3 className="font-display font-black text-xl mt-10 mb-3">{t}</h3><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
    </div>
   </div>
  </section>
  <section className="py-24 lg:py-32 bg-[#111111] text-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
     <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-.045em] leading-[.95]">A gestão pode coordenar time interno, Figueira e fornecedores no mesmo desenho.</h2>
     <div className="space-y-6 text-lg text-white/60 leading-relaxed">
      <p>Não precisamos substituir toda a estrutura para melhorar a operação. Em muitos projetos, nosso papel é organizar prioridades, integrar especialistas e criar o sistema de acompanhamento que faltava.</p>
      <p>Isso permite que mídia, conteúdo, design, site, CRM, automação e comercial deixem de funcionar como departamentos independentes e passem a responder ao mesmo objetivo.</p>
     </div>
    </AnimatedSection>
   </div>
  </section>
 </SolutionPageLayout>
}