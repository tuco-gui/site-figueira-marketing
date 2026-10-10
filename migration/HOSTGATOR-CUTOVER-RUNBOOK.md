# Consult — runbook de cutover e rollback

Data de preparação: 10/10/2026
Status: **PREPARADO, NÃO EXECUTADO**

## Pré-condições obrigatórias

Só iniciar o cutover quando TODOS os itens abaixo estiverem atendidos:

- backup integral validado conforme `BACKUP-CHECKLIST.md`;
- release candidate standalone com build **READY** e QA automático aprovado;
- conteúdo final pendente do cliente resolvido ou formalmente aceito;
- aceite objetivo da Consult para publicação;
- janela de publicação confirmada;
- acesso HostGator disponível;
- mapa 301 revisado;
- Search Console sob controle da Consult;
- IDs finais de GA4/GTM disponíveis, se forem ativados no lançamento.

## Arquivos da migração

- `current-site-public-inventory.csv` — inventário do legado;
- `legacy-post-urls.csv` — 46 artigos históricos;
- `redirect-map.csv` — mapa origem → destino;
- `redirects-ready-for-cutover.htaccess` — regras preparadas, ainda desativadas;
- `QA-2026-10-10.md` — evidências da versão candidata.

## Sequência do cutover

1. **Congelar alterações**
   - interromper mudanças no site antigo durante a janela;
   - registrar hora de início.

2. **Backup final**
   - repetir/confirmar backup de arquivos e banco imediatamente antes da troca;
   - não prosseguir se o backup estiver incompleto.

3. **Gerar build final**
   - executar `npm install`;
   - executar `npm run build`;
   - a build deve encerrar com `[consult-qa] OK`.

4. **Preparar raiz pública**
   - preservar o backup fora da raiz pública;
   - enviar o conteúdo de `dist/` para a raiz do domínio;
   - usar as regras de `redirects-ready-for-cutover.htaccess` no lugar do `.htaccess` base somente nesta etapa.

5. **Validar antes de liberar indexação**
   - home;
   - Sobre;
   - Serviços;
   - 3 áreas técnicas;
   - índice e modalidades de CQ;
   - Engenharia Clínica e equipamentos;
   - Proteção Radiológica;
   - Blog e amostra de artigos históricos;
   - formulário;
   - WhatsApp;
   - Portal/Cursos;
   - sitemap;
   - robots;
   - metadados/canonical;
   - 301 antigos.

6. **Ativar domínio final**
   - confirmar `https://www.consult.med.br`;
   - confirmar SSL;
   - confirmar que canonical e Open Graph apontam para Consult;
   - remover qualquer proteção de homologação que não pertença ao pacote final.

7. **Indexação e medição**
   - submeter/validar sitemap no Search Console;
   - ativar GA4/GTM somente com IDs finais;
   - se tags não essenciais dependerem de consentimento, validar o mecanismo de consentimento antes de publicar as tags.

8. **Smoke test pós-publicação**
   - testar desktop e mobile;
   - testar 404;
   - testar 10 URLs antigas de posts e confirmar 301 para o artigo correspondente;
   - testar aliases `empresa.html`, `contato.html`, `radio.html`, `saude.html`;
   - verificar console do navegador;
   - verificar formulário com um envio real autorizado pela Consult.

## Critérios de rollback imediato

Executar rollback se ocorrer qualquer um destes eventos:

- home ou rotas técnicas retornando erro/blank page;
- formulário indisponível;
- perda de acesso aos subdomínios/Portal/Cursos;
- redirects em loop;
- canonical apontando para Figueira;
- erro generalizado de assets;
- SSL inválido;
- perda de conteúdo antigo sem redirect;
- regressão crítica identificada pela Consult.

## Rollback

1. retirar temporariamente o novo `.htaccess`;
2. restaurar arquivos do backup da raiz pública;
3. restaurar banco somente se ele tiver sido alterado;
4. restaurar configuração DNS apenas se ela tiver sido modificada;
5. validar home, posts antigos e serviços anteriores;
6. registrar causa do rollback e não tentar novo cutover até corrigir a release candidate.

## Depois do lançamento

- acompanhar 404 e redirects;
- conferir Search Console;
- conferir leads;
- conferir analytics quando ativo;
- manter backup pré-cutover por período seguro;
- não excluir o acervo/mapeamento de migração após o lançamento.
