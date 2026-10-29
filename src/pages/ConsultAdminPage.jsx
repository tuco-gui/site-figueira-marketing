import React, { useEffect, useState } from 'react'
import { LogIn, LogOut, ShieldCheck } from 'lucide-react'
import ConsultAdminWorkspace from '@/components/consult/ConsultAdminWorkspace'
import { consultPath } from '@/lib/consultProject'
import {
  isMandatoryPasswordChange,
  loadConsultAdminContext,
  loginConsultAdmin,
  logoutConsultAdmin,
  requestConsultAdminPasswordRecovery,
  resumeConsultAdminPasswordRecovery,
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
  const [mode, setMode] = useState('login')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [recoverySent, setRecoverySent] = useState(false)

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

  async function requestRecovery(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setRecoverySent(false)
    try {
      await requestConsultAdminPasswordRecovery(email)
      setRecoverySent(true)
    } catch (err) {
      setError(err.message || 'Não foi possível solicitar o link. Tente novamente.')
    } finally {
      setBusy(false)
    }
  }

  const isRecovery = mode === 'recovery'
  return <main className="consult-admin-auth"><section className="consult-admin-auth-card"><div className="flex items-center gap-3 text-[#075653]"><ShieldCheck size={22} /><span className="consult-admin-kicker">Consult editorial</span></div><h1>Área administrativa</h1><p>{isRecovery ? 'Informe seu e-mail para receber um link seguro de primeiro acesso ou redefinição de senha.' : 'Entre com sua conta autorizada para revisar e publicar o blog técnico da Consult.'}</p><form onSubmit={isRecovery ? requestRecovery : submit} className="mt-7 space-y-4"><label><span className="consult-admin-label">E-mail</span><input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" required className="consult-admin-input" /></label>{!isRecovery && <label><span className="consult-admin-label">Senha</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required className="consult-admin-input" /></label>}{error && <p role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</p>}{isRecovery && recoverySent && <p role="status" aria-live="polite" className="consult-admin-alert">Se o e-mail corresponder a uma conta ativa, enviaremos um link de acesso.</p>}<button type="submit" disabled={busy} className="consult-admin-button consult-admin-button-primary w-full">{isRecovery ? (busy ? 'Enviando link...' : 'Enviar link por e-mail') : <><LogIn size={16} /> {busy ? 'Entrando...' : 'Entrar'}</>}</button><button type="button" onClick={() => { setMode(isRecovery ? 'login' : 'recovery'); setError(''); setRecoverySent(false) }} className="w-full text-sm font-bold text-[#075653]">{isRecovery ? 'Voltar para o login' : 'Primeiro acesso / Esqueci a senha'}</button></form></section></main>
}

function readRecoveryTokens() {
  if (typeof window === 'undefined') return null
  const fragment = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
  const params = new URLSearchParams(fragment)
  const accessToken = params.get('access_token')
  if (params.get('type') !== 'recovery' || !accessToken) return null
  return { accessToken, refreshToken: params.get('refresh_token') || '' }
}

export default function ConsultAdminPage() {
  const [session, setSession] = useState(null)
  const [context, setContext] = useState(null)
  const [recoveryTokens] = useState(readRecoveryTokens)
  const [recoveryStatus, setRecoveryStatus] = useState(recoveryTokens ? 'loading' : 'idle')
  const [recoveryError, setRecoveryError] = useState('')

  useEffect(() => {
    if (!recoveryTokens) return undefined
    let active = true
    async function resumeRecovery() {
      try {
        const nextSession = await resumeConsultAdminPasswordRecovery(recoveryTokens.accessToken, recoveryTokens.refreshToken)
        const nextContext = await loadConsultAdminContext(nextSession)
        if (active) {
          setSession(nextSession)
          setContext(nextContext)
          setRecoveryStatus('ready')
        }
      } catch (error) {
        if (active) {
          setRecoveryError(error.message || 'O link expirou ou não é válido. Solicite outro link de primeiro acesso.')
          setRecoveryStatus('error')
        }
      } finally {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search)
      }
    }
    resumeRecovery()
    return () => { active = false }
  }, [recoveryTokens])

  async function logout() {
    await logoutConsultAdmin(session)
    setSession(null)
    setContext(null)
  }

  if (recoveryStatus === 'loading') return <main className="consult-admin-auth"><section className="consult-admin-auth-card"><p className="consult-admin-kicker">Consult editorial</p><h1>Validando seu link...</h1><p>Aguarde enquanto confirmamos seu acesso.</p></section></main>
  if (recoveryStatus === 'error') return <main className="consult-admin-auth"><section className="consult-admin-auth-card"><p className="consult-admin-kicker">Consult editorial</p><h1>Não foi possível abrir o link.</h1><p role="alert" className="consult-admin-alert consult-admin-alert-error">{recoveryError}</p><a href={consultPath('admin')} className="consult-admin-button consult-admin-button-primary mt-5 w-full">Voltar ao login</a></section></main>
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

  const officialConsultHost = typeof window !== 'undefined' && ['consult.med.br', 'www.consult.med.br'].includes(window.location.hostname)
  if (!officialConsultHost) {
    return <ConsultAdminWorkspace session={session} client={context.client} project={context.project} profile={context.profile} onLogout={logout} />
  }

  return <main className="min-h-screen bg-[#F4FAF8]"><header className="border-b border-[#D7E8E3] bg-[#075653] text-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8"><div><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#B8FF51]">Consult Radiometria e Qualidade</p><h1 className="mt-1 text-2xl font-black">Administração do blog</h1></div><div className="flex flex-wrap gap-2"><a href={consultPath('blog')} className="consult-admin-header-link">Ver blog público</a><button type="button" onClick={logout} className="consult-admin-header-link"><LogOut size={15} /> Sair</button></div></div></header><div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12"><SitePostsAdmin session={session} client={context.client} project={context.project} profile={context.profile} /></div></main>
}
