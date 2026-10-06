import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, FileText, ShieldCheck, Wrench } from "lucide-react";

const LOGO = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/68d5471e-43b0-4285-8644-3407ac1e09ff.png";

const SERVICES = {
  "seguranca-eletrica": {
    title: "Ensaio de segurança elétrica",
    intro: "Medição de resistência de aterramento, resistência de isolamento e correntes de fuga do equipamento e das partes aplicadas ao paciente.",
    norm: "ABNT NBR IEC 62353 — ensaio recorrente e após reparo",
    result: "Laudo com valores medidos, limites da norma e resultado aprovado/reprovado.",
  },
  "desempenho-calibracao": {
    title: "Ensaio de desempenho (calibração)",
    intro: "Comparação, ponto a ponto, do que o equipamento mede ou entrega com um analisador ou simulador calibrado.",
    norm: "Manual do fabricante e norma particular de cada equipamento — família ABNT NBR IEC 60601",
    result: "Laudo com pontos ensaiados, desvios e conformidade.",
  },
  "manutencao-preventiva": {
    title: "Manutenção preventiva",
    intro: "Limpeza, lubrificação e testes de funcionamento. Peças gastas ou vencidas são registradas como pendência, com sua especificação. A Consult não troca peças.",
    norm: "Plano de manutenção do fabricante",
    result: "Laudo com o que foi realizado e a lista de pendências identificadas.",
  },
  reverificacao: {
    title: "Reverificação",
    intro: "Novo ensaio depois que o hospital resolve uma pendência, como a troca de peça pela equipe interna ou pelo fornecedor escolhido pelo hospital.",
    norm: "A mesma norma do ensaio original",
    result: "Laudo atualizado. A reverificação é cobrada à parte.",
  },
  "qualificacao-termica": {
    title: "Qualificação térmica",
    intro: "Mapeamento de temperatura com sensores calibrados durante ciclos de operação, para demonstrar que o equipamento esteriliza, aquece ou conserva dentro da faixa especificada.",
    norm: "Autoclave: RDC 15/2012. Câmara de vacina: RDC 197/2017, Manual de Rede de Frio do PNI e método QI/QO/QD com base na RDC 430/2020.",
    result: "Relatório de qualificação com gráficos de temperatura e conformidade.",
  },
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#064946]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link to="/consult"><img src={LOGO} alt="Consult" className="h-10 w-auto object-contain" /></Link>
        <Link to="/consult#contato" className="rounded-xl bg-[#FF6B26] px-4 py-2.5 text-sm font-bold text-white">Agende uma reunião</Link>
      </div>
    </header>
  );
}

function IndependenceStrip() {
  return (
    <section className="border-y border-[#9de75d]/35 bg-[#053F3D] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8AE600]/15 text-[#8AE600]"><ShieldCheck size={19} /></div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8AE600]">Verificação independente</p>
            <p className="mt-1 max-w-4xl text-sm leading-6 text-white/85">Não consertamos e não vendemos peças. O laudo aponta o que o equipamento tem, e o hospital resolve com o fornecedor que preferir.</p>
          </div>
        </div>
        <div className="shrink-0 text-xs font-bold text-white/65">Sem vínculo com empresas de conserto</div>
      </div>
    </section>
  );
}

export default function ConsultEngineeringServicePage() {
  const { slug } = useParams();
  const service = useMemo(() => SERVICES[slug], [slug]);

  useEffect(() => {
    if (!service) return;
    document.title = `${service.title} | Consult Engenharia Clínica`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", service.intro);
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F6FAF9] text-[#123C3B]">
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl font-black">Serviço não encontrado</h1>
          <Link to="/consult/areas/engenharia-clinica" className="mt-8 inline-flex items-center gap-2 font-bold text-[#075653]"><ArrowLeft size={18} /> Voltar</Link>
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
            <Link to="/consult/areas/engenharia-clinica" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"><ArrowLeft size={17} /> Consult Engenharia Clínica</Link>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8AE600]">Consult Engenharia Clínica</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/88 md:text-lg">{service.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold">
              <span className="rounded-full border border-white/20 bg-white/8 px-4 py-2">Base geral: RDC 509/2021</span>
              <span className="rounded-full border border-white/20 bg-white/8 px-4 py-2">Laudo por equipamento no Arkmeds</span>
              <span className="rounded-full border border-white/20 bg-white/8 px-4 py-2">Analisadores com rastreabilidade RBC</span>
            </div>
          </div>
        </section>

        <IndependenceStrip />

        <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-3 md:px-8 md:py-14">
          <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><Wrench size={21} /></div>
            <h2 className="text-lg font-black text-[#075653]">O que é feito</h2>
            <p className="mt-3 text-sm leading-6 text-[#456563]">{service.intro}</p>
          </article>
          <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><CheckCircle2 size={21} /></div>
            <h2 className="text-lg font-black text-[#075653]">Norma de referência</h2>
            <p className="mt-3 text-sm leading-6 text-[#456563]">{service.norm}</p>
          </article>
          <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><FileText size={21} /></div>
            <h2 className="text-lg font-black text-[#075653]">O cliente recebe</h2>
            <p className="mt-3 text-sm leading-6 text-[#456563]">{service.result}</p>
          </article>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
          <div className="rounded-2xl border border-[#DDEBE8] bg-white p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#08A77F]">Rastreabilidade e histórico</p>
            <h2 className="mt-2 text-2xl font-black text-[#075653]">Laudo técnico por equipamento</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#557270]">Os serviços da Consult Engenharia Clínica são documentados por equipamento, com laudo assinado pelo responsável técnico e emitido no sistema Arkmeds, preservando o histórico do equipamento. Os analisadores utilizados possuem certificado de calibração com rastreabilidade RBC.</p>
          </div>
        </section>

        <section className="bg-[#064946] text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8AE600]">Engenharia Clínica</p>
              <h2 className="mt-2 text-2xl font-black">Ensaio, calibração e qualificação com resultado documentado</h2>
            </div>
            <Link to="/consult#contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white"><CalendarDays size={18} /> Agende uma reunião</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
