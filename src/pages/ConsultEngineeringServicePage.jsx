import React, { useEffect, useMemo } from 'react'
import { CheckCircle2, ExternalLink, FileText, Gauge, ShieldCheck, Thermometer, Wrench } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'

const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2020/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'

const SERVICES = {
  'seguranca-eletrica': {
    title: 'Ensaio de segurança elétrica',
    intro: 'Medição de resistência de aterramento, resistência de isolamento e correntes de fuga do equipamento e das partes aplicadas ao paciente.',
    norm: 'ABNT NBR IEC 62353 — ensaio recorrente e após reparo',
    normUrl: ABNT,
    result: 'Laudo com valores medidos, limites aplicáveis e resultado documentado.',
    icon: ShieldCheck,
    points: ['Aterramento','Isolamento','Correntes de fuga','Partes aplicadas ao paciente'],
  },
  'desempenho-calibracao': {
    title: 'Ensaio de desempenho (calibração)',
    intro: 'Comparação, ponto a ponto, do que o equipamento mede ou entrega com um analisador ou simulador calibrado.',
    norm: 'Manual do fabricante e norma particular de cada equipamento — família ABNT NBR IEC 60601',
    normUrl: ABNT,
    result: 'Laudo com pontos ensaiados, desvios encontrados e conformidade documentada.',
    icon: Gauge,
    points: ['Pontos de medição','Desvios','Comparação com referência','Resultado documentado'],
  },
  'manutencao-preventiva': {
    title: 'Manutenção preventiva',
    intro: 'Limpeza, lubrificação e testes de funcionamento. Peças gastas ou vencidas são registradas como pendência, com sua especificação. A Consult não vende nem troca peças.',
    norm: 'Plano de manutenção do fabricante e base geral da RDC 509/2021',
    normUrl: RDC_509,
    result: 'Laudo com o que foi realizado e a lista de pendências identificadas.',
    icon: Wrench,
    points: ['Limpeza técnica','Lubrificação quando aplicável','Teste de funcionamento','Registro de pendências'],
  },
  reverificacao: {
    title: 'Reverificação',
    intro: 'Novo ensaio depois que o hospital ou fornecedor escolhido resolve uma pendência indicada em avaliação anterior.',
    norm: 'A mesma referência técnica do ensaio original',
    normUrl: RDC_509,
    result: 'Laudo atualizado com o novo resultado da verificação.',
    icon: CheckCircle2,
    points: ['Revisão da pendência','Novo ensaio','Comparação com resultado anterior','Laudo atualizado'],
  },
  'qualificacao-termica': {
    title: 'Qualificação térmica',
    intro: 'Mapeamento de temperatura com sensores calibrados durante ciclos de operação, para demonstrar que o equipamento esteriliza, aquece ou conserva dentro da faixa especificada.',
    norm: 'RDC 15/2012, RDC 197/2017, referências do PNI e RDC 430/2020 conforme o equipamento',
    normUrl: 'https://www.gov.br/anvisa/pt-br',
    result: 'Relatório de qualificação com registros de temperatura, gráficos e resultado de conformidade.',
    icon: Thermometer,
    points: ['Sensores calibrados','Mapeamento de temperatura','Ciclo de operação','Relatório de qualificação'],
  },
}

const PROCESS = [
  ['01','Identificação','Equipamento, modelo, aplicação e ensaio necessário são definidos.'],
  ['02','Medição','Analisadores ou simuladores calibrados são utilizados conforme o equipamento.'],
  ['03','Análise','Os valores medidos são comparados com a referência aplicável.'],
  ['04','Laudo','O resultado fica documentado por equipamento e preservado no histórico técnico.'],
]

export default function ConsultEngineeringServicePage() {
  const { slug } = useParams()
  const service = useMemo(() => SERVICES[slug], [slug])

  useEffect(() => {
    if (!service) return
    document.title = `${service.title} | Consult Engenharia Clínica`
    document.querySelector('meta[name="description"]')?.setAttribute('content', service.intro)
  }, [service])

  if (!service) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Serviço não encontrado</h1><Link to="/consult/areas/engenharia-clinica" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Engenharia Clínica</Link></main></ConsultSiteShell>

  const Icon = service.icon
  return (
    <ConsultSiteShell>
      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute inset-0 opacity-55" style={{backgroundImage:'radial-gradient(circle at 82% 30%, rgba(138,230,0,.18), transparent 23%), linear-gradient(125deg, transparent 45%, rgba(5,210,157,.12) 100%)'}}/>
          <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[1fr_300px] lg:items-end">
            <div>
              <Link to="/consult/areas/engenharia-clinica" className="text-sm font-bold text-white/58 hover:text-white">Consult Engenharia Clínica</Link>
              <p className="mt-8 text-[10px] font-black uppercase tracking-[.28em] text-[#8AE600]">Medição, ensaio e documentação</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-.04em] sm:text-5xl lg:text-6xl">{service.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 md:text-lg">{service.intro}</p>
            </div>
            <div className="rounded-[22px] border border-white/12 bg-white/7 p-6 backdrop-blur"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8AE600] text-[#075653]"><Icon size={23}/></div><p className="mt-5 text-xs font-black uppercase tracking-[.17em] text-white/45">Resultado</p><p className="mt-2 text-sm font-bold leading-6 text-white/90">{service.result}</p></div>
          </div>
        </section>

        <section className="border-y border-[#8AE600]/25 bg-[#043F3D] text-white"><div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-8"><div className="flex gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#8AE600]"/><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#8AE600]">Verificação independente</p><p className="mt-1 text-sm leading-6 text-white/74">Não consertamos e não vendemos peças. A Consult mede, documenta e informa a condição encontrada.</p></div></div><span className="text-xs font-bold text-white/45">Sem vínculo com empresa de conserto</span></div></section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[.65fr_1.35fr]">
          <div><ConsultEyebrow>O que é avaliado</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Pontos principais do ensaio</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">O escopo final depende do equipamento e da referência técnica aplicável.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{service.points.map((point) => <div key={point} className="flex min-h-20 items-center gap-3 rounded-[18px] border border-[#DCEAE7] bg-[#F7FBFA] p-5"><CheckCircle2 size={19} className="shrink-0 text-[#08A77F]"/><span className="text-sm font-extrabold text-[#365A58]">{point}</span></div>)}</div>
        </section>

        <section className="relative overflow-hidden bg-[#075653] text-white"><div className="absolute inset-0 opacity-45" style={{backgroundImage:'linear-gradient(110deg, transparent 25%, rgba(5,210,157,.14) 65%, transparent), radial-gradient(circle at 90% 20%, rgba(138,230,0,.13), transparent 20%)'}}/><div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16"><ConsultEyebrow light>Fluxo técnico</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Do equipamento ao laudo</h2><div className="mt-9 grid gap-4 md:grid-cols-4">{PROCESS.map(([num,title,text]) => <article key={num} className="rounded-[20px] border border-white/10 bg-white/6 p-5"><span className="text-3xl font-black text-[#8AE600]">{num}</span><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-white/62">{text}</p></article>)}</div></div></section>

        <section className="bg-[#F4FAF8]"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[.65fr_1.35fr]"><div><ConsultEyebrow>Base técnica</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Norma e rastreabilidade</h2></div><div className="grid gap-4 md:grid-cols-2"><a href={service.normUrl} target="_blank" rel="noreferrer" className="group rounded-[22px] border border-[#D3E6E0] bg-white p-6 shadow-sm transition hover:border-[#08A77F]"><div className="flex justify-between"><FileText size={22} className="text-[#08A77F]"/><ExternalLink size={16} className="text-[#9AB0AD] group-hover:text-[#08A77F]"/></div><h3 className="mt-5 text-lg font-black text-[#075653]">{service.norm}</h3><p className="mt-3 text-sm leading-6 text-[#607D7A]">Consulte a referência oficial. A aplicação exata depende do equipamento e do contexto do ensaio.</p><span className="mt-4 inline-flex text-[10px] font-black uppercase tracking-[.15em] text-[#078B6B]">Abrir referência</span></a><div className="rounded-[22px] bg-[#075653] p-6 text-white"><Gauge size={22} className="text-[#8AE600]"/><h3 className="mt-5 text-lg font-black">Arkmeds + rastreabilidade RBC</h3><p className="mt-3 text-sm leading-6 text-white/68">A estrutura da Consult prevê laudo por equipamento no Arkmeds e utilização de analisadores com certificado de calibração e rastreabilidade RBC.</p></div></div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16"><div className="rounded-[24px] border border-[#DCEAE7] bg-white p-7 shadow-[0_16px_45px_rgba(7,86,83,.07)] md:p-9"><ConsultEyebrow>Entregável</ConsultEyebrow><div className="mt-5 flex flex-col gap-5 md:flex-row md:items-start"><FileText size={30} className="shrink-0 text-[#08A77F]"/><div><h2 className="text-2xl font-black text-[#075653]">{service.result}</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#607D7A]">Quando a Consult disponibilizar modelos autorizados, esta área poderá mostrar um exemplo visual do laudo ou relatório sem expor dados de clientes.</p></div></div></div></section>

        <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Converse com a equipe Consult para confirmar equipamento, escopo do ensaio e documentação necessária." />
      </main>
    </ConsultSiteShell>
  )
}
