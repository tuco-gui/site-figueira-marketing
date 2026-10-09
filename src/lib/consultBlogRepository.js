import { CONSULT_PROJECT } from './consultProject'

const CDN = 'https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305'
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const SEED_POSTS = [
  {
    id: 'cursos-digitais-radioprotecao',
    slug: 'educacao-continuada-cursos-digitais-radioprotecao',
    title: 'Consult fortalece educação continuada com nova plataforma de cursos digitais',
    category: 'Treinamentos',
    publishedAt: '2026-05-04T16:45:00-03:00',
    author: 'Consult',
    excerpt: 'A Consult ampliou sua frente de educação continuada com treinamentos online voltados à proteção radiológica, qualidade em radiodiagnóstico e segurança em ressonância magnética.',
    summary: [
      'A plataforma de cursos digitais foi criada para ampliar o acesso de profissionais, clínicas, hospitais e serviços de diagnóstico por imagem a treinamentos técnicos da Consult.',
      'A iniciativa conecta capacitação contínua às rotinas de proteção radiológica, qualidade e segurança, criando uma frente de conteúdo que também pode apoiar o relacionamento com instituições atendidas pela Consult.',
    ],
    coverImage: `${CDN}/5ba952d9-c3e4-48d7-9dc0-4716ac1f137f.jpg`,
    relatedLinks: [
      { label: 'Treinamentos', href: '/consult/servicos/treinamentos' },
      { label: 'Proteção Radiológica', href: '/consult/areas/protecao-radiologica' },
    ],
    sourceUrl: 'http://www.consult.med.br/posts/?dt=consult-fortalece-educacao-continuada-com-nova-plataforma-de-cursos-digitais-M1RmNTNHUnRGSjNnbkRKaTA4RTdoUT09',
    migrationStatus: 'historical_summary',
  },
  {
    id: 'iaea-hhs-47',
    slug: 'iaea-hhs-47-controle-qualidade-equipamentos',
    title: 'IAEA HHS 47: guia prático de controle de qualidade de equipamentos',
    category: 'Controle de Qualidade',
    publishedAt: '2023-02-13T11:04:00-03:00',
    author: 'Consult',
    excerpt: 'O Human Health Series nº 47 da IAEA reúne orientações práticas para testes de controle de qualidade em diferentes modalidades de radiologia diagnóstica.',
    summary: [
      'O guia da Agência Internacional de Energia Atômica apresenta testes de qualidade aplicáveis a modalidades como radiografia, fluoroscopia, mamografia e tomografia computadorizada.',
      'Na prática, materiais técnicos desse tipo ajudam equipes e instituições a compreender por que controle de qualidade, desempenho e segurança precisam ser acompanhados por medições documentadas e critérios técnicos claros.',
    ],
    coverImage: `${CDN}/5ba95360-34a0-449d-9a24-4836ac1f137f.jpg`,
    relatedLinks: [
      { label: 'Controle de Qualidade', href: '/consult/servicos/controle-qualidade' },
      { label: 'Física Médica', href: '/consult/areas/fisica-medica' },
    ],
    sourceUrl: 'http://www.consult.med.br/posts/?dt=publicado-iaea-hhs-47-um-guia-pratico-de-controle-de-qualidade-de-equipamentos-Nk8wSnFob1pNSC9qYXdmTVFFdEtLQT09',
    migrationStatus: 'historical_summary',
  },
  {
    id: 'arco-c-radioprotecao',
    slug: 'protecao-radiologica-equipamentos-arco-c',
    title: 'Proteção radiológica em equipamentos Arco C',
    category: 'Radioproteção',
    publishedAt: '2019-01-16T17:52:00-03:00',
    author: 'Matheus',
    excerpt: 'O uso de Arco C em procedimentos minimamente invasivos exige atenção à exposição ocupacional e às práticas de proteção do paciente e da equipe.',
    summary: [
      'Equipamentos Arco C ampliam a capacidade de realizar procedimentos guiados por imagem, mas também tornam essencial o controle da exposição à radiação durante a rotina cirúrgica.',
      'O conteúdo histórico da Consult chama atenção para proteção pessoal, operação segura e conscientização da equipe, temas diretamente relacionados às rotinas de proteção radiológica e treinamento.',
    ],
    coverImage: `${CDN}/5ba954a4-90f8-4e55-a0d3-4b15ac1f137f.jpg`,
    relatedLinks: [
      { label: 'Proteção Radiológica', href: '/consult/areas/protecao-radiologica' },
      { label: 'Treinamentos', href: '/consult/servicos/treinamentos' },
    ],
    sourceUrl: 'http://www.consult.med.br/posts/?dt=protecao-radiologica-em-equipamentos-arco-c-NS9kS1lkbXlWaG5mTEJGNmlUZnhUdz09',
    migrationStatus: 'historical_summary',
  },
]

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
    relatedLinks: Array.isArray(row.related_links) ? row.related_links : [],
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
  return Array.isArray(rows) ? rows.map(mapRow) : []
}

export function getConsultBlogSeedPosts() {
  return sortByDate(SEED_POSTS.map((post) => ({ ...post, contentSource: 'local_seed' })))
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
