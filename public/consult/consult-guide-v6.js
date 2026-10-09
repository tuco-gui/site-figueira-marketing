(() => {
  const PATH_OK = /^\/consult(?:\/|$)/;
  if (!PATH_OK.test(window.location.pathname)) return;

  const GEOJSON_URL = "https://cdn.jsdelivr.net/gh/codeforamerica/click_that_hood@master/public/data/brazil-states.geojson";
  const NS = "http://www.w3.org/2000/svg";
  const ORIGIN = [-48.365, -21.603]; // Matão/SP, origem visual aproximada

  const ATTENDED_STATES = {
    "São Paulo": { label: "SP", coord: [-46.63, -23.55], dx: 10, dy: 14 },
    Paraná: { label: "PR", coord: [-49.27, -25.43], dx: 10, dy: 12 },
    "Mato Grosso do Sul": { label: "MS", coord: [-54.62, -20.44], dx: -28, dy: -8 },
    "Minas Gerais": { label: "MG", coord: [-43.94, -19.92], dx: 10, dy: -7 },
  };

  const CONTENT_REPLACEMENTS = new Map([
    [
      "Mais que serviços, oferecemos parceria técnica e compromisso com a sua segurança.",
      "Medição independente, rastreabilidade e laudos técnicos para apoiar decisões seguras e conformes.",
    ],
    [
      "Conheça os diferenciais que nos tornam referência no setor.",
      "Cada serviço é executado com método, registro dos valores medidos e documentação técnica.",
    ],
    [
      "Suporte presencial em todo o Brasil e atendimento remoto ágil e eficiente.",
      "Atendimento em todo o Brasil, com equipes em campo em São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais.",
    ],
    [
      "Gestão de equipamentos, manutenção técnica, testes de segurança e suporte para ciclo de vida dos ativos em saúde.",
      "Ensaios, calibração e qualificação de equipamentos médico-assistenciais, com resultado documentado em laudo técnico independente.",
    ],
    ["Gestão e inventário de equipamentos", "Ensaio de segurança elétrica"],
    ["Avaliação técnica e suporte à aquisição", "Ensaio de desempenho (calibração)"],
    ["Testes de segurança e desempenho", "Manutenção preventiva conforme plano do fabricante"],
    ["Acompanhamento de manutenção e documentação", "Reverificação após correção de pendências"],
    ["Apoio ao planejamento do ciclo de vida dos ativos", "Qualificação térmica"],
    [
      "Avenida Doutor Vital Brasil, 1060, sala 205, Vila São Lúcio, Botucatu - SP",
      "Sede: Matão/SP · Atendimento: Av. Dr. Vital Brasil, 1060, sala 205 – Botucatu Home Trade Center, Botucatu/SP",
    ],
  ]);

  const calendarIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2"></rect>
      <path d="M7 3v4M17 3v4M3 9h18"></path>
    </svg>`;

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function replaceKnownText(root = document) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const current = normalizeText(node.nodeValue);
      if (!current) return;
      for (const [from, to] of CONTENT_REPLACEMENTS.entries()) {
        if (current === normalizeText(from)) {
          node.nodeValue = to;
          break;
        }
      }
    });
  }

  function alignHomepageHero() {
    if (window.location.pathname !== "/consult") return;
    const h1 = document.querySelector("main h1, #root h1");
    if (!h1) return;

    const current = normalizeText(h1.textContent);
    if (current.includes("Soluções técnicas para a área da saúde") || h1.dataset.consultGuide === "1") {
      h1.textContent = "Segurança, desempenho e rastreabilidade dos equipamentos de saúde, comprovados em laudo técnico";
      h1.dataset.consultGuide = "1";

      const section = h1.closest("section") || h1.parentElement;
      if (section) {
        const paragraphs = Array.from(section.querySelectorAll("p"));
        const intro = paragraphs.find((p) =>
          normalizeText(p.textContent).includes("Atuamos com Física Médica")
        );
        if (intro) {
          intro.textContent = "A Consult é uma empresa de medição e laudo técnico para serviços de saúde. Verificamos se os equipamentos estão seguros e funcionando dentro da norma e documentamos o resultado em laudo técnico.";
        }
      }
    }

    document.title = "Consult Radiometria e Qualidade | Medição, ensaios e laudos técnicos";
    const description = "Medição, ensaios, calibração, qualificação e laudos técnicos para serviços de saúde. Física Médica, Proteção Radiológica e Consult Engenharia Clínica.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }

  function findCoverageSection() {
    const headings = Array.from(document.querySelectorAll("section h2"));
    const heading = headings.find((node) => {
      const text = normalizeText(node.textContent);
      return text.includes("Atendimento em todo o Brasil") || text.includes("Atendimento presencial em SP, PR, MS e MG");
    });
    return heading ? heading.closest("section") : null;
  }

  function addSemanticClasses(section) {
    section.classList.add("consult-national-v5");

    const wrap = Array.from(section.children).find(
      (node) => node.tagName === "DIV" && node.querySelector && node.querySelector("h2")
    );
    if (!wrap) return null;
    wrap.classList.add("cnv5-wrap");

    const grid = Array.from(wrap.children).find((node) => node.classList && node.classList.contains("grid"));
    if (!grid || grid.children.length < 3) return null;
    grid.classList.add("cnv5-grid");

    const copy = grid.children[0];
    const map = grid.children[1];
    const side = grid.children[2];
    copy.classList.add("cnv5-copy");
    map.classList.add("cnv5-map");
    side.classList.add("cnv5-side");

    const heading = copy.querySelector("h2");
    if (heading) {
      heading.innerHTML = `Atendimento em <span style="color:#8AE600">todo o Brasil</span>`;
    }

    const body = Array.from(copy.querySelectorAll("p")).find((p) =>
      /território nacional|todo o Brasil|instituições de saúde/i.test(p.textContent)
    );
    if (body) {
      body.textContent = "Atendimento em todo o Brasil, com equipes em campo em São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais.";
    }

    const primary = Array.from(copy.querySelectorAll("a")).find((a) =>
      /Solicite um orçamento|Agende uma reunião/i.test(a.textContent)
    );
    const whatsapp = Array.from(copy.querySelectorAll("a")).find((a) => /WhatsApp/i.test(a.textContent));

    if (primary) {
      const actions = primary.parentElement;
      if (actions) actions.classList.add("cnv5-actions");
      primary.classList.add("cnv5-meeting");
      primary.setAttribute("href", "#contato");
      primary.setAttribute("aria-label", "Agende uma reunião");
      primary.innerHTML = `${calendarIcon}<span>Agende uma reunião</span>`;
      primary.dataset.cnv5Label = "1";
      if (actions && actions.nextElementSibling) actions.nextElementSibling.classList.add("cnv5-tagline");
    }

    if (whatsapp) {
      whatsapp.classList.add("cnv5-whatsapp");
      whatsapp.setAttribute("aria-label", "Falar no WhatsApp");
    }

    const sideBlocks = Array.from(side.children);
    const card = sideBlocks[sideBlocks.length - 1];
    if (card) {
      const titleBlock = card.children?.[0];
      if (titleBlock) {
        const textBox = titleBlock.lastElementChild;
        if (textBox) textBox.innerHTML = `EQUIPES EM CAMPO EM<br><strong>4 ESTADOS</strong>`;
      }

      const list = card.children?.[1];
      const states = ["São Paulo", "Paraná", "Mato Grosso do Sul", "Minas Gerais"];
      if (list) {
        Array.from(list.children).forEach((row, index) => {
          if (index >= states.length) {
            row.style.display = "none";
            return;
          }
          row.style.display = "";
          const candidates = Array.from(row.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE && normalizeText(node.nodeValue));
          if (candidates.length) candidates[candidates.length - 1].nodeValue = states[index];
          else if (row.children?.[1]) row.children[1].textContent = states[index];
        });
      }
    }

    return { wrap, grid, copy, map, side };
  }

  function mercatorRaw(lon, lat) {
    const lambda = (lon * Math.PI) / 180;
    const phi = (Math.max(-85, Math.min(85, lat)) * Math.PI) / 180;
    return [lambda, Math.log(Math.tan(Math.PI / 4 + phi / 2))];
  }

  function walkCoordinates(geometry, cb) {
    if (!geometry || !geometry.coordinates) return;
    if (geometry.type === "Polygon") geometry.coordinates.forEach((ring) => ring.forEach(cb));
    else if (geometry.type === "MultiPolygon") geometry.coordinates.forEach((polygon) => polygon.forEach((ring) => ring.forEach(cb)));
  }

  function createProjection(features) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    features.forEach((feature) => {
      walkCoordinates(feature.geometry, ([lon, lat]) => {
        const [x, y] = mercatorRaw(lon, lat);
        minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      });
    });

    const padding = 42, width = 520, height = 520;
    const scale = Math.min((width - padding * 2) / (maxX - minX), (height - padding * 2) / (maxY - minY));
    const drawnWidth = (maxX - minX) * scale;
    const drawnHeight = (maxY - minY) * scale;
    const offsetX = (width - drawnWidth) / 2;
    const offsetY = (height - drawnHeight) / 2;

    return ([lon, lat]) => {
      const [x, y] = mercatorRaw(lon, lat);
      return [offsetX + (x - minX) * scale, offsetY + (maxY - y) * scale];
    };
  }

  function ringPath(ring, project) {
    if (!ring?.length) return "";
    return ring.map((point, index) => {
      const [x, y] = project(point);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ") + " Z";
  }

  function featurePath(feature, project) {
    const geometry = feature.geometry;
    if (!geometry) return "";
    if (geometry.type === "Polygon") return geometry.coordinates.map((ring) => ringPath(ring, project)).join(" ");
    if (geometry.type === "MultiPolygon") return geometry.coordinates.map((polygon) => polygon.map((ring) => ringPath(ring, project)).join(" ")).join(" ");
    return "";
  }

  function svgNode(name, attrs = {}) {
    const node = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  }

  function drawCoverage(svg, geojson) {
    const features = geojson.features || [];
    const project = createProjection(features);

    const defs = svgNode("defs");
    const glow = svgNode("filter", { id: "consultV6Glow", x: "-80%", y: "-80%", width: "260%", height: "260%" });
    glow.appendChild(svgNode("feGaussianBlur", { stdDeviation: "3.5", result: "blur" }));
    const merge = svgNode("feMerge");
    merge.appendChild(svgNode("feMergeNode", { in: "blur" }));
    merge.appendChild(svgNode("feMergeNode", { in: "SourceGraphic" }));
    glow.appendChild(merge);
    defs.appendChild(glow);
    svg.appendChild(defs);

    const mapLayer = svgNode("g", { "aria-hidden": "true" });
    features.forEach((feature) => {
      const name = String(feature.properties?.name || "").normalize("NFC").trim();
      const active = Boolean(ATTENDED_STATES[name]);
      mapLayer.appendChild(svgNode("path", {
        d: featurePath(feature, project),
        fill: active ? "#35ad7d" : "rgba(4,73,70,.52)",
        stroke: active ? "#7ddca8" : "rgba(151,220,195,.22)",
        "stroke-width": active ? "1.7" : ".8",
        "stroke-linejoin": "round",
      }));
    });
    svg.appendChild(mapLayer);

    const routeLayer = svgNode("g");
    const source = project(ORIGIN);

    Object.entries(ATTENDED_STATES).forEach(([name, destination], index) => {
      const target = project(destination.coord);
      const dx = target[0] - source[0];
      const dy = target[1] - source[1];
      const mx = (source[0] + target[0]) / 2 - dy * 0.13;
      const my = (source[1] + target[1]) / 2 + dx * 0.09;
      const route = `M${source[0].toFixed(2)},${source[1].toFixed(2)} Q${mx.toFixed(2)},${my.toFixed(2)} ${target[0].toFixed(2)},${target[1].toFixed(2)}`;

      routeLayer.appendChild(svgNode("path", { d: route, class: "cnv5-route-base" }));
      const flow = svgNode("path", { d: route, class: "cnv5-route-flow" });
      flow.style.animationDelay = `${index * 0.34}s`;
      routeLayer.appendChild(flow);
      routeLayer.appendChild(svgNode("circle", {
        cx: target[0].toFixed(2), cy: target[1].toFixed(2), r: "4.8",
        class: "cnv5-destination", filter: "url(#consultV6Glow)",
      }));

      const label = svgNode("text", {
        x: (target[0] + destination.dx).toFixed(2),
        y: (target[1] + destination.dy).toFixed(2),
        class: "cnv5-region-label",
      });
      label.textContent = destination.label;
      routeLayer.appendChild(label);
    });

    routeLayer.appendChild(svgNode("circle", {
      cx: source[0].toFixed(2), cy: source[1].toFixed(2), r: "8",
      class: "cnv5-origin", filter: "url(#consultV6Glow)",
    }));
    routeLayer.appendChild(svgNode("circle", { cx: source[0].toFixed(2), cy: source[1].toFixed(2), r: "2.5", fill: "#fff" }));

    const consultLabel = svgNode("text", {
      x: (source[0] + 12).toFixed(2), y: (source[1] - 8).toFixed(2), class: "cnv5-origin-label",
    });
    consultLabel.textContent = "CONSULT · MATÃO/SP";
    routeLayer.appendChild(consultLabel);
    svg.appendChild(routeLayer);
  }

  async function buildMap(mapContainer) {
    if (!mapContainer || ["ready", "loading"].includes(mapContainer.dataset.consultV6MapState)) return;
    mapContainer.dataset.consultV6MapState = "loading";

    try {
      const response = await fetch(GEOJSON_URL, { mode: "cors", cache: "force-cache" });
      if (!response.ok) throw new Error(`GeoJSON ${response.status}`);
      const geojson = await response.json();
      const svg = svgNode("svg", {
        viewBox: "0 0 520 520",
        role: "img",
        "aria-label": "Mapa do Brasil representando atendimento nacional da Consult, com equipes em campo destacadas em São Paulo, Paraná, Mato Grosso do Sul e Minas Gerais.",
      });
      drawCoverage(svg, geojson);
      mapContainer.replaceChildren(svg);
      mapContainer.dataset.consultV6MapState = "ready";
    } catch (error) {
      mapContainer.dataset.consultV6MapState = "fallback";
      console.warn("Consult coverage map fallback:", error);
    }
  }

  function enhance() {
    if (!PATH_OK.test(window.location.pathname)) return;
    replaceKnownText(document.getElementById("root") || document);
    alignHomepageHero();

    const section = findCoverageSection();
    if (!section) return;
    const parts = addSemanticClasses(section);
    if (!parts) return;
    buildMap(parts.map);
  }

  let scheduled = false;
  function scheduleEnhance() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      enhance();
    });
  }

  const root = document.getElementById("root");
  if (root) {
    const observer = new MutationObserver(scheduleEnhance);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
  }

  window.addEventListener("popstate", scheduleEnhance);
  window.addEventListener("pageshow", scheduleEnhance);
  document.addEventListener("DOMContentLoaded", scheduleEnhance, { once: true });
  scheduleEnhance();
})();
