import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { JsonLd, organizationSchema, localBusinessSchema } from "@/components/shared/JsonLd";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-16">
      <Header />
      {children}
      <Footer />
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={localBusinessSchema} />
    </main>
  );
}
