import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Clock, Calendar, User, Share2, ExternalLink } from "lucide-react";
import { getPostBySlug } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: `${post.title} | Blog REMVITA`,
    description: post.excerpt ?? "",
    openGraph: { type: "article", authors: ["REMVITA"] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <>
      <Breadcrumbs items={[
        { label: "Blog", href: "/blog" },
        { label: "Artigo" }
      ]} />
      
      <article className="py-12 lg:py-24 flex-1">
        <header className="container px-4 md:px-6 max-w-4xl text-center mb-12">
          <div className="inline-block bg-remvita-light text-remvita-blue px-3 py-1 rounded-full text-sm font-bold mb-6">
            Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center"><User className="w-4 h-4 mr-2" /> {post.author?.name ?? "REMVITA"}</div>
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(post.published_at ?? post.created_at).toLocaleDateString("pt-BR")}</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {post.read_time_minutes ?? 3} min</div>
          </div>
        </header>

        <div className="container px-4 md:px-6 max-w-5xl mb-16">
          <div className="w-full aspect-[21/9] bg-muted rounded-3xl overflow-hidden shadow-lg flex items-center justify-center border border-border">
            <span className="text-muted-foreground">{post.title}</span>
          </div>
        </div>

        <div className="container px-4 md:px-6 max-w-5xl flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-16 flex-shrink-0 order-2 lg:order-1">
            <div className="sticky top-32 flex flex-row lg:flex-col gap-4 items-center">
              <span className="text-xs font-bold text-muted-foreground uppercase rotate-0 lg:-rotate-90 lg:mb-8 tracking-widest">Share</span>
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-remvita-blue hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /></button>
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-remvita-blue hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /></button>
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-remvita-blue hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /></button>
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-remvita-teal hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
            </div>
          </aside>

          <div className="flex-grow max-w-3xl prose prose-lg prose-blue dark:prose-invert order-1 lg:order-2">
            <p className="lead text-xl text-muted-foreground mb-8 font-medium">
              {post.excerpt}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.content ?? "<p>Conteúdo em breve.</p>" }} />
          </div>
        </div>

        {post.author && (
          <div className="container px-4 md:px-6 max-w-3xl mt-16 pt-16 border-t border-border">
            <div className="flex items-center p-8 bg-muted/50 rounded-3xl">
              <div className="w-16 h-16 bg-gray-300 rounded-full mr-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-lg">{post.author.name}</h4>
                <p className="text-muted-foreground text-sm mb-2">{post.author.bio ?? "Autor REMVITA"}</p>
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
