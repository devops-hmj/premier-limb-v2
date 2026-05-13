import Link from "next/link";
import { Container, Eyebrow } from "@/components/primitives";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { CtaBanner } from "@/components/content/CtaBanner";
import { JsonLd } from "@/components/content/JsonLd";
import { faqPageSchema } from "@/lib/jsonld";
import { getPagesByKind, type Page } from "@/lib/content";

type Props = { page: Page; crumbs: { name: string; href: string }[] };

/**
 * ServiceSubTemplate — short FAQ-style answer pages under /your-surgery/{slug}.
 *
 * Answer-first treatment:
 *   • h1 is the question
 *   • deck is the first paragraph of the body (LLM-readable TL;DR)
 *   • Body renders the markdown verbatim (the same first paragraph is
 *     skipped via Prose's `skipFirstParagraph` to avoid duplication)
 *
 * Sticky right aside on lg+ lists the other surgery sub-pages so visitors
 * can hop between answers without going back to /your-surgery.
 */
export function ServiceSubTemplate({ page, crumbs }: Props) {
  const siblings = getPagesByKind("service-sub").filter((p) => p.slug !== page.slug);

  return (
    <article>
      <section className="bg-paper-off border-b border-rule">
        <Container className="py-section">
          <Breadcrumbs items={crumbs} />

          <header className="mt-8 max-w-prose">
            <Eyebrow>Your Surgery · Question</Eyebrow>
            <h1 className="mt-5 font-serif font-medium text-[clamp(2.25rem,4vw,4rem)] leading-[1.02] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine [text-wrap:balance]">
              {page.title}
            </h1>
            <p className="mt-6 font-serif italic text-d-s leading-[1.4] text-ink-soft">
              {page.description}
            </p>
          </header>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-12 lg:gap-14">
            <Prose skipFirstParagraph>{page.body}</Prose>

            <aside className="lg:sticky lg:top-24 lg:self-start surface px-6 py-7">
              <Eyebrow>Other questions</Eyebrow>
              <ul className="mt-5 flex flex-col">
                {siblings.map((s) => (
                  <li
                    key={s.route}
                    className="py-3 border-b border-rule last:border-b-0"
                  >
                    <Link
                      href={s.route}
                      className="font-serif text-[18px] leading-[1.25] tracking-[-0.005em] hover:text-spine transition-colors"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBanner
        headline={
          <>
            More questions? <em>Talk to Dr. Basmajian directly.</em>
          </>
        }
      />

      <JsonLd
        data={faqPageSchema([{ q: page.title, a: page.description }])}
      />
    </article>
  );
}
