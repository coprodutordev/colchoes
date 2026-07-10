"use client";

import { useEffect, useRef } from "react";
import { Activity, Moon, HeartPulse } from "lucide-react";

const problems = [
  {
    icon: <Activity className="w-8 h-8 text-remvita-teal" />,
    title: "Dores nas Costas",
    desc: "Alinhamento incorreto da coluna durante a noite causa tensões musculares e dores crônicas.",
  },
  {
    icon: <Moon className="w-8 h-8 text-remvita-teal" />,
    title: "Insônia e Agitação",
    desc: "Colchões inadequados aumentam os pontos de pressão, fazendo você se virar a noite toda.",
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-remvita-teal" />,
    title: "Má Circulação",
    desc: "Falta de suporte adequado dificulta a circulação sanguínea periférica enquanto você dorme.",
  }
];

export function ProblemsSolved() {
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-24 bg-muted/30">
      <div className="container px-4 md:px-6" ref={ref}>
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Dormir mal não é o <span className="text-remvita-teal">normal.</span>
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
            Um terço da sua vida é passado na cama. Se você sofre com algum destes problemas, seu colchão atual pode ser o culpado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
          {problems.map((prob, i) => (
            <div
              key={i}
              className="animate-on-scroll bg-card border border-border/40 rounded-2xl p-8 hover:shadow-md transition-shadow"
            >
              <div className="mb-6 p-4 bg-remvita-gelo/40 rounded-full inline-block">
                {prob.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{prob.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {prob.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
