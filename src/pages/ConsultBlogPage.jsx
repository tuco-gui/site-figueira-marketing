import React, { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { getConsultBlogCategories, getConsultBlogPosts } from '@/lib/consultBlogRepository'

function formatDate(value) {
  return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '')
}

export default function ConsultBlogPage() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')

  useEffect(() => {
    document.title = 'Blog técnico | Consult Radiometria e Qualidade'
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', 'Conteúdos técnicos da Consult sobre Física Médica, Proteção Radiológica, controle de qualidade, Engenharia Clínica e segurança em serviços de saúde.')
    getConsultBlogPosts().then(setPosts)
  }, [])

  const categories = useMemo(() => ['Todos', ...getConsultBlogCategories(posts)], [posts])
  const filtered = useMemo(() => posts.filter((post) => {
    const term = search.trim().toLocaleLowerCase('pt-BR')
    const matchesSearch = !term || `${post.title} ${post.excerpt} ${post.category}`.toLocaleLowerCase('pt-BR').includes(term)
    const matchesCategory = category === 'Todos' || post.category === category
    return matchesSearch && matchesCategory
  }), [posts, search, category])

  return (
    <ConsultSiteShell>
      <main>
        <section className="relative overflow-hidden bg-[#075653] text-white">
          <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 78% 28%, rgba(138,230,0,.16), transparent 24%), linear-gradient(135deg, transparent 45%, rgba(5,210,157,.14) 100%)' }} />
          <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
            <ConsultEyebrow light>Conteúdo técnico</ConsultEyebrow>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-.04em] sm:text-5xl lg:text-6xl">Conhecimento técnico para decisões mais <span className="text-[#8AE600]">seguras</span></h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">Física Médica, Proteção Radiológica, controle de qualidade, Engenharia Clínica e temas que ajudam instituições de saúde a entender medições, ensaios, requisitos e boas práticas.</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/7 p-5 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[.2em] text-[#8AE600]">Arquitetura editorial</p>
                <p className="mt-3 text-sm leading-7 text-white/72">Cada artigo pode se conectar diretamente às páginas de serviços, equipamentos e regiões, fortalecendo a navegação e a estratégia de SEO da Consult.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F4FAF8]">
          <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
            <div className="grid gap-4 rounded-2xl border border-[#D9E9E5] bg-white p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-5">
              <label className="relative block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#62817E]" size={18} />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar no blog..." className="h-12 w-full rounded-xl border border-[#DDEBE8] bg-[#F8FBFA] pl-11 pr-4 text-sm outline-none transition focus:border-[#08A77F]" />
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button type="button" key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${category === item ? 'bg-[#075653] text-white' : 'border border-[#DDEBE8] bg-white text-[#496C69] hover:border-[#08A77F]'}`}>{item}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <ConsultEyebrow>Artigos</ConsultEyebrow>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653] md:text-4xl">Acervo técnico da Consult</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#607D7A]">O acervo histórico está sendo migrado para a nova estrutura editorial, sem dependência do sistema anterior.</p>
          </div>

          {filtered.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((post) => (
                <article key={post.id} className="group overflow-hidden rounded-[24px] border border-[#DCEAE7] bg-white shadow-[0_16px_45px_rgba(7,86,83,.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(7,86,83,.14)]">
                  <Link to={`/consult/blog/${post.slug}`} className="block">
                    <div className="relative h-56 overflow-hidden bg-[#075653]">
                      <img src={post.coverImage} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#043F3D]/82 via-[#043F3D]/10 to-transparent" />
                      <span className="absolute left-5 top-5 rounded-full bg-[#8AE600] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.13em] text-[#075653]">{post.category}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#78908E]"><CalendarDays size={14} /> {formatDate(post.publishedAt)}</div>
                      <h3 className="mt-4 text-xl font-black leading-7 text-[#075653] transition group-hover:text-[#08A77F]">{post.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#607D7A]">{post.excerpt}</p>
                      <span className="mt-5 inline-flex text-sm font-extrabold text-[#075653]">Ler conteúdo</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-[#DCEAE7] bg-[#F7FBFA] px-6 py-14 text-center text-sm text-[#607D7A]">Nenhum conteúdo encontrado com esses filtros.</div>
          )}
        </section>

        <section className="bg-[#EAF5F2]">
          <div className="mx-auto grid max-w-7xl gap-7 px-5 py-12 md:grid-cols-[.72fr_1.28fr] md:px-8 md:py-16">
            <div>
              <ConsultEyebrow>Conteúdo conectado</ConsultEyebrow>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#075653]">Do artigo para a solução técnica</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Física Médica', '/consult/areas/fisica-medica'],
                ['Proteção Radiológica', '/consult/areas/protecao-radiologica'],
                ['Engenharia Clínica', '/consult/areas/engenharia-clinica'],
              ].map(([label, href]) => (
                <Link key={href} to={href} className="rounded-2xl border border-[#CFE4DE] bg-white p-5 text-base font-black text-[#075653] shadow-sm transition hover:border-[#08A77F] hover:shadow-md">{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </ConsultSiteShell>
  )
}
