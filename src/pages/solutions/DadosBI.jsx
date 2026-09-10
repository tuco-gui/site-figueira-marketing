import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import { BarChart3, TrendingUp, PieChart, Database, Eye, Target } from "lucide-react";

const features = [
  { title: "Dashboards Customizados", description: "Painéis de BI personalizados com as métricas que importam para seu negócio, atualizados em tempo real." },
  { title: "Relatórios Executivos", description: "Reports estratégicos para C-Level com análise de performance, tendências e recomendações de ação." },
  { title: "Análise de Funil", description: "Visualização completa do funil de marketing e vendas com taxas de conversão por etapa e gargalos." },
  { title: "Atribuição Multi-Touch", description: "Modelagem de atribuição para entender a jornada real do cliente e otimizar investimento por canal." },
  { title: "Análise Preditiva", description: "Modelos de projeção de receita, churn e crescimento baseados em dados históricos e tendências." },
  { title: "Data Integration", description: "Centralização de dados de mídia, CRM, site, e-commerce e outras fontes em uma única visão unificada." },
];

export default function DadosBI() {
  return (
    <SolutionPageLayout
      badge="Inteligência"
      title="Dados e BI para"
      titleAccent="decisões estratégicas"
      description="Transformamos dados brutos em inteligência de negócio. Dashboards customizados, relatórios executivos e análise preditiva para tomar decisões com confiança."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/464abf50a_generated_c7c04102.png"
      features={features}
      featureIcon={BarChart3}
    />
  );
}