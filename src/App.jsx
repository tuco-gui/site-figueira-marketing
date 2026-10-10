import { lazy, Suspense } from 'react'
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
                <Route path="atuacao/:slug" element={<ConsultLegacyRedirect type="region" />} />

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