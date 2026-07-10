"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(to);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setCount(from);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            setCount(Math.floor(progress * (to - from) + from));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString("pt-BR")}</span>;
}

export function StatsIndicators() {
  return (
    <section className="w-full py-12 md:py-20 bg-background border-b border-border">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center pt-8 md:pt-0"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-remvita-blue mb-2 tabular-nums">
              +<Counter from={0} to={15000} duration={2.5} />
            </h3>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Clientes Satisfeitos</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center pt-8 md:pt-0"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-remvita-blue mb-2 tabular-nums">
              <Counter from={0} to={15} duration={2} />+
            </h3>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Anos de Mercado</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center pt-8 md:pt-0"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-remvita-blue mb-2 flex items-center tabular-nums">
              <Counter from={0} to={4} duration={1} />.<Counter from={0} to={9} duration={1.5} />
            </h3>
            <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Avaliação Média</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
