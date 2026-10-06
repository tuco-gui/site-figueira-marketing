import React from 'react'
import { CheckCircle2, FileText, ShieldCheck } from 'lucide-react'

const LABELS = {
  measurement: ['MEDIÇÃO', 'CRITÉRIO', 'RESULTADO'],
  shield: ['AMBIENTE', 'PROTEÇÃO', 'REGISTRO'],
  document: ['REQUISITO', 'DOCUMENTO', 'STATUS'],
  thermal: ['SENSOR', 'CICLO', 'CURVA'],
  training: ['CONTEÚDO', 'EQUIPE', 'REGISTRO'],
  clinical: ['EQUIPAMENTO', 'ENSAIO', 'LAUDO'],
}

function Wave({ variant }) {
  if (variant === 'thermal') return <path d="M62 236 C106 220 128 172 168 182 C207 192 219 257 260 246 C302 234 324 170 366 184 C402 195 414 226 446 216" />
  if (variant === 'document') return <path d="M66 232 C126 232 138 192 188 192 C238 192 252 246 304 246 C358 246 370 201 444 201" />
  return <path d="M62 236 C96 236 101 191 129 191 C158 191 163 263 194 263 C225 263 228 174 264 174 C299 174 307 235 339 235 C372 235 378 194 446 194" />
}

export function ConsultTechnicalVisual({ variant = 'measurement', title, metric = 'Resultado técnico documentado', compact = false }) {
  const labels = LABELS[variant] || LABELS.measurement
  return (
    <div className={`relative mx-auto w-full overflow-hidden border border-white/12 bg-[#043F3D]/82 shadow-[0_34px_80px_rgba(0,32,31,.35)] backdrop-blur ${compact ? 'max-w-[500px] rounded-[24px] p-3 sm:p-4' : 'max-w-[560px] rounded-[26px] p-3 sm:rounded-[30px] sm:p-4 md:p-5'}`}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full border border-[#8AE600]/18 sm:-right-20 sm:-top-20" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-[#8AE600]/15" />
      <div className="relative rounded-[20px] border border-white/8 bg-[#064946] p-4 sm:rounded-[24px] sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 sm:gap-5">
          <div className="min-w-0">
            <div className="text-[8px] font-black uppercase tracking-[.18em] text-[#8AE600] sm:text-[9px] sm:tracking-[.24em]">Consult / análise técnica</div>
            <div className="mt-2 max-w-[330px] text-base font-black leading-5 text-white sm:text-lg sm:leading-6 md:text-xl">{title}</div>
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#8AE600]/30 bg-[#8AE600]/10 sm:h-12 sm:w-12">
            <div className="h-3.5 w-3.5 rounded-full bg-[#8AE600] shadow-[0_0_24px_rgba(138,230,0,.72)] sm:h-4 sm:w-4" />
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-[16px] border border-white/8 bg-[#053F3D] sm:mt-6 sm:rounded-[20px]">
          <svg viewBox="0 0 520 300" className="block h-auto w-full" aria-hidden="true">
            <defs>
              <linearGradient id={`consult-line-${variant}`} x1="0" x2="1"><stop offset="0%" stopColor="#08A77F" /><stop offset="100%" stopColor="#8AE600" /></linearGradient>
              <radialGradient id={`consult-glow-${variant}`}><stop offset="0%" stopColor="#8AE600" stopOpacity=".9" /><stop offset="100%" stopColor="#8AE600" stopOpacity="0" /></radialGradient>
            </defs>
            {[70,130,190,250].map((y) => <line key={`h${y}`} x1="40" x2="480" y1={y} y2={y} stroke="rgba(255,255,255,.07)" strokeWidth="1" />)}
            {[90,170,250,330,410].map((x) => <line key={`v${x}`} x1={x} x2={x} y1="38" y2="270" stroke="rgba(255,255,255,.05)" strokeWidth="1" />)}
            <circle cx="260" cy="150" r="92" fill="none" stroke="rgba(138,230,0,.13)" /><circle cx="260" cy="150" r="54" fill="none" stroke="rgba(138,230,0,.10)" /><circle cx="260" cy="150" r="124" fill="none" stroke="rgba(255,255,255,.04)" />
            <g fill="none" stroke={`url(#consult-line-${variant})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><Wave variant={variant} /></g>
            {[129,194,264,339,418].map((x, index) => <g key={x}><circle cx={x} cy={[191,263,174,235,202][index]} r="18" fill={`url(#consult-glow-${variant})`} /><circle cx={x} cy={[191,263,174,235,202][index]} r="4.5" fill="#C9FF7B" /></g>)}
          </svg>
        </div>
        <div className="mt-3 grid grid-cols-3 divide-x divide-white/8 overflow-hidden rounded-[14px] border border-white/8 bg-white/[.035] sm:mt-4 sm:rounded-[18px]">
          {labels.map((label, index) => <div key={label} className="min-w-0 px-2 py-3 sm:px-3 sm:py-3.5"><div className="text-[7px] font-black tracking-[.14em] text-white/38 sm:text-[8px] sm:tracking-[.18em]">0{index + 1}</div><div className="mt-1 truncate text-[8px] font-black tracking-[.06em] text-white/78 sm:text-[10px] sm:tracking-[.12em]">{label}</div></div>)}
        </div>
        <div className="mt-3 flex items-start gap-2.5 rounded-[14px] border border-[#8AE600]/18 bg-[#8AE600]/7 px-3.5 py-3 sm:mt-4 sm:items-center sm:gap-3 sm:rounded-[16px] sm:px-4">
          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#8AE600] sm:mt-0" /><span className="text-[11px] font-bold leading-5 text-white/78 sm:text-xs">{metric}</span>
        </div>
      </div>
    </div>
  )
}

export function ConsultSectionNav({ items }) {
  return (
    <div className="sticky top-[72px] z-40 border-b border-[#DCEAE7] bg-white/95 shadow-[0_8px_22px_rgba(7,86,83,.04)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl snap-x gap-1 overflow-x-auto px-3 py-2 sm:px-6 sm:py-2.5 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map(([label, href]) => <a key={href} href={href} className="shrink-0 snap-start rounded-full px-3 py-2 text-[11px] font-extrabold text-[#4D706D] transition hover:bg-[#EAF5F2] hover:text-[#075653] sm:px-4 sm:text-xs">{label}</a>)}
      </div>
    </div>
  )
}

export function ConsultReportPreview({
  eyebrow = 'ENTREGÁVEL',
  title = 'Documento técnico',
  sections = [],
  exampleRows = [],
  resultLabel = 'Resultado documentado',
  note = 'Estrutura ilustrativa. Não representa um documento real emitido pela Consult.',
  watermark = true,
}) {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div className="absolute -left-5 top-8 hidden h-[88%] w-full rotate-[-2deg] rounded-[28px] border border-[#CFE3DE] bg-[#E8F3F0] md:block" />
      <div className="relative overflow-hidden rounded-[22px] border border-[#D4E6E1] bg-white shadow-[0_24px_60px_rgba(7,86,83,.12)] sm:rounded-[28px] sm:shadow-[0_30px_70px_rgba(7,86,83,.14)]">
        {watermark && <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center overflow-hidden"><span className="rotate-[-24deg] select-none text-[54px] font-black tracking-[.18em] text-[#075653]/[.045] sm:text-[78px]">EXEMPLO</span></div>}
        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-[#E4EEEC] px-5 py-5 sm:gap-5 sm:px-6 sm:py-6 md:px-8">
          <div className="min-w-0"><div className="text-[8px] font-black uppercase tracking-[.2em] text-[#08A77F] sm:text-[9px] sm:tracking-[.25em]">{eyebrow}</div><div className="mt-2 text-xl font-black tracking-tight text-[#075653] sm:text-2xl">{title}</div></div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#075653] text-[#8AE600] sm:h-12 sm:w-12"><FileText size={21} /></div>
        </div>

        {exampleRows.length > 0 && (
          <div className="relative z-10 px-5 py-5 sm:px-6 md:px-8">
            <div className="overflow-hidden rounded-[16px] border border-[#DCEAE7]">
              <div className="grid grid-cols-[1.4fr_.9fr_.9fr] bg-[#075653] px-3 py-2.5 text-[8px] font-black uppercase tracking-[.12em] text-white/65 sm:grid-cols-[1.5fr_1fr_1fr_1fr] sm:px-4 sm:text-[9px]">
                <span>Ensaio / item</span><span>Medido</span><span>Referência</span><span className="hidden sm:block">Resultado</span>
              </div>
              {exampleRows.map((row, index) => (
                <div key={`${row[0]}-${index}`} className={`grid grid-cols-[1.4fr_.9fr_.9fr] items-center gap-2 px-3 py-3 text-[10px] sm:grid-cols-[1.5fr_1fr_1fr_1fr] sm:px-4 sm:text-[11px] ${index ? 'border-t border-[#E8F0EE]' : ''}`}>
                  <strong className="leading-4 text-[#315B58]">{row[0]}</strong><span className="text-[#607D7A]">{row[1]}</span><span className="text-[#607D7A]">{row[2]}</span><span className="hidden font-black text-[#078B6B] sm:block">{row[3]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {sections.length > 0 && (
          <div className="relative z-10 px-5 py-3 sm:px-6 sm:py-4 md:px-8">
            {sections.map((section, index) => <div key={section} className={`grid grid-cols-[30px_1fr] items-center gap-3 py-3.5 sm:grid-cols-[34px_1fr_auto] sm:gap-4 sm:py-4 ${index ? 'border-t border-[#EDF3F1]' : ''}`}><span className="text-[11px] font-black text-[#08A77F] sm:text-xs">0{index + 1}</span><span className="text-[13px] font-extrabold leading-5 text-[#315B58] sm:text-sm">{section}</span><span className="hidden h-2.5 w-16 rounded-full bg-[#E3EFEC] sm:block sm:w-20 md:w-24" /></div>)}
          </div>
        )}

        <div className="relative z-10 border-t border-[#E4EEEC] bg-[#F6FAF9] px-5 py-4 sm:px-6 sm:py-5 md:px-8">
          <div className="flex items-start gap-3 rounded-xl border border-[#CFE4DE] bg-white px-4 py-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#08A77F]" /><div><div className="text-[10px] font-black uppercase tracking-[.13em] text-[#078B6B]">{resultLabel}</div><p className="mt-1 text-[11px] leading-5 text-[#607D7A]">{note}</p></div></div>
        </div>
      </div>
    </div>
  )
}

export function ConsultEditorialList({ items }) {
  return (
    <div className="divide-y divide-[#DCEAE7] border-y border-[#DCEAE7]">
      {items.map((item, index) => <div key={item} className="grid gap-1.5 py-4 sm:grid-cols-[54px_1fr] sm:items-start sm:gap-2 sm:py-5"><span className="text-xl font-black text-[#08A77F] sm:text-2xl">0{index + 1}</span><span className="text-sm font-extrabold leading-6 text-[#315B58] sm:text-base sm:leading-7">{item}</span></div>)}
    </div>
  )
}
