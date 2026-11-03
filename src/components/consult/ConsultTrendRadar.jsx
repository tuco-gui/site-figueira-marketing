import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ExternalLink, RefreshCw, Search } from 'lucide-react'

function dateLabel(value) {
  if (!value) return 'Data não informada'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })
}
function number(value) { return Number(value || 0).toLocaleString('pt-BR') }
function pct(value) { return (Number(value || 0) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '%' }

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
      const end = new Date()
      end.setUTCDate(end.getUTCDate() - 3)
      const start = new Date(end)
      start.setUTCDate(start.getUTCDate() - 27)
      const range = new URLSearchParams({ startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) })
      const headers = { Authorization: 'Bearer ' + session.access_token }
      const [trendResponse, reportResponse] = await Promise.all([
        fetch('/api/consult/trends', { headers, cache: 'no-store' }),
        fetch('/api/consult/reports?' + range.toString(), { headers, cache: 'no-store' }),
      ])
      const result = await trendResponse.json()
      if (!trendResponse.ok) throw new Error(result.error || 'Não foi possível consultar o radar agora.')
      let organic = []
      let organicError = ''
      if (reportResponse.ok) {
        const report = await reportResponse.json()
        if (report.searchConsole?.status === 'available') organic = report.searchConsole.queries || []
        else organicError = report.searchConsole?.queryError || 'Search Console indisponível.'
      } else {
        const report = await reportResponse.json().catch(() => ({}))
        organicError = report.error || 'Search Console indisponível.'
      }
      setData({ ...result, organic, organicError, reportGeneratedAt: result.generatedAt })
    } catch (err) {
      setError(err.message || 'Não foi possível consultar o radar agora.')
    } finally {
      setLoading(false)
    }
  }, [session?.access_token])

  useEffect(() => { load() }, [load])

  const matchesFilter = value => !filter || String(value || '').toLocaleLowerCase('pt-BR').includes(filter.toLocaleLowerCase('pt-BR'))
  const trends = useMemo(() => (data?.trends || []).filter(item => matchesFilter(item.title)), [data, filter])
  const news = useMemo(() => (data?.news || []).filter(item => matchesFilter(`${item.title} ${item.query}`)), [data, filter])
  const organic = useMemo(() => (data?.organic || []).filter(item => matchesFilter(item.key)), [data, filter])

  function createOrganicDraft(item) {
    onCreateArticle?.({
      title: item.key,
      query: 'Search Console · últimos 28 dias',
      excerpt: `Consulta orgânica relacionada ao nicho da Consult: ${number(item.impressions)} impressões, ${number(item.clicks)} cliques e CTR de ${pct(item.ctr)}.`,
      context: 'Consulta real do Search Console para consult.med.br. Use como pauta e valide fontes técnicas antes de redigir.',
      category: 'Diagnóstico por Imagem',
      keywords: [item.key],
    })
  }

  return <section className="consult-admin-module">
    <div className="consult-admin-module-heading"><div><p className="consult-admin-kicker">Consult · Radar de pauta</p><h2>Insights e tendências do setor</h2><p>Consultas orgânicas do domínio, tendências e notícias filtradas para Física Médica, radiometria, proteção radiológica, qualidade em diagnóstico por imagem e engenharia clínica.</p></div><button type="button" onClick={load} disabled={loading} className="consult-admin-button"><RefreshCw size={15} /> Atualizar radar</button></div>
    <div className="consult-admin-radar-tools"><label><Search size={16}/><input value={filter} onChange={event => setFilter(event.target.value)} placeholder="Filtrar insights do setor" /></label>{data?.generatedAt && <small>Atualizado em {dateLabel(data.generatedAt)}</small>}</div>
    {error && <div role="alert" className="consult-admin-alert consult-admin-alert-error">{error}</div>}
    {loading && !data && <div className="consult-admin-panel-state">Consultando fontes públicas e relatórios…</div>}
    {!loading && !data && !error && <div className="consult-admin-panel-state">Carregando fontes e relatórios…</div>}
    {data && <div className="consult-admin-radar-grid">
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">Search Console · últimos 28 dias</p><h3>Consultas orgânicas da Consult</h3></div><span className={'consult-admin-source-status ' + (data.organicError ? 'is-offline' : 'is-ready')}>{data.organicError ? 'Indisponível' : 'Conectado'}</span></div>
        {organic.length ? <ul className="consult-admin-radar-list">{organic.map(item => <li key={item.key}><div><strong>{item.key}</strong><small>{number(item.impressions)} impressões · {number(item.clicks)} cliques · CTR {pct(item.ctr)} · posição {Number(item.position || 0).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</small>{onCreateArticle && <button type="button" className="consult-trend-create-article" onClick={() => createOrganicDraft(item)}>Criar rascunho de artigo</button>}</div></li>)}</ul> : <p className="consult-admin-panel-state">{data.organicError || (filter ? 'Nenhuma consulta corresponde ao filtro.' : 'Nenhuma consulta orgânica relacionada foi encontrada no período.')}</p>}
      </article>
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">{data.sources?.googleTrends?.label}</p><h3>Buscas em alta no Brasil</h3></div><span className={'consult-admin-source-status ' + (data.sources?.googleTrends?.status === 'fulfilled' ? 'is-ready' : 'is-offline')}>{data.sources?.googleTrends?.status === 'fulfilled' ? 'Disponível' : 'Indisponível'}</span></div>
        {trends.length ? <ul className="consult-admin-radar-list">{trends.map(item => <li key={item.url}><div><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ExternalLink size={13}/></a><small>{item.volume || 'Em alta'}{item.date ? ` · ${dateLabel(item.date)}` : ''}</small>{onCreateArticle && <button type="button" className="consult-trend-create-article" onClick={() => onCreateArticle({ ...item, excerpt: item.volume || '', context: 'Tema filtrado do Google Trends Brasil. Localize e valide fontes técnicas relacionadas ao nicho da Consult.' })}>Criar rascunho de artigo</button>}</div></li>)}</ul> : <p className="consult-admin-panel-state">{filter ? 'Nenhuma tendência corresponde ao filtro.' : 'Nenhuma tendência relacionada ao nicho da Consult foi encontrada neste momento.'}</p>}
      </article>
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">{data.sources?.googleNews?.label}</p><h3>Notícias por tema</h3></div><span className={'consult-admin-source-status ' + (data.sources?.googleNews?.status === 'fulfilled' ? 'is-ready' : 'is-offline')}>{data.sources?.googleNews?.status === 'fulfilled' ? 'Disponível' : 'Indisponível'}</span></div>
        {news.length ? <ul className="consult-admin-radar-list">{news.map(item => <li key={`${item.query}-${item.url}`}><div><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ExternalLink size={13}/></a><small>{item.source}{item.query ? ` · ${item.query}` : ''}{item.date ? ` · ${dateLabel(item.date)}` : ''}</small>{onCreateArticle && <button type="button" className="consult-trend-create-article" onClick={() => onCreateArticle({ ...item, excerpt: `Notícia relacionada ao setor: ${item.title}`, context: 'Notícia identificada pelo radar da Consult. Confirme a fonte e procure referência técnica primária antes de redigir.' })}>Criar rascunho de artigo</button>}</div></li>)}</ul> : <p className="consult-admin-panel-state">{filter ? 'Nenhuma notícia corresponde ao filtro.' : 'Não há notícias recentes relacionadas aos serviços e temas da Consult.'}</p>}
      </article>
    </div>}
    <div className="consult-admin-info">Os artigos partem de insights orgânicos, tendências ou notícias relacionados à Consult e são salvos em revisão. As consultas do Search Console são dados do domínio consult.med.br; ausência de uma consulta no painel não representa ausência de demanda em outros canais.</div>
  </section>
}
