import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features = [
  { title: "Agente BDR e qualificação", description: "Recebe o lead, entende contexto, faz perguntas de qualificação, registra informações e encaminha para o vendedor no momento certo. Pode operar em WhatsApp, site ou outros canais integrados." },
  { title: "Agente de conversão", description: "Atua depois da geração do lead para reduzir tempo de resposta, responder dúvidas, conduzir próximos passos, recuperar contatos parados e aumentar a disciplina de follow-up." },
  { title: "Agente de atendimento", description: "Responde dúvidas recorrentes com base no conhecimento da empresa, identifica intenção, coleta dados e transfere para atendimento humano quando a conversa exige decisão ou sensibilidade." },
  { title: "Agente de suporte", description: "Organiza solicitações, consulta bases de conhecimento, cria ou atualiza tickets, orienta o cliente e mantém histórico estruturado para que o time humano não recomece a conversa do zero." },
  { title: "Agente de agendamento", description: "Consulta disponibilidade, sugere horários, confirma agenda, envia lembretes e registra a origem do atendimento. Pode conversar com calendário, CRM e WhatsApp." },
  { title: "Agentes internos", description: "Assistentes para tarefas operacionais: leitura e classificação de documentos, triagem de solicitações, geração de respostas, consulta de dados, atualização de sistemas e apoio a equipes." },
];

const agents = [
  ["01", "BDR", "Qualifica, conduz e prepara a oportunidade para o comercial."],
  ["02", "CONVERSÃO", "Ataca velocidade de resposta, follow-up e recuperação de oportunidade."],
  ["03", "ATENDIMENTO", "Resolve dúvidas, coleta contexto e direciona a conversa."],
  ["04", "SUPORTE", "Organiza solicitações e usa conhecimento da empresa para responder."],
  ["05", "AGENDAMENTO", "Conecta conversa, disponibilidade, confirmação e lembretes."],
  ["06", "INTERNO", "Automatiza trabalho operacional sem tirar do humano o que exige julgamento."],
];

export default function AgentesIA() {
  return (
    <SolutionPageLayout
      badge="Agentes de IA"
      title="Agentes que trabalham dentro"
      titleAccent="do seu processo"
      description="Não é um chatbot solto no canto do site. Desenhamos agentes de IA conectados à operação comercial e de atendimento, com contexto, regras, integrações, histórico e transferência para pessoas quando necessário."
      heroImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&h=1000&fit=crop&auto=format"
      features={features}
    >
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-4xl mb-14">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">Onde entra a IA</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.95] mb-6">
              O agente só é bom quando entende o processo ao redor dele.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A implementação começa pelo fluxo real: de onde chega a conversa, quais informações precisam ser coletadas, o que pode ser respondido automaticamente, quando entra uma pessoa, onde os dados ficam registrados e qual é o próximo passo esperado.
            </p>
          </AnimatedSection>

          <div className="border-y border-border">
            {agents.map(([n, name, desc], i) => (
              <AnimatedSection key={name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="grid grid-cols-[56px_120px_1fr] sm:grid-cols-[72px_180px_1fr] gap-4 py-6 lg:py-8 border-b last:border-b-0 border-border items-center"
                >
                  <span className="font-mono text-xs text-[#C4191F]">{n}</span>
                  <strong className="font-display text-lg sm:text-xl">{name}</strong>
                  <p className="text-sm sm:text-base text-muted-foreground">{desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#C4191F] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/60 mb-4">Integração</div>
              <h2 className="font-display font-black text-4xl lg:text-6xl tracking-[-0.045em] leading-[0.94]">
                Conversa de um lado. Operação do outro. O agente no meio conectando tudo.
              </h2>
            </div>
            <div className="space-y-6 text-white/80 leading-relaxed text-lg">
              <p>WhatsApp, formulário, site, CRM, calendário, base de conhecimento, sistema interno e automações podem participar do mesmo fluxo.</p>
              <p>Na operação da Figueira, essa lógica também pode conversar com o Harvest para que lead, histórico, status, origem e próximos passos fiquem dentro do mesmo sistema comercial.</p>
              <p>O desenho final depende do processo e das integrações disponíveis. Não prendemos a solução a uma única ferramenta ou modelo.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </SolutionPageLayout>
  );
}