import { CONSULT_PROJECT } from './consultProject.js'
import { getSitePostPermissions } from './sitePostsAdminApi.js'

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY

function requireConfig() {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('O acesso editorial da Consult não está configurado.')
}

function headers(token) {
  return {
    apikey: SUPABASE_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  }
}

async function parse(response) {
  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  if (response.ok) return data
  if (response.status === 401) throw new Error('E-mail ou senha inválidos.')
  throw new Error(data?.msg || data?.message || data?.error_description || 'Não foi possível concluir a autenticação.')
}

export function validateNewPassword(password, confirmation) {
  if (String(password || '').length < 8) return { valid: false, message: 'A senha precisa ter pelo menos 8 caracteres.' }
  if (password !== confirmation) return { valid: false, message: 'As senhas não coincidem.' }
  return { valid: true, message: '' }
}

export function isMandatoryPasswordChange(profile = {}, authUser = {}) {
  return profile.must_change_password === true || authUser?.user_metadata?.must_change_password === true
}

export async function loginConsultAdmin(email, password) {
  requireConfig()
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email: String(email || '').trim(), password }),
  })
  const data = await parse(response)
  if (!data?.access_token || !data?.user?.id) throw new Error('Não foi possível iniciar a sessão.')
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    user: data.user,
  }
}

export async function loadConsultAdminContext(session) {
  requireConfig()
  if (!session?.access_token || !session?.user?.id) throw new Error('Sessão inválida.')
  const userId = encodeURIComponent(session.user.id)
  const profileResponse = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=id,email,full_name,platform_role,is_active,must_change_password,password_changed_at`, {
    headers: headers(session.access_token),
  })
  const profile = (await parse(profileResponse))?.[0]
  if (!profile || profile.is_active === false) throw new Error('Seu acesso está desativado.')

  const membershipResponse = await fetch(`${SUPABASE_URL}/rest/v1/client_users?user_id=eq.${userId}&client_id=eq.${CONSULT_PROJECT.clientId}&is_active=eq.true&select=client_id,role,is_active`, {
    headers: headers(session.access_token),
  })
  const memberships = (await parse(membershipResponse)) || []
  const enrichedProfile = { ...profile, memberships, role: profile.platform_role }
  const client = { id: CONSULT_PROJECT.clientId, slug: CONSULT_PROJECT.clientSlug, name: 'Consult Radiometria e Qualidade' }
  const project = { id: CONSULT_PROJECT.projectId, client_id: CONSULT_PROJECT.clientId, slug: 'site-consult', name: 'Site Consult' }
  const permissions = getSitePostPermissions({ profile: enrichedProfile, client, project })
  if (!permissions.canRead) throw new Error('Você não tem acesso ao conteúdo editorial da Consult.')

  return { profile: enrichedProfile, client, project, permissions }
}

export async function updateConsultPassword(session, password) {
  requireConfig()
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: 'PUT',
    headers: headers(session.access_token),
    body: JSON.stringify({ password, data: { ...(session.user?.user_metadata || {}), must_change_password: false } }),
  })
  await parse(response)
  const rpcResponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/complete_first_access`, {
    method: 'POST',
    headers: headers(session.access_token),
    body: JSON.stringify({}),
  })
  const changed = await parse(rpcResponse)
  if (changed !== true) throw new Error('Não foi possível concluir a atualização de segurança.')
}

export async function logoutConsultAdmin(session) {
  if (!session?.access_token || !SUPABASE_URL || !SUPABASE_KEY) return
  await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: 'POST', headers: headers(session.access_token) })
}
