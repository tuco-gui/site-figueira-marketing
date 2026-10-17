import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'consult-cookie-consent-v1'
const EVENT = 'consult:cookie-consent'
const initial = { necessary: true, analytics: false, marketing: false }

function storedChoice() {
  if (typeof window === 'undefined') return null
  try {
    const data = JSON.parse(window.localStorage.getItem(KEY) || 'null')
    if (data && data.version === 1 && typeof data.analytics === 'boolean' && typeof data.marketing === 'boolean') return data
  } catch { /* storage blocked: show consent again */ }
  return null
}

export default function ConsultCookieNotice() {
  const [choice, setChoice] = useState(() => storedChoice())
  const [open, setOpen] = useState(() => !storedChoice())
  const [customize, setCustomize] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const reopen = () => { setCustomize(true); setOpen(true) }
    window.addEventListener('consult:open-cookie-settings', reopen)
    return () => window.removeEventListener('consult:open-cookie-settings', reopen)
  }, [])

  function save(next) {
    const value = { ...initial, ...next, version: 1, updatedAt: new Date().toISOString() }
    try { window.localStorage.setItem(KEY, JSON.stringify(value)) } catch { /* user storage may be disabled */ }
    setChoice(value)
    setOpen(false)
    setCustomize(false)
    window.dispatchEvent(new CustomEvent(EVENT, { detail: value }))
  }

  return <>
    {!open && choice && <button type="button" onClick={() => { setAnalytics(choice.analytics); setMarketing(choice.marketing); setCustomize(true); setOpen(true) }} className="fixed bottom-3 left-3 z-[90] rounded-full border border-[#D5E9E3] bg-white px-4 py-2 text-xs font-bold text-[#075653] shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#075653]">Cookies</button>}
    {open && <div role="region" aria-label="Preferências de cookies da Consult" className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[#C8DED8] bg-white px-4 py-5 text-[#123C3B] shadow-[0_-10px_45px_rgba(0,0,0,.17)] sm:bottom-5 sm:left-5 sm:right-auto sm:w-[min(540px,calc(100vw-40px))] sm:rounded-2xl sm:border sm:p-6">
      <h2 className="text-lg font-black">Sua privacidade importa</h2>
      <p className="mt-2 text-sm leading-6 text-[#315B58]">Usamos recursos necessários para o funcionamento do site. Cookies opcionais de análise ou publicidade só poderão ser ativados com seu consentimento. Saiba mais na <Link className="font-bold underline" to="/consult/politica-de-privacidade">Política de Privacidade</Link>.</p>
      {customize && <fieldset className="mt-4 space-y-3 rounded-xl bg-[#F4FBFA] p-4 text-sm">
        <legend className="sr-only">Escolha as categorias de cookies</legend>
        <label className="flex items-center gap-2"><input type="checkbox" checked disabled/> Necessários (sempre ativos)</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)}/> Análise e estatísticas</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)}/> Publicidade e marketing</label>
        <p className="text-xs leading-5 text-[#54746F]">Não ativamos scripts opcionais nesta homologação. Sua escolha é guardada localmente e poderá ser alterada em “Cookies”.</p>
      </fieldset>}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => save({ analytics: true, marketing: true })} className="min-h-11 rounded-lg bg-[#075653] px-4 py-2 text-sm font-bold text-white">Aceitar opcionais</button>
        <button type="button" onClick={() => save({ analytics: false, marketing: false })} className="min-h-11 rounded-lg border border-[#075653] px-4 py-2 text-sm font-bold text-[#075653]">Recusar opcionais</button>
        {customize
          ? <button type="button" onClick={() => save({ analytics, marketing })} className="min-h-11 rounded-lg border border-[#D5E9E3] px-4 py-2 text-sm font-bold text-[#075653]">Salvar escolhas</button>
          : <button type="button" onClick={() => setCustomize(true)} className="min-h-11 rounded-lg border border-[#D5E9E3] px-4 py-2 text-sm font-bold text-[#075653]">Personalizar</button>}
      </div>
    </div>}
  </>
}
