import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features=[
 {title:"Onboarding",description:"Desenhamos os primeiros passos do cliente para reduzir ansiedade, alinhar expectativa, coletar informações e acelerar a percepção de valor."},
 {title:"Acompanhamento e cadência",description:"Criamos rotinas de contato, checkpoints, responsabilidades e sinais de risco para que a relação não dependa apenas de alguém lembrar de chamar."},
 {title:"Pesquisas e feedback",description:"NPS, CSAT, entrevistas e feedback estruturado ajudam a separar percepção de fato e transformam experiência em informação utilizável."},
 {title:"Reengajamento",description:"Mapeamos clientes inativos, contas em risco e oportunidades de retomada para construir cadências e abordagens adequadas a cada contexto."},
 {title:"Indicação e expansão",description:"Estruturamos momentos e regras para pedir indicação, apresentar novas soluções e identificar oportunidades sem transformar pós-venda em pressão comercial."},
 {title:"Indicadores de retenção",description:"Acompanhamos churn, recorrência, expansão, tempo de permanência e sinais de saúde conforme o modelo de negócio."},
];

export default function Retencao(){
 return <SolutionPageLayout
  badge="Retenção & Sucesso"
  title="A venda não termina"
  titleAccent="quando o contrato começa"
  description="A Figueira estrutura a experiência depois da aquisição para reduzir perda silenciosa, melhorar relacionamento e criar uma operação capaz de enxergar risco, satisfação, continuidade e oportunidade de expansão."
  heroImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&h=1000&fit=crop&auto=format"
  features={features}
 >
  <section className="py-24 lg:py-32 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><AnimatedSection className="max-w-5xl mb-14"><div className="font-mono text-[11px] tracking-[.2em] uppercase text-[#C4191F] mb-4">Ciclo do cliente</div><h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-.045em] leading-[.94]">Retenção começa antes do cliente pensar em sair.</h2></AnimatedSection><div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-border border border-border">{[["01","ENTRAR"],["02","ATIVAR"],["03","ACOMPANHAR"],["04","PERCEBER RISCO"],["05","EXPANDIR"]].map(([n,t])=><div key={n} className="bg-white p-7 min-h-[180px]"><span className="font-mono text-xs text-[#C4191F]">{n}</span><h3 className="font-display font-black text-xl mt-14">{t}</h3></div>)}</div></div></section>
  <section className="py-24 lg:py-32 bg-[#C4191F] text-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-14"><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-.045em] leading-[.95]">Customer success não é mandar “está tudo bem?” de vez em quando.</h2><div className="space-y-5 text-lg text-white/80 leading-relaxed"><p>Uma operação de retenção precisa saber o que o cliente esperava, o que já recebeu, onde existe risco, qual é o próximo marco e quando uma intervenção humana faz sentido.</p><p>Automação e IA podem ajudar a coletar sinais, lembrar tarefas e organizar informação, mas relacionamento, negociação e decisões sensíveis continuam tendo dono humano.</p></div></AnimatedSection></div></section>
 </SolutionPageLayout>
}