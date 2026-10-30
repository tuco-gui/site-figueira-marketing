import { handleError, requireConsultReader, sendJson } from './_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Método não permitido.' })
  try {
    await requireConsultReader(req)
    return sendJson(res, 200, {
      providers: {
        gemini: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
        openai: Boolean(process.env.OPENAI_API_KEY),
      },
      defaultProvider: process.env.CONSULT_AI_DEFAULT_PROVIDER === 'openai' ? 'openai' : 'gemini',
    })
  } catch (error) {
    return handleError(res, error)
  }
}
