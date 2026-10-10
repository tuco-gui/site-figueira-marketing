import React, { useEffect } from 'react'
import { Activity, ArrowRight, FileText, Gauge, ShieldCheck, Stethoscope, Thermometer, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ApprovedInternalHero, ApprovedLightSection, CONSULT_IMAGES } from '@/components/consult/ConsultApprovedInternal'

const GROUPS=[
  ['Física Médica',[
    ['Controle de Qualidade','/consult/fisica-medica/controle-de-qualidade',Gauge],
  ]],
  ['Proteção Radiológica',[
    ['Programa de Proteção Radiológica','/consult/protecao-radiologica/programa-protecao-radiologica',FileText],
    ['Levantamento radiométrico','/consult/protecao-radiologica/levantamento-radiometrico',Activity],
    ['Projeto de blindagem','/consult/protecao-radiologica/projeto-blindagem',ShieldCheck],
    ['Treinamentos','/consult/protecao-radiologica/treinamentos',Stethoscope],
    ['Licenciamento sanitário','/consult/protecao-radiologica/licenciamento-sanitario',FileText],
  ]],
  ['Consult Engenharia Clínica',[
    ['Ensaio de segurança elétrica','/consult/engenharia-clinica/seguranca-eletrica',ShieldCheck],
    ['Calibração e ensaio de desempenho','/consult/engenharia-clinica/desempenho-calibracao',Gauge],
    ['Manutenção preventiva','/consult/engenharia-clinica/manutencao-preventiva',Wrench],
    ['Reverificação','/consult/engenharia-clinica/reverificacao',Activity],
    ['Qualificação térmica','/consult/engenharia-clinica/qualificacao-termica',Thermometer],
  ]],
]

export default function ConsultServicesPage(){
  useEffect(()=>{
    document.title='Serviços | Consult Radiometria e Qualidade'
    document.querySelector('meta[name="description"]')?.setAttribute('content','Catálogo de serviços da Consult em Física Médica, Proteção Radiológica e Consult Engenharia Clínica.')
  },[])
  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow="Serviços" title="Encontre o serviço técnico que sua instituição precisa" description="Catálogo organizado por área para acessar diretamente escopo, referências, entregáveis e contato." image={CONSULT_IMAGES.engineering}/>
    <ApprovedLightSection eyebrow="Catálogo" title="Serviços por área" intro="Acesse a página específica para entender o serviço e o escopo aplicável." white>
      <div className="space-y-10">{GROUPS.map(([group,items])=><section key={group}><h2 className="text-2xl font-black text-[#123C3B]">{group}</h2><div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map(([label,href,Icon])=><Link key={href} to={href} className="group rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#08A77F] text-white"><Icon className="h-5 w-5"/></span><h3 className="font-black text-[#123C3B]">{label}</h3></div><span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#08A77F]">Ver serviço <ArrowRight className="h-4 w-4"/></span></Link>)}</div></section>)}</div>
    </ApprovedLightSection>
    <ConsultCtaBand title="Não sabe qual serviço se aplica?" text="Conte o equipamento, ambiente ou situação. A equipe Consult orienta o escopo técnico adequado."/>
  </main></ConsultSiteShell>
}
