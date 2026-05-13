import { Container, Eyebrow } from "@/components/primitives";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { CtaBanner } from "@/components/content/CtaBanner";
import { RelatedArticles } from "@/components/content/RelatedArticles";
import { AuthorByline } from "@/components/content/AuthorByline";
import { JsonLd } from "@/components/content/JsonLd";
import { articleSchema } from "@/lib/jsonld";
import type { Page } from "@/lib/content";

type Props = { page: Page; crumbs: { name: string; href: string }[] };

/**
 * ArticleTemplate — long-form journal article layout.
 *
 *   • Mobile/tablet: single column. Body flows under the header.
 *   • lg+: 12-col grid, body col 1-8, sticky aside col 9-12 with TOC + CTA.
 *
 * Aside intentionally rendered as a quiet 1-up card stack so it never
 * competes with the article body.
 */
export function ArticleTemplate({ page, crumbs }: Props) {
  return (
    <article>
      <section className="bg-paper-off border-b border-rule">
        <Container className="py-section">
          <Breadcrumbs items={crumbs} />

          <header className="mt-8 lg:mt-10 max-w-prose">
            {page.category && (
              <Eyebrow>{categoryLabel(page.category)} · § Article</Eyebrow>
            )}
            <h1 className="mt-5 font-serif font-medium text-[clamp(2.25rem,4vw,4rem)] leading-[1] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine [text-wrap:balance]">
              {page.title}
            </h1>
            <p className="mt-6 font-serif italic text-d-s leading-[1.4] text-ink-soft">
              {page.description}
            </p>
            <div className="mt-6">
              <AuthorByline readingTime={page.readingTime} />
            </div>
          </header>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12 lg:gap-16">
            <Prose>{page.body}</Prose>

            <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
              <div className="surface-wash px-6 py-7">
                <Eyebrow>On this page</Eyebrow>
                <p className="mt-4 font-serif italic text-t-l leading-[1.5] text-ink-soft">
                  Scroll the article to follow Dr. Basmajian&rsquo;s answer in
                  full, or jump to the conclusion below.
                </p>
              </div>
              <div className="surface px-6 py-7">
                <div className="font-mono text-eyebrow tracking-eyebrow uppercase text-spine">
                  Ready for an evaluation?
                </div>
                <p className="mt-3 font-serif text-d-s leading-[1.2] tracking-[-0.01em]">
                  <em className="em-spine">Schedule</em> a confidential
                  consultation.
                </p>
                <a
                  href="/consult"
                  className="mt-5 inline-flex items-center gap-2 bg-action text-action-ink px-5 py-3 font-mono text-[12px] tracking-wide uppercase font-bold hover:bg-action-deep hover:text-paper transition-colors"
                >
                  Schedule consultation →
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <RelatedArticles currentSlug={page.slug} category={page.category} />
      <CtaBanner />

      <JsonLd data={articleSchema(page)} />
    </article>
  );
}

function categoryLabel(slug: string): string {
  return slug
    .split("-")
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join(" ");
}
