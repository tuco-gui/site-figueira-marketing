(() => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (!path.startsWith("/consult")) return;

  const areaMeta = {
    "fisica-medica": [
      "Física Médica | Consult Radiometria e Qualidade",
      "Controle de qualidade, medições e laudos para equipamentos de diagnóstico por imagem, com atendimento presencial em SP, PR, MS e MG.",
    ],
    "protecao-radiologica": [
      "Proteção Radiológica | Consult Radiometria e Qualidade",
      "Programa de Proteção Radiológica, levantamento radiométrico, blindagem, treinamentos e apoio ao licenciamento sanitário.",
    ],
    "engenharia-clinica": [
      "Consult Engenharia Clínica | Ensaios, calibração e laudos",
      "Ensaios de segurança elétrica e desempenho, manutenção preventiva, reverificação e qualificação térmica com laudo por equipamento.",
    ],
  };

  const serviceMeta = {
    "controle-qualidade": ["Controle de Qualidade de Equipamentos | Consult", "Testes periódicos de dose, qualidade de imagem e funcionamento com laudo técnico e normas aplicáveis por modalidade."],
    "programa-protecao-radiologica": ["Programa de Proteção Radiológica | Consult", "Elaboração e acompanhamento do Programa de Proteção Radiológica para serviços de radiologia diagnóstica e intervencionista."],
    "levantamento-radiometrico": ["Levantamento Radiométrico | Consult", "Medição da radiação nas áreas ao redor da sala e avaliação da radiação de fuga do cabeçote, com documentação técnica."],
    "projeto-blindagem": ["Projeto de Blindagem Radiológica | Consult", "Cálculo técnico de blindagem para obras, reformas, expansões ou troca de equipamentos de radiologia."],
    treinamentos: ["Treinamentos em Radioproteção e Segurança em RM | Consult", "Capacitação periódica de equipes em radioproteção e segurança em ressonância magnética."],
    "licenciamento-sanitario": ["Licenciamento Sanitário para Radiologia | Consult", "Apoio técnico e documental para obtenção ou renovação de licença da vigilância sanitária."],
  };

  const engineeringMeta = {
    "seguranca-eletrica": ["Ensaio de Segurança Elétrica | Consult Engenharia Clínica", "Medição de aterramento, isolamento e correntes de fuga conforme ABNT NBR IEC 62353, com laudo por equipamento."],
    "desempenho-calibracao": ["Ensaio de Desempenho e Calibração | Consult Engenharia Clínica", "Comparação ponto a ponto do desempenho do equipamento com analisador ou simulador calibrado, com desvios e conformidade documentados."],
    "manutencao-preventiva": ["Manutenção Preventiva | Consult Engenharia Clínica", "Limpeza, lubrificação e testes de funcionamento, com pendências documentadas. A Consult não vende nem troca peças."],
    reverificacao: ["Reverificação de Equipamentos | Consult Engenharia Clínica", "Novo ensaio após a correção de uma pendência, com emissão de laudo atualizado."],
    "qualificacao-termica": ["Qualificação Térmica | Consult Engenharia Clínica", "Mapeamento de temperatura com sensores calibrados e relatório de qualificação para equipamentos térmicos."],
  };

  const equipmentNames = {
    "monitor-multiparametrico": "Monitor multiparamétrico",
    eletrocardiografo: "Eletrocardiógrafo",
    "oximetro-pulso": "Oxímetro de pulso",
    "esfigmomanometro-mapa": "Esfigmomanômetro digital e MAPA",
    "desfibrilador-cardioversor-dea": "Desfibrilador, cardioversor e DEA",
    "marca-passo-transcutaneo": "Marca-passo transcutâneo",
    "bisturi-eletrico": "Bisturi elétrico",
    "ventilador-pulmonar": "Ventilador pulmonar",
    "aparelho-anestesia": "Aparelho de anestesia",
    "cpap-bipap": "CPAP e BiPAP",
    "fluxometro-manometro-o2": "Fluxômetro e manômetro de O₂",
    autoclave: "Autoclave",
    "termodesinfectora-estufa": "Termodesinfectora e estufa",
    "estufa-banho-maria": "Estufa e banho-maria de laboratório",
    "geladeira-camara-vacina": "Geladeira e câmara de vacina",
  };

  const regionNames = {
    "sao-paulo": ["São Paulo", "em São Paulo"],
    parana: ["Paraná", "no Paraná"],
    "mato-grosso-do-sul": ["Mato Grosso do Sul", "em Mato Grosso do Sul"],
    "minas-gerais": ["Minas Gerais", "em Minas Gerais"],
  };

  let title = "Consult Radiometria e Qualidade | Física Médica e Engenharia Clínica";
  let description = "Medição, ensaio, calibração, qualificação e laudos técnicos em Física Médica, Proteção Radiológica e Engenharia Clínica.";
  let keywords = "Consult Radiometria e Qualidade, Física Médica, Proteção Radiológica, Engenharia Clínica, laudo técnico";
  let type = "WebPage";

  const areaMatch = path.match(/^\/consult\/areas\/([^/]+)$/);
  const serviceMatch = path.match(/^\/consult\/servicos\/([^/]+)$/);
  const engineeringMatch = path.match(/^\/consult\/engenharia-clinica\/([^/]+)$/);
  const equipmentMatch = path.match(/^\/consult\/equipamentos\/([^/]+)$/);
  const regionMatch = path.match(/^\/consult\/regioes\/([^/]+)$/);

  if (areaMatch && areaMeta[areaMatch[1]]) {
    [title, description] = areaMeta[areaMatch[1]];
    keywords = `${areaMatch[1].replaceAll("-", " ")}, Consult, laudo técnico, SP, PR, MS, MG`;
    type = "Service";
  } else if (serviceMatch && serviceMeta[serviceMatch[1]]) {
    [title, description] = serviceMeta[serviceMatch[1]];
    keywords = `${serviceMatch[1].replaceAll("-", " ")}, Física Médica, Proteção Radiológica, Consult`;
    type = "Service";
  } else if (engineeringMatch && engineeringMeta[engineeringMatch[1]]) {
    [title, description] = engineeringMeta[engineeringMatch[1]];
    keywords = `${engineeringMatch[1].replaceAll("-", " ")}, Engenharia Clínica, laudo técnico, Consult`;
    type = "Service";
  } else if (equipmentMatch && equipmentNames[equipmentMatch[1]]) {
    const name = equipmentNames[equipmentMatch[1]];
    title = `Ensaio de ${name} | Consult Engenharia Clínica`;
    description = `Ensaios de segurança elétrica e desempenho para ${name}, com analisadores calibrados e resultado documentado em laudo técnico.`;
    keywords = `${name}, ensaio, calibração, segurança elétrica, Engenharia Clínica, Consult`;
    type = "Service";
  } else if (regionMatch && regionNames[regionMatch[1]]) {
    const [name, prep] = regionNames[regionMatch[1]];
    title = `Consult ${prep} | Física Médica e Engenharia Clínica`;
    description = `Atendimento presencial da Consult ${prep} para Física Médica, Proteção Radiológica e Engenharia Clínica, com medições, ensaios e laudos técnicos.`;
    keywords = `Física Médica ${name}, Proteção Radiológica ${name}, Engenharia Clínica ${name}, Consult`;
    type = "Service";
  }

  const setMeta = (selector, attrName, attrValue, content) => {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attrName, attrValue);
      document.head.appendChild(node);
    }
    node.setAttribute("content", content);
  };

  document.title = title;
  setMeta('meta[name="description"]', "name", "description", description);
  setMeta('meta[name="keywords"]', "name", "keywords", keywords);
  setMeta('meta[property="og:title"]', "property", "og:title", title);
  setMeta('meta[property="og:description"]', "property", "og:description", description);
  setMeta('meta[property="og:type"]', "property", "og:type", "website");
  setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Consult Radiometria e Qualidade");
  setMeta('meta[property="og:url"]', "property", "og:url", `${location.origin}${path}`);
  setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
  setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
  setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");

  const isFigueiraTest = /(^|\.)figueiramarketing\.com\.br$/i.test(location.hostname) || /vercel\.app$/i.test(location.hostname);
  setMeta('meta[name="robots"]', "name", "robots", isFigueiraTest ? "noindex, nofollow" : "index, follow");

  if (isFigueiraTest) {
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.remove();
  }

  const oldLd = document.getElementById("consult-route-ldjson");
  if (oldLd) oldLd.remove();
  const ld = document.createElement("script");
  ld.id = "consult-route-ldjson";
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": type,
    name: title.replace(/ \| .*$/, ""),
    description,
    provider: {
      "@type": "Organization",
      name: "Consult Radiometria e Qualidade",
      address: { "@type": "PostalAddress", addressLocality: "Matão", addressRegion: "SP", addressCountry: "BR" },
    },
    areaServed: ["São Paulo", "Paraná", "Mato Grosso do Sul", "Minas Gerais"],
  });
  document.head.appendChild(ld);
})();
