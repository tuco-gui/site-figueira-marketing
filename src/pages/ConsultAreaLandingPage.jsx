import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Activity,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  MapPin,
  ShieldCheck,
  Stethoscope,
  Thermometer,
  Wrench,
} from "lucide-react";

const CDN = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305";
const LOGO = `${CDN}/68d5471e-43b0-4285-8644-3407ac1e09ff.png`;
const PHYSICS_IMAGE = `${CDN}/5ba95360-34a0-449d-9a24-4836ac1f137f.jpg`;
const PROTECTION_IMAGE = `${CDN}/5ba952d9-c3e4-48d7-9dc0-4716ac1f137f.jpg`;
const ENGINEERING_IMAGE = `${CDN}/5ba954a4-90f8-4e55-a0d3-4b15ac1f137f.jpg`;

const RADIOLOGY_EQUIPMENT = [
  "Raios X médico convencional",
  "Fluoroscopia, arco cirúrgico e angiógrafo",
  "Mamógrafo",
  "Tomógrafo",
  "Raios X odontológico extraoral",
  "Raios X odontológico intraoral",
  "Ultrassom",
  "Ressonância magnética",
  "Densitômetro ósseo",
  "Raios X veterinário",
];

const ENGINEERING_EQUIPMENT = [
  ["Monitor multiparamétrico", "/consult/equipamentos/monitor-multiparametrico"],
  ["Eletrocardiógrafo", "/consult/equipamentos/eletrocardiografo"],
  ["Oxímetro de pulso", "/consult/equipamentos/oximetro-pulso"],
  ["Esfigmomanômetro digital e MAPA", "/consult/equipamentos/esfigmomanometro-mapa"],
  ["Desfibrilador, cardioversor e DEA", "/consult/equipamentos/desfibrilador-cardioversor-dea"],
  ["Marca-passo transcutâneo", "/consult/equipamentos/marca-passo-transcutaneo"],
  ["Bisturi elétrico", "/consult/equipamentos/bisturi-eletrico"],
  ["Ventilador pulmonar", "/consult/equipamentos/ventilador-pulmonar"],
  ["Aparelho de anestesia", "/consult/equipamentos/aparelho-anestesia"],
  ["CPAP e BiPAP", "/consult/equipamentos/cpap-bipap"],
  ["Fluxômetro e manômetro de O₂", "/consult/equipamentos/fluxometro-manometro-o2"],
  ["Autoclave", "/consult/equipamentos/autoclave"],
  ["Termodesinfectora e estufa", "/consult/equipamentos/termodesinfectora-estufa"],
  ["Estufa e banho-maria de laboratório", "/consult/equipamentos/estufa-banho-maria"],
  ["Geladeira e câmara de vacina", "/consult/equipamentos/geladeira-camara-vacina"],
];

const AREAS = {
  "fisica-medica": {
    title: "Física Médica",
    eyebrow: "Medição, controle de qualidade e laudo técnico",
    image: PHYSICS_IMAGE,
    hero: "Verificação técnica de equipamentos de diagnóstico por imagem para comprovar segurança, desempenho e conformidade.",
    intro:
      "Na Física Médica, a Consult executa testes e medições em equipamentos de diagnóstico por imagem, verifica dose, qualidade de imagem e funcionamento e documenta os resultados em laudo técnico assinado pelo físico médico.",
    primaryServices: [
      {
        title: "Controle de qualidade (CQ)",
        text: "Testes periódicos para verificar dose, qualidade de imagem e funcionamento dos equipamentos.",
        href: "/consult/servicos/controle-qualidade",
        icon: Gauge,
      },
      {
        title: "Levantamento radiométrico",
        text: "Medição da radiação ao redor da sala e avaliação da radiação de fuga do cabeçote.",
        href: "/consult/servicos/levantamento-radiometrico",
        icon: Activity,
      },
      {
        title: "Projeto de blindagem",
        text: "Cálculo técnico da blindagem antes de obra, reforma, expansão ou troca de equipamento.",
        href: "/consult/servicos/projeto-blindagem",
        icon: ShieldCheck,
      },
    ],
    standards: [
      "RDC 611/2022 — Anvisa",
      "IN 90/2021 — Raios X médico convencional",
      "IN 91/2021 — Fluoroscopia, arco cirúrgico e angiógrafo",
      "IN 92/2021 — Mamografia",
      "IN 93/2021 — Tomografia",
      "IN 94/2021 — Raios X odontológico extraoral",
      "IN 95/2021 — Raios X odontológico intraoral",
      "IN 96/2021 — Ultrassom",
      "IN 97/2021 — Ressonância magnética",
    ],
    receive: [
      ["Medição objetiva", "Parâmetros do equipamento verificados com metodologia técnica aplicável."],
      ["Resultado documentado", "Laudo técnico com os resultados dos ensaios realizados."],
      ["Base normativa clara", "A norma aplicável é associada ao equipamento e ao serviço realizado."],
    ],
    faq: [
      ["O que a Consult verifica no Controle de Qualidade?", "Dose, qualidade de imagem e funcionamento do equipamento, de acordo com a modalidade avaliada."],
      ["O cliente recebe laudo?", "Sim. O resultado dos testes é documentado em laudo técnico assinado pelo físico médico."],
      ["Quais estados têm atendimento presencial?", "São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais."],
    ],
    showRadiologyEquipment: true,
  },
  "protecao-radiologica": {
    title: "Proteção Radiológica",
    eyebrow: "Segurança, documentação e conformidade técnica",
    image: PROTECTION_IMAGE,
    hero: "Estruturação da proteção radiológica para reduzir riscos e manter o serviço alinhado às exigências aplicáveis.",
    intro:
      "A Consult apoia serviços de radiologia diagnóstica e intervencionista na implantação e manutenção das rotinas de proteção radiológica, realizando medições, projetos, documentação, treinamento e suporte ao licenciamento sanitário.",
    primaryServices: [
      {
        title: "Programa de Proteção Radiológica",
        text: "Elaboração e acompanhamento do programa exigido para serviços de radiologia diagnóstica e intervencionista.",
        href: "/consult/servicos/programa-protecao-radiologica",
        icon: ClipboardCheck,
      },
      {
        title: "Levantamento radiométrico",
        text: "Medição das condições radiométricas da sala e das áreas ao redor.",
        href: "/consult/servicos/levantamento-radiometrico",
        icon: Activity,
      },
      {
        title: "Projeto de blindagem",
        text: "Memorial de cálculo para construção, reforma, expansão ou troca de equipamento.",
        href: "/consult/servicos/projeto-blindagem",
        icon: ShieldCheck,
      },
      {
        title: "Treinamentos",
        text: "Capacitação periódica das equipes em radioproteção e segurança em ressonância magnética.",
        href: "/consult/servicos/treinamentos",
        icon: Stethoscope,
      },
      {
        title: "Licenciamento sanitário",
        text: "Apoio técnico e documental para obtenção ou renovação da licença da vigilância sanitária.",
        href: "/consult/servicos/licenciamento-sanitario",
        icon: FileText,
      },
    ],
    standards: [
      "RDC 611/2022 — Anvisa",
      "Instruções Normativas aplicáveis conforme modalidade e equipamento",
      "Requisitos sanitários aplicáveis ao serviço atendido",
    ],
    receive: [
      ["Diagnóstico técnico", "Medições e verificações que demonstram as condições radiológicas avaliadas."],
      ["Documentação", "Programas, memoriais, registros e documentação técnica conforme o serviço contratado."],
      ["Orientação para conformidade", "Apoio para organizar as evidências e requisitos aplicáveis à operação."],
    ],
    faq: [
      ["Quando é indicado fazer levantamento radiométrico?", "Em salas novas ou reformadas, na troca de equipamento e também em rotina periódica, conforme a necessidade aplicável."],
      ["A Consult faz projeto de blindagem?", "Sim. O cálculo é realizado antes da obra, reforma, expansão ou troca de equipamento."],
      ["A Consult ajuda no licenciamento sanitário?", "Sim. A atuação é de apoio técnico e documental no processo de obtenção ou renovação da licença."],
    ],
    situations: [
      "Sala nova ou em reforma",
      "Troca de equipamento",
      "Expansão de clínica ou hospital",
      "Renovação de licença sanitária",
      "Implantação ou revisão do Programa de Proteção Radiológica",
      "Treinamento periódico da equipe",
    ],
  },
  "engenharia-clinica": {
    title: "Consult Engenharia Clínica",
    eyebrow: "Medição, ensaio, calibração, qualificação e laudo",
    image: ENGINEERING_IMAGE,
    hero: "Avaliação independente de equipamentos de saúde, com resultado técnico documentado e sem vínculo com empresas de conserto.",
    intro:
      "A Consult Engenharia Clínica confirma por medição se o equipamento está seguro e entregando o que deveria entregar. Cada atendimento gera documentação por equipamento, preservando o histórico técnico e dando ao hospital uma base objetiva para decidir o próximo passo.",
    primaryServices: [
      {
        title: "Ensaio de segurança elétrica",
        text: "Aterramento, isolamento e correntes de fuga do equipamento e das partes aplicadas ao paciente.",
        href: "/consult/engenharia-clinica/seguranca-eletrica",
        icon: ShieldCheck,
      },
      {
        title: "Ensaio de desempenho (calibração)",
        text: "Comparação ponto a ponto do que o equipamento mede ou entrega com analisador ou simulador calibrado.",
        href: "/consult/engenharia-clinica/desempenho-calibracao",
        icon: Gauge,
      },
      {
        title: "Manutenção preventiva",
        text: "Limpeza, lubrificação e testes de funcionamento. Peças necessárias são registradas como pendência, sem venda ou troca pela Consult.",
        href: "/consult/engenharia-clinica/manutencao-preventiva",
        icon: Wrench,
      },
      {
        title: "Reverificação",
        text: "Novo ensaio depois que o hospital ou fornecedor escolhido resolve a pendência indicada no laudo anterior.",
        href: "/consult/engenharia-clinica/reverificacao",
        icon: CheckCircle2,
      },
      {
        title: "Qualificação térmica",
        text: "Mapeamento de temperatura durante ciclos de operação para demonstrar desempenho dentro da faixa especificada.",
        href: "/consult/engenharia-clinica/qualificacao-termica",
        icon: Thermometer,
      },
    ],
    standards: [
      "RDC 509/2021 — base geral da Engenharia Clínica",
      "ABNT NBR IEC 62353 — segurança elétrica recorrente e após reparo",
      "Família ABNT NBR IEC 60601 e manual do fabricante — conforme equipamento",
      "RDC 15/2012 — autoclaves",
      "RDC 197/2017 e referências do PNI — câmaras de vacina",
    ],
    receive: [
      ["Laudo por equipamento", "O resultado fica documentado por equipamento e assinado pelo responsável técnico."],
      ["Histórico no Arkmeds", "A emissão no sistema preserva o histórico técnico do equipamento."],
      ["Rastreabilidade RBC", "Os analisadores utilizados possuem certificado de calibração com rastreabilidade RBC."],
    ],
    faq: [
      ["A Consult conserta os equipamentos?", "Não. A Consult mede, ensaia, documenta e informa a condição encontrada. O reparo fica com a equipe ou fornecedor escolhido pelo hospital."],
      ["A Consult vende ou troca peças?", "Não. Na manutenção preventiva, peças gastas ou vencidas são registradas como pendência com sua especificação."],
      ["Como o resultado fica registrado?", "O cliente recebe laudo por equipamento, assinado pelo responsável técnico e emitido no Arkmeds, preservando o histórico."],
    ],
    showEngineeringEquipment: true,
    independence: true,
  },
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#064946]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 md:px-8">
        <Link to="/consult" aria-label="Página inicial da Consult">
          <img src={LOGO} alt="Consult Radiometria e Qualidade" className="h-10 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link to="/consult#areas" className="hidden text-white/80 hover:text-white md:inline">Áreas de atuação</Link>
          <Link to="/consult#contato" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FF6B26] px-4 py-2.5 text-white">
            <CalendarDays size={17} /> Agende uma reunião
          </Link>
        </div>
      </div>
    </header>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;
  return (
    <Link to={service.href} className="group rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#9DD7C8] hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><Icon size={22} /></div>
      <h3 className="mt-5 text-lg font-black text-[#075653]">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#557270]">{service.text}</p>
      <span className="mt-5 inline-block text-sm font-extrabold text-[#078B6B] group-hover:text-[#075653]">Ver serviço</span>
    </Link>
  );
}

function Faq({ items }) {
  return (
    <div className="mt-7 divide-y divide-[#DDEBE8] overflow-hidden rounded-2xl border border-[#DDEBE8] bg-white">
      {items.map(([question, answer]) => (
        <details key={question} className="group px-5 py-4 md:px-6">
          <summary className="cursor-pointer list-none pr-5 text-sm font-extrabold text-[#123C3B]">{question}</summary>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-[#557270]">{answer}</p>
        </details>
      ))}
    </div>
  );
}

export default function ConsultAreaLandingPage() {
  const { slug } = useParams();
  const area = useMemo(() => AREAS[slug], [slug]);

  useEffect(() => {
    if (!area) return;
    document.title = `${area.title} | Consult Radiometria e Qualidade`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", area.hero);
  }, [area]);

  if (!area) {
    return (
      <div className="min-h-screen bg-[#F6FAF9] text-[#123C3B]">
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl font-black">Área não encontrada</h1>
          <Link to="/consult" className="mt-8 inline-flex font-bold text-[#075653]">Voltar para a Consult</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6FAF9] text-[#123C3B]">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 72% 18%, #8AE600 0, transparent 18%), linear-gradient(120deg, transparent 40%, #0B756A 100%)" }} />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.05fr_.95fr] md:items-center md:px-8 md:py-16 lg:py-20">
            <div>
              <Link to="/consult#areas" className="text-sm font-semibold text-white/70 hover:text-white">Áreas de atuação</Link>
              <p className="mt-7 text-xs font-black uppercase tracking-[0.24em] text-[#8AE600]">{area.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.04] tracking-tight md:text-6xl">{area.title}</h1>
              <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/94">{area.hero}</p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75 md:text-base">{area.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/consult#contato" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white">
                  <CalendarDays size={18} /> Agende uma reunião
                </Link>
                <Link to="/consult#cobertura" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white">
                  <MapPin size={18} /> Ver área de atendimento
                </Link>
              </div>
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/15 bg-[#0A625D] shadow-2xl md:min-h-[430px]">
              <img src={area.image} alt={`${area.title} — Consult Radiometria e Qualidade`} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#043F3D]/85 via-[#043F3D]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8AE600]">Consult Radiometria e Qualidade</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/88">Atendimento presencial confirmado em SP, PR, MS e MG. Sede em Matão/SP.</p>
              </div>
            </div>
          </div>
        </section>

        {area.independence && (
          <section className="border-y border-[#9de75d]/30 bg-[#053F3D] text-white">
            <div className="mx-auto grid max-w-7xl gap-4 px-5 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8AE600]">Verificação independente</p>
                <p className="mt-1 max-w-4xl text-sm leading-6 text-white/85">Não consertamos e não vendemos peças. Confirmamos a medição, entregamos o resultado técnico e o laudo.</p>
              </div>
              <span className="text-xs font-bold text-white/60">Sem vínculo com empresas de conserto</span>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#08A77F]">Serviços</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653] md:text-4xl">O que a Consult faz nesta área</h2>
            <p className="mt-4 text-base leading-7 text-[#557270]">Cada serviço abaixo possui uma página própria com finalidade, público, entregável e base normativa.</p>
          </div>
          <div className={`mt-8 grid gap-5 ${area.primaryServices.length > 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-3"}`}>
            {area.primaryServices.map((service) => <ServiceCard key={service.href} service={service} />)}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#08A77F]">Entrega técnica</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653] md:text-4xl">O que o cliente recebe</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {area.receive.map(([title, text], index) => {
                const icons = [Gauge, FileText, CheckCircle2];
                const Icon = icons[index] || CheckCircle2;
                return (
                  <article key={title} className="rounded-2xl border border-[#DDEBE8] bg-[#F8FBFA] p-6">
                    <Icon size={23} className="text-[#078B6B]" />
                    <h3 className="mt-4 text-lg font-black text-[#075653]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#557270]">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {area.situations && (
          <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <div className="grid gap-9 md:grid-cols-[.75fr_1.25fr] md:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#08A77F]">Quando contratar</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Situações em que a proteção radiológica precisa entrar no projeto</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {area.situations.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-[#DDEBE8] bg-white p-4 text-sm font-semibold leading-6 text-[#365A58]">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#08A77F]" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {area.showRadiologyEquipment && (
          <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#08A77F]">Equipamentos e modalidades</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Controle de qualidade por modalidade</h2>
                <p className="mt-4 text-sm leading-7 text-[#557270]">A base normativa muda conforme o equipamento avaliado. O Controle de Qualidade possui a matriz completa de RDC e Instruções Normativas.</p>
                <Link to="/consult/servicos/controle-qualidade" className="mt-6 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Ver Controle de Qualidade</Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {RADIOLOGY_EQUIPMENT.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-[#DDEBE8] bg-white p-4 text-sm font-semibold text-[#365A58]">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#08A77F]" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {area.showEngineeringEquipment && (
          <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#08A77F]">Equipamentos atendidos</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653] md:text-4xl">Veja exatamente o que pode ser ensaiado</h2>
              <p className="mt-4 text-base leading-7 text-[#557270]">Cada equipamento tem uma página própria indicando o que é verificado, qual analisador é utilizado e como o resultado é documentado.</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ENGINEERING_EQUIPMENT.map(([label, href]) => (
                <Link key={href} to={href} className="flex min-h-20 items-center gap-3 rounded-xl border border-[#DDEBE8] bg-white p-4 font-bold text-[#365A58] transition hover:border-[#86CDBA] hover:text-[#075653]">
                  <Activity size={19} className="shrink-0 text-[#08A77F]" /> {label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="bg-[#EAF5F2]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[.8fr_1.2fr] md:px-8 md:py-16">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#08A77F]">Normas e referências</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Base técnica do serviço</h2>
              <p className="mt-4 text-sm leading-7 text-[#557270]">A norma efetivamente aplicável depende do serviço, da modalidade e do equipamento avaliado.</p>
            </div>
            <div className="grid gap-3">
              {area.standards.map((standard) => (
                <div key={standard} className="flex items-start gap-3 rounded-xl border border-[#CEE4DE] bg-white/80 p-4 text-sm font-semibold leading-6 text-[#365A58]">
                  <FileText size={18} className="mt-0.5 shrink-0 text-[#078B6B]" /> {standard}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#08A77F]">Diferenciais</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Medição e resultado técnico, sem misturar diagnóstico com venda de reparo</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [FileText, "Laudo por equipamento", "O resultado técnico é documentado e pode ser usado como evidência do serviço realizado."],
                [Building2, "Equipe técnica própria", "A atuação técnica é executada pela estrutura da Consult, conforme o escopo contratado."],
                [ShieldCheck, "Independência", "Na Engenharia Clínica, a Consult não vende peças e não atua vinculada à empresa de conserto."],
                [Gauge, "Rastreabilidade", "Na Engenharia Clínica, os analisadores possuem certificado de calibração com rastreabilidade RBC."],
              ].map(([Icon, title, text]) => (
                <article key={title} className="rounded-2xl border border-[#DDEBE8] bg-white p-5">
                  <Icon size={21} className="text-[#078B6B]" />
                  <h3 className="mt-4 font-black text-[#075653]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#557270]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#08A77F]">Dúvidas frequentes</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Antes de solicitar o atendimento</h2>
          <Faq items={area.faq} />
        </section>

        <section className="bg-[#064946] text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 md:grid-cols-[1fr_auto] md:items-center md:px-8 md:py-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8AE600]">SP · PR · MS · MG</p>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">Precisa avaliar um serviço ou equipamento?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">Converse com a equipe técnica da Consult e explique o que precisa ser verificado.</p>
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
