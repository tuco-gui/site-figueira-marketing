import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features=[
 {title:"Plano de mensuração",description:"Definimos quais perguntas o dado precisa responder e quais eventos, propriedades, fontes e responsabilidades são necessárias para isso."},
 {title:"GA4 e eventos",description:"Configuramos ou revisamos analytics, eventos e conversões para acompanhar comportamento e ações importantes sem transformar o projeto em uma coleção de tags sem propósito."},
 {title:"UTMs e origem",description:"Padronizamos nomenclaturas e parâmetros para reduzir a bagunça na leitura de campanha, canal, criativo e origem do lead."},
 {title:"Integração de fontes",description:"Conectamos mídia, site, CRM, financeiro e outras fontes quando necessário para aproximar aquisição, oportunidade, venda e receita."},
 {title:"Dashboards",description:"Construímos painéis com hierarquia de informação para gestão, marketing ou comercial, evitando dezenas de gráficos que não mudam nenhuma decisão."},
 {title:"Governança de métricas",description:"Documentamos definições, fontes e regras para que pessoas diferentes não usem o mesmo nome para números calculados de formas diferentes."},
];

export default function DadosBI(){
 return <SolutionPageLayout
  badge="Dados & BI"
  title="Dashboard não resolve dado ruim."
  titleAccent="Primeiro vem a verdade."
  description="A Figueira organiza tracking, fontes, definições e visualização para que marketing e vendas possam trabalhar sobre a mesma realidade. Menos relatório de vaidade; mais informação que muda decisão."
  heroImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=1000&fit=crop&auto=format"
  features={features}
 >
  <section className="py-24 lg:py-32 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-14"><div><div className="font-mono text-[11px] tracking-[.2em] uppercase text-[#C4191F] mb-4">Da mídia à receita</div><h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-.045em] leading-[.94]">O clique é só o começo da história.</h2></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">{["Impressão para visita","Visita para lead","Lead para oportunidade","Oportunidade para venda","Venda para receita","Receita para retorno"].map((x,i)=><div key={x} className="bg-white p-7 min-h-[150px] flex flex-col justify-between"><span className="font-mono text-xs text-[#C4191F]">{String(i+1).padStart(2,"0")}</span><strong className="font-display font-black text-xl">{x}</strong></div>)}</div></AnimatedSection></div></section>
  <section className="py-24 lg:py-32 bg-[#111111] text-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><AnimatedSection className="max-w-5xl"><div className="font-mono text-[11px] tracking-[.2em] uppercase text-[#C4191F] mb-4">BI que serve para decidir</div><h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-.045em] leading-[.94] mb-7">Se o painel não muda uma conversa, uma prioridade ou um investimento, ele virou decoração.</h2><p className="text-lg text-white/60 leading-relaxed max-w-3xl">A visualização precisa mostrar contexto: meta, tendência, comparação, origem do dado e ação possível. O melhor dashboard nem sempre é o que tem mais gráficos. É o que reduz o tempo entre perceber um problema e decidir o que fazer.</p></AnimatedSection></div></section>
 </SolutionPageLayout>
}