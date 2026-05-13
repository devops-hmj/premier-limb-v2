import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PricingTemplate } from "@/components/templates/PricingTemplate";
import { getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const ROUTE = "/limb-lengthening-pricing-options";

export function generateMetadata(): Metadata {
  const p = getPageByRoute(ROUTE);
  return p ? pageMetadata(p) : { title: "Pricing" };
}

export default function Page() {
  const page = getPageByRoute(ROUTE);
  if (!page) notFound();
  return (
    <PricingTemplate
      page={page}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Pricing", href: ROUTE },
      ]}
    />
  );
}
