import { Container, Eyebrow } from "@/components/primitives";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { CtaBanner } from "@/components/content/CtaBanner";
import { JsonLd } from "@/components/content/JsonLd";
import { ArticleCard } from "@/components/content/ArticleCard";
import { medicalProcedureSchema } from "@/lib/jsonld";
import { getPagesByKind, type Page } from "@/lib/content";

type Props = { page: Page; crumbs: { name: string; href: string }[] };

/**
 * ServiceOverviewTemplate — currently used by /your-surgery only.
 *
 * Structure:
 *   • Page header with eyebrow + answer-first deck
 *   • Prose body (the scraped overview) — full container width, no aside
 *   • Index of sub-pages (the 8 surgery FAQ pages)
 *   • CtaBanner
 */
export function ServiceOverviewTemplate({ page, crumbs }: Props) {
  const subPages = getPagesByKind("service-sub");

  return (
    <article>
      <section className="bg-paper-off border-b border-rule">
        <Container className="py-section">
          <Breadcrumbs items={crumbs} />

          <header className="mt-8 max-w-prose">
            <Eyebrow>Your Surgery · § Overview</Eyebrow>
            <h1 className="mt-5 font-serif font-medium text-[clamp(2.5rem,5vw,5rem)] leading-[0.96] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine [text-wrap:balance]">
              {page.title}
            </h1>
            <p className="mt-6 font-serif italic text-d-s leading-[1.4] text-ink-soft">
              {page.description}
            </p>
          </header>

          <div className="mt-12 max-w-prose">
            <Prose>{page.body}</Prose>
          </div>
        </Container>
      </section>

      {subPages.length > 0 && (
        <section className="bg-cream border-b border-rule">
          <Container className="py-section">
            <Eyebrow>Common Questions · § Sub-procedures</Eyebrow>
            <h2 className="mt-5 font-serif font-medium text-[clamp(1.75rem,3vw,3rem)] leading-[1.04] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine [text-wrap:balance]">
              The procedure, <em>answered.</em>
            </h2>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {subPages.map((sp) => (
                <li key={sp.route} className="h-full">
                  <ArticleCard article={sp} variant="compact" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaBanner />
      <JsonLd data={medicalProcedureSchema()} />
    </article>
  );
}
