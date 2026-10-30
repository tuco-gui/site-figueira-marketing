import { handleError, requireConsultReader, sendJson } from './_lib/auth.js'

const GOOGLE_TRENDS_RSS = 'https://trends.google.com/trending/rss?geo=BR'
const NEWS_TERMS = [
  'radiologia diagnóstica',
  'proteção radiológica',
  'tomografia computadorizada',
  'controle de qualidade ultrassom',
  'engenharia clínica equipamentos médicos',
]

function decodeXml(value = '') {
  return String(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
}

function tag(item, name) {
  const match = item.match(new RegExp(`<(?:(?:[\\w-]+):)?${name}\\b[^>]*>([\\s\\S]*?)<\\/(?:(?:[\\w-]+):)?${name}>`, 'i'))
  return match ? decodeXml(match[1]).trim() : ''
}

function rssItems(xml, kind, query = '') {
  const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map(match => match[1])
  return items.map(item => ({
    kind,
    query,
    title: tag(item, 'title'),
    url: tag(item, 'link'),
    source: tag(item, 'source') || (kind === 'trends' ? 'Google Trends' : 'Google Notícias'),
    date: tag(item, 'pubDate'),
    volume: tag(item, 'approx_traffic'),
  })).filter(item => item.title && item.url)
}

async function fetchFeed(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'ConsultContentRadar/1.0 (+https://www.consult.med.br)' },
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) throw new Error(`Feed externo respondeu HTTP ${response.status}.`)
  return response.text()
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Método não permitido.' })
  try {
    await requireConsultReader(req)
    const results = await Promise.allSettled([
      fetchFeed(GOOGLE_TRENDS_RSS),
      ...NEWS_TERMS.map(term => {
        const query = encodeURIComponent(term)
        const url = `https://news.google.com/rss/search?q=${query}&hl=pt-BR&gl=BR&ceid=BR:pt-419`
        return fetchFeed(url)
      }),
    ])
    const trends = results[0].status === 'fulfilled' ? rssItems(results[0].value, 'trends') : []
    const news = results.slice(1).flatMap((result, index) => result.status === 'fulfilled'
      ? rssItems(result.value, 'news', NEWS_TERMS[index])
      : [])
    return sendJson(res, 200, {
      generatedAt: new Date().toISOString(),
      sources: {
        googleTrends: { status: results[0].status, label: 'Google Trends · Brasil · RSS' },
        googleNews: { status: results.slice(1).some(result => result.status === 'fulfilled') ? 'fulfilled' : 'rejected', label: 'Google Notícias · RSS por tema' },
      },
      trends,
      news: [...new Map(news.map(item => [item.url, item])).values()],
    })
  } catch (error) {
    return handleError(res, error)
  }
}
