import React, { useEffect, useMemo } from 'react'
import { Activity, CheckCircle2, FileText, Gauge, ShieldCheck, Stethoscope, Thermometer, Wrench } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
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
  ApprovedServiceCards,
  CONSULT_IMAGES,
} from '@/components/consult/ConsultApprovedInternal'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'
const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2021/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'

const MODALITIES = [
  ['Raios X convencional','IN 90/2021','/fisica-medica/controle-de-qualidade/raio-x-convencional'],
  ['Fluoroscopia, Arco C e angiografia','IN 91/2021','/fisica-medica/controle-de-qualidade/fluoroscopia-arco-c-angiografia'],
  ['Mamografia','IN 92/2021','/fisica-medica/controle-de-qualidade/mamografia'],
  ['Tomografia computadorizada','IN 93/2021','/fisica-medica/controle-de-qualidade/tomografia'],
  ['Odontológico extraoral','IN 94/2021','/fisica-medica/controle-de-qualidade/odontologico-extraoral'],
  ['Odontológico intraoral','IN 95/2021','/fisica-medica/controle-de-qualidade/odontologico-intraoral'],
  ['Ultrassom','IN 96/2021','/fisica-medica/controle-de-qualidade/ultrassom'],
  ['Ressonância magnética','IN 97/2021','/fisica-medica/controle-de-qualidade/ressonancia-magnetica'],
  ['Densitometria óssea','RDC 611/2022','/fisica-medica/controle-de-qualidade/densitometria-ossea'],
  ['Raios X veterinário','RDC 611/2022 + IN 90 como referência','/fisica-medica/controle-de-qualidade/raio-x-veterinario'],
]

const EQUIPMENT = [
  ['Monitor multiparamétrico','/engenharia-clinica/equipamentos/monitor-multiparametrico'],
  ['Eletrocardiógrafo','/engenharia-clinica/equipamentos/eletrocardiografo'],
  ['Oxímetro de pulso','/engenharia-clinica/equipamentos/oximetro-pulso'],
  ['Esfigmomanômetro digital e MAPA','/engenharia-clinica/equipamentos/esfigmomanometro-mapa'],
  ['Desfibrilador, cardioversor e DEA','/engenharia-clinica/equipamentos/desfibrilador-cardioversor-dea'],
  ['Marca-passo transcutâneo','/engenharia-clinica/equipamentos/marca-passo-transcutaneo'],
  ['Bisturi elétrico','/engenharia-clinica/equipamentos/bisturi-eletrico'],
  ['Ventilador pulmonar','/engenharia-clinica/equipamentos/ventilador-pulmonar'],
  ['Aparelho de anestesia','/engenharia-clinica/equipamentos/aparelho-anestesia'],
  ['CPAP e BiPAP','/engenharia-clinica/equipamentos/cpap-bipap'],
  ['Fluxômetro e manômetro de O₂','/engenharia-clinica/equipamentos/fluxometro-manometro-o2'],
  ['Concentrador de oxigênio','/engenharia-clinica/equipamentos/concentrador-oxigenio'],
  ['Autoclave','/engenharia-clinica/equipamentos/autoclave'],
  ['Termodesinfectora','/engenharia-clinica/equipamentos/termodesinfectora'],
  ['Estufa e banho-maria de laboratório','/engenharia-clinica/equipamentos/estufa-banho-maria'],
  ['Geladeira e câmara de vacina','/engenharia-clinica/equipamentos/geladeira-camara-vacina'],
]

const AREAS = {
  'fisica-medica': {
    title:'Física Médica',
    eyebrow:'Controle de qualidade, medição e laudo',
    image: CONSULT_IMAGES.radiology,
    intro:'Verificação técnica de equipamentos de diagnóstico por imagem, com Controle de Qualidade por modalidade e resultado documentado em laudo técnico assinado pelo físico médico.',
    proof:[['SEGURANÇA','Controle de Qualidade'],['CONFORMIDADE','RDC 611/2022'],['MODALIDADES','IN 90 a 97/2021'],['ENTREGA','Laudo técnico']],
    sectionTitle:'Controle de qualidade com critérios próprios para cada modalidade.',
    sectionIntro:'Raios X, mamografia, tomografia, ultrassom e ressonância magnética não são avaliados da mesma forma. A Consult aplica a referência correspondente à tecnologia e documenta o resultado técnico.',
    services:[
      ['Controle de Qualidade','Verificação de dose, qualidade de imagem e funcionamento conforme a modalidade.','/fisica-medica/controle-de-qualidade',Gauge],
      ['Levantamento radiométrico','Medição da radiação no entorno da sala e avaliação da radiação de fuga.','/protecao-radiologica/levantamento-radiometrico',Activity],
      ['Projeto de blindagem','Cálculo e memorial técnico antes de obra, reforma ou troca de equipamento.','/protecao-radiologica/projeto-blindagem',ShieldCheck],
    ],
    process:[['01','Identificar','Modalidade, equipamento, ambiente e objetivo da avaliação.'],['02','Medir','Executar os testes e medições aplicáveis ao escopo.'],['03','Comparar','Analisar os resultados frente à referência pertinente.'],['04','Documentar','Registrar os resultados no documento técnico correspondente.']],
    standards:[['RDC 611/2022','Base sanitária geral para radiologia diagnóstica e intervencionista.',RDC_611],['IN 90 a 97/2021','Referências específicas por modalidade de diagnóstico por imagem.',ANVISA_IN]],
    faq:[['O Controle de Qualidade é igual para todas as modalidades?','Não. Os testes e referências variam conforme a tecnologia avaliada.'],['O resultado é documentado?','Sim. O Controle de Qualidade gera laudo técnico assinado pelo físico médico.']],
    resources:'modalities',
    recurring:['Vistoria mensal','Análise semanal de imagens','Supervisão de proteção radiológica'],
  },
  'protecao-radiologica': {
    title:'Proteção Radiológica',
    eyebrow:'Segurança para ambientes, equipes e serviços',
    image: CONSULT_IMAGES.protection,
    intro:'Medições, projeto de blindagem, programa, treinamento e apoio documental para reduzir riscos e organizar a proteção radiológica do serviço.',
    proof:[['AMBIENTE','Radiometria'],['PROJETO','Blindagem'],['EQUIPE','Treinamentos'],['BASE','RDC 611/2022']],
    sectionTitle:'Proteção radiológica começa antes do problema.',
    sectionIntro:'A segurança depende da relação entre ambiente, equipamento, barreiras, equipe e documentação. Cada serviço atende uma etapa diferente dessa rotina.',
    services:[
      ['Programa de Proteção Radiológica','Elaboração e acompanhamento do programa do serviço.','/protecao-radiologica/programa-protecao-radiologica',FileText],
      ['Levantamento radiométrico','Medição das condições radiométricas do ambiente.','/protecao-radiologica/levantamento-radiometrico',Activity],
      ['Projeto de blindagem','Memorial de cálculo para obra, reforma, expansão ou troca de equipamento.','/protecao-radiologica/projeto-blindagem',ShieldCheck],
      ['Treinamentos','Capacitação em radioproteção e segurança em ressonância magnética.','/protecao-radiologica/treinamentos',Stethoscope],
      ['Licenciamento sanitário','Apoio técnico e documental para obtenção ou renovação.','/protecao-radiologica/licenciamento-sanitario',CheckCircle2],
    ],
    process:[['01','Mapear','Entender sala, equipamento, equipe e situação documental.'],['02','Avaliar','Realizar medições, cálculos ou revisão documental conforme a necessidade.'],['03','Organizar','Estruturar evidências e documentação técnica aplicável.'],['04','Orientar','Entregar o resultado e os próximos passos dentro do escopo contratado.']],
    standards:[['RDC 611/2022','Base sanitária e de proteção radiológica.',RDC_611],['IN 90 a 97/2021','Referências específicas conforme modalidade e equipamento.',ANVISA_IN]],
    faq:[['Levantamento radiométrico e projeto de blindagem são a mesma coisa?','Não. O projeto dimensiona a proteção antes da execução; o levantamento mede a condição radiométrica do ambiente.'],['A Consult garante a licença sanitária?','Não. A Consult presta apoio técnico e documental; a decisão compete à autoridade sanitária.']],
    resources:'situations',
  },
  'engenharia-clinica': {
    title:'Consult Engenharia Clínica',
    eyebrow:'Ensaios, calibração e qualificação',
    image: CONSULT_IMAGES.engineering,
    intro:'A Consult realiza ensaios de segurança elétrica, ensaios de desempenho, manutenção preventiva, reverificação e qualificação térmica, com resultado documentado por equipamento.',
    proof:[['ENTREGA','Laudo por equipamento'],['RESPONSÁVEL','RT habilitado'],['HISTÓRICO','Histórico técnico'],['RASTREIO','RBC/Inmetro']],
    sectionTitle:'Medição independente para decisões mais seguras sobre equipamentos de saúde.',
    sectionIntro:'A Consult verifica o equipamento por medição, documenta a condição encontrada e preserva o histórico técnico por equipamento.',
    services:[
      ['Segurança elétrica','Aterramento, isolamento e correntes de fuga.','/engenharia-clinica/seguranca-eletrica',ShieldCheck],
      ['Calibração e ensaio de desempenho','Comparação ponto a ponto com padrões calibrados, com desvios e conformidade documentados.','/engenharia-clinica/desempenho-calibracao',Gauge],
      ['Manutenção preventiva','Limpeza, lubrificação, testes e registro de pendências.','/engenharia-clinica/manutencao-preventiva',Wrench],
      ['Reverificação','Novo ensaio após o tratamento de uma pendência.','/engenharia-clinica/reverificacao',CheckCircle2],
      ['Qualificação térmica','Mapeamento de temperatura com sensores calibrados e relatório.','/engenharia-clinica/qualificacao-termica',Thermometer],
    ],
    process:[['01','Identificar','Equipamento, modelo, histórico e ensaio necessário.'],['02','Medir','Executar as medições com padrões calibrados e rastreabilidade RBC/Inmetro.'],['03','Comparar','Analisar valores medidos frente à referência aplicável.'],['04','Emitir','Documentar o resultado e preservar o histórico técnico.']],
    standards:[['RDC 509/2021','Base geral para gerenciamento de tecnologias em saúde.',RDC_509],['ABNT NBR IEC 62353','Referência para segurança elétrica recorrente e após reparo.',ABNT],['Família ABNT NBR IEC 60601','Normas particulares conforme equipamento.',ABNT]],
    faq:[['Como fica o histórico dos equipamentos?','O resultado é emitido por equipamento e incorporado ao histórico técnico da instituição.'],['Como é apresentada a rastreabilidade metrológica?','Os padrões utilizados são apresentados com rastreabilidade RBC/Inmetro.']],
    resources:'equipment',
  },
}

export default function ConsultAreaLandingPageV3({ fixedSlug }) {
  const params=useParams()
  const slug=fixedSlug||params.slug
  const area=useMemo(()=>AREAS[slug],[slug])

  useEffect(()=>{if(!area)return;document.title=`${area.title} | Consult Radiometria e Qualidade`;document.querySelector('meta[name="description"]')?.setAttribute('content',area.intro)},[area])

  if(!area) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Área não encontrada</h1><Link to="/" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar</Link></main></ConsultSiteShell>

  return <ConsultSiteShell><main>
    <ApprovedInternalHero eyebrow={area.eyebrow} title={area.title} description={area.intro} image={area.image}/>
    <ApprovedProofStrip items={area.proof}/>
    {slug==='engenharia-clinica' && <ApprovedIndependenceBand/>}

    <ApprovedLightSection eyebrow="Nossa especialidade" title={area.sectionTitle} intro={area.sectionIntro} center>
      <ApprovedServiceCards items={area.services}/>
    </ApprovedLightSection>

    <ApprovedDarkProcess items={area.process}/>

    {area.resources==='modalities'&&<ApprovedLightSection eyebrow="Controle de Qualidade" title="Encontre a modalidade do seu equipamento" intro="Cada tecnologia possui uma referência específica para o Controle de Qualidade." white>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{MODALITIES.map(([label,norm,href])=><Link key={href} to={href} className="rounded-xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="text-base font-black text-[#123C3B]">{label}</div><div className="mt-2 text-xs font-extrabold text-[#08A77F]">{norm}</div><div className="mt-4 text-sm font-extrabold text-[#08A77F]">Ver detalhes</div></Link>)}</div>
    </ApprovedLightSection>}

    {area.recurring&&<ApprovedLightSection eyebrow="Programas recorrentes" title="Acompanhamento contínuo em Física Médica" intro="Além dos serviços avulsos, a Consult também estrutura rotinas recorrentes conforme a necessidade da instituição.">
      <ApprovedList items={area.recurring}/>
    </ApprovedLightSection>}

    {area.resources==='equipment'&&<ApprovedLightSection eyebrow="Equipamentos atendidos" title="Ensaios organizados por tipo de equipamento" intro="Os equipamentos eletromédicos recebem ensaio de segurança elétrica conforme aplicabilidade. Acesse a página específica para conhecer os parâmetros medidos e o resultado documentado." white>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{EQUIPMENT.map(([label,href])=><Link key={href} to={href} className="rounded-xl border border-black/5 bg-white p-5 text-sm font-black leading-6 text-[#315B58] shadow-sm transition hover:-translate-y-1 hover:shadow-lg">{label}<div className="mt-3 text-xs font-extrabold text-[#08A77F]">Ver equipamento</div></Link>)}</div>
    </ApprovedLightSection>}

    {area.resources==='situations'&&<ApprovedLightSection eyebrow="Quando contratar" title="Situações em que a proteção radiológica entra na rotina" intro="O serviço adequado depende do momento da instituição, do ambiente e do equipamento.">
      <ApprovedList items={['Sala nova ou reforma','Troca de equipamento','Expansão do serviço','Renovação documental','Revisão do Programa de Proteção Radiológica','Capacitação da equipe']}/>
    </ApprovedLightSection>}

    <ApprovedLightSection eyebrow="Base normativa" title="Normas e referências técnicas" intro="As referências são apresentadas junto ao contexto do serviço, com acesso às fontes oficiais." white>
      <ApprovedNormCards items={area.standards}/>
    </ApprovedLightSection>

    <ApprovedFaq items={area.faq}/>
    <ConsultCtaBand title={`Vamos conversar sobre ${area.title}?`} text="Conte a necessidade da sua instituição. A equipe Consult orienta o serviço e o escopo técnico aplicável."/>
  </main></ConsultSiteShell>
}
