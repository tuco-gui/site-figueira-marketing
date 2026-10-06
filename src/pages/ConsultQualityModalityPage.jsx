import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultReportPreview, ConsultSectionNav } from '@/components/consult/ConsultTechnicalDesign'
import {
  DeliverableHeader,
  EditorialStatement,
  MeasurementMatrix,
  OutcomeNote,
  ProcessTimeline,
  ServiceHeroConsole,
  ServiceProofRail,
  StandardsShelf,
  TechnicalFaq,
  TriggerPanel,
} from '@/components/consult/ConsultServiceV3Design'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'

const MODALITIES = {
  'raio-x-convencional': {
    title: 'Controle de Qualidade em Raios X Convencional', short: 'Raios X convencional', norm: 'IN 90/2021',
    intro: 'Ensaios periódicos para documentar o desempenho do sistema de radiografia convencional, a qualidade de imagem e os parâmetros aplicáveis à modalidade.',
    focus: [['Desempenho','Verificação dos parâmetros aplicáveis ao equipamento'],['Imagem','Qualidade de imagem dentro do escopo do controle'],['Exposição','Parâmetros relacionados à produção da imagem'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  'fluoroscopia-arco-c-angiografia': {
    title: 'Controle de Qualidade em Fluoroscopia, Arco C e Angiografia', short: 'Fluoroscopia, Arco C e Angiografia', norm: 'IN 91/2021',
    intro: 'Controle de qualidade para sistemas de fluoroscopia e radiologia intervencionista, com verificação técnica documentada conforme a modalidade.',
    focus: [['Funcionamento','Comportamento do sistema durante os ensaios'],['Imagem','Qualidade de imagem aplicável à modalidade'],['Exposição','Parâmetros de exposição avaliados no controle'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  mamografia: {
    title: 'Controle de Qualidade em Mamografia', short: 'Mamografia', norm: 'IN 92/2021',
    intro: 'Ensaios de controle de qualidade para mamógrafos, direcionados ao desempenho, qualidade de imagem e parâmetros aplicáveis à mamografia.',
    focus: [['Equipamento','Desempenho do sistema mamográfico'],['Imagem','Qualidade de imagem da modalidade'],['Exposição','Parâmetros avaliados conforme o controle'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  tomografia: {
    title: 'Controle de Qualidade em Tomografia Computadorizada', short: 'Tomografia computadorizada', norm: 'IN 93/2021',
    intro: 'Controle periódico de tomógrafos com avaliação técnica do desempenho, qualidade de imagem e parâmetros aplicáveis à tomografia computadorizada.',
    focus: [['Desempenho','Parâmetros aplicáveis ao tomógrafo'],['Imagem','Qualidade de imagem verificada em ensaio'],['Exposição','Parâmetros relacionados à modalidade'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  'odontologico-extraoral': {
    title: 'Controle de Qualidade em Radiologia Odontológica Extraoral', short: 'Odontológico extraoral', norm: 'IN 94/2021',
    intro: 'Ensaios de controle de qualidade para equipamentos odontológicos extraorais, incluindo sistemas panorâmicos e tomografia odontológica dentro do escopo confirmado.',
    focus: [['Equipamento','Sistema extraoral avaliado'],['Imagem','Qualidade de imagem da modalidade'],['Exposição','Parâmetros aplicáveis ao ensaio'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  'odontologico-intraoral': {
    title: 'Controle de Qualidade em Radiologia Odontológica Intraoral', short: 'Odontológico intraoral', norm: 'IN 95/2021',
    intro: 'Controle de qualidade para equipamentos de radiologia odontológica intraoral, com resultado documentado conforme a referência aplicável.',
    focus: [['Equipamento','Sistema intraoral avaliado'],['Imagem','Qualidade da formação da imagem'],['Exposição','Parâmetros aplicáveis ao controle'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  ultrassom: {
    title: 'Controle de Qualidade em Ultrassom', short: 'Ultrassom', norm: 'IN 96/2021',
    intro: 'Ensaios de controle de qualidade em equipamentos de ultrassom para verificar desempenho, qualidade de imagem e funcionamento dentro do escopo da modalidade.',
    focus: [['Desempenho','Resposta do equipamento nos ensaios aplicáveis'],['Imagem','Qualidade de imagem'],['Funcionamento','Condição funcional dentro do controle'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  'ressonancia-magnetica': {
    title: 'Controle de Qualidade em Ressonância Magnética', short: 'Ressonância magnética', norm: 'IN 97/2021',
    intro: 'Controle de qualidade em ressonância magnética com verificação técnica de desempenho, qualidade de imagem e funcionamento conforme a referência da modalidade.',
    focus: [['Desempenho','Parâmetros aplicáveis à ressonância'],['Imagem','Qualidade de imagem'],['Funcionamento','Condição técnica avaliada no controle'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  'densitometria-ossea': {
    title: 'Controle de Qualidade em Densitometria Óssea', short: 'Densitometria óssea', norm: 'RDC 611/2022',
    intro: 'Controle de qualidade para densitômetros ósseos dentro da base geral da RDC 611/2022. O guia da Consult não indica uma Instrução Normativa específica para esta modalidade.',
    focus: [['Equipamento','Densitômetro identificado no escopo'],['Desempenho','Testes aplicáveis à modalidade'],['Referência','RDC 611/2022 como base informada'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  'raio-x-veterinario': {
    title: 'Controle de Qualidade em Raios X Veterinário', short: 'Raios X veterinário', norm: 'RDC 611/2022 + IN 90/2021 como referência técnica',
    intro: 'Avaliação técnica de equipamentos de raios X veterinário considerando a proteção de trabalhadores e público, com a IN 90/2021 utilizada como referência técnica conforme o guia da Consult.',
    focus: [['Equipamento','Sistema veterinário avaliado'],['Imagem','Qualidade de imagem no controle'],['Proteção','Trabalhadores e público considerados no escopo'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
}

const PROCESS = [['01','Identificar a modalidade','Equipamento, contexto de uso e referência aplicável são confirmados.'],['02','Executar os ensaios','O físico médico realiza os testes aplicáveis à modalidade.'],['03','Analisar o resultado','Os resultados são confrontados com os critérios pertinentes.'],['04','Emitir o laudo','A instituição recebe o resultado documentado e assinado pelo físico médico.']]

export default function ConsultQualityModalityPage() {
  const { slug } = useParams()
  const item = useMemo(() => MODALITIES[slug], [slug])

  useEffect(() => {
    if (!item) return
    document.title = `${item.title} | Consult`
    document.querySelector('meta[name="description"]')?.setAttribute('content', item.intro)
  }, [item])

  if (!item) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Modalidade não encontrada</h1><Link to="/consult/servicos/controle-qualidade" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Controle de Qualidade</Link></main></ConsultSiteShell>

  const norms = item.norm.startsWith('IN ') ? [['RDC 611/2022 — Anvisa','Base sanitária geral para radiologia diagnóstica e intervencionista.',RDC_611],[`${item.norm} — Anvisa`,`Referência específica indicada no guia técnico da Consult para ${item.short}.`,ANVISA_IN]] : [['RDC 611/2022 — Anvisa','Base indicada no guia técnico da Consult para esta modalidade.',RDC_611],[item.norm,'Observação técnica registrada no guia oficial da Consult.',ANVISA_IN]]

  return <ConsultSiteShell><main>
    <section className="relative overflow-hidden bg-[#075653] text-white"><div className="absolute inset-0 opacity-75" style={{backgroundImage:'radial-gradient(circle at 80% 20%, rgba(138,230,0,.15), transparent 24%), linear-gradient(125deg, transparent 42%, rgba(5,210,157,.11) 100%)'}}/><div className="relative mx-auto grid min-h-[650px] max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><Link to="/consult/servicos/controle-qualidade" className="text-sm font-bold text-white/55 hover:text-white">Controle de Qualidade</Link><div className="mt-9 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.26em] text-[#8AE600]"><span className="h-px w-10 bg-[#8AE600]" />{item.norm}</div><h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[62px]">{item.title}</h1><p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/88">{item.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold text-white">Agendar reunião técnica</a><a href="#entregavel" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 px-6 py-3 text-sm font-extrabold text-white/82">Ver laudo</a></div></div><ServiceHeroConsole title={item.short} kicker="Controle de Qualidade" chips={[item.norm,'Laudo técnico']} /></div></section>
    <ServiceProofRail items={[["MODALIDADE",item.short],["NORMA",item.norm],["ENTREGA","Laudo técnico"],["RESPONSÁVEL","Físico médico"]]} />
    <ConsultSectionNav items={[["Visão geral","#visao"],["Parâmetros","#parametros"],["Processo","#processo"],["Entregável","#entregavel"],["Normas","#normas"],["FAQ","#faq"]]} />
    <div id="visao" className="scroll-mt-32"><EditorialStatement eyebrow="Controle por modalidade" title="A referência técnica muda conforme o equipamento."><p>{item.intro}</p><p className="mt-5 text-sm leading-7">Por isso a V3 separa cada modalidade em uma página própria, em vez de concentrar todo o Controle de Qualidade em uma descrição única.</p></EditorialStatement></div>
    <div id="parametros" className="scroll-mt-32"><MeasurementMatrix title={`O que a página de ${item.short} precisa explicar`} items={item.focus} /></div>
    <div id="processo" className="scroll-mt-32"><ProcessTimeline items={PROCESS} /></div>
    <section id="entregavel" className="scroll-mt-32 bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.65fr_1.35fr]"><div><DeliverableHeader title="Laudo de Controle de Qualidade" description={`Resultado técnico da avaliação de ${item.short}, com os ensaios e critérios aplicáveis à modalidade.`}/><OutcomeNote>O formato visual é demonstrativo. O guia oficial confirma laudo assinado pelo físico médico, mas não define um layout único para todas as modalidades.</OutcomeNote></div><ConsultReportPreview title={`CQ — ${item.short}`} sections={['Equipamento e modalidade','Ensaios realizados','Resultados medidos','Referência aplicável','Conclusão e assinatura do físico médico']} note="Exemplo ilustrativo sem dados reais." /></div></section>
    <div id="normas" className="scroll-mt-32"><StandardsShelf items={norms} /></div>
    <div id="faq" className="scroll-mt-32"><TechnicalFaq items={[[`Qual é a referência para ${item.short}?`,item.norm],["O resultado é documentado?","Sim. O guia da Consult confirma laudo assinado pelo físico médico para o Controle de Qualidade."],["Essa página substitui a avaliação técnica?","Não. A página explica o serviço e a referência. O escopo final depende do equipamento e da situação da instituição."]]} /></div>
    <ConsultCtaBand title={`Precisa de Controle de Qualidade em ${item.short}?`} text="Informe o equipamento e a situação do serviço. A equipe Consult confirma o escopo técnico e a programação da avaliação." />
  </main></ConsultSiteShell>
}
