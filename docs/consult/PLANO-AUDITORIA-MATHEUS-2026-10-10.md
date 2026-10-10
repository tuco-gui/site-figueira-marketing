# CONSULT — plano operacional próprio / 10–16 outubro 2026

**Fonte de verdade:** retorno consolidado de Matheus (09/10/2026). O PDF remete a uma aba adicional “Conteúdo pronto para o site” que NÃO está nos anexos; não inventar formação, parâmetros, testes e textos dessa aba. O documento consolidado prevalece sobre o relatório em vídeo, quando houver conflito.

**Regra de aceite:** status antigo "completed" não vale como validação. Cada item deve ter evidência de código, copy conforme cliente, teste funcional em ambiente publicado, avaliação visual desktop/tablet/mobile, sem regressões, e registro do commit. Não tocar blocos aprovados sem necessidade comprovada. Executar uma rodada pequena por vez, sem múltiplos itens parcialmente abertos.

## Cronograma próprio
- **R0-A (10/10):** inventário e confronto por exigência, inclusive tarefas antigas concluídas; classificação: confirmado / divergente / sem prova.
- **R0-B (10–11/10):** conferir documentos e obter aba “Conteúdo pronto para o site”; pendência externa. Concluir testes funcionais da versão candidata.
- **R1 (11/10):** bloqueadores: serviços de Engenharia Clínica, índice CQ, catálogo, links, exceções JS, blog e título da aba. Testar 5 rotas + index.
- **R2 (11–12/10):** identidade e copy global (1995/2013, Matheus + formação quando documentada, contatos, nacional, independência, terminologia RBC, laudo 7 dias); varredura ampla de notas internas.
- **R3 (12/10):** Engenharia Clínica, equipamentos e qualificação térmica; validar normas e parâmetros usando conteúdo aprovado.
- **R4 (12–13/10):** Física Médica, 10 modalidades, Proteção Radiológica, treinamentos, normas e regionais.
- **R5 (13–14/10):** formulário, captura WhatsApp, confirmação de lead no banco/email, LGPD, blog integral e preservação de URLs.
- **R6 (14–15/10):** QA de design aprovado e navegabilidade responsiva, SEO, canonical, sitemap, teste de todas as rotas e imagens.
- **R7 (15–16/10):** site independente, backup, URLs 301, configuração HostGator/Registro.br, publicação com consentimento da Consult e QA pós-corte.

## Registro desta rodada
- Branch isolada: `audit-consult-matheus-20261010`. NÃO publicada.
- Código original da página Sobre omitia Matheus Alvarez, apesar da decisão final. Alterado título e texto institucional para nomeá-lo. **PENDENTE:** inserir formação exata da aba "Conteúdo pronto para o site", renderizar e validar no preview.
- O `ConsultSiteShell` possui link direto ao WhatsApp, enquanto o formulário principal possui função `consult-lead`. **PENDENTE:** conferir requisitos finais da captura e garantir fluxo coerente sem destruir UX já aprovada.
- Não considerar itens completos sem teste de ponta a ponta. Não modificar status do Portal antes da validação verificável.
