import React, { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultSiteShell } from '@/components/ConsultSiteShell'
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
} from '@/components/ConsultApprovedInternal'

const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2021/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'

const SERVICES = {
  'seguranca-eletrica': {
    title: 'Ensaio de segurança elétrica',
    intro: 'Medição de resistência de aterramento, resistência de isolamento e correntes de fuga do equipamento e das partes aplicadas ao paciente.',
    storyTitle: 'Segurança elétrica recorrente exige medição e registro técnico.',
    story: 'O ensaio verifica a condição elétrica do equipamento, compara os valores medidos com os limites aplicáveis e documenta o resultado por equipamento.',
    proof: [['ENSAIO','TSE recorrente e após reparo'],['ENTREGA','Laudo por equipamento'],['BASE','ABNT NBR IEC 62353'],['PADRÕES','Rastreabilidade RBC']],
    when: ['Ensaio recorrente de segurança elétrica','Após reparo ou intervenção técnica','Quando a instituição precisa registrar a condição elétrica do equipamento','Para compor o histórico técnico do equipamento'],
    parameters: [['Aterramento','Resistência medida no equipamento'],['Isolamento','Condição de isolamento elétrico'],['Correntes de fuga','Equipamento e partes aplicadas'],['Conclusão','Valores medidos, limites aplicáveis e resultado']],
    deliverable: 'Laudo de Segurança Elétrica',
    reportItems: ['Identificação do equipamento','Valores medidos em cada ensaio','Limites e referência aplicável','Resultado aprovado ou reprovado','Assinatura do responsável técnico e histórico técnico'],
    norms: [['ABNT NBR IEC 62353','Referência para ensaio recorrente e após reparo.',ABNT],['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['O ensaio é apenas visual?','Não. O serviço inclui medições de aterramento, isolamento e correntes de fuga, conforme aplicabilidade.'],['O laudo mostra apenas um status final?','Não. O documento registra os valores medidos, os limites aplicáveis e a conclusão técnica.']],
  },
  'desempenho-calibracao': {
    title: 'Calibração e ensaio de desempenho',
    intro: 'Ensaio de desempenho com comparação ponto a ponto entre o que o equipamento mede ou entrega e uma referência calibrada.',
    storyTitle: 'O desempenho precisa ser demonstrado por comparação objetiva.',
    story: 'O ensaio seleciona os pontos aplicáveis ao equipamento, compara os resultados com a referência correspondente e documenta desvios e conformidade. No corpo técnico, o serviço é tratado como ensaio de desempenho.',
    proof: [['MÉTODO','Comparação ponto a ponto'],['ENTREGA','Laudo com desvios'],['BASE','Norma do equipamento'],['PADRÕES','Rastreabilidade RBC']],
    when: ['Rotina periódica de verificação','Após manutenção ou suspeita de desvio','Quando é necessário documentar o desempenho do equipamento','Para manter histórico técnico das medições'],
    parameters: [['Ponto de ensaio','Grandeza e faixa definidas para o equipamento'],['Valor medido','Resposta observada durante o ensaio'],['Referência','Padrão calibrado utilizado na comparação'],['Conclusão','Desvio e conformidade documentados']],
    deliverable: 'Laudo de Ensaio de Desempenho',
    reportItems: ['Identificação do equipamento','Pontos ensaiados e valores medidos','Valores de referência','Desvios encontrados','Conclusão de conformidade e histórico técnico'],
    norms: [['Família ABNT NBR IEC 60601','Norma particular aplicável conforme o tipo de equipamento.',ABNT],['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['Ensaio de desempenho significa ajustar o equipamento?','Não necessariamente. O serviço mede e compara o desempenho, registrando os resultados e desvios encontrados.'],['A mesma referência vale para todos os equipamentos?','Não. A avaliação considera o tipo de equipamento, seu manual e a norma particular aplicável.'],['Como é descrita a rastreabilidade?','Os padrões utilizados são apresentados como padrões com rastreabilidade RBC/Inmetro.']],
  },
  'manutencao-preventiva': {
    title: 'Manutenção preventiva',
    intro: 'Limpeza, lubrificação e testes de funcionamento, com registro de peças gastas, vencidas ou outras pendências encontradas durante a rotina preventiva.',
    storyTitle: 'A preventiva precisa deixar um histórico claro do que foi executado.',
    story: 'A Consult executa as ações preventivas previstas para o equipamento, verifica o funcionamento e registra no laudo as atividades realizadas e as pendências que exigem tratamento posterior.',
    proof: [['ESCOPO','Limpeza e lubrificação'],['TESTE','Funcionamento'],['PENDÊNCIA','Registrada no laudo'],['BASE','Plano do fabricante']],
    when: ['Rotina preventiva prevista pelo fabricante','Necessidade de registrar limpeza, lubrificação e testes','Equipamentos com itens de desgaste ou pendências','Quando a instituição precisa manter histórico das ações preventivas'],
    parameters: [['Limpeza','Ações previstas para o equipamento'],['Lubrificação','Quando aplicável'],['Teste funcional','Verificação após a preventiva'],['Pendências','Itens identificados e especificados no laudo']],
    deliverable: 'Laudo de Manutenção Preventiva',
    reportItems: ['Identificação do equipamento','Atividades preventivas realizadas','Testes de funcionamento executados','Pendências encontradas e sua especificação','Assinatura do responsável técnico e histórico técnico'],
    norms: [['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['Como ficam registradas as pendências?','O laudo identifica o item encontrado e registra a especificação necessária para o tratamento pela instituição.'],['O que fica documentado na preventiva?','As ações realizadas, os testes de funcionamento e a lista de pendências identificadas.']],
  },
  reverificacao: {
    title: 'Reverificação',
    intro: 'Novo ensaio realizado depois que a instituição trata uma pendência apontada no laudo anterior.',
    storyTitle: 'A correção da pendência precisa ser confirmada por novo ensaio.',
    story: 'A reverificação retoma o ensaio que originou a pendência, utiliza a mesma referência técnica e atualiza a evidência documentada sobre a condição do equipamento.',
    proof: [['ORIGEM','Laudo anterior'],['AÇÃO','Novo ensaio'],['BASE','Referência original'],['ENTREGA','Laudo atualizado']],
    when: ['Após tratamento de uma pendência','Depois de intervenção realizada pela instituição ou por fornecedor escolhido','Quando é necessário comprovar a condição após a correção','Para atualizar o histórico técnico do equipamento'],
    parameters: [['Pendência anterior','Item que originou a nova avaliação'],['Ensaio original','Referência técnica mantida'],['Novo resultado','Valor obtido após o tratamento da pendência'],['Atualização','Novo laudo e histórico técnico']],
    deliverable: 'Laudo Atualizado de Reverificação',
    reportItems: ['Identificação da pendência anterior','Ensaio que foi repetido','Novo valor medido','Comparação com o critério original','Conclusão atualizada no histórico técnico'],
    norms: [['RDC 509/2021 — Anvisa','Base geral para gerenciamento de tecnologias em saúde.',RDC_509]],
    faq: [['A reverificação repete toda a avaliação?','O escopo é definido a partir da pendência e do ensaio que precisa ser repetido para atualizar a evidência técnica.'],['A reverificação gera um novo documento?','Sim. O resultado é atualizado em laudo e incorporado ao histórico técnico do equipamento.']],
  },
  'qualificacao-termica': {
    title: 'Qualificação térmica',
    intro: 'Mapeamento de temperatura com sensores calibrados durante ciclos de operação, com registros e gráficos para documentar o comportamento térmico do equipamento.',
    storyTitle: 'Qualificação térmica acompanha o comportamento ao longo do ciclo.',
    story: 'A avaliação utiliza pontos de medição distribuídos e registra a evolução da temperatura durante a operação. O resultado é comparado com os critérios aplicáveis ao equipamento e documentado em relatório.',
    proof: [['MÉTODO','Mapeamento térmico'],['PADRÃO','Sensores calibrados'],['ENTREGA','Relatório + gráficos'],['PADRÕES','Rastreabilidade RBC']],
    when: ['Qualificação de autoclaves','Qualificação de termodesinfectoras','Mapeamento de geladeiras e câmaras de vacina','Avaliação de estufas, incubadoras e banho-maria de laboratório'],
    parameters: [['Sensores','Pontos de medição distribuídos'],['Ciclo','Comportamento ao longo da operação'],['Temperatura','Registros e curvas geradas'],['Conclusão','Resultado de conformidade conforme a aplicação']],
    deliverable: 'Relatório de Qualificação Térmica',
    reportItems: ['Identificação do equipamento e do ciclo','Pontos de medição utilizados','Registros e gráficos de temperatura','Critérios aplicáveis à avaliação','Conclusão de conformidade e histórico técnico'],
    norms: [['ABNT NBR ISO 17665','Referência aplicável à esterilização por calor úmido em autoclaves.',ABNT],['ABNT NBR ISO 15883','Referência aplicável a termodesinfectoras.',ABNT],['ABNT NBR IEC 61010','Referência de segurança para equipamentos laboratoriais quando aplicável.',ABNT]],
    faq: [['Qualificação térmica é apenas uma leitura de temperatura?','Não. A avaliação acompanha o comportamento durante o ciclo, com pontos de medição distribuídos e registros ao longo do tempo.'],['O relatório inclui gráficos?','Sim. O relatório apresenta os registros, gráficos e a conclusão técnica da avaliação.']],
  },
}

const PROCESS = [['01','Identificar','Confirmar equipamento, aplicação, histórico e ensaio necessário.'],['02','Medir','Executar as medições com padrões calibrados e rastreabilidade RBC/Inmetro.'],['03','Comparar','Analisar os valores frente à referência aplicável ao equipamento.'],['04','Documentar','Emitir o resultado por equipamento e preservar o histórico técnico.']]

export default function ConsultEngineeringServicePage() {
  const { slug } = useParams()
  const service = useMemo(() => SERVICES[slug], [slug])

  useEffect(() => {
    if (!service) return
    document.title = `${service.title} | Consult Engenharia Clínica`
    document.querySelector('meta[name="description"]')?.setAttribute('content', service.intro)
  }, [service])

  if (!service) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Serviço não encontrado</h1><Link to="/engenharia-clinica" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar para Engenharia Clínica</Link></main></ConsultSiteShell>

  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow="Consult Engenharia Clínica" title={service.title} description={service.intro} image={CONSULT_IMAGES.engineering} breadcrumbs={[[ 'Início','/' ],[ 'Consult Engenharia Clínica','/engenharia-clinica' ],[ service.title,null ]]}/>
    <ApprovedProofStrip items={service.proof}/>
    <ApprovedIndependenceBand/>

    <ApprovedLightSection eyebrow="Sobre o serviço" title={service.storyTitle} intro={service.story} center>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-2xl bg-[#075653] p-7 text-white shadow-xl shadow-[#075653]/10">
          <div className="text-[10px] font-bold uppercase tracking-[.24em] text-[#8AE600]">Entregável técnico</div>
          <h3 className="mt-4 text-2xl font-black leading-tight">{service.deliverable}</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">Documento emitido por equipamento, assinado pelo responsável técnico e incorporado ao histórico técnico da instituição. Laudo emitido em até 7 dias após as medições.</p>
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

    <ApprovedLightSection eyebrow="Entregável" title="O que o laudo traz" intro="A entrega é apresentada como conteúdo técnico do documento real, sem tabela ou valores fictícios." white>
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div className="rounded-2xl bg-[#075653] p-7 text-white">
          <div className="text-[10px] font-bold uppercase tracking-[.24em] text-[#8AE600]">Documento</div>
          <h3 className="mt-4 text-2xl font-black">{service.deliverable}</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">Os padrões utilizados nas medições são apresentados com rastreabilidade RBC/Inmetro. Laudo emitido em até 7 dias após as medições.</p>
        </div>
        <ApprovedList items={service.reportItems}/>
      </div>
    </ApprovedLightSection>

    <ApprovedLightSection eyebrow="Base técnica" title="Normas e referências do serviço" intro="A aplicação exata depende do equipamento, do fabricante e do tipo de ensaio.">
      <ApprovedNormCards items={service.norms}/>
    </ApprovedLightSection>

    <ApprovedFaq items={service.faq}/>
    <ConsultCtaBand title={`Precisa de ${service.title}?`} text="Informe o equipamento e a situação da instituição. A equipe Consult confirma o ensaio e o escopo técnico aplicável."/>
  </main></ConsultSiteShell>
}
