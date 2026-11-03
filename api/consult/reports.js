import { handleError, requireConsultReader, sendJson } from './_lib/auth.js'
import { getGoogleAccessToken } from './_lib/googleOAuth.js'
import { adsCustomerId, runAdsQuery } from './_lib/googleAds.js'

const SITE_URL = 'https://consult.med.br/'
const GA4_PROPERTY_ID = process.env.GOOGLE_GA4_PROPERTY_ID || '559383890'

function isoDate(date) {
  return date.toISOString().slice(0, 10)
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && isoDate(date) === value
}

function reportWindow(req) {
  const latest = new Date()
  latest.setUTCDate(latest.getUTCDate() - 3)
  const latestDate = isoDate(latest)
  const requestedEnd = req.query?.endDate
  const endDate = validDate(requestedEnd) && requestedEnd < latestDate ? requestedEnd : latestDate
  const start = new Date(`${endDate}T00:00:00Z`)
  const requestedStart = req.query?.startDate
  if (validDate(requestedStart) && requestedStart <= endDate) {
    const earliestAllowed = new Date(start)
    earliestAllowed.setUTCDate(earliestAllowed.getUTCDate() - 729)
    if (requestedStart >= isoDate(earliestAllowed)) return { startDate: requestedStart, endDate }
  }
  start.setUTCDate(start.getUTCDate() - 29)
  return { startDate: isoDate(start), endDate }
}

async function googleJson(url, token, options = {}) {
  if (token === 'figueira_gateway') {
    const base = process.env.FIGUEIRA_INTEGRATIONS_API_URL?.replace(/\/$/, '')
    const key = process.env.FIGUEIRA_INTEGRATIONS_API_KEY
    if (!base || !key) throw new Error('Integração Figueira indisponível.')
    const body = JSON.parse(options.body || '{}')
    const query = new URLSearchParams()
    const start = body.dateRanges?.[0]?.startDate || body.startDate
    const end = body.dateRanges?.[0]?.endDate || body.endDate
    if(start) query.set('start_date', start)
    if(end) query.set('end_date', end)
    let route
    let dims = []
    let metrics = []
    if(url.includes('analyticsdata.googleapis.com')) {
      route = '/v1/ga4/report'
      query.set('property_id', GA4_PROPERTY_ID)
      dims = (body.dimensions || []).map(d => d.name)
      metrics = (body.metrics || []).map(m => m.name)
      query.set('dimensions',dims.join(','))
      query.set('metrics',metrics.join(','))
    } else if (url.includes('searchAnalytics/query')) {
      route = '/v1/search-console/queries'
      query.set('site_url','sc-domain:consult.med.br')
      dims = body.dimensions || []
      query.set('dimensions', dims.length ? dims.join(',') : 'none')
      query.set('limit',String(Math.min(body.rowLimit || 25, 500)))
    } else throw new Error('Rota Google não suportada pelo Gateway.')
    const response = await fetch(base + route + '?' + query.toString(), {
      headers: { Authorization: 'Bearer ' + key },
      signal: AbortSignal.timeout(25000),
    })
    if (!response.ok) throw new Error('Figueira Gateway retornou HTTP ' + response.status)
    const envelope = await response.json()
    const data = envelope.data
    if(!data || typeof data !== 'object' || typeof data.message === 'string' && /^❌/.test(data.message))
      throw new Error('Relatório indisponível no Gateway.')
    if(route === '/v1/ga4/report') return {
      rows: (data.rows || []).map(row=>({
        dimensionValues:dims.map(k=>({value:String(row[k] || '')})),
        metricValues:metrics.map(k=>({value:String(row[k] || 0)})),
      }))
    }
    return {rows:(data.rows || []).map(row=>({
      keys:dims.map(k=>String(row[k] || '')),
      clicks:Number(row.clicks || 0),
      impressions:Number(row.impressions || 0),
      ctr:Number(row.ctr_pct || 0)/100,
      position:Number(row.position || 0)
    }))}
  }
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
  const metrics = ['sessions', 'totalUsers', 'screenPageViews', 'engagedSessions', 'keyEvents', 'newUsers', 'averageSessionDuration']
  const payload = await googleJson(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(GA4_PROPERTY_ID)}:runReport`, token, {
    method: 'POST',
    body: JSON.stringify({
      dateRanges: [{ startDate: window.startDate, endDate: window.endDate }],
      dimensions: dimensions.map(name => ({ name })),
      metrics: metrics.map(name => ({ name })),
      limit: 25,
      orderBys: dimensions.length
        ? ['date', 'yearMonth'].includes(dimensions[0])
          ? [{ dimension: { dimensionName: dimensions[0] } }]
          : [{ metric: { metricName: dimensions[0] === 'pagePath' ? 'screenPageViews' : 'sessions' }, desc: true }]
        : [],
    }),
  })
  const toRow = row => ({
    key: row.dimensionValues?.[0]?.value || 'Total',
    secondaryKey: row.dimensionValues?.[1]?.value || '',
    sessions: Number(row.metricValues?.[0]?.value || 0),
    users: Number(row.metricValues?.[1]?.value || 0),
    pageViews: Number(row.metricValues?.[2]?.value || 0),
    engagedSessions: Number(row.metricValues?.[3]?.value || 0),
    keyEvents: Number(row.metricValues?.[4]?.value || 0),
    newUsers: Number(row.metricValues?.[5]?.value || 0),
    avgSessionDuration: Number(row.metricValues?.[6]?.value || 0),
  })
  return { total: toRow(payload.rows?.[0] || {}), rows: (payload.rows || []).map(toRow) }
}

async function sourceCall(fn) {
  try { return { status: 'available', data: await fn() } }
  catch (error) { return { status: 'unavailable', error: error.message || 'Falha na consulta.' } }
}

async function adsReport(window) {
  const customerId = adsCustomerId()
  const query = "SELECT campaign.id, campaign.name, campaign.status, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM campaign WHERE segments.date BETWEEN '" + window.startDate + "' AND '" + window.endDate + "' AND campaign.status != 'REMOVED' ORDER BY metrics.impressions DESC LIMIT 50"
  const campaigns = await runAdsQuery(query)
  const rows = campaigns.map(row => ({
    key: row.campaign?.name || String(row.campaign?.id || ''),
    status: row.campaign?.status || '',
    impressions: Number(row.metrics?.impressions || 0),
    clicks: Number(row.metrics?.clicks || 0),
    cost: Number(row.metrics?.costMicros || 0) / 1000000,
    conversions: Number(row.metrics?.conversions || 0),
  }))
  const totals = rows.reduce((sum, row) => ({
    impressions: sum.impressions + row.impressions,
    clicks: sum.clicks + row.clicks,
    cost: sum.cost + row.cost,
    conversions: sum.conversions + row.conversions,
  }), { impressions: 0, clicks: 0, cost: 0, conversions: 0 })
  return { customerId, rows, totals }
}

const CACHE_CLIENT_ID = '0b88061b-676d-48fb-846a-2483b0cf8284'
const CACHE_PROJECT_ID = '6bf62bce-b7ff-46f1-84e9-07c54689a8e4'

async function cachedSource(source, window, loader, force = false) {
  const base = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  if (base && key) {
    try {
      const params = new URLSearchParams({
        select: 'metrics,status,generated_at',
        client_id: 'eq.' + CACHE_CLIENT_ID,
        project_id: 'eq.' + CACHE_PROJECT_ID,
        source: 'eq.' + source,
        period_start: 'eq.' + window.startDate,
        period_end: 'eq.' + window.endDate,
        order: 'generated_at.desc',
        limit: '1',
      })
      const response = await fetch(base + '/rest/v1/analytics_snapshots?' + params, {
        headers: { apikey: key, Authorization: 'Bearer ' + key },
        signal: AbortSignal.timeout(5000),
      })
      const rows = response.ok ? await response.json() : []
      if (!force && rows[0]?.status === 'available' && rows[0]?.metrics && Date.now() - Date.parse(rows[0].generated_at) < 36 * 60 * 60 * 1000) return { status: rows[0].status === 'available' ? 'available' : 'unavailable', data: rows[0].metrics, cached: true, generatedAt: rows[0].generated_at }
    } catch {}
  }
  const result = await sourceCall(loader)
  if (base && key) {
    try {
      await fetch(base + '/rest/v1/analytics_snapshots', {
        method: 'POST',
        headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({
          client_id: CACHE_CLIENT_ID,
          project_id: CACHE_PROJECT_ID,
          source,
          period_start: window.startDate,
          period_end: window.endDate,
          status: result.status,
          metrics: result.status === 'available' ? result.data : { error: result.error },
          dimensions: {},
          insights: [],
          generated_at: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(5000),
      })
    } catch {}
  }
  return result
}

async function loadGa4(token, window) {
  const calls = await Promise.all([
    sourceCall(() => ga4Report(token, window)),
    sourceCall(() => ga4Report(token, window, ['sessionDefaultChannelGroup'])),
    sourceCall(() => ga4Report(token, window, ['yearMonth'])),
    sourceCall(() => ga4Report(token, window, ['yearMonth', 'sessionDefaultChannelGroup'])),
    sourceCall(() => ga4Report(token, window, ['date'])),
    sourceCall(() => ga4Report(token, window, ['pagePath'])),
    sourceCall(() => ga4Report(token, window, ['sessionSource'])),
  ])
  const [ga4, channels, monthlyTraffic, monthlyOrganic, dailyTraffic, pages, sources] = calls
  return {
    ga4: ga4.status === 'available' ? { status: 'available', ...ga4.data } : ga4,
    channels: channels.status === 'available' ? channels.data.rows : [],
    dailyTraffic: dailyTraffic.status === 'available' ? dailyTraffic.data.rows : [],
    pages: pages.status === 'available' ? pages.data.rows : [],
    sources: sources.status === 'available' ? sources.data.rows : [],
    monthlyTraffic: monthlyTraffic.status === 'available'
      ? monthlyTraffic.data.rows.map(row => ({
          ...row,
          organicSessions: monthlyOrganic.status === 'available'
            ? Number(monthlyOrganic.data.rows.find(item => item.key === row.key && /organic search/i.test(item.secondaryKey))?.sessions || 0)
            : null,
        }))
      : [],
    error: [ga4, channels, monthlyTraffic].find(item => item.status === 'unavailable')?.error || null,
  }
}

async function loadSearch(token, window) {
  const [totals, queries, pages, daily] = await Promise.all([
    sourceCall(() => searchAnalytics(token, window, [], 1)),
    sourceCall(() => searchAnalytics(token, window, ['query'], 250)),
    sourceCall(() => searchAnalytics(token, window, ['page'], 250)),
    sourceCall(() => searchAnalytics(token, window, ['date'], 500)),
  ])
  return {
    status: [totals, queries, pages].some(item => item.status === 'available') ? 'available' : 'unavailable',
    totals: totals.status === 'available' ? totals.data[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 } : null,
    queries: queries.status === 'available' ? queries.data : [],
    pages: pages.status === 'available' ? pages.data : [],
    daily: daily.status === 'available' ? daily.data : [],
    totalsError: totals.error || null,
    queryError: queries.error || null,
    pageError: pages.error || null,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Método não permitido.' })
  try {
    const source = String(req.query?.source || 'overview').toLowerCase()
    const isCron = source === 'sync'
    if (isCron) {
      const expected = process.env.CRON_SECRET
      const supplied = (req.headers.authorization || '').replace(/^Bearer\\s+/i, '')
      if (!expected || supplied !== expected) return sendJson(res, 401, { error: 'Não autorizado.' })
    } else {
      await requireConsultReader(req)
    }
    const window = reportWindow(req)
    const tokenResult = await sourceCall(() => getGoogleAccessToken({ gatewayAllowed: true }))
    const token = tokenResult.data
    const requested = isCron ? ['ga4', 'search', 'ads'] : ['overview', 'insights'].includes(source) ? ['ga4', 'search', 'ads'] : [source]
    if (requested.some(item => !['ga4', 'search', 'ads'].includes(item))) return sendJson(res, 400, { error: 'Fonte de relatório inválida.' })
    const [ga4Result, searchResult, adsResult] = await Promise.all([
      requested.includes('ga4')
        ? token ? cachedSource('ga4', window, () => loadGa4(token, window), isCron) : Promise.resolve({ status: 'unavailable', error: tokenResult.error })
        : Promise.resolve(null),
      requested.includes('search')
        ? token ? cachedSource('search_console', window, () => loadSearch(token, window), isCron) : Promise.resolve({ status: 'unavailable', error: tokenResult.error })
        : Promise.resolve(null),
      requested.includes('ads')
        ? cachedSource('google_ads', window, () => adsReport(window), isCron)
        : Promise.resolve(null),
    ])
    if (isCron) return sendJson(res, 200, { ok: true, window, sources: { ga4: ga4Result?.status, searchConsole: searchResult?.status, ads: adsResult?.status }, generatedAt: new Date().toISOString() })
    const ga4 = ga4Result?.status === 'available' ? { status: 'available', ...ga4Result.data.ga4 } : ga4Result || null
    const channels = ga4Result?.status === 'available' ? ga4Result.data.channels : []
    const monthlyTraffic = ga4Result?.status === 'available' ? ga4Result.data.monthlyTraffic : []
    const searchConsole = searchResult?.status === 'available' ? searchResult.data : searchResult ? { status: 'unavailable', totals: null, queries: [], pages: [], daily: [], queryError: searchResult.error } : null
    const ads = adsResult?.status === 'available'
      ? { status: 'available', ...adsResult.data, message: adsResult.data.rows.length ? null : 'Conta Consult consultada; não há campanhas com dados no período selecionado.' }
      : adsResult ? { status: 'unavailable', customerId: adsCustomerId(), message: adsResult.error } : null
    return sendJson(res, 200, {
      generatedAt: new Date().toISOString(),
      cached: Boolean(ga4Result?.cached || searchResult?.cached),
      window,
      ga4,
      channels,
      monthlyTraffic,
      monthlyTrafficError: ga4Result?.error || null,
      searchConsole,
      ads,
    })
  } catch (error) {
    return handleError(res, error)
  }
}
