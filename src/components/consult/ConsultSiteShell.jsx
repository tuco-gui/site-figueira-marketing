import React, { useState } from 'react'
import { ArrowRight, FileText, Menu, MessageCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const CDN = 'https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305'
const LOGO = `${CDN}/68d5471e-43b0-4285-8644-3407ac1e09ff.png`
const WHATSAPP = '5514996710677'

export const CONSULT_COLORS = {
  dark: '#075653', deep: '#064946', green: '#08A77F', mint: '#05D29D', lime: '#8AE600', orange: '#FF6B26', ink: '#123C3B', soft: '#F4FBFA',
}

export function ConsultEyebrow({ children, light = false, center = false }) {
  return <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] ${center ? 'justify-center' : ''} ${light ? 'text-white/70' : 'text-[#4D7775]'}`}><span className="h-0.5 w-8 bg-[#8AE600]" />{children}</div>
}

export function ConsultHeader() {
  const [open, setOpen] = useState(false)
  const nav = [
    ['Início','/consult'],
    ['Sobre','/consult#sobre'],
    ['Serviços','/consult#areas'],
    ['Áreas de atuação','/consult#areas'],
    ['Blog','/consult/blog'],
    ['Cursos','https://consultcursos.herospark.co'],
    ['Portal','https://www.consult.med.br/Portal/'],
  ]
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-[#075653]/95 text-white backdrop-blur" style={{ backgroundColor: 'rgba(7,86,83,.97)', color: '#fff' }}>
    <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link to="/consult" className="flex items-center" aria-label="Página inicial da Consult"><img src={LOGO} alt="Consult Radiometria e Qualidade" className="h-12 w-auto max-w-[190px] object-contain" /></Link>
      <nav className="hidden items-center gap-6 lg:flex">
        {nav.map(([label,href]) => href.startsWith('http')
          ? <a key={label} href={href} target="_blank" rel="noreferrer" className="text-sm font-medium text-white/90 transition hover:text-[#8AE600]">{label}</a>
          : href.startsWith('/consult#')
            ? <a key={label} href={href} className="text-sm font-medium text-white/90 transition hover:text-[#8AE600]">{label}</a>
            : <Link key={label} to={href} className="text-sm font-medium text-white/90 transition hover:text-[#8AE600]">{label}</Link>
        )}
        <a href="/consult#contato" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FF6B26] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-black/10 transition hover:brightness-95">
          <FileText size={16}/> Solicite um orçamento
        </a>
      </nav>
      <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 lg:hidden" onClick={() => setOpen(v => !v)} aria-label="Abrir menu">{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </div>
    {open && <div className="border-t border-white/10 bg-[#064946] px-4 py-5 lg:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-1">
      {nav.map(([label,href]) => href.startsWith('http')
        ? <a key={label} href={href} target="_blank" rel="noreferrer" onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">{label}</a>
        : href.startsWith('/consult#')
          ? <a key={label} href={href} onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">{label}</a>
          : <Link key={label} to={href} onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">{label}</Link>
      )}
      <a href="/consult#contato" onClick={()=>setOpen(false)} className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white"><FileText size={16}/> Solicite um orçamento</a>
    </div></div>}
  </header>
}

export function ConsultFooter() {
  return <footer className="bg-[#064946] text-white">
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.3fr_.8fr_.9fr]">
        <div><img src={LOGO} alt="Consult Radiometria e Qualidade" className="h-14 w-auto max-w-[220px] object-contain"/><p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">Soluções técnicas para a área da saúde, com foco em segurança, qualidade e conformidade.</p></div>
        <div><h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Navegação</h4><div className="mt-4 space-y-2 text-sm text-white/75">
          <Link className="block hover:text-[#8AE600]" to="/consult">Início</Link>
          <a className="block hover:text-[#8AE600]" href="/consult#sobre">Sobre</a>
          <a className="block hover:text-[#8AE600]" href="/consult#areas">Serviços</a>
          <Link className="block hover:text-[#8AE600]" to="/consult/blog">Blog</Link>
          <a className="block hover:text-[#8AE600]" href="https://consultcursos.herospark.co" target="_blank" rel="noreferrer">Cursos</a>
          <a className="block hover:text-[#8AE600]" href="https://www.consult.med.br/Portal/" target="_blank" rel="noreferrer">Portal de Arquivos</a>
          <a className="block hover:text-[#8AE600]" href="/consult#contato">Contato</a>
        </div></div>
        <div><h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Áreas de atuação</h4><div className="mt-4 space-y-2 text-sm text-white/75">
          <Link className="block hover:text-[#8AE600]" to="/consult/fisica-medica">Física Médica</Link>
          <Link className="block hover:text-[#8AE600]" to="/consult/protecao-radiologica">Proteção Radiológica</Link>
          <Link className="block hover:text-[#8AE600]" to="/consult/engenharia-clinica">Engenharia Clínica</Link>
          <Link className="block hover:text-[#8AE600]" to="/consult/normas">Normas e referências</Link>
        </div></div>
      </div>
      <div className="pt-6 text-xs text-white/45">© 2026 Consult Radiometria e Qualidade. Todos os direitos reservados.</div>
    </div>
  </footer>
}

export function ConsultCtaBand({ title = 'Precisa avaliar uma necessidade técnica?', text = 'Converse com a equipe Consult para entender qual serviço, ensaio ou documentação se aplica à sua instituição.' }) {
  const message = encodeURIComponent('Olá, equipe Consult. Gostaria de conversar sobre uma necessidade técnica.')
  return <section className="relative overflow-hidden bg-[#075653] text-white">
    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#05D29D]/18"/><div className="absolute -right-8 bottom-[-100px] h-64 w-64 rounded-full bg-[#8AE600]/16"/>
    <div className="relative mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-8 md:py-14">
      <div><ConsultEyebrow light>Vamos conversar?</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-[-.03em] md:text-4xl">{title}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-white/72 md:text-base">{text}</p></div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white"><FileText size={17}/> Solicite um orçamento <ArrowRight size={15}/></a>
        <a href={`https://wa.me/${WHATSAPP}?text=${message}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#8AE600]/70 px-5 py-3 text-sm font-extrabold text-[#B8FF51]"><MessageCircle size={17}/> WhatsApp</a>
      </div>
    </div>
  </section>
}

export function ConsultSiteShell({ children }) {
  return <div className="min-h-screen bg-white font-sans text-[#123C3B]"><ConsultHeader />{children}<ConsultFooter /></div>
}
