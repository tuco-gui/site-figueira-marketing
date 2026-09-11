import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import DigitalStack from "@/components/shared/DigitalStack";

const features = [
  { title: "Mapeamento do processo", description: "Antes de abrir o n8n, entendemos entrada, regra, decisão, exceção, responsável e resultado esperado. Automação boa começa no processo, não na ferramenta." },
  { title: "Follow-up e cadências", description: "Criamos rotinas de acompanhamento por WhatsApp, e-mail e alertas internos, respeitando estágio do lead, tempo, resposta e regras de parada." },
  { title: "Distribuição e roteamento", description: "Leads podem ser classificados, enriquecidos e direcionados para pessoas, filas, unidades ou fluxos diferentes conforme origem, perfil, região, produto ou prioridade." },
  { title: "Cobrança e financeiro", description: "Automatizamos lembretes, avisos de vencimento, retornos, registro de resposta, tarefas de conferência e rotinas de cobrança sem marcar pagamento automaticamente quando a validação deve ser humana." },
  { title: "Onboarding e operação", description: "Abertura de tarefas, criação de registros, mensagens de boas-vindas, coleta de dados, documentos, aprovações e atualização de sistemas podem acontecer em sequência sem depender de memória." },
  { title: "Integrações e observabilidade", description: "Conectamos CRM, WhatsApp, formulários, planilhas, bancos, APIs e sistemas internos com logs, tratamento de erro e documentação para a automação continuar entendível depois da entrega." },
];

const flows = [
  ["01", "ENTRADA", "Lead, mensagem, formulário, evento, pagamento, planilha ou API."],
  ["02", "REGRA", "Validar, normalizar, deduplicar, classificar e decidir o caminho."],
  ["03", "AÇÃO", "Enviar, criar, atualizar, distribuir, agendar ou solicitar aprovação."],
  ["04", "REGISTRO", "Guardar histórico, origem, status, tentativas e resultado."],
  ["05", "EXCEÇÃO", "Encaminhar para pessoa quando a automação não deve decidir sozinha."],
];

const cases = [
  "Lead de formulário entra no CRM, recebe origem e vai para o responsável certo.",
  "Contato que não respondeu recebe follow-up; ao responder, a cadência é pausada.",
  "Cliente recebe aviso de vencimento e a equipe confere o pagamento antes de marcar como pago.",
  "Nova venda dispara onboarding, tarefas, documentos e comunicação interna.",
  "Dados de mídia, CRM e financeiro alimentam um resumo executivo automaticamente.",
  "Solicitação interna percorre aprovação, registro e notificação sem troca infinita de mensagens.",
];

export default function Automacoes() {
  return (
    <SolutionPageLayout
      badge="Automações"
      title="Automação não é apertar play."
      titleAccent="É desenhar processo."
      description="A Figueira constrói fluxos de marketing, vendas, atendimento e operação que conectam sistemas, reduzem trabalho manual e mantêm regras claras sobre o que deve ser automatizado e o que precisa continuar humano."
      heroImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&h=1000&fit=crop&auto=format"
      features={features}
    >
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-4xl mb-14">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C4191F] mb-4">Do evento ao resultado</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.94] mb-6">
              Uma automação boa deixa claro o que acontece em cada etapa.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Não entregamos um emaranhado de nós que só quem montou entende. A arquitetura precisa mostrar de onde veio o dado, qual regra foi aplicada, qual ação aconteceu e o que fazer quando algo sai do caminho esperado.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 border border-border">
            {flows.map(([n, title, desc], i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.07 }}
                className="p-6 lg:p-7 border-b lg:border-b-0 lg:border-r last:border-0 border-border min-h-[235px]"
              >
                <div className="font-mono text-xs text-[#C4191F] mb-10">{n}</div>
                <h3 className="font-display font-black text-xl mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-14">
            <div className="lg:sticky lg:top-28 self-start">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C4191F] mb-4">Exemplos reais de processo</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">
                O que hoje depende de alguém lembrar pode virar sistema.
              </h2>
            </div>
            <div className="border-t border-white/15">
              {cases.map((item, i) => (
                <div key={item} className="grid grid-cols-[42px_1fr] gap-5 py-6 border-b border-white/15">
                  <span className="font-mono text-xs text-[#C4191F]">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-lg text-white/75 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <DigitalStack variant="automation" dark />
    </SolutionPageLayout>
  );
}