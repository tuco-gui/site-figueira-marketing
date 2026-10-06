import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, Gauge, ShieldCheck } from "lucide-react";

const LOGO = "https://solutudo-cdn-proxy.soluall.net/prod/adv_ads/570579fa-a210-422e-8a2c-4ebfac1f1305/68d5471e-43b0-4285-8644-3407ac1e09ff.png";

const EQUIPMENT = {
  "monitor-multiparametrico": { title:"Monitor multiparamétrico", test:"ECG, PNI (pressão não invasiva), pressão invasiva, temperatura, respiração e SpO₂", analyzer:"Waller + Yagi" },
  eletrocardiografo: { title:"Eletrocardiógrafo", test:"Resposta a ritmos cardíacos simulados", analyzer:"Waller" },
  "oximetro-pulso": { title:"Oxímetro de pulso", test:"Leitura de SpO₂ e frequência de pulso com sinal simulado. Não avalia a exatidão do sensor no paciente.", analyzer:"Yagi" },
  "esfigmomanometro-mapa": { title:"Esfigmomanômetro digital e MAPA", test:"Leitura de pressão sistólica e diastólica simuladas", analyzer:"Waller" },
  "desfibrilador-cardioversor-dea": { title:"Desfibrilador, cardioversor e DEA", test:"Energia entregue, tempo de carga, atraso no modo sincronizado e resposta ao ECG", analyzer:"Lown" },
  "marca-passo-transcutaneo": { title:"Marca-passo transcutâneo", test:"Tensão, corrente e frequência em diferentes cargas", analyzer:"Lown" },
  "bisturi-eletrico": { title:"Bisturi elétrico (eletrocautério)", test:"Potência entregue em diferentes cargas e fuga de alta frequência", analyzer:"Harrison" },
  "ventilador-pulmonar": { title:"Ventilador pulmonar", test:"Fluxo, volume, pressões, incluindo PEEP, e concentração de O₂", analyzer:"Luft + pulmão de teste" },
  "aparelho-anestesia": { title:"Aparelho de anestesia — parte ventilatória", test:"Os mesmos parâmetros do ventilador. Não mede concentração de agente anestésico.", analyzer:"Luft" },
  "cpap-bipap": { title:"CPAP e BiPAP", test:"Fluxo e pressão", analyzer:"Luft" },
  "fluxometro-manometro-o2": { title:"Fluxômetro e manômetro de O₂", test:"Fluxo e pressão", analyzer:"Luft" },
  autoclave: { title:"Autoclave", test:"Temperatura em até 16 pontos, pressão e letalidade (F0), em ciclos de operação", analyzer:"Otto" },
  "termodesinfectora-estufa": { title:"Termodesinfectora e estufa de esterilização", test:"Temperatura em até 16 pontos e letalidade (A0)", analyzer:"Otto" },
  "estufa-banho-maria": { title:"Estufa e banho-maria de laboratório", test:"Estabilidade e uniformidade de temperatura", analyzer:"Otto" },
  "geladeira-camara-vacina": { title:"Geladeira e câmara de vacina", test:"Mapeamento de temperatura", analyzer:"Otto" },
};

function Header(){return <header className="sticky top-0 z-50 border-b border-white/10 bg-[#064946]/95 text-white backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8"><Link to="/consult"><img src={LOGO} alt="Consult" className="h-10 w-auto object-contain" /></Link><Link to="/consult#contato" className="rounded-xl bg-[#FF6B26] px-4 py-2.5 text-sm font-bold text-white">Agende uma reunião</Link></div></header>}

export default function ConsultEquipmentPage(){
  const {slug}=useParams();
  const item=useMemo(()=>EQUIPMENT[slug],[slug]);
  useEffect(()=>{if(!item)return;document.title=`Ensaio de ${item.title} | Consult Engenharia Clínica`;let meta=document.querySelector('meta[name="description"]');if(!meta){meta=document.createElement('meta');meta.setAttribute('name','description');document.head.appendChild(meta)}meta.setAttribute('content',`Ensaio de segurança elétrica e desempenho para ${item.title}. ${item.test}.`)},[item]);
  if(!item)return <div className="min-h-screen bg-[#F6FAF9] text-[#123C3B]"><Header/><main className="mx-auto max-w-4xl px-6 py-24 text-center"><h1 className="text-4xl font-black">Equipamento não encontrado</h1><Link to="/consult/areas/engenharia-clinica" className="mt-8 inline-flex items-center gap-2 font-bold text-[#075653]"><ArrowLeft size={18}/> Voltar</Link></main></div>;
  return <div className="min-h-screen bg-[#F6FAF9] text-[#123C3B]"><Header/><main>
    <section className="bg-[#075653] text-white"><div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20"><Link to="/consult/areas/engenharia-clinica" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white"><ArrowLeft size={17}/> Consult Engenharia Clínica</Link><p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8AE600]">Equipamento atendido</p><h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight tracking-tight md:text-6xl">Ensaio de {item.title}: segurança elétrica e desempenho</h1><p className="mt-6 max-w-3xl text-base leading-7 text-white/88 md:text-lg">A Consult verifica parâmetros específicos do equipamento com analisadores calibrados e documenta o resultado em laudo técnico.</p></div></section>
    <section className="border-y border-[#9de75d]/35 bg-[#053F3D] text-white"><div className="mx-auto max-w-7xl px-5 py-5 md:px-8"><p className="text-xs font-black uppercase tracking-[0.2em] text-[#8AE600]">Verificação independente</p><p className="mt-1 max-w-4xl text-sm leading-6 text-white/85">Não consertamos e não vendemos peças. O laudo aponta o que o equipamento tem, e o hospital resolve com o fornecedor que preferir.</p></div></section>
    <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-3 md:px-8 md:py-14">
      <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><Gauge size={21}/></div><h2 className="text-lg font-black text-[#075653]">O que é verificado</h2><p className="mt-3 text-sm leading-6 text-[#456563]">{item.test}</p></article>
      <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><CheckCircle2 size={21}/></div><h2 className="text-lg font-black text-[#075653]">Analisador</h2><p className="mt-3 text-sm leading-6 text-[#456563]">{item.analyzer}</p><p className="mt-3 text-xs leading-5 text-[#6B8583]">Analisadores com certificado de calibração e rastreabilidade RBC.</p></article>
      <article className="rounded-2xl border border-[#DDEBE8] bg-white p-6 shadow-sm"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7F2] text-[#078B6B]"><ShieldCheck size={21}/></div><h2 className="text-lg font-black text-[#075653]">Segurança elétrica</h2><p className="mt-3 text-sm leading-6 text-[#456563]">O equipamento recebe também ensaio de segurança elétrica com Safetest 50, Rigel.</p><p className="mt-3 text-xs leading-5 text-[#6B8583]">Base geral da Engenharia Clínica: RDC 509/2021.</p></article>
    </section>
    <section className="mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20"><div className="rounded-2xl border border-[#DDEBE8] bg-white p-6 md:p-8"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#08A77F]">Resultado</p><h2 className="mt-2 text-2xl font-black text-[#075653]">Laudo por equipamento e histórico no Arkmeds</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-[#557270]">O resultado é documentado por equipamento, assinado pelo responsável técnico e emitido no sistema Arkmeds, mantendo o histórico do equipamento.</p></div></section>
    <section className="bg-[#064946] text-white"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8AE600]">Consult Engenharia Clínica</p><h2 className="mt-2 text-2xl font-black">Solicite a avaliação do seu equipamento</h2></div><Link to="/consult#contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white"><CalendarDays size={18}/> Agende uma reunião</Link></div></section>
  </main></div>;
}
