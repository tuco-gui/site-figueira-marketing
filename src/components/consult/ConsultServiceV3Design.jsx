import React from 'react'
import { CheckCircle2, FileText, ShieldCheck, ExternalLink, Gauge, Activity } from 'lucide-react'

export function ServiceHeroConsole({ title, kicker, chips = [], accent = 'technical' }) {
  const bars = accent === 'thermal' ? [42, 68, 56, 82, 71, 88, 63, 78] : accent === 'shield' ? [64, 64, 64, 64, 64, 64, 64, 64] : [38, 70, 54, 86, 48, 74, 62, 91]
  return (
    <div className="relative mx-auto w-full max-w-[590px] overflow-hidden rounded-[30px] border border-white/12 bg-[#043F3D]/90 p-3 shadow-[0_34px_90px_rgba(0,30,29,.38)] backdrop-blur sm:p-4">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border border-[#8AE600]/15" />
      <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border border-[#8AE600]/10" />
      <div className="relative rounded-[24px] border border-white/8 bg-[#064946] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="text-[9px] font-black uppercase tracking-[.24em] text-[#8AE600]">{kicker || 'ANÁLISE TÉCNICA'}</div>
            <div className="mt-2 max-w-[370px] text-xl font-black leading-6 text-white sm:text-2xl">{title}</div>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#8AE600]/25 bg-[#8AE600]/10 text-[#8AE600]"><Gauge size={23} /></div>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_122px] gap-3 sm:grid-cols-[1fr_150px]">
          <div className="relative overflow-hidden rounded-[20px] border border-white/8 bg-[#053F3D] p-4">
            <div className="absolute inset-0 opacity-40" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',backgroundSize:'34px 34px'}} />
            <div className="relative flex h-[170px] items-end gap-2 sm:h-[190px]">
              {bars.map((height,index)=><div key={index} className="flex-1 rounded-t-md bg-gradient-to-t from-[#08A77F] to-[#8AE600] opacity-85" style={{height:`${height}%`}} />)}
            </div>
            <div className="relative mt-4 flex items-center justify-between text-[8px] font-black uppercase tracking-[.14em] text-white/32"><span>entrada</span><span>medição</span><span>resultado</span></div>
          </div>
          <div className="grid gap-3">
            {['NORMA','ENSAIO','LAUDO'].map((label,index)=><div key={label} className="rounded-[18px] border border-white/8 bg-white/[.035] p-3"><div className="text-[9px] font-black text-[#8AE600]">0{index+1}</div><div className="mt-2 text-[10px] font-black tracking-[.12em] text-white/72">{label}</div><div className="mt-3 h-1.5 rounded-full bg-white/7"><div className="h-full rounded-full bg-[#8AE600]" style={{width:`${[72,88,64][index]}%`}} /></div></div>)}
          </div>
        </div>

        {chips.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{chips.map((chip)=><span key={chip} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.08em] text-white/58">{chip}</span>)}</div>}
      </div>
    </div>
  )
}

export function ServiceProofRail({ items }) {
  return (
    <div className="border-y border-[#DCEAE7] bg-[#F7FBFA]">
      <div className="mx-auto grid max-w-7xl divide-y divide-[#DCEAE7] px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:px-8 lg:grid-cols-4">
        {items.map(([eyebrow,title],index)=><div key={title} className="px-0 py-5 sm:px-5 lg:px-6"><div className="text-[9px] font-black uppercase tracking-[.18em] text-[#08A77F]">{eyebrow || `0${index+1}`}</div><div className="mt-2 text-sm font-black leading-5 text-[#315B58]">{title}</div></div>)}
      </div>
    </div>
  )
}

export function EditorialStatement({ eyebrow, title, children, dark = false }) {
  return (
    <section className={dark ? 'bg-[#043F3D] text-white' : 'bg-white'}>
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
        <div><div className={`text-[10px] font-black uppercase tracking-[.23em] ${dark?'text-[#8AE600]':'text-[#08A77F]'}`}>{eyebrow}</div><h2 className={`mt-4 text-3xl font-black leading-[1.03] tracking-[-.04em] md:text-5xl ${dark?'text-white':'text-[#075653]'}`}>{title}</h2></div>
        <div className={`text-base leading-8 md:text-lg ${dark?'text-white/68':'text-[#496C69]'}`}>{children}</div>
      </div>
    </section>
  )
}

export function TriggerPanel({ title='Quando este serviço entra na rotina', items=[] }) {
  return (
    <section className="bg-[#F4FAF8]">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[.58fr_1.42fr] lg:items-start">
          <div className="lg:sticky lg:top-32"><div className="text-[10px] font-black uppercase tracking-[.22em] text-[#08A77F]">Gatilhos de contratação</div><h2 className="mt-4 text-3xl font-black leading-[1.03] tracking-[-.04em] text-[#075653] md:text-4xl">{title}</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">Situações em que a instituição precisa medir, documentar, revisar ou comprovar tecnicamente uma condição.</p></div>
          <div className="border-y border-[#CFE2DD]">
            {items.map((item,index)=><div key={item} className={`grid gap-3 py-6 sm:grid-cols-[72px_1fr] sm:items-start ${index?'border-t border-[#DCEAE7]':''}`}><div className="text-[34px] font-black leading-none text-[#08A77F]/35">0{index+1}</div><div className="text-lg font-black leading-7 text-[#315B58]">{item}</div></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProcessTimeline({ items=[] }) {
  return (
    <section className="relative overflow-hidden bg-[#075653] text-white">
      <div className="absolute inset-0 opacity-55" style={{backgroundImage:'radial-gradient(circle at 88% 20%, rgba(138,230,0,.13), transparent 24%), linear-gradient(120deg, transparent 35%, rgba(5,210,157,.12) 100%)'}} />
      <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="max-w-3xl"><div className="text-[10px] font-black uppercase tracking-[.22em] text-[#8AE600]">Metodologia</div><h2 className="mt-4 text-3xl font-black tracking-[-.04em] md:text-5xl">Do escopo ao documento técnico</h2></div>
        <div className="relative mt-12 grid gap-0 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-white/12 md:block" />
          {items.map(([number,title,text],index)=><article key={number} className="relative border-b border-white/10 py-6 md:border-b-0 md:px-5 md:py-0 first:md:pl-0 last:md:pr-0"><div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-[#8AE600]/35 bg-[#064946] text-sm font-black text-[#8AE600]">{number}</div><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-white/60">{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}

export function MeasurementMatrix({ title='O que é avaliado', items=[] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.6fr_1.4fr]">
        <div><div className="text-[10px] font-black uppercase tracking-[.22em] text-[#08A77F]">Parâmetros</div><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">{title}</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">A informação técnica é apresentada por grandeza, etapa ou evidência, sem reduzir o serviço a uma descrição genérica.</p></div>
        <div className="overflow-hidden rounded-[24px] border border-[#D5E6E1] bg-[#F8FBFA]">
          {items.map((item,index)=><div key={typeof item==='string'?item:item[0]} className={`grid gap-3 px-5 py-5 sm:grid-cols-[64px_1fr_auto] sm:items-center md:px-6 ${index?'border-t border-[#DDEAE7]':''}`}><div className="text-[11px] font-black text-[#08A77F]">0{index+1}</div><div className="text-sm font-black leading-6 text-[#315B58]">{typeof item==='string'?item:item[0]}</div>{Array.isArray(item)&&item[1]&&<div className="text-xs font-bold text-[#78908E] sm:text-right">{item[1]}</div>}</div>)}
        </div>
      </div>
    </section>
  )
}

export function StandardsShelf({ items=[] }) {
  return (
    <section className="bg-[#EAF5F2]">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-9 lg:grid-cols-[.58fr_1.42fr]">
          <div><div className="text-[10px] font-black uppercase tracking-[.22em] text-[#08A77F]">Base normativa</div><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">Norma não fica escondida no rodapé</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">Cada referência aparece associada ao serviço e com acesso à fonte oficial ou ao catálogo institucional correspondente.</p></div>
          <div className="grid gap-3 md:grid-cols-2">{items.map(([label,text,href])=><a key={`${label}-${href}`} href={href} target={href?.startsWith('#')?undefined:'_blank'} rel={href?.startsWith('#')?undefined:'noreferrer'} className="group rounded-[20px] border border-[#CFE2DD] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#08A77F] hover:shadow-[0_16px_40px_rgba(7,86,83,.08)]"><div className="flex items-start justify-between gap-3"><FileText size={20} className="text-[#08A77F]"/><ExternalLink size={14} className="text-[#9CB1AE] group-hover:text-[#08A77F]"/></div><h3 className="mt-4 font-black text-[#075653]">{label}</h3><p className="mt-2 text-xs leading-5 text-[#607D7A]">{text}</p></a>)}</div>
        </div>
      </div>
    </section>
  )
}

export function TechnicalFaq({ items=[] }) {
  if (!items.length) return null
  return (
    <section className="bg-[#043F3D] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.55fr_1.45fr]">
        <div><div className="text-[10px] font-black uppercase tracking-[.22em] text-[#8AE600]">FAQ técnico</div><h2 className="mt-4 text-3xl font-black tracking-[-.04em] md:text-4xl">Dúvidas que aparecem antes da contratação</h2></div>
        <div className="divide-y divide-white/10 border-y border-white/10">{items.map(([question,answer])=><details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-5 text-base font-black leading-6 text-white">{question}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">{answer}</p></details>)}</div>
      </div>
    </section>
  )
}

export function IndependenceBand() {
  return <div className="border-y border-[#8AE600]/25 bg-[#032F2D] text-white"><div className="mx-auto flex max-w-7xl items-start gap-4 px-5 py-5 md:px-8"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#8AE600]/12 text-[#8AE600]"><ShieldCheck size={18}/></div><div><div className="text-[9px] font-black uppercase tracking-[.22em] text-[#8AE600]">Independência técnica</div><p className="mt-1 max-w-4xl text-sm leading-6 text-white/70"><strong className="text-white">A Consult mede, ensaia e documenta.</strong> Não vende peças e não condiciona o laudo a uma empresa de conserto.</p></div></div></div>
}

export function DeliverableHeader({ title, description }) {
  return <div className="mb-8"><div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.22em] text-[#08A77F]"><Activity size={16}/>Entregável</div><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">{title}</h2>{description&&<p className="mt-4 max-w-2xl text-sm leading-7 text-[#607D7A]">{description}</p>}</div>
}

export function OutcomeNote({ children }) {
  return <div className="mt-6 flex items-start gap-3 rounded-[18px] border border-[#CFE4DE] bg-[#F6FAF9] px-5 py-4"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#08A77F]"/><div className="text-sm leading-6 text-[#496C69]">{children}</div></div>
}
