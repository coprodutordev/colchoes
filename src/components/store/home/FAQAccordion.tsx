"use client";

import { useState } from "react";
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
              <div className={`faq-content ${openIndex === i ? "open" : ""}`}>
                <div>
                  <p className="pt-4 text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
