import type { Metadata } from "next";
import { IndexTemplate } from "@/components/templates/IndexTemplate";
import { getArticles, ORIGIN } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Long-form answers to the most asked limb lengthening questions — written by the Premier Limb Lengthening Institute team.",
  alternates: { canonical: `${ORIGIN}/blog` },
  openGraph: {
    title: "Journal · Premier Limb Lengthening Institute",
    description:
      "Long-form answers to the most asked limb lengthening questions.",
    url: `${ORIGIN}/blog`,
    type: "website",
  },
};

export default function Page() {
  const articles = getArticles();
  return (
    <IndexTemplate
      eyebrow="Journal · § Articles"
      schemaName="Premier Limb Lengthening Journal"
      title={<>The <em>Premier Limb Lengthening</em> Journal.</>}
      deck="Long-form answers to the questions our patients ask most, from candidacy to recovery."
      articles={articles}
      crumbs={[
        { name: "Home", href: "/" },
        { name: "Journal", href: "/blog" },
      ]}
      showCategoryNav
    />
  );
}
