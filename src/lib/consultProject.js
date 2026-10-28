export const CONSULT_PROJECT = {
  clientId: '0b88061b-676d-48fb-846a-2483b0cf8284',
  projectId: '6bf62bce-b7ff-46f1-84e9-07c54689a8e4',
  clientSlug: 'consult',
  siteBasePath: '/consult',
  blogBasePath: '/consult/blog',
  portalUrl: 'https://radiationqa.com.br/login',
  homologationUrl: 'https://www.figueiramarketing.com.br/consult',
  reports: {
    location: 'client_portal',
    private: true,
    source: 'client_reports',
  },
  content: {
    blogEnabled: true,
    provider: 'supabase_site_posts',
    publicTable: 'site_posts',
    fallback: 'local_seed',
  },
}

export function getConsultBasePath() {
  if (typeof window !== 'undefined' && ['consult.med.br', 'www.consult.med.br'].includes(window.location.hostname)) {
    return ''
  }
  return CONSULT_PROJECT.siteBasePath
}

export function consultPath(path = '') {
  const suffix = String(path || '').replace(/^\/+/, '')
  const base = getConsultBasePath()
  return suffix ? `${base}/${suffix}` : (base || '/')
}
