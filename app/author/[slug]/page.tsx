import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndexTemplate } from "@/components/templates/IndexTemplate";
import { getArticles, getPagesByKind, ORIGIN } from "@/lib/content";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getPagesByKind("author").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const title = authorLabel(slug);
  return {
    title: `Author · ${title}`,
    description: `Articles written by ${title} for Premier Limb Lengthening Institute.`,
    alternates: { canonical: `${ORIGIN}/author/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const exists = getPagesByKind("author").some((p) => p.slug === slug);
  if (!exists) notFound();
  // Author-to-article mapping not in source metadata; show all articles
  // as a graceful fallback until the author column is added to MD frontmatter.
  return (
    <IndexTemplate
      eyebrow="Author"
      schemaName={`Articles by ${authorLabel(slug)}`}
      title={<>Articles by <em>{authorLabel(slug)}</em>.</>}
      deck={`Recent writing by ${authorLabel(slug)} for the Premier Limb Lengthening Institute journal.`}
      articles={getArticles()}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Journal", href: "/blog" },
        { name: authorLabel(slug), href: `/author/${slug}` },
      ]}
    />
  );
}

function authorLabel(slug: string): string {
  // Names are stored as compact handles in the scraped data (e.g. ccatandella).
  // Render them as Initial. Lastname when possible.
  if (slug.length <= 12 && /^[a-z]+$/.test(slug)) {
    return slug[0]!.toUpperCase() + ". " + slug.slice(1, 2).toUpperCase() + slug.slice(2);
  }
  return slug;
}
