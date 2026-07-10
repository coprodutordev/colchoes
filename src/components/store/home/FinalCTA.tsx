import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";

export function FinalCTA() {
  const whatsappUrl = getWhatsAppUrl("Olá! Quero transformar meu sono. Gostaria de mais informações.");

  return (
    <section className="w-full py-24 bg-remvita-blue text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px]" />
      </div>
      <div className="container px-4 md:px-6 relative z-10 text-center">
        <p className="text-xl font-bold text-white/80 mb-4">Compre com 30% de desconto</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Pronto para transformar sua vida?</h2>
        <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
          Dê o primeiro passo para noites de sono revigorantes. Fale com nossos consultores e encontre o modelo perfeito.
        </p>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-remvita-blue shadow-lg shadow-black/10 transition-transform hover:scale-105 focus-visible:outline-none"
        >
          Falar com Consultor
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
