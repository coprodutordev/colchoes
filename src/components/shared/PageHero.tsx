"use client";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imagePath?: string;
}

export function PageHero({ title, subtitle, imagePath }: PageHeroProps) {
  return (
    <section className="relative w-full h-[40vh] min-h-[300px] md:min-h-[400px] flex flex-col justify-center overflow-hidden bg-remvita-dark text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-remvita-blue/10 blur-[100px]" />
        {imagePath && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30" 
            style={{ backgroundImage: `url(${imagePath})` }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,25,47,1),transparent)] z-10" />
      </div>

      <div className="container relative z-20 px-4 md:px-6 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 animate-hero">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-hero-delayed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
