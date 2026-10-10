import React, { useEffect } from 'react'
import { Building2, FileText, MapPin, ShieldCheck, UsersRound } from 'lucide-react'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ApprovedInternalHero, ApprovedLightSection, ApprovedProofStrip, CONSULT_IMAGES } from '@/components/consult/ConsultApprovedInternal'

export default function ConsultAboutPage() {
  useEffect(() => {
    document.title='Sobre a Consult | Consult Radiometria e Qualidade'
    document.querySelector('meta[name="description"]')?.setAttribute('content','Conheça a Consult Radiometria e Qualidade, fundada em 1995, sua atuação técnica, áreas de serviço e estrutura de atendimento.')
  }, [])

  return <ConsultSiteShell><main>
    <ApprovedInternalHero
      eyebrow="Sobre a Consult"
      title="Medição, laudo técnico e responsabilidade em saúde"
      description="Fundada em 1995, a Consult atua em Física Médica do Radiodiagnóstico desde 2013 e reúne hoje Física Médica, Proteção Radiológica e Consult Engenharia Clínica."
      image={CONSULT_IMAGES.radiology}
    />
    <ApprovedProofStrip items={[[ 'HISTÓRIA','Desde 1995' ],[ 'FÍSICA MÉDICA','Desde 2013' ],[ 'ATUAÇÃO','Todo o Brasil' ],[ 'EQUIPES EM CAMPO','SP • PR • MS • MG' ]]}/>

    <ApprovedLightSection eyebrow="Quem somos" title="Técnica para transformar medição em decisão" intro="A Consult verifica condições técnicas, documenta resultados e organiza evidências para apoiar instituições de saúde em segurança, desempenho e conformidade." center>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          [ShieldCheck,'Física Médica','Controle de Qualidade, medições e laudos técnicos para diagnóstico por imagem.'],
          [FileText,'Proteção Radiológica','Programas, levantamentos, blindagem, treinamentos e apoio documental.'],
          [Building2,'Consult Engenharia Clínica','Ensaios, manutenção preventiva, reverificação e qualificação térmica com histórico por equipamento.'],
        ].map(([Icon,title,text])=><div key={title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"><Icon className="h-8 w-8 text-[#08A77F]"/><h2 className="mt-4 text-xl font-black text-[#123C3B]">{title}</h2><p className="mt-3 text-sm leading-7 text-black/55">{text}</p></div>)}
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Responsabilidade técnica" title="Matheus Alvarez — responsável técnico" intro="Matheus Alvarez é o responsável técnico indicado pela Consult. Os documentos são emitidos conforme o serviço executado, com assinatura profissional aplicável." white>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-[#075653] p-7 text-white"><UsersRound className="h-8 w-8 text-[#8AE600]"/><h3 className="mt-4 text-xl font-black">Responsável técnico habilitado</h3><p className="mt-3 text-sm leading-7 text-white/70">Laudos e documentos técnicos seguem a responsabilidade profissional aplicável a cada serviço.</p></div>
        <div className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm"><MapPin className="h-8 w-8 text-[#08A77F]"/><h3 className="mt-4 text-xl font-black text-[#123C3B]">Estrutura de atendimento</h3><p className="mt-3 text-sm leading-7 text-black/55">Sede em Matão/SP e atendimento em Botucatu/SP, com atuação nacional e equipes em campo em São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais.</p></div>
      </div>
    </ApprovedLightSection>

    <ConsultCtaBand title="Precisa falar com a equipe Consult?" text="Conte a necessidade da sua instituição. A equipe orienta o serviço e o escopo técnico aplicável."/>
  </main></ConsultSiteShell>
}
