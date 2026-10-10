import { lazy, Suspense, useEffect, useState } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PageNotFound from './lib/PageNotFound'
import ScrollToTop from './components/ScrollToTop'

import SiteLayout from '@/components/layout/SiteLayout'
import Home from '@/pages/Home'

const Sobre = lazy(() => import('@/pages/Sobre'))
const Cases = lazy(() => import('@/pages/Cases'))
const Contato = lazy(() => import('@/pages/Contato'))
const GrowthMarketing = lazy(() => import('@/pages/GrowthMarketing'))
const StackDigital = lazy(() => import('@/pages/StackDigital'))
const PartnerLandingPage = lazy(() => import('@/pages/PartnerLandingPage'))

const ConsultProposal = lazy(() => import('@/pages/ConsultProposal'))
const ConsultAboutPage = lazy(() => import('@/pages/ConsultAboutPage'))
const ConsultServicesPage = lazy(() => import('@/pages/ConsultServicesPage'))
const ConsultPrivacyPage = lazy(() => import('@/pages/ConsultPrivacyPage'))
const ConsultAreaLandingPageV3 = lazy(() => import('@/pages/ConsultAreaLandingPageV3'))
const ConsultServicePage = lazy(() => import('@/pages/ConsultServicePage'))
const ConsultEngineeringServicePage = lazy(() => import('@/pages/ConsultEngineeringServicePage'))
const ConsultEquipmentPage = lazy(() => import('@/pages/ConsultEquipmentPage'))
const ConsultQualityIndexPage = lazy(() => import('@/pages/ConsultQualityIndexPage'))
const ConsultQualityModalityPage = lazy(() => import('@/pages/ConsultQualityModalityPage'))
const ConsultRegionPage = lazy(() => import('@/pages/ConsultRegionPage'))
const ConsultNormsPage = lazy(() => import('@/pages/ConsultNormsPage'))
const ConsultMaterialsPage = lazy(() => import('@/pages/ConsultMaterialsPage'))
const ConsultNormMapResourcePage = lazy(() => import('@/pages/ConsultNormMapResourcePage'))
const ConsultRadiologyServiceGuidePage = lazy(() => import('@/pages/ConsultRadiologyServiceGuidePage'))
const ConsultSignageMaterialPage = lazy(() => import('@/pages/ConsultSignageMaterialPage'))
const ConsultBlogPage = lazy(() => import('@/pages/ConsultBlogPage'))
const ConsultBlogPostPage = lazy(() => import('@/pages/ConsultBlogPostPage'))
const ConsultLegacyRedirect = lazy(() => import('@/pages/ConsultLegacyRedirect'))

const EstrategiaGrowth = lazy(() => import('@/pages/solutions/EstrategiaGrowth'))
const Gestao = lazy(() => import('@/pages/solutions/Gestao'))
const MidiaPaga = lazy(() => import('@/pages/solutions/MidiaPaga'))
const Criativos = lazy(() => import('@/pages/solutions/Criativos'))
const PaginasConversao = lazy(() => import('@/pages/solutions/PaginasConversao'))
const CRM = lazy(() => import('@/pages/solutions/CRM'))
const Automacoes = lazy(() => import('@/pages/solutions/Automacoes'))
const AgentesIA = lazy(() => import('@/pages/solutions/AgentesIA'))
const DadosBI = lazy(() => import('@/pages/solutions/DadosBI'))
const Tecnologia = lazy(() => import('@/pages/solutions/Tecnologia'))
const SolucoesSobMedida = lazy(() => import('@/pages/solutions/SolucoesSobMedida'))
const Retencao = lazy(() => import('@/pages/solutions/Retencao'))


/**
 * Captura o contato antes de abrir links do WhatsApp em todas as páginas Consult.
 * Mantém as âncoras e os CTAs aprovados, sem duplicar a interface em cada página.
 */
function ConsultWhatsAppGate() {
  const [url, setUrl] = useState('')
  const [context, setContext] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    const intercept = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      const anchor = event.target?.closest?.('a[href]')
      if (!anchor || anchor.dataset.consultWhatsappVerified === 'true') return
      let parsed
      try { parsed = new URL(anchor.href, window.location.origin) } catch { return }
      const host = parsed.hostname.toLowerCase()
      if (host !== 'wa.me' && host !== 'api.whatsapp.com' && host !== 'web.whatsapp.com') return
      event.preventDefault()
      event.stopPropagation()
      setUrl(parsed.href)
      setContext(anchor.getAttribute('aria-label') || anchor.textContent?.trim() || 'WhatsApp')
      setError('')
      setResult(null)
      try {
        const saved = JSON.parse(sessionStorage.getItem('consult_lead_contact') || '{}')
        setName(saved.name || '')
        setPhone(saved.phone || '')
      } catch {}
    }
    document.addEventListener('click', intercept, true)
    return () => document.removeEventListener('click', intercept, true)
  }, [])

  useEffect(() => {
    if (!url) return
    const onEscape = (event) => {
      if (event.key === 'Escape' && !busy) setUrl('')
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [url, busy])

  const submit = async (event) => {
    event.preventDefault()
    if (busy || !url) return
    setBusy(true)
    setError('')
    try {
      const params = new URLSearchParams(window.location.search)
      const request = await fetch('https://jinhjdvrjvmammumbacz.supabase.co/functions/v1/consult-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp_intent',
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          service: context.slice(0, 160),
          source: 'whatsapp_site',
          page_path: window.location.pathname,
          referrer: document.referrer || '',
          utm_source: params.get('utm_source') || '',
          utm_medium: params.get('utm_medium') || '',
          utm_campaign: params.get('utm_campaign') || '',
          utm_content: params.get('utm_content') || '',
          utm_term: params.get('utm_term') || '',
        }),
      })
      const data = await request.json().catch(() => ({}))
      if (!request.ok || !data.ok || !data.registered) {
        throw new Error(data.error || 'Não foi possível registrar seu contato.')
      }
      try { sessionStorage.setItem('consult_lead_contact', JSON.stringify({ name: name.trim(), phone: phone.trim() })) } catch {}
      setResult({ emailSent: Boolean(data.email_sent), leadId: data.lead_id || null })
    } catch (problem) {
      setError(problem?.message || 'Não foi possível registrar seu contato. Tente novamente.')
    } finally {
      setBusy(false)
    }
  }

  if (!url) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4" role="presentation">
      <div role="dialog" aria-modal="true" aria-labelledby="consult-whatsapp-gate-title" className="w-full max-w-md rounded-2xl bg-white p-6 text-[#123C3B] shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="consult-whatsapp-gate-title" className="text-2xl font-black tracking-tight">
            {result ? 'Contato registrado' : 'Antes de falar no WhatsApp'}
          </h2>
          <button type="button" aria-label="Fechar" disabled={busy} onClick={() => setUrl('')} className="rounded-lg px-2 py-1 text-xl text-[#123C3B] hover:bg-black/5">×</button>
        </div>
        {result ? (
          <div className="mt-4">
            <p className="text-sm leading-6 text-black/70">
              {result.emailSent
                ? 'Recebemos seus dados e notificamos a equipe Consult. Agora você pode continuar pelo WhatsApp.'
                : 'Seus dados foram registrados, mas não foi possível confirmar o aviso por e-mail. Você ainda pode continuar pelo WhatsApp.'}
            </p>
            <a
              data-consult-whatsapp-verified="true"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                window.dataLayer?.push?.({
                  event: 'whatsapp_click',
                  site: 'consult',
                  lead_id: result.leadId,
                })
                setUrl('')
              }}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white hover:brightness-110"
            >Continuar para o WhatsApp</a>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-4">
            <p className="text-sm leading-6 text-black/65">Informe seus dados para registrarmos a solicitação antes de iniciar a conversa.</p>
            <label className="block text-sm font-semibold">Nome *
              <input autoFocus required minLength={2} maxLength={120} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-1 w-full rounded-xl border border-black/15 p-3 outline-none focus:border-[#08A77F]"/>
            </label>
            <label className="block text-sm font-semibold">Telefone / WhatsApp *
              <input required type="tel" minLength={8} maxLength={40} autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1 w-full rounded-xl border border-black/15 p-3 outline-none focus:border-[#08A77F]"/>
            </label>
            <label className="block text-sm font-semibold">E-mail (opcional)
              <input type="email" maxLength={180} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-xl border border-black/15 p-3 outline-none focus:border-[#08A77F]"/>
            </label>
            {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
            <p className="text-xs leading-5 text-black/60">Os dados serão usados para atender à sua solicitação. Leia nossa <a href="/consult/politica-de-privacidade" className="font-bold text-[#075653] underline">Política de Privacidade</a>.</p>
            <button type="submit" disabled={busy} className="min-h-12 w-full rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-60">
              {busy ? 'Registrando contato...' : 'Registrar e continuar'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function RouteFallback({ consult = false }) {
  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${consult ? 'bg-[#075653] text-white' : 'bg-black text-white'}`}>
      <div className="text-center">
        <div className={`mx-auto h-8 w-8 animate-spin rounded-full border-2 ${consult ? 'border-white/25 border-t-[#8AE600]' : 'border-white/20 border-t-white'}`} />
        <p className="mt-4 text-sm font-semibold text-white/70">Carregando...</p>
      </div>
    </div>
  )
}

function Deferred({ children, consult = false }) {
  return <Suspense fallback={<RouteFallback consult={consult} />}>{children}</Suspense>
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Deferred><Sobre /></Deferred>} />
            <Route path="/cases" element={<Deferred><Cases /></Deferred>} />
            <Route path="/contato" element={<Deferred><Contato /></Deferred>} />
            <Route path="/recursos/growth-marketing" element={<Deferred><GrowthMarketing /></Deferred>} />
            <Route path="/stack-digital" element={<Deferred><StackDigital /></Deferred>} />
            <Route path="/stack-digital/:partner" element={<Deferred><PartnerLandingPage /></Deferred>} />
            <Route path="/solucoes/estrategia-growth" element={<Deferred><EstrategiaGrowth /></Deferred>} />
            <Route path="/solucoes/gestao" element={<Deferred><Gestao /></Deferred>} />
            <Route path="/solucoes/midia-paga" element={<Deferred><MidiaPaga /></Deferred>} />
            <Route path="/solucoes/criativos" element={<Deferred><Criativos /></Deferred>} />
            <Route path="/solucoes/paginas-conversao" element={<Deferred><PaginasConversao /></Deferred>} />
            <Route path="/solucoes/crm" element={<Deferred><CRM /></Deferred>} />
            <Route path="/solucoes/automacoes" element={<Deferred><Automacoes /></Deferred>} />
            <Route path="/solucoes/agentes-ia" element={<Deferred><AgentesIA /></Deferred>} />
            <Route path="/solucoes/dados-bi" element={<Deferred><DadosBI /></Deferred>} />
            <Route path="/solucoes/tecnologia" element={<Deferred><Tecnologia /></Deferred>} />
            <Route path="/solucoes/solucoes-sob-medida" element={<Deferred><SolucoesSobMedida /></Deferred>} />
            <Route path="/solucoes/retencao" element={<Deferred><Retencao /></Deferred>} />
          </Route>
          <Route path="/consult/*" element={
            <Deferred consult>
              <ConsultWhatsAppGate />
              <Routes>
                <Route index element={<ConsultProposal />} />
                <Route path="sobre" element={<ConsultAboutPage />} />
                <Route path="servicos" element={<ConsultServicesPage />} />
                <Route path="politica-de-privacidade" element={<ConsultPrivacyPage />} />

                <Route path="fisica-medica" element={<ConsultAreaLandingPageV3 fixedSlug="fisica-medica" />} />
                <Route path="protecao-radiologica" element={<ConsultAreaLandingPageV3 fixedSlug="protecao-radiologica" />} />
                <Route path="engenharia-clinica" element={<ConsultAreaLandingPageV3 fixedSlug="engenharia-clinica" />} />

                <Route path="fisica-medica/controle-de-qualidade" element={<ConsultQualityIndexPage />} />
                <Route path="fisica-medica/controle-de-qualidade/:slug" element={<ConsultQualityModalityPage />} />
                <Route path="fisica-medica/:slug" element={<ConsultServicePage />} />
                <Route path="protecao-radiologica/:slug" element={<ConsultServicePage />} />
                <Route path="engenharia-clinica/equipamentos/:slug" element={<ConsultEquipmentPage />} />
                <Route path="engenharia-clinica/:slug" element={<ConsultEngineeringServicePage />} />
                <Route path="atuacao/:slug" element={<ConsultRegionPage />} />

                <Route path="normas" element={<ConsultNormsPage />} />
                <Route path="materiais" element={<ConsultMaterialsPage />} />
                <Route path="materiais/mapa-normas-radiologia" element={<ConsultNormMapResourcePage />} />
                <Route path="materiais/guia-servicos-radiologia" element={<ConsultRadiologyServiceGuidePage />} />
                <Route path="materiais/modelos-sinalizacao" element={<ConsultSignageMaterialPage />} />
                <Route path="blog" element={<ConsultBlogPage />} />
                <Route path="blog/:slug" element={<ConsultBlogPostPage />} />

                <Route path="areas/:slug" element={<ConsultLegacyRedirect type="area" />} />
                <Route path="servicos/:slug" element={<ConsultLegacyRedirect type="service" />} />
                <Route path="equipamentos/:slug" element={<ConsultLegacyRedirect type="equipment" />} />
                <Route path="regioes/:slug" element={<ConsultLegacyRedirect type="region" />} />
              </Routes>
            </Deferred>
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App