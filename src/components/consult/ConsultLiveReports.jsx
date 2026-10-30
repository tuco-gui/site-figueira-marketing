import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import {
  AlertTriangle, BarChart3, CalendarDays, CheckCircle2, Clipboard,
  FileText, Search, TrendingUp, Users,
} from 'lucide-react'
import ConsultIndexingReport from '@/components/consult/ConsultIndexingReport'

const REPORT_TABS = [
  { id: 'overview', label: 'Visão geral', icon: BarChart3 },
  { id: 'ga4', label: 'GA4', icon: Users },
  { id: 'search', label: 'Search Console', icon: Search },
  { id: 'indexing', label: 'Indexação', icon: CheckCircle2 },
  { id: 'ads', label: 'Google Ads', icon: TrendingUp },
  { id: 'diagnostic', label: 'Diagnóstico', icon: AlertTriangle },
  { id: 'report', label: 'Relatório', icon: FileText },
]

function dateString(date) { return date.toISOString().slice(0, 10) }
function defaultRange() {
  const end = new Date()
  end.setUTCDate(end.getUTCDate() - 3)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 364)
  return { startDate: dateString(start), endDate: dateString(end) }
}
function shiftDays(value, days) {
  const date = new Date(`${value}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return dateString(date)
}
function integer(value) { return Number(value || 0).toLocaleString('pt-BR') }
function decimal(value, digits = 1) { return Number(value || 0).toLocaleString('pt-BR', { maximumFractionDigits: digits }) }
function percent(value) { return `${(Number(value || 0) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%` }
function currency(value) { return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function dateLabel(value) {
  if (!value) return '—'
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}
function monthLabel(value) {
  const match = String(value || '').match(/^(\d{4})(\d{2})/)
  if (!match) return value
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1)).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit', timeZone: 'UTC' })
}

function Metric({ label, value, note, tone = '' }) {
  return <article className={`consult-admin-metric ${tone}`}><p>{label}</p><strong>{value}</strong>{note && <small>{note}</small>}</article>
}

function Panel({ title, subtitle, children, className = '' }) {
  return <article className={`consult-admin-report-panel ${className}`}><header><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div></header>{children}</article>
}

function ReportTable({ title, rows = [], fields, emptyText, subtitle }) {
  return <Panel title={title} subtitle={subtitle}>
    {rows.length ? <div className="consult-admin-table-wrap"><table className="consult-admin-table"><thead><tr>{fields.map(field => <th key={field.key}>{field.label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row.key || row.url || index}-${index}`}>{fields.map(field => <td key={field.key}>{field.render ? field.render(row[field.key], row) : row[field.key] || '—'}</td>)}</tr>)}</tbody></table></div> : <p className="consult-admin-report-empty">{emptyText || 'Sem dados disponíveis neste período.'}</p>}
  </Panel>
}

function monthlySearch(daily = []) {
  const months = new Map()
  daily.forEach(row => {
    const month = String(row.key || '').slice(0, 6)
    if (!/^\d{6}$/.test(month)) return
    const current = months.get(month) || { key: month, label: monthLabel(month), clicks: 0, impressions: 0 }
    current.clicks += Number(row.clicks || 0)
    current.impressions += Number(row.impressions || 0)
    months.set(month, current)
  })
  return [...months.values()].sort((a, b) => a.key.localeCompare(b.key))
}

function ReportTableNotice({ children, tone = 'info' }) {
  return <div className={`consult-admin-report-notice is-${tone}`}>{children}</div>
}

export default function ConsultLiveReports({ session, snapshots = [], initialTab = 'overview', hideTabs = false }) {
  const initialRange = useMemo(defaultRange, [])
  const [activeTab, setActiveTab] = useState(initialTab)
  const [preset, setPreset] = useState('12m')
  const [startDate, setStartDate] = useState(initialRange.startDate)
  const [endDate, setEndDate] = useState(initialRange.endDate)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const load = useCallback(async () => {
    if (!session?.access_token) return
    setLoading(true)
    setError('')
    const params = new URLSearchParams({ startDate, endDate })
    try {
      const response = await fetch(`/api/consult/reports?${params.toString()}`, { headers: { Authorization: `Bearer ${session.access_token}` } })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Não foi possível consultar os relatórios.')
      setData(result)
    } catch (err) {
      setError(err.message || 'Não foi possível consultar os relatórios.')
    } finally {
      setLoading(false)
    }
  }, [session?.access_token, startDate, endDate])

  useEffect(() => { load() }, [load])

  function choosePreset(value) {
    setPreset(value)
    if (value === 'custom') return
    const rangeEnd = defaultRange().endDate
    const days = value === '28d' ? 27 : value === '90d' ? 89 : 364
    setEndDate(rangeEnd)
    setStartDate(shiftDays(rangeEnd, -days))
  }

  const ga4 = data?.ga4?.status === 'available' ? data.ga4.total : null
  const gsc = data?.searchConsole?.totals
  const channels = data?.channels || []
  const organicSessions = channels.find(row => /organic search/i.test(row.key || ''))?.sessions
  const trafficSeries = useMemo(() => (data?.monthlyTraffic || []).map(row => ({ ...row, label: monthLabel(row.key) })), [data])
  const searchSeries = useMemo(() => monthlySearch(data?.searchConsole?.daily), [data])
  const opportunities = useMemo(() => (data?.searchConsole?.queries || [])
    .filter(row => Number(row.impressions) >= 30 && Number(row.ctr) < 0.02)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10), [data])

  const reportText = useMemo(() => {
    const lines = [
      'RELATÓRIO DE DESEMPENHO DIGITAL — CONSULT',
      'FIGUEIRA MARKETING',
      `Período analisado: ${dateLabel(data?.window?.startDate || startDate)} a ${dateLabel(data?.window?.endDate || endDate)}`,
      '',
      'RESULTADOS DO PERÍODO',
      `Google Analytics 4: ${ga4 ? `${integer(ga4.sessions)} sessões e ${integer(ga4.users)} usuários.` : 'dados indisponíveis nesta consulta.'}`,
      `Search Console: ${gsc ? `${integer(gsc.clicks)} cliques e ${integer(gsc.impressions)} impressões; CTR ${percent(gsc.ctr)}; posição média ${decimal(gsc.position)}.` : 'dados indisponíveis nesta consulta.'}`,
      `Google Ads: ${data?.ads?.status === 'awaiting_mcc_link' ? 'conta ainda sem vínculo à MCC; sem campanhas para reportar.' : 'dados indisponíveis.'}`,
      '',
      'FONTES E LIMITES',
      'GA4 mede tráfego e comportamento; Search Console mede presença orgânica na busca. A inspeção de indexação é exibida na aba Indexação e consulta URLs individuais.',
      `Atualizado em: ${data?.generatedAt ? new Date(data.generatedAt).toLocaleString('pt-BR') : 'não consultado'}.`,
    ]
    return lines.join('\n')
  }, [data, endDate, ga4, gsc, startDate])

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(reportText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch { setError('Não foi possível copiar o relatório neste navegador.') }
  }

  const tabs = REPORT_TABS.map(tab => {
    const Icon = tab.icon
    return <button type="button" key={tab.id} onClick={() => setActiveTab(tab.id)} className={'consult-admin-performance-tab' + (activeTab === tab.id ? ' is-active' : '')} aria-current={activeTab === tab.id ? 'page' : undefined}><Icon size={16}/>{tab.label}</button>
  })

  return <section className="consult-admin-module consult-admin-performance">
    <div className="consult-admin-module-heading consult-admin-performance-heading"><div><p className="consult-admin-kicker">Figueira Marketing · Consult</p><h2>Painel de desempenho</h2><p>GA4, Search Console, indexação e resultados de mídia em um relatório único.</p></div><button type="button" onClick={load} disabled={loading} className="consult-admin-button"><span className={loading ? 'consult-admin-spin' : ''}>↻</span> Atualizar dados</button></div>
    <div className="consult-admin-performance-toolbar">
      {!hideTabs && <nav className="consult-admin-performance-tabs" aria-label="Seções do painel">{tabs}</nav>}
      <div className="consult-admin-date-picker"><CalendarDays size={16}/><select aria-label="Período do relatório" value={preset} onChange={event => choosePreset(event.target.value)}><option value="12m">Últimos 12 meses</option><option value="90d">Últimos 90 dias</option><option value="28d">Últimos 28 dias</option><option value="custom">Personalizado</option></select><input aria-label="Data inicial" type="date" value={startDate} onChange={event => { setPreset('custom'); setStartDate(event.target.value) }}/><span>até</span><input aria-label="Data final" type="date" value={endDate} onChange={event => { setPreset('custom'); setEndDate(event.target.value) }}/><button type="button" onClick={load} disabled={loading}>Aplicar</button></div>
    </div>
    {error && <div role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</div>}
    {loading && !data && <div className="consult-admin-panel-state">Carregando dados de Analytics e Search Console…</div>}
    {data && <div className="consult-admin-period-note">Período: <b>{dateLabel(data.window?.startDate)} a {dateLabel(data.window?.endDate)}</b><span>·</span> Dados ao vivo, atualizados em {new Date(data.generatedAt).toLocaleString('pt-BR')}.</div>}
    {activeTab === 'overview' && <div className="consult-admin-performance-content">
      <div className="consult-admin-performance-title"><h3>Visão geral · Consult</h3><p>Desempenho digital no período selecionado</p></div>
      <div className="consult-admin-metrics consult-admin-kpi-grid">
        <Metric label="Sessões GA4" value={ga4 ? integer(ga4.sessions) : '—'} note="Tráfego no site"/>
        <Metric label="Cliques orgânicos" value={gsc ? integer(gsc.clicks) : '—'} note="Google Search Console"/>
        <Metric label="Impressões orgânicas" value={gsc ? integer(gsc.impressions) : '—'} note="Google Search Console"/>
        <Metric label="Google Ads" value="Aguardando" note="Vínculo da conta à MCC"/>
      </div>
      {!ga4 && !gsc && <ReportTableNotice>Os números do Google ainda não foram carregados. Assim que a credencial de leitura estiver conectada ao ambiente de homologação, este painel exibirá o histórico real do período selecionado.</ReportTableNotice>}
      <div className="consult-admin-report-chart-grid">
        <Panel title="Tráfego do site" subtitle="Sessões totais e sessões de busca orgânica · GA4">
          {trafficSeries.length ? <ResponsiveContainer width="100%" height={290}><BarChart data={trafficSeries}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/><XAxis dataKey="label" tick={{ fontSize: 11 }}/><YAxis tick={{ fontSize: 11 }}/><Tooltip/><Legend/><Bar dataKey="sessions" name="Sessões" fill="#b91c1c" radius={[4,4,0,0]}/><Bar dataKey="organicSessions" name="Sessões orgânicas" fill="#52525b" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer> : <p className="consult-admin-report-empty">A série mensal aparecerá quando o GA4 estiver conectado.</p>}
        </Panel>
        <Panel title="Presença nas buscas" subtitle="Cliques orgânicos e impressões · Search Console">
          {searchSeries.length ? <ResponsiveContainer width="100%" height={290}><LineChart data={searchSeries}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/><XAxis dataKey="label" tick={{ fontSize: 11 }}/><YAxis yAxisId="clicks" tick={{ fontSize: 11 }}/><YAxis yAxisId="impressions" orientation="right" tick={{ fontSize: 11 }}/><Tooltip/><Legend/><Line yAxisId="clicks" dataKey="clicks" name="Cliques" stroke="#b91c1c" strokeWidth={3}/><Line yAxisId="impressions" dataKey="impressions" name="Impressões" stroke="#52525b" strokeWidth={2}/></LineChart></ResponsiveContainer> : <p className="consult-admin-report-empty">A evolução mensal aparecerá quando o Search Console estiver conectado.</p>}
        </Panel>
      </div>
      <div className="consult-admin-report-chart-grid consult-admin-report-chart-grid-equal">
        <Panel title="Aquisição por canal" subtitle="Sessões por canal padrão · GA4"><ReportTable title="" rows={channels} fields={[{ key: 'key', label: 'Canal' }, { key: 'sessions', label: 'Sessões', render: integer }, { key: 'users', label: 'Usuários', render: integer }]} emptyText="Os canais serão exibidos quando o GA4 estiver conectado." /></Panel>
        <Panel title="Fontes do período" subtitle="Leitura correta das métricas"><p className="consult-admin-report-copy"><b>GA4</b> acompanha sessões e comportamento no site. <b>Search Console</b> acompanha cliques, impressões, CTR e posição orgânica. <b>Google Ads</b> entrará no painel após o vínculo à MCC e a disponibilidade de campanhas.</p></Panel>
      </div>
    </div>}
    {activeTab === 'ga4' && <div className="consult-admin-performance-content"><div className="consult-admin-performance-title"><h3>Google Analytics 4</h3><p>Tráfego e comportamento no site · consult.med.br</p></div>{ga4 ? <><div className="consult-admin-metrics consult-admin-kpi-grid"><Metric label="Sessões" value={integer(ga4.sessions)}/><Metric label="Usuários" value={integer(ga4.users)}/><Metric label="Visualizações" value={integer(ga4.pageViews)}/><Metric label="Sessões engajadas" value={integer(ga4.engagedSessions)}/></div><Panel title="Sessões por mês" subtitle="Total e busca orgânica"><ResponsiveContainer width="100%" height={320}><BarChart data={trafficSeries}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/><XAxis dataKey="label"/><YAxis/><Tooltip/><Legend/><Bar dataKey="sessions" name="Sessões" fill="#b91c1c"/><Bar dataKey="organicSessions" name="Busca orgânica" fill="#52525b"/></BarChart></ResponsiveContainer></Panel><ReportTable title="Aquisição por canal" rows={channels} fields={[{ key: 'key', label: 'Canal' }, { key: 'sessions', label: 'Sessões', render: integer }, { key: 'users', label: 'Usuários', render: integer }, { key: 'engagedSessions', label: 'Sessões engajadas', render: integer }]} /></> : <ReportTableNotice>GA4 indisponível nesta consulta. Configure a credencial técnica com acesso de leitura à propriedade da Consult.</ReportTableNotice>}</div>}
    {activeTab === 'search' && <div className="consult-admin-performance-content"><div className="consult-admin-performance-title"><h3>Search Console · SEO orgânico</h3><p>Cliques, impressões, CTR, posição e consultas que levam ao domínio da Consult.</p></div>{gsc ? <><div className="consult-admin-metrics consult-admin-kpi-grid"><Metric label="Cliques orgânicos" value={integer(gsc.clicks)} note="Total da propriedade"/><Metric label="Impressões" value={integer(gsc.impressions)} note="Total da propriedade"/><Metric label="CTR médio" value={percent(gsc.ctr)} note="Cliques ÷ impressões"/><Metric label="Posição média" value={decimal(gsc.position)} note="Média do período"/></div><Panel title="Evolução orgânica" subtitle="Cliques e impressões por mês"><ResponsiveContainer width="100%" height={300}><LineChart data={searchSeries}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/><XAxis dataKey="label"/><YAxis yAxisId="clicks"/><YAxis yAxisId="impressions" orientation="right"/><Tooltip/><Legend/><Line yAxisId="clicks" type="monotone" dataKey="clicks" name="Cliques" stroke="#b91c1c" strokeWidth={3}/><Line yAxisId="impressions" type="monotone" dataKey="impressions" name="Impressões" stroke="#52525b" strokeWidth={2}/></LineChart></ResponsiveContainer></Panel><div className="consult-admin-report-chart-grid"><ReportTable title="Consultas orgânicas" subtitle="Principais pesquisas que exibiram páginas da Consult" rows={data?.searchConsole?.queries || []} fields={[{ key: 'key', label: 'Consulta' }, { key: 'clicks', label: 'Cliques', render: integer }, { key: 'impressions', label: 'Impressões', render: integer }, { key: 'ctr', label: 'CTR', render: percent }, { key: 'position', label: 'Posição', render: value => decimal(value) }]} /><ReportTable title="Páginas orgânicas" subtitle="URLs que receberam impressões na busca" rows={(data?.searchConsole?.pages || []).map(row => ({ ...row, url: row.key }))} fields={[{ key: 'url', label: 'Página', render: value => <a className="consult-admin-report-link" href={value} target="_blank" rel="noreferrer">{value}</a> }, { key: 'clicks', label: 'Cliques', render: integer }, { key: 'impressions', label: 'Impressões', render: integer }, { key: 'ctr', label: 'CTR', render: percent }, { key: 'position', label: 'Posição', render: value => decimal(value) }]} /></div><ReportTable title="Oportunidades de SEO" subtitle="Consultas com impressões e CTR abaixo de 2%; use como lista de análise, não como diagnóstico automático." rows={opportunities} fields={[{ key: 'key', label: 'Consulta' }, { key: 'impressions', label: 'Impressões', render: integer }, { key: 'clicks', label: 'Cliques', render: integer }, { key: 'ctr', label: 'CTR', render: percent }, { key: 'position', label: 'Posição', render: value => decimal(value) }]} emptyText="As oportunidades aparecerão quando houver dados de consulta no período." /></> : <ReportTableNotice>Search Console indisponível nesta consulta. Configure a credencial técnica com acesso à propriedade https://consult.med.br/.</ReportTableNotice>}</div>}
    {activeTab === 'indexing' && <div className="consult-admin-performance-content consult-admin-indexing-embedded"><ConsultIndexingReport session={session}/></div>}
    {activeTab === 'ads' && <div className="consult-admin-performance-content"><div className="consult-admin-performance-title"><h3>Google Ads</h3><p>Desempenho de campanhas vinculadas à MCC.</p></div><ReportTableNotice tone="warning">A conta da Consult ainda não está vinculada à MCC e não há campanhas para reportar. Quando o vínculo for feito e houver anúncios ativos, cliques, impressões, conversões e investimento aparecerão aqui.</ReportTableNotice></div>}
    {activeTab === 'diagnostic' && <div className="consult-admin-performance-content"><div className="consult-admin-performance-title"><h3>Diagnóstico consolidado</h3><p>Resumo do que está disponível nas fontes conectadas.</p></div><div className="consult-admin-diagnostic-grid"><Panel title="Google Analytics 4" subtitle="Tráfego do site">{ga4 ? <p className="consult-admin-report-copy">O GA4 registrou <b>{integer(ga4.sessions)} sessões</b> no período, incluindo <b>{integer(organicSessions)} sessões orgânicas</b>.</p> : <p className="consult-admin-report-copy">A fonte GA4 ainda não está disponível. Os dados de tráfego não foram inferidos de outra métrica.</p>}</Panel><Panel title="Google Search Console" subtitle="Visibilidade orgânica">{gsc ? <p className="consult-admin-report-copy">A propriedade registrou <b>{integer(gsc.clicks)} cliques</b> em <b>{integer(gsc.impressions)} impressões</b>, com CTR de <b>{percent(gsc.ctr)}</b>.</p> : <p className="consult-admin-report-copy">Search Console ainda não está disponível para esta consulta.</p>}</Panel><Panel title="Indexação de páginas" subtitle="URL Inspection API">A aba Indexação permite consultar o estado que o Google conhece para URLs individuais descobertas nos sitemaps.</Panel><Panel title="Google Ads" subtitle="Mídia paga">Aguardando vínculo da conta à MCC. Campanhas não foram tratadas como zero; a fonte ainda não foi conectada.</Panel></div></div>}
    {activeTab === 'report' && <div className="consult-admin-performance-content"><div className="consult-admin-module-heading consult-admin-report-actions"><div className="consult-admin-performance-title"><h3>Relatório de desempenho</h3><p>Resumo pronto para compartilhar ou imprimir como PDF.</p></div><div className="consult-admin-index-actions"><button type="button" className="consult-admin-button" onClick={copyReport}><Clipboard size={15}/>{copied ? 'Copiado' : 'Copiar'}</button><button type="button" className="consult-admin-button consult-admin-button-primary" onClick={() => window.print()}><FileText size={15}/> Imprimir / PDF</button></div></div><article className="consult-admin-printable"><header className="consult-admin-print-header"><p className="consult-admin-kicker">FIGUEIRA MARKETING</p><h3>Evolução digital da Consult</h3><p>{dateLabel(data?.window?.startDate || startDate)} a {dateLabel(data?.window?.endDate || endDate)}</p></header><div className="consult-admin-metrics consult-admin-kpi-grid"><Metric label="Sessões GA4" value={ga4 ? integer(ga4.sessions) : '—'}/><Metric label="Cliques orgânicos" value={gsc ? integer(gsc.clicks) : '—'}/><Metric label="Impressões orgânicas" value={gsc ? integer(gsc.impressions) : '—'}/><Metric label="Google Ads" value="Aguardando" note="Vínculo à MCC"/></div><h4>Resultados do período</h4><p>{ga4 ? `Google Analytics 4: ${integer(ga4.sessions)} sessões e ${integer(ga4.users)} usuários.` : 'Google Analytics 4: dados indisponíveis nesta consulta.'}</p><p>{gsc ? `Search Console: ${integer(gsc.clicks)} cliques, ${integer(gsc.impressions)} impressões, CTR ${percent(gsc.ctr)} e posição média ${decimal(gsc.position)}.` : 'Search Console: dados indisponíveis nesta consulta.'}</p><p>Google Ads: {data?.ads?.message || 'aguardando vínculo da conta à MCC.'}</p><h4>Como ler estes dados</h4><p>GA4 mede visitas e comportamento no site. Search Console mede a presença orgânica nas buscas. A inspeção de indexação é apresentada separadamente, por URL. Os períodos de cada fonte são alinhados ao intervalo selecionado, respeitando o atraso de processamento do Google.</p><h4>Detalhes mensais</h4>{trafficSeries.length || searchSeries.length ? <div className="consult-admin-table-wrap"><table className="consult-admin-table"><thead><tr><th>Mês</th><th>Sessões</th><th>Cliques orgânicos</th><th>Impressões orgânicas</th></tr></thead><tbody>{[...new Set([...trafficSeries.map(row => row.key), ...searchSeries.map(row => row.key)])].sort().map(key => { const traffic = trafficSeries.find(row => row.key === key); const organic = searchSeries.find(row => row.key === key); return <tr key={key}><td>{monthLabel(key)}</td><td>{traffic ? integer(traffic.sessions) : '—'}</td><td>{organic ? integer(organic.clicks) : '—'}</td><td>{organic ? integer(organic.impressions) : '—'}</td></tr> })}</tbody></table></div> : <p className="consult-admin-report-copy">A tabela mensal será preenchida quando as fontes Google estiverem conectadas.</p>}<footer>Consult Radiometria e Qualidade · Painel de desempenho</footer></article><ReportTableNotice>Relatório montado com dados consultados ao vivo. Itens ausentes permanecem identificados como indisponíveis ou aguardando conexão; não são preenchidos com estimativas.</ReportTableNotice></div>}
    {snapshots.length > 0 && <details className="consult-admin-archive"><summary>Snapshots históricos ({snapshots.length})</summary><p>Registros antigos preservados no Supabase.</p></details>}
  </section>
}
