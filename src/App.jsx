import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PageNotFound from './lib/PageNotFound'
import ScrollToTop from './components/ScrollToTop'

import SiteLayout from '@/components/layout/SiteLayout'

import Home from '@/pages/Home'
import Sobre from '@/pages/Sobre'
import Cases from '@/pages/Cases'
import Contato from '@/pages/Contato'
import GrowthMarketing from '@/pages/GrowthMarketing'
import StackDigital from '@/pages/StackDigital'
import StackDigital from '@/pages/StackDigital'

import EstrategiaGrowth from '@/pages/solutions/EstrategiaGrowth'
import Gestao from '@/pages/solutions/Gestao'
import MidiaPaga from '@/pages/solutions/MidiaPaga'
import Criativos from '@/pages/solutions/Criativos'
import PaginasConversao from '@/pages/solutions/PaginasConversao'
import CRM from '@/pages/solutions/CRM'
import Automacoes from '@/pages/solutions/Automacoes'
import AgentesIA from '@/pages/solutions/AgentesIA'
import DadosBI from '@/pages/solutions/DadosBI'
import Tecnologia from '@/pages/solutions/Tecnologia'
import SolucoesSobMedida from '@/pages/solutions/SolucoesSobMedida'
import Retencao from '@/pages/solutions/Retencao'

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/recursos/growth-marketing" element={<GrowthMarketing />} />
            <Route path="/stack-digital" element={<StackDigital />} />
            <Route path="/stack-digital/:partner" element={<StackDigital />} />
            <Route path="/stack-digital" element={<StackDigital />} />
            <Route path="/stack-digital/:partner" element={<StackDigital />} />
            <Route path="/solucoes/estrategia-growth" element={<EstrategiaGrowth />} />
            <Route path="/solucoes/gestao" element={<Gestao />} />
            <Route path="/solucoes/midia-paga" element={<MidiaPaga />} />
            <Route path="/solucoes/criativos" element={<Criativos />} />
            <Route path="/solucoes/paginas-conversao" element={<PaginasConversao />} />
            <Route path="/solucoes/crm" element={<CRM />} />
            <Route path="/solucoes/automacoes" element={<Automacoes />} />
            <Route path="/solucoes/agentes-ia" element={<AgentesIA />} />
            <Route path="/solucoes/dados-bi" element={<DadosBI />} />
            <Route path="/solucoes/tecnologia" element={<Tecnologia />} />
            <Route path="/solucoes/solucoes-sob-medida" element={<SolucoesSobMedida />} />
            <Route path="/solucoes/retencao" element={<Retencao />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App