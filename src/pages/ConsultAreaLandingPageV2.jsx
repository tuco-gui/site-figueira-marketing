import React, { useEffect, useMemo } from 'react'
import { Activity, CalendarDays, CheckCircle2, ClipboardCheck, ExternalLink, FileText, Gauge, MapPin, ShieldCheck, Stethoscope, Thermometer, Wrench } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultTechnicalVisual } from '@/components/consult/ConsultTechnicalDesign'

const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'
const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2020/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'

const ENGINEERING_EQUIPMENT = [
  ['Monitor multiparamétrico', '/consult/equipamentos/monitor-multiparametrico'],
  ['Eletrocardiógrafo', '/consult/equipamentos/eletrocardiografo'],
  ['Oxímetro de pulso', '/consult/equipamentos/oximetro-pulso'],
  ['Esfigmomanômetro digital e MAPA', '/consult/equipamentos/esfigmomanometro-mapa'],
  ['Desfibrilador, cardioversor e DEA', '/consult/equipamentos/desfibrilador-cardioversor-dea'],
  ['Marca-passo transcutâneo', '/consult/equipamentos/marca-passo-transcutaneo'],
  ['Bisturi elétrico', '/consult/equipamentos/bisturi-eletrico'],
  ['Ventilador pulmonar', '/consult/equipamentos/ventilador-pulmonar'],
  ['Aparelho de anestesia', '/consult/equipamentos/aparelho-anestesia'],
  ['CPAP e BiPAP', '/consult/equipamentos/cpap-bipap'],
  ['Fluxômetro e manômetro de O₂', '/consult/equipamentos/fluxometro-manometro-o2'],
  ['Autoclave', '/consult/equipamentos/autoclave'],
  ['Termodesinfectora e estufa', '/consult/equipamentos/termodesinfectora-estufa'],
  ['Estufa e banho-maria de laboratório', '/consult/equipamentos/estufa-banho-maria'],
  ['Geladeira e câmara de vacina', '/consult/equipamentos/geladeira-camara-vacina'],
]

const AREAS = {
  'fisica-medica': {
    title: 'Física Médica',
    eyebrow: 'Medição, controle de qualidade e laudo técnico',
    hero: 'Verificação técnica de equipamentos de diagnóstico por imagem para comprovar segurança, desempenho e conformidade.',
    intro: 'A Consult executa testes e medições em equipamentos de diagnóstico por imagem, verifica dose, qualidade de imagem e funcionamento e documenta os resultados em laudo técnico assinado pelo físico médico.',
    visualVariant: 'measurement',
    visualMetric: 'Dose, qualidade de imagem e desempenho documentados',
    highlights: ['Dose e desempenho', 'Qualidade de imagem', 'Laudo técnico', 'RDC 611/2022 + INs'],
    services: [
      ['Controle de qualidade (CQ)', 'Testes periódicos para verificar dose, qualidade de imagem e funcionamento dos equipamentos.', '/consult/servicos/controle-qualidade', Gauge],
      ['Levantamento radiométrico', 'Medição da radiação ao redor da sala e avaliação da radiação de fuga do cabeçote.', '/consult/servicos/levantamento-radiometrico', Activity],
      ['Projeto de blindagem', 'Cálculo técnico da blindagem antes de obra, reforma, expansão ou troca de equipamento.', '/consult/servicos/projeto-blindagem', ShieldCheck],
    ],
    process: [
      ['01', 'Entender a modalidade', 'A equipe identifica equipamento, ambiente, escopo e condição operacional.'],
      ['02', 'Medir e ensaiar', 'Os parâmetros aplicáveis são verificados com metodologia e instrumentos adequados.'],
      ['03', 'Comparar com critérios', 'Os resultados são analisados conforme requisitos aplicáveis à modalidade.'],
      ['04', 'Documentar', 'O cliente recebe o resultado técnico em laudo ou documentação correspondente.'],
    ],
    deliverables: [
      ['Medição objetiva', 'Parâmetros do equipamento verificados com metodologia técnica aplicável.', Gauge],
      ['Resultado documentado', 'Laudo técnico com os resultados dos ensaios realizados.', FileText],
      ['Base normativa clara', 'A norma aplicável é associada ao equipamento e ao serviço realizado.', CheckCircle2],
    ],
    standards: [
      ['RDC 611/2022', 'Organização e funcionamento de serviços de radiologia diagnóstica ou intervencionista.', RDC_611],
      ['IN 90/2021', 'Radiografia médica convencional.', ANVISA_IN],
      ['IN 91/2021', 'Fluoroscopia e radiologia intervencionista.', ANVISA_IN],
      ['IN 92/2021', 'Mamografia.', ANVISA_IN],
      ['IN 93/2021', 'Tomografia computadorizada.', ANVISA_IN],
      ['IN 94 a 97/2021', 'Radiologia odontológica, ultrassom e ressonância magnética.', ANVISA_IN],
    ],
    faq: [
      ['O que é verificado no Controle de Qualidade?', 'Dose, qualidade de imagem e funcionamento do equipamento, conforme a modalidade avaliada.'],
      ['O cliente recebe laudo?', 'Sim. O resultado dos testes é documentado em laudo técnico assinado pelo responsável aplicável.'],
      ['Onde há atendimento presencial?', 'São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais.'],
    ],
    secondaryTitle: 'Modalidades e equipamentos de diagnóstico por imagem',
    secondaryItems: ['Raios X médico convencional','Fluoroscopia, arco cirúrgico e angiógrafo','Mamógrafo','Tomógrafo','Raios X odontológico extraoral','Raios X odontológico intraoral','Ultrassom','Ressonância magnética','Densitômetro ósseo','Raios X veterinário'],
  },
  'protecao-radiologica': {
    title: 'Proteção Radiológica',
    eyebrow: 'Segurança, documentação e conformidade técnica',
    hero: 'Estruturação da proteção radiológica para reduzir riscos e manter o serviço alinhado às exigências aplicáveis.',
    intro: 'A Consult apoia serviços de radiologia diagnóstica e intervencionista na implantação e manutenção das rotinas de proteção radiológica, realizando medições, projetos, documentação, treinamento e suporte ao licenciamento sanitário.',
    visualVariant: 'shield',
    visualMetric: 'Ambiente, proteção e documentação conectados no mesmo processo',
    highlights: ['Proteção ocupacional', 'Levantamento radiométrico', 'Blindagem', 'Documentação'],
    services: [
      ['Programa de Proteção Radiológica', 'Elaboração e acompanhamento do programa exigido para serviços de radiologia diagnóstica e intervencionista.', '/consult/servicos/programa-protecao-radiologica', ClipboardCheck],
      ['Levantamento radiométrico', 'Medição das condições radiométricas da sala e das áreas ao redor.', '/consult/servicos/levantamento-radiometrico', Activity],
      ['Projeto de blindagem', 'Memorial de cálculo para construção, reforma, expansão ou troca de equipamento.', '/consult/servicos/projeto-blindagem', ShieldCheck],
      ['Treinamentos', 'Capacitação periódica das equipes em radioproteção e segurança.', '/consult/servicos/treinamentos', Stethoscope],
      ['Licenciamento sanitário', 'Apoio técnico e documental para obtenção ou renovação da licença sanitária.', '/consult/servicos/licenciamento-sanitario', FileText],
    ],
    process: [
      ['01', 'Mapear o cenário', 'Serviço, equipamento, sala, equipe e situação regulatória são identificados.'],
      ['02', 'Avaliar e medir', 'A Consult realiza medições, cálculos ou revisão documental conforme o escopo.'],
      ['03', 'Organizar evidências', 'Memoriais, programas, registros e documentos são estruturados.'],
      ['04', 'Orientar a continuidade', 'A instituição recebe a documentação e os próximos passos aplicáveis.'],
    ],
    deliverables: [
      ['Diagnóstico técnico', 'Medições e verificações que demonstram as condições radiológicas avaliadas.', Activity],
      ['Documentação', 'Programas, memoriais, registros e documentação técnica conforme o serviço contratado.', FileText],
      ['Orientação de conformidade', 'Apoio para organizar evidências e requisitos aplicáveis à operação.', ShieldCheck],
    ],
    standards: [
      ['RDC 611/2022', 'Base sanitária para serviços de radiologia diagnóstica ou intervencionista.', RDC_611],
      ['IN 90 a 97/2021', 'Requisitos específicos conforme modalidade e equipamento.', ANVISA_IN],
    ],
    faq: [
      ['Quando fazer levantamento radiométrico?', 'Em situações como sala nova ou reformada, troca de equipamento e demais hipóteses em que a avaliação radiométrica seja aplicável.'],
      ['A Consult faz projeto de blindagem?', 'Sim. O cálculo técnico pode apoiar obra, reforma, expansão ou troca de equipamento.'],
      ['A Consult apoia licenciamento sanitário?', 'Sim, com suporte técnico e documental conforme o escopo contratado.'],
    ],
    secondaryTitle: 'Quando a proteção radiológica entra no projeto',
    secondaryItems: ['Sala nova ou em reforma','Troca de equipamento','Expansão de clínica ou hospital','Renovação de licença sanitária','Implantação ou revisão do Programa de Proteção Radiológica','Treinamento periódico da equipe'],
  },
  'engenharia-clinica': {
    title: 'Consult Engenharia Clínica',
    eyebrow: 'Medição, ensaio, calibração, qualificação e laudo',
    hero: 'Avaliação independente de equipamentos de saúde, com resultado técnico documentado e sem vínculo com empresas de conserto.',
    intro: 'A Consult confirma por medição se o equipamento está seguro e entregando o que deveria entregar. Cada atendimento gera documentação por equipamento e cria uma base objetiva para a instituição decidir o próximo passo.',
    visualVariant: 'clinical',
    visualMetric: 'Equipamento, ensaio e laudo ligados ao histórico técnico',
    highlights: ['RDC 509/2021', 'Laudo por equipamento', 'Arkmeds', 'Rastreabilidade RBC'],
    independence: true,
    services: [
      ['Ensaio de segurança elétrica', 'Aterramento, isolamento e correntes de fuga do equipamento e das partes aplicadas ao paciente.', '/consult/engenharia-clinica/seguranca-eletrica', ShieldCheck],
      ['Ensaio de desempenho (calibração)', 'Comparação ponto a ponto com analisador ou simulador calibrado.', '/consult/engenharia-clinica/desempenho-calibracao', Gauge],
      ['Manutenção preventiva', 'Limpeza, lubrificação e testes. Peças necessárias são registradas como pendência, sem venda ou troca pela Consult.', '/consult/engenharia-clinica/manutencao-preventiva', Wrench],
      ['Reverificação', 'Novo ensaio depois que a pendência indicada anteriormente foi tratada.', '/consult/engenharia-clinica/reverificacao', CheckCircle2],
      ['Qualificação térmica', 'Mapeamento de temperatura durante ciclos de operação para demonstrar desempenho.', '/consult/engenharia-clinica/qualificacao-termica', Thermometer],
    ],
    process: [
      ['01', 'Identificar o equipamento', 'Modelo, aplicação, histórico e ensaio necessário são definidos.'],
      ['02', 'Medir', 'Analisadores e simuladores calibrados são usados conforme o equipamento.'],
      ['03', 'Registrar o resultado', 'Os valores medidos e as condições encontradas são documentados.'],
      ['04', 'Emitir o laudo', 'O resultado fica associado ao equipamento e preservado no histórico técnico.'],
    ],
    deliverables: [
      ['Laudo por equipamento', 'O resultado fica documentado por equipamento e assinado pelo responsável técnico.', FileText],
      ['Histórico no Arkmeds', 'A emissão no sistema preserva o histórico técnico do equipamento.', ClipboardCheck],
      ['Rastreabilidade RBC', 'Os analisadores utilizados possuem certificado de calibração com rastreabilidade RBC.', Gauge],
    ],
    standards: [
      ['RDC 509/2021', 'Critérios mínimos para gerenciamento de tecnologias em saúde.', RDC_509],
      ['ABNT NBR IEC 62353', 'Referência para segurança elétrica recorrente e após reparo.', ABNT],
      ['Família ABNT NBR IEC 60601', 'Normas aplicáveis conforme a categoria e características do equipamento.', ABNT],
    ],
    faq: [
      ['A Consult conserta equipamentos?', 'Não. A Consult mede, ensaia, documenta e informa a condição encontrada.'],
      ['A Consult vende ou troca peças?', 'Não. Quando aplicável, a necessidade de peça é registrada como pendência.'],
      ['Como o resultado fica registrado?', 'O cliente recebe documentação por equipamento e o histórico técnico é preservado.'],
    ],
    equipment: ENGINEERING_EQUIPMENT,
  },
}

function ServiceCard({ item, index }) {
  const [title, text, href, Icon] = item
  const dark = index % 3 === 2
  return (
    <Link to={href} className={`group relative overflow-hidden rounded-[22px] border p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${dark ? 'border-[#075653] bg-[#075653] text-white shadow-[0_18px_45px_rgba(7,86,83,.16)]' : 'border-[#D9E9E5] bg-white text-[#123C3B] shadow-[0_12px_35px_rgba(7,86,83,.06)] hover:border-[#83CBB8]'}`}>
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${dark ? 'bg-[#8AE600] text-[#075653]' : 'bg-[#E7F6F1] text-[#078B6B]'}`}><Icon size={21} /></div>
      <h3 className={`mt-5 text-lg font-black leading-6 sm:text-xl ${dark ? 'text-white' : 'text-[#075653]'}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${dark ? 'text-white/68' : 'text-[#607D7A]'}`}>{text}</p>
      <span className={`mt-5 inline-flex text-[10px] font-black uppercase tracking-[.14em] sm:text-xs ${dark ? 'text-[#B8FF51]' : 'text-[#078B6B]'}`}>Ver serviço</span>
    </Link>
  )
}

function Faq({ items }) {
  return <div className="mt-7 divide-y divide-white/10 overflow-hidden rounded-[22px] border border-white/10 bg-white/5">{items.map(([question, answer]) => (
    <details key={question} className="group px-4 py-4 sm:px-5 sm:py-5 md:px-6">
      <summary className="cursor-pointer list-none pr-5 text-sm font-extrabold text-white">{question}</summary>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-white/68">{answer}</p>
    </details>
  ))}</div>
}

export default function ConsultAreaLandingPageV2() {
  const { slug } = useParams()
  const area = useMemo(() => AREAS[slug], [slug])

  useEffect(() => {
    if (!area) return
    document.title = `${area.title} | Consult Radiometria e Qualidade`
    document.querySelector('meta[name="description"]')?.setAttribute('content', area.hero)
  }, [area])

  if (!area) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Área não encontrada</h1><Link to="/consult" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para a Consult</Link></main></ConsultSiteShell>

  return (
    <ConsultSiteShell>
      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle at 18% 100%, rgba(5,210,157,.18), transparent 26%), linear-gradient(120deg, transparent 45%, rgba(138,230,0,.08) 100%)' }} />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:py-14 md:grid-cols-[1.02fr_.98fr] md:items-center md:px-8 md:py-16 lg:min-h-[590px] lg:gap-12 lg:py-20">
            <div className="flex min-w-0 flex-col justify-center">
              <Link to="/consult#areas" className="text-sm font-bold text-white/58 hover:text-white">Áreas de atuação</Link>
              <p className="mt-7 text-[9px] font-black uppercase tracking-[.22em] text-[#8AE600] sm:mt-8 sm:text-[10px] sm:tracking-[.28em]">{area.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-[2.35rem] font-black leading-[1.02] tracking-[-.04em] sm:text-5xl lg:text-6xl">{area.title}</h1>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/92 sm:mt-6 sm:text-lg sm:leading-8">{area.hero}</p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68 sm:leading-7 md:text-[15px] lg:text-base">{area.intro}</p>
              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                <a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white"><CalendarDays size={18}/> Agende uma reunião</a>
                <a href="/consult#cobertura" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/22 px-5 py-3 text-sm font-bold text-white"><MapPin size={18}/> Ver atendimento</a>
              </div>
            </div>
            <div className="min-w-0 pb-1 md:pb-0">
              <ConsultTechnicalVisual variant={area.visualVariant} title={area.title} metric={area.visualMetric} compact />
              <div className="mx-auto mt-3 grid max-w-[500px] grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
                {area.highlights.map((item) => <div key={item} className="rounded-xl border border-white/12 bg-[#043F3D]/58 px-3 py-2.5 text-center text-[10px] font-extrabold leading-4 text-white/86 backdrop-blur sm:text-[11px]">{item}</div>)}
              </div>
            </div>
          </div>
        </section>

        {area.independence && <section className="border-y border-[#8AE600]/25 bg-[#043F3D] text-white"><div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-8"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#8AE600]">Verificação independente</p><p className="mt-1 text-sm leading-6 text-white/74">Não consertamos e não vendemos peças. A Consult mede, ensaia, documenta e entrega o resultado técnico.</p></div><span className="text-xs font-bold text-white/48">Sem vínculo com empresa de conserto</span></div></section>}

        <section className="bg-[#F4FAF8]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14 md:px-8 md:py-16">
            <div className="grid gap-8 lg:grid-cols-[.62fr_1.38fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <ConsultEyebrow>Serviços</ConsultEyebrow>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653] md:text-4xl">O que a Consult faz nesta área</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#607D7A]">Cada frente técnica leva a uma página própria com finalidade, processo, entregáveis e base normativa.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {area.services.map((service, index) => <ServiceCard key={service[2]} item={service} index={index} />)}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute inset-0 opacity-45" style={{ backgroundImage: 'linear-gradient(115deg, transparent 30%, rgba(5,210,157,.12) 70%, transparent), radial-gradient(circle at 88% 20%, rgba(138,230,0,.14), transparent 22%)' }} />
          <div className="relative mx-auto max-w-7xl px-5 py-12 sm:py-14 md:px-8 md:py-16">
            <div className="max-w-3xl"><ConsultEyebrow light>Como funciona</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Da necessidade ao resultado documentado</h2></div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{area.process.map(([number,title,text]) => <article key={number} className="rounded-[20px] border border-white/10 bg-white/6 p-5 backdrop-blur"><span className="text-3xl font-black text-[#8AE600]">{number}</span><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{text}</p></article>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:py-14 md:px-8 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[.68fr_1.32fr]">
            <div><ConsultEyebrow>Entrega técnica</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653] md:text-4xl">O que o cliente recebe</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#607D7A]">A entrega não é só uma visita. O resultado precisa ficar compreensível, rastreável e documentado.</p></div>
            <div className="grid gap-4 sm:grid-cols-3">{area.deliverables.map(([title,text,Icon]) => <article key={title} className="rounded-[20px] border border-[#DCEAE7] bg-white p-5 shadow-[0_14px_40px_rgba(7,86,83,.07)] sm:p-6"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F6F1] text-[#078B6B]"><Icon size={22}/></div><h3 className="mt-4 text-lg font-black text-[#075653]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#607D7A]">{text}</p></article>)}</div>
          </div>
        </section>

        <section className="bg-[#EAF5F2]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:py-14 md:px-8 md:py-16 lg:grid-cols-[.68fr_1.32fr]">
            <div><ConsultEyebrow>{area.equipment ? 'Equipamentos atendidos' : 'Aplicações'}</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">{area.equipment ? 'Veja exatamente o que pode ser ensaiado' : area.secondaryTitle}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#607D7A]">A estrutura foi organizada para levar o visitante da visão geral até a informação técnica específica.</p></div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{(area.equipment || area.secondaryItems.map((item) => [item,null])).map(([label,href]) => href ? <Link key={href} to={href} className="flex min-h-16 items-center gap-3 rounded-xl border border-[#CEE4DE] bg-white p-4 text-sm font-extrabold text-[#365A58] transition hover:border-[#08A77F] hover:text-[#075653] sm:min-h-20"><Activity size={18} className="shrink-0 text-[#08A77F]"/> {label}</Link> : <div key={label} className="flex min-h-16 items-center gap-3 rounded-xl border border-[#CEE4DE] bg-white p-4 text-sm font-bold text-[#365A58] sm:min-h-20"><CheckCircle2 size={18} className="shrink-0 text-[#08A77F]"/> {label}</div>)}</div>
          </div>
        </section>

        <section className="bg-[#043F3D] text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:py-14 md:px-8 md:py-16 lg:grid-cols-[.62fr_1.38fr]">
            <div><ConsultEyebrow light>Normas e referências</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Base técnica do serviço</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/62">As referências abaixo podem ser abertas para consulta. A norma aplicável depende do serviço e do equipamento.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{area.standards.map(([label,text,href]) => <a key={`${label}-${text}`} href={href} target="_blank" rel="noreferrer" className="group rounded-[18px] border border-white/10 bg-white/6 p-5 transition hover:border-[#8AE600]/50 hover:bg-white/10"><div className="flex items-start justify-between gap-4"><FileText size={20} className="shrink-0 text-[#8AE600]"/><ExternalLink size={15} className="text-white/35 transition group-hover:text-[#8AE600]"/></div><h3 className="mt-4 font-black text-white">{label}</h3><p className="mt-2 text-xs leading-5 text-white/58">{text}</p><span className="mt-4 inline-flex text-[10px] font-black uppercase tracking-[.15em] text-[#B8FF51]">Ver referência oficial</span></a>)}</div>
          </div>
        </section>

        <section className="bg-[#075653] text-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:py-14 md:px-8 md:py-16"><ConsultEyebrow light>Dúvidas frequentes</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Antes de solicitar o atendimento</h2><Faq items={area.faq}/></div>
        </section>

        <ConsultCtaBand title={`Vamos conversar sobre ${area.title}?`} />
      </main>
    </ConsultSiteShell>
  )
}
