import React from 'react'
import { CheckCircle2, FileText } from 'lucide-react'

const LABELS = {
  measurement: ['MEDIÇÃO', 'CRITÉRIO', 'RESULTADO'],
  shield: ['AMBIENTE', 'PROTEÇÃO', 'REGISTRO'],
  document: ['REQUISITO', 'DOCUMENTO', 'STATUS'],
  thermal: ['SENSOR', 'CICLO', 'CURVA'],
  training: ['CONTEÚDO', 'EQUIPE', 'REGISTRO'],
  clinical: ['EQUIPAMENTO', 'ENSAIO', 'LAUDO'],
}

function Wave({ variant }) {
  if (variant === 'thermal') {
    return <path d="M62 236 C106 220 128 172 168 182 C207 192 219 257 260 246 C302 234 324 170 366 184 C402 195 414 226 446 216" />
  }
  if (variant === 'document') {
    return <path d="M66 232 C126 232 138 192 188 192 C238 192 252 246 304 246 C358 246 370 201 444 201" />
  }
  return <path d="M62 236 C96 236 101 191 129 191 C158 191 163 263 194 263 C225 263 228 174 264 174 C299 174 307 235 339 235 C372 235 378 194 446 194" />
}

export function ConsultTechnicalVisual({ variant = 'measurement', title, metric = 'Resultado técnico documentado' }) {
  const labels = LABELS[variant] || LABELS.measurement
  return (
    <div className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[30px] border border-white/12 bg-[#043F3D]/82 p-4 shadow-[0_34px_80px_rgba(0,32,31,.35)] backdrop-blur md:p-5">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#8AE600]/18" />
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border border-[#8AE600]/15" />
      <div className="relative rounded-[24px] border border-white/8 bg-[#064946] p-5 md:p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="text-[9px] font-black uppercase tracking-[.24em] text-[#8AE600]">Consult / análise técnica</div>
            <div className="mt-2 max-w-[330px] text-lg font-black leading-6 text-white md:text-xl">{title}</div>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#8AE600]/30 bg-[#8AE600]/10">
            <div className="h-4 w-4 rounded-full bg-[#8AE600] shadow-[0_0_24px_rgba(138,230,0,.72)]" />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[20px] border border-white/8 bg-[#053F3D]">
          <svg viewBox="0 0 520 300" className="block h-auto w-full" aria-hidden="true">
            <defs>
              <linearGradient id={`consult-line-${variant}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#08A77F" />
                <stop offset="100%" stopColor="#8AE600" />
              </linearGradient>
              <radialGradient id={`consult-glow-${variant}`}>
                <stop offset="0%" stopColor="#8AE600" stopOpacity=".9" />
                <stop offset="100%" stopColor="#8AE600" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[70,130,190,250].map((y) => <line key={`h${y}`} x1="40" x2="480" y1={y} y2={y} stroke="rgba(255,255,255,.07)" strokeWidth="1" />)}
            {[90,170,250,330,410].map((x) => <line key={`v${x}`} x1={x} x2={x} y1="38" y2="270" stroke="rgba(255,255,255,.05)" strokeWidth="1" />)}
            <circle cx="260" cy="150" r="92" fill="none" stroke="rgba(138,230,0,.13)" />
            <circle cx="260" cy="150" r="54" fill="none" stroke="rgba(138,230,0,.10)" />
            <circle cx="260" cy="150" r="124" fill="none" stroke="rgba(255,255,255,.04)" />
            <g fill="none" stroke={`url(#consult-line-${variant})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <Wave variant={variant} />
            </g>
            {[129,194,264,339,418].map((x, index) => <g key={x}><circle cx={x} cy={[191,263,174,235,202][index]} r="18" fill={`url(#consult-glow-${variant})`} /><circle cx={x} cy={[191,263,174,235,202][index]} r="4.5" fill="#C9FF7B" /></g>)}
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 divide-x divide-white/8 rounded-[18px] border border-white/8 bg-white/[.035]">
          {labels.map((label, index) => (
            <div key={label} className="px-3 py-3.5">
              <div className="text-[8px] font-black tracking-[.18em] text-white/38">0{index + 1}</div>
              <div className="mt-1 text-[10px] font-black tracking-[.12em] text-white/78">{label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-[16px] border border-[#8AE600]/18 bg-[#8AE600]/7 px-4 py-3">
          <CheckCircle2 size={18} className="shrink-0 text-[#8AE600]" />
          <span className="text-xs font-bold leading-5 text-white/78">{metric}</span>
        </div>
      </div>
    </div>
  )
}

export function ConsultSectionNav({ items }) {
  return (
    <div className="sticky top-[72px] z-40 border-b border-[#DCEAE7] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
        {items.map(([label, href]) => (
          <a key={href} href={href} className="shrink-0 rounded-full px-4 py-2 text-xs font-extrabold text-[#4D706D] transition hover:bg-[#EAF5F2] hover:text-[#075653]">{label}</a>
        ))}
      </div>
    </div>
  )
}

export function ConsultReportPreview({ eyebrow = 'ENTREGÁVEL', title = 'Documento técnico', sections = ['Identificação', 'Metodologia', 'Medições', 'Critérios aplicáveis', 'Resultado técnico'] }) {
  return (
    <div className="relative mx-auto max-w-[620px]">
      <div className="absolute -left-5 top-8 hidden h-[86%] w-full rotate-[-2deg] rounded-[28px] border border-[#CFE3DE] bg-[#E8F3F0] md:block" />
      <div className="relative overflow-hidden rounded-[28px] border border-[#D4E6E1] bg-white shadow-[0_30px_70px_rgba(7,86,83,.14)]">
        <div className="flex items-start justify-between gap-5 border-b border-[#E4EEEC] px-6 py-6 md:px-8">
          <div>
            <div className="text-[9px] font-black uppercase tracking-[.25em] text-[#08A77F]">{eyebrow}</div>
            <div className="mt-2 text-2xl font-black tracking-tight text-[#075653]">{title}</div>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#075653] text-[#8AE600]"><FileText size={23} /></div>
        </div>
        <div className="px-6 py-4 md:px-8">
          {sections.map((section, index) => (
            <div key={section} className={`grid grid-cols-[34px_1fr_auto] items-center gap-4 py-4 ${index ? 'border-t border-[#EDF3F1]' : ''}`}>
              <span className="text-xs font-black text-[#08A77F]">0{index + 1}</span>
              <span className="text-sm font-extrabold text-[#315B58]">{section}</span>
              <span className="h-2.5 w-16 rounded-full bg-[#E3EFEC] sm:w-24" />
            </div>
          ))}
        </div>
        <div className="grid gap-2 border-t border-[#E4EEEC] bg-[#F6FAF9] px-6 py-5 sm:grid-cols-3 md:px-8">
          {['Rastreabilidade', 'Responsável técnico', 'Histórico'].map((item) => <div key={item} className="rounded-xl border border-[#DCEAE7] bg-white px-3 py-3 text-[10px] font-black uppercase tracking-[.1em] text-[#5A7976]">{item}</div>)}
        </div>
      </div>
    </div>
  )
}

export function ConsultEditorialList({ items }) {
  return (
    <div className="divide-y divide-[#DCEAE7] border-y border-[#DCEAE7]">
      {items.map((item, index) => (
        <div key={item} className="grid gap-2 py-5 sm:grid-cols-[58px_1fr] sm:items-start">
          <span className="text-2xl font-black text-[#08A77F]">0{index + 1}</span>
          <span className="text-base font-extrabold leading-7 text-[#315B58]">{item}</span>
        </div>
      ))}
    </div>
  )
}
