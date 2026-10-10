import React, { useEffect } from 'react'
import { BookOpen, FileText, GitBranch, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'

const MATERIALS = [
  {
    title: 'Mapa de normas por modalidade',
    text: 'RDC 611/2022 e a relação das IN 90 a 97/2021 com as modalidades de diagnóstico por imagem atendidas pela Consult.',
    href: '/materiais/mapa-normas-radiologia',
    tag: 'Física Médica',
    Icon: FileText,
  },
  {
    title: 'CQ, radiometria ou blindagem?',
    text: 'Um guia visual para entender quando cada serviço entra no ciclo de uma sala ou equipamento de radiologia.',
    href: '/materiais/guia-servicos-radiologia',
    tag: 'Proteção Radiológica',
    Icon: GitBranch,
  },
  {
    title: 'Modelos de sinalização técnica',
    text: 'Referências visuais de placas para radioproteção, acesso controlado e ressonância magnética, sujeitas à validação técnica.',
    href: '/materiais/modelos-sinalizacao',
    tag: 'Material gratuito',
    Icon: ShieldCheck,
  },
]

export default function ConsultMaterialsPage() {
  useEffect(() => {
    document.title = 'Materiais técnicos gratuitos | Consult'
    document.querySelector('meta[name="description"]')?.setAttribute('content','Materiais técnicos da Consult sobre normas, Controle de Qualidade, Física Médica, Proteção Radiológica e Engenharia Clínica.')
  }, [])

  return <ConsultSiteShell><main>
    <section className="relative overflow-hidden bg-[#075653] text-white">
      <div className="absolute inset-0 opacity-70" style={{backgroundImage:'radial-gradient(circle at 82% 25%, rgba(138,230,0,.15), transparent 24%), linear-gradient(125deg, transparent 42%, rgba(5,210,157,.12) 100%)'}} />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Link to="/" className="text-sm font-bold text-white/55 hover:text-white">Consult Radiometria e Qualidade</Link>
        <div className="mt-9 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.26em] text-[#8AE600]"><span className="h-px w-10 bg-[#8AE600]"/>Materiais gratuitos</div>
        <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[66px]">Conteúdo técnico para consultar antes de decidir.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">Guias próprios da Consult organizados a partir de referências técnicas, sem substituir a norma oficial nem a avaliação de cada caso.</p>
      </div>
    </section>

    <section className="bg-[#F4FAF8]"><div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[.5fr_1.5fr]"><div><ConsultEyebrow>Biblioteca prática</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">Comece pelo assunto que precisa resolver.</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">Os materiais apontam para páginas de serviço e fontes oficiais quando é necessário aprofundar.</p></div><div className="grid gap-5 md:grid-cols-2">{MATERIALS.map(({title,text,href,tag,Icon})=><Link key={href} to={href} className="group rounded-[26px] border border-[#D5E6E1] bg-white p-6 shadow-[0_16px_45px_rgba(7,86,83,.06)] transition hover:-translate-y-1 hover:border-[#08A77F] hover:shadow-[0_22px_55px_rgba(7,86,83,.12)]"><div className="flex items-start justify-between gap-4"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E7F6F1] text-[#078B6B]"><Icon size={23}/></div><span className="rounded-full bg-[#075653] px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em] text-[#B8FF51]">{tag}</span></div><h3 className="mt-6 text-2xl font-black leading-7 text-[#075653]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#607D7A]">{text}</p><span className="mt-6 inline-flex text-xs font-black uppercase tracking-[.14em] text-[#078B6B]">Abrir material</span></Link>)}</div></div>
    </div></section>

    <section className="bg-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-[.65fr_1.35fr] md:px-8 md:py-18"><div><ConsultEyebrow>Uso responsável</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653]">Material educativo não substitui avaliação técnica.</h2></div><div className="rounded-[24px] border border-[#D5E6E1] bg-[#F7FBFA] p-6"><div className="flex gap-4"><ShieldCheck size={24} className="mt-1 shrink-0 text-[#08A77F]"/><div><h3 className="text-lg font-black text-[#075653]">Cada instituição tem contexto próprio</h3><p className="mt-3 text-sm leading-7 text-[#607D7A]">Equipamento, ambiente, modalidade, histórico e situação regulatória mudam o escopo. Os materiais ajudam a entender o tema; a definição do serviço aplicável acontece na análise do caso.</p></div></div></div></div></section>

    <ConsultCtaBand title="Quer transformar a dúvida em um escopo técnico?" text="Envie o equipamento, modalidade ou situação da instituição. A equipe Consult orienta qual frente deve ser avaliada." />
  </main></ConsultSiteShell>
}
