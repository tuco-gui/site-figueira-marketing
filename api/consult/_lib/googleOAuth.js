import { createSign } from 'node:crypto'

let cachedAccessToken = ''
let tokenExpiresAt = 0

function base64url(value) {
  return Buffer.from(value).toString('base64url')
}

export async function getGoogleAccessToken() {
  if (cachedAccessToken && Date.now() < tokenExpiresAt - 60_000) return cachedAccessToken
  const email = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !privateKey) {
    const error = new Error('A leitura ao Google precisa de uma credencial técnica configurada no ambiente seguro do site.')
    error.status = 503
    throw error
  }
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = base64url(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }))
  const unsigned = `${header}.${claim}`
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  signer.end()
  const assertion = `${unsigned}.${signer.sign(privateKey, 'base64url')}`
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  })
  const payload = await response.json()
  if (!response.ok || !payload.access_token) {
    const error = new Error('O Google não autorizou a credencial técnica configurada para leitura.')
    error.status = 502
    throw error
  }
  cachedAccessToken = payload.access_token
  tokenExpiresAt = Date.now() + Number(payload.expires_in || 3600) * 1000
  return cachedAccessToken
}
