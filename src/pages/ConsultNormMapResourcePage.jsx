import React, { useEffect } from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'

const ROWS = [
  ['Raios X médico convencional','IN 90/2021','/consult/fisica-medica/controle-de-qualidade/raio-x-convencional'],
  ['Fluoroscopia, Arco C e angiografia','IN 91/2021','/consult/fisica-medica/controle-de-qualidade/fluoroscopia-arco-c-angiografia'],
  ['Mamografia','IN 92/2021','/consult/fisica-medica/controle-de-qualidade/mamografia'],
  ['Tomografia computadorizada','IN 93/2021','/consult/fisica-medica/controle-de-qualidade/tomografia'],
  ['Radiologia odontológica extraoral','IN 94/2021','/consult/fisica-medica/controle-de-qualidade/odontologico-extraoral'],
  ['Radiologia odontológica intraoral','IN 95/2021','/consult/fisica-medica/controle-de-qualidade/odontologico-intraoral'],
  ['Ultrassom','IN 96/2021','/consult/fisica-medica/controle-de-qualidade/ultrassom'],
  ['Ressonância magnética','IN 97/2021','/consult/fisica-medica/controle-de-qualidade/ressonancia-magnetica'],
  ['Densitometria óssea','RDC 611/2022 — sem IN específica indicada no guia','/consult/fisica-medica/controle-de-qualidade/densitometria-ossea'],
  ['Raios X veterinário','RDC 611/2022 + IN 90/2021 como referência técnica','/consult/fisica-medica/controle-de-qualidade/raio-x-veterinario'],
]

export default function ConsultNormMapResourcePage() {
  useEffect(()=>{document.title='Mapa de normas por modalidade | Consult';document.querySelector('meta[name="description"]')?.setAttribute('content','Mapa prático da RDC 611/2022 e das IN 90 a 97/2021 por modalidade atendida pela Consult.')},[])
  return <ConsultSiteShell><main>
    <section className="bg-[#075653] text-white"><div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-22"><Link to="/consult/materiais" className="text-sm font-bold text-white/55 hover:text-white">Materiais técnicos</Link><div className="mt-9 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.26em] text-[#8AE600]"><span className="h-px w-10 bg-[#8AE600]"/>Guia rápido</div><h1 className="mt-5 max-w-5xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[64px]">Mapa de normas por modalidade de diagnóstico por imagem.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">A RDC 611/2022 funciona como base geral e as Instruções Normativas especificam modalidades. Este mapa reproduz somente a relação confirmada no guia técnico da Consult.</p></div></section>

    <section className="bg-[#F4FAF8]"><div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.48fr_1.52fr]"><div><ConsultEyebrow>Relação rápida</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">Modalidade → referência</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">Clique na modalidade para ver a página específica de Controle de Qualidade.</p><div className="mt-6 flex flex-col gap-2"><a href={RDC_611} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-black text-[#078B6B]">RDC 611/2022 <ExternalLink size={14}/></a><a href={ANVISA_IN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-black text-[#078B6B]">IN 90 a 97/2021 <ExternalLink size={14}/></a></div></div><div className="overflow-hidden rounded-[24px] border border-[#D5E6E1] bg-white shadow-[0_16px_45px_rgba(7,86,83,.06)]">{ROWS.map(([label,norm,href],index)=><Link key={label} to={href} className={`grid gap-2 px-5 py-5 transition hover:bg-[#F3FAF7] sm:grid-cols-[1.3fr_.7fr] sm:items-center md:px-6 ${index?'border-t border-[#E1ECE9]':''}`}><div className="flex items-center gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E7F6F1] text-[#078B6B]"><FileText size={17}/></div><strong className="text-sm leading-5 text-[#315B58]">{label}</strong></div><span className="text-xs font-black leading-5 text-[#078B6B] sm:text-right">{norm}</span></Link>)}</div></div></section>

    <section className="bg-white"><div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-18"><div className="grid gap-5 md:grid-cols-3"><div className="rounded-[22px] border border-[#DCEAE7] p-6"><div className="text-[10px] font-black uppercase tracking-[.2em] text-[#08A77F]">01</div><h3 className="mt-3 text-lg font-black text-[#075653]">Base geral</h3><p className="mt-3 text-sm leading-6 text-[#607D7A]">A RDC 611/2022 organiza requisitos sanitários de radiologia diagnóstica e intervencionista.</p></div><div className="rounded-[22px] border border-[#DCEAE7] p-6"><div className="text-[10px] font-black uppercase tracking-[.2em] text-[#08A77F]">02</div><h3 className="mt-3 text-lg font-black text-[#075653]">Modalidade</h3><p className="mt-3 text-sm leading-6 text-[#607D7A]">As INs indicadas no guia variam conforme o equipamento e a modalidade.</p></div><div className="rounded-[22px] bg-[#075653] p-6 text-white"><div className="text-[10px] font-black uppercase tracking-[.2em] text-[#8AE600]">03</div><h3 className="mt-3 text-lg font-black">Aplicação</h3><p className="mt-3 text-sm leading-6 text-white/65">A definição do ensaio aplicável depende do equipamento e do contexto técnico da instituição.</p></div></div></div></section>
    <ConsultCtaBand title="Não sabe qual referência se aplica ao seu equipamento?" text="Informe a modalidade e o equipamento. A equipe Consult confirma o escopo técnico da avaliação." />
  </main></ConsultSiteShell>
}
