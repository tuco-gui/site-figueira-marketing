import { handleError, requireConsultReader, sendJson } from './_lib/auth.js'
import { getGoogleAccessToken } from './_lib/googleOAuth.js'

const SITE_URL = 'https://consult.med.br/'

async function inspectUrl(accessToken, url) {
  const response = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL, languageCode: 'pt-BR' }),
  })
  const result = await response.json()
  if (!response.ok) return { url, status: 'error', message: result?.error?.message || 'Não foi possível inspecionar esta URL.' }
  const status = result?.inspectionResult?.indexStatusResult || {}
  return {
    url,
    status: status.verdict || 'UNKNOWN',
    coverageState: status.coverageState || '',
    indexingState: status.indexingState || '',
    pageFetchState: status.pageFetchState || '',
    inspectedAt: new Date().toISOString(),
    lastCrawlTime: status.lastCrawlTime || null,
    sitemap: status.sitemap || [],
    googleCanonical: status.googleCanonical || '',
    userCanonical: status.userCanonical || '',
    inspectionUrl: result?.inspectionResult?.inspectionResultLink || '',
  }
}

async function sitemapUrls(accessToken) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps`
  const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${accessToken}` } })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.error?.message || 'Não foi possível listar os sitemaps do Search Console.')
  const sitemapPaths = (payload.sitemap || []).map(item => item.path).filter(Boolean).slice(0, 20)
  const visited = new Set()
  const found = new Set()
  const queue = [...sitemapPaths]
  while (queue.length && visited.size < 20 && found.size < 500) {
    const sitemapUrl = queue.shift()
    if (visited.has(sitemapUrl)) continue
    visited.add(sitemapUrl)
    let xml
    try {
      const sitemapResponse = await fetch(sitemapUrl, { signal: AbortSignal.timeout(10000) })
      if (!sitemapResponse.ok) continue
      xml = await sitemapResponse.text()
    } catch { continue }
    const locations = [...xml.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)].map(match => match[1].trim().replace(/&amp;/g, '&'))
    for (const location of locations) {
      if (/\.xml(?:\?|$)/i.test(location) && queue.length + visited.size < 20) queue.push(location)
      else {
        try {
          const parsed = new URL(location)
          if (parsed.protocol === 'https:' && ['consult.med.br', 'www.consult.med.br'].includes(parsed.hostname)) found.add(parsed.toString())
        } catch { /* Ignore malformed sitemap entries. */ }
      }
      if (found.size >= 500) break
    }
  }
  return [...found].slice(0, 50)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Método não permitido.' })
  try {
    await requireConsultReader(req)
    const token = await getGoogleAccessToken()
    const urls = req.body?.fromSitemaps === true
      ? await sitemapUrls(token)
      : [...new Set((Array.isArray(req.body?.urls) ? req.body.urls : []).map(value => String(value || '').trim()))]
    if (!urls.length || urls.length > 50) return sendJson(res, 400, { error: 'Envie de 1 a 50 URLs para inspeção.' })
    const invalid = urls.find(value => {
      try {
        const url = new URL(value)
        return url.protocol !== 'https:' || !['consult.med.br', 'www.consult.med.br'].includes(url.hostname)
      } catch { return true }
    })
    if (invalid) return sendJson(res, 400, { error: 'Só podem ser inspecionadas URLs HTTPS do domínio consult.med.br.' })
    if (req.body?.fromSitemaps === true) return sendJson(res, 200, { property: SITE_URL, urls })
    const results = []
    for (let index = 0; index < urls.length; index += 5) {
      const batch = await Promise.all(urls.slice(index, index + 5).map(url => inspectUrl(token, url)))
      results.push(...batch)
    }
    return sendJson(res, 200, { generatedAt: new Date().toISOString(), property: SITE_URL, results })
  } catch (error) {
    return handleError(res, error)
  }
}
