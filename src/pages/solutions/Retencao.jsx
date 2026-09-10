import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import { Heart, RefreshCw, Star, TrendingUp, MessageCircle, Gift } from "lucide-react";

const features = [
  { title: "Estratégia de Retenção", description: "Programas de retenção personalizados com análise de churn, cohorts e identificação de clientes em risco." },
  { title: "Customer Success", description: "Processos de sucesso do cliente com onboarding estruturado, health score e touchpoints estratégicos." },
  { title: "NPS e Pesquisas", description: "Implementação de NPS, CSAT e pesquisas de satisfação com automações de ação baseadas em feedback." },
  { title: "Upsell e Cross-sell", description: "Identificação de oportunidades de expansão de receita com ofertas personalizadas para clientes atuais." },
  { title: "Programas de Fidelização", description: "Criação de programas de loyalty, indicação e recompensas para maximizar LTV e advocacy." },
  { title: "Comunicação de Retenção", description: "Campanhas segmentadas de e-mail, WhatsApp e notificações para manter engajamento e prevenir churn." },
];

export default function Retencao() {
  return (
    <SolutionPageLayout
      badge="Retenção"
      title="Retenção e sucesso do cliente para"
      titleAccent="maximizar LTV"
      description="Adquirir é caro. Reter é lucrativo. Construímos estratégias de retenção, upsell, NPS e customer success para que seus clientes comprem mais, fiquem mais e indiquem mais."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/c363d9485_generated_8b943bad.png"
      features={features}
      featureIcon={Heart}
    />
  );
}