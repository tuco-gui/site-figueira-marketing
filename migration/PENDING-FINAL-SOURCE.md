# Consult — pendências que dependem de fonte final do cliente

Data: 10/10/2026

## Situação

A versão candidata standalone está tecnicamente buildável e passou pelo QA automático. O arquivo localizado no Drive, **“Guia de conteúdo do site — Consult.pdf” (01/10/2026)**, confirma a arquitetura, os serviços, parâmetros de Engenharia Clínica e várias referências técnicas, mas não contém a fonte posterior citada no retorno final de 09/10 como **“Conteúdo pronto para o site”**.

A fonte ausente não será reconstruída por inferência.

## Pendências literais

### 1. Física Médica — Controle de Qualidade

Já concluído:
- página índice de Controle de Qualidade;
- 10 modalidades acessíveis;
- referências IN 90–97 organizadas por modalidade;
- densitometria sem IN específica;
- contratos/programas recorrentes publicados;
- páginas sem exemplos fictícios de laudo.

Falta somente a fonte final para:
- lista exata de testes de cada modalidade;
- FAQ específica de cada modalidade;
- conferência literal de qualquer texto técnico que o retorno de 09/10 mande copiar da aba final.

### 2. Proteção Radiológica

Já concluído:
- silo canônico em `/protecao-radiologica/...`;
- redirects das rotas antigas;
- PPR, levantamento radiométrico, projeto de blindagem, treinamentos e licenciamento;
- Treinamentos comunica EAD e presencial sob medida;
- Licenciamento deixa claro que a aprovação depende da autoridade sanitária.

Falta somente:
- conferência literal do texto final de Treinamentos;
- conferência literal do texto final de Licenciamento Sanitário.

### 3. Página institucional

Já concluído:
- página Sobre;
- história “Desde 1995”;
- Física Médica desde 2013;
- estrutura de atuação e sedes/atendimento conforme retorno final;
- catálogo de serviços e menu único.

Falta:
- **formação exata de Matheus Alvarez**, na redação aprovada pelo cliente.

Não publicar título profissional, registro ou formação por inferência.

### 4. Formulário e privacidade

Já concluído:
- formulário funcional;
- confirmação em tela;
- armazenamento de origem/UTM/serviço;
- pré-cadastro antes do WhatsApp;
- e-mail de destino `radiometria@consult.med.br`;
- Política de Privacidade;
- consentimento preparado para quando houver tags não essenciais.

Falta apenas, se a aba final realmente trouxer uma especificação literal:
- conferência dos nomes/ordem dos campos;
- conferência literal da Política de Privacidade.

A funcionalidade não depende dessa fonte.

## Pendências externas que não são de conteúdo

- backup integral da HostGator antes do cutover;
- acesso de hospedagem para executar o backup/publicação;
- aceite final da Consult;
- eventual entrega do código em repositório separado, caso seja exigido;
- IDs finais de GA4/GTM/Meta quando aplicável.

## O que NÃO deve ser reaberto

Não reabrir itens já validados apenas porque a fonte final está ausente:

- aplicação standalone;
- rotas sem prefixo `/consult`;
- 46 artigos históricos migrados;
- 46 redirects individuais;
- SEO técnico;
- sitemap;
- captura de leads;
- Política de Privacidade funcional;
- menu e catálogo;
- normas IN 90–97;
- remoção de nomes de analisadores das páginas técnicas;
- remoção de linguagem editorial interna.

## Gate de publicação

A ausência da fonte final deve ser tratada como uma pendência objetiva de validação, não como justificativa para refazer o projeto.

Quando a fonte for recebida:
1. comparar apenas os quatro grupos acima;
2. aplicar diferenças;
3. rodar `npm run build`;
4. exigir `[consult-qa] OK`;
5. liberar para aceite final;
6. só então seguir o runbook de cutover.
