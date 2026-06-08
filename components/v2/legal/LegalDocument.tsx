import Link from "next/link";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { Prose } from "@/components/content/Prose";
import { JsonLd } from "@/components/content/JsonLd";
import { getHeadings, ORIGIN } from "@/lib/content";
import { breadcrumb } from "@/lib/jsonld";

/**
 * LegalDocument — shared editorial shell for long-form legal / policy pages
 * (Privacy Policy, Terms of Service, and any future Notice of Privacy
 * Practices or Accessibility statement).
 *
 * Mirrors the article template ([app/[slug]/page.tsx]) so legal pages wear
 * the same chrome as the rest of the site: NavV2 + FooterV2, the editorial
 * masthead header, and a sticky "On This Page" table of contents beside a
 * single content column.
 *
 * The `body` is authored as MARKDOWN and rendered through <Prose>, which maps
 * every element into the design system's typography. The TOC is derived from
 * the same markdown via getHeadings() (ATX `##` or Setext H2), and the anchor
 * ids it produces are byte-for-byte identical to the ids <Prose> assigns to
 * each <h2> — so every TOC link resolves. Author top-level sections as `##`.
 *
 * Authoring contract for callers (the per-page files):
 *   - One `##` heading per top-level section (these populate the TOC).
 *   - `###` for sub-sections (styled, not in the TOC).
 *   - `>` blockquote renders as a spine-washed callout box — use it for the
 *     carrier-mandated SMS opt-out notice and similar highlighted clauses.
 *   - GFM tables render inside a bordered editorial table.
 */

export type LegalDocumentProps = {
  /** Mono eyebrow above the headline, e.g. "Legal · Privacy". */
  eyebrow: string;
  /** Plain-text lead of the H1, e.g. "Privacy". */
  titleLead: string;
  /** The single italicized spine-accent word(s), e.g. "Policy". */
  titleAccent: string;
  /** Optional plain text after the accent. */
  titleTail?: string;
  /** Serif italic deck under the headline. */
  lede: string;
  /** Human-readable effective date, e.g. "June 8, 2026". */
  effectiveDate: string;
  /** Optional human-readable last-updated date. */
  updatedDate?: string;
  /** Route this page lives at, e.g. "/privacy" (used for breadcrumb + canonical). */
  route: string;
  /** Breadcrumb / page label, e.g. "Privacy Policy". */
  breadcrumbLabel: string;
  /** Markdown body. Top-level sections use `##` headings. */
  body: string;
};

export function LegalDocument({
  eyebrow,
  titleLead,
  titleAccent,
  titleTail,
  lede,
  effectiveDate,
  updatedDate,
  route,
  breadcrumbLabel,
  body,
}: LegalDocumentProps) {
  const headings = getHeadings(body);

  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={[
          breadcrumb([
            { name: "Home", url: "/" },
            { name: breadcrumbLabel, url: route },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: breadcrumbLabel,
            url: `${ORIGIN}${route}`,
            inLanguage: "en-US",
            isPartOf: { "@id": `${ORIGIN}/#website` },
            publisher: { "@id": `${ORIGIN}/#organization` },
          },
        ]}
      />

      <article className="bg-paper-off">
        <header className="border-b border-ink pt-28 lg:pt-36 pb-12 lg:pb-16">
          <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
            <Reveal className="col-span-12 lg:col-span-9">
              <nav
                aria-label="Breadcrumb"
                className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted mb-5"
              >
                <Link href="/" className="hover:text-spine transition-colors">
                  Home
                </Link>
                <span aria-hidden className="mx-2">
                  ·
                </span>
                <span className="text-ink">{breadcrumbLabel}</span>
              </nav>
              <span className="eyebrow mb-5">{eyebrow}</span>
              <h1
                className="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[20ch]"
                style={{ fontSize: "clamp(40px, 6.4vw, 104px)" }}
              >
                {titleLead}{" "}
                <em className="italic text-spine">{titleAccent}</em>
                {titleTail ? ` ${titleTail}` : ""}
              </h1>
              <p className="mt-6 font-serif italic text-[19px] lg:text-[22px] leading-[1.4] text-ink-soft max-w-[58ch]">
                {lede}
              </p>
              <div className="mt-7 pt-5 border-t border-rule flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono uppercase tracking-[0.18em] text-[11px] text-muted">
                <span>
                  <span className="text-ink font-medium">Effective</span> · {effectiveDate}
                </span>
                {updatedDate && (
                  <span>
                    <span className="text-ink font-medium">Last updated</span> · {updatedDate}
                  </span>
                )}
              </div>
            </Reveal>
          </div>
        </header>

        <div className="mx-auto max-w-wrap px-6 lg:px-12 py-12 lg:py-20 grid grid-cols-12 gap-8 lg:gap-10">
          {headings.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 border-t border-ink pt-5">
                <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine mb-4">
                  On This Page
                </div>
                <nav aria-label="On this page">
                  <ul className="flex flex-col gap-3">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="block text-[13.5px] leading-[1.4] text-ink-soft hover:text-spine transition-colors"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}
          <Reveal
            className={`col-span-12 ${headings.length > 0 ? "lg:col-span-8 lg:col-start-5" : "lg:col-span-8"}`}
          >
            <Prose>{body}</Prose>
          </Reveal>
        </div>
      </article>

      <FooterV2 />
    </>
  );
}
