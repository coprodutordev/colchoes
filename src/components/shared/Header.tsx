"use client";

import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/config";

const NAV_ITEMS = [
  { label: "Produtos", href: "/produtos" },
  { label: "Tecnologia", href: "/tecnologia" },
  { label: "Terapias", href: "/terapias" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const whatsappUrl = getWhatsAppUrl();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container px-4 md:px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold tracking-tight text-foreground">
            REM<span className="text-remvita-teal">VITA</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-remvita-teal text-white text-sm font-semibold hover:bg-remvita-teal/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Fale Conosco
          </Link>
        </div>

        <button
          className="md:hidden w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40 bg-background overflow-hidden"
          >
            <nav className="container px-4 md:px-6 py-4 flex flex-col gap-1" aria-label="Navegação mobile">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-remvita-teal text-white text-sm font-semibold hover:bg-remvita-teal/90 transition-colors"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                Fale Conosco
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
