import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const stackByVariant = {
  home: {
    eyebrow: "Stack digital",
    title: "As melhores ferramentas funcionam melhor quando trabalham juntas.",
    description: "A Figueira combina plataformas líderes de mercado, parcerias estratégicas e tecnologia própria para montar a stack que o processo realmente precisa.",
    items: [
      { name: "Google Partner", slug: "google", note: "Mídia, mensuração e ecossistema Google", partner: true },
      { name: "Meta Partner", slug: "meta", note: "Mídia e ecossistema Meta", partner: true },
      { name: "Hostinger Partner", slug: "hostinger", note: "VPS, hospedagem, domínio e e-mail", partner: true },
      { name: "TikTok Partner", slug: "tiktok", note: "Mídia e descoberta", partner: true },
      { name: "Mercado Livre Partner", slug: "mercadolibre", note: "Ecossistema de marketplace", partner: true },
      { name: "Kommo", slug: "kommo", note: "CRM conversacional" },
      { name: "Zoho", slug: "zoho", note: "CRM e suíte de negócios" },
      { name: "Pipefy", slug: "pipefy", note: "Processos e workflows" },
      { name: "Harvest", note: "Tecnologia própria Figueira", owned: true },
      { name: "Kesher", note: "Tecnologia própria Figueira", owned: true },
    ],
  },
  sites: {
    eyebrow: "Infraestrutura da página",
    title: "O site não termina no layout.",
    description: "Hospedagem, domínio, e-mail, analytics, CRM e automação fazem parte da entrega quando o projeto exige uma operação completa.",
    items: [
      { name: "Hostinger", slug: "hostinger", note: "Parceira para VPS, hospedagem e e-mail", partner: true },
      { name: "Google", slug: "google", note: "Analytics, Search e mensuração", partner: true },
      { name: "Meta", slug: "meta", note: "Pixels e mensuração de campanhas", partner: true },
      { name: "Vercel", slug: "vercel", note: "Deploy e entrega web" },
      { name: "Harvest", note: "Entrada de leads e operação comercial", owned: true },
      { name: "WhatsApp", slug: "whatsapp", note: "Conversão e atendimento" },
    ],
  },
  media: {
    eyebrow: "Ecossistema de mídia",
    title: "Operamos canais diferentes sem perder uma única leitura de negócio.",
    description: "Parcerias, plataformas e mensuração entram no mesmo desenho para conectar investimento, campanha, lead e resultado.",
    items: [
      { name: "Google Partner", slug: "googleads", note: "Google Ads e ecossistema Google", partner: true },
      { name: "Meta", slug: "meta", note: "Facebook e Instagram Ads", partner: true },
      { name: "TikTok", slug: "tiktok", note: "TikTok Ads", partner: true },
      { name: "Mercado Livre", slug: "mercadolibre", note: "Marketplace e mídia", partner: true },
      { name: "YouTube", slug: "youtube", note: "Vídeo e remarketing" },
      { name: "LinkedIn", slug: "linkedin", note: "Aquisição B2B" },
    ],
  },
  crm: {
    eyebrow: "CRM & vendas",
    title: "Escolhemos a ferramenta pelo processo, não o processo pela ferramenta.",
    description: "Implantamos e integramos plataformas de CRM, atendimento e workflow. Quando nenhuma resolve direito, construímos a camada que falta.",
    items: [
      { name: "Kommo", slug: "kommo", note: "CRM conversacional e mensageria", partner: true },
      { name: "Zoho", slug: "zoho", note: "CRM e suíte de negócios", partner: true },
      { name: "Pipefy", slug: "pipefy", note: "Processos e workflows", partner: true },
      { name: "HubSpot", slug: "hubspot", note: "Marketing, CRM e automação" },
      { name: "Pipedrive", slug: "pipedrive", note: "Pipeline e execução comercial" },
      { name: "Harvest", note: "Camada própria de operação e inteligência", owned: true },
    ],
  },
  automation: {
    eyebrow: "Automação & integração",
    title: "A stack muda. A lógica do processo continua sendo o centro.",
    description: "Conectamos canais, dados e sistemas com automações documentadas, observáveis e prontas para conversar com a operação humana.",
    items: [
      { name: "n8n", slug: "n8n", note: "Orquestração e automação" },
      { name: "WhatsApp", slug: "whatsapp", note: "Atendimento, cobrança e follow-up" },
      { name: "Google Workspace", slug: "google", note: "E-mail, Drive, Sheets e calendário" },
      { name: "Hostinger", slug: "hostinger", note: "Infraestrutura e VPS", partner: true },
      { name: "Harvest", note: "Operação comercial e inteligência", owned: true },
      { name: "Kesher", note: "Tecnologia própria Figueira", owned: true },
    ],
  },
  ai: {
    eyebrow: "IA conectada à operação",
    title: "O agente funciona porque existe uma stack ao redor dele.",
    description: "Canal, CRM, calendário, base de conhecimento, automações e sistemas próprios dão ao agente contexto, memória operacional e um próximo passo.",
    items: [
      { name: "Harvest", note: "Contexto comercial e histórico", owned: true },
      { name: "Kesher", note: "Tecnologia própria Figueira", owned: true },
      { name: "WhatsApp", slug: "whatsapp", note: "Canal de conversa" },
      { name: "n8n", slug: "n8n", note: "Orquestração de ferramentas" },
      { name: "Kommo", slug: "kommo", note: "CRM conversacional" },
      { name: "Google Workspace", slug: "google", note: "Agenda, documentos e e-mail" },
    ],
  },
  technology: {
    eyebrow: "Infraestrutura & produto",
    title: "Construímos em cima de uma stack que pode evoluir.",
    description: "Infraestrutura, deploy, dados, automação e tecnologia própria entram conforme o produto e a operação pedem.",
    items: [
      { name: "Hostinger", slug: "hostinger", note: "VPS, hospedagem, domínio e e-mail", partner: true },
      { name: "Vercel", slug: "vercel", note: "Deploy e entrega web" },
      { name: "Supabase", slug: "supabase", note: "Dados, autenticação e backend" },
      { name: "n8n", slug: "n8n", note: "Automação e integrações" },
      { name: "Harvest", note: "Tecnologia própria Figueira", owned: true },
      { name: "Kesher", note: "Tecnologia própria Figueira", owned: true },
    ],
  },
};

function LogoMark({ item, dark }) {
  const [failed, setFailed] = useState(false);

  if (item.owned || failed || !item.slug) {
    return (
      <div className={`font-display font-black tracking-[-0.04em] text-xl ${dark ? "text-white" : "text-[#111111]"}`}>
        {item.name}
        {item.owned && <span className="text-[#C4191F]">.</span>}
      </div>
    );
  }

  const hex = dark ? "FFFFFF" : "111111";
  return (
    <img
      src={`https://cdn.simpleicons.org/${item.slug}/${hex}`}
      alt={item.name}
      className="h-8 max-w-[120px] object-contain object-left"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function DigitalStack({ variant = "home", dark = false, compact = false }) {
  const data = stackByVariant[variant] || stackByVariant.home;

  return (
    <section className={`${compact ? "py-20 lg:py-24" : "py-24 lg:py-32"} ${dark ? "bg-[#111111] text-white" : "bg-white text-foreground"} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.86fr_1.14fr] gap-10 lg:gap-16 items-end mb-12">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C4191F] mb-4">{data.eyebrow}</div>
            <h2 className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-[-0.045em] leading-[0.96] ${dark ? "text-white" : ""}`}>
              {data.title}
            </h2>
          </div>
          <p className={`text-base lg:text-lg leading-relaxed max-w-xl lg:justify-self-end ${dark ? "text-white/55" : "text-muted-foreground"}`}>
            {data.description}
          </p>
        </AnimatedSection>

        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l ${dark ? "border-white/12" : "border-border"}`}>
          {data.items.map((item, i) => (
            <AnimatedSection key={item.name} delay={i * 0.035}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`relative min-h-[154px] p-5 lg:p-6 border-r border-b ${dark ? "border-white/12 hover:bg-white/[0.035]" : "border-border hover:bg-[#F7F6F2]"} transition-colors`}
              >
                <div className="flex items-start justify-between gap-3 mb-9">
                  <LogoMark item={item} dark={dark} />
                  <span className={`font-mono text-[9px] ${dark ? "text-white/25" : "text-muted-foreground"}`}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className={`text-xs leading-relaxed ${dark ? "text-white/50" : "text-muted-foreground"}`}>{item.note}</p>
                {(item.partner || item.owned) && (
                  <div className={`absolute left-5 lg:left-6 bottom-4 font-mono text-[8px] uppercase tracking-[0.16em] ${item.owned ? "text-[#C4191F]" : dark ? "text-[#4BDF6A]" : "text-[#168A35]"}`}>
                    {item.owned ? "Tecnologia Figueira" : "Parceria / ecossistema"}
                  </div>
                )}
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
