import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceOverviewTemplate } from "@/components/templates/ServiceOverviewTemplate";
import { getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const ROUTE = "/your-surgery";

export function generateMetadata(): Metadata {
  const p = getPageByRoute(ROUTE);
  return p ? pageMetadata(p) : { title: "Your Surgery" };
}

export default function Page() {
  const page = getPageByRoute(ROUTE);
  if (!page) notFound();
  return (
    <ServiceOverviewTemplate
      page={page}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Your Surgery", href: ROUTE },
      ]}
    />
  );
}
