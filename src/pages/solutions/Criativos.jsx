import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import { Palette, Video, ImagePlus, BarChart, Split, Sparkles } from "lucide-react";

const features = [
  { title: "Criativos Data-Driven", description: "Cada peça é criada com base em dados de performance. Analisamos CTR, CPM e conversão para guiar a produção criativa." },
  { title: "Vídeos de Performance", description: "Produção de vídeos curtos otimizados para cada plataforma: Reels, TikTok, YouTube Shorts e Stories." },
  { title: "Carrosséis e Estáticos", description: "Design de alto impacto com copy persuasiva para feeds, stories e anúncios de display." },
  { title: "UGC e Social Proof", description: "Produção e curadoria de conteúdo gerado por usuários para aumentar credibilidade e conversão." },
  { title: "Testes A/B de Criativos", description: "Bateria contínua de testes de headline, visual, CTA, formato e tom de voz com análise estatística." },
  { title: "Creative Analytics", description: "Dashboard dedicado à performance criativa com insights sobre quais elementos geram mais resultado." },
];

export default function Criativos() {
  return (
    <SolutionPageLayout
      badge="Design & Produção"
      title="Criativos de"
      titleAccent="alta performance"
      description="Criativos não são arte — são engenharia de conversão. Produzimos peças data-driven com ciclos de teste contínuos para encontrar os melhores ângulos, copies e formatos para cada público."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/138af93e2_generated_e71a1e5d.png"
      features={features}
      featureIcon={Palette}
    />
  );
}