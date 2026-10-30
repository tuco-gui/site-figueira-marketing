import React, { useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, ExternalLink, ListChecks, RefreshCw } from 'lucide-react'

function pretty(value) {
  return String(value || '—').replaceAll('_', ' ').toLocaleLowerCase('pt-BR').replace(/^\p{L}/u, letter => letter.toLocaleUpperCase('pt-BR'))
}

function date(value) {
  if (!value) return '—'
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString('pt-BR')
}

export default function ConsultIndexingReport({ session }) {
  const [urls, setUrls] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const indexed = useMemo(() => results.filter(row => row.status === 'PASS').length, [results])

  async function post(payload) {
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const response = await fetch('/api/consult/indexing', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível consultar o Search Console.')
      if (Array.isArray(data.urls)) {
        setUrls(data.urls)
        setResults([])
        setMessage(`${data.urls.length} URLs encontradas nos sitemaps enviados ao Search Console.`)
      } else {
        setResults(data.results || [])
        setMessage(`Inspeção concluída para ${(data.results || []).length} URLs.`)
      }
    } catch (err) {
      setError(err.message || 'Não foi possível consultar o Search Console.')
    } finally {
      setLoading(false)
    }
  }

  return <section className="consult-admin-module">
    <div className="consult-admin-module-heading"><div><p className="consult-admin-kicker">Consult · Search Console</p><h2>Indexação de páginas</h2><p>Descubra URLs enviadas em sitemap e consulte o estado conhecido pelo índice do Google.</p></div><div className="consult-admin-index-actions"><button type="button" onClick={() => post({ fromSitemaps: true })} disabled={loading} className="consult-admin-button"><RefreshCw size={15} /> Buscar URLs nos sitemaps</button>{urls.length > 0 && <button type="button" onClick={() => post({ urls })} disabled={loading} className="consult-admin-button consult-admin-button-primary"><ListChecks size={15} /> Inspecionar {urls.length} URLs</button>}</div></div>
    <div className="consult-admin-info">A API oficial permite inspecionar URLs individuais, incluindo veredito, cobertura, rastreamento, sitemap e canonical. Ela não expõe o relatório agregado “Páginas” do Search Console. Cada inspeção usa a quota diária da URL Inspection API.</div>
    {error && <div role="alert" className="consult-admin-alert consult-admin-alert-error"><AlertCircle size={17}/>{error}</div>}
    {message && <div className="consult-admin-alert consult-admin-alert-ok">{message}</div>}
    {loading && <div className="consult-admin-panel-state">Consultando Google Search Console…</div>}
    {!loading && !results.length && urls.length > 0 && <div className="consult-admin-panel-state">URLs disponíveis para inspeção: {urls.length}. A análise retorna o estado conhecido no índice do Google e não testa a indexabilidade em tempo real.</div>}
    {!loading && !urls.length && !results.length && !error && <div className="consult-admin-panel-state">Carregue as URLs dos sitemaps para começar. A credencial de leitura do Search Console deve estar configurada no ambiente seguro do site.</div>}
    {results.length > 0 && <>
      <div className="consult-admin-metrics"><article className="consult-admin-metric"><p>URLs inspecionadas</p><strong>{results.length}</strong></article><article className="consult-admin-metric"><p>Indexadas</p><strong>{indexed}</strong></article><article className="consult-admin-metric"><p>Não indexadas / com alerta</p><strong>{results.length - indexed}</strong></article></div>
      <div className="consult-admin-table-wrap"><table className="consult-admin-table"><thead><tr><th>URL</th><th>Veredito</th><th>Cobertura</th><th>Rastreada em</th><th>Canonical Google</th><th>Inspecionada em</th></tr></thead><tbody>{results.map(row => <tr key={row.url}><td><a href={row.url} target="_blank" rel="noreferrer">{row.url}<ExternalLink size={12}/></a></td><td><span className={'consult-admin-index-state ' + (row.status === 'PASS' ? 'is-indexed' : 'is-excluded')}>{row.status === 'PASS' ? <CheckCircle2 size={14}/> : <AlertCircle size={14}/>} {pretty(row.status)}{row.message ? ` · ${row.message}` : ''}</span></td><td>{pretty(row.coverageState || row.pageFetchState)}</td><td>{date(row.lastCrawlTime)}</td><td>{row.googleCanonical || '—'}</td><td>{date(row.inspectedAt)}</td></tr>)}</tbody></table></div>
      </>}
    </section>
}
