import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import {
  ApprovedFaq,
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedList,
  ApprovedNormCards,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

const TITLE = 'Programas PPR, PGQ e PEP | Consult Radiometria e Qualidade'
const DESCRIPTION = 'Programas de Proteção Radiológica, Garantia da Qualidade e Educação Permanente, com acompanhamento recorrente em Física Médica.'
const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'

// Oferta: decisões da Consult de 09/10/2026. Terminologia: RDC 611/2022.
// Não acrescentar parâmetros, periodicidades ou entregáveis sem fonte do cliente.
const PROGRAMS = [
  {
    id: 'ppr',
    acronym: 'PPR',
    title: 'Programa de Proteção Radiológica',
    description: 'Organiza as medidas de prevenção, controle e monitoramento das exposições à radiação, considerando pacientes, trabalhadores e público.',
    text: 'A Consult elabora e acompanha o Programa de Proteção Radiológica de acordo com a modalidade e a realidade do serviço.',
    href: '/consult/protecao-radiologica/programa-protecao-radiologica',
    linkLabel: 'Conheça o serviço de PPR',
  },
  {
    id: 'pgq',
    acronym: 'PGQ',
    title: 'Programa de Garantia da Qualidade',
    description: 'Organiza as ações de qualidade dos processos e equipamentos do serviço de radiologia. O Controle de Qualidade por modalidade integra esse acompanhamento.',
    text: 'Os testes e registros precisam corresponder à tecnologia utilizada. Acesse as modalidades para conhecer o Controle de Qualidade aplicável ao seu equipamento.',
    href: '/consult/fisica-medica/controle-de-qualidade',
    linkLabel: 'Veja o Controle de Qualidade por modalidade',
  },
  {
    id: 'pep',
    acronym: 'PEP',
    title: 'Programa de Educação Permanente',
    description: 'Organiza a capacitação da equipe e o registro dos treinamentos, conforme as atividades, tecnologias e riscos do serviço.',
    text: 'A Consult oferece treinamentos EAD na plataforma de cursos e capacitação presencial sob medida para a instituição.',
    href: '/consult/protecao-radiologica/treinamentos',
    linkLabel: 'Conheça os treinamentos',
  },
]

const RECURRING = ['Vistoria mensal', 'Análise semanal de imagens', 'Supervisão de proteção radiológica']

const FAQ = [
  ['PPR, PGQ e PEP são o mesmo programa?', 'São programas com objetivos distintos: proteção radiológica, garantia da qualidade e educação permanente da equipe. A necessidade de cada um deve considerar a modalidade e a operação da instituição.'],
  ['O acompanhamento se limita a serviços avulsos?', 'Além dos serviços avulsos, a Consult oferece acompanhamento recorrente com vistoria mensal, análise semanal de imagens e supervisão de proteção radiológica, conforme o escopo contratado.'],
  ['Como definir o escopo para a minha instituição?', 'Informe as modalidades, os equipamentos e a situação atual do serviço. A equipe Consult orienta a combinação de programas, serviços e acompanhamento aplicável.'],
]

export default function ConsultProgramsPage() {
  const { hash } = useLocation()

  useEffect(() => {
    const id = hash.slice(1)
    if (id !== 'acompanhamento-recorrente' && !PROGRAMS.some(program => program.id === id)) return
    // A rota é carregada sob demanda; só rolar quando suas seções já existem.
    const frame = window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    return () => window.cancelAnimationFrame(frame)
  }, [hash])

  useEffect(() => {
    const url = `${window.location.origin}/consult/protecao-radiologica/programas`
    const restore = []
    const setAttribute = (selector, name, value, create) => {
      let node = document.head.querySelector(selector)
      const created = !node
      if (!node) {
        node = create()
        document.head.appendChild(node)
      }
      const previous = node.getAttribute(name)
      node.setAttribute(name, value)
      restore.push(() => {
        if (created) node.remove()
        else if (previous === null) node.removeAttribute(name)
        else node.setAttribute(name, previous)
      })
    }
    for (const [attribute, name, value] of [
      ['name', 'description', DESCRIPTION],
      ['property', 'og:title', TITLE],
      ['property', 'og:description', DESCRIPTION],
      ['property', 'og:url', url],
      ['name', 'twitter:title', TITLE],
      ['name', 'twitter:description', DESCRIPTION],
    ]) {
      setAttribute(`meta[${attribute}="${name}"]`, 'content', value, () => {
        const node = document.createElement('meta')
        node.setAttribute(attribute, name)
        return node
      })
    }
    setAttribute('link[rel="canonical"]', 'href', url, () => {
      const node = document.createElement('link')
      node.rel = 'canonical'
      return node
    })
    document.title = TITLE
    return () => restore.forEach(reset => reset())
  }, [])

  return <ConsultSiteShell><main>
    <ApprovedInternalHero
      eyebrow="Física Médica e Proteção Radiológica"
      title="Programas de radiologia: PPR, PGQ e PEP"
      description="Proteção radiológica, qualidade dos processos e capacitação da equipe organizadas para a rotina da sua instituição."
      image={CONSULT_IMAGES.protection}
    />

    <nav aria-label="Conteúdo dos programas" className="border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-5 sm:px-6 lg:px-8">
        {PROGRAMS.map(({ id, acronym, title }) => <a key={id} href={`#${id}`} aria-label={`${acronym}: ${title}`} className="inline-flex min-h-11 items-center rounded-lg border border-[#CFE4DE] px-5 py-2 text-sm font-extrabold text-[#075653] hover:bg-[#E5F6F1]">{acronym}</a>)}
        <a href="#acompanhamento-recorrente" className="inline-flex min-h-11 items-center rounded-lg border border-[#CFE4DE] px-5 py-2 text-sm font-extrabold text-[#075653] hover:bg-[#E5F6F1]">Acompanhamento recorrente</a>
      </div>
    </nav>

    {PROGRAMS.map((program, index) => <div key={program.id} id={program.id} className="scroll-mt-24">
      <ApprovedLightSection eyebrow={program.acronym} title={program.title} intro={program.description} white={index % 2 === 0}>
        <p className="max-w-3xl text-[15px] leading-7 text-[#315B58]">{program.text}</p>
        <Link to={program.href} className="mt-6 inline-flex min-h-11 items-center rounded-lg border border-[#08A77F] px-5 py-3 text-sm font-extrabold text-[#075653] hover:bg-[#E5F6F1]">{program.linkLabel}</Link>
        {program.id === 'pep' && <a href="https://consultcursos.herospark.co" target="_blank" rel="noreferrer" className="mt-3 block w-fit rounded-lg px-1 py-3 text-sm font-extrabold text-[#075653] underline underline-offset-4">Acesse a plataforma de cursos</a>}
      </ApprovedLightSection>
    </div>)}

    <div id="acompanhamento-recorrente" className="scroll-mt-24">
      <ApprovedLightSection eyebrow="Contratos recorrentes" title="Acompanhamento contínuo em Física Médica" intro="A Consult também atende a rotina da instituição por meio de acompanhamento recorrente. A combinação de atividades é definida conforme a necessidade do serviço e o escopo contratado.">
        <ApprovedList items={RECURRING}/>
      </ApprovedLightSection>
    </div>

    <ApprovedLightSection eyebrow="Base normativa" title="Referência para os programas de radiologia" intro="A RDC 611/2022 reúne requisitos para os programas de qualidade, educação permanente e proteção radiológica, conforme sua aplicação ao serviço." white>
      <ApprovedNormCards items={[
        ['RDC 611/2022 — Anvisa', 'Consulte a resolução na fonte oficial.', RDC_611],
      ]}/>
    </ApprovedLightSection>

    <ApprovedFaq items={FAQ}/>
    <ConsultCtaBand title="Precisa estruturar os programas da sua instituição?" text="Converse com a equipe Consult sobre os programas e o acompanhamento aplicáveis ao seu serviço de radiologia."/>
  </main></ConsultSiteShell>
}
