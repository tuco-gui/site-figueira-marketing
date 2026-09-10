import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import { Globe, MousePointer, Split, BarChart, Layers, Gauge } from "lucide-react";

const features = [
  { title: "Sites Institucionais", description: "Sites claros, responsivos e alinhados ao posicionamento da empresa, com estrutura pensada para facilitar entendimento e contato." },
  { title: "Landing Pages", description: "Páginas comerciais para campanhas, ofertas e captação de leads, com mensagem direta e próximo passo bem definido." },
  { title: "Redesign de Sites", description: "Modernização de sites existentes sem perder o que já funciona, melhorando apresentação, navegação, mobile e conversão." },
  { title: "Copy e Arquitetura", description: "Organização do conteúdo, hierarquia da informação e textos orientados ao que o visitante precisa entender e fazer." },
  { title: "Performance e SEO Técnico", description: "Estrutura leve, rápida e preparada para boas práticas de indexação, Core Web Vitals e experiência mobile." },
  { title: "Integrações e Tracking", description: "Integração com analytics, formulários, CRM, WhatsApp e automações quando fizer sentido para o processo comercial." },
];

export default function PaginasConversao() {
  return (
    <SolutionPageLayout
      badge="Sites e Conversão"
      title="Sites e páginas que"
      titleAccent="representam melhor a empresa e geram oportunidades"
      description="Criamos sites institucionais, landing pages e páginas comerciais com foco em clareza, experiência mobile, velocidade e conversão — conectando a presença digital ao processo comercial da empresa."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/138af93e2_generated_e71a1e5d.png"
      features={features}
      featureIcon={Globe}
    />
  );
}