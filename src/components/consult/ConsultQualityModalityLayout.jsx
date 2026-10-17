import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, ClipboardCheck, FileText, Image, MessageCircle, ScanLine, ShieldCheck, UserRound } from 'lucide-react'
import { ConsultSiteShell } from './ConsultSiteShell'
import './consult-electrical-safety.css'
import './consult-quality-index.css'

const RDC_611 = 'https://anvisalegis.datalegis.net/action/ActionDatalegis.php?acao=abrirTextoAto&codTipo=&cod_menu=1696&cod_modulo=134&desItem=&desItemFim=&numeroAto=00000611&orgao=RDC/DC/ANVISA/MS&pesquisa=true&seqAto=000&tipo=RDC&valorAno=2022'
const ICONS = [Activity, Image, ScanLine, ClipboardCheck]
const REPORT_ITEMS = ['Identificação do serviço, equipamento e modalidade', 'Testes realizados com valor medido, referência e tolerância aplicável', 'Resultado de cada teste e conclusão', 'Não conformidades e orientações', 'Instrumentos utilizados com rastreabilidade RBC/Inmetro', 'Data e assinatura do físico médico responsável']

function Eyebrow({ children }) {
  return <div className="safety-eyebrow"><span/>{children}</div>
}

function Actions({ title }) {
  const whatsapp = 'https://wa.me/5514981610712?text=' + encodeURIComponent(`Olá, equipe Consult. Gostaria de conversar sobre Controle de Qualidade em ${title}.`)
  return <div className="safety-actions">
    <a className="safety-button safety-button-primary" href="/consult#contato"><FileText size={19}/>Solicite um orçamento</a>
    <a className="safety-button safety-button-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={21}/>Falar no WhatsApp</a>
  </div>
}

export default function ConsultQualityModalityLayout({ item, process, presentation, normativeExamples = [] }) {
  return <div className="consult-electrical-safety consult-quality-index"><ConsultSiteShell horizontalBrand><main>
    <section className="safety-hero">
      <svg width="0" height="0" aria-hidden="true"><defs><clipPath id="consult-safety-photo-curve" clipPathUnits="objectBoundingBox"><path d="M.18,0H1V1H0C.19,.7,-.08,.32,.18,0Z"/></clipPath></defs></svg>
      <div className="safety-hero-photo">
        <img src={presentation.image} alt={presentation.imageAlt} width={presentation.imageWidth} height={presentation.imageHeight} style={presentation.imagePosition ? { objectPosition: presentation.imagePosition } : undefined} fetchPriority="high"/>
        <svg className="safety-photo-ribbon" viewBox="0 0 700 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0,180C150,72,395,10,700,0V180Z" fill="#00B68C"/><path d="M300,180C405,80,558,44,700,32V180Z" fill="#02D69E"/><path d="M480,180C470,125,540,30,700,0V180Z" fill="#96ED17"/></svg>
      </div>
      <div className="safety-container safety-hero-inner"><div className="safety-hero-copy">
        <nav className="safety-breadcrumb" aria-label="Navegação estrutural"><Link to="/consult">Início</Link><span aria-hidden="true">/</span><Link to="/consult/fisica-medica/controle-de-qualidade">Controle de Qualidade</Link><span aria-hidden="true">/</span><span aria-current="page">{item.short}</span></nav>
        <Eyebrow>{presentation.eyebrow}</Eyebrow>
        <h1>{presentation.heading[0]}<br/><span>{presentation.heading[1]}</span></h1>
        <p>{item.intro}</p>
        <Actions title={item.short}/>
        <div className="safety-hero-signature"><span/>Conhecimento técnico<br/>a favor de decisões mais seguras</div>
      </div></div>
    </section>

    <section className="safety-proof" aria-label="Informações da modalidade"><div className="safety-container safety-proof-grid">
      {[[ScanLine, item.short, 'MODALIDADE'], [ShieldCheck, item.norm, 'REFERÊNCIA'], [FileText, 'Laudo técnico', 'ENTREGA'], [UserRound, 'Físico médico', 'RESPONSÁVEL']].map(([Icon, title, text]) => <div className="safety-proof-item" key={title}><Icon size={36}/><div><strong>{title}</strong><p>{text}</p></div></div>)}
    </div></section>

    <section className="safety-section safety-section-soft"><div className="safety-container">
      <div className="safety-section-heading"><Eyebrow>Controle por modalidade</Eyebrow><h2 className="safety-title">O que é avaliado em <span>{item.short}</span></h2><p>Os testes e critérios mudam conforme a tecnologia. Por isso a avaliação considera a referência específica da modalidade.</p></div>
      <div className="safety-card-grid">{item.focus.map(([label, text], i) => { const Icon = ICONS[i]; return <article className="safety-card" key={label}><div className="safety-card-top"><span className="safety-icon"><Icon size={30}/></span><h3>{label}</h3></div><p>{text}</p></article> })}</div>
    </div></section>

    {normativeExamples.length > 0 && <section className="safety-section safety-section-white"><div className="safety-container"><div className="safety-section-heading"><Eyebrow>Referência técnica</Eyebrow><h2 className="safety-title">O que <span>avaliamos</span></h2><p>Ensaios previstos no conteúdo técnico aprovado pela Consult. São executados os testes aplicáveis ao equipamento e à tecnologia de imagem (filme, CR ou DR), conforme a norma e o escopo.</p></div><ul className="safety-report-list">{normativeExamples.map(test => <li key={test}><ClipboardCheck size={22}/><span>{test}</span></li>)}</ul></div></section>}

    <section className="safety-process"><div className="safety-container">
      <div className="safety-section-heading"><Eyebrow>Como funciona</Eyebrow><h2 className="safety-title">Da avaliação <span>ao laudo técnico</span></h2></div>
      <ol className="safety-process-grid">{process.map(([num, title, text]) => <li key={num}><span className="safety-step-number">{num}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </div></section>

    <section className="safety-section safety-section-white"><div className="safety-container safety-report-grid">
      <div><Eyebrow>O que você recebe</Eyebrow><h2 className="safety-title">O que o laudo <span>traz</span></h2><p className="safety-section-intro">O documento registra os ensaios realizados, os resultados medidos, a referência aplicável e a conclusão técnica assinada pelo físico médico.</p></div>
      <ul className="safety-report-list">{REPORT_ITEMS.map(text => <li key={text}><ClipboardCheck size={22}/><span>{text}</span></li>)}</ul>
    </div></section>

    <section className="safety-section safety-section-soft"><div className="safety-container"><div className="safety-section-heading"><Eyebrow>Dúvidas frequentes</Eyebrow><h2 className="safety-title">Perguntas sobre <span>Controle de Qualidade</span></h2></div><div className="grid gap-3">{[
      ['Com que frequência o Controle de Qualidade é feito?', 'Na instalação (aceitação), na periodicidade definida pela IN da modalidade e após reparos que afetem o desempenho.'],
      ['O que preciso deixar disponível na visita?', 'Equipamento livre durante os testes, operador e acesso à sala, ao monitor de laudo e ao sistema de imagem.'],
      ['O equipamento fica parado?', 'Sim, durante os testes. O tempo estimado é informado no agendamento para adequar a rotina da instituição.'],
      ['E se um teste não passar?', 'O laudo registra a não conformidade e a orientação. Após correção pelo fornecedor de manutenção, a Consult refaz o teste.'],
      ['Em quanto tempo recebo o laudo?', 'Em até 7 dias após as medições.'],
    ].map(([question, answer]) => <details key={question} className="rounded-xl border border-[#CFE4DE] bg-white p-4"><summary className="cursor-pointer font-bold text-[#075653]">{question}</summary><p className="mt-3 text-sm leading-6 text-[#315B58]">{answer}</p></details>)}</div></div></section>

    <section className="safety-section safety-section-soft"><div className="safety-container">
      <div className="safety-section-heading"><Eyebrow>Base normativa</Eyebrow><h2 className="safety-title">Normas e <span>referências</span></h2><p>A avaliação combina a base geral da RDC 611/2022 com a referência específica da modalidade.</p></div>
      <div className="safety-card-grid safety-norm-grid">{(presentation.norms || [['RDC 611/2022 — Anvisa', 'Base sanitária geral para radiologia diagnóstica e intervencionista.', RDC_611], [`${item.norm} — Anvisa`, presentation.normDescription, presentation.normHref]]).map(([title, text, href]) => <a className="safety-card safety-norm-card" href={href} target="_blank" rel="noreferrer" key={title}><div className="safety-card-top"><span className="safety-icon"><FileText size={28}/></span><h3>{title}</h3></div><p>{text}</p><span className="safety-text-link">Consultar referência</span></a>)}</div>
      <Link className="safety-text-link" to="/consult/fisica-medica/controle-de-qualidade">Ver todas as modalidades de Controle de Qualidade</Link>
    </div></section>

    <section className="safety-contact"><div className="safety-container">
      <div><Eyebrow>Vamos conversar?</Eyebrow><h2 className="safety-title">Precisa de Controle de Qualidade em <span>{item.short}?</span></h2><p>Informe o equipamento e a situação do serviço. A equipe Consult confirma o escopo técnico e a programação da avaliação.</p><Actions title={item.short}/></div>
      <div className="safety-contact-note"><FileText size={42}/><strong>Laudo emitido em até 7 dias após as medições.</strong><p>Atendimento das 8h às 17h</p><a href="tel:+5514981610712">(14) 98161-0712</a></div>
    </div></section>

    <section className="safety-brand-band"><div className="safety-container"><p><strong>Mais do que serviços,</strong><br/>compromisso com vidas mais seguras.</p><span>Consult<br/>Radiometria e Qualidade</span></div></section>
  </main></ConsultSiteShell></div>
}
