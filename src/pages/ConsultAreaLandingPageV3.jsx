import React, { useEffect, useMemo } from 'react'
import { Activity, CheckCircle2, FileText, Gauge, ShieldCheck, Stethoscope, Thermometer, Wrench } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { EditorialStatement, IndependenceBand, ProcessTimeline, ServiceHeroConsole, ServiceProofRail, StandardsShelf, TechnicalFaq } from '@/components/consult/ConsultServiceV3Design'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/TematicaAction.php?acao=abrirVinculos&cod_menu=8457&cod_modulo=135&cotematica=18518373'
const ANVISA_IN = 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2021/anvisa-avanca-na-consolidacao-de-suas-normas'
const RDC_509 = 'https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2021/rdc0509_27_05_2021.pdf'
const ABNT = 'https://www.abntcatalogo.com.br/'

const MODALITIES = [
  ['Raios X convencional','IN 90/2021','/consult/fisica-medica/controle-de-qualidade/raio-x-convencional'],
  ['Fluoroscopia, Arco C e angiografia','IN 91/2021','/consult/fisica-medica/controle-de-qualidade/fluoroscopia-arco-c-angiografia'],
  ['Mamografia','IN 92/2021','/consult/fisica-medica/controle-de-qualidade/mamografia'],
  ['Tomografia computadorizada','IN 93/2021','/consult/fisica-medica/controle-de-qualidade/tomografia'],
  ['Odontológico extraoral','IN 94/2021','/consult/fisica-medica/controle-de-qualidade/odontologico-extraoral'],
  ['Odontológico intraoral','IN 95/2021','/consult/fisica-medica/controle-de-qualidade/odontologico-intraoral'],
  ['Ultrassom','IN 96/2021','/consult/fisica-medica/controle-de-qualidade/ultrassom'],
  ['Ressonância magnética','IN 97/2021','/consult/fisica-medica/controle-de-qualidade/ressonancia-magnetica'],
  ['Densitometria óssea','RDC 611/2022','/consult/fisica-medica/controle-de-qualidade/densitometria-ossea'],
  ['Raios X veterinário','RDC 611 + IN 90 ref.','/consult/fisica-medica/controle-de-qualidade/raio-x-veterinario'],
]

const EQUIPMENT = [
  ['Monitor multiparamétrico','/consult/engenharia-clinica/equipamentos/monitor-multiparametrico'],['Eletrocardiógrafo','/consult/engenharia-clinica/equipamentos/eletrocardiografo'],['Oxímetro de pulso','/consult/engenharia-clinica/equipamentos/oximetro-pulso'],['Esfigmomanômetro digital e MAPA','/consult/engenharia-clinica/equipamentos/esfigmomanometro-mapa'],['Desfibrilador, cardioversor e DEA','/consult/engenharia-clinica/equipamentos/desfibrilador-cardioversor-dea'],['Marca-passo transcutâneo','/consult/engenharia-clinica/equipamentos/marca-passo-transcutaneo'],['Bisturi elétrico','/consult/engenharia-clinica/equipamentos/bisturi-eletrico'],['Ventilador pulmonar','/consult/engenharia-clinica/equipamentos/ventilador-pulmonar'],['Aparelho de anestesia','/consult/engenharia-clinica/equipamentos/aparelho-anestesia'],['CPAP e BiPAP','/consult/engenharia-clinica/equipamentos/cpap-bipap'],['Fluxômetro e manômetro de O₂','/consult/engenharia-clinica/equipamentos/fluxometro-manometro-o2'],['Autoclave','/consult/engenharia-clinica/equipamentos/autoclave'],['Termodesinfectora e estufa','/consult/engenharia-clinica/equipamentos/termodesinfectora-estufa'],['Estufa e banho-maria','/consult/engenharia-clinica/equipamentos/estufa-banho-maria'],['Geladeira e câmara de vacina','/consult/engenharia-clinica/equipamentos/geladeira-camara-vacina'],
]

const AREAS = {
  'fisica-medica': {
    title:'Física Médica', kicker:'Controle de qualidade, medição e laudo', visual:'technical',
    intro:'Verificação técnica de equipamentos de diagnóstico por imagem, com Controle de Qualidade por modalidade e resultado documentado em laudo técnico assinado pelo físico médico.',
    statement:'Cada modalidade tem referência própria. Por isso a V3 deixa de tratar o Controle de Qualidade como um bloco único e leva o visitante até a página específica do seu equipamento.',
    proof:[['BASE','RDC 611/2022'],['MODALIDADES','IN 90 a 97/2021'],['ENTREGA','Laudo técnico'],['ATUAÇÃO','SP, PR, MS e MG']],
    services:[
      ['Controle de Qualidade','Dose, qualidade de imagem e funcionamento por modalidade.','/consult/fisica-medica/controle-de-qualidade',Gauge],
      ['Levantamento radiométrico','Medição da radiação no entorno e fuga do cabeçote.','/consult/fisica-medica/levantamento-radiometrico',Activity],
      ['Projeto de blindagem','Cálculo e memorial antes de obra, reforma ou troca de equipamento.','/consult/fisica-medica/projeto-blindagem',ShieldCheck],
    ],
    process:[['01','Identificar','Modalidade, equipamento, ambiente e objetivo técnico.'],['02','Medir','Ensaios e medições aplicáveis ao escopo.'],['03','Comparar','Resultados analisados frente à referência pertinente.'],['04','Documentar','Entrega técnica correspondente ao serviço.']],
    standards:[['RDC 611/2022','Base sanitária geral para radiologia diagnóstica e intervencionista.',RDC_611],['IN 90 a 97/2021','Referências específicas por modalidade de diagnóstico por imagem.',ANVISA_IN]],
    faq:[['O Controle de Qualidade é igual para todas as modalidades?','Não. A referência e os testes aplicáveis variam conforme a modalidade.'],['O resultado do CQ é documentado?','Sim. O guia oficial confirma laudo assinado pelo físico médico.']],
    resources:'modalities',
  },
  'protecao-radiologica': {
    title:'Proteção Radiológica', kicker:'Ambiente, equipe e documentação', visual:'shield',
    intro:'Medições, cálculo de blindagem, programa, treinamento e apoio documental para estruturar a proteção radiológica de serviços de diagnóstico e intervenção.',
    statement:'Proteção radiológica não é uma única entrega. Ela conecta ambiente, equipamento, equipe, documentação e rotinas diferentes conforme a necessidade da instituição.',
    proof:[['BASE','RDC 611/2022'],['AMBIENTE','Radiometria + blindagem'],['EQUIPE','Treinamentos'],['DOCUMENTO','Programa + licenciamento']],
    services:[
      ['Programa de Proteção Radiológica','Elaboração e acompanhamento do programa do serviço.','/consult/fisica-medica/programa-protecao-radiologica',FileText],
      ['Levantamento radiométrico','Medição das condições radiométricas do ambiente.','/consult/fisica-medica/levantamento-radiometrico',Activity],
      ['Projeto de blindagem','Memorial de cálculo antes da execução física.','/consult/fisica-medica/projeto-blindagem',ShieldCheck],
      ['Treinamentos','Radioproteção e segurança em ressonância magnética.','/consult/fisica-medica/treinamentos',Stethoscope],
      ['Licenciamento sanitário','Apoio técnico e documental para obtenção ou renovação.','/consult/fisica-medica/licenciamento-sanitario',CheckCircle2],
    ],
    process:[['01','Mapear','Serviço, sala, equipamento, equipe e situação documental.'],['02','Avaliar','Medições, cálculos ou revisão documental conforme o caso.'],['03','Organizar','Evidências e documentação técnica aplicável.'],['04','Orientar','Resultado e próximos passos dentro do escopo contratado.']],
    standards:[['RDC 611/2022','Base sanitária e de proteção radiológica.',RDC_611],['IN 90 a 97/2021','Referências específicas conforme modalidade/equipamento.',ANVISA_IN]],
    faq:[['Levantamento radiométrico e projeto de blindagem são a mesma coisa?','Não. O projeto dimensiona antes; o levantamento mede a condição do ambiente.'],['A Consult garante a licença sanitária?','Não. A Consult presta apoio técnico/documental; a decisão é da autoridade sanitária.']],
    resources:'situations',
  },
  'engenharia-clinica': {
    title:'Consult Engenharia Clínica', kicker:'Medição independente por equipamento', visual:'technical',
    intro:'Ensaios, calibração, preventiva, reverificação e qualificação com laudo por equipamento, histórico no Arkmeds e analisadores com rastreabilidade RBC.',
    statement:'O diferencial está na independência: a Consult mede e documenta a condição encontrada. Não vende peças e não condiciona o laudo a uma empresa de conserto.',
    proof:[['BASE','RDC 509/2021'],['SEGURANÇA','ABNT NBR IEC 62353'],['SISTEMA','Arkmeds'],['RASTREIO','RBC']],
    services:[
      ['Segurança elétrica','Aterramento, isolamento e correntes de fuga.','/consult/engenharia-clinica/seguranca-eletrica',ShieldCheck],
      ['Desempenho e calibração','Comparação ponto a ponto com referência calibrada.','/consult/engenharia-clinica/desempenho-calibracao',Gauge],
      ['Manutenção preventiva','Limpeza, lubrificação, testes e pendências sem troca de peças.','/consult/engenharia-clinica/manutencao-preventiva',Wrench],
      ['Reverificação','Novo ensaio após tratamento de pendência.','/consult/engenharia-clinica/reverificacao',CheckCircle2],
      ['Qualificação térmica','Mapeamento com sensores calibrados e relatório.','/consult/engenharia-clinica/qualificacao-termica',Thermometer],
    ],
    process:[['01','Identificar','Equipamento, modelo, histórico e ensaio.'],['02','Medir','Analisador ou simulador específico do equipamento.'],['03','Comparar','Valores frente à referência aplicável.'],['04','Emitir','Laudo por equipamento e histórico técnico.']],
    standards:[['RDC 509/2021','Base geral indicada para gerenciamento de tecnologias em saúde.',RDC_509],['ABNT NBR IEC 62353','Referência de segurança elétrica recorrente e após reparo.',ABNT],['Família ABNT NBR IEC 60601','Normas particulares conforme equipamento.',ABNT]],
    faq:[['A Consult conserta os equipamentos?','Não. Ela mede, ensaia, documenta e registra pendências.'],['Os analisadores têm rastreabilidade?','Sim. O guia confirma calibração com rastreabilidade RBC.']],
    resources:'equipment', independence:true,
  },
}

function ServiceRow({ item,index }) {
  const [title,text,href,Icon] = item
  return <Link to={href} className={`group grid gap-4 border-t border-[#DCEAE7] py-6 sm:grid-cols-[64px_1fr_auto] sm:items-center ${index===0?'border-t-0 pt-0':''}`}><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E7F6F1] text-[#078B6B]"><Icon size={22}/></div><div><h3 className="text-lg font-black text-[#075653] group-hover:text-[#08A77F]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#607D7A]">{text}</p></div><span className="text-xs font-black uppercase tracking-[.13em] text-[#078B6B]">Abrir serviço</span></Link>
}

export default function ConsultAreaLandingPageV3({ fixedSlug }) {
  const params = useParams()
  const slug = fixedSlug || params.slug
  const area = useMemo(()=>AREAS[slug],[slug])

  useEffect(()=>{if(!area)return;document.title=`${area.title} | Consult`;document.querySelector('meta[name="description"]')?.setAttribute('content',area.intro)},[area])
  if(!area) return <ConsultSiteShell><main className="mx-auto max-w-4xl px-5 py-24 text-center"><h1 className="text-4xl font-black text-[#075653]">Área não encontrada</h1><Link to="/consult" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar</Link></main></ConsultSiteShell>

  return <ConsultSiteShell><main>
    <section className="relative overflow-hidden bg-[#075653] text-white"><div className="absolute inset-0 opacity-70" style={{backgroundImage:'radial-gradient(circle at 82% 22%, rgba(138,230,0,.15), transparent 24%), linear-gradient(125deg, transparent 42%, rgba(5,210,157,.12) 100%)'}}/><div className="relative mx-auto grid min-h-[650px] max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><Link to="/consult#areas" className="text-sm font-bold text-white/55 hover:text-white">Áreas de atuação</Link><div className="mt-9 flex items-center gap-3 text-[10px] font-black uppercase tracking-[.25em] text-[#8AE600]"><span className="h-px w-10 bg-[#8AE600]"/>{area.kicker}</div><h1 className="mt-5 text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[66px]">{area.title}</h1><p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/88">{area.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="/consult#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FF6B26] px-6 py-3 text-sm font-extrabold text-white">Agendar reunião técnica</a><Link to="/consult/normas" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/18 px-6 py-3 text-sm font-extrabold text-white/82">Ver normas</Link></div></div><ServiceHeroConsole title={area.title} kicker={area.kicker} chips={[area.proof[0][1],area.proof[2][1]]} accent={area.visual}/></div></section>
    {area.independence&&<IndependenceBand/>}
    <ServiceProofRail items={area.proof}/>

    <EditorialStatement eyebrow="Visão da área" title={area.statement}><p>{area.intro}</p></EditorialStatement>

    <section className="bg-[#F4FAF8]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.55fr_1.45fr]"><div className="lg:sticky lg:top-28"><ConsultEyebrow>Serviços</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">Da área técnica para o serviço específico.</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">Cada rota aprofunda quando contratar, parâmetros, metodologia, entregável, normas e FAQ.</p></div><div>{area.services.map((item,index)=><ServiceRow key={item[2]} item={item} index={index}/>)}</div></div></section>

    <ProcessTimeline items={area.process}/>

    {area.resources==='modalities'&&<section className="bg-white"><div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.5fr_1.5fr]"><div><ConsultEyebrow>Controle por modalidade</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">Uma página para cada referência.</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">A V3 conecta a modalidade diretamente à sua página de Controle de Qualidade.</p></div><div className="grid gap-3 sm:grid-cols-2">{MODALITIES.map(([label,norm,href])=><Link key={href} to={href} className="rounded-[18px] border border-[#D5E6E1] p-5 transition hover:border-[#08A77F] hover:bg-[#F7FBFA]"><div className="text-sm font-black text-[#075653]">{label}</div><div className="mt-2 text-xs font-black text-[#078B6B]">{norm}</div></Link>)}</div></div></section>}

    {area.resources==='equipment'&&<section id="equipamentos" className="scroll-mt-28 bg-white"><div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.5fr_1.5fr]"><div><ConsultEyebrow>Equipamentos confirmados</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">15 páginas técnicas próprias.</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">Cada equipamento mostra parâmetros confirmados, analisador, metodologia, laudo e FAQ.</p></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{EQUIPMENT.map(([label,href])=><Link key={href} to={href} className="flex min-h-20 items-center rounded-[16px] border border-[#D5E6E1] p-4 text-sm font-black leading-5 text-[#315B58] transition hover:border-[#08A77F] hover:bg-[#F7FBFA]">{label}</Link>)}</div></div></section>}

    {area.resources==='situations'&&<section className="bg-white"><div className="mx-auto grid max-w-7xl gap-9 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[.5fr_1.5fr]"><div><ConsultEyebrow>Quando entra</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">Da implantação à rotina.</h2></div><div className="grid gap-3 sm:grid-cols-2">{['Sala nova ou reforma','Troca de equipamento','Expansão do serviço','Renovação documental','Revisão do Programa de Proteção Radiológica','Capacitação da equipe'].map((label,index)=><div key={label} className="rounded-[18px] border border-[#D5E6E1] p-5"><div className="text-[10px] font-black text-[#08A77F]">0{index+1}</div><div className="mt-2 text-sm font-black text-[#315B58]">{label}</div></div>)}</div></div></section>}

    <StandardsShelf items={area.standards}/>
    <TechnicalFaq items={area.faq}/>
    <ConsultCtaBand title={`Vamos conversar sobre ${area.title}?`} text="Envie o contexto da instituição, equipamento ou necessidade. A equipe Consult confirma o serviço e o escopo técnico aplicável."/>
  </main></ConsultSiteShell>
}
