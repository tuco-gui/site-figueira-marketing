import React, { useEffect } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  MapPinned,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

const CALENDAR_URL = "https://calendar.app.google/AAm3kdGvNd2s5QWv7";
const CONSULT_URL = "https://www.consult.med.br/";
const BEHANCE_URL = "https://www.behance.net/figueira_marketing";
const CONSULT_LOGO =
  "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/68d54790-6c3c-48c4-b8cb-7143ac1e0fec.png";

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
        <div className="absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-12 h-[280px] w-[280px] rounded-full border border-[#C4191F]/25" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
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
                Partimos do briefing enviado pela Luiza e do conteúdo já construído pela Consult para
                organizar uma direção de site mais clara, moderna e preparada para representar o
                momento atual da empresa.
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
              Do site atual à nova direção
            </span>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
              Uma evolução visível, sem jogar fora o que já funciona.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-black/60">
              A proposta parte do conteúdo existente, reorganiza a leitura da marca e cria uma Home
              mais objetiva. Abaixo está uma leitura de “antes e depois” do que queremos mudar.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[26px] border border-black/10 bg-white">
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                <div>
                  <div className="text-sm font-black">Hoje</div>
                  <div className="text-xs text-black/45">Mensagem dispersa e serviços pouco hierarquizados</div>
                </div>
                <a
                  href={CONSULT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-black/55 hover:text-black"
                >
                  Abrir site atual
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="bg-[#064d4b] p-5 text-white">
                <div className="flex items-center gap-4 border-b border-white/15 pb-4">
                  <img src={CONSULT_LOGO} alt="" className="h-12 w-auto object-contain" />
                  <div className="ml-auto flex gap-4 text-[10px] text-white/60">
                    <span>Empresa</span>
                    <span>Serviços</span>
                    <span>Contato</span>
                  </div>
                </div>
                <div className="py-12">
                  <div className="max-w-sm text-2xl font-bold leading-tight">
                    Segurança, proteção radiológica e controle de qualidade
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                    Muito conteúdo técnico está presente, mas a evolução da Consult e a amplitude da
                    operação ainda não aparecem de forma imediata.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-xl shadow-black/5">
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                <div>
                  <div className="text-sm font-black">Direção proposta</div>
                  <div className="text-xs text-black/45">Clareza de posicionamento e conversão</div>
                </div>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                  Conceito
                </span>
              </div>

              <div className="bg-[#064d4b] p-5 text-white">
                <div className="flex items-center gap-4 border-b border-white/15 pb-4">
                  <img src={CONSULT_LOGO} alt="" className="h-12 w-auto object-contain" />
                  <div className="ml-auto hidden gap-4 text-[10px] text-white/70 sm:flex">
                    <span>Soluções</span>
                    <span>Quem atendemos</span>
                    <span>Conteúdo</span>
                    <span>Contato</span>
                  </div>
                </div>
                <div className="grid gap-6 py-10 sm:grid-cols-[1.15fr_.85fr]">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#A8F53A]">
                      Soluções técnicas para a área da saúde
                    </div>
                    <div className="mt-3 text-3xl font-black leading-[1.05]">
                      Física Médica, Proteção Radiológica e Engenharia Clínica com leitura imediata.
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/65">
                      A Home passa a explicar rapidamente quem é a Consult, para quem trabalha e como
                      pode ajudar.
                    </p>
                    <div className="mt-5 inline-flex rounded-lg bg-[#FF6A3D] px-4 py-2 text-xs font-bold">
                      Solicitar contato
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold">Três áreas centrais</div>
                    <div className="mt-3 space-y-2 text-[11px] text-white/70">
                      <div className="rounded-lg bg-white/10 px-3 py-2">Física Médica</div>
                      <div className="rounded-lg bg-white/10 px-3 py-2">Proteção Radiológica</div>
                      <div className="rounded-lg bg-white/10 px-3 py-2">Engenharia Clínica</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-black/10 bg-white p-6 sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <h3 className="font-display text-2xl font-black">Hero + menu</h3>
                <p className="mt-4 text-sm leading-relaxed text-black/60">
                  O topo deixa de ser apenas institucional e passa a funcionar como uma apresentação
                  rápida da empresa. O menu também acompanha a nova lógica de serviços e públicos.
                </p>

                <h3 className="mt-9 font-display text-2xl font-black">Áreas de atuação</h3>
                <p className="mt-4 text-sm leading-relaxed text-black/60">
                  As três frentes principais aparecem logo após o Hero e cada uma fica preparada para
                  evoluir para uma página própria, com conteúdo técnico, aplicações e chamadas para
                  contato.
                </p>
              </div>

              <div className="overflow-hidden rounded-[22px] border border-black/10 bg-[#F8FBFA]">
                <div className="flex items-center gap-2 border-b border-black/10 bg-white px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                  <span className="ml-3 text-[10px] text-black/35">consult.med.br — conceito</span>
                </div>

                <div className="bg-[#064d4b] px-5 py-8 text-white sm:px-7">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#A8F53A]">
                    Soluções técnicas para a área da saúde
                  </div>
                  <div className="mt-3 max-w-xl text-3xl font-black leading-tight">
                    Segurança, qualidade e engenharia para serviços de saúde.
                  </div>
                  <div className="mt-5 inline-flex rounded-md bg-[#FF6A3D] px-4 py-2 text-[11px] font-bold">
                    Falar com a equipe
                  </div>
                </div>

                <div className="grid gap-3 p-5 sm:grid-cols-3">
                  {["Física Médica", "Proteção Radiológica", "Engenharia Clínica"].map((item) => (
                    <div key={item} className="rounded-xl border border-black/10 bg-white p-4">
                      <div className="mb-4 h-8 w-8 rounded-lg bg-[#0AA77D]" />
                      <div className="text-sm font-black">{item}</div>
                      <div className="mt-2 h-2 w-full rounded bg-black/5" />
                      <div className="mt-2 h-2 w-4/5 rounded bg-black/5" />
                    </div>
                  ))}
                </div>

                <div className="border-t border-black/10 bg-white p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-[#F5F7F7] p-4">
                      <div className="text-xs font-black">Diferenciais</div>
                      <div className="mt-2 text-[10px] text-black/45">Autoridade e prova técnica</div>
                    </div>
                    <div className="rounded-xl bg-[#064d4b] p-4 text-white">
                      <div className="text-xs font-black">Onde atuamos</div>
                      <div className="mt-2 text-[10px] text-white/55">Mapa + cobertura</div>
                    </div>
                    <div className="rounded-xl bg-[#F5F7F7] p-4">
                      <div className="text-xs font-black">Quem atendemos</div>
                      <div className="mt-2 text-[10px] text-black/45">Segmentação por público</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      <section className="relative overflow-hidden bg-[#F7F7F7]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 rounded-[30px] border border-black/10 bg-white p-8 shadow-xl shadow-black/5 lg:grid-cols-[1fr_auto] lg:p-12">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F]">
                Próximo passo
              </span>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
                Vamos conversar sobre o projeto?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-black/60">
                Essa é uma primeira direção. Na reunião podemos validar prioridades, detalhar o escopo,
                entender os serviços que precisam entrar no novo site e fechar os próximos passos.
              </p>
            </div>

            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 font-bold text-white shadow-xl shadow-accent/20 transition hover:brightness-95"
            >
              <CalendarDays className="h-5 w-5" />
              Agendar reunião
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
