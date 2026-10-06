(() => {
  const isConsult = () => window.location.pathname.startsWith('/consult');
  if (!isConsult()) return;

  window.dataLayer = window.dataLayer || [];

  const cleanText = (value = '') => String(value).replace(/\s+/g, ' ').trim().slice(0, 160);
  const pageType = (path = window.location.pathname) => {
    if (path === '/consult' || path === '/consult/') return 'home';
    if (/^\/consult\/areas\//.test(path)) return 'area';
    if (/^\/consult\/servicos\//.test(path)) return 'service';
    if (/^\/consult\/engenharia-clinica\//.test(path)) return 'engineering_service';
    if (/^\/consult\/equipamentos\//.test(path)) return 'equipment';
    if (/^\/consult\/regioes\//.test(path)) return 'region';
    if (/^\/consult\/blog\//.test(path)) return 'blog_article';
    if (/^\/consult\/blog/.test(path)) return 'blog';
    return 'other';
  };

  const push = (event, payload = {}) => {
    const data = {
      event,
      site: 'consult',
      environment: /figueiramarketing\.com\.br|vercel\.app/i.test(window.location.hostname) ? 'homologation' : 'production',
      page_path: window.location.pathname,
      page_type: pageType(),
      page_title: document.title,
      ...payload,
    };
    window.dataLayer.push(data);
    window.dispatchEvent(new CustomEvent('consult:analytics', { detail: data }));
  };

  const classifyClick = (anchor) => {
    const href = anchor.getAttribute('href') || '';
    const label = cleanText(anchor.textContent || anchor.getAttribute('aria-label') || '');
    if (/wa\.me\//i.test(href)) return ['contact_whatsapp_click', { link_url: href, link_text: label || 'WhatsApp' }];
    if (/clientes\.figueiramarketing\.com\.br\/consult/i.test(href)) return ['client_portal_click', { link_url: href, link_text: label || 'Área do cliente' }];
    if (/agende|reuni[aã]o/i.test(label) || /#contato$/i.test(href)) return ['meeting_cta_click', { link_url: href, link_text: label }];
    if (/^mailto:/i.test(href)) return ['email_click', { link_url: href, link_text: label }];
    if (/^tel:/i.test(href)) return ['phone_click', { link_url: href, link_text: label }];
    if (/^\/consult\/blog\//.test(href)) return ['blog_article_click', { link_url: href, link_text: label }];
    if (/^\/consult\/(areas|servicos|engenharia-clinica|equipamentos|regioes)\//.test(href)) return ['technical_content_click', { link_url: href, link_text: label }];
    return null;
  };

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a');
    if (!anchor || !isConsult()) return;
    const classified = classifyClick(anchor);
    if (classified) push(classified[0], classified[1]);
  }, true);

  document.addEventListener('submit', (event) => {
    if (!isConsult()) return;
    const form = event.target;
    push('lead_form_submit', {
      form_id: form.id || form.getAttribute('name') || 'consult_form',
      form_location: cleanText(form.closest('section')?.querySelector('h2,h3')?.textContent || ''),
    });
  }, true);

  let lastPath = window.location.pathname;
  const onRouteChange = () => {
    if (!isConsult()) return;
    const next = window.location.pathname;
    if (next === lastPath) return;
    lastPath = next;
    setTimeout(() => push('page_view', { page_location: window.location.href }), 0);
  };

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  history.pushState = function (...args) {
    const result = originalPushState.apply(this, args);
    onRouteChange();
    return result;
  };
  history.replaceState = function (...args) {
    const result = originalReplaceState.apply(this, args);
    onRouteChange();
    return result;
  };
  window.addEventListener('popstate', onRouteChange);

  push('page_view', { page_location: window.location.href });
})();
