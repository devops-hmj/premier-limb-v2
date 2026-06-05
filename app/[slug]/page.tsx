import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/v2/FinalCta";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { Prose } from "@/components/content/Prose";
import { JsonLd } from "@/components/content/JsonLd";
import { CATEGORY_LABELS, formatDate, getArticles, getHeadings, getPageByRoute, getRelatedArticles } from "@/lib/content";
import { articleSchema, breadcrumb } from "@/lib/jsonld";

import "../v2.css";

type RouteParams = { slug: string };

/**
 * /[slug] — internal content (article) template.
 *
 * Mirrors the legacy article route shape (uses the same content loader
 * + Prose renderer) so any of the ~16 top-level articles render with the
 * V2 chrome (NavV2, FooterV2, FinalCta) and editorial framing.
 */

export function generateStaticParams(): RouteParams[] {
  return getArticles().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = getPageByRoute(`/${slug}`);
  if (!p) return { title: slug };
  const ogImages = p.featuredImage
    ? [{ url: p.featuredImage.src, alt: p.featuredImage.alt }]
    : undefined;
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      url: `/${slug}`,
      type: "article",
      images: ogImages,
    },
    twitter: p.featuredImage
      ? {
          card: "summary_large_image",
          title: p.title,
          description: p.description,
          images: [p.featuredImage.src],
        }
      : undefined,
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const page = getPageByRoute(`/${slug}`);
  if (!page || page.kind !== "article") notFound();

  const related = getRelatedArticles(page.slug, page.category, 3);
  const headings = getHeadings(page.body);

  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={[
          articleSchema(page),
          breadcrumb([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            ...(page.category
              ? [{ name: CATEGORY_LABELS[page.category] ?? page.category, url: `/category/${page.category}` }]
              : []),
            { name: page.title, url: page.route },
          ]),
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
                <Link href="/" className="hover:text-spine transition-colors">Home</Link>
                <span aria-hidden className="mx-2">·</span>
                <Link href="/blog" className="hover:text-spine transition-colors">Blog</Link>
                {page.category && (
                  <>
                    <span aria-hidden className="mx-2">·</span>
                    <Link
                      href={`/category/${page.category}`}
                      className="text-ink hover:text-spine transition-colors"
                    >
                      {CATEGORY_LABELS[page.category] ?? page.category.replace(/-/g, " ")}
                    </Link>
                  </>
                )}
              </nav>
              <h1
                className="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[22ch]"
                style={{ fontSize: "clamp(36px, 5.8vw, 96px)" }}
              >
                {/* No verbatim italic em here — title strings vary; the page
                    header reads as a clean serif headline. */}
                {page.title}
              </h1>
              <div className="mt-7 pt-5 border-t border-rule flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono uppercase tracking-[0.18em] text-[11px] text-muted">
                <span>
                  <span className="text-ink font-medium">Reading</span> · {page.readingTime} min
                </span>
                {page.category && (
                  <span>
                    <span className="text-ink font-medium">Category</span> ·{" "}
                    <Link
                      href={`/category/${page.category}`}
                      className="hover:text-spine transition-colors"
                    >
                      {CATEGORY_LABELS[page.category] ?? page.category.replace(/-/g, " ")}
                    </Link>
                  </span>
                )}
                <span>
                  <span className="text-ink font-medium">By</span> · Dr. Hrayr Basmajian
                </span>
                {page.date && (
                  <span>
                    <span className="text-ink font-medium">Published</span> ·{" "}
                    <time dateTime={page.date}>{formatDate(page.date)}</time>
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
                  In This Post
                </div>
                <nav aria-label="On this page">
                  <ul className="flex flex-col gap-3">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="block text-[14px] leading-[1.4] text-ink-soft hover:text-spine transition-colors"
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
            {page.featuredImage && (
              <figure className="mb-10 lg:mb-12">
                <div className="relative aspect-[16/9] border border-ink overflow-hidden bg-paper-warm">
                  {/* Hero served from the live WordPress media library. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={page.featuredImage.src}
                    alt={page.featuredImage.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                {page.featuredImage.alt && (
                  <figcaption className="mt-3 font-mono uppercase tracking-[0.16em] text-[10px] text-muted">
                    {page.featuredImage.alt}
                  </figcaption>
                )}
              </figure>
            )}
            <Prose>{page.body}</Prose>
          </Reveal>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-paper py-20 lg:py-24 border-t border-rule">
          <div className="mx-auto max-w-wrap px-6 lg:px-12">
            <Reveal>
              <header className="pb-6 mb-10 border-b border-ink flex items-end justify-between gap-6 flex-wrap">
                <h2
                  className="font-serif font-normal tracking-[-0.02em] text-ink leading-[1]"
                  style={{ fontSize: "clamp(28px, 3.8vw, 48px)" }}
                >
                  Keep <em className="italic text-spine">reading.</em>
                </h2>
                <Link
                  href="/blog"
                  className="font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine pb-1 hover:text-spine-deep"
                >
                  All articles →
                </Link>
              </header>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-rule pt-10">
              {related.map((r, i) => (
                <Reveal key={r.route} delay={i * 0.08} as="article">
                  <Link href={r.route} className="group block">
                    <div className="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted mb-3">
                      {(r.category ?? "article").replace(/-/g, " ")} · {r.readingTime} min
                    </div>
                    <h3 className="font-serif font-medium text-[22px] lg:text-[24px] leading-[1.15] tracking-[-0.01em] text-ink mb-3 group-hover:text-spine transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-ink-soft mb-4 break-words line-clamp-3">
                      {r.description}
                    </p>
                    <span className="font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine inline-flex items-center gap-2 border-b border-spine pb-0.5">
                      Read
                      <span className="font-serif italic text-[14px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
      <FooterV2 />
    </>
  );
}
