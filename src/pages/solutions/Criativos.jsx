import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features=[
 {title:"Conceito e campanha",description:"Criamos uma ideia central capaz de sustentar diferentes peças, formatos e argumentos sem transformar a campanha em uma coleção de artes desconectadas."},
 {title:"Copy para performance",description:"Desenvolvemos headlines, ofertas, ganchos, provas, objeções e CTAs alinhados ao estágio de consciência e ao contexto do canal."},
 {title:"Vídeo e motion",description:"Roteiros, estrutura de cenas, texto em tela, motion e variações para anúncios, reels e peças comerciais com ritmo pensado para retenção e clareza."},
 {title:"Peças estáticas",description:"Criativos para feed, stories, display e formatos de campanha com hierarquia visual, adaptação de formato e variações para teste."},
 {title:"Sistema de testes",description:"Organizamos hipóteses por ângulo, mensagem, formato e público para descobrir o que realmente está causando diferença, em vez de trocar tudo ao mesmo tempo."},
 {title:"Leitura criativa",description:"Conectamos performance com mensagem: quais ganchos seguram atenção, quais argumentos geram resposta e quais sinais indicam fadiga ou necessidade de nova abordagem."},
];

const angles=["Dor direta","Desejo","Prova","Comparação","Demonstração","Objeção","Oferta","História"];

export default function Criativos(){
 return <SolutionPageLayout
  badge="Criativos"
  title="Criativo bom não é enfeite."
  titleAccent="É argumento visual."
  description="A Figueira trata criação como parte da estratégia de aquisição e posicionamento. Conceito, copy, design, vídeo e motion precisam dizer algo específico para alguém específico e gerar aprendizado para a próxima rodada."
  heroImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&h=1000&fit=crop&auto=format"
  features={features}
 >
  <section className="py-24 lg:py-32 bg-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.75fr_1.25fr] gap-14 items-start">
     <div className="lg:sticky lg:top-28"><div className="font-mono text-[11px] tracking-[.2em] uppercase text-[#C4191F] mb-4">Ângulos criativos</div><h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-.045em] leading-[.94]">Uma oferta pode ser contada de muitos jeitos.</h2></div>
     <div className="grid grid-cols-2 gap-px bg-border border border-border">
      {angles.map((a,i)=><div key={a} className="bg-white p-7 min-h-[160px] flex flex-col justify-between"><span className="font-mono text-[10px] text-[#C4191F]">{String(i+1).padStart(2,"0")}</span><strong className="font-display font-black text-2xl">{a}</strong></div>)}
     </div>
    </AnimatedSection>
   </div>
  </section>
  <section className="py-24 lg:py-32 bg-[#C4191F] text-white">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection className="max-w-5xl"><div className="font-mono text-[11px] tracking-[.2em] uppercase text-white/60 mb-4">Design + performance</div><h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-.045em] leading-[.94] mb-7">A peça precisa parar o olho sem destruir a marca.</h2><p className="text-xl text-white/80 leading-relaxed max-w-3xl">Performance não precisa parecer barata, e branding não precisa ser mudo. Trabalhamos para construir uma linguagem visual reconhecível enquanto testamos mensagens e formatos que ajudam a campanha a vender.</p></AnimatedSection>
   </div>
  </section>
 </SolutionPageLayout>
}