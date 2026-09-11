import React from "react";
import { motion } from "framer-motion";
import GreenCTA from "@/components/ui/GreenCTA";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-foreground text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} />
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[1.05] mb-6">
            Vamos encontrar o próximo{" "}
            <span className="text-primary">gargalo do seu crescimento</span>?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            Conte onde sua operação está travando. A gente analisa o cenário e mostra o que faz sentido corrigir primeiro.
          </p>
          <GreenCTA text="Falar com a Figueira" size="lg" />
          <p className="mt-6 text-xs font-mono text-white/30 uppercase tracking-wider">
            Conversa inicial sem compromisso
          </p>
        </motion.div>
      </div>
    </section>
  );
}