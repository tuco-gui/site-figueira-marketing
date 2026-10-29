const MAX_TITLE_LENGTH = 180
const MAX_CONTENT_LENGTH = 200000
const MAX_SEO_TITLE_LENGTH = 60
const MAX_SEO_DESCRIPTION_LENGTH = 160

export class IngestionValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'IngestionValidationError'
    this.code = 'validation_error'
  }
}

export function normalizeSlug(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function requiredText(value, label, maxLength) {
  const text = String(value || '').trim()
  if (!text) throw new IngestionValidationError(`${label} é obrigatório.`)
  if (text.length > maxLength) throw new IngestionValidationError(`${label} excede o limite permitido.`)
  return text
}

function optionalText(value, label, maxLength) {
  const text = String(value || '').trim()
  if (text.length > maxLength) throw new IngestionValidationError(`${label} excede o limite permitido.`)
  return text || null
}

function httpUrl(value, label, required = false) {
  const text = String(value || '').trim()
  if (!text && !required) return null
  if (!text) throw new IngestionValidationError(`${label} é obrigatório.`)
  try {
    const url = new URL(text)
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('protocol')
    return url.toString()
  } catch {
    throw new IngestionValidationError(`${label} deve ser uma URL HTTP ou HTTPS válida.`)
  }
}

export function validateConsultBlogPost(input = {}) {
  const clientId = requiredText(input.client_id, 'Cliente', 100)
  const projectId = requiredText(input.project_id, 'Projeto', 100)
  const title = requiredText(input.title, 'Título', MAX_TITLE_LENGTH)
  const slug = normalizeSlug(requiredText(input.slug, 'Slug', 220))
  if (!slug) throw new IngestionValidationError('Slug inválido.')
  if (slug.length > 220) throw new IngestionValidationError('Slug excede o limite permitido.')
  const content = requiredText(input.content_markdown ?? input.content, 'Conteúdo', MAX_CONTENT_LENGTH)
  const seoTitle = optionalText(input.seo_title ?? input.seo?.title, 'Título SEO', MAX_SEO_TITLE_LENGTH)
  const seoDescription = optionalText(input.seo_description ?? input.seo?.description, 'Descrição SEO', MAX_SEO_DESCRIPTION_LENGTH)

  return {
    client_id: clientId,
    project_id: projectId,
    title,
    slug,
    excerpt: optionalText(input.excerpt, 'Resumo', 500),
    content_markdown: content,
    category: optionalText(input.category, 'Categoria', 100),
    cover_url: httpUrl(input.cover_url ?? input.cover, 'Imagem de capa', true),
    author: optionalText(input.author, 'Autor', 160),
    source_url: httpUrl(input.source_url, 'Fonte'),
    related_links: Array.isArray(input.related_links) ? input.related_links : [],
    seo_title: seoTitle,
    seo_description: seoDescription,
    metadata: input.metadata && typeof input.metadata === 'object' && !Array.isArray(input.metadata) ? input.metadata : {},
    status: 'draft',
    is_public: false,
    published_at: null,
  }
}

export async function ingestConsultBlogPost(input, dependencies = {}) {
  const { requestSecret, expectedSecret, findClient, findProject, findExisting, upsert } = dependencies
  if (!expectedSecret || requestSecret !== expectedSecret) throw new Error('Não autorizado.')
  if (typeof findClient !== 'function' || typeof findProject !== 'function' || typeof upsert !== 'function') {
    throw new Error('Ingestão não configurada.')
  }

  const payload = validateConsultBlogPost(input)
  const client = await findClient(payload.client_id)
  if (!client || client.slug !== 'consult' || String(client.id) !== payload.client_id) {
    throw new IngestionValidationError('O cliente informado não é a Consult.')
  }
  const project = await findProject(payload.project_id, payload.client_id)
  if (!project || String(project.id) !== payload.project_id || String(project.client_id) !== payload.client_id) {
    throw new IngestionValidationError('Projeto não encontrado para a Consult.')
  }

  if (typeof findExisting === 'function') {
    const existing = await findExisting(payload)
    if (existing && (existing.status === 'published' || existing.status === 'review')) return existing
  }
  return upsert(payload, { onConflict: 'client_id,project_id,slug' })
}
