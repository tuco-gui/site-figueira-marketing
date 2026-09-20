# IA operacional — Figueira Marketing

O plugin canônico de conteúdo fica em `plugins/figueira-content-squad/`.

## Regra de sincronização

Não manter alterações apenas localmente ou apenas no GitHub.

Antes de editar:

1. Verificar `git status` e preservar mudanças locais.
2. Se a árvore estiver limpa, atualizar com `git pull --ff-only origin main`.
3. Se houver mudanças locais, reconciliar antes do pull; nunca descartar trabalho silenciosamente.

Depois de validar qualquer alteração do squad:

1. Atualizar somente a fonte canônica em `plugins/figueira-content-squad/`.
2. Validar que `.agents/skills/*` continua apontando para a fonte canônica.
3. Executar os testes de `plugins/figueira-content-squad/VALIDATION.md`.
4. Fazer commit e push para `origin/main` quando houver autorização/acesso para persistir a mudança.

## Superfícies alvo

- ChatGPT Chat
- ChatGPT Work
- Codex Web/Cloud
- ChatGPT/Codex Desktop
- Codex CLI

Diferenças de host devem ser tratadas por detecção de capacidade dentro das skills, nunca por forks independentes.
