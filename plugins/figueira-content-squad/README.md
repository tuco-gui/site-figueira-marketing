# Figueira Content Squad

Plugin portátil e fonte canônica do squad de conteúdo da Figueira Marketing.

## Skills

- `setup` — cria/atualiza os arquivos canônicos de contexto do cliente.
- `kotler` — planeja calendário editorial e briefings.
- `hormozi` — refina e seleciona ganchos.
- `ogilvy` — redige o post final no tom de voz do cliente.
- `davinci` — transforma post aprovado em narrativa e carrossel HTML/PNG.

Fluxo recomendado: **Setup → Kotler → Hormozi → Ogilvy → Da Vinci**.

## Fonte de verdade

Esta pasta é a fonte canônica. Não manter cópias manuais divergentes.

Arquivos de contexto por cliente:

- `briefing.md`
- `tom-de-voz.md`
- `brandbook.md`
- `lead-magnets.md`
- `cases.md`
- `referencias.md`

Em repositórios, localização recomendada: `content/clients/<slug>/context/`. Em ChatGPT, os mesmos arquivos podem viver no Projeto/Work do cliente.

## Compatibilidade

- ChatGPT Chat e Work (web/desktop/mobile) via plugin instalado/publicado.
- Codex no app desktop via plugin.
- Codex CLI via marketplace/plugin; dentro do repositório Figueira, as mesmas skills ficam expostas também por symlinks em `.agents/skills`.
- Codex web/cloud quando executado no repositório, usando os arquivos versionados e/ou o plugin disponível à conta.

O `plugin.json` raiz é o manifesto portátil. `.codex-plugin/plugin.json` existe apenas como fallback de compatibilidade.

## Render do Da Vinci

O Da Vinci não presume mais um sandbox específico. Se houver shell/Python/Chromium, ele renderiza. Caso contrário, entrega HTML + `render.py` e declara o render pendente.

## Sincronização Figueira

Regra: **editar → validar → commit → push**. O checkout local e `origin/main` devem permanecer sincronizados. Veja `FIGUEIRA-AI.md` na raiz do repositório.
