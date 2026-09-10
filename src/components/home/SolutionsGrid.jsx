import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";
import { Link } from "react-router-dom";

const tabs = [
  {
    number: "01",
    title: "Estratégia e Growth",
    tagline: "O diagnóstico antes do investimento.",
    description: "Antes de aumentar investimento, precisamos entender o cenário. Analisamos posicionamento, público, aquisição, funil comercial, dados disponíveis e principais gargalos para definir prioridades e um plano de ação coerente com o momento da empresa.",
    deliverables: ["Diagnóstico de marketing e vendas", "Revisão de público e proposta de valor", "Mapa do funil comercial", "Definição de prioridades", "Indicadores de acompanhamento", "Plano de ação"],
    path: "/solucoes/estrategia-growth",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format",
  },
  {
    number: "02",
    title: "Mídia e Aquisição",
    tagline: "Investimento que tem retorno rastreável.",
    description: "Planejamos e operamos mídia paga com foco em aquisição e aprendizado contínuo. Quando a estrutura do cliente permite, conectamos campanhas a analytics, CRM e rastreamento de conversões para entender melhor custo, qualidade dos leads e retorno por canal.",
    deliverables: ["Gestão de Meta Ads e Google Ads", "Estrutura de campanhas e públicos", "Padronização de UTMs", "Rastreamento de conversões quando aplicável", "Auditoria de contas existentes", "Análise e otimização contínua"],
    path: "/solucoes/midia-paga",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
  },
  {
    number: "03",
    title: "Criativos de Performance",
    tagline: "A mensagem certa, no momento certo.",
    description: "Criativos precisam comunicar a oferta com clareza e gerar aprendizado. Desenvolvemos copies, roteiros e peças para campanhas a partir do público, da proposta de valor e dos dados disponíveis, testando abordagens e evoluindo o que demonstra melhor resposta.",
    deliverables: ["Copy para anúncios", "Roteiros de vídeo", "Peças estáticas e variações", "Hipóteses de teste", "Organização de produção criativa", "Análise de performance por criativo"],
    path: "/solucoes/criativos",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&auto=format",
  },
  {
    number: "04",
    title: "Sites e Landing Pages",
    tagline: "Presença digital que ajuda a vender.",
    description: "Criamos e modernizamos sites institucionais, landing pages e páginas comerciais para empresas que precisam apresentar melhor o que fazem e transformar visita em próximo passo. Estruturamos mensagem, hierarquia, experiência mobile, velocidade e integrações com analytics, CRM e automações quando fizer sentido.",
    deliverables: ["Sites institucionais e landing pages", "Redesign de sites existentes", "Copy e arquitetura de informação", "Experiência mobile e performance", "Integração com analytics e CRM", "Páginas comerciais para campanhas"],
    path: "/solucoes/paginas-conversao",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&h=400&fit=crop&auto=format",
  },
  {
    number: "05",
    title: "CRM e Vendas",
    tagline: "Lead que entra e some é dinheiro perdido.",
    description: "Estruturamos CRM e processo comercial para que os leads tenham etapas, responsáveis, histórico e próximos passos claros. A configuração é adaptada ao processo real da empresa e pode incluir cadências, automações, scripts e indicadores de acompanhamento.",
    deliverables: ["Implantação ou reorganização de CRM", "Definição de etapas do funil", "Cadências de follow-up", "Scripts e orientações comerciais", "Integrações necessárias", "Indicadores de pipeline"],
    path: "/solucoes/crm",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format",
  },
  {
    number: "06",
    title: "Automações Inteligentes",
    tagline: "O que pode ser automatizado não deve depender de uma pessoa.",
    description: "Automatizamos tarefas repetitivas de marketing e vendas quando isso melhora o processo: distribuição de leads, follow-ups, avisos, nutrição, onboarding e integrações entre ferramentas. O objetivo é reduzir trabalho manual sem automatizar o que ainda exige julgamento humano.",
    deliverables: ["Mapeamento de processos repetitivos", "Automação de follow-up", "Integrações entre ferramentas", "Fluxos de nutrição e onboarding", "Alertas e rotinas operacionais", "Documentação dos fluxos"],
    path: "/solucoes/automacoes",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format",
  },
  {
    number: "07",
    title: "Dados e Dashboards",
    tagline: "Decisão sem dado é aposta. Dado sem contexto é ruído.",
    description: "Organizamos rastreamento e indicadores para reduzir a distância entre o que acontece na mídia, no site e no processo comercial. Podemos configurar analytics, eventos, UTMs, integrações e dashboards de acordo com as fontes de dados disponíveis.",
    deliverables: ["Configuração de GA4 e eventos", "Padronização de UTMs", "Tracking server-side quando aplicável", "Dashboards executivos", "Integração entre fontes", "Documentação de métricas"],
    path: "/solucoes/dados-bi",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
  },
  {
    number: "08",
    title: "Tecnologia e Sistemas",
    tagline: "Ferramentas certas, integradas. Não uma pilha desconectada.",
    description: "Avaliamos ferramentas, integrações e custos do stack de marketing e vendas para reduzir redundância e melhorar o fluxo de informação. A recomendação parte do processo que a empresa precisa executar, não da ferramenta que está na moda.",
    deliverables: ["Auditoria do stack atual", "Recomendação de ferramentas por objetivo", "Configuração de integrações entre plataformas", "Eliminação de custos desnecessários", "Documentação do ecossistema", "Manutenção e monitoramento contínuos"],
    path: "/solucoes/tecnologia",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format",
  },
  {
    number: "09",
    title: "Retenção e Sucesso do Cliente",
    tagline: "Manter é mais lucrativo do que conquistar.",
    description: "Aquisição é apenas uma parte do crescimento. Também podemos estruturar onboarding, acompanhamento, pesquisas de satisfação, reengajamento e rotinas de retenção para que a empresa entenda melhor a experiência do cliente e identifique oportunidades de continuidade e expansão.",
    deliverables: ["Processo de onboarding", "Pesquisas de satisfação", "Rotinas de acompanhamento", "Fluxos de reengajamento", "Programa de indicações quando aplicável", "Indicadores de retenção e expansão"],
    path: "/solucoes/retencao",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop&auto=format",
  },
];

export default function SolutionsGrid() {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab];

  return (
    <section id="solucoes" className="py-20 lg:py-32 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-display font-black text-3xl text-[#C4191F] leading-none">02</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
              Soluções
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Estratégia, marketing e tecnologia conectados à <span className="text-[#C4191F]">sua operação</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Podemos resolver uma necessidade específica ou conectar diferentes frentes. O ponto de partida é entender o que está travando o resultado agora.
          </p>
        </AnimatedSection>

        {/* Tabs row */}
        <div className="relative mb-12">
          <div
            className="flex overflow-x-auto lg:overflow-x-visible lg:flex-wrap lg:justify-center gap-1 lg:gap-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`
                  flex-shrink-0 px-4 lg:px-5 py-3 text-sm font-medium 
                  border-b-2 transition-all duration-200 whitespace-nowrap
                  ${activeTab === i
                    ? 'border-[#C4191F] text-[#C4191F] bg-[#C4191F]/10'
                    : 'border-transparent text-white/50 hover:text-white/80 hover:border-white/20'
                  }
                `}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* Left - content */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 border-2 border-[#C4191F] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-black text-2xl text-[#C4191F]">{active.number}</span>
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl lg:text-3xl tracking-tight leading-tight text-white mb-3">
                    {active.title}
                  </h3>
                  <p className="text-base text-white/50 italic">{active.tagline}</p>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed mb-8">
                {active.description}
              </p>
              <h4 className="font-heading font-bold text-sm text-white/40 uppercase tracking-wider mb-4">
                Entregáveis
              </h4>
              <ul className="space-y-2.5 mb-8">
                {active.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/60 leading-snug">
                    <span className="text-[#C4191F] font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={active.path}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C4191F] text-white font-semibold text-sm rounded-lg hover:bg-[#a3141a] transition-colors duration-200"
              >
                Ver solução completa →
              </Link>
            </div>

            {/* Right - image */}
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-auto"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}