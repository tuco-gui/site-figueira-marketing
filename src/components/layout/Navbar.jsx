import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const solutions = [
  { name: "Estratégia e Growth", path: "/solucoes/estrategia-growth" },
  { name: "Gestão", path: "/solucoes/gestao" },
  { name: "Mídia Paga", path: "/solucoes/midia-paga" },
  { name: "Criativos", path: "/solucoes/criativos" },
  { name: "Sites e Landing Pages", path: "/solucoes/paginas-conversao" },
  { name: "CRM e Processo Comercial", path: "/solucoes/crm" },
  { name: "Automações", path: "/solucoes/automacoes" },
  { name: "Dados e BI", path: "/solucoes/dados-bi" },
  { name: "Tecnologia e Sistemas", path: "/solucoes/tecnologia" },
  { name: "Retenção e Sucesso do Cliente", path: "/solucoes/retencao" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-border shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img
                src="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/60481a698_figueira-marketing-logo.png"
                alt="Figueira Marketing"
                className="h-12 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200">
                Home
              </Link>
              
              <div className="relative group">
                <button 
                  className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center gap-1"
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  Soluções
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setSolutionsOpen(true)}
                      onMouseLeave={() => setSolutionsOpen(false)}
                      className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl border border-border shadow-xl p-2"
                    >
                      {solutions.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary rounded-lg transition-colors duration-150"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/sobre" className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200">
                Sobre
              </Link>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/contato"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity duration-200"
              >
                Fale com um especialista
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white pt-20 overflow-y-auto lg:hidden"
          >
            <div className="px-6 py-8 space-y-1">
              <Link to="/" className="block px-4 py-3">
                <img
                  src="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/60481a698_figueira-marketing-logo.png"
                  alt="Figueira Marketing"
                  className="h-10 w-auto"
                />
              </Link>
              <div className="px-4 py-2 text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                Soluções
              </div>
              {solutions.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-3 text-base text-foreground/80 hover:text-foreground hover:bg-secondary rounded-lg pl-8"
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/sobre" className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-secondary rounded-lg">
                Sobre
              </Link>
              <div className="pt-6 px-4">
                <Link
                  to="/contato"
                  className="block w-full text-center px-6 py-3.5 text-base font-semibold rounded-lg bg-accent text-accent-foreground"
                >
                  Fale com um especialista
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}