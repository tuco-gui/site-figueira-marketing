import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultReportPreview } from '@/components/consult/ConsultTechnicalDesign'
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
const ABNT = 'https://www.abntcatalogo.com.br/'

const EQUIPMENT = {
  'monitor-multiparametrico': { title:'Monitor multiparamétrico', analyzer:'Waller + Yagi', parameters:['ECG','PNI (pressão não invasiva)','Pressão invasiva','Temperatura','Respiração','SpO₂'] },
  eletrocardiografo: { title:'Eletrocardiógrafo', analyzer:'Waller', parameters:['Resposta a ritmos cardíacos simulados'] },
  'oximetro-pulso': { title:'Oxímetro de pulso', analyzer:'Yagi', parameters:['SpO₂ simulada','Frequência de pulso simulada'], caveat:'O guia informa que o ensaio não avalia a exatidão do sensor no paciente.' },
  'esfigmomanometro-mapa': { title:'Esfigmomanômetro digital e MAPA', analyzer:'Waller', parameters:['Pressão sistólica simulada','Pressão diastólica simulada'] },
  'desfibrilador-cardioversor-dea': { title:'Desfibrilador, cardioversor e DEA', analyzer:'Lown', parameters:['Energia entregue','Tempo de carga','Atraso no modo sincronizado','Resposta ao ECG'] },
  'marca-passo-transcutaneo': { title:'Marca-passo transcutâneo', analyzer:'Lown', parameters:['Tensão','Corrente','Frequência em diferentes cargas'] },
  'bisturi-eletrico': { title:'Bisturi elétrico (eletrocautério)', analyzer:'Harrison', parameters:['Potência entregue em diferentes cargas','Fuga de alta frequência'] },
  'ventilador-pulmonar': { title:'Ventilador pulmonar', analyzer:'Luft + pulmão de teste', parameters:['Fluxo','Volume','Pressões','PEEP','Concentração de O₂'] },
  'aparelho-anestesia': { title:'Aparelho de anestesia — parte ventilatória', analyzer:'Luft', parameters:['Fluxo','Volume','Pressões','PEEP','Concentração de O₂'], caveat:'O guia informa que a Consult não mede a concentração do agente anestésico nesta avaliação.' },
  'cpap-bipap': { title:'CPAP e BiPAP', analyzer:'Luft', parameters:['Fluxo','Pressão'] },
  'fluxometro-manometro-o2': { title:'Fluxômetro e manômetro de O₂', analyzer:'Luft', parameters:['Fluxo','Pressão'] },
  autoclave: { title:'Autoclave', analyzer:'Otto', parameters:['Temperatura em até 16 pontos','Pressão','Letalidade F0','Ciclos de operação'], thermal:true },
  'termodesinfectora-estufa': { title:'Termodesinfectora e estufa de esterilização', analyzer:'Otto', parameters:['Temperatura em até 16 pontos','Letalidade A0'], thermal:true },
  'estufa-banho-maria': { title:'Estufa e banho-maria de laboratório', analyzer:'Otto', parameters:['Estabilidade de temperatura','Uniformidade de temperatura'], thermal:true },
  'geladeira-camara-vacina': { title:'Geladeira e câmara de vacina', analyzer:'Otto', parameters:['Mapeamento de temperatura'], thermal:true },
}

const FLOW = [['01','Identificar','Confirmar equipamento, modelo, aplicação e ensaios aplicáveis.'],['02','Ensaiar','Executar segurança elétrica e desempenho conforme o equipamento e o escopo.'],['03','Comparar','Confrontar os valores com a referência técnica aplicável.'],['04','Documentar','Emitir o resultado por equipamento e preservar o histórico técnico.']]

export default function ConsultEquipmentPage() {
  const { slug } = useParams()
  const item = useMemo(() => EQUIPMENT[slug], [slug])

  useEffect(() => {
    if (!item) return
    document.title = `Ensaio de ${item.title} | Consult Engenharia Clínica`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `Ensaios de segurança elétrica e desempenho para ${item.title}, com analisador ${item.analyzer}, laudo por equipamento e rastreabilidade RBC.`)
  }, [item])

  if (!item) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Equipamento não encontrado</h1><Link to="/consult/engenharia-clinica" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Engenharia Clínica</Link></main></ConsultSiteShell>

  const norms=[['RDC 509/2021 — Anvisa','Base geral informada pela Consult para gerenciamento de tecnologias em saúde.',RDC_509],['ABNT NBR IEC 62353','Referência indicada para o ensaio de segurança elétrica recorrente e após reparo.',ABNT],['Manual do fabricante + norma particular aplicável','O desempenho é comparado conforme o equipamento, seu manual e a norma particular correspondente quando aplicável.',ABNT]]
  const reportRows=item.parameters.slice(0,4).map(parameter=>[parameter,'Valor medido','Referência','Resultado'])

  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow="Engenharia Clínica" title={item.title} description="Ensaios de segurança elétrica e desempenho com medição documentada, analisador específico, laudo por equipamento e histórico técnico. Todos os equipamentos confirmados recebem também segurança elétrica com Safetest 50, Rigel." image={CONSULT_IMAGES.engineering}/>
    <ApprovedProofStrip items={[[ 'EQUIPAMENTO', item.title ],[ 'DESEMPENHO', item.analyzer ],[ 'SEG. ELÉTRICA','Safetest 50 • Rigel' ],[ 'RASTREIO','RBC' ]]}/>
    <ApprovedIndependenceBand/>

    <ApprovedLightSection eyebrow="O que é avaliado" title={`Parâmetros verificados em ${item.title}`} intro="A avaliação é organizada de acordo com o equipamento e com os parâmetros confirmados para o ensaio." center>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{item.parameters.map((parameter,index)=><div key={parameter} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"><div className="text-[10px] font-black uppercase tracking-[.18em] text-[#08A77F]">0{index+1}</div><div className="mt-3 text-base font-black text-[#123C3B]">{parameter}</div><p className="mt-2 text-sm leading-6 text-black/55">{index===0?`Analisador: ${item.analyzer}`:'Medição específica do equipamento'}</p></div>)}</div>
      {item.caveat&&<div className="mx-auto mt-6 max-w-3xl rounded-xl border-l-4 border-[#08A77F] bg-white p-5 text-sm font-semibold leading-6 text-[#315B58] shadow-sm">{item.caveat}</div>}
    </ApprovedLightSection>

    <ApprovedDarkProcess items={FLOW}/>

    <ApprovedLightSection eyebrow="Entregável técnico" title={`Laudo técnico de ${item.title}`} intro="O documento registra os ensaios realizados e permite manter o histórico técnico do equipamento." white>
      <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
        <div>
          <div className="rounded-2xl bg-[#075653] p-6 text-white"><div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#8AE600]">Instrumentação</div><div className="mt-3 text-2xl font-black">{item.analyzer}</div><p className="mt-3 text-sm leading-7 text-white/65">Os analisadores utilizados possuem certificado de calibração com rastreabilidade RBC.</p></div>
          <ApprovedList items={['Identificação do equipamento','Ensaios e parâmetros medidos','Referência técnica aplicável','Resultado e eventuais pendências']}/>
        </div>
        <ConsultReportPreview title={`Laudo — ${item.title}`} exampleRows={reportRows} resultLabel="Resultado / pendências" note="Exemplo ilustrativo sem dados reais. O laudo é emitido por equipamento, assinado pelo responsável técnico e registrado no Arkmeds. A Consult documenta a condição encontrada e não indica fornecedor de conserto."/>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Base técnica" title="Normas e referências" intro="A referência específica depende do equipamento, do manual do fabricante e do tipo de ensaio.">
      <ApprovedNormCards items={norms}/>
    </ApprovedLightSection>

    <ApprovedFaq items={[[`Qual analisador é usado para ${item.title}?`,item.analyzer],['O equipamento também recebe segurança elétrica?','Sim. Todos os equipamentos confirmados nesta linha recebem também ensaio de segurança elétrica com Safetest 50, Rigel, além dos ensaios de desempenho correspondentes.'],['A Consult conserta o equipamento se encontrar uma pendência?','Não. A Consult documenta a condição encontrada e a instituição resolve com o fornecedor de sua escolha.'],['O resultado fica no histórico do equipamento?','Sim. O histórico técnico é preservado por equipamento no Arkmeds.']]}/>
    <ConsultCtaBand title={`Precisa avaliar ${item.title}?`} text="Informe o equipamento, modelo e situação. A equipe Consult confirma o escopo de ensaio e a programação do atendimento."/>
  </main></ConsultSiteShell>
}
