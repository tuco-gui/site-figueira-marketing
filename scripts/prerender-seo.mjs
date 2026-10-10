import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const DIST = 'dist'
const ORIGIN = 'https://www.consult.med.br'
const SOCIAL_IMAGE = `${ORIGIN}/approved-national-bg.webp`
const STATIC_POSTS = JSON.parse(await readFile('src/lib/consultStaticPosts.json', 'utf8'))

const areas = {
  'fisica-medica': ['Física Médica | Controle de Qualidade e Laudos | Consult','Controle de qualidade, medições e laudos técnicos para diagnóstico por imagem, com atendimento da Consult em todo o Brasil.','Service'],
  'protecao-radiologica': ['Proteção Radiológica | Consult Radiometria e Qualidade','Programa de Proteção Radiológica, levantamento radiométrico, projeto de blindagem, treinamentos e apoio ao licenciamento sanitário.','Service'],
  'engenharia-clinica': ['Consult Engenharia Clínica | Ensaios, Calibração e Laudos','Ensaios de segurança elétrica e desempenho, manutenção preventiva, reverificação e qualificação térmica com laudo por equipamento.','Service'],
}

const modalities = {
  'raio-x-convencional': ['Controle de Qualidade em Raios X | IN 90 | Consult','Controle de qualidade em radiografia convencional conforme RDC 611/2022 e IN 90/2021, com laudo técnico.'],
  'fluoroscopia-arco-c-angiografia': ['CQ em Fluoroscopia e Arco C | IN 91 | Consult','Controle de qualidade em fluoroscopia, arco cirúrgico e angiografia conforme RDC 611/2022 e IN 91/2021.'],
  mamografia: ['Controle de Qualidade em Mamografia | IN 92 | Consult','Ensaios de controle de qualidade em mamografia conforme RDC 611/2022 e IN 92/2021, com resultado técnico documentado.'],
  tomografia: ['Controle de Qualidade em Tomografia | IN 93 | Consult','Controle de qualidade em tomografia computadorizada conforme RDC 611/2022 e IN 93/2021.'],
  'odontologico-extraoral': ['CQ em Radiologia Odontológica Extraoral | Consult','Controle de qualidade em radiologia odontológica extraoral conforme RDC 611/2022 e IN 94/2021.'],
  'odontologico-intraoral': ['CQ em Radiologia Odontológica Intraoral | Consult','Controle de qualidade em radiologia odontológica intraoral conforme RDC 611/2022 e IN 95/2021.'],
  ultrassom: ['Controle de Qualidade em Ultrassom | IN 96 | Consult','Ensaios de controle de qualidade em ultrassom conforme IN 96/2021, com desempenho e qualidade de imagem documentados.'],
  'ressonancia-magnetica': ['Controle de Qualidade em Ressonância Magnética | Consult','Controle de qualidade em ressonância magnética conforme IN 97/2021, com avaliação de desempenho e qualidade de imagem.'],
  'densitometria-ossea': ['Controle de Qualidade em Densitometria Óssea | Consult','Testes de aceitação e constância em densitometria óssea conforme RDC 611/2022, instruções do fabricante e protocolos reconhecidos.'],
  'raio-x-veterinario': ['Controle de Qualidade em Raios X Veterinário | Consult','Avaliação técnica de raios X veterinário com base na RDC 611/2022 e IN 90/2021 como referência técnica indicada pela Consult.'],
}

const protection = {
  'programa-protecao-radiologica': ['Programa de Proteção Radiológica | Consult','Elaboração e acompanhamento do Programa de Proteção Radiológica para serviços de radiologia diagnóstica e intervencionista.'],
  'levantamento-radiometrico': ['Levantamento Radiométrico | Consult','Medição da radiação nas áreas ao redor da sala e avaliação da radiação de fuga do cabeçote, com resultado técnico documentado.'],
  'projeto-blindagem': ['Projeto de Blindagem Radiológica | Consult','Cálculo técnico e memorial de blindagem para obras, reformas, expansões ou troca de equipamentos de radiologia.'],
  treinamentos: ['Treinamentos em Radioproteção e Segurança em RM | Consult','Capacitação periódica de equipes em radioproteção e segurança em ressonância magnética.'],
  'licenciamento-sanitario': ['Licenciamento Sanitário para Radiologia | Consult','Apoio técnico e documental para obtenção ou renovação de licença da vigilância sanitária.'],
}

const engineering = {
  'seguranca-eletrica': ['Ensaio de Segurança Elétrica IEC 62353 | Consult','Medição de aterramento, isolamento e correntes de fuga conforme ABNT NBR IEC 62353, com laudo por equipamento.'],
  'desempenho-calibracao': ['Calibração e Ensaio de Desempenho | Consult','Ensaio de desempenho com comparação ponto a ponto, documentação de valores, desvios e conformidade, com padrões de rastreabilidade RBC/Inmetro.'],
  'manutencao-preventiva': ['Manutenção Preventiva | Consult Engenharia Clínica','Limpeza, lubrificação e testes de funcionamento, com atividades e pendências documentadas em laudo por equipamento.'],
  reverificacao: ['Reverificação de Equipamentos | Consult Engenharia Clínica','Novo ensaio após tratamento de uma pendência, com emissão de laudo atualizado e histórico técnico.'],
  'qualificacao-termica': ['Qualificação Térmica | Consult Engenharia Clínica','Mapeamento térmico com sensores calibrados e relatório com registros, gráficos e conformidade conforme a aplicação.'],
}

const equipment = {
  'monitor-multiparametrico':'Monitor multiparamétrico', eletrocardiografo:'Eletrocardiógrafo', 'oximetro-pulso':'Oxímetro de pulso',
  'esfigmomanometro-mapa':'Esfigmomanômetro digital e MAPA', 'desfibrilador-cardioversor-dea':'Desfibrilador, cardioversor e DEA',
  'marca-passo-transcutaneo':'Marca-passo transcutâneo', 'bisturi-eletrico':'Bisturi elétrico', 'ventilador-pulmonar':'Ventilador pulmonar',
  'aparelho-anestesia':'Aparelho de anestesia', 'cpap-bipap':'CPAP e BiPAP', 'fluxometro-manometro-o2':'Fluxômetro e manômetro de O₂',
  'concentrador-oxigenio':'Concentrador de oxigênio', autoclave:'Autoclave', termodesinfectora:'Termodesinfectora',
  'estufa-banho-maria':'Estufa e banho-maria de laboratório', 'geladeira-camara-vacina':'Geladeira e câmara de vacina',
}

const regions = {
  'sao-paulo':['São Paulo','em São Paulo'], parana:['Paraná','no Paraná'],
  'mato-grosso-do-sul':['Mato Grosso do Sul','em Mato Grosso do Sul'], 'minas-gerais':['Minas Gerais','em Minas Gerais'],
}

const routes = [
  ['/','Consult Radiometria e Qualidade | Física Médica e Consult Engenharia Clínica','Medição, ensaio, calibração, qualificação e laudos técnicos em Física Médica, Proteção Radiológica e Consult Engenharia Clínica, com atendimento em todo o Brasil.','WebPage'],
  ['/sobre','Sobre a Consult | Consult Radiometria e Qualidade','Conheça a Consult Radiometria e Qualidade, fundada em 1995, sua atuação técnica, áreas de serviço e estrutura de atendimento.','AboutPage'],
  ['/servicos','Serviços | Consult Radiometria e Qualidade','Catálogo de serviços da Consult em Física Médica, Proteção Radiológica e Consult Engenharia Clínica.','CollectionPage'],
  ['/politica-de-privacidade','Política de Privacidade | Consult Radiometria e Qualidade','Política de Privacidade do site da Consult: dados coletados, finalidades, segurança, cookies e direitos previstos na LGPD.','WebPage'],
  ['/fisica-medica/controle-de-qualidade','Controle de Qualidade em Diagnóstico por Imagem | Consult','Controle de Qualidade por modalidade, com referências específicas, medições documentadas e laudo técnico assinado pelo físico médico.','Service'],
  ['/normas','Normas e Referências Técnicas | Consult','Biblioteca de RDCs, Instruções Normativas, referências ABNT e documentos técnicos citados nos serviços da Consult.','CollectionPage'],
  ['/materiais','Materiais Técnicos | Consult Radiometria e Qualidade','Guias e materiais técnicos da Consult sobre Física Médica, Proteção Radiológica, Controle de Qualidade e Engenharia Clínica.','CollectionPage'],
  ['/materiais/modelos-sinalizacao','Modelos de Sinalização Técnica | Consult','Referências visuais de sinalização técnica para radioproteção, áreas controladas e ressonância magnética.','WebPage'],
  ['/materiais/mapa-normas-radiologia','Mapa de Normas por Modalidade | Consult','RDC 611/2022 e Instruções Normativas organizadas por modalidade de diagnóstico por imagem.','WebPage'],
  ['/materiais/guia-servicos-radiologia','CQ, Radiometria ou Blindagem? | Consult','Entenda quando utilizar Controle de Qualidade, levantamento radiométrico ou projeto de blindagem em radiologia.','WebPage'],
  ['/blog','Blog técnico | Consult Radiometria e Qualidade','Conteúdos técnicos sobre Física Médica, Proteção Radiológica, controle de qualidade, Engenharia Clínica e normas sanitárias.','Blog'],
]

for (const [slug,[title,description,type]] of Object.entries(areas)) routes.push([`/${slug}`,title,description,type])
for (const [slug,[title,description]] of Object.entries(modalities)) routes.push([`/fisica-medica/controle-de-qualidade/${slug}`,title,description,'Service'])
for (const [slug,[title,description]] of Object.entries(protection)) routes.push([`/protecao-radiologica/${slug}`,title,description,'Service'])
for (const [slug,[title,description]] of Object.entries(engineering)) routes.push([`/engenharia-clinica/${slug}`,title,description,'Service'])
for (const [slug,name] of Object.entries(equipment)) routes.push([`/engenharia-clinica/equipamentos/${slug}`,`Ensaio de ${name} | Consult Engenharia Clínica`,`Ensaios aplicáveis a ${name}, com medição documentada, padrões com rastreabilidade RBC/Inmetro e laudo por equipamento.`,'Service'])
for (const [slug,[name,prep]] of Object.entries(regions)) routes.push([`/atuacao/${slug}`,`Engenharia Clínica e Física Médica ${prep} | Consult`,`Atendimento presencial da Consult ${prep} para Física Médica, Proteção Radiológica e Engenharia Clínica, com medições, ensaios e laudos técnicos.`,'Service'])
for (const post of STATIC_POSTS) routes.push([`/blog/${post.slug}`, post.seoTitle || `${post.title} | Consult`, post.seoDescription || post.excerpt || '', 'Article'])

const esc=(v='')=>String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
const replaceOrInsert=(html,re,value)=>re.test(html)?html.replace(re,value):html.replace('</head>',`  ${value}\n  </head>`)

function render(base,route,title,description,schemaType){
  const canonical=`${ORIGIN}${route}`
  let html=base
  html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${esc(title)}</title>`)
  html=replaceOrInsert(html,/<meta\s+name=["']description["'][^>]*>/i,`<meta name="description" content="${esc(description)}" />`)
  html=replaceOrInsert(html,/<meta\s+name=["']robots["'][^>]*>/i,'<meta name="robots" content="index, follow" />')
  html=replaceOrInsert(html,/<meta\s+property=["']og:title["'][^>]*>/i,`<meta property="og:title" content="${esc(title)}" />`)
  html=replaceOrInsert(html,/<meta\s+property=["']og:description["'][^>]*>/i,`<meta property="og:description" content="${esc(description)}" />`)
  html=replaceOrInsert(html,/<meta\s+property=["']og:type["'][^>]*>/i,`<meta property="og:type" content="${schemaType==='Article'?'article':'website'}" />`)
  html=replaceOrInsert(html,/<meta\s+property=["']og:site_name["'][^>]*>/i,'<meta property="og:site_name" content="Consult Radiometria e Qualidade" />')
  html=replaceOrInsert(html,/<meta\s+property=["']og:url["'][^>]*>/i,`<meta property="og:url" content="${canonical}" />`)
  html=replaceOrInsert(html,/<meta\s+property=["']og:image["'][^>]*>/i,`<meta property="og:image" content="${SOCIAL_IMAGE}" />`)
  html=replaceOrInsert(html,/<meta\s+property=["']og:image:alt["'][^>]*>/i,'<meta property="og:image:alt" content="Consult Radiometria e Qualidade" />')
  html=replaceOrInsert(html,/<meta\s+name=["']twitter:card["'][^>]*>/i,'<meta name="twitter:card" content="summary_large_image" />')
  html=replaceOrInsert(html,/<meta\s+name=["']twitter:title["'][^>]*>/i,`<meta name="twitter:title" content="${esc(title)}" />`)
  html=replaceOrInsert(html,/<meta\s+name=["']twitter:description["'][^>]*>/i,`<meta name="twitter:description" content="${esc(description)}" />`)
  html=replaceOrInsert(html,/<meta\s+name=["']twitter:image["'][^>]*>/i,`<meta name="twitter:image" content="${SOCIAL_IMAGE}" />`)
  html=replaceOrInsert(html,/<link\s+rel=["']canonical["'][^>]*>/i,`<link rel="canonical" href="${canonical}" />`)
  const page={ '@type':schemaType,'@id':`${canonical}#page`,url:canonical,name:title.replace(/ \| .*$/,''),description }
  if(schemaType==='Service') page.provider={'@type':'Organization','@id':`${ORIGIN}/#organization`,name:'Consult Radiometria e Qualidade'}
  if(schemaType==='Article') page.publisher={'@type':'Organization','@id':`${ORIGIN}/#organization`,name:'Consult Radiometria e Qualidade'}
  const graph={'@context':'https://schema.org','@graph':[
    {'@type':'Organization','@id':`${ORIGIN}/#organization`,name:'Consult Radiometria e Qualidade',url:ORIGIN,address:{'@type':'PostalAddress',addressLocality:'Matão',addressRegion:'SP',addressCountry:'BR'}},
    page
  ]}
  html=html.replace('</head>',`  <script type="application/ld+json">${JSON.stringify(graph)}</script>\n  </head>`)
  return html
}

const base=await readFile(join(DIST,'index.html'),'utf8')
for(const [route,title,description,type] of routes){
  const relative=route==='/'?'index.html':route.replace(/^\//,'')+'.html'
  const file=join(DIST,relative)
  await mkdir(dirname(file),{recursive:true})
  await writeFile(file,render(base,route,title,description,type),'utf8')
}
const sitemap=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',...routes.filter(([r])=>r!=='/politica-de-privacidade').map(([r])=>`  <url><loc>${ORIGIN}${r}</loc></url>`),'</urlset>',''].join('\n')
await writeFile(join(DIST,'sitemap.xml'),sitemap,'utf8')
console.log(`[consult] build independente: ${routes.length} rotas pré-renderizadas.`)
