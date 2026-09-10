import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import { TrendingUp, Target, Compass, Milestone, Lightbulb, GitBranch } from "lucide-react";

const features = [
  { title: "Diagnóstico Completo", description: "Análise profunda da operação atual, identificação de gargalos, oportunidades e quick wins para aceleração imediata." },
  { title: "OKRs e Metas", description: "Definição de Objectives and Key Results alinhados com as metas de negócio, desdobrados em sprints semanais." },
  { title: "Roadmap Trimestral", description: "Planejamento estratégico com priorização de iniciativas por impacto vs esforço, usando frameworks ICE e RICE." },
  { title: "Análise de Mercado", description: "Estudo de concorrentes, benchmarks do setor, análise SWOT e posicionamento competitivo detalhado." },
  { title: "Unit Economics", description: "Modelagem de CAC, LTV, Payback, MRR e projeções de crescimento para tomada de decisão baseada em dados." },
  { title: "Growth Loops", description: "Identificação e construção de ciclos de crescimento sustentáveis que se retroalimentam automaticamente." },
];

export default function EstrategiaGrowth() {
  return (
    <SolutionPageLayout
      badge="Estratégia"
      title="Diagnóstico, planejamento e"
      titleAccent="growth sistêmico"
      description="Toda operação de crescimento começa com um diagnóstico preciso. Mapeamos sua operação atual, identificamos oportunidades e construímos um roadmap estratégico com OKRs, metas e sprints de execução."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/23fdd92b2_generated_7fd24c53.png"
      features={features}
      featureIcon={TrendingUp}
    />
  );
}