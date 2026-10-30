import { handleError, requireConsultReader, sendJson } from './_lib/auth.js'

const CLIENT_ID = '0b88061b-676d-48fb-846a-2483b0cf8284'
const allowedTopics = /radiolog|radiograf|tomograf|mamograf|resson.ncia|imagem m.dica|diagn.stico por imagem|radioprote|prote..o radiol.gica|radia..o|dose|f.sica m.dica|engenharia cl.nica|equipamento m.dico|anvisa|iaea|cnen|ultrassom|medicina nuclear|hemodin.mica|fluoroscopia|qualidade em sa.de/i

async function requireWriter(req) {
  const user = await requireConsultReader(req)
  const base = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  const headers = { apikey: key, Authorization: req.headers.authorization }
  const [p, m] = await Promise.all([
    fetch(base + '/rest/v1/profiles?id=eq.' + encodeURIComponent(user.id) + '&select=platform_role,is_active', { headers }),
    fetch(base + '/rest/v1/client_users?user_id=eq.' + encodeURIComponent(user.id) + '&client_id=eq.' + CLIENT_ID + '&is_active=eq.true&select=role', { headers }),
  ])
  if (!p.ok || !m.ok) throw Object.assign(new Error('Não foi possível validar a permissão para gerar artigos.'), { status: 403 })
  const [profiles, memberships] = await Promise.all([p.json(), m.json()])
  const role = memberships[0]?.role
  const writer = profiles[0]?.is_active !== false && (['admin', 'staff'].includes(profiles[0]?.platform_role) || ['owner', 'manager'].includes(role))
  if (!writer) throw Object.assign(new Error('Seu usuário não tem permissão para gerar artigos.'), { status: 403 })
}

function promptFor(insight) {
  return [
    'Você é o motor editorial da Consult Radiometria e Qualidade, empresa brasileira de física médica, proteção radiológica, controle de qualidade em diagnóstico por imagem e engenharia clínica.',
    'Escreva em português brasileiro um artigo informativo, preciso e original SOMENTE sobre esse nicho: radiologia e diagnóstico por imagem, radioproteção, física médica, qualidade e segurança de equipamentos de saúde, engenharia clínica ou normas sanitárias aplicáveis a esses temas.',
    'O insight de origem é: ' + insight.title,
    'Resumo/fonte/contexto: ' + [insight.excerpt, insight.source_url, insight.context].filter(Boolean).join(' | '),
    'Palavras-chave fornecidas: ' + (Array.isArray(insight.keywords) ? insight.keywords.join(', ') : ''),
    'Não mude para assuntos de outros mercados. Não invente estatísticas, estudos, leis, datas, citações ou URLs. Se a fonte não sustentar um dado, não o afirme. Não dê aconselhamento médico individual. Não reproduza texto da fonte. O artigo será revisado por humanos.',
    'Crie um artigo útil com 600 a 900 palavras, título claro, introdução e subtítulos Markdown (não use H1), orientação prática moderada e conclusão. Não alegue que a Consult oferece um serviço que não esteja no briefing. Não publique nem diga que está publicado.',
    'Responda APENAS JSON válido com estas chaves: title, slug, excerpt, seo_intro, content_markdown, seo_title, seo_description, keywords (array), tags (array), category. seo_title até 60 caracteres e seo_description até 160. Use categoria coerente com o nicho.'
  ].join('\n\n')
}

async function requestGemini(prompt) {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!key) throw Object.assign(new Error('Chave Gemini não configurada no servidor.'), { status: 503 })
  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash'
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0.5, maxOutputTokens: 4096 } }),
  })
  const data = await response.json()
  if (!response.ok) throw Object.assign(new Error(data?.error?.message || 'Gemini não conseguiu gerar o artigo.'), { status: 502 })
  return data?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('')
}

async function requestOpenAI(prompt) {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw Object.assign(new Error('Chave ChatGPT não configurada no servidor.'), { status: 503 })
  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini'
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
    body: JSON.stringify({ model, input: [{ role: 'user', content: [{ type: 'input_text', text: prompt }] }], text: { format: { type: 'json_object' } }, max_output_tokens: 4096 }),
  })
  const data = await response.json()
  if (!response.ok) throw Object.assign(new Error(data?.error?.message || 'ChatGPT não conseguiu gerar o artigo.'), { status: 502 })
  return (data.output || []).flatMap(item => item.content || []).map(part => part.text || '').join('')
}

function cleanSlug(value, fallback) {
  const slug = String(value || fallback || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 110)
  return slug || 'artigo-consult'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Método não permitido.' })
  try {
    await requireWriter(req)
    const provider = req.body?.provider === 'openai' ? 'openai' : 'gemini'
    const insight = req.body?.insight || {}
    const title = String(insight.title || '').trim().slice(0, 300)
    if (!title || !allowedTopics.test([title, insight.category, ...(insight.keywords || [])].join(' '))) {
      return sendJson(res, 422, { error: 'O insight precisa estar relacionado à radiologia, proteção radiológica, qualidade ou tecnologia em saúde da Consult.' })
    }
    const prompt = promptFor({ ...insight, title })
    const raw = provider === 'openai' ? await requestOpenAI(prompt) : await requestGemini(prompt)
    let article
    try { article = JSON.parse(String(raw || '').replace(/^\s*`{3}(?:json)?\s*/i, '').replace(/\s*`{3}\s*$/, '')) }
    catch { throw Object.assign(new Error('O provedor retornou um formato inesperado. Tente novamente.'), { status: 502 }) }
    if (!article.title || !article.content_markdown || !article.excerpt) throw Object.assign(new Error('O artigo gerado veio incompleto. Tente novamente.'), { status: 502 })
    if (!allowedTopics.test([article.title, article.category, ...(article.keywords || [])].join(' '))) throw Object.assign(new Error('O tema gerado saiu do nicho da Consult. Ajuste o insight e tente novamente.'), { status: 422 })
    return sendJson(res, 200, { article: {
      title: String(article.title).slice(0, 180),
      slug: cleanSlug(article.slug, article.title),
      excerpt: String(article.excerpt).slice(0, 600),
      seo_intro: String(article.seo_intro || article.excerpt).slice(0, 1200),
      content_markdown: String(article.content_markdown).slice(0, 30000),
      seo_title: String(article.seo_title || article.title).slice(0, 60),
      seo_description: String(article.seo_description || article.excerpt).slice(0, 160),
      keywords: Array.isArray(article.keywords) ? article.keywords.slice(0, 15).map(String) : [],
      tags: Array.isArray(article.tags) ? article.tags.slice(0, 15).map(String) : [],
      category: String(article.category || 'Diagnóstico por Imagem').slice(0, 100),
    }, provider })
  } catch (error) {
    return handleError(res, error)
  }
}
