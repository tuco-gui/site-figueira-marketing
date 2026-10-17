import React, { useState } from 'react'
import { ArrowRight, ChevronDown, FileText, Menu, MessageCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import ConsultCookieNotice from './ConsultCookieNotice'

const LOGO = '/consult/logo-oficial.png'
const WHATSAPP = '5514981610712'

export const CONSULT_COLORS = {
  dark: '#075653', deep: '#064946', green: '#08A77F', mint: '#05D29D', lime: '#8AE600', orange: '#FF6B26', ink: '#123C3B', soft: '#F4FBFA',
}

export function ConsultEyebrow({ children, light = false, center = false }) {
  return <div className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] ${center ? 'justify-center' : ''} ${light ? 'text-white/70' : 'text-[#4D7775]'}`}><span className="h-0.5 w-8 bg-[#8AE600]" />{children}</div>
}


// Acesso rápido solicitado pela Consult em 09/10/2026.
// O item "Serviços" do cabeçalho continua levando ao catálogo completo.
export const CONSULT_DIRECT_SERVICES = [
  { heading: 'Física Médica', links: [
    ['Controle de Qualidade', '/consult/fisica-medica/controle-de-qualidade'],
  ] },
  { heading: 'Proteção Radiológica', links: [
    ['Levantamento radiométrico', '/consult/protecao-radiologica/levantamento-radiometrico'],
    ['Projeto de blindagem', '/consult/protecao-radiologica/projeto-blindagem'],
    ['Programas (PPR/PGQ/PEP)', '/consult/protecao-radiologica/programas'],
    ['Licenciamento', '/consult/protecao-radiologica/licenciamento-sanitario'],
    ['Treinamentos', '/consult/protecao-radiologica/treinamentos'],
  ] },
  { heading: 'Consult Engenharia Clínica', links: [
    ['Segurança elétrica', '/consult/engenharia-clinica/seguranca-eletrica'],
    ['Ensaio de desempenho', '/consult/engenharia-clinica/desempenho-calibracao'],
    ['Manutenção preventiva', '/consult/engenharia-clinica/manutencao-preventiva'],
    ['Qualificação térmica', '/consult/engenharia-clinica/qualificacao-termica'],
  ] },
]
export const CONSULT_DIRECT_AREAS = [
  ['Física Médica', '/consult/fisica-medica'],
  ['Proteção Radiológica', '/consult/protecao-radiologica'],
  ['Consult Engenharia Clínica', '/consult/engenharia-clinica'],
]

export function ConsultServiceQuickLinks({ mobile = false, onNavigate = () => {} }) {
  const go = (event) => {
    event.currentTarget.closest('details')?.removeAttribute('open')
    onNavigate()
  }
  return <details className={mobile ? 'group rounded-lg' : 'group relative'}>
    <summary
      aria-label={mobile ? 'Mostrar acesso direto aos serviços' : 'Abrir lista de serviços'}
      className={mobile
        ? 'flex min-h-11 cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5 [&::-webkit-details-marker]:hidden'
        : 'flex h-11 w-7 cursor-pointer list-none items-center justify-center rounded-md text-white/90 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8AE600] [&::-webkit-details-marker]:hidden'}
    >
      {mobile && <span>Acesso direto aos serviços</span>}
      <ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden="true"/>
    </summary>
    <div className={mobile
      ? 'mb-3 rounded-xl border border-white/15 bg-[#075653] px-3 py-4'
      : 'absolute left-1/2 top-full z-[80] mt-2 max-h-[calc(100dvh-6rem)] w-[620px] max-w-[calc(100vw-3rem)] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-[#D5E9E3] bg-white p-5 text-[#123C3B] shadow-2xl'}>
      <Link to="/consult/servicos" onClick={go} className={mobile ? 'block rounded-lg px-2 py-2 text-sm font-bold text-[#B8FF51]' : 'block rounded-lg bg-[#EAF6F1] px-3 py-2 text-sm font-extrabold text-[#075653] hover:bg-[#D7F1E5]'}>
        Ver catálogo completo de serviços
      </Link>
      <div className={mobile ? 'mt-3 grid gap-4' : 'mt-4 grid grid-cols-3 gap-5'}>
        {CONSULT_DIRECT_SERVICES.map((group) => <section key={group.heading}>
          <p className={mobile ? 'mb-2 px-2 text-xs font-black uppercase tracking-wide text-[#B8FF51]' : 'mb-2 text-xs font-black uppercase tracking-wide text-[#075653]'}>{group.heading}</p>
          {group.links.map(([label, href]) => <Link key={href} to={href} onClick={go} className={mobile
            ? 'block rounded-md px-2 py-2 text-sm leading-5 text-white/90 hover:bg-white/10'
            : 'block rounded-md px-2 py-2 text-sm leading-5 text-[#315B58] hover:bg-[#F0F8F4]'}>
            {label}
          </Link>)}
        </section>)}
      </div>
      <div className={mobile ? 'mt-3 border-t border-white/15 pt-3' : 'mt-4 border-t border-[#D5E9E3] pt-3'}>
        <p className={mobile ? 'px-2 text-xs font-bold text-[#B8FF51]' : 'text-xs font-bold text-[#075653]'}>Áreas de atuação</p>
        <div className={mobile ? 'mt-2 grid gap-1' : 'mt-2 grid grid-cols-3 gap-2'}>
          {CONSULT_DIRECT_AREAS.map(([label, href]) => <Link key={href} to={href} onClick={go} className={mobile
            ? 'block rounded-md px-2 py-2 text-sm text-white/85 hover:bg-white/10'
            : 'block rounded-md px-2 py-2 text-xs font-semibold text-[#315B58] hover:bg-[#F0F8F4]'}>
            {label}
          </Link>)}
        </div>
      </div>
    </div>
  </details>
}

function ConsultHorizontalBrand() {
  return <span className="inline-flex items-center gap-2.5 text-white">
    <img src="/consult/logo-simbolo-oficial.png" alt="" aria-hidden="true" width="44" height="48" className="h-12 w-11 shrink-0 object-contain"/>
    <span><span className="block text-[27px] font-extrabold leading-none tracking-tight">Consult</span><span className="mt-1.5 block text-[7px] font-medium uppercase tracking-[.18em]">Radiometria e Qualidade</span></span>
  </span>
}

export function ConsultHeader({ horizontalBrand = true }) {
  const [open, setOpen] = useState(false)
  const nav = [
    ['Início','/consult'],
    ['Sobre','/consult/sobre'],
    ['Serviços','/consult/servicos'],
    ['Blog','/consult/blog'],
    ['Cursos','https://consultcursos.herospark.co'],
    ['Portal','https://www.consult.med.br/Portal/'],
    ['Contato','/consult#contato'],
  ]
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-[#075653]/95 text-white backdrop-blur" style={{ backgroundColor: 'rgba(7,86,83,.97)', color: '#fff' }}>
    <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link to="/consult" className="flex items-center" aria-label="Página inicial da Consult">{horizontalBrand ? <ConsultHorizontalBrand/> : <img src={LOGO} alt="Consult Radiometria e Qualidade" className="h-12 w-auto max-w-[190px] object-contain" />}</Link>
      <nav className={`hidden items-center gap-6 xl:flex`}>
        {nav.map(([label,href]) => label === 'Serviços'
          ? <div key={label} className="flex items-center gap-0"><Link to={href} className="text-sm font-medium text-white/90 transition hover:text-[#8AE600]">Serviços</Link><ConsultServiceQuickLinks/></div>
          : href.startsWith('http')
            ? <a key={label} href={href} target="_blank" rel="noreferrer" className="text-sm font-medium text-white/90 transition hover:text-[#8AE600]">{label}</a>
            : href.startsWith('/consult#')
              ? <a key={label} href={href} className="text-sm font-medium text-white/90 transition hover:text-[#8AE600]">{label}</a>
              : <Link key={label} to={href} className="text-sm font-medium text-white/90 transition hover:text-[#8AE600]">{label}</Link>
        )}
        <a href="/consult#contato" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#FF6B26] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-black/10 transition hover:brightness-95">
          <FileText size={16}/> Solicite um orçamento
        </a>
      </nav>
      <button type="button" className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 xl:hidden`} onClick={() => setOpen(v => !v)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="consult-internal-mobile-menu">{open ? <X size={20}/> : <Menu size={20}/>}</button>
    </div>
    {open && <div id="consult-internal-mobile-menu" className={`max-h-[calc(100dvh-73px)] overflow-y-auto overscroll-contain border-t border-white/10 bg-[#064946] px-4 py-5 xl:hidden`}><div className="mx-auto flex max-w-7xl flex-col gap-1">
      {nav.map(([label,href]) => label === 'Serviços'
        ? <div key={label}><Link to={href} onClick={()=>setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">Serviços</Link><ConsultServiceQuickLinks mobile onNavigate={()=>setOpen(false)}/></div>
        : href.startsWith('http')
          ? <a key={label} href={href} target="_blank" rel="noreferrer" onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">{label}</a>
          : href.startsWith('/consult#')
            ? <a key={label} href={href} onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">{label}</a>
            : <Link key={label} to={href} onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/5">{label}</Link>
      )}
      <a href="/consult#contato" onClick={()=>setOpen(false)} className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white"><FileText size={16}/> Solicite um orçamento</a>
    </div></div>}
  </header>
}

export function ConsultFooter({ horizontalBrand = true }) {
  return <footer className="bg-[#064946] text-white">
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_.7fr_.8fr_1.2fr]">
        <div>{horizontalBrand ? <ConsultHorizontalBrand/> : <img src={LOGO} alt="Consult Radiometria e Qualidade" className="h-14 w-auto max-w-[220px] object-contain"/>}<p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">Soluções técnicas para a área da saúde, com foco em segurança, qualidade e conformidade.</p></div>
        <div><h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Navegação</h4><div className="mt-4 space-y-2 text-sm text-white/75">
          <Link className="block hover:text-[#8AE600]" to="/consult">Início</Link>
          <Link className="block hover:text-[#8AE600]" to="/consult/sobre">Sobre</Link>
          <Link className="block hover:text-[#8AE600]" to="/consult/servicos">Serviços</Link>
          <Link className="block hover:text-[#8AE600]" to="/consult/blog">Blog</Link>
          <a className="block hover:text-[#8AE600]" href="https://consultcursos.herospark.co" target="_blank" rel="noreferrer">Cursos</a>
          <a className="block hover:text-[#8AE600]" href="https://www.consult.med.br/Portal/" target="_blank" rel="noreferrer">Portal de Arquivos</a>
          <a className="block hover:text-[#8AE600]" href="/consult#contato">Contato</a>
        </div></div>
        <div><h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Áreas de atuação</h4><div className="mt-4 space-y-2 text-sm text-white/75">
          <Link className="block hover:text-[#8AE600]" to="/consult/fisica-medica">Física Médica</Link>
          <Link className="block hover:text-[#8AE600]" to="/consult/protecao-radiologica">Proteção Radiológica</Link>
          <Link className="block hover:text-[#8AE600]" to="/consult/engenharia-clinica">Consult Engenharia Clínica</Link>
          <Link className="block hover:text-[#8AE600]" to="/consult/normas">Normas e referências</Link>
        </div></div>
        <div><h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Contato</h4><div className="mt-4 space-y-2 text-sm leading-6 text-white/75">
          <p>Sede: Matão/SP</p>
          <p>Atendimento: Av. Dr. Vital Brasil, 1060, sala 205 – Botucatu Home Trade Center, Botucatu/SP</p>
          <a className="block hover:text-[#8AE600]" href="tel:+5514981610712">(14) 98161-0712</a>
          <a className="block hover:text-[#8AE600]" href="mailto:radiometria@consult.med.br">radiometria@consult.med.br</a>
          <p>Atendimento: 8h às 17h</p>
        </div></div>
      </div>
      <div className="flex flex-col gap-2 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Consult Radiometria e Qualidade S/S. Todos os direitos reservados.</span><Link className="hover:text-white" to="/consult/politica-de-privacidade">Política de Privacidade</Link><button type="button" onClick={() => window.dispatchEvent(new Event("consult:open-cookie-settings"))} className="text-left hover:text-white">Preferências de cookies</button></div>
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

export function ConsultSiteShell({ children, horizontalBrand = true }) {
  return <div className="min-h-screen bg-white font-sans text-[#123C3B]"><ConsultHeader horizontalBrand={horizontalBrand}/>{children}<ConsultFooter horizontalBrand={horizontalBrand}/><ConsultCookieNotice/></div>
}
