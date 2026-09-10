import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { Megaphone, Target, TrendingUp, BarChart3, Split, Layers } from "lucide-react";

const platforms = [
  { name: "Google Ads", desc: "Search, Display, Shopping, YouTube" },
  { name: "Meta Ads", desc: "Facebook, Instagram, Messenger" },
  { name: "TikTok Ads", desc: "In-Feed, TopView, Spark Ads" },
  { name: "LinkedIn Ads", desc: "Sponsored Content, InMail, Lead Gen" },
  { name: "Pinterest Ads", desc: "Pins Promovidos, Shopping" },
  { name: "YouTube Ads", desc: "Pre-roll, Discovery, Bumper" },
];

const features = [
  { title: "Estratégia Multi-Canal", description: "Distribuição inteligente de budget entre plataformas com base em CAC, ROAS e estágio de funil de cada canal." },
  { title: "Otimização Contínua", description: "Ciclos diários de otimização de lances, segmentações, criativos e landing pages para maximizar performance." },
  { title: "Testes A/B Estruturados", description: "Metodologia de testes com significância estatística para criativos, copies, audiências e páginas de destino." },
  { title: "Tracking Avançado", description: "Implementação de conversões offline, CAPI, enhanced conversions e modelagem de atribuição multi-touch." },
  { title: "Remarketing Inteligente", description: "Sequências de remarketing baseadas em comportamento com criativos dinâmicos e exclusões estratégicas." },
  { title: "Relatórios de Performance", description: "Dashboards em tempo real com métricas de custo, conversão, ROAS e projeções de escala por plataforma." },
];

export default function MidiaPaga() {
  return (
    <SolutionPageLayout
      badge="Performance"
      title="Mídia paga com"
      titleAccent="inteligência de dados"
      description="Planejamos, estruturamos e otimizamos campanhas de mídia paga com foco em aquisição, rastreamento e aprendizado. A escolha dos canais depende do público, da oferta, do orçamento e da capacidade comercial da empresa."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/e6464c210_generated_d74b1d5b.png"
      features={features}
      featureIcon={Megaphone}
    >
      {/* Platforms section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
              Plataformas que podemos <span className="text-primary">operar</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map((platform, i) => (
              <AnimatedSection key={platform.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white border border-border rounded-xl p-5 text-center hover:border-primary/20 hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-heading font-bold text-sm mb-1">{platform.name}</h4>
                  <p className="text-xs text-muted-foreground">{platform.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </SolutionPageLayout>
  );
}