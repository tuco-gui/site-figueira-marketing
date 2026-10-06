import React, { useEffect, useMemo } from 'react'
import { Activity, ClipboardCheck, ExternalLink, FileText, Gauge, ShieldCheck, Stethoscope } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultEditorialList, ConsultReportPreview, ConsultSectionNav, ConsultTechnicalVisual } from '@/components/consult/ConsultTechnicalDesign'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'

const SERVICES = {
  'controle-qualidade': {
    title: 'Controle de qualidade (CQ)',
    eyebrow: 'Física Médica e Proteção Radiológica',
    intro: 'Testes periódicos que verificam dose, qualidade de imagem e funcionamento do equipamento, com resultado documentado em laudo técnico.',
    audience: 'Serviços com equipamentos de raios X, tomografia, mamografia, ressonância magnética, ultrassom e demais modalidades aplicáveis.',
    when: ['Antes de iniciar ou consolidar uma rotina de controle de qualidade','Na periodicidade aplicável ao equipamento e ao serviço','Após mudanças relevantes que exijam nova verificação','Quando a instituição precisa documentar desempenho e conformidade'],
    result: 'Laudo técnico com os resultados dos testes realizados no equipamento e a identificação da base aplicável.',
    deliverable: 'Laudo de Controle de Qualidade',
    deliverableSections: ['Identificação do equipamento','Metodologia e instrumentos','Parâmetros medidos','Critérios aplicáveis','Resultado técnico'],
    icon: Gauge,
    visual: 'measurement',
    metric: 'Dose, qualidade de imagem e desempenho documentados',
    norms: [
      ['RDC 611/2022 — Anvisa','Requisitos sanitários para serviços de radiologia diagnóstica ou intervencionista.',RDC_611],
      ['IN 90 a 97/2021 — Anvisa','Requisitos específicos de qualidade e segurança por modalidade/equipamento.',ANVISA_IN],
    ],
    equipmentNorms: [
      ['Raios X médico convencional','IN 90/2021'],['Fluoroscopia, arco cirúrgico e angiógrafo','IN 91/2021'],['Mamógrafo','IN 92/2021'],['Tomógrafo','IN 93/2021'],['Raios X odontológico extraoral','IN 94/2021'],['Raios X odontológico intraoral','IN 95/2021'],['Ultrassom','IN 96/2021'],['Ressonância magnética','IN 97/2021'],['Densitômetro ósseo','RDC 611/2022 — sem IN específica indicada no guia'],['Raios X veterinário','RDC 611/2022; IN 90/2021 como referência técnica indicada no guia'],
    ],
  },
  'programa-protecao-radiologica': {
    title: 'Programa de Proteção Radiológica',
    eyebrow: 'Proteção Radiológica',
    intro: 'Estruturação e acompanhamento do programa de proteção radiológica para serviços de radiologia diagnóstica e intervencionista.',
    audience: 'Instituições que operam serviços de radiologia diagnóstica ou intervencionista e precisam organizar responsabilidades, rotinas e evidências de proteção radiológica.',
    when: ['Na implantação de um serviço','Na revisão das rotinas e documentos existentes','Quando houver alteração relevante na operação','Na preparação para processos de vigilância sanitária'],
    result: 'Programa estruturado de acordo com o escopo e os requisitos aplicáveis ao serviço, com orientação documental para sua manutenção.',
    deliverable: 'Programa de Proteção Radiológica',
    deliverableSections: ['Escopo e responsabilidades','Rotinas de proteção','Registros e evidências','Controles aplicáveis','Plano de manutenção'],
    icon: ClipboardCheck,
    visual: 'shield',
    metric: 'Responsabilidades, rotinas e evidências organizadas',
    norms: [['RDC 611/2022 — Anvisa','Base sanitária para organização e funcionamento dos serviços de radiologia.',RDC_611]],
  },
  'levantamento-radiometrico': {
    title: 'Levantamento radiométrico',
    eyebrow: 'Proteção Radiológica',
    intro: 'Medição da radiação nas áreas ao redor da sala e avaliação das condições radiométricas do ambiente.',
    audience: 'Salas novas ou reformadas, serviços com troca de equipamento e situações em que a avaliação radiométrica seja aplicável.',
    when: ['Sala nova ou reformada','Troca ou alteração relevante de equipamento','Mudança de layout ou condição de uso','Quando houver necessidade de demonstrar as condições radiométricas do ambiente'],
    result: 'Medições documentadas e relatório técnico das condições radiométricas avaliadas.',
    deliverable: 'Relatório de Levantamento Radiométrico',
    deliverableSections: ['Identificação do ambiente','Pontos de medição','Instrumento utilizado','Resultados obtidos','Conclusão técnica'],
    icon: Activity,
    visual: 'measurement',
    metric: 'Condições radiométricas do ambiente medidas e registradas',
    norms: [['RDC 611/2022 — Anvisa','Requisitos sanitários e de proteção radiológica para os serviços abrangidos.',RDC_611],['IN aplicável à modalidade','A instrução normativa específica depende do equipamento/modalidade avaliada.',ANVISA_IN]],
  },
  'projeto-blindagem': {
    title: 'Projeto de blindagem',
    eyebrow: 'Proteção Radiológica',
    intro: 'Cálculo técnico da blindagem necessária para ambientes que utilizarão equipamentos emissores de radiação ionizante.',
    audience: 'Clínicas e hospitais em implantação, obra, reforma, expansão ou troca de equipamento.',
    when: ['Antes da execução de obra ou reforma','Na implantação de nova sala','Na expansão do serviço','Na troca de equipamento que altere as premissas do projeto'],
    result: 'Memorial de cálculo e documentação técnica correspondente ao projeto de blindagem.',
    deliverable: 'Memorial de Cálculo de Blindagem',
    deliverableSections: ['Premissas do projeto','Layout e ocupação','Cargas de trabalho','Cálculo de barreiras','Especificação técnica'],
    icon: ShieldCheck,
    visual: 'shield',
    metric: 'Barreiras dimensionadas a partir das premissas do ambiente',
    norms: [['RDC 611/2022 — Anvisa','Base sanitária para serviços de radiologia diagnóstica ou intervencionista.',RDC_611],['IN aplicável à modalidade','Requisitos específicos são relacionados à tecnologia prevista para o ambiente.',ANVISA_IN]],
  },
  treinamentos: {
    title: 'Treinamentos',
    eyebrow: 'Proteção Radiológica',
    intro: 'Capacitação de equipes em radioproteção e temas de segurança relacionados às modalidades atendidas pela Consult.',
    audience: 'Equipes de radiologia, profissionais expostos e grupos que precisam atualizar rotinas de proteção e segurança.',
    when: ['Integração de novas equipes','Atualização periódica de profissionais','Mudanças de processo ou tecnologia','Necessidade de reforçar práticas de proteção e segurança'],
    result: 'Capacitação técnica alinhada ao tema e ao contexto da instituição, com conteúdo definido conforme o escopo contratado.',
    deliverable: 'Registro de Capacitação',
    deliverableSections: ['Tema e objetivo','Conteúdo abordado','Público participante','Registro de realização','Orientações aplicáveis'],
    icon: Stethoscope,
    visual: 'training',
    metric: 'Conhecimento técnico transformado em rotina de equipe',
    norms: [['RDC 611/2022 — Anvisa','Referência sanitária para serviços de radiologia e responsabilidades de proteção.',RDC_611],['Requisitos complementares','Dependem do tema e da modalidade do treinamento.',ANVISA_IN]],
  },
  'licenciamento-sanitario': {
    title: 'Licenciamento sanitário',
    eyebrow: 'Proteção Radiológica',
    intro: 'Apoio técnico e documental para organizar os requisitos necessários à obtenção ou renovação da licença sanitária do serviço.',
    audience: 'Serviços novos, em renovação ou que precisam organizar documentação técnica para o processo sanitário.',
    when: ['Abertura de um novo serviço','Renovação de licença','Mudança relevante de estrutura ou operação','Regularização documental relacionada ao escopo técnico'],
    result: 'Apoio técnico e documental ao processo de licenciamento, dentro das atribuições e do escopo contratado.',
    deliverable: 'Dossiê Técnico de Licenciamento',
    deliverableSections: ['Checklist documental','Documentos técnicos','Pendências identificadas','Referências aplicáveis','Próximos passos'],
    icon: FileText,
    visual: 'document',
    metric: 'Documentação organizada para reduzir ruído no processo sanitário',
    norms: [['RDC 611/2022 — Anvisa','Referência central para os serviços de radiologia abrangidos.',RDC_611],['Exigências aplicáveis ao serviço','Podem variar conforme modalidade, estrutura e autoridade sanitária competente.',ANVISA_IN]],
  },
}

const PROCESS = [
  ['01','Escopo','A Consult identifica o serviço, equipamento, ambiente e objetivo técnico da avaliação.'],
  ['02','Preparação','São definidos os dados, condições e referências necessárias para a execução.'],
  ['03','Execução técnica','Medições, ensaios, cálculos ou revisão documental são realizados conforme o serviço contratado.'],
  ['04','Entrega','O resultado é organizado em laudo, relatório, memorial, programa ou documentação correspondente.'],
]

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
          <div className="absolute -left-52 -top-52 h-[520px] w-[520px] rounded-full border border-white/5" />
          <div className="absolute -left-24 -top-24 h-[300px] w-[300px] rounded-full bg-[#08A77F]/8" />
          <div className="absolute inset-0 opacity-75" style={{backgroundImage:'radial-gradient(circle at 72% 28%, rgba(138,230,0,.14), transparent 24%), linear-gradient(125deg, transparent 44%, rgba(5,210,157,.10) 100%)'}} />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-20 lg:min-h-[650px] lg:grid-cols-[1fr_.92fr] lg:items-center">
            <div>
              <Link to="/consult#areas" className="text-sm font-bold text-white/55 transition hover:text-white">Áreas de atuação</Link>
              <div className="mt-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.28em] text-[#8AE600]"><span className="h-px w-9 bg-[#8AE600]" />{service.eyebrow}</div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[64px]">{service.title}</h1>
              <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/88 md:text-lg">{service.intro}</p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58">{service.audience}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_38px_rgba(255,107,38,.18)]">Agende uma reunião</a>
                <a href="#entregavel" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 px-6 py-3 text-sm font-extrabold text-white/82">Ver o que é entregue</a>
              </div>
            </div>
            <ConsultTechnicalVisual variant={service.visual} title={service.title} metric={service.metric} />
          </div>
        </section>

        <ConsultSectionNav items={[["Visão geral","#visao-geral"],["Quando contratar","#quando-contratar"],["Processo","#processo"],["Entregável","#entregavel"],["Normas","#normas"]]} />

        <section id="visao-geral" className="scroll-mt-32 bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
            <div>
              <ConsultEyebrow>Visão geral</ConsultEyebrow>
              <h2 className="mt-4 max-w-xl text-3xl font-black leading-[1.02] tracking-[-.04em] text-[#075653] md:text-5xl">Serviço técnico com começo, critério e resultado.</h2>
            </div>
            <div className="lg:pt-8">
              <p className="max-w-3xl text-lg font-semibold leading-8 text-[#315B58]">{service.intro}</p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#607D7A]">{service.audience}</p>
              <div className="mt-8 h-px bg-[#DCEAE7]" />
              <div className="grid gap-5 pt-8 sm:grid-cols-3">
                {['Escopo definido','Execução técnica','Resultado documentado'].map((item,index)=><div key={item}><div className="text-[10px] font-black tracking-[.18em] text-[#08A77F]">0{index+1}</div><div className="mt-2 text-sm font-black text-[#075653]">{item}</div></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="quando-contratar" className="scroll-mt-32 bg-[#F4FAF8]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[.68fr_1.32fr]">
            <div>
              <ConsultEyebrow>Quando contratar</ConsultEyebrow>
              <h2 className="mt-4 text-3xl font-black leading-[1.04] tracking-[-.035em] text-[#075653] md:text-4xl">Situações em que esse serviço entra no projeto.</h2>
              <p className="mt-5 text-sm leading-7 text-[#607D7A]">A contratação correta depende do contexto técnico. Estes são os cenários descritos no material atual da Consult.</p>
            </div>
            <ConsultEditorialList items={service.when} />
          </div>
        </section>

        <section id="processo" className="scroll-mt-32 relative overflow-hidden bg-[#043F3D] text-white">
          <div className="absolute inset-0 opacity-45" style={{backgroundImage:'radial-gradient(circle at 82% 14%, rgba(138,230,0,.14), transparent 22%), linear-gradient(115deg, transparent 28%, rgba(5,210,157,.12) 65%, transparent)'}} />
          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <div className="max-w-3xl"><ConsultEyebrow light>Processo técnico</ConsultEyebrow><h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-.04em] md:text-5xl">Da necessidade ao documento final.</h2></div>
            <div className="relative mt-12 grid gap-0 md:grid-cols-4">
              <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-[#8AE600] via-[#08A77F] to-white/10 md:block" />
              {PROCESS.map(([num,title,text], index) => (
                <article key={num} className="relative border-b border-white/10 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:py-0 md:last:border-r-0 md:first:pl-0">
                  <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-[#8AE600]/45 bg-[#043F3D] text-sm font-black text-[#C8FF72] shadow-[0_0_0_8px_rgba(4,63,61,.8)]">{num}</div>
                  <h3 className="mt-7 text-lg font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
                  <div className="mt-5 text-[9px] font-black uppercase tracking-[.2em] text-white/28">Etapa {index+1}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="entregavel" className="scroll-mt-32 overflow-hidden bg-white">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
            <div>
              <ConsultEyebrow>Entregável</ConsultEyebrow>
              <h2 className="mt-4 text-3xl font-black leading-[1.02] tracking-[-.04em] text-[#075653] md:text-5xl">O serviço termina em um resultado que fica com o cliente.</h2>
              <p className="mt-6 text-base leading-8 text-[#4E706D]">{service.result}</p>
              <div className="mt-8 rounded-[20px] border-l-4 border-[#8AE600] bg-[#F4FAF8] px-5 py-5 text-sm font-bold leading-7 text-[#315B58]">O mockup ao lado demonstra a estrutura visual do entregável. Não representa dados reais de cliente, medições ou aprovação técnica.</div>
            </div>
            <ConsultReportPreview title={service.deliverable} sections={service.deliverableSections} />
          </div>
        </section>

        <section id="normas" className="scroll-mt-32 bg-[#EAF5F2]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[.62fr_1.38fr]">
            <div>
              <ConsultEyebrow>Base técnica</ConsultEyebrow>
              <h2 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-.035em] text-[#075653] md:text-4xl">Normas e referências do serviço.</h2>
              <p className="mt-5 text-sm leading-7 text-[#607D7A]">A aplicação exata depende da modalidade, equipamento e escopo. Os links levam às fontes oficiais ou páginas institucionais de referência.</p>
            </div>
            <div className="border-y border-[#CFE3DE]">
              {service.norms.map(([label,text,href],index)=><a key={label} href={href} target="_blank" rel="noreferrer" className={`group grid gap-4 py-6 sm:grid-cols-[48px_1fr_auto] sm:items-start ${index?'border-t border-[#CFE3DE]':''}`}><div className="grid h-11 w-11 place-items-center rounded-full bg-[#075653] text-[#8AE600]"><FileText size={19}/></div><div><h3 className="text-base font-black text-[#075653]">{label}</h3><p className="mt-2 text-sm leading-6 text-[#607D7A]">{text}</p></div><ExternalLink size={16} className="mt-1 text-[#7A9B97] transition group-hover:text-[#08A77F]"/></a>)}
            </div>
          </div>
        </section>

        {service.equipmentNorms && (
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
              <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
                <div><ConsultEyebrow>Controle de Qualidade</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-tight text-[#075653] md:text-4xl">Norma por modalidade.</h2><p className="mt-5 text-sm leading-7 text-[#607D7A]">A matriz conecta cada modalidade à referência indicada no guia técnico atual da Consult.</p></div>
                <div className="overflow-hidden rounded-[24px] border border-[#DCEAE7] bg-white shadow-[0_18px_48px_rgba(7,86,83,.08)]">
                  <div className="grid grid-cols-[1fr_auto] bg-[#075653] px-5 py-4 text-[10px] font-black uppercase tracking-[.15em] text-white/72"><span>Modalidade / equipamento</span><span>Referência</span></div>
                  {service.equipmentNorms.map(([equipment,norm],index)=><div key={equipment} className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.45fr_.55fr] sm:items-center ${index?'border-t border-[#E6EFED]':''}`}><strong className="text-sm text-[#315B58]">{equipment}</strong><span className="text-sm font-black text-[#08A77F] sm:text-right">{norm}</span></div>)}
                </div>
              </div>
            </div>
          </section>
        )}

        <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Converse com a equipe Consult para confirmar escopo, modalidade, documentação necessária e agenda de atendimento." />
      </main>
    </ConsultSiteShell>
  )
}
