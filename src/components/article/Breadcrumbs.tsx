import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${siteConfig.url}${c.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-slate-500"
      >
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-indigo-300">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-white"
                >
                  {crumb.label}
                </Link>
              )}
              {!isLast && <ChevronRight size={12} className="text-slate-700" />}
            </span>
          );
        })}
      </nav>
    </>
  );
}
