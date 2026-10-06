(() => {
  const PATH = "/consult/areas/engenharia-clinica";
  const EQUIPMENT = [
    ["Monitor multiparamétrico","monitor-multiparametrico","ECG, PNI, pressão invasiva, temperatura, respiração e SpO₂","Waller + Yagi"],
    ["Eletrocardiógrafo","eletrocardiografo","Resposta a ritmos cardíacos simulados","Waller"],
    ["Oxímetro de pulso","oximetro-pulso","SpO₂ e frequência de pulso com sinal simulado","Yagi"],
    ["Esfigmomanômetro digital e MAPA","esfigmomanometro-mapa","Pressão sistólica e diastólica simuladas","Waller"],
    ["Desfibrilador, cardioversor e DEA","desfibrilador-cardioversor-dea","Energia, tempo de carga, sincronismo e resposta ao ECG","Lown"],
    ["Marca-passo transcutâneo","marca-passo-transcutaneo","Tensão, corrente e frequência em diferentes cargas","Lown"],
    ["Bisturi elétrico","bisturi-eletrico","Potência em diferentes cargas e fuga de alta frequência","Harrison"],
    ["Ventilador pulmonar","ventilador-pulmonar","Fluxo, volume, pressões, PEEP e concentração de O₂","Luft + pulmão de teste"],
    ["Aparelho de anestesia","aparelho-anestesia","Parte ventilatória; não mede concentração de agente anestésico","Luft"],
    ["CPAP e BiPAP","cpap-bipap","Fluxo e pressão","Luft"],
    ["Fluxômetro e manômetro de O₂","fluxometro-manometro-o2","Fluxo e pressão","Luft"],
    ["Autoclave","autoclave","Temperatura em até 16 pontos, pressão e letalidade F0","Otto"],
    ["Termodesinfectora e estufa de esterilização","termodesinfectora-estufa","Temperatura em até 16 pontos e letalidade A0","Otto"],
    ["Estufa e banho-maria de laboratório","estufa-banho-maria","Estabilidade e uniformidade de temperatura","Otto"],
    ["Geladeira e câmara de vacina","geladeira-camara-vacina","Mapeamento de temperatura","Otto"],
  ];

  function inject(){
    if(window.location.pathname!==PATH)return;
    if(document.getElementById("consult-equipment-preview"))return;
    const main=document.querySelector("main");
    if(!main)return;

    const section=document.createElement("section");
    section.id="consult-equipment-preview";
    section.style.background="#ffffff";
    section.style.padding="64px 20px";

    const cards=EQUIPMENT.map(([title,slug,test,analyzer])=>`
      <a href="/consult/equipamentos/${slug}" style="display:flex;flex-direction:column;min-height:210px;padding:20px;border:1px solid #dceae7;border-radius:16px;background:#f9fcfb;color:#123c3b;text-decoration:none">
        <div style="width:34px;height:4px;border-radius:999px;background:#08a77f;margin-bottom:16px"></div>
        <h3 style="margin:0;color:#075653;font-size:18px;line-height:1.2">${title}</h3>
        <p style="margin:10px 0 0;color:#557270;font-size:12.5px;line-height:1.5">${test}</p>
        <div style="margin-top:auto;padding-top:16px;color:#078b6b;font-size:11px;font-weight:800">Analisador: ${analyzer}</div>
      </a>`).join("");

    section.innerHTML=`
      <div style="max-width:1180px;margin:0 auto">
        <p style="margin:0 0 10px;color:#08a77f;font-size:12px;font-weight:800;letter-spacing:.22em;text-transform:uppercase">Equipamentos confirmados</p>
        <h2 style="margin:0;color:#075653;font-size:clamp(30px,4vw,44px);line-height:1.02;letter-spacing:-.035em">Equipamentos atendidos na Engenharia Clínica</h2>
        <p style="max-width:840px;margin:16px 0 12px;color:#557270;font-size:15px;line-height:1.65">Somente equipamentos para os quais a Consult confirmou analisador. Todos recebem também ensaio de segurança elétrica com Safetest 50, Rigel.</p>
        <p style="max-width:840px;margin:0 0 30px;color:#7a8f8d;font-size:12px;line-height:1.55">Não estão incluídos nesta versão: bomba de infusão, berço aquecido e incubadora, fototerapia, balança, centrífuga, agitador, homogeneizador, umidificador aquecido e elevador de paciente.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:14px">${cards}</div>
      </div>`;
    main.appendChild(section);
  }

  let scheduled=false;
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;inject()})}
  const root=document.getElementById("root");if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  window.addEventListener("pageshow",schedule);window.addEventListener("popstate",schedule);document.addEventListener("DOMContentLoaded",schedule,{once:true});schedule();
})();
