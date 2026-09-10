import React from "react";
import MetricCard from "@/components/ui/MetricCard";

const metrics = [
  { value: "A definir", label: "Clientes Atendidos" },
  { value: "A definir", label: "Gerenciados em Mídia" },
  { value: "A definir", label: "ROAS Médio" },
  { value: "A definir", label: "Retenção de Clientes" },
];

export default function MetricsBar() {
  return (
    <section className="py-16 lg:py-20 border-y border-border bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              value={metric.value}
              label={metric.label}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}