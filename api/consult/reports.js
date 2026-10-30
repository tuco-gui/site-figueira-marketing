import { handleError, requireConsultReader, sendJson } from './_lib/auth.js'
import { getGoogleAccessToken } from './_lib/googleOAuth.js'

const SITE_URL = 'https://consult.med.br/'
const GA4_PROPERTY_ID = process.env.GOOGLE_GA4_PROPERTY_ID || '559383890'

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

function reportWindow() {
  const end = new Date()
  end.setUTCDate(end.getUTCDate() - 3)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 27)
  return { startDate: isoDate(start), endDate: isoDate(end) }
}

async function googleJson(url, token, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(options.headers || {}) },
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.error?.message || `Google API respondeu HTTP ${response.status}.`)
  return payload
}

async function searchAnalytics(token, window, dimensions, limit = 25) {
  const payload = await googleJson('https://searchconsole.googleapis.com/webmasters/v3/sites/' + encodeURIComponent(SITE_URL) + '/searchAnalytics/query', token, {
    method: 'POST',
    body: JSON.stringify({ ...window, dimensions, rowLimit: limit, type: 'web' }),
  })
  return (payload.rows || []).map(row => ({
    key: row.keys?.[0] || '',
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    ctr: Number(row.ctr || 0),
    position: Number(row.position || 0),
  }))
}

async function ga4Report(token, window, dimensions = []) {
  const metrics = ['sessions', 'totalUsers', 'screenPageViews', 'engagedSessions', 'keyEvents']
  const payload = await googleJson(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(GA4_PROPERTY_ID)}:runReport`, token, {
    method: 'POST',
    body: JSON.stringify({
      dateRanges: [{ startDate: window.startDate, endDate: window.endDate }],
      dimensions: dimensions.map(name => ({ name })),
      metrics: metrics.map(name => ({ name })),
      limit: 25,
      orderBys: dimensions.length ? [{ dimension: { dimensionName: dimensions[0] } }] : [],
    }),
  })
  const toRow = row => ({
    key: row.dimensionValues?.[0]?.value || 'Total',
    sessions: Number(row.metricValues?.[0]?.value || 0),
    users: Number(row.metricValues?.[1]?.value || 0),
    pageViews: Number(row.metricValues?.[2]?.value || 0),
    engagedSessions: Number(row.metricValues?.[3]?.value || 0),
    keyEvents: Number(row.metricValues?.[4]?.value || 0),
  })
  return { total: toRow(payload.rows?.[0] || {}), rows: (payload.rows || []).map(toRow) }
}

async function sourceCall(fn) {
  try { return { status: 'available', data: await fn() } }
  catch (error) { return { status: 'unavailable', error: error.message || 'Falha na consulta.' } }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Método não permitido.' })
  try {
    await requireConsultReader(req)
    const token = await getGoogleAccessToken()
    const window = reportWindow()
    const [ga4, channels, gscTotals, queries, pages] = await Promise.all([
      sourceCall(() => ga4Report(token, window)),
      sourceCall(() => ga4Report(token, window, ['sessionDefaultChannelGroup'])),
      sourceCall(() => searchAnalytics(token, window, [], 1)),
      sourceCall(() => searchAnalytics(token, window, ['query'])),
      sourceCall(() => searchAnalytics(token, window, ['page'])),
    ])
    return sendJson(res, 200, {
      generatedAt: new Date().toISOString(),
      window,
      ga4: ga4.status === 'available' ? { status: 'available', ...ga4.data } : ga4,
      channels: channels.status === 'available' ? channels.data.rows : [],
      searchConsole: {
        status: [gscTotals, queries, pages].some(source => source.status === 'available') ? 'available' : 'unavailable',
        totals: gscTotals.status === 'available' ? gscTotals.data[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 } : null,
        queries: queries.status === 'available' ? queries.data : [],
        pages: pages.status === 'available' ? pages.data : [],
        totalsError: gscTotals.status === 'unavailable' ? gscTotals.error : null,
        queryError: queries.status === 'unavailable' ? queries.error : null,
        pageError: pages.status === 'unavailable' ? pages.error : null,
      },
      ads: { status: 'awaiting_mcc_link', message: 'Conta de Ads ainda não vinculada à MCC; sem relatório de campanhas neste painel.' },
    })
  } catch (error) {
    return handleError(res, error)
  }
}
