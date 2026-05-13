import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/primitives";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { CtaBanner } from "@/components/content/CtaBanner";
import { JsonLd } from "@/components/content/JsonLd";
import { ArticleCard } from "@/components/content/ArticleCard";
import { collectionPageSchema } from "@/lib/jsonld";
import { getPagesByKind, type Page } from "@/lib/content";

type Props = {
  title: ReactNode;
  /** Plain-text version of title for SEO / JSON-LD. */
  schemaName: string;
  deck?: ReactNode;
  eyebrow: ReactNode;
  articles: Page[];
  crumbs: { name: string; href: string }[];
  /** When true (Blog index), shows the category filter row. */
  showCategoryNav?: boolean;
  /** Currently active category slug for highlighting in the filter row. */
  activeCategory?: string;
};

/**
 * IndexTemplate — used by /blog, /category/[slug], /author/[slug].
 *
 *   • Featured row on /blog (first article larger)
 *   • Category chip nav (optional)
 *   • 3-col article grid (lg) → 1-col on mobile (avoids orphan)
 */
export function IndexTemplate({
  title,
  schemaName,
  deck,
  eyebrow,
  articles,
  crumbs,
  showCategoryNav = false,
  activeCategory,
}: Props) {
  const categories = getPagesByKind("category");
  const [featured, ...rest] = articles;

  return (
    <article>
      <section className="bg-paper-off border-b border-rule">
        <Container className="py-section">
          <Breadcrumbs items={crumbs} />

          <header className="mt-8 max-w-prose">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif font-medium text-[clamp(2.5rem,5vw,5rem)] leading-[0.96] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine [text-wrap:balance]">
              {title}
            </h1>
            {deck && (
              <p className="mt-6 font-serif italic text-d-s leading-[1.4] text-ink-soft">
                {deck}
              </p>
            )}
          </header>

          {showCategoryNav && (
            <nav
              aria-label="Filter by category"
              className="mt-10 -mx-2 px-2 flex gap-2 overflow-x-auto font-mono text-[11px] tracking-wider uppercase"
            >
              <Link
                href="/blog"
                className={chipClass(!activeCategory)}
              >
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.route}
                  href={c.route}
                  className={chipClass(c.slug === activeCategory)}
                >
                  {categoryLabel(c.slug)}
                </Link>
              ))}
            </nav>
          )}

          {/* Featured row (only when there's a featured + rest) */}
          {featured && rest.length > 0 && (
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-5">
              <ArticleCard article={featured} variant="featured" />
              <div className="grid grid-cols-1 gap-5">
                {rest.slice(0, 2).map((a) => (
                  <ArticleCard key={a.route} article={a} variant="default" />
                ))}
              </div>
            </div>
          )}

          {/* Remaining grid */}
          {rest.length > 2 && (
            <ul className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
              {rest.slice(2).map((a) => (
                <li key={a.route} className="h-full">
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          )}

          {/* If only one or two articles total */}
          {(!featured || rest.length === 0) && featured && (
            <div className="mt-10">
              <ArticleCard article={featured} variant="featured" />
            </div>
          )}

          {articles.length === 0 && (
            <p className="mt-10 font-serif italic text-d-s text-ink-soft">
              No articles available in this section yet.
            </p>
          )}
        </Container>
      </section>

      <CtaBanner />
      <JsonLd data={collectionPageSchema(schemaName, articles)} />
    </article>
  );
}

function chipClass(active: boolean): string {
  return active
    ? "bg-spine text-paper px-3 py-2 whitespace-nowrap"
    : "border border-ink text-ink hover:bg-spine hover:text-paper hover:border-spine px-3 py-2 whitespace-nowrap transition-colors";
}

function categoryLabel(slug: string): string {
  return slug
    .split("-")
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join(" ");
}
