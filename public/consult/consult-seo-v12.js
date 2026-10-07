(() => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (!path.startsWith('/consult')) return;

  const routes = {
    '/consult/fisica-medica': {
      title: 'Física Médica | Controle de Qualidade e Laudos | Consult',
      description: 'Física Médica para diagnóstico por imagem: Controle de Qualidade por modalidade, levantamento radiométrico, blindagem e laudos técnicos.',
      type: 'Service',
      canonical: '/consult/fisica-medica',
      crumbs: [['Consult','/consult'],['Física Médica','/consult/fisica-medica']],
    },
    '/consult/areas/fisica-medica': {
      title: 'Física Médica | Controle de Qualidade e Laudos | Consult',
      description: 'Física Médica para diagnóstico por imagem: Controle de Qualidade por modalidade, levantamento radiométrico, blindagem e laudos técnicos.',
      type: 'Service',
      canonical: '/consult/fisica-medica',
      crumbs: [['Consult','/consult'],['Física Médica','/consult/fisica-medica']],
    },
    '/consult/protecao-radiologica': {
      title: 'Proteção Radiológica | Consult Radiometria e Qualidade',
      description: 'Programa de Proteção Radiológica, levantamento radiométrico, projeto de blindagem, treinamentos e apoio ao licenciamento sanitário.',
      type: 'Service', canonical: '/consult/protecao-radiologica',
      crumbs: [['Consult','/consult'],['Proteção Radiológica','/consult/protecao-radiologica']],
    },
    '/consult/areas/protecao-radiologica': {
      title: 'Proteção Radiológica | Consult Radiometria e Qualidade',
      description: 'Programa de Proteção Radiológica, levantamento radiométrico, projeto de blindagem, treinamentos e apoio ao licenciamento sanitário.',
      type: 'Service', canonical: '/consult/protecao-radiologica',
      crumbs: [['Consult','/consult'],['Proteção Radiológica','/consult/protecao-radiologica']],
    },
    '/consult/engenharia-clinica': {
      title: 'Engenharia Clínica | Ensaios, Calibração e Laudos | Consult',
      description: 'Ensaios de segurança elétrica e desempenho, preventiva, reverificação e qualificação térmica com laudo por equipamento e rastreabilidade RBC.',
      type: 'Service', canonical: '/consult/engenharia-clinica',
      crumbs: [['Consult','/consult'],['Engenharia Clínica','/consult/engenharia-clinica']],
    },
    '/consult/areas/engenharia-clinica': {
      title: 'Engenharia Clínica | Ensaios, Calibração e Laudos | Consult',
      description: 'Ensaios de segurança elétrica e desempenho, preventiva, reverificação e qualificação térmica com laudo por equipamento e rastreabilidade RBC.',
      type: 'Service', canonical: '/consult/engenharia-clinica',
      crumbs: [['Consult','/consult'],['Engenharia Clínica','/consult/engenharia-clinica']],
    },
    '/consult/materiais': {
      title: 'Materiais Técnicos Gratuitos | Consult',
      description: 'Guias técnicos da Consult sobre normas, Controle de Qualidade, Física Médica, Proteção Radiológica e Engenharia Clínica.',
      type: 'CollectionPage', canonical: '/consult/materiais',
      crumbs: [['Consult','/consult'],['Materiais','/consult/materiais']],
    },
    '/consult/materiais/modelos-sinalizacao': {
      title: 'Modelos de Sinalização Técnica | Consult',
      description: 'Modelos ilustrativos de sinalização para radioproteção, áreas controladas e ressonância magnética, sujeitos à validação técnica.',
      type: 'WebPage', canonical: '/consult/materiais/modelos-sinalizacao',
      crumbs: [['Consult','/consult'],['Materiais','/consult/materiais'],['Modelos de sinalização','/consult/materiais/modelos-sinalizacao']],
    },
    '/consult/materiais/mapa-normas-radiologia': {
      title: 'Mapa de Normas por Modalidade | Consult',
      description: 'RDC 611/2022 e IN 90 a 97/2021 organizadas por modalidade de diagnóstico por imagem atendida pela Consult.',
      type: 'WebPage', canonical: '/consult/materiais/mapa-normas-radiologia',
      crumbs: [['Consult','/consult'],['Materiais','/consult/materiais'],['Mapa de normas','/consult/materiais/mapa-normas-radiologia']],
    },
    '/consult/materiais/guia-servicos-radiologia': {
      title: 'CQ, Radiometria ou Blindagem? | Consult',
      description: 'Entenda a diferença entre Controle de Qualidade, levantamento radiométrico e projeto de blindagem em serviços de radiologia.',
      type: 'WebPage', canonical: '/consult/materiais/guia-servicos-radiologia',
      crumbs: [['Consult','/consult'],['Materiais','/consult/materiais'],['Guia de serviços','/consult/materiais/guia-servicos-radiologia']],
    },
  };

  const data = routes[path];
  if (!data) return;

  const setMeta = (selector, attrName, attrValue, content) => {
    let node = document.head.querySelector(selector);
    if (!node) { node = document.createElement('meta'); node.setAttribute(attrName,attrValue); document.head.appendChild(node); }
    node.setAttribute('content',content);
  };

  document.title = data.title;
  setMeta('meta[name="description"]','name','description',data.description);
  setMeta('meta[property="og:title"]','property','og:title',data.title);
  setMeta('meta[property="og:description"]','property','og:description',data.description);
  setMeta('meta[property="og:url"]','property','og:url',`${location.origin}${data.canonical}`);
  setMeta('meta[name="twitter:title"]','name','twitter:title',data.title);
  setMeta('meta[name="twitter:description"]','name','twitter:description',data.description);

  const isTest = /(^|\.)figueiramarketing\.com\.br$/i.test(location.hostname) || /vercel\.app$/i.test(location.hostname);
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (isTest) {
    if (canonical) canonical.remove();
  } else {
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = `${location.origin}${data.canonical}`;
  }

  const oldLd = document.getElementById('consult-route-ldjson');
  if (oldLd) oldLd.remove();
  const ld = document.createElement('script');
  ld.id = 'consult-route-ldjson';
  ld.type = 'application/ld+json';
  const organizationId = `${location.origin}/consult#organization`;
  const page = {
    '@type': data.type,
    '@id': `${location.origin}${data.canonical}#page`,
    url: `${location.origin}${data.canonical}`,
    name: data.title.replace(/ \| .*$/,''),
    description: data.description,
  };
  if (data.type === 'Service') {
    page.provider = {'@type':'Organization','@id':organizationId,name:'Consult Radiometria e Qualidade'};
    page.areaServed = ['São Paulo','Paraná','Mato Grosso do Sul','Minas Gerais'];
  }
  ld.textContent = JSON.stringify({'@context':'https://schema.org','@graph':[
    {'@type':'Organization','@id':organizationId,name:'Consult Radiometria e Qualidade',address:{'@type':'PostalAddress',addressLocality:'Matão',addressRegion:'SP',addressCountry:'BR'}},
    page,
    {'@type':'BreadcrumbList','@id':`${location.origin}${data.canonical}#breadcrumb`,itemListElement:data.crumbs.map(([name,url],index)=>({'@type':'ListItem',position:index+1,name,item:`${location.origin}${url}`}))},
  ]});
  document.head.appendChild(ld);
})();
