"use client";

import Image from "next/image";

export function ProductCharacteristics() {
  return (
    <section className="py-24 bg-remvita-dark text-white overflow-hidden relative">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Camadas de Bem-Estar</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cada milímetro do colchão REMVITA foi projetado com um propósito médico e ergonômico.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden animate-on-scroll from-left">
            <Image
              src="/colchao-camadas-3d.jpg"
              alt="Colchão REMVITA com camadas expandidas"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-remvita-teal mb-2">1. Rabatan</h3>
              <p className="text-gray-400">Espuma vulcanizada que simula uma massagem relaxante, facilitando a respiração da pele.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-remvita-light mb-2">2. Infravermelho Longo e Imãs</h3>
              <p className="text-gray-400">Pastilhas embutidas na superfície que atuam no sistema circulatório e alívio de dores.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">3. Caixa Ortopédica Inteligente</h3>
              <p className="text-gray-400">A combinação de espumas de diferentes densidades garante que a coluna permaneça perfeitamente reta.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
