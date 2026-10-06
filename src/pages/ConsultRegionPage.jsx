import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, FileText, MapPin, ShieldCheck } from "lucide-react";

const LOGO = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/68d5471e-43b0-4285-8644-3407ac1e09ff.png";

const REGIONS = {
  "sao-paulo": { state: "São Paulo", uf: "SP", location: "em São Paulo", sede: true },
  parana: { state: "Paraná", uf: "PR", location: "no Paraná" },
  "mato-grosso-do-sul": { state: "Mato Grosso do Sul", uf: "MS", location: "em Mato Grosso do Sul" },
  "minas-gerais": { state: "Minas Gerais", uf: "MG", location: "em Minas Gerais" },
};

const RADIOLOGY_SERVICES = [
  ["Controle de qualidade (CQ)", "/consult/servicos/controle-qualidade"],
  ["Programa de Proteção Radiológica", "/consult/servicos/programa-protecao-radiologica"],
  ["Levantamento radiométrico", "/consult/servicos/levantamento-radiometrico"],
  ["Projeto de blindagem", "/consult/servicos/projeto-blindagem"],
  ["Treinamentos", "/consult/servicos/treinamentos"],
  ["Licenciamento sanitário", "/consult/servicos/licenciamento-sanitario"],
];

const ENGINEERING_SERVICES = [
  ["Ensaio de segurança elétrica", "/consult/engenharia-clinica/seguranca-eletrica"],
  ["Ensaio de desempenho (calibração)", "/consult/engenharia-clinica/desempenho-calibracao"],
  ["Manutenção preventiva", "/consult/engenharia-clinica/manutencao-preventiva"],
  ["Reverificação", "/consult/engenharia-clinica/reverificacao"],
  ["Qualificação térmica", "/consult/engenharia-clinica/qualificacao-termica"],
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#064946]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link to="/consult" className="flex items-center gap-3"><img src={LOGO} alt="Consult" className="h-10 w-auto object-contain" /></Link>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link to="/consult#areas" className="hidden text-white/80 hover:text-white sm:inline">Áreas de atuação</Link>
          <Link to="/consult#contato" className="rounded-xl bg-[#FF6B26] px-4 py-2.5 text-white">Agende uma reunião</Link>
        </div>
      </div>
    </header>
  );
}

function ServiceList({ title, eyebrow, items, icon: Icon }) {
  return (
    <article className="rounded-3xl border border-[#DDEBE8] bg-white p-6 shadow-sm md:p-8">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><Icon size={22} /></div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#08A77F]">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-[#075653]">{title}</h2>
      <div className="mt-5 divide-y divide-[#E8F0EE]">
        {items.map(([label, href]) => (
          <Link key={href} to={href} className="flex items-center justify-between gap-4 py-3 text-sm font-semibold text-[#365A58] hover:text-[#075653]">
            <span>{label}</span><span aria-hidden="true">›</span>
          </Link>
        ))}
      </div>
    </article>
  );
}

export default function ConsultRegionPage() {
  const { slug } = useParams();
  const region = useMemo(() => REGIONS[slug], [slug]);

  useEffect(() => {
    if (!region) return;
    document.title = `Consult ${region.location} | Física Médica, Proteção Radiológica e Engenharia Clínica`;
    const description = `Atendimento presencial da Consult ${region.location} para Física Médica, Proteção Radiológica e Engenharia Clínica, com medição, ensaios e laudos técnicos.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [region]);

  if (!region) {
    return (
      <div className="min-h-screen bg-[#F6FAF9] text-[#123C3B]">
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl font-black">Região não encontrada</h1>
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
            <Link to="/consult" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"><ArrowLeft size={17} /> Voltar para a Consult</Link>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8AE600]">Atuação presencial confirmada</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight tracking-tight md:text-6xl">Consult {region.location}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/88 md:text-lg">Atendimento presencial {region.location} para serviços de Física Médica, Proteção Radiológica e Consult Engenharia Clínica, com medição, ensaios, calibração, qualificação e documentação em laudo técnico.</p>
            {region.sede && <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/85"><MapPin size={16} className="text-[#8AE600]" /> Sede em Matão/SP</div>}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm"><ShieldCheck className="text-[#078B6B]" size={22} /><h2 className="mt-4 text-lg font-black text-[#075653]">Medição e laudo técnico</h2><p className="mt-3 text-sm leading-6 text-[#456563]">A Consult verifica se os equipamentos estão seguros e funcionando dentro da norma e documenta o resultado em laudo técnico.</p></article>
            <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm"><FileText className="text-[#078B6B]" size={22} /><h2 className="mt-4 text-lg font-black text-[#075653]">Um só fornecedor</h2><p className="mt-3 text-sm leading-6 text-[#456563]">Radiologia e demais equipamentos podem ser atendidos com a mesma visita, o mesmo padrão de laudo e o mesmo responsável técnico.</p></article>
            <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm"><CheckCircle2 className="text-[#078B6B]" size={22} /><h2 className="mt-4 text-lg font-black text-[#075653]">Independência técnica</h2><p className="mt-3 text-sm leading-6 text-[#456563]">Na Engenharia Clínica, a Consult não faz conserto e não vende peças. O laudo aponta a condição do equipamento para o cliente decidir como resolver.</p></article>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-14 md:grid-cols-2 md:px-8 md:pb-20">
          <ServiceList title="Serviços de radiologia" eyebrow="Física Médica e Proteção Radiológica" items={RADIOLOGY_SERVICES} icon={ShieldCheck} />
          <ServiceList title="Ensaios e qualificações" eyebrow="Consult Engenharia Clínica" items={ENGINEERING_SERVICES} icon={FileText} />
        </section>

        <section className="border-y border-[#DDEBE8] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#08A77F]">Cobertura presencial informada pela Consult</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(REGIONS).map(([key, item]) => <Link key={key} to={`/consult/regioes/${key}`} className={`rounded-full border px-4 py-2 text-sm font-bold ${key === slug ? "border-[#075653] bg-[#075653] text-white" : "border-[#D7E8E4] bg-[#F7FBFA] text-[#456563] hover:border-[#075653]"}`}>{item.uf} · {item.state}</Link>)}
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-[#5C7775]">A Consult informa atuação presencial em São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais. Esta página não pressupõe unidade física fora da sede em Matão/SP.</p>
          </div>
        </section>

        <section className="bg-[#064946] text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8AE600]">Atendimento {region.location}</p><h2 className="mt-2 text-2xl font-black">Converse com a equipe técnica da Consult</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">Explique o serviço ou equipamento que precisa ser avaliado e a equipe orienta o próximo passo.</p></div>
            <Link to="/consult#contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white"><CalendarDays size={18} /> Agende uma reunião</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
