import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { consultPath } from '@/lib/consultProject'
import { ApprovedInternalHero, ApprovedLightSection, CONSULT_IMAGES } from '@/components/consult/ConsultApprovedInternal'

const sections = [
  [
    "1. Quem somos",
    [
      "O site é mantido pela Consult Radiometria e Qualidade S/S, com sede em Matão/SP e atendimento na Av. Dr. Vital Brasil, 1060, sala 205, Botucatu/SP. A Consult é controladora dos dados pessoais tratados por meio deste site, nos termos da Lei 13.709/2018 (LGPD)."
    ]
  ],
  [
    "2. Que dados coletamos",
    [
      "No formulário de orçamento: nome, instituição, cidade/UF, telefone/WhatsApp, serviço solicitado e, opcionalmente, e-mail, equipamentos e mensagem.",
      "Na navegação, podem ser utilizados dados técnicos como página de origem, tipo de navegador e identificador derivado do IP para segurança e prevenção de abuso. O IP bruto não é armazenado no cadastro de leads.",
      "O site pode pedir nome e telefone antes de abrir o WhatsApp para registrar o contato."
    ]
  ],
  [
    "3. Para que usamos",
    [
      "Responder solicitações, elaborar orçamentos, agendar atendimentos e manter o relacionamento comercial solicitado pela instituição.",
      "Proteger os canais de contato contra abusos e registrar o histórico da solicitação.",
      "Ferramentas de análise e publicidade somente serão ativadas quando instaladas e, para recursos não essenciais, após o consentimento correspondente. Na homologação não há tags externas de análise/publicidade ativas."
    ]
  ],
  [
    "4. Base legal",
    [
      "Tratamos informações para procedimentos preliminares a contrato solicitados pelo titular (art. 7º, V, da LGPD), para legítimos interesses pertinentes (art. 7º, IX) e, no caso de cookies não essenciais, mediante consentimento (art. 7º, I)."
    ]
  ],
  [
    "5. Compartilhamento",
    [
      "A Consult não vende nem cede dados pessoais para fins comerciais de terceiros.",
      "Dados podem ser processados por prestadores de hospedagem, banco de dados, segurança e e-mail necessários ao atendimento, ou compartilhados quando a lei ou autoridade competente exigir."
    ]
  ],
  [
    "6. Retenção e segurança",
    [
      "As informações ficam armazenadas pelo tempo necessário para atender a solicitação, manter histórico comercial legítimo ou cumprir obrigações legais; depois, são excluídas ou anonimizadas conforme aplicável.",
      "São adotadas medidas técnicas e administrativas para reduzir riscos de acesso não autorizado, perda ou alteração."
    ]
  ],
  [
    "7. Direitos dos titulares",
    [
      "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, exclusão, portabilidade, informações sobre compartilhamento e revogação de consentimento, conforme o art. 18 da LGPD."
    ]
  ],
  [
    "8. Cookies e preferências",
    [
      "Cookies estritamente necessários apoiam o funcionamento e as escolhas de privacidade. Cookies opcionais para análise ou publicidade dependem de escolha prévia do visitante.",
      "É possível aceitar, recusar ou personalizar essas categorias no aviso de cookies e rever a decisão posteriormente em “Preferências de cookies”."
    ]
  ],
  [
    "9. Responsáveis e contato",
    [
      "Matheus Alvarez: matheus@consult.med.br. Amanda: amanda@consult.med.br. Para contatos gerais: radiometria@consult.med.br."
    ]
  ],
  [
    "10. Atualizações",
    [
      "Esta política poderá ser revisada conforme os recursos efetivamente utilizados no site. A data da última atualização é informada abaixo."
    ]
  ]
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
          <p><strong>Última atualização:</strong> 16 de outubro de 2026.</p>
          <p className="mt-2">Para voltar ao site, <Link to={consultPath()} className="font-extrabold text-[#08A77F] underline">acesse a página inicial da Consult</Link>.</p>
        </div>
      </div>
    </ApprovedLightSection>
  </main></ConsultSiteShell>
}
