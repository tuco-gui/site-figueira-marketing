import React, { useId } from 'react'
import { ArrowRight, CheckCircle2, FileText, MessageCircle, ShieldCheck, Settings, UsersRound } from 'lucide-react'
import { ConsultEyebrow } from '@/components/consult/ConsultSiteShell'
import './consult-electrical-safety.css'
import './consult-quality-index.css'

export const CONSULT_IMAGES = {
  radiology: 'https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba95360-34a0-449d-9a24-4836ac1f137f.jpg',
  protection: 'https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba952d9-c3e4-48d7-9dc0-4716ac1f137f.jpg',
  engineering: 'https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/5ba954a4-90f8-4e55-a0d3-4b15ac1f137f.jpg',
}

export function ApprovedInternalHero({ eyebrow, title, description, image = CONSULT_IMAGES.radiology, primaryLabel = 'Solicite um orçamento', secondaryLabel = 'Falar no WhatsApp' }) {
  const curveId = `consult-internal-curve-${useId().replace(/:/g, '')}`
  const message = encodeURIComponent(`Olá, equipe Consult. Gostaria de conversar sobre ${title}.`)
  const photos = {
    [CONSULT_IMAGES.radiology]: ['/consult/radiodiagnostico-hero.jpg', 'Imagem ilustrativa de equipamento de diagnóstico por imagem'],
    [CONSULT_IMAGES.protection]: ['/consult/raios-x-convencional-hero.jpg', 'Imagem ilustrativa de sala de radiologia'],
    [CONSULT_IMAGES.engineering]: ['/consult/seguranca-eletrica-hero-v1.webp', 'Imagem ilustrativa de ensaio em equipamento eletromédico'],
  }
  const [photo, alt] = photos[image] || [image, `Imagem ilustrativa: ${title}`]
  const words = title.split(' ')
  const highlight = words.splice(-Math.min(2, words.length)).join(' ')
  return <div className="consult-electrical-safety consult-quality-index consult-internal-hero">
    <section className="safety-hero">
      <svg width="0" height="0" aria-hidden="true"><defs><clipPath id={curveId} clipPathUnits="objectBoundingBox"><path d="M.18,0H1V1H0C.19,.7,-.08,.32,.18,0Z"/></clipPath></defs></svg>
      <div className="safety-hero-photo" style={{ '--consult-photo-curve': `url(#${curveId})` }}>
        <img src={photo} alt={alt} fetchPriority="high"/>
        <svg className="safety-photo-ribbon" viewBox="0 0 700 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0,180C150,72,395,10,700,0V180Z" fill="#00B68C"/><path d="M300,180C405,80,558,44,700,32V180Z" fill="#02D69E"/><path d="M480,180C470,125,540,30,700,0V180Z" fill="#96ED17"/></svg>
      </div>
      <div className="safety-container safety-hero-inner"><div className="safety-hero-copy">
        <div className="safety-eyebrow"><span/>{eyebrow}</div>
        <h1>{words.length > 0 && <>{words.join(' ')} </>}<span>{highlight}</span></h1>
        <p>{description}</p>
        <div className="safety-actions">
          <a href="/consult#contato" className="safety-button safety-button-primary"><FileText size={19}/>{primaryLabel}</a>
          <a href={`https://wa.me/5514981610712?text=${message}`} target="_blank" rel="noreferrer" className="safety-button safety-button-whatsapp"><MessageCircle size={21}/>{secondaryLabel}</a>
        </div>
        <div className="safety-hero-signature"><span/>Tecnologia, qualidade e segurança em saúde</div>
      </div></div>
    </section>
  </div>
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

export function ApprovedOutcome({ children }) {
  return <div className="mt-5 flex gap-3 rounded-xl border border-[#CFE4DE] bg-[#F4FBFA] p-4 text-sm leading-6 text-[#4D706D]"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#08A77F]"/>{children}</div>
}
