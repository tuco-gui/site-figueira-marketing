import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Mail, BarChart, Workflow, Users } from "lucide-react";

const crmPlatforms = [
  { name: "HubSpot", description: "CRM completo para operações enterprise com automações avançadas" },
  { name: "RD Station", description: "Plataforma líder em marketing e vendas no Brasil" },
  { name: "Pipedrive", description: "CRM focado em vendas com pipeline visual intuitivo" },
  { name: "KOMMO", description: "CRM conversacional com integração WhatsApp nativa" },
  { name: "Bitrix24", description: "Plataforma completa de CRM, comunicação e gestão de projetos" },
];

const features = [
  { title: "Implantação de CRM", description: "Setup completo da plataforma com campos customizados, pipelines, automações e integrações desde o primeiro dia." },
  { title: "Pipeline de Vendas", description: "Estruturação visual do funil comercial com estágios, critérios de passagem, SLAs e alertas automáticos." },
  { title: "Integração WhatsApp", description: "WhatsApp Business API integrado ao CRM para comunicação centralizada com leads e clientes." },
  { title: "Automações Comerciais", description: "Fluxos automáticos de follow-up, lead scoring, distribuição de leads e notificações para o time." },
  { title: "Gestão de Oportunidades", description: "Acompanhamento de cada deal com probabilidade de fechamento, forecast e análise de pipeline health." },
  { title: "Relatórios de Vendas", description: "Dashboards de performance comercial: ciclo de vendas, taxa de conversão, ticket médio e produtividade." },
];

export default function CRM() {
  return (
    <SolutionPageLayout
      badge="CRM & Vendas"
      title="CRM e processo comercial"
      titleAccent="que fecha negócios"
      description="Implantamos e gerenciamos seu CRM do zero, construindo pipelines, automações e integrações que transformam leads em clientes com previsibilidade e escala."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/cc3726617_generated_3f7a622d.png"
      features={features}
      featureIcon={MessageSquare}
    >
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
              Plataformas que <span className="text-primary">implantamos</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trabalhamos com os principais CRMs do mercado. Escolhemos a plataforma ideal para seu negócio.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {crmPlatforms.map((platform, i) => (
              <AnimatedSection key={platform.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white border border-border rounded-xl p-5 text-center hover:border-primary/20 hover:shadow-md transition-all duration-300"
                >
                  <h4 className="font-heading font-bold text-sm mb-1">{platform.name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{platform.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </SolutionPageLayout>
  );
}