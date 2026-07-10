import Image from "next/image";

const clientImages = [
  { src: "/cliente-1.jpg", alt: "Cliente REMVITA - resultado de melhora na qualidade do sono" },
  { src: "/cliente-2.jpg", alt: "Cliente REMVITA - relato de alívio de dores nas costas" },
  { src: "/cliente-3.jpg", alt: "Cliente REMVITA - depoimento sobre magnetoterapia" },
  { src: "/cliente-4.jpg", alt: "Cliente REMVITA - satisfação com o colchão terapêutico" },
];

export function ResultsGallery() {
  return (
    <section className="w-full py-24 bg-muted/50">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Resultados que transformam vidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clientImages.map((img, i) => (
            <div key={i} className="relative h-48 md:h-64 bg-background rounded-2xl border border-border overflow-hidden shadow-sm">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
