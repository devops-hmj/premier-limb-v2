import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/v2/FinalCta";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { Prose } from "@/components/content/Prose";
import { getPageByRoute, getPagesByKind } from "@/lib/content";

import "../v2.css";

export const metadata: Metadata = {
  title: "Limb Lengthening Surgery — How It Works",
  description:
    "How limb lengthening works — distraction osteogenesis, Precice internal nail placement, gradual distraction, and a recovery timeline you can plan your life around.",
  alternates: { canonical: "/your-surgery" },
  openGraph: {
    title: "Limb Lengthening Surgery — How It Works",
    description:
      "Distraction osteogenesis, internal Precice technology, and a recovery timeline you can plan your life around.",
    url: "/your-surgery",
    type: "article",
  },
  robots: { index: true, follow: true },
};

/**
 * /your-surgery — service-overview editorial page.
 *
 * Composition:
 *   Hero band         → eyebrow + h1 + lede
 *   Prose body        → scraped markdown rendered with V2 typography
 *   Sub-page grid     → all 7 service-sub pages as editorial cards
 *   FinalCta          → shared closing
 */
export default function V2YourSurgeryPage() {
  const page = getPageByRoute("/your-surgery");
  if (!page) notFound();
  const subPages = getPagesByKind("service-sub");

  return (
    <>
      <NavV2 forceVisible />

      <section className="bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8 items-end">
          <Reveal className="col-span-12 lg:col-span-8">
            <span className="eyebrow mb-5">Your Surgery · The Procedure</span>
            <h1
              className="mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.94] max-w-[18ch]"
              style={{ fontSize: "clamp(44px, 7.4vw, 120px)" }}
            >
              Limb lengthening, <em className="italic text-spine">explained.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule">
            <p className="font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft">
              Distraction osteogenesis, internal Precice technology, and a
              recovery timeline you can plan your life around. Dr. Basmajian
              walks every patient through it on their first call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-off py-16 lg:py-24">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-8">
            <Prose>{page.body}</Prose>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-28 border-t border-rule">
        <div className="mx-auto max-w-wrap px-6 lg:px-12">
          <Reveal>
            <header className="pb-8 mb-12 border-b border-ink">
              <span className="eyebrow mb-4">Read Further</span>
              <h2
                className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[22ch]"
                style={{ fontSize: "clamp(36px, 5.4vw, 76px)" }}
              >
                Topics across <em className="italic text-spine">your surgery journey.</em>
              </h2>
            </header>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-ink">
            {subPages.map((p, i) => (
              <Reveal
                key={p.route}
                delay={(i % 3) * 0.08}
                as="article"
                className={`
                  py-10 pr-6
                  ${i % 3 !== 0 ? "lg:pl-6" : ""}
                  ${(i + 1) % 3 !== 0 && i !== subPages.length - 1 ? "lg:border-r" : ""}
                  ${i < subPages.length - (subPages.length % 3 || 3) ? "border-b" : ""}
                  border-rule
                `}
              >
                <Link href={p.route} className="group block">
                  <div className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine mb-3">
                    {String(i + 1).padStart(2, "0")} · {p.readingTime} min read
                  </div>
                  <h3 className="font-serif font-medium text-[22px] lg:text-[24px] leading-[1.18] tracking-[-0.01em] text-ink mb-3 group-hover:text-spine transition-colors max-w-[26ch]">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-ink-soft max-w-[40ch] mb-4">
                    {p.description}
                  </p>
                  <span className="font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine inline-flex items-center gap-2 border-b border-spine pb-0.5">
                    Read
                    <span className="font-serif italic text-[14px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
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
