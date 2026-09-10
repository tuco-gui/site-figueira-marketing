import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features = [
  { title: "CRM sob medida", description: "Quando um CRM pronto exige contorno demais, construímos uma operação adaptada ao fluxo real: leads, empresas, oportunidades, tarefas, histórico, regras, permissões e integrações." },
  { title: "Sistemas financeiros e cobrança", description: "Fluxos de contas a receber, lembretes, cobrança por WhatsApp ou e-mail, conciliação assistida, acompanhamento de inadimplência e rotinas internas conectadas aos dados da empresa." },
  { title: "Portais e áreas do cliente", description: "Ambientes autenticados para acompanhar projetos, documentos, pedidos, indicadores, chamados, aprovações ou qualquer rotina que hoje depende de mensagens e planilhas." },
  { title: "Micro-SaaS e produtos digitais", description: "Transformamos uma necessidade repetitiva em produto: painel, cadastro, workflow, regras de negócio, usuários, cobrança, notificações, integrações e administração." },
  { title: "Ferramentas internas", description: "Sistemas para substituir planilhas frágeis, formulários desconectados e tarefas manuais: cadastro, aprovação, orçamento, estoque, operação, checklist, auditoria e gestão." },
  { title: "Integrações especiais", description: "Conectamos APIs, bancos de dados, ERPs, CRMs, gateways, WhatsApp, e-mail, calendários e serviços próprios quando a solução precisa atravessar vários sistemas." },
];

const examples = [
  "CRM comercial construído para o processo da empresa",
  "Fluxo financeiro com cobrança, retorno e conferência humana",
  "Sistema de propostas, contratos e follow-up",
  "Portal para cliente acompanhar execução e documentos",
  "Painel operacional com indicadores em tempo real",
  "Micro-SaaS para vender um processo como produto",
  "Ferramenta de atendimento com IA e histórico centralizado",
  "Rotina de agendamento conectada a CRM e calendário",
];

export default function SolucoesSobMedida() {
  return (
    <SolutionPageLayout
      badge="Soluções sob medida"
      title="Quando a ferramenta pronta não resolve,"
      titleAccent="a gente constrói"
      description="Sistemas, fluxos e produtos digitais desenhados em cima do processo real da empresa. Do primeiro mapa de operação ao produto rodando, integrado e documentado."
      heroImage="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=1000&fit=crop&auto=format"
      features={features}
    >
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-14">
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">O que pode virar solução</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">
                Se existe uma regra, uma entrada, uma decisão e um próximo passo, existe um processo que pode ser melhor desenhado.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-border">
              {examples.map((item, i) => (
                <div key={item} className="py-5 border-b border-border flex gap-4">
                  <span className="font-mono text-[10px] text-[#C4191F] pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-medium leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-5xl">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-5">Como construímos</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.94] mb-10">
              Processo primeiro. Código depois.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10">
              {[
                ["01", "MAPEAR", "Entender pessoas, etapas, exceções, dados e gargalos."],
                ["02", "DESENHAR", "Definir fluxo, regra de negócio, interface e integrações."],
                ["03", "CONSTRUIR", "Desenvolver por módulos e validar o uso real."],
                ["04", "OPERAR", "Publicar, monitorar, corrigir e evoluir com documentação."],
              ].map(([n, t, d]) => (
                <div key={n} className="bg-[#111111] p-7 min-h-[220px]">
                  <div className="font-mono text-xs text-[#C4191F] mb-10">{n}</div>
                  <div className="font-display font-black text-xl mb-3">{t}</div>
                  <p className="text-white/55 text-sm leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </SolutionPageLayout>
  );
}