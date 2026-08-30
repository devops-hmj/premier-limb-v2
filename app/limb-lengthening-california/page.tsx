import type { Metadata } from "next";
import Image from "next/image";
import { NavV2 } from "@/components/v2/NavV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { FinalCta } from "@/components/v2/FinalCta";
import { PillarFaq } from "@/components/v2/PillarFaq";
import { Prose } from "@/components/content/Prose";
import { Reveal } from "@/components/v2/Reveal";
import { DraftBanner } from "@/components/v2/DraftBanner";

import "../v2.css";

/**
 * /limb-lengthening-california — California state parent hub for the geo
 * cluster. Mirrors the unpublished WordPress draft (post 360) built from the
 * pll/seo-landing-page pattern, so Pastel reviewers see the same copy and the
 * same measure as production.
 *
 * DRAFT. noindex, and excluded from the sitemap, because the page is gated on
 * Jaime's NAP and city-slate decisions.
 */
export const metadata: Metadata = {
  title: "Limb Lengthening Surgery in California · Dr. Basmajian",
  description:
    "Limb lengthening surgery in California with board-certified Dr. Basmajian in Upland, near Los Angeles. Serving LA, Orange County, San Diego and beyond.",
  alternates: { canonical: "/limb-lengthening-california" },
  robots: { index: false, follow: false },
};

const lede = `
California patients researching this procedure often find that several of the best-known limb lengthening practices in the country are based outside the state, in places like Florida, Maryland, and Nevada. Premier Limb Lengthening is a California-based option. The clinic is in Upland, and its surgeon, its method, and its concierge support are all set up for patients who live in California and want their care close to home.

## The surgeon behind the practice

Care in California is led by Dr. Hrayr Basmajian, a board-certified orthopedic surgeon who performs every case personally. He is fellowship-trained at Hannover Medical School in Germany, where internal lengthening nail technology was pioneered. His full background, training, and approach are covered on his page, and every consultation is with him.

Meet the surgeon: [Dr. Basmajian, board-certified orthopedic surgeon](/dr-basmajian).

## How the procedure works, in brief

Limb lengthening makes a bone longer over time. The surgeon divides the thigh bone or shin bone and places an internal nail inside it, and the nail lengthens the bone a small amount each day so new bone forms in the gap. Premier Limb Lengthening uses the internal method only, with no external frame worn on the leg. The full step-by-step explanation lives on the procedure pillar.

Full guide: [how leg lengthening surgery works, step by step](/leg-lengthening-surgery).

## Areas we serve across California

The clinic is in Upland, and patients reach it from across California by car and by air. Each area below has its own page with local drive times, airport routes, and what a consult day looks like from that region. Start with the one closest to you.

| Area | What it covers |
| --- | --- |
| Southern California | The regional sub-hub for the LA metro and the wider SoCal market, routing to each city below. |
| Los Angeles | For LA-metro patients. Upland is roughly 40 to 60 minutes east of Los Angeles on the I-10, traffic depending. |
| Orange County | For Newport Beach, Irvine, and the wider county, about a 45-minute drive to the Upland clinic. |
| Upland and the Inland Empire | The home clinic and local market page, anchored to Pomona Valley Hospital Medical Center. |

Patients also travel from San Diego, the Central Valley, and the San Francisco Bay Area. If your area does not have its own page yet, the practice still serves it, and the concierge team helps with the travel plan.

> **Fill required, Jaime:** decide which additional California cities or regions get their own linked page in this hub, then add them to the table above. The region and city pages are not built yet, so the table entries are intentionally unlinked.

## Getting to the Upland clinic

The clinic sits in Upland, in the Inland Empire, and operates at Pomona Valley Hospital Medical Center. The closest airport is Ontario International Airport, which is about a 10-minute drive from the clinic and is often easier to reach than LAX for California patients flying in from the north of the state. Freeway access is direct from the I-10 and the I-15.

> **Fill required, Jaime, NAP:** exact street address, phone, hours, Google Business Profile details, and GeoCoordinates for the Upland clinic. Do not fabricate NAP. Insert the confirmed values into the copy above and into the page schema.

## What the process looks like for a California patient

The path is the same wherever in California you start, and your area page walks through the local detail. At a high level it runs in four steps.

1. A first teleconsult, usually by video, so you can talk through your goals before you travel.
2. An in-person consultation at the Upland clinic with Dr. Basmajian.
3. Surgery, then the early recovery weeks in housing the concierge coordinates near the clinic.
4. A return home for the consolidation phase, with local physical therapy and telehealth follow-up.

## Concierge support for California patients

The concierge program is available to California patients, not only to patients flying in from other countries. Your goals and your timeline shape the plan, so an in-state patient and a fly-in patient are supported differently. For California patients it typically helps with:

- Housing near the Upland clinic for the early recovery weeks.
- Coordinating imaging from your local California providers.
- Travel and drive-time logistics to and from Upland.
- Handoff to a physical therapy provider near home for the consolidation phase.

## What limb lengthening costs in California

Cost is a package rather than a single figure, and it belongs on its own page so the numbers stay current. In short, this is an out-of-pocket procedure in the United States, and the price depends on your personalized surgical plan. The full breakdown of what is included and how financing works lives on the pricing page.

Full guide: [limb lengthening cost, financing, and what is included](/limb-lengthening-pricing-options).
`;

const faqItems = [
  {
    q: "Where can you get limb lengthening surgery in California?",
    a: "At Premier Limb Lengthening in Upland, in the Inland Empire east of Los Angeles. Board-certified orthopedic surgeon Dr. Hrayr Basmajian performs the procedure with an internal nail, serving patients across Los Angeles, Orange County, San Diego, and the wider state.",
  },
  {
    q: "Do you have to live near Upland to have the surgery?",
    a: "No. Patients travel to the Upland clinic from across California, and the concierge team helps coordinate housing near the clinic for the early recovery weeks, so where you live in the state does not decide whether the procedure is workable for you.",
  },
  {
    q: "How far is the clinic from Los Angeles?",
    a: "Upland is roughly 40 to 60 minutes east of Los Angeles on the I-10, depending on traffic. The Los Angeles page covers routes, consult-day logistics, and local imaging in more detail.",
  },
  {
    q: "Which airport is closest to the clinic?",
    a: "Ontario International Airport is about a 10-minute drive from the Upland clinic. For many California patients it is closer and simpler than LAX, especially for those flying in from Northern California.",
  },
  {
    q: "Is Dr. Basmajian a board-certified surgeon?",
    a: "Yes. Dr. Hrayr Basmajian is a board-certified orthopedic surgeon, fellowship-trained at Hannover Medical School in Germany. He performs every case personally, and his full background is on his surgeon page.",
  },
] as const;

export default function LimbLengtheningCaliforniaPage() {
  return (
    <>
      <NavV2 forceVisible />
      <DraftBanner
        owners={["Jaime (NAP, city slate, nav placement)", "Dr. B (credential wording)"]}
        note="California state hub for the geo cluster. Copy is a build-ready v1 from the marketing sprint, but the clinic NAP, the Google Business Profile details, and the list of which California cities get their own page are all unconfirmed."
      />

      <article className="bg-paper-off">
        <section className="border-b border-ink pt-20 lg:pt-28 pb-16 lg:pb-20">
          <div className="mx-auto max-w-wrap px-6 lg:px-12">
            <span className="eyebrow mb-5">Locations · California</span>
            <h1 className="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[20ch] text-[clamp(40px,6.4vw,104px)]">
              Limb Lengthening Surgery in{" "}
              <em className="italic text-spine">California.</em>
            </h1>
            <p className="mt-4 font-mono uppercase tracking-[0.14em] text-[11px] text-muted">
              Medically reviewed by{" "}
              <a href="/dr-basmajian" className="underline">
                Dr. Hrayr Basmajian
              </a>
            </p>
            <p className="mt-7 max-w-[62ch] font-serif italic text-[19px] lg:text-[22px] leading-[1.4] text-ink-soft">
              Limb lengthening surgery in California is available at Premier Limb
              Lengthening in Upland, in the Inland Empire east of Los Angeles.
              Board-certified orthopedic surgeon Dr. Hrayr Basmajian performs
              precision limb lengthening with an internal nail, serving patients
              across Los Angeles, Orange County, the Inland Empire, San Diego,
              and the wider state.
            </p>
          </div>
        </section>

        <section className="bg-paper py-10 lg:py-16 border-b border-rule">
          <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <figure>
              <Image
                src="/images/your-surgery/how-much-taller-scale.webp"
                alt="Placeholder image, pending the California service-area map"
                width={1024}
                height={1024}
                className="w-full h-auto border border-rule"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                Placeholder art. Replace with the California service-area map,
                Upland clinic pinned.
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/your-surgery/how-much-taller-anatomy.webp"
                alt="Placeholder image, pending the drive-time callout graphic"
                width={1024}
                height={1024}
                className="w-full h-auto border border-rule"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                Placeholder art. Replace with drive-time callouts to LA, Orange
                County, and San Diego.
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="mx-auto max-w-wrap px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-8">
            <Prose>{lede}</Prose>
            <PillarFaq items={faqItems} />
          </Reveal>
        </div>
      </article>

      <FinalCta />
      <FooterV2 />
    </>
  );
}
