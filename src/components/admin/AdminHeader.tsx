"use client";

import Link from "next/link";
import { Bell, Search, Sun, Moon, ExternalLink } from "lucide-react";
import { useState } from "react";

export function AdminHeader() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof document === "undefined") return false;
    const stored = localStorage.getItem("remvita-theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      return true;
    }
    return document.documentElement.classList.contains("dark");
  });

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("remvita-theme", next ? "dark" : "light");
  };

  return (
    <header
      className="h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 flex-shrink-0 shadow-sm"
      role="banner"
    >
      {/* Left: Global Search */}
      <div className="hidden md:flex relative w-80 lg:w-96">
        <label htmlFor="admin-search" className="sr-only">
          Buscar no painel
        </label>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <input
          id="admin-search"
          type="search"
          placeholder="Buscar produtos, clientes, leads..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-muted/30 focus:bg-background focus:outline-none focus:border-remvita-blue focus:ring-1 focus:ring-remvita-blue text-sm placeholder:text-muted-foreground transition-colors"
          aria-label="Busca global do painel administrativo"
        />
        <kbd
          className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border"
          aria-label="Atalho: Control K"
        >
          ⌘K
        </kbd>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* View Site */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue"
          aria-label="Abrir site público em nova aba"
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          Ver site
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue"
          aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          aria-pressed={darkMode}
        >
          {darkMode ? (
            <Sun className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Moon className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="relative w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue"
          aria-label="Notificações (3 não lidas)"
          aria-haspopup="true"
        >
          <Bell className="w-4 h-4" aria-hidden="true" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"
            aria-hidden="true"
          />
        </button>

        {/* Avatar / Profile */}
        <button
          className="w-9 h-9 rounded-full bg-gradient-to-br from-remvita-blue to-remvita-teal text-white flex items-center justify-center font-semibold text-sm shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue focus-visible:ring-offset-2"
          aria-label="Menu de perfil do usuário"
          aria-haspopup="menu"
        >
          RS
        </button>
      </div>
    </header>
  );
}
