import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const stackByVariant = {
  home: {
    eyebrow: "Stack digital",
    title: "As melhores ferramentas funcionam melhor quando trabalham juntas.",
    description: "A Figueira combina parcerias oficiais, plataformas líderes e tecnologia própria. Não é uma vitrine de logos: cada ferramenta entra onde faz sentido para mídia, hospedagem, CRM, automação, atendimento e dados.",
    items: [
      { name: "Google Partner", asset: "/partners/google-partner.png", note: "Google Partner para mídia, mensuração e ecossistema Google.", partner: true },
      { name: "Meta Partner", asset: "/partners/meta-partner.png", note: "Parceria Meta para Facebook, Instagram, mídia e mensuração.", partner: true },
      { name: "Hostinger Partner", asset: "/partners/hostinger-partner-light.png", assetDark: "/partners/hostinger-partner-dark.png", note: "Parceria Hostinger para VPS, hospedagem, domínio e e-mail.", partner: true },
      { name: "TikTok Partner", asset: "/partners/tiktok-partner.png", note: "Parceria no ecossistema TikTok para mídia e descoberta.", partner: true },
      { name: "Mercado Livre Partner", asset: "/partners/mercadolivre-partner.jpg", note: "Parceria no ecossistema Mercado Livre e marketplace.", partner: true },
      { name: "Kommo", asset: "/partners/kommo-partner-light.png", assetDark: "/partners/kommo-partner-dark.png", note: "Parceiro Kommo para CRM conversacional, pipeline, mensageria e automações.", partner: true },
      { name: "Zoho", asset: "/partners/zoho-partner.png", note: "Parceria Zoho para CRM e ecossistema integrado de vendas, marketing, atendimento, operações e dados.", partner: true },
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
      { name: "Hostinger", asset: "/partners/hostinger-partner-light.png", assetDark: "/partners/hostinger-partner-dark.png", note: "Parceria Hostinger para VPS, hospedagem, domínio e e-mail profissional.", partner: true },
      { name: "Google", asset: "/partners/google-partner.png", note: "Google Partner: Analytics, Search, mensuração e ecossistema Google.", partner: true },
      { name: "Meta", asset: "/partners/meta-partner.png", note: "Parceria Meta para pixels, eventos e mensuração de campanhas.", partner: true },
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
      { name: "Google Partner", asset: "/partners/google-partner.png", note: "Google Ads, YouTube, Search e mensuração dentro do ecossistema Google.", partner: true },
      { name: "Meta", asset: "/partners/meta-partner.png", note: "Parceria Meta para Facebook e Instagram Ads.", partner: true },
      { name: "TikTok", asset: "/partners/tiktok-partner.png", note: "Parceria no ecossistema TikTok para mídia e descoberta.", partner: true },
      { name: "Mercado Livre", asset: "/partners/mercadolivre-partner.jpg", note: "Parceria no ecossistema Mercado Livre para marketplace e mídia.", partner: true },
      { name: "YouTube", slug: "youtube", note: "Vídeo e remarketing" },
      { name: "LinkedIn", slug: "linkedin", note: "Aquisição B2B" },
    ],
  },
  crm: {
    eyebrow: "CRM & vendas",
    title: "Escolhemos a ferramenta pelo processo, não o processo pela ferramenta.",
    description: "Implantamos e integramos plataformas de CRM, atendimento e workflow. Quando nenhuma resolve direito, construímos a camada que falta.",
    items: [
      { name: "Kommo", asset: "/partners/kommo-partner-light.png", assetDark: "/partners/kommo-partner-dark.png", note: "Parceiro Kommo: CRM conversacional, mensageria, pipeline e automações.", partner: true },
      { name: "Zoho", asset: "/partners/zoho-partner.png", note: "Parceria Zoho: CRM e ecossistema integrado para vendas, marketing, atendimento, operações e dados.", partner: true },
      { name: "Pipefy", slug: "pipefy", note: "Processos e workflows" },
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
      { name: "Hostinger", asset: "/partners/hostinger-partner-light.png", assetDark: "/partners/hostinger-partner-dark.png", note: "Parceria Hostinger para infraestrutura, VPS e hospedagem.", partner: true },
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
      { name: "Kommo", asset: "/partners/kommo-partner-light.png", assetDark: "/partners/kommo-partner-dark.png", note: "Parceiro Kommo para CRM conversacional, pipeline, mensageria e automações.", partner: true },
      { name: "Google Workspace", slug: "google", note: "Agenda, documentos e e-mail" },
    ],
  },
  technology: {
    eyebrow: "Infraestrutura & produto",
    title: "Construímos em cima de uma stack que pode evoluir.",
    description: "Infraestrutura, deploy, dados, automação e tecnologia própria entram conforme o produto e a operação pedem.",
    items: [
      { name: "Hostinger", asset: "/partners/hostinger-partner-light.png", assetDark: "/partners/hostinger-partner-dark.png", note: "Parceria Hostinger para VPS, hospedagem, domínio e e-mail.", partner: true },
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

  if (item.asset && !failed) {
    return (
      <img
        src={dark && item.assetDark ? item.assetDark : item.asset}
        alt={item.name}
        className="h-10 max-w-[150px] object-contain object-left"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

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
