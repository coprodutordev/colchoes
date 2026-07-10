import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Nossa História | REMVITA",
  description: "A trajetória da REMVITA na construção do melhor colchão terapêutico do mercado.",
};

export default function HistoriaPage() {
  return (
    <>
      <PageHero 
        title="A Linha do Tempo REMVITA" 
        subtitle="Anos de pesquisa médica e engenharia dedicada ao bem-estar."
      />
      <Breadcrumbs items={[{ label: "Nossa História" }]} />
      
      <section className="py-24 container px-4 md:px-6 max-w-3xl flex-1">
        <div className="space-y-16 border-l-2 border-border pl-8 relative">
          
          <div className="relative">
            <div className="absolute w-4 h-4 rounded-full bg-remvita-blue -left-[41px] top-2 border-4 border-background" />
            <span className="text-sm font-bold text-remvita-teal">2005</span>
            <h3 className="text-2xl font-bold mt-1 mb-3">O Início de Tudo</h3>
            <p className="text-muted-foreground">A REMVITA foi fundada com a missão de trazer as tecnologias de descanso japonesas para o Brasil.</p>
          </div>

          <div className="relative">
            <div className="absolute w-4 h-4 rounded-full bg-remvita-blue -left-[41px] top-2 border-4 border-background" />
            <span className="text-sm font-bold text-remvita-teal">2012</span>
            <h3 className="text-2xl font-bold mt-1 mb-3">Expansão Tecnológica</h3>
            <p className="text-muted-foreground">Incorporação do infravermelho longo (Biocerâmica) e magnetoterapia em 100% da linha de produção.</p>
          </div>

          <div className="relative">
            <div className="absolute w-4 h-4 rounded-full bg-remvita-blue -left-[41px] top-2 border-4 border-background" />
            <span className="text-sm font-bold text-remvita-teal">Hoje</span>
            <h3 className="text-2xl font-bold mt-1 mb-3">Líder em Qualidade</h3>
            <p className="text-muted-foreground">Milhares de clientes transformados e um nível de satisfação de 98%.</p>
          </div>

        </div>
      </section>
    </>
  );
}
