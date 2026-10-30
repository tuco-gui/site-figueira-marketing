import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ExternalLink, RefreshCw, Search } from 'lucide-react'

function dateLabel(value) {
  if (!value) return 'Data não informada'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function ConsultTrendRadar({ session, onCreateArticle }) {
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
    <div className="consult-admin-module-heading"><div><p className="consult-admin-kicker">Consult · Radar de pauta</p><h2>Tendências e notícias do setor</h2><p>Radar filtrado para Física Médica, radiometria, proteção radiológica, controle de qualidade e engenharia clínica. Outros mercados são descartados.</p></div><button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15} /> Atualizar radar</button></div>
    <div className="consult-admin-radar-tools"><label><Search size={16}/><input value={filter} onChange={event => setFilter(event.target.value)} placeholder="Filtrar tendências e notícias" /></label>{data?.generatedAt && <small>Atualizado em {dateLabel(data.generatedAt)}</small>}</div>
    {error && <div role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</div>}
    {loading && !data && <div className="consult-admin-panel-state">Consultando fontes públicas…</div>}
    {!loading && !data && !error && <div className="consult-admin-panel-state">Carregando fontes públicas…</div>}
    {data && <div className="consult-admin-radar-grid">
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">{data.sources?.googleTrends?.label}</p><h3>Buscas em alta no Brasil</h3></div><span className={'consult-admin-source-status ' + (data.sources?.googleTrends?.status === 'fulfilled' ? 'is-ready' : 'is-offline')}>{data.sources?.googleTrends?.status === 'fulfilled' ? 'Disponível' : 'Indisponível'}</span></div>
        {trends.length ? <ul className="consult-admin-radar-list">{trends.map(item => <li key={item.url}><div><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ExternalLink size={13}/></a><small>{item.volume || 'Em alta'}{item.date ? ` · ${dateLabel(item.date)}` : ''}</small>{onCreateArticle && <button type="button" className="consult-trend-create-article" onClick={() => onCreateArticle({ ...item, excerpt: item.volume || '' })}>Criar rascunho de artigo</button>}</div></li>)}</ul> : <p className="consult-admin-panel-state">{filter ? 'Nenhuma tendência corresponde ao filtro.' : 'Nenhuma tendência relacionada ao nicho da Consult foi encontrada neste momento.'}</p>}
      </article>
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">{data.sources?.googleNews?.label}</p><h3>Notícias por tema</h3></div><span className={'consult-admin-source-status ' + (data.sources?.googleNews?.status === 'fulfilled' ? 'is-ready' : 'is-offline')}>{data.sources?.googleNews?.status === 'fulfilled' ? 'Disponível' : 'Indisponível'}</span></div>
        {news.length ? <ul className="consult-admin-radar-list">{news.map(item => <li key={`${item.query}-${item.url}`}><div><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ExternalLink size={13}/></a><small>{item.source}{item.query ? ` · ${item.query}` : ''}{item.date ? ` · ${dateLabel(item.date)}` : ''}</small>{onCreateArticle && <button type="button" className="consult-trend-create-article" onClick={() => onCreateArticle({ ...item, excerpt: `Pauta baseada em notícia do setor: ${item.title}` })}>Criar rascunho de artigo</button>}</div></li>)}</ul> : <p className="consult-admin-panel-state">{filter ? 'Nenhuma notícia corresponde ao filtro.' : 'Não há notícias recentes relacionadas aos serviços e temas da Consult.'}</p>}
      </article>
    </div>}
    <div className="consult-admin-info">O Google Trends é uma fonte pública. A interface recebe somente resultados que passam pelo filtro do nicho da Consult; notícias são consultadas por temas de Física Médica, proteção radiológica, radiometria e controle de qualidade.</div>
  </section>
}
