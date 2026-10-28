import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ClipboardCheck, FileText, MessageCircle, ScanLine, ShieldCheck, UserRound } from 'lucide-react'
import { ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { consultPath } from '@/lib/consultProject'
import { updateConsultPageMeta } from '@/lib/consultPageMeta'
import '@/components/consult/consult-electrical-safety.css'
import '@/components/consult/consult-quality-index.css'

// MART PRODUCTION / Pexels 7089017; same illustrative MRI photo used on the Home.
const PHOTO = '/consult/radiodiagnostico-hero.jpg'
const INTRO = 'Avaliação técnica de equipamentos de diagnóstico por imagem com ensaios definidos conforme a modalidade, análise dos resultados e emissão de laudo técnico.'
const DESCRIPTION = 'Controle de Qualidade por modalidade, com referências específicas, medições documentadas e laudo técnico assinado pelo físico médico.'
const WHATSAPP = 'https://wa.me/5514981610712?text=' + encodeURIComponent('Olá, equipe Consult. Gostaria de conversar sobre Controle de Qualidade.')

/** @type {Array<[React.ElementType, string, string]>} */
const PROOF_ITEMS = [
  [ScanLine, '10 modalidades', 'Diagnóstico por imagem'],
  [FileText, 'Laudo técnico', 'ENTREGA'],
  [UserRound, 'Físico médico', 'RESPONSÁVEL'],
  [ShieldCheck, 'RDC 611/2022', 'BASE'],
]

const MODALITIES = [
  ['Raios X convencional','IN 90/2021','raio-x-convencional'],
  ['Fluoroscopia, Arco C e angiografia','IN 91/2021','fluoroscopia-arco-c-angiografia'],
  ['Mamografia','IN 92/2021','mamografia'],
  ['Tomografia computadorizada','IN 93/2021','tomografia'],
  ['Odontológico extraoral','IN 94/2021','odontologico-extraoral'],
  ['Odontológico intraoral','IN 95/2021','odontologico-intraoral'],
  ['Ultrassom','IN 96/2021','ultrassom'],
  ['Ressonância magnética','IN 97/2021','ressonancia-magnetica'],
  ['Densitometria óssea','RDC 611/2022','densitometria-ossea'],
  ['Raios X veterinário','RDC 611/2022 + IN 90 como referência técnica','raio-x-veterinario'],
]

const PROCESS = [
  ['01','Identificar a modalidade','Confirmar o equipamento, o contexto de uso e a referência aplicável.'],
  ['02','Executar os ensaios','Realizar os testes previstos para a modalidade e para o equipamento.'],
  ['03','Analisar os resultados','Comparar as medições com os critérios técnicos aplicáveis.'],
  ['04','Emitir o laudo','Documentar os resultados e a conclusão técnica.'],
]

function Eyebrow({ children }) {
  return <div className="safety-eyebrow"><span/>{children}</div>
}

function Actions({ browse = false }) {
  return <div className="safety-actions">
    <a className="safety-button safety-button-primary" href={browse ? '#modalidades' : '/consult#contato'}><FileText size={19}/>{browse ? 'Ver modalidades' : 'Solicite um orçamento'}</a>
    <a className="safety-button safety-button-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={21}/>Falar no WhatsApp</a>
  </div>
}

export default function ConsultQualityIndexPage() {
  useEffect(() => {
    updateConsultPageMeta({ title: 'Controle de Qualidade em Diagnóstico por Imagem | Consult', description: DESCRIPTION, image: PHOTO })
  }, [])

  return <div className="consult-electrical-safety consult-quality-index"><ConsultSiteShell horizontalBrand><main>
    <section className="safety-hero">
      <svg width="0" height="0" aria-hidden="true"><defs><clipPath id="consult-safety-photo-curve" clipPathUnits="objectBoundingBox"><path d="M.18,0H1V1H0C.19,.7,-.08,.32,.18,0Z"/></clipPath></defs></svg>
      <div className="safety-hero-photo">
        <img src={PHOTO} alt="Imagem ilustrativa de equipamento de ressonância magnética em ambiente hospitalar" width="1600" height="1067" fetchPriority="high"/>
        <svg className="safety-photo-ribbon" viewBox="0 0 700 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0,180C150,72,395,10,700,0V180Z" fill="#00B68C"/><path d="M300,180C405,80,558,44,700,32V180Z" fill="#02D69E"/><path d="M480,180C470,125,540,30,700,0V180Z" fill="#96ED17"/></svg>
      </div>
      <div className="safety-container safety-hero-inner"><div className="safety-hero-copy">
        <nav className="safety-breadcrumb" aria-label="Navegação estrutural"><Link to={consultPath()}>Início</Link><span aria-hidden="true">/</span><Link to={consultPath('fisica-medica')}>Física Médica</Link><span aria-hidden="true">/</span><span aria-current="page">Controle de Qualidade</span></nav>
        <Eyebrow>Física Médica</Eyebrow>
        <h1>Controle de<br/><span>Qualidade</span></h1>
        <p>{INTRO}</p>
        <Actions browse/>
        <div className="safety-hero-signature"><span/>Conhecimento técnico<br/>a favor de decisões mais seguras</div>
      </div></div>
    </section>

    <section className="safety-proof" aria-label="Informações do Controle de Qualidade"><div className="safety-container safety-proof-grid">
      {PROOF_ITEMS.map(([Icon, title, text]) => <div className="safety-proof-item" key={title}><Icon size={36}/><div><strong>{title}</strong><p>{text}</p></div></div>)}
    </div></section>

    <section id="modalidades" className="safety-section safety-section-soft" aria-labelledby="modalidades-title"><div className="safety-container">
      <div className="safety-section-heading"><Eyebrow>Por modalidade</Eyebrow><h2 id="modalidades-title" className="safety-title">Cada tecnologia possui <span>critérios próprios de avaliação</span></h2><p>Selecione a modalidade para ver a referência técnica, o escopo da avaliação e como o resultado é documentado.</p></div>
      <div className="safety-card-grid cq-modality-grid">{MODALITIES.map(([label, norm, slug]) => <Link className="safety-card cq-modality-link" key={slug} to={consultPath(`fisica-medica/controle-de-qualidade/${slug}`)}>
        <div className="safety-card-top"><span className="safety-icon"><ScanLine size={28}/></span><h3>{label}</h3></div>
        <p className="cq-reference">{norm}</p><span className="safety-text-link">Ver modalidade</span>
      </Link>)}</div>
    </div></section>

    <section className="safety-process"><div className="safety-container">
      <div className="safety-section-heading"><Eyebrow>Como funciona</Eyebrow><h2 className="safety-title">Da avaliação <span>ao laudo técnico</span></h2></div>
      <ol className="safety-process-grid">{PROCESS.map(([num, title, text]) => <li key={num}><span className="safety-step-number">{num}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </div></section>

    <section className="safety-section safety-section-white"><div className="safety-container safety-report-grid">
      <div><Eyebrow>O que você recebe</Eyebrow><h2 className="safety-title">O que o laudo <span>traz</span></h2><p className="safety-section-intro">O documento registra os ensaios realizados, os resultados medidos, a referência aplicável e a conclusão técnica assinada pelo físico médico.</p></div>
      <ul className="safety-report-list">{['Identificação do equipamento e da modalidade', 'Ensaios realizados', 'Resultados medidos', 'Referência aplicável', 'Conclusão técnica e assinatura do físico médico'].map(text => <li key={text}><ClipboardCheck size={22}/><span>{text}</span></li>)}</ul>
    </div></section>

    <section className="safety-section safety-section-soft"><div className="safety-container">
      <div className="safety-section-heading"><Eyebrow>Base normativa</Eyebrow><h2 className="safety-title">Referências organizadas <span>por tecnologia</span></h2><p>A RDC 611/2022 estabelece a base sanitária geral e as Instruções Normativas complementam os critérios conforme a modalidade.</p></div>
      <div className="safety-card-grid safety-norm-grid">{[['RDC 611/2022 — Anvisa', 'Base sanitária geral para serviços de radiologia diagnóstica e intervencionista.'], ['IN 90 a 97/2021 — Anvisa', 'Referências específicas para as modalidades apresentadas nesta área.']].map(([title, text]) => <article className="safety-card" key={title}><div className="safety-card-top"><span className="safety-icon"><FileText size={28}/></span><h3>{title}</h3></div><p>{text}</p></article>)}</div>
      <Link className="safety-text-link" to={consultPath('normas')}>Normas e referências</Link>
    </div></section>

    <section className="safety-contact"><div className="safety-container">
      <div><Eyebrow>Vamos conversar?</Eyebrow><h2 className="safety-title">Precisa programar o <span>Controle de Qualidade?</span></h2><p>Informe a modalidade e o equipamento. A equipe Consult confirma o escopo técnico e a programação da avaliação.</p><Actions/></div>
      <div className="safety-contact-note"><Activity size={42}/><strong>Laudo emitido em até 7 dias após as medições.</strong><p>Atendimento das 8h às 17h</p><a href="tel:+5514981610712">(14) 98161-0712</a></div>
    </div></section>

    <section className="safety-brand-band"><div className="safety-container"><p><strong>Mais do que serviços,</strong><br/>compromisso com vidas mais seguras.</p><span>Consult<br/>Radiometria e Qualidade</span></div></section>
  </main></ConsultSiteShell></div>
}
