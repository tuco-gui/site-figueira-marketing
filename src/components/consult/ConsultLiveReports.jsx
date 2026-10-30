import React, { useCallback, useEffect, useState } from 'react'
import { ExternalLink, RefreshCw } from 'lucide-react'

function integer(value) { return Number(value || 0).toLocaleString('pt-BR') }
function percent(value) { return `${(Number(value || 0) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%` }
function snapshotValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function Metric({ label, value, note }) {
  return <article className="consult-admin-metric"><p>{label}</p><strong>{value}</strong>{note && <small>{note}</small>}</article>
}

function ReportTable({ title, rows, firstColumn = 'key', firstLabel = 'Canal', emptyText, mode = 'gsc' }) {
  const ga4 = mode === 'ga4'
  return <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">Relatório ao vivo</p><h3>{title}</h3></div><span>{rows?.length || 0} linhas</span></div>
    {rows?.length ? <div className="consult-admin-table-wrap"><table className="consult-admin-table"><thead><tr><th>{firstLabel}</th>{(ga4 ? ['Sessões', 'Usuários', 'Visualizações', 'Sessões engajadas'] : ['Cliques', 'Impressões', 'CTR', 'Posição média']).map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[firstColumn]}-${index}`}><td>{row.url ? <a href={row.url} target="_blank" rel="noreferrer">{row[firstColumn]}<ExternalLink size={12}/></a> : row[firstColumn]}</td>{ga4 ? <><td>{integer(row.sessions)}</td><td>{integer(row.users)}</td><td>{integer(row.pageViews)}</td><td>{integer(row.engagedSessions)}</td></> : <><td>{integer(row.clicks)}</td><td>{integer(row.impressions)}</td><td>{percent(row.ctr)}</td><td>{Number(row.position || 0).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</td></>}</tr>)}</tbody></table></div> : <p className="consult-admin-panel-state">{emptyText || 'Sem linhas para este período.'}</p>}
  </article>
}

export default function ConsultLiveReports({ session, snapshots = [] }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!session?.access_token) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/consult/reports', { headers: { Authorization: `Bearer ${session.access_token}` } })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Não foi possível consultar os relatórios.')
      setData(result)
    } catch (err) {
      setError(err.message || 'Não foi possível consultar os relatórios.')
    } finally {
      setLoading(false)
    }
  }, [session?.access_token])

  useEffect(() => { load() }, [load])

  const ga4 = data?.ga4?.status === 'available' ? data.ga4.total : null
  const gsc = data?.searchConsole?.totals

  return <section className="consult-admin-module">
    <div className="consult-admin-module-heading"><div><p className="consult-admin-kicker">Consult · Dados ao vivo</p><h2>Relatórios</h2><p>GA4 e Search Console do domínio consult.med.br. Dados dos últimos 28 dias completos disponíveis.</p></div><button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15}/> Atualizar relatórios</button></div>
    {error && <div role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</div>}
    {loading && !data && <div className="consult-admin-panel-state">Consultando GA4 e Search Console…</div>}
    {data && <>
      <div className="consult-admin-info">Período: {data.window?.startDate} a {data.window?.endDate} · Atualizado: {new Date(data.generatedAt).toLocaleString('pt-BR')}. As funções leem o Google no momento da consulta; nenhum snapshot é salvo no banco.</div>
      <h3 className="consult-admin-report-section-title">Google Analytics 4</h3>
      {ga4 ? <div className="consult-admin-metrics"><Metric label="Sessões" value={integer(ga4.sessions)}/><Metric label="Usuários" value={integer(ga4.users)}/><Metric label="Visualizações" value={integer(ga4.pageViews)}/><Metric label="Sessões engajadas" value={integer(ga4.engagedSessions)}/><Metric label="Eventos principais" value={integer(ga4.keyEvents)}/></div> : <div className="consult-admin-info">GA4 indisponível nesta consulta: {data.ga4?.error || 'verifique o acesso técnico da propriedade.'}</div>}
      {data.channels?.length > 0 && <ReportTable title="Aquisição por canal" rows={data.channels} emptyText="Sem canais para o período." mode="ga4"/>}
      <h3 className="consult-admin-report-section-title">Google Search Console</h3>
      {gsc ? <div className="consult-admin-metrics"><Metric label="Cliques" value={integer(gsc.clicks)}/><Metric label="Impressões" value={integer(gsc.impressions)}/><Metric label="CTR médio" value={percent(gsc.ctr)}/><Metric label="Posição média" value={Number(gsc.position || 0).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}/></div> : <div className="consult-admin-info">Search Console indisponível: {data.searchConsole?.totalsError || 'verifique o acesso técnico à propriedade.'}</div>}
      <div className="consult-admin-radar-grid"><ReportTable title="Consultas orgânicas" rows={data.searchConsole?.queries || []} firstLabel="Consulta"/><ReportTable title="Páginas orgânicas" rows={(data.searchConsole?.pages || []).map(row => ({ ...row, url: row.key }))} firstLabel="Página"/></div>
      {data.searchConsole?.queryError && <div className="consult-admin-info">Consultas Search Console: {data.searchConsole.queryError}</div>}
      {data.searchConsole?.pageError && <div className="consult-admin-info">Páginas Search Console: {data.searchConsole.pageError}</div>}
      <h3 className="consult-admin-report-section-title">Google Ads</h3><div className="consult-admin-info">{data.ads?.message || 'Aguardando vínculo da conta à MCC.'}</div>
    </>}
    {!loading && !data && !error && <div className="consult-admin-panel-state">Carregando relatório…</div>}
    <div className="consult-admin-info">Para ativar as leituras ao vivo do Google, configure a conta de serviço de leitura no ambiente seguro da Vercel e conceda acesso ao GA4 e ao Search Console da Consult.</div>
    {snapshots.length > 0 && <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">Arquivo</p><h3>Snapshots anteriormente registrados</h3></div><span>{snapshots.length} registros</span></div><div className="consult-admin-table-wrap"><table className="consult-admin-table"><thead><tr>{Object.keys(snapshots[0]).filter(key => !/(secret|token|password|credential|api_key|apikey)/i.test(key)).map(key => <th key={key}>{key.replaceAll('_', ' ')}</th>)}</tr></thead><tbody>{snapshots.map((row, index) => <tr key={row.id || index}>{Object.keys(snapshots[0]).filter(key => !/(secret|token|password|credential|api_key|apikey)/i.test(key)).map(key => <td key={key}>{snapshotValue(row[key])}</td>)}</tr>)}</tbody></table></div></article>}
  </section>
}
