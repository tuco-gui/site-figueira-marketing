import React, { useEffect } from 'react'
import { Activity, FileText, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/ConsultSiteShell'

const ITEMS = [
  {
    title:'Controle de Qualidade',
    question:'Quero verificar o desempenho do equipamento e documentar dose, qualidade de imagem e funcionamento.',
    when:'Rotina periódica, equipamento novo ou mudança relevante e necessidade de evidência técnica.',
    deliverable:'Laudo técnico assinado pelo físico médico.',
    href:'/fisica-medica/controle-qualidade',
    Icon:FileText,
  },
  {
    title:'Levantamento radiométrico',
    question:'Quero medir as condições radiométricas ao redor da sala e a radiação de fuga do cabeçote.',
    when:'Sala nova, reforma, troca de equipamento ou avaliação periódica aplicável.',
    deliverable:'Resultado técnico documentado das medições.',
    href:'/fisica-medica/levantamento-radiometrico',
    Icon:Activity,
  },
  {
    title:'Projeto de blindagem',
    question:'Preciso dimensionar a proteção da sala antes de construir, reformar, expandir ou trocar equipamento.',
    when:'Antes da execução física da obra ou de alteração que mude as premissas do ambiente.',
    deliverable:'Memorial de Cálculo de Blindagem.',
    href:'/fisica-medica/projeto-blindagem',
    Icon:ShieldCheck,
  },
]

export default function ConsultRadiologyServiceGuidePage() {
  useEffect(()=>{document.title='CQ, radiometria ou blindagem? | Consult';document.querySelector('meta[name="description"]')?.setAttribute('content','Guia da Consult para entender a diferença entre Controle de Qualidade, levantamento radiométrico e projeto de blindagem.')},[])
  return <ConsultSiteShell><main>
    <section className="relative overflow-hidden bg-[#075653] text-white"><div className="absolute inset-0 opacity-65" style={{backgroundImage:'radial-gradient(circle at 80% 24%, rgba(138,230,0,.14), transparent 23%), linear-gradient(125deg, transparent 42%, rgba(5,210,157,.12) 100%)'}}/><div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-22"><Link to="/materiais" className="text-sm font-bold text-white/55 hover:text-white">Materiais técnicos</Link><div className="mt-9 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.26em] text-[#8AE600]"><span className="h-px w-10 bg-[#8AE600]"/>Guia de decisão</div><h1 className="mt-5 max-w-5xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[64px]">Controle de Qualidade, radiometria ou blindagem?</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">Os três serviços se relacionam à segurança e conformidade da radiologia, mas respondem perguntas técnicas diferentes.</p></div></section>

    <section className="bg-[#F4FAF8]"><div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20"><div className="grid gap-5 lg:grid-cols-3">{ITEMS.map(({title,question,when,deliverable,href,Icon},index)=><article key={title} className={`rounded-[26px] border p-6 ${index===1?'border-[#075653] bg-[#075653] text-white shadow-[0_22px_55px_rgba(7,86,83,.16)]':'border-[#D5E6E1] bg-white text-[#123C3B] shadow-[0_14px_40px_rgba(7,86,83,.06)]'}`}><div className={`grid h-12 w-12 place-items-center rounded-2xl ${index===1?'bg-[#8AE600] text-[#075653]':'bg-[#E7F6F1] text-[#078B6B]'}`}><Icon size={23}/></div><div className={`mt-6 text-[10px] font-black uppercase tracking-[.2em] ${index===1?'text-[#B8FF51]':'text-[#08A77F]'}`}>0{index+1}</div><h2 className={`mt-2 text-2xl font-black ${index===1?'text-white':'text-[#075653]'}`}>{title}</h2><p className={`mt-4 text-sm font-semibold leading-7 ${index===1?'text-white/82':'text-[#315B58]'}`}>{question}</p><div className={`mt-6 border-t pt-5 ${index===1?'border-white/12':'border-[#E1ECE9]'}`}><div className={`text-[9px] font-black uppercase tracking-[.16em] ${index===1?'text-white/45':'text-[#78908E]'}`}>Quando entra</div><p className={`mt-2 text-xs leading-6 ${index===1?'text-white/62':'text-[#607D7A]'}`}>{when}</p></div><div className={`mt-4 border-t pt-5 ${index===1?'border-white/12':'border-[#E1ECE9]'}`}><div className={`text-[9px] font-black uppercase tracking-[.16em] ${index===1?'text-white/45':'text-[#78908E]'}`}>Entrega</div><p className={`mt-2 text-xs font-bold leading-6 ${index===1?'text-white/82':'text-[#315B58]'}`}>{deliverable}</p></div><Link to={href} className={`mt-6 inline-flex text-xs font-black uppercase tracking-[.14em] ${index===1?'text-[#B8FF51]':'text-[#078B6B]'}`}>Ver página do serviço</Link></article>)}</div></div></section>

    <section className="bg-white"><div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.55fr_1.45fr]"><div><ConsultEyebrow>Resumo rápido</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">Três perguntas, três respostas diferentes.</h2></div><div className="divide-y divide-[#DCEAE7] border-y border-[#DCEAE7]">{[['O equipamento está entregando o que deveria?','Controle de Qualidade.'],['A radiação no entorno da sala está dentro das condições avaliadas?','Levantamento radiométrico.'],['Como dimensionar a proteção antes da obra ou mudança?','Projeto de blindagem.']].map(([question,answer],index)=><div key={question} className="grid gap-2 py-5 sm:grid-cols-[1.35fr_.65fr] sm:items-center"><div className="text-sm font-black leading-6 text-[#315B58]">{question}</div><div className="text-sm font-black text-[#078B6B] sm:text-right">{answer}</div></div>)}</div></div></section>
    <ConsultCtaBand title="Seu caso não cabe perfeitamente em uma dessas situações?" text="Envie o contexto da sala, equipamento ou obra. A equipe Consult identifica qual avaliação precisa ser considerada." />
  </main></ConsultSiteShell>
}
