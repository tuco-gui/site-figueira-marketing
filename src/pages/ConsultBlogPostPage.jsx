import { updateConsultPageMeta } from '@/lib/consultPageMeta'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { CalendarDays } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/consult/ConsultSiteShell'
import { getConsultBlogPost } from '@/lib/consultBlogRepository'

function formatDate(value) {
  if (!value) return null
  return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function ConsultBlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined)

  useEffect(() => {
    let active = true
    setPost(undefined)
    getConsultBlogPost(slug).then(result => { if (active) setPost(result) })
    return () => { active = false }
  }, [slug])

  useEffect(() => {
    if (post) updateConsultPageMeta({ title: post.seoTitle || `${post.title} | Consult`, description: post.seoDescription || post.excerpt, image: post.metadata?.og_image || post.coverImage })
  }, [post])


  useEffect(() => {
    if (!post) return
    document.querySelector('script[data-consult-blog="article"]')?.remove()
    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.dataset.consultBlog = 'article'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: post.title, description: post.seoDescription || post.excerpt,
      image: post.coverImage ? new URL(post.coverImage, window.location.origin).href : undefined,
      datePublished: post.publishedAt || undefined, dateModified: post.updatedAt || undefined,
      author: { '@type': post.author && post.author !== 'Consult' ? 'Person' : 'Organization', name: post.author || 'Consult' },
      publisher: { '@type': 'Organization', name: 'Consult Radiometria e Qualidade' },
      articleSection: post.category,
      mainEntityOfPage: window.location.origin + window.location.pathname,
    }).replace(/</g, '\\u003c')
    document.head.appendChild(schema)
    return () => { schema.remove() }
  }, [post])

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
              <img src={post.coverImage} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-18" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#064946] via-[#075653]/95 to-[#075653]/78" />
            </div>
            <div className="relative mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
              <Link to="/consult/blog" className="text-sm font-bold text-white/62 hover:text-white">Blog técnico</Link>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#8AE600] px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] text-[#075653]">{post.category}</span>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-white/60">{post.publishedAt && <><CalendarDays size={14}/> {formatDate(post.publishedAt)}</>}</span>
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-.04em] md:text-5xl">{post.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">{post.excerpt}</p>
            </div>
          </header>

          <section className="mx-auto grid max-w-5xl gap-10 px-5 py-12 md:grid-cols-[1fr_250px] md:px-8 md:py-16">
            <div>
              <ConsultEyebrow>{post.category}</ConsultEyebrow>
              {post.coverImage && !post.contentHtml && <figure className="mt-6"><img src={post.coverImage} alt={post.coverAlt || post.title} className="w-full rounded-2xl" width={post.coverImage.includes('radiodiagnostico') ? 1600 : 1448} height={post.coverImage.includes('radiodiagnostico') ? 1067 : 1086}/><figcaption className="mt-2 text-sm text-[#607D7A]">Imagem ilustrativa.</figcaption></figure>}
              <div className="mt-6 space-y-6 text-base leading-8 text-[#365A58]">
                {post.contentHtml ? <div className="consult-article-content" dangerouslySetInnerHTML={{__html:post.contentHtml}}/> : post.contentMarkdown ? <div className="consult-article-content"><ReactMarkdown components={{ h2: ({children}) => <h2 className="text-2xl font-extrabold leading-tight text-[#075653]">{children}</h2>, h3: ({children}) => <h3 className="text-xl font-bold text-[#075653]">{children}</h3> }}>{post.contentMarkdown}</ReactMarkdown></div> : post.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

            </div>

            <aside>
              <div className="sticky top-24 rounded-2xl border border-[#DCEAE7] bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[.18em] text-[#08A77F]">Relacionados</p>
                <div className="mt-4 space-y-3">
                  {post.relatedLinks.map((item) => (
                    <Link key={item.href} to={item.href} className="block rounded-xl bg-[#F4FAF8] px-4 py-3 text-sm font-extrabold leading-5 text-[#075653] transition hover:bg-[#E6F5F0]">{item.label}</Link>
                  ))}
                </div>
                <p className="mt-5 border-t border-[#E1ECE9] pt-5 text-xs leading-5 text-[#78908E]">Por {post.author}{post.publishedAt ? ` em ${formatDate(post.publishedAt)}` : ''}.{post.updatedAt && <span className="mt-2 block">Atualizado em {formatDate(post.updatedAt)}.</span>}</p>
                {post.metadata?.cta_text && post.metadata?.cta_link && <Link to={post.metadata.cta_link} className="mt-5 block rounded-xl bg-[#ff6d20] px-4 py-3 text-center text-sm font-bold text-white">{post.metadata.cta_text}</Link>}
              </div>
            </aside>
          </section>
        </article>

        <ConsultCtaBand />
      </main>
    </ConsultSiteShell>
  )
}
