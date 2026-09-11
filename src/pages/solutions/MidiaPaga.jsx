import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";

const features = [
  { title: "Estratégia por canal", description: "Escolhemos canal, campanha e objetivo a partir da oferta, público, ciclo de venda e capacidade comercial. Nem toda empresa precisa estar em toda plataforma." },
  { title: "Estrutura de campanhas", description: "Organizamos contas, campanhas, públicos, nomenclaturas, orçamento e testes para que a operação seja legível e permita aprender com o que acontece." },
  { title: "Tracking e origem", description: "Padronizamos UTMs, eventos e conversões e conectamos mídia a analytics e CRM quando possível para acompanhar não só o clique, mas a qualidade do lead e o avanço no funil." },
  { title: "Criativos conectados à mídia", description: "Mídia e criação trabalham juntas. Transformamos dúvidas, objeções, oferta e dados de performance em novas hipóteses de copy, vídeo, imagem e landing page." },
  { title: "Otimização contínua", description: "Ajustamos distribuição de verba, segmentação, criativo, página e estratégia com base em sinais de custo, volume, qualidade e comportamento, não em uma única métrica isolada." },
  { title: "Leitura de negócio", description: "ROAS, CPL e CPA são importantes, mas não suficientes. Sempre que os dados permitem, olhamos conversão comercial, ticket, margem, recorrência e retorno para decidir onde vale acelerar." },
];

const platforms = [
  ["Google Ads", "googleads", "Demanda ativa, pesquisa, YouTube, display e shopping quando aplicável."],
  ["Meta Ads", "meta", "Facebook e Instagram para descoberta, consideração, remarketing e geração de demanda."],
  ["YouTube", "youtube", "Vídeo para alcance, consideração, prova e remarketing dentro do ecossistema Google."],
  ["LinkedIn Ads", "linkedin", "Contextos B2B em que cargo, empresa e perfil profissional fazem diferença."],
  ["TikTok Ads", "tiktok", "Formatos nativos de vídeo e descoberta para públicos e ofertas adequados ao canal."],
  ["Pinterest Ads", "pinterest", "Categorias com forte componente visual, inspiração, intenção e descoberta."],
];

const cycle = [
  ["01", "OFERTA", "O que estamos vendendo, para quem e por que alguém deveria agir agora?"],
  ["02", "MENSAGEM", "Quais argumentos, objeções e provas precisam aparecer no anúncio?"],
  ["03", "DISTRIBUIÇÃO", "Em quais canais, públicos e formatos a hipótese será testada?"],
  ["04", "CONVERSÃO", "O que acontece depois do clique: página, formulário, WhatsApp ou venda direta?"],
  ["05", "QUALIDADE", "Os leads avançam? Compram? Têm perfil? O comercial consegue trabalhar?"],
  ["06", "DECISÃO", "O que manter, cortar, escalar ou transformar em novo teste?"],
];

export default function MidiaPaga() {
  return (
    <SolutionPageLayout
      badge="Mídia Paga"
      title="Comprar mídia é fácil."
      titleAccent="Ler o negócio é outra coisa."
      description="A Figueira estrutura e opera mídia paga como parte de um sistema de aquisição. Campanha, criativo, página, rastreamento e processo comercial precisam conversar para que o investimento gere aprendizado e oportunidade de verdade."
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=1000&fit=crop&auto=format"
      features={features}
    >
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-4xl">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">Canais</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.94]">
              A plataforma é meio. A estratégia vem antes.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {platforms.map(([name, icon, desc]) => (
              <motion.article
                key={name}
                whileHover={{ y: -5 }}
                className="bg-white p-8 min-h-[250px] flex flex-col"
              >
                <div className="h-10 flex items-center mb-10">
                  <img src={`https://cdn.simpleicons.org/${icon}/111111`} alt={name} className="h-8 w-8 object-contain" />
                  <span className="font-display font-black text-xl ml-4">{name}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.78fr_1.22fr] gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-4">Ciclo de performance</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">
                A campanha é só uma etapa do ciclo.
              </h2>
            </div>
            <div className="border-t border-white/15">
              {cycle.map(([n, title, desc]) => (
                <div key={n} className="grid grid-cols-[48px_140px_1fr] sm:grid-cols-[60px_180px_1fr] gap-4 py-7 border-b border-white/15">
                  <span className="font-mono text-xs text-[#C4191F]">{n}</span>
                  <strong className="font-display font-black">{title}</strong>
                  <p className="text-white/55 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-[#F6F4F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">
              Lead barato que não compra continua caro.
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-5">
              <p>Quando o CRM e o processo comercial estão conectados, a mídia deixa de otimizar apenas para volume e começa a receber sinais sobre qualidade, avanço no funil e venda.</p>
              <p>É essa leitura que permite decidir se o problema está no canal, no criativo, na oferta, na página, na qualificação ou no atendimento. Assim evitamos trocar campanha toda semana sem aprender nada.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </SolutionPageLayout>
  );
}