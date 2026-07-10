import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Navegação de migalha de pão"
      className={`w-full py-4 border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-40 hidden md:block ${className}`}
    >
      <ol
        className="container px-4 md:px-6 flex items-center space-x-2 text-sm text-muted-foreground list-none m-0 p-0"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Home */}
        <li
          itemScope
          itemProp="itemListElement"
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <Link
            href="/"
            className="hover:text-remvita-blue transition-colors flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue rounded-sm"
            aria-label="Página inicial"
            itemProp="item"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only" itemProp="name">
              Início
            </span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {/* Dynamic items */}
        {items.map((item, index) => (
          <li
            key={`breadcrumb-${item.label}`}
            itemScope
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
            className="flex items-center space-x-2"
          >
            <ChevronRight
              className="w-4 h-4 flex-shrink-0"
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-remvita-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-remvita-blue rounded-sm"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span
                className="text-foreground font-medium"
                aria-current="page"
                itemProp="name"
              >
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
