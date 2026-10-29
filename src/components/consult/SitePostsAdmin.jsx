import React, { useEffect, useMemo, useState } from 'react'
import { ExternalLink, FilePenLine, Plus, RefreshCw, Save } from 'lucide-react'
import {
  createSitePostAdmin,
  getSitePostPermissions,
  getSitePostsAdmin,
  updateSitePostAdmin,
} from '@/lib/sitePostsAdminApi'
import { CONSULT_PROJECT, consultPath } from '@/lib/consultProject'

const defaultMetadata = {
  keywords: [],
  tags: [],
  og_title: '',
  og_description: '',
  og_image: '',
  cta_text: '',
  cta_link: '',
  allow_indexing: false,
}

const emptyDraft = {
  id: null,
  title: '',
  slug: '',
  category: '',
  excerpt: '',
  content_markdown: '',
  author: 'Consult',
  cover_url: '',
  source_url: '',
  seo_title: '',
  seo_description: '',
  status: 'draft',
  is_public: false,
  published_at: null,
  metadata: defaultMetadata,
}

function slugify(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function normalizePost(post = {}) {
  return { ...emptyDraft, ...post, metadata: { ...defaultMetadata, ...(post.metadata || {}) } }
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString('pt-BR') : '—'
}

function csvToList(value) {
  return String(value || '').split(',').map(item => item.trim()).filter(Boolean)
}

function listToCsv(value) {
  return Array.isArray(value) ? value.join(', ') : ''
}

function statusLabel(post) {
  if (post.status === 'published' && post.is_public) return 'Publicado'
  if (post.status === 'review') return 'Em revisão'
  return 'Rascunho'
}

export default function SitePostsAdmin({ session, client, project, profile }) {
  const [posts, setPosts] = useState([])
  const [draft, setDraft] = useState(emptyDraft)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const permissions = useMemo(() => getSitePostPermissions({ profile, client, project }), [profile, client, project])

  const seoScore = useMemo(() => {
    let score = 0
    if (draft.seo_title && draft.seo_title.length <= 60) score += 25
    if (draft.seo_description && draft.seo_description.length <= 160) score += 25
    if (draft.slug) score += 15
    if (draft.excerpt) score += 10
    if (draft.cover_url || draft.metadata?.og_image) score += 10
    if ((draft.metadata?.keywords || []).length) score += 10
    if ((draft.metadata?.tags || []).length) score += 5
    return score
  }, [draft])

  async function load() {
    if (!session?.access_token) return
    setLoading(true)
    setError('')
    try {
      const rows = await getSitePostsAdmin(session.access_token, CONSULT_PROJECT.clientId, CONSULT_PROJECT.projectId, { profile, client, project })
      setPosts((rows || []).map(normalizePost))
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os artigos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [session?.access_token, client?.id, project?.id])

  function setField(key, value) {
    setDraft(previous => {
      const next = { ...previous, [key]: value }
      if (key === 'title' && !slugTouched && !previous.id) next.slug = slugify(value)
      return next
    })
  }

  function setMetaField(key, value) {
    setDraft(previous => ({ ...previous, metadata: { ...defaultMetadata, ...(previous.metadata || {}), [key]: value } }))
  }

  function beginNew() {
    if (!permissions.canEdit) return
    setDraft({ ...emptyDraft, metadata: { ...defaultMetadata } })
    setSlugTouched(false)
    setError('')
    setMessage('')
  }

  function edit(post) {
    setDraft(normalizePost(post))
    setSlugTouched(true)
    setError('')
    setMessage('')
  }

  async function persist(action = 'draft') {
    if (saving || !permissions.canEdit) return null
    const payload = normalizePost(draft)
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const body = {
        title: payload.title.trim(),
        slug: slugify(payload.slug),
        category: payload.category.trim() || null,
        excerpt: payload.excerpt.trim() || null,
        content_markdown: payload.content_markdown || null,
        author: payload.author.trim() || null,
        cover_url: payload.cover_url.trim() || null,
        source_url: payload.source_url.trim() || null,
        seo_title: payload.seo_title.trim() || null,
        seo_description: payload.seo_description.trim() || null,
        metadata: { ...defaultMetadata, ...(payload.metadata || {}), seo_score: seoScore },
        related_links: [],
      }
      const saved = payload.id
        ? await updateSitePostAdmin(session.access_token, payload.id, body, { profile, client, project }, action)
        : await createSitePostAdmin(session.access_token, body, { profile, client, project }, action)
      if (saved) {
        const next = normalizePost(saved)
        setDraft(next)
        setSlugTouched(true)
        setPosts(previous => {
          const updated = previous.some(item => item.id === next.id)
            ? previous.map(item => item.id === next.id ? next : item)
            : [next, ...previous]
          return updated.sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime())
        })
      }
      setMessage(action === 'publish' ? 'Artigo publicado na homologação.' : action === 'review' ? 'Artigo enviado para revisão.' : action === 'withdraw' ? 'Artigo retirado da publicação.' : 'Rascunho salvo.')
      return saved
    } catch (err) {
      setError(err.message || 'Não foi possível salvar o artigo.')
      return null
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="consult-admin-editor">
      <div className="flex flex-col gap-5 border-b border-[#D7E8E3] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[#08A77F]">Editorial Consult</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-.04em] text-[#075653]">Blog técnico</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#607D7A]">Conteúdo limitado ao projeto do site Consult. Publicação só fica visível quando o registro está publicado e público.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15} /> Atualizar</button>
          {permissions.canEdit && <button type="button" onClick={beginNew} className="consult-admin-button consult-admin-button-primary"><Plus size={15} /> Novo artigo</button>}
        </div>
      </div>

      {!permissions.canEdit && permissions.canRead && <div className="consult-admin-alert">Seu acesso é somente leitura. Proprietários, gestores e equipe Figueira podem editar, revisar e publicar.</div>}
      {error && <div className="consult-admin-alert consult-admin-alert-error">{error}</div>}
      {message && <div className="consult-admin-alert consult-admin-alert-ok">{message}</div>}

      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="overflow-hidden rounded-2xl border border-[#D7E8E3] bg-white">
          <div className="flex items-center justify-between border-b border-[#E5F0ED] px-4 py-4"><strong className="text-sm text-[#075653]">Artigos</strong><span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#EAF5F2] px-2 text-xs font-black text-[#075653]">{posts.length}</span></div>
          {loading ? <p className="p-5 text-sm text-[#607D7A]">Carregando...</p> : posts.length ? posts.map(post => (
            <button key={post.id} type="button" onClick={() => edit(post)} className={`flex w-full items-start gap-3 border-b border-[#EDF4F1] px-4 py-4 text-left last:border-0 hover:bg-[#F4FAF8] ${draft.id === post.id ? 'bg-[#EAF5F2]' : 'bg-white'}`}>
              <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${post.status === 'published' && post.is_public ? 'bg-[#08A77F]' : post.status === 'review' ? 'bg-[#FF6B26]' : 'bg-[#B6C9C5]'}`} />
              <span className="min-w-0"><strong className="block truncate text-sm text-[#075653]">{post.title}</strong><small className="mt-1 block text-xs text-[#78908E]">{statusLabel(post)} · {formatDate(post.updated_at)}</small></span>
            </button>
          )) : <p className="p-5 text-sm text-[#607D7A]">Nenhum artigo cadastrado.</p>}
        </aside>

        <section className="rounded-2xl border border-[#D7E8E3] bg-white p-5 md:p-7">
          <div className="flex flex-col gap-3 border-b border-[#E5F0ED] pb-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2 text-sm font-black text-[#075653]"><FilePenLine size={18} /> {draft.id ? 'Editar artigo' : 'Novo artigo'}</div><span className="rounded-full bg-[#EAF5F2] px-3 py-1.5 text-xs font-black text-[#075653]">SEO {seoScore}/100</span></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="md:col-span-2"><span className="consult-admin-label">Título</span><input disabled={!permissions.canEdit} value={draft.title} onChange={event => setField('title', event.target.value)} className="consult-admin-input" /></label>
            <label><span className="consult-admin-label">Slug</span><input disabled={!permissions.canEdit} value={draft.slug} onChange={event => { setSlugTouched(true); setField('slug', event.target.value) }} className="consult-admin-input" /></label>
            <label><span className="consult-admin-label">Categoria</span><input disabled={!permissions.canEdit} value={draft.category || ''} onChange={event => setField('category', event.target.value)} className="consult-admin-input" /></label>
            <label className="md:col-span-2"><span className="consult-admin-label">Resumo</span><textarea disabled={!permissions.canEdit} rows={3} value={draft.excerpt || ''} onChange={event => setField('excerpt', event.target.value)} className="consult-admin-input" /></label>
            <label><span className="consult-admin-label">Autor</span><input disabled={!permissions.canEdit} value={draft.author || ''} onChange={event => setField('author', event.target.value)} className="consult-admin-input" /></label>
            <label><span className="consult-admin-label">Imagem de capa</span><input disabled={!permissions.canEdit} type="url" value={draft.cover_url || ''} onChange={event => setField('cover_url', event.target.value)} placeholder="https://..." className="consult-admin-input" /></label>
            <label className="md:col-span-2"><span className="consult-admin-label">Conteúdo em Markdown</span><textarea disabled={!permissions.canEdit} rows={16} value={draft.content_markdown || ''} onChange={event => setField('content_markdown', event.target.value)} className="consult-admin-input font-mono text-xs" /></label>
            <label className="md:col-span-2"><span className="consult-admin-label">Título SEO <small>{(draft.seo_title || '').length}/60</small></span><input disabled={!permissions.canEdit} value={draft.seo_title || ''} onChange={event => setField('seo_title', event.target.value)} className="consult-admin-input" /></label>
            <label className="md:col-span-2"><span className="consult-admin-label">Descrição SEO <small>{(draft.seo_description || '').length}/160</small></span><textarea disabled={!permissions.canEdit} rows={3} value={draft.seo_description || ''} onChange={event => setField('seo_description', event.target.value)} className="consult-admin-input" /></label>
            <label><span className="consult-admin-label">Palavras-chave</span><input disabled={!permissions.canEdit} value={listToCsv(draft.metadata?.keywords)} onChange={event => setMetaField('keywords', csvToList(event.target.value))} className="consult-admin-input" placeholder="termo 1, termo 2" /></label>
            <label><span className="consult-admin-label">Tags</span><input disabled={!permissions.canEdit} value={listToCsv(draft.metadata?.tags)} onChange={event => setMetaField('tags', csvToList(event.target.value))} className="consult-admin-input" placeholder="tag 1, tag 2" /></label>
            <label className="md:col-span-2"><span className="consult-admin-label">Fonte / publicação original</span><input disabled={!permissions.canEdit} type="url" value={draft.source_url || ''} onChange={event => setField('source_url', event.target.value)} className="consult-admin-input" placeholder="https://..." /></label>
          </div>

          {permissions.canEdit && <div className="mt-7 flex flex-wrap gap-2 border-t border-[#E5F0ED] pt-5"><button type="button" onClick={() => persist('draft')} disabled={saving} className="consult-admin-button"><Save size={15} /> {saving ? 'Salvando...' : 'Salvar rascunho'}</button><button type="button" onClick={() => persist('review')} disabled={saving} className="consult-admin-button">Enviar para revisão</button>{draft.status === 'published' && draft.is_public ? <button type="button" onClick={() => persist('withdraw')} disabled={saving} className="consult-admin-button consult-admin-button-danger">Retirar da publicação</button> : <button type="button" onClick={() => persist('publish')} disabled={saving} className="consult-admin-button consult-admin-button-primary">Publicar na homologação</button>}{draft.status === 'published' && draft.is_public && <a href={consultPath(`blog/${draft.slug}`)} target="_blank" rel="noreferrer" className="consult-admin-button"><ExternalLink size={15} /> Abrir artigo</a>}</div>}
          <p className="mt-5 text-xs leading-5 text-[#78908E]">A ingestão automática nunca publica. Use revisão e publicação somente após conferir o conteúdo técnico e os campos SEO.</p>
        </section>
      </div>
    </div>
  )
}
