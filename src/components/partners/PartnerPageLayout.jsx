import React from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";

export default function PartnerPageLayout({
  eyebrow,
  title,
  accent,
  description,
  logo,
  logoAlt,
  introTitle,
  introText,
  capabilities = [],
  useCases = [],
  process = [],
  closingTitle,
  closingText,
}) {
  return (
    <div className="bg-white">
      <section className="pt-28 lg:pt-32 pb-16 lg:pb-20 bg-[#F7F6F2] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/stack-digital" className="inline-flex text-sm text-muted-foreground hover:text-foreground mb-10">Stack Digital</Link>
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-5">{eyebrow}</div>
              <h1 className="font-display font-black text-[clamp(2.7rem,5vw,5.15rem)] tracking-[-0.055em] leading-[0.9] mb-7 max-w-4xl">
                {title} <span className="text-[#C4191F]">{accent}</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">{description}</p>
              <GreenCTA text="Falar sobre esta solução" size="lg" />
            </div>
            <div className="bg-white border border-border rounded-[26px] min-h-[330px] flex items-center justify-center p-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.045]" style={{backgroundImage:"linear-gradient(rgba(17,17,17,.22) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,17,.22) 1px,transparent 1px)",backgroundSize:"34px 34px"}} />
              {logo ? <img src={logo} alt={logoAlt} className="relative max-h-28 max-w-[78%] object-contain" /> : <div className="relative font-display font-black text-5xl">{logoAlt}</div>}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[.82fr_1.18fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Parceria aplicada</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">{introTitle}</h2>
            </div>
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">{introText}</p>
              <div className="border-t border-border">
                {capabilities.map((item, i) => (
                  <div key={item.title} className="grid grid-cols-[42px_1fr] gap-5 py-6 border-b border-border">
                    <span className="font-mono text-[10px] text-[#C4191F] pt-1">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display font-black text-xl mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-4xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Onde faz sentido</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">Aplicações que saem do PowerPoint e entram na operação.</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {useCases.map((item, i) => (
              <div key={item} className="bg-[#111111] p-7 min-h-[190px]">
                <div className="font-mono text-[10px] text-[#C4191F] mb-10">{String(i + 1).padStart(2, "0")}</div>
                <p className="text-white/75 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {process.length > 0 && (
        <section className="py-20 lg:py-28 bg-[#F7F6F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12 max-w-4xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C4191F] mb-4">Como implementamos</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95]">Ferramenta boa precisa entrar com processo, regra e continuidade.</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
              {process.map((item, i) => (
                <div key={item.title} className="bg-white p-7 min-h-[230px]">
                  <div className="font-mono text-[10px] text-[#C4191F] mb-10">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-display font-black text-xl mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 lg:py-24 bg-[#C4191F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 mb-4">Próximo passo</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.045em] leading-[0.95] mb-4">{closingTitle}</h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl">{closingText}</p>
            </div>
            <GreenCTA text="Falar com a Figueira" size="lg" />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
