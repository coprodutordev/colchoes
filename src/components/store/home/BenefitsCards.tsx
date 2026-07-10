import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const benefits = [
  "Prevenção de problemas na coluna",
  "Melhora da circulação sanguínea",
  "Redução do estresse e fadiga",
  "Sono profundo (Fase REM) otimizado",
  "Alívio de dores musculares",
  "Energia renovada ao acordar"
];

export function BenefitsCards() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mais que um colchão, <br/>um <span className="text-remvita-teal">tratamento diário.</span></h2>
            <p className="text-muted-foreground text-lg mb-8">
              A cada noite, seu corpo passará por um processo de recuperação celular e relaxamento muscular profundo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-remvita-teal mr-3 mt-0.5 shrink-0" />
                  <span className="font-medium text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden bg-muted">
            <Image
              src="/benefits-acordando-feliz.jpg"
              alt="Pessoa acordando feliz e descansada após uma noite de sono REMVITA"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
