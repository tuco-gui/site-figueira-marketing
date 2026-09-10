import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import { Zap, Mail, MessageSquare, Filter, RefreshCw, Link2 } from "lucide-react";

const features = [
  { title: "Fluxos de Nutrição", description: "Sequências automáticas de e-mails e mensagens personalizadas por estágio do funil e comportamento." },
  { title: "Lead Scoring", description: "Pontuação automática de leads baseada em perfil (fit) e engajamento (interesse) para priorizar o time comercial." },
  { title: "Follow-up Automático", description: "Gatilhos de follow-up por e-mail, WhatsApp e notificação interna para não perder nenhuma oportunidade." },
  { title: "Integrações Entre Plataformas", description: "Conectamos CRM, mídia, site, WhatsApp, e-mail e ferramentas internas para um fluxo de dados unificado." },
  { title: "Workflows Complexos", description: "Automações com lógica condicional, ramificações, delays e ações multi-canal para cenários sofisticados." },
  { title: "Onboarding Automatizado", description: "Fluxos de boas-vindas, ativação e engajamento para novos clientes com comunicação personalizada." },
];

export default function Automacoes() {
  return (
    <SolutionPageLayout
      badge="Automações"
      title="Automações que"
      titleAccent="escalam seu tempo"
      description="Automatizamos nutrição de leads, follow-ups, lead scoring e integrações entre plataformas. Seu time foca no que importa enquanto os fluxos trabalham 24/7."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/0ad1cb773_generated_4c08e16d.png"
      features={features}
      featureIcon={Zap}
    />
  );
}