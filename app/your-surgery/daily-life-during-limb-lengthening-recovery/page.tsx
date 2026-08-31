import type { Metadata } from "next";
import Image from "next/image";
import { NavV2 } from "@/components/v2/NavV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { FinalCta } from "@/components/v2/FinalCta";
import { PillarFaq } from "@/components/v2/PillarFaq";
import { Prose } from "@/components/content/Prose";
import { Reveal } from "@/components/v2/Reveal";
import { CoverHero } from "@/components/v2/CoverHero";

import "../../v2.css";

/**
 * /your-surgery/daily-life-during-limb-lengthening-recovery — daily-living
 * sub-hub under the recovery pillar. Mirrors the unpublished WordPress draft
 * (post 363) built from the pll/seo-landing-page pattern.
 *
 * This is v1, which deliberately answers all five daily-living questions IN
 * FULL. When the five micro-FAQ spokes publish, each section here gets swapped
 * for a short summary plus a "Full guide" link so the spoke owns the FAQPage
 * schema and this page stops competing. Those spokes are all still Not Started,
 * so no links to them exist yet.
 *
 * AEO-first play: near-zero tracked search volume, but real patient questions.
 * DRAFT, noindex. Clinical specifics are Dr. B fills.
 */
export const metadata: Metadata = {
  title:
    "Daily Life During Limb Lengthening Recovery: Stairs, Bathrooms, and Help at Home",
  description:
    "The practical side of limb lengthening recovery: getting up and down stairs, on and off the toilet, showering, dressing, what to buy before surgery, and whether you need help at home.",
  alternates: {
    canonical: "/your-surgery/daily-life-during-limb-lengthening-recovery",
  },
  robots: { index: false, follow: false },
};

const body = `
> **Draft, not for publication.** Every section below is written against a general weight-bearing assumption Dr. B has not confirmed. He needs to sign off on stair, toilet, and shower timing by phase, the wound-care guidance on when incisions can get wet, the assistive-device progression, and the level of caregiver help recommended by phase. Hero and section imagery are pattern placeholders and must be swapped.

## Stairs, and living in a two-story house

Yes, most patients handle stairs, and a two-story house is workable with a plan. Early on you take stairs slowly, one at a time, with a handrail and often a helper nearby for the first few days. The simplest setup is to plan to live on one level for the first week or two, with a bed, a bathroom, and everything you need on the same floor, then add stairs back as your strength returns. If your only bathroom is upstairs, we will talk through it before surgery.

## Getting on and off the toilet

This is one of the most common questions, and the fix is simple and cheap. A raised toilet seat plus a grab bar or a bedside commode with arms lets you lower and lift yourself using your arms instead of your legs. Set it up before surgery so it is ready on day one. Most patients are independent in the bathroom quickly once the height and a handhold are sorted out.

## Showering, bathing, and getting dressed

A shower chair or bench and a handheld showerhead are the two things that make bathing safe and easy. You sit to wash rather than stand, keep any dressings dry as instructed, and use a non-slip mat. A walk-in shower is easiest. For a tub, a transfer bench that spans the edge lets you sit and swing your legs over.

Dressing takes loose, easy clothing and a couple of dollar-store tools. A reacher or grabber, a long-handled shoehorn, and sock aids let you dress your lower half without bending or loading the leg. Lay out easy outfits ahead of time so you are not problem-solving on a hard day.

## Sleeping, and moving around the house

Sleep on whatever floor your bathroom is on for the first stretch. Getting in and out is easier from a bed at chair height, and many patients like a wedge or pillows to keep the leg supported and elevated early on.

A walker is the workhorse for the first weeks, and some patients use a wheelchair for longer distances. As you progress you move to crutches, then a cane, then nothing, on the schedule your recovery earns.

> **Fill required, Dr. B, source ambiguity:** confirm the assistive-device progression. The source draft contains an unresolved fragment here reading "or a knee scooter is not typically used for this", which reads as two half-edited alternatives. It has been left out rather than guessed at. Rule on whether knee scooters get a mention and in which direction.

## What to buy before surgery

Setting the house up before surgery is the single best thing you can do for an easy first week. A starter list:

- Walker, and possibly a wheelchair for distance
- Raised toilet seat and bedside commode with arms
- Grab bars or a sturdy handhold near the toilet and shower
- Shower chair or transfer bench, handheld showerhead, and non-slip mat
- Reacher or grabber, long-handled shoehorn, sock aid
- A spot to keep everything on one level, with bed, bathroom, and kitchen access
- Easy meals prepped or stocked, with water and essentials within reach

## Do you need a caregiver or a nurse?

Most patients do not need a live-in nurse, but you do want a helper for the first several days, especially for stairs, meals, and getting to early appointments. A partner, family member, or friend is usually enough. If you are traveling to us or live alone, our [concierge team](/traveling-for-limb-lengthening) helps arrange near-clinic housing and can point you to private-duty care if you want an extra set of hands.

> **Staged, do not activate yet:** the five daily-living micro-FAQ spokes are all still Not Started, so no "Full guide" links appear above. When one publishes, add its link and swap that question's section here for the pre-written summary, so the spoke owns the FAQPage schema. Targets: using-the-toilet-after-limb-lengthening, stairs-after-limb-lengthening, showering-after-limb-lengthening, caregiver-after-limb-lengthening, limb-lengthening-recovery-equipment.

For the week-by-week clinical picture, see [the full recovery timeline](/your-surgery/limb-lengthening-expectations).
`;

const faqItems = [
  {
    q: "Can I climb stairs after limb lengthening surgery?",
    a: "Yes, slowly and with a handrail, often with a helper for the first few days. Many patients plan to live on one level for the first week or two, then add stairs back as strength returns.",
  },
  {
    q: "How do I use the toilet after limb lengthening?",
    a: "Use a raised toilet seat plus a grab bar, or a bedside commode with arms, so you lift yourself with your arms. Set it up before surgery. Most patients are independent quickly.",
  },
  {
    q: "Do I need a caregiver or nurse after limb lengthening?",
    a: "Usually not a live-in nurse, but plan for a helper for the first several days. A partner, family member, or friend is typically enough, and private-duty care is optional.",
  },
  {
    q: "How do I shower after limb lengthening?",
    a: "Sit on a shower chair or transfer bench, use a handheld showerhead and non-slip mat, and keep dressings dry as instructed until Dr. B clears getting the incisions wet.",
  },
] as const;

export default function DailyLifeDuringRecoveryPage() {
  return (
    <>
      <NavV2 forceVisible />

      <article className="bg-paper-off">
        <CoverHero
          eyebrow="Your Surgery · Recovery"
          title="Daily Life During"
          accent="Recovery"
          deck="Stairs, bathrooms, and help at home. Most patients manage daily life with a walker and a few inexpensive bathroom aids, and no live-in nurse."
        />

        <section className="bg-paper-off py-16 lg:py-24">
          <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-8">
              <p className="eyebrow mb-5">The Practical Side</p>
              <p className="font-serif text-[22px] lg:text-[28px] leading-[1.45] text-ink">
                Most patients can manage daily life at home during limb
                lengthening recovery with a walker and a few inexpensive bathroom
                aids, and no live-in nurse. You will be up and moving with
                support within days. Stairs, the toilet, and showering are all
                doable with the right setup, which is easiest to arrange before
                surgery.
              </p>
              <p className="mt-7 text-[16px] leading-[1.75] text-ink-soft">
                For the week-by-week clinical picture, see{" "}
                <a href="/your-surgery/limb-lengthening-expectations">
                  the full recovery timeline
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="bg-paper py-10 lg:py-16 border-b border-rule">
          <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <figure>
              <Image
                src="/images/your-surgery/expectations-recovery-space.webp"
                alt="Placeholder image, pending the room-by-room home-prep checklist"
                width={1024}
                height={1024}
                className="w-full h-auto border border-rule"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                Placeholder art. Replace with the room-by-room home-prep
                checklist graphic.
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/your-surgery/expectations-timeline.webp"
                alt="Placeholder image, pending the equipment shopping list"
                width={1024}
                height={1024}
                className="w-full h-auto border border-rule"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                Placeholder art. Replace with the equipment shopping list visual.
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="mx-auto max-w-wrap px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-8">
            <Prose>{body}</Prose>
            <PillarFaq items={faqItems} />
          </Reveal>
        </div>
      </article>

      <FinalCta />
      <FooterV2 />
    </>
  );
}
