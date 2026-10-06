import React, { useState } from 'react'
import { CalendarDays, ExternalLink, Menu, MessageCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONSULT_PROJECT } from '@/lib/consultProject'

const CDN = 'https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305'
const LOGO = `${CDN}/68d5471e-43b0-4285-8644-3407ac1e09ff.png`
const WHATSAPP = '5514996710677'

export const CONSULT_COLORS = {
  dark: '#075653',
  deep: '#064946',
  green: '#08A77F',
  mint: '#05D29D',
  lime: '#8AE600',
  orange: '#FF6B26',
  ink: '#123C3B',
  soft: '#F4FAF8',
}

export function ConsultEyebrow({ children, light = false, center = false }) {
  return (
    <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.28em] ${center ? 'justify-center' : ''} ${light ? 'text-white/70' : 'text-[#4D7775]'}`}>
      <span className="h-0.5 w-8 bg-[#8AE600]" />
      {children}
    </div>
  )
}

export function ConsultHeader() {
  const [open, setOpen] = useState(false)
  const nav = [
    ['Início', '/consult'],
    ['Sobre', '/consult#sobre'],
    ['Serviços', '/consult#areas'],
    ['Blog', '/consult/blog'],
    ['Contato', '/consult#contato'],
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#075653]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/consult" className="flex items-center" aria-label="Página inicial da Consult">
          <img src={LOGO} alt="Consult Radiometria e Qualidade" className="h-12 w-auto max-w-[190px] object-contain" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map(([label, href]) => href.startsWith('/consult#') ? (
            <a key={label} href={href} className="text-sm font-semibold text-white/88 transition hover:text-[#8AE600]">{label}</a>
          ) : (
            <Link key={label} to={href} className="text-sm font-semibold text-white/88 transition hover:text-[#8AE600]">{label}</Link>
          ))}
          <a href={CONSULT_PROJECT.portalUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-white/65 hover:text-white">
            Área do cliente <ExternalLink size={13} />
          </a>
          <a href="/consult#contato" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FF6B26] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-black/10 transition hover:brightness-95">
            <CalendarDays size={17} /> Agende uma reunião
          </a>
        </nav>

        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#064946] px-4 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map(([label, href]) => href.startsWith('/consult#') ? (
              <a key={label} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">{label}</a>
            ) : (
              <Link key={label} to={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">{label}</Link>
            ))}
            <a href={CONSULT_PROJECT.portalUrl} target="_blank" rel="noreferrer" className="rounded-lg px-3 py-3 text-sm font-semibold text-white/70">Área do cliente</a>
            <a href="/consult#contato" onClick={() => setOpen(false)} className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white">
              <CalendarDays size={17} /> Agende uma reunião
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export function ConsultFooter() {
  return (
    <footer className="bg-[#064946] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.3fr_.7fr_.8fr]">
          <div>
            <img src={LOGO} alt="Consult Radiometria e Qualidade" className="h-14 w-auto max-w-[220px] object-contain" />
            <p className="mt-4 max-w-md text-sm leading-7 text-white/65">Medição, ensaio, controle de qualidade, proteção radiológica e Engenharia Clínica com resultado técnico documentado.</p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Navegação</h4>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <Link className="block hover:text-[#8AE600]" to="/consult">Início</Link>
              <a className="block hover:text-[#8AE600]" href="/consult#areas">Serviços</a>
              <Link className="block hover:text-[#8AE600]" to="/consult/blog">Blog</Link>
              <a className="block hover:text-[#8AE600]" href="/consult#contato">Contato</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Cliente Consult</h4>
            <p className="mt-4 text-sm leading-6 text-white/65">Relatórios, entregas, reuniões e acompanhamento ficam em ambiente privado.</p>
            <a href={CONSULT_PROJECT.portalUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#B8FF51] hover:text-white">Acessar área do cliente <ExternalLink size={14} /></a>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Consult Radiometria e Qualidade.</span>
          <span>Ambiente de homologação do novo site</span>
        </div>
      </div>
    </footer>
  )
}

export function ConsultCtaBand({ title = 'Precisa avaliar uma necessidade técnica?', text = 'Converse com a equipe Consult para entender qual serviço, ensaio ou documentação se aplica à sua instituição.' }) {
  const message = encodeURIComponent('Olá, equipe Consult. Gostaria de conversar sobre uma necessidade técnica.')
  return (
    <section className="bg-[#075653] text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 md:grid-cols-[1fr_auto] md:items-center md:px-8 md:py-12">
        <div>
          <ConsultEyebrow light>Próximo passo</ConsultEyebrow>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 md:text-base">{text}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          <a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white"><CalendarDays size={17} /> Agende uma reunião</a>
          <a href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#8AE600]/55 px-5 py-3 text-sm font-bold text-[#B8FF51]"><MessageCircle size={17} /> WhatsApp</a>
        </div>
      </div>
    </section>
  )
}

export function ConsultSiteShell({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans text-[#123C3B]">
      <ConsultHeader />
      {children}
      <ConsultFooter />
    </div>
  )
}
