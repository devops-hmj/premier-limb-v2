import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/templates/ArticleTemplate";
import { getPagesByKind, getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type RouteParams = { slug: string };

/**
 * Catch-all for top-level articles (the ~16 root-slug blog posts).
 * `generateStaticParams` limits this to the known article slugs so any other
 * top-level URL falls through to a 404 instead of being served.
 */
export function generateStaticParams(): RouteParams[] {
  return getPagesByKind("article").map((p) => ({ slug: p.slug }));
}

// Disallow non-prebuilt slugs at runtime — anything not in the list 404s.
export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = getPageByRoute(`/${slug}`);
  return p ? pageMetadata(p) : { title: slug };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const page = getPageByRoute(`/${slug}`);
  if (!page || page.kind !== "article") notFound();
  return (
    <ArticleTemplate
      page={page}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Journal", href: "/blog" },
        { name: page.title, href: page.route },
      ]}
    />
  );
}
