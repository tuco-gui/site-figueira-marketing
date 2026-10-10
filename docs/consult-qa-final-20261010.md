# Consult — QA final da rodada Matheus

Data: 10/10/2026  
Branch: `consult-matheus-final-20261010`  
HEAD validado: `75fc9aa1937ac3d4e56afb64b2dc8e52e7db62be`

## Regra de aceite

Fontes em ordem de precedência:
1. Correções e decisões — 09/10/2026 — FINAL
2. Ajustes do vídeo — 08/10/2026
3. Guia de conteúdo — 01/10/2026, apenas onde não conflita

A Home aprovada é a referência visual. Não foi criado um design system paralelo.

## PASS — Código e conteúdo

- [x] Home preservada visualmente.
- [x] "Por que escolher a Consult?" permanece antes de "Nossas áreas de atuação".
- [x] Navegação com acesso por área e por serviço.
- [x] Catálogo `/consult/servicos` reconstruído no padrão visual da Home.
- [x] 5 páginas de Consult Engenharia Clínica implementadas.
- [x] Faixa de verificação independente usa a decisão final: manutenção preventiva é permitida; manutenção corretiva e venda de peças não.
- [x] Arkmeds removido do código ativo.
- [x] Nomes de analisadores removidos do código ativo.
- [x] Rastreabilidade apresentada como RBC / RBC-Inmetro sem afirmar acreditação ISO 17025 da Consult.
- [x] "Desde 1995" e texto institucional "Fundada em 1995..." aplicados.
- [x] Telefone/WhatsApp, e-mail, endereço, horário e cobertura atualizados.
- [x] Home sem CNEN/CFM como selo institucional.
- [x] Prazo de laudo: até 7 dias após as medições.
- [x] Índice geral de Controle de Qualidade com 10 modalidades.
- [x] Cards genéricos "Funcionamento / Imagem / Exposição / Laudo" removidos das modalidades.
- [x] FAQ genérica de CQ removida.
- [x] Laudos/tabelas fictícias removidos; substituídos por "O que o laudo traz".
- [x] Programas recorrentes de Física Médica incluídos.
- [x] Concentrador de oxigênio incluído sem inventar parâmetros ausentes da fonte final.
- [x] Termodesinfectora em página própria.
- [x] "Estufa de esterilização" removida.
- [x] Fluxômetro/manômetro tratados sem selo de TSE.
- [x] Qualificação térmica usa ISO 17665 / ISO 15883 / IEC 61010 conforme aplicabilidade.
- [x] Proteção Radiológica em rotas canônicas próprias.
- [x] Treinamentos: EAD + presencial sob medida.
- [x] Licenciamento: apoio técnico/documental, sem promessa de aprovação.
- [x] Página Sobre identifica Matheus Alvarez sem inventar formação ou registro.
- [x] Regionais genéricas retiradas da versão candidata.
- [x] Blog prefere a versão integral migrada quando o backend devolver resumo legado.
- [x] Aviso público de "publicação original" removido após disponibilidade da versão integral local.
- [x] Normalização de quebras de linha literais no Blog.
- [x] Política de Privacidade disponível.
- [x] Matheus Alvarez e Amanda indicados nos contatos LGPD conforme decisão final.
- [x] Formulário registra nome, e-mail, telefone, instituição, assunto, mensagem, origem, página, referrer e UTM.
- [x] Confirmação de envio aparece na tela.
- [x] WhatsApp captura nome/telefone antes de abrir a conversa.
- [x] Leads gravados em `site_leads` e enviados para `radiometria@consult.med.br`.
- [x] Homologação permanece `noindex, nofollow`.
- [x] Título/description/OG/canonical são pré-renderizados nas rotas testadas.
- [x] Scripts/componentes legados órfãos removidos da branch.
- [x] Script legado que sobrescrevia a imagem da Home removido.

## PASS — Varredura de termos proibidos

Código ativo verificado sem ocorrências relevantes de:
- Arkmeds
- Safetest
- Rigel
- Waller
- Lown
- Harrison
- Luft
- Otto
- "não fazemos conserto"
- "não conserta"
- "mais de 15 anos"
- telefone antigo 99671-0677
- "Medição específica do equipamento"
- "estufa de esterilização"
- "informada pela Consult"
- "indicada pela Consult"
- "material da Consult"
- "a página não promete"
- "escopo confirmado"
- "calibração acreditada"
- "laboratório acreditado"
- "Novo site"

## PASS — Rotas testadas no preview READY anterior

Todas responderam HTTP 200:
- 5/5 serviços de Engenharia Clínica.
- 10/10 modalidades de Controle de Qualidade.
- 5/5 serviços de Proteção Radiológica.
- 16/16 páginas de equipamentos testadas.
- Home, Serviços e Blog também responderam 200.

Nenhuma rota canônica testada caiu em "Serviço não encontrado".

## PASS — CI do HEAD atual

GitHub Actions no HEAD atual:
- Build: SUCCESS.
- Consult final QA / build-and-screenshot: SUCCESS.
- GitGuardian Security Checks: SUCCESS — nenhum secret detectado.

Artefato visual:
- `consult-final-qa-screenshots`
- Desktop: Serviços, CQ, Fluoroscopia, Engenharia Clínica, Preventiva.
- Mobile: Serviços, Fluoroscopia.

Revisão visual manual:
- Serviços desktop: PASS.
- CQ desktop: PASS.
- Fluoroscopia desktop: PASS.
- Engenharia Clínica desktop: PASS.
- Preventiva desktop: PASS.
- Serviços mobile: PASS.
- Fluoroscopia mobile: PASS.

## BLOQUEADO — dependência documental do cliente

### Formação de Matheus Alvarez
O documento final autoriza nome + formação, mas a formação exata não foi encontrada nas fontes disponíveis.  
Decisão aplicada: publicar o nome como responsável técnico sem inventar formação e sem número de registro.

### Aba "Conteúdo pronto para o site"
O documento final de 09/10 cita essa aba como fonte literal para:
- listas exatas de testes das modalidades;
- FAQs finais;
- parâmetros técnicos adicionais;
- formação de Matheus;
- textos literais de alguns serviços/formulário/política.

A aba não está disponível entre os arquivos recebidos nem foi encontrada no Drive.  
Decisão aplicada: não inventar conteúdo. Onde a fonte final falta, publicar apenas informação suportada pelas fontes já aprovadas.

## BLOQUEADO — infraestrutura de preview

Vercel Hobby atingiu o limite diário de mais de 100 deployments em 10/10/2026.

Impacto:
- não foi possível gerar um novo preview do HEAD final após a limpeza dos scripts legados;
- não é falha de build: GitHub Actions compilou e executou o QA visual do HEAD com sucesso;
- preview anterior READY foi usado para smoke tests das páginas técnicas.

Próxima ação quando a cota resetar:
1. gerar um único preview do HEAD atual;
2. smoke test final de Home + Serviços + Engenharia Clínica + CQ + Blog;
3. manter `noindex, nofollow`.

## NÃO EXECUTADO — gate de publicação

Não executado nesta rodada:
- merge para `main`;
- publicação no domínio oficial `consult.med.br`;
- remoção de `noindex`;
- troca de canonical para o domínio oficial;
- ativação de sitemap oficial;
- Search Console;
- GA4/GTM;
- migração HostGator;
- redirects 301 de produção.

Essas ações pertencem ao go-live e continuam protegidas por aprovação explícita.

## Resultado da rodada

**Código candidato: APROVADO tecnicamente e visualmente dentro das fontes disponíveis.**

Pendências antes do aceite técnico literal do cliente:
1. receber a aba "Conteúdo pronto para o site";
2. receber a formação exata de Matheus Alvarez;
3. gerar novo preview quando a cota Vercel resetar e repetir o smoke test final.

Não marcar o projeto como publicado/concluído enquanto esses gates não forem resolvidos.
