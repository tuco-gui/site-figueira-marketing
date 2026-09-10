import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
                <div className="font-display font-bold text-xl text-white tracking-tight">FIGUEIRA Marketing</div>
                <div className="text-sm text-white/50 mt-1">Propósito & Performance</div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-8">
                Estratégia, mídia, sites, CRM, automações, dados e tecnologia conectados para melhorar aquisição, conversão e processo comercial.
              </p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                Fale com um especialista
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-5">
                Soluções
              </h4>
              <ul className="space-y-3">
                {solutions.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-5">
                Empresa
              </h4>
              <ul className="space-y-3">
                <li><Link to="/cases" className="text-sm text-white/60 hover:text-white transition-colors duration-200">Cases</Link></li>
                <li><Link to="/sobre" className="text-sm text-white/60 hover:text-white transition-colors duration-200">Sobre nós</Link></li>
                <li><Link to="/contato" className="text-sm text-white/60 hover:text-white transition-colors duration-200">Contato</Link></li>
                <li><Link to="/recursos/growth-marketing" className="text-sm text-white/60 hover:text-white transition-colors duration-200">Growth Marketing</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-5">
                Contato
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://wa.me/5511951783049"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                  >
                    WhatsApp
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/figueiramarketing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                  >
                    Instagram
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contato@figueiramarketing.com.br"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    contato@figueiramarketing.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
            © 2026 Figueira Marketing. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/40 font-mono">
              Propósito e Performance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}