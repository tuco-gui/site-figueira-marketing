import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ExternalLink, RefreshCw, Search } from 'lucide-react'

function dateLabel(value) {
  if (!value) return 'Data não informada'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function ConsultTrendRadar({ session }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')

  const load = useCallback(async () => {
    if (!session?.access_token) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/consult/trends', { headers: { Authorization: `Bearer ${session.access_token}` } })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Não foi possível consultar o radar agora.')
      setData(result)
    } catch (err) {
      setError(err.message || 'Não foi possível consultar o radar agora.')
    } finally {
      setLoading(false)
    }
  }, [session?.access_token])

  useEffect(() => { load() }, [load])

  const trends = useMemo(() => (data?.trends || []).filter(item => !filter || item.title.toLocaleLowerCase('pt-BR').includes(filter.toLocaleLowerCase('pt-BR'))), [data, filter])
  const news = useMemo(() => (data?.news || []).filter(item => !filter || `${item.title} ${item.query}`.toLocaleLowerCase('pt-BR').includes(filter.toLocaleLowerCase('pt-BR'))), [data, filter])

  return <section className="consult-admin-module">
    <div className="consult-admin-module-heading"><div><p className="consult-admin-kicker">Consult · Radar de pauta</p><h2>Tendências e notícias do setor</h2><p>Feed de buscas em alta no Brasil e cobertura recente sobre os temas da Consult. Use como sinal editorial; popularidade geral não equivale à demanda pelos serviços.</p></div><button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15} /> Atualizar radar</button></div>
    <div className="consult-admin-radar-tools"><label><Search size={16}/><input value={filter} onChange={event => setFilter(event.target.value)} placeholder="Filtrar tendências e notícias" /></label>{data?.generatedAt && <small>Atualizado em {dateLabel(data.generatedAt)}</small>}</div>
    {error && <div role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</div>}
    {loading && !data && <div className="consult-admin-panel-state">Consultando fontes públicas…</div>}
    {!loading && !data && !error && <div className="consult-admin-panel-state">Carregando fontes públicas…</div>}
    {data && <div className="consult-admin-radar-grid">
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">{data.sources?.googleTrends?.label}</p><h3>Buscas em alta no Brasil</h3></div><span className={'consult-admin-source-status ' + (data.sources?.googleTrends?.status === 'fulfilled' ? 'is-ready' : 'is-offline')}>{data.sources?.googleTrends?.status === 'fulfilled' ? 'Disponível' : 'Indisponível'}</span></div>
        {trends.length ? <ul className="consult-admin-radar-list">{trends.map(item => <li key={item.url}><div><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ExternalLink size={13}/></a><small>{item.volume || 'Em alta'}{item.date ? ` · ${dateLabel(item.date)}` : ''}</small></div></li>)}</ul> : <p className="consult-admin-panel-state">{filter ? 'Nenhuma tendência corresponde ao filtro.' : 'O feed não retornou tendências no momento.'}</p>}
      </article>
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">{data.sources?.googleNews?.label}</p><h3>Notícias por tema</h3></div><span className={'consult-admin-source-status ' + (data.sources?.googleNews?.status === 'fulfilled' ? 'is-ready' : 'is-offline')}>{data.sources?.googleNews?.status === 'fulfilled' ? 'Disponível' : 'Indisponível'}</span></div>
        {news.length ? <ul className="consult-admin-radar-list">{news.map(item => <li key={`${item.query}-${item.url}`}><div><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ExternalLink size={13}/></a><small>{item.source}{item.query ? ` · ${item.query}` : ''}{item.date ? ` · ${dateLabel(item.date)}` : ''}</small></div></li>)}</ul> : <p className="consult-admin-panel-state">{filter ? 'Nenhuma notícia corresponde ao filtro.' : 'As fontes de notícias não retornaram resultados.'}</p>}
      </article>
    </div>}
    <div className="consult-admin-info">O Trends RSS é uma fonte pública sem chave de API e mostra tendências gerais do país. Para acompanhar interesse por palavras-chave ao longo do tempo, o Google abriu uma API em alpha que exige aprovação; a integração pode ser adicionada quando o acesso for concedido.</div>
  </section>
}
