import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SolutionPageLayout({
  badge,
  title,
  titleAccent,
  description,
  heroImage,
  features,
  featureIcon: FeatureIcon,
  children,
}) {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/#solucoes"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Todas as soluções
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider mb-5">
                {badge}
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05] mb-6">
                {title}{" "}
                <span className="text-primary">{titleAccent}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {description}
              </p>
              <GreenCTA text="Fale com um especialista" size="lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10 border border-border">
                <img
                  src={heroImage}
                  alt={`${title} ${titleAccent}`}
                  className="w-full h-auto"
                  width={700}
                  height={400}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      {features && features.length > 0 && (
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
                O que fazemos
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 h-full"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                      {FeatureIcon && <FeatureIcon className="w-5 h-5 text-primary" />}
                    </div>
                    <h3 className="font-heading font-bold text-base mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom content */}
      {children}

      {/* Bottom CTA */}
      <section className="py-16 lg:py-24 bg-foreground text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-4">
              Pronto para transformar sua operação?
            </h2>
            <p className="text-white/60 mb-8">
              Agende um diagnóstico gratuito e descubra como podemos acelerar seus resultados.
            </p>
            <GreenCTA text="Agendar Diagnóstico" size="lg" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}