import React from "react";
import { Link, useLocation } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";

const partners = {
  kommo: {
    name: "Kommo",
    eyebrow: "Parceiro Kommo",
    logo: "/partners/kommo-partner-light.png",
    title: "CRM conversacional para vender com",
    accent: "mais contexto e velocidade",
    description: "A Figueira implementa Kommo dentro do processo comercial, conectando canais, pipeline, automações e atendimento.",
    intro: "A parceria entra na operação. Desenhamos o processo, configuramos o CRM, conectamos integrações e acompanhamos a evolução comercial.",
    capabilities: ["Pipeline e etapas", "Canais e histórico", "Automações comerciais", "Integrações com site e sistemas"],
    cases: ["Qualificação e distribuição de leads", "Follow-up organizado por etapa", "Atendimento com histórico do contato", "Integração entre campanhas e CRM", "Agentes conectados ao contexto comercial", "Gestão de oportunidades e perdas"],
  },
  zoho: {
    name: "Zoho",
    eyebrow: "Parceiro Zoho",
    logo: "/partners/zoho-partner.png",
    title: "Um ecossistema para integrar",
    accent: "vendas, marketing e operação",
    description: "A Figueira usa o ecossistema Zoho para construir processos conectados entre CRM, atendimento, marketing, dados e rotinas internas.",
    intro: "A Zoho vai além do CRM. O valor aparece quando os módulos certos trabalham juntos e a empresa deixa de repetir dados e tarefas entre sistemas.",
    capabilities: ["CRM e vendas", "Marketing e jornadas", "Atendimento e suporte", "Analytics e operação"],
    cases: ["CRM conectado ao processo comercial", "Automação entre marketing e vendas", "Atendimento com histórico unificado", "Dashboards para gestão", "Rotinas internas conectadas", "Integrações com sistemas externos"],
  },
  pipefy: {
    name: "Pipefy",
    eyebrow: "Ecossistema Pipefy",
    logo: null,
    title: "Processos que saem da planilha e",
    accent: "viram fluxo operacional",
    description: "A Figueira aplica Pipefy em workflows, aprovações, operações e automações quando o processo precisa de regra, visibilidade e continuidade.",
    intro: "A implantação começa pelo processo. Mapeamos etapas, responsáveis, regras, dados e exceções antes de configurar o fluxo.",
    capabilities: ["Mapeamento de processos", "Workflows e aprovações", "Automações e integrações", "Operação e evolução contínua"],
    cases: ["Onboarding de clientes", "Aprovações internas", "Solicitações e filas operacionais", "Fluxos financeiros", "Processos comerciais", "Rotinas com IA e automação"],
  },
  hostinger: {
    name: "Hostinger",
    eyebrow: "Parceiro Hostinger",
    logo: "/partners/hostinger-partner-light.png",
    title: "Infraestrutura para colocar",
    accent: "sites e sistemas de pé",
    description: "A Figueira usa o ecossistema Hostinger em projetos que precisam de VPS, hospedagem, domínio, e-mail e infraestrutura para aplicações.",
    intro: "A parceria entra quando o projeto precisa de uma base técnica estável e administrável, desde um site institucional até serviços em containers e aplicações próprias.",
    capabilities: ["VPS e infraestrutura", "Hospedagem e domínio", "E-mail profissional", "Sites, WordPress e aplicações"],
    cases: ["Sites institucionais e landing pages", "WordPress e WooCommerce", "Aplicações próprias em VPS", "Containers e bancos de dados", "Ambientes de automação", "E-mail e domínio do negócio"],
  },
};

function PartnerDetail({ data, slug }) {
  return <div className="bg-white">
    <section className="pt-28 lg:pt-32 pb-16 lg:pb-20 bg-[#F7F6F2] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/stack-digital" className="text-sm text-muted-foreground hover:text-foreground">Stack Digital</Link>
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-16 items-center mt-10">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-5">{data.eyebrow}</div>
            <h1 className="font-display font-black text-[clamp(2.7rem,5vw,5.15rem)] tracking-[-0.055em] leading-[0.9] mb-7">{data.title} <span className="text-[#C4191F]">{data.accent}</span></h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">{data.description}</p>
            <GreenCTA text="Falar sobre esta solução" size="lg" />
          </div>
          <div className="bg-white border border-border rounded-[26px] min-h-[320px] flex items-center justify-center p-10">
            {data.logo ? <img src={data.logo} alt={data.name} className="max-h-28 max-w-[78%] object-contain" /> : <img src="https://cdn.simpleicons.org/pipefy/111111" alt="Pipefy" className="h-20 max-w-[260px]" />}
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.82fr_1.18fr] gap-10 lg:gap-16">
          <div><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Parceria aplicada</div><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">Ferramenta boa precisa entrar no processo certo.</h2></div>
          <div><p className="text-lg text-muted-foreground leading-relaxed mb-10">{data.intro}</p><div className="border-t border-border">{data.capabilities.map((item,i)=><div key={item} className="grid grid-cols-[42px_1fr] gap-5 py-6 border-b border-border"><span className="font-mono text-[10px] text-[#C4191F]">{String(i+1).padStart(2,"0")}</span><h3 className="font-display font-black text-xl">{item}</h3></div>)}</div></div>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-20 lg:py-28 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 max-w-4xl"><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Onde aplicamos</div><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">A parceria precisa aparecer no trabalho entregue.</h2></AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">{data.cases.map((item,i)=><div key={item} className="bg-[#111111] p-7 min-h-[180px]"><div className="font-mono text-[10px] text-[#C4191F] mb-10">{String(i+1).padStart(2,"0")}</div><p className="text-white/75 leading-relaxed">{item}</p></div>)}</div>
      </div>
    </section>

    <section className="py-20 lg:py-24 bg-[#C4191F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end"><div><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 mb-4">Próximo passo</div><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">Vamos entender se {data.name} é a ferramenta certa para o seu processo.</h2></div><GreenCTA text="Falar com a Figueira" size="lg" /></AnimatedSection>
      </div>
    </section>
  </div>
}

export default function StackDigital(){
  const pathname = useLocation().pathname;
  const slug = pathname.split("/").filter(Boolean)[1];
  if (slug && partners[slug]) return <PartnerDetail data={partners[slug]} slug={slug} />;

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
    <section className="py-20 lg:py-28"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><AnimatedSection className="mb-12"><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Parcerias em destaque</div><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95] max-w-4xl">Cada ecossistema tem um papel diferente dentro da operação.</h2></AnimatedSection><div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">{Object.entries(partners).map(([key,p])=><Link key={key} to={`/stack-digital/${key}`} className="bg-white p-8 min-h-[230px] hover:bg-[#F7F6F2] transition-colors flex flex-col justify-between"><div className="h-16 flex items-center">{p.logo?<img src={p.logo} alt={p.name} className="max-h-12 max-w-[210px] object-contain object-left" />:<img src="https://cdn.simpleicons.org/pipefy/111111" alt="Pipefy" className="h-10 max-w-[180px]" />}</div><div><h3 className="font-display font-black text-3xl mb-3">{p.name}</h3><p className="text-muted-foreground">Implantação, integração, automação e evolução conforme o processo da empresa.</p></div></Link>)}</div></div></section>
  </div>
}
