import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Activity, BookOpen, ChevronRight, FileBarChart2, Gauge,
  Lightbulb, Link2, RefreshCw, Tags,
  Users, UserRound, UsersRound,
} from 'lucide-react'
import SitePostsAdmin from '@/components/consult/SitePostsAdmin'
import ConsultTrendRadar from '@/components/consult/ConsultTrendRadar'
import ConsultLiveReports from '@/components/consult/ConsultLiveReports'
import { CONSULT_PROJECT, consultPath } from '@/lib/consultProject'

const NAV = [
  { id: 'overview', label: 'Visão geral', icon: Gauge },
  { id: 'reports', label: 'Desempenho', icon: FileBarChart2 },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
  { id: 'trends', label: 'Radar de tendências', icon: Lightbulb },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'social', label: 'Posts Social', icon: Activity },
  { id: 'leads', label: 'Leads', icon: UserRound },
  { id: 'tags', label: 'Integrações', icon: Tags },
  { id: 'users', label: 'Usuários', icon: Users },
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
  const [active, setActive] = useState('overview')
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

  const title = NAV.find(item => item.id === active)?.label || 'Visão geral'
  const renderModule = () => {
    if (active === 'overview') return <Dashboard posts={data.posts || []} data={data} onNavigate={setActive} />
    if (active === 'blog') return <SitePostsAdmin session={session} client={client} project={project} profile={profile} />
    if (active === 'trends') return <ConsultTrendRadar session={session} />
    if (active === 'reports') return <ConsultLiveReports session={session} snapshots={data.snapshots || []} />
    const config = CONFIG[active]
    if (!config) return null
    const rows = active === 'search'
      ? (data.snapshots || []).filter(row => /search|console|gsc/i.test(String(row.source || row.provider || row.type || row.category || '')))
      : active === 'analytics'
        ? (data.snapshots || []).filter(row => /analytics|ga4/i.test(String(row.source || row.provider || row.type || row.category || '')))
        : active === 'reports' ? data.snapshots || [] : data[config.table] || []
    const resourceKey = config.table
    const noSnapshots = ['search', 'analytics'].includes(active) && rows.length === 0
    return <section className="consult-admin-module">
      <div className="consult-admin-module-heading"><div><p className="consult-admin-kicker">Consult · {title}</p><h2>{config.title}</h2><p>{config.subtitle}</p></div><button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15} /> Atualizar</button></div>
      {(active === 'search' || active === 'analytics' || active === 'ads' || active === 'tags') && <div className="consult-admin-info">Os dados exibidos são os registros disponíveis no Supabase da Consult. Métricas ao vivo dependem da integração correspondente e da sincronização de dados.</div>}
      <DataTable rows={rows} columns={TABLES[active] || (active === 'reports' ? safeFields(rows[0]) : undefined)} loading={loading} error={error[resourceKey]} emptyText={noSnapshots ? 'Nenhum snapshot desta fonte foi registrado para o projeto. Verifique a conexão e a sincronização da integração.' : undefined} />
    </section>
  }

  return <main className="consult-admin-app">
    <header className="consult-admin-topbar"><div className="consult-admin-brand-lockup"><div className="consult-admin-brand-mark">C</div><div><p className="consult-admin-kicker">Figueira Marketing · Cliente</p><h1>Consult Radiometria e Qualidade</h1></div></div><div className="consult-admin-top-actions"><a className="consult-admin-button" href={consultPath('blog')} target="_blank" rel="noreferrer">Ver blog</a><button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15} /> Atualizar</button><button type="button" onClick={onLogout} className="consult-admin-button">Sair</button></div></header>
    <nav className="consult-admin-sidebar" aria-label="Navegação do painel"><div className="consult-admin-nav-inner">{NAV.map(item => { const Icon = item.icon; return <button key={item.id} type="button" onClick={() => setActive(item.id)} className={'consult-admin-nav-item' + (active === item.id ? ' is-active' : '')} aria-current={active === item.id ? 'page' : undefined}><Icon size={16} /><span>{item.label}</span></button> })}</div></nav>
    <div className="consult-admin-main"><div className="consult-admin-mobile-title">{title}</div>{renderModule()}</div>
    <footer className="consult-admin-footer"><span>Painel de desempenho · Consult · homologação</span><span>Relatório por Figueira Marketing</span></footer>
  </main>
}
