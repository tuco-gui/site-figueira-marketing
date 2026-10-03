(() => {
  const PATH_OK = /^\/consult(?:\/|$)/;
  if (!PATH_OK.test(window.location.pathname)) return;

  const GEOJSON_URL = "https://cdn.jsdelivr.net/gh/codeforamerica/click_that_hood@master/public/data/brazil-states.geojson";
  const NS = "http://www.w3.org/2000/svg";

  const REGION_BY_STATE = {
    Acre: "Norte",
    Amapá: "Norte",
    Amazonas: "Norte",
    Pará: "Norte",
    Rondônia: "Norte",
    Roraima: "Norte",
    Tocantins: "Norte",
    Alagoas: "Nordeste",
    Bahia: "Nordeste",
    Ceará: "Nordeste",
    Maranhão: "Nordeste",
    Paraíba: "Nordeste",
    Pernambuco: "Nordeste",
    Piauí: "Nordeste",
    "Rio Grande do Norte": "Nordeste",
    Sergipe: "Nordeste",
    "Distrito Federal": "Centro-Oeste",
    Goiás: "Centro-Oeste",
    "Mato Grosso": "Centro-Oeste",
    "Mato Grosso do Sul": "Centro-Oeste",
    "Espírito Santo": "Sudeste",
    "Minas Gerais": "Sudeste",
    "Rio de Janeiro": "Sudeste",
    "São Paulo": "Sudeste",
    Paraná: "Sul",
    "Rio Grande do Sul": "Sul",
    "Santa Catarina": "Sul",
  };

  const REGION_COLORS = {
    Norte: "#35ad7d",
    Nordeste: "#47bc88",
    "Centro-Oeste": "#249b73",
    Sudeste: "#58c58c",
    Sul: "#2b986f",
  };

  const DESTINATIONS = [
    { name: "Norte", coord: [-60.2, -4.2], dx: -43, dy: -10 },
    { name: "Nordeste", coord: [-40.6, -9.4], dx: 10, dy: -7 },
    { name: "Centro-Oeste", coord: [-55.5, -15.3], dx: -70, dy: -6 },
    { name: "Sudeste", coord: [-43.8, -20.0], dx: 10, dy: 3 },
    { name: "Sul", coord: [-51.2, -28.2], dx: 9, dy: 16 },
  ];

  // Approximate central-west São Paulo origin, matching the Consult positioning supplied for the layout.
  const ORIGIN = [-49.05, -22.32];

  const calendarIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2"></rect>
      <path d="M7 3v4M17 3v4M3 9h18"></path>
    </svg>`;

  function normalizeName(value) {
    return String(value || "").normalize("NFC").trim();
  }

  function findCoverageSection() {
    const headings = Array.from(document.querySelectorAll("section h2"));
    const heading = headings.find((node) =>
      node.textContent.replace(/\s+/g, " ").trim().includes("Atendimento em todo o Brasil")
    );
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

    const primary = Array.from(copy.querySelectorAll("a")).find((a) =>
      /Solicite um orçamento|Agende uma reunião/i.test(a.textContent)
    );
    const whatsapp = Array.from(copy.querySelectorAll("a")).find((a) =>
      /WhatsApp/i.test(a.textContent)
    );

    if (primary) {
      const actions = primary.parentElement;
      if (actions) actions.classList.add("cnv5-actions");
      primary.classList.add("cnv5-meeting");
      primary.setAttribute("href", "#contato");
      primary.setAttribute("aria-label", "Agende uma reunião");
      if (!primary.dataset.cnv5Label) {
        primary.innerHTML = `${calendarIcon}<span>Agende uma reunião</span>`;
        primary.dataset.cnv5Label = "1";
      }

      if (actions && actions.nextElementSibling) {
        actions.nextElementSibling.classList.add("cnv5-tagline");
      }
    }

    if (whatsapp) {
      whatsapp.classList.add("cnv5-whatsapp");
      whatsapp.setAttribute("aria-label", "Falar no WhatsApp");
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
    if (geometry.type === "Polygon") {
      geometry.coordinates.forEach((ring) => ring.forEach(cb));
    } else if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach((polygon) => polygon.forEach((ring) => ring.forEach(cb)));
    }
  }

  function createProjection(features) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    features.forEach((feature) => {
      walkCoordinates(feature.geometry, ([lon, lat]) => {
        const [x, y] = mercatorRaw(lon, lat);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      });
    });

    const padding = 42;
    const width = 520;
    const height = 520;
    const scale = Math.min(
      (width - padding * 2) / (maxX - minX),
      (height - padding * 2) / (maxY - minY)
    );
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
    if (!ring || !ring.length) return "";
    return ring
      .map((point, index) => {
        const [x, y] = project(point);
        return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ") + " Z";
  }

  function featurePath(feature, project) {
    const geometry = feature.geometry;
    if (!geometry) return "";
    if (geometry.type === "Polygon") {
      return geometry.coordinates.map((ring) => ringPath(ring, project)).join(" ");
    }
    if (geometry.type === "MultiPolygon") {
      return geometry.coordinates
        .map((polygon) => polygon.map((ring) => ringPath(ring, project)).join(" "))
        .join(" ");
    }
    return "";
  }

  function svgNode(name, attrs = {}) {
    const node = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  }

  function drawRegions(svg, geojson) {
    const features = geojson.features.filter((feature) => REGION_BY_STATE[normalizeName(feature.properties?.name)]);
    const project = createProjection(features);

    const defs = svgNode("defs");
    const glow = svgNode("filter", { id: "cnv5Glow", x: "-80%", y: "-80%", width: "260%", height: "260%" });
    glow.appendChild(svgNode("feGaussianBlur", { stdDeviation: "3.5", result: "blur" }));
    const merge = svgNode("feMerge");
    merge.appendChild(svgNode("feMergeNode", { in: "blur" }));
    merge.appendChild(svgNode("feMergeNode", { in: "SourceGraphic" }));
    glow.appendChild(merge);
    defs.appendChild(glow);
    svg.appendChild(defs);

    const regionsLayer = svgNode("g", { "aria-hidden": "true" });
    // Drawing every state with the exact same fill and same-color stroke inside a region
    // removes the visual state divisions while retaining accurate regional geography.
    features.forEach((feature) => {
      const region = REGION_BY_STATE[normalizeName(feature.properties?.name)];
      const fill = REGION_COLORS[region];
      const path = svgNode("path", {
        d: featurePath(feature, project),
        fill,
        stroke: fill,
        "stroke-width": "1.8",
        "stroke-linejoin": "round",
      });
      regionsLayer.appendChild(path);
    });
    svg.appendChild(regionsLayer);

    const routeLayer = svgNode("g");
    const source = project(ORIGIN);

    DESTINATIONS.forEach((destination, index) => {
      const target = project(destination.coord);
      const dx = target[0] - source[0];
      const dy = target[1] - source[1];
      const mx = (source[0] + target[0]) / 2 - dy * 0.12;
      const my = (source[1] + target[1]) / 2 + dx * 0.08;
      const route = `M${source[0].toFixed(2)},${source[1].toFixed(2)} Q${mx.toFixed(2)},${my.toFixed(2)} ${target[0].toFixed(2)},${target[1].toFixed(2)}`;

      routeLayer.appendChild(svgNode("path", { d: route, class: "cnv5-route-base" }));
      const flow = svgNode("path", { d: route, class: "cnv5-route-flow" });
      flow.style.animationDelay = `${index * 0.34}s`;
      routeLayer.appendChild(flow);

      routeLayer.appendChild(svgNode("circle", {
        cx: target[0].toFixed(2),
        cy: target[1].toFixed(2),
        r: "4.8",
        class: "cnv5-destination",
        filter: "url(#cnv5Glow)",
      }));

      const label = svgNode("text", {
        x: (target[0] + destination.dx).toFixed(2),
        y: (target[1] + destination.dy).toFixed(2),
        class: "cnv5-region-label",
      });
      label.textContent = destination.name;
      routeLayer.appendChild(label);
    });

    routeLayer.appendChild(svgNode("circle", {
      cx: source[0].toFixed(2),
      cy: source[1].toFixed(2),
      r: "8",
      class: "cnv5-origin",
      filter: "url(#cnv5Glow)",
    }));
    routeLayer.appendChild(svgNode("circle", {
      cx: source[0].toFixed(2),
      cy: source[1].toFixed(2),
      r: "2.5",
      fill: "#fff",
    }));
    const consultLabel = svgNode("text", {
      x: (source[0] + 12).toFixed(2),
      y: (source[1] - 8).toFixed(2),
      class: "cnv5-origin-label",
    });
    consultLabel.textContent = "CONSULT";
    routeLayer.appendChild(consultLabel);

    svg.appendChild(routeLayer);
  }

  async function buildMap(mapContainer) {
    if (!mapContainer || mapContainer.dataset.cnv5MapState === "ready" || mapContainer.dataset.cnv5MapState === "loading") return;
    mapContainer.dataset.cnv5MapState = "loading";

    try {
      const response = await fetch(GEOJSON_URL, { mode: "cors", cache: "force-cache" });
      if (!response.ok) throw new Error(`GeoJSON ${response.status}`);
      const geojson = await response.json();

      const svg = svgNode("svg", {
        viewBox: "0 0 520 520",
        role: "img",
        "aria-label": "Mapa do Brasil dividido em Norte, Nordeste, Centro-Oeste, Sudeste e Sul, com rotas partindo da Consult no interior de São Paulo.",
      });
      drawRegions(svg, geojson);

      mapContainer.replaceChildren(svg);
      mapContainer.dataset.cnv5MapState = "ready";
    } catch (error) {
      // Keep the approved existing map if the regional data cannot be loaded.
      mapContainer.dataset.cnv5MapState = "fallback";
      console.warn("Consult regional map fallback:", error);
    }
  }

  function enhance() {
    if (!PATH_OK.test(window.location.pathname)) return;
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
    observer.observe(root, { childList: true, subtree: true });
  }

  window.addEventListener("popstate", scheduleEnhance);
  window.addEventListener("pageshow", scheduleEnhance);
  document.addEventListener("DOMContentLoaded", scheduleEnhance, { once: true });
  scheduleEnhance();
})();
