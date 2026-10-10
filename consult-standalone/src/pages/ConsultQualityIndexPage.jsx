import React, { useEffect } from 'react'
import { Activity, Gauge, HeartPulse, Monitor, ScanLine, Stethoscope } from 'lucide-react'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/ConsultSiteShell'
import {
  ApprovedDarkProcess,
  ApprovedEditorialPanel,
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedMediaCards,
  ApprovedNormCards,
  ApprovedProofStrip,
  CONSULT_IMAGES,
} from '@/components/ConsultApprovedInternal'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'

const MODALITIES = [
  { title:'Raios X convencional', norm:'IN 90/2021', slug:'raio-x-convencional', Icon:ScanLine, text:'Controle de Qualidade em radiografia convencional, com referência específica para a modalidade.' },
  { title:'Fluoroscopia, Arco C e angiografia', norm:'IN 91/2021', slug:'fluoroscopia-arco-c-angiografia', Icon:Activity, text:'Avaliação de sistemas de fluoroscopia, arco cirúrgico e angiografia conforme a referência aplicável.' },
  { title:'Mamografia', norm:'IN 92/2021', slug:'mamografia', Icon:HeartPulse, text:'Controle de Qualidade do sistema mamográfico com documentação técnica dos resultados.' },
  { title:'Tomografia computadorizada', norm:'IN 93/2021', slug:'tomografia', Icon:Monitor, text:'Avaliação periódica do tomógrafo conforme a referência específica da modalidade.' },
  { title:'Odontológico extraoral', norm:'IN 94/2021', slug:'odontologico-extraoral', Icon:ScanLine, text:'Controle de Qualidade de sistemas odontológicos extraorais, incluindo aplicações panorâmicas e tomográficas.' },
  { title:'Odontológico intraoral', norm:'IN 95/2021', slug:'odontologico-intraoral', Icon:ScanLine, text:'Avaliação técnica de equipamentos de radiologia odontológica intraoral.' },
  { title:'Ultrassom', norm:'IN 96/2021', slug:'ultrassom', Icon:Stethoscope, text:'Controle de Qualidade em equipamentos de ultrassom conforme a referência própria da modalidade.' },
  { title:'Ressonância magnética', norm:'IN 97/2021', slug:'ressonancia-magnetica', Icon:Monitor, text:'Controle de Qualidade em ressonância magnética com avaliação e registro técnico por modalidade.' },
  { title:'Densitometria óssea', norm:'RDC 611/2022', slug:'densitometria-ossea', Icon:Gauge, text:'Testes de aceitação e constância conforme RDC 611/2022, fabricante e protocolos reconhecidos.' },
  { title:'Raios X veterinário', norm:'RDC 611/2022 + IN 90', slug:'raio-x-veterinario', Icon:ScanLine, text:'Avaliação de raios X veterinário com RDC 611/2022 e IN 90/2021 como referência técnica.' },
]

const PROCESS = [
  ['01','Identificar a modalidade','Confirmar equipamento, contexto de uso e referência aplicável.'],
  ['02','Executar os ensaios','Realizar os testes definidos para aquela tecnologia.'],
  ['03','Analisar os resultados','Comparar as medições com os critérios técnicos pertinentes.'],
  ['04','Emitir o laudo','Documentar resultados e conclusão técnica por modalidade.'],
]

export default function ConsultQualityIndexPage() {
  useEffect(() => {
    document.title = 'Controle de Qualidade em Diagnóstico por Imagem | Consult'
    document.querySelector('meta[name="description"]')?.setAttribute('content','Controle de Qualidade em diagnóstico por imagem com avaliação por modalidade, referências específicas e laudo técnico assinado pelo físico médico.')
  }, [])

  const cards = MODALITIES.map(item=>({
    title:item.title,
    text:item.text,
    href:`/fisica-medica/controle-de-qualidade/${item.slug}`,
    image:CONSULT_IMAGES.radiology,
    Icon:item.Icon,
    badge:item.norm,
    cta:'Ver modalidade',
  }))

  return <ConsultSiteShell><main>
    <ApprovedInternalHero
      eyebrow="Física Médica"
      title="Controle de Qualidade por modalidade"
      description="Cada tecnologia possui critérios próprios. A Consult separa a avaliação por modalidade, aplica a referência correspondente e documenta o resultado em laudo técnico."
      image={CONSULT_IMAGES.radiology}
      breadcrumbs={[[ 'Início','/' ],[ 'Física Médica','/fisica-medica' ],[ 'Controle de Qualidade',null ]]}
    />

    <ApprovedProofStrip items={[
      ['BASE','RDC 611/2022'],
      ['MODALIDADES','10 tecnologias'],
      ['REFERÊNCIAS','IN 90 a 97/2021'],
      ['ENTREGA','Laudo técnico'],
    ]}/>

    <ApprovedLightSection
      eyebrow="Por modalidade"
      title="Escolha a tecnologia que será avaliada"
      intro="O índice abaixo é o ponto de entrada para as 10 modalidades aprovadas pela Consult. Cada página mantém sua própria referência e seu próprio escopo."
      center
    >
      <ApprovedMediaCards items={cards} columns="five"/>
    </ApprovedLightSection>

    <ApprovedLightSection
      eyebrow="Por que separar"
      title="Uma modalidade não deve ser tratada como cópia da outra"
      intro="A estrutura do site separa as tecnologias justamente para evitar descrições genéricas."
      white
    >
      <ApprovedEditorialPanel
        eyebrow="Critério técnico"
        title="Norma, ensaio e laudo precisam acompanhar a tecnologia"
        text="Raios X, mamografia, tomografia, ultrassom e ressonância magnética possuem referências e rotinas próprias. A página de cada modalidade é o lugar para apresentar esses critérios sem misturar equipamentos ou normas."
        image={CONSULT_IMAGES.radiology}
        items={['Referência específica da modalidade','Escopo técnico separado','Resultado documentado','Laudo assinado pelo físico médico']}
      />
    </ApprovedLightSection>

    <ApprovedDarkProcess items={PROCESS}/>

    <ApprovedLightSection
      eyebrow="Programas recorrentes"
      title="Física Médica também pode funcionar como acompanhamento contínuo"
      intro="Além dos serviços pontuais, a Consult mantém rotinas recorrentes previstas no conteúdo aprovado."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ['Vistoria mensal','Acompanhamento periódico conforme o escopo contratado.'],
          ['Análise semanal de imagens','Rotina de avaliação de imagens quando prevista no programa do serviço.'],
          ['Supervisão de proteção radiológica','Acompanhamento técnico recorrente conforme a necessidade da instituição.'],
        ].map(([title,text])=><div key={title} className="rounded-xl border border-black/5 bg-white p-6 shadow-lg shadow-[#075653]/5"><div className="text-lg font-black text-[#123C3B]">{title}</div><p className="mt-3 text-sm leading-7 text-black/55">{text}</p></div>)}
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection
      eyebrow="Base normativa"
      title="Referências organizadas por tecnologia"
      intro="A RDC 611/2022 estabelece a base sanitária geral e as Instruções Normativas complementam os critérios conforme a modalidade."
      white
    >
      <ApprovedNormCards items={[
        ['RDC 611/2022 — Anvisa','Base sanitária geral para serviços de radiologia diagnóstica e intervencionista.',RDC_611],
        ['IN 90 a 97/2021 — Anvisa','Referências específicas por modalidade. Na biblioteca final cada IN terá seu link oficial próprio.',ANVISA_IN],
      ]}/>
    </ApprovedLightSection>

    <ConsultCtaBand title="Precisa programar o Controle de Qualidade?" text="Informe a modalidade e o equipamento. A equipe Consult confirma o escopo técnico e a programação da avaliação."/>
  </main></ConsultSiteShell>
}
