import React, { useEffect } from 'react'
import { AlertTriangle, FileText, ShieldCheck } from 'lucide-react'
import { ConsultCtaBand, ConsultEyebrow, ConsultSiteShell } from '@/components/ConsultSiteShell'

const SIGNS = [
  { title: 'Radiação ionizante', lines: ['ATENÇÃO','RADIAÇÃO IONIZANTE','Acesso restrito a pessoas autorizadas'] },
  { title: 'Acesso controlado', lines: ['ÁREA CONTROLADA','AGUARDE ORIENTAÇÃO DA EQUIPE','Siga os procedimentos de radioproteção do serviço'] },
  { title: 'Ressonância magnética', lines: ['ATENÇÃO','ÁREA DE RESSONÂNCIA MAGNÉTICA','Verifique restrições e objetos metálicos antes de entrar'] },
]

export default function ConsultSignageMaterialPage() {
  useEffect(() => {
    document.title = 'Modelos de sinalização técnica | Consult'
    document.querySelector('meta[name="description"]')?.setAttribute('content','Modelos ilustrativos de sinalização técnica para radioproteção e áreas controladas, sujeitos à validação do serviço e do responsável técnico.')
  }, [])
  return <ConsultSiteShell><main>
    <section className="relative overflow-hidden bg-[#075653] text-white"><div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24"><ConsultEyebrow light>Material gratuito</ConsultEyebrow><h1 className="mt-5 max-w-5xl text-4xl font-black leading-[.98] tracking-[-.045em] sm:text-5xl lg:text-[64px]">Modelos ilustrativos de sinalização técnica</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">Referências visuais para discussão com a equipe técnica. A sinalização final deve considerar o ambiente, a modalidade e os requisitos aplicáveis ao serviço.</p></div></section>
    <section className="bg-[#F4FAF8]"><div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20"><div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]"><div><ConsultEyebrow>Como usar</ConsultEyebrow><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-[#075653] md:text-4xl">Um ponto de partida visual, não uma placa normativa pronta.</h2><p className="mt-4 text-sm leading-7 text-[#607D7A]">Antes de produção e instalação, o conteúdo precisa ser validado conforme o ambiente e a orientação do responsável técnico.</p></div><div className="grid gap-5 md:grid-cols-3">
      {SIGNS.map((sign) => <article key={sign.title} className="overflow-hidden rounded-[24px] border border-[#D5E6E1] bg-white shadow-[0_16px_45px_rgba(7,86,83,.07)]"><div className="bg-[#075653] p-6 text-white"><div className="text-[9px] font-black uppercase tracking-[.2em] text-[#8AE600]">Modelo ilustrativo</div><div className="mt-5 grid h-20 w-20 place-items-center rounded-full border-4 border-[#8AE600] text-[#8AE600]"><AlertTriangle size={36}/></div></div><div className="p-6"><div className="text-xs font-black uppercase tracking-[.18em] text-[#08A77F]">{sign.lines[0]}</div><div className="mt-2 text-xl font-black leading-tight text-[#123C3B]">{sign.lines[1]}</div><div className="mt-3 text-sm leading-6 text-[#607D7A]">{sign.lines[2]}</div></div></article>)}
    </div></div></div></section>
    <section className="bg-white"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:grid-cols-2 md:px-8"><div className="rounded-[22px] border border-[#D5E6E1] bg-[#F7FBFA] p-6"><ShieldCheck className="text-[#08A77F]"/><h2 className="mt-4 text-xl font-black text-[#075653]">Validação técnica obrigatória</h2><p className="mt-3 text-sm leading-7 text-[#607D7A]">Os modelos não substituem a norma aplicável nem a avaliação do responsável técnico.</p></div><a href="/materiais/mapa-normas-radiologia" className="rounded-[22px] border border-[#D5E6E1] bg-white p-6 shadow-sm"><FileText className="text-[#08A77F]"/><h2 className="mt-4 text-xl font-black text-[#075653]">Veja também o mapa de normas</h2><p className="mt-3 text-sm leading-7 text-[#607D7A]">RDC 611/2022 e IN 90 a 97/2021 organizadas por modalidade.</p></a></div></section>
    <ConsultCtaBand title="Precisa revisar a sinalização do seu serviço?" text="A equipe Consult pode orientar o escopo técnico aplicável ao ambiente e à modalidade."/>
  </main></ConsultSiteShell>
}