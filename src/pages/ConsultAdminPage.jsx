import React, { useState } from 'react'
import { LogIn, LogOut, ShieldCheck } from 'lucide-react'
import SitePostsAdmin from '@/components/consult/SitePostsAdmin'
import { consultPath } from '@/lib/consultProject'
import {
  isMandatoryPasswordChange,
  loadConsultAdminContext,
  loginConsultAdmin,
  logoutConsultAdmin,
  updateConsultPassword,
  validateNewPassword,
} from '@/lib/consultAdminAuth'

function PasswordChange({ session, onComplete, onLogout }) {
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    const validation = validateNewPassword(password, confirmation)
    if (!validation.valid) { setError(validation.message); return }
    setBusy(true)
    setError('')
    try {
      await updateConsultPassword(session, password)
      onComplete()
    } catch {
      setError('Não foi possível atualizar sua senha. Tente novamente.')
    } finally {
      setBusy(false)
    }
  }

  return <main className="consult-admin-auth"><section className="consult-admin-auth-card"><p className="consult-admin-kicker">Segurança do editorial</p><h1>Atualize sua senha.</h1><p>Por segurança, defina uma senha pessoal antes de continuar.</p><form onSubmit={submit} className="mt-7 space-y-4"><label><span className="consult-admin-label">Nova senha</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} minLength={8} autoComplete="new-password" required className="consult-admin-input" /></label><label><span className="consult-admin-label">Confirmar senha</span><input type="password" value={confirmation} onChange={event => setConfirmation(event.target.value)} minLength={8} autoComplete="new-password" required className="consult-admin-input" /></label>{error && <p role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</p>}<button type="submit" disabled={busy} className="consult-admin-button consult-admin-button-primary w-full">{busy ? 'Atualizando...' : 'Atualizar senha'}</button><button type="button" onClick={onLogout} className="w-full text-sm font-bold text-[#607D7A]">Sair</button></form></section></main>
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const session = await loginConsultAdmin(email, password)
      const context = await loadConsultAdminContext(session)
      onLogin(session, context)
    } catch (err) {
      setError(err.message || 'Não foi possível entrar.')
    } finally {
      setBusy(false)
    }
  }

  return <main className="consult-admin-auth"><section className="consult-admin-auth-card"><div className="flex items-center gap-3 text-[#075653]"><ShieldCheck size={22} /><span className="consult-admin-kicker">Consult editorial</span></div><h1>Área administrativa</h1><p>Entre com sua conta autorizada para revisar e publicar o blog técnico da Consult.</p><form onSubmit={submit} className="mt-7 space-y-4"><label><span className="consult-admin-label">E-mail</span><input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" required className="consult-admin-input" /></label><label><span className="consult-admin-label">Senha</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required className="consult-admin-input" /></label>{error && <p role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</p>}<button type="submit" disabled={busy} className="consult-admin-button consult-admin-button-primary w-full"><LogIn size={16} /> {busy ? 'Entrando...' : 'Entrar'}</button></form></section></main>
}

export default function ConsultAdminPage() {
  const [session, setSession] = useState(null)
  const [context, setContext] = useState(null)

  async function logout() {
    await logoutConsultAdmin(session)
    setSession(null)
    setContext(null)
  }

  if (!session || !context) return <Login onLogin={(nextSession, nextContext) => { setSession(nextSession); setContext(nextContext) }} />
  if (isMandatoryPasswordChange(context.profile, session.user)) return <PasswordChange session={session} onComplete={() => {
    setContext(previous => ({ ...previous, profile: { ...previous.profile, must_change_password: false } }))
    setSession(previous => ({
      ...previous,
      user: {
        ...previous.user,
        user_metadata: { ...(previous.user?.user_metadata || {}), must_change_password: false },
      },
    }))
  }} onLogout={logout} />

  return <main className="min-h-screen bg-[#F4FAF8]"><header className="border-b border-[#D7E8E3] bg-[#075653] text-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8"><div><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#B8FF51]">Consult Radiometria e Qualidade</p><h1 className="mt-1 text-2xl font-black">Administração do blog</h1></div><div className="flex flex-wrap gap-2"><a href={consultPath('blog')} className="consult-admin-header-link">Ver blog público</a><button type="button" onClick={logout} className="consult-admin-header-link"><LogOut size={15} /> Sair</button></div></div></header><div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12"><SitePostsAdmin session={session} client={context.client} project={context.project} profile={context.profile} /></div></main>
}
