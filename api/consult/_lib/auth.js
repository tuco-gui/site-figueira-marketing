const CLIENT_ID = '0b88061b-676d-48fb-846a-2483b0cf8284'

export async function requireConsultReader(req) {
  const authorization = req.headers.authorization || ''
  const token = authorization.replace(/^Bearer\s+/i, '').trim()
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  if (!token || !supabaseUrl || !supabaseKey) {
    const error = new Error('Sessão ou configuração do Supabase indisponível.')
    error.status = 401
    throw error
  }

  const headers = { apikey: supabaseKey, Authorization: `Bearer ${token}` }
  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, { headers })
  if (!userResponse.ok) {
    const error = new Error('Sua sessão expirou. Entre novamente no portal Consult.')
    error.status = 401
    throw error
  }
  const user = await userResponse.json()
  if (!user?.id) {
    const error = new Error('Sua sessão não contém um usuário válido.')
    error.status = 401
    throw error
  }
  const userId = encodeURIComponent(user.id)
  const [profileResponse, membershipResponse] = await Promise.all([
    fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=id,platform_role,is_active`, { headers }),
    fetch(`${supabaseUrl}/rest/v1/client_users?user_id=eq.${userId}&client_id=eq.${CLIENT_ID}&is_active=eq.true&select=role`, { headers }),
  ])
  if (!profileResponse.ok || !membershipResponse.ok) {
    const error = new Error('Não foi possível confirmar seu acesso ao espaço da Consult.')
    error.status = 403
    throw error
  }
  const [profiles, memberships] = await Promise.all([profileResponse.json(), membershipResponse.json()])
  const profile = profiles[0]
  const allowed = Boolean(profile) && profile.is_active !== false && (
    ['admin', 'staff'].includes(profile?.platform_role) || memberships.length > 0
  )
  if (!allowed) {
    const error = new Error('Seu usuário não tem acesso ao espaço da Consult.')
    error.status = 403
    throw error
  }
  return user
}

export function sendJson(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'private, no-store')
  return res.end(JSON.stringify(body))
}

export function handleError(res, error) {
  const status = Number(error?.status) || 502
  return sendJson(res, status, { error: error?.message || 'Falha ao consultar a fonte.' })
}
