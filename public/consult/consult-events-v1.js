(() => {
  const isConsult = () => window.location.pathname.startsWith('/consult');
  if (!isConsult()) return;

  const LEAD_ENDPOINT = 'https://jinhjdvrjvmammumbacz.supabase.co/functions/v1/consult-lead';
  const CONTACT_KEY = 'consult_lead_contact';
  window.dataLayer = window.dataLayer || [];

  const cleanText = (value = '') => String(value).replace(/\s+/g, ' ').trim().slice(0, 160);
  const pageType = (path = window.location.pathname) => {
    if (path === '/consult' || path === '/consult/') return 'home';
    if (path === '/consult/sobre') return 'about';
    if (path === '/consult/servicos') return 'services';
    if (/^\/consult\/fisica-medica\/controle-de-qualidade\//.test(path)) return 'quality_modality';
    if (/^\/consult\/fisica-medica/.test(path)) return 'physics';
    if (/^\/consult\/protecao-radiologica/.test(path)) return 'radiological_protection';
    if (/^\/consult\/engenharia-clinica\/equipamentos\//.test(path)) return 'equipment';
    if (/^\/consult\/engenharia-clinica/.test(path)) return 'engineering_service';
    if (/^\/consult\/atuacao\//.test(path)) return 'region';
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

  const utmPayload = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
    };
  };

  const serviceContext = (anchor) => {
    const h1 = document.querySelector('main h1');
    return cleanText(h1?.textContent || anchor?.textContent || document.title);
  };

  async function registerWhatsAppIntent(contact, anchor) {
    const response = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'whatsapp_intent',
        name: contact.name,
        phone: contact.phone,
        service: serviceContext(anchor),
        source: 'whatsapp_cta',
        page_path: window.location.pathname,
        referrer: document.referrer || '',
        ...utmPayload(),
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result?.ok) throw new Error(result?.error || 'Não foi possível registrar o contato.');
    push('whatsapp_lead_registered', { lead_id: result.lead_id || null, service: serviceContext(anchor) });
    return result;
  }

  function readSavedContact() {
    try {
      const value = JSON.parse(sessionStorage.getItem(CONTACT_KEY) || 'null');
      if (value?.name && value?.phone) return value;
    } catch {}
    return null;
  }

  function saveContact(contact) {
    try { sessionStorage.setItem(CONTACT_KEY, JSON.stringify(contact)); } catch {}
  }

  function showWhatsAppCapture(anchor) {
    const existing = document.getElementById('consult-whatsapp-capture');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'consult-whatsapp-capture';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,35,33,.72);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)';

    const dialog = document.createElement('div');
    dialog.setAttribute('role','dialog');
    dialog.setAttribute('aria-modal','true');
    dialog.setAttribute('aria-labelledby','consult-wa-title');
    dialog.style.cssText = 'width:min(100%,430px);background:#fff;color:#123c3b;border-radius:18px;padding:24px;box-shadow:0 24px 70px rgba(0,0,0,.28);font-family:Arial,sans-serif';

    const title = document.createElement('h2');
    title.id = 'consult-wa-title';
    title.textContent = 'Antes de abrir o WhatsApp';
    title.style.cssText = 'margin:0;font-size:22px;font-weight:800';

    const intro = document.createElement('p');
    intro.textContent = 'Informe seu nome e telefone. Assim a Consult registra a origem do contato antes de abrir a conversa.';
    intro.style.cssText = 'margin:10px 0 18px;color:#5b6f6d;font-size:14px;line-height:1.55';

    const form = document.createElement('form');
    form.noValidate = false;

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Nome';
    nameLabel.htmlFor = 'consult-wa-name';
    nameLabel.style.cssText = 'display:block;font-size:12px;font-weight:700;margin-bottom:6px';

    const name = document.createElement('input');
    name.id = 'consult-wa-name';
    name.name = 'name';
    name.required = true;
    name.autocomplete = 'name';
    name.placeholder = 'Seu nome';
    name.style.cssText = 'width:100%;box-sizing:border-box;height:46px;border:1px solid #d8e2e0;border-radius:10px;padding:0 12px;font-size:14px;outline:none';

    const phoneLabel = document.createElement('label');
    phoneLabel.textContent = 'Telefone / WhatsApp';
    phoneLabel.htmlFor = 'consult-wa-phone';
    phoneLabel.style.cssText = 'display:block;font-size:12px;font-weight:700;margin:14px 0 6px';

    const phone = document.createElement('input');
    phone.id = 'consult-wa-phone';
    phone.name = 'phone';
    phone.type = 'tel';
    phone.required = true;
    phone.autocomplete = 'tel';
    phone.placeholder = '(DDD) número';
    phone.style.cssText = name.style.cssText;

    const error = document.createElement('p');
    error.setAttribute('role','alert');
    error.style.cssText = 'display:none;margin:12px 0 0;color:#a11;font-size:12px;font-weight:700';

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:10px;margin-top:18px';

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.textContent = 'Cancelar';
    cancel.style.cssText = 'flex:1;min-height:46px;border:1px solid #bfd1ce;background:#fff;color:#123c3b;border-radius:10px;font-weight:800;cursor:pointer';

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Continuar no WhatsApp';
    submit.style.cssText = 'flex:1.5;min-height:46px;border:0;background:#08a77f;color:#fff;border-radius:10px;font-weight:800;cursor:pointer';

    const privacy = document.createElement('p');
    privacy.style.cssText = 'margin:14px 0 0;color:#758684;font-size:11px;line-height:1.45';
    privacy.innerHTML = 'Os dados serão usados para atender este contato. <a href="/consult/politica-de-privacidade" style="color:#075653;font-weight:700;text-decoration:underline">Política de Privacidade</a>.';

    actions.append(cancel, submit);
    form.append(nameLabel, name, phoneLabel, phone, error, actions, privacy);
    dialog.append(title, intro, form);
    overlay.append(dialog);
    document.body.append(overlay);
    name.focus();

    const close = () => overlay.remove();
    cancel.addEventListener('click', close);
    overlay.addEventListener('click', (event) => { if (event.target === overlay) close(); });
    document.addEventListener('keydown', function onKey(event) {
      if (event.key === 'Escape' && document.body.contains(overlay)) {
        close();
        document.removeEventListener('keydown', onKey);
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const contact = { name: name.value.trim(), phone: phone.value.trim() };
      if (contact.name.length < 2 || contact.phone.replace(/\D/g,'').length < 8) {
        error.textContent = 'Preencha nome e telefone válidos.';
        error.style.display = 'block';
        return;
      }
      submit.disabled = true;
      submit.textContent = 'Registrando...';
      error.style.display = 'none';

      try {
        await registerWhatsAppIntent(contact, anchor);
        saveContact(contact);
        close();
        window.location.assign(anchor.href);
      } catch (err) {
        error.textContent = err instanceof Error ? err.message : 'Não foi possível registrar o contato.';
        error.style.display = 'block';
        submit.disabled = false;
        submit.textContent = 'Continuar no WhatsApp';
      }
    });
  }

  const classifyClick = (anchor) => {
    const href = anchor.getAttribute('href') || '';
    const label = cleanText(anchor.textContent || anchor.getAttribute('aria-label') || '');
    if (/wa\.me\//i.test(href)) return ['contact_whatsapp_click', { link_url: href, link_text: label || 'WhatsApp' }];
    if (/clientes\.figueiramarketing\.com\.br\/consult/i.test(href)) return ['client_portal_click', { link_url: href, link_text: label || 'Área do cliente' }];
    if (/agende|reuni[aã]o/i.test(label) || /#contato$/i.test(href)) return ['meeting_cta_click', { link_url: href, link_text: label }];
    if (/^mailto:/i.test(href)) return ['email_click', { link_url: href, link_text: label }];
    if (/^tel:/i.test(href)) return ['phone_click', { link_url: href, link_text: label }];
    if (/^\/consult\/blog\//.test(href)) return ['blog_article_click', { link_url: href, link_text: label }];
    if (/^\/consult\/(fisica-medica|protecao-radiologica|engenharia-clinica|servicos|atuacao)\//.test(href)) return ['technical_content_click', { link_url: href, link_text: label }];
    return null;
  };

  document.addEventListener('click', async (event) => {
    const anchor = event.target.closest('a');
    if (!anchor || !isConsult()) return;

    const classified = classifyClick(anchor);
    if (classified) push(classified[0], classified[1]);

    if (/wa\.me\//i.test(anchor.href || '')) {
      event.preventDefault();
      const saved = readSavedContact();
      if (!saved) {
        showWhatsAppCapture(anchor);
        return;
      }

      try {
        await registerWhatsAppIntent(saved, anchor);
        window.location.assign(anchor.href);
      } catch {
        // Se o registro falhar, mostramos o formulário para nova tentativa em vez de perder o lead.
        showWhatsAppCapture(anchor);
      }
    }
  }, true);

  document.addEventListener('submit', (event) => {
    if (!isConsult()) return;
    const form = event.target;
    if (form.id === 'consult-whatsapp-capture') return;
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
