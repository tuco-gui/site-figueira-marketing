import { CONSULT_PROJECT } from './consultProject.js'

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY
const SELECT = 'id,client_id,project_id,slug,status,title,excerpt,content_markdown,category,cover_url,author,source_url,related_links,seo_title,seo_description,is_public,published_at,metadata,created_at,updated_at'

function headers(token, extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

async function parse(response) {
  const text = await response.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }
  if (response.ok) return data
  if (response.status === 401) throw new Error('Sua sessão expirou. Entre novamente.')
  if (response.status === 403) throw new Error('Você não tem permissão para alterar este conteúdo.')
  if (response.status === 409) throw new Error('Já existe um artigo com este slug neste projeto.')
  if (response.status >= 400 && response.status < 500) throw new Error('Os dados do artigo são inválidos.')
  throw new Error('Não foi possível atualizar o conteúdo editorial.')
}

function requireConfig() {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('O acesso editorial da Consult não está configurado.')
}

function roleOf(profile = {}, clientId) {
  const memberships = Array.isArray(profile.memberships) ? profile.memberships : []
  return memberships.find(item => String(item.client_id) === String(clientId) && item.is_active !== false)?.role
    || profile.membership_role
    || null
}

export function isFigueiraStaff(profile = {}) {
  return ['admin', 'staff'].includes(profile.platform_role || profile.role)
}

/** @param {{ profile?: any, client?: any, project?: any }} options */
export function getSitePostPermissions({ profile = {}, client = {}, project = {} } = {}) {
  const internal = isFigueiraStaff(profile)
  const hasScopedProject = String(client?.id) === CONSULT_PROJECT.clientId
    && String(project?.id) === CONSULT_PROJECT.projectId
    && String(project?.client_id) === String(client?.id)
  const membership = roleOf(profile, client?.id)
  const hasMembership = Boolean(membership && String(client?.id) === CONSULT_PROJECT.clientId)
  const canRead = internal || hasMembership
  const canManageConsult = ['owner', 'manager'].includes(membership) && hasScopedProject

  return {
    canRead,
    canEdit: internal || canManageConsult,
    canReview: internal || canManageConsult,
    canPublish: internal || canManageConsult,
  }
}

/** @param {any} scope */
function requireScope(scope = {}) {
  const permissions = getSitePostPermissions(scope)
  if (String(scope.client?.id) !== CONSULT_PROJECT.clientId
    || String(scope.project?.id) !== CONSULT_PROJECT.projectId
    || String(scope.project?.client_id) !== String(scope.client?.id)) {
    throw new Error('Cliente e projeto da Consult são obrigatórios para esta operação.')
  }
  return permissions
}

function validateText(value, label, max, required = false) {
  const text = String(value || '').trim()
  if (required && !text) throw new Error(`${label} é obrigatório.`)
  if (text.length > max) throw new Error(`${label} excede o limite permitido.`)
  return text || null
}

function validateUrl(value, label, required = false) {
  const text = String(value || '').trim()
  if (!text && !required) return null
  if (!text) throw new Error(`${label} é obrigatório.`)
  try {
    const url = new URL(text)
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('protocol')
    return url.toString()
  } catch {
    throw new Error(`${label} deve ser uma URL HTTP ou HTTPS válida.`)
  }
}

/** @param {any} post @param {any} scope */
export function prepareSitePostWrite(post = {}, scope = {}, action = 'draft') {
  const permissions = requireScope(scope)
  if (!permissions.canEdit) throw new Error('Você não tem permissão para editar artigos.')
  if (!['draft', 'review', 'publish', 'withdraw'].includes(action)) throw new Error('Ação editorial inválida.')
  if (action === 'publish' && !permissions.canPublish) throw new Error('Você não tem permissão para publicar artigos.')
  if (action === 'review' && !permissions.canReview) throw new Error('Você não tem permissão para enviar artigos para revisão.')

  const title = validateText(post.title, 'Título', 180, true)
  const slug = validateText(post.slug, 'Slug', 220, true)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Slug inválido. Use apenas letras minúsculas, números e hífens.')

  const published = action === 'publish'
  return {
    client_id: CONSULT_PROJECT.clientId,
    project_id: CONSULT_PROJECT.projectId,
    title,
    slug,
    category: validateText(post.category, 'Categoria', 100),
    excerpt: validateText(post.excerpt, 'Resumo', 500),
    content_markdown: validateText(post.content_markdown, 'Conteúdo', 200000, true),
    author: validateText(post.author, 'Autor', 160),
    cover_url: validateUrl(post.cover_url, 'Imagem de capa', true),
    source_url: validateUrl(post.source_url, 'Fonte'),
    seo_title: validateText(post.seo_title, 'Título SEO', 60, true),
    seo_description: validateText(post.seo_description, 'Descrição SEO', 160, true),
    related_links: Array.isArray(post.related_links) ? post.related_links : [],
    metadata: post.metadata && typeof post.metadata === 'object' && !Array.isArray(post.metadata) ? post.metadata : {},
    status: published ? 'published' : action === 'review' ? 'review' : 'draft',
    is_public: published,
    published_at: published ? (post.published_at || new Date().toISOString()) : null,
  }
}

function scopedReadQuery() {
  return new URLSearchParams({
    client_id: `eq.${CONSULT_PROJECT.clientId}`,
    project_id: `eq.${CONSULT_PROJECT.projectId}`,
    select: SELECT,
    order: 'updated_at.desc',
  })
}

export async function getSitePostsAdmin(token, clientId, projectId, scope = {}) {
  requireConfig()
  const permissions = getSitePostPermissions(scope)
  if (!permissions.canRead || String(clientId) !== CONSULT_PROJECT.clientId || String(projectId) !== CONSULT_PROJECT.projectId) {
    throw new Error('Você não tem acesso aos artigos deste projeto.')
  }
  const response = await fetch(`${SUPABASE_URL}/rest/v1/site_posts?${scopedReadQuery().toString()}`, { headers: headers(token) })
  return parse(response)
}

export async function createSitePostAdmin(token, payload, scope, action = 'draft') {
  requireConfig()
  const body = prepareSitePostWrite(payload, scope, action)
  const response = await fetch(`${SUPABASE_URL}/rest/v1/site_posts`, {
    method: 'POST',
    headers: headers(token, { Prefer: 'return=representation' }),
    body: JSON.stringify(body),
  })
  const rows = await parse(response)
  return rows?.[0] || null
}

export async function updateSitePostAdmin(token, id, payload, scope, action = 'draft') {
  requireConfig()
  if (!id) throw new Error('Artigo inválido.')
  const body = prepareSitePostWrite(payload, scope, action)
  const params = new URLSearchParams({
    id: `eq.${id}`,
    client_id: `eq.${CONSULT_PROJECT.clientId}`,
    project_id: `eq.${CONSULT_PROJECT.projectId}`,
  })
  const response = await fetch(`${SUPABASE_URL}/rest/v1/site_posts?${params.toString()}`, {
    method: 'PATCH',
    headers: headers(token, { Prefer: 'return=representation' }),
    body: JSON.stringify({ ...body, updated_at: new Date().toISOString() }),
  })
  const rows = await parse(response)
  return rows?.[0] || null
}
