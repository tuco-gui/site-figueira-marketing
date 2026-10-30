import { handleError, requireConsultReader, sendJson } from './_lib/auth.js'
import { getGoogleAccessToken } from './_lib/googleOAuth.js'
import { adsCustomerId, runAdsQuery } from './_lib/googleAds.js'

const CLIENT_ID = '0b88061b-676d-48fb-846a-2483b0cf8284'
const PROJECT_ID = '6bf62bce-b7ff-46f1-84e9-07c54689a8e4'
const SITE_URL = 'https://consult.med.br/'
const TOPIC = /radiolog|radiograf|tomograf|mamograf|resson.ncia|imagem m.dica|diagn.stico por imagem|radioprote|prote..o radiol.gica|radia..o|f.sica m.dica|engenharia cl.nica|equipamento m.dico|anvisa|iaea|cnen|ultrassom|medicina nuclear|hemodin.mica|fluoroscopia|qualidade em sa.de|radiometria/i

const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').replace(/[^a-z0-9]+/g, ' ').trim()

async function gscQueries(token, startDate, endDate) {
  const response = await fetch('https://searchconsole.googleapis.com/webmasters/v3/sites/' + encodeURIComponent(SITE_URL) + '/searchAnalytics/query', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate, endDate, dimensions: ['query'], rowLimit: 1000, type: 'web' }),
  })
  const data = await response.json()
  if (!response.ok) {
    const error = new Error(data?.error?.message || 'Search Console não retornou consultas orgânicas.')
    error.status = 502
    throw error
  }
  return data.rows || []
}

async function existingPosts(req) {
  const base = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  const url = base + '/rest/v1/site_posts?client_id=eq.' + CLIENT_ID + '&project_id=eq.' + PROJECT_ID + '&select=title,slug,status,metadata&limit=500'
  const response = await fetch(url, { headers: { apikey: key, Authorization: req.headers.authorization } })
  if (!response.ok) throw Object.assign(new Error('Não foi possível verificar pautas já cadastradas.'), { status: 502 })
  return response.json()
}

function topicMatch(query, rows) {
  const q = normalize(query)
  return rows.some(row => {
    const organic = normalize(row.keys?.[0])
    return organic === q || (q.length > 6 && (organic.includes(q) || q.includes(organic)))
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Método não permitido.' })
  try {
    await requireConsultReader(req)
    const customerId = adsCustomerId()
    const query = "SELECT search_term_view.search_term, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM search_term_view WHERE segments.date DURING LAST_30_DAYS AND metrics.impressions > 0 ORDER BY metrics.clicks DESC LIMIT 200"
    const [ads, token, posts] = await Promise.all([runAdsQuery(query), getGoogleAccessToken(), existingPosts(req)])
    const end = new Date()
    end.setUTCDate(end.getUTCDate() - 3)
    const start = new Date(end)
    start.setUTCDate(start.getUTCDate() - 27)
    const organic = await gscQueries(token, start.toISOString().slice(0, 10), end.toISOString().slice(0, 10))
    const existingTerms = new Set((posts || []).flatMap(post => [
      post.title, post.slug, ...(post.metadata?.keywords || []), ...(post.metadata?.tags || []),
    ]).map(normalize).filter(Boolean))
    const gaps = ads.map(row => {
      const term = row.searchTermView?.searchTerm || ''
      const metrics = row.metrics || {}
      return {
        term,
        impressions: Number(metrics.impressions || 0),
        clicks: Number(metrics.clicks || 0),
        costMicros: Number(metrics.costMicros || 0),
        conversions: Number(metrics.conversions || 0),
      }
    }).filter(row => row.term && TOPIC.test(row.term) && !topicMatch(row.term, organic) && !existingTerms.has(normalize(row.term)))
      .sort((a, b) => (b.clicks * 10 + b.impressions) - (a.clicks * 10 + a.impressions))
      .slice(0, 20)
    return sendJson(res, 200, {
      generatedAt: new Date().toISOString(),
      window: 'Últimos 30 dias',
      adsCustomerId: customerId,
      searchTermsChecked: ads.length,
      organicQueriesChecked: organic.length,
      gaps,
      message: gaps.length ? null : 'Nenhum termo de busca pago relacionado ao nicho da Consult ficou sem cobertura orgânica no período, ou ainda faltam credenciais de leitura.',
    })
  } catch (error) {
    return handleError(res, error)
  }
}
