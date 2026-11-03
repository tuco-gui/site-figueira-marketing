import { createHmac, timingSafeEqual } from 'node:crypto'

const token = () => process.env.META_WHATSAPP_WEBHOOK_VERIFY_TOKEN || ''
const appSecret = () => process.env.META_WHATSAPP_APP_SECRET || ''

function equals(left, right) {
  const a = Buffer.from(String(left || ''))
  const b = Buffer.from(String(right || ''))
  return a.length === b.length && timingSafeEqual(a, b)
}

function rawBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body
  if (typeof req.body === 'string') return Buffer.from(req.body)
  // This function must run without body parsing to preserve signed bytes.
  return Buffer.alloc(0)
}

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (req.method === 'GET') {
    const mode = req.query?.['hub.mode']
    const givenToken = req.query?.['hub.verify_token']
    const challenge = req.query?.['hub.challenge']
    if (mode === 'subscribe' && token() && equals(givenToken, token()) && typeof challenge === 'string' && /^\d{1,20}$/.test(challenge)) {
      return res.status(200).setHeader('Content-Type', 'text/plain; charset=utf-8').send(challenge)
    }
    return res.status(403).json({ error: 'Invalid verification' })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).end()
  }

  if (!appSecret()) return res.status(503).json({ error: 'Webhook signature validation not configured' })

  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > 512 * 1024) return res.status(413).end()
    chunks.push(chunk)
  }
  const body = Buffer.concat(chunks)
  const supplied = String(req.headers['x-hub-signature-256'] || '')
  const expected = 'sha256=' + createHmac('sha256', appSecret()).update(body).digest('hex')
  if (!equals(supplied, expected)) return res.status(403).end()

  let event
  try { event = JSON.parse(body.toString('utf8')) } catch { return res.status(400).end() }
  if (event?.object !== 'whatsapp_business_account') return res.status(400).end()

  // Log only delivery status metadata: never phone numbers, message content, IDs, or credentials.
  for (const entry of event.entry || []) {
    for (const change of entry.changes || []) {
      if (change.field !== 'messages') continue
      for (const status of change.value?.statuses || []) {
        const state = String(status.status || 'unknown').slice(0, 32)
        const codes = (status.errors || []).map(e => Number(e.code)).filter(Number.isFinite).slice(0, 5)
        console.info('meta_wa_delivery', JSON.stringify({ status: state, error_codes: codes }))
      }
    }
  }
  return res.status(200).json({ ok: true })
}
