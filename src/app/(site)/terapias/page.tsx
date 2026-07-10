import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terapias REMVITA",
  description: "Magnetoterapia e Infravermelho Longo atuando na saúde do seu corpo.",
};

export default function TerapiasPage() {
  return (
    <>
      <PageHero 
        title="Tratamento Diário" 
        subtitle="Terapeutica avançada aplicada diretamente no seu descanso."
      />
      <Breadcrumbs items={[{ label: "Terapias" }]} />
      
      <section className="py-24 bg-muted/30 flex-1">
        <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-card border border-border/40 rounded-3xl h-[400px] overflow-hidden shadow-sm relative">
            <Image src="/ilustracao-magnetoterapia.jpg" alt="Ilustração da magnetoterapia no corpo humano" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-remvita-teal">Magnetoterapia</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              A falta de contato com o campo magnético da Terra (devido a calçados e concreto) gera a Síndrome da Deficiência Magnética.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-remvita-teal mr-3"></span> Melhora o fluxo sanguíneo</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-remvita-teal mr-3"></span> Acelera a renovação celular</li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-remvita-teal mr-3"></span> Efeito anti-inflamatório natural</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
