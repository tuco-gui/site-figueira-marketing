import React, { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import {
  ApprovedDarkProcess,
  ApprovedFaq,
  ApprovedIndependenceBand,
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedList,
  ApprovedNormCards,
  ApprovedProofStrip,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2021/rdc0509_27_05_2021.pdf'
const RDC_197 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2017/rdc0197_26_12_2017.pdf'
const PNI = 'https://www.gov.br/saude/pt-br/composicao/svsa/pni/rede-de-frio/publicacoes/manual-de-rede-de-frio-pni-5ed.pdf/view'
const ABNT = 'https://www.abntcatalogo.com.br/'

const ELECTROMEDICAL_NORMS = [
  ['ABNT NBR IEC 62353','Referência para ensaio de segurança elétrica recorrente e após reparo.',ABNT],
  ['Família ABNT NBR IEC 60601','Norma particular aplicável conforme o tipo de equipamento.',ABNT],
  ['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509],
]

const EQUIPMENT = {
  'monitor-multiparametrico': { title:'Monitor multiparamétrico', electromedical:true, parameters:['ECG','PNI (pressão não invasiva)','Pressão invasiva','Temperatura','Respiração','SpO₂'] },
  eletrocardiografo: { title:'Eletrocardiógrafo', electromedical:true, parameters:['Resposta a ritmos cardíacos simulados'] },
  'oximetro-pulso': { title:'Oxímetro de pulso', electromedical:true, parameters:['SpO₂ simulada','Frequência de pulso simulada'], caveat:'O ensaio avalia sinais simulados e não determina a exatidão do sensor em uso no paciente.' },
  'esfigmomanometro-mapa': { title:'Esfigmomanômetro digital e MAPA', electromedical:true, parameters:['Pressão sistólica simulada','Pressão diastólica simulada'] },
  'desfibrilador-cardioversor-dea': { title:'Desfibrilador, cardioversor e DEA', electromedical:true, parameters:['Energia entregue','Tempo de carga','Atraso no modo sincronizado','Resposta ao ECG'] },
  'marca-passo-transcutaneo': { title:'Marca-passo transcutâneo', electromedical:true, parameters:['Tensão','Corrente','Frequência em diferentes cargas'] },
  'bisturi-eletrico': { title:'Bisturi elétrico (eletrocautério)', electromedical:true, parameters:['Potência entregue em diferentes cargas','Fuga de alta frequência'] },
  'ventilador-pulmonar': { title:'Ventilador pulmonar', electromedical:true, parameters:['Fluxo','Volume','Pressões','PEEP','Concentração de O₂'] },
  'aparelho-anestesia': { title:'Aparelho de anestesia — parte ventilatória', electromedical:true, parameters:['Fluxo','Volume','Pressões','PEEP','Concentração de O₂'], caveat:'Esta avaliação não inclui medição da concentração do agente anestésico.' },
  'cpap-bipap': { title:'CPAP e BiPAP', electromedical:true, parameters:['Fluxo','Pressão'] },
  'fluxometro-manometro-o2': { title:'Fluxômetro e manômetro de O₂', mechanical:true, parameters:['Fluxo','Pressão'] },
  'concentrador-oxigenio': { title:'Concentrador de oxigênio', electromedical:true, parameters:['Parâmetros de desempenho definidos conforme o modelo e o escopo técnico aplicável'] },
  autoclave: {
    title:'Autoclave', thermal:true,
    parameters:['Temperatura em múltiplos pontos','Pressão','Letalidade F0','Ciclos de operação'],
    norms:[['ABNT NBR ISO 17665','Referência para esterilização por calor úmido.',ABNT],['ABNT NBR IEC 61010','Referência de segurança elétrica aplicável ao equipamento.',ABNT]],
  },
  termodesinfectora: {
    title:'Termodesinfectora', thermal:true,
    parameters:['Temperatura em múltiplos pontos','Letalidade A0','Ciclo de operação'],
    norms:[['ABNT NBR ISO 15883','Referência aplicável a termodesinfectoras.',ABNT],['ABNT NBR IEC 61010','Referência de segurança elétrica aplicável ao equipamento.',ABNT]],
  },
  'termodesinfectora-estufa': { redirectTo:'/engenharia-clinica/equipamentos/termodesinfectora' },
  'estufa-banho-maria': {
    title:'Estufa e banho-maria de laboratório', thermal:true,
    parameters:['Estabilidade de temperatura','Uniformidade de temperatura'],
    norms:[['ABNT NBR IEC 61010','Referência de segurança elétrica aplicável a equipamentos de laboratório.',ABNT]],
  },
  'geladeira-camara-vacina': {
    title:'Geladeira e câmara de vacina', thermal:true,
    parameters:['Mapeamento de temperatura','Estabilidade térmica','Uniformidade térmica'],
    norms:[['RDC 197/2017','Referência para serviços de vacinação.',RDC_197],['Manual da Rede de Frio do PNI','Referência para conservação e rede de frio.',PNI],['ABNT NBR IEC 61010','Referência de segurança elétrica quando aplicável.',ABNT]],
  },
}

const FLOW = [['01','Identificar','Confirmar equipamento, modelo, aplicação e ensaios aplicáveis.'],['02','Ensaiar','Executar as medições previstas para o equipamento e o escopo.'],['03','Comparar','Confrontar os valores com a referência técnica aplicável.'],['04','Documentar','Emitir o resultado por equipamento e preservar o histórico técnico.']]

function equipmentIntro(item) {
  if (item.thermal) return `Qualificação térmica de ${item.title}, com medições documentadas, relatório por equipamento e padrões com rastreabilidade RBC/Inmetro.`
  if (item.mechanical) return `Ensaio de desempenho de ${item.title}, com medição documentada, laudo por equipamento e padrões com rastreabilidade RBC/Inmetro.`
  return `Ensaios de segurança elétrica e desempenho de ${item.title}, com medição documentada, laudo por equipamento e padrões com rastreabilidade RBC/Inmetro.`
}

function equipmentProof(item) {
  const proof=[['EQUIPAMENTO',item.title],['DESEMPENHO',item.thermal?'Qualificação térmica':'Ensaio documentado'],['RASTREIO','RBC/Inmetro']]
  if (item.electromedical) proof.splice(2,0,['SEG. ELÉTRICA','ABNT NBR IEC 62353'])
  return proof
}

function equipmentNorms(item) {
  if (item.norms) return item.norms
  if (item.mechanical) return [['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509]]
  return ELECTROMEDICAL_NORMS
}

function equipmentFaq(item) {
  const faq=[
    ['O que o laudo registra?','Identificação do equipamento, parâmetros medidos, referências aplicáveis, resultados, conclusão técnica e eventuais pendências.'],
    ['Como é apresentada a rastreabilidade?','Os padrões utilizados são apresentados com rastreabilidade RBC/Inmetro.'],
    ['O resultado fica no histórico do equipamento?','Sim. O laudo é emitido por equipamento e incorporado ao histórico técnico da instituição.'],
  ]
  if (item.electromedical) faq.splice(1,0,['O equipamento recebe ensaio de segurança elétrica?','Sim. Para os equipamentos eletromédicos, o ensaio de segurança elétrica segue a ABNT NBR IEC 62353 conforme aplicabilidade.'])
  if (item.mechanical) faq.splice(1,0,['O fluxômetro e o manômetro de O₂ recebem selo de segurança elétrica?','Não. Esses equipamentos são mecânicos e a página apresenta o ensaio de desempenho sem selo de TSE.'])
  if (item.thermal) faq.splice(1,0,['Qual referência é usada para segurança elétrica?','Nas páginas térmicas e laboratoriais, a referência de segurança elétrica é a ABNT NBR IEC 61010 quando aplicável, sem uso da IEC 62353 como base desta página.'])
  return faq
}

export default function ConsultEquipmentPage() {
  const { slug } = useParams()
  const item = useMemo(() => EQUIPMENT[slug], [slug])

  useEffect(() => {
    if (!item || item.redirectTo) return
    document.title = `Ensaio de ${item.title} | Consult Engenharia Clínica`
    document.querySelector('meta[name="description"]')?.setAttribute('content', equipmentIntro(item))
  }, [item])

  if (item?.redirectTo) return <Navigate to={item.redirectTo} replace />

  if (!item) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Equipamento não encontrado</h1><Link to="/engenharia-clinica" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Engenharia Clínica</Link></main></ConsultSiteShell>

  const reportItems=['Identificação do equipamento','Ensaios e parâmetros medidos','Valores e referências aplicáveis','Conclusão técnica','Eventuais pendências e histórico técnico']

  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow="Consult Engenharia Clínica" title={item.title} description={equipmentIntro(item)} image={CONSULT_IMAGES.engineering}/>
    <ApprovedProofStrip items={equipmentProof(item)}/>
    <ApprovedIndependenceBand/>

    <ApprovedLightSection eyebrow="O que é avaliado" title={`Parâmetros verificados em ${item.title}`} intro="A avaliação é organizada de acordo com o equipamento e com os parâmetros aplicáveis ao ensaio." center>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{item.parameters.map((parameter,index)=><div key={parameter} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"><div className="text-[10px] font-black uppercase tracking-[.18em] text-[#08A77F]">0{index+1}</div><div className="mt-3 text-base font-black text-[#123C3B]">{parameter}</div><p className="mt-2 text-sm leading-6 text-black/55">Parâmetro medido e registrado no documento técnico.</p></div>)}</div>
      {item.caveat&&<div className="mx-auto mt-6 max-w-3xl rounded-xl border-l-4 border-[#08A77F] bg-white p-5 text-sm font-semibold leading-6 text-[#315B58] shadow-sm">{item.caveat}</div>}
    </ApprovedLightSection>

    <ApprovedDarkProcess items={FLOW}/>

    <ApprovedLightSection eyebrow="Entregável técnico" title="O que o laudo traz" intro="A página descreve as informações efetivamente documentadas, sem tabela ilustrativa ou valores fictícios." white>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div className="rounded-2xl bg-[#075653] p-7 text-white">
          <div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8AE600]">Rastreabilidade</div>
          <div className="mt-3 text-2xl font-black">Padrões com rastreabilidade RBC/Inmetro</div>
          <p className="mt-3 text-sm leading-7 text-white/65">O resultado é emitido por equipamento, assinado pelo responsável técnico e incorporado ao histórico técnico.</p>
        </div>
        <ApprovedList items={reportItems}/>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Base técnica" title="Normas e referências" intro="A referência específica depende do equipamento e do tipo de ensaio.">
      <ApprovedNormCards items={equipmentNorms(item)}/>
    </ApprovedLightSection>

    <ApprovedFaq items={equipmentFaq(item)}/>
    <ConsultCtaBand title={`Precisa avaliar ${item.title}?`} text="Informe o equipamento, modelo e situação. A equipe Consult confirma o escopo de ensaio e a programação do atendimento."/>
  </main></ConsultSiteShell>
}
