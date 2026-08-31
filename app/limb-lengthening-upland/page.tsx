import type { Metadata } from "next";
import Image from "next/image";
import { NavV2 } from "@/components/v2/NavV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { FinalCta } from "@/components/v2/FinalCta";
import { PillarFaq } from "@/components/v2/PillarFaq";
import { Prose } from "@/components/content/Prose";
import { Reveal } from "@/components/v2/Reveal";

import "../v2.css";

/**
 * /limb-lengthening-upland — hyperlocal geo page and the Google Business
 * Profile / map-pack anchor. Mirrors the unpublished WordPress draft built from
 * the IMAGE-LED pattern (pll/seo-image-led-landing-page), which is why this
 * page looks deliberately unlike the other four: a light bordered lead image
 * instead of a dark cover, then alternating 58/42 text-and-image columns.
 *
 * DRAFT, noindex. Accurate NAP is the entire point of a map-pack anchor, so
 * every address, phone, hour, GBP and geo value is a fill for Jaime and none of
 * it is invented here.
 */
export const metadata: Metadata = {
  title: "Limb Lengthening in Upland, CA · Premier Limb Lengthening",
  description:
    "Limb lengthening surgery in Upland, CA. Premier Limb Lengthening performs the internal PRECICE nail procedure in the Inland Empire, near Ontario International Airport.",
  alternates: { canonical: "/limb-lengthening-upland" },
  robots: { index: false, follow: false },
};

const nearMe = `
> **Draft, not for publication.** This is the map-pack anchor, so accurate NAP is the whole point of the page. Every address, phone, hour, Google Business Profile and geo value below is a fill for Jaime and none of it has been invented. All three image slots are placeholders and marketing owes the art: a real exterior photograph, a real interior photograph, and the live Google Maps embed. Generated or stock imagery is not acceptable on this page, because a map-pack anchor asserts a real location.

## Where can I get limb lengthening surgery near Upland, CA?

Limb lengthening surgery near Upland is available at Premier Limb Lengthening, an orthopedic practice based in Upland, California. Dr. Hrayr Basmajian performs the internal PRECICE nail procedure at Pomona Valley Hospital Medical Center, serving patients across the Inland Empire, the Pomona Valley, and greater Southern California.

Upland is our home city. If you have been searching for limb lengthening near me from anywhere in the Inland Empire or the Pomona Valley, this is the practice at the center of that search, with the operating hospital and the surgeon both based here rather than a satellite office visited a few days a year.
`;

const visitUs = `
## Visit us in Upland

The details below are the practice name, address, and phone number to use for a consultation or a visit. They match our Google Business Profile exactly.

| Field | Value |
| --- | --- |
| Practice name | Premier Limb Lengthening |
| Street address | Fill required, Jaime: exact street address, Upland, CA |
| City, State, ZIP | Upland, CA. Fill required, Jaime: ZIP |
| Phone | Fill required, Jaime: primary local phone for click-to-call |
| Hours | Fill required, Jaime: business hours |
| Operating hospital | Pomona Valley Hospital Medical Center. Dr. B confirms the affiliation wording. |
| Google Business Profile | Fill required, Jaime: GBP listing URL |
| Google Map embed | Fill required, Jaime: Maps embed for the verified listing |
| GeoCoordinates | Fill required, Jaime: latitude and longitude |

> **Fill required, Jaime, NAP, critical:** every value in the table above is a NAP field only Jaime can confirm. Do not publish placeholder data. Once the master values arrive they must be propagated identically into this block, the FAQ answers, and the page schema, then checked character-for-character against the Google Business Profile.
`;

const rest = `
## Limb lengthening near me: getting to Upland

Upland sits in the western Inland Empire, and the practice is easy to reach whether you are local or flying in. Ontario International Airport is the closest major airport and is a short drive away, which makes Upland a practical base for patients coming from across Southern California and beyond.

For patients driving in, Upland is reachable on the 210 and 10 freeways from across the region. Specific driving directions and parking guidance are worth adding here once the street address is confirmed.

> **Fill required, Jaime:** drive time from Ontario International Airport in minutes, plus the freeway exit and a parking note. The same drive time is referenced in the airport FAQ answer below.

## Areas we serve from Upland

Upland is the base, and the practice draws patients from across Southern California. The home market is the Pomona Valley and the western Inland Empire. We also see patients who travel in from the wider Los Angeles metro and Orange County, and each of those areas has its own page with directions and details.

- Upland, the Pomona Valley, and the western Inland Empire, the home market
- Greater Los Angeles metro, which will have its own page
- Orange County, which will have its own page
- The broader region, covered by [limb lengthening in California](/limb-lengthening-california)

> **Staged, do not activate yet:** the Los Angeles, Orange County, and Southern California pages are not built, so those entries are unlinked rather than pointing at 404s. Link them as each sibling publishes, and add the reverse down-link from the California hub to this page as the Upland anchor.

## The procedure, in brief

Limb lengthening is an orthopedic procedure that makes a bone longer. The thigh bone or shin bone is divided, then an internal magnetic nail slowly separates the two ends about a millimeter a day so new bone grows in the gap. We use the internal PRECICE nail only, with no external frame. That is the short version. The full step-by-step explanation lives on the procedure pillar.

Full guide: [leg lengthening surgery, how the procedure works](/leg-lengthening-surgery) · [height surgery overview](/height-surgery).

## What limb lengthening costs

Cost is a bundle rather than a single sticker price, and the current numbers, what is included, and financing all live on the pricing page so they stay accurate. In short, cosmetic limb lengthening in the United States is an out-of-pocket procedure whose price depends on your surgical plan.

Full guide: [limb lengthening cost, financing, and what is included](/limb-lengthening-pricing-options).

## Your surgeon in Upland

Limb lengthening at this practice is performed by Dr. Hrayr Basmajian, a board-certified orthopedic surgeon based in Upland. Choosing a local surgeon means your consultation, your procedure, and your follow-up all happen with the same person in the same place rather than being handed off. His full background and credentials are on his page.

Full guide: [about Dr. Basmajian](/dr-basmajian).
`;

const faqItems = [
  {
    q: "Where is Premier Limb Lengthening located?",
    a: "Premier Limb Lengthening is based in Upland, California, in the Inland Empire east of Los Angeles. The practice operates at Pomona Valley Hospital Medical Center and is a short drive from Ontario International Airport. FILL REQUIRED, JAIME: exact street address.",
  },
  {
    q: "Is there a limb lengthening surgeon near me in the Inland Empire?",
    a: "Yes. Dr. Hrayr Basmajian is a board-certified orthopedic surgeon based in Upland, in the western Inland Empire. He performs internal limb lengthening for patients across the Pomona Valley, the Inland Empire, and greater Southern California.",
  },
  {
    q: "Which airport is closest to the Upland clinic?",
    a: "Ontario International Airport is the closest major airport to Upland and is a short drive from the practice. It is a convenient arrival point for patients traveling in from elsewhere in California or from out of state.",
  },
  {
    q: "Do you treat patients from Los Angeles and Orange County?",
    a: "Yes. The home market is Upland, the Pomona Valley, and the Inland Empire, and many patients travel in from the Los Angeles metro and Orange County. Each of those areas has its own page with directions and details.",
  },
  {
    q: "Do I need to live in Upland to be treated here?",
    a: "No. Being based in Upland means the surgeon and the operating hospital are in one place, which is convenient for local patients and for those traveling in. Patients come from across Southern California and beyond for the procedure and follow-up.",
  },
] as const;

export default function LimbLengtheningUplandPage() {
  return (
    <>
      <NavV2 forceVisible />

      <article className="bg-paper-off">
        {/* Image-led hero: a light bordered lead image above the type, not a
            dark cover. This is what distinguishes the image-led pattern. */}
        <section className="border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
          <div className="mx-auto max-w-wrap px-6 lg:px-12">
            <figure className="mb-10">
              <Image
                src="/images/heroes/how-much-taller-hero.jpg"
                alt="Placeholder image, pending a real photograph of the Upland clinic exterior"
                width={1600}
                height={900}
                priority
                className="w-full h-auto border border-ink"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                PLACEHOLDER, marketing owes art. Replace with a real
                photograph of the Upland clinic exterior. Not stock, not
                generated: this page asserts a physical address, so the building
                has to be the actual building.
              </figcaption>
            </figure>

            <span className="eyebrow mb-5">Locations · Upland, CA</span>
            <h1 className="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[20ch] text-[clamp(40px,6.4vw,104px)]">
              Limb Lengthening in{" "}
              <em className="italic text-spine">Upland, CA.</em>
            </h1>
            <p className="mt-7 max-w-[62ch] font-serif italic text-[19px] lg:text-[22px] leading-[1.4] text-ink-soft">
              Premier Limb Lengthening performs internal limb lengthening surgery
              in Upland, California, in the Inland Empire east of Los Angeles.
              The practice operates at Pomona Valley Hospital Medical Center and
              sits close to Ontario International Airport, serving Upland, the
              Pomona Valley, and the greater Southern California region.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-wrap px-6 lg:px-12">
          <section className="py-12 lg:py-16 border-b border-rule grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <Reveal className="lg:col-span-7">
              <Prose>{nearMe}</Prose>
            </Reveal>
            <figure className="lg:col-span-5">
              <Image
                src="/images/your-surgery/how-much-taller-scale.webp"
                alt="Placeholder image, pending the Google Map embed for the verified listing"
                width={1024}
                height={1024}
                className="w-full h-auto border border-ink"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                PLACEHOLDER, not art. This slot takes the live Google Maps
                embed from the verified Business Profile listing, which arrives
                with Jaime's NAP values.
              </figcaption>
            </figure>
          </section>

          <section className="py-12 lg:py-16 border-b border-rule grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <Reveal className="lg:col-span-7">
              <Prose>{visitUs}</Prose>
            </Reveal>
            <figure className="lg:col-span-5">
              <Image
                src="/images/your-surgery/expectations-recovery-space.webp"
                alt="Placeholder image, pending a consultation photograph at the Upland practice"
                width={1024}
                height={1024}
                className="w-full h-auto border border-ink"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                PLACEHOLDER, marketing owes art. Replace with a real
                photograph of the consultation room or waiting area at the
                Upland practice.
              </figcaption>
            </figure>
          </section>

          <section className="py-12 lg:py-16 border-b border-rule">
            <Reveal className="max-w-prose">
              <Prose>{rest}</Prose>
            </Reveal>
          </section>

          <section className="py-16 lg:py-24">
            <p className="eyebrow mb-3">Common Questions</p>
            <h2 className="font-serif font-normal tracking-[-0.02em] text-ink text-[clamp(30px,4.4vw,56px)] mb-8">
              Local patients also <em className="italic text-spine">ask.</em>
            </h2>
            <PillarFaq items={faqItems} />
          </section>
        </div>
      </article>

      <FinalCta />
      <FooterV2 />
    </>
  );
}
