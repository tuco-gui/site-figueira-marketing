import React, { useEffect } from 'react'
import { ExternalLink, FileText, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'

const GROUPS = [
  {
    title: 'Física Médica e Proteção Radiológica',
    intro: 'Base regulatória usada para organizar os serviços de radiologia diagnóstica e intervencionista apresentados no site.',
    items: [
      ['RDC 611/2022 — Anvisa','Base sanitária geral para serviços de radiologia diagnóstica e intervencionista.','https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'],
      ['IN 90/2021 — Radiografia convencional','Referência para radiografia médica convencional.','https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000090&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021'],
      ['IN 91/2021 — Fluoroscopia e intervenção','Referência para fluoroscopia, arco cirúrgico e radiologia intervencionista.','https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=8542&cod_modulo=310&link=S&numeroAto=00000091&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021'],
      ['IN 92/2021 — Mamografia','Referência para mamografia.','https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000092&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021'],
      ['IN 93/2021 — Tomografia','Referência para tomografia computadorizada médica.','https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&codTipo=&cod_menu=1696&cod_modulo=134&desItem=&desItemFim=&numeroAto=00000093&orgao=DC%2FANVISA%2FMS&pesquisa=true&seqAto=000&tipo=INM&valorAno=2021'],
      ['IN 94/2021 — Odontologia extraoral','Referência para radiologia odontológica extraoral.','https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000094&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021'],
      ['IN 95/2021 — Odontologia intraoral','Referência para radiologia odontológica intraoral.','https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&codTipo=&cod_menu=1696&cod_modulo=134&desItem=&desItemFim=&numeroAto=00000095&orgao=DC%2FANVISA%2FMS&pesquisa=true&seqAto=000&tipo=INM&valorAno=2021'],
      ['IN 96/2021 — Ultrassom','Referência para controle de qualidade em ultrassom diagnóstico ou terapêutico.','https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=8542&cod_modulo=310&link=S&numeroAto=00000096&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021'],
      ['IN 97/2021 — Ressonância magnética','Referência para controle de qualidade em ressonância magnética.','https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&cod_menu=9431&cod_modulo=310&link=S&numeroAto=00000097&orgao=DC%2FANVISA%2FMS&seqAto=000&tipo=INM&valorAno=2021'],
    ],
  },
  {
    title: 'Engenharia Clínica',
    intro: 'Referências gerais para gerenciamento de tecnologias, segurança elétrica e desempenho de equipamentos.',
    items: [
      ['RDC 509/2021 — Anvisa','Base geral indicada para gerenciamento de tecnologias em saúde.','https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2021/rdc0509_27_05_2021.pdf'],
      ['ABNT NBR IEC 62353','Referência para ensaio recorrente de segurança elétrica e após reparo. Consulte a edição vigente no Catálogo ABNT.','https://www.abntcatalogo.com.br/pav.aspx'],
      ['Família ABNT NBR IEC 60601','Normas gerais e particulares aplicáveis conforme o tipo de equipamento e o ensaio de desempenho. Consulte a edição vigente no Catálogo ABNT.','https://www.abntcatalogo.com.br/pav.aspx'],
    ],
  },
  {
    title: 'Qualificação térmica e rede de frio',
    intro: 'Referências informadas pela Consult para autoclaves, câmaras de vacina e demais aplicações térmicas confirmadas.',
    items: [
      ['ABNT NBR ISO 17665','Referência aplicável à esterilização por calor úmido em autoclaves. Consulte a edição vigente no Catálogo ABNT.','https://www.abntcatalogo.com.br/pav.aspx'],
      ['ABNT NBR ISO 15883','Referência aplicável a lavadoras termodesinfectoras. Consulte a edição vigente no Catálogo ABNT.','https://www.abntcatalogo.com.br/pav.aspx'],
      ['ABNT NBR IEC 61010','Referência de segurança para equipamentos laboratoriais e de medição quando aplicável. Consulte a edição vigente no Catálogo ABNT.','https://www.abntcatalogo.com.br/pav.aspx'],
      ['RDC 15/2012','Referência sanitária para processamento de produtos para saúde, conforme aplicabilidade.','https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2012/rdc0015_15_03_2012.pdf'],
      ['RDC 197/2017','Referência para serviços de vacinação.','https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2017/rdc0197_26_12_2017.pdf'],
      ['Manual da Rede de Frio do PNI','Referência para câmaras de vacina e conservação.','https://www.gov.br/saude/pt-br/composicao/svsa/pni/rede-de-frio/publicacoes/manual-de-rede-de-frio-pni-5ed.pdf/view'],
    ],
  },
]

function ReferenceCard({ item }) {
  const [title,text,href] = item
  const external = href && !href.startsWith('#')
  return <a href={href} target={external?'_blank':undefined} rel={external?'noreferrer':undefined} className="group block rounded-[22px] border border-[#D5E6E1] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#08A77F] hover:shadow-[0_18px_45px_rgba(7,86,83,.08)]"><div className="flex items-start justify-between gap-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#E7F6F1] text-[#078B6B]"><FileText size={20}/></div><ExternalLink size={15} className="text-[#9CB1AE] group-hover:text-[#08A77F]"/></div><h3 className="mt-5 text-base font-black leading-6 text-[#075653]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#607D7A]">{text}</p><span className="mt-4 inline-flex text-[10px] font-black uppercase tracking-[.15em] text-[#078B6B]">Ver referência oficial</span></a>
}

export default function ConsultNormsPage() {
  useEffect(()=>{document.title='Normas e referências técnicas | Consult';document.querySelector('meta[name="description"]')?.setAttribute('content','Biblioteca de normas e referências técnicas usadas nas páginas de Física Médica, Proteção Radiológica e Engenharia Clínica da Consult.')},[])
  return <ConsultSiteShell><main>
    <section className="relative overflow-hidden bg-[#075653] text-white"><div className="absolute inset-0 opacity-70" style={{backgroundImage:'radial-gradient(circle at 82% 25%, rgba(138,230,0,.14), transparent 24%), linear-gradient(125deg, transparent 42%, rgba(5,210,157,.12) 100%)'}}/><div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24"><Link to="/" className="text-sm font-bold text-white/55 hover:text-white">Consult Radiometria e Qualidade</Link><div className="mt-9 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.26em] text-[#8AE600]"><span className="h-px w-10 bg-[#8AE600]"/>Biblioteca técnica</div><h1 className="mt-5 max-w-5xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[66px]">Normas e referências que sustentam os serviços.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">A biblioteca organiza as referências citadas no site e leva o visitante para a fonte oficial ou catálogo institucional correspondente.</p></div></section>

    <section className="border-y border-[#8AE600]/25 bg-[#043F3D] text-white"><div className="mx-auto flex max-w-7xl items-start gap-4 px-5 py-5 md:px-8"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#8AE600]"/><p className="text-sm leading-6 text-white/68"><strong className="text-white">Importante:</strong> esta biblioteca é uma orientação de navegação. Ela não substitui a leitura da norma oficial, nem reproduz conteúdo protegido de normas ABNT.</p></div></section>

    {GROUPS.map((group,index)=><section key={group.title} className={index%2===0?'bg-[#F4FAF8]':'bg-white'}><div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.52fr_1.48fr]"><div><ConsultEyebrow>{index===0?'Radiologia':index===1?'Equipamentos médicos':'Temperatura e conservação'}</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">{group.title}</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">{group.intro}</p></div><div className="grid gap-4 md:grid-cols-2">{group.items.map((item)=><ReferenceCard key={item[0]} item={item}/>)}</div></div></section>)}

    <section className="bg-[#043F3D] text-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-[.7fr_1.3fr] md:px-8 md:py-18"><div><ConsultEyebrow light>Como usar</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] md:text-4xl">Da norma para a página do serviço</h2></div><div className="grid gap-3 sm:grid-cols-3">{[['Física Médica','/fisica-medica'],['Proteção Radiológica','/protecao-radiologica'],['Consult Engenharia Clínica','/engenharia-clinica']].map(([label,href])=><Link key={href} to={href} className="rounded-[18px] border border-white/10 bg-white/[.05] p-5 text-sm font-black text-white transition hover:border-[#8AE600]/50 hover:text-[#B8FF51]">{label}</Link>)}</div></div></section>
    <ConsultCtaBand title="Precisa relacionar uma exigência ao seu equipamento ou serviço?" text="A equipe Consult confirma o escopo técnico e a referência aplicável ao contexto da instituição." />
  </main></ConsultSiteShell>
}
