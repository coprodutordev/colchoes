import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActiveProducts } from "@/lib/queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Catálogo de Colchões Terapêuticos | REMVITA",
  description: "Conheça nossa linha completa de colchões terapêuticos e descubra qual modelo é o ideal para o seu biotipo.",
};

export default async function ProdutosPage() {
  const products = await getActiveProducts();

  return (
    <>
      <PageHero 
        title="Nossos Colchões" 
        subtitle="O ápice da engenharia do sono. Escolha o modelo que vai transformar suas noites."
      />
      <Breadcrumbs items={[{ label: "Colchões" }]} />
      
      <section className="py-24 container px-4 md:px-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/produtos/${product.slug}`} className="group block">
              <div className="bg-muted h-[300px] rounded-3xl mb-6 overflow-hidden relative border border-border group-hover:shadow-xl group-hover:border-remvita-blue/50 transition-all">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">{product.name}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-remvita-blue transition-colors">{product.name}</h3>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                {product.price != null && (
                  <span className="text-lg font-bold text-remvita-blue">{formatCurrency(product.price)}</span>
                )}
                <div className="flex items-center text-remvita-teal font-medium">
                  Detalhes <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
