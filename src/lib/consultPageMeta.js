const ORIGIN = 'https://www.figueiramarketing.com.br'

// The prerendered HTML is correct on direct loads. Keep it correct after SPA
// navigation too, when the original document head remains mounted.
export function updateConsultPageMeta({ title, description, image }) {
  const path = window.location.pathname.replace(/\/+$/, '')
  const canonical = `${ORIGIN}${path}`
  if (document.title !== title) document.title = title
  const values = { 'og:title': title, 'twitter:title': title, 'og:url': canonical, 'og:type': path.startsWith('/consult/blog/') ? 'article' : 'website' }
  if (description) Object.assign(values, { description, 'og:description': description, 'twitter:description': description })
  if (image) {
    const url = new URL(image, ORIGIN).href
    Object.assign(values, { 'og:image': url, 'twitter:image': url })
  }
  for (const [key, content] of Object.entries(values)) {
    const attribute = key.startsWith('og:') ? 'property' : 'name'
    let meta = document.querySelector(`meta[${attribute}="${key}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(attribute, key)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = canonical
}
