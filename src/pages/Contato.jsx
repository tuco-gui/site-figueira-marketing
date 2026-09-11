import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function Contato() {
  const [submitted, setSubmitted] = useState(false);
  const [revenue, setRevenue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      "Olá! Vim pelo site da Figueira Marketing.",
      "",
      `Nome: ${data.get("name") || ""}`,
      `E-mail: ${data.get("email") || ""}`,
      data.get("phone") ? `Telefone: ${data.get("phone")}` : null,
      data.get("company") ? `Empresa: ${data.get("company")}` : null,
      revenue ? `Faturamento: ${revenue}` : null,
      data.get("message") ? `Desafio: ${data.get("message")}` : null,
    ].filter(Boolean);

    const url = `https://wa.me/5511951783049?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="pt-24">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider mb-6">
                Contato
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight leading-[0.95] mb-6">
                Vamos falar sobre o que precisa <span className="text-primary">mudar</span>?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Conte um pouco sobre o seu negócio e o desafio atual. A primeira conversa serve para entender o cenário e ver se a Figueira pode ajudar.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">E-mail</p>
                    <p className="text-sm text-muted-foreground">contato@figueiramarketing.com.br</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">+55 (11) 95178-3049</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Localização</p>
                    <p className="text-sm text-muted-foreground">Atendimento em todo o Brasil</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 rounded-2xl border border-border bg-secondary/30">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3">Continue pelo WhatsApp</h3>
                  <p className="text-muted-foreground">
                    Abrimos a conversa com os dados preenchidos. Revise a mensagem e toque em enviar para concluir o contato.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-border bg-white shadow-sm space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" name="name" placeholder="Seu nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" name="phone" placeholder="(11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" name="company" placeholder="Nome da empresa" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="revenue">Faturamento mensal (opcional)</Label>
                    <Select onValueChange={setRevenue}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma faixa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ate-100k">Até R$100k</SelectItem>
                        <SelectItem value="100-500k">R$100k a R$500k</SelectItem>
                        <SelectItem value="500k-1m">R$500k a R$1M</SelectItem>
                        <SelectItem value="1m-5m">R$1M a R$5M</SelectItem>
                        <SelectItem value="5m+">Acima de R$5M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Como podemos ajudar?</Label>
                    <Textarea id="message" name="message" placeholder="Conte sobre seu desafio de crescimento" className="h-28" />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:opacity-90 transition-opacity py-3 text-base font-semibold"
                  >
                    Continuar no WhatsApp
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Primeira conversa sem compromisso
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}