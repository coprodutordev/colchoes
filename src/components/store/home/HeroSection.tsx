"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/config";

export function HeroSection() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section
      aria-label="Hero REMVITA - Colchões Terapêuticos"
      className="relative w-full min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-remvita-dark text-white pt-20"
    >
      {/* Ambient background glows - decorative */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-remvita-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-remvita-teal/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(10,25,47,0.8))] z-10" />
      </div>

      <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-6"
        >
          {/* Badge indicator */}
          <div
            role="status"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium backdrop-blur-md mb-4"
          >
            <span
              className="flex h-2 w-2 rounded-full bg-remvita-teal mr-2 animate-pulse"
              aria-hidden="true"
            />
            A Tecnologia do Sono Perfeito
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Eleve sua{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-remvita-light to-remvita-teal">
              Saúde
            </span>{" "}
            enquanto dorme.
          </h1>

          <p className="mx-auto max-w-[700px] text-lg md:text-xl text-gray-300">
            Descubra o colchão terapêutico premium projetado com inteligência
            ergonômica, infravermelho longo e magnetoterapia para transformar
            sua qualidade de vida.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/produtos"
              className="inline-flex h-12 items-center justify-center rounded-full bg-remvita-blue px-8 text-sm font-semibold text-white shadow-lg shadow-remvita-blue/30 transition-all hover:bg-remvita-blue/90 hover:shadow-remvita-blue/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue focus-visible:ring-offset-2 focus-visible:ring-offset-remvita-dark"
              aria-label="Conhecer todos os modelos de colchões terapêuticos REMVITA"
            >
              Conheça nossos colchões
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Falar com um consultor no WhatsApp"
            >
              <MessageCircle
                className="mr-2 h-4 w-4 text-remvita-teal"
                aria-hidden="true"
              />
              Falar no WhatsApp
            </Link>
          </div>

          {/* Social Proof mini */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-8 text-sm text-gray-400"
          >
            <span>✓ 15 anos de garantia</span>
            <span>✓ +5.000 famílias atendidas</span>
            <span>✓ 98% de satisfação</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Straight divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
    </section>
  );
}
