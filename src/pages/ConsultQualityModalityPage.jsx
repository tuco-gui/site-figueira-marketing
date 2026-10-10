import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import {
  ApprovedDarkProcess,
  ApprovedEditorialPanel,
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedList,
  ApprovedNormCards,
  ApprovedProofStrip,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'

const MODALITIES = {
  'raio-x-convencional': {
    title: 'Controle de Qualidade em Raios X Convencional',
    short: 'Raios X convencional',
    norm: 'IN 90/2021',
    intro: 'Avaliação técnica periódica de equipamentos de radiografia convencional, organizada pela referência própria da modalidade e documentada em laudo assinado pelo físico médico.',
    context: 'A radiografia convencional possui critérios próprios de Controle de Qualidade. Por isso, a avaliação não é apresentada como um checklist genérico: o escopo deve seguir a referência técnica aplicável ao equipamento e à modalidade.',
  },
  'fluoroscopia-arco-c-angiografia': {
    title: 'Controle de Qualidade em Fluoroscopia, Arco C e Angiografia',
    short: 'Fluoroscopia, Arco C e Angiografia',
    norm: 'IN 91/2021',
    intro: 'Avaliação técnica de sistemas de fluoroscopia, arco cirúrgico e angiografia, com referência específica da modalidade e resultados registrados em laudo técnico.',
    context: 'Sistemas utilizados em fluoroscopia e radiologia intervencionista exigem uma avaliação própria da tecnologia. A Consult separa o escopo desta modalidade e documenta os resultados conforme a referência aplicável.',
  },
  mamografia: {
    title: 'Controle de Qualidade em Mamografia',
    short: 'Mamografia',
    norm: 'IN 92/2021',
    intro: 'Controle de Qualidade do sistema mamográfico com avaliação técnica específica da modalidade e documentação dos resultados em laudo assinado pelo físico médico.',
    context: 'Mamografia não deve ser tratada como uma variação genérica de radiografia. A página mantém a referência própria da modalidade e organiza o resultado técnico em documento específico.',
  },
  tomografia: {
    title: 'Controle de Qualidade em Tomografia Computadorizada',
    short: 'Tomografia computadorizada',
    norm: 'IN 93/2021',
    intro: 'Avaliação periódica de tomógrafos conforme a referência específica da modalidade, com medições analisadas e conclusão documentada em laudo técnico.',
    context: 'A tomografia computadorizada possui critérios próprios de avaliação. O serviço é estruturado por modalidade, sem misturar parâmetros ou referências de outros equipamentos de imagem.',
  },
  'odontologico-extraoral': {
    title: 'Controle de Qualidade em Radiologia Odontológica Extraoral',
    short: 'Odontológico extraoral',
    norm: 'IN 94/2021',
    intro: 'Controle de Qualidade de sistemas odontológicos extraorais, incluindo aplicações panorâmicas e tomográficas, conforme a referência específica da modalidade.',
    context: 'Equipamentos odontológicos extraorais possuem escopo próprio de avaliação. A Consult documenta o resultado da modalidade sem reaproveitar um checklist genérico de outras tecnologias.',
  },
  'odontologico-intraoral': {
    title: 'Controle de Qualidade em Radiologia Odontológica Intraoral',
    short: 'Odontológico intraoral',
    norm: 'IN 95/2021',
    intro: 'Avaliação técnica de equipamentos de radiologia odontológica intraoral, com referência própria e resultado documentado em laudo técnico.',
    context: 'O Controle de Qualidade intraoral é apresentado como serviço próprio, com referência específica e documentação separada da modalidade extraoral.',
  },
  ultrassom: {
    title: 'Controle de Qualidade em Ultrassom',
    short: 'Ultrassom',
    norm: 'IN 96/2021',
    intro: 'Controle de Qualidade em equipamentos de ultrassom conforme a referência própria da modalidade, com avaliação técnica e resultado documentado.',
    context: 'Ultrassom não utiliza o mesmo conjunto de critérios das modalidades que empregam radiação ionizante. Por isso, a página mantém sua referência e seu escopo separados.',
  },
  'ressonancia-magnetica': {
    title: 'Controle de Qualidade em Ressonância Magnética',
    short: 'Ressonância magnética',
    norm: 'IN 97/2021',
    intro: 'Controle de Qualidade em ressonância magnética com avaliação técnica específica da modalidade e registro dos resultados em documento próprio.',
    context: 'A ressonância magnética possui referência específica e deve ser tratada como tecnologia própria no Controle de Qualidade, sem copiar critérios de radiologia convencional.',
  },
  'densitometria-ossea': {
    title: 'Controle de Qualidade em Densitometria Óssea',
    short: 'Densitometria óssea',
    norm: 'RDC 611/2022',
    intro: 'Testes de aceitação e de constância conforme a RDC 611/2022, as instruções do fabricante e protocolos reconhecidos, com resultado documentado.',
    context: 'A Consult não atribui uma Instrução Normativa específica à densitometria. A base apresentada é a RDC 611/2022, combinada às instruções do fabricante e a protocolos reconhecidos.',
  },
  'raio-x-veterinario': {
    title: 'Controle de Qualidade em Raios X Veterinário',
    short: 'Raios X veterinário',
    norm: 'RDC 611/2022 + IN 90/2021 como referência técnica',
    intro: 'Avaliação técnica de equipamentos de raios X veterinário com a RDC 611/2022 como base e a IN 90/2021 utilizada como referência técnica.',
    context: 'Na radiologia veterinária, a RDC 611/2022 é considerada na proteção de trabalhadores e do público. A IN 90/2021 é apresentada como referência técnica dos testes, sem afirmar uma aplicação regulatória diferente da definida pela Consult.',
  },
}

const PROCESS = [
  ['01','Confirmar a modalidade','Identificar equipamento, aplicação e referência técnica correspondente.'],
  ['02','Executar o controle','Realizar os ensaios definidos para a tecnologia e para o equipamento.'],
  ['03','Analisar os resultados','Confrontar as medições com os critérios aplicáveis à modalidade.'],
  ['04','Documentar','Emitir o laudo técnico com resultados, referência e conclusão.'],
]

export default function ConsultQualityModalityPage() {
  const { slug } = useParams()
  const item = useMemo(() => MODALITIES[slug], [slug])

  useEffect(() => {
    if (!item) return
    document.title = `${item.title} | Consult`
    document.querySelector('meta[name="description"]')?.setAttribute('content', item.intro)
  }, [item])

  if (!item) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Modalidade não encontrada</h1><Link to="/consult/fisica-medica/controle-de-qualidade" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Controle de Qualidade</Link></main></ConsultSiteShell>

  const norms = item.norm.startsWith('IN ')
    ? [
        ['RDC 611/2022 — Anvisa','Base sanitária geral para radiologia diagnóstica e intervencionista.',RDC_611],
        [`${item.norm} — Anvisa`,`Referência específica da modalidade ${item.short}.`,ANVISA_IN],
      ]
    : [
        ['RDC 611/2022 — Anvisa','Base indicada para esta modalidade.',RDC_611],
        [item.norm,'Referência técnica apresentada pela Consult para esta modalidade.',ANVISA_IN],
      ]

  return <ConsultSiteShell><main>
    <ApprovedInternalHero
      eyebrow={`Controle de Qualidade • ${item.norm}`}
      title={item.title}
      description={item.intro}
      image={CONSULT_IMAGES.radiology}
      breadcrumbs={[[ 'Início','/consult' ],[ 'Física Médica','/consult/fisica-medica' ],[ 'Controle de Qualidade','/consult/fisica-medica/controle-de-qualidade' ],[ item.short,null ]]}
    />

    <ApprovedProofStrip items={[
      ['MODALIDADE',item.short],
      ['REFERÊNCIA',item.norm],
      ['ENTREGA','Laudo técnico'],
      ['RESPONSÁVEL','Físico médico'],
    ]}/>

    <ApprovedLightSection
      eyebrow="Controle por modalidade"
      title="O escopo acompanha a tecnologia — não um template genérico"
      intro={item.context}
    >
      <ApprovedEditorialPanel
        eyebrow="Estrutura da avaliação"
        title={`Controle de Qualidade em ${item.short}`}
        text="Os ensaios são definidos de acordo com a modalidade, o equipamento e a referência técnica aplicável. O resultado registra as medições realizadas, os critérios considerados e a conclusão técnica."
        image={CONSULT_IMAGES.radiology}
        items={['Modalidade identificada','Referência própria','Resultados documentados','Conclusão técnica assinada']}
      />
    </ApprovedLightSection>

    <ApprovedDarkProcess items={PROCESS}/>

    <ApprovedLightSection
      eyebrow="Entregável"
      title="O que o laudo traz"
      intro={`Resultado técnico do Controle de Qualidade em ${item.short}, apresentado sem tabela fictícia ou valores de exemplo.`}
      white
    >
      <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
        <div className="rounded-2xl bg-[#075653] p-7 text-white shadow-xl shadow-[#075653]/10">
          <div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8AE600]">Laudo de Controle de Qualidade</div>
          <h3 className="mt-4 text-2xl font-black">Resultado documentado por modalidade</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">Laudo emitido em até 7 dias após as medições, com assinatura do físico médico responsável.</p>
        </div>
        <ApprovedList items={['Identificação do equipamento e da modalidade','Ensaios realizados conforme o escopo aplicável','Resultados medidos','Referência utilizada na avaliação','Conclusão técnica e assinatura do físico médico']}/>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection
      eyebrow="Base normativa"
      title="Normas e referências"
      intro="A página apresenta a base geral e a referência própria da modalidade, sem atribuir ao serviço uma norma que não se aplica."
    >
      <ApprovedNormCards items={norms}/>
    </ApprovedLightSection>

    <ConsultCtaBand
      title={`Precisa de Controle de Qualidade em ${item.short}?`}
      text="Informe o equipamento e a situação do serviço. A equipe Consult confirma o escopo técnico e a programação da avaliação."
    />
  </main></ConsultSiteShell>
}
