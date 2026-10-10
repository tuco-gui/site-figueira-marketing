# Consult Radiometria e Qualidade — site independente

Aplicação React/Vite independente preparada para o domínio `www.consult.med.br`.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm install
npm run build
```

O build é gerado em `dist/` e inclui:
- rotas estáticas pré-renderizadas para metadados e compartilhamento social;
- `sitemap.xml`;
- `.htaccess` com resolução de URLs limpas e fallback para React Router;
- assets necessários para o site.

## HostGator

1. Gere o build com `npm run build`.
2. Faça backup completo do site atual antes do cutover.
3. Envie **o conteúdo de `dist/`** para a raiz pública do domínio.
4. Preserve o `.htaccess`.
5. Aponte DNS/domínio somente após validar o mapa 301 e a versão candidata final.

## Blog e Supabase

O blog usa o backend editorial da Figueira quando as variáveis abaixo estão presentes no build:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Sem essas variáveis, o site mantém o fallback editorial local. Não grave credenciais no repositório.

## Leads

O formulário e o pré-cadastro de WhatsApp usam a Edge Function `consult-lead`. Nenhuma chave administrativa é exposta no frontend.

## Indexação

Este pacote final está preparado com `index, follow` e canonical em `https://www.consult.med.br`. Ambientes de preview devem aplicar `X-Robots-Tag: noindex, nofollow` no servidor.
