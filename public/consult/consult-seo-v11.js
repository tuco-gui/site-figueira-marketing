(() => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (!path.startsWith("/consult")) return;

  const areaMeta = {
    "fisica-medica": ["Física Médica | Consult Radiometria e Qualidade","Controle de qualidade, medições e laudos para equipamentos de diagnóstico por imagem, com atendimento em todo o Brasil e equipes em campo em SP, PR, MS e MG."],
    "protecao-radiologica": ["Proteção Radiológica | Consult Radiometria e Qualidade","Programa de Proteção Radiológica, levantamento radiométrico, blindagem, treinamentos e apoio ao licenciamento sanitário."],
    "engenharia-clinica": ["Consult Engenharia Clínica | Ensaios, calibração e laudos","Ensaios de segurança elétrica e desempenho, manutenção preventiva, reverificação e qualificação térmica com laudo por equipamento."],
  };

  const serviceMeta = {
    "controle-qualidade": ["Controle de Qualidade em Radiologia | RDC 611 | Consult","Testes de qualidade em radiodiagnóstico conforme RDC 611/2022 e INs 90 a 97, com laudo técnico assinado pelo físico médico."],
    "controle-de-qualidade": ["Controle de Qualidade em Diagnóstico por Imagem | Consult","Controle de Qualidade por modalidade, com referências específicas, medições documentadas e laudo técnico assinado pelo físico médico."],
    "programa-protecao-radiologica": ["Programa de Proteção Radiológica | Consult","Elaboração e acompanhamento do Programa de Proteção Radiológica para serviços de radiologia diagnóstica e intervencionista."],
    "levantamento-radiometrico": ["Levantamento Radiométrico | Consult","Medição da radiação nas áreas ao redor da sala e avaliação da radiação de fuga do cabeçote, com resultado técnico documentado."],
    "projeto-blindagem": ["Projeto de Blindagem Radiológica | Consult","Cálculo técnico e memorial de blindagem para obras, reformas, expansões ou troca de equipamentos de radiologia."],
    treinamentos: ["Treinamentos em Radioproteção e Segurança em RM | Consult","Capacitação periódica de equipes em radioproteção e segurança em ressonância magnética."],
    "licenciamento-sanitario": ["Licenciamento Sanitário para Radiologia | Consult","Apoio técnico e documental para obtenção ou renovação de licença da vigilância sanitária."],
  };

  const engineeringMeta = {
    "seguranca-eletrica": ["Ensaio de Segurança Elétrica IEC 62353 | Consult","Medição de aterramento, isolamento e correntes de fuga conforme ABNT NBR IEC 62353, com laudo por equipamento."],
    "desempenho-calibracao": ["Calibração e Ensaio de Desempenho | Consult","Ensaio de desempenho com comparação ponto a ponto, documentação de valores, desvios e conformidade, com padrões de rastreabilidade RBC/Inmetro."],
    "manutencao-preventiva": ["Manutenção Preventiva | Consult Engenharia Clínica","Limpeza, lubrificação e testes de funcionamento, com atividades e pendências documentadas em laudo por equipamento."],
    reverificacao: ["Reverificação de Equipamentos | Consult Engenharia Clínica","Novo ensaio após tratamento de uma pendência, com emissão de laudo atualizado e histórico técnico."],
    "qualificacao-termica": ["Qualificação Térmica de Autoclaves e Câmaras | Consult","Mapeamento de temperatura com sensores calibrados e relatório com registros, gráficos e conformidade."],
  };

  const modalityMeta = {
    "raio-x-convencional": ["Controle de Qualidade em Raios X | IN 90 | Consult","Controle de qualidade em radiografia convencional conforme RDC 611/2022 e IN 90/2021, com laudo técnico."],
    "fluoroscopia-arco-c-angiografia": ["CQ em Fluoroscopia e Arco C | IN 91 | Consult","Controle de qualidade em fluoroscopia, arco cirúrgico e angiografia conforme RDC 611/2022 e IN 91/2021."],
    mamografia: ["Controle de Qualidade em Mamografia | IN 92 | Consult","Ensaios de controle de qualidade em mamografia conforme RDC 611/2022 e IN 92/2021, com resultado técnico documentado."],
    tomografia: ["Controle de Qualidade em Tomografia | IN 93 | Consult","Controle de qualidade em tomografia computadorizada conforme RDC 611/2022 e IN 93/2021."],
    "odontologico-extraoral": ["CQ em Radiologia Odontológica Extraoral | Consult","Controle de qualidade em radiologia odontológica extraoral conforme RDC 611/2022 e IN 94/2021."],
    "odontologico-intraoral": ["CQ em Radiologia Odontológica Intraoral | Consult","Controle de qualidade em radiologia odontológica intraoral conforme RDC 611/2022 e IN 95/2021."],
    ultrassom: ["Controle de Qualidade em Ultrassom | IN 96 | Consult","Ensaios de controle de qualidade em ultrassom conforme IN 96/2021, com desempenho e qualidade de imagem documentados."],
    "ressonancia-magnetica": ["Controle de Qualidade em Ressonância Magnética | Consult","Controle de qualidade em ressonância magnética conforme IN 97/2021, com avaliação de desempenho e qualidade de imagem."],
    "densitometria-ossea": ["Controle de Qualidade em Densitometria Óssea | Consult","Controle de qualidade em densitometria óssea dentro da base geral da RDC 611/2022, conforme escopo técnico da Consult."],
    "raio-x-veterinario": ["Controle de Qualidade em Raios X Veterinário | Consult","Avaliação técnica de raios X veterinário com base na RDC 611/2022 e IN 90/2021 como referência técnica indicada pela Consult."],
  };

  const equipmentNames = {
    "monitor-multiparametrico":"Monitor multiparamétrico", eletrocardiografo:"Eletrocardiógrafo", "oximetro-pulso":"Oxímetro de pulso", "esfigmomanometro-mapa":"Esfigmomanômetro digital e MAPA", "desfibrilador-cardioversor-dea":"Desfibrilador, cardioversor e DEA", "marca-passo-transcutaneo":"Marca-passo transcutâneo", "bisturi-eletrico":"Bisturi elétrico", "ventilador-pulmonar":"Ventilador pulmonar", "aparelho-anestesia":"Aparelho de anestesia", "cpap-bipap":"CPAP e BiPAP", "fluxometro-manometro-o2":"Fluxômetro e manômetro de O₂", "concentrador-oxigenio":"Concentrador de oxigênio", autoclave:"Autoclave", termodesinfectora:"Termodesinfectora", "estufa-banho-maria":"Estufa e banho-maria de laboratório", "geladeira-camara-vacina":"Geladeira e câmara de vacina",
  };

  const regionNames = {
    "sao-paulo":["São Paulo","em São Paulo"], parana:["Paraná","no Paraná"], "mato-grosso-do-sul":["Mato Grosso do Sul","em Mato Grosso do Sul"], "minas-gerais":["Minas Gerais","em Minas Gerais"],
  };

  const blogMeta = {
    "educacao-continuada-cursos-digitais-radioprotecao":["Educação continuada e cursos de radioproteção | Consult","A Consult amplia o acesso a treinamentos online de proteção radiológica, qualidade em radiodiagnóstico e segurança em ressonância magnética."],
    "iaea-hhs-47-controle-qualidade-equipamentos":["IAEA HHS 47 e controle de qualidade | Consult","Entenda a importância do guia IAEA HHS 47 para testes de controle de qualidade em radiologia diagnóstica."],
    "protecao-radiologica-equipamentos-arco-c":["Proteção radiológica em equipamentos Arco C | Consult","Conteúdo técnico sobre exposição ocupacional, proteção e uso seguro de equipamentos Arco C."],
  };

  let title = "Consult Radiometria e Qualidade | Física Médica e Consult Engenharia Clínica";
  let description = "Medição, ensaio, calibração, qualificação e laudos técnicos em Física Médica, Proteção Radiológica e Consult Engenharia Clínica, com atendimento em todo o Brasil.";
  let keywords = "Consult Radiometria e Qualidade, Física Médica, Proteção Radiológica, Engenharia Clínica, laudo técnico";
  let schemaType = "WebPage";
  let canonicalPath = path;
  let crumbs = [["Consult","/consult"]];

  const areaMatch = path.match(/^\/consult\/areas\/([^/]+)$/);
  const directAreaMatch = path.match(/^\/consult\/(fisica-medica|protecao-radiologica|engenharia-clinica)$/);
  const oldServiceMatch = path.match(/^\/consult\/servicos\/([^/]+)$/);
  const siloServiceMatch = path.match(/^\/consult\/fisica-medica\/([^/]+)$/);
  const protectionServiceMatch = path.match(/^\/consult\/protecao-radiologica\/([^/]+)$/);
  const modalityMatch = path.match(/^\/consult\/fisica-medica\/controle-de-qualidade\/([^/]+)$/);
  const engineeringMatch = path.match(/^\/consult\/engenharia-clinica\/([^/]+)$/);
  const oldEquipmentMatch = path.match(/^\/consult\/equipamentos\/([^/]+)$/);
  const siloEquipmentMatch = path.match(/^\/consult\/engenharia-clinica\/equipamentos\/([^/]+)$/);
  const oldRegionMatch = path.match(/^\/consult\/regioes\/([^/]+)$/);
  const siloRegionMatch = path.match(/^\/consult\/atuacao\/([^/]+)$/);
  const blogMatch = path.match(/^\/consult\/blog\/([^/]+)$/);

  if (path === "/consult/politica-de-privacidade") {
    title = "Política de Privacidade | Consult Radiometria e Qualidade";
    description = "Política de Privacidade do site da Consult: dados coletados, finalidades, segurança, cookies e direitos previstos na LGPD.";
    keywords = "política de privacidade Consult, LGPD, dados pessoais";
    schemaType = "WebPage";
    crumbs.push(["Política de Privacidade",path]);
  } else if (path === "/consult/sobre") {
    title = "Sobre a Consult | Consult Radiometria e Qualidade";
    description = "Conheça a Consult Radiometria e Qualidade, fundada em 1995, sua atuação técnica, áreas de serviço e estrutura de atendimento.";
    keywords = "Consult Radiometria e Qualidade, sobre, Física Médica, Proteção Radiológica, Engenharia Clínica";
    schemaType = "AboutPage";
    crumbs.push(["Sobre",path]);
  } else if (path === "/consult/servicos") {
    title = "Serviços | Consult Radiometria e Qualidade";
    description = "Catálogo de serviços da Consult em Física Médica, Proteção Radiológica e Consult Engenharia Clínica.";
    keywords = "serviços Consult, Física Médica, Proteção Radiológica, Engenharia Clínica";
    schemaType = "CollectionPage";
    crumbs.push(["Serviços",path]);
  } else if (path === "/consult/materiais") {
    title = "Materiais Técnicos | Consult Radiometria e Qualidade";
    description = "Guias e materiais técnicos da Consult sobre Física Médica, Proteção Radiológica, Controle de Qualidade e Engenharia Clínica.";
    keywords = "materiais técnicos Consult, Física Médica, Proteção Radiológica, Engenharia Clínica";
    schemaType = "CollectionPage";
    crumbs.push(["Materiais",path]);
  } else if (path === "/consult/materiais/modelos-sinalizacao") {
    title = "Modelos de Sinalização Técnica | Consult";
    description = "Referências visuais de sinalização técnica para radioproteção, áreas controladas e ressonância magnética.";
    keywords = "sinalização radioproteção, áreas controladas, Consult";
    schemaType = "WebPage";
    crumbs.push(["Materiais","/consult/materiais"],["Modelos de sinalização",path]);
  } else if (path === "/consult/materiais/mapa-normas-radiologia") {
    title = "Mapa de Normas por Modalidade | Consult";
    description = "RDC 611/2022 e Instruções Normativas organizadas por modalidade de diagnóstico por imagem.";
    keywords = "RDC 611, IN 90 97, mapa de normas, radiologia, Consult";
    schemaType = "WebPage";
    crumbs.push(["Materiais","/consult/materiais"],["Mapa de normas",path]);
  } else if (path === "/consult/materiais/guia-servicos-radiologia") {
    title = "CQ, Radiometria ou Blindagem? | Consult";
    description = "Entenda quando utilizar Controle de Qualidade, levantamento radiométrico ou projeto de blindagem em radiologia.";
    keywords = "controle de qualidade, levantamento radiométrico, projeto de blindagem, Consult";
    schemaType = "WebPage";
    crumbs.push(["Materiais","/consult/materiais"],["Guia de serviços",path]);
  } else if (path === "/consult/blog") {
    title = "Blog técnico | Consult Radiometria e Qualidade";
    description = "Conteúdos técnicos sobre Física Médica, Proteção Radiológica, controle de qualidade, Engenharia Clínica e normas sanitárias.";
    keywords = "blog Consult, Física Médica, Proteção Radiológica, controle de qualidade, Engenharia Clínica";
    schemaType = "Blog";
    crumbs.push(["Blog",path]);
  } else if (path === "/consult/normas") {
    title = "Normas e Referências Técnicas | Consult";
    description = "Biblioteca de RDCs, Instruções Normativas, referências ABNT e documentos técnicos citados nos serviços da Consult.";
    keywords = "RDC 611, RDC 509, IEC 62353, IN 90 97, normas radiologia, Engenharia Clínica";
    schemaType = "CollectionPage";
    crumbs.push(["Normas",path]);
  } else if (blogMatch && blogMeta[blogMatch[1]]) {
    [title,description] = blogMeta[blogMatch[1]];
    keywords = `${blogMatch[1].replaceAll("-"," ")}, Consult, conteúdo técnico`;
    schemaType = "Article";
    crumbs.push(["Blog","/consult/blog"],[title.replace(/ \| .*$/,""),path]);
  } else if (modalityMatch && modalityMeta[modalityMatch[1]]) {
    [title,description] = modalityMeta[modalityMatch[1]];
    keywords = `${modalityMatch[1].replaceAll("-"," ")}, controle de qualidade, RDC 611, Consult`;
    schemaType = "Service";
    crumbs.push(["Física Médica","/consult/areas/fisica-medica"],["Controle de Qualidade","/consult/fisica-medica/controle-de-qualidade"],[title.replace(/ \| .*$/,""),path]);
  } else if ((areaMatch || directAreaMatch) && areaMeta[(areaMatch || directAreaMatch)[1]]) {
    const areaSlug = (areaMatch || directAreaMatch)[1];
    [title,description] = areaMeta[areaSlug];
    keywords = `${areaSlug.replaceAll("-"," ")}, Consult, laudo técnico, SP, PR, MS, MG`;
    schemaType = "Service";
    canonicalPath = `/consult/${areaSlug}`;
    crumbs.push([title.replace(/ \| .*$/,""),canonicalPath]);
  } else if (protectionServiceMatch && serviceMeta[protectionServiceMatch[1]]) {
    const slug = protectionServiceMatch[1];
    [title,description] = serviceMeta[slug];
    keywords = `${slug.replaceAll("-"," ")}, Proteção Radiológica, Consult`;
    schemaType = "Service";
    canonicalPath = `/consult/protecao-radiologica/${slug}`;
    crumbs.push(["Proteção Radiológica","/consult/protecao-radiologica"],[title.replace(/ \| .*$/,""),canonicalPath]);
  } else if ((oldServiceMatch || siloServiceMatch) && serviceMeta[(oldServiceMatch || siloServiceMatch)[1]]) {
    const slug = (oldServiceMatch || siloServiceMatch)[1];
    [title,description] = serviceMeta[slug];
    keywords = `${slug.replaceAll("-"," ")}, Física Médica, Proteção Radiológica, Consult`;
    schemaType = "Service";
    const isProtection = ["programa-protecao-radiologica","levantamento-radiometrico","projeto-blindagem","treinamentos","licenciamento-sanitario"].includes(slug);
    canonicalPath = isProtection ? `/consult/protecao-radiologica/${slug}` : `/consult/fisica-medica/${slug}`;
    crumbs.push([isProtection ? "Proteção Radiológica" : "Física Médica",isProtection ? "/consult/protecao-radiologica" : "/consult/fisica-medica"],[title.replace(/ \| .*$/,""),canonicalPath]);
  } else if (engineeringMatch && engineeringMeta[engineeringMatch[1]]) {
    [title,description] = engineeringMeta[engineeringMatch[1]];
    keywords = `${engineeringMatch[1].replaceAll("-"," ")}, Engenharia Clínica, laudo técnico, Consult`;
    schemaType = "Service";
    crumbs.push(["Engenharia Clínica","/consult/areas/engenharia-clinica"],[title.replace(/ \| .*$/,""),path]);
  } else if ((oldEquipmentMatch || siloEquipmentMatch) && equipmentNames[(oldEquipmentMatch || siloEquipmentMatch)[1]]) {
    const slug = (oldEquipmentMatch || siloEquipmentMatch)[1];
    const name = equipmentNames[slug];
    title = `Ensaio de ${name} | Consult Engenharia Clínica`;
    description = `Ensaios aplicáveis a ${name}, com medição documentada, padrões com rastreabilidade RBC/Inmetro e laudo por equipamento.`;
    keywords = `${name}, ensaio de desempenho, segurança elétrica, Engenharia Clínica, Consult`;
    schemaType = "Service";
    if (oldEquipmentMatch) canonicalPath = `/consult/engenharia-clinica/equipamentos/${slug}`;
    crumbs.push(["Engenharia Clínica","/consult/areas/engenharia-clinica"],["Equipamentos","/consult/areas/engenharia-clinica#equipamentos"],[name,canonicalPath]);
  } else if ((oldRegionMatch || siloRegionMatch) && regionNames[(oldRegionMatch || siloRegionMatch)[1]]) {
    const slug = (oldRegionMatch || siloRegionMatch)[1];
    const [name,prep] = regionNames[slug];
    title = `Engenharia Clínica e Física Médica ${prep} | Consult`;
    description = `Atendimento presencial da Consult ${prep} para Física Médica, Proteção Radiológica e Engenharia Clínica, com medições, ensaios e laudos técnicos.`;
    keywords = `Física Médica ${name}, Proteção Radiológica ${name}, Engenharia Clínica ${name}, Consult`;
    schemaType = "Service";
    if (oldRegionMatch) canonicalPath = `/consult/atuacao/${slug}`;
    crumbs.push(["Atuação","/consult#cobertura"],[name,canonicalPath]);
  }

  const setMeta = (selector, attrName, attrValue, content) => {
    let node = document.head.querySelector(selector);
    if (!node) { node = document.createElement("meta"); node.setAttribute(attrName,attrValue); document.head.appendChild(node); }
    node.setAttribute("content",content);
  };

  document.title = title;
  setMeta('meta[name="description"]',"name","description",description);
  setMeta('meta[name="keywords"]',"name","keywords",keywords);
  setMeta('meta[property="og:title"]',"property","og:title",title);
  setMeta('meta[property="og:description"]',"property","og:description",description);
  setMeta('meta[property="og:type"]',"property","og:type",schemaType === "Article" ? "article" : "website");
  setMeta('meta[property="og:site_name"]',"property","og:site_name","Consult Radiometria e Qualidade");
  setMeta('meta[property="og:url"]',"property","og:url",`${location.origin}${canonicalPath}`);
  setMeta('meta[name="twitter:title"]',"name","twitter:title",title);
  setMeta('meta[name="twitter:description"]',"name","twitter:description",description);
  setMeta('meta[name="twitter:card"]',"name","twitter:card","summary_large_image");

  const isFigueiraTest = /(^|\.)figueiramarketing\.com\.br$/i.test(location.hostname) || /vercel\.app$/i.test(location.hostname);
  setMeta('meta[name="robots"]',"name","robots",isFigueiraTest ? "noindex, nofollow" : "index, follow");
  const socialImage = `${location.origin}/consult/approved-national-bg.webp`;
  setMeta('meta[property="og:image"]',"property","og:image",socialImage);
  setMeta('meta[property="og:image:alt"]',"property","og:image:alt","Consult Radiometria e Qualidade");
  setMeta('meta[name="twitter:image"]',"name","twitter:image",socialImage);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
  canonical.href = `${location.origin}${canonicalPath}`;

  const oldLd = document.getElementById("consult-route-ldjson");
  if (oldLd) oldLd.remove();
  const ld = document.createElement("script");
  ld.id = "consult-route-ldjson";
  ld.type = "application/ld+json";

  const pageEntity = {
    "@type": schemaType,
    "@id": `${location.origin}${canonicalPath}#page`,
    url: `${location.origin}${canonicalPath}`,
    name: title.replace(/ \| .*$/,""),
    description,
  };
  if (schemaType === "Service") {
    pageEntity.provider = {"@type":"Organization","@id":`${location.origin}/consult#organization`,name:"Consult Radiometria e Qualidade"};
    pageEntity.areaServed = ["Brasil","São Paulo","Paraná","Mato Grosso do Sul","Minas Gerais"];
  }
  if (schemaType === "Article") {
    pageEntity.headline = title.replace(/ \| .*$/," ").trim();
    pageEntity.publisher = {"@type":"Organization","@id":`${location.origin}/consult#organization`,name:"Consult Radiometria e Qualidade"};
  }

  const graph = [
    {"@type":"Organization","@id":`${location.origin}/consult#organization`,name:"Consult Radiometria e Qualidade",address:{"@type":"PostalAddress",addressLocality:"Matão",addressRegion:"SP",addressCountry:"BR"}},
    pageEntity,
  ];

  if (crumbs.length > 1) {
    graph.push({"@type":"BreadcrumbList","@id":`${location.origin}${canonicalPath}#breadcrumb`,itemListElement:crumbs.map(([name,url],index)=>({"@type":"ListItem",position:index+1,name,item:`${location.origin}${url}`}))});
  }

  ld.textContent = JSON.stringify({"@context":"https://schema.org","@graph":graph});
  document.head.appendChild(ld);
})();
