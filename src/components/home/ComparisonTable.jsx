import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GreenCTA from "@/components/ui/GreenCTA";

const rows = [
  { label: "Estratégia e Growth", values: [true, true, true, true] },
  { label: "Mídia e Aquisição", values: [true, true, false, true] },
  { label: "Criativos de Performance", values: [true, true, true, true] },
  { label: "Páginas e Conversão", values: [true, true, true, false] },
  { label: "CRM e Vendas", values: [true, true, true, false] },
  { label: "Automações Inteligentes", values: [true, true, true, false] },
  { label: "Dados e Dashboards", values: [true, true, true, false] },
  { label: "Tecnologia e Sistemas", values: [false, true, true, false] },
  { label: "Retenção e Sucesso", values: [true, true, false, true] },
];

const columns = ["Time Compartilhado", "Time Dedicado", "Projetos Pontuais", "Figueira Performance"];

const Check = () => (
  <span className="text-accent font-bold text-lg">✓</span>
);
const Dash = () => (
  <span className="text-muted-foreground/30 text-lg">·</span>
);

export default function ComparisonTable() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          label="PARA SUA EMPRESA"
          title={<>Escolha as soluções e o modelo certo para o <span className="text-[#C4191F]">seu momento</span></>}
        />

        <AnimatedSection>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-3 font-heading font-bold text-sm">Soluções</th>
                  {columns.map((col, i) => (
                    <th key={i} className="text-center py-4 px-3 font-heading font-bold text-xs sm:text-sm whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-border hover:bg-white/50 transition-colors">
                    <td className="py-4 px-3 text-sm font-medium">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="text-center py-4 px-3">
                        {v ? <Check /> : <Dash />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-12 flex flex-col items-start">
          <GreenCTA text="Quero entender qual modelo é o meu" size="lg" />
          <p className="mt-4 text-sm text-muted-foreground">
            A conversa inicial ajuda a definir o formato que faz sentido.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}