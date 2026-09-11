import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features = [
  { title: "Desenho do processo comercial", description: "Antes de escolher campos e telas, definimos etapas, critérios de passagem, responsáveis, tempos de resposta, motivos de perda, próximos passos e informações que realmente precisam estar no CRM." },
  { title: "Implantação e reorganização", description: "Configuramos ou reconstruímos pipelines, campos, atividades, permissões, automações e integrações em CRMs existentes. Quando a ferramenta pronta força o processo a trabalhar errado, desenhamos uma solução própria." },
  { title: "WhatsApp e atendimento", description: "Centralizamos conversas e histórico quando a arquitetura permite, conectando WhatsApp ao cadastro do lead, à oportunidade e às tarefas do comercial para reduzir atendimento sem contexto." },
  { title: "Cadências e follow-up", description: "Estruturamos o que acontece depois do primeiro contato: quem fala, quando fala, por qual canal, com qual objetivo e o que interrompe ou muda a cadência." },
  { title: "Gestão de pipeline", description: "Criamos visibilidade sobre volume, conversão entre etapas, tempo parado, origem, vendedor, ticket, previsão e gargalos para que o CRM ajude a decidir, não apenas a armazenar contatos." },
  { title: "Integração com marketing e dados", description: "Quando possível, conectamos campanha, formulário, página, origem e parâmetros de aquisição ao CRM para acompanhar a jornada até oportunidade, venda e retorno." },
];

const stages = [
  ["ENTRADA", "Lead chega com origem e contexto identificados."],
  ["QUALIFICAÇÃO", "Fit, necessidade, momento e informações mínimas ficam registradas."],
  ["OPORTUNIDADE", "Existe interesse real, próximo passo e responsável definido."],
  ["PROPOSTA", "Valor, escopo, objeções, atividade e prazo ficam visíveis."],
  ["DECISÃO", "Follow-up segue uma lógica e não depende da memória de alguém."],
  ["GANHO / PERDA", "O motivo vira dado para melhorar marketing, venda e produto."],
];

const platforms = [
  ["HubSpot", "Operações que precisam unir marketing, CRM e automação."],
  ["RD Station", "Contextos comerciais e de marketing com forte presença no Brasil."],
  ["Pipedrive", "Times que precisam de pipeline visual e execução comercial simples."],
  ["Kommo", "Operações conversacionais com forte uso de mensageria."],
  ["Bitrix24", "Ambientes que combinam CRM, comunicação e gestão."],
  ["Sob medida", "Quando a lógica do negócio vale mais do que adaptar o processo à ferramenta."],
];

export default function CRM() {
  return (
    <SolutionPageLayout
      badge="CRM & Processo Comercial"
      title="CRM não é banco de contatos."
      titleAccent="É processo vivo."
      description="A Figueira estrutura tecnologia, rotina e informação para que cada lead tenha contexto, responsável, próximo passo e histórico. O objetivo é fazer o comercial enxergar o que precisa acontecer agora e a gestão entender onde a venda está travando."
      heroImage="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1400&h=1000&fit=crop&auto=format"
      features={features}
    >
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-4xl mb-14">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">Pipeline de verdade</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.94] mb-6">
              Um CRM bom mostra o caminho da venda e onde ela parou.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As etapas precisam representar decisões reais do cliente e do time. Quando o funil é só uma sequência de colunas genéricas, ele vira arquivo. Quando cada etapa tem critério, atividade e responsabilidade, ele passa a orientar comportamento.
            </p>
          </AnimatedSection>

          <div className="relative border-y border-border">
            {stages.map(([title, desc], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[48px_150px_1fr] sm:grid-cols-[72px_220px_1fr] gap-4 sm:gap-7 items-center py-6 lg:py-8 border-b last:border-b-0 border-border"
              >
                <span className="font-mono text-xs text-[#C4191F]">{String(i + 1).padStart(2, "0")}</span>
                <strong className="font-display font-black text-lg sm:text-xl">{title}</strong>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">Plataforma vem depois</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95] max-w-4xl">
              Podemos implantar ferramentas de mercado ou construir o CRM que o processo pede.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {platforms.map(([name, desc], i) => (
              <motion.div
                key={name}
                whileHover={{ backgroundColor: "rgba(196,25,31,.12)" }}
                className="bg-[#111111] p-8 min-h-[190px]"
              >
                <div className="font-mono text-[10px] text-[#C4191F] mb-10">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display font-black text-2xl mb-3">{name}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-28 bg-[#F6F4F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">Conexão com IA</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">
                O CRM pode virar o cérebro operacional dos agentes.
              </h2>
            </div>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-5">
              <p>Um agente BDR pode consultar e atualizar estágio, registrar qualificação, criar tarefa, recuperar contexto e entregar a oportunidade para uma pessoa sem perder o histórico da conversa.</p>
              <p>Agentes de atendimento, suporte e agendamento também podem usar o CRM como fonte de contexto e destino das informações coletadas. Na arquitetura da Figueira, essa camada pode conversar com o Harvest para centralizar lead, campanha, canal, conversa e acompanhamento.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </SolutionPageLayout>
  );
}