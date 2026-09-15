import React, { useEffect } from "react";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Layers3,
  MapPinned,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const CALENDAR_URL = "https://calendar.app.google/AAm3kdGvNd2s5QWv7";
const CONSULT_LOGO =
  "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/68d54790-6c3c-48c4-b8cb-7143ac1e0fec.png";

const homeSections = [
  "Hero + Menu",
  "Nossas Áreas de Atuação",
  "Diferenciais",
  "Onde Atuamos",
  "Quem Atendemos",
  "Conteúdo Técnico e Atualizações",
  "Contato",
];

const improvements = [
  {
    icon: Layers3,
    title: "Menu reorganizado",
    text: "Navegação mais simples, estratégica e preparada para o crescimento do site.",
  },
  {
    icon: Target,
    title: "Hero mais claro",
    text: "Quem entra entende rapidamente quem é a Consult, o que ela faz e para quem trabalha.",
  },
  {
    icon: ShieldCheck,
    title: "Áreas com páginas próprias",
    text: "Física Médica, Proteção Radiológica e Engenharia Clínica ganham hierarquia e profundidade.",
  },
  {
    icon: Sparkles,
    title: "Visual mais atual",
    text: "Uma presença mais profissional, humana e coerente com o tamanho atual da operação.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    text: "Experiência pensada desde o início para celular, sem adaptar o desktop de última hora.",
  },
  {
    icon: MessageCircle,
    title: "Mais pontos de conversão",
    text: "WhatsApp, formulários e chamadas para contato aparecem nos momentos certos da jornada.",
  },
  {
    icon: MapPinned,
    title: "Cobertura geográfica clara",
    text: "O mapa continua no projeto, mas passa a explicar a área de atuação de forma estratégica.",
  },
  {
    icon: Search,
    title: "SEO preservado e fortalecido",
    text: "Conteúdo técnico existente não é descartado: será reorganizado para autoridade e busca.",
  },
];

const briefing = [
  "Explicar rapidamente quem é a Consult",
  "Deixar claro o que a empresa faz",
  "Mostrar para quem trabalha",
  "Apresentar onde atua",
  "Reforçar diferenciais e autoridade técnica",
];

export default function ConsultProposal() {
  useEffect(() => {
    document.title = "Prévia estratégica para Consult | Figueira Marketing";

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
        <div className="absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full border border-white/10" />
        <div className="absolute -right-16 -top-16 h-[300px] w-[300px] rounded-full border border-[#C4191F]/25" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C4191F]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
                  Figueira Marketing • Prévia estratégica
                </span>
              </div>

              <h1 className="max-w-4xl font-display text-4xl font-black leading-[1.03] tracking-[-0.035em] sm:text-5xl lg:text-7xl">
                Uma proposta para o próximo momento digital da{" "}
                <span className="text-[#C4191F]">Consult.</span>
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/68 lg:text-xl">
                Estudamos o briefing enviado, o site atual e a forma como a Consult apresenta hoje seus
                serviços. A partir disso, organizamos uma primeira direção para um site mais claro,
                profissional e preparado para gerar novas oportunidades comerciais.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#direcao"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#111111] transition hover:bg-white/90"
                >
                  Ver direção proposta
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white transition hover:brightness-95"
                >
                  <CalendarDays className="h-4 w-4" />
                  Agendar reunião
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm lg:p-8">
              <div className="mb-7 rounded-2xl bg-[#064d4b] p-6">
                <img
                  src={CONSULT_LOGO}
                  alt="Consult Radiometria e Qualidade"
                  className="mx-auto h-28 w-auto object-contain"
                />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
                O desafio central
              </p>
              <p className="mt-3 text-xl font-semibold leading-snug">
                Fazer o site representar o tamanho, a evolução e a autoridade técnica que a Consult já
                possui fora dele.
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
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
              01 • O que entendemos
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-4xl">
              O briefing pede mais do que um redesign.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-black/60">
              A necessidade não é apenas modernizar a aparência. O novo site precisa organizar o
              posicionamento da Consult e transformar conhecimento técnico em clareza para o mercado.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {briefing.map((item, index) => (
              <div
                key={item}
                className={"rounded-2xl border border-black/10 bg-white p-6 " +
                  (index === briefing.length - 1 ? "sm:col-span-2" : "")}
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="font-semibold leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="direcao" className="bg-[#111111] text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-12 max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
              02 • Estrutura sugerida
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
              Uma Home que responde às principais perguntas na ordem certa.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {homeSections.map((item, index) => (
              <div key={item} className="min-h-[150px] bg-[#111111] p-6 lg:p-7">
                <div className="font-mono text-xs text-[#C4191F]">0{index + 1}</div>
                <div className="mt-8 text-lg font-bold">{item}</div>
              </div>
            ))}
            <div className="flex min-h-[150px] items-end bg-[#C4191F] p-6 text-white lg:p-7">
              <p className="text-sm font-semibold leading-relaxed">
                Cada área de atuação poderá evoluir para uma página própria com conteúdo, aplicações,
                provas técnicas e conversão.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
              03 • O que muda na prática
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
              Clareza, autoridade e conversão trabalhando juntas.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-black/55">
            O objetivo é melhorar a experiência sem perder o que o site atual já construiu de valor.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {improvements.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group rounded-2xl border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111111] text-white transition group-hover:bg-[#C4191F]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-black/55">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[26px] bg-white p-8 ring-1 ring-black/10 lg:p-10">
              <FileText className="h-8 w-8 text-[#C4191F]" />
              <h2 className="mt-7 font-display text-3xl font-black tracking-tight">
                SEO e autoridade técnica
              </h2>
              <p className="mt-5 leading-relaxed text-black/60">
                O conteúdo técnico já publicado não deve ser apagado ou tratado como detalhe. A proposta
                é preservar o valor acumulado, melhorar organização, hierarquia, links internos e
                transformar artigos e materiais técnicos em prova de autoridade e porta de entrada
                orgânica.
              </p>
            </div>

            <div className="rounded-[26px] bg-[#111111] p-8 text-white lg:p-10">
              <Users className="h-8 w-8 text-accent" />
              <h2 className="mt-7 font-display text-3xl font-black tracking-tight">
                O papel desta prévia
              </h2>
              <p className="mt-5 leading-relaxed text-white/62">
                Esta não é a versão final do projeto. É uma primeira leitura estratégica para mostrar
                como entendemos o desafio e dar uma base concreta para a próxima conversa. Na reunião,
                validamos escopo, prioridades, conteúdo, páginas e detalhes comerciais.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#C4191F] text-white">
        <div className="absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/20" />
        <div className="absolute -right-2 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-white/20" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                Próximo passo
              </span>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
                Vamos validar essa direção juntos?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/78">
                Agende uma conversa com a Figueira Marketing para alinharmos prioridades, escopo e os
                próximos passos do novo site da Consult.
              </p>
            </div>

            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-bold text-[#111111] shadow-xl transition hover:-translate-y-0.5 hover:bg-white/95"
            >
              <CalendarDays className="h-5 w-5" />
              Agendar reunião
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <a
        href={CALENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 left-4 right-4 z-40 inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white shadow-2xl lg:hidden"
      >
        <CalendarDays className="h-4 w-4" />
        Agendar reunião
      </a>
    </div>
  );
}
