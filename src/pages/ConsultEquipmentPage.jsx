import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultReportPreview, ConsultSectionNav } from '@/components/consult/ConsultTechnicalDesign'
import {
  DeliverableHeader,
  EditorialStatement,
  IndependenceBand,
  MeasurementMatrix,
  OutcomeNote,
  ProcessTimeline,
  ServiceHeroConsole,
  ServiceProofRail,
  StandardsShelf,
  TechnicalFaq,
} from '@/components/consult/ConsultServiceV3Design'

const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2021/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'

const EQUIPMENT = {
  'monitor-multiparametrico': { title:'Monitor multiparamétrico', analyzer:'Waller + Yagi', parameters:['ECG','PNI (pressão não invasiva)','Pressão invasiva','Temperatura','Respiração','SpO₂'] },
  eletrocardiografo: { title:'Eletrocardiógrafo', analyzer:'Waller', parameters:['Resposta a ritmos cardíacos simulados'] },
  'oximetro-pulso': { title:'Oxímetro de pulso', analyzer:'Yagi', parameters:['SpO₂ simulada','Frequência de pulso simulada'], caveat:'O guia informa que o ensaio não avalia a exatidão do sensor no paciente.' },
  'esfigmomanometro-mapa': { title:'Esfigmomanômetro digital e MAPA', analyzer:'Waller', parameters:['Pressão sistólica simulada','Pressão diastólica simulada'] },
  'desfibrilador-cardioversor-dea': { title:'Desfibrilador, cardioversor e DEA', analyzer:'Lown', parameters:['Energia entregue','Tempo de carga','Atraso no modo sincronizado','Resposta ao ECG'] },
  'marca-passo-transcutaneo': { title:'Marca-passo transcutâneo', analyzer:'Lown', parameters:['Tensão','Corrente','Frequência em diferentes cargas'] },
  'bisturi-eletrico': { title:'Bisturi elétrico (eletrocautério)', analyzer:'Harrison', parameters:['Potência entregue em diferentes cargas','Fuga de alta frequência'] },
  'ventilador-pulmonar': { title:'Ventilador pulmonar', analyzer:'Luft + pulmão de teste', parameters:['Fluxo','Volume','Pressões','PEEP','Concentração de O₂'] },
  'aparelho-anestesia': { title:'Aparelho de anestesia — parte ventilatória', analyzer:'Luft', parameters:['Fluxo','Volume','Pressões','PEEP','Concentração de O₂'], caveat:'O guia informa que a Consult não mede a concentração do agente anestésico nesta avaliação.' },
  'cpap-bipap': { title:'CPAP e BiPAP', analyzer:'Luft', parameters:['Fluxo','Pressão'] },
  'fluxometro-manometro-o2': { title:'Fluxômetro e manômetro de O₂', analyzer:'Luft', parameters:['Fluxo','Pressão'] },
  autoclave: { title:'Autoclave', analyzer:'Otto', parameters:['Temperatura em até 16 pontos','Pressão','Letalidade F0','Ciclos de operação'], thermal:true },
  'termodesinfectora-estufa': { title:'Termodesinfectora e estufa de esterilização', analyzer:'Otto', parameters:['Temperatura em até 16 pontos','Letalidade A0'], thermal:true },
  'estufa-banho-maria': { title:'Estufa e banho-maria de laboratório', analyzer:'Otto', parameters:['Estabilidade de temperatura','Uniformidade de temperatura'], thermal:true },
  'geladeira-camara-vacina': { title:'Geladeira e câmara de vacina', analyzer:'Otto', parameters:['Mapeamento de temperatura'], thermal:true },
}

const FLOW = [['01','Identificar','Equipamento, modelo, aplicação e ensaios aplicáveis são confirmados.'],['02','Ensaiar','Segurança elétrica e desempenho são executados conforme o equipamento e o escopo.'],['03','Comparar','Os valores são confrontados com a referência técnica aplicável.'],['04','Documentar','O resultado é emitido por equipamento e preservado no histórico técnico.']]

export default function ConsultEquipmentPage() {
  const { slug } = useParams()
  const item = useMemo(() => EQUIPMENT[slug], [slug])

  useEffect(() => {
    if (!item) return
    document.title = `Ensaio de ${item.title} | Consult Engenharia Clínica`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `Ensaios de segurança elétrica e desempenho para ${item.title}, com analisador ${item.analyzer}, laudo por equipamento e rastreabilidade RBC.`)
  }, [item])

  if (!item) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Equipamento não encontrado</h1><Link to="/consult/areas/engenharia-clinica" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Engenharia Clínica</Link></main></ConsultSiteShell>

  const parameterRows = item.parameters.map((parameter,index)=>[parameter, index === 0 ? `Analisador ${item.analyzer}` : 'Medição específica do equipamento'])
  const reportRows = item.parameters.slice(0,4).map((parameter)=>[parameter,'Valor medido','Referência','Resultado'])
  const norms = [['RDC 509/2021 — Anvisa','Base geral informada pela Consult para gerenciamento de tecnologias em saúde.',RDC_509],['ABNT NBR IEC 62353','Referência indicada para o ensaio de segurança elétrica recorrente e após reparo.',ABNT],['Manual do fabricante + norma particular aplicável','O desempenho é comparado conforme o equipamento, seu manual e a norma particular correspondente da família IEC 60601 quando aplicável.',ABNT]]

  return <ConsultSiteShell><main>
    <section className="relative overflow-hidden bg-[#075653] text-white"><div className="absolute inset-0 opacity-75" style={{backgroundImage:'radial-gradient(circle at 80% 20%, rgba(138,230,0,.15), transparent 24%), linear-gradient(125deg, transparent 42%, rgba(5,210,157,.11) 100%)'}}/><div className="relative mx-auto grid min-h-[680px] max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><Link to="/consult/areas/engenharia-clinica" className="text-sm font-bold text-white/55 hover:text-white">Consult Engenharia Clínica</Link><div className="mt-9 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.26em] text-[#8AE600]"><span className="h-px w-10 bg-[#8AE600]" />Equipamento atendido</div><h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[64px]">{item.title}</h1><p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/88">Segurança elétrica e desempenho documentados por equipamento, com analisador específico e histórico técnico.</p><p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">Parâmetros confirmados no guia técnico da Consult: {item.parameters.join(', ')}.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold text-white">Agendar avaliação</a><a href="#laudo" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 px-6 py-3 text-sm font-extrabold text-white/82">Ver exemplo de laudo</a></div></div><ServiceHeroConsole title={item.title} kicker="Engenharia Clínica" chips={[`Analisador ${item.analyzer}`,'Rastreabilidade RBC']} accent={item.thermal?'thermal':'technical'} /></div></section>
    <IndependenceBand />
    <ServiceProofRail items={[["EQUIPAMENTO",item.title],["ANALISADOR",item.analyzer],["ENTREGA","Laudo por equipamento"],["HISTÓRICO","Arkmeds + RBC"]]} />
    <ConsultSectionNav items={[["Visão geral","#visao"],["Parâmetros","#parametros"],["Processo","#processo"],["Laudo","#laudo"],["Base técnica","#normas"],["FAQ","#faq"]]} />

    <div id="visao" className="scroll-mt-32"><EditorialStatement eyebrow="Ensaio por equipamento" title="A página deixa de vender uma categoria genérica e mostra exatamente o que é medido."><p>Para {item.title}, a Consult informou analisador e parâmetros próprios. A V3 transforma essa informação em conteúdo técnico de decisão para engenharia clínica, compras e gestão hospitalar.</p>{item.caveat&&<p className="mt-5 rounded-[16px] border-l-4 border-[#08A77F] bg-[#F4FAF8] px-5 py-4 text-sm font-semibold text-[#315B58]">{item.caveat}</p>}</EditorialStatement></div>
    <div id="parametros" className="scroll-mt-32"><MeasurementMatrix title={`O que é verificado em ${item.title}`} items={parameterRows} /></div>
    <div id="processo" className="scroll-mt-32"><ProcessTimeline items={FLOW} /></div>

    <section id="laudo" className="scroll-mt-32 bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.62fr_1.38fr]"><div><DeliverableHeader title={`Laudo técnico — ${item.title}`} description="O documento registra o ensaio por equipamento e permite manter o histórico técnico no Arkmeds."/><OutcomeNote>O mockup é demonstrativo, com valores fictícios. Os campos reais dependem do ensaio executado e do padrão de emissão da Consult.</OutcomeNote><div className="mt-5 rounded-[18px] bg-[#075653] p-5 text-white"><div className="text-[9px] font-black uppercase tracking-[.2em] text-[#8AE600]">Instrumentação</div><p className="mt-2 text-sm font-black">{item.analyzer}</p><p className="mt-2 text-xs leading-5 text-white/60">O guia oficial informa analisadores calibrados com rastreabilidade RBC.</p></div></div><ConsultReportPreview title={`Laudo — ${item.title}`} exampleRows={reportRows} resultLabel="Resultado / pendências" note="Exemplo visual sem dados reais. A Consult não indica quem deve executar eventual conserto." /></div></section>

    <div id="normas" className="scroll-mt-32"><StandardsShelf items={norms} /></div>
    <div id="faq" className="scroll-mt-32"><TechnicalFaq items={[[`Qual analisador é usado para ${item.title}?`,item.analyzer],["O equipamento também recebe segurança elétrica?","O guia informa que os equipamentos confirmados para Engenharia Clínica recebem também ensaio de segurança elétrica com Safetest 50, Rigel."],["A Consult conserta o equipamento se encontrar uma pendência?","Não. A Consult documenta a condição encontrada e a instituição resolve com o fornecedor de sua escolha."],["O resultado fica no histórico do equipamento?","Sim. O guia oficial informa emissão no Arkmeds com histórico por equipamento."]]} /></div>
    <ConsultCtaBand title={`Precisa avaliar ${item.title}?`} text="Informe o equipamento, modelo e situação. A equipe Consult confirma o escopo de ensaio e a agenda de atendimento." />
  </main></ConsultSiteShell>
}
