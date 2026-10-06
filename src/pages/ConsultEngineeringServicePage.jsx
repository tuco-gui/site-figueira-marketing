import React, { useEffect, useMemo } from 'react'
import { CheckCircle2, ExternalLink, FileText, Gauge, ShieldCheck, Thermometer, Wrench } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultEditorialList, ConsultReportPreview, ConsultSectionNav, ConsultTechnicalVisual } from '@/components/consult/ConsultTechnicalDesign'

const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2021/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'
const RDC_15 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2012/rdc0015_15_03_2012.pdf'
const RDC_197 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2017/rdc0197_26_12_2017.pdf'
const RDC_430 = 'https://www.gov.br/anvisa/en/rules-and-regulations/arquivos/rdc-430_2020.pdf'
const PNI = 'https://www.gov.br/saude/pt-br/composicao/svsa/pni/rede-de-frio/publicacoes/manual-de-rede-de-frio-pni-5ed.pdf/view'

const SERVICES = {
  'seguranca-eletrica': {
    title: 'Ensaio de segurança elétrica', icon: ShieldCheck, visual: 'clinical',
    intro: 'Medição de resistência de aterramento, resistência de isolamento e correntes de fuga do equipamento e das partes aplicadas ao paciente.',
    result: 'Laudo com valores medidos, limites da norma e resultado aprovado ou reprovado.',
    deliverable: 'Laudo de Segurança Elétrica',
    metric: 'Aterramento, isolamento e correntes de fuga documentados',
    when: ['Ensaio recorrente de segurança elétrica','Após reparo ou intervenção técnica','Quando o hospital precisa registrar a condição elétrica do equipamento','Para compor o histórico técnico no Arkmeds'],
    points: ['Resistência de aterramento','Resistência de isolamento','Correntes de fuga do equipamento','Correntes de fuga das partes aplicadas ao paciente'],
    exampleRows: [['Aterramento','Valor medido','Limite da norma','Aprov./Reprov.'],['Isolamento','Valor medido','Limite da norma','Aprov./Reprov.'],['Corrente de fuga','Valor medido','Limite da norma','Aprov./Reprov.']],
    note: 'Exemplo visual, sem dados reais. O laudo emitido pela Consult registra os valores medidos, os limites aplicáveis e o resultado do ensaio.',
    norms: [['ABNT NBR IEC 62353','Ensaio recorrente e após reparo. A norma completa é consultada pelo catálogo da ABNT.',ABNT],['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509]],
  },
  'desempenho-calibracao': {
    title: 'Ensaio de desempenho (calibração)', icon: Gauge, visual: 'measurement',
    intro: 'Comparação, ponto a ponto, do que o equipamento mede ou entrega com um analisador ou simulador calibrado.',
    result: 'Laudo com pontos ensaiados, desvios e conformidade.',
    deliverable: 'Laudo de Desempenho',
    metric: 'Desempenho comparado ponto a ponto com referência calibrada',
    when: ['Rotina periódica de verificação','Após manutenção ou suspeita de desvio','Quando é necessário documentar o desempenho do equipamento','Para manter histórico técnico de medições'],
    points: ['Pontos de ensaio definidos para o equipamento','Valor medido pelo equipamento','Referência do analisador ou simulador','Desvios e conformidade'],
    exampleRows: [['Ponto de ensaio','Valor medido','Referência','Conformidade'],['Ponto de ensaio','Valor medido','Referência','Conformidade'],['Ponto de ensaio','Valor medido','Referência','Conformidade']],
    note: 'Exemplo visual, sem valores reais. O guia confirma que o laudo registra os pontos ensaiados, os desvios encontrados e a conformidade.',
    norms: [['Manual do fabricante','Critérios e procedimentos específicos do equipamento.','#manual'],['Família ABNT NBR IEC 60601','Norma particular aplicável conforme o tipo de equipamento.',ABNT],['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509]],
  },
  'manutencao-preventiva': {
    title: 'Manutenção preventiva', icon: Wrench, visual: 'clinical',
    intro: 'Limpeza, lubrificação e testes de funcionamento. Peças gastas ou vencidas são registradas como pendência, com a especificação da peça. A Consult não troca peças.',
    result: 'Laudo com o que foi feito e a lista de pendências.',
    deliverable: 'Laudo de Manutenção Preventiva',
    metric: 'Ações realizadas e pendências registradas sem venda de peças',
    when: ['Rotina preventiva prevista pelo fabricante','Necessidade de registrar limpeza, lubrificação e testes','Equipamentos com itens de desgaste ou pendências','Quando o hospital precisa manter histórico das ações preventivas'],
    points: ['Limpeza prevista','Lubrificação quando aplicável','Testes de funcionamento','Pendências e especificação de peças quando encontradas'],
    exampleRows: [['Limpeza técnica','Executado','Plano fabricante','Registrado'],['Teste funcional','Executado','Plano fabricante','Registrado'],['Pendência encontrada','Identificada','Especificação','Pendente']],
    note: 'Exemplo visual. Quando há peça gasta ou vencida, o laudo registra a pendência e a especificação; a Consult não vende nem troca a peça.',
    norms: [['Plano de manutenção do fabricante','A referência específica depende do equipamento.','#manual'],['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509]],
  },
  reverificacao: {
    title: 'Reverificação', icon: CheckCircle2, visual: 'measurement',
    intro: 'Novo ensaio depois que o hospital resolve uma pendência apontada no laudo anterior, pela equipe interna ou pelo fornecedor que escolher.',
    result: 'Laudo atualizado com o novo resultado. A reverificação é cobrada à parte.',
    deliverable: 'Laudo Atualizado de Reverificação',
    metric: 'Pendência tratada e condição novamente documentada',
    when: ['Após correção de uma pendência','Depois de troca de peça realizada pelo hospital ou fornecedor escolhido','Quando é necessário comprovar a condição após a correção','Para atualizar o histórico técnico do equipamento'],
    points: ['Referência ao laudo anterior','Pendência que originou a reverificação','Novo ensaio','Resultado atualizado'],
    exampleRows: [['Pendência anterior','Reensaiada','Ensaio original','Atualizado'],['Parâmetro crítico','Novo valor','Limite aplicável','Aprov./Reprov.'],['Resultado geral','Reavaliado','Critério original','Atualizado']],
    note: 'Exemplo visual. A Consult refaz o ensaio correspondente e emite laudo atualizado. O guia informa que a reverificação é cobrada à parte.',
    norms: [['Referência do ensaio original','A reverificação usa a mesma base técnica do ensaio que gerou a pendência.','#original'],['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509]],
  },
  'qualificacao-termica': {
    title: 'Qualificação térmica', icon: Thermometer, visual: 'thermal',
    intro: 'Mapeamento de temperatura com sensores calibrados durante ciclos de operação, para comprovar que o equipamento esteriliza, aquece ou conserva dentro da faixa especificada.',
    result: 'Relatório de qualificação com gráficos de temperatura e conformidade.',
    deliverable: 'Relatório de Qualificação Térmica',
    metric: 'Temperatura monitorada ao longo do ciclo com sensores calibrados',
    when: ['Qualificação de autoclaves','Qualificação de câmaras e equipamentos térmicos','Mapeamento de geladeiras e câmaras de vacina','Quando estabilidade e uniformidade de temperatura precisam ser documentadas'],
    points: ['Sensores calibrados','Temperatura em diferentes pontos','Ciclo de operação monitorado','Gráficos e resultado de conformidade'],
    exampleRows: [['Sensor / ponto','Curva registrada','Faixa aplicável','Conforme'],['Sensor / ponto','Curva registrada','Faixa aplicável','Conforme'],['Ciclo avaliado','Registrado','Critério aplicável','Resultado']],
    note: 'Exemplo visual. O relatório real contém os registros de temperatura, os gráficos gerados no ciclo e o resultado de conformidade.',
    norms: [['RDC 15/2012','Referência indicada no guia para autoclaves e CME.',RDC_15],['RDC 197/2017','Referência indicada para serviços de vacinação.',RDC_197],['Manual da Rede de Frio do PNI','Referência indicada para câmaras de vacina.',PNI],['RDC 430/2020','Referência adicional indicada conforme o equipamento e a aplicação.',RDC_430]],
  },
}

const PROCESS = [['01','Identificação','Equipamento, modelo, aplicação e ensaio necessário são definidos.'],['02','Medição','Analisadores ou simuladores calibrados são usados conforme o equipamento.'],['03','Comparação','Os valores são comparados com a referência aplicável.'],['04','Laudo','O resultado fica documentado por equipamento e registrado no histórico técnico.']]

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
        <section className="relative overflow-hidden bg-[#075653] text-white"><div className="absolute -left-52 -top-52 h-[520px] w-[520px] rounded-full border border-white/5" /><div className="absolute inset-0 opacity-75" style={{backgroundImage:'radial-gradient(circle at 72% 28%, rgba(138,230,0,.14), transparent 24%), linear-gradient(125deg, transparent 44%, rgba(5,210,157,.10) 100%)'}} /><div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:py-16 md:px-8 md:py-20 lg:min-h-[650px] lg:grid-cols-[1fr_.92fr] lg:items-center"><div><Link to="/consult/areas/engenharia-clinica" className="text-sm font-bold text-white/55 hover:text-white">Consult Engenharia Clínica</Link><div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.24em] text-[#8AE600] sm:mt-10 sm:tracking-[.28em]"><span className="h-px w-9 bg-[#8AE600]" />Medição, ensaio e documentação</div><h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[64px]">{service.title}</h1><p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/88 md:text-lg">{service.intro}</p><div className="mt-6 rounded-[18px] border-l-4 border-[#8AE600] bg-white/[.055] px-5 py-4 text-sm font-bold leading-7 text-white/74">Não consertamos e não vendemos peças. O laudo mostra a condição encontrada, e o hospital resolve com o fornecedor que preferir.</div><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold text-white">Agende uma reunião</a><a href="#entregavel" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 px-6 py-3 text-sm font-extrabold text-white/82">Ver exemplo de laudo</a></div></div><ConsultTechnicalVisual variant={service.visual} title={service.title} metric={service.metric} /></div></section>

        <div className="border-y border-[#8AE600]/25 bg-[#043F3D] text-white"><div className="mx-auto flex max-w-7xl items-start gap-3 px-5 py-4 md:px-8"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#8AE600]"/><p className="text-sm leading-6 text-white/72"><strong className="text-white">Verificação independente:</strong> a Consult mede, ensaia, documenta e registra pendências sem indicar empresa de conserto.</p></div></div>

        <ConsultSectionNav items={[["Visão geral","#visao-geral"],["Quando contratar","#quando-contratar"],["Processo","#processo"],["Entregável","#entregavel"],["Base técnica","#normas"]]} />

        <section id="visao-geral" className="scroll-mt-32 bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.72fr_1.28fr]"><div><ConsultEyebrow>O que é avaliado</ConsultEyebrow><h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-.04em] text-[#075653] md:text-5xl">Medição objetiva antes de qualquer decisão.</h2><p className="mt-5 text-sm leading-7 text-[#607D7A]">Todos os serviços desta linha geram documentação por equipamento. Os laudos são emitidos no Arkmeds e o histórico do equipamento é preservado.</p></div><div className="grid sm:grid-cols-2">{service.points.map((point,index)=><div key={point} className={`min-h-32 border-[#DCEAE7] p-6 ${index%2===1?'sm:border-l':''} ${index>1?'border-t':''}`}><div className="text-[10px] font-black tracking-[.18em] text-[#08A77F]">0{index+1}</div><div className="mt-3 text-lg font-black leading-6 text-[#315B58]">{point}</div></div>)}</div></div></section>

        <section id="quando-contratar" className="scroll-mt-32 bg-[#F4FAF8]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.68fr_1.32fr]"><div><ConsultEyebrow>Quando contratar</ConsultEyebrow><h2 className="mt-4 text-3xl font-black leading-[1.04] tracking-[-.035em] text-[#075653] md:text-4xl">Quando a medição precisa virar evidência técnica.</h2></div><ConsultEditorialList items={service.when} /></div></section>

        <section id="processo" className="scroll-mt-32 relative overflow-hidden bg-[#043F3D] text-white"><div className="absolute inset-0 opacity-45" style={{backgroundImage:'radial-gradient(circle at 82% 14%, rgba(138,230,0,.14), transparent 22%), linear-gradient(115deg, transparent 28%, rgba(5,210,157,.12) 65%, transparent)'}} /><div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20"><ConsultEyebrow light>Fluxo técnico</ConsultEyebrow><h2 className="mt-4 max-w-3xl text-3xl font-black leading-[1.02] tracking-[-.04em] md:text-5xl">Do equipamento ao histórico técnico.</h2><div className="relative mt-10 grid md:grid-cols-4"><div className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-[#8AE600] via-[#08A77F] to-white/10 md:block" />{PROCESS.map(([num,title,text])=><article key={num} className="relative border-b border-white/10 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:py-0 md:last:border-r-0 md:first:pl-0"><div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-[#8AE600]/45 bg-[#043F3D] text-sm font-black text-[#C8FF72]">{num}</div><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{text}</p></article>)}</div></div></section>

        <section id="entregavel" className="scroll-mt-32 bg-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.65fr_1.35fr] lg:items-center"><div><ConsultEyebrow>Entregável</ConsultEyebrow><h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-.04em] text-[#075653] md:text-5xl">{service.deliverable}</h2><p className="mt-5 text-base font-semibold leading-8 text-[#315B58]">{service.result}</p><div className="mt-6 rounded-[18px] border-l-4 border-[#08A77F] bg-[#F4FAF8] px-5 py-4 text-xs leading-6 text-[#587875]">{service.note}</div><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-[#DCEAE7] bg-white p-4"><div className="text-[9px] font-black uppercase tracking-[.15em] text-[#08A77F]">Sistema</div><div className="mt-2 text-sm font-black text-[#075653]">Arkmeds</div><p className="mt-1 text-xs leading-5 text-[#607D7A]">Laudo por equipamento e histórico técnico.</p></div><div className="rounded-xl border border-[#DCEAE7] bg-white p-4"><div className="text-[9px] font-black uppercase tracking-[.15em] text-[#08A77F]">Instrumentação</div><div className="mt-2 text-sm font-black text-[#075653]">Rastreabilidade RBC</div><p className="mt-1 text-xs leading-5 text-[#607D7A]">Analisadores com calibração rastreada à RBC.</p></div></div></div><ConsultReportPreview title={service.deliverable} exampleRows={service.exampleRows} resultLabel="Resultado geral e pendências" note={service.note} /></div></section>

        <section id="normas" className="scroll-mt-32 bg-[#043F3D] text-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.62fr_1.38fr]"><div><ConsultEyebrow light>Base técnica</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Referências do serviço</h2><p className="mt-4 text-sm leading-7 text-white/60">A norma particular depende do equipamento e do tipo de ensaio. Os links abaixo levam às fontes oficiais ou ao catálogo correspondente.</p></div><div className="grid gap-4 md:grid-cols-2">{service.norms.map(([label,text,href])=> href.startsWith('#') ? <div key={label} className="rounded-[22px] border border-white/10 bg-white/6 p-6"><FileText size={22} className="text-[#8AE600]"/><h3 className="mt-5 text-lg font-black">{label}</h3><p className="mt-2 text-sm leading-6 text-white/60">{text}</p></div> : <a key={label} href={href} target="_blank" rel="noreferrer" className="group rounded-[22px] border border-white/10 bg-white/6 p-6 transition hover:border-[#8AE600]/45 hover:bg-white/10"><div className="flex justify-between"><FileText size={22} className="text-[#8AE600]"/><ExternalLink size={16} className="text-white/35 group-hover:text-[#8AE600]"/></div><h3 className="mt-5 text-lg font-black">{label}</h3><p className="mt-2 text-sm leading-6 text-white/60">{text}</p><span className="mt-4 inline-flex text-[10px] font-black uppercase tracking-[.15em] text-[#B8FF51]">Ver referência oficial</span></a>)}</div></div></section>

        <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Converse com a equipe Consult para confirmar equipamento, escopo do ensaio e documentação necessária." />
      </main>
    </ConsultSiteShell>
  )
}
