import React, { useEffect, useMemo } from 'react'
import { CheckCircle2, FileText, MapPin, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'

const REGIONS = {
  'sao-paulo': { state: 'São Paulo', uf: 'SP', location: 'em São Paulo', sede: true },
  parana: { state: 'Paraná', uf: 'PR', location: 'no Paraná' },
  'mato-grosso-do-sul': { state: 'Mato Grosso do Sul', uf: 'MS', location: 'em Mato Grosso do Sul' },
  'minas-gerais': { state: 'Minas Gerais', uf: 'MG', location: 'em Minas Gerais' },
}

const RADIOLOGY_SERVICES = [
  ['Controle de qualidade (CQ)', '/consult/servicos/controle-qualidade'],
  ['Programa de Proteção Radiológica', '/consult/servicos/programa-protecao-radiologica'],
  ['Levantamento radiométrico', '/consult/servicos/levantamento-radiometrico'],
  ['Projeto de blindagem', '/consult/servicos/projeto-blindagem'],
  ['Treinamentos', '/consult/servicos/treinamentos'],
  ['Licenciamento sanitário', '/consult/servicos/licenciamento-sanitario'],
]
const ENGINEERING_SERVICES = [
  ['Ensaio de segurança elétrica', '/consult/engenharia-clinica/seguranca-eletrica'],
  ['Ensaio de desempenho (calibração)', '/consult/engenharia-clinica/desempenho-calibracao'],
  ['Manutenção preventiva', '/consult/engenharia-clinica/manutencao-preventiva'],
  ['Reverificação', '/consult/engenharia-clinica/reverificacao'],
  ['Qualificação térmica', '/consult/engenharia-clinica/qualificacao-termica'],
]

function ServiceColumn({ title, eyebrow, items, dark = false }) {
  return (
    <article className={`rounded-[24px] border p-6 md:p-8 ${dark ? 'border-white/10 bg-white/6 text-white' : 'border-[#DCEAE7] bg-white text-[#123C3B] shadow-[0_14px_40px_rgba(7,86,83,.06)]'}`}>
      <p className={`text-[10px] font-black uppercase tracking-[.2em] ${dark ? 'text-[#8AE600]' : 'text-[#08A77F]'}`}>{eyebrow}</p>
      <h2 className={`mt-2 text-2xl font-black ${dark ? 'text-white' : 'text-[#075653]'}`}>{title}</h2>
      <div className={`mt-5 divide-y ${dark ? 'divide-white/10' : 'divide-[#E8F0EE]'}`}>
        {items.map(([label, href]) => <Link key={href} to={href} className={`flex items-center justify-between gap-4 py-3 text-sm font-bold transition ${dark ? 'text-white/75 hover:text-[#B8FF51]' : 'text-[#365A58] hover:text-[#075653]'}`}><span>{label}</span><span aria-hidden="true">›</span></Link>)}
      </div>
    </article>
  )
}

export default function ConsultRegionPage() {
  const { slug } = useParams()
  const region = useMemo(() => REGIONS[slug], [slug])

  useEffect(() => {
    if (!region) return
    document.title = `Consult ${region.location} | Física Médica, Proteção Radiológica e Engenharia Clínica`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `Atendimento presencial da Consult ${region.location} para Física Médica, Proteção Radiológica e Engenharia Clínica, com medição, ensaios e laudos técnicos.`)
  }, [region])

  if (!region) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Região não encontrada</h1><Link to="/consult" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para a Consult</Link></main></ConsultSiteShell>

  return (
    <ConsultSiteShell>
      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute inset-0 opacity-60" style={{backgroundImage:'radial-gradient(circle at 82% 25%, rgba(138,230,0,.16), transparent 24%), linear-gradient(128deg, transparent 40%, rgba(5,210,157,.13) 100%)'}}/>
          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <Link to="/consult" className="text-sm font-bold text-white/58 hover:text-white">Consult Radiometria e Qualidade</Link>
            <p className="mt-8 text-[10px] font-black uppercase tracking-[.28em] text-[#8AE600]">Atuação presencial confirmada</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-.04em] sm:text-5xl lg:text-6xl">Consult {region.location}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">Física Médica, Proteção Radiológica e Consult Engenharia Clínica com medição, ensaios, calibração, qualificação e documentação técnica.</p>
            <div className="mt-7 flex flex-wrap gap-2">{region.sede && <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/7 px-4 py-2 text-sm font-bold"><MapPin size={16} className="text-[#8AE600]"/> Sede em Matão/SP</span>}<span className="rounded-full border border-white/16 bg-white/7 px-4 py-2 text-sm font-bold">Atendimento presencial</span></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16"><div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-[22px] border border-[#DCEAE7] bg-white p-6 shadow-sm"><ShieldCheck size={24} className="text-[#08A77F]"/><h2 className="mt-5 text-lg font-black text-[#075653]">Medição e laudo técnico</h2><p className="mt-3 text-sm leading-6 text-[#607D7A]">Avaliações técnicas com resultado documentado para apoiar segurança, desempenho e conformidade.</p></article>
          <article className="rounded-[22px] border border-[#DCEAE7] bg-white p-6 shadow-sm"><FileText size={24} className="text-[#08A77F]"/><h2 className="mt-5 text-lg font-black text-[#075653]">Frentes integradas</h2><p className="mt-3 text-sm leading-6 text-[#607D7A]">Radiologia e Engenharia Clínica organizadas dentro da mesma estrutura de atendimento e documentação.</p></article>
          <article className="rounded-[22px] bg-[#075653] p-6 text-white"><CheckCircle2 size={24} className="text-[#8AE600]"/><h2 className="mt-5 text-lg font-black">Independência técnica</h2><p className="mt-3 text-sm leading-6 text-white/68">Na Engenharia Clínica, a Consult mede e documenta. Não vende peças nem condiciona o resultado a uma empresa de conserto.</p></article>
        </div></section>

        <section className="relative overflow-hidden bg-[#043F3D] text-white"><div className="absolute inset-0 opacity-40" style={{backgroundImage:'linear-gradient(115deg, transparent 25%, rgba(5,210,157,.13) 65%, transparent), radial-gradient(circle at 88% 20%, rgba(138,230,0,.13), transparent 22%)'}}/><div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16"><ConsultEyebrow light>Serviços disponíveis</ConsultEyebrow><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight md:text-4xl">Da avaliação radiológica aos ensaios de Engenharia Clínica</h2><div className="mt-9 grid gap-5 md:grid-cols-2"><ServiceColumn title="Física Médica e Proteção Radiológica" eyebrow="Radiologia" items={RADIOLOGY_SERVICES} dark/><ServiceColumn title="Consult Engenharia Clínica" eyebrow="Ensaios e qualificações" items={ENGINEERING_SERVICES} dark/></div></div></section>

        <section className="bg-[#F4FAF8]"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:px-8 md:py-16 lg:grid-cols-[.55fr_1.45fr]"><div><ConsultEyebrow>Cobertura</ConsultEyebrow><h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Atuação presencial por região</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">A Consult realiza atendimento presencial em São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais, com sede em Matão/SP.</p></div><div className="grid gap-3 sm:grid-cols-2">{Object.entries(REGIONS).map(([key,item]) => <Link key={key} to={`/consult/atuacao/${key}`} className={`rounded-[18px] border p-5 transition ${key===slug?'border-[#075653] bg-[#075653] text-white':'border-[#D4E6E1] bg-white text-[#365A58] hover:border-[#08A77F]'}`}><span className={`text-[10px] font-black uppercase tracking-[.18em] ${key===slug?'text-[#8AE600]':'text-[#08A77F]'}`}>{item.uf}</span><div className="mt-2 text-lg font-black">{item.state}</div>{item.sede && <div className={`mt-2 text-xs ${key===slug?'text-white/60':'text-[#78908E]'}`}>Sede em Matão/SP</div>}</Link>)}</div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16"><div className="rounded-[24px] border border-[#DCEAE7] bg-white p-7 shadow-[0_16px_45px_rgba(7,86,83,.07)] md:p-9"><ConsultEyebrow>Atendimento regional</ConsultEyebrow><h2 className="mt-4 text-2xl font-black text-[#075653]">Cobertura técnica sem confundir atendimento com sede</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#607D7A]">Estas páginas apresentam a cobertura de atendimento da Consult. A existência de atendimento em um estado não significa que haja filial ou sede física naquele local.</p></div></section>

        <ConsultCtaBand title={`Precisa de atendimento ${region.location}?`} text="Explique o serviço ou equipamento que precisa ser avaliado e a equipe Consult orienta o próximo passo." />
      </main>
    </ConsultSiteShell>
  )
}
