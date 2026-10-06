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

const SERVICES = {
  'controle-qualidade': {
    title: 'Controle de qualidade em radiologia',
    eyebrow: 'Física Médica e Proteção Radiológica',
    visual: 'technical',
    intro: 'Testes periódicos que verificam dose, qualidade de imagem e funcionamento do equipamento, com laudo assinado pelo físico médico.',
    audience: 'Indicado para serviços com equipamentos de raios X, tomografia, mamografia, ressonância magnética, ultrassom e demais modalidades previstas no escopo confirmado da Consult.',
    when: ['Rotina periódica de controle de qualidade','Equipamento novo ou após mudança relevante','Necessidade de documentar dose, imagem e funcionamento','Preparação para inspeções e exigências sanitárias'],
    proof: [['ESCOPO','Dose, imagem e funcionamento'],['ENTREGA','Laudo técnico assinado'],['BASE','RDC 611/2022'],['MODALIDADES','IN 90 a 97/2021']],
    parameters: [['Dose','Medições aplicáveis à modalidade'],['Qualidade de imagem','Parâmetros específicos do equipamento'],['Funcionamento','Verificação do desempenho previsto'],['Documentação','Resultado registrado em laudo técnico']],
    storyTitle: 'Controle de qualidade não é um selo genérico de aprovação.',
    story: 'O serviço precisa responder, por medição, como o equipamento está se comportando dentro dos parâmetros aplicáveis à sua modalidade. Por isso a página separa modalidade, referência normativa, ensaio e resultado documentado, em vez de tratar todos os equipamentos como se fossem iguais.',
    metric: 'Dose, qualidade de imagem e funcionamento verificados em ensaio',
    deliverable: 'Laudo de Controle de Qualidade',
    deliverableSections: ['Equipamento e modalidade avaliados','Testes realizados','Resultados medidos','Referência aplicável à modalidade','Resultado técnico e assinatura do físico médico'],
    note: 'A composição é ilustrativa. O guia oficial confirma que o Controle de Qualidade gera laudo assinado pelo físico médico; o formato final depende da modalidade e do equipamento.',
    norms: [['RDC 611/2022 — Anvisa','Base sanitária para serviços de radiologia diagnóstica e intervencionista.',RDC_611],['IN 90 a 97/2021 — Anvisa','Requisitos específicos por modalidade e equipamento.',ANVISA_IN]],
    equipmentNorms: [['Raios X médico convencional','IN 90/2021'],['Fluoroscopia, arco cirúrgico e angiógrafo','IN 91/2021'],['Mamógrafo','IN 92/2021'],['Tomógrafo','IN 93/2021'],['Raios X odontológico extraoral','IN 94/2021'],['Raios X odontológico intraoral','IN 95/2021'],['Ultrassom','IN 96/2021'],['Ressonância magnética','IN 97/2021'],['Densitômetro ósseo','RDC 611/2022'],['Raios X veterinário','RDC 611/2022 + IN 90/2021 como referência técnica']],
    faq: [['Controle de qualidade e calibração são a mesma coisa?','Não. Nesta página, Controle de Qualidade é tratado dentro do escopo de Física Médica e radiodiagnóstico. A Engenharia Clínica possui uma frente própria de ensaio de desempenho e calibração para equipamentos biomédicos confirmados pela Consult.'],['A norma é a mesma para todos os equipamentos?','Não. A RDC 611/2022 é a base geral e as Instruções Normativas 90 a 97/2021 variam conforme a modalidade.'],['O resultado fica documentado?','Sim. O guia da Consult confirma emissão de laudo assinado pelo físico médico para o Controle de Qualidade.']],
  },
  'programa-protecao-radiologica': {
    title: 'Programa de Proteção Radiológica', eyebrow: 'Proteção Radiológica', visual: 'shield',
    intro: 'Elaboração e acompanhamento do programa exigido para serviços de radiologia diagnóstica e intervencionista.',
    audience: 'Para instituições que precisam estruturar, revisar ou manter as rotinas e responsabilidades relacionadas à proteção radiológica.',
    when: ['Implantação de um novo serviço','Revisão do programa existente','Mudanças relevantes na operação','Necessidade de organizar a proteção radiológica exigida pela RDC 611'],
    proof: [['OBJETIVO','Estruturar a proteção radiológica'],['ENTREGA','Programa e acompanhamento'],['BASE','RDC 611/2022'],['PÚBLICO','Serviços de radiologia']],
    parameters: [['Serviço','Caracterização da operação'],['Responsabilidades','Papéis e rotinas aplicáveis'],['Documentação','Registros exigidos pelo programa'],['Acompanhamento','Atualização conforme mudanças do serviço']],
    storyTitle: 'Um programa útil precisa refletir a operação real do serviço.',
    story: 'A proposta não é entregar um arquivo genérico. O Programa de Proteção Radiológica deve conversar com a modalidade, o ambiente, a equipe e as responsabilidades aplicáveis ao serviço de radiologia.',
    metric: 'Programa estruturado e acompanhado conforme o serviço',
    deliverable: 'Programa de Proteção Radiológica',
    deliverableSections: ['Identificação do serviço','Escopo do programa','Rotinas e responsabilidades aplicáveis','Documentação necessária ao acompanhamento','Atualizações conforme mudanças do serviço'],
    note: 'O guia confirma a elaboração e o acompanhamento do programa. A estrutura interna definitiva varia conforme a modalidade e a realidade da instituição.',
    norms: [['RDC 611/2022 — Anvisa','Norma-base indicada pela Consult para o Programa de Proteção Radiológica.',RDC_611]],
    faq: [['Quando o programa deve ser revisto?','O site não fixa uma periodicidade genérica. A revisão deve acompanhar as exigências aplicáveis e mudanças relevantes no serviço.'],['A Consult apenas entrega o documento?','O guia descreve elaboração e acompanhamento, por isso a página apresenta as duas etapas.']],
  },
  'levantamento-radiometrico': {
    title: 'Levantamento radiométrico', eyebrow: 'Proteção Radiológica', visual: 'technical',
    intro: 'Medição da radiação nas áreas ao redor da sala e da radiação de fuga do cabeçote.',
    audience: 'Aplicável a salas novas, reformadas, com troca de equipamento e situações de avaliação periódica conforme o serviço.',
    when: ['Sala nova','Reforma do ambiente','Troca de equipamento','Rotina periódica de avaliação'],
    proof: [['MEDIÇÃO','Radiação no entorno'],['VERIFICAÇÃO','Fuga do cabeçote'],['BASE','RDC 611/2022'],['SAÍDA','Resultado documentado']],
    parameters: [['Ambiente','Pontos definidos ao redor da sala'],['Equipamento','Condição avaliada durante a medição'],['Fuga','Radiação de fuga do cabeçote'],['Conclusão','Resultado técnico documentado']],
    storyTitle: 'Blindagem e proteção precisam ser verificadas por medição, não por percepção.',
    story: 'O levantamento radiométrico transforma a condição do ambiente em dados mensuráveis. A página deve deixar claro onde se mede, por que se mede e como esse resultado é documentado para a instituição.',
    metric: 'Radiação no entorno e fuga do cabeçote medidas em campo',
    deliverable: 'Resultado do Levantamento Radiométrico',
    deliverableSections: ['Sala e equipamento avaliados','Pontos de medição no entorno','Medição da radiação de fuga','Resultados obtidos','Conclusão técnica da avaliação'],
    note: 'A Consult confirma a medição das áreas ao redor da sala e da radiação de fuga. O título e o formato exato do documento final seguem o padrão técnico utilizado pela equipe.',
    norms: [['RDC 611/2022 — Anvisa','Base sanitária e de proteção radiológica.',RDC_611],['IN aplicável à modalidade','A referência específica depende do equipamento avaliado.',ANVISA_IN]],
    faq: [['Quando esse serviço costuma ser necessário?','O guia cita salas novas, reformadas, troca de equipamento e rotina periódica.'],['O levantamento substitui projeto de blindagem?','Não. O projeto de blindagem calcula a solução antes da obra ou mudança; o levantamento radiométrico mede a condição do ambiente.']],
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
    faq: [['Projeto de blindagem e levantamento radiométrico são iguais?','Não. O projeto calcula a solução previamente; o levantamento mede a condição radiométrica do ambiente.'],['Serve apenas para obra nova?','Não. O guia também relaciona o serviço a reforma, expansão e troca de equipamento.']],
  },
  treinamentos: {
    title: 'Treinamentos técnicos', eyebrow: 'Proteção Radiológica', visual: 'technical',
    intro: 'Capacitação periódica das equipes em radioproteção e segurança em ressonância magnética.',
    audience: 'Para equipes de radiologia e ressonância magnética que precisam atualizar práticas de proteção e segurança.',
    when: ['Capacitação periódica da equipe','Entrada de novos profissionais','Atualização de rotina','Necessidade de reforçar radioproteção ou segurança em RM'],
    proof: [['FOCO','Radioproteção'],['TEMA','Segurança em RM'],['FORMATO','Capacitação técnica'],['PÚBLICO','Equipes assistenciais']],
    parameters: [['Tema','Conteúdo definido conforme necessidade'],['Equipe','Público participante'],['Rotina','Aplicação ao contexto da instituição'],['Registro','Escopo de realização documentado conforme contratação']],
    storyTitle: 'Treinamento técnico precisa conversar com a rotina da equipe.',
    story: 'A página deixa de apresentar treinamento como um item genérico e explica que o conteúdo é orientado ao contexto de radioproteção ou segurança em ressonância magnética da instituição.',
    metric: 'Capacitação técnica direcionada à rotina da equipe',
    deliverable: 'Capacitação técnica',
    deliverableSections: ['Tema do treinamento','Público participante','Conteúdo técnico definido para a equipe','Orientações aplicáveis à rotina','Escopo de realização'],
    note: 'O guia confirma a capacitação periódica, mas não define um modelo obrigatório de certificado ou relatório. Por isso a página não promete documento específico.',
    norms: [['RDC 611/2022 — Anvisa','Referência sanitária central para os serviços de radiologia.',RDC_611],['Requisitos complementares','Variam conforme o tema e a modalidade do treinamento.',ANVISA_IN]],
    faq: [['O treinamento é apenas sobre raios X?','Não. O guia também confirma treinamento em segurança em ressonância magnética.'],['Há certificado obrigatório?','O guia fornecido não define um modelo obrigatório; por isso o site não promete esse entregável.']],
  },
  'licenciamento-sanitario': {
    title: 'Licenciamento sanitário', eyebrow: 'Proteção Radiológica', visual: 'shield',
    intro: 'Apoio na documentação para obter ou renovar a licença da vigilância sanitária.',
    audience: 'Para serviços novos ou em renovação que precisam organizar a documentação técnica relacionada ao processo sanitário.',
    when: ['Abertura de novo serviço','Renovação de licença','Atualização de documentação técnica','Mudança relevante no serviço que exija revisão documental'],
    proof: [['ESCOPO','Apoio documental'],['PROCESSO','Obtenção ou renovação'],['BASE','RDC 611/2022'],['LIMITE','Sem promessa de aprovação']],
    parameters: [['Escopo','Levantamento da situação do serviço'],['Documentos','Organização da documentação aplicável'],['Pendências','Identificação do que precisa ser providenciado'],['Acompanhamento','Suporte dentro do escopo contratado']],
    storyTitle: 'A Consult organiza a parte técnica; a licença continua sendo decisão da autoridade sanitária.',
    story: 'Essa distinção precisa aparecer claramente no site. O serviço é apoio técnico e documental ao processo, não uma promessa de emissão ou aprovação da licença.',
    metric: 'Documentação técnica organizada para o processo sanitário',
    deliverable: 'Apoio documental ao licenciamento',
    deliverableSections: ['Levantamento do escopo do serviço','Organização da documentação técnica aplicável','Identificação de pendências documentais','Referências técnicas relacionadas','Acompanhamento dentro do escopo contratado'],
    note: 'O guia define este serviço como apoio na documentação. A página não promete aprovação ou emissão da licença, que depende da autoridade sanitária competente.',
    norms: [['RDC 611/2022 — Anvisa','Referência central indicada pela Consult para serviços de radiologia.',RDC_611],['Exigências específicas','Podem variar conforme modalidade e autoridade sanitária.',ANVISA_IN]],
    faq: [['A Consult garante a emissão da licença?','Não. A Consult presta apoio técnico e documental; a decisão compete à autoridade sanitária.'],['O serviço vale para renovação?','Sim. O guia confirma apoio tanto para obtenção quanto para renovação.']],
  },
}

const PROCESS = [['01','Entender o escopo','A equipe identifica serviço, equipamento, ambiente e objetivo técnico.'],['02','Preparar a execução','São definidos dados, condições e referências necessárias.'],['03','Executar tecnicamente','Medições, cálculos, ensaios ou revisão documental são realizados conforme o serviço.'],['04','Documentar o resultado','A entrega assume a forma adequada ao serviço: laudo, programa, memorial, resultado de medição ou apoio documental.']]

export default function ConsultServicePage() {
  const { slug } = useParams()
  const service = useMemo(() => SERVICES[slug], [slug])

  useEffect(() => {
    if (!service) return
    document.title = `${service.title} | Consult Radiometria e Qualidade`
    document.querySelector('meta[name="description"]')?.setAttribute('content', service.intro)
  }, [service])

  if (!service) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Serviço não encontrado</h1><Link to="/consult" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para a Consult</Link></main></ConsultSiteShell>

  return (
    <ConsultSiteShell>
      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute inset-0 opacity-75" style={{backgroundImage:'radial-gradient(circle at 80% 20%, rgba(138,230,0,.15), transparent 24%), linear-gradient(125deg, transparent 42%, rgba(5,210,157,.11) 100%)'}} />
          <div className="relative mx-auto grid min-h-[670px] max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div>
              <Link to="/consult#areas" className="text-sm font-bold text-white/55 hover:text-white">Áreas de atuação</Link>
              <div className="mt-9 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.26em] text-[#8AE600]"><span className="h-px w-10 bg-[#8AE600]" />{service.eyebrow}</div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[66px]">{service.title}</h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/88">{service.intro}</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/56">{service.audience}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold text-white">Agendar reunião técnica</a><a href="#entregavel" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 px-6 py-3 text-sm font-extrabold text-white/82">Ver entregável</a></div>
            </div>
            <ServiceHeroConsole title={service.title} kicker={service.eyebrow} chips={[service.proof[2][1], service.proof[1][1]]} accent={service.visual} />
          </div>
        </section>

        <ServiceProofRail items={service.proof} />
        <ConsultSectionNav items={[["Visão geral","#visao-geral"],["Quando contratar","#quando-contratar"],["Como funciona","#processo"],["Entregável","#entregavel"],["Normas","#normas"],["FAQ","#faq"]]} />

        <div id="visao-geral" className="scroll-mt-32">
          <EditorialStatement eyebrow="Por que este serviço existe" title={service.storyTitle}><p>{service.story}</p><p className="mt-5 text-sm leading-7">{service.audience}</p></EditorialStatement>
          <MeasurementMatrix title="O que entra na análise" items={service.parameters} />
        </div>

        <div id="quando-contratar" className="scroll-mt-32"><TriggerPanel items={service.when} /></div>
        <div id="processo" className="scroll-mt-32"><ProcessTimeline items={PROCESS} /></div>

        <section id="entregavel" className="scroll-mt-32 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.68fr_1.32fr] lg:items-start">
            <div><DeliverableHeader title={service.deliverable} description="A entrega é apresentada visualmente para o visitante entender o que fica documentado ao final do trabalho." /><OutcomeNote>{service.note}</OutcomeNote></div>
            <ConsultReportPreview title={service.deliverable} sections={service.deliverableSections} note={service.note} />
          </div>
        </section>

        {service.equipmentNorms && <section className="bg-[#043F3D] text-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.55fr_1.45fr]"><div><div className="text-[10px] font-black uppercase tracking-[.22em] text-[#8AE600]">Controle de Qualidade</div><h2 className="mt-4 text-3xl font-black tracking-[-.04em] md:text-4xl">Uma referência por modalidade</h2><p className="mt-4 text-sm leading-7 text-white/60">O Controle de Qualidade será desdobrado em páginas específicas por modalidade na próxima etapa da V3.</p></div><div className="overflow-hidden rounded-[22px] border border-white/10">{service.equipmentNorms.map(([equipment,norm],index)=><div key={equipment} className={`grid gap-2 bg-white/[.035] px-5 py-4 sm:grid-cols-[1.3fr_.7fr] sm:items-center ${index?'border-t border-white/10':''}`}><strong className="text-sm text-white/86">{equipment}</strong><span className="text-xs font-black text-[#B8FF51] sm:text-right">{norm}</span></div>)}</div></div></section>}

        <div id="normas" className="scroll-mt-32"><StandardsShelf items={service.norms} /></div>
        <div id="faq" className="scroll-mt-32"><TechnicalFaq items={service.faq} /></div>
        <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Explique o serviço, modalidade ou situação da instituição. A equipe Consult confirma o escopo técnico e o próximo passo." />
      </main>
    </ConsultSiteShell>
  )
}
