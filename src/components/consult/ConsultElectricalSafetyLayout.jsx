import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Check, ClipboardCheck, FileText, History, MessageCircle, ShieldCheck, Unplug, Zap } from 'lucide-react'
import { ConsultSiteShell } from './ConsultSiteShell'
import './consult-electrical-safety.css'

const PHOTO = '/consult/seguranca-eletrica-hero-v1.webp'

const ICONS = [Unplug, ShieldCheck, Zap, ClipboardCheck]

function Eyebrow({ children }) {
  return <div className="safety-eyebrow"><span/>{children}</div>
}

function Title({ children, accent }) {
  return <h2 className="safety-title">{children} <span>{accent}</span></h2>
}

function Actions({ title }) {
  const wa = 'https://wa.me/5514981610712?text=' + encodeURIComponent(`Olá, equipe Consult. Gostaria de conversar sobre ${title}.`)
  return <div className="safety-actions">
    <a className="safety-button safety-button-primary" href="/consult#contato"><FileText size={19}/>Solicite um orçamento</a>
    <a className="safety-button safety-button-whatsapp" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={21}/>Falar no WhatsApp</a>
  </div>
}

export default function ConsultElectricalSafetyLayout({ service, process, slug = 'seguranca-eletrica', showWhen = true }) {
  const safety = slug === 'seguranca-eletrica'
  const headings = {
    'desempenho-calibracao': ['Calibração e ensaio', 'de desempenho'],
    'manutencao-preventiva': ['Manutenção', 'preventiva'],
    reverificacao: ['', 'Reverificação'],
    'qualificacao-termica': ['Qualificação', 'térmica'],
    'monitor-multiparametrico': ['Monitor', 'multiparamétrico'],
    eletrocardiografo: ['', 'Eletrocardiógrafo'],
    'oximetro-pulso': ['Oxímetro', 'de pulso'],
  }
  const heading = headings[slug] || ['Ensaio de', 'segurança elétrica']

  return <div className="consult-electrical-safety"><ConsultSiteShell horizontalBrand><main>
    <section className="safety-hero">
      <svg width="0" height="0" aria-hidden="true"><defs><clipPath id="consult-safety-photo-curve" clipPathUnits="objectBoundingBox"><path d="M.18,0H1V1H0C.19,.7,-.08,.32,.18,0Z"/></clipPath></defs></svg>
      <div className="safety-hero-photo">
        <img src={PHOTO} alt="Imagem ilustrativa de ensaio em monitor médico com instrumento de medição" width="1448" height="1086" fetchPriority="high"/>
        <svg className="safety-photo-ribbon" viewBox="0 0 700 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0,180C150,72,395,10,700,0V180Z" fill="#00B68C"/><path d="M300,180C405,80,558,44,700,32V180Z" fill="#02D69E"/><path d="M480,180C470,125,540,30,700,0V180Z" fill="#96ED17"/></svg>
      </div>
      <div className="safety-container safety-hero-inner">
        <div className="safety-hero-copy">
          <nav className="safety-breadcrumb" aria-label="Navegação estrutural"><Link to="/consult">Início</Link><span aria-hidden="true">/</span><Link to="/consult/engenharia-clinica">Consult Engenharia Clínica</Link><span aria-hidden="true">/</span><span aria-current="page">{safety ? 'Segurança elétrica' : service.title}</span></nav>
          <Eyebrow>Consult Engenharia Clínica</Eyebrow>
          <h1>{heading[0]}{heading[0] && <br/>}<span>{heading[1]}</span></h1>
          <p>{service.intro}</p>
          <Actions title={service.title}/>
          <div className="safety-hero-signature"><span/>Conhecimento técnico<br/>a favor de decisões mais seguras</div>
        </div>
      </div>
    </section>

    <section className="safety-proof" aria-label="Informações do ensaio">
      <div className="safety-container safety-proof-grid">
        {(safety ? [
          [ShieldCheck, 'IEC 62353', 'Ensaio recorrente e após reparo'],
          [FileText, 'Laudo por equipamento', 'Valores e resultado documentados'],
          [History, 'Histórico técnico', 'Registros do equipamento'],
          [Activity, 'Rastreabilidade RBC', 'Padrões com rastreabilidade RBC/Inmetro'],
        ] : service.proof.map(([label, value], i) => [[Activity, FileText, History, ShieldCheck][i], label === 'RASTREIO' ? 'Rastreabilidade RBC' : value, label === 'RASTREIO' ? 'Padrões com rastreabilidade RBC/Inmetro' : label])).map(([Icon, title, text]) => <div className="safety-proof-item" key={title}><Icon size={36}/><div><strong>{title}</strong><p>{text}</p></div></div>)}
      </div>
    </section>

    <section className="safety-section safety-section-soft">
      <div className="safety-container">
        <div className="safety-section-heading"><Eyebrow>O que é avaliado</Eyebrow><Title accent="em laudo técnico">{safety ? 'Segurança elétrica documentada' : service.title.replace(/^Calibração e ensaio/, 'Ensaio')}</Title><p>{service.story}</p></div>
        <div className="safety-card-grid" style={service.parameters.length === 1 ? { gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 640, marginInline: 'auto' } : undefined}>
          {service.parameters.map(([label, text], i) => { const Icon = ICONS[i % ICONS.length]; return <article className="safety-card" key={label}><div className="safety-card-top"><span className="safety-icon"><Icon size={32}/></span><h3>{label}</h3></div><p>{text}</p></article> })}
        </div>
        {service.caveat && <aside className="safety-card" style={{ marginTop: 24, borderLeft: '4px solid #00b68c' }}><p>{service.caveat}</p></aside>}
      </div>
    </section>

    {showWhen && <section className="safety-section safety-section-white">
      <div className="safety-container safety-when-grid">
        <div><Eyebrow>Quando contratar</Eyebrow><Title accent="avaliar o equipamento?">Quando é necessário</Title><p className="safety-section-intro">{slug === 'manutencao-preventiva' ? 'A manutenção considera o equipamento, sua aplicação e o plano do fabricante.' : 'O ensaio considera o equipamento, sua aplicação e o histórico técnico da instituição.'}</p><Link className="safety-text-link" to="/consult/engenharia-clinica">Conheça a Consult Engenharia Clínica</Link></div>
        <ul className="safety-check-list">{service.when.map(text => <li key={text}><span><Check size={18}/></span>{text}</li>)}</ul>
      </div>
    </section>}

    <section className="safety-process">
      <div className="safety-container"><div className="safety-section-heading"><Eyebrow>Como funciona</Eyebrow><Title accent={slug === 'qualificacao-termica' ? 'ao relatório técnico' : 'ao laudo técnico'}>{slug === 'manutencao-preventiva' ? 'Da manutenção' : slug === 'qualificacao-termica' ? 'Do mapeamento' : 'Do ensaio'}</Title></div><ol className="safety-process-grid">{process.map(([num, title, text]) => <li key={num}><span className="safety-step-number">{num}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div>
    </section>

    <section className="safety-section safety-section-soft">
      <div className="safety-container safety-report-grid">
        <div><Eyebrow>O que você recebe</Eyebrow><Title accent="traz">{slug === 'qualificacao-termica' ? 'O que o relatório' : 'O que o laudo'}</Title><p className="safety-section-intro">{service.deliverable}, emitido por equipamento, assinado pelo responsável técnico e incorporado ao histórico técnico da instituição.</p></div>
        <ul className="safety-report-list">{service.reportItems.map(text => <li key={text}><ClipboardCheck size={22}/><span>{text}</span></li>)}</ul>
      </div>
    </section>

    <section className="safety-independence"><div className="safety-container"><ShieldCheck size={38}/><div><Eyebrow>Verificação independente</Eyebrow><p><strong>Não fazemos manutenção corretiva e não vendemos peças.</strong> O laudo documenta a condição do equipamento e a instituição decide como tratar eventuais pendências.</p></div></div></section>

    <section className="safety-section safety-section-white">
      <div className="safety-container"><div className="safety-section-heading"><Eyebrow>Base técnica</Eyebrow><Title accent="referências">Normas e</Title><p>A aplicação exata considera o equipamento, o fabricante e o tipo de ensaio.</p></div><div className="safety-card-grid safety-norm-grid">{service.norms.map(([title, text, href]) => { const Tag = href ? 'a' : 'article'; return <Tag className="safety-card safety-norm-card" key={title} href={href || undefined} target={href ? '_blank' : undefined} rel={href ? 'noreferrer' : undefined}><div className="safety-card-top"><span className="safety-icon"><FileText size={28}/></span><h3>{title}</h3></div><p>{text}</p>{href && <span className="safety-text-link">Consultar referência</span>}</Tag> })}</div></div>
    </section>

    <section className="safety-section safety-section-soft">
      <div className="safety-container safety-faq-grid"><div><Eyebrow>Dúvidas frequentes</Eyebrow><Title accent="técnica">Informação</Title></div><div className="safety-faq-list">{service.faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div>
    </section>

    <section className="safety-contact"><div className="safety-container"><div><Eyebrow>Vamos conversar?</Eyebrow><Title accent="equipe">Fale com nossa</Title><p>Informe o equipamento e a situação da instituição. A equipe Consult orienta {slug === 'manutencao-preventiva' ? 'o serviço' : 'o ensaio'} e o escopo técnico aplicável.</p><Actions title={service.title}/></div><div className="safety-contact-note"><FileText size={42}/><strong>Laudo emitido em até 7 dias após as medições.</strong><p>Atendimento das 8h às 17h</p><a href="tel:+5514981610712">(14) 98161-0712</a></div></div></section>


    <section className="safety-brand-band"><div className="safety-container"><p><strong>Mais do que serviços,</strong><br/>compromisso com vidas mais seguras.</p><span>Consult<br/>Radiometria e Qualidade</span></div></section>
  </main></ConsultSiteShell></div>
}
