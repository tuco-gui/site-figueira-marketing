import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import {
  ApprovedDarkProcess,
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedNormCards,
  ApprovedProofStrip,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'

const MODALITIES = [
  ['Raios X convencional','IN 90/2021','raio-x-convencional'],
  ['Fluoroscopia, Arco C e angiografia','IN 91/2021','fluoroscopia-arco-c-angiografia'],
  ['Mamografia','IN 92/2021','mamografia'],
  ['Tomografia computadorizada','IN 93/2021','tomografia'],
  ['Odontológico extraoral','IN 94/2021','odontologico-extraoral'],
  ['Odontológico intraoral','IN 95/2021','odontologico-intraoral'],
  ['Ultrassom','IN 96/2021','ultrassom'],
  ['Ressonância magnética','IN 97/2021','ressonancia-magnetica'],
  ['Densitometria óssea','RDC 611/2022','densitometria-ossea'],
  ['Raios X veterinário','RDC 611/2022 + IN 90 como referência técnica','raio-x-veterinario'],
]

const PROCESS = [
  ['01','Identificar a modalidade','Confirmar o equipamento, o contexto de uso e a referência aplicável.'],
  ['02','Executar os ensaios','Realizar os testes previstos para a modalidade e para o equipamento.'],
  ['03','Analisar os resultados','Comparar as medições com os critérios técnicos aplicáveis.'],
  ['04','Emitir o laudo','Documentar os resultados e a conclusão técnica.'],
]

export default function ConsultQualityIndexPage() {
  useEffect(() => {
    document.title = 'Controle de Qualidade em Diagnóstico por Imagem | Consult'
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Controle de Qualidade em diagnóstico por imagem com avaliação por modalidade, referências específicas e laudo técnico assinado pelo físico médico.'
    )
  }, [])

  return (
    <ConsultSiteShell>
      <main>
        <ApprovedInternalHero
          eyebrow="Física Médica"
          title="Controle de Qualidade"
          description="Avaliação técnica de equipamentos de diagnóstico por imagem com ensaios definidos conforme a modalidade, análise dos resultados e emissão de laudo técnico."
          image={CONSULT_IMAGES.radiology}
        />

        <ApprovedProofStrip items={[
          ['BASE','RDC 611/2022'],
          ['MODALIDADES','IN 90 a 97/2021'],
          ['ENTREGA','Laudo técnico'],
          ['RESPONSÁVEL','Físico médico'],
        ]} />

        <ApprovedLightSection
          eyebrow="Por modalidade"
          title="Cada tecnologia possui critérios próprios de avaliação"
          intro="Selecione a modalidade para ver a referência técnica, o escopo da avaliação e como o resultado é documentado."
          center
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODALITIES.map(([label,norm,slug]) => (
              <Link
                key={slug}
                to={`/fisica-medica/controle-de-qualidade/${slug}`}
                className="group rounded-2xl border border-[#D7E8E3] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#08A77F] hover:shadow-lg"
              >
                <div className="text-lg font-black text-[#123C3B]">{label}</div>
                <div className="mt-3 text-xs font-extrabold uppercase tracking-[.12em] text-[#08A77F]">{norm}</div>
                <p className="mt-4 text-sm leading-6 text-[#607D7A]">Ver escopo, parâmetros, processo, laudo e referência da modalidade.</p>
                <span className="mt-5 inline-flex text-sm font-extrabold text-[#075653] group-hover:text-[#08A77F]">Ver modalidade</span>
              </Link>
            ))}
          </div>
        </ApprovedLightSection>

        <ApprovedDarkProcess items={PROCESS} />

        <ApprovedLightSection
          eyebrow="Base normativa"
          title="Referências organizadas por tecnologia"
          intro="A RDC 611/2022 estabelece a base sanitária geral e as Instruções Normativas complementam os critérios conforme a modalidade."
          white
        >
          <ApprovedNormCards items={[
            ['RDC 611/2022 — Anvisa','Base sanitária geral para serviços de radiologia diagnóstica e intervencionista.',RDC_611],
            ['IN 90 a 97/2021 — Anvisa','Referências específicas para as modalidades apresentadas nesta área.',ANVISA_IN],
          ]} />
        </ApprovedLightSection>

        <ConsultCtaBand
          title="Precisa programar o Controle de Qualidade?"
          text="Informe a modalidade e o equipamento. A equipe Consult confirma o escopo técnico e a programação da avaliação."
        />
      </main>
    </ConsultSiteShell>
  )
}
