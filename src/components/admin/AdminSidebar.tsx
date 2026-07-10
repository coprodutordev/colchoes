"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Image as ImageIcon,
  LogOut,
  ChevronRight,
  X,
  Menu,
  BarChart3,
  Megaphone,
  HelpCircle,
  Star,
  UserCog,
  Building2,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Visão Geral",
    items: [
      { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
      { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="w-4 h-4" /> },
    ],
  },
  {
    title: "Catálogo & Vendas",
    items: [
      { label: "Produtos", href: "/admin/produtos", icon: <ShoppingBag className="w-4 h-4" /> },
      { label: "Categorias", href: "/admin/categorias", icon: <FileText className="w-4 h-4" /> },
      { label: "Depoimentos", href: "/admin/depoimentos", icon: <Star className="w-4 h-4" /> },
      { label: "Leads", href: "/admin/leads", icon: <MessageSquare className="w-4 h-4" /> },
    ],
  },
  {
    title: "Conteúdo",
    items: [
      { label: "Blog", href: "/admin/blog", icon: <FileText className="w-4 h-4" /> },
      { label: "FAQ", href: "/admin/faq", icon: <HelpCircle className="w-4 h-4" /> },
      { label: "Banners", href: "/admin/banners", icon: <Megaphone className="w-4 h-4" /> },
      { label: "Mídias", href: "/admin/midias", icon: <ImageIcon className="w-4 h-4" /> },
    ],
  },
  {
    title: "Pessoas",
    items: [
      { label: "Usuários", href: "/admin/usuarios", icon: <Users className="w-4 h-4" /> },
      { label: "Clientes", href: "/admin/clientes", icon: <UserCog className="w-4 h-4" /> },
      { label: "Parceiros", href: "/admin/parceiros", icon: <Building2 className="w-4 h-4" /> },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Configurações", href: "/admin/configuracoes", icon: <Settings className="w-4 h-4" /> },
    ],
  },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const isActive = useCallback(
    (href: string) =>
      href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(href),
    [pathname]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border flex-shrink-0">
        <Link
          href="/admin"
          aria-label="REMVITA Admin - Ir para Dashboard"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue rounded-md"
        >
          <span className="text-xl font-bold text-remvita-blue tracking-tight">
            REMVITA
          </span>
          <span className="text-muted-foreground text-sm font-medium ml-1">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Navegação do painel administrativo"
        className="flex-1 overflow-y-auto py-6 px-3 space-y-6"
      >
        {NAV_GROUPS.map((group) => (
          <div key={group.title} role="group" aria-label={group.title}>
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-3">
              {group.title}
            </h3>
            <ul className="space-y-0.5" role="list">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center px-3 py-2 rounded-xl text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue ${
                        active
                          ? "bg-remvita-blue text-white font-semibold shadow-md shadow-remvita-blue/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span className="mr-2.5 flex-shrink-0" aria-hidden="true">
                        {item.icon}
                      </span>
                      {item.label}
                      {active && (
                        <ChevronRight
                          className="ml-auto w-3.5 h-3.5 opacity-70"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer: User actions */}
      <div className="p-3 border-t border-border flex-shrink-0">
        <Link
          href="/"
          className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors mb-1"
          aria-label="Ver o site público"
        >
          <LogOut className="w-4 h-4 mr-2.5 rotate-180" aria-hidden="true" />
          Ver site
        </Link>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Sair do painel administrativo"
          >
            <LogOut className="w-4 h-4 mr-2.5" aria-hidden="true" />
            Sair do painel
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="w-60 bg-background border-r border-border hidden md:flex flex-col h-full shadow-sm"
        aria-label="Sidebar administrativo"
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile: Toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-background border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu de navegação"
        aria-expanded={mobileOpen}
        aria-controls="mobile-admin-menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile: Drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer panel */}
          <aside
            id="mobile-admin-menu"
            className="md:hidden fixed top-0 left-0 z-50 w-72 h-full bg-background shadow-xl border-r border-border"
            role="dialog"
            aria-modal="true"
            aria-label="Menu administrativo mobile"
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue"
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </>
      )}
    </>
  );
}
