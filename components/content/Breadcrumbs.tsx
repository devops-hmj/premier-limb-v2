import Link from "next/link";
import { breadcrumb } from "@/lib/jsonld";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; href: string };

/**
 * Breadcrumbs — semantic <nav> with mono-uppercase trail and a
 * BreadcrumbList JSON-LD slot. Last item is marked aria-current="page"
 * and rendered as plain text (no link).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[10.5px] tracking-eyebrow uppercase text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-spine">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-spine transition-colors">
                  {c.name}
                </Link>
              )}
              {!isLast && (
                <span aria-hidden className="text-rule">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumb(items.map((c) => ({ name: c.name, url: c.href })))} />
    </nav>
  );
}
