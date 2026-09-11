import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import GreenCTA from "@/components/ui/GreenCTA";

function SignalMark() {
  return (
    <svg viewBox="0 0 68 68" className="w-16 h-16" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 53C24 43 28 31 28 15" />
        <path d="M28 27c9 4 14 10 18 18" />
        <path d="M28 31c-7 4-11 9-14 15" />
        <path d="M46 45c4-8 8-12 14-15" />
      </g>
      <circle cx="28" cy="27" r="2.8" fill="currentColor" />
      <circle cx="46" cy="45" r="2.8" fill="currentColor" />
    </svg>
  );
}

export default function HeroSection({ heroImage }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, reduce ? 1.02 : 1.09]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 34]);

  return (
    <section ref={ref} className="relative min-h-[84vh] lg:min-h-[88vh] flex items-center overflow-hidden pt-24 lg:pt-28 pb-12 lg:pb-16 bg-[#F7F6F2]">
      <div className="absolute inset-0 opacity-[0.055]" style={{
        backgroundImage: "linear-gradient(rgba(17,17,17,.16) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,17,.16) 1px,transparent 1px)",
        backgroundSize: "52px 52px"
      }} />

      <div className="absolute top-0 right-0 w-[34vw] h-full bg-[#111111] hidden lg:block" />
      <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#C4191F]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-14 lg:gap-16 items-center">
          <motion.div style={{ y: copyY }} className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#C4191F]"><SignalMark /></span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-1">Figueira Marketing</div>
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Propósito e Performance</div>
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-[clamp(2.65rem,5.25vw,5.35rem)] tracking-[-0.055em] leading-[0.9] max-w-4xl mb-7"
            >
              O crescimento não depende de fazer tudo.
              <span className="block text-[#C4191F] mt-2">Depende de agir no gargalo certo.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-9"
            >
              A Figueira conecta marketing, vendas, tecnologia e dados para identificar o ponto que mais limita o resultado e transformar essa prioridade em execução mensurável.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <GreenCTA text="Quero identificar o gargalo" size="lg" />
              <a
                href="#solucoes"
                className="inline-flex min-h-[56px] items-center justify-center text-center px-8 py-4 text-base font-semibold rounded-lg border border-foreground/15 text-foreground hover:bg-white transition-colors"
              >
                Conhecer as soluções
              </a>
            </motion.div>

            <p className="mt-6 text-sm text-muted-foreground">
              Primeiro entendemos o contexto. Depois definimos o que vale atacar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-2xl shadow-black/25"
            >
              <motion.img
                src={heroImage}
                alt="Operação de marketing, vendas e dados"
                className="w-full h-[590px] object-cover"
                style={{ scale: imageScale }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute left-7 bottom-7 right-7 flex justify-between items-end text-white">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/55 mb-2">Do sinal à decisão</div>
                  <div className="font-display font-black text-2xl max-w-sm">Marketing, vendas e tecnologia no mesmo raciocínio.</div>
                </div>
                <div className="font-mono text-xs text-[#4BDF6A]">FIGUEIRA / 01</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}