import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features=[
 {title:"Sites institucionais",description:"Estrutura completa para apresentar empresa, soluções, diferenciais, prova, processo e contato com uma experiência coerente em desktop e mobile."},
 {title:"Landing pages",description:"Páginas focadas em uma oferta ou campanha, com mensagem, hierarquia e fluxo de conversão construídos para reduzir distração e facilitar a decisão."},
 {title:"Redesign e evolução",description:"Reestruturamos sites existentes quando a tecnologia ainda serve, mas a linguagem, arquitetura, mobile, velocidade ou conversão ficaram para trás."},
 {title:"Copy e arquitetura",description:"Planejamos a ordem das informações e escrevemos a página pensando na dúvida seguinte do visitante, não em preencher blocos genéricos de template."},
 {title:"Motion e interação",description:"Usamos parallax, microinterações, transições e movimento com função: reforçar hierarquia, criar ritmo e conduzir a leitura sem prejudicar performance ou acessibilidade."},
 {title:"Integração e mensuração",description:"Formulários, WhatsApp, CRM, analytics, pixels, eventos e automações entram na arquitetura para que a página faça parte da operação comercial."},
];

export default function PaginasConversao(){
 return <SolutionPageLayout
  badge="Sites & Landing Pages"
  title="Seu site precisa parecer com"
  titleAccent="a empresa que você quer vender"
  description="Criamos experiências digitais com estratégia, copy, direção visual, desenvolvimento, motion e integração. Não é uma página montada para preencher espaço: é uma peça comercial que precisa transmitir confiança e conduzir ação."
  heroImage="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1400&h=1000&fit=crop&auto=format"
  features={features}
 >
  <section className="py-24 lg:py-32 bg-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection className="max-w-5xl mb-14"><div className="font-mono text-[11px] tracking-[.2em] uppercase text-[#C4191F] mb-4">Experiência</div><h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-.045em] leading-[.94] mb-6">Movimento não é efeito por efeito. É ritmo de leitura.</h2><p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">Parallax, entradas por scroll, mudanças de escala, sticky sections, transições e microinterações entram quando ajudam a destacar uma ideia, conectar uma seção à próxima ou tornar a navegação memorável. No mobile, reduzimos o que atrapalha velocidade e toque.</p></AnimatedSection>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
     {[
      ["01","MENSAGEM","O visitante entende rapidamente o que você faz, para quem e por que isso importa."],
      ["02","EXPERIÊNCIA","Layout, tipografia, movimento e interação criam uma linguagem própria — não cara de template."],
      ["03","CONVERSÃO","Cada página conduz para um próximo passo mensurável: contato, WhatsApp, formulário, agendamento ou compra."],
     ].map(([n,t,d])=><div key={n} className="bg-white p-8 lg:p-10 min-h-[260px]"><span className="font-mono text-xs text-[#C4191F]">{n}</span><h3 className="font-display font-black text-2xl mt-12 mb-4">{t}</h3><p className="text-muted-foreground leading-relaxed">{d}</p></div>)}
    </div>
   </div>
  </section>
  <section className="py-24 lg:py-32 bg-[#111111] text-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-14"><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-.045em] leading-[.95]">A página não termina no botão.</h2><div className="space-y-5 text-lg text-white/60 leading-relaxed"><p>Depois do clique existe uma operação: o lead precisa chegar com origem, contexto e dados corretos; alguém ou algum agente precisa responder; o CRM precisa registrar; e o resultado precisa voltar para marketing.</p><p>Por isso sites e landing pages da Figueira podem ser conectados ao Harvest, CRM, WhatsApp, automações e analytics conforme a arquitetura do projeto.</p></div></AnimatedSection>
   </div>
  </section>
 </SolutionPageLayout>
}