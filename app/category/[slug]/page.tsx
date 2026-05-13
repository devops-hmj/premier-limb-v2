import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndexTemplate } from "@/components/templates/IndexTemplate";
import { getArticles, getPagesByKind, ORIGIN } from "@/lib/content";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getPagesByKind("category").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const title = categoryLabel(slug);
  return {
    title: `${title} · Journal`,
    description: `Articles filed under ${title} from the Premier Limb Lengthening Institute journal.`,
    alternates: { canonical: `${ORIGIN}/category/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const exists = getPagesByKind("category").some((p) => p.slug === slug);
  if (!exists) notFound();
  const all = getArticles();
  const inCategory = all.filter((a) => a.category === slug);
  const articles = inCategory.length > 0 ? inCategory : all;

  return (
    <IndexTemplate
      eyebrow="Category"
      schemaName={`${categoryLabel(slug)} — Articles`}
      title={<><em>{categoryLabel(slug)}</em> — articles.</>}
      deck={`Articles filed under ${categoryLabel(slug).toLowerCase()}.`}
      articles={articles}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Journal", href: "/blog" },
        { name: categoryLabel(slug), href: `/category/${slug}` },
      ]}
      showCategoryNav
      activeCategory={slug}
    />
  );
}

function categoryLabel(slug: string): string {
  return slug
    .split("-")
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join(" ");
}
