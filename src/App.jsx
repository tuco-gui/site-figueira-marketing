import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), [pathname])
  return null
}

function Loading() {
  return <div className="flex min-h-screen items-center justify-center bg-[#075653] text-white"><div className="text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-[#8AE600]"/><p className="mt-4 text-sm font-semibold text-white/70">Carregando...</p></div></div>
}

function NotFound() {
  return <div className="flex min-h-screen items-center justify-center bg-[#F4FBFA] px-6 text-center text-[#123C3B]"><div><h1 className="text-4xl font-black">Página não encontrada</h1><a className="mt-6 inline-flex rounded-xl bg-[#075653] px-5 py-3 text-sm font-extrabold text-white" href="/">Voltar ao início</a></div></div>
}

export default function App() {
  return <BrowserRouter><ScrollToTop/><Suspense fallback={<Loading/>}><Routes>
    <Route path="/" element={<ConsultProposal/>}/>
    <Route path="/sobre" element={<ConsultAboutPage/>}/>
    <Route path="/servicos" element={<ConsultServicesPage/>}/>
    <Route path="/politica-de-privacidade" element={<ConsultPrivacyPage/>}/>

    <Route path="/fisica-medica" element={<ConsultAreaLandingPageV3 fixedSlug="fisica-medica"/>}/>
    <Route path="/protecao-radiologica" element={<ConsultAreaLandingPageV3 fixedSlug="protecao-radiologica"/>}/>
    <Route path="/engenharia-clinica" element={<ConsultAreaLandingPageV3 fixedSlug="engenharia-clinica"/>}/>

    <Route path="/fisica-medica/controle-de-qualidade" element={<ConsultQualityIndexPage/>}/>
    <Route path="/fisica-medica/controle-de-qualidade/:slug" element={<ConsultQualityModalityPage/>}/>
    <Route path="/fisica-medica/:slug" element={<ConsultServicePage/>}/>
    <Route path="/protecao-radiologica/:slug" element={<ConsultServicePage/>}/>
    <Route path="/engenharia-clinica/equipamentos/:slug" element={<ConsultEquipmentPage/>}/>
    <Route path="/engenharia-clinica/:slug" element={<ConsultEngineeringServicePage/>}/>
    <Route path="/atuacao/:slug" element={<ConsultRegionPage/>}/>

    <Route path="/normas" element={<ConsultNormsPage/>}/>
    <Route path="/materiais" element={<ConsultMaterialsPage/>}/>
    <Route path="/materiais/mapa-normas-radiologia" element={<ConsultNormMapResourcePage/>}/>
    <Route path="/materiais/guia-servicos-radiologia" element={<ConsultRadiologyServiceGuidePage/>}/>
    <Route path="/materiais/modelos-sinalizacao" element={<ConsultSignageMaterialPage/>}/>
    <Route path="/blog" element={<ConsultBlogPage/>}/>
    <Route path="/blog/:slug" element={<ConsultBlogPostPage/>}/>

    <Route path="/areas/:slug" element={<ConsultLegacyRedirect type="area"/>}/>
    <Route path="/servicos/:slug" element={<ConsultLegacyRedirect type="service"/>}/>
    <Route path="/equipamentos/:slug" element={<ConsultLegacyRedirect type="equipment"/>}/>
    <Route path="/regioes/:slug" element={<ConsultLegacyRedirect type="region"/>}/>
    <Route path="/consult/*" element={<Navigate to="/" replace/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></Suspense></BrowserRouter>
}
