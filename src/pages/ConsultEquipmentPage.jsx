import React, { useEffect, useMemo } from 'react'
import { CheckCircle2, FileText, Gauge, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'

const EQUIPMENT = {
  'monitor-multiparametrico': { title:'Monitor multiparamétrico', test:'ECG, PNI (pressão não invasiva), pressão invasiva, temperatura, respiração e SpO₂', analyzer:'Waller + Yagi' },
  eletrocardiografo: { title:'Eletrocardiógrafo', test:'Resposta a ritmos cardíacos simulados', analyzer:'Waller' },
  'oximetro-pulso': { title:'Oxímetro de pulso', test:'Leitura de SpO₂ e frequência de pulso com sinal simulado. Não avalia a exatidão do sensor no paciente.', analyzer:'Yagi' },
  'esfigmomanometro-mapa': { title:'Esfigmomanômetro digital e MAPA', test:'Leitura de pressão sistólica e diastólica simuladas', analyzer:'Waller' },
  'desfibrilador-cardioversor-dea': { title:'Desfibrilador, cardioversor e DEA', test:'Energia entregue, tempo de carga, atraso no modo sincronizado e resposta ao ECG', analyzer:'Lown' },
  'marca-passo-transcutaneo': { title:'Marca-passo transcutâneo', test:'Tensão, corrente e frequência em diferentes cargas', analyzer:'Lown' },
  'bisturi-eletrico': { title:'Bisturi elétrico (eletrocautério)', test:'Potência entregue em diferentes cargas e fuga de alta frequência', analyzer:'Harrison' },
  'ventilador-pulmonar': { title:'Ventilador pulmonar', test:'Fluxo, volume, pressões, incluindo PEEP, e concentração de O₂', analyzer:'Luft + pulmão de teste' },
  'aparelho-anestesia': { title:'Aparelho de anestesia — parte ventilatória', test:'Os mesmos parâmetros do ventilador. Não mede concentração de agente anestésico.', analyzer:'Luft' },
  'cpap-bipap': { title:'CPAP e BiPAP', test:'Fluxo e pressão', analyzer:'Luft' },
  'fluxometro-manometro-o2': { title:'Fluxômetro e manômetro de O₂', test:'Fluxo e pressão', analyzer:'Luft' },
  autoclave: { title:'Autoclave', test:'Temperatura em até 16 pontos, pressão e letalidade (F0), em ciclos de operação', analyzer:'Otto' },
  'termodesinfectora-estufa': { title:'Termodesinfectora e estufa de esterilização', test:'Temperatura em até 16 pontos e letalidade (A0)', analyzer:'Otto' },
  'estufa-banho-maria': { title:'Estufa e banho-maria de laboratório', test:'Estabilidade e uniformidade de temperatura', analyzer:'Otto' },
  'geladeira-camara-vacina': { title:'Geladeira e câmara de vacina', test:'Mapeamento de temperatura', analyzer:'Otto' },
}

const FLOW = [
  ['01','Identificação','Confirmação do equipamento, modelo, aplicação e ensaios aplicáveis.'],
  ['02','Segurança','Execução do ensaio de segurança elétrica quando aplicável ao equipamento.'],
  ['03','Desempenho','Medição dos parâmetros específicos com analisador ou simulador calibrado.'],
  ['04','Laudo','Resultado documentado por equipamento e preservado no histórico técnico.'],
]

export default function ConsultEquipmentPage() {
  const { slug } = useParams()
  const item = useMemo(() => EQUIPMENT[slug], [slug])

  useEffect(() => {
    if (!item) return
    document.title = `Ensaio de ${item.title} | Consult Engenharia Clínica`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `Ensaio de segurança elétrica e desempenho para ${item.title}. ${item.test}.`)
  }, [item])

  if (!item) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Equipamento não encontrado</h1><Link to="/consult/areas/engenharia-clinica" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Engenharia Clínica</Link></main></ConsultSiteShell>

  return (
    <ConsultSiteShell>
      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute inset-0 opacity-60" style={{backgroundImage:'radial-gradient(circle at 84% 30%, rgba(138,230,0,.18), transparent 23%), linear-gradient(130deg, transparent 40%, rgba(5,210,157,.12) 100%)'}}/>
          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <Link to="/consult/areas/engenharia-clinica" className="text-sm font-bold text-white/58 hover:text-white">Consult Engenharia Clínica</Link>
            <p className="mt-8 text-[10px] font-black uppercase tracking-[.28em] text-[#8AE600]">Equipamento atendido</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-.04em] sm:text-5xl lg:text-6xl">{item.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">Ensaios de segurança e desempenho com medição documentada e histórico técnico por equipamento.</p>
            <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full border border-white/16 bg-white/7 px-4 py-2">RDC 509/2021</span><span className="rounded-full border border-white/16 bg-white/7 px-4 py-2">Arkmeds</span><span className="rounded-full border border-white/16 bg-white/7 px-4 py-2">Rastreabilidade RBC</span></div>
          </div>
        </section>

        <section className="border-y border-[#8AE600]/25 bg-[#043F3D] text-white"><div className="mx-auto flex max-w-7xl items-start gap-3 px-5 py-5 md:px-8"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#8AE600]"/><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#8AE600]">Verificação independente</p><p className="mt-1 text-sm leading-6 text-white/74">A Consult não conserta e não vende peças. O resultado técnico serve como base objetiva para a instituição decidir o próximo passo.</p></div></div></section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[.62fr_1.38fr]">
          <div><ConsultEyebrow>Escopo do ensaio</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">O que é verificado</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">A página do equipamento deixa claro o parâmetro medido e o instrumento utilizado, evitando descrições genéricas.</p></div>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-[22px] border border-[#DCEAE7] bg-white p-6 shadow-sm"><Gauge size={24} className="text-[#08A77F]"/><h3 className="mt-5 text-lg font-black text-[#075653]">Parâmetros</h3><p className="mt-3 text-sm leading-6 text-[#607D7A]">{item.test}</p></article>
            <article className="rounded-[22px] border border-[#DCEAE7] bg-white p-6 shadow-sm"><CheckCircle2 size={24} className="text-[#08A77F]"/><h3 className="mt-5 text-lg font-black text-[#075653]">Analisador</h3><p className="mt-3 text-sm font-bold leading-6 text-[#365A58]">{item.analyzer}</p><p className="mt-3 text-xs leading-5 text-[#78908E]">Instrumento com certificado de calibração e rastreabilidade RBC, conforme a estrutura informada pela Consult.</p></article>
            <article className="rounded-[22px] bg-[#075653] p-6 text-white"><ShieldCheck size={24} className="text-[#8AE600]"/><h3 className="mt-5 text-lg font-black">Segurança elétrica</h3><p className="mt-3 text-sm leading-6 text-white/68">Quando aplicável, o equipamento recebe ensaio de segurança elétrica com Safetest 50, Rigel.</p></article>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#F4FAF8]"><div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16"><ConsultEyebrow>Fluxo técnico</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Da bancada ao histórico do equipamento</h2><div className="mt-9 grid gap-4 md:grid-cols-4">{FLOW.map(([num,title,text]) => <article key={num} className="rounded-[20px] border border-[#DCEAE7] bg-white p-5"><span className="text-3xl font-black text-[#08A77F]">{num}</span><h3 className="mt-4 text-lg font-black text-[#075653]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#607D7A]">{text}</p></article>)}</div></div></section>

        <section className="bg-[#075653] text-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[.65fr_1.35fr] md:px-8 md:py-14"><div><ConsultEyebrow light>Entregável</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight">Laudo por equipamento</h2></div><div className="rounded-[22px] border border-white/10 bg-white/6 p-6"><div className="flex gap-4"><FileText size={26} className="mt-1 shrink-0 text-[#8AE600]"/><div><h3 className="text-xl font-black">Resultado técnico e histórico no Arkmeds</h3><p className="mt-3 text-sm leading-7 text-white/66">O resultado fica associado ao equipamento e pode compor seu histórico técnico. Quando a Consult liberar um modelo demonstrativo, este bloco poderá exibir um exemplo sem dados sensíveis.</p></div></div></div></div></section>

        <ConsultCtaBand title={`Solicite a avaliação de ${item.title}`} text="Converse com a equipe Consult para confirmar escopo, equipamento, ensaios aplicáveis e agenda de atendimento." />
      </main>
    </ConsultSiteShell>
  )
}
