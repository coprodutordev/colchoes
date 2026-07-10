import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import Link from "next/link";
import { Search, Clock, Calendar } from "lucide-react";
import { getPublishedPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Blog da REMVITA | Especialistas em Sono",
  description: "Dicas, estudos e informações sobre a ciência do sono, ortopedia e saúde preventiva.",
};

const CATEGORIES = ["Todos", "Ciência do Sono", "Terapias", "Dicas de Compra", "Saúde e Bem-estar"];

export default async function BlogHubPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero 
        title="Journal REMVITA" 
        subtitle="A ciência do descanso profundo."
      />
      <Breadcrumbs items={[{ label: "Blog" }]} />
      
      <section className="py-16 container px-4 md:px-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat, i) => (
              <button 
                key={i} 
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${i === 0 ? 'bg-remvita-blue text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar artigos..." 
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-background focus:outline-none focus:border-remvita-blue focus:ring-1 focus:ring-remvita-blue"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
              <div className="relative h-[250px] bg-muted rounded-3xl overflow-hidden mb-4 border border-border">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 transition-transform duration-500 group-hover:scale-105">
                  <span className="text-gray-400 text-sm">{post.title}</span>
                </div>
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-remvita-blue shadow-sm">
                  Blog
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-remvita-teal transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center text-xs text-muted-foreground mt-auto">
                <Calendar className="w-3 h-3 mr-1" /> <span className="mr-4">{new Date(post.published_at ?? post.created_at).toLocaleDateString("pt-BR")}</span>
                <Clock className="w-3 h-3 mr-1" /> <span>{post.read_time_minutes ?? 3} min</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
