let cachedToken = ''
let expiresAt = 0

export async function getAdsAccessToken() {
  if (cachedToken && Date.now() < expiresAt - 60_000) return cachedToken
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN
  if (!clientId || !clientSecret || !refreshToken) {
    const error = new Error('Google Ads está conectado ao Gateway, mas faltam credenciais próprias do site: GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET e GOOGLE_ADS_REFRESH_TOKEN.')
    error.status = 503
    throw error
  }
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token' }),
  })
  const payload = await response.json()
  if (!response.ok || !payload.access_token) {
    const error = new Error('O Google não autorizou as credenciais OAuth do Ads configuradas no site.')
    error.status = 502
    throw error
  }
  cachedToken = payload.access_token
  expiresAt = Date.now() + Number(payload.expires_in || 3600) * 1000
  return cachedToken
}

export async function runAdsQuery(query) {
  if (process.env.FIGUEIRA_INTEGRATIONS_API_URL && process.env.FIGUEIRA_INTEGRATIONS_API_KEY && /FROM campaign\b/i.test(query)) {
    const range = query.match(/segments\.date BETWEEN '([0-9-]{10})' AND '([0-9-]{10})'/i)
    const p = new URLSearchParams({customer_id:adsCustomerId()})
    if(range) { p.set('start_date',range[1]);p.set('end_date',range[2]) }
    p.set('limit','50')
    const response=await fetch(process.env.FIGUEIRA_INTEGRATIONS_API_URL.replace(/\/$/,'')+'/v1/google-ads/campaigns?'+p.toString(),{
      headers:{Authorization:'Bearer '+process.env.FIGUEIRA_INTEGRATIONS_API_KEY},
      signal:AbortSignal.timeout(25000),
    })
    if(!response.ok) throw new Error('Figueira Gateway Ads retornou HTTP '+response.status)
    const payload=await response.json()
    if(!Array.isArray(payload.data?.campaigns)) throw new Error('Resposta Google Ads inválida do Gateway')
    return payload.data.campaigns.map(c=>({
      campaign:{id:c.campaign_id,name:c.campaign_name,status:c.status},
      metrics:{impressions:c.impressions,clicks:c.clicks,costMicros:Math.round(Number(c.cost_BRL||0)*1e6),conversions:c.conversions},
    }))
  }
  const customerId = String(process.env.GOOGLE_ADS_CUSTOMER_ID || '9614110878').replace(/-/g, '')
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  if (!developerToken) {
    const error = new Error('Falta configurar GOOGLE_ADS_DEVELOPER_TOKEN no ambiente seguro do site.')
    error.status = 503
    throw error
  }
  const token = await getAdsAccessToken()
  const headers = { Authorization: 'Bearer ' + token, 'developer-token': developerToken, 'Content-Type': 'application/json' }
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID
  if (loginCustomerId) headers['login-customer-id'] = loginCustomerId.replace(/-/g, '')
  const response = await fetch('https://googleads.googleapis.com/v25/customers/' + customerId + '/googleAds:searchStream', {
    method: 'POST', headers, body: JSON.stringify({ query }),
  })
  const payload = await response.json()
  if (!response.ok) {
    const error = new Error(payload?.error?.message || 'Google Ads não retornou o relatório solicitado.')
    error.status = 502
    throw error
  }
  return (Array.isArray(payload) ? payload : [payload]).flatMap(batch => batch.results || [])
}

export function adsCustomerId() {
  return String(process.env.GOOGLE_ADS_CUSTOMER_ID || '9614110878').replace(/-/g, '')
}
