"use client";

import { useEffect, useRef } from "react";

export function HowItWorks() {
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
    <section className="w-full py-24 bg-background">
      <div className="container px-4 md:px-6" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Como Funciona a <span className="text-remvita-blue">Tecnologia REMVITA</span></h2>
          <p className="text-muted-foreground mt-4 text-lg">Três camadas de inteligência para o seu sono perfeito.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Linha vertical central para Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2 rounded-full overflow-hidden">
            <div className="w-full h-full bg-remvita-blue origin-top animate-[scale-y_1.5s_ease-in-out_forwards]" style={{ transform: "scaleY(0)" }} />
          </div>

          <div className="space-y-12 md:space-y-24">
            {[
              { title: "Densidade Progressiva", desc: "Múltiplas camadas de espuma com densidades diferentes alinham sua coluna naturalmente, suportando pesos variados.", align: "left" as const },
              { title: "Infravermelho Longo", desc: "Pastilhas embutidas que emitem ondas idênticas aos raios solares do início da manhã, ajudando na recuperação celular.", align: "right" as const },
              { title: "Magnetoterapia", desc: "Imãs de ferrite de barion criam um campo magnético que melhora a oxigenação do sangue enquanto você descansa.", align: "left" as const }
            ].map((step, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between ${step.align === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="md:w-1/2" />
                <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-remvita-blue border-4 border-background z-10 md:-translate-x-1/2 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-remvita-blue/30">
                  {i + 1}
                </div>
                <div
                  className={`animate-on-scroll md:w-1/2 ${step.align === "left" ? "from-left md:pr-16 text-left md:text-right" : "from-right md:pl-16 text-left"} pl-12 md:pl-0 mt-2 md:mt-0`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
