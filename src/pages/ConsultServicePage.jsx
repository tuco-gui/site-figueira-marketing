import React, { useEffect, useMemo } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import {
  ApprovedDarkProcess,
  ApprovedFaq,
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedList,
  ApprovedNormCards,
  ApprovedProofStrip,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'

const PROTECTION_SLUGS = new Set(['programa-protecao-radiologica','levantamento-radiometrico','projeto-blindagem','treinamentos','licenciamento-sanitario'])

const SERVICES = {
  'controle-qualidade': {
    title: 'Controle de qualidade em radiologia',
    eyebrow: 'Física Médica e Proteção Radiológica',
    visual: 'technical',
    intro: 'Testes periódicos que verificam dose, qualidade de imagem e funcionamento do equipamento, com laudo assinado pelo físico médico.',
    audience: 'Indicado para serviços com equipamentos de raios X, tomografia, mamografia, ressonância magnética, ultrassom e demais modalidades aplicáveis ao serviço.',
    when: ['Rotina periódica de controle de qualidade','Equipamento novo ou após mudança relevante','Necessidade de documentar dose, imagem e funcionamento','Preparação para inspeções e exigências sanitárias'],
    proof: [['ESCOPO','Dose, imagem e funcionamento'],['ENTREGA','Laudo técnico assinado'],['BASE','RDC 611/2022'],['MODALIDADES','IN 90 a 97/2021']],
    parameters: [['Dose','Medições aplicáveis à modalidade'],['Qualidade de imagem','Parâmetros específicos do equipamento'],['Funcionamento','Verificação do desempenho previsto'],['Documentação','Resultado registrado em laudo técnico']],
    storyTitle: 'Controle de qualidade não é um selo genérico de aprovação.',
    story: 'A avaliação combina medições específicas da modalidade, referência normativa e resultado documentado. Tecnologias diferentes exigem ensaios e critérios próprios.',
    metric: 'Dose, qualidade de imagem e funcionamento verificados em ensaio',
    deliverable: 'Laudo de Controle de Qualidade',
    deliverableSections: ['Equipamento e modalidade avaliados','Testes realizados','Resultados medidos','Referência aplicável à modalidade','Resultado técnico e assinatura do físico médico'],
        norms: [['RDC 611/2022 — Anvisa','Base sanitária para serviços de radiologia diagnóstica e intervencionista.',RDC_611],['IN 90 a 97/2021 — Anvisa','Requisitos específicos por modalidade e equipamento.',ANVISA_IN]],
    equipmentNorms: [['Raios X médico convencional','IN 90/2021'],['Fluoroscopia, arco cirúrgico e angiógrafo','IN 91/2021'],['Mamógrafo','IN 92/2021'],['Tomógrafo','IN 93/2021'],['Raios X odontológico extraoral','IN 94/2021'],['Raios X odontológico intraoral','IN 95/2021'],['Ultrassom','IN 96/2021'],['Ressonância magnética','IN 97/2021'],['Densitômetro ósseo','RDC 611/2022'],['Raios X veterinário','RDC 611/2022 + IN 90/2021 como referência técnica']],
    faq: [['Controle de qualidade e calibração são a mesma coisa?','Não. O Controle de Qualidade integra o escopo de Física Médica e radiodiagnóstico. A Engenharia Clínica possui uma frente própria de ensaio de desempenho para equipamentos biomédicos.'],['A norma é a mesma para todos os equipamentos?','Não. A RDC 611/2022 é a base geral e as Instruções Normativas 90 a 97/2021 variam conforme a modalidade.']],
  },
  'programa-protecao-radiologica': {
    title: 'Programa de Proteção Radiológica', eyebrow: 'Proteção Radiológica', visual: 'shield',
    intro: 'Elaboração e acompanhamento do programa exigido para serviços de radiologia diagnóstica e intervencionista.',
    audience: 'Para instituições que precisam estruturar, revisar ou manter as rotinas e responsabilidades relacionadas à proteção radiológica.',
    when: ['Implantação de um novo serviço','Revisão do programa existente','Mudanças relevantes na operação','Necessidade de organizar a proteção radiológica exigida pela RDC 611'],
    proof: [['OBJETIVO','Estruturar a proteção radiológica'],['ENTREGA','Programa e acompanhamento'],['BASE','RDC 611/2022'],['PÚBLICO','Serviços de radiologia']],
    parameters: [['Serviço','Caracterização da operação'],['Responsabilidades','Papéis e rotinas aplicáveis'],['Documentação','Registros exigidos pelo programa'],['Acompanhamento','Atualização conforme mudanças do serviço']],
    storyTitle: 'Um programa útil precisa refletir a operação real do serviço.',
    story: 'O Programa de Proteção Radiológica deve refletir a modalidade, o ambiente, a equipe e as responsabilidades aplicáveis ao serviço de radiologia.',
    metric: 'Programa estruturado e acompanhado conforme o serviço',
    deliverable: 'Programa de Proteção Radiológica',
    deliverableSections: ['Identificação do serviço','Escopo do programa','Rotinas e responsabilidades aplicáveis','Documentação necessária ao acompanhamento','Atualizações conforme mudanças do serviço'],
    note: 'O serviço contempla elaboração e acompanhamento do programa, com estrutura adequada à modalidade e à realidade da instituição.',
    norms: [['RDC 611/2022 — Anvisa','Norma-base para o Programa de Proteção Radiológica.',RDC_611]],
    faq: [['Quando o programa deve ser revisto?','A revisão deve acompanhar as exigências aplicáveis e mudanças relevantes no serviço.'],['A Consult apenas entrega o documento?','O serviço contempla elaboração e acompanhamento do programa.']],
  },
  'levantamento-radiometrico': {
    title: 'Levantamento radiométrico', eyebrow: 'Proteção Radiológica', visual: 'technical',
    intro: 'Medição da radiação nas áreas ao redor da sala e da radiação de fuga do cabeçote.',
    audience: 'Aplicável a salas novas, reformadas, com troca de equipamento e situações de avaliação periódica conforme o serviço.',
    when: ['Sala nova','Reforma do ambiente','Troca de equipamento','Rotina periódica de avaliação'],
    proof: [['MEDIÇÃO','Radiação no entorno'],['VERIFICAÇÃO','Fuga do cabeçote'],['BASE','RDC 611/2022'],['SAÍDA','Resultado documentado']],
    parameters: [['Ambiente','Pontos definidos ao redor da sala'],['Equipamento','Condição avaliada durante a medição'],['Fuga','Radiação de fuga do cabeçote'],['Conclusão','Resultado técnico documentado']],
    storyTitle: 'Blindagem e proteção precisam ser verificadas por medição, não por percepção.',
    story: 'O levantamento radiométrico transforma a condição do ambiente em dados mensuráveis, registrando os pontos avaliados, a radiação no entorno e a radiação de fuga do cabeçote.',
    metric: 'Radiação no entorno e fuga do cabeçote medidas em campo',
    deliverable: 'Resultado do Levantamento Radiométrico',
    deliverableSections: ['Sala e equipamento avaliados','Pontos de medição no entorno','Medição da radiação de fuga','Resultados obtidos','Conclusão técnica da avaliação'],
        norms: [['RDC 611/2022 — Anvisa','Base sanitária e de proteção radiológica.',RDC_611],['IN aplicável à modalidade','A referência específica depende do equipamento avaliado.',ANVISA_IN]],
    faq: [['Quando esse serviço costuma ser necessário?','O serviço costuma ser necessário em salas novas ou reformadas, após troca de equipamento e em avaliações periódicas.'],['O levantamento substitui projeto de blindagem?','Não. O projeto de blindagem calcula a solução antes da obra ou mudança; o levantamento radiométrico mede a condição do ambiente.']],
  },
  'projeto-blindagem': {
    title: 'Projeto de blindagem radiológica', eyebrow: 'Proteção Radiológica', visual: 'shield',
    intro: 'Cálculo da blindagem da sala antes da obra ou da troca de equipamento.',
    audience: 'Para clínicas e hospitais em obra, reforma, expansão ou troca de equipamento que altere as condições do ambiente.',
    when: ['Projeto de nova sala','Reforma de ambiente existente','Expansão do serviço','Troca de equipamento com impacto no projeto'],
    proof: [['MOMENTO','Antes da obra'],['ENTREGA','Memorial de cálculo'],['BASE','RDC 611/2022'],['APLICAÇÃO','Salas e barreiras']],
    parameters: [['Ambiente','Características da sala e áreas adjacentes'],['Equipamento','Tecnologia prevista no projeto'],['Premissas','Condições consideradas no cálculo'],['Barreiras','Dimensionamento documentado no memorial']],
    storyTitle: 'A blindagem precisa nascer antes da obra, não depois do problema.',
    story: 'A função do projeto é transformar condições de uso, ambiente e equipamento em um memorial de cálculo que oriente a solução técnica antes da execução física da sala.',
    metric: 'Blindagem calculada antes da execução da obra',
    deliverable: 'Memorial de Cálculo de Blindagem',
    deliverableSections: ['Ambiente e equipamento previstos','Premissas utilizadas no cálculo','Cálculo da blindagem','Barreiras consideradas','Memorial técnico do projeto'],
    note: 'O próprio serviço é apresentado pela Consult como Memorial de Cálculo de Blindagem. O documento final é dimensionado conforme o ambiente e o equipamento do projeto.',
    norms: [['RDC 611/2022 — Anvisa','Base sanitária para os serviços abrangidos.',RDC_611],['IN aplicável à modalidade','A referência específica depende da tecnologia prevista.',ANVISA_IN]],
    faq: [['Projeto de blindagem e levantamento radiométrico são iguais?','Não. O projeto calcula a solução previamente; o levantamento mede a condição radiométrica do ambiente.'],['Serve apenas para obra nova?','Não. O serviço também se aplica a reforma, expansão e troca de equipamento.']],
  },
  treinamentos: {
    title: 'Treinamentos técnicos', eyebrow: 'Proteção Radiológica', visual: 'technical',
    intro: 'Capacitação periódica das equipes em radioproteção e segurança em ressonância magnética.',
    audience: 'Para equipes de radiologia e ressonância magnética que precisam atualizar práticas de proteção e segurança.',
    when: ['Capacitação periódica da equipe','Entrada de novos profissionais','Atualização de rotina','Necessidade de reforçar radioproteção ou segurança em RM'],
    proof: [['FOCO','Radioproteção'],['TEMA','Segurança em RM'],['FORMATO','Capacitação técnica'],['PÚBLICO','Equipes assistenciais']],
    parameters: [['Tema','Conteúdo definido conforme necessidade'],['Equipe','Público participante'],['Rotina','Aplicação ao contexto da instituição'],['Registro','Escopo de realização documentado conforme contratação']],
    storyTitle: 'Treinamento técnico precisa conversar com a rotina da equipe.',
    story: 'O conteúdo é orientado ao contexto de radioproteção ou segurança em ressonância magnética da instituição, com cursos EAD e treinamento presencial sob medida.',
    metric: 'Capacitação técnica direcionada à rotina da equipe',
    deliverable: 'Capacitação técnica',
    deliverableSections: ['Tema do treinamento','Público participante','Conteúdo técnico definido para a equipe','Orientações aplicáveis à rotina','Escopo de realização'],
    note: 'A capacitação pode ser realizada periodicamente conforme a necessidade da instituição e os requisitos aplicáveis.',
    norms: [['RDC 611/2022 — Anvisa','Referência sanitária central para os serviços de radiologia.',RDC_611],['Requisitos complementares','Variam conforme o tema e a modalidade do treinamento.',ANVISA_IN]],
    faq: [['O treinamento é apenas sobre raios X?','Não. A Consult também realiza treinamento em segurança em ressonância magnética.'],['Há certificado obrigatório?','O formato do entregável depende do treinamento contratado e da necessidade da instituição.']],
  },
  'licenciamento-sanitario': {
    title: 'Licenciamento sanitário', eyebrow: 'Proteção Radiológica', visual: 'shield',
    intro: 'Apoio na documentação para obter ou renovar a licença da vigilância sanitária.',
    audience: 'Para serviços novos ou em renovação que precisam organizar a documentação técnica relacionada ao processo sanitário.',
    when: ['Abertura de novo serviço','Renovação de licença','Atualização de documentação técnica','Mudança relevante no serviço que exija revisão documental'],
    proof: [['ESCOPO','Apoio documental'],['PROCESSO','Obtenção ou renovação'],['BASE','RDC 611/2022'],['LIMITE','Sem promessa de aprovação']],
    parameters: [['Escopo','Levantamento da situação do serviço'],['Documentos','Organização da documentação aplicável'],['Pendências','Identificação do que precisa ser providenciado'],['Acompanhamento','Suporte dentro do escopo contratado']],
    storyTitle: 'A Consult organiza a parte técnica; a licença continua sendo decisão da autoridade sanitária.',
    story: 'O serviço oferece apoio técnico e documental ao processo. A emissão ou aprovação da licença permanece sob decisão da autoridade sanitária competente.',
    metric: 'Documentação técnica organizada para o processo sanitário',
    deliverable: 'Apoio documental ao licenciamento',
    deliverableSections: ['Levantamento do escopo do serviço','Organização da documentação técnica aplicável','Identificação de pendências documentais','Referências técnicas relacionadas','Acompanhamento dentro do escopo contratado'],
    note: 'O serviço oferece apoio técnico e documental. A aprovação ou emissão da licença depende da autoridade sanitária competente.',
    norms: [['RDC 611/2022 — Anvisa','Referência central para serviços de radiologia.',RDC_611],['Exigências específicas','Podem variar conforme modalidade e autoridade sanitária.',ANVISA_IN]],
    faq: [['A Consult garante a emissão da licença?','Não. A Consult presta apoio técnico e documental; a decisão compete à autoridade sanitária.'],['O serviço vale para renovação?','Sim. O apoio pode abranger obtenção e renovação, conforme o caso.']],
  },
}

const PROCESS = [['01','Entender a necessidade','Identificar serviço, equipamento, ambiente e objetivo técnico.'],['02','Preparar a execução','Definir dados, condições e referências necessárias.'],['03','Executar tecnicamente','Realizar medições, cálculos, ensaios ou revisão documental conforme o serviço.'],['04','Documentar o resultado','Entregar o laudo, programa, memorial ou documentação correspondente ao escopo.']]

function heroImage(service) {
  if (service.eyebrow === 'Proteção Radiológica' || service.visual === 'shield') return CONSULT_IMAGES.protection
  return CONSULT_IMAGES.radiology
}

export default function ConsultServicePage() {
  const { slug } = useParams()
  const location = useLocation()
  const service = useMemo(() => SERVICES[slug], [slug])

  useEffect(() => {
    if (!service) return
    document.title = `${service.title} | Consult Radiometria e Qualidade`
    document.querySelector('meta[name="description"]')?.setAttribute('content', service.intro)
  }, [service])

  if (!service) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Serviço não encontrado</h1><Link to="/" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para a Consult</Link></main></ConsultSiteShell>

  if (PROTECTION_SLUGS.has(slug) && location.pathname.startsWith('/fisica-medica/')) {
    return <Navigate to={`/protecao-radiologica/${slug}`} replace />
  }

  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow={service.eyebrow} title={service.title} description={service.intro} image={heroImage(service)}/>
    <ApprovedProofStrip items={service.proof}/>

    <ApprovedLightSection eyebrow="Sobre o serviço" title={service.title} intro={service.audience} center>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div className="rounded-2xl bg-[#075653] p-7 text-white shadow-xl shadow-[#075653]/10">
          <div className="text-[10px] font-bold uppercase tracking-[.24em] text-[#8AE600]">Objetivo</div>
          <h3 className="mt-4 text-2xl font-black leading-tight">O que este serviço verifica ou organiza</h3>
          <p className="mt-4 text-sm leading-7 text-white/72">{service.metric}</p>
        </div>
        <div>
          <div className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#08A77F]">O que entra na análise</div>
          <div className="grid gap-3 sm:grid-cols-2">{service.parameters.map(([label,text])=><div key={label} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"><div className="text-sm font-black text-[#123C3B]">{label}</div><p className="mt-2 text-sm leading-6 text-black/55">{text}</p></div>)}</div>
        </div>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Quando contratar" title="Situações em que este serviço costuma ser necessário" intro="O escopo final depende da condição da instituição, do equipamento e da aplicação técnica." white>
      <ApprovedList items={service.when}/>
    </ApprovedLightSection>

    <ApprovedDarkProcess items={PROCESS}/>

    <ApprovedLightSection eyebrow="Entregável técnico" title={service.deliverable} intro="O documento registra o escopo executado, os resultados e as referências aplicáveis ao serviço." white>
      <ApprovedList items={service.deliverableSections}/>
    </ApprovedLightSection>

    {service.equipmentNorms && <ApprovedLightSection eyebrow="Controle de Qualidade" title="Referência técnica por modalidade" intro="A RDC 611/2022 estabelece a base geral e as Instruções Normativas variam de acordo com a tecnologia avaliada.">
      <div className="grid gap-4 sm:grid-cols-2">{service.equipmentNorms.map(([equipment,norm])=><div key={equipment} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"><div className="text-sm font-black text-[#123C3B]">{equipment}</div><div className="mt-2 text-xs font-extrabold text-[#08A77F]">{norm}</div></div>)}</div>
    </ApprovedLightSection>}

    <ApprovedLightSection eyebrow="Base normativa" title="Normas e referências do serviço" intro="As referências ficam junto do conteúdo e levam às fontes oficiais ou ao catálogo correspondente." white>
      <ApprovedNormCards items={service.norms}/>
    </ApprovedLightSection>

    <ApprovedFaq items={service.faq}/>
    <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Conte a situação da sua instituição. A equipe Consult confirma o escopo técnico e orienta o próximo passo."/>
  </main></ConsultSiteShell>
}
