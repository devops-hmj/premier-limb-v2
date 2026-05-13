import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConsultTemplate } from "@/components/templates/ConsultTemplate";
import { getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const ROUTE = "/consult";

export function generateMetadata(): Metadata {
  const p = getPageByRoute(ROUTE);
  return p ? pageMetadata(p) : { title: "Schedule a Consultation" };
}

export default function Page() {
  const page = getPageByRoute(ROUTE);
  if (!page) notFound();
  return (
    <ConsultTemplate
      page={page}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Consult", href: ROUTE },
      ]}
    />
  );
}
