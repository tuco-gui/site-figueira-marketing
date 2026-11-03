import React, { useCallback, useEffect, useState } from 'react'
import { AlertCircle, ExternalLink, RefreshCw } from 'lucide-react'

function integer(value) { return Number(value || 0).toLocaleString('pt-BR') }
function decimal(value) { return Number(value || 0).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) }
function percent(value) { return (Number(value || 0) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '%' }

function reportRange() {
  const end = new Date()
  end.setUTCDate(end.getUTCDate() - 3)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 27)
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) }
}

export default function ConsultIndexingReport({ session }) {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [generatedAt, setGeneratedAt] = useState('')

  const load = useCallback(async () => {
    if (!session?.access_token) return
    setLoading(true)
    setError('')
    try {
      const range = reportRange()
      const query = new URLSearchParams(range)
      const response = await fetch('/api/consult/reports?' + query.toString(), {
        headers: { Authorization: 'Bearer ' + session.access_token },
        cache: 'no-store',
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível consultar as páginas no Search Console.')
      if (data.searchConsole?.status !== 'available') throw new Error(data.searchConsole?.pageError || 'O Search Console não retornou páginas para este domínio.')
      setPages(data.searchConsole.pages || [])
      setGeneratedAt(data.generatedAt || '')
    } catch (err) {
      setError(err.message || 'Não foi possível consultar as páginas no Search Console.')
    } finally {
      setLoading(false)
    }
  }, [session?.access_token])

  useEffect(() => { load() }, [load])

  return <section className="consult-admin-module">
    <div className="consult-admin-module-heading">
      <div>
        <p className="consult-admin-kicker">Consult · Search Console</p>
        <h2>Indexação de páginas</h2>
        <p>Páginas do domínio consult.med.br que apareceram na Pesquisa Google nos últimos 28 dias.</p>
      </div>
      <button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15}/> Atualizar páginas</button>
    </div>
    <div className="consult-admin-info">Esta consulta lista páginas com impressões no relatório de desempenho do Search Console. A API do Gateway disponível para a homologação não fornece o relatório completo de cobertura nem a inspeção individual de URLs; ausência nesta lista não significa que uma página esteja fora do índice.</div>
    {generatedAt && <p className="consult-admin-report-meta">Consulta atualizada em {new Date(generatedAt).toLocaleString('pt-BR')}</p>}
    {error && <div role="alert" className="consult-admin-alert consult-admin-alert-error"><AlertCircle size={17}/>{error}</div>}
    {loading && <div className="consult-admin-panel-state">Consultando páginas do Search Console…</div>}
    {!loading && !error && pages.length === 0 && <div className="consult-admin-panel-state">O Search Console não registrou páginas com impressões neste período.</div>}
    {!loading && pages.length > 0 && <div className="consult-admin-table-wrap">
      <table className="consult-admin-table">
        <thead><tr><th>Página</th><th>Cliques</th><th>Impressões</th><th>CTR</th><th>Posição média</th></tr></thead>
        <tbody>{pages.map((row, index) => <tr key={row.key || index}>
          <td><a href={row.key} target="_blank" rel="noreferrer">{row.key}<ExternalLink size={12}/></a></td>
          <td>{integer(row.clicks)}</td><td>{integer(row.impressions)}</td><td>{percent(row.ctr)}</td><td>{decimal(row.position)}</td>
        </tr>)}</tbody>
      </table>
    </div>}
  </section>
}
