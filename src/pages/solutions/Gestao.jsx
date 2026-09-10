import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import { Users, ClipboardCheck, Calendar, BarChart, Shield, UserCheck } from "lucide-react";

const features = [
  { title: "Squad Dedicado", description: "Equipe multidisciplinar exclusiva para seu projeto: gestores, analistas, designers, devs e estrategistas trabalhando integrados." },
  { title: "Rituais de Gestão", description: "Dailies, weeklies e monthlies estruturadas. Reuniões de alinhamento, resultado e planejamento com governança clara." },
  { title: "KPIs em Tempo Real", description: "Acompanhamento diário de indicadores-chave com alertas automáticos para desvios e oportunidades." },
  { title: "Relatórios Executivos", description: "Reports mensais com análise de performance, insights estratégicos e recomendações de próximos passos." },
  { title: "Governança de Resultados", description: "Framework proprietário de gestão de performance com ciclos de melhoria contínua e accountability." },
  { title: "Onboarding Estruturado", description: "Processo de implantação organizado em fases com checklists, treinamentos e handoffs documentados." },
];

export default function Gestao() {
  return (
    <SolutionPageLayout
      badge="Gestão"
      title="Equipe dedicada com"
      titleAccent="governança de resultados"
      description="Seu projeto é operado por um squad completo com rituais de gestão ágil, KPIs em tempo real e transparência total. Não somos fornecedores — somos uma extensão estratégica da sua empresa."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/c363d9485_generated_8b943bad.png"
      features={features}
      featureIcon={Users}
    />
  );
}