import React from "react";
import { motion } from "framer-motion";
import GreenCTA from "@/components/ui/GreenCTA";
import { ArrowDown } from "lucide-react";

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 lg:left-16 top-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                Propósito e Performance
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[0.95] mb-6"
            >
              Marketing que vira sistema.{" "}
              <span className="text-primary">Sistema que vira resultado.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10"
            >
              Estratégia, mídia, sites, CRM, automações, dados e tecnologia conectados para transformar marketing e vendas em uma operação mais clara, mensurável e eficiente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <GreenCTA text="Quero conversar sobre meu negócio" size="lg" />
              <a 
                href="#solucoes" 
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold rounded-lg border border-border text-foreground hover:bg-secondary transition-colors duration-200"
              >
                Conhecer as soluções
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-6 text-sm text-muted-foreground"
            >
              Primeira conversa sem compromisso. Direto ao ponto, sem roteiro de venda.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10">
              <img
                src={heroImage}
                alt="Dashboard de Growth Marketing da Figueira"
                className="w-full h-auto rounded-2xl"
                width={800}
                height={450}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent rounded-2xl" />
            </div>

          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}