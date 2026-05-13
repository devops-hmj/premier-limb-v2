import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/templates/ArticleTemplate";
import { getPagesByKind, getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getPagesByKind("video").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = getPageByRoute(`/video/${slug}`);
  return p ? pageMetadata(p) : { title: slug };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const page = getPageByRoute(`/video/${slug}`);
  if (!page) notFound();
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
