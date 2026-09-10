import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const groups = [
  {
    label: "Marketing & Growth",
    items: [
      ["Estratégia e Growth", "/solucoes/estrategia-growth"],
      ["Gestão de Marketing", "/solucoes/gestao"],
      ["Mídia Paga", "/solucoes/midia-paga"],
      ["Criativos", "/solucoes/criativos"],
      ["Sites e Landing Pages", "/solucoes/paginas-conversao"],
    ],
  },
  {
    label: "Vendas & Automação",
    items: [
      ["CRM e Processo Comercial", "/solucoes/crm"],
      ["Automações", "/solucoes/automacoes"],
      ["Agentes de IA", "/solucoes/agentes-ia"],
      ["Retenção e Sucesso", "/solucoes/retencao"],
    ],
  },
  {
    label: "Tecnologia & Dados",
    items: [
      ["Dados e BI", "/solucoes/dados-bi"],
      ["Tecnologia e Sistemas", "/solucoes/tecnologia"],
      ["Soluções sob medida", "/solucoes/solucoes-sob-medida"],
    ],
  },
];

function Chevron({ open }) {
  return (
    <svg viewBox="0 0 20 20" className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="m5.5 7.5 4.5 4.5 4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <span className="relative block w-6 h-4" aria-hidden="true">
      <span className={`absolute left-0 top-0 w-6 h-px bg-current transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
      <span className={`absolute left-0 top-[7px] w-6 h-px bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
      <span className={`absolute left-0 top-[14px] w-6 h-px bg-current transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/88 backdrop-blur-xl border-b border-black/10 py-2" : "bg-white/70 backdrop-blur-md py-4"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-14 flex items-center justify-between">
            <Link to="/" className="relative z-10 shrink-0">
              <img
                src="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/60481a698_figueira-marketing-logo.png"
                alt="Figueira Marketing"
                className="h-11 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground group">
                Home
                <span className="absolute left-4 right-4 bottom-0 h-px bg-[#C4191F] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground flex items-center gap-1.5">
                  Soluções
                  <Chevron open={solutionsOpen} />
                </button>

                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                    >
                      <div className="w-[760px] bg-[#111111] text-white rounded-[22px] shadow-2xl shadow-black/25 border border-white/10 p-7 overflow-hidden relative">
                        <div className="absolute left-0 top-0 w-28 h-1 bg-[#C4191F]" />
                        <div className="grid grid-cols-3 gap-8">
                          {groups.map((group) => (
                            <div key={group.label}>
                              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C4191F] mb-4">{group.label}</div>
                              <div className="space-y-1">
                                {group.items.map(([name, path]) => (
                                  <Link
                                    key={path}
                                    to={path}
                                    className="group/item block py-2.5 border-b border-white/10 text-sm text-white/65 hover:text-white transition-colors"
                                  >
                                    <span className="flex items-center justify-between gap-3">
                                      {name}
                                      <span className="text-[#C4191F] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all">↗</span>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
                          <p className="text-xs text-white/40 max-w-md">Uma necessidade específica ou uma operação inteira. Começamos pelo gargalo e conectamos as peças que fazem sentido.</p>
                          <Link to="/contato" className="text-sm font-semibold text-[#C4191F] hover:text-white transition-colors">Falar com a Figueira →</Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/cases" className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground group">
                Cases
                <span className="absolute left-4 right-4 bottom-0 h-px bg-[#C4191F] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
              <Link to="/sobre" className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground group">
                Sobre
                <span className="absolute left-4 right-4 bottom-0 h-px bg-[#C4191F] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </nav>

            <div className="hidden lg:flex items-center">
              <Link to="/contato" className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-full bg-[#111111] text-white hover:bg-[#C4191F] transition-colors duration-300">
                Fale com a Figueira
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-3 text-foreground"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#111111] text-white pt-24 overflow-y-auto lg:hidden"
          >
            <div className="px-6 pb-12">
              <Link to="/" className="block py-4 text-2xl font-display font-black border-b border-white/10">Home</Link>
              <Link to="/cases" className="block py-4 text-2xl font-display font-black border-b border-white/10">Cases</Link>
              <Link to="/sobre" className="block py-4 text-2xl font-display font-black border-b border-white/10">Sobre</Link>

              <div className="pt-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C4191F] mb-5">Soluções</div>
                {groups.map((group) => (
                  <div key={group.label} className="mb-8">
                    <div className="text-xs uppercase tracking-wider text-white/35 mb-2">{group.label}</div>
                    {group.items.map(([name, path]) => (
                      <Link key={path} to={path} className="block py-3 text-lg text-white/75 border-b border-white/10">
                        {name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <Link to="/contato" className="block w-full text-center px-6 py-4 rounded-full bg-[#C4191F] text-white font-semibold mt-6">
                Falar com a Figueira
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}