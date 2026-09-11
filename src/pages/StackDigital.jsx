import React from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";

const partners = [
  ["Kommo","/stack-digital/kommo","/partners/kommo-partner-light.png"],
  ["Zoho","/stack-digital/zoho","/partners/zoho-partner.png"],
  ["Pipefy","/stack-digital/pipefy",null],
  ["Hostinger","/stack-digital/hostinger","/partners/hostinger-partner-light.png"],
];

export default function StackDigital(){
  return <div className="bg-white">
    <section className="pt-28 lg:pt-32 pb-16 lg:pb-20 bg-[#F7F6F2] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C4191F] mb-5">Stack Digital</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-10 lg:gap-16 items-end">
          <h1 className="font-display font-black text-[clamp(2.8rem,5vw,5.2rem)] tracking-[-0.055em] leading-[0.9]">Plataforma é meio. <span className="text-[#C4191F]">A integração é o que vira operação.</span></h1>
          <div><p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-7">A Figueira combina plataformas líderes, parcerias estratégicas e tecnologia própria para conectar aquisição, vendas, atendimento, automação, dados e infraestrutura.</p><GreenCTA text="Conversar sobre a sua stack" size="lg" /></div>
        </div>
      </div>
    </section>

    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12"><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Parcerias em destaque</div><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95] max-w-4xl">Cada ecossistema tem um papel diferente dentro da operação.</h2></AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {partners.map(([name,path,logo])=><Link key={name} to={path} className="bg-white p-8 min-h-[230px] hover:bg-[#F7F6F2] transition-colors flex flex-col justify-between">
            <div className="h-16 flex items-center">{logo?<img src={logo} alt={name} className="max-h-12 max-w-[210px] object-contain object-left" />:<img src="https://cdn.simpleicons.org/pipefy/111111" alt="Pipefy" className="h-10 max-w-[180px]" />}</div>
            <div><h3 className="font-display font-black text-3xl mb-3">{name}</h3><p className="text-muted-foreground">Implantação, integração, automação e evolução conforme o processo da empresa.</p></div>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="py-20 lg:py-24 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Tecnologia própria</div><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95] max-w-4xl mb-10">Harvest e Kesher completam o que as plataformas de mercado não resolvem sozinhas.</h2><div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10"><div className="bg-[#111111] p-8"><div className="font-display font-black text-3xl mb-4">Harvest<span className="text-[#C4191F]">.</span></div><p className="text-white/55">Operação comercial, leads, histórico, campanhas e integrações.</p></div><div className="bg-[#111111] p-8"><div className="font-display font-black text-3xl mb-4">Kesher<span className="text-[#C4191F]">.</span></div><p className="text-white/55">Tecnologia própria para processos, agentes e fluxos especializados.</p></div></div></AnimatedSection>
      </div>
    </section>
  </div>
}