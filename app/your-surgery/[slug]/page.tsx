import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceSubTemplate } from "@/components/templates/ServiceSubTemplate";
import { getPagesByKind, getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getPagesByKind("service-sub").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = getPageByRoute(`/your-surgery/${slug}`);
  return p ? pageMetadata(p) : { title: slug };
}

export default async function Page({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const page = getPageByRoute(`/your-surgery/${slug}`);
  if (!page) notFound();
  return (
    <ServiceSubTemplate
      page={page}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Your Surgery", href: "/your-surgery" },
        { name: page.title, href: page.route },
      ]}
    />
  );
}
