import React, { useEffect, useMemo } from 'react'
import { Activity, CheckCircle2, ClipboardCheck, ExternalLink, FileText, Gauge, ShieldCheck, Stethoscope } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'

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
    icon: Gauge,
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
    icon: ClipboardCheck,
    norms: [['RDC 611/2022 — Anvisa','Base sanitária para organização e funcionamento dos serviços de radiologia.',RDC_611]],
  },
  'levantamento-radiometrico': {
    title: 'Levantamento radiométrico',
    eyebrow: 'Proteção Radiológica',
    intro: 'Medição da radiação nas áreas ao redor da sala e avaliação das condições radiométricas do ambiente.',
    audience: 'Salas novas ou reformadas, serviços com troca de equipamento e situações em que a avaliação radiométrica seja aplicável.',
    when: ['Sala nova ou reformada','Troca ou alteração relevante de equipamento','Mudança de layout ou condição de uso','Quando houver necessidade de demonstrar as condições radiométricas do ambiente'],
    result: 'Medições documentadas e relatório técnico das condições radiométricas avaliadas.',
    icon: Activity,
    norms: [['RDC 611/2022 — Anvisa','Requisitos sanitários e de proteção radiológica para os serviços abrangidos.',RDC_611],['IN aplicável à modalidade','A instrução normativa específica depende do equipamento/modalidade avaliada.',ANVISA_IN]],
  },
  'projeto-blindagem': {
    title: 'Projeto de blindagem',
    eyebrow: 'Proteção Radiológica',
    intro: 'Cálculo técnico da blindagem necessária para ambientes que utilizarão equipamentos emissores de radiação ionizante.',
    audience: 'Clínicas e hospitais em implantação, obra, reforma, expansão ou troca de equipamento.',
    when: ['Antes da execução de obra ou reforma','Na implantação de nova sala','Na expansão do serviço','Na troca de equipamento que altere as premissas do projeto'],
    result: 'Memorial de cálculo e documentação técnica correspondente ao projeto de blindagem.',
    icon: ShieldCheck,
    norms: [['RDC 611/2022 — Anvisa','Base sanitária para serviços de radiologia diagnóstica ou intervencionista.',RDC_611],['IN aplicável à modalidade','Requisitos específicos são relacionados à tecnologia prevista para o ambiente.',ANVISA_IN]],
  },
  treinamentos: {
    title: 'Treinamentos',
    eyebrow: 'Proteção Radiológica',
    intro: 'Capacitação de equipes em radioproteção e temas de segurança relacionados às modalidades atendidas pela Consult.',
    audience: 'Equipes de radiologia, profissionais expostos e grupos que precisam atualizar rotinas de proteção e segurança.',
    when: ['Integração de novas equipes','Atualização periódica de profissionais','Mudanças de processo ou tecnologia','Necessidade de reforçar práticas de proteção e segurança'],
    result: 'Capacitação técnica alinhada ao tema e ao contexto da instituição, com conteúdo definido conforme o escopo contratado.',
    icon: Stethoscope,
    norms: [['RDC 611/2022 — Anvisa','Referência sanitária para serviços de radiologia e responsabilidades de proteção.',RDC_611],['Requisitos complementares','Dependem do tema e da modalidade do treinamento.',ANVISA_IN]],
  },
  'licenciamento-sanitario': {
    title: 'Licenciamento sanitário',
    eyebrow: 'Proteção Radiológica',
    intro: 'Apoio técnico e documental para organizar os requisitos necessários à obtenção ou renovação da licença sanitária do serviço.',
    audience: 'Serviços novos, em renovação ou que precisam organizar documentação técnica para o processo sanitário.',
    when: ['Abertura de um novo serviço','Renovação de licença','Mudança relevante de estrutura ou operação','Regularização documental relacionada ao escopo técnico'],
    result: 'Apoio técnico e documental ao processo de licenciamento, dentro das atribuições e do escopo contratado.',
    icon: FileText,
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

  const Icon = service.icon
  return (
    <ConsultSiteShell>
      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute inset-0 opacity-70" style={{backgroundImage:'radial-gradient(circle at 80% 30%, rgba(138,230,0,.16), transparent 25%), linear-gradient(130deg, transparent 42%, rgba(5,210,157,.12) 100%)'}}/>
          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <Link to="/consult#areas" className="text-sm font-bold text-white/58 hover:text-white">Áreas de atuação</Link>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_290px] lg:items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.28em] text-[#8AE600]">{service.eyebrow}</p>
                <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-.04em] sm:text-5xl lg:text-6xl">{service.title}</h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 md:text-lg">{service.intro}</p>
              </div>
              <div className="rounded-[22px] border border-white/12 bg-white/7 p-6 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8AE600] text-[#075653]"><Icon size={23}/></div>
                <p className="mt-5 text-xs font-black uppercase tracking-[.18em] text-white/48">Entregável principal</p>
                <p className="mt-2 text-sm font-bold leading-6 text-white/90">{service.result}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-7 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[.72fr_1.28fr]">
          <div><ConsultEyebrow>Contexto</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Para quem e quando contratar</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">{service.audience}</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{service.when.map((item) => <div key={item} className="flex gap-3 rounded-[18px] border border-[#DCEAE7] bg-[#F7FBFA] p-5"><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#08A77F]"/><span className="text-sm font-bold leading-6 text-[#365A58]">{item}</span></div>)}</div>
        </section>

        <section className="relative overflow-hidden bg-[#043F3D] text-white">
          <div className="absolute inset-0 opacity-40" style={{backgroundImage:'linear-gradient(110deg, transparent 28%, rgba(5,210,157,.13) 65%, transparent), radial-gradient(circle at 85% 30%, rgba(138,230,0,.13), transparent 22%)'}}/>
          <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
            <ConsultEyebrow light>Processo técnico</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Como o serviço acontece</h2>
            <div className="mt-9 grid gap-4 md:grid-cols-4">{PROCESS.map(([num,title,text]) => <article key={num} className="rounded-[20px] border border-white/10 bg-white/6 p-5"><span className="text-3xl font-black text-[#8AE600]">{num}</span><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-white/62">{text}</p></article>)}</div>
          </div>
        </section>

        <section className="bg-[#F4FAF8]">
          <div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[.62fr_1.38fr]">
            <div><ConsultEyebrow>Base técnica</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Normas e referências do serviço</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">Os links levam às referências oficiais ou às páginas oficiais de consolidação. A aplicação exata depende do equipamento, modalidade e escopo contratado.</p></div>
            <div className="grid gap-4 md:grid-cols-2">{service.norms.map(([label,text,href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group rounded-[22px] border border-[#D3E6E0] bg-white p-6 shadow-[0_12px_34px_rgba(7,86,83,.06)] transition hover:border-[#08A77F]"><div className="flex items-start justify-between"><FileText className="text-[#08A77F]" size={22}/><ExternalLink className="text-[#9AB0AD] group-hover:text-[#08A77F]" size={16}/></div><h3 className="mt-5 text-lg font-black text-[#075653]">{label}</h3><p className="mt-2 text-sm leading-6 text-[#607D7A]">{text}</p><span className="mt-4 inline-flex text-[10px] font-black uppercase tracking-[.16em] text-[#078B6B]">Abrir referência</span></a>)}</div>
          </div>
        </section>

        {service.equipmentNorms && <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16"><div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><div><ConsultEyebrow>Controle de Qualidade</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Norma por modalidade</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">A matriz abaixo conecta a modalidade à referência indicada no guia técnico da Consult.</p></div><div className="overflow-hidden rounded-[22px] border border-[#DCEAE7] bg-white shadow-sm">{service.equipmentNorms.map(([equipment,norm],index) => <div key={equipment} className={`grid gap-2 px-5 py-4 sm:grid-cols-[1.45fr_.55fr] sm:items-center ${index ? 'border-t border-[#E6EFED]' : ''}`}><strong className="text-sm text-[#123C3B]">{equipment}</strong><span className="text-sm font-bold text-[#078B6B] sm:text-right">{norm}</span></div>)}</div></div></section>}

        <section className="bg-[#075653] text-white"><div className="mx-auto grid max-w-7xl gap-7 px-5 py-12 md:grid-cols-[.7fr_1.3fr] md:px-8 md:py-14"><div><ConsultEyebrow light>O que fica documentado</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight">Resultado técnico</h2></div><div className="rounded-[22px] border border-white/10 bg-white/6 p-6"><div className="flex items-start gap-4"><FileText className="mt-1 shrink-0 text-[#8AE600]" size={24}/><div><h3 className="text-xl font-black">{service.result}</h3><p className="mt-3 text-sm leading-7 text-white/65">Na homologação, esta seção já deixa reservado o espaço para exemplos autorizados de laudo, relatório, memorial ou documento técnico. Não publicaremos documentos reais do cliente sem autorização.</p></div></div></div></div></section>

        <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Converse com a equipe Consult para confirmar escopo, modalidade, documentação necessária e atendimento presencial." />
      </main>
    </ConsultSiteShell>
  )
}
