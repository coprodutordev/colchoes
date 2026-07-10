import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Nossa Tecnologia | REMVITA",
  description: "Entenda o funcionamento da magnetoterapia, infravermelho longo e densidade progressiva dos colchões REMVITA.",
};

export default function TecnologiaPage() {
  return (
    <>
      <PageHero 
        title="Engenharia do Sono" 
        subtitle="A ciência por trás do alinhamento perfeito e recuperação celular."
      />
      <Breadcrumbs items={[{ label: "Nossa Tecnologia" }]} />
      
      <section className="py-24 container px-4 md:px-6 max-w-4xl flex-1">
        <h2 className="text-3xl font-bold mb-8 text-remvita-dark text-center">Camadas Inteligentes</h2>
        <div className="space-y-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border">
            <h3 className="text-2xl font-bold text-remvita-blue mb-4">1. Rabatan Massageador</h3>
            <p className="text-muted-foreground">
              A camada superior possui um perfil vulcanizado que imita uma massagem Do-in. Reduz a transpiração e facilita a respiração da pele durante a noite, prevenindo alergias.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border">
            <h3 className="text-2xl font-bold text-remvita-teal mb-4">2. Densidade Progressiva</h3>
            <p className="text-muted-foreground">
              Várias camadas de poliuretano com densidades diferentes. Isso garante que as áreas mais pesadas do corpo (quadril e ombros) afundem o necessário, enquanto a lombar recebe suporte firme.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
