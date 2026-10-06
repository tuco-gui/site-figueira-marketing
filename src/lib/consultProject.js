export const CONSULT_PROJECT = {
  clientSlug: 'consult',
  siteBasePath: '/consult',
  blogBasePath: '/consult/blog',
  portalUrl: 'https://clientes.figueiramarketing.com.br/consult',
  homologationUrl: 'https://www.figueiramarketing.com.br/consult',
  reports: {
    location: 'client_portal',
    private: true,
    source: 'client_reports',
  },
  content: {
    blogEnabled: true,
    provider: 'pending_content_backend',
  },
}

export function consultPath(path = '') {
  const suffix = String(path || '').replace(/^\/+/, '')
  return suffix ? `${CONSULT_PROJECT.siteBasePath}/${suffix}` : CONSULT_PROJECT.siteBasePath
}
