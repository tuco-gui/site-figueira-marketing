import React, { useEffect, useMemo, useState } from 'react'
import { ExternalLink, FilePenLine, Plus, RefreshCw, Save, Share2, Sparkles, Trash2, X } from 'lucide-react'
import {
  createSitePostAdmin,
  getSitePostPermissions,
  getSitePostsAdmin,
  updateSitePostAdmin,
  deleteSitePostAdmin,
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

export default function SitePostsAdmin({ session, client, project, profile, initialInsight, onInsightConsumed }) {
  const [posts, setPosts] = useState([])
  const [draft, setDraft] = useState(emptyDraft)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorTab, setEditorTab] = useState('content')
  const [aiProviders, setAiProviders] = useState(null)
  const [aiProvider, setAiProvider] = useState('gemini')
  const [generating, setGenerating] = useState(false)
  const [findingGap, setFindingGap] = useState(false)
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

  useEffect(() => {
    if (!session?.access_token) return
    let active = true
    fetch('/api/consult/ai-providers', { headers: { Authorization: 'Bearer ' + session.access_token }, cache: 'no-store' })
      .then(response => response.json().then(data => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!active) return
        if (ok) {
          setAiProviders(data.providers || {})
          setAiProvider(data.defaultProvider || 'gemini')
        }
      })
      .catch(() => { if (active) setAiProviders({}) })
    return () => { active = false }
  }, [session?.access_token])


  useEffect(() => {
    if (!initialInsight) return
    setDraft({ ...emptyDraft, title: initialInsight.title || '', slug: slugify(initialInsight.title || ''), excerpt: initialInsight.excerpt || '', content_markdown: '', seo_title: String(initialInsight.title || '').slice(0, 60), seo_description: String(initialInsight.excerpt || initialInsight.title || 'Insight do setor Consult.').slice(0, 160), source_url: initialInsight.source_url || '', category: initialInsight.category || 'Diagnóstico por Imagem', metadata: { ...defaultMetadata, keywords: initialInsight.keywords || [], source_insight: initialInsight.title || '', generation_source: { title: initialInsight.title || '', excerpt: initialInsight.excerpt || '', source_url: initialInsight.source_url || '', category: initialInsight.category || '', keywords: initialInsight.keywords || [], context: initialInsight.context || '' } } })
    setSlugTouched(false)
    setEditorTab('content')
    setEditorOpen(true)
    setMessage('Rascunho iniciado a partir de um Insight da Consult. Desenvolva o conteúdo e valide as fontes antes da revisão.')
    onInsightConsumed?.()
  }, [initialInsight?.source_url])

  async function generateArticle(sourceOverride = null) {
    if (!permissions.canEdit || generating) return
    const source = sourceOverride || draft.metadata?.generation_source || {
      title: draft.metadata?.source_insight || draft.title,
      excerpt: draft.excerpt || '',
      source_url: draft.source_url || '',
      category: draft.category || '',
      keywords: draft.metadata?.keywords || [],
    }
    if (!source.title) {
      setError('Abra um Insight da Consult e escolha “Criar artigo” para gerar o conteúdo a partir dele.')
      return
    }
    setGenerating(true)
    setError('')
    setMessage('')
    try {
      const response = await fetch('/api/consult/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + session.access_token },
        body: JSON.stringify({ provider: aiProvider, insight: source }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível gerar o artigo.')
      const article = data.article
      setDraft(previous => ({
        ...previous,
        title: article.title || previous.title,
        slug: article.slug || slugify(article.title || previous.title),
        excerpt: article.excerpt || previous.excerpt,
        content_markdown: article.content_markdown || '',
        seo_title: article.seo_title || article.title || '',
        seo_description: article.seo_description || article.excerpt || '',
        category: article.category || previous.category,
        status: 'draft',
        is_public: false,
        metadata: { ...defaultMetadata, ...(previous.metadata || {}), seo_intro: article.seo_intro || article.excerpt || '', keywords: article.keywords || source.keywords || [], tags: article.tags || [], source_insight: source.title, generation_provider: data.provider },
      }))
      setSlugTouched(true)
      setMessage('Artigo gerado como rascunho. Revise dados, fontes e conteúdo antes de enviar para aprovação.')
    } catch (err) {
      setError(err.message || 'Não foi possível gerar o artigo.')
    } finally {
      setGenerating(false)
    }
  }

  async function generateFromSeoGap() {
    if (!permissions.canEdit || generating || findingGap) return
    setFindingGap(true)
    setError('')
    setMessage('')
    try {
      const response = await fetch('/api/consult/seo-gaps', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + session.access_token }, body: JSON.stringify({}) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Não foi possível cruzar Ads e Search Console.')
      const gap = result.gaps?.[0]
      if (!gap) { setMessage(result.message || 'Nenhuma oportunidade nova encontrada para o nicho da Consult.'); return }
      const source = { title: gap.term, excerpt: 'Oportunidade editorial identificada no cruzamento de termos de busca do Google Ads e consultas orgânicas do Search Console nos últimos 30 dias. ' + gap.impressions + ' impressões e ' + gap.clicks + ' cliques pagos; sem cobertura orgânica correspondente.', source_url: '', category: 'Diagnóstico por Imagem', keywords: [gap.term], context: 'O termo é uma oportunidade de busca relacionada ao nicho da Consult. Explique o tema tecnicamente e de forma informativa, sem afirmar que a Consult oferece um serviço não confirmado.', ads_metrics: { impressions: gap.impressions, clicks: gap.clicks, conversions: gap.conversions } }
      setDraft(previous => ({ ...previous, metadata: { ...defaultMetadata, ...(previous.metadata || {}), generation_source: source, source_insight: source.title } }))
      await generateArticle(source)
    } catch (err) { setError(err.message || 'Não foi possível identificar a oportunidade de SEO.') }
    finally { setFindingGap(false) }
  }
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
    setEditorOpen(true)
    setEditorTab('content')
    setDraft({ ...emptyDraft, metadata: { ...defaultMetadata } })
    setSlugTouched(false)
    setError('')
    setMessage('')
  }

  function edit(post) {
    setEditorOpen(true)
    setEditorTab('content')
    setDraft(normalizePost(post))
    setSlugTouched(true)
    setError('')
    setMessage('')
  }

  async function removePost(post) {
    if (!permissions.canEdit || !window.confirm(`Excluir o artigo “${post.title}”?`)) return
    setError('')
    setMessage('')
    try {
      await deleteSitePostAdmin(session.access_token, post.id, { profile, client, project })
      setPosts(previous => previous.filter(item => item.id !== post.id))
      if (draft.id === post.id) { setDraft({ ...emptyDraft, metadata: { ...defaultMetadata } }); setEditorOpen(false) }
      setMessage('Artigo excluído.')
    } catch (err) {
      setError(err.message || 'Não foi possível excluir o artigo.')
    }
  }

  async function copyPostLink(post) {
    const url = post.status === 'published' && post.is_public
      ? new URL(consultPath(`blog/${post.slug}`), window.location.origin).toString()
      : new URL(consultPath(`admin`), window.location.origin).toString()
    try { await navigator.clipboard.writeText(url); setMessage('Link copiado.') }
    catch { setError('Não foi possível copiar o link neste navegador.') }
  }

  function cancelEditor() {
    setEditorOpen(false)
    setDraft({ ...emptyDraft, metadata: { ...defaultMetadata } })
    setSlugTouched(false)
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

  const tabs = [
    ['content', 'Conteúdo'], ['seo', 'SEO'], ['social', 'Social'], ['advanced', 'Avançado'],
  ]
  return <div className="consult-admin-editor consult-blog-admin">
    {!permissions.canEdit && permissions.canRead && <div className="consult-admin-alert">Seu acesso é somente leitura.</div>}
    {error && <div role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</div>}
    {message && <div role="status" className="consult-admin-alert consult-admin-alert-ok">{message}</div>}
    <div className="consult-blog-heading">
      <div><h3>Artigos do Blog</h3><p>Gerencie os artigos da Consult e revise os conteúdos originados dos Insights.</p></div>
      <div className="consult-blog-actions"><button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15}/> Atualizar</button>{permissions.canEdit && <button type="button" onClick={beginNew} className="consult-admin-button consult-admin-button-primary"><Plus size={15}/> Novo Artigo</button>}</div>
    </div>
    {editorOpen && <section className="consult-blog-editor-card">
      <header className="consult-blog-editor-heading"><div><FilePenLine size={17}/><strong>{draft.id ? 'Editar Artigo' : 'Novo Artigo'}</strong></div><div className="consult-blog-seo-score"><small>Pontuação SEO</small><b>{seoScore}/100</b></div></header>
      <nav className="consult-blog-editor-tabs" aria-label="Campos do artigo">{tabs.map(([id,label]) => <button key={id} type="button" onClick={() => setEditorTab(id)} className={editorTab === id ? 'is-active' : ''}>{label}</button>)}</nav>
      {editorTab === 'content' && <section className="consult-ai-generation-card">
        <div className="consult-ai-generation-copy">
          <div className="consult-ai-generation-title"><Sparkles size={17}/><strong>Motor de conteúdo por Insight e oportunidade SEO</strong></div>
          <p>Gera artigos a partir dos Insights do setor ou identifica lacunas cruzando termos pagos do Google Ads com consultas do Search Console. O tema precisa ser relacionado à Consult; o texto sempre fica como rascunho para revisão.</p>
        </div>
        <div className="consult-ai-generation-controls">
          <label><span>Provedor de IA</span><select value={aiProvider} onChange={event => setAiProvider(event.target.value)} disabled={generating} className="consult-admin-input">
            <option value="gemini">Gemini {aiProviders?.gemini ? '— conectado' : '— chave pendente'}</option>
            <option value="openai">ChatGPT {aiProviders?.openai ? '— conectado' : '— chave pendente'}</option>
          </select></label>
          <button type="button" onClick={generateArticle} disabled={!permissions.canEdit || generating || !aiProviders?.[aiProvider]} className="consult-admin-button consult-admin-button-primary">
            <Sparkles size={15}/>{generating ? 'Gerando artigo…' : 'Gerar artigo completo'}
          </button>
          <button type="button" onClick={generateFromSeoGap} disabled={!permissions.canEdit || generating || findingGap || !aiProviders?.[aiProvider]} className="consult-admin-button">
            <Search size={15}/>{findingGap ? 'Buscando lacunas Ads + orgânico…' : 'Gerar a partir de Ads + Search Console'}
          </button>
        </div>
        {!aiProviders?.[aiProvider] && <div className="consult-ai-generation-setup">
          <span>A chave deste provedor ainda não está configurada no servidor. Para testar, crie uma chave na conta Gemini da Consult e cadastre-a como <code>GEMINI_API_KEY</code> nas variáveis do projeto de homologação.</span>
          <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">Criar chave Gemini <ExternalLink size={13}/></a>
          <a href="https://vercel.com/guis-projects-9aec09da/site-figueira-marketing/settings/environment-variables" target="_blank" rel="noreferrer">Abrir variáveis do projeto <ExternalLink size={13}/></a>
          <small>Para usar ChatGPT depois, configure <code>OPENAI_API_KEY</code>. As chaves ficam no servidor e não são exibidas no navegador.</small>
        </div>}
      </section>}
      {editorTab === 'content' && <div className="consult-blog-editor-fields">
        <label className="full"><span>Título *</span><input disabled={!permissions.canEdit} value={draft.title} onChange={event => setField('title', event.target.value)} className="consult-admin-input"/></label>
        <label><span>Slug (URL)</span><input disabled={!permissions.canEdit} value={draft.slug} onChange={event => { setSlugTouched(true); setField('slug', event.target.value) }} className="consult-admin-input"/><small>URL: /blog/{draft.slug || 'seu-artigo'}</small></label>
        <label className="full"><span>Resumo</span><textarea disabled={!permissions.canEdit} rows={3} value={draft.excerpt || ''} onChange={event => setField('excerpt', event.target.value)} className="consult-admin-input"/></label>
        <label className="full"><span>Introdução SEO</span><textarea disabled={!permissions.canEdit} rows={3} value={draft.metadata?.seo_intro || ''} onChange={event => setMetaField('seo_intro',event.target.value)} className="consult-admin-input"/></label>
        <label className="full"><span>Conteúdo *</span><textarea disabled={!permissions.canEdit} rows={16} value={draft.content_markdown || ''} onChange={event => setField('content_markdown',event.target.value)} className="consult-admin-input consult-blog-markdown" placeholder="Desenvolva o conteúdo com base no Insight selecionado e nas fontes indicadas. Confira os dados técnicos antes de enviar para revisão."/></label>
        <label><span>Categoria</span><input disabled={!permissions.canEdit} value={draft.category || ''} onChange={event => setField('category',event.target.value)} className="consult-admin-input"/></label>
        <label><span>Imagem de capa</span><input disabled={!permissions.canEdit} type="url" value={draft.cover_url || ''} onChange={event => setField('cover_url',event.target.value)} placeholder="https://..." className="consult-admin-input"/></label>
      </div>}
      {editorTab === 'seo' && <div className="consult-blog-editor-fields">
        <label className="full"><span>Meta Title ({(draft.seo_title || '').length}/60) *</span><input disabled={!permissions.canEdit} maxLength={60} value={draft.seo_title || ''} onChange={event => setField('seo_title',event.target.value)} className="consult-admin-input"/></label>
        <label className="full"><span>Meta Description ({(draft.seo_description || '').length}/160) *</span><textarea disabled={!permissions.canEdit} maxLength={160} rows={3} value={draft.seo_description || ''} onChange={event => setField('seo_description',event.target.value)} className="consult-admin-input"/></label>
        <label className="full"><span>Palavras-chave</span><div className="consult-blog-inline-input"><input disabled={!permissions.canEdit} value={listToCsv(draft.metadata?.keywords)} onChange={event => setMetaField('keywords',csvToList(event.target.value))} placeholder="Separe por vírgulas" className="consult-admin-input"/></div></label>
        <label className="full"><span>Tags</span><input disabled={!permissions.canEdit} value={listToCsv(draft.metadata?.tags)} onChange={event => setMetaField('tags',csvToList(event.target.value))} placeholder="Separe por vírgulas" className="consult-admin-input"/></label>
        <div className="consult-blog-editor-note full"><strong>Análise de SEO</strong><span>O título, a descrição, o slug, o resumo e as palavras-chave contribuem para a pontuação.</span></div>
      </div>}
      {editorTab === 'social' && <div className="consult-blog-editor-fields">
        <div className="consult-blog-social-preview full"><small>Prévia Redes Sociais</small><strong>{draft.metadata?.og_title || draft.title || 'Título Social'}</strong><span>{draft.metadata?.og_description || draft.excerpt || 'Descrição do artigo'}</span></div>
        <label className="full"><span>Título Social (Open Graph)</span><input disabled={!permissions.canEdit} value={draft.metadata?.og_title || ''} onChange={event => setMetaField('og_title',event.target.value)} className="consult-admin-input"/></label>
        <label className="full"><span>Descrição Social</span><textarea disabled={!permissions.canEdit} rows={3} value={draft.metadata?.og_description || ''} onChange={event => setMetaField('og_description',event.target.value)} className="consult-admin-input"/></label>
        <label className="full"><span>Imagem Open Graph (1200x630px recomendado)</span><input disabled={!permissions.canEdit} value={draft.metadata?.og_image || ''} onChange={event => setMetaField('og_image',event.target.value)} placeholder="https://..." className="consult-admin-input"/></label>
      </div>}
      {editorTab === 'advanced' && <div className="consult-blog-editor-fields">
        <label><span>Status do Artigo</span><select disabled={!permissions.canEdit} value={draft.status || 'draft'} onChange={event => setField('status',event.target.value)} className="consult-admin-input"><option value="draft">Rascunho</option><option value="review">Em revisão</option><option value="published">Publicado</option></select></label>
        <label><span>Autor</span><input disabled={!permissions.canEdit} value={draft.author || ''} onChange={event => setField('author',event.target.value)} className="consult-admin-input"/></label>
        <label className="full"><span>Fonte / publicação original</span><input disabled={!permissions.canEdit} type="url" value={draft.source_url || ''} onChange={event => setField('source_url',event.target.value)} placeholder="https://..." className="consult-admin-input"/></label>
        <label><span>Texto do CTA</span><input disabled={!permissions.canEdit} value={draft.metadata?.cta_text || ''} onChange={event => setMetaField('cta_text',event.target.value)} className="consult-admin-input"/></label>
        <label><span>Link do CTA</span><input disabled={!permissions.canEdit} value={draft.metadata?.cta_link || ''} onChange={event => setMetaField('cta_link',event.target.value)} className="consult-admin-input"/></label>
        <label className="consult-blog-check full"><input disabled={!permissions.canEdit} type="checkbox" checked={draft.metadata?.allow_indexing !== false} onChange={event => setMetaField('allow_indexing',event.target.checked)}/><span>Permitir indexação pelos buscadores</span></label>
        <div className="consult-blog-editor-note full"><strong>Origem editorial</strong><span>Os artigos podem ser preparados a partir de Insights relacionados aos serviços e ao público da Consult. A revisão técnica continua antes da publicação.</span></div>
      </div>}
      <footer className="consult-blog-editor-footer">
        {permissions.canEdit && <><button type="button" onClick={() => persist('draft')} disabled={saving} className="consult-admin-button">{saving ? 'Salvando...' : draft.id ? 'Atualizar Artigo' : 'Criar Artigo'}</button><button type="button" onClick={() => persist('review')} disabled={saving} className="consult-admin-button">Enviar para revisão</button>{draft.status === 'published' && draft.is_public ? <button type="button" onClick={() => persist('withdraw')} disabled={saving} className="consult-admin-button">Retirar da publicação</button> : <button type="button" onClick={() => persist('publish')} disabled={saving} className="consult-admin-button consult-admin-button-primary">Publicar na homologação</button>}</>}
        <button type="button" onClick={cancelEditor} className="consult-admin-button"><X size={14}/> Cancelar</button>
        {draft.status === 'published' && draft.is_public && <a href={consultPath(`blog/${draft.slug}`)} target="_blank" rel="noreferrer" className="consult-admin-button"><ExternalLink size={15}/> Abrir artigo</a>}
      </footer>
    </section>}
    <div className="consult-blog-list">
      {loading && <div className="consult-admin-panel-state">Carregando artigos…</div>}
      {!loading && !posts.length && <div className="consult-admin-panel-state">Nenhum artigo cadastrado.</div>}
      {posts.map(post => <article key={post.id} className="consult-blog-post-card">
        <div className="consult-blog-post-actions">
          <button type="button" onClick={() => copyPostLink(post)} aria-label={`Copiar link de ${post.title}`} title="Compartilhar"><Share2 size={15}/></button>
          <button type="button" onClick={() => edit(post)} aria-label={`Editar ${post.title}`} title="Editar"><FilePenLine size={15}/></button>
          {permissions.canEdit && <button type="button" onClick={() => removePost(post)} aria-label={`Excluir ${post.title}`} title="Excluir"><Trash2 size={15}/></button>}
        </div>
        <div className="consult-blog-post-title"><h4>{post.title}</h4><span className="consult-blog-category">{post.category || 'Sem categoria'}</span><span className={'consult-blog-status ' + (post.status === 'published' && post.is_public ? 'is-published' : post.status === 'review' ? 'is-review' : 'is-draft')}>{statusLabel(post)}</span></div>
        <p>{post.excerpt || 'Sem resumo cadastrado.'}</p>
        {post.metadata?.keywords?.length > 0 && <div className="consult-blog-tags">{post.metadata.keywords.map(tag => <span key={tag}>{tag}</span>)}</div>}
      </article>)}
    </div>
  </div>
}
