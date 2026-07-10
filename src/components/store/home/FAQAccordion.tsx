"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FaqItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-24 bg-background">
      <div className="container px-4 md:px-6 max-w-3xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={faq.id} className="border-b border-border py-4">
              <button
                className="w-full flex items-center justify-between text-left font-semibold text-lg"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                {faq.question}
                {openIndex === i ? <Minus className="text-remvita-teal shrink-0" /> : <Plus className="text-remvita-blue shrink-0" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
