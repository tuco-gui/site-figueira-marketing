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
      const range = new URLSearchParams({ startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10), source: 'insights' })
      const headers = { Authorization: 'Bearer ' + session.access_token }
      const [trendResponse, reportResponse] = await Promise.all([
        fetch('/api/consult/trends', { headers, cache: 'no-store' }),
        fetch('/api/consult/reports?' + range.toString(), { headers, cache: 'no-store' }),
      ])
      const result = await trendResponse.json()
      if (!trendResponse.ok) throw new Error(result.error || 'Não foi possível consultar o radar agora.')
      let report = null
      let organic = []
      let organicError = ''
      if (reportResponse.ok) {
        report = await reportResponse.json()
        if (report.searchConsole?.status === 'available') organic = report.searchConsole.queries || []
        else organicError = report.searchConsole?.queryError || report.searchConsole?.pageError || 'Search Console indisponível.'
      } else {
        const payload = await reportResponse.json().catch(() => ({}))
        organicError = payload.error || 'Não foi possível compilar os dados de desempenho.'
      }
      setData({ ...result, report, organic, organicError, reportGeneratedAt: report?.generatedAt || result.generatedAt })
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
  const gscTotals = data?.report?.searchConsole?.totals
  const ga4Totals = data?.report?.ga4?.total
  const adsTotals = data?.report?.ads?.totals
  const lowCtr = useMemo(() => organic.filter(item => Number(item.impressions) >= 30 && Number(item.ctr) < 0.02).slice(0, 5), [organic])
  const landingPages = useMemo(() => (data?.report?.searchConsole?.pages || []).slice(0, 5), [data])

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
    {data && <><article className="consult-admin-radar-card consult-admin-radar-summary"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">Compilado · últimos 30 dias</p><h3>Insights consolidados da Consult</h3></div><span className="consult-admin-source-status is-ready">Fontes do cliente</span></div><p>Este resumo reúne desempenho do site, buscas orgânicas, mídia paga e sinais públicos relacionados ao nicho da Consult. Os dados continuam separados por fonte para evitar comparar métricas diferentes como se fossem equivalentes.</p><div className="consult-admin-metrics"><article className="consult-admin-metric"><p>Sessões GA4</p><strong>{ga4Totals ? number(ga4Totals.sessions) : '—'}</strong><small>{data.report?.ga4?.status === 'available' ? 'Tráfego no site' : 'GA4 indisponível'}</small></article><article className="consult-admin-metric"><p>Cliques orgânicos</p><strong>{gscTotals ? number(gscTotals.clicks) : '—'}</strong><small>{gscTotals ? `${number(gscTotals.impressions)} impressões · CTR ${pct(gscTotals.ctr)}` : data.organicError || 'Search Console indisponível'}</small></article><article className="consult-admin-metric"><p>Google Ads</p><strong>{adsTotals ? number(adsTotals.clicks) : '—'}</strong><small>{adsTotals ? `${number(adsTotals.impressions)} impressões · investimento ${Number(adsTotals.cost || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : data.report?.ads?.message || 'Ads indisponível'}</small></article></div><div className="consult-admin-radar-grid"><div><h4>Oportunidades orgânicas</h4>{lowCtr.length ? <ul className="consult-admin-radar-list">{lowCtr.map(item => <li key={item.key}><div><strong>{item.key}</strong><small>{number(item.impressions)} impressões, CTR {pct(item.ctr)}, posição média {Number(item.position || 0).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}. Avaliar intenção e correspondência do conteúdo antes de criar artigo.</small>{onCreateArticle && <button type="button" className="consult-trend-create-article" onClick={() => createOrganicDraft(item)}>Criar rascunho para revisar</button>}</div></li>)}</ul> : <p className="consult-admin-panel-state">Sem consultas com volume mínimo e CTR baixo no período.</p>}</div><div><h4>Páginas com presença na busca</h4>{landingPages.length ? <ul className="consult-admin-radar-list">{landingPages.map(item => <li key={item.key}><div><a href={item.key} target="_blank" rel="noreferrer">{item.key}<ExternalLink size={13}/></a><small>{number(item.clicks)} cliques · {number(item.impressions)} impressões</small></div></li>)}</ul> : <p className="consult-admin-panel-state">{data.organicError || 'Nenhuma página retornada no período.'}</p>}</div></div><p className="consult-admin-info">Tendências e notícias abaixo são filtradas para Física Médica, radiometria, proteção radiológica, diagnóstico por imagem e engenharia clínica. O Google Trends entrega sinais de interesse público, não volume absoluto de buscas.</p></article><div className="consult-admin-radar-grid">
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">Search Console · últimos 28 dias</p><h3>Consultas orgânicas da Consult</h3></div><span className={'consult-admin-source-status ' + (data.organicError ? 'is-offline' : 'is-ready')}>{data.organicError ? 'Indisponível' : 'Conectado'}</span></div>
        {organic.length ? <ul className="consult-admin-radar-list">{organic.map(item => <li key={item.key}><div><strong>{item.key}</strong><small>{number(item.impressions)} impressões · {number(item.clicks)} cliques · CTR {pct(item.ctr)} · posição {Number(item.position || 0).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</small>{onCreateArticle && <button type="button" className="consult-trend-create-article" onClick={() => createOrganicDraft(item)}>Criar rascunho de artigo</button>}</div></li>)}</ul> : <p className="consult-admin-panel-state">{data.organicError || (filter ? 'Nenhuma consulta corresponde ao filtro.' : 'Nenhuma consulta orgânica relacionada foi encontrada no período.')}</p>}
      </article>
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">{data.sources?.googleTrends?.label}</p><h3>Buscas em alta no Brasil</h3></div><span className={'consult-admin-source-status ' + (data.sources?.googleTrends?.status === 'fulfilled' ? 'is-ready' : 'is-offline')}>{data.sources?.googleTrends?.status === 'fulfilled' ? 'Disponível' : 'Indisponível'}</span></div>
        {trends.length ? <ul className="consult-admin-radar-list">{trends.map(item => <li key={item.url}><div><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ExternalLink size={13}/></a><small>{item.volume || 'Em alta'}{item.date ? ` · ${dateLabel(item.date)}` : ''}</small>{onCreateArticle && <button type="button" className="consult-trend-create-article" onClick={() => onCreateArticle({ ...item, excerpt: item.volume || '', context: 'Tema filtrado do Google Trends Brasil. Localize e valide fontes técnicas relacionadas ao nicho da Consult.' })}>Criar rascunho de artigo</button>}</div></li>)}</ul> : <p className="consult-admin-panel-state">{filter ? 'Nenhuma tendência corresponde ao filtro.' : 'Nenhuma tendência relacionada ao nicho da Consult foi encontrada neste momento.'}</p>}
      </article>
      <article className="consult-admin-radar-card"><div className="consult-admin-radar-card-heading"><div><p className="consult-admin-kicker">{data.sources?.googleNews?.label}</p><h3>Notícias por tema</h3></div><span className={'consult-admin-source-status ' + (data.sources?.googleNews?.status === 'fulfilled' ? 'is-ready' : 'is-offline')}>{data.sources?.googleNews?.status === 'fulfilled' ? 'Disponível' : 'Indisponível'}</span></div>
        {news.length ? <ul className="consult-admin-radar-list">{news.map(item => <li key={`${item.query}-${item.url}`}><div><a href={item.url} target="_blank" rel="noreferrer">{item.title}<ExternalLink size={13}/></a><small>{item.source}{item.query ? ` · ${item.query}` : ''}{item.date ? ` · ${dateLabel(item.date)}` : ''}</small>{onCreateArticle && <button type="button" className="consult-trend-create-article" onClick={() => onCreateArticle({ ...item, excerpt: `Notícia relacionada ao setor: ${item.title}`, context: 'Notícia identificada pelo radar da Consult. Confirme a fonte e procure referência técnica primária antes de redigir.' })}>Criar rascunho de artigo</button>}</div></li>)}</ul> : <p className="consult-admin-panel-state">{filter ? 'Nenhuma notícia corresponde ao filtro.' : 'Não há notícias recentes relacionadas aos serviços e temas da Consult.'}</p>}
      </article>
    </div></>}
    <div className="consult-admin-info">Os artigos partem de insights orgânicos, tendências ou notícias relacionados à Consult e são salvos em revisão. As consultas do Search Console são dados do domínio consult.med.br; ausência de uma consulta no painel não representa ausência de demanda em outros canais.</div>
  </section>
}
