import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultReportPreview } from '@/components/consult/ConsultTechnicalDesign'
import {
  ApprovedDarkProcess,
  ApprovedFaq,
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedNormCards,
  ApprovedProofStrip,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

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
    intro: 'Ensaios de controle de qualidade para equipamentos odontológicos extraorais, incluindo sistemas panorâmicos e tomografia odontológica conforme a aplicação.',
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
    intro: 'Controle de qualidade para densitômetros ósseos com base na RDC 611/2022, sem Instrução Normativa específica para esta modalidade.',
    focus: [['Equipamento','Densitômetro identificado no escopo'],['Desempenho','Testes aplicáveis à modalidade'],['Referência','RDC 611/2022 como base informada'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  'raio-x-veterinario': {
    title: 'Controle de Qualidade em Raios X Veterinário', short: 'Raios X veterinário', norm: 'RDC 611/2022 + IN 90/2021 como referência técnica',
    intro: 'Avaliação técnica de equipamentos de raios X veterinário considerando a proteção de trabalhadores e público, com a IN 90/2021 utilizada como referência técnica.',
    focus: [['Equipamento','Sistema veterinário avaliado'],['Imagem','Qualidade de imagem no controle'],['Proteção','Trabalhadores e público considerados no escopo'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
}

const PROCESS = [['01','Identificar a modalidade','Confirmar equipamento, contexto de uso e referência aplicável.'],['02','Executar os ensaios','Realizar os testes previstos para a modalidade.'],['03','Analisar os resultados','Confrontar as medições com os critérios pertinentes.'],['04','Emitir o laudo','Documentar o resultado e a conclusão técnica.']]

export default function ConsultQualityModalityPage() {
  const { slug } = useParams()
  const item = useMemo(() => MODALITIES[slug], [slug])

  useEffect(() => {
    if (!item) return
    document.title = `${item.title} | Consult`
    document.querySelector('meta[name="description"]')?.setAttribute('content', item.intro)
  }, [item])

  if (!item) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Modalidade não encontrada</h1><Link to="/consult/fisica-medica/controle-de-qualidade" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Controle de Qualidade</Link></main></ConsultSiteShell>

  const norms=item.norm.startsWith('IN ')
    ? [['RDC 611/2022 — Anvisa','Base sanitária geral para radiologia diagnóstica e intervencionista.',RDC_611],[`${item.norm} — Anvisa`,`Referência específica indicada para ${item.short}.`,ANVISA_IN]]
    : [['RDC 611/2022 — Anvisa','Base indicada para esta modalidade.',RDC_611],[item.norm,'Referência técnica aplicável à modalidade.',ANVISA_IN]]

  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow={`Controle de Qualidade • ${item.norm}`} title={item.title} description={item.intro} image={CONSULT_IMAGES.radiology}/>
    <ApprovedProofStrip items={[[ 'MODALIDADE',item.short ],[ 'NORMA',item.norm ],[ 'ENTREGA','Laudo técnico' ],[ 'RESPONSÁVEL','Físico médico' ]]}/>

    <ApprovedLightSection eyebrow="Controle por modalidade" title={`O que é avaliado em ${item.short}`} intro="Os testes e critérios mudam conforme a tecnologia. Por isso a avaliação considera a referência específica da modalidade." center>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{item.focus.map(([label,text])=><div key={label} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"><div className="text-base font-black text-[#123C3B]">{label}</div><p className="mt-3 text-sm leading-6 text-black/55">{text}</p></div>)}</div>
    </ApprovedLightSection>

    <ApprovedDarkProcess items={PROCESS}/>

    <ApprovedLightSection eyebrow="Entregável" title="Laudo de Controle de Qualidade" intro={`Resultado técnico da avaliação de ${item.short}, com os ensaios e critérios aplicáveis à modalidade.`} white>
      <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
        <div className="rounded-2xl bg-[#075653] p-7 text-white"><div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8AE600]">O que fica registrado</div><h3 className="mt-4 text-2xl font-black">Resultados do Controle de Qualidade</h3><p className="mt-4 text-sm leading-7 text-white/68">Equipamento e modalidade, ensaios realizados, resultados medidos, referência aplicável e conclusão técnica assinada pelo físico médico.</p></div>
        <ConsultReportPreview title={`CQ — ${item.short}`} sections={['Equipamento e modalidade','Ensaios realizados','Resultados medidos','Referência aplicável','Conclusão e assinatura do físico médico']} note="Exemplo ilustrativo sem dados reais."/>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Base normativa" title="Normas e referências" intro="A avaliação combina a base geral da RDC 611/2022 com a referência específica da modalidade." >
      <ApprovedNormCards items={norms}/>
    </ApprovedLightSection>

    <ApprovedFaq items={[[`Qual é a referência para ${item.short}?`,item.norm],['O resultado é documentado?','Sim. O Controle de Qualidade gera laudo técnico assinado pelo físico médico.'],['A página substitui a avaliação técnica?','Não. O conteúdo explica o serviço; o escopo final depende do equipamento e da situação da instituição.']]}/>
    <ConsultCtaBand title={`Precisa de Controle de Qualidade em ${item.short}?`} text="Informe o equipamento e a situação do serviço. A equipe Consult confirma o escopo técnico e a programação da avaliação."/>
  </main></ConsultSiteShell>
}
