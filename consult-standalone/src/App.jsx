import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import ConsultProposal from '@/pages/ConsultProposal'
import ConsultAboutPage from '@/pages/ConsultAboutPage'
import ConsultServicesPage from '@/pages/ConsultServicesPage'
import ConsultPrivacyPage from '@/pages/ConsultPrivacyPage'
import ConsultAreaLandingPageV3 from '@/pages/ConsultAreaLandingPageV3'
import ConsultServicePage from '@/pages/ConsultServicePage'
import ConsultEngineeringServicePage from '@/pages/ConsultEngineeringServicePage'
import ConsultEquipmentPage from '@/pages/ConsultEquipmentPage'
import ConsultQualityIndexPage from '@/pages/ConsultQualityIndexPage'
import ConsultQualityModalityPage from '@/pages/ConsultQualityModalityPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function NotFound() {
  return <main className="min-h-screen bg-[#075653] px-6 py-24 text-center text-white"><h1 className="text-4xl font-black">Página não encontrada</h1><a href="/" className="mt-8 inline-flex rounded-xl bg-[#FF6B26] px-5 py-3 text-sm font-extrabold">Voltar para a Consult</a></main>
}

export default function App() {
  return <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<ConsultProposal />} />
      <Route path="/sobre" element={<ConsultAboutPage />} />
      <Route path="/servicos" element={<ConsultServicesPage />} />
      <Route path="/politica-de-privacidade" element={<ConsultPrivacyPage />} />
      <Route path="/fisica-medica" element={<ConsultAreaLandingPageV3 fixedSlug="fisica-medica" />} />
      <Route path="/protecao-radiologica" element={<ConsultAreaLandingPageV3 fixedSlug="protecao-radiologica" />} />
      <Route path="/engenharia-clinica" element={<ConsultAreaLandingPageV3 fixedSlug="engenharia-clinica" />} />
      <Route path="/fisica-medica/controle-de-qualidade" element={<ConsultQualityIndexPage />} />
      <Route path="/fisica-medica/controle-de-qualidade/:slug" element={<ConsultQualityModalityPage />} />
      <Route path="/fisica-medica/:slug" element={<ConsultServicePage />} />
      <Route path="/protecao-radiologica/:slug" element={<ConsultServicePage />} />
      <Route path="/engenharia-clinica/equipamentos/:slug" element={<ConsultEquipmentPage />} />
      <Route path="/engenharia-clinica/:slug" element={<ConsultEngineeringServicePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}
