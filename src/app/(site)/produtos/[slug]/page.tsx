import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductGallery } from "@/components/store/product/ProductGallery";
import { ProductInfo } from "@/components/store/product/ProductInfo";
import { TechnicalTable } from "@/components/store/product/TechnicalTable";
import { ProductCharacteristics } from "@/components/store/product/ProductCharacteristics";
import { ProductReviews } from "@/components/store/product/ProductReviews";
import { getProductBySlug } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: `${product.name} | REMVITA`,
    description: product.description ?? "",
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  const infoProps = {
    name: product.name,
    rating: 4.9,
    reviews: 128,
  };

  return (
    <>
      <Breadcrumbs items={[
        { label: "Colchões", href: "/produtos" },
        { label: product.name }
      ]} />
      
      <section className="py-12 container px-4 md:px-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery />
          <ProductInfo product={infoProps} />
        </div>
      </section>

      <ProductCharacteristics />
      <TechnicalTable />
      <ProductReviews />
    </>
  );
}
