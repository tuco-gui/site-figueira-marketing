import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";
import { Link } from "react-router-dom";

function SolutionGlyph({ index }) {
  const paths = [
    <path key="1" d="M5 18V7h6v11m4 0V4h4v14M3 18h18" />,
    <path key="2" d="M5 6h14M5 12h10M5 18h7" />,
    <path key="3" d="M4 17 9 7l4 7 2-4 5 7M4 17h16" />,
    <path key="4" d="M5 5h14v14H5zM8 9h8M8 13h5" />,
    <path key="5" d="M4 5h16v14H4zM4 9h16M8 15h4" />,
    <path key="6" d="M5 7h14M7 12h10M9 17h6" />,
    <path key="7" d="M5 12h4l3-7 3 14 2-7h2" />,
    <path key="8" d="M7 5h10v4H7zM5 13h14v6H5z" />,
    <path key="9" d="M4 18V9m5 9V5m5 13v-7m5 7V3" />,
    <path key="10" d="M5 5h5v5H5zm9 0h5v5h-5zM5 14h5v5H5zm9 0h5v5h-5z" />,
    <path key="11" d="M5 18V6h14v12M8 9h8M8 13h5" />,
    <path key="12" d="M6 18c0-5 2-9 6-12 4 3 6 7 6 12M9 13h6" />,
  ];
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        {paths[index % paths.length]}
      </g>
    </svg>
  );
}

const tabs = [
  {
    number: "01",
    title: "Estratégia e Growth",
    tagline: "Antes da ação, direção.",
    description: "Entramos no negócio para entender mercado, oferta, público, aquisição, conversão, processo comercial e dados. O objetivo não é produzir um relatório bonito: é decidir onde está o gargalo, o que merece prioridade e quais movimentos têm mais chance de gerar impacto.",
    deliverables: ["Diagnóstico de marketing e vendas", "Revisão de posicionamento e oferta", "Mapa do funil", "Prioridades e hipóteses", "Indicadores de acompanhamento", "Plano de ação"],
    path: "/solucoes/estrategia-growth",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "02",
    title: "Gestão de Marketing",
    tagline: "Planejamento, prioridade e execução sem ruído.",
    description: "Organizamos a operação para que estratégia não morra na reunião. Planejamento, responsáveis, cadência, pauta, prioridade, acompanhamento e tomada de decisão passam a funcionar como um sistema de gestão, interno, compartilhado ou junto ao time da Figueira.",
    deliverables: ["Planejamento de marketing", "Rituais e cadências", "Gestão de demandas", "Definição de responsáveis", "Acompanhamento de execução", "Integração com vendas e dados"],
    path: "/solucoes/gestao",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "03",
    title: "Mídia Paga",
    tagline: "Aquisição com leitura de negócio.",
    description: "Google, Meta e outros canais não operam isolados. Estruturamos campanhas, públicos, criativos, páginas, tracking e leitura de qualidade de lead para transformar mídia em uma fonte de aquisição que pode ser analisada, corrigida e escalada com critério.",
    deliverables: ["Meta Ads e Google Ads", "Estratégia por canal", "Estrutura de campanhas", "Tracking e UTMs", "Auditoria de contas", "Otimização contínua"],
    path: "/solucoes/midia-paga",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "04",
    title: "Criativos de Performance",
    tagline: "Criativo é mensagem, hipótese e aprendizado.",
    description: "Desenvolvemos campanhas, copies, conceitos, roteiros e peças para comunicar oferta e gerar resposta. O trabalho criativo conversa com mídia e dados para descobrir quais argumentos, formatos e abordagens merecem continuar.",
    deliverables: ["Conceitos de campanha", "Copy para anúncios", "Roteiros de vídeo", "Peças estáticas e variações", "Hipóteses de teste", "Leitura de performance"],
    path: "/solucoes/criativos",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "05",
    title: "Sites e Landing Pages",
    tagline: "Presença digital que sustenta a venda.",
    description: "Criamos e modernizamos sites institucionais, landing pages e páginas comerciais. Trabalhamos mensagem, arquitetura, experiência mobile, velocidade, SEO técnico, conversão e integração com o restante da operação.",
    deliverables: ["Sites institucionais", "Landing pages", "Redesign de sites", "Copy e arquitetura", "Performance e mobile", "Integração com CRM e analytics"],
    path: "/solucoes/paginas-conversao",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "06",
    title: "CRM e Processo Comercial",
    tagline: "Lead sem processo vira oportunidade perdida.",
    description: "Estruturamos CRM, pipeline, etapas, responsáveis, histórico, cadências, follow-up, integrações e indicadores para transformar atendimento e vendas em um processo claro, usando ferramentas de mercado ou soluções sob medida.",
    deliverables: ["Implantação e reorganização de CRM", "Pipeline e etapas", "Cadências de follow-up", "Integração WhatsApp", "Automação comercial", "Indicadores de vendas"],
    path: "/solucoes/crm",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "07",
    title: "Automações",
    tagline: "Processo repetitivo não precisa depender de memória.",
    description: "Mapeamos tarefas, gatilhos, regras e sistemas para automatizar distribuição de leads, follow-up, onboarding, avisos, cobrança, relatórios, integrações e rotinas operacionais sem criar uma caixa-preta impossível de manter.",
    deliverables: ["Mapeamento de processo", "n8n e integrações", "WhatsApp e e-mail", "Automação de follow-up", "Fluxos operacionais", "Documentação e monitoramento"],
    path: "/solucoes/automacoes",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "08",
    title: "Agentes de IA",
    tagline: "IA trabalhando dentro do processo, não solta no chat.",
    description: "Criamos agentes BDR, de conversão, atendimento, suporte, agendamento e operação interna. Eles podem conversar com WhatsApp, site, CRM, calendário, bases de conhecimento e sistemas próprios, com regras claras de transferência para pessoas.",
    deliverables: ["Agente BDR", "Agente de conversão", "Atendimento e suporte", "Agendamento", "Base de conhecimento", "Integração com CRM e Harvest"],
    path: "/solucoes/agentes-ia",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "09",
    title: "Dados e BI",
    tagline: "Uma versão da realidade para decidir melhor.",
    description: "Organizamos tracking, métricas, fontes e dashboards para aproximar mídia, site, CRM e financeiro. O objetivo é reduzir achismo e dar contexto aos números que realmente participam da decisão.",
    deliverables: ["GA4 e eventos", "UTMs e tracking", "Integração de fontes", "Dashboards executivos", "Indicadores comerciais", "Documentação de métricas"],
    path: "/solucoes/dados-bi",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "10",
    title: "Tecnologia e Sistemas",
    tagline: "A tecnologia precisa servir ao processo.",
    description: "Auditamos stack, integrações, infraestrutura e ferramentas. Implementamos APIs, webhooks, bancos, sistemas internos e conexões entre plataformas para que a operação deixe de depender de remendos manuais.",
    deliverables: ["APIs e webhooks", "Integrações", "Infraestrutura", "Bancos de dados", "Ferramentas internas", "Arquitetura e documentação"],
    path: "/solucoes/tecnologia",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "11",
    title: "Soluções sob Medida",
    tagline: "Quando não existe a ferramenta certa, a gente constrói.",
    description: "CRM próprio, fluxo financeiro e cobrança, portal de cliente, sistema operacional, ferramenta interna ou micro-SaaS. Desenhamos a regra de negócio e construímos o produto que a operação realmente precisa.",
    deliverables: ["CRM sob medida", "Fluxos financeiros e cobrança", "Portais e áreas do cliente", "Micro-SaaS", "Ferramentas internas", "Produtos digitais"],
    path: "/solucoes/solucoes-sob-medida",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop&auto=format",
  },
  {
    number: "12",
    title: "Retenção e Sucesso do Cliente",
    tagline: "Crescimento também acontece depois da venda.",
    description: "Estruturamos onboarding, acompanhamento, pesquisas de satisfação, reengajamento, indicação e rotinas de retenção para entender a experiência do cliente e aumentar a qualidade da relação no tempo.",
    deliverables: ["Onboarding", "Pesquisas e NPS", "Acompanhamento", "Reengajamento", "Indicações", "Indicadores de retenção"],
    path: "/solucoes/retencao",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=600&fit=crop&auto=format",
  },
];

export default function SolutionsGrid() {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab];

  return (
    <section id="solucoes" className="py-20 lg:py-32 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 lg:mb-16">
          <div className="grid grid-cols-[auto_1fr] gap-3 items-center mb-5">
            <span className="font-display font-black text-3xl text-[#C4191F] leading-none">02</span>
            <span className="justify-self-start inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono font-medium text-white/60 uppercase tracking-[0.2em]">
              Soluções
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-8 lg:gap-16 items-end">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.05em] leading-[0.94]">
              Uma empresa não cresce por departamento. <span className="text-[#C4191F]">Cresce pela conexão.</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed max-w-xl lg:justify-self-end">
              Demanda, experiência, venda, automação, dados e tecnologia participam da mesma jornada. Entre por uma necessidade específica e aprofunde a solução completa.
            </p>
          </div>
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
                  border-b-2 transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2
                  ${activeTab === i
                    ? 'border-[#C4191F] text-[#C4191F] bg-[#C4191F]/10'
                    : 'border-transparent text-white/50 hover:text-white/80 hover:border-white/20'
                  }
                `}
              >
                <span className={activeTab === i ? "text-[#C4191F]" : "text-white/35"}><SolutionGlyph index={i} /></span>
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
                <div className="w-14 h-14 border border-white/15 rounded-full flex items-center justify-center flex-shrink-0 text-[#4BDF6A]">
                  <SolutionGlyph index={activeTab} />
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
                className="inline-flex min-h-[48px] items-center justify-center text-center px-7 py-3.5 bg-accent text-white font-semibold text-sm rounded-lg hover:brightness-95 hover:shadow-lg hover:shadow-accent/20 transition-all duration-200"
              >
                Ver solução completa
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