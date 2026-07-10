"use client";

import { useEffect, useRef } from "react";

interface TechCard {
  title: string;
  description: string;
  accent?: "dark" | "blue" | "teal";
  span?: string;
}

const TECH_CARDS: TechCard[] = [
  {
    title: "Magnetoterapia",
    description:
      "Imãs distribuídos estrategicamente que formam um campo magnético constante. Auxilia no alívio de tensões e na renovação da energia corporal.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Infravermelho Longo",
    description:
      "Ondas de energia idênticas às do sol da manhã, que penetram na pele e ativam a microcirculação sanguínea.",
    accent: "dark",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Tecido Premium",
    description: "Tratamento antialérgico, antiácaro e antifungo integrado.",
    accent: "blue",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Densidade Progressiva",
    description: "Múltiplas camadas de espuma inteligente para alinhamento perfeito da coluna.",
    accent: "teal",
    span: "md:col-span-1 md:row-span-1",
  },
];

const cardBaseClass =
  "rounded-3xl p-8 shadow-sm border border-border flex flex-col justify-end relative overflow-hidden transition-transform duration-200 hover:-translate-y-1.5";

const cardVariantClass: Record<string, string> = {
  default: "bg-white",
  dark: "bg-remvita-dark text-white border-transparent shadow-lg",
  blue: "bg-remvita-blue/5 border-remvita-blue/20",
  teal: "bg-remvita-teal/5 border-remvita-teal/20",
};

const titleVariantClass: Record<string, string> = {
  default: "text-foreground",
  dark: "text-white",
  blue: "text-remvita-blue",
  teal: "text-remvita-teal",
};

const descVariantClass: Record<string, string> = {
  default: "text-muted-foreground",
  dark: "text-gray-300",
  blue: "text-muted-foreground",
  teal: "text-muted-foreground",
};

export function Technologies() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".animate-on-scroll").forEach((child) => {
            child.classList.add("is-visible");
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Tecnologias dos Colchões REMVITA"
      className="w-full py-24 bg-remvita-light/30"
    >
      <div className="container px-4 md:px-6" ref={ref}>
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-remvita-dark mb-4">
            Construído com{" "}
            <span className="text-remvita-blue">Inovação.</span>
          </h2>
          <p className="text-gray-600 max-w-[600px] mx-auto text-lg">
            O resultado de anos de pesquisa. Conheça as tecnologias que compõem
            o sistema de descanso mais avançado do mercado.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px] stagger-children"
          role="list"
          aria-label="Lista de tecnologias"
        >
          {TECH_CARDS.map((card) => {
            const variant = card.accent || "default";
            return (
              <div
                key={card.title}
                role="listitem"
                className={`animate-on-scroll ${card.span || ""} ${cardBaseClass} ${cardVariantClass[variant]}`}
              >
                {/* Accent glow */}
                {variant === "default" && (
                  <div
                    className="absolute top-0 right-0 w-64 h-64 bg-remvita-blue/5 rounded-full blur-3xl"
                    aria-hidden="true"
                  />
                )}
                {variant === "dark" && (
                  <div
                    className="absolute top-0 right-0 w-32 h-32 bg-remvita-teal/20 rounded-full blur-2xl"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10">
                  <h3
                    className={`text-xl font-bold mb-2 ${titleVariantClass[variant]}`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${descVariantClass[variant]}`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
