import React from "react";
import { Link, useLocation } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";

const HOSTINGER_REF = "https://www.hostinger.com/br?REFERRALCODE=VSRSYLVIOCZ4";

const partners = {
  kommo: {
    name: "Kommo",
    eyebrow: "Parceiro Kommo",
    badge: "/partners/kommo-partner-light.png",
    hero: "Pare de perder vendas entre uma conversa e o próximo passo.",
    subhero: "A Figueira implanta Kommo para centralizar canais, organizar o pipeline, automatizar follow-ups e dar ao time comercial contexto para agir.",
    promise: "O CRM deixa de ser uma agenda bonita e passa a funcionar como parte da operação comercial.",
    fitTitle: "Kommo faz sentido quando a venda acontece em conversa.",
    fitText: "Se os leads chegam por WhatsApp, Instagram, formulários, campanhas e indicações, o risco está na passagem entre atendimento, qualificação e venda. É aí que estruturamos o Kommo.",
    scope: [
      ["Mapeamento do processo comercial","Antes de configurar o CRM, entendemos origem dos leads, etapas da venda, responsáveis, regras de avanço e pontos de perda."],
      ["Implantação e personalização","Estruturamos pipelines, campos, usuários, permissões, tarefas, motivos de perda e visualizações para refletir a operação real."],
      ["WhatsApp e canais de entrada","Conectamos os canais relevantes para que conversa, histórico e oportunidade deixem de ficar espalhados."],
      ["Automações comerciais","Criamos distribuição, alertas, follow-ups, tarefas e rotinas que tiram trabalho repetitivo da equipe sem esconder o processo."],
      ["Integrações","Ligamos site, formulários, mídia, n8n, sistemas internos, calendários e Harvest quando a operação precisa."],
      ["Treinamento e evolução","A implantação não termina no go-live. Ajustamos regras, treinamos a equipe e evoluímos o CRM conforme o uso mostra novos gargalos."],
    ],
    before: ["Lead em um canal e histórico em outro","Follow-up depende da memória do vendedor","Gestão descobre tarde oportunidades paradas","Dados de campanha não chegam ao comercial"],
    after: ["Conversas ligadas ao contato e à oportunidade","Próximo passo claro para cada lead","Pipeline visível para operação e gestão","Origem e contexto acompanham o lead até a venda"],
    extrasTitle: "Kommo é a base. A Figueira conecta o restante.",
    extrasText: "A implantação pode envolver CRM, automação, inteligência artificial, mídia, páginas e dados. Você não precisa contratar tudo de uma vez. Começamos pelo que está travando a operação agora.",
    faq: [
      ["Já uso Kommo. Vocês conseguem reorganizar?","Sim. Podemos revisar estrutura, funil, automações, usuários, integrações e adoção sem começar do zero."],
      ["Vocês integram WhatsApp e formulários?","Sim, quando fizer sentido no desenho da operação. O objetivo é reduzir perda de contexto entre canal, CRM e vendedor."],
      ["Treinam o time comercial?","Sim. Configuração sem adoção vira ferramenta abandonada. O treinamento faz parte da implantação quando necessário."],
    ],
    cta: "Quero avaliar meu Kommo",
  },
  zoho: {
    name: "Zoho",
    eyebrow: "Parceiro Zoho",
    badge: "/partners/zoho-partner.png",
    hero: "Seu negócio não precisa de mais sistemas isolados. Precisa de uma operação conectada.",
    subhero: "A Figueira implementa e integra o ecossistema Zoho para conectar vendas, marketing, atendimento, dados e processos em uma operação que pode evoluir.",
    promise: "Zoho funciona melhor quando o desenho começa pelo processo, não pelo aplicativo.",
    fitTitle: "Zoho faz sentido quando o problema já atravessou um único departamento.",
    fitText: "CRM, atendimento, marketing, analytics, financeiro e aplicações internas podem trabalhar dentro do mesmo ecossistema. A escolha dos módulos vem depois do diagnóstico.",
    scope: [
      ["Diagnóstico e arquitetura","Mapeamos funil, sistemas atuais, integrações, dados e gargalos antes de escolher quais produtos Zoho entram no projeto."],
      ["CRM e vendas","Estruturamos funil, carteira, atividades, automações, relatórios e critérios comerciais de acordo com a operação."],
      ["Atendimento e pós-venda","Zoho Desk e outras soluções podem organizar filas, SLAs, histórico, suporte e relacionamento com clientes."],
      ["Marketing e jornadas","Conectamos campanhas, automações e dados comerciais quando o processo exige continuidade entre aquisição e vendas."],
      ["Analytics e gestão","Organizamos dados e painéis para reduzir planilhas paralelas e dar visibilidade a operação, carteira e desempenho."],
      ["Integrações e aplicações","Zoho Creator, APIs e integrações permitem conectar ERP, WhatsApp, sistemas internos e fluxos que não cabem no padrão de fábrica."],
      ["Treinamento e operação assistida","Depois da implantação, acompanhamos adoção, ajustes de processo e evolução da plataforma conforme a empresa usa o sistema."],
    ],
    before: ["Sistemas isolados por área","Dados repetidos em planilhas","Retrabalho entre vendas, atendimento e operação","Gestão sem visão consolidada"],
    after: ["Processos desenhados antes da ferramenta","Aplicativos conectados pelo mesmo contexto","Automação entre áreas e menos retrabalho","Mais controle, histórico e capacidade de evolução"],
    extrasTitle: "Do CRM à operação inteira, sem ativar ferramenta por ativar.",
    extrasText: "A Zoho possui dezenas de aplicações. Isso não significa que sua empresa precise de todas. Nosso trabalho é definir o que entra agora, o que pode esperar e como cada módulo conversa com o processo.",
    faq: [
      ["Vocês trabalham só com Zoho CRM?","Não. Podemos trabalhar com CRM, Desk, Analytics, Creator e outros produtos conforme o diagnóstico do projeto."],
      ["Já tenho Zoho, mas está subutilizado. Dá para corrigir?","Sim. Revisamos configuração, funil, módulos, integrações, automações e adoção antes de propor qualquer troca."],
      ["Vocês integram com ERP e sistemas externos?","Quando a API e a arquitetura permitem, sim. A integração é desenhada de acordo com os dados e processos que precisam conversar."],
    ],
    cta: "Quero avaliar meu ecossistema Zoho",
  },
  pipefy: {
    name: "Pipefy",
    eyebrow: "Processos e workflows",
    badge: null,
    hero: "Pare de gerenciar processo importante em planilha, e-mail e memória.",
    subhero: "A Figueira estrutura processos no Pipefy para transformar solicitações, aprovações, filas e rotinas em fluxos com regra, responsável e visibilidade.",
    promise: "Primeiro desenhamos o processo. Depois configuramos a ferramenta.",
    fitTitle: "Pipefy faz sentido quando o trabalho passa por etapas e pessoas diferentes.",
    fitText: "Onboarding, aprovações, solicitações internas, operações financeiras, processos comerciais e rotinas administrativas ganham clareza quando cada etapa deixa de depender de mensagens soltas.",
    scope: [
      ["Mapeamento de processo","Entendemos entrada, etapas, responsáveis, critérios, SLAs, exceções e dados necessários antes de configurar o pipe."],
      ["Configuração e parametrização","Criamos fases, formulários, campos, permissões, regras e visualizações de acordo com o fluxo definido."],
      ["Automações","Configuramos movimentações, alertas, atribuições e ações automáticas para reduzir trabalho manual sem perder controle."],
      ["Integrações","Conectamos Pipefy com CRM, formulários, e-mail, sistemas internos, n8n e outras ferramentas quando o processo exige."],
      ["Indicadores e gestão","Estruturamos informações para enxergar volume, gargalos, tempo de ciclo, pendências e responsáveis."],
      ["Treinamento e evolução","A operação muda. Ajustamos o fluxo conforme uso, volume e novas necessidades aparecem."],
    ],
    before: ["Solicitações chegam por vários canais","Ninguém sabe quem está com a tarefa","Aprovações se perdem em mensagens","Planilhas viram o sistema da empresa"],
    after: ["Entrada organizada por processo","Responsável e próxima etapa visíveis","Regras e aprovações dentro do fluxo","Gestão enxerga volume, atraso e gargalo"],
    extrasTitle: "Processo bem desenhado antes da automação.",
    extrasText: "Pipefy não serve para transformar burocracia ruim em burocracia automática. O projeto começa revisando como o trabalho deveria acontecer.",
    faq: [
      ["Vocês criam o processo do zero?","Podemos mapear e estruturar o processo com a equipe antes da configuração da plataforma."],
      ["Dá para integrar com outros sistemas?","Sim, conforme APIs e necessidade. Podemos usar integrações nativas, APIs ou orquestração externa."],
      ["Vocês dão suporte depois da implantação?","Podemos acompanhar evolução, ajustes, novas automações e expansão para outros processos."],
    ],
    cta: "Quero organizar meus processos",
  },
  hostinger: {
    name: "Hostinger",
    eyebrow: "Parceiro Hostinger",
    badge: "/partners/hostinger-partner-light.png",
    hero: "Seu site precisa continuar funcionando depois que a gente aperta Publicar.",
    subhero: "A Figueira usa o ecossistema Hostinger para construir, migrar, hospedar e manter sites e aplicações com uma base técnica adequada ao projeto.",
    promise: "Hospedagem é só uma parte. O que importa é a operação continuar estável, acessível e administrável.",
    fitTitle: "Hostinger entra quando o projeto precisa de uma base técnica confiável.",
    fitText: "Site institucional, landing page, WordPress, WooCommerce, aplicação própria, VPS, domínio e e-mail podem fazer parte do mesmo desenho, conforme a necessidade do negócio.",
    scope: [
      ["Sites e landing pages","Publicação, hospedagem e operação de páginas institucionais e páginas de conversão."],
      ["WordPress e WooCommerce","Implantação, migração, ajustes técnicos, e-commerce e manutenção quando essa é a stack adequada."],
      ["VPS e aplicações","Ambientes para aplicações, containers, bancos, automações e serviços que precisam de mais controle."],
      ["Domínio e e-mail","Organização de domínio, DNS e e-mail profissional para reduzir dependência de configurações espalhadas."],
      ["Migração","Planejamento e execução da mudança de site, domínio ou infraestrutura com validação antes da virada."],
      ["Manutenção e evolução","Atualizações, correções e suporte técnico para o projeto não ficar abandonado depois da entrega."],
    ],
    before: ["Hospedagem escolhida só pelo menor preço","Site sem responsável técnico","Domínio, DNS e e-mail espalhados","Migração feita sem plano de validação"],
    after: ["Infraestrutura escolhida pelo projeto","Responsabilidade técnica definida","Serviços organizados e documentados","Publicação e migração com processo de validação"],
    extrasTitle: "Você pode contratar a Hostinger pelo link da Figueira.",
    extrasText: "Ao usar nosso link de indicação, você acessa a Hostinger pelo programa de parceiros e pode contratar hospedagem, VPS e outros serviços. A contratação da infraestrutura é separada dos serviços de implantação e gestão da Figueira.",
    externalCta: { label: "Ver Hostinger pelo link da Figueira", href: HOSTINGER_REF },
    faq: [
      ["Vocês cuidam só da hospedagem?","Não. Podemos cuidar da construção, migração, configuração, publicação e manutenção conforme o escopo do projeto."],
      ["Vocês trabalham com VPS?","Sim. Quando a aplicação precisa de mais controle, podemos usar VPS para containers, bancos, automações e outros serviços."],
      ["Posso contratar a Hostinger direto pelo link de vocês?","Sim. O link de indicação leva para a Hostinger. O plano é contratado diretamente com a plataforma, enquanto os serviços da Figueira são combinados separadamente."],
    ],
    cta: "Quero estruturar minha infraestrutura",
  },
};

function LogoBadge({ data }) {
  if (data.badge) return <img src={data.badge} alt={data.eyebrow} className="max-h-16 max-w-[220px] object-contain object-left" />;
  return <div className="font-display font-black text-3xl">{data.name}</div>;
}

function PartnerDetail({ data }) {
  return <div className="bg-white">
    <section className="pt-28 lg:pt-32 pb-16 lg:pb-20 bg-[#F7F6F2] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/stack-digital" className="text-sm text-muted-foreground hover:text-foreground">Stack Digital</Link>
        <div className="mt-10 max-w-5xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-5">{data.eyebrow}</div>
          <h1 className="font-display font-black text-[clamp(2.8rem,5.2vw,5.35rem)] tracking-[-0.055em] leading-[0.9] mb-7">{data.hero}</h1>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">{data.subhero}</p>
          <GreenCTA text={data.cta} size="lg" />
        </div>
      </div>
    </section>

    <section className="py-12 lg:py-14 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <div className="shrink-0"><LogoBadge data={data} /></div>
        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-3xl">{data.promise}</p>
      </div>
    </section>

    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Quando faz sentido</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">{data.fitTitle}</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{data.fitText}</p>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-20 lg:py-28 bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 max-w-4xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">O que entregamos</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">Da estratégia à implantação, sem tratar software como pacote pronto.</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 border-t border-border">
          {data.scope.map(([title,description])=><div key={title} className="py-7 border-b border-border">
            <h3 className="font-display font-black text-2xl mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="py-20 lg:py-28 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 max-w-4xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Antes e depois</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">O ganho aparece quando processo e ferramenta começam a conversar.</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="text-sm uppercase tracking-[0.16em] text-white/40 mb-5">Antes</div>
            <div className="space-y-0 border-t border-white/10">{data.before.map(item=><p key={item} className="py-4 border-b border-white/10 text-white/65">{item}</p>)}</div>
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.16em] text-[#4BDF6A] mb-5">Depois</div>
            <div className="space-y-0 border-t border-white/10">{data.after.map(item=><p key={item} className="py-4 border-b border-white/10 text-white">{item}</p>)}</div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.9fr_1.1fr] gap-10 lg:gap-16">
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">{data.extrasTitle}</h2>
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-7">{data.extrasText}</p>
            {data.externalCta && <a href={data.externalCta.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-semibold text-sm hover:brightness-95 transition-all">{data.externalCta.label}</a>}
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-20 lg:py-28 bg-[#F7F6F2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Perguntas frequentes</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">O que normalmente perguntam antes de começar.</h2>
        </AnimatedSection>
        <div className="border-t border-border">{data.faq.map(([q,a])=><div key={q} className="py-7 border-b border-border grid grid-cols-1 md:grid-cols-[.8fr_1.2fr] gap-4 md:gap-10"><h3 className="font-display font-black text-xl">{q}</h3><p className="text-muted-foreground leading-relaxed">{a}</p></div>)}</div>
      </div>
    </section>

    <section className="py-20 lg:py-24 bg-[#C4191F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 mb-4">Próximo passo</div><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">Vamos entender se {data.name} é a ferramenta certa para o seu processo.</h2></div>
          <GreenCTA text={data.cta} size="lg" />
        </AnimatedSection>
      </div>
    </section>
  </div>
}

export default function StackDigital(){
  const pathname = useLocation().pathname;
  const slug = pathname.split("/").filter(Boolean)[1];
  if (slug && partners[slug]) return <PartnerDetail data={partners[slug]} />;

  return <div className="bg-white">
    <section className="pt-28 lg:pt-32 pb-16 lg:pb-20 bg-[#F7F6F2] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C4191F] mb-5">Stack Digital</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-10 lg:gap-16 items-end">
          <h1 className="font-display font-black text-[clamp(2.8rem,5vw,5.2rem)] tracking-[-0.055em] leading-[0.9]">A ferramenta certa não resolve o processo errado.</h1>
          <div><p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-7">A Figueira desenha a operação e combina as plataformas que realmente precisam conversar. CRM, infraestrutura, automação, mídia e dados entram como partes do mesmo sistema.</p><GreenCTA text="Conversar sobre a sua stack" size="lg" /></div>
        </div>
      </div>
    </section>

    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 max-w-4xl"><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Parcerias em destaque</div><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">Escolhemos o ecossistema pelo problema que precisa ser resolvido.</h2></AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-border">
          {Object.entries(partners).map(([key,p])=><Link key={key} to={`/stack-digital/${key}`} className="py-9 border-b border-border hover:bg-[#F7F6F2] transition-colors px-2">
            <div className="h-14 flex items-center mb-7"><LogoBadge data={p} /></div>
            <h3 className="font-display font-black text-3xl mb-3">{p.name}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xl">{p.subhero}</p>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="py-20 lg:py-24 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.8fr_1.2fr] gap-12">
          <div><div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Tecnologia própria</div><h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">Quando a plataforma pronta não fecha o circuito, construímos a camada que falta.</h2></div>
          <div className="border-t border-white/10"><div className="py-7 border-b border-white/10"><div className="font-display font-black text-3xl mb-3">Harvest<span className="text-[#C4191F]">.</span></div><p className="text-white/55">Operação comercial, leads, histórico, campanhas, integrações e inteligência.</p></div><div className="py-7 border-b border-white/10"><div className="font-display font-black text-3xl mb-3">Kesher<span className="text-[#C4191F]">.</span></div><p className="text-white/55">Tecnologia própria para conectar processos, agentes e fluxos especializados.</p></div></div>
        </AnimatedSection>
      </div>
    </section>
  </div>
}
