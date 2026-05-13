import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileTemplate } from "@/components/templates/ProfileTemplate";
import { getPageByRoute } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const ROUTE = "/dr-basmajian";

export function generateMetadata(): Metadata {
  const p = getPageByRoute(ROUTE);
  return p ? pageMetadata(p) : { title: "Dr. Hrayr Basmajian" };
}

export default function Page() {
  const page = getPageByRoute(ROUTE);
  if (!page) notFound();
  return (
    <ProfileTemplate
      page={page}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Dr. Basmajian", href: ROUTE },
      ]}
    />
  );
}
