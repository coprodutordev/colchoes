import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.remvitacolchoes.com.br";

  const routes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    "/sobre",
    "/tecnologia",
    "/terapias",
    "/historia",
    "/produtos",
    "/blog",
    "/consultores",
  ].map((route) => ({
    url: `${baseUrl}${route === baseUrl ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === baseUrl ? 1 : 0.8,
  }));

  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("slug, updated_at")
    .eq("is_active", true);

  const productRoutes = (products ?? []).map((p) => ({
    url: `${baseUrl}/produtos/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("status", "published");

  const postRoutes = (posts ?? []).map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...routes,
    ...productRoutes,
    ...postRoutes,
    ...(productRoutes.length === 0 ? getFallbackProductRoutes(baseUrl) : []),
    ...(postRoutes.length === 0 ? getFallbackPostRoutes(baseUrl) : []),
  ];
}

function getFallbackProductRoutes(baseUrl: string) {
  return [
    { slug: "remvita-premium" },
    { slug: "remvita-master" },
  ].map((p) => ({
    url: `${baseUrl}/produtos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
}

function getFallbackPostRoutes(baseUrl: string) {
  return [
    { slug: "magnetoterapia-e-dores-na-lombar" },
  ].map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
}
