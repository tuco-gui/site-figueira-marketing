import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const partnerRoutes = {
  Kommo: "/stack-digital/kommo",
  Zoho: "/stack-digital/zoho",
  Pipefy: "/stack-digital/pipefy",
  Hostinger: "/stack-digital/hostinger",
};

const stackByVariant = {
  home: {
    eyebrow: "Stack Digital",
    title: "Tecnologia boa é a que se encaixa no processo.",
    description: "Trabalhamos com plataformas líderes, parcerias estratégicas e tecnologia própria. Cada ferramenta entra quando resolve uma parte real da operação.",
    items: [
      { name: "Google Partner", asset: "/partners/google-partner.png" },
      { name: "Meta", asset: "/partners/meta-partner.png" },
      { name: "Hostinger", asset: "/partners/hostinger-partner-light.png", href: partnerRoutes.Hostinger },
      { name: "Kommo", asset: "/partners/kommo-partner-light.png", href: partnerRoutes.Kommo },
      { name: "Zoho", asset: "/partners/zoho-partner.png", href: partnerRoutes.Zoho },
      { name: "Pipefy", slug: "pipefy", href: partnerRoutes.Pipefy },
      { name: "TikTok", asset: "/partners/tiktok-partner.png" },
      { name: "Mercado Livre", asset: "/partners/mercadolivre-partner.jpg" },
    ],
    cta: true,
  },
  sites: {
    eyebrow: "Infraestrutura do projeto",
    title: "Site, hospedagem, mensuração e conversão precisam conversar.",
    description: "Nesta frente usamos apenas as plataformas que fazem sentido para publicação, estabilidade, rastreamento e captação.",
    items: [
      { name: "Hostinger", asset: "/partners/hostinger-partner-light.png", href: partnerRoutes.Hostinger },
      { name: "Google Partner", asset: "/partners/google-partner.png" },
      { name: "Meta", asset: "/partners/meta-partner.png" },
      { name: "Vercel", slug: "vercel" },
    ],
  },
  media: {
    eyebrow: "Canais de mídia",
    title: "Cada canal entra por uma razão.",
    description: "A operação de mídia combina plataformas, tracking e leitura comercial para transformar investimento em aprendizado e oportunidade.",
    items: [
      { name: "Google Partner", asset: "/partners/google-partner.png" },
      { name: "Meta", asset: "/partners/meta-partner.png" },
      { name: "TikTok", asset: "/partners/tiktok-partner.png" },
      { name: "Mercado Livre", asset: "/partners/mercadolivre-partner.jpg" },
    ],
  },
  crm: {
    eyebrow: "CRM & processos",
    title: "A ferramenta precisa se adaptar ao processo comercial.",
    description: "A Figueira implanta e integra CRMs e plataformas de processo de acordo com o modelo de venda, atendimento e operação.",
    items: [
      { name: "Kommo", asset: "/partners/kommo-partner-light.png", href: partnerRoutes.Kommo },
      { name: "Zoho", asset: "/partners/zoho-partner.png", href: partnerRoutes.Zoho },
      { name: "Pipefy", slug: "pipefy", href: partnerRoutes.Pipefy },
      { name: "HubSpot", slug: "hubspot" },
      { name: "Pipedrive", slug: "pipedrive" },
    ],
  },
  automation: {
    eyebrow: "Automação & operação",
    title: "Automação boa é processo bem desenhado.",
    description: "Aqui entram orquestração, mensageria, infraestrutura e workflows, sem transformar a operação em uma caixa-preta.",
    items: [
      { name: "Pipefy", slug: "pipefy", href: partnerRoutes.Pipefy },
      { name: "Hostinger", asset: "/partners/hostinger-partner-light.png", href: partnerRoutes.Hostinger },
      { name: "n8n", slug: "n8n" },
      { name: "WhatsApp", slug: "whatsapp" },
    ],
  },
  ai: {
    eyebrow: "IA conectada",
    title: "Agente de IA precisa de canal, contexto e processo.",
    description: "CRM, mensageria, automação e agenda dão ao agente contexto e um próximo passo real.",
    items: [
      { name: "Kommo", asset: "/partners/kommo-partner-light.png", href: partnerRoutes.Kommo },
      { name: "Zoho", asset: "/partners/zoho-partner.png", href: partnerRoutes.Zoho },
      { name: "n8n", slug: "n8n" },
      { name: "WhatsApp", slug: "whatsapp" },
    ],
  },
  technology: {
    eyebrow: "Infraestrutura",
    title: "A base técnica precisa suportar o produto depois do lançamento.",
    description: "Infraestrutura, deploy, banco e automação entram conforme a solução pede.",
    items: [
      { name: "Hostinger", asset: "/partners/hostinger-partner-light.png", href: partnerRoutes.Hostinger },
      { name: "Vercel", slug: "vercel" },
      { name: "Supabase", slug: "supabase" },
      { name: "n8n", slug: "n8n" },
    ],
  },
};

function PartnerLogo({ item }) {
  const [failed, setFailed] = useState(false);

  if (item.asset && !failed) {
    return <img src={item.asset} alt={item.name} className="h-10 sm:h-11 max-w-[150px] object-contain" loading="lazy" onError={() => setFailed(true)} />;
  }

  if (item.slug && !failed) {
    return <img src={`https://cdn.simpleicons.org/${item.slug}/111111`} alt={item.name} className="h-8 sm:h-9 max-w-[132px] object-contain" loading="lazy" onError={() => setFailed(true)} />;
  }

  return <span className="font-display font-black text-lg tracking-tight">{item.name}</span>;
}

export default function DigitalStack({ variant = "home", compact = false }) {
  const data = stackByVariant[variant] || stackByVariant.home;

  return (
    <section className={`${compact ? "py-16 lg:py-20" : "py-20 lg:py-28"} bg-white overflow-hidden border-y border-border`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.82fr_1.18fr] gap-8 lg:gap-14 items-end mb-10">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C4191F] mb-4">{data.eyebrow}</div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-[-0.045em] leading-[0.96]">{data.title}</h2>
          </div>
          <p className="text-base lg:text-lg leading-relaxed max-w-xl lg:justify-self-end text-muted-foreground">{data.description}</p>
        </AnimatedSection>

        <div className="flex flex-wrap items-stretch border-t border-l border-border bg-white">
          {data.items.map((item) => {
            const content = (
              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.18 }} className="h-full min-h-[112px] px-6 py-5 flex items-center justify-center border-r border-b border-border hover:bg-[#F7F6F2] transition-colors">
                <PartnerLogo item={item} />
              </motion.div>
            );

            return item.href ? (
              <Link key={item.name} to={item.href} className="w-1/2 md:w-1/4">{content}</Link>
            ) : (
              <div key={item.name} className="w-1/2 md:w-1/4">{content}</div>
            );
          })}
        </div>

        {data.cta && (
          <div className="mt-7">
            <Link to="/stack-digital" className="inline-flex min-h-[48px] items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-semibold text-sm hover:brightness-95 transition-all">
              Conhecer a Stack Digital
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
