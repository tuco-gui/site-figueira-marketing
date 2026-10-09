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

const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2020/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'
const RDC_15 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2012/rdc0015_15_03_2012.pdf'
const RDC_197 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2017/rdc0197_26_12_2017.pdf'
const PNI = 'https://www.gov.br/saude/pt-br/composicao/svsa/pni/rede-de-frio/publicacoes/manual-de-rede-de-frio-pni-5ed.pdf/view'
const RDC_430 = 'https://www.gov.br/anvisa/en/rules-and-regulations/arquivos/rdc-430_2020.pdf'

const SERVICES = {
  'seguranca-eletrica': {
    title: 'Ensaio de segurança elétrica', visual: 'technical',
    intro: 'Medição de resistência de aterramento, resistência de isolamento e correntes de fuga do equipamento e das partes aplicadas ao paciente.',
    storyTitle: 'Segurança elétrica recorrente precisa medir o desgaste real do equipamento.',
    story: 'O ensaio verifica a condição elétrica do equipamento por medição, compara os resultados com os limites aplicáveis e registra a conclusão no histórico técnico.',
    proof: [['ENSAIO','Recorrente e após reparo'],['ENTREGA','Laudo por equipamento'],['BASE','ABNT NBR IEC 62353'],['RASTREIO','Rastreabilidade RBC']],
    when: ['Ensaio recorrente de segurança elétrica','Após reparo ou intervenção técnica','Quando o hospital precisa registrar a condição elétrica do equipamento','Para compor o histórico técnico do equipamento'],
    parameters: [['Aterramento','Resistência medida no equipamento'],['Isolamento','Condição de isolamento elétrico'],['Correntes de fuga','Equipamento e partes aplicadas'],['Resultado','Valor medido, limite e aprovação/reprovação']],
    deliverable: 'Laudo de Segurança Elétrica',
    exampleRows: [['Aterramento','Valor medido','Limite','Aprov./Reprov.'],['Isolamento','Valor medido','Limite','Aprov./Reprov.'],['Corrente de fuga','Valor medido','Limite','Aprov./Reprov.']],
    note: 'Exemplo visual sem dados reais. O laudo registra valores medidos, limites aplicáveis e o resultado aprovado ou reprovado.',
    norms: [['ABNT NBR IEC 62353','Referência indicada pela Consult para ensaio recorrente e após reparo. A norma completa é consultada pelo catálogo da ABNT.',ABNT],['RDC 509/2021 — Anvisa','Base geral indicada para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['Qual a diferença entre IEC 60601 e IEC 62353 neste contexto?','A família IEC 60601 reúne normas particulares aplicáveis aos equipamentos, enquanto a IEC 62353 é utilizada como referência para ensaios recorrentes e após reparo.'],['O ensaio é apenas visual?','Não. O ensaio inclui medição de aterramento, isolamento e correntes de fuga.'],['O hospital recebe apenas um status “aprovado”?','Não. O laudo apresenta os valores medidos, os limites aplicáveis e o resultado.']],
  },
  'desempenho-calibracao': {
    title: 'Ensaio de desempenho e calibração', visual: 'technical',
    intro: 'Comparação, ponto a ponto, do que o equipamento mede ou entrega com um analisador ou simulador calibrado.',
    storyTitle: 'O valor exibido pelo equipamento precisa ser confrontado com uma referência calibrada.',
    story: 'A lógica do ensaio é metrológica: selecionar os pontos aplicáveis, estimular ou medir o equipamento com analisador adequado, comparar os resultados e documentar desvios e conformidade. Isso dá ao gestor uma evidência técnica do desempenho, não apenas uma impressão de funcionamento.',
    proof: [['MÉTODO','Comparação ponto a ponto'],['PADRÃO','Analisador calibrado'],['ENTREGA','Laudo com desvios'],['RASTREIO','Rastreabilidade RBC']],
    when: ['Rotina periódica de verificação','Após manutenção ou suspeita de desvio','Quando é necessário documentar o desempenho do equipamento','Para manter histórico técnico de medições'],
    parameters: [['Ponto de ensaio','Grandeza e faixa definidas para o equipamento'],['Valor medido','Resposta observada durante o ensaio'],['Referência','Analisador ou simulador calibrado'],['Conclusão','Desvio e conformidade documentados']],
    deliverable: 'Laudo de Desempenho',
    exampleRows: [['Ponto de ensaio','Valor medido','Referência','Conformidade'],['Ponto de ensaio','Valor medido','Referência','Conformidade'],['Ponto de ensaio','Valor medido','Referência','Conformidade']],
    note: 'Exemplo visual, sem valores reais. O laudo registra pontos ensaiados, desvios e conformidade.',
    norms: [['Manual do fabricante','Critérios e procedimentos específicos dependem do equipamento.','#manual'],['Família ABNT NBR IEC 60601','Norma particular aplicável conforme o tipo de equipamento.',ABNT],['RDC 509/2021 — Anvisa','Base geral indicada para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['Calibração significa ajustar o equipamento?','Não necessariamente. O conteúdo da Consult descreve o serviço como comparação do que o equipamento mede ou entrega com um analisador calibrado, ponto a ponto, registrando desvios e conformidade.'],['A mesma norma vale para todos os equipamentos?','Não. A avaliação considera o manual do fabricante e a norma particular aplicável da família IEC 60601, conforme o equipamento.'],['Os analisadores têm rastreabilidade?','Sim. Os padrões utilizados possuem calibração com rastreabilidade RBC.']],
  },
  'manutencao-preventiva': {
    title: 'Manutenção preventiva', visual: 'shield',
    intro: 'Limpeza, lubrificação e testes de funcionamento. Peças gastas ou vencidas são registradas como pendência, com a especificação da peça. A Consult não troca peças.',
    storyTitle: 'Preventiva aqui não significa vender conserto ou peça.',
    story: 'O diferencial precisa ficar evidente: a Consult executa as ações preventivas previstas, testa o funcionamento e documenta pendências. Quando encontra necessidade de peça, registra a especificação para que o hospital decida como resolver.',
    proof: [['ESCOPO','Limpeza e lubrificação'],['TESTE','Funcionamento'],['PENDÊNCIA','Registrada no laudo'],['LIMITE','Sem venda/troca de peça']],
    when: ['Rotina preventiva prevista pelo fabricante','Necessidade de registrar limpeza, lubrificação e testes','Equipamentos com itens de desgaste ou pendências','Quando o hospital precisa manter histórico das ações preventivas'],
    parameters: [['Limpeza','Ações previstas para o equipamento'],['Lubrificação','Quando aplicável'],['Teste funcional','Verificação após a preventiva'],['Pendências','Peças ou itens identificados e especificados']],
    deliverable: 'Laudo de Manutenção Preventiva',
    exampleRows: [['Limpeza técnica','Executado','Plano fabricante','Registrado'],['Teste funcional','Executado','Plano fabricante','Registrado'],['Pendência encontrada','Identificada','Especificação','Pendente']],
    note: 'Exemplo visual. Quando há peça gasta ou vencida, o laudo registra a pendência e a especificação; a Consult não vende nem troca a peça.',
    norms: [['Plano de manutenção do fabricante','A referência específica depende do equipamento.','#manual'],['RDC 509/2021 — Anvisa','Base geral indicada para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['A Consult faz manutenção corretiva?','Não. A Consult realiza manutenção preventiva dentro do escopo contratado, mas não executa manutenção corretiva.'],['A Consult troca a peça identificada como pendência?','Não. A peça é registrada e especificada no laudo, mas a Consult não vende nem troca peças.'],['O que fica registrado?','O laudo registra o que foi realizado e a lista de pendências encontradas.']],
  },
  reverificacao: {
    title: 'Reverificação', visual: 'technical',
    intro: 'Novo ensaio depois que o hospital resolve uma pendência apontada no laudo anterior, pela equipe interna ou pelo fornecedor que escolher.',
    storyTitle: 'Corrigir a pendência não encerra o ciclo técnico: é preciso medir novamente.',
    story: 'A reverificação retoma o ensaio original depois que a instituição resolve a pendência. O novo resultado atualiza a evidência técnica e evita que uma correção seja considerada concluída apenas porque o reparo foi executado.',
    proof: [['ORIGEM','Laudo anterior'],['AÇÃO','Novo ensaio'],['BASE','Mesma referência original'],['COBRANÇA','Serviço separado']],
    when: ['Após correção de uma pendência','Depois de troca de peça realizada pelo hospital ou fornecedor escolhido','Quando é necessário comprovar a condição após a correção','Para atualizar o histórico técnico do equipamento'],
    parameters: [['Pendência anterior','Item que originou a nova avaliação'],['Ensaio original','Referência técnica mantida'],['Novo valor','Resultado obtido após correção'],['Atualização','Novo laudo e histórico técnico']],
    deliverable: 'Laudo Atualizado de Reverificação',
    exampleRows: [['Pendência anterior','Reensaiada','Ensaio original','Atualizado'],['Parâmetro crítico','Novo valor','Limite','Aprov./Reprov.'],['Resultado geral','Reavaliado','Critério original','Atualizado']],
    note: 'Exemplo visual. A Consult refaz o ensaio correspondente e emite laudo atualizado. A reverificação é um serviço separado do ensaio inicial.',
    norms: [['Referência do ensaio original','A reverificação usa a mesma base técnica do ensaio que gerou a pendência.','#original'],['RDC 509/2021 — Anvisa','Base geral indicada para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['Quem precisa corrigir a pendência antes da reverificação?','A própria instituição resolve com equipe interna ou fornecedor de sua escolha. A Consult não condiciona o laudo a uma empresa de conserto.'],['A reverificação está incluída automaticamente no primeiro ensaio?','Não. A reverificação é contratada separadamente do primeiro ensaio.']],
  },
  'qualificacao-termica': {
    title: 'Qualificação térmica', visual: 'thermal',
    intro: 'Mapeamento de temperatura com sensores calibrados durante ciclos de operação, para comprovar que o equipamento esteriliza, aquece ou conserva dentro da faixa especificada.',
    storyTitle: 'Uma leitura isolada de temperatura não representa o comportamento térmico do equipamento.',
    story: 'A qualificação acompanha o ciclo com sensores calibrados e transforma o comportamento ao longo do tempo em registros e gráficos. O objetivo é demonstrar se o equipamento atende a faixa ou condição aplicável à sua função.',
    proof: [['MÉTODO','Mapeamento térmico'],['PADRÃO','Sensores calibrados'],['ENTREGA','Relatório + gráficos'],['APLICAÇÃO','Autoclaves e câmaras']],
    when: ['Qualificação de autoclaves','Qualificação de câmaras e equipamentos térmicos','Mapeamento de geladeiras e câmaras de vacina','Quando estabilidade e uniformidade de temperatura precisam ser documentadas'],
    parameters: [['Sensores','Pontos de medição distribuídos'],['Ciclo','Comportamento ao longo da operação'],['Temperatura','Registros e curvas geradas'],['Conclusão','Resultado de conformidade']],
    deliverable: 'Relatório de Qualificação Térmica',
    exampleRows: [['Sensor / ponto','Curva registrada','Faixa aplicável','Conforme'],['Sensor / ponto','Curva registrada','Faixa aplicável','Conforme'],['Ciclo avaliado','Registrado','Critério aplicável','Resultado']],
    note: 'Exemplo visual. O relatório real contém registros de temperatura, gráficos gerados no ciclo e o resultado de conformidade.',
    norms: [['RDC 15/2012','Referência aplicável a autoclaves e ao processamento de produtos para saúde.',RDC_15],['RDC 197/2017','Referência indicada para serviços de vacinação.',RDC_197],['Manual da Rede de Frio do PNI','Referência para conservação e rede de frio do PNI.',PNI],['RDC 430/2020','Referência adicional conforme o equipamento e a aplicação.',RDC_430]],
    faq: [['Qualificação térmica é apenas medir a temperatura uma vez?','Não. A qualificação acompanha ciclos de operação com sensores calibrados e gera registros e gráficos.'],['Quais equipamentos estão confirmados?','O serviço contempla os equipamentos térmicos definidos no escopo contratado, conforme sua aplicação e faixa de operação.'],['O relatório inclui gráficos?','Sim. O relatório de qualificação apresenta registros, gráficos de temperatura e a conclusão de conformidade.']],
  },
}

const PROCESS = [['01','Identificar','Confirmar equipamento, aplicação, histórico e ensaio necessário.'],['02','Medir','Utilizar analisador ou simulador adequado e calibrado.'],['03','Comparar','Analisar valores medidos frente à referência aplicável.'],['04','Documentar','Registrar o resultado por equipamento e preservar o histórico técnico.']]

export default function ConsultEngineeringServicePage() {
  const { slug } = useParams()
  const service = useMemo(() => SERVICES[slug], [slug])

  useEffect(() => {
    if (!service) return
    document.title = `${service.title} | Consult Engenharia Clínica`
    document.querySelector('meta[name="description"]')?.setAttribute('content', service.intro)
  }, [service])

  if (!service) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Serviço não encontrado</h1><Link to="/consult/engenharia-clinica" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Engenharia Clínica</Link></main></ConsultSiteShell>

  const parameterItems = service.parameters.map(([label, text]) => `${label}: ${text}`)

  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow="Engenharia Clínica" title={service.title} description={service.intro} image={CONSULT_IMAGES.engineering}/>
    <ApprovedProofStrip items={service.proof}/>
    <ApprovedIndependenceBand/>

    <ApprovedLightSection eyebrow="Sobre o serviço" title={service.storyTitle} intro={service.story} center>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-2xl bg-[#075653] p-7 text-white shadow-xl shadow-[#075653]/10">
          <div className="text-[10px] font-bold uppercase tracking-[.24em] text-[#8AE600]">Entregável técnico</div>
          <h3 className="mt-4 text-2xl font-black leading-tight">{service.deliverable}</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">O resultado é documentado por equipamento, assinado pelo responsável técnico e incorporado ao histórico técnico da instituição.</p>
        </div>
        <div>
          <div className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#08A77F]">O que é avaliado</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.parameters.map(([label,text]) => <div key={label} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"><div className="text-sm font-black text-[#123C3B]">{label}</div><p className="mt-2 text-sm leading-6 text-black/55">{text}</p></div>)}
          </div>
        </div>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Quando contratar" title="Situações em que este serviço costuma ser necessário" intro="O escopo final depende do equipamento, do histórico técnico e da situação da instituição." white>
      <ApprovedList items={service.when}/>
    </ApprovedLightSection>

    <ApprovedDarkProcess items={PROCESS}/>

    <ApprovedLightSection eyebrow="Entregável" title={service.deliverable} intro="O exemplo abaixo é ilustrativo e serve apenas para mostrar a lógica das informações documentadas." white>
      <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
        <div>
          <ApprovedList items={parameterItems}/>
          <div className="mt-6 rounded-xl border border-[#CFE4DE] bg-[#F4FBFA] p-5 text-sm leading-7 text-[#4D706D]">Na Engenharia Clínica, os documentos são assinados pelo responsável técnico, emitidos por equipamento e vinculados ao histórico técnico, com padrões de medição de rastreabilidade RBC.</div>
        </div>
        <ConsultReportPreview title={service.deliverable} exampleRows={service.exampleRows} note={service.note}/>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Base técnica" title="Normas e referências do serviço" intro="A aplicação exata depende do equipamento, do fabricante e do tipo de ensaio.">
      <ApprovedNormCards items={service.norms}/>
    </ApprovedLightSection>

    <ApprovedFaq items={service.faq}/>
    <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Informe o equipamento e a situação da instituição. A equipe Consult confirma o ensaio e o escopo técnico aplicável."/>
  </main></ConsultSiteShell>
}
