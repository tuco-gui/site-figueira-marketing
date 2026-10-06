import React, { useEffect, useMemo } from 'react'
import { Activity, ClipboardCheck, ExternalLink, FileText, Gauge, ShieldCheck, Stethoscope } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultEditorialList, ConsultReportPreview, ConsultSectionNav, ConsultTechnicalVisual } from '@/components/consult/ConsultTechnicalDesign'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'

const SERVICES = {
  'controle-qualidade': {
    title: 'Controle de qualidade (CQ)', eyebrow: 'Física Médica e Proteção Radiológica', icon: Gauge, visual: 'measurement',
    intro: 'Testes periódicos que verificam dose, qualidade de imagem e funcionamento do equipamento, com laudo assinado pelo físico médico.',
    audience: 'Para serviços com equipamentos de raios X, tomografia, mamografia, ressonância magnética, ultrassom e demais modalidades previstas no escopo da Consult.',
    when: ['Rotina periódica de controle de qualidade','Equipamento novo ou após mudança relevante','Necessidade de documentar dose, imagem e funcionamento','Preparação para inspeções e exigências sanitárias'],
    metric: 'Dose, qualidade de imagem e funcionamento verificados em ensaio',
    result: 'Laudo técnico com os resultados dos testes realizados e assinatura do físico médico.',
    deliverable: 'Laudo de Controle de Qualidade',
    deliverableSections: ['Equipamento e modalidade avaliados','Testes realizados','Resultados medidos','Referência aplicável à modalidade','Resultado técnico e assinatura do físico médico'],
    note: 'A composição visual acima é ilustrativa. O guia da Consult confirma que o CQ gera laudo assinado pelo físico médico; o formato final do documento depende da modalidade e do equipamento.',
    norms: [['RDC 611/2022 — Anvisa','Base sanitária para serviços de radiologia diagnóstica e intervencionista.',RDC_611],['IN 90 a 97/2021 — Anvisa','Requisitos específicos por modalidade e equipamento.',ANVISA_IN]],
    equipmentNorms: [['Raios X médico convencional','IN 90/2021'],['Fluoroscopia, arco cirúrgico e angiógrafo','IN 91/2021'],['Mamógrafo','IN 92/2021'],['Tomógrafo','IN 93/2021'],['Raios X odontológico extraoral','IN 94/2021'],['Raios X odontológico intraoral','IN 95/2021'],['Ultrassom','IN 96/2021'],['Ressonância magnética','IN 97/2021'],['Densitômetro ósseo','RDC 611/2022 — sem IN específica indicada no guia'],['Raios X veterinário','RDC 611/2022; IN 90/2021 como referência técnica']],
  },
  'programa-protecao-radiologica': {
    title: 'Programa de Proteção Radiológica', eyebrow: 'Proteção Radiológica', icon: ClipboardCheck, visual: 'shield',
    intro: 'Elaboração e acompanhamento do programa exigido para serviços de radiologia diagnóstica e intervencionista.',
    audience: 'Para serviços que precisam estruturar, revisar ou manter seu Programa de Proteção Radiológica conforme a operação e a modalidade atendida.',
    when: ['Implantação de um novo serviço','Revisão do programa existente','Mudanças relevantes na operação','Necessidade de organizar a proteção radiológica exigida pela RDC 611'],
    metric: 'Programa estruturado e acompanhado conforme o serviço',
    result: 'Elaboração e acompanhamento do Programa de Proteção Radiológica dentro do escopo contratado.',
    deliverable: 'Programa de Proteção Radiológica',
    deliverableSections: ['Identificação do serviço','Escopo do programa','Rotinas e responsabilidades aplicáveis','Documentação necessária ao acompanhamento','Atualizações conforme mudanças do serviço'],
    note: 'O guia confirma a elaboração e o acompanhamento do programa. A estrutura interna definitiva varia conforme a modalidade e a realidade da instituição.',
    norms: [['RDC 611/2022 — Anvisa','Norma-base indicada pela Consult para o Programa de Proteção Radiológica.',RDC_611]],
  },
  'levantamento-radiometrico': {
    title: 'Levantamento radiométrico', eyebrow: 'Proteção Radiológica', icon: Activity, visual: 'measurement',
    intro: 'Medição da radiação nas áreas ao redor da sala e da radiação de fuga do cabeçote.',
    audience: 'Para salas novas, reformadas, com troca de equipamento ou em situações de rotina periódica previstas para o serviço.',
    when: ['Sala nova','Reforma do ambiente','Troca de equipamento','Rotina periódica de avaliação'],
    metric: 'Radiação no entorno e fuga do cabeçote medidas em campo',
    result: 'Resultado documentado das medições realizadas no ambiente e no equipamento avaliado.',
    deliverable: 'Resultado do Levantamento Radiométrico',
    deliverableSections: ['Sala e equipamento avaliados','Pontos de medição no entorno','Medição da radiação de fuga','Resultados obtidos','Conclusão técnica da avaliação'],
    note: 'A Consult confirma no guia a medição das áreas ao redor da sala e da radiação de fuga. O título e o formato exato do documento final devem seguir o padrão técnico utilizado pela equipe.',
    norms: [['RDC 611/2022 — Anvisa','Base sanitária e de proteção radiológica.',RDC_611],['IN aplicável à modalidade','A referência específica depende do equipamento avaliado.',ANVISA_IN]],
  },
  'projeto-blindagem': {
    title: 'Projeto de blindagem', eyebrow: 'Proteção Radiológica', icon: ShieldCheck, visual: 'shield',
    intro: 'Cálculo da blindagem da sala antes da obra ou da troca de equipamento.',
    audience: 'Para clínicas e hospitais em obra, reforma, expansão ou troca de equipamento que altere as condições do ambiente.',
    when: ['Projeto de nova sala','Reforma de ambiente existente','Expansão do serviço','Troca de equipamento com impacto no projeto'],
    metric: 'Blindagem calculada antes da execução da obra',
    result: 'Memorial de cálculo de blindagem para orientar a solução técnica do ambiente.',
    deliverable: 'Memorial de Cálculo de Blindagem',
    deliverableSections: ['Ambiente e equipamento previstos','Premissas utilizadas no cálculo','Cálculo da blindagem','Barreiras consideradas','Memorial técnico do projeto'],
    note: 'O próprio serviço é apresentado pela Consult como Memorial de Cálculo de Blindagem. O documento final é dimensionado conforme o ambiente, a ocupação e o equipamento do projeto.',
    norms: [['RDC 611/2022 — Anvisa','Base sanitária para os serviços abrangidos.',RDC_611],['IN aplicável à modalidade','A referência específica depende da tecnologia prevista.',ANVISA_IN]],
  },
  treinamentos: {
    title: 'Treinamentos', eyebrow: 'Proteção Radiológica', icon: Stethoscope, visual: 'training',
    intro: 'Capacitação periódica das equipes em radioproteção e segurança em ressonância magnética.',
    audience: 'Para equipes de radiologia e ressonância magnética que precisam atualizar práticas de proteção e segurança.',
    when: ['Capacitação periódica da equipe','Entrada de novos profissionais','Atualização de rotina','Necessidade de reforçar radioproteção ou segurança em RM'],
    metric: 'Capacitação técnica direcionada à rotina da equipe',
    result: 'Treinamento técnico definido conforme o tema, a equipe e o escopo contratado.',
    deliverable: 'Capacitação técnica',
    deliverableSections: ['Tema do treinamento','Público participante','Conteúdo técnico definido para a equipe','Orientações aplicáveis à rotina','Escopo de realização'],
    note: 'O guia confirma a capacitação periódica das equipes, mas não define um modelo obrigatório de certificado ou relatório. Por isso, a página não promete um documento específico.',
    norms: [['RDC 611/2022 — Anvisa','Referência sanitária central para os serviços de radiologia.',RDC_611],['Requisitos complementares','Variam conforme o tema e a modalidade do treinamento.',ANVISA_IN]],
  },
  'licenciamento-sanitario': {
    title: 'Licenciamento sanitário', eyebrow: 'Proteção Radiológica', icon: FileText, visual: 'document',
    intro: 'Apoio na documentação para obter ou renovar a licença da vigilância sanitária.',
    audience: 'Para serviços novos ou em renovação que precisam organizar a documentação técnica relacionada ao processo sanitário.',
    when: ['Abertura de novo serviço','Renovação de licença','Atualização de documentação técnica','Mudança relevante no serviço que exija revisão documental'],
    metric: 'Documentação técnica organizada para o processo sanitário',
    result: 'Apoio técnico e documental para o processo de obtenção ou renovação da licença sanitária.',
    deliverable: 'Apoio documental ao licenciamento',
    deliverableSections: ['Levantamento do escopo do serviço','Organização da documentação técnica aplicável','Identificação de pendências documentais','Referências técnicas relacionadas','Acompanhamento dentro do escopo contratado'],
    note: 'O guia define este serviço como apoio na documentação. A página não promete aprovação ou emissão da licença, que depende da autoridade sanitária competente.',
    norms: [['RDC 611/2022 — Anvisa','Referência central indicada pela Consult para serviços de radiologia.',RDC_611],['Exigências específicas','Podem variar conforme modalidade e autoridade sanitária.',ANVISA_IN]],
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
          <div className="absolute -left-52 -top-52 h-[520px] w-[520px] rounded-full border border-white/5" /><div className="absolute inset-0 opacity-75" style={{backgroundImage:'radial-gradient(circle at 72% 28%, rgba(138,230,0,.14), transparent 24%), linear-gradient(125deg, transparent 44%, rgba(5,210,157,.10) 100%)'}} />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:py-16 md:px-8 md:py-20 lg:min-h-[650px] lg:grid-cols-[1fr_.92fr] lg:items-center">
            <div><Link to="/consult#areas" className="text-sm font-bold text-white/55 hover:text-white">Áreas de atuação</Link><div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.24em] text-[#8AE600] sm:mt-10 sm:tracking-[.28em]"><span className="h-px w-9 bg-[#8AE600]" />{service.eyebrow}</div><h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[64px]">{service.title}</h1><p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/88 md:text-lg">{service.intro}</p><p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">{service.audience}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold text-white">Agende uma reunião</a><a href="#entregavel" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 px-6 py-3 text-sm font-extrabold text-white/82">Ver o que é entregue</a></div></div>
            <ConsultTechnicalVisual variant={service.visual} title={service.title} metric={service.metric} />
          </div>
        </section>

        <ConsultSectionNav items={[["Visão geral","#visao-geral"],["Quando contratar","#quando-contratar"],["Processo","#processo"],["Entregável","#entregavel"],["Normas","#normas"]]} />

        <section id="visao-geral" className="scroll-mt-32 bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.78fr_1.22fr]"><div><ConsultEyebrow>Visão geral</ConsultEyebrow><h2 className="mt-4 max-w-xl text-3xl font-black leading-[1.02] tracking-[-.04em] text-[#075653] md:text-5xl">O que é feito, para quem e qual resultado fica documentado.</h2></div><div className="lg:pt-7"><p className="text-lg font-semibold leading-8 text-[#315B58]">{service.intro}</p><p className="mt-5 text-sm leading-7 text-[#607D7A]">{service.audience}</p><div className="mt-8 grid gap-4 border-t border-[#DCEAE7] pt-7 sm:grid-cols-3">{['Escopo técnico','Execução objetiva','Entrega compatível com o serviço'].map((item,index)=><div key={item}><div className="text-[10px] font-black tracking-[.18em] text-[#08A77F]">0{index+1}</div><div className="mt-2 text-sm font-black text-[#075653]">{item}</div></div>)}</div></div></div></section>

        <section id="quando-contratar" className="scroll-mt-32 bg-[#F4FAF8]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.68fr_1.32fr]"><div><ConsultEyebrow>Quando contratar</ConsultEyebrow><h2 className="mt-4 text-3xl font-black leading-[1.04] tracking-[-.035em] text-[#075653] md:text-4xl">Situações em que este serviço entra na rotina da instituição.</h2></div><ConsultEditorialList items={service.when} /></div></section>

        <section id="processo" className="scroll-mt-32 relative overflow-hidden bg-[#043F3D] text-white"><div className="absolute inset-0 opacity-45" style={{backgroundImage:'radial-gradient(circle at 82% 14%, rgba(138,230,0,.14), transparent 22%), linear-gradient(115deg, transparent 28%, rgba(5,210,157,.12) 65%, transparent)'}} /><div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20"><ConsultEyebrow light>Fluxo técnico</ConsultEyebrow><h2 className="mt-4 max-w-3xl text-3xl font-black leading-[1.02] tracking-[-.04em] md:text-5xl">Da necessidade ao resultado técnico.</h2><div className="relative mt-10 grid md:grid-cols-4"><div className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-[#8AE600] via-[#08A77F] to-white/10 md:block" />{PROCESS.map(([num,title,text])=><article key={num} className="relative border-b border-white/10 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:py-0 md:last:border-r-0 md:first:pl-0"><div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-[#8AE600]/45 bg-[#043F3D] text-sm font-black text-[#C8FF72]">{num}</div><h3 className="mt-6 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-white/60">{text}</p></article>)}</div></div></section>

        <section id="entregavel" className="scroll-mt-32 bg-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><ConsultEyebrow>Entregável</ConsultEyebrow><h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-.04em] text-[#075653] md:text-5xl">{service.deliverable}</h2><p className="mt-5 text-sm leading-7 text-[#607D7A]">{service.result}</p><div className="mt-6 rounded-[18px] border-l-4 border-[#08A77F] bg-[#F4FAF8] px-5 py-4 text-xs leading-6 text-[#587875]">{service.note}</div></div><ConsultReportPreview title={service.deliverable} sections={service.deliverableSections} resultLabel="Como interpretar este exemplo" note={service.note} /></div></section>

        {service.equipmentNorms && <section className="bg-[#EAF5F2]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.62fr_1.38fr]"><div><ConsultEyebrow>Controle de Qualidade</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-tight text-[#075653] md:text-4xl">Norma por modalidade</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">A matriz segue o guia técnico da Consult.</p></div><div className="overflow-hidden rounded-[22px] border border-[#DCEAE7] bg-white shadow-sm">{service.equipmentNorms.map(([equipment,norm],index)=><div key={equipment} className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.45fr_.55fr] sm:items-center ${index?'border-t border-[#E6EFED]':''}`}><strong className="text-sm text-[#123C3B]">{equipment}</strong><span className="text-sm font-bold text-[#078B6B] sm:text-right">{norm}</span></div>)}</div></div></section>}

        <section id="normas" className="scroll-mt-32 bg-[#043F3D] text-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.62fr_1.38fr]"><div><ConsultEyebrow light>Base técnica</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Normas e referências</h2><p className="mt-4 text-sm leading-7 text-white/60">As referências abaixo levam às fontes oficiais ou páginas institucionais correspondentes.</p></div><div className="grid gap-4 md:grid-cols-2">{service.norms.map(([label,text,href])=><a key={label} href={href} target="_blank" rel="noreferrer" className="group rounded-[22px] border border-white/10 bg-white/6 p-6 transition hover:border-[#8AE600]/45 hover:bg-white/10"><div className="flex justify-between"><FileText size={22} className="text-[#8AE600]"/><ExternalLink size={16} className="text-white/35 group-hover:text-[#8AE600]"/></div><h3 className="mt-5 text-lg font-black">{label}</h3><p className="mt-2 text-sm leading-6 text-white/60">{text}</p><span className="mt-4 inline-flex text-[10px] font-black uppercase tracking-[.15em] text-[#B8FF51]">Ver referência oficial</span></a>)}</div></div></section>

        <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Converse com a equipe Consult para confirmar escopo, modalidade, documentação necessária e atendimento presencial." />
      </main>
    </ConsultSiteShell>
  )
}
