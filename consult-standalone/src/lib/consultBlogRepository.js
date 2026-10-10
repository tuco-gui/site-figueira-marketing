import { CONSULT_PROJECT } from './Project'
import STATIC_POSTS from './StaticPosts.json'

const SEED_POSTS = STATIC_POSTS
const FULL_STATIC_BY_SLUG = new Map(SEED_POSTS.filter((post) => post.migrationStatus === 'historical_full').map((post) => [post.slug, post]))

function sortByDate(posts) {
  return [...posts].sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
}

function normalizeEditorialText(value = '') {
  return String(value)
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
}

function markdownToParagraphs(markdown = '') {
  return normalizeEditorialText(markdown)
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter(Boolean)
}

function normalizeConsultHref(href = '') {
  const value = String(href || '')
  if (!value.startsWith('/') || value.startsWith('/')) return value
  return '/' + value
}

function normalizeRelatedLinks(links = []) {
  return Array.isArray(links)
    ? links.map((item) => ({ ...item, href: normalizeConsultHref(item?.href) }))
    : []
}

function mapRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category || 'Conteúdo técnico',
    publishedAt: row.published_at,
    author: row.author || 'Consult',
    excerpt: row.excerpt || '',
    summary: markdownToParagraphs(row.content_markdown),
    coverImage: row.cover_url || '',
    relatedLinks: normalizeRelatedLinks(row.related_links),
    sourceUrl: row.source_url || null,
    migrationStatus: row.metadata?.migration_status || null,
    seoTitle: row.seo_title || null,
    seoDescription: row.seo_description || null,
    contentSource: 'supabase_site_posts',
  }
}

function canUseBackend() {
  return CONSULT_PROJECT.content.provider === 'supabase_site_posts' && Boolean(SUPABASE_URL && SUPABASE_KEY)
}

async function fetchPublishedPosts() {
  if (!canUseBackend()) return null
  const select = ['id','slug','title','category','published_at','author','excerpt','content_markdown','cover_url','related_links','source_url','metadata','seo_title','seo_description'].join(',')
  const params = new URLSearchParams({ client_id: `eq.${CONSULT_PROJECT.clientId}`, status: 'eq.published', is_public: 'eq.true', select, order: 'published_at.desc' })
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${CONSULT_PROJECT.content.publicTable}?${params.toString()}`, {
    headers: { apikey: SUPABASE_KEY, Accept: 'application/json' },
  })
  if (!response.ok) throw new Error(`Consult blog backend returned ${response.status}`)
  const rows = await response.json()
  if (!Array.isArray(rows)) return []
  return rows.map(mapRow).map((post) => {
    const fullStatic = FULL_STATIC_BY_SLUG.get(post.slug)
    if (post.migrationStatus !== 'historical_summary' || !fullStatic) return post
    return {
      ...post,
      excerpt: post.excerpt || fullStatic.excerpt || '',
      summary: Array.isArray(fullStatic.summary) ? fullStatic.summary : post.summary,
      coverImage: post.coverImage || fullStatic.coverImage || '',
      relatedLinks: normalizeRelatedLinks(fullStatic.relatedLinks || post.relatedLinks),
      sourceUrl: null,
      migrationStatus: 'historical_full',
      contentSource: 'supabase_with_full_static_migration',
    }
  })
}

export function getConsultBlogSeedPosts() {
  return sortByDate(SEED_POSTS.map((post) => ({ ...post, relatedLinks: normalizeRelatedLinks(post.relatedLinks), contentSource: 'local_static' })))
}

export async function getConsultBlogPosts() {
  try {
    const backendPosts = await fetchPublishedPosts()
    if (backendPosts?.length) return sortByDate(backendPosts)
  } catch (error) {
    console.warn('[Consult Blog] Supabase indisponível; usando fallback editorial local.', error)
  }
  return getConsultBlogSeedPosts()
}

export async function getConsultBlogPost(slug) {
  const posts = await getConsultBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

export function getConsultBlogCategories(posts = SEED_POSTS) {
  return [...new Set(posts.map((post) => post.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'))
}
