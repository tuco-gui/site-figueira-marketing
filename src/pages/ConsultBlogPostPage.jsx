import React, { useEffect, useState } from 'react'
import { CalendarDays, ExternalLink } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { getConsultBlogPost } from '@/lib/consultBlogRepository'

function formatDate(value) {
  return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function ConsultBlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined)

  useEffect(() => {
    getConsultBlogPost(slug).then((result) => {
      setPost(result)
      if (result) {
        document.title = `${result.title} | Consult`
        const description = document.querySelector('meta[name="description"]')
        description?.setAttribute('content', result.excerpt)
      }
    })
  }, [slug])

  if (post === undefined) {
    return <ConsultSiteShell><main className="mx-auto max-w-5xl px-5 py-24 text-center text-[#607D7A]">Carregando conteúdo...</main></ConsultSiteShell>
  }

  if (!post) {
    return (
      <ConsultSiteShell>
        <main className="mx-auto max-w-4xl px-5 py-24 text-center">
          <h1 className="text-4xl font-black text-[#075653]">Conteúdo não encontrado</h1>
          <Link to="/consult/blog" className="mt-8 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white">Voltar ao blog</Link>
        </main>
      </ConsultSiteShell>
    )
  }

  return (
    <ConsultSiteShell>
      <main>
        <article>
          <header className="relative overflow-hidden bg-[#075653] text-white">
            <div className="absolute inset-0">
              <img src={post.coverImage} alt="" className="h-full w-full object-cover opacity-18" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#064946] via-[#075653]/95 to-[#075653]/78" />
            </div>
            <div className="relative mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
              <Link to="/consult/blog" className="text-sm font-bold text-white/62 hover:text-white">Blog técnico</Link>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#8AE600] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-[#075653]">{post.category}</span>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-white/60"><CalendarDays size={14} /> {formatDate(post.publishedAt)}</span>
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-.04em] md:text-5xl">{post.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">{post.excerpt}</p>
            </div>
          </header>

          <section className="mx-auto grid max-w-5xl gap-10 px-5 py-12 md:grid-cols-[1fr_250px] md:px-8 md:py-16">
            <div>
              <ConsultEyebrow>Acervo técnico</ConsultEyebrow>
              <div className="mt-6 space-y-6 text-base leading-8 text-[#365A58]">
                {post.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              {post.migrationStatus === 'historical_summary' && post.sourceUrl && (
                <div className="mt-9 rounded-2xl border border-[#CFE4DE] bg-[#EAF5F2] p-6">
                  <p className="text-xs font-black uppercase tracking-[.2em] text-[#078B6B]">Acervo histórico</p>
                  <p className="mt-3 text-sm leading-7 text-[#4D706D]">Este conteúdo está em processo de migração integral para a nova estrutura editorial da Consult. Até a conclusão, a publicação original permanece disponível para consulta.</p>
                  <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#075653]">Ver publicação original <ExternalLink size={14} /></a>
                </div>
              )}
            </div>

            <aside>
              <div className="sticky top-24 rounded-2xl border border-[#DCEAE7] bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[.18em] text-[#08A77F]">Relacionados</p>
                <div className="mt-4 space-y-3">
                  {post.relatedLinks.map((item) => (
                    <Link key={item.href} to={item.href} className="block rounded-xl bg-[#F4FAF8] px-4 py-3 text-sm font-extrabold leading-5 text-[#075653] transition hover:bg-[#E6F5F0]">{item.label}</Link>
                  ))}
                </div>
                <p className="mt-5 border-t border-[#E1ECE9] pt-5 text-xs leading-5 text-[#78908E]">Publicado originalmente por {post.author} em {formatDate(post.publishedAt)}.</p>
              </div>
            </aside>
          </section>
        </article>

        <ConsultCtaBand />
      </main>
    </ConsultSiteShell>
  )
}
