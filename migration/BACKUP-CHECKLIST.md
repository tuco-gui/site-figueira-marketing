# Consult — checklist de backup pré-cutover

Data de preparação: 10/10/2026

> Gate obrigatório. Não publicar o novo site em consult.med.br antes de concluir e validar este backup.

## 1. Backup da hospedagem atual

- [ ] Identificar a raiz pública usada por `consult.med.br` na HostGator.
- [ ] Baixar uma cópia integral dos arquivos atuais, incluindo arquivos ocultos como `.htaccess`.
- [ ] Registrar data/hora do backup e usuário que executou.
- [ ] Confirmar que a cópia contém o site público atual e a estrutura `/posts/`.

## 2. Banco de dados atual

- [ ] Identificar se o site atual usa MySQL/MariaDB.
- [ ] Exportar todas as tabelas do banco em SQL.
- [ ] Registrar host, nome do banco e versão do mecanismo sem colocar senha no repositório.
- [ ] Validar o arquivo SQL abrindo o início/fim do dump e conferindo que há instruções de criação/inserção.

## 3. Configuração e integrações

- [ ] Preservar configuração de domínio, DNS e SSL atual antes da troca.
- [ ] Registrar subdomínios existentes que não podem ser afetados.
- [ ] Preservar links/integrações do Portal de Arquivos e da plataforma de Cursos.
- [ ] Registrar PHP/versionamento somente para fins de rollback do site antigo.

## 4. Evidência do estado anterior

- [ ] Capturar a home atual.
- [ ] Capturar uma página/post histórico funcional.
- [ ] Registrar o sitemap/URLs descobertas no inventário de migração.
- [ ] Guardar checksum ou tamanho dos arquivos principais do backup.

## 5. Critério de aceite do backup

O backup é considerado válido somente quando existem:

1. cópia integral dos arquivos;
2. dump do banco, se houver;
3. inventário de DNS/subdomínios;
4. possibilidade prática de restaurar o site antigo sem depender do novo build.

Responsável pelo gate: Figueira + responsável de acesso da Consult/HostGator.
