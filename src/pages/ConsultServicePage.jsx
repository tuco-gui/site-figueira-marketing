import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

const LOGO = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/68d5471e-43b0-4285-8644-3407ac1e09ff.png";

const SERVICES = {
  "controle-qualidade": {
    title: "Controle de qualidade (CQ)",
    eyebrow: "Física Médica e Proteção Radiológica",
    intro: "Testes periódicos que verificam dose, qualidade de imagem e funcionamento do equipamento, com laudo assinado pelo físico médico.",
    audience: "Serviços com equipamentos de raios X, tomografia, mamografia, ressonância magnética ou ultrassom.",
    result: "Laudo técnico com o resultado dos testes realizados no equipamento.",
    norms: ["RDC 611/2022 — Anvisa", "IN 90 a 97/2021 — conforme o equipamento avaliado"],
    equipmentNorms: [
      ["Raios X médico convencional", "IN 90/2021"],
      ["Fluoroscopia, arco cirúrgico e angiógrafo", "IN 91/2021"],
      ["Mamógrafo", "IN 92/2021"],
      ["Tomógrafo", "IN 93/2021"],
      ["Raios X odontológico extraoral", "IN 94/2021"],
      ["Raios X odontológico intraoral", "IN 95/2021"],
      ["Ultrassom", "IN 96/2021"],
      ["Ressonância magnética", "IN 97/2021"],
      ["Densitômetro ósseo", "RDC 611/2022 — sem IN específica"],
      ["Raios X veterinário", "RDC 611/2022; IN 90/2021 como referência técnica"],
    ],
  },
  "programa-protecao-radiologica": {
    title: "Programa de Proteção Radiológica",
    eyebrow: "Física Médica e Proteção Radiológica",
    intro: "Elaboração e acompanhamento do programa exigido pela RDC 611 para serviços de radiologia diagnóstica e intervencionista.",
    audience: "Serviços de radiologia diagnóstica e intervencionista.",
    result: "Programa elaborado e acompanhado de acordo com os requisitos aplicáveis ao serviço.",
    norms: ["RDC 611/2022 — Anvisa"],
  },
  "levantamento-radiometrico": {
    title: "Levantamento radiométrico",
    eyebrow: "Física Médica e Proteção Radiológica",
    intro: "Medição da radiação nas áreas ao redor da sala e da radiação de fuga do cabeçote.",
    audience: "Salas novas, reformadas, com troca de equipamento ou em rotina periódica.",
    result: "Medições documentadas para demonstrar as condições radiométricas avaliadas.",
    norms: ["RDC 611/2022 — Anvisa", "Instrução Normativa aplicável conforme a modalidade/equipamento"],
  },
  "projeto-blindagem": {
    title: "Projeto de blindagem",
    eyebrow: "Física Médica e Proteção Radiológica",
    intro: "Cálculo da blindagem da sala antes da obra ou da troca de equipamento.",
    audience: "Clínicas e hospitais em obra, reforma ou expansão.",
    result: "Memorial de cálculo e documentação técnica do projeto de blindagem.",
    norms: ["RDC 611/2022 — Anvisa", "Instrução Normativa aplicável conforme a modalidade/equipamento"],
  },
  treinamentos: {
    title: "Treinamentos",
    eyebrow: "Física Médica e Proteção Radiológica",
    intro: "Capacitação periódica das equipes em radioproteção e segurança em ressonância magnética.",
    audience: "Equipes de radiologia e de ressonância magnética.",
    result: "Capacitação técnica alinhada aos requisitos aplicáveis à atividade e à modalidade atendida.",
    norms: ["RDC 611/2022 — Anvisa", "Requisitos complementares conforme a modalidade atendida"],
  },
  "licenciamento-sanitario": {
    title: "Licenciamento sanitário",
    eyebrow: "Física Médica e Proteção Radiológica",
    intro: "Apoio na documentação necessária para obter ou renovar a licença da vigilância sanitária.",
    audience: "Serviços novos ou em processo de renovação.",
    result: "Apoio técnico e documental ao processo de licenciamento sanitário.",
    norms: ["RDC 611/2022 — Anvisa", "Exigências sanitárias aplicáveis ao serviço e à modalidade"],
  },
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#064946]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link to="/consult" className="flex items-center gap-3">
          <img src={LOGO} alt="Consult" className="h-10 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link to="/consult#areas" className="hidden text-white/80 hover:text-white sm:inline">Áreas de atuação</Link>
          <Link to="/consult#contato" className="rounded-xl bg-[#FF6B26] px-4 py-2.5 text-white">Agende uma reunião</Link>
        </div>
      </div>
    </header>
  );
}

export default function ConsultServicePage() {
  const { slug } = useParams();
  const service = useMemo(() => SERVICES[slug], [slug]);

  useEffect(() => {
    if (!service) return;
    document.title = `${service.title} | Consult Radiometria e Qualidade`;
    const description = service.intro;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F6FAF9] text-[#123C3B]">
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl font-black">Serviço não encontrado</h1>
          <Link to="/consult" className="mt-8 inline-flex items-center gap-2 font-bold text-[#075653]"><ArrowLeft size={18} /> Voltar para a Consult</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6FAF9] text-[#123C3B]">
      <Header />
      <main>
        <section className="bg-[#075653] text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
            <Link to="/consult/areas/fisica-medica" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"><ArrowLeft size={17} /> Física Médica e Proteção Radiológica</Link>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8AE600]">{service.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/88 md:text-lg">{service.intro}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-3 md:px-8 md:py-14">
          <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><ShieldCheck size={21} /></div>
            <h2 className="text-lg font-black text-[#075653]">Para quem</h2>
            <p className="mt-3 text-sm leading-6 text-[#456563]">{service.audience}</p>
          </article>
          <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><FileText size={21} /></div>
            <h2 className="text-lg font-black text-[#075653]">O que o cliente recebe</h2>
            <p className="mt-3 text-sm leading-6 text-[#456563]">{service.result}</p>
          </article>
          <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><CheckCircle2 size={21} /></div>
            <h2 className="text-lg font-black text-[#075653]">Base normativa</h2>
            <div className="mt-3 space-y-2 text-sm leading-6 text-[#456563]">
              {service.norms.map((norm) => <p key={norm}>{norm}</p>)}
            </div>
          </article>
        </section>

        {service.equipmentNorms && (
          <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
            <div className="overflow-hidden rounded-2xl border border-[#DDEBE8] bg-white shadow-sm">
              <div className="border-b border-[#E4EFED] px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#08A77F]">Norma por equipamento</p>
                <h2 className="mt-2 text-2xl font-black text-[#075653]">Instruções Normativas aplicáveis ao Controle de Qualidade</h2>
              </div>
              <div className="divide-y divide-[#E8F0EE]">
                {service.equipmentNorms.map(([equipment, norm]) => (
                  <div key={equipment} className="grid gap-2 px-6 py-4 sm:grid-cols-[1.5fr_1fr] sm:items-center">
                    <strong className="text-sm text-[#123C3B]">{equipment}</strong>
                    <span className="text-sm text-[#557270] sm:text-right">{norm}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-[#064946] text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8AE600]">Próximo passo</p>
              <h2 className="mt-2 text-2xl font-black">Converse com a equipe técnica da Consult</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">Atendimento presencial em São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais.</p>
            </div>
            <Link to="/consult#contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white">
              <CalendarDays size={18} /> Agende uma reunião
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
