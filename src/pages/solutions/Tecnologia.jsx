import React from "react";
import SolutionPageLayout from "@/components/solutions/SolutionPageLayout";
import { Code, Blocks, Webhook, Server, Shield, Cpu } from "lucide-react";

const features = [
  { title: "Integrações e APIs", description: "Conexão entre plataformas de marketing, vendas, atendimento e gestão via APIs REST e webhooks." },
  { title: "Desenvolvimento Sob Medida", description: "Sistemas, ferramentas internas e soluções customizadas para necessidades específicas do seu negócio." },
  { title: "Infraestrutura Digital", description: "Setup e gestão de servidores, domínios, CDN, SSL e infraestrutura de hospedagem com alta disponibilidade." },
  { title: "Stack de Marketing", description: "Seleção, implementação e integração das melhores ferramentas para cada etapa do funil de crescimento." },
  { title: "Segurança e Compliance", description: "LGPD, cookies, consentimento e boas práticas de segurança de dados implementadas em toda a operação." },
  { title: "Manutenção e Suporte", description: "Monitoramento contínuo, atualizações, correções e suporte técnico para manter tudo funcionando." },
];

export default function Tecnologia() {
  return (
    <SolutionPageLayout
      badge="Tecnologia"
      title="Tecnologia e sistemas que"
      titleAccent="conectam tudo"
      description="Construímos a infraestrutura digital que sustenta sua operação de crescimento. APIs, integrações, sistemas e ferramentas sob medida para escalar com segurança."
      heroImage="https://media.base44.com/images/public/6a35d36fce43a708f39a8f2e/006baa01b_generated_dc8d1e19.png"
      features={features}
      featureIcon={Code}
    />
  );
}