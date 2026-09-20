# Contrato do projeto

Esta pasta contém os **templates** dos arquivos que todo contexto de cliente precisa ter para que as skills do squad funcionem corretamente.

> **Como funciona:** as skills (Kotler, Hormozi, Ogilvy, Davinci) não têm contexto embutido. Elas leem os arquivos canônicos do cliente disponíveis no host atual para se adaptar. Esse contrato é a "interface" entre as skills e o projeto.

---

## Configure o seu projeto — passo a passo (~30min)

### 1. Crie o projeto no ambiente atual
- No ChatGPT, crie/abra um Projeto do cliente; no Codex, abra o repositório/workspace correspondente.
- Nome: o seu nome ou o da sua marca
- Defina instruções do projeto: `"Os arquivos anexados são o meu contexto canônico — sempre consulte antes de responder."`

### 2. Suba os arquivos obrigatórios
Copie estes templates desta pasta, preencha e suba pro projeto:
- `briefing.md`
- `tom-de-voz.md`
- `brandbook.md` (necessário se for usar Davinci)

### 3. Suba os arquivos opcionais (recomendados)
Quando fizer sentido pro seu caso:
- `lead-magnets.md` — se você tem materiais (iscas/intenção) ativos
- `cases.md` — se você já tem cases para usar em conteúdo
- `referencias.md` — índice de posts aprovados / inspirações

### 4. Anexos visuais
Disponibilize PNG/JPG/PDF no Projeto/Work ou na pasta do cliente no repositório e catalogue em `referencias.md`. Não dependa de um layout de pastas específico do host.

### 5. Contexto adicional
Se você tiver materiais que enriquecem o contexto (pesquisa de público, posicionamento detalhado, análise de concorrência), suba como `.md` extras. As skills consideram esses arquivos quando relevantes.

### 6. Instale o squad
Instale o plugin `figueira-content-squad` na superfície compatível. Dentro do repositório Figueira Marketing, o Codex também descobre as mesmas skills via `.agents/skills`.

---

## Tabela de skills × arquivos

Mapa de quais skills consultam quais arquivos. Se você não vai usar uma skill, os arquivos exclusivos dela podem ser pulados.

| Arquivo | Kotler | Hormozi | Ogilvy | Davinci |
|---|:-:|:-:|:-:|:-:|
| `briefing.md` | ✅ | ✅ | ✅ | ✅ |
| `tom-de-voz.md` | ✅ |  | ✅ |  |
| `brandbook.md` |  |  |  | ✅ |
| `lead-magnets.md` | ✅ | ⚠️ | ✅ |  |
| `cases.md` | ✅ |  | ✅ |  |
| `referencias.md` |  | ⚠️ | ✅ | ✅ |

> **⚠️ Consulta condicional do Hormozi:** `lead-magnets.md` apenas em posts de Lead Magnet quando precisa de mais contexto sobre o material. `referencias.md` apenas quando o briefing do Kotler oferece pouco contexto e posts aprovados ajudam a calibrar estilo. Não são consultas default — só quando a situação exige.

---

## Sinais de "tá pronto pra começar"

- ✅ Briefing preenchido com ICP, oferta e objeções claros
- ✅ Tom de voz com pelo menos 3 posts de referência por perfil que assina
- ✅ Brandbook com 3 cores hex definidas (se for usar Davinci)

## Sinais de "ainda não tá pronto"

- ❌ Briefing genérico ("vendemos para empresas que querem crescer")
- ❌ Tom de voz só descrito em texto, sem exemplo real
- ❌ Brandbook sem cores hex (placeholders ou nomes de cor)

> Se um arquivo obrigatório estiver vazio ou superficial, a skill **vai parar e pedir o complemento**. Esse é o guard rail intencional — melhor parar do que improvisar contexto.
