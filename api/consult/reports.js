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
  start.setUTCDate(start.getUTCDate() - 364)
  return { startDate: isoDate(start), endDate }
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
    secondaryKey: row.dimensionValues?.[1]?.value || '',
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
    const window = reportWindow(req)
    const [ga4, channels, monthlyTraffic, monthlyOrganic, gscTotals, queries, pages, searchDaily] = await Promise.all([
      sourceCall(() => ga4Report(token, window)),
      sourceCall(() => ga4Report(token, window, ['sessionDefaultChannelGroup'])),
      sourceCall(() => ga4Report(token, window, ['yearMonth'])),
      sourceCall(() => ga4Report(token, window, ['yearMonth', 'sessionDefaultChannelGroup'])),
      sourceCall(() => searchAnalytics(token, window, [], 1)),
      sourceCall(() => searchAnalytics(token, window, ['query'])),
      sourceCall(() => searchAnalytics(token, window, ['page'])),
      sourceCall(() => searchAnalytics(token, window, ['date'], 1000)),
    ])
    return sendJson(res, 200, {
      generatedAt: new Date().toISOString(),
      window,
      ga4: ga4.status === 'available' ? { status: 'available', ...ga4.data } : ga4,
      channels: channels.status === 'available' ? channels.data.rows : [],
      monthlyTraffic: monthlyTraffic.status === 'available'
        ? monthlyTraffic.data.rows.map(row => ({
          ...row,
          organicSessions: monthlyOrganic.status === 'available'
            ? Number(monthlyOrganic.data.rows.find(item => item.key === row.key && /organic search/i.test(item.secondaryKey))?.sessions || 0)
            : null,
        }))
        : [],
      monthlyTrafficError: monthlyTraffic.status === 'unavailable' ? monthlyTraffic.error : null,
      searchConsole: {
        status: [gscTotals, queries, pages].some(source => source.status === 'available') ? 'available' : 'unavailable',
        totals: gscTotals.status === 'available' ? gscTotals.data[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 } : null,
        queries: queries.status === 'available' ? queries.data : [],
        pages: pages.status === 'available' ? pages.data : [],
        daily: searchDaily.status === 'available' ? searchDaily.data : [],
        totalsError: gscTotals.status === 'unavailable' ? gscTotals.error : null,
        queryError: queries.status === 'unavailable' ? queries.error : null,
        pageError: pages.status === 'unavailable' ? pages.error : null,
      },
      ads: ads.status === 'available' ? { status: 'available', ...ads.data, message: ads.data.rows.length ? null : 'Conta Consult consultada; não há campanhas com dados no período selecionado.' } : { status: 'unavailable', customerId: adsCustomerId(), message: ads.error },
    })
  } catch (error) {
    return handleError(res, error)
  }
}
