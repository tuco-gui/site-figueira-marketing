import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

const certifications = [
  {
    name: "Google Partner Premier",
    description: "Certificação oficial de especialistas em Google Ads",
  },
  {
    name: "Meta Business Partner",
    description: "Parceiro certificado Meta Business Suite",
  },
  {
    name: "CRM Partner — a confirmar",
    description: "Parceiro de implantação certificado",
  },
];

export default function Certifications() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          label="PARCEIROS OFICIAIS"
          title={<>Certificações que validam o <span className="text-[#C4191F]">método</span></>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center p-8 border-2 border-border rounded-2xl hover:border-[#C4191F]/30 transition-colors duration-200 h-full">
                <div className="w-16 h-16 rounded-full border-2 border-border flex items-center justify-center mb-4">
                  <span className="font-display font-black text-xl text-muted-foreground">{cert.name.charAt(0)}</span>
                </div>
                <h3 className="font-heading font-bold text-sm mb-2">{cert.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{cert.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}