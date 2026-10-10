import React, { useEffect, useMemo, useState } from "react";
import { ConsultHeader } from "@/components/ConsultSiteShell";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  PawPrint,
  Phone,
  Settings,
  ShieldCheck,
  Smile,
  Stethoscope,
  UsersRound,
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
const APPROVED_MOCKUP = "https://figueira-prospect-assets.vercel.app/-home-aprovada.png";
const AREA_PHYS_IMAGE = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba95360-34a0-449d-9a24-4836ac1f137f.jpg";
const AREA_PROTECTION_IMAGE = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba952d9-c3e4-48d7-9dc0-4716ac1f137f.jpg";
const AREA_ENGINEERING_IMAGE = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba954a4-90f8-4e55-a0d3-4b15ac1f137f.jpg";
const ARTICLE_TRAINING_IMAGE = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba952d9-c3e4-48d7-9dc0-4716ac1f137f.jpg";
const ARTICLE_IAEA_IMAGE = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba95360-34a0-449d-9a24-4836ac1f137f.jpg";
const ARTICLE_ARC_IMAGE = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba954a4-90f8-4e55-a0d3-4b15ac1f137f.jpg";

const WHATSAPP = "5514981610712";
const PHONE = "(14) 98161-0712";
const ADDRESS =
  "Sede: Matão/SP · Atendimento: Av. Dr. Vital Brasil, 1060, sala 205 – Botucatu Home Trade Center, Botucatu/SP";
const EMAIL = "radiometria@consult.med.br";
const LEAD_ENDPOINT = "https://jinhjdvrjvmammumbacz.supabase.co/functions/v1/-lead";

const waUrl = (message) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

const serviceAreas = [
  {
    slug: "fisica-medica",
    title: "Física Médica",
    summary: "Controle de Qualidade, medições e laudos técnicos para equipamentos de diagnóstico por imagem.",
    image: AREA_PHYS_IMAGE,
    intro: "Atuação técnica para apoiar instituições de saúde na qualidade, segurança e desempenho de tecnologias que utilizam radiação e sistemas de imagem.",
    bullets: [
      "Controle de qualidade de equipamentos radiológicos",
      "Dosimetria e avaliação técnica",
      "Comissionamento e aceitação de equipamentos",
      "Controle de Qualidade, medições e documentação técnica em diagnóstico por imagem",
      "Relatórios, documentação e suporte à conformidade",
    ],
    Icon: HeartPulse,
  },
  {
    slug: "protecao-radiologica",
    title: "Proteção Radiológica",
    summary: "Avaliação de blindagens, monitoramento de doses, treinamento e adequação às normas de radioproteção.",
    image: AREA_PROTECTION_IMAGE,
    intro: "Soluções para reduzir riscos, apoiar a conformidade e estruturar rotinas de proteção radiológica em clínicas, hospitais e outros serviços.",
    bullets: [
      "Programa e Plano de Proteção Radiológica",
      "Levantamento radiométrico e testes de fuga",
      "Memorial de cálculo de blindagem",
      "Treinamentos e orientação de equipes",
      "Suporte técnico para licenciamento e adequação",
    ],
    Icon: ShieldCheck,
  },
  {
    slug: "engenharia-clinica",
    title: "Consult Engenharia Clínica",
    summary: "Ensaios de segurança elétrica e desempenho, manutenção preventiva, reverificação e qualificação térmica com laudo por equipamento.",
    image: AREA_ENGINEERING_IMAGE,
    intro: "Ensaios e medições para documentar segurança e desempenho de equipamentos de saúde, com histórico técnico por equipamento.",
    bullets: [
      "Ensaio de segurança elétrica",
      "Ensaio de desempenho",
      "Manutenção preventiva",
      "Reverificação",
      "Qualificação térmica",
    ],
    Icon: Wrench,
  },
];

const differentials = [
  { icon: UsersRound, title: "Equipe técnica especializada", text: "Profissionais qualificados e com ampla experiência nas áreas de radiometria, física médica e qualidade." },
  { icon: MessageCircle, title: "Atendimento consultivo", text: "Escuta ativa e soluções personalizadas para a realidade de cada instituição." },
  { icon: MapPin, title: "Visitas in loco + assessoria online", text: "Atendimento em todo o Brasil, com equipes em campo em São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais." },
  { icon: FileText, title: "Prazo definido para o laudo", text: "Laudo emitido em até 7 dias após as medições." },
  { icon: ShieldCheck, title: "Conformidade técnica", text: "Alinhamento com as normas vigentes da Anvisa e da Vigilância Sanitária." },
  { icon: Settings, title: "Mesma visita", text: "Radiologia e demais equipamentos na mesma visita, conforme disponibilidade da agenda na sua região." },
];

const audiences = [
  ["Hospitais", "Atendimento a gestores de hospitais, Santas Casas, Unimeds e fundações."],
  ["Clínicas", "Atendimento a responsáveis técnicos e gestores de clínicas de imagem."],
  ["Diagnóstico por imagem", "Qualidade e segurança em radiologia, tomografia, ressonância magnética e outras modalidades de diagnóstico por imagem."],
  ["Odontologia", "Proteção radiológica e conformidade para consultórios e clínicas odontológicas."],
  ["Veterinária", "Suporte técnico para hospitais e clínicas veterinárias."],
  ["Outras instituições de saúde", "Atendimento a centros de pesquisa, ensino e demais serviços da área da saúde."],
];

const articles = [
  {
    tag: "TREINAMENTOS",
    date: "04 MAI 2026",
    title: "Consult fortalece educação continuada com nova plataforma de cursos digitais",
    text: "Conheça a plataforma de treinamentos da Consult para atualização em radioproteção e segurança.",
    image: ARTICLE_TRAINING_IMAGE,
    href: "/blog/educacao-continuada-cursos-digitais-radioprotecao",
  },
  {
    tag: "CONTROLE DE QUALIDADE",
    date: "13 FEV 2023",
    title: "Publicado IAEA HHS 47, um guia prático de controle de qualidade de equipamentos",
    text: "Material técnico de referência para testes de controle de qualidade em radiologia diagnóstica.",
    image: ARTICLE_IAEA_IMAGE,
    href: "/blog/iaea-hhs-47-controle-qualidade-equipamentos",
  },
  {
    tag: "RADIOPROTEÇÃO",
    date: "16 JAN 2019",
    title: "Proteção radiológica em equipamentos Arco C",
    text: "Conteúdo técnico sobre proteção radiológica em procedimentos que utilizam equipamentos Arco C.",
    image: ARTICLE_ARC_IMAGE,
    href: "/blog/protecao-radiologica-equipamentos-arco-c",
  },
];

function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2A9.84 9.84 0 0 0 3.7 17.03L2 22l5.12-1.64A9.82 9.82 0 1 0 12.04 2Zm5.77 13.87c-.24.67-1.39 1.28-1.91 1.36-.5.08-1.14.12-3.72-.95-3.11-1.29-5.11-4.48-5.27-4.69-.16-.21-1.26-1.68-1.26-3.21s.8-2.29 1.09-2.6c.28-.31.62-.39.83-.39h.6c.19 0 .45-.07.7.53.24.59.83 2.04.9 2.19.08.15.13.33.03.54-.1.21-.15.34-.3.52-.15.18-.32.4-.45.54-.15.15-.3.31-.13.61.18.3.79 1.29 1.7 2.09 1.17 1.04 2.15 1.36 2.45 1.51.3.15.48.13.66-.08.18-.21.77-.9.97-1.2.2-.3.41-.25.69-.15.28.1 1.79.84 2.1.99.3.15.51.23.58.36.08.13.08.74-.16 1.41Z"/>
    </svg>
  );
}

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
    ["Início", "/"],
    ["Sobre", "/sobre"],
    ["Serviços", "/servicos"],
    ["Blog", "/blog"],
    ["Cursos", "https://cursos.herospark.co"],
    ["Portal", "https://www.consult.med.br/Portal/"],
    ["Contato", "/#contato"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#075653]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
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
          <a
            href="/#contato"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF6B26] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:brightness-95"
          >
            Solicite um orçamento
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
              href="/#contato"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF6B26] px-5 py-3 text-sm font-bold text-white"
            >
              Solicite um orçamento
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
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact_form",
          name: data.get("nome") || "",
          email: data.get("email") || "",
          institution: data.get("instituicao") || "",
          phone: data.get("telefone") || "",
          service: data.get("assunto") || "",
          message: data.get("mensagem") || "",
          website: data.get("website") || "",
          source: "formulario_site",
          page_path: window.location.pathname,
          referrer: document.referrer || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_content: params.get("utm_content") || "",
          utm_term: params.get("utm_term") || "",
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result?.ok) throw new Error(result?.error || "Não foi possível enviar sua mensagem.");

      try {
        sessionStorage.setItem("consult_lead_contact", JSON.stringify({
          name: String(data.get("nome") || ""),
          phone: String(data.get("telefone") || ""),
        }));
      } catch {}

      form.reset();
      setStatus("success");
      window.dataLayer?.push?.({
        event: "lead_form_success",
        site: "consult",
        lead_id: result?.lead_id || null,
        email_sent: Boolean(result?.email_sent),
      });
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Não foi possível enviar sua mensagem.");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-white p-7 text-[#123C3B] shadow-2xl shadow-black/10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F6F1] text-[#08A77F]">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-black">Mensagem recebida</h3>
        <p className="mt-3 text-sm leading-7 text-black/60">
          Seus dados foram registrados e encaminhados para a equipe Consult. Retornaremos pelos canais informados.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl border border-[#08A77F] px-5 py-2.5 text-sm font-extrabold text-[#075653]"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      id="contato-form"
      onSubmit={submit}
      className="rounded-2xl bg-white p-5 text-[#123C3B] shadow-2xl shadow-black/10 sm:p-7"
    >
      <h3 className="text-lg font-extrabold">Envie uma mensagem</h3>
      <p className="mt-1 text-xs leading-relaxed text-black/50">
        Preencha os dados abaixo. A equipe Consult receberá sua solicitação e fará o retorno pelos canais informados.
      </p>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="consult-website">Website</label>
        <input id="consult-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input
          name="nome"
          required
          autoComplete="name"
          aria-label="Nome completo"
          placeholder="Nome completo *"
          className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#08A77F]"
        />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-label="E-mail"
          placeholder="E-mail *"
          className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#08A77F]"
        />
        <input
          name="instituicao"
          autoComplete="organization"
          aria-label="Instituição ou empresa"
          placeholder="Instituição / Empresa"
          className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#08A77F]"
        />
        <input
          name="telefone"
          required
          type="tel"
          autoComplete="tel"
          aria-label="Telefone ou WhatsApp"
          placeholder="Telefone / WhatsApp *"
          className="h-11 rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#08A77F]"
        />
      </div>

      <label htmlFor="consult-assunto" className="sr-only">Assunto do contato</label>
      <select
        id="consult-assunto"
        name="assunto"
        required
        aria-label="Assunto do contato"
        className="mt-3 h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#08A77F]"
        defaultValue=""
      >
        <option value="" disabled>
          Como podemos ajudar? *
        </option>
        <option>Física Médica</option>
        <option>Proteção Radiológica</option>
        <option>Consult Engenharia Clínica</option>
        <option>Controle de Qualidade</option>
        <option>Treinamentos</option>
        <option>Outro assunto</option>
      </select>

      <textarea
        name="mensagem"
        rows={4}
        aria-label="Mensagem"
        placeholder="Conte mais sobre sua necessidade..."
        className="mt-3 w-full resize-none rounded-lg border border-black/10 px-3 py-3 text-sm outline-none focus:border-[#08A77F]"
      />

      {status === "error" && (
        <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensagem"}
        {status !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="mt-3 text-center text-[10px] leading-5 text-black/45">
        Seus dados serão usados para atender esta solicitação. Consulte nossa{" "}
        <Link to="/politica-de-privacidade" className="font-bold underline">Política de Privacidade</Link>.
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
              <a className="block hover:text-[#8AE600]" href="/#inicio">Início</a>
              <Link className="block hover:text-[#8AE600]" to="/sobre">Sobre</Link>
              <Link className="block hover:text-[#8AE600]" to="/servicos">Serviços</Link>
              <a className="block hover:text-[#8AE600]" href="/#conteudos">Conteúdos</a>
              <a className="block hover:text-[#8AE600]" href="/#contato">Contato</a>
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
                  to={`/${area.slug}`}
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
                <span>{PHONE}<span className="block text-xs text-white/50">Atendimento: 8h às 17h</span></span>
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
          <Link className="hover:text-white" to="/politica-de-privacidade">Política de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}

export default function ConsultProposal() {
  usePageMeta("Consult Radiometria e Qualidade | Física Médica, Proteção Radiológica e Engenharia Clínica");

  return (
    <div className="min-h-screen bg-white font-sans text-[#123C3B]">
      <ConsultHeader />

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
                SEGURANÇA HOJE. SAÚDE SEMPRE.
              </div>
              <h1 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Soluções técnicas
                <br />
                para a área da <span className="text-[#8AE600]">saúde</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 lg:text-lg">
                Segurança, desempenho e rastreabilidade dos equipamentos de saúde,
                documentados em laudo técnico. Atuamos com Física Médica, Proteção
                Radiológica, Controle de Qualidade e Engenharia Clínica para
                hospitais, clínicas, centros de diagnóstico por imagem, odontologia,
                medicina veterinária e outras instituições de saúde.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contato"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-4 py-3 text-[12px] font-extrabold whitespace-nowrap sm:text-[13px] text-white shadow-xl shadow-black/10 transition hover:brightness-95"
                >
                  <FileText className="h-4 w-4" />
                  Solicite um orçamento
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
                src={AREA_PHYS_IMAGE}
                alt="Equipamento de diagnóstico por imagem em ambiente de saúde"
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
              [FileText, "Conformidade", "com as normas vigentes"],
              [Settings, "Tecnologia", "a serviço da qualidade"],
              [UsersRound, "Desde 1995", "de mercado"],
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


        <section id="sobre" className="relative overflow-hidden bg-[#F4FBFA]">
          <div className="absolute -left-28 top-12 h-80 w-80 rounded-full border-[28px] border-[#DFF4EF]/60" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full border-[34px] border-[#E7F6F3]/70" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <SectionEyebrow center>Diferenciais</SectionEyebrow>
              <h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl">Por que escolher a <span className="text-[#79D900]">Consult?</span></h2>
              <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-relaxed text-black/60">
                Fundada em 1995, a Consult atua em Física Médica do Radiodiagnóstico desde 2013.
                <br className="hidden sm:block" /> Mais que serviços, oferecemos parceria técnica e compromisso com a sua segurança.
              </p>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {differentials.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#08A77F] text-white shadow-sm">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-black leading-tight text-[#123C3B]">{title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-black/55">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="areas" className="relative overflow-hidden bg-[#F4FBFA]">
          <div className="absolute -left-28 top-12 h-80 w-80 rounded-full border-[28px] border-[#DFF4EF]/65" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full border-[34px] border-[#E7F6F3]/70" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <SectionEyebrow center>Nossas especialidades</SectionEyebrow>
              <h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl">Nossas áreas de <span className="text-[#79D900]">atuação</span></h2>
              <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-relaxed text-black/60">Conhecimento multidisciplinar para uma saúde mais segura, eficiente e de qualidade.</p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {serviceAreas.map((area) => {
                const Icon = area.Icon;
                return (
                  <Link key={area.slug} to={`/${area.slug}`} className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg shadow-[#075653]/5 transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-52 overflow-hidden bg-[#DCEEEB]">
                      <img src={area.image} alt={area.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#08A77F] text-white"><Icon className="h-6 w-6" /></span>
                        <h3 className="text-lg font-black">{area.title}</h3>
                      </div>
                      <p className="mt-4 text-[14px] leading-relaxed text-black/55">{area.summary}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#08A77F]">Saiba mais <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-9 flex justify-center">
              <a href="#contato" className="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full border-2 border-[#08A77F] px-7 py-3 text-sm font-extrabold text-[#075653] transition hover:bg-[#08A77F] hover:text-white">
                Solicite uma avaliação <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#075653] text-white">
          <img
            src="/approved-national-bg.webp"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,84,80,.96)_0%,rgba(4,84,80,.88)_34%,rgba(3,70,67,.66)_67%,rgba(3,63,60,.80)_100%)]" />

          <div className="relative mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-8 lg:px-14 lg:py-7 xl:px-12">
            <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,47fr)_minmax(330px,34fr)_minmax(170px,19fr)] lg:gap-3 xl:gap-5">
              <div className="relative z-10 max-w-[500px]">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-white/78">
                  <span className="h-[2px] w-10 bg-[#8AE600]" />
                  Onde atuamos
                </div>

                <h2 className="mt-4 text-[38px] font-black leading-[0.98] tracking-[-0.04em] sm:text-[44px] lg:text-[42px] xl:text-[44px]">
                  Atendimento em <span className="text-[#8AE600]">todo o Brasil</span>
                </h2>

                <p className="mt-5 max-w-[475px] text-[14px] leading-[1.55] text-white/90 sm:text-[15px]">
                  Atendimento em todo o Brasil, com equipes em campo em São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contato"
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-4 py-3 text-[12px] font-extrabold whitespace-nowrap text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 sm:text-[13px]"
                  >
                    <FileText className="h-4 w-4" />
                    Solicite um orçamento
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={waUrl("Olá, equipe Consult. Gostaria de saber sobre atendimento na minha região.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border-2 border-[#8AE600] bg-[#075653]/35 px-4 py-3 text-[12px] font-extrabold whitespace-nowrap sm:text-[13px] text-white backdrop-blur-[2px] transition hover:bg-[#8AE600] hover:text-[#075653]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Falar no WhatsApp
                  </a>
                </div>

                <div className="mt-7">
                  <span className="block h-[2px] w-10 bg-[#8AE600]" />
                  <p className="mt-3 max-w-[380px] text-[9px] font-bold uppercase leading-[1.75] tracking-[0.32em] text-white/78">
                    Equipes em campo em quatro estados
                  </p>
                </div>
              </div>

              <div className="relative z-[5] mx-auto flex h-[300px] w-full max-w-[390px] items-center justify-center sm:h-[320px] lg:h-[340px]">
                <img
                  src="/approved-national-map.webp"
                  alt="Mapa do Brasil representando a cobertura nacional da Consult Radiometria e Qualidade."
                  className="block h-full w-auto max-w-full object-contain [mask-image:radial-gradient(ellipse_88%_94%_at_50%_50%,black_74%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_88%_94%_at_50%_50%,black_74%,transparent_100%)] lg:translate-x-2"
                />
              </div>

              <aside className="relative z-10 grid gap-5 sm:grid-cols-2 lg:block lg:translate-x-5">
                <div className="border-l-2 border-[#8AE600] pl-4 text-[10px] font-bold uppercase leading-[1.75] tracking-[0.28em] text-white/90">
                  Conhecimento técnico sem fronteiras
                </div>

                <div className="rounded-2xl border border-[#13B991] bg-[#043D3B]/78 p-4 shadow-xl shadow-black/15 backdrop-blur-[5px] lg:mt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 items-end gap-[3px] pt-1" aria-hidden="true">
                      <span className="h-2 w-1.5 rounded-sm bg-[#8AE600]" />
                      <span className="h-4 w-1.5 rounded-sm bg-[#8AE600]" />
                      <span className="h-6 w-1.5 rounded-sm bg-[#8AE600]" />
                    </div>
                    <div className="text-[9px] font-black uppercase leading-[1.45] tracking-[0.13em] text-white/92">
                      Equipes em campo em 4 estados
                    </div>
                  </div>

                  <div className="mt-3 space-y-2 text-[11px] font-medium text-white/95">
                    {["São Paulo", "Paraná", "Mato Grosso do Sul", "Minas Gerais"].map((region) => (
                      <div key={region} className="flex items-center gap-2.5">
                        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#8AE600] text-[10px] font-black text-[#075653]">✓</span>
                        <span>{region}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F4FBFA]">
          <div className="absolute -right-32 top-4 h-80 w-80 rounded-full border-[30px] border-[#E8F6F3]/80" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <SectionEyebrow center>Quem atendemos</SectionEyebrow>
              <h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl">Ao lado de quem <span className="text-[#79D900]">cuida da vida</span></h2>
              <p className="mx-auto mt-3 max-w-3xl text-[15px] leading-relaxed text-black/60">Nossas soluções atendem diferentes perfis de instituições de saúde, com foco em segurança, qualidade e conformidade técnica.</p>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {audiences.map(([title, text], index) => {
                const Icon = [Building2, Stethoscope, Monitor, Smile, PawPrint, UsersRound][index];
                return (
                  <div key={title} className="rounded-xl border border-black/5 bg-white p-5 text-center shadow-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E2F7F1] text-[#08A77F]"><Icon className="h-6 w-6" strokeWidth={2.2} /></div>
                    <h3 className="mt-4 text-[13px] font-black leading-tight">{title}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-black/50">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="conteudos" className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionEyebrow>Conhecimento que gera valor</SectionEyebrow>
                <h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl">Conteúdo técnico e <span className="text-[#79D900]">atualizações</span></h2>
                <p className="mt-3 text-[15px] text-black/55">Artigos, novidades e insights sobre radiometria, qualidade e segurança em saúde.</p>
              </div>
              <a href="/blog" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[#08A77F] px-6 py-3 text-sm font-bold text-[#08A77F] transition hover:bg-[#08A77F] hover:text-white">Ver todos os conteúdos <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {articles.map((article) => (
                <a key={article.title} href={article.href} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg shadow-black/5 transition hover:-translate-y-1">
                  <div className="h-48 overflow-hidden bg-[#DCEEEB]"><img src={article.image} alt={article.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" /></div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3 text-[9px] font-black uppercase tracking-[0.16em] text-[#08A77F]"><span>{article.tag}</span><span className="text-black/35">{article.date}</span></div>
                    <h3 className="mt-3 text-[17px] font-black leading-snug">{article.title}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-black/52">{article.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#08A77F]">Ler artigo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
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
                  href="#contato-form"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold"
                >
                  <FileText className="h-4 w-4" />
                  Preencher formulário
                  <ArrowRight className="h-4 w-4" />
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
                    {PHONE}<span className="block text-xs text-white/50">Atendimento: 8h às 17h</span>
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
            to="/"
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
              to="/#areas"
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
                  href="/#contato"
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
