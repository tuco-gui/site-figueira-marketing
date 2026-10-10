import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { ApprovedInternalHero, ApprovedLightSection, CONSULT_IMAGES } from '@/components/consult/ConsultApprovedInternal'

const sections = [
  ['Quais dados podem ser coletados', [
    'Dados informados em formulários, como nome, e-mail, telefone, instituição, assunto e mensagem.',
    'Antes de abrir o WhatsApp, o site pode solicitar nome e telefone para registrar a origem do contato e evitar perda de leads.',
    'Dados técnicos de navegação necessários à segurança e ao funcionamento do site, como página de origem, navegador e um identificador técnico derivado do endereço IP para prevenção de abuso. O endereço IP bruto não é armazenado no cadastro de leads.',
  ]],
  ['Para que os dados são usados', [
    'Responder solicitações de contato, orçamento ou atendimento técnico.',
    'Encaminhar o contato para a área adequada e registrar o histórico comercial da solicitação.',
    'Proteger o formulário contra abuso, automação maliciosa e excesso de tentativas.',
    'Mensurar navegação e desempenho apenas quando ferramentas de analytics estiverem ativas e houver a gestão de consentimento aplicável.',
  ]],
  ['Compartilhamento e operadores', [
    'Os dados podem ser processados por provedores de hospedagem, banco de dados, segurança e envio transacional necessários ao funcionamento do site e ao atendimento.',
    'A Consult não vende os dados recebidos pelo site.',
  ]],
  ['Retenção e segurança', [
    'Os dados são mantidos pelo período necessário para atender a solicitação, cumprir obrigações aplicáveis e preservar registros comerciais e técnicos legítimos.',
    'São adotadas medidas de acesso restrito e proteção compatíveis com a finalidade dos dados tratados.',
  ]],
  ['Cookies e analytics', [
    'Na homologação atual não há ferramenta externa de analytics ou publicidade ativa no código da Consult.',
    'Se ferramentas de analytics ou tags que dependam de consentimento forem ativadas, o site está preparado para solicitar a escolha do visitante antes de liberar esse tipo de medição.',
  ]],
  ['Seus direitos e contato', [
    'Você pode solicitar informações, correção, atualização ou outras providências previstas na LGPD em relação aos seus dados.',
    'Para assuntos de privacidade e dados pessoais, utilize o e-mail radiometria@consult.med.br.',
  ]],
]

export default function ConsultPrivacyPage() {
  useEffect(() => {
    document.title = 'Política de Privacidade | Consult Radiometria e Qualidade'
    document.querySelector('meta[name="description"]')?.setAttribute('content','Política de Privacidade do site da Consult Radiometria e Qualidade: dados coletados, finalidades, segurança, cookies e canais de contato.')
  }, [])

  return <ConsultSiteShell><main>
    <ApprovedInternalHero
      eyebrow="Privacidade e dados"
      title="Política de Privacidade"
      description="Esta política explica como os dados enviados pelo site da Consult são usados para atendimento, segurança e relacionamento com instituições e profissionais."
      image={CONSULT_IMAGES.protection}
      primaryLabel="Falar com a Consult"
      secondaryLabel="WhatsApp"
    />
    <ApprovedLightSection eyebrow="LGPD" title="Como tratamos os dados recebidos pelo site" intro="O tratamento ocorre conforme as bases legais aplicáveis da Lei Geral de Proteção de Dados, inclusive para atender solicitações do próprio titular e, quando necessário, mediante consentimento." white>
      <div className="mx-auto max-w-4xl space-y-8">
        {sections.map(([title,items])=><section key={title} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-black text-[#123C3B]">{title}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-black/60">
            {items.map(item=><li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#08A77F]"/><span>{item}</span></li>)}
          </ul>
        </section>)}
        <div className="text-sm leading-7 text-black/55">
          <p><strong>Última atualização:</strong> 10 de outubro de 2026.</p>
          <p className="mt-2">Para voltar ao site, <Link to="/" className="font-extrabold text-[#08A77F] underline">acesse a página inicial da Consult</Link>.</p>
        </div>
      </div>
    </ApprovedLightSection>
  </main></ConsultSiteShell>
}
