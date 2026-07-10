"use client";

import Link from "next/link";
import Image from "next/image";

const products = [
  {
    name: "REMVITA Premium",
    slug: "remvita-premium",
    desc: "A combinação perfeita de conforto e tecnologia para a maioria dos biotipos.",
    price: "R$ 4.990",
    image: "/produto-premium-3d.jpg",
  },
  {
    name: "REMVITA Master",
    slug: "remvita-master",
    desc: "Vibromassagem incluída. O ápice do relaxamento noturno.",
    price: "R$ 6.990",
    image: "/produto-master-3d.jpg",
  }
];

export function ProductShowcase() {
  return (
    <section className="w-full py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">A Linha de <span className="text-remvita-blue">Colchões</span></h2>
          <p className="text-muted-foreground">Escolha o modelo ideal para a sua necessidade.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <div
              key={product.slug}
              className="bg-card border border-border/40 rounded-3xl p-8 flex flex-col justify-between shadow-sm transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-md"
            >
              <div className="h-[250px] w-full bg-muted rounded-2xl mb-8 overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">{product.name}</h3>
                <p className="text-muted-foreground mb-6">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-remvita-blue">A partir de {product.price}</span>
                  <Link href={`/produtos/${product.slug}`} className="bg-remvita-blue text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-remvita-blue/90 transition-colors">
                    Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
