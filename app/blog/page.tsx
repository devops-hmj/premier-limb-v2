import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/v2/FinalCta";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { JsonLd } from "@/components/content/JsonLd";
import { getArticles } from "@/lib/content";
import { breadcrumb, collectionPageSchema } from "@/lib/jsonld";

import "../v2.css";

export const metadata: Metadata = {
  title: "Limb Lengthening Resources, Articles & Patient Guides",
  description:
    "Honest, plain-language coverage of cosmetic limb lengthening: candidacy, recovery, pricing, and the science of bone regeneration, written to help patients decide with confidence.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Limb Lengthening Resources, Articles & Patient Guides",
    description:
      "Patient-grade articles on candidacy, recovery, pricing, and the science of bone regeneration.",
    url: "/blog",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function V2JournalPage() {
  const articles = getArticles();

  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={[
          collectionPageSchema("Limb Lengthening Resources", articles),
          breadcrumb([
            { name: "Home", url: "/" },
            { name: "Resources", url: "/blog" },
          ]),
        ]}
      />

      <section className="bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-8">
            <span className="eyebrow mb-5">Resources · Patient Library</span>
            <h1
              className="mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[16ch]"
              style={{ fontSize: "clamp(44px, 7.4vw, 120px)" }}
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

      <section className="bg-paper-off py-20 lg:py-28">
        <div className="mx-auto max-w-wrap px-6 lg:px-12">
          <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted mb-4">
            {articles.length} articles · most recent on top
          </div>
          <div className="border-t border-ink">
            {articles.map((a, i) => (
              <Reveal key={a.route} delay={Math.min(i, 6) * 0.04}>
                <Link
                  href={a.route}
                  className="group grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-x-6 gap-y-3 items-baseline py-7 border-b border-rule hover:bg-spine-tint transition-colors px-1"
                >
                  <div className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-serif font-medium text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.01em] text-ink group-hover:text-spine transition-colors max-w-[42ch]">
                      {a.title}
                    </h2>
                    <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft max-w-[68ch]">
                      {a.description}
                    </p>
                    <div className="mt-3 font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted">
                      {(a.category ?? "article").replace(/-/g, " ")} · {a.readingTime} min
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="hidden md:inline-block font-serif italic text-spine text-[24px] transition-transform group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
      <FooterV2 />
    </>
  );
}
