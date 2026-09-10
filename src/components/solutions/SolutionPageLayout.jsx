import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";
import { Link } from "react-router-dom";

function ArrowBack() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <path d="M14.5 5.5 8 12l6.5 6.5M8.5 12H21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SolutionGlyph({ index = 0 }) {
  const variants = [
    <path key="a" d="M5 19V8m0 0h7m-7 0 5-5m3 16V5m0 7h6" />,
    <path key="b" d="M4 16c3-8 8-8 16 0M4 8c3 8 8 8 16 0" />,
    <path key="c" d="M5 5h14v14H5zM9 9h6v6H9z" />,
    <path key="d" d="M4 18 10 6l4 8 2-4 4 8M4 18h16" />,
    <path key="e" d="M7 4v16M17 4v16M4 8h16M4 16h16" />,
    <path key="f" d="M4 12h5l3-7 3 14 3-7h2" />,
  ];

  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        {variants[index % variants.length]}
      </g>
    </svg>
  );
}

function BrandPattern() {
  return (
    <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full opacity-[0.055]" preserveAspectRatio="none" aria-hidden="true">
      <path d="M10 112C28 91 33 74 34 46M34 46c10 11 18 16 31 21M34 46C43 35 50 27 61 18M65 67c9-12 17-18 30-24M65 67c7 13 15 22 29 31" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="34" cy="46" r="2.2" fill="currentColor" />
      <circle cx="65" cy="67" r="2.2" fill="currentColor" />
    </svg>
  );
}

export default function SolutionPageLayout({
  badge,
  title,
  titleAccent,
  description,
  heroImage,
  features,
  featureIcon: _FeatureIcon,
  children,
}) {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.25 });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const imageScale = useTransform(heroProgress, [0, 1], [1.03, reduceMotion ? 1.03 : 1.11]);
  const copyY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 38]);

  return (
    <div className="bg-white text-foreground">
      <motion.div
        className="fixed left-0 right-0 top-0 h-[3px] bg-[#C4191F] origin-left z-[80]"
        style={{ scaleX: progress }}
      />

      <section ref={heroRef} className="relative min-h-[82vh] pt-28 lg:pt-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,17,.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,17,.045)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute top-0 right-0 w-[38vw] h-full bg-[#111111] hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/#solucoes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-10"
          >
            <ArrowBack />
            Todas as soluções
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-16 items-center pb-20 lg:pb-28">
            <motion.div style={{ y: copyY }} className="relative z-10">
              <div className="flex items-center gap-3 mb-7">
                <span className="h-px w-10 bg-[#C4191F]" />
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#C4191F]">
                  {badge}
                </span>
              </div>

              <h1 className="font-display font-black text-[clamp(3rem,7vw,6.8rem)] tracking-[-0.055em] leading-[0.87] max-w-4xl mb-8">
                {title}{" "}
                <span className="text-[#C4191F]">{titleAccent}</span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-9">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <GreenCTA text="Conversar sobre esta solução" size="lg" />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Figueira Marketing · Propósito & Performance
                </span>
              </div>
            </motion.div>

            <div className="relative lg:min-h-[560px] flex items-center">
              <div className="absolute -left-6 top-10 hidden lg:block font-mono text-[10px] text-white/40 [writing-mode:vertical-rl] tracking-[0.24em] uppercase z-20">
                Estratégia · execução · integração
              </div>

              <motion.div
                className="relative w-full overflow-hidden rounded-[28px] shadow-2xl shadow-black/20 border border-white/10"
                style={{ y: imageY }}
              >
                <motion.img
                  src={heroImage}
                  alt={`${title} ${titleAccent}`}
                  className="w-full h-[430px] lg:h-[560px] object-cover"
                  style={{ scale: imageScale }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between text-white">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 mb-2">Solução Figueira</div>
                    <div className="font-display font-black text-2xl tracking-tight">{badge}</div>
                  </div>
                  <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white">
                    <SolutionGlyph index={2} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {features && features.length > 0 && (
        <section className="py-24 lg:py-36 bg-[#F6F4F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[.72fr_1.28fr] gap-14 lg:gap-20 items-start">
              <AnimatedSection className="lg:sticky lg:top-28">
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-5">Como atuamos</div>
                <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.95] mb-6">
                  Nada de pacote genérico.
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  A solução é montada em torno do gargalo, da operação e do que precisa ser entregue de verdade.
                </p>
              </AnimatedSection>

              <div className="border-t border-foreground/15">
                {features.map((feature, i) => (
                  <AnimatedSection key={i} delay={i * 0.05}>
                    <motion.article
                      whileHover={reduceMotion ? undefined : { x: 8 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-[52px_1fr] sm:grid-cols-[76px_1fr] gap-4 sm:gap-7 py-8 lg:py-10 border-b border-foreground/15 group"
                    >
                      <div className="pt-1">
                        <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center text-[#C4191F] group-hover:bg-[#C4191F] group-hover:text-white group-hover:border-[#C4191F] transition-colors duration-300">
                          <SolutionGlyph index={i} />
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase mb-2">
                          0{i + 1}
                        </div>
                        <h3 className="font-display font-black text-2xl lg:text-3xl tracking-tight mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">
                          {feature.description}
                        </p>
                      </div>
                    </motion.article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {children}

      <section className="relative py-24 lg:py-32 bg-[#111111] text-white overflow-hidden">
        <BrandPattern />
        <div className="absolute top-0 left-0 w-24 h-1 bg-[#C4191F]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C4191F] mb-5">Próximo passo</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-[-0.045em] leading-[0.94] mb-5">
                Seu problema não precisa caber em um pacote pronto.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                Conte o que precisa funcionar. A Figueira desenha a solução, conecta as peças e define com você o que vale construir primeiro.
              </p>
            </div>
            <GreenCTA text="Falar com a Figueira" size="lg" />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}