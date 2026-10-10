import React, { useEffect } from 'react'
import { Activity, FileText, Gauge, ShieldCheck, Stethoscope, Thermometer, Wrench } from 'lucide-react'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import {
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedMediaCards,
  ApprovedProofStrip,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

const GROUPS = [
  {
    eyebrow: 'Física Médica',
    title: 'Controle de Qualidade por modalidade',
    intro: 'Ensaios periódicos para equipamentos de diagnóstico por imagem, com referência específica por modalidade e laudo técnico assinado pelo físico médico.',
    image: CONSULT_IMAGES.radiology,
    items: [
      {
        title: 'Controle de Qualidade',
        text: 'Raios X, fluoroscopia, mamografia, tomografia, odontologia, ultrassom, ressonância, densitometria e raios X veterinário.',
        href: '/consult/fisica-medica/controle-de-qualidade',
        image: CONSULT_IMAGES.radiology,
        Icon: Gauge,
        badge: '10 modalidades',
        cta: 'Ver modalidades',
      },
    ],
  },
  {
    eyebrow: 'Proteção Radiológica',
    title: 'Proteção do ambiente, da equipe e do serviço',
    intro: 'Serviços técnicos para estruturar a proteção radiológica, medir condições reais do ambiente e organizar a documentação necessária à operação.',
    image: CONSULT_IMAGES.protection,
    items: [
      { title: 'Programa de Proteção Radiológica', text: 'Elaboração e acompanhamento do programa aplicável ao serviço de radiologia.', href: '/consult/protecao-radiologica/programa-protecao-radiologica', image: CONSULT_IMAGES.protection, Icon: FileText, badge: 'PPR / PGQ / PEP' },
      { title: 'Levantamento radiométrico', text: 'Medição da radiação nas áreas ao redor da sala e avaliação da radiação de fuga.', href: '/consult/protecao-radiologica/levantamento-radiometrico', image: CONSULT_IMAGES.protection, Icon: Activity, badge: 'Medição' },
      { title: 'Projeto de blindagem', text: 'Cálculo e memorial técnico para obra, reforma, expansão ou troca de equipamento.', href: '/consult/protecao-radiologica/projeto-blindagem', image: CONSULT_IMAGES.protection, Icon: ShieldCheck, badge: 'Projeto' },
      { title: 'Treinamentos', text: 'Capacitação em radioproteção e segurança em ressonância magnética, em EAD e presencial sob medida.', href: '/consult/protecao-radiologica/treinamentos', image: CONSULT_IMAGES.protection, Icon: Stethoscope, badge: 'EAD + presencial' },
      { title: 'Licenciamento sanitário', text: 'Apoio técnico e documental para obtenção ou renovação de licença junto à vigilância sanitária.', href: '/consult/protecao-radiologica/licenciamento-sanitario', image: CONSULT_IMAGES.protection, Icon: FileText, badge: 'Documentação' },
    ],
  },
  {
    eyebrow: 'Consult Engenharia Clínica',
    title: 'Ensaios, preventiva e qualificação por equipamento',
    intro: 'Cinco serviços com medição documentada, histórico técnico e laudo por equipamento. A Consult faz manutenção preventiva, mas não faz manutenção corretiva e não vende peças.',
    image: CONSULT_IMAGES.engineering,
    items: [
      { title: 'Ensaio de segurança elétrica', text: 'Medição de aterramento, isolamento e correntes de fuga conforme ABNT NBR IEC 62353.', href: '/consult/engenharia-clinica/seguranca-eletrica', image: CONSULT_IMAGES.engineering, Icon: ShieldCheck, badge: 'IEC 62353' },
      { title: 'Calibração e ensaio de desempenho', text: 'Comparação ponto a ponto entre o que o equipamento mede ou entrega e uma referência calibrada.', href: '/consult/engenharia-clinica/desempenho-calibracao', image: CONSULT_IMAGES.engineering, Icon: Gauge, badge: 'Desempenho' },
      { title: 'Manutenção preventiva', text: 'Limpeza, lubrificação e testes de funcionamento, com pendências registradas no laudo.', href: '/consult/engenharia-clinica/manutencao-preventiva', image: CONSULT_IMAGES.engineering, Icon: Wrench, badge: 'Preventiva' },
      { title: 'Reverificação', text: 'Novo ensaio depois que a instituição trata uma pendência apontada no laudo anterior.', href: '/consult/engenharia-clinica/reverificacao', image: CONSULT_IMAGES.engineering, Icon: Activity, badge: 'Novo ensaio' },
      { title: 'Qualificação térmica', text: 'Mapeamento de temperatura com sensores calibrados durante ciclos de operação.', href: '/consult/engenharia-clinica/qualificacao-termica', image: CONSULT_IMAGES.engineering, Icon: Thermometer, badge: 'Mapeamento térmico' },
    ],
  },
]

export default function ConsultServicesPage(){
  useEffect(()=>{
    document.title='Serviços | Consult Radiometria e Qualidade'
    document.querySelector('meta[name="description"]')?.setAttribute('content','Serviços da Consult em Física Médica, Proteção Radiológica e Consult Engenharia Clínica, organizados para acesso direto por necessidade técnica.')
  },[])

  return <ConsultSiteShell><main>
    <ApprovedInternalHero
      eyebrow="Serviços"
      title="Acesse diretamente o serviço que sua instituição precisa"
      description="Física Médica, Proteção Radiológica e Consult Engenharia Clínica organizadas por serviço, modalidade e equipamento — sem misturar escopos."
      image={CONSULT_IMAGES.engineering}
      breadcrumbs={[[ 'Início','/consult' ],[ 'Serviços',null ]]}
    />

    <ApprovedProofStrip items={[
      ['ÁREA','Física Médica'],
      ['ÁREA','Proteção Radiológica'],
      ['LINHA','Consult Engenharia Clínica'],
      ['ATENDIMENTO','Todo o Brasil'],
    ]}/>

    {GROUPS.map((group,index)=><ApprovedLightSection
      key={group.eyebrow}
      eyebrow={group.eyebrow}
      title={group.title}
      intro={group.intro}
      white={index % 2 === 1}
    >
      <ApprovedMediaCards items={group.items} columns={group.items.length === 1 ? 'two' : 'three'} />
    </ApprovedLightSection>)}

    <ConsultCtaBand
      title="Não sabe qual serviço se aplica?"
      text="Informe o equipamento, o ambiente ou a situação. A equipe Consult orienta o serviço e o escopo técnico aplicável."
    />
  </main></ConsultSiteShell>
}
