import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ConsultReportPreview } from '@/components/consult/ConsultTechnicalDesign'
import {
  ApprovedDarkProcess,
  ApprovedFaq,
  ApprovedInternalHero,
  ApprovedLightSection,
  ApprovedList,
  ApprovedNormCards,
  ApprovedProofStrip,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2020/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'

const SERVICES = {
  'seguranca-eletrica': {
    title: 'Ensaio de segurança elétrica', visual: 'technical',
    intro: 'Medição de resistência de aterramento, resistência de isolamento e correntes de fuga do equipamento e das partes aplicadas ao paciente.',
    storyTitle: 'Segurança elétrica recorrente precisa medir o desgaste real do equipamento.',
    story: 'A página passa a explicar o ensaio como verificação de campo, e não como uma simples checagem visual. O foco é medir parâmetros elétricos, comparar com os limites aplicáveis e registrar o resultado no histórico técnico do equipamento.',
    proof: [['ENSAIO','Recorrente e após reparo'],['ENTREGA','Laudo por equipamento'],['BASE','ABNT NBR IEC 62353'],['SISTEMA','Arkmeds + RBC']],
    when: ['Ensaio recorrente de segurança elétrica','Após reparo ou intervenção técnica','Quando o hospital precisa registrar a condição elétrica do equipamento','Para compor o histórico técnico no Arkmeds'],
    parameters: [['Aterramento','Resistência medida no equipamento'],['Isolamento','Condição de isolamento elétrico'],['Correntes de fuga','Equipamento e partes aplicadas'],['Resultado','Valor medido, limite e aprovação/reprovação']],
    deliverable: 'Laudo de Segurança Elétrica',
    exampleRows: [['Aterramento','Valor medido','Limite','Aprov./Reprov.'],['Isolamento','Valor medido','Limite','Aprov./Reprov.'],['Corrente de fuga','Valor medido','Limite','Aprov./Reprov.']],
    note: 'Exemplo visual sem dados reais. O guia oficial confirma que o laudo registra valores medidos, limites da norma e resultado aprovado ou reprovado.',
    norms: [['ABNT NBR IEC 62353','Referência indicada pela Consult para ensaio recorrente e após reparo. A norma completa é consultada pelo catálogo da ABNT.',ABNT],['RDC 509/2021 — Anvisa','Base geral indicada para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['Qual a diferença entre IEC 60601 e IEC 62353 neste contexto?','No material de referência da Consult, a família IEC 60601 aparece associada às normas particulares dos equipamentos, enquanto a IEC 62353 é a referência indicada para o ensaio recorrente e após reparo.'],['O ensaio é apenas visual?','Não. O escopo confirmado inclui medição de aterramento, isolamento e correntes de fuga.'],['O hospital recebe apenas um status “aprovado”?','Não. O guia confirma que o laudo apresenta os valores medidos, os limites aplicáveis e o resultado.']],
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
    note: 'Exemplo visual, sem valores reais. O guia confirma que o laudo registra pontos ensaiados, desvios e conformidade.',
    norms: [['Manual do fabricante','Critérios e procedimentos específicos dependem do equipamento.','#manual'],['Família ABNT NBR IEC 60601','Norma particular aplicável conforme o tipo de equipamento.',ABNT],['RDC 509/2021 — Anvisa','Base geral indicada para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['Calibração significa ajustar o equipamento?','Não necessariamente. O conteúdo da Consult descreve o serviço como comparação do que o equipamento mede ou entrega com um analisador calibrado, ponto a ponto, registrando desvios e conformidade.'],['A mesma norma vale para todos os equipamentos?','Não. O guia informa uso do manual do fabricante e da norma particular aplicável da família IEC 60601, conforme o equipamento.'],['Os analisadores têm rastreabilidade?','Sim. O guia oficial confirma analisadores calibrados com rastreabilidade RBC.']],
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
    faq: [['A Consult faz manutenção corretiva?','Não. O guia oficial determina que o site não posicione a Consult como empresa de manutenção corretiva ou assistência técnica.'],['A Consult troca a peça identificada como pendência?','Não. A peça é registrada e especificada no laudo, mas a Consult não vende nem troca peças.'],['O que fica registrado?','O guia confirma laudo com o que foi realizado e a lista de pendências.']],
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
    note: 'Exemplo visual. A Consult refaz o ensaio correspondente e emite laudo atualizado. O guia informa que a reverificação é cobrada à parte.',
    norms: [['Referência do ensaio original','A reverificação usa a mesma base técnica do ensaio que gerou a pendência.','#original'],['RDC 509/2021 — Anvisa','Base geral indicada para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['Quem precisa corrigir a pendência antes da reverificação?','A própria instituição resolve com equipe interna ou fornecedor de sua escolha. A Consult não condiciona o laudo a uma empresa de conserto.'],['A reverificação está incluída automaticamente no primeiro ensaio?','Não. O guia informa que ela é cobrada à parte.']],
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
    norms: [['RDC 15/2012','Referência indicada no guia para autoclaves e CME.',RDC_15],['RDC 197/2017','Referência indicada para serviços de vacinação.',RDC_197],['Manual da Rede de Frio do PNI','Referência indicada para câmaras de vacina.',PNI],['RDC 430/2020','Referência adicional indicada conforme o equipamento e a aplicação.',RDC_430]],
    faq: [['Qualificação térmica é apenas medir a temperatura uma vez?','Não. O guia descreve mapeamento com sensores calibrados durante ciclos de operação e entrega com gráficos.'],['Quais equipamentos estão confirmados?','O guia confirma autoclave, termodesinfectora/estufa, estufa e banho-maria de laboratório, geladeira e câmara de vacina dentro das capacidades informadas.'],['O relatório inclui gráficos?','Sim. O guia oficial confirma relatório de qualificação com gráficos de temperatura e conformidade.']],
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

  const proof=[['SEGURANÇA','Verificação independente'],['BASE','RDC 509/2021'],['HISTÓRICO','Arkmeds'],['RASTREIO','RBC']]

  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow="Engenharia Clínica" title={service.title} description={service.intro} image={CONSULT_IMAGES.engineering}/>
    <ApprovedProofStrip items={proof}/>

    <ApprovedLightSection eyebrow="Sobre o serviço" title={service.title} intro="A Consult mede, ensaia e documenta a condição encontrada. Não vende peças e não condiciona o resultado a uma empresa de conserto." center>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-2xl bg-[#075653] p-7 text-white shadow-xl shadow-[#075653]/10">
          <div className="text-[10px] font-bold uppercase tracking-[.24em] text-[#8AE600]">Resultado técnico</div>
          <h3 className="mt-4 text-2xl font-black leading-tight">{service.result}</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">O resultado é vinculado ao equipamento e compõe o histórico técnico da instituição.</p>
        </div>
        <div><div className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#08A77F]">O que é avaliado</div><div className="grid gap-3 sm:grid-cols-2">{service.points.map(point=><div key={point} className="rounded-xl border border-black/5 bg-white p-5 text-sm font-extrabold leading-6 text-[#315B58] shadow-sm">{point}</div>)}</div></div>
      </div>
    </ApprovedLightSection>

    <ApprovedDarkProcess items={PROCESS}/>

    <ApprovedLightSection eyebrow="Entregável" title={service.result} intro="O exemplo abaixo é ilustrativo e serve apenas para mostrar a lógica das informações documentadas." white>
      <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
        <div>
          <ApprovedList items={service.points}/>
          <div className="mt-6 rounded-xl border border-[#CFE4DE] bg-[#F4FBFA] p-5 text-sm leading-7 text-[#4D706D]">Na Engenharia Clínica, os laudos são emitidos por equipamento, com histórico no Arkmeds e analisadores com calibração rastreável à RBC.</div>
        </div>
        <ConsultReportPreview title={service.result} sections={service.points} note="Exemplo ilustrativo sem dados reais de cliente."/>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Base técnica" title="Norma e referência do ensaio" intro="A aplicação exata depende do equipamento, do fabricante e do tipo de ensaio." >
      <ApprovedNormCards items={[[service.norm, 'Referência técnica principal indicada para este serviço.', service.normUrl],[ 'RDC 509/2021', 'Base geral para gerenciamento de tecnologias em saúde.', RDC_509 ]]}/>
    </ApprovedLightSection>

    <ApprovedFaq items={service.faq || [['A Consult conserta o equipamento?','Não. A Consult mede, ensaia e documenta a condição encontrada.'],['O resultado fica registrado?','Sim. O resultado é documentado por equipamento e preservado no histórico técnico.']]}/>
    <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Informe o equipamento e a situação da instituição. A equipe Consult confirma o ensaio e o escopo técnico aplicável."/>
  </main></ConsultSiteShell>
}
