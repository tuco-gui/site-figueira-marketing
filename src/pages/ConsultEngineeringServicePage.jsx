import React, { useEffect, useMemo } from 'react'
import { ExternalLink, FileText, Gauge, ShieldCheck, Thermometer, Wrench, CheckCircle2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultEditorialList, ConsultReportPreview, ConsultSectionNav, ConsultTechnicalVisual } from '@/components/consult/ConsultTechnicalDesign'

const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2020/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'

const SERVICES = {
  'seguranca-eletrica': {
    title: 'Ensaio de segurança elétrica',
    intro: 'Medição de resistência de aterramento, resistência de isolamento e correntes de fuga do equipamento e das partes aplicadas ao paciente.',
    result: 'Laudo com valores medidos, limites aplicáveis e resultado documentado.',
    deliverable: 'Laudo de Segurança Elétrica',
    deliverableSections: ['Identificação do equipamento','Instrumentação utilizada','Parâmetros elétricos','Limites aplicáveis','Resultado do ensaio'],
    norm: 'ABNT NBR IEC 62353 — ensaio recorrente e após reparo',
    normUrl: ABNT,
    icon: ShieldCheck,
    visual: 'clinical',
    metric: 'Aterramento, isolamento e correntes de fuga documentados',
    when: ['Avaliação periódica de equipamento','Após reparo ou intervenção técnica','Quando a instituição precisa demonstrar segurança elétrica','Na composição do histórico técnico do equipamento'],
    points: ['Aterramento','Isolamento','Correntes de fuga','Partes aplicadas ao paciente'],
  },
  'desempenho-calibracao': {
    title: 'Ensaio de desempenho (calibração)',
    intro: 'Comparação, ponto a ponto, do que o equipamento mede ou entrega com um analisador ou simulador calibrado.',
    result: 'Laudo com pontos ensaiados, desvios encontrados e conformidade documentada.',
    deliverable: 'Laudo de Desempenho',
    deliverableSections: ['Identificação do equipamento','Pontos ensaiados','Valor de referência','Desvios observados','Conclusão técnica'],
    norm: 'Manual do fabricante e norma particular de cada equipamento — família ABNT NBR IEC 60601',
    normUrl: ABNT,
    icon: Gauge,
    visual: 'measurement',
    metric: 'Desempenho comparado ponto a ponto com referência calibrada',
    when: ['Avaliação de desempenho do equipamento','Rotina periódica de verificação','Após manutenção ou suspeita de desvio','Quando é necessário documentar desempenho'],
    points: ['Pontos de medição','Desvios','Comparação com referência','Resultado documentado'],
  },
  'manutencao-preventiva': {
    title: 'Manutenção preventiva',
    intro: 'Limpeza, lubrificação e testes de funcionamento. Peças gastas ou vencidas são registradas como pendência, com sua especificação. A Consult não vende nem troca peças.',
    result: 'Laudo com o que foi realizado e a lista de pendências identificadas.',
    deliverable: 'Registro de Manutenção Preventiva',
    deliverableSections: ['Identificação do equipamento','Itens inspecionados','Ações executadas','Pendências identificadas','Registro técnico'],
    norm: 'Plano de manutenção do fabricante e base geral da RDC 509/2021',
    normUrl: RDC_509,
    icon: Wrench,
    visual: 'clinical',
    metric: 'Manutenção registrada sem conflito com venda de peças',
    when: ['Rotina preventiva programada','Equipamentos com plano de manutenção','Antes de falhas previsíveis','Quando é necessário manter histórico das ações realizadas'],
    points: ['Limpeza técnica','Lubrificação quando aplicável','Teste de funcionamento','Registro de pendências'],
  },
  reverificacao: {
    title: 'Reverificação',
    intro: 'Novo ensaio depois que o hospital ou fornecedor escolhido resolve uma pendência indicada em avaliação anterior.',
    result: 'Laudo atualizado com o novo resultado da verificação.',
    deliverable: 'Laudo de Reverificação',
    deliverableSections: ['Referência ao laudo anterior','Pendência tratada','Novo ensaio','Comparação dos resultados','Resultado atualizado'],
    norm: 'A mesma referência técnica do ensaio original',
    normUrl: RDC_509,
    icon: CheckCircle2,
    visual: 'measurement',
    metric: 'Pendência tratada e resultado novamente documentado',
    when: ['Depois da correção indicada em laudo anterior','Após troca de peça por fornecedor escolhido pelo cliente','Quando é necessário comprovar a condição após correção','Para atualizar o histórico técnico do equipamento'],
    points: ['Revisão da pendência','Novo ensaio','Comparação com resultado anterior','Laudo atualizado'],
  },
  'qualificacao-termica': {
    title: 'Qualificação térmica',
    intro: 'Mapeamento de temperatura com sensores calibrados durante ciclos de operação, para demonstrar que o equipamento esteriliza, aquece ou conserva dentro da faixa especificada.',
    result: 'Relatório de qualificação com registros de temperatura, gráficos e resultado de conformidade.',
    deliverable: 'Relatório de Qualificação Térmica',
    deliverableSections: ['Identificação do equipamento','Distribuição dos sensores','Ciclo monitorado','Curvas de temperatura','Resultado da qualificação'],
    norm: 'RDC 15/2012, RDC 197/2017, referências do PNI e RDC 430/2020 conforme o equipamento',
    normUrl: 'https://www.gov.br/anvisa/pt-br',
    icon: Thermometer,
    visual: 'thermal',
    metric: 'Temperatura monitorada ao longo do ciclo com sensores calibrados',
    when: ['Qualificação de autoclaves','Câmaras e equipamentos térmicos','Mapeamento de geladeiras e câmaras de vacina','Quando a estabilidade e uniformidade precisam ser documentadas'],
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

  return (
    <ConsultSiteShell>
      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute -left-52 -top-52 h-[520px] w-[520px] rounded-full border border-white/5" />
          <div className="absolute -left-24 -top-24 h-[300px] w-[300px] rounded-full bg-[#08A77F]/8" />
          <div className="absolute inset-0 opacity-75" style={{backgroundImage:'radial-gradient(circle at 72% 28%, rgba(138,230,0,.14), transparent 24%), linear-gradient(125deg, transparent 44%, rgba(5,210,157,.10) 100%)'}} />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-20 lg:min-h-[650px] lg:grid-cols-[1fr_.92fr] lg:items-center">
            <div>
              <Link to="/consult/areas/engenharia-clinica" className="text-sm font-bold text-white/55 transition hover:text-white">Consult Engenharia Clínica</Link>
              <div className="mt-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.28em] text-[#8AE600]"><span className="h-px w-9 bg-[#8AE600]" />Medição, ensaio e documentação</div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[64px]">{service.title}</h1>
              <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/88 md:text-lg">{service.intro}</p>
              <div className="mt-7 rounded-[18px] border-l-4 border-[#8AE600] bg-white/[.055] px-5 py-4 text-sm font-bold leading-7 text-white/74">A Consult mede, ensaia e documenta. Não vende peças e não condiciona o resultado a uma empresa de conserto.</div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_38px_rgba(255,107,38,.18)]">Agende uma reunião</a>
                <a href="#entregavel" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 px-6 py-3 text-sm font-extrabold text-white/82">Ver o laudo</a>
              </div>
            </div>
            <ConsultTechnicalVisual variant={service.visual} title={service.title} metric={service.metric} />
          </div>
        </section>

        <ConsultSectionNav items={[["Visão geral","#visao-geral"],["Quando contratar","#quando-contratar"],["Processo","#processo"],["Entregável","#entregavel"],["Base técnica","#normas"]]} />

        <section id="visao-geral" className="scroll-mt-32 bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <ConsultEyebrow>O que é avaliado</ConsultEyebrow>
              <h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-.04em] text-[#075653] md:text-5xl">Medição objetiva antes de qualquer decisão.</h2>
              <p className="mt-6 text-sm leading-7 text-[#607D7A]">O escopo final depende do equipamento e da referência técnica aplicável.</p>
            </div>
            <div className="grid gap-0 border-y border-[#DCEAE7] sm:grid-cols-2">
              {service.points.map((point,index)=><div key={point} className={`min-h-32 p-6 ${index%2===1?'sm:border-l sm:border-[#DCEAE7]':''} ${index>1?'border-t border-[#DCEAE7]':''}`}><div className="text-[10px] font-black tracking-[.18em] text-[#08A77F]">0{index+1}</div><div className="mt-3 text-lg font-black leading-6 text-[#315B58]">{point}</div></div>)}
            </div>
          </div>
        </section>

        <section id="quando-contratar" className="scroll-mt-32 bg-[#F4FAF8]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[.68fr_1.32fr]">
            <div><ConsultEyebrow>Quando contratar</ConsultEyebrow><h2 className="mt-4 text-3xl font-black leading-[1.04] tracking-[-.035em] text-[#075653] md:text-4xl">Quando a medição precisa virar evidência técnica.</h2><p className="mt-5 text-sm leading-7 text-[#607D7A]">A avaliação é útil quando a instituição precisa compreender e registrar a condição do equipamento com base em ensaio.</p></div>
            <ConsultEditorialList items={service.when} />
          </div>
        </section>

        <section id="processo" className="scroll-mt-32 relative overflow-hidden bg-[#043F3D] text-white">
          <div className="absolute inset-0 opacity-45" style={{backgroundImage:'radial-gradient(circle at 82% 14%, rgba(138,230,0,.14), transparent 22%), linear-gradient(115deg, transparent 28%, rgba(5,210,157,.12) 65%, transparent)'}} />
          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <div className="max-w-3xl"><ConsultEyebrow light>Fluxo técnico</ConsultEyebrow><h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-.04em] md:text-5xl">Do equipamento ao histórico técnico.</h2></div>
            <div className="relative mt-12 grid gap-0 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-[#8AE600] via-[#08A77F] to-white/10 md:block" />
              {PROCESS.map(([num,title,text], index) => <article key={num} className="relative border-b border-white/10 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:py-0 md:last:border-r-0 md:first:pl-0"><div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-[#8AE600]/45 bg-[#043F3D] text-sm font-black text-[#C8FF72] shadow-[0_0_0_8px_rgba(4,63,61,.8)]">{num}</div><h3 className="mt-7 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{text}</p><div className="mt-5 text-[9px] font-black uppercase tracking-[.2em] text-white/28">Etapa {index+1}</div></article>)}
            </div>
          </div>
        </section>

        <section id="entregavel" className="scroll-mt-32 bg-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
            <div>
              <ConsultEyebrow>Entregável</ConsultEyebrow>
              <h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-.04em] text-[#075653] md:text-5xl">O ensaio precisa deixar rastreabilidade.</h2>
              <p className="mt-6 text-base leading-8 text-[#4E706D]">{service.result}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {['Histórico no Arkmeds','Instrumentação com rastreabilidade RBC'].map((item)=><div key={item} className="rounded-[16px] bg-[#F4FAF8] px-4 py-4 text-sm font-extrabold text-[#315B58]">{item}</div>)}
              </div>
              <p className="mt-5 text-xs leading-6 text-[#78908E]">O mockup demonstra a estrutura visual do documento. Não representa dados reais de cliente ou resultado de ensaio.</p>
            </div>
            <ConsultReportPreview title={service.deliverable} sections={service.deliverableSections} />
          </div>
        </section>

        <section id="normas" className="scroll-mt-32 bg-[#EAF5F2]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[.62fr_1.38fr]">
            <div><ConsultEyebrow>Base técnica</ConsultEyebrow><h2 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-.035em] text-[#075653] md:text-4xl">Referência do ensaio e gestão da tecnologia.</h2><p className="mt-5 text-sm leading-7 text-[#607D7A]">A referência particular varia conforme o equipamento. A RDC 509/2021 compõe a base geral informada para gerenciamento de tecnologias em saúde.</p></div>
            <div className="border-y border-[#CFE3DE]">
              <a href={service.normUrl} target="_blank" rel="noreferrer" className="group grid gap-4 py-6 sm:grid-cols-[48px_1fr_auto] sm:items-start"><div className="grid h-11 w-11 place-items-center rounded-full bg-[#075653] text-[#8AE600]"><FileText size={19}/></div><div><h3 className="text-base font-black text-[#075653]">{service.norm}</h3><p className="mt-2 text-sm leading-6 text-[#607D7A]">Abra a fonte institucional correspondente. A aplicação exata depende do equipamento e do contexto do ensaio.</p></div><ExternalLink size={16} className="mt-1 text-[#7A9B97] transition group-hover:text-[#08A77F]"/></a>
              <a href={RDC_509} target="_blank" rel="noreferrer" className="group grid gap-4 border-t border-[#CFE3DE] py-6 sm:grid-cols-[48px_1fr_auto] sm:items-start"><div className="grid h-11 w-11 place-items-center rounded-full bg-[#075653] text-[#8AE600]"><ShieldCheck size={19}/></div><div><h3 className="text-base font-black text-[#075653]">RDC 509/2021</h3><p className="mt-2 text-sm leading-6 text-[#607D7A]">Base geral informada para gerenciamento de tecnologias em saúde.</p></div><ExternalLink size={16} className="mt-1 text-[#7A9B97] transition group-hover:text-[#08A77F]"/></a>
            </div>
          </div>
        </section>

        <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Converse com a equipe Consult para confirmar equipamento, escopo do ensaio e documentação necessária." />
      </main>
    </ConsultSiteShell>
  )
}
