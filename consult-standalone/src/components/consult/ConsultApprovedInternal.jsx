import React from 'react'
import { ArrowRight, CheckCircle2, FileText, MessageCircle, ShieldCheck, Settings, UsersRound } from 'lucide-react'
import { ConsultEyebrow } from '@/components/ConsultSiteShell'

export const CONSULT_IMAGES = {
  radiology: 'https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba95360-34a0-449d-9a24-4836ac1f137f.jpg',
  protection: 'https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba952d9-c3e4-48d7-9dc0-4716ac1f137f.jpg',
  engineering: 'https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba954a4-90f8-4e55-a0d3-4b15ac1f137f.jpg',
}

export function ApprovedInternalHero({ eyebrow, title, description, image = CONSULT_IMAGES.radiology, primaryLabel = 'Solicite um orçamento', secondaryLabel = 'Falar no WhatsApp', breadcrumbs = [] }) {
  const message = encodeURIComponent(`Olá, equipe Consult. Gostaria de conversar sobre ${title}.`)
  return <section className="relative overflow-hidden bg-[#075653] text-white">
    <div className="absolute inset-0 opacity-45" style={{backgroundImage:`url("${CONSULT_IMAGES.protection}")`,backgroundSize:'cover',backgroundPosition:'left bottom'}}/>
    <div className="absolute -left-28 top-20 h-72 w-72 rounded-full border border-white/5"/>
    <div className="absolute left-16 top-6 h-32 w-32 rounded-full border border-dashed border-white/10"/>
    <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-stretch lg:grid-cols-[1.02fr_.98fr]">
      <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {breadcrumbs.length > 0 && <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-white/55">
          {breadcrumbs.map(([label,href],index)=><React.Fragment key={label}><span aria-hidden="true" className={index===0?'hidden':''}>/</span>{href?<a href={href} className="transition hover:text-[#8AE600]">{label}</a>:<span className="text-white/80">{label}</span>}</React.Fragment>)}
        </nav>}
        <div className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/65">{eyebrow}</div>
        <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 lg:text-lg">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/#contato" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white shadow-xl shadow-black/10 transition hover:brightness-95"><FileText className="h-4 w-4"/>{primaryLabel}<ArrowRight className="h-4 w-4"/></a>
          <a href={`https://wa.me/5514981610712?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#8AE600]/70 px-6 py-3 text-sm font-extrabold text-[#B8FF51] transition hover:bg-[#8AE600] hover:text-[#075653]"><MessageCircle className="h-4 w-4"/>{secondaryLabel}</a>
        </div>
      </div>
      <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
        <img src={image} alt={`${title} — Consult Radiometria e Qualidade`} className="absolute inset-0 h-full w-full scale-105 object-cover object-center"/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#075653] via-[#075653]/25 to-transparent lg:from-[#075653]/62"/>
        <div className="absolute bottom-0 right-0 h-28 w-3/4 rounded-tl-[100%] bg-[#05D29D]/90"/>
        <div className="absolute bottom-0 right-0 h-16 w-1/2 rounded-tl-[100%] bg-[#8AE600]"/>
        <div className="absolute right-7 top-7 hidden max-w-[170px] border-l-2 border-[#8AE600] pl-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white/75 sm:block">Tecnologia, qualidade e segurança em saúde</div>
      </div>
    </div>
  </section>
}

export function ApprovedProofStrip({ items = [] }) {
  const icons=[ShieldCheck,FileText,Settings,UsersRound]
  return <section className="border-b border-black/5 bg-white"><div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-4 py-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
    {items.slice(0,4).map((item,index)=>{const Icon=icons[index%icons.length]; const label=Array.isArray(item)?item[0]:''; const value=Array.isArray(item)?item[1]:item; return <div key={`${label}-${value}`} className="flex items-center gap-3 px-3 py-4 sm:px-5"><Icon className="h-8 w-8 shrink-0 text-[#08A77F]"/><div><div className="text-sm font-extrabold text-[#123C3B]">{value}</div><div className="text-[10px] font-bold uppercase tracking-[.14em] text-black/38">{label}</div></div></div>})}
  </div></section>
}

export function ApprovedIndependenceBand() {
  return <section className="border-y border-[#8AE600]/25 bg-[#043F3D] text-white">
    <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
      <div>
        <div className="text-[10px] font-black uppercase tracking-[.22em] text-[#8AE600]">Verificação independente</div>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-white/78">A Consult faz manutenção preventiva quando contratada. Não fazemos manutenção corretiva e não vendemos peças. O laudo documenta a condição do equipamento e a instituição decide como tratar eventuais pendências.</p>
      </div>
      <div className="text-xs font-extrabold text-white/55">Sem vínculo com empresas de conserto</div>
    </div>
  </section>
}

export function ApprovedLightSection({ eyebrow, title, intro, children, center = false, white = false }) {
  return <section className={`relative overflow-hidden ${white?'bg-white':'bg-[#F4FBFA]'}`}>
    <div className="absolute -left-28 top-12 h-80 w-80 rounded-full border-[28px] border-[#DFF4EF]/55"/>
    <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full border-[34px] border-[#E7F6F3]/65"/>
    <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className={center?'text-center':''}><ConsultEyebrow center={center}>{eyebrow}</ConsultEyebrow><h2 className={`${center?'mx-auto':''} mt-4 max-w-4xl text-3xl font-black tracking-[-0.03em] text-[#123C3B] sm:text-4xl lg:text-5xl`}>{title}</h2>{intro&&<p className={`${center?'mx-auto':''} mt-4 max-w-3xl text-[15px] leading-7 text-black/58`}>{intro}</p>}</div>
      <div className="mt-10">{children}</div>
    </div>
  </section>
}

export function ApprovedServiceCards({ items = [] }) {
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(([title,text,href,Icon])=><a key={href} href={href} className="group rounded-xl border border-black/5 bg-white p-6 shadow-lg shadow-[#075653]/5 transition hover:-translate-y-1 hover:shadow-xl">
    <div className="flex items-center gap-3"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#08A77F] text-white"><Icon className="h-6 w-6"/></span><h3 className="text-lg font-black text-[#123C3B]">{title}</h3></div>
    <p className="mt-4 text-[14px] leading-relaxed text-black/55">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#08A77F]">Saiba mais <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></span>
  </a>)}</div>
}

export function ApprovedList({ items = [] }) {
  return <div className="grid gap-4 md:grid-cols-2">{items.map((item,index)=><div key={item} className="flex gap-4 rounded-xl border border-black/5 bg-white p-5 shadow-sm"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5F6F1] text-sm font-black text-[#08A77F]">0{index+1}</div><div className="pt-2 text-sm font-extrabold leading-6 text-[#315B58]">{item}</div></div>)}</div>
}

export function ApprovedDarkProcess({ items = [] }) {
  return <section className="relative overflow-hidden bg-[#075653] text-white"><div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#05D29D]/15"/><div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"><ConsultEyebrow light>Como funciona</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.03em] sm:text-4xl">Do escopo ao documento técnico</h2><div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{items.map(([num,title,text])=><div key={num} className="border-t border-white/20 pt-5"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8AE600]/40 bg-[#8AE600]/10 text-xs font-black text-[#B8FF51]">{num}</div><h3 className="mt-4 text-base font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-white/62">{text}</p></div>)}</div></div></section>
}

export function ApprovedFaq({ items = [] }) {
  return <section className="bg-[#064946] text-white"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[.55fr_1.45fr] lg:px-8 lg:py-20"><div><ConsultEyebrow light>FAQ técnico</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.03em] sm:text-4xl">Dúvidas frequentes</h2></div><div>{items.map(([q,a])=><details key={q} className="group border-b border-white/12 py-5"><summary className="cursor-pointer list-none text-base font-extrabold">{q}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">{a}</p></details>)}</div></div></section>
}

export function ApprovedNormCards({ items = [] }) {
  return <div className="grid gap-5 md:grid-cols-2">{items.map(([label,text,href])=><a key={label} href={href} target="_blank" rel="noreferrer" className="group rounded-xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#08A77F] text-white"><FileText className="h-5 w-5"/></div><ArrowRight className="h-4 w-4 text-[#08A77F]"/></div><h3 className="mt-5 text-lg font-black text-[#123C3B]">{label}</h3><p className="mt-2 text-sm leading-6 text-black/55">{text}</p></a>)}</div>
}


export function ApprovedMediaCards({ items = [], columns = 'three' }) {
  const grid = columns === 'five'
    ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
    : columns === 'two'
      ? 'md:grid-cols-2'
      : 'md:grid-cols-2 lg:grid-cols-3'
  return <div className={`grid gap-5 ${grid}`}>
    {items.map((item)=>{
      const { title, text, href, image, Icon = ShieldCheck, badge, cta = 'Saiba mais' } = item
      return <a key={href || title} href={href || '#'} className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg shadow-[#075653]/5 transition hover:-translate-y-1 hover:shadow-xl">
        {image && <div className="relative h-36 overflow-hidden bg-[#DCEEEB]">
          <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#064946]/55 via-transparent to-transparent"/>
          {badge && <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-[.12em] text-[#075653] shadow-sm">{badge}</span>}
        </div>}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#08A77F] text-white shadow-sm"><Icon className="h-[22px] w-[22px]" strokeWidth={2.2}/></span>
            <h3 className="pt-1 text-[17px] font-black leading-6 text-[#123C3B]">{title}</h3>
          </div>
          {text && <p className="mt-4 text-[13px] leading-6 text-black/55">{text}</p>}
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#08A77F]">{cta}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></span>
        </div>
      </a>
    })}
  </div>
}

export function ApprovedEditorialPanel({ eyebrow, title, text, items = [], image }) {
  return <div className="grid overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg shadow-[#075653]/5 lg:grid-cols-[.86fr_1.14fr]">
    {image && <div className="relative min-h-[260px] overflow-hidden bg-[#DCEEEB]"><img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#064946]/15"/></div>}
    <div className="p-7 sm:p-9 lg:p-10">
      <div className="text-[10px] font-black uppercase tracking-[.22em] text-[#08A77F]">{eyebrow}</div>
      <h3 className="mt-3 text-2xl font-black tracking-[-.02em] text-[#123C3B] sm:text-3xl">{title}</h3>
      {text && <p className="mt-4 text-sm leading-7 text-black/58">{text}</p>}
      {items.length>0 && <div className="mt-6 grid gap-3 sm:grid-cols-2">{items.map((item,index)=><div key={item} className="flex items-start gap-3 rounded-xl bg-[#F4FBFA] px-4 py-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E5F6F1] text-[10px] font-black text-[#08A77F]">0{index+1}</span><span className="text-sm font-extrabold leading-5 text-[#315B58]">{item}</span></div>)}</div>}
    </div>
  </div>
}

export function ApprovedOutcome({ children }) {
  return <div className="mt-5 flex gap-3 rounded-xl border border-[#CFE4DE] bg-[#F4FBFA] p-4 text-sm leading-6 text-[#4D706D]"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#08A77F]"/>{children}</div>
}
