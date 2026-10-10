(() => {
  const PATH_OK = /^\//;
  if (!PATH_OK.test(window.location.pathname)) return;

  const REGION_LINKS = {
    "São Paulo": "/atuacao/sao-paulo",
    "Paraná": "/atuacao/parana",
    "Mato Grosso do Sul": "/atuacao/mato-grosso-do-sul",
    "Minas Gerais": "/atuacao/minas-gerais",
  };

  function normalize(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function linkCoverageStates() {
    if (window.location.pathname !== "/") return;

    const headings = Array.from(document.querySelectorAll("section h2"));
    const heading = headings.find((node) => /Atendimento presencial em SP, PR, MS e MG|Atendimento em todo o Brasil/i.test(normalize(node.textContent)));
    const section = heading?.closest("section");
    if (!section) return;

    Object.entries(REGION_LINKS).forEach(([state, href]) => {
      const candidates = Array.from(section.querySelectorAll("li, p, span, div"));
      const row = candidates.find((node) => normalize(node.textContent) === state && !node.closest("a"));
      if (!row || row.dataset.consultRegionLinked === "1") return;

      row.dataset.consultRegionLinked = "1";
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.setAttribute("aria-label", `Ver atendimento da Consult em ${state}`);
      anchor.style.color = "inherit";
      anchor.style.textDecoration = "none";
      anchor.style.display = "contents";

      const parent = row.parentNode;
      if (!parent) return;
      parent.insertBefore(anchor, row);
      anchor.appendChild(row);
    });
  }

  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      linkCoverageStates();
    });
  }

  const root = document.getElementById("root");
  if (root) {
    const observer = new MutationObserver(schedule);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
  }

  document.addEventListener("DOMContentLoaded", schedule, { once: true });
  window.addEventListener("pageshow", schedule);
  schedule();
})();
