import React, { useEffect } from "react";
import {
  CheckCircle2,
  ExternalLink,
  MapPinned,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

const CONSULT_URL = "https://www.consult.med.br/";
const BEHANCE_URL = "https://www.behance.net/figueira_marketing";
const WHATSAPP_NUMBER = "5511951783049";
const CONSULT_LOGO =
  "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/68d54790-6c3c-48c4-b8cb-7143ac1e0fec.png";

const APPROVED_MOCKUP =
  "https://figueira-prospect-assets.vercel.app/consult-home-aprovada.png";

const cases = [
  {
    title: "Site — Remax Japi",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/d1d56e234046379.Y3JvcCwxNDg2LDExNjIsMCwyNjE4.png",
    url: "https://www.behance.net/gallery/234046379/Site-Remax-Japi",
  },
  {
    title: "Landing Page — Canaã Telecom",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/679f29234038137.Y3JvcCwxOTIwLDE1MDEsMCwxMTM1.png",
    url: "https://www.behance.net/gallery/234038137/Landing-Page-Canaa-Telecom-Promocoes",
  },
  {
    title: "Landing Page — Grupo Lybs",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/d41a0d234046505.Y3JvcCwzMDI0LDIzNjUsMCw0MzQ4.png",
    url: "https://www.behance.net/gallery/234046505/Landing-Page-Grupo-Lybs",
  },
  {
    title: "Caesal Casa — Ecommerce",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/9bbfcf234190099.Y3JvcCwxMDgwLDg0NCwwLDExNw.jpg",
    url: "https://www.behance.net/gallery/234190099/Caesal-Casa-Ecommerce",
  },
];

const improvements = [
  "Menu mais simples e estratégico",
  "Hero que explica rapidamente quem é a Consult",
  "Física Médica, Proteção Radiológica e Engenharia Clínica com destaque real",
  "Mapa mantido, mas usado para comunicar cobertura",
  "Experiência mobile-first",
  "WhatsApp e formulários em pontos de conversão",
  "Conteúdo técnico preservado para SEO e autoridade",
];

const proposalPlans = [
  {
    name: "Site Assistido",
    price: "R$ 200",
    suffix: "/mês",
    description:
      "Para manter o novo site tecnicamente cuidado, com a estrutura de blog pronta para a equipe da Consult operar.",
    items: [
      "Manutenção técnica do site",
      "Ajustes e atualizações solicitadas pela Consult",
      "Ferramenta administrativa e blog disponíveis",
      "A Consult administra e publica os conteúdos do blog",
      "Suporte para manter a estrutura funcionando corretamente",
    ],
  },
  {
    name: "Site + Conteúdo",
    price: "R$ 600",
    suffix: "/mês",
    description:
      "Para tirar a operação do blog da rotina da Consult e manter o site sendo atualizado de forma contínua.",
    items: [
      "Tudo do Site Assistido",
      "Administração do blog pela Figueira",
      "Produção e publicação de conteúdo técnico",
      "Otimizações contínuas de SEO",
      "Evolução de conteúdo pensando também em buscas por IA",
    ],
    featured: true,
  },
  {
    name: "Site + Tráfego",
    price: "R$ 1.000",
    suffix: "/mês",
    description:
      "Para unir manutenção do site com gestão de mídia paga e geração ativa de demanda.",
    items: [
      "Manutenção do site",
      "Gestão de tráfego pago",
      "Estratégia de campanhas por canal e público",
      "Integração dos pontos de conversão do site",
      "Investimento em mídia pago diretamente pela Consult",
    ],
  },
  {
    name: "Site + Tráfego + CRM",
    price: "R$ 1.500",
    suffix: "/mês",
    description:
      "Para captar e organizar as oportunidades em um processo comercial integrado, reduzindo o trabalho manual.",
    items: [
      "Manutenção do site",
      "Gestão de tráfego pago",
      "CRM integrado aos contatos do site",
      "Organização de funil, tarefas e acompanhamento de leads",
      "Integração comercial conforme o fluxo definido com a Consult",
    ],
  },
  {
    name: "Ecossistema Completo",
    price: "R$ 2.500",
    suffix: "/mês",
    description:
      "A solução completa apresentada na reunião: aquisição, CRM, automações, IA, conteúdo e evolução contínua do site.",
    items: [
      "Manutenção proativa do site",
      "Gestão de tráfego pago",
      "CRM e integrações comerciais",
      "Automações de CRM e processos",
      "Soluções de inteligência artificial",
      "Administração do blog e produção de conteúdo",
      "Otimizações contínuas de SEO e presença em buscas por IA",
    ],
  },
];

const whatsappProposalUrl = (planName, price) => {
  const message = planName
    ? `Olá! Aqui é da Consult. Analisamos a proposta da Figueira Marketing e optamos pelo pacote ${planName} (${price}/mês), com a implementação do novo site por R$ 2.900. Podem providenciar o contrato e os próximos passos?`
    : "Olá! Aqui é da Consult. Analisamos a proposta da Figueira Marketing e queremos seguir com a contratação. Podem nos orientar sobre os próximos passos para formalização e contrato?";

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export default function ConsultProposal() {
  useEffect(() => {
    document.title = "Proposta comercial para Consult | Figueira Marketing";

    const meta = document.querySelector('meta[name="robots"]') || document.createElement("meta");
    meta.setAttribute("name", "robots");
    meta.setAttribute("content", "noindex,nofollow");
    if (!meta.parentNode) document.head.appendChild(meta);

    return () => {
      document.title = "Figueira Marketing";
    };
  }, []);

  return (
    <div className="bg-white text-[#111111] pt-20">
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-y-0 left-0 w-1 bg-[#C4191F]" />
        <div className="absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-12 h-[280px] w-[280px] rounded-full border border-[#C4191F]/25" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C4191F]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
                  Figueira Marketing • Proposta comercial
                </span>
              </div>

              <h1 className="max-w-4xl font-display text-4xl font-black leading-[1.03] tracking-[-0.035em] sm:text-5xl lg:text-7xl">
                Uma proposta para o próximo momento digital da{" "}
                <span className="text-[#C4191F]">Consult.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/68 lg:text-xl">
                Partimos do briefing enviado pela Luiza, da reunião de diagnóstico e do conteúdo já construído
                pela Consult para organizar uma solução mais clara, moderna e preparada para representar
                o momento atual da empresa, com opções modulares de continuidade.
              </p>

              <a
                href="#direcao"
                className="mt-9 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-accent px-7 py-3 text-sm font-bold text-white transition hover:brightness-95"
              >
                Ver direção proposta
              </a>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm lg:p-8">
              <div className="rounded-2xl bg-[#064d4b] p-6">
                <img
                  src={CONSULT_LOGO}
                  alt="Consult Radiometria e Qualidade"
                  className="mx-auto h-28 w-auto object-contain"
                />
              </div>
              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
                O ponto de partida
              </p>
              <p className="mt-3 text-xl font-semibold leading-snug">
                O site precisa mostrar, em poucos segundos, quem é a Consult, o que ela faz, para quem
                trabalha, onde atua e por que é uma referência técnica.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#F7F7F7]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-3 text-sm text-black/55 md:flex-row md:items-center">
            <span>Material preparado pela Figueira Marketing exclusivamente para a Consult.</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
              Propósito & Performance
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
              O que entendemos do briefing
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-4xl">
              Não é apenas deixar o site mais bonito.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-black/60">
              A necessidade é reorganizar a presença digital da Consult para acompanhar a evolução da
              empresa e facilitar o entendimento de quem chega ao site.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Explicar rapidamente quem é a Consult e o que ela faz.",
              "Organizar Física Médica, Proteção Radiológica e Engenharia Clínica de forma evidente.",
              "Mostrar quem a empresa atende e onde atua.",
              "Dar mais força aos diferenciais, à experiência e à autoridade técnica.",
              "Preservar o conteúdo já construído e melhorar seu uso para SEO e geração de oportunidades.",
            ].map((item) => (
              <div key={item} className="flex gap-4 border-b border-black/10 pb-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-base leading-relaxed text-black/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="direcao" className="bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
              Prévia visual da proposta
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
              Esta é a direção visual que imaginamos para a nova Home da Consult.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-black/60">
              A prévia abaixo organiza a Home na sequência definida no briefing: apresentação clara da
              Consult, áreas de atuação, diferenciais, cobertura, públicos atendidos, conteúdo técnico e
              contato. É um conceito inicial para orientar a conversa, não a versão final do projeto.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-2xl shadow-black/10">
            <div className="flex items-center gap-2 border-b border-black/10 bg-white px-4 py-3 sm:px-6">
              <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
              <span className="ml-3 text-[10px] text-black/35 sm:text-xs">consult.med.br — proposta visual</span>
            </div>

            <div className="bg-[#EDF7F5]">
              <img
                src={APPROVED_MOCKUP}
                alt="Prévia aprovada da nova Home da Consult"
                className="block h-auto w-full"
                loading="eager"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-sm leading-relaxed text-black/50">
              O desenho final será refinado após a reunião, com validação de conteúdo, serviços, áreas
              de atuação, cobertura geográfica e informações institucionais.
            </p>
            <a
              href={APPROVED_MOCKUP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-black/15 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
            >
              Ver página completa
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {improvements.map((item, index) => {
              const Icon = [Sparkles, ShieldCheck, MapPinned, Smartphone, MessageCircle, Search, CheckCircle2][index];
              return (
                <div key={item} className="rounded-2xl bg-white p-5 ring-1 ring-black/10">
                  <Icon className="h-5 w-5 text-accent" />
                  <p className="mt-4 text-sm font-semibold leading-relaxed">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
              SEO e autoridade técnica
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-4xl">
              Melhorar a estrutura sem perder o que já foi conquistado.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-black/60">
            <p>
              O site atual já tem conteúdo técnico relevante e páginas que podem carregar histórico de
              busca. A proposta não é apagar isso para começar do zero.
            </p>
            <p>
              O trabalho previsto é preservar conteúdo estratégico, reorganizar títulos, hierarquia,
              links internos e páginas de serviço, além de dar mais visibilidade aos artigos técnicos
              que ajudam a construir autoridade.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
                Alguns trabalhos da Figueira
              </span>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
                Design e páginas pensados para contexto, marca e conversão.
              </h2>
            </div>
            <a
              href={BEHANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 transition hover:text-white"
            >
              Ver portfólio no Behance
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cases.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <div className="text-sm font-bold">{item.title}</div>
                  <div className="mt-2 text-xs text-white/45">Projeto publicado no Behance</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>


      <section id="investimento" className="bg-[#F7F7F7]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
                Investimento e possibilidades
              </span>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
                Um projeto de site. Cinco formas de continuar evoluindo.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-black/60">
              A implementação do novo site é a base do projeto. Depois da entrega, a Consult escolhe
              o nível de acompanhamento que faz mais sentido para a operação: desde uma manutenção
              mais simples até um ecossistema completo com tráfego, CRM, automações, IA e conteúdo.
            </p>
          </div>

          <div className="mt-12 rounded-[28px] bg-[#111111] p-7 text-white sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                Implementação do novo site
              </span>
              <h3 className="mt-3 font-display text-3xl font-black sm:text-4xl">
                R$ 2.900
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                Redesenho e implementação da nova estrutura da Consult, preservando o conteúdo estratégico,
                reorganizando as áreas de Física Médica, Proteção Radiológica e Engenharia Clínica e
                entregando a nova versão em até 30 dias.
              </p>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-5 lg:mt-0 lg:min-w-[260px]">
              <div className="text-xs uppercase tracking-[0.18em] text-white/40">Prazo máximo</div>
              <div className="mt-2 text-2xl font-black">30 dias</div>
              <div className="mt-2 text-sm text-white/55">A mensalidade escolhida começa após a entrega.</div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {proposalPlans.map((plan) => (
              <div
                key={plan.name}
                className={`flex h-full flex-col rounded-[24px] border p-6 sm:p-7 ${plan.featured ? "border-accent bg-white shadow-xl shadow-black/5 ring-1 ring-accent/10" : "border-black/10 bg-white"}`}
              >
                <div>
                  {plan.featured && (
                    <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                      Manutenção proativa
                    </span>
                  )}
                  <h3 className="mt-4 font-display text-2xl font-black tracking-tight">{plan.name}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-3xl font-black tracking-tight">{plan.price}</span>
                    <span className="pb-1 text-sm text-black/45">{plan.suffix}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-black/60">{plan.description}</p>
                </div>

                <div className="mt-6 space-y-3">
                  {plan.items.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-relaxed text-black/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappProposalUrl(plan.name, plan.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition hover:brightness-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  Aceitar este pacote
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
            <h3 className="font-display text-xl font-black">Condições do projeto</h3>
            <div className="mt-5 grid gap-4 text-sm leading-relaxed text-black/60 md:grid-cols-2">
              <p>
                Os pacotes mensais são modulares e podem evoluir conforme a necessidade da Consult.
                O investimento de mídia das campanhas não está incluído nas mensalidades de gestão.
              </p>
              <p>
                A Consult fornece informações técnicas, materiais institucionais e validações necessárias.
                Nos planos com conteúdo administrado pela Figueira, os materiais produzidos seguem para
                aprovação antes da publicação.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F7F7F7]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 rounded-[30px] border border-black/10 bg-white p-8 shadow-xl shadow-black/5 lg:grid-cols-[1fr_auto] lg:p-12">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
                Próximo passo
              </span>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
                A direção está aprovada?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-black/60">
                Escolha o pacote que melhor atende a Consult. Ao aceitar a proposta pelo WhatsApp,
                seguimos com a formalização do contrato, definição do cronograma e início da implementação.
              </p>
            </div>

            <a
              href={whatsappProposalUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 font-bold text-white shadow-xl shadow-accent/20 transition hover:brightness-95"
            >
              <MessageCircle className="h-5 w-5" />
              Aceitar proposta
            </a>
          </div>
        </div>
      </section>

      <a
        href={whatsappProposalUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 right-4 z-40 inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white shadow-2xl lg:hidden"
      >
        <MessageCircle className="h-4 w-4" />
        Aceitar proposta
      </a>
    </div>
  );
}
