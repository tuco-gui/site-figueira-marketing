import { readdir, readFile, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'

const DIST='dist'
const errors=[]
const notes=[]

async function walk(dir){
  const out=[]
  for(const name of await readdir(dir)){
    const path=join(dir,name)
    const s=await stat(path)
    if(s.isDirectory()) out.push(...await walk(path))
    else out.push(path)
  }
  return out
}

const files=await walk(DIST)
const textFiles=files.filter(p=>/\.(html|js|css|xml|txt)$/i.test(p))
const contents=new Map()
for(const path of textFiles) contents.set(path,await readFile(path,'utf8'))
const combined=[...contents.values()].join('\n')
const lower=combined.toLocaleLowerCase('pt-BR')

const forbiddenNames=/\b(?:Arkmeds|Safetest|Rigel|Waller|Lown|Harrison|Luft|Otto)\b/iu
const nameHit=combined.match(forbiddenNames)
if(nameHit) errors.push('Nome de analisador/sistema proibido encontrado no build: '+nameHit[0])

const forbiddenPhrases=[
  'não fazemos conserto','não conserta','mais de 15 anos','99671-0677',
  'estufa de esterilização','medição específica do equipamento',
  'informada pela consult','indicada pela consult','material da consult',
  'escopo confirmado','a página não promete','seo local com responsabilidade'
]
for(const term of forbiddenPhrases){
  if(lower.includes(term)) errors.push('Termo proibido encontrado no build: '+term)
}

const legacyPrefix=/(?:href|to)=["']\/consult(?:\/|["'#?])/iu
if(legacyPrefix.test(combined)){
  errors.push('Dependência real do prefixo /consult encontrada em link/rota pública')
}

const htmlFiles=files.filter(p=>p.endsWith('.html'))
for(const path of htmlFiles){
  const html=contents.get(path) ?? await readFile(path,'utf8')
  const rel=relative(DIST,path)
  if(!html.includes('<link rel="canonical" href="https://www.consult.med.br')){
    errors.push('Canonical ausente/incorreto: '+rel)
  }
  if(!html.includes('<meta property="og:site_name" content="Consult Radiometria e Qualidade"')){
    errors.push('og:site_name da Consult ausente: '+rel)
  }
  if(/Figueira Marketing/i.test(html)){
    errors.push('Marca Figueira apareceu no HTML final: '+rel)
  }
  if(/<meta\s+name=["']robots["'][^>]*noindex/i.test(html)){
    errors.push('HTML final contém noindex: '+rel)
  }
}

const required=['.htaccess','robots.txt','sitemap.xml','approved-national-bg.webp']
for(const name of required){
  if(!files.some(p=>relative(DIST,p)===name)) errors.push('Arquivo obrigatório ausente: '+name)
}

const sitemap=await readFile(join(DIST,'sitemap.xml'),'utf8')
const urlCount=(sitemap.match(/<url>/g)||[]).length
const blogCount=(sitemap.match(/<loc>https:\/\/www\.consult\.med\.br\/blog\//g)||[]).length
if(urlCount < 100) errors.push('Sitemap abaixo do mínimo esperado: '+urlCount+' URLs')
if(blogCount !== 49) errors.push('Sitemap deveria conter 49 artigos; encontrou '+blogCount)
if(sitemap.includes('figueiramarketing.com.br')) errors.push('Sitemap contém domínio da Figueira')
if(sitemap.includes('/consult/')) errors.push('Sitemap contém prefixo /consult')

notes.push(htmlFiles.length+' HTMLs verificados')
notes.push(urlCount+' URLs no sitemap')
notes.push(blogCount+' artigos no sitemap')
notes.push('canonical/OG/robots verificados')
notes.push('scan de termos proibidos concluído')
notes.push('scan de dependência /consult concluído')

if(errors.length){
  console.error('[consult-qa] FALHOU')
  for(const e of errors) console.error(' - '+e)
  process.exit(1)
}

console.log('[consult-qa] OK')
for(const n of notes) console.log(' - '+n)
