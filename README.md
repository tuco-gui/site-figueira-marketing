# Figueira Marketing

Site institucional da Figueira Marketing — Propósito e Performance.

## Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

O resultado de produção é gerado em `dist/`.

## Migração

Este projeto foi originalmente construído no Base44 e está sendo migrado para uma base independente no GitHub. O site público não depende de autenticação Base44.

## Consult — checkpoint do blog, 14/10/2026

Escopo: CLIENTE Consult. Continuidade do lote interrompido, sem repetir a coleta do acervo. Fonte operacional: README canônico em `tuco-gui/figueira-marketing-automation`, `brain/10-clientes/consult/projetos/site-consult/README.md`, consultado nesta rodada. Requisito documental: “Correções e decisões”, seções Blog e Técnico, SEO e migração; “Documento Ajustes Consult Rad”, preservação da Home aprovada. A aba final “Conteúdo pronto para o site” continua indisponível.

Lote de conteúdo salvo no commit local `01b50ec`:

| Requisito | Resultado e evidência desta rodada | Situação |
| --- | --- | --- |
| Incorporar o acervo antigo integralmente | 91 registros locais com corpo HTML não vazio; 91 slugs únicos. A coleta é da sessão anterior; não foi refeita nem comparada novamente com todos os originais. | Implementação local; fidelidade integral ainda não reatestada |
| Imagens do acervo | 96 arquivos WebP decodificáveis, sem referências locais ausentes ou imagens remotas no HTML importado. Cards usam carregamento gradual. | Verificação local passou |
| Retirar avisos editoriais e quebras literais | Avisos de migração e “Ver publicação original” retirados dos componentes. Nenhum `\\n\\n` ou `\\r\\n` literal encontrado nos corpos importados. | Código conferido; navegador pendente |
| URLs antigas | Mapa com 92 origens para 91 artigos; todos os destinos existem no conjunto importado. Mapa preparado, sem ativação de redirects no domínio final. | Migração pendente |
| Prévia social e canonical por artigo | HTML inicial dos 91 artigos conferido: canonical único, imagem local, tipo article e noindex de homologação. | Verificação local passou; DOM publicado pendente |
| Build e análise estática | Build do lote isolado passou, com 146 rotas. ESLint dos componentes/helper do blog e `git diff --check` passaram. | Verificação local passou |
| Busca, filtros, mais artigos e leitura | Navegador remoto não alcança o servidor local. Não foi possível executar estas interações nesta rodada. | NÃO VERIFICADO |

As alterações visuais das demais páginas e dos componentes compartilhados continuam no diretório de trabalho e não integram este lote do blog. Nenhum envio de formulário, teste de lead, CRM, banco, domínio final ou migração foi executado.

**Atualização do checkpoint:** o owner autorizou o envio em 14/10/2026. O lote foi publicado na main pelo commit `f59bbd3`, com a mesma árvore de conteúdo dos dois commits locais preparados. O impedimento abaixo é histórico; não é o estado atual. O registro vigente de publicação, QA e próximas etapas está no [README canônico da Consult](https://github.com/tuco-gui/figueira-marketing-automation/blob/main/brain/10-clientes/consult/projetos/site-consult/README.md).

Histórico anterior à autorização: a revisão automática rejeitou `git push origin main`, exigindo autorização explícita para o envio do commit. O lote não foi publicado; Brain remoto e Portal não foram atualizados nem marcados como concluídos. Próximo passo: autorizar o envio deste lote à main original, confirmar o deployment da homologação existente e testar as interações no navegador. Depois, continuar os lotes visuais preservados. Não classificar o blog nem o site como 100% concluídos.
