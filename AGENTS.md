# Figueira Marketing — instruções para agentes

## Content Squad

A fonte canônica das skills de conteúdo está em `plugins/figueira-content-squad/skills/`.

As entradas em `.agents/skills/` são apenas aliases/symlinks para descoberta local do Codex. Nunca mantenha conteúdo divergente nesses caminhos.

Ao alterar Setup, Kotler, Hormozi, Ogilvy ou Da Vinci:

- preserve compatibilidade com ChatGPT Chat/Work e Codex web/desktop/CLI;
- não introduza caminhos absolutos específicos de fornecedor;
- não congele datas/anos em instruções operacionais;
- valide pelo checklist do plugin;
- mantenha o checkout local e o GitHub sincronizados conforme `FIGUEIRA-AI.md`.
