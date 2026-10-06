(() => {
  const PATH = "/consult/areas/engenharia-clinica";
  const SERVICES = [
    ["Ensaio de segurança elétrica", "seguranca-eletrica", "ABNT NBR IEC 62353", "Medição de aterramento, isolamento e correntes de fuga."],
    ["Ensaio de desempenho (calibração)", "desempenho-calibracao", "Família ABNT NBR IEC 60601 + manual do fabricante", "Comparação ponto a ponto com analisador ou simulador calibrado."],
    ["Manutenção preventiva", "manutencao-preventiva", "Plano de manutenção do fabricante", "Limpeza, lubrificação e testes; pendências são registradas, sem troca de peças pela Consult."],
    ["Reverificação", "reverificacao", "Norma do ensaio original", "Novo ensaio após o hospital resolver a pendência identificada."],
    ["Qualificação térmica", "qualificacao-termica", "RDC 15/2012; RDC 197/2017; PNI; RDC 430/2020", "Mapeamento de temperatura com sensores calibrados e relatório de conformidade."],
  ];

  const css = `
    #consult-engineering-preview{background:#f6faf9;padding:0 20px 64px;color:#123c3b}
    #consult-engineering-preview .cep-wrap{max-width:1180px;margin:0 auto}
    #consult-engineering-preview .cep-strip{margin:0 -20px 44px;background:#053f3d;color:#fff;border-top:1px solid rgba(138,230,0,.28);border-bottom:1px solid rgba(138,230,0,.28)}
    #consult-engineering-preview .cep-strip-inner{max-width:1180px;margin:0 auto;padding:18px 20px;display:flex;gap:20px;align-items:center;justify-content:space-between}
    #consult-engineering-preview .cep-strip strong{display:block;color:#8ae600;font-size:11px;letter-spacing:.2em;text-transform:uppercase;margin-bottom:5px}
    #consult-engineering-preview .cep-strip p{margin:0;max-width:850px;font-size:14px;line-height:1.55;color:rgba(255,255,255,.84)}
    #consult-engineering-preview .cep-kicker{margin:0 0 10px;color:#08a77f;font-size:12px;font-weight:800;letter-spacing:.22em;text-transform:uppercase}
    #consult-engineering-preview h2{margin:0;color:#075653;font-size:clamp(30px,4vw,44px);line-height:1.02;letter-spacing:-.035em}
    #consult-engineering-preview .cep-intro{max-width:820px;margin:16px 0 28px;color:#557270;font-size:15px;line-height:1.65}
    #consult-engineering-preview .cep-meta{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
    #consult-engineering-preview .cep-meta span{border:1px solid #d7e8e4;background:#fff;border-radius:999px;padding:8px 11px;color:#466764;font-size:11px;font-weight:700}
    #consult-engineering-preview .cep-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}
    #consult-engineering-preview .cep-card{display:flex;flex-direction:column;min-height:230px;padding:22px;border:1px solid #dceae7;border-radius:18px;background:#fff;color:#123c3b;text-decoration:none;box-shadow:0 10px 24px rgba(7,86,83,.05);transition:.18s ease}
    #consult-engineering-preview .cep-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(7,86,83,.10)}
    #consult-engineering-preview .cep-card:before{content:"";display:block;width:38px;height:4px;border-radius:999px;background:#8ae600;margin-bottom:18px}
    #consult-engineering-preview .cep-card h3{margin:0;color:#075653;font-size:20px;line-height:1.15}
    #consult-engineering-preview .cep-card p{margin:12px 0 0;color:#557270;font-size:13px;line-height:1.55}
    #consult-engineering-preview .cep-card small{margin-top:auto;padding-top:18px;color:#078b6b;font-size:11px;font-weight:800;line-height:1.45}
    @media(max-width:700px){#consult-engineering-preview .cep-strip-inner{align-items:flex-start;flex-direction:column;gap:8px}}
  `;

  function alignHero() {
    if (window.location.pathname !== PATH) return;
    const h1 = document.querySelector("main h1");
    if (h1) h1.textContent = "Consult Engenharia Clínica";
    const main = document.querySelector("main");
    if (!main) return;
    const hero = h1?.closest("section") || main.querySelector("section");
    if (!hero) return;
    const paragraphs = [...hero.querySelectorAll("p")];
    const target = paragraphs.find((p) => /Gestão de equipamentos|Ensaios, calibração|Atuação técnica/i.test(p.textContent));
    if (target) target.textContent = "A Consult ensaia, calibra e qualifica os equipamentos médicos do seu hospital e entrega o resultado em laudo. Não fazemos conserto e não vendemos peças: o laudo diz o que o equipamento tem, e você resolve com o fornecedor que preferir.";
  }

  function inject() {
    if (window.location.pathname !== PATH) return;
    alignHero();
    if (document.getElementById("consult-engineering-preview")) return;
    const main = document.querySelector("main");
    if (!main) return;

    if (!document.getElementById("consult-engineering-preview-style")) {
      const style = document.createElement("style");
      style.id = "consult-engineering-preview-style";
      style.textContent = css;
      document.head.appendChild(style);
    }

    const section = document.createElement("section");
    section.id = "consult-engineering-preview";
    const cards = SERVICES.map(([title, slug, norm, text]) => `
      <a class="cep-card" href="/consult/engenharia-clinica/${slug}">
        <h3>${title}</h3>
        <p>${text}</p>
        <small>${norm}</small>
      </a>`).join("");

    section.innerHTML = `
      <div class="cep-strip">
        <div class="cep-strip-inner">
          <div><strong>Verificação independente</strong><p>Não consertamos e não vendemos peças. O laudo aponta o que o equipamento tem, e o hospital resolve com o fornecedor que preferir.</p></div>
          <span style="font-size:11px;font-weight:800;color:rgba(255,255,255,.62);white-space:nowrap">SEM VÍNCULO COM EMPRESAS DE CONSERTO</span>
        </div>
      </div>
      <div class="cep-wrap">
        <p class="cep-kicker">Consult Engenharia Clínica</p>
        <h2>Ensaios, calibração, qualificação e laudo por equipamento</h2>
        <p class="cep-intro">Os cinco serviços seguem a base geral da RDC 509/2021. Os laudos são assinados pelo responsável técnico e emitidos no Arkmeds, com histórico por equipamento. Os analisadores possuem certificado de calibração com rastreabilidade RBC.</p>
        <div class="cep-meta"><span>RDC 509/2021</span><span>Arkmeds</span><span>Rastreabilidade RBC</span><span>Laudo por equipamento</span></div>
        <div class="cep-grid">${cards}</div>
      </div>`;

    main.appendChild(section);
  }

  let scheduled = false;
  function schedule(){
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; inject(); });
  }
  const root = document.getElementById("root");
  if (root) new MutationObserver(schedule).observe(root,{childList:true,subtree:true,characterData:true});
  window.addEventListener("pageshow",schedule);
  window.addEventListener("popstate",schedule);
  document.addEventListener("DOMContentLoaded",schedule,{once:true});
  schedule();
})();
