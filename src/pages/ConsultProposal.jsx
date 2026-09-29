import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Radiation,
  Search,
  ShieldCheck,
  Stethoscope,
  Wrench,
  X,
} from "lucide-react";

const BRAND = {
  dark: "#075653",
  deep: "#064946",
  green: "#08A77F",
  mint: "#05D29D",
  lime: "#8AE600",
  orange: "#FF6B26",
  ink: "#123C3B",
};

const CDN =
  "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305";

const LOGO = `${CDN}/68d5471e-43b0-4285-8644-3407ac1e09ff.png`;
const HERO_IMAGE = `${CDN}/5ba95360-34a0-449d-9a24-4836ac1f137f.jpg`;
const BG_A = `${CDN}/5ba952d9-c3e4-48d7-9dc0-4716ac1f137f.jpg`;
const BG_B = `${CDN}/5ba954a4-90f8-4e55-a0d3-4b15ac1f137f.jpg`;

const WHATSAPP = "5514996710677";
const PHONE = "(14) 98161-0712";
const ADDRESS =
  "Avenida Doutor Vital Brasil, 1060, sala 205, Vila São Lúcio, Botucatu - SP";
const EMAIL = "radiometria@consult.med.br";

const waUrl = (message) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

const serviceAreas = [
  {
    slug: "fisica-medica",
    title: "Física Médica",
    icon: HeartPulse,
    summary:
      "Planejamento, dosimetria, comissionamento e controle de qualidade para serviços de diagnóstico por imagem e aplicações médicas.",
    intro:
      "Atuação técnica para apoiar instituições de saúde na qualidade, segurança e desempenho de tecnologias que utilizam radiação e sistemas de imagem.",
    bullets: [
      "Controle de qualidade de equipamentos radiológicos",
      "Dosimetria e avaliação técnica",
      "Comissionamento e aceitação de equipamentos",
      "Apoio técnico em radioterapia, medicina nuclear e diagnóstico por imagem",
      "Relatórios, documentação e suporte à conformidade",
    ],
    Icon: HeartPulse,
  },
  {
    slug: "protecao-radiologica",
    title: "Proteção Radiológica",
    icon: ShieldCheck,
    summary:
      "Avaliação de blindagens, monitoramento de doses, levantamento radiométrico, treinamentos e adequação às normas de radioproteção.",
    intro:
      "Soluções para reduzir riscos, apoiar a conformidade e estruturar rotinas de proteção radiológica em clínicas, hospitais e outros serviços.",
    bullets: [
      "Programa e Plano de Proteção Radiológica",
      "Levantamento radiométrico e testes de fuga",
      "Memorial de cálculo de blindagem",
      "Treinamentos e orientação de equipes",
      "Suporte técnico para licenciamento e adequação",
    ],
    Icon: Radiation,
  },
  {
    slug: "engenharia-clinica",
    title: "Engenharia Clínica",
    icon: Wrench,
    summary:
      "Gestão de equipamentos, avaliação técnica, testes de segurança e apoio ao ciclo de vida dos ativos de saúde.",
    intro:
      "Apoio técnico para instituições que precisam organizar, acompanhar e tomar decisões mais seguras sobre seus equipamentos e tecnologias em saúde.",
    bullets: [
      "Gestão e inventário de equipamentos",
      "Avaliação técnica e suporte à aquisição",
      "Testes de segurança e desempenho",
      "Acompanhamento de manutenção e documentação",
      "Apoio ao planejamento do ciclo de vida dos ativos",
    ],
    Icon: Wrench,
  },
];

const differentials = [
  {
    icon: Stethoscope,
    title: "Equipe técnica especializada",
    text: "Profissionais qualificados com experiência em radiometria, física médica, qualidade e apoio técnico em saúde.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento consultivo",
    text: "Escuta ativa e soluções adequadas à realidade de cada instituição.",
  },
  {
    icon: MapPin,
    title: "Visitas in loco + suporte online",
    text: "Atendimento presencial quando necessário e acompanhamento remoto para dar agilidade ao projeto.",
  },
  {
    icon: FileCheck2,
    title: "Relatórios ágeis e objetivos",
    text: "Documentação clara, técnica e focada nas necessidades do serviço.",
  },
  {
    icon: ShieldCheck,
    title: "Conformidade técnica",
    text: "Trabalho orientado pelas normas e requisitos aplicáveis a cada atividade.",
  },
  {
    icon: ClipboardCheck,
    title: "Atuação multidisciplinar",
    text: "Integração entre física, engenharia, qualidade e saúde para soluções mais completas.",
  },
];

const audiences = [
  ["Hospitais", "Suporte técnico para serviços de diferentes níveis de complexidade."],
  ["Clínicas", "Soluções sob medida para atendimentos de diferentes portes."],
  ["Diagnóstico por imagem", "Qualidade e segurança em radiologia, TC, RM e medicina nuclear."],
  ["Odontologia", "Proteção radiológica e conformidade para consultórios e clínicas."],
  ["Veterinária", "Suporte técnico para hospitais e clínicas veterinárias."],
  ["Outras instituições de saúde", "Apoio técnico para diferentes operações e necessidades do setor."],
];

const articles = [
  {
    tag: "TECNOLOGIA",
    title: "TC por contagem de fótons: uma nova era do diagnóstico por imagem",
    text: "Uma tecnologia que amplia possibilidades de qualidade de imagem e otimização de dose.",
    href: "http://www.consult.med.br/posts/?dt=tc-por-contagem-de-fotons-a-nova-era-do-diagnostico-por-imagem-chega-ao-mercado-S21NYVVOTGZITXQ4MkVjUWlheVFwUT09",
  },
  {
    tag: "RADIOPROTEÇÃO",
    title: "IAEA publica novos guias de segurança para proteção radiológica",
    text: "Atualizações técnicas relevantes para proteção de pacientes e trabalhadores.",
    href: "http://www.consult.med.br/posts/?dt=iaea-publica-novos-guias-de-seguranca-para-protecao-radiologica-de-pacientes-e-trabalhadores-TDhTVmhkOWx6c09YRXVQejRjYkNFQT09",
  },
  {
    tag: "DOSE E QUALIDADE",
    title: "25 anos de avanços em TC permitiram reduzir doses de radiação",
    text: "Evolução tecnológica, controle de qualidade e boas práticas continuam transformando a tomografia.",
    href: "http://www.consult.med.br/posts/?dt=25-anos-de-avancos-em-tc-permitiram-reduzir-doses-por-fator-de-2-a-10-mostra-revisao-no-ajr-a1hsTDlUemZMRWZrMXRJMURtK2JnZz09",
  },
];

function usePageMeta(title) {
  useEffect(() => {
    const previousTitle = document.title;
    const robots =
      document.querySelector('meta[name="robots"]') ||
      document.createElement("meta");
    const previousRobots = robots.getAttribute("content");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex,nofollow");
    if (!robots.parentNode) document.head.appendChild(robots);
    document.title = title;

    return () => {
      document.title = previousTitle;
      if (previousRobots) robots.setAttribute("content", previousRobots);
    };
  }, [title]);
}

function Logo({ className = "" }) {
  return (
    <img
      src={LOGO}
      alt="Consult Radiometria e Qualidade"
      className={`object-contain ${className}`}
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const nav = [
    ["Início", "/consult#inicio"],
    ["Sobre", "/consult#sobre"],
    ["Serviços", "/consult#areas"],
    ["Áreas de atuação", "/consult#areas"],
    ["Conteúdos", "/consult#conteudos"],
    ["Contato", "/consult#contato"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#075653]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/consult" className="flex items-center">
          <Logo className="h-12 w-auto max-w-[190px]" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href], index) => (
            <a
              key={label}
              href={href}
              className={`text-sm font-medium transition hover:text-[#8AE600] ${
                index === 0 ? "text-[#8AE600]" : "text-white/90"
              }`}
            >
              {label}
            </a>
          ))}
          <Search className="h-4 w-4 text-white/80" />
          <a
            href="/consult#contato"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF6B26] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:brightness-95"
          >
            <CalendarDays className="h-4 w-4" />
            Agendar reunião
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#064946] px-4 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5"
              >
                {label}
              </a>
            ))}
            <a
              href="/consult#contato"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF6B26] px-5 py-3 text-sm font-bold text-white"
            >
              <CalendarDays className="h-4 w-4" />
              Agendar reunião
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function SectionEyebrow({ children, dark = false, center = false }) {
  return (
    <div
      className={`mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] ${center ? "justify-center " : ""}${
        dark ? "text-white/70" : "text-[#4D7775]"
      }`}
    >
      <span className="h-0.5 w-8 bg-[#8AE600]" />
      {children}
    </div>
  );
}

function ContactForm() {
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Olá, equipe Consult. Gostaria de conversar sobre uma necessidade técnica.",
      "",
      `Nome: ${data.get("nome") || ""}`,
      `E-mail: ${data.get("email") || ""}`,
      `Instituição: ${data.get("instituicao") || ""}`,
      `Telefone: ${data.get("telefone") || ""}`,
      `Assunto: ${data.get("assunto") || ""}`,
      `Mensagem: ${data.get("mensagem") || ""}`,
    ].join("\n");

    window.open(waUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-white p-5 text-[#123C3B] shadow-2xl shadow-black/10 sm:p-7"
    >
      <h3 className="text-lg font-extrabold">Envie uma mensagem</h3>
      <p className="mt-1 text-xs leading-relaxed text-black/50">
        Preencha os dados abaixo e nossa equipe dará continuidade pelo WhatsApp.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input
          name="nome"
          required
          placeholder="Nome completo *"
          className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#08A77F]"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="E-mail *"
          className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#08A77F]"
        />
        <input
          name="instituicao"
          placeholder="Instituição / Empresa"
          className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#08A77F]"
        />
        <input
          name="telefone"
          required
          placeholder="Telefone / WhatsApp *"
          className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#08A77F]"
        />
      </div>

      <select
        name="assunto"
        className="mt-3 h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#08A77F]"
        defaultValue=""
      >
        <option value="" disabled>
          Como podemos ajudar?
        </option>
        <option>Física Médica</option>
        <option>Proteção Radiológica</option>
        <option>Engenharia Clínica</option>
        <option>Controle de Qualidade</option>
        <option>Treinamentos</option>
        <option>Outro assunto</option>
      </select>

      <textarea
        name="mensagem"
        rows={4}
        placeholder="Conte mais sobre sua necessidade..."
        className="mt-3 w-full resize-none rounded-lg border border-black/10 px-3 py-3 text-sm outline-none focus:border-[#08A77F]"
      />

      <button
        type="submit"
        className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white transition hover:brightness-95"
      >
        Agendar reunião
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-[10px] text-black/40">
        Seus dados serão usados somente para retorno sobre este contato.
      </p>
    </form>
  );
}

function Footer() {
  return (
    <footer className="bg-[#064946] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.3fr_.7fr_.9fr_1fr]">
          <div>
            <Logo className="h-14 w-auto max-w-[220px]" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Soluções técnicas para a área da saúde, com foco em segurança,
              qualidade e conformidade.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              Navegação
            </h4>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <a className="block hover:text-[#8AE600]" href="/consult#inicio">Início</a>
              <a className="block hover:text-[#8AE600]" href="/consult#sobre">Sobre</a>
              <a className="block hover:text-[#8AE600]" href="/consult#areas">Serviços</a>
              <a className="block hover:text-[#8AE600]" href="/consult#conteudos">Conteúdos</a>
              <a className="block hover:text-[#8AE600]" href="/consult#contato">Contato</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              Áreas de atuação
            </h4>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              {serviceAreas.map((area) => (
                <Link
                  key={area.slug}
                  className="block hover:text-[#8AE600]"
                  to={`/consult/areas/${area.slug}`}
                >
                  {area.title}
                </Link>
              ))}
              <span className="block">Controle de Qualidade</span>
              <span className="block">Treinamentos</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              Contato
            </h4>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              <div className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8AE600]" />
                <span>{ADDRESS}</span>
              </div>
              <a className="flex gap-2 hover:text-white" href="tel:+5514981610712">
                <Phone className="h-4 w-4 shrink-0 text-[#8AE600]" />
                {PHONE}
              </a>
              <a className="flex gap-2 hover:text-white" href={`mailto:${EMAIL}`}>
                <Mail className="h-4 w-4 shrink-0 text-[#8AE600]" />
                {EMAIL}
              </a>
              <a
                className="flex gap-2 hover:text-white"
                href={waUrl("Olá, equipe Consult. Gostaria de falar com vocês.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-[#8AE600]" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Consult Radiometria e Qualidade. Todos os direitos reservados.</span>
          <span>Ambiente de homologação do novo site.</span>
        </div>
      </div>
    </footer>
  );
}

export default function ConsultProposal() {
  usePageMeta("Consult Radiometria e Qualidade | Novo site");

  return (
    <div className="min-h-screen bg-white font-sans text-[#123C3B]">
      <Header />

      <main>
        <section
          id="inicio"
          className="relative overflow-hidden bg-[#075653] text-white"
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url("${BG_A}")`,
              backgroundPosition: "left bottom",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute -left-28 top-20 h-72 w-72 rounded-full border border-white/5" />
          <div className="absolute left-16 top-6 h-32 w-32 rounded-full border border-dashed border-white/10" />

          <div className="relative mx-auto grid min-h-[580px] max-w-7xl items-stretch lg:grid-cols-[1.02fr_.98fr]">
            <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
              <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/65">
                Segurança hoje. Saúde sempre.
              </div>
              <h1 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Soluções técnicas
                <br />
                para a área da <span className="text-[#8AE600]">saúde</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 lg:text-lg">
                Atuamos com Física Médica, Proteção Radiológica, Controle de
                Qualidade e Engenharia Clínica, atendendo hospitais, clínicas,
                centros de diagnóstico por imagem, odontologia, medicina
                veterinária e outras instituições de saúde.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contato"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold text-white shadow-xl shadow-black/10 transition hover:brightness-95"
                >
                  <CalendarDays className="h-4 w-4" />
                  Agendar reunião
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={waUrl("Olá, equipe Consult. Gostaria de conversar sobre uma necessidade técnica.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#8AE600]/70 px-6 py-3 text-sm font-extrabold text-[#B8FF51] transition hover:bg-[#8AE600] hover:text-[#075653]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden lg:min-h-full">
              <img
                src={HERO_IMAGE}
                alt="Profissional da área da saúde"
                className="absolute inset-0 h-full w-full scale-110 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#075653] via-[#075653]/30 to-transparent lg:from-[#075653]/70" />
              <div className="absolute bottom-0 right-0 h-24 w-2/3 rounded-tl-[100%] bg-[#05D29D]/90" />
              <div className="absolute bottom-0 right-0 h-14 w-1/2 rounded-tl-[100%] bg-[#8AE600]" />
              <div className="absolute right-7 top-7 hidden max-w-[150px] border-l-2 border-[#8AE600] pl-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70 sm:block">
                Tecnologia, qualidade e pessoas em saúde
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-4 py-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              [ShieldCheck, "Mais segurança", "para pacientes e profissionais"],
              [FileCheck2, "Conformidade", "com as normas vigentes"],
              [Wrench, "Tecnologia", "a serviço da qualidade"],
              [Stethoscope, "Experiência", "em diferentes áreas da saúde"],
            ].map(([Icon, title, text]) => (
              <div key={title} className="flex items-center gap-3 px-3 py-4 sm:px-5">
                <Icon className="h-8 w-8 shrink-0 text-[#08A77F]" />
                <div>
                  <div className="text-sm font-extrabold">{title}</div>
                  <div className="text-xs text-black/50">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="areas" className="relative overflow-hidden bg-[#F4FBFA]">
          <div className="absolute -left-28 top-12 h-80 w-80 rounded-full border-[28px] border-[#DFF4EF]/65" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full border-[34px] border-[#E7F6F3]/70" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <SectionEyebrow center>Nossas especialidades</SectionEyebrow>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Nossas <span className="text-[#075653]">áreas de</span>{" "}
                <span className="text-[#79D900]">atuação</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-black/55">
                Conhecimento multidisciplinar para uma saúde mais segura,
                eficiente e de qualidade.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {serviceAreas.map((area, index) => {
                const Icon = area.Icon;
                return (
                  <Link
                    key={area.slug}
                    to={`/consult/areas/${area.slug}`}
                    className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg shadow-[#075653]/5 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div
                      className="relative h-44 overflow-hidden"
                      style={{
                        background:
                          index === 0
                            ? "linear-gradient(135deg,#083f3d,#0d6e67)"
                            : index === 1
                            ? "linear-gradient(135deg,#c7d0ca,#f3f6f5)"
                            : "linear-gradient(135deg,#0b5350,#d9f7ee)",
                      }}
                    >
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("${index === 1 ? BG_B : BG_A}")`, backgroundSize: "cover" }} />
                      <Icon className={`absolute bottom-5 left-6 h-16 w-16 ${
                        index === 1 ? "text-[#075653]" : "text-white/80"
                      }`} />
                      <div className="absolute right-5 top-5 rounded-full bg-white/90 p-2.5 text-[#08A77F] shadow">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-black">{area.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-black/55">
                        {area.summary}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#08A77F]">
                        Saiba mais
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="sobre" className="bg-[#F4FBFA]">
          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <SectionEyebrow center>Diferenciais</SectionEyebrow>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Por que escolher a <span className="text-[#79D900]">Consult?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-black/55">
                Mais que serviços, oferecemos parceria técnica e compromisso
                com a segurança.
              </p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {differentials.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#08A77F] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/52">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `url("${BG_B}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <SectionEyebrow dark>Onde atuamos</SectionEyebrow>
              <h2 className="text-4xl font-black leading-none tracking-tight sm:text-5xl">
                Atendimento em
                <br />
                <span className="text-[#8AE600]">todo o Brasil</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/72">
                Estrutura para visitas técnicas, suporte remoto e
                acompanhamento contínuo, de acordo com a necessidade de cada
                serviço.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contato"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold"
                >
                  <CalendarDays className="h-4 w-4" />
                  Agendar reunião
                </a>
                <a
                  href={waUrl("Olá, equipe Consult. Gostaria de saber sobre atendimento na minha região.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-[#8AE600]/70 px-6 py-3 text-sm font-extrabold text-[#B8FF51]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <div className="relative min-h-[340px]">
              <div className="absolute inset-0 rounded-[38px] border border-white/10 bg-white/[0.04]" />
              <div className="absolute left-[20%] top-[18%] h-4 w-4 rounded-full bg-[#8AE600] shadow-[0_0_28px_8px_rgba(138,230,0,.35)]" />
              <div className="absolute left-[45%] top-[29%] h-3 w-3 rounded-full bg-[#8AE600] shadow-[0_0_26px_7px_rgba(138,230,0,.3)]" />
              <div className="absolute left-[63%] top-[44%] h-4 w-4 rounded-full bg-[#8AE600] shadow-[0_0_28px_8px_rgba(138,230,0,.35)]" />
              <div className="absolute left-[36%] top-[58%] h-3 w-3 rounded-full bg-[#8AE600] shadow-[0_0_26px_7px_rgba(138,230,0,.3)]" />
              <div className="absolute left-[52%] top-[73%] h-4 w-4 rounded-full bg-[#8AE600] shadow-[0_0_28px_8px_rgba(138,230,0,.35)]" />
              <div className="absolute left-[25%] top-[22%] h-[1px] w-[44%] origin-left rotate-[23deg] bg-gradient-to-r from-[#8AE600]/70 to-transparent" />
              <div className="absolute left-[40%] top-[34%] h-[1px] w-[34%] origin-left rotate-[41deg] bg-gradient-to-r from-[#8AE600]/70 to-transparent" />
              <div className="absolute left-[36%] top-[60%] h-[1px] w-[32%] origin-left -rotate-[24deg] bg-gradient-to-r from-[#8AE600]/70 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-44 w-44 items-center justify-center rounded-[42%_58%_53%_47%/54%_40%_60%_46%] border border-[#8AE600]/35 bg-[#08A77F]/30 shadow-[inset_0_0_60px_rgba(138,230,0,.08)] sm:h-56 sm:w-56">
                  <MapPin className="h-20 w-20 text-[#8AE600]/80" />
                </div>
              </div>
              <div className="absolute bottom-6 right-6 rounded-xl border border-white/10 bg-[#064946]/85 p-4 text-xs">
                <div className="font-bold uppercase tracking-[0.18em] text-white/45">
                  Atendimento por região
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-white/80">
                  {["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"].map(
                    (region) => (
                      <span key={region} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#8AE600]" />
                        {region}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F4FBFA]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <SectionEyebrow center>Quem atendemos</SectionEyebrow>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Ao lado de quem <span className="text-[#79D900]">cuida da vida</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-black/55">
                Soluções para diferentes perfis de instituições de saúde, com
                foco em segurança, qualidade e conformidade.
              </p>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {audiences.map(([title, text], index) => {
                const Icon = [Stethoscope, HeartPulse, Search, ShieldCheck, Radiation, Wrench][index];
                return (
                  <div
                    key={title}
                    className="rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm"
                  >
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#E2F7F1] text-[#08A77F]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-sm font-extrabold">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-black/48">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="conteudos" className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionEyebrow>Conhecimento que gera valor</SectionEyebrow>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Conteúdo técnico e <span className="text-[#79D900]">atualizações</span>
                </h2>
                <p className="mt-3 text-sm text-black/50">
                  Artigos, novidades e insights sobre radiometria, qualidade e
                  segurança em saúde.
                </p>
              </div>
              <a
                href="http://www.consult.med.br/posts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#08A77F] px-5 py-3 text-sm font-bold text-[#08A77F] transition hover:bg-[#08A77F] hover:text-white"
              >
                Ver todos os conteúdos
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {articles.map((article, index) => (
                <a
                  key={article.title}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg shadow-black/5 transition hover:-translate-y-1"
                >
                  <div
                    className="flex h-44 items-center justify-center overflow-hidden"
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(135deg,#0b5e59,#8AE600)"
                          : index === 1
                          ? "linear-gradient(135deg,#ced9d5,#075653)"
                          : "linear-gradient(135deg,#075653,#05D29D)",
                    }}
                  >
                    {index === 0 ? (
                      <Search className="h-20 w-20 text-white/70" />
                    ) : index === 1 ? (
                      <Radiation className="h-20 w-20 text-white/75" />
                    ) : (
                      <HeartPulse className="h-20 w-20 text-white/75" />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#08A77F]">
                      {article.tag}
                    </div>
                    <h3 className="mt-3 text-lg font-extrabold leading-snug">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-black/52">
                      {article.text}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#08A77F]">
                      Ler artigo
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="relative overflow-hidden bg-[#075653] text-white">
          <div
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage: `url("${BG_A}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
            <div className="flex flex-col justify-center">
              <SectionEyebrow dark>Contato</SectionEyebrow>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Fale com a nossa <span className="text-[#8AE600]">equipe</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
                Estamos prontos para entender sua necessidade e orientar o
                melhor caminho técnico para sua instituição.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contato"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold"
                >
                  <CalendarDays className="h-4 w-4" />
                  Agendar reunião
                </a>
                <a
                  href={waUrl("Olá, equipe Consult. Gostaria de conversar sobre uma necessidade técnica.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-[#8AE600]/70 px-6 py-3 text-sm font-extrabold text-[#B8FF51]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </div>

              <div className="mt-8 space-y-3 text-sm text-white/75">
                <a href="tel:+5514981610712" className="flex items-center gap-3 hover:text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08A77F]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="block text-white">Ligue para nós</strong>
                    {PHONE}
                  </span>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08A77F]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="block text-white">E-mail</strong>
                    {EMAIL}
                  </span>
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />

      <a
        href={waUrl("Olá, equipe Consult. Gostaria de falar com vocês.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#08A77F] text-white shadow-2xl transition hover:scale-105"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

export function ConsultAreaPage() {
  const { slug } = useParams();
  const area = useMemo(
    () => serviceAreas.find((item) => item.slug === slug),
    [slug]
  );

  usePageMeta(
    area
      ? `${area.title} | Consult Radiometria e Qualidade`
      : "Área de atuação | Consult"
  );

  if (!area) {
    return (
      <div className="min-h-screen bg-[#F4FBFA] text-[#123C3B]">
        <Header />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-3xl font-black">Área não encontrada</h1>
          <Link
            to="/consult"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#08A77F] px-5 py-3 font-bold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = area.Icon;

  return (
    <div className="min-h-screen bg-white text-[#123C3B]">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url("${BG_B}")`,
              backgroundSize: "cover",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <Link
              to="/consult#areas"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para áreas de atuação
            </Link>

            <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_.7fr]">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#08A77F]">
                  <Icon className="h-7 w-7" />
                </div>
                <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
                  {area.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/72">
                  {area.intro}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#8AE600]">
                  Principais frentes
                </div>
                <div className="mt-5 space-y-4">
                  {area.bullets.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8AE600]" />
                      <span className="text-sm leading-relaxed text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F4FBFA]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <SectionEyebrow>Como trabalhamos</SectionEyebrow>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Técnica, clareza e acompanhamento em cada etapa.
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["1", "Entendimento da necessidade", "Levantamos o contexto, o escopo e os requisitos da instituição."],
                  ["2", "Planejamento técnico", "Definimos método, documentação e etapas necessárias para execução."],
                  ["3", "Execução e registro", "Realizamos as atividades previstas e documentamos os resultados."],
                  ["4", "Orientação e continuidade", "Entregamos recomendações e apoiamos os próximos passos quando necessário."],
                ].map(([number, title, text]) => (
                  <div key={number} className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="text-sm font-black text-[#08A77F]">{number}</div>
                    <h3 className="mt-3 font-extrabold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/52">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="rounded-[30px] bg-[#075653] px-7 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8AE600]">
                  Fale com um especialista
                </div>
                <h2 className="mt-3 text-3xl font-black">
                  Precisa de apoio em {area.title.toLowerCase()}?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
                  Conte o contexto da sua instituição e nossa equipe retorna para
                  entender a necessidade e orientar os próximos passos.
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0">
                <a
                  href="/consult#contato"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold"
                >
                  Agendar reunião
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={waUrl(`Olá, equipe Consult. Gostaria de falar sobre ${area.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-[#8AE600]/70 px-6 py-3 text-sm font-extrabold text-[#B8FF51]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
