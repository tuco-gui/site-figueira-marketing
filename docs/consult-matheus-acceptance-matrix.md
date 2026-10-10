# Consult — Matriz de aceite final do Matheus

Data: 10/10/2026  
Branch: `consult-matheus-final-20261010`

Legenda:
- **CONCLUÍDO** — implementação presente na branch e verificada em código/build.
- **QA VISUAL PENDENTE** — implementação presente; conferir na homologação pública após merge.
- **BLOQUEADO POR FONTE** — o documento final manda copiar conteúdo de uma aba que não foi fornecida; não inferir.
- **GO-LIVE** — só executar com backup/acessos/aceite.

## Home e navegação

| Requisito | Estado | Aceite |
|---|---|---|
| Preservar design/tipografia/cards aprovados da Home | QA VISUAL PENDENTE | Nenhuma reestruturação das seções aprovadas |
| “documentados em laudo técnico” | CONCLUÍDO | Sem “comprovados” |
| Desde 1995 | CONCLUÍDO | Selo e apresentação final |
| Anvisa + Vigilância Sanitária; sem CNEN/CFM | CONCLUÍDO | Scan limpo |
| Telefone, e-mail, endereço, horário | CONCLUÍDO | Dados finais presentes |
| Cobertura nacional + SP/PR/MS/MG | CONCLUÍDO | Texto final presente |
| “Mesma visita...” | CONCLUÍDO | Redação final presente |
| Serviços abre catálogo | CONCLUÍDO | /consult/servicos |
| Acesso direto por serviço no menu | CONCLUÍDO | 10 entradas diretas |
| “Agendar reunião” → Solicitar orçamento | CONCLUÍDO | CTA final |
| Foto sem radioterapia | QA VISUAL PENDENTE | Banco de radiodiagnóstico até fotos da Amanda |

## Engenharia Clínica

| Requisito | Estado | Aceite |
|---|---|---|
| Nome Consult Engenharia Clínica | CONCLUÍDO | Mesmo nome em páginas |
| 5 páginas internas funcionais | CONCLUÍDO | TSE, desempenho, preventiva, reverificação, térmica |
| Template interno responsivo | QA VISUAL PENDENTE | Breadcrumb + hero + escopo + normas + entregável + CTA |
| Histórico técnico | CONCLUÍDO | Sem Arkmeds |
| Responsável técnico | CONCLUÍDO PARCIAL | Matheus Alvarez publicado; formação depende da fonte final |
| Rastreabilidade RBC | CONCLUÍDO | “padrões com rastreabilidade RBC/Inmetro” |
| Sem nomes de analisadores | CONCLUÍDO | Scan técnico |
| Ensaio de desempenho no corpo | CONCLUÍDO | “Calibração” apenas título/SEO quando aplicável |
| Independência correta | CONCLUÍDO | “Não fazemos manutenção corretiva e não vendemos peças” |
| Laudo em até 7 dias | CONCLUÍDO | Texto final |
| Sem laudo/tabela fictícia | CONCLUÍDO | “O que a entrega documenta” |
| Concentrador de oxigênio | CONCLUÍDO PARCIAL | Página/rota criada; parâmetros exatos dependem da fonte final |
| Termodesinfectora própria | CONCLUÍDO | Página separada |
| Sem estufa de esterilização | CONCLUÍDO | Apenas estufas/incubadoras de laboratório |
| Fluxômetro/manômetro sem TSE | CONCLUÍDO | Equipamentos mecânicos |
| ISO 17665 / 15883 / IEC 61010 | CONCLUÍDO | Base térmica/laboratorial |

## Física Médica — Controle de Qualidade

| Requisito | Estado | Aceite |
|---|---|---|
| Índice geral de CQ | CONCLUÍDO | 10 modalidades |
| 10 modalidades do protótipo | CONCLUÍDO | Rotas específicas |
| Remover cards genéricos Funcionamento/Imagem/Exposição/Laudo | CONCLUÍDO | Template novo |
| Densitometria sem IN específica | CONCLUÍDO | RDC 611 + fabricante + protocolos |
| Veterinária RDC 611 + IN90 referência | CONCLUÍDO | Texto final |
| Listas exatas de testes por modalidade | **BLOQUEADO POR FONTE** | Aba “Conteúdo pronto para o site” não fornecida |
| FAQs finais por modalidade | **BLOQUEADO POR FONTE** | Aba “Conteúdo pronto para o site” não fornecida |
| Programas recorrentes | CONCLUÍDO | Vistoria mensal, análise semanal, supervisão PR |
| Sem tabelas fictícias | CONCLUÍDO | “O que o laudo traz” |

## Proteção Radiológica

| Requisito | Estado | Aceite |
|---|---|---|
| URLs /protecao-radiologica/... | CONCLUÍDO | 301 dos aliases |
| PPR / levantamento / blindagem | CONCLUÍDO | Rotas e conteúdo |
| Treinamentos EAD + presencial sob medida | CONCLUÍDO | Copy final suportada |
| Licenciamento sem promessa de aprovação | CONCLUÍDO | Autoridade sanitária decide |
| Texto literal final da aba 09/10 | **BLOQUEADO POR FONTE** | Comparar quando a aba existir |

## Institucional

| Requisito | Estado | Aceite |
|---|---|---|
| Página Sobre própria | CONCLUÍDO | /consult/sobre |
| Matheus Alvarez | CONCLUÍDO | Nome publicado |
| Formação exata de Matheus | **BLOQUEADO POR FONTE** | Não consta nos PDFs/Drive recuperados |
| Sem foto em destaque / sem registro | CONCLUÍDO | Nenhum número inferido |

## Leads e LGPD

| Requisito | Estado | Aceite |
|---|---|---|
| Registrar formulário | CONCLUÍDO | Edge Function consult-lead |
| Enviar para radiometria@consult.med.br | CONCLUÍDO | DESTINATION verificado |
| Origem/UTM/serviço | CONCLUÍDO | Campos persistidos |
| Confirmação na tela | CONCLUÍDO | Estado de sucesso |
| Rótulo acessível no assunto | CONCLUÍDO | label + aria |
| Registrar antes do WhatsApp | CONCLUÍDO | Interceptação global de wa.me |
| Política de Privacidade | CONCLUÍDO PARCIAL | Publicada; texto literal final depende da aba |
| Matheus + Amanda em LGPD | CONCLUÍDO | Contatos publicados |
| Cookie banner | GO-LIVE | Apenas se tags não essenciais forem ativadas |

## Blog / SEO / URLs

| Requisito | Estado | Aceite |
|---|---|---|
| 46 posts históricos na íntegra | CONCLUÍDO | Banco: 46 históricos completos |
| 49 posts públicos totais | CONCLUÍDO | Banco e fallback local |
| Sem \n\n literal | CONCLUÍDO | Normalização editorial |
| Pré-render dos 49 artigos | CONCLUÍDO | Script usa consultStaticPosts.json |
| Um padrão de URL | CONCLUÍDO | Silos canônicos + redirects |
| Regionais genéricas | CONCLUÍDO | Retiradas da candidata e redirecionadas |
| OG/title/description/canonical | CONCLUÍDO | Pré-render + runtime |
| IN 90–97 individuais | CONCLUÍDO | Links oficiais separados |
| ABNT: página específica de cada norma | **BLOQUEADO POR FONTE** | Aba final prometia links exatos; não inventar URL de catálogo |
| noindex na homologação | CONCLUÍDO | Header + meta |
| retirar noindex no oficial | GO-LIVE | Somente no cutover |

## Migração

| Requisito | Estado | Aceite |
|---|---|---|
| Site independente | PREPARADO | Branch standalone existente; reconsolidar após QA desta branch |
| Backup HostGator | GO-LIVE | Obrigatório antes de upload |
| Código-fonte entregue à Consult | GO-LIVE | Entrega antes da migração |
| Mapa 301 site atual | PREPARADO | Revisar após congelar versão final |
| Search Console / Analytics | GO-LIVE | Contas/IDs finais da Consult |
| Fotos da Amanda | PÓS-LANÇAMENTO / CLIENTE | Substituir banco quando recebidas |

## Gate final

A versão só pode ser chamada de **“atende integralmente ao pedido do Matheus”** quando os itens **BLOQUEADO POR FONTE** forem resolvidos.

Enquanto isso, pode ser chamada apenas de:
**“implementação concluída para todos os requisitos documentados cuja fonte está disponível; pendências literais isoladas.”**
