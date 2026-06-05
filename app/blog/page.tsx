import type { Metadata } from "next";
import { FinalCta } from "@/components/v2/FinalCta";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { JsonLd } from "@/components/content/JsonLd";
import { BlogIndex } from "@/components/v2/blog/BlogIndex";
import type { PostDTO } from "@/components/v2/blog/PostCard";
import { CATEGORY_LABELS, CATEGORY_ORDER, formatDate, getArticles } from "@/lib/content";
import { breadcrumb, collectionPageSchema } from "@/lib/jsonld";

import "../v2.css";

export const metadata: Metadata = {
  title: "Limb Lengthening Blog, Articles & Patient Guides",
  description:
    "Honest, plain-language coverage of cosmetic limb lengthening: candidacy, recovery, pricing, and the science of bone regeneration, written to help patients decide with confidence.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Limb Lengthening Blog, Articles & Patient Guides",
    description:
      "Patient-grade articles on candidacy, recovery, pricing, and the science of bone regeneration.",
    url: "/blog",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function V2BlogPage() {
  const articles = getArticles();

  const posts: PostDTO[] = articles.map((a) => {
    const category = a.category ?? "limb-lengthening";
    return {
      route: a.route,
      title: a.title,
      description: a.description,
      readingTime: a.readingTime,
      category,
      categoryLabel: CATEGORY_LABELS[category] ?? category.replace(/-/g, " "),
      image: a.featuredImage,
      date: formatDate(a.date),
    };
  });

  const counts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
  const categories = [
    { slug: "all", label: "All", count: posts.length },
    ...CATEGORY_ORDER.filter((slug) => counts[slug]).map((slug) => ({
      slug,
      label: CATEGORY_LABELS[slug],
      count: counts[slug],
    })),
  ];

  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={[
          collectionPageSchema("Limb Lengthening Blog", articles),
          breadcrumb([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
          ]),
        ]}
      />

      <section className="bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-12 lg:pb-14">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-8">
            <span className="eyebrow mb-5">Resources · Patient Guides</span>
            <h1
              className="mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[16ch]"
              style={{ fontSize: "clamp(40px, 6vw, 92px)" }}
            >
              Everything worth <em className="italic text-spine">knowing.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule lg:self-end">
            <p className="font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft">
              Honest, plain-language coverage of candidacy, recovery, pricing,
              and the science behind bone regeneration. Written to help you
              decide with clear eyes.
            </p>
          </Reveal>
        </div>
      </section>

      <BlogIndex posts={posts} categories={categories} />

      <FinalCta />
      <FooterV2 />
    </>
  );
}
