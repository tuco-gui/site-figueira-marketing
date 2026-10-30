import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Activity, BarChart3, BookOpen, ChevronRight, FileBarChart2, Gauge,
  Lightbulb, Link2, RefreshCw, Tags, Users, UserRound, Search, Megaphone,
  PanelLeftClose, PanelLeftOpen, CheckCircle2,
} from 'lucide-react'
import SitePostsAdmin from '@/components/consult/SitePostsAdmin'
import ConsultTrendRadar from '@/components/consult/ConsultTrendRadar'
import ConsultLiveReports from '@/components/consult/ConsultLiveReports'
import ConsultIndexingReport from '@/components/consult/ConsultIndexingReport'
import { CONSULT_PROJECT, consultPath } from '@/lib/consultProject'

const NAV = [
  { id: 'insights', label: 'Insights', icon: Lightbulb },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'search', label: 'Search Console', icon: Search },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'ads', label: 'Google Ads', icon: Megaphone },
  { id: 'indexing', label: 'Indexação', icon: CheckCircle2 },
  { id: 'social', label: 'Posts Social', icon: Activity },
  { id: 'users', label: 'Usuários', icon: Users },
  { id: 'leads', label: 'Leads', icon: UserRound },
]

const RESOURCES = {
  integrations: 'client_integrations',
  posts: 'site_posts',
  insights: 'seo_insights',
  snapshots: 'analytics_snapshots',
  ads: 'ads_recommendations',
  indexing: 'indexing_inspections',
  social: 'social_posts',
  leads: 'site_leads',
  users: 'client_users',
}

const TABLES = {
  insights: ['title', 'summary', 'source', 'status', 'created_at'],
  search: ['date', 'query', 'page', 'clicks', 'impressions', 'ctr', 'position', 'source', 'created_at'],
  analytics: ['date', 'metric', 'value', 'sessions', 'users', 'pageviews', 'source', 'created_at'],
  ads: ['campaign_name', 'recommendation', 'status', 'impressions', 'clicks', 'conversions', 'spend', 'created_at'],
  indexing: ['url', 'status', 'coverage_state', 'last_inspected_at', 'created_at'],
  social: ['title', 'platform', 'status', 'scheduled_at', 'published_at', 'created_at'],
  leads: ['name', 'email', 'phone', 'source', 'utm_source', 'utm_medium', 'status', 'created_at'],
  users: ['name', 'email', 'role', 'is_active', 'created_at'],
  integrations: ['provider', 'service', 'status', 'is_connected', 'last_sync_at'],
}

const CONFIG = {
  insights: { title: 'Insights', subtitle: 'Pautas e oportunidades de conteúdo registradas para a Consult.', table: 'insights' },
  search: { title: 'Search Console', subtitle: 'Consultas, páginas e desempenho orgânico vinculados ao projeto.', table: 'snapshots' },
  trends: { title: 'Radar de tendências', subtitle: 'Tendências de busca no Brasil e notícias recentes dos temas da Consult.', table: 'insights' },
  analytics: { title: 'Analytics', subtitle: 'Métricas de tráfego e comportamento registradas para o projeto.', table: 'snapshots' },
  ads: { title: 'Google Ads', subtitle: 'Recomendações e registros de campanhas associados à conta.', table: 'ads' },
  indexing: { title: 'Indexação', subtitle: 'Histórico de inspeções de URLs e situação de indexação.', table: 'indexing' },
  social: { title: 'Posts Social', subtitle: 'Conteúdos sociais vinculados à operação da Consult.', table: 'social' },
  leads: { title: 'Leads', subtitle: 'Contatos recebidos pelo site e seus dados de origem.', table: 'leads' },
  users: { title: 'Usuários', subtitle: 'Usuários cadastrados para o cliente Consult.', table: 'users' },
  tags: { title: 'Mensuração / Tags', subtitle: 'Integrações e fontes configuradas para mensuração.', table: 'integrations' },
  reports: { title: 'Relatórios', subtitle: 'Snapshots salvos de Analytics, Search Console e outras fontes.', table: 'snapshots' },
}

function headers(token) {
  return {
    apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    Authorization: 'Bearer ' + token,
    Accept: 'application/json',
  }
}

async function fetchRows(table, token, hasProject = true) {
  const base = import.meta.env.VITE_SUPABASE_URL
  if (!base || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) throw new Error('Supabase da Consult não está configurado.')
  const params = new URLSearchParams({ select: '*', client_id: 'eq.' + CONSULT_PROJECT.clientId, limit: '100' })
  if (hasProject) params.set('project_id', 'eq.' + CONSULT_PROJECT.projectId)
  const response = await fetch(base + '/rest/v1/' + table + '?' + params.toString(), { headers: headers(token) })
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) throw new Error('A sessão não tem permissão de leitura para esta área.')
    throw new Error('Não foi possível carregar os registros desta área.')
  }
  return response.json()
}

function valueText(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function dateText(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('pt-BR')
}

function safeFields(row) {
  return Object.keys(row || {}).filter(key => !/(secret|token|password|credential|api_key|apikey)/i.test(key))
}

function DataTable({ rows, columns, loading, error, emptyText }) {
  if (loading) return <div className="consult-admin-panel-state">Carregando registros...</div>
  if (error) return <div role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</div>
  if (!rows.length) return <div className="consult-admin-panel-state">{emptyText || 'Ainda não há registros nesta área.'}</div>
  const keys = columns || safeFields(rows[0])
  return <div className="consult-admin-table-wrap"><table className="consult-admin-table"><thead><tr>{keys.map(key => <th key={key}>{key.replaceAll('_', ' ')}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row.id || index}>{keys.map(key => <td key={key}>{/(_at|date)$/.test(key) ? dateText(row[key]) : valueText(row[key])}</td>)}</tr>)}</tbody></table></div>
}

function Metric({ label, value, note }) {
  return <article className="consult-admin-metric"><p>{label}</p><strong>{value}</strong>{note && <small>{note}</small>}</article>
}

function Dashboard({ posts, data, onNavigate }) {
  const published = posts.filter(post => post.status === 'published' && post.is_public).length
  const integrations = data.integrations || []
  const connected = integrations.filter(item => item.is_connected === true || item.status === 'connected' || item.status === 'active').length
  return <section className="consult-admin-module">
    <div className="consult-admin-module-heading"><div><p className="consult-admin-kicker">Painel editorial e de mensuração</p><h2>Visão geral</h2><p>Acompanhe o conteúdo, os registros e o estado das integrações da Consult.</p></div><a className="consult-admin-button" href={consultPath('blog')} target="_blank" rel="noreferrer">Ver blog público <ChevronRight size={15} /></a></div>
    <div className="consult-admin-metrics">
      <Metric label="Artigos" value={posts.length} note={published + ' publicados'} />
      <Metric label="Leads" value={(data.leads || []).length} note="registros disponíveis" />
      <Metric label="Insights SEO" value={(data.insights || []).length} note="itens registrados" />
      <Metric label="Integrações" value={connected + ' / ' + integrations.length} note="conexões identificadas" />
    </div>
    <div className="consult-admin-overview-grid">
      <button className="consult-admin-overview-link" onClick={() => onNavigate('blog')}><BookOpen /><span><b>Conteúdo do blog</b><small>Revisar rascunhos e artigos publicados</small></span><ChevronRight /></button>
      <button className="consult-admin-overview-link" onClick={() => onNavigate('insights')}><Lightbulb /><span><b>Insights de conteúdo</b><small>Consultar oportunidades registradas</small></span><ChevronRight /></button>
      <button className="consult-admin-overview-link" onClick={() => onNavigate('tags')}><Link2 /><span><b>Integrações</b><small>Ver fontes e registros de sincronização</small></span><ChevronRight /></button>
      <button className="consult-admin-overview-link" onClick={() => onNavigate('leads')}><UsersRound /><span><b>Leads do site</b><small>Consultar contatos e origem</small></span><ChevronRight /></button>
    </div>
  </section>
}

export default function ConsultAdminWorkspace({ session, client, project, profile, onLogout }) {
  const [active, setActive] = useState('insights')
  const [collapsed, setCollapsed] = useState(() => { try { return window.localStorage.getItem('consult-admin-sidebar-collapsed') === 'true' } catch { return false } })
  const [articleSeed, setArticleSeed] = useState(null)
  useEffect(() => { try { window.localStorage.setItem('consult-admin-sidebar-collapsed', String(collapsed)) } catch {} }, [collapsed])
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  const load = useCallback(async () => {
    if (!session?.access_token) return
    setLoading(true)
    const entries = Object.entries(RESOURCES)
    const results = await Promise.all(entries.map(async ([key, table]) => {
      try {
        const rows = await fetchRows(table, session.access_token, key !== 'users')
        return [key, { rows, error: '' }]
      } catch (err) {
        return [key, { rows: [], error: err.message || 'Falha ao carregar.' }]
      }
    }))
    setData(Object.fromEntries(results.map(([key, value]) => [key, value.rows])))
    setError(Object.fromEntries(results.map(([key, value]) => [key, value.error])))
    setLoading(false)
  }, [session?.access_token])

  useEffect(() => { load() }, [load])

  const title = NAV.find(item => item.id === active)?.label || 'Insights'
  const renderModule = () => {
    if (active === 'blog') return <SitePostsAdmin session={session} client={client} project={project} profile={profile} initialInsight={articleSeed} onInsightConsumed={() => setArticleSeed(null)} />
    if (active === 'insights') return <ConsultTrendRadar session={session} onCreateArticle={item => { setArticleSeed({ title: item.title, excerpt: item.query ? `Insight relacionado a ${item.query}. Desenvolva o artigo com base na fonte selecionada.` : 'Tema identificado no Google Trends. Pesquise fontes técnicas antes de redigir.', source_url: item.url, category: 'Diagnóstico por Imagem', keywords: item.query ? [item.query] : [] }); setActive('blog') }} />
    if (active === 'search') return <ConsultLiveReports key="search" session={session} initialTab="search" hideTabs />
    if (active === 'analytics') return <ConsultLiveReports key="analytics" session={session} initialTab="ga4" hideTabs />
    if (active === 'ads') return <ConsultLiveReports key="ads" session={session} initialTab="ads" hideTabs />
    if (active === 'indexing') return <ConsultIndexingReport session={session} />
    const config = CONFIG[active]
    if (!config) return null
    const rows = data[config.table] || []
    return <section className="consult-admin-module">
      <div className="consult-admin-module-heading"><div><p className="consult-admin-kicker">Consult · {title}</p><h2>{config.title}</h2><p>{config.subtitle}</p></div><button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15} /> Atualizar</button></div>
      <DataTable rows={rows} columns={TABLES[active]} loading={loading} error={error[config.table]} />
    </section>
  }

  return <main className="consult-admin-app consult-admin-app-shell">
    <div className={'consult-admin-workspace-layout' + (collapsed ? ' is-collapsed' : '')}>
      <aside className="consult-admin-sidebar" aria-label="Menu administrativo">
        <div className="consult-admin-sidebar-heading">
          <span className="consult-admin-side-title">{collapsed ? 'Admin' : 'Administração'}</span>
          <button type="button" className="consult-admin-sidebar-toggle" onClick={() => setCollapsed(value => !value)} aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'} title={collapsed ? 'Expandir menu' : 'Recolher menu'}>
            {collapsed ? <PanelLeftOpen size={18}/> : <PanelLeftClose size={18}/>}
          </button>
        </div>
        <nav aria-label="Seções administrativas">
          {NAV.map(item => { const Icon = item.icon; return <button key={item.id} type="button" onClick={() => setActive(item.id)} className={'consult-admin-nav-item' + (active === item.id ? ' is-active' : '')} aria-current={active === item.id ? 'page' : undefined} title={collapsed ? item.label : undefined}><Icon size={18}/><span>{item.label}</span></button> })}
        </nav>
      </aside>
      <section className="consult-admin-main" aria-label={title}>
        <div className="consult-admin-module-heading consult-admin-workspace-heading"><div><p className="consult-admin-kicker">Consult · Administração</p><h2>Administração</h2><p>Gerencie o conteúdo e acompanhe o desempenho de SEO.</p></div>{active !== 'blog' && <button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15}/> Atualizar</button>}</div>
        {renderModule()}
      </section>
    </div>
  </main>
}
