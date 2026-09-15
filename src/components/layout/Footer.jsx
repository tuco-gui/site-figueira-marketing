import React from "react";
import { Link } from "react-router-dom";

const solutions = [
  { name: "Estratégia e Growth", path: "/solucoes/estrategia-growth" },
  { name: "Gestão", path: "/solucoes/gestao" },
  { name: "Mídia Paga", path: "/solucoes/midia-paga" },
  { name: "Criativos", path: "/solucoes/criativos" },
  { name: "Sites e Landing Pages", path: "/solucoes/paginas-conversao" },
  { name: "CRM e Processo Comercial", path: "/solucoes/crm" },
  { name: "Automações", path: "/solucoes/automacoes" },
  { name: "Agentes de IA", path: "/solucoes/agentes-ia" },
  { name: "Dados e BI", path: "/solucoes/dados-bi" },
  { name: "Tecnologia e Sistemas", path: "/solucoes/tecnologia" },
  { name: "Soluções sob medida", path: "/solucoes/solucoes-sob-medida" },
  { name: "Retenção e Sucesso", path: "/solucoes/retencao" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4">
              <div className="mb-6">
                <div className="font-display font-black text-2xl text-white tracking-tight">FIGUEIRA <span className="text-[#C4191F]">MARKETING</span></div>
                <div className="text-sm text-white/45 mt-1">Propósito & Performance</div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-8">
                Marketing, vendas e tecnologia conectados para trabalhar o que mais limita o crescimento da sua empresa.
              </p>
              <Link
                to="/contato"
                className="inline-flex min-h-[48px] items-center justify-center text-center px-6 py-3 bg-accent text-white font-semibold text-sm rounded-lg hover:brightness-95 transition-all"
              >
                Fale com a Figueira
              </Link>
            </div>

            <div className="lg:col-span-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-5">Soluções</h4>
              <ul className="space-y-3">
                {solutions.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-sm text-white/60 hover:text-white transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-5">Empresa</h4>
              <ul className="space-y-3">
                <li><Link to="/stack-digital" className="text-sm text-white/60 hover:text-white transition-colors">Stack Digital</Link></li>
                <li><Link to="/cases" className="text-sm text-white/60 hover:text-white transition-colors">Cases</Link></li>
                <li><Link to="/sobre" className="text-sm text-white/60 hover:text-white transition-colors">Sobre nós</Link></li>
                <li><Link to="/contato" className="text-sm text-white/60 hover:text-white transition-colors">Contato</Link></li>
                <li><Link to="/recursos/growth-marketing" className="text-sm text-white/60 hover:text-white transition-colors">Growth Marketing</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-5">Contato</h4>
              <ul className="space-y-3">
                <li><a href="https://wa.me/5511951783049" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="https://instagram.com/figueiramarketing" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="mailto:contato@figueiramarketing.com.br" className="text-sm text-white/60 hover:text-white transition-colors">contato@figueiramarketing.com.br</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">© 2026 Figueira Marketing. Todos os direitos reservados.</p>
            <p className="text-xs text-white/40 font-mono">Propósito e Performance</p>
          </div>
        </div>
      </div>
    </footer>
  );
}