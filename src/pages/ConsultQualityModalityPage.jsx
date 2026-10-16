import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import ConsultQualityModalityLayout from '@/components/consult/ConsultQualityModalityLayout'
import { updateConsultPageMeta } from '@/lib/consultPageMeta'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import {
  ApprovedDarkProcess,
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedList,
  ApprovedNormCards,
  ApprovedProofStrip,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const IN_URLS = {
  'raio-x-convencional': 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000090&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021',
  'fluoroscopia-arco-c-angiografia': 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=8542&cod_modulo=310&link=S&numeroAto=00000091&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021',
  mamografia: 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000092&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021',
  tomografia: 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&codTipo=&cod_menu=1696&cod_modulo=134&desItem=&desItemFim=&numeroAto=00000093&orgao=DC%2FANVISA%2FMS&pesquisa=true&seqAto=000&tipo=INM&valorAno=2021',
  'odontologico-extraoral': 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000094&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021',
  'odontologico-intraoral': 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&codTipo=&cod_menu=1696&cod_modulo=134&desItem=&desItemFim=&numeroAto=00000095&orgao=DC%2FANVISA%2FMS&pesquisa=true&seqAto=000&tipo=INM&valorAno=2021',
  ultrassom: 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=8542&cod_modulo=310&link=S&numeroAto=00000096&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021',
  'ressonancia-magnetica': 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000097&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021',
}

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
    intro: 'Testes de aceitação e de constância conforme a RDC 611/2022, as instruções do fabricante e protocolos reconhecidos.',
    focus: [['Aceitação','Testes aplicáveis à entrada ou alteração relevante do equipamento'],['Constância','Verificações periódicas conforme o protocolo aplicável'],['Referência','RDC 611/2022, instruções do fabricante e protocolos reconhecidos'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
  'raio-x-veterinario': {
    title: 'Controle de Qualidade em Raios X Veterinário', short: 'Raios X veterinário', norm: 'RDC 611/2022 + IN 90/2021 como referência técnica',
    intro: 'Avaliação técnica de equipamentos de raios X veterinário considerando a proteção de trabalhadores e público, com a IN 90/2021 utilizada como referência técnica.',
    focus: [['Equipamento','Sistema veterinário avaliado'],['Imagem','Qualidade de imagem no controle'],['Proteção','Trabalhadores e público considerados no escopo'],['Laudo','Resultado técnico assinado pelo físico médico']],
  },
}

const PROCESS = [['01','Identificar a modalidade','Confirmar equipamento, contexto de uso e referência aplicável.'],['02','Executar os ensaios','Realizar os testes previstos para a modalidade.'],['03','Analisar os resultados','Confrontar as medições com os critérios pertinentes.'],['04','Emitir o laudo','Documentar o resultado e a conclusão técnica.']]

const PRESENTATIONS = {
  // Pavel Danilyuk / Pexels 6812430; illustrative stock photo.
  'odontologico-extraoral': {
    seoTitle: 'CQ em Radiologia Odontológica Extraoral | Consult',
    seoDescription: 'Controle de qualidade em radiologia odontológica extraoral conforme RDC 611/2022 e IN 94/2021.',
    image: '/consult/odontologico-extraoral-hero.jpg', imageWidth: 1600, imageHeight: 1068,
    imageAlt: 'Imagem ilustrativa de equipamento panorâmico de radiologia odontológica extraoral',
    eyebrow: 'Controle de Qualidade', heading: ['Radiologia odontológica', 'extraoral'],
    normHref: 'https://www.cevs.rs.gov.br/upload/arquivos/202107/08070619-in942021radiologiaodontologicaextraoral.pdf',
    normDescription: 'Referência específica para sistemas de radiologia odontológica extraoral.',
  },
  // Pexels 13176453; illustrative stock photo, not a Consult installation.
  tomografia: {
    seoTitle: 'Controle de Qualidade em Tomografia | IN 93 | Consult',
    seoDescription: 'Controle de qualidade em tomografia computadorizada conforme RDC 611/2022 e IN 93/2021.',
    image: '/consult/tomografia-hero.jpg', imageWidth: 1600, imageHeight: 2400,
    imageAlt: 'Imagem ilustrativa de tomógrafo computadorizado com mesa de exame em sala de radiodiagnóstico', imagePosition: '50% 70%',
    eyebrow: 'Controle de Qualidade', heading: ['Tomografia', 'computadorizada'],
    normHref: 'https://cevs.rs.gov.br/upload/arquivos/202107/08070428-in932021tomografiacomputadorizada.pdf',
    normDescription: 'Referência específica para sistemas de tomografia computadorizada médica.',
  },
  // National Cancer Institute / Unsplash 0izFVmwJ5pw; illustrative stock photo.
  mamografia: {
    seoTitle: 'Controle de Qualidade em Mamografia | IN 92 | Consult',
    seoDescription: 'Ensaios de controle de qualidade em mamografia conforme RDC 611/2022 e IN 92/2021, com resultado técnico documentado.',
    image: '/consult/mamografia-hero.jpg', imageWidth: 1600, imageHeight: 1280,
    imageAlt: 'Imagem ilustrativa de profissional posicionando paciente em equipamento de mamografia',
    eyebrow: 'Física Médica', heading: ['Controle de Qualidade em', 'Mamografia'],
    normHref: 'https://www.cevs.rs.gov.br/upload/arquivos/202511/19131331-in-92-2021-anvisa-mamografia.PDF',
    normDescription: 'Referência específica para sistemas de mamografia.',
  },
  // PURPLE24 / Pexels 7617612; stock photo, not a Consult installation.
  'raio-x-convencional': {
    seoTitle: 'Controle de Qualidade em Raios X | IN 90 | Consult',
    seoDescription: 'Controle de qualidade em radiografia convencional conforme RDC 611/2022 e IN 90/2021, com laudo técnico.',
    image: '/consult/raios-x-convencional-hero.jpg', imageWidth: 1600, imageHeight: 1080,
    imageAlt: 'Imagem ilustrativa de uma sala de radiografia convencional com equipamento de raios X e mesa de exame',
    eyebrow: 'Física Médica', heading: ['Controle de Qualidade em', 'Raios X convencional'],
    normHref: 'https://www.cevs.rs.gov.br/upload/arquivos/202107/08065734-in902021radiografiaconvencional.pdf',
    normDescription: 'Referência específica para radiografia médica convencional.',
  },
  // Drnabeelmohdkk1 / Wikimedia Commons, New Alma Hospital; CC0 1.0.
  'fluoroscopia-arco-c-angiografia': {
    seoTitle: 'CQ em Fluoroscopia e Arco C | IN 91 | Consult',
    seoDescription: 'Controle de qualidade em fluoroscopia, arco cirúrgico e angiografia conforme RDC 611/2022 e IN 91/2021.',
    image: '/consult/fluoroscopia-arco-c-hero.jpg', imageWidth: 960, imageHeight: 1440,
    imageAlt: 'Imagem ilustrativa de equipamento Arco C em sala cirúrgica', imagePosition: '50% 70%',
    eyebrow: 'Controle de Qualidade', heading: ['Fluoroscopia,', 'Arco C e Angiografia'],
    normHref: 'https://www.cevs.rs.gov.br/upload/arquivos/202107/08070116-in912021fluoroscopiaradiologiaintervencionista.pdf',
    normDescription: 'Referência específica para sistemas de fluoroscopia e radiologia intervencionista.',
  },
}

export default function ConsultQualityModalityPage() {
  const { slug } = useParams()
  const item = useMemo(() => MODALITIES[slug], [slug])
  const presentation = PRESENTATIONS[slug]

  useEffect(() => {
    if (!item) return
    if (presentation) {
      updateConsultPageMeta({ title: presentation.seoTitle, description: presentation.seoDescription, image: presentation.image })
      return
    }
    updateConsultPageMeta({ title: `${item.title} | Consult`, description: item.intro, image: CONSULT_IMAGES.radiology })
  }, [item, presentation])

  if (!item) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Modalidade não encontrada</h1><Link to="/consult/fisica-medica/controle-de-qualidade" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Controle de Qualidade</Link></main></ConsultSiteShell>

  if (presentation) return <ConsultQualityModalityLayout item={item} process={PROCESS} presentation={presentation}/>

  const norms = slug === 'densitometria-ossea'
    ? [['RDC 611/2022 — Anvisa','Base sanitária aplicável à modalidade. Não há IN específica indicada para densitometria óssea.',RDC_611]]
    : slug === 'raio-x-veterinario'
      ? [['RDC 611/2022 — Anvisa','Base sanitária aplicável à proteção de trabalhadores e público.',RDC_611],['IN 90/2021 — referência técnica','Referência técnica utilizada para os ensaios do equipamento de raios X.',IN_URLS['raio-x-convencional']]]
      : [['RDC 611/2022 — Anvisa','Base sanitária geral para radiologia diagnóstica e intervencionista.',RDC_611],[`${item.norm} — Anvisa`,`Referência específica para ${item.short}.`,IN_URLS[slug]]]

  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow={`Controle de Qualidade • ${item.norm}`} title={item.title} description={item.intro} image={CONSULT_IMAGES.radiology}/>
    <ApprovedProofStrip items={[[ 'MODALIDADE',item.short ],[ 'NORMA',item.norm ],[ 'ENTREGA','Laudo técnico' ],[ 'RESPONSÁVEL','Físico médico' ]]}/>

    <ApprovedLightSection eyebrow="Controle por modalidade" title={`O que é avaliado em ${item.short}`} intro="Os testes e critérios mudam conforme a tecnologia. Por isso a avaliação considera a referência específica da modalidade." center>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{item.focus.map(([label,text])=><div key={label} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"><div className="text-base font-black text-[#123C3B]">{label}</div><p className="mt-3 text-sm leading-6 text-black/55">{text}</p></div>)}</div>
    </ApprovedLightSection>

    <ApprovedDarkProcess items={PROCESS}/>

    <ApprovedLightSection eyebrow="Entregável" title="O que o laudo traz" intro={`Resultado técnico da avaliação de ${item.short}, com os ensaios e critérios aplicáveis à modalidade.`} white>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div className="rounded-2xl bg-[#075653] p-7 text-white"><div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8AE600]">Laudo de Controle de Qualidade</div><h3 className="mt-4 text-2xl font-black">Resultado documentado por modalidade</h3><p className="mt-4 text-sm leading-7 text-white/68">O documento registra os ensaios realizados, os resultados medidos, a referência aplicável e a conclusão técnica assinada pelo físico médico.</p></div>
        <ApprovedList items={['Identificação do equipamento e da modalidade','Ensaios realizados','Resultados medidos','Referência aplicável','Conclusão técnica e assinatura do físico médico']}/>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Base normativa" title="Normas e referências" intro="A avaliação combina a base geral da RDC 611/2022 com a referência específica da modalidade." >
      <ApprovedNormCards items={norms}/>
    </ApprovedLightSection>

    <ConsultCtaBand title={`Precisa de Controle de Qualidade em ${item.short}?`} text="Informe o equipamento e a situação do serviço. A equipe Consult confirma o escopo técnico e a programação da avaliação."/>
  </main></ConsultSiteShell>
}
