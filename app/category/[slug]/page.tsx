import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/v2/FinalCta";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { JsonLd } from "@/components/content/JsonLd";
import { PostCard, type PostDTO } from "@/components/v2/blog/PostCard";
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  formatDate,
  getArticlesByCategory,
} from "@/lib/content";
import { breadcrumb, collectionPageSchema } from "@/lib/jsonld";

import "../../v2.css";

type RouteParams = { slug: string };

/**
 * /category/<slug> — blog category archive. Indexable topical hub that
 * recovers the legacy WordPress /category/ URLs (previously 302'd to /blog)
 * and gives each taxonomy term its own internal-linking surface.
 */
export function generateStaticParams(): RouteParams[] {
  return CATEGORY_ORDER.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug];
  if (!label) return { title: slug };
  const description =
    CATEGORY_DESCRIPTIONS[slug] ?? `Articles on ${label} from Premier Limb Lengthening.`;
  const title = `${label} — Limb Lengthening Articles`;
  return {
    title,
    description,
    alternates: { canonical: `/category/${slug}` },
    openGraph: { title, description, url: `/category/${slug}`, type: "website" },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug];
  if (!label) notFound();

  const articles = getArticlesByCategory(slug);
  const description = CATEGORY_DESCRIPTIONS[slug] ?? `Articles on ${label}.`;
  const posts: PostDTO[] = articles.map((a) => ({
    route: a.route,
    title: a.title,
    description: a.description,
    readingTime: a.readingTime,
    category: slug,
    categoryLabel: label,
    image: a.featuredImage,
    date: formatDate(a.date),
  }));

  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={[
          collectionPageSchema(`${label} — Limb Lengthening Articles`, articles),
          breadcrumb([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: label, url: `/category/${slug}` },
          ]),
        ]}
      />

      <section className="bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-12 lg:pb-14">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-8">
            <nav
              aria-label="Breadcrumb"
              className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted mb-5"
            >
              <Link href="/" className="hover:text-spine transition-colors">Home</Link>
              <span aria-hidden className="mx-2">·</span>
              <Link href="/blog" className="hover:text-spine transition-colors">Blog</Link>
              <span aria-hidden className="mx-2">·</span>
              <span className="text-ink">{label}</span>
            </nav>
            <h1
              className="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[18ch]"
              style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
            >
              {label}.
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule lg:self-end">
            <p className="font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft">
              {description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-off py-16 lg:py-20">
        <div className="mx-auto max-w-wrap px-6 lg:px-12">
          <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted mb-6">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 border-t border-rule pt-10">
            {posts.map((p, i) => (
              <Reveal key={p.route} delay={Math.min(i, 5) * 0.06} as="article">
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-rule">
            <Link
              href="/blog"
              className="font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine pb-1 hover:text-spine-deep"
            >
              ← All articles
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
      <FooterV2 />
    </>
  );
}
