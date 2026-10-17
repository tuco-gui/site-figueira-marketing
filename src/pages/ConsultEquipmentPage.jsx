import { ABNT_IEC_62353_URL } from '@/lib/consultNormReferences'
import ConsultElectricalSafetyLayout from '@/components/consult/ConsultElectricalSafetyLayout'
import { updateConsultPageMeta } from '@/lib/consultPageMeta'
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
  ['ABNT NBR IEC 62353','Referência para ensaio de segurança elétrica recorrente e após reparo.',ABNT_IEC_62353_URL],
  ['Família ABNT NBR IEC 60601','Norma particular aplicável conforme o tipo de equipamento.',ABNT],
  ['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509],
]

const EQUIPMENT = {
  'monitor-multiparametrico': { title:'Monitor multiparamétrico', electromedical:true, parameters:['ECG (frequência, amplitude e arritmias)','Respiração','Temperatura','PNI','Pressão invasiva','SpO₂ e frequência de pulso'] },
  eletrocardiografo: { title:'Eletrocardiógrafo', electromedical:true, parameters:['Sinais de ECG simulados em 12 derivações: frequência, amplitude e arritmias'] },
  'oximetro-pulso': { title:'Oxímetro de pulso', electromedical:true, parameters:['SpO₂ simulada','Frequência de pulso simulada','Curvas dos principais fabricantes de sensores'], caveat:'O ensaio avalia sinais simulados e não determina a exatidão do sensor em uso no paciente.' },
  'esfigmomanometro-mapa': { title:'Esfigmomanômetro digital e MAPA', electromedical:true, conditionalElectrical:true, parameters:['Pressão sistólica simulada','Pressão diastólica simulada','Frequência cardíaca','Teste de vazamento'] },
  'desfibrilador-cardioversor-dea': { title:'Desfibrilador, cardioversor e DEA', electromedical:true, parameters:['Energia entregue','Tempo de carga','Atraso no modo sincronizado','Resposta ao ECG'] },
  'marca-passo-transcutaneo': { title:'Marca-passo transcutâneo', electromedical:true, parameters:['Amplitude e frequência dos pulsos em diferentes cargas'] },
  'bisturi-eletrico': { title:'Bisturi elétrico (eletrocautério)', electromedical:true, parameters:['Potência entregue em diferentes cargas, modos monopolar e bipolar','Corrente de fuga de alta frequência'] },
  'ventilador-pulmonar': { title:'Ventilador pulmonar', electromedical:true, parameters:['Volume corrente e volume-minuto','Fluxo','Pressão de pico','PEEP','Frequência respiratória','Relação I:E','Concentração de O₂'] },
  'aparelho-anestesia': { title:'Aparelho de anestesia — parte ventilatória', electromedical:true, parameters:['Volume corrente e volume-minuto','Fluxo','Pressão de pico','PEEP','Frequência respiratória','Relação I:E','Concentração de O₂'], caveat:'Esta avaliação não inclui medição da concentração do agente anestésico.' },
  'cpap-bipap': { title:'CPAP e BiPAP', electromedical:true, parameters:['Fluxo','Pressão'] },
  'fluxometro-manometro-o2': { title:'Fluxômetro e manômetro (O₂ e ar comprimido)', mechanical:true, parameters:['Fluxo','Pressão'] },
  'concentrador-oxigenio': { title:'Concentrador de oxigênio', electromedical:true, parameters:['Concentração de O₂','Fluxo'] },
  autoclave: {
    title:'Autoclave', thermal:true,
    parameters:['Qualificação de instalação, operação e desempenho (QI, QO e QD)','Temperatura e pressão na câmara vazia e com carga','Ciclos repetidos por condição','Letalidade F0'],
    norms:[['ABNT NBR ISO 17665','Referência para esterilização por calor úmido.',ABNT],['ABNT NBR IEC 61010','Referência de segurança elétrica aplicável ao equipamento.',ABNT]],
  },
  termodesinfectora: {
    title:'Termodesinfectora', thermal:true,
    parameters:['Qualificação de instalação, operação e desempenho (QI, QO e QD)','Distribuição de temperatura nos ciclos','Letalidade A0'],
    norms:[['ABNT NBR ISO 15883','Referência aplicável a termodesinfectoras.',ABNT],['ABNT NBR IEC 61010','Referência de segurança elétrica aplicável ao equipamento.',ABNT]],
  },
  'termodesinfectora-estufa': { redirectTo:'/consult/engenharia-clinica/equipamentos/termodesinfectora' },
  'estufa-banho-maria': {
    title:'Estufas e incubadoras de laboratório', thermal:true,
    parameters:['Estabilidade e uniformidade de temperatura','Mapeamento do volume útil'],
    norms:[['ABNT NBR IEC 61010','Referência de segurança elétrica aplicável a equipamentos de laboratório.',ABNT]],
  },
  'geladeira-camara-vacina': {
    title:'Geladeira e câmara de vacina', thermal:true,
    parameters:['Mapeamento de temperatura com câmara vazia e com carga','Abertura de porta','Queda de energia e tempo de recuperação'],
    norms:[['RDC 197/2017','Referência para serviços de vacinação.',RDC_197],['Manual da Rede de Frio do PNI','Referência para conservação e rede de frio.',PNI],['ABNT NBR IEC 61010','Referência de segurança elétrica quando aplicável.',ABNT]],
  },
}

const FLOW = [['01','Identificar','Confirmar equipamento, modelo, aplicação e ensaios aplicáveis.'],['02','Ensaiar','Executar as medições previstas para o equipamento e o escopo.'],['03','Comparar','Confrontar os valores com a referência técnica aplicável.'],['04','Documentar','Emitir o resultado por equipamento e preservar o histórico técnico.']]

function equipmentIntro(item) {
  if (item.thermal) return `Qualificação térmica de ${item.title}, com medições documentadas, relatório por equipamento e padrões com rastreabilidade RBC/Inmetro.`
  if (item.mechanical) return `Ensaio de desempenho de ${item.title}, com medição documentada, laudo por equipamento e padrões com rastreabilidade RBC/Inmetro.`
  return `${item.conditionalElectrical ? 'Ensaios de desempenho e segurança elétrica quando ligado à rede' : 'Ensaios de segurança elétrica e desempenho'} de ${item.title}, com medição documentada, laudo por equipamento e padrões com rastreabilidade RBC/Inmetro.`
}

function equipmentProof(item) {
  const proof=[['EQUIPAMENTO',item.title],['DESEMPENHO',item.thermal?'Qualificação térmica':'Ensaio documentado'],['RASTREIO','RBC/Inmetro']]
  if (item.electromedical) proof.splice(2,0,['SEG. ELÉTRICA',item.conditionalElectrical ? 'IEC 62353 quando ligado à rede' : 'ABNT NBR IEC 62353'])
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
  if (item.mechanical) faq.splice(1,0,['O que é avaliado no fluxômetro e manômetro de O₂?','Fluxo e pressão. A avaliação considera o equipamento mecânico e registra o resultado do ensaio de desempenho.'])
  if (item.thermal) faq.splice(1,0,['Qual referência é usada para segurança elétrica?','Nas páginas térmicas e laboratoriais, a referência de segurança elétrica é a ABNT NBR IEC 61010 quando aplicável, sem uso da IEC 62353 como base desta página.'])
  if (item.title === 'Autoclave') faq.push(['A Consult realiza inspeção NR-13 em autoclaves?', 'Sim, como serviço adicional quando a autoclave é enquadrada como vaso de pressão: análise documental, inspeção de segurança e emissão de relatório conforme os requisitos aplicáveis da NR-13.'])
  return faq
}

export default function ConsultEquipmentPage() {
  const { slug } = useParams()
  const item = useMemo(() => EQUIPMENT[slug], [slug])

  useEffect(() => {
    if (!item || item.redirectTo) return
    if (slug === 'monitor-multiparametrico' || slug === 'eletrocardiografo' || slug === 'oximetro-pulso' || slug === 'esfigmomanometro-mapa' || slug === 'desfibrilador-cardioversor-dea' || slug === 'marca-passo-transcutaneo' || slug === 'bisturi-eletrico' || slug === 'ventilador-pulmonar' || slug === 'aparelho-anestesia' || slug === 'cpap-bipap' || slug === 'fluxometro-manometro-o2' || slug === 'concentrador-oxigenio' || slug === 'autoclave' || slug === 'termodesinfectora' || slug === 'estufa-banho-maria' || slug === 'geladeira-camara-vacina') {
      updateConsultPageMeta({
        title: `${item.thermal ? 'Qualificação térmica' : 'Ensaio'} de ${item.title} | Consult Engenharia Clínica`,
        description: item.thermal ? equipmentIntro(item) : `Ensaios aplicáveis a ${item.title}, com medição documentada, padrões com rastreabilidade RBC/Inmetro e laudo por equipamento.`,
        image: CONSULT_IMAGES.engineering,
      })
      return
    }
    document.title = `Ensaio de ${item.title} | Consult Engenharia Clínica`
    document.querySelector('meta[name="description"]')?.setAttribute('content', equipmentIntro(item))
  }, [item, slug])

  if (item?.redirectTo) return <Navigate to={item.redirectTo} replace />

  if (!item) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Equipamento não encontrado</h1><Link to="/consult/engenharia-clinica" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Engenharia Clínica</Link></main></ConsultSiteShell>

  const reportItems=['Identificação do fabricante, modelo, número de série e patrimônio','Ensaios realizados e parâmetros avaliados','Valor medido, referência e tolerância de cada parâmetro','Resultado aprovado ou com pendência, com descrição das pendências','Padrões utilizados, com rastreabilidade RBC/Inmetro','Data, assinatura do responsável técnico e data sugerida para o próximo ensaio']

  if (slug === 'monitor-multiparametrico' || slug === 'eletrocardiografo' || slug === 'oximetro-pulso' || slug === 'esfigmomanometro-mapa' || slug === 'desfibrilador-cardioversor-dea' || slug === 'marca-passo-transcutaneo' || slug === 'bisturi-eletrico' || slug === 'ventilador-pulmonar' || slug === 'aparelho-anestesia' || slug === 'cpap-bipap' || slug === 'fluxometro-manometro-o2' || slug === 'concentrador-oxigenio' || slug === 'autoclave' || slug === 'termodesinfectora' || slug === 'estufa-banho-maria' || slug === 'geladeira-camara-vacina') {
    const service = {
      title: item.title,
      intro: equipmentIntro(item),
      caveat: item.caveat,
      thermal: item.thermal,
      story: 'A avaliação é organizada de acordo com o equipamento e com os parâmetros aplicáveis ao ensaio.',
      parameters: item.parameters.map(parameter => slug === 'concentrador-oxigenio' ? ['Ensaio de desempenho', parameter] : [parameter, 'Parâmetro medido e registrado no documento técnico.']),
      proof: equipmentProof(item).map(([label, value]) => [item.thermal && label === 'DESEMPENHO' ? 'RELATÓRIO' : label, value]),
      deliverable: item.thermal ? 'Relatório de Qualificação Térmica' : 'Laudo técnico',
      reportItems,
      // ABNT share links expire; keep references visible until a stable specific ficha is verified.
      norms: equipmentNorms(item).map(([title, text, href]) => [title, text, href === ABNT || href === ABNT_IEC_62353_URL ? null : href]),
      faq: equipmentFaq(item).map(([question, answer]) => {
        const text = question === 'Como é apresentada a rastreabilidade?' ? 'São utilizados padrões com rastreabilidade RBC/Inmetro.' : item.thermal && question === 'Qual referência é usada para segurança elétrica?' ? 'A ABNT NBR IEC 61010 é a referência para segurança elétrica quando aplicável ao equipamento térmico ou de laboratório.' : answer
        return item.thermal ? [question.replaceAll('laudo', 'relatório'), text.replaceAll('laudo', 'relatório')] : [question, text]
      }),
    }
    return <ConsultElectricalSafetyLayout service={service} process={FLOW} slug={slug} showWhen={false}/>
  }

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
