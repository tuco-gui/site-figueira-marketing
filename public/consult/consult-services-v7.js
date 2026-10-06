(() => {
  const SERVICE_PATHS = new Set([
    "/consult/areas/fisica-medica",
    "/consult/areas/protecao-radiologica",
  ]);

  const SERVICES = [
    {
      title: "Controle de qualidade (CQ)",
      slug: "controle-qualidade",
      text: "Testes periódicos de dose, qualidade de imagem e funcionamento do equipamento, com laudo assinado pelo físico médico.",
      norm: "RDC 611/2022 + IN 90 a 97/2021 conforme o equipamento",
    },
    {
      title: "Programa de Proteção Radiológica",
      slug: "programa-protecao-radiologica",
      text: "Elaboração e acompanhamento do programa exigido para serviços de radiologia diagnóstica e intervencionista.",
      norm: "RDC 611/2022",
    },
    {
      title: "Levantamento radiométrico",
      slug: "levantamento-radiometrico",
      text: "Medição da radiação nas áreas ao redor da sala e da radiação de fuga do cabeçote.",
      norm: "RDC 611/2022 + requisitos aplicáveis à modalidade",
    },
    {
      title: "Projeto de blindagem",
      slug: "projeto-blindagem",
      text: "Cálculo da blindagem da sala antes da obra ou da troca de equipamento.",
      norm: "RDC 611/2022 + requisitos aplicáveis à modalidade",
    },
    {
      title: "Treinamentos",
      slug: "treinamentos",
      text: "Capacitação periódica em radioproteção e segurança em ressonância magnética.",
      norm: "RDC 611/2022 + requisitos aplicáveis à modalidade",
    },
    {
      title: "Licenciamento sanitário",
      slug: "licenciamento-sanitario",
      text: "Apoio na documentação para obter ou renovar a licença da vigilância sanitária.",
      norm: "RDC 611/2022 + exigências sanitárias aplicáveis",
    },
  ];

  function buildSection() {
    const section = document.createElement("section");
    section.id = "consult-servicos-oficiais";
    section.style.background = "#f6faf9";
    section.style.padding = "64px 20px";

    const wrap = document.createElement("div");
    wrap.style.maxWidth = "1180px";
    wrap.style.margin = "0 auto";

    wrap.innerHTML = `
      <div style="max-width:780px;margin-bottom:30px">
        <p style="margin:0 0 10px;color:#08a77f;font-size:12px;font-weight:800;letter-spacing:.22em;text-transform:uppercase">SERVIÇOS</p>
        <h2 style="margin:0;color:#075653;font-size:clamp(30px,4vw,44px);line-height:1.02;letter-spacing:-.035em">Física Médica e Proteção Radiológica</h2>
        <p style="margin:16px 0 0;color:#557270;font-size:15px;line-height:1.65">Seis serviços com página própria, base normativa identificada e conteúdo técnico organizado conforme o guia oficial da Consult.</p>
      </div>
    `;

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fit,minmax(250px,1fr))";
    grid.style.gap = "16px";

    SERVICES.forEach((service) => {
      const card = document.createElement("a");
      card.href = `/consult/servicos/${service.slug}`;
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.minHeight = "230px";
      card.style.padding = "22px";
      card.style.border = "1px solid #dceae7";
      card.style.borderRadius = "18px";
      card.style.background = "#fff";
      card.style.color = "#123c3b";
      card.style.textDecoration = "none";
      card.style.boxShadow = "0 10px 24px rgba(7,86,83,.05)";
      card.style.transition = "transform .18s ease, box-shadow .18s ease";
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-3px)";
        card.style.boxShadow = "0 14px 30px rgba(7,86,83,.10)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "0 10px 24px rgba(7,86,83,.05)";
      });
      card.innerHTML = `
        <div style="width:38px;height:4px;border-radius:999px;background:#8ae600;margin-bottom:18px"></div>
        <h3 style="margin:0;color:#075653;font-size:20px;line-height:1.15">${service.title}</h3>
        <p style="margin:12px 0 0;color:#557270;font-size:13px;line-height:1.55">${service.text}</p>
        <p style="margin:auto 0 0;padding-top:18px;color:#078b6b;font-size:11px;font-weight:800;line-height:1.45">${service.norm}</p>
      `;
      grid.appendChild(card);
    });

    wrap.appendChild(grid);
    section.appendChild(wrap);
    return section;
  }

  function inject() {
    if (!SERVICE_PATHS.has(window.location.pathname)) return;
    if (document.getElementById("consult-servicos-oficiais")) return;
    const main = document.querySelector("main");
    if (!main) return;
    const section = buildSection();
    main.appendChild(section);
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      inject();
    });
  };

  const root = document.getElementById("root");
  if (root) new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
  window.addEventListener("popstate", schedule);
  window.addEventListener("pageshow", schedule);
  document.addEventListener("DOMContentLoaded", schedule, { once: true });
  schedule();
})();
