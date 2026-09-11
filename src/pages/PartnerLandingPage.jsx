import React from "react";
import { Link, useParams } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";

const RED = "#C4191F";

const pages = {
  kommo: {
    name: "Kommo",
    credential: "Especialista Certificado Kommo CRM no Brasil",
    nav: [
      ["O problema", "problema"],
      ["Metodologia", "metodologia"],
      ["Widgets & IA", "widgets"],
      ["Experiência", "experiencia"],
      ["FAQ", "faq"],
    ],
    badge: "/partners/kommo-partner-light.png",
    badgeAlt: "Badge oficial de parceiro Kommo",
    hero: "Organize, automatize e escale suas vendas no WhatsApp com uma especialista em Kommo CRM.",
    subhero:
      "A Figueira Marketing une implantação personalizada, licenciamento oficial, integrações, telefonia, widgets, automações e agentes de IA. O Kommo é a base da sua operação; nós construímos toda a engenharia comercial ao redor — com experiência acumulada desde a fase em que nossa equipe atuava dentro do ecossistema V4 Company.",
    primary: "Quero organizar minha operação comercial",
    secondary: "Conhecer nossos diferenciais",
    support: [
      "Parceiro homologado e certificado",
      "Suporte técnico dedicado",
      "Implementação sem templates genéricos",
    ],
    sections: [
      {
        id: "problema",
        theme: "soft",
        kicker: "O problema real",
        title: "O seu cliente compra no WhatsApp. O seu comercial ainda se perde nele.",
        intro:
          "Não adianta investir milhares de reais em anúncios se o processo de conversão vaza nas conversas individuais dos vendedores. O gargalo quase nunca aparece no relatório de mídia: ele aparece entre o lead que chegou e o próximo passo que ninguém executou.",
        cards: [
          ["Negociações no celular particular", "O vendedor sai da empresa e leva histórico, contatos e oportunidades embora. A empresa perde memória comercial e continuidade."],
          ["Demora no primeiro contato", "Leads quentes aguardam resposta e compram do concorrente mais rápido. Velocidade de atendimento vira vantagem competitiva."],
          ["Falta de follow-up estruturado", "Vendas ficam paradas por esquecimento, falta de tarefa e ausência de uma rotina automatizada de acompanhamento."],
          ["Gestão no escuro", "Reuniões baseadas em opinião e planilhas paralelas, sem visão confiável de conversão, ciclo, gargalos e previsão."],
        ],
      },
      {
        id: "metodologia",
        kicker: "Metodologia de implementação",
        title: "Uma operação comercial completa em torno do Kommo",
        intro:
          "Não entregamos apenas uma ferramenta configurada; estruturamos uma central contínua de receita. A implantação parte do processo real da empresa e termina em uma operação utilizável, treinada e evolutiva.",
        steps: [
          ["Consultoria e mapeamento de processos", "Diagnóstico aprofundado da jornada de vendas, estruturação dos funis, definição de campos obrigatórios, regras de passagem, responsabilidades, SLA e pontos de automação sob medida para o seu nicho."],
          ["Licenciamento oficial com benefícios", "Adquira suas licenças por meio do parceiro e receba as condições comerciais aplicáveis, incluindo o benefício de mês adicional previsto para elegibilidade, faturamento facilitado e suporte integrado ao projeto."],
          ["Catálogo de widgets e conectores", "Integração com pagamentos, checkout, validadores, consulta de dados, desduplicação, formulários, landing pages, APIs e os sistemas que fazem parte do seu processo comercial."],
          ["Agentes de inteligência artificial", "IA operando dentro do processo para responder dúvidas recorrentes, coletar dados, qualificar, priorizar, resumir conversas e apoiar o agendamento — sem transformar a venda consultiva em atendimento robótico."],
          ["Telefonia VoIP integrada", "Click-to-call, registro de chamadas, gravações vinculadas ao histórico quando aplicável e mais contexto para gestão de produtividade e qualidade comercial."],
          ["Capacitação e treinamento prático", "Treinamento de operação e liderança para assegurar adoção, rotina, disciplina de pipeline e uso real da plataforma no dia a dia."],
        ],
      },
      {
        id: "widgets",
        theme: "dark",
        kicker: "Recursos avançados e widgets exclusivos",
        title: "Ferramentas que multiplicam o poder do seu CRM",
        intro:
          "O Kommo deixa de ser apenas um lugar onde o lead é cadastrado e passa a funcionar como uma camada ativa de execução comercial.",
        cards: [
          ["Voice AI", "Transcrição, resumo de áudios e chamadas, identificação de pontos críticos e próximos passos sugeridos."],
          ["Distribuição inteligente de leads", "Encaminhamento por fila equilibrada, região, unidade, especialidade, disponibilidade ou regra personalizada."],
          ["Gerador de documentos e propostas", "Geração de propostas, contratos e documentos comerciais a partir dos dados já existentes no funil."],
          ["Gatilhos avançados", "Automações no-code para disparar mensagens, alterar responsáveis, criar tarefas e acionar integrações por comportamento ou etapa."],
        ],
      },
      {
        id: "experiencia",
        kicker: "Experiência Figueira",
        title: "Mais de seis anos dentro de CRM, automação e operação comercial — antes mesmo do nome Figueira.",
        intro:
          "A experiência que hoje está na Figueira foi construída na prática, inclusive no período em que a operação atuava como franquia V4 Company. Nesse caminho, trabalhamos com diferentes stacks, CRM, ERP, integrações, remarketing, carrinhos, treinamento e suporte de primeira linha até consolidar uma atuação própria, mais técnica e mais independente de uma única ferramenta.",
        cards: [
          ["Experiência desde 2020", "Mais de seis anos lidando com implantação, integrações, treinamento, suporte e rotina de vendas."],
          ["Reconhecimento e certificações", "A Figueira preserva certificados, badges e reconhecimentos do ecossistema Kommo como prova visual da trajetória e da especialização construída."],
          ["Visão de operação, não só de software", "CRM é tratado junto de mídia, landing page, WhatsApp, automação, dados e processo comercial."],
        ],
        gallery: [
          ["/partners/kommo-certificate-1.jpg", "Certificado Kommo da equipe Figueira"],
          ["/partners/kommo-certificate-2.jpg", "Certificado Kommo da equipe Figueira"],
        ],
      },
      {
        id: "processo",
        theme: "soft",
        kicker: "Da entrada do lead ao fechamento",
        title: "Um único processo comercial, mesmo quando os leads chegam de lugares diferentes.",
        checklist: [
          "WhatsApp e canais de atendimento centralizados",
          "Formulários, landing pages e campanhas conectados",
          "Pipeline estruturado conforme o processo real",
          "Campos e critérios de qualificação",
          "Tarefas e SLA de primeiro atendimento",
          "Follow-ups automáticos e assistidos",
          "Distribuição inteligente entre vendedores",
          "Integrações com checkout, pagamento e ERP",
          "Relatórios e indicadores de conversão",
          "Histórico centralizado da oportunidade",
        ],
      },
      {
        id: "autoridade",
        kicker: "Prova social e autoridade",
        title: "Resultados comprovados por quem vive CRM, vendas e automação diariamente.",
        stats: [
          ["6+ anos", "de experiência prática em CRM, automação, integrações e suporte."],
          ["CRM + IA", "arquitetura unindo atendimento, processo, automação e inteligência."],
          ["Figueira", "experiência própria somada ao repertório construído desde a fase V4 Company."],
        ],
        quote:
          "“A centralização das mensagens e a automação de follow-up mudam a previsibilidade do comercial porque a oportunidade deixa de depender da memória individual do vendedor.”",
      },
      {
        id: "faq",
        theme: "soft",
        kicker: "Perguntas frequentes",
        title: "Antes de implantar, tire as principais dúvidas.",
        faq: [
          ["Já temos WhatsApp e equipe de vendas. A migração é complexa?", "O projeto é conduzido em etapas. Mapeamos contas, canais, contatos, histórico e riscos antes de qualquer virada. O objetivo é preservar a continuidade do atendimento enquanto a operação passa a ser centralizada."],
          ["Por que contratar com um parceiro oficial em vez de assinar direto no site?", "Porque a licença sozinha não desenha processo, funil, regras, integrações, automações, treinamento e governança. O parceiro transforma a plataforma em operação. Benefícios comerciais aplicáveis ao licenciamento também podem ser incorporados conforme elegibilidade."],
          ["A inteligência artificial substitui os vendedores?", "Não. Os agentes podem atuar na triagem, coleta de informações, qualificação, resumo e agendamento. O vendedor permanece nas etapas em que negociação, relacionamento e decisão humana são determinantes."],
          ["Vocês integram o Kommo ao que já usamos?", "Sim, desde que exista viabilidade técnica. Avaliamos APIs, webhooks, conectores e regras do sistema atual antes de definir o escopo."],
        ],
      },
    ],
    closingKicker: "Diagnóstico comercial",
    closingTitle: "Pronto para transformar conversas em receita previsível?",
    closingText:
      "Solicite um diagnóstico comercial com a Figueira e descubra como o Kommo pode blindar o seu processo de vendas, reduzir perda de oportunidades e dar à gestão uma visão real do pipeline.",
    closingCta: "Solicitar diagnóstico comercial",
  },

  pipefy: {
    name: "Pipefy",
    credential: "Consultoria Especializada e Parceiro Oficial Pipefy",
    nav: [
      ["Por que Pipefy", "caos"],
      ["ROI", "roi"],
      ["Áreas", "areas"],
      ["Metodologia", "metodologia"],
      ["FAQ", "faq"],
    ],
    badge: null,
    hero: "Elimine o caos operacional e escale sua empresa com Pipefy e Inteligência Artificial.",
    subhero:
      "A Figueira mapeia, modela e automatiza processos de ponta a ponta. Implementamos workflows no-code e agentes de IA para compras, financeiro, RH, jurídico e operações rodarem com menos gargalos, atrasos, retrabalho e dependência de controles paralelos.",
    primary: "Quero assumir o controle da minha operação",
    secondary: "Ver metodologia de implantação",
    support: [
      "Parceiro oficial certificado",
      "Workflows com IA integrada",
      "Governança e compliance corporativo",
    ],
    sections: [
      {
        id: "caos",
        theme: "soft",
        kicker: "O caos operacional",
        title: "Quanto a desorganização de processos custa para o seu negócio todos os meses?",
        intro:
          "Ferramentas isoladas e processos sem dono criam um labirinto operacional que trava o crescimento da empresa. A equipe trabalha muito, mas uma parte relevante do esforço é gasta cobrando, procurando, digitando novamente e corrigindo o que poderia seguir um fluxo previsível.",
        cards: [
          ["Retrabalho e falhas manuais", "Informações desencontradas em e-mails, mensagens e planilhas geram atrasos, reentrada de dados e custo extra."],
          ["Falta de rastreabilidade e SLA", "Ninguém sabe em qual etapa a solicitação parou, quem deve agir ou qual é o prazo real de entrega."],
          ["Ausência de governança e risco de compliance", "Compras, pagamentos, contratos e solicitações críticas sem alçadas claras expõem a empresa a erros e risco de auditoria."],
        ],
      },
      {
        id: "roi",
        kicker: "Eficiência comprovada e retorno financeiro",
        title: "Automação inteligente com impacto direto na margem de lucro",
        intro:
          "A tese não é “digitalizar por digitalizar”. É reduzir tempo, retrabalho, espera, risco e custo operacional. Os números abaixo são os ganchos de mercado já utilizados na copy-base da página, associados ao estudo Forrester Total Economic Impact citado para a plataforma.",
        stats: [
          ["40%", "de redução média no tempo de execução de solicitações e processos."],
          ["260%", "de ROI alcançado em operações estruturadas segundo o estudo citado."],
          ["< 6 meses", "de payback apresentado na referência utilizada na copy-base."],
        ],
      },
      {
        id: "areas",
        theme: "dark",
        kicker: "Áreas e verticais",
        title: "Workflows inteligentes desenhados para cada departamento da sua empresa",
        cards: [
          ["Compras e Suprimentos — Procure-to-Pay", "Requisições padronizadas, homologação de fornecedores, cotações comparativas, aprovação por alçada e integração com ERP."],
          ["Financeiro — contas a pagar e reembolsos", "Validação de documentos, conferência, aprovação, comprovantes e controles que reduzem risco de duplicidade."],
          ["Recursos Humanos e Departamento Pessoal", "Da abertura da vaga ao onboarding, coleta de documentos, tarefas, responsáveis, prazos e checklists."],
          ["Jurídico e gestão de contratos", "Solicitação, elaboração, revisão, aprovação, assinatura e histórico auditável de versões e decisões."],
          ["Operações", "Demandas recorrentes, exceções, ocorrências e processos internos que precisam de visibilidade e disciplina."],
          ["Portais de autoatendimento", "Colaboradores e áreas solicitantes abrem demandas e acompanham o status sem depender de cobrança por mensagem."],
        ],
      },
      {
        id: "metodologia",
        kicker: "Metodologia de implementação",
        title: "Nossa metodologia para colocar sua operação em alta performance",
        steps: [
          ["Diagnóstico e mapeamento de processos", "Imersão nos fluxos atuais para identificar gargalos, atividades desnecessárias, dependências, exceções, riscos e pontos críticos de perda de tempo."],
          ["Definição de escopo e prioridades", "Metas, SLAs, regras de negócio, responsáveis, indicadores e seleção dos processos que devem entrar primeiro."],
          ["Desenho, modelagem e agentes de IA", "Construção de pipes, formulários, regras, validações, automações e agentes de IA para leitura, triagem, classificação, geração e apoio à decisão."],
          ["Implementação, integração e treinamento", "Validação assistida com usuários reais, conexão com sistemas legados, go-live e capacitação da equipe para sustentar e evoluir os fluxos."],
        ],
      },
      {
        id: "integracoes",
        theme: "soft",
        kicker: "Integrações corporativas e IA",
        title: "O Pipefy conectado ao coração da sua tecnologia",
        intro:
          "Conectamos fluxos do Pipefy a ERPs e sistemas corporativos por meio de APIs, webhooks e automações seguras. O objetivo é impedir que a equipe precise repetir trabalho manual entre plataformas.",
        checklist: [
          "SAP, TOTVS, Oracle e Senior — conforme APIs e escopo",
          "Sistemas bancários e financeiros",
          "Assinatura eletrônica e documentos",
          "BI e analytics",
          "CRM e atendimento",
          "WhatsApp, e-mail e notificações",
          "n8n e automações complementares",
          "APIs internas e sistemas legados",
        ],
        quote:
          "Com Pipefy AI, agentes podem ler documentos, classificar solicitações, apoiar validações, resumir contexto e preparar respostas dentro do fluxo — sem criar uma automação desconectada do processo.",
      },
      {
        id: "experiencia",
        kicker: "Experiência Figueira",
        title: "Processo, CRM e integração fazem parte do repertório da equipe há mais de seis anos.",
        intro:
          "A experiência da Figueira começa antes da marca atual. Na fase em que a operação era franquia V4 Company, a equipe precisava adaptar a stack à realidade de cada cliente, trabalhar com diferentes CRMs e ERPs, integrar marketing e vendas, treinar usuários e oferecer suporte. Essa vivência é aplicada hoje de forma independente na modelagem de processos e automações.",
        cards: [
          ["Visão de ponta a ponta", "O projeto considera demanda, processo, pessoas, dados, sistema e gestão."],
          ["Automação sem perder governança", "Não automatizamos o caos. Primeiro desenhamos o fluxo; depois aceleramos."],
          ["Capacitação e autonomia", "A equipe entende o processo e aprende a operar a solução, evitando dependência desnecessária."],
        ],
      },
      {
        id: "governanca",
        theme: "dark",
        kicker: "Governança operacional",
        title: "O ganho mais poderoso é saber exatamente o que está acontecendo.",
        cards: [
          ["Quem é o responsável?", "Cada etapa, fila ou demanda tem dono e regra clara."],
          ["Qual é o prazo?", "SLAs e alertas tornam atrasos visíveis antes de virarem crise."],
          ["Onde estão os gargalos?", "Dados do processo passam a mostrar espera, volume, retrabalho e capacidade."],
        ],
      },
      {
        id: "faq",
        theme: "soft",
        kicker: "FAQ",
        title: "Perguntas frequentes sobre a implantação.",
        faq: [
          ["Em quanto tempo os primeiros processos começam a rodar?", "A copy-base trabalha com processos prioritários entrando em produção funcional em até 30 dias. O prazo real depende do escopo, do nível de integração e da velocidade de validação da empresa."],
          ["Minha equipe não sabe programar. Conseguiremos manter os processos depois?", "Sim. O Pipefy tem abordagem no-code, e o projeto inclui treinamento de multiplicadores para que a empresa tenha autonomia na operação e em evoluções compatíveis com o escopo."],
          ["É possível integrar o Pipefy ao nosso ERP legado?", "Sim, quando houver viabilidade técnica. Desenhamos integrações para que compras, contratos, pagamentos ou outros dados fluam entre sistemas sem redigitação."],
          ["Vocês ajudam a decidir quais processos automatizar primeiro?", "Sim. Priorização faz parte do diagnóstico. Normalmente começamos onde há maior volume, risco, espera, retrabalho ou impacto financeiro."],
        ],
      },
    ],
    closingKicker: "Assuma o controle",
    closingTitle: "Chega de gerenciar processos críticos na base do improviso.",
    closingText:
      "Descubra como a consultoria da Figueira pode transformar gargalos operacionais em fluxos automatizados, mensuráveis e auditáveis.",
    closingCta: "Falar com especialista e assumir o controle",
  },

  zoho: {
    name: "Zoho",
    credential: "Zoho Advanced & Premium Partner no Brasil",
    nav: [
      ["Ecossistema", "ecossistema"],
      ["Soluções Zoho", "modulos"],
      ["Integração ERP", "erp"],
      ["IA", "ia"],
      ["FAQ", "faq"],
    ],
    badge: "/partners/zoho-partner.png",
    badgeAlt: "Zoho Partner",
    hero: "Aumente suas vendas e elimine o esforço manual integrando o ecossistema Zoho com automações e IA.",
    subhero:
      "Da arquitetura comercial à operação contínua. A Figueira implementa Zoho CRM, Desk, Analytics, Books, Creator e outros módulos conectados ao seu ERP e aos sistemas que já fazem parte da empresa. Mais de seis anos de experiência prática em CRM, processos, integrações e suporte aplicados à transformação da operação.",
    primary: "Solicitar diagnóstico com especialista",
    secondary: "Conhecer aplicativos e módulos",
    support: [
      "Zoho Partner",
      "Integração bidirecional com ERPs",
      "IA e automações sob medida",
    ],
    sections: [
      {
        id: "ecossistema",
        theme: "soft",
        kicker: "A tese do sistema operacional único",
        title: "Todos os seus setores trabalhando sobre uma única base de dados",
        intro:
          "A maioria das empresas sofre com fragmentação tecnológica: marketing usa uma ferramenta, vendas outra, atendimento outra e o financeiro não conversa com o pós-venda. O ecossistema Zoho permite reunir funções críticas da organização em uma arquitetura muito mais conectada.",
        cards: [
          ["Um ecossistema integrado", "Vendas, atendimento, dados, documentos e finanças com menos remendos entre sistemas."],
          ["Processos desenhados antes do software", "A Figueira estrutura regras de negócio, fluxos e contratos de dados antes de parametrizar os campos."],
          ["Redução significativa de TCO", "A copy-base trabalha com economia potencial de 45% a 75% no custo total frente a múltiplas ferramentas isoladas, dependendo da composição contratada."],
        ],
      },
      {
        id: "modulos",
        kicker: "Principais módulos",
        title: "Aplicativos integrados que movem os departamentos da sua empresa",
        cards: [
          ["Zoho CRM — vendas e receita", "Pipeline, forecast, metas, distribuição de leads, automações, histórico e inteligência para priorização comercial."],
          ["Zoho Desk — atendimento e suporte", "Central omnichannel, SLA, automações de tickets, base de conhecimento e visão do cliente para pós-venda."],
          ["Zoho Analytics — BI e dados", "Dashboards com cruzamento de dados de marketing, CRM, atendimento e faturamento."],
          ["Zoho Books — finanças e faturamento", "Rotinas financeiras, contas a pagar e receber, conciliação e integração com o processo comercial conforme aderência local."],
          ["Zoho Creator — aplicações sob demanda", "Low-code para portais, ferramentas internas e fluxos que não existem prontos no mercado."],
          ["Zoho One e demais aplicações", "Arquitetura ampliada conforme necessidade real — sem transformar a consultoria numa simples venda de licenças."],
        ],
      },
      {
        id: "erp",
        theme: "dark",
        kicker: "Integração com ERP e sistemas legados",
        title: "O Zoho conectado ao ERP que você já utiliza",
        intro:
          "Conectar CRM e ERP não é um projeto isolado de TI: é uma decisão estratégica de arquitetura de receita. Estabelecemos fluxos controlados para sincronizar cadastros, preços, pedidos, faturamento e dados operacionais sem retrabalho.",
        cards: [
          ["ERPs", "TOTVS Protheus, SAP Business One, Sankhya, CIGAM, Senior e outros — conforme APIs e viabilidade técnica."],
          ["Canais de comunicação", "WhatsApp Business API, e-mail corporativo, telefonia e canais digitais conectados à jornada do cliente."],
          ["Financeiro e documentos", "Boletos, PIX, conciliação, documentos fiscais e fluxos financeiros podem ser integrados conforme o escopo."],
        ],
      },
      {
        id: "ia",
        kicker: "Extensões e inteligência artificial",
        title: "Acelere seus resultados com automações e ferramentas desenvolvidas para a sua operação",
        cards: [
          ["Automação para WhatsApp", "Registro de contexto, atualização de oportunidades e regras comerciais acionadas pelas interações do cliente."],
          ["Agentes de IA para vendas e qualificação", "Qualificação, enriquecimento, priorização por ICP, resumo e apoio ao atendimento."],
          ["Automação financeira", "Fluxos de cobrança, conciliação e ações operacionais integradas aos módulos e sistemas compatíveis."],
          ["Backup e governança", "Rotinas de proteção, exportação, redundância e controles adequados ao nível de criticidade dos dados."],
        ],
      },
      {
        id: "metodologia",
        theme: "soft",
        kicker: "Escopo de atuação",
        title: "Da consultoria inicial à operação continuada",
        steps: [
          ["Diagnóstico estratégico", "Entendimento dos processos operacionais, sistemas existentes, objetivos e arquitetura de dados."],
          ["Implementação especializada", "Parametrização dos módulos, permissões, regras, layouts, automações e governança ajustadas ao negócio."],
          ["Migração segura de dados", "Higienização, desduplicação, mapeamento de campos e carga estruturada de contas, contatos, negócios e históricos."],
          ["Treinamento e capacitação", "Treinamentos práticos por módulo e perfil de usuário para transformar tecnologia em rotina."],
          ["Suporte técnico contínuo", "Acompanhamento, sustentação e evolução para manter a operação estável e adaptar os fluxos conforme a empresa amadurece."],
        ],
      },
      {
        id: "experiencia",
        kicker: "Experiência que vem de antes da Figueira",
        title: "Mais de seis anos implementando CRM, integração, automação, treinamento e suporte em operações reais.",
        intro:
          "A base da Figueira foi construída também no período de franquia V4 Company, quando nossa equipe precisou conviver com diferentes stacks e adaptar CRM, ERP, automações, remarketing, carrinhos e integrações ao contexto de cada cliente. Essa experiência foi trazida para uma consultoria própria, hoje capaz de pensar Zoho como ecossistema e não como produto isolado.",
        cards: [
          ["Arquitetura", "Escolha dos módulos pelo problema, não pelo catálogo."],
          ["Implementação", "Configuração, migração, integração, automação e treinamento."],
          ["Evolução", "Suporte e melhoria contínua conforme novos processos entram no ecossistema."],
        ],
      },
      {
        id: "unificacao",
        theme: "dark",
        kicker: "Antes e depois",
        title: "De várias ferramentas que não se falam para uma operação em que o dado acompanha o cliente.",
        cards: [
          ["Antes", "Planilhas paralelas, dados duplicados, cadastros divergentes, integrações frágeis e relatórios que precisam ser reconciliados manualmente."],
          ["Depois", "Processos desenhados, dados sincronizados, áreas conectadas, automações controladas e visão mais consistente da jornada do cliente."],
        ],
      },
      {
        id: "faq",
        theme: "soft",
        kicker: "FAQ",
        title: "Perguntas frequentes sobre Zoho.",
        faq: [
          ["Como saber quais aplicativos do Zoho minha empresa deve contratar?", "O diagnóstico avalia dores, processos, integrações e retorno esperado para recomendar apenas os módulos que façam sentido para a arquitetura."],
          ["Já possuímos um CRM antigo. O histórico de vendas é mantido?", "O projeto pode incluir higienização e migração de contas, contatos, negócios e históricos, respeitando a qualidade e a disponibilidade dos dados de origem."],
          ["A consultoria oferece suporte após a implementação?", "Sim. A Figueira pode atuar na sustentação, evolução de fluxos, ajustes de integração e apoio técnico após o go-live."],
          ["Precisamos trocar o ERP?", "Não necessariamente. O objetivo é avaliar se o Zoho deve substituir, complementar ou se integrar ao ambiente atual."],
        ],
      },
    ],
    closingKicker: "Arquitetura Zoho",
    closingTitle: "Pronto para transformar sua operação com o ecossistema Zoho e IA?",
    closingText:
      "Converse com a Figueira e receba um plano claro de arquitetura, módulos, integração, migração e implementação para sua empresa.",
    closingCta: "Falar com um especialista agora",
  },

  hostinger: {
    name: "Hostinger",
    credential: "Agência e Parceiro Homologado Hostinger Brasil",
    nav: [
      ["Infraestrutura", "infra"],
      ["VPS & Soluções", "solucoes"],
      ["Ativação", "ativacao"],
      ["Parceria", "parceria"],
      ["FAQ", "faq"],
    ],
    badge: "/partners/hostinger-partner-light.png",
    badgeAlt: "Badge oficial Hostinger Partner",
    hero: "Infraestrutura de alta performance e blindagem digital para sites que vendem todos os dias.",
    subhero:
      "Não deixe o faturamento da sua empresa nas mãos de hospedagens amadoras. Como parceiro Hostinger, a Figueira estrutura hospedagem, VPS, e-mail corporativo, domínio, migração, WordPress, WooCommerce, automações e aplicações com acompanhamento técnico e visão de negócio.",
    primary: "Quero minha infraestrutura de alta performance",
    secondary: "Ver soluções técnicas e VPS",
    support: [
      "Condições via parceiro",
      "Infraestrutura para sites e VPS",
      "Acompanhamento técnico Figueira",
    ],
    sections: [
      {
        id: "problema",
        theme: "soft",
        kicker: "O problema da infraestrutura comum",
        title: "Não adianta investir em tráfego se a sua página não carrega",
        intro:
          "Velocidade, estabilidade, DNS, e-mail e segurança afetam diretamente a experiência do usuário e a capacidade da operação digital de funcionar. A infraestrutura pode não aparecer no anúncio, mas aparece no resultado quando falha.",
        cards: [
          ["Página lenta que espanta clientes", "Cada segundo extra aumenta fricção, abandono e desperdício do tráfego que você pagou para gerar."],
          ["Quedas em momentos críticos", "Picos de campanha, lançamento ou acesso podem expor ambientes mal dimensionados e interromper a conversão."],
          ["E-mails corporativos que caem no spam", "SPF, DKIM, DMARC, DNS e reputação precisam ser tratados corretamente para melhorar a entregabilidade."],
        ],
      },
      {
        id: "infra",
        kicker: "Pilares de infraestrutura de elite",
        title: "Tecnologia global para sustentar a escala do seu negócio",
        cards: [
          ["Velocidade com LiteSpeed e CDN", "Ambientes otimizados para reduzir tempo de resposta, melhorar experiência e sustentar páginas comerciais."],
          ["Isolamento de recursos em VPS", "Memória, CPU, armazenamento e controle adequados para aplicações que não devem dividir recursos com o site institucional."],
          ["Blindagem e segurança ativa", "SSL, HTTPS, proteção, firewall, backups e restauração fazem parte da arquitetura de continuidade."],
          ["E-mail corporativo", "Contas personalizadas no domínio, com configuração técnica adequada e identidade profissional."],
          ["Suporte em português", "A infraestrutura da operadora é combinada com o acompanhamento da Figueira no escopo contratado."],
          ["DNS e domínio organizados", "Configuração coerente para site, e-mail, verificação, APIs e serviços que dependem do domínio."],
        ],
      },
      {
        id: "solucoes",
        theme: "dark",
        kicker: "Aplicações e soluções gerenciadas",
        title: "Ambientes customizados para cada modelo de projeto digital",
        cards: [
          ["Sites institucionais e landing pages", "Estrutura preparada para campanhas, captação de leads, páginas de venda e presença institucional."],
          ["Lojas virtuais e WooCommerce", "Cache, banco e recursos dimensionados para checkout, catálogo e transações."],
          ["VPS para automação e IA", "Docker, n8n, webhooks, APIs, agentes, bancos e serviços contínuos sem sobrecarregar o site principal."],
          ["Migração assistida", "Transferência planejada de arquivos, banco, domínio, DNS e e-mail com foco em continuidade da operação."],
        ],
      },
      {
        id: "ativacao",
        kicker: "Ativação em 3 passos",
        title: "Sua empresa com presença blindada em até 24 horas nos projetos compatíveis com ativação rápida",
        steps: [
          ["Contrate com condições de parceiro", "Acesse a contratação pelo canal indicado pela Figueira e aplique as condições comerciais disponíveis para o plano escolhido."],
          ["Envie os dados da aplicação", "Domínio, acessos, caixas postais, dependências e informações técnicas necessárias para migração ou setup."],
          ["Ativação e otimização técnica", "Configuração de DNS, certificados, ambiente, publicação e ajustes previstos no escopo contratado."],
        ],
      },
      {
        id: "parceria",
        theme: "soft",
        kicker: "Parceiro Hostinger",
        title: "A parceria existe para gerar vantagem prática — não para decorar a página com um selo.",
        intro:
          "A Figueira utiliza a parceria para orientar contratação, estruturar ambientes e conectar a infraestrutura ao restante da operação digital. Sites, campanhas, automação, CRM e IA deixam de ser ilhas.",
        cards: [
          ["Hospedagem e domínio", "Escolha de ambiente e configuração alinhadas ao projeto."],
          ["VPS e aplicações", "Arquitetura para serviços contínuos, Docker, n8n, bancos, APIs e agentes."],
          ["Link e condição de parceiro", "A contratação pode ser direcionada pelo canal de parceiro da Figueira, conforme oferta disponível no momento."],
        ],
      },
      {
        id: "experiencia",
        kicker: "Experiência Figueira",
        title: "Mais de seis anos conectando marketing, site, CRM, automação e infraestrutura.",
        intro:
          "A experiência vem da prática de operar clientes, inclusive no período de franquia V4 Company, em que marketing e vendas exigiam integração com CRM, ERP, páginas, rastreamento, carrinhos e automações. Hoje essa visão permite que a Figueira trate hospedagem e VPS como parte da arquitetura de negócio, não como item isolado de TI.",
        checklist: [
          "WordPress e WooCommerce",
          "Landing pages e campanhas",
          "VPS para n8n e automação",
          "Docker e serviços persistentes",
          "APIs e webhooks",
          "DNS, domínio e e-mail",
          "CRM e integrações",
          "Ambientes para agentes de IA",
        ],
      },
      {
        id: "faq",
        theme: "soft",
        kicker: "FAQ",
        title: "Dúvidas comuns antes de migrar ou contratar.",
        faq: [
          ["Por que contratar através da agência parceira e não direto na operadora?", "Porque além da condição comercial eventualmente disponível, você pode ter orientação sobre o ambiente adequado, configuração, DNS, migração e integração com o projeto digital."],
          ["Eu já tenho um site funcionando em outro provedor. É possível migrar?", "Sim. O projeto pode abranger arquivos, banco, WordPress, DNS, e-mail e demais dependências, com planejamento para reduzir indisponibilidade."],
          ["Preciso de conhecimento técnico para gerenciar os servidores?", "Não necessariamente. A Figueira pode assumir a configuração e a gestão técnica previstas no escopo para que a equipe do cliente foque no negócio."],
          ["VPS serve apenas para sites?", "Não. Ela pode sustentar automações, n8n, APIs, webhooks, bancos, aplicações, serviços de IA e outros componentes que precisam ficar ativos continuamente."],
        ],
      },
    ],
    closingKicker: "Infraestrutura profissional",
    closingTitle: "Sua presença digital levada ao próximo nível.",
    closingText:
      "Garanta estabilidade, velocidade, organização técnica e acompanhamento especializado com uma equipe que entende a infraestrutura dentro da operação completa de marketing, vendas e tecnologia.",
    closingCta: "Contratar infraestrutura profissional via WhatsApp",
  },
};

function Section({ section }) {
  const dark = section.theme === "dark";
  const soft = section.theme === "soft";
  const background = dark ? "bg-[#111111] text-white" : soft ? "bg-[#F7F6F2]" : "bg-white";
  const muted = dark ? "text-white/65" : "text-muted-foreground";
  const border = dark ? "border-white/10" : "border-border";

  return (
    <section id={section.id} className={"scroll-mt-36 py-20 lg:py-28 border-t " + border + " " + background}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: RED }}>
            {section.kicker}
          </div>
          <h2 className="font-display font-black text-[clamp(2.25rem,4.4vw,4.35rem)] tracking-[-0.052em] leading-[0.94] max-w-5xl">
            {section.title}
          </h2>
          {section.intro && <p className={"text-lg lg:text-xl leading-relaxed max-w-4xl mt-6 " + muted}>{section.intro}</p>}
        </AnimatedSection>

        {section.cards && (
          <div className={"grid grid-cols-1 md:grid-cols-2 " + (section.cards.length % 3 === 0 ? "lg:grid-cols-3" : "") + " gap-px mt-12 border " + border + " " + (dark ? "bg-white/10" : "bg-border")}>
            {section.cards.map(([title, description]) => (
              <div key={title} className={(dark ? "bg-[#111111]" : "bg-white") + " p-7 lg:p-8 min-h-[210px]"}>
                <h3 className="font-display font-black text-xl lg:text-2xl tracking-[-0.025em]">{title}</h3>
                <p className={"leading-relaxed mt-3 " + muted}>{description}</p>
              </div>
            ))}
          </div>
        )}

        {section.steps && (
          <div className={"mt-12 border-t " + border}>
            {section.steps.map(([title, description], index) => (
              <div key={title} className={"grid grid-cols-[48px_1fr] md:grid-cols-[70px_.75fr_1.25fr] gap-4 md:gap-8 py-7 border-b " + border}>
                <div className="font-mono text-[10px] pt-1" style={{ color: RED }}>{String(index + 1).padStart(2, "0")}</div>
                <h3 className="font-display font-black text-xl md:text-2xl tracking-[-0.025em]">{title}</h3>
                <p className={"leading-relaxed col-start-2 md:col-start-auto " + muted}>{description}</p>
              </div>
            ))}
          </div>
        )}

        {section.checklist && (
          <div className={"grid grid-cols-1 md:grid-cols-2 gap-x-10 mt-12 border-t " + border}>
            {section.checklist.map((item) => (
              <div key={item} className={"flex gap-3 py-5 border-b " + border}>
                <span className="font-black" style={{ color: RED }}>✓</span>
                <span className={dark ? "text-white/80" : "text-foreground/80"}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {section.stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {section.stats.map(([number, label]) => (
              <div key={number} className={"pt-5 border-t-4 " + border} style={{ borderTopColor: RED }}>
                <div className="font-display font-black text-4xl lg:text-5xl tracking-[-0.04em]">{number}</div>
                <p className={"mt-3 leading-relaxed " + muted}>{label}</p>
              </div>
            ))}
          </div>
        )}

        {section.quote && (
          <blockquote className={"max-w-5xl text-2xl lg:text-3xl font-display font-bold tracking-[-0.025em] leading-[1.25] mt-12 pl-6 border-l-4 " + (dark ? "text-white" : "text-foreground")} style={{ borderLeftColor: RED }}>
            {section.quote}
          </blockquote>
        )}

        {section.gallery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {section.gallery.map(([src, alt]) => (
              <div key={src} className="bg-white border border-border rounded-[22px] p-3 overflow-hidden">
                <img src={src} alt={alt} className="w-full h-auto rounded-[14px] object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {section.faq && (
          <div className={"mt-10 border-t " + border}>
            {section.faq.map(([question, answer]) => (
              <details key={question} className={"group py-6 border-b " + border}>
                <summary className="font-display font-black text-lg md:text-xl cursor-pointer list-none flex items-start justify-between gap-6">
                  <span>{question}</span>
                  <span className="text-2xl leading-none transition-transform group-open:rotate-45" style={{ color: RED }}>+</span>
                </summary>
                <p className={"leading-relaxed max-w-4xl mt-4 pr-10 " + muted}>{answer}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PartnerLogo({ page }) {
  if (page.badge) {
    return <img src={page.badge} alt={page.badgeAlt || page.credential} className="max-h-28 max-w-[86%] object-contain" />;
  }
  return (
    <div className="font-display font-black text-5xl lg:text-6xl tracking-[-0.06em]">
      {page.name}<span style={{ color: RED }}>.</span>
    </div>
  );
}

export default function PartnerLandingPage() {
  const { partner } = useParams();
  const page = pages[partner];

  if (!page) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-black text-5xl">Parceria não encontrada.</h1>
        <Link to="/stack-digital" className="inline-flex mt-8 text-[#C4191F] font-semibold">Voltar para Stack Digital</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="pt-[80px]">
        <div className="bg-[#111111] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center text-center">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/75">{page.credential}</span>
          </div>
        </div>

        <div className="border-b border-border bg-white/95 backdrop-blur-xl sticky top-[72px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[60px] flex items-center gap-4">
            <Link to="/stack-digital" className="hidden md:inline-flex text-sm font-semibold mr-auto">Stack Digital</Link>
            <div className="flex-1 md:flex-none overflow-x-auto">
              <nav className="flex items-center gap-1 min-w-max">
                {page.nav.map(([label, anchor]) => (
                  <a key={anchor} href={"#" + anchor} className="px-3 py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground whitespace-nowrap">
                    {label}
                  </a>
                ))}
              </nav>
            </div>
            <GreenCTA text="Falar com especialista" size="sm" className="hidden sm:inline-flex" />
          </div>
        </div>
      </div>

      <section className="py-16 lg:py-24 bg-[#F7F6F2] border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.14fr_.86fr] gap-12 lg:gap-16 items-center">
          <AnimatedSection>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] mb-5" style={{ color: RED }}>{page.credential}</div>
            <h1 className="font-display font-black text-[clamp(2.75rem,5.6vw,5.65rem)] tracking-[-0.058em] leading-[0.89] max-w-5xl">
              {page.hero}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mt-7">{page.subhero}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <GreenCTA text={page.primary} size="lg" />
              <a href={"#" + page.nav[0][1]} className="inline-flex items-center justify-center px-7 py-4 min-h-[56px] rounded-lg border border-black/15 bg-white font-semibold text-sm hover:bg-black/[0.03] transition-colors">
                {page.secondary}
              </a>
            </div>
            <div className="flex flex-wrap gap-2 mt-7">
              {page.support.map((item) => (
                <span key={item} className="px-3 py-2 bg-white border border-border rounded-full text-xs font-semibold text-foreground/65">{item}</span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="relative bg-white min-h-[360px] lg:min-h-[480px] border border-border rounded-[28px] flex items-center justify-center p-10 overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,.08)]">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(17,17,17,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,17,.35) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
              <div className="relative text-center w-full">
                <PartnerLogo page={page} />
                <div className="mt-10 pt-7 border-t border-border">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: RED }}>Experiência aplicada</div>
                  <p className="font-display font-black text-xl lg:text-2xl tracking-[-0.025em] mt-3">
                    Mais de 6 anos estruturando CRM, automação, integrações, treinamento e operação.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {page.sections.map((section) => <Section key={section.id} section={section} />)}

      <section id="contato" className="scroll-mt-28 py-20 lg:py-24 bg-[#C4191F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 mb-4">{page.closingKicker}</div>
              <h2 className="font-display font-black text-[clamp(2.5rem,4.8vw,4.8rem)] tracking-[-0.052em] leading-[0.93] max-w-5xl">{page.closingTitle}</h2>
              <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-3xl mt-5">{page.closingText}</p>
            </div>
            <GreenCTA text={page.closingCta} size="lg" />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
