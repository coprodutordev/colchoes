import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sobre a REMVITA | A Revolução do Sono",
  description: "Conheça a história e a missão da REMVITA em levar saúde e qualidade de vida através da tecnologia do sono.",
};

export default function SobrePage() {
  return (
    <>
      <PageHero 
        title="Nossa Missão" 
        subtitle="Transformar a saúde dos brasileiros oferecendo a mais alta tecnologia em recuperação celular durante o sono."
      />
      <Breadcrumbs items={[{ label: "Sobre a REMVITA" }]} />
      
      <section className="py-24 container px-4 md:px-6 flex-1">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-remvita-dark">
              Nascemos para <span className="text-remvita-blue">curar noites mal dormidas.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                A REMVITA não é apenas uma fabricante de colchões. Somos uma empresa de tecnologia voltada para a saúde preventiva.
              </p>
              <p>
                Entendemos que o sono é o pilar mais importante da recuperação humana. Com base em estudos médicos e engenharia ergonômica, desenvolvemos produtos que alinham a coluna perfeitamente.
              </p>
            </div>
          </div>
          <div className="bg-muted h-[500px] rounded-3xl overflow-hidden shadow-lg border border-border relative">
            <Image src="/institucional-fabrica.jpg" alt="Fábrica e laboratório REMVITA" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>
    </>
  );
}
