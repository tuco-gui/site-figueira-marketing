import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import DigitalStack from "@/components/shared/DigitalStack";

const features = [
  { title: "Arquitetura e integrações", description: "Desenhamos como sistemas, APIs, bancos, automações e canais precisam conversar. O foco é reduzir dependência de trabalho manual e evitar que dados importantes fiquem presos em ferramentas isoladas." },
  { title: "APIs e webhooks", description: "Criamos e integramos endpoints, webhooks e serviços para entrada, saída e sincronização de dados entre plataformas de marketing, vendas, atendimento, financeiro e operação." },
  { title: "Bancos e backends", description: "Estruturamos dados, regras de negócio, autenticação, permissões e serviços de backend para aplicações internas, portais, dashboards e produtos digitais." },
  { title: "Infraestrutura e publicação", description: "Hospedagem, domínio, SSL, deploy, containers, observabilidade e rotinas de atualização são pensados para que o sistema possa ser operado depois de ir ao ar." },
  { title: "Ferramentas internas", description: "Construímos aplicações que substituem planilhas frágeis, controles espalhados e processos que hoje exigem copiar informação de um lugar para outro." },
  { title: "Documentação e continuidade", description: "A solução precisa continuar existindo depois da entrega. Organizamos arquitetura, fluxo, credenciais, integrações, dependências e instruções de operação para reduzir conhecimento tribal." },
];

const build = [
  ["PORTAL", "Área de cliente, parceiro ou equipe com autenticação e informações centralizadas."],
  ["PAINEL", "Dashboard operacional ou executivo ligado a dados reais da empresa."],
  ["BACKOFFICE", "Ferramenta interna para cadastro, aprovação, controle, auditoria ou operação."],
  ["API", "Camada de integração para conectar sistemas que hoje não conversam."],
  ["WORKFLOW", "Processo com regras, estados, aprovações, notificações e histórico."],
  ["PRODUTO", "Aplicação ou micro-SaaS que transforma uma rotina em software utilizável e vendável."],
];

export default function Tecnologia() {
  return (
    <SolutionPageLayout
      badge="Tecnologia & Sistemas"
      title="Tecnologia que some no fluxo"
      titleAccent="e aparece no resultado"
      description="Não empilhamos ferramenta por empilhar. A Figueira desenha e constrói a infraestrutura digital necessária para a operação funcionar melhor: integrações, APIs, bancos, sistemas internos, portais e produtos sob medida."
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=1000&fit=crop&auto=format"
      features={features}
    >
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.75fr_1.25fr] gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">O que pode ser construído</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.94]">
                Nem toda necessidade cabe em uma plataforma pronta.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
              {build.map(([title, desc], i) => (
                <motion.article
                  key={title}
                  whileHover={{ y: -4 }}
                  className="bg-white p-7 lg:p-8 min-h-[230px]"
                >
                  <div className="font-mono text-[10px] text-[#C4191F] mb-10">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display font-black text-2xl mb-3">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </motion.article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#111111] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-5xl mb-12">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">Arquitetura</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.94]">
              Entrada, regra, dado, ação e interface precisam fazer parte da mesma história.
            </h2>
          </AnimatedSection>

          <div className="relative py-12">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/15 hidden lg:block" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
              {[
                ["01", "ENTRADAS", "Formulários, WhatsApp, APIs, arquivos, eventos"],
                ["02", "ORQUESTRAÇÃO", "Regras, automações, filas, agentes e validações"],
                ["03", "DADOS", "CRM, banco, histórico, documentos e métricas"],
                ["04", "AÇÕES", "Mensagens, tarefas, atualizações, cobrança, integrações"],
                ["05", "INTERFACE", "Painel, portal, sistema interno ou produto SaaS"],
              ].map(([n, title, desc]) => (
                <div key={n} className="relative bg-[#111111] border border-white/15 p-6 min-h-[205px]">
                  <div className="w-3 h-3 rounded-full bg-[#C4191F] absolute -top-[6px] left-6 lg:top-1/2 lg:-left-[6px]" />
                  <div className="font-mono text-xs text-[#C4191F] mb-9">{n}</div>
                  <h3 className="font-display font-black text-lg mb-3">{title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DigitalStack variant="technology" />
      <section className="py-20 lg:py-24 bg-[#F6F4F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">Quando vira produto</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">
                Algumas soluções começam internas e depois viram SaaS.
              </h2>
            </div>
            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
              Quando o processo resolve um problema recorrente e repetível, podemos evoluir a solução para usuários, planos, permissões, cobrança, onboarding e operação como produto digital.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </SolutionPageLayout>
  );
}