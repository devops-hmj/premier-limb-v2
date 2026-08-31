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
 * /traveling-for-limb-lengthening — concierge and logistics deep-dive that the
 * International Patients pillar links down to. Mirrors the unpublished
 * WordPress draft (post 362) built from the pll/seo-landing-page pattern.
 *
 * DRAFT, noindex. The minimum local-stay figure is unverified clinical copy
 * carried over from the source draft and is flagged inline.
 */
export const metadata: Metadata = {
  title: "Traveling for Limb Lengthening: The Trip, the Stay, and Getting Home",
  description:
    "Traveling for limb lengthening surgery, step by step. Fly into Ontario airport (ONT), stay near the Upland, California clinic, then head home for remote follow-up.",
  alternates: { canonical: "/traveling-for-limb-lengthening" },
  robots: { index: false, follow: false },
};

const body = `
Most people who search for traveling for limb lengthening are planning a trip to a clinic that is not in their home city. Some are flying in from another U.S. state, and others are coming from abroad. This guide walks through the whole trip, from the airport to the drive home, so the travel is the easy part and your energy stays on recovery.

## Which airport do you fly into?

The clinic is in Upland, California, in the Inland Empire east of Los Angeles, and surgery takes place at Pomona Valley Hospital Medical Center. The closest airport is Ontario International Airport (ONT), a calm regional airport a short drive away. ONT is easier to land in and move through than the larger Los Angeles airports, which matters when a leg is healing and a long terminal walk is the last thing you want.

If a direct flight into ONT is not available from your city, Los Angeles International (LAX) and other regional airports are alternatives. The trade-off is a shorter flight against a longer drive, and it is worth mapping out before you book.

| | Ontario International (ONT) | Los Angeles International (LAX) |
| --- | --- | --- |
| Distance to the clinic | Short drive | Longer drive, more traffic |
| Airport size | Small and easy to move through | Large, with long walks between gates |
| Direct flights | Fewer from some cities | More from most cities |
| Best for | The shortest drive on surgery week | The widest flight availability |

## Your trip, step by step

Every trip is a little different, but the shape is the same from booking to the flight home. Here is the sequence most patients follow.

1. You complete your consultation and lock in surgery dates with the clinic.
2. You arrange near-clinic housing with help from the concierge and book your flight into Ontario International Airport (ONT).
3. A companion travels with you, and you settle into your housing before surgery day.
4. Surgery takes place at Pomona Valley Hospital Medical Center, followed by your local stay and first in-person checks.
5. Your surgeon clears you to travel, and you fly home to continue the lengthening phase.
6. Follow-up continues remotely, with imaging near home and any return visits your surgeon requests.

## How long do you stay near the clinic?

Plan to stay near the clinic for a minimum local period after surgery so your surgeon can confirm the bone and soft tissue are responding well before you travel. For many patients this is around ten days, though the exact length depends on your procedure and your progress.

> **Fill required, Dr. B, clinical:** confirm the current minimum-stay protocol. Stay length is a clinical decision. The ten-day figure above and the matching FAQ answer both come from the draft and are unverified.

That first stretch near the clinic covers surgery day, the earliest healing, the start of the lengthening phase, and your first in-person checks. What each of those days feels like, and the physical therapy that comes with them, is covered in full on [the recovery page](/your-surgery/limb-lengthening-expectations). This page stays on the logistics of being away from home.

## Where do you stay?

A patient concierge helps you arrange housing close to the clinic, so you are not managing a hotel search while preparing for surgery. Near-clinic housing keeps the daily drive to appointments short and gives a companion room to help you recover.

> **Fill required, Legal and Jaime:** confirm the exact concierge scope, what the clinic arranges versus what the patient books, in legal-approved wording. Do not describe the scope beyond what is approved. Separately, add any housing partners or nightly rates the concierge can share, with no invented prices.

When you compare places to stay, a few things matter more than the usual travel priorities.

- A short, low-traffic drive to the clinic for daily appointments.
- Step-free entry, or a reliable elevator, since stairs are hard early in recovery.
- Room for a walker or wheelchair to move through easily.
- Space for a companion to stay and help.

## Getting to your appointments, and bringing a companion

Appointments are frequent in the first days and then space out. Because near-clinic housing keeps you close, most patients arrange a short ride to each visit rather than renting a car and driving in the early weeks, when a healing leg makes pressing pedals uncomfortable. A companion who can drive, or a local rideshare, covers most trips.

Bringing a companion is strongly encouraged. A partner, family member, or friend helps with daily tasks, drives you to appointments, and supports you through the first weeks when moving around is hard. If you plan to travel alone, raise it during your consultation so the right support can be planned. A companion also makes the trip itself easier, from managing bags at the airport to handling the drive from ONT to your housing on surgery week.

## How follow-up works after you go home

After your local stay, you fly home and continue the lengthening phase there, turning the nail on your daily schedule and staying in contact with the clinic. Follow-up combines remote check-ins with any imaging your surgeon requests near home.

> **Fill required, Dr. B, clinical:** confirm the remote follow-up and imaging protocol, including any return visits.

The lengthening and consolidation phases stretch across the better part of a year, and most of that time is spent at home rather than near the clinic. The full week-by-week timeline lives on [the recovery page](/your-surgery/limb-lengthening-expectations).

## Traveling from outside the United States

International patients follow the same path with a few extra steps. You will plan for a longer total trip, travel documents, and the flight home once your surgeon clears you. The dedicated overview for patients traveling from abroad is [the International Patients guide](/international-patients), which this page supports. A visa support letter and a virtual first consultation are planned so patients can begin from home before they travel.

> **Fill required, Jaime:** the visa letter and the virtual consultation are future offerings. Reference them as planned only. Do not promise either until it is live. The same caveat applies to the international FAQ answer below.

## What does traveling for surgery cost?

Travel costs like flights and housing sit on top of the procedure itself, and they vary with where you are coming from and how long you stay. Rather than quote figures that go stale, the full pricing picture, including what the procedure covers, lives on [the pricing page](/limb-lengthening-pricing-options).

> **Fill required, Jaime:** confirm whether any travel or housing figures should appear on this page at all.
`;

const faqItems = [
  {
    q: "Which airport do you fly into for limb lengthening surgery?",
    a: "Fly into Ontario International Airport (ONT), the closest airport to the clinic in Upland, California. It is a short drive from the clinic and easier to move through than the larger Los Angeles airports, which helps when your leg is healing.",
  },
  {
    q: "How long do you have to stay near the clinic?",
    a: "Plan for a minimum local stay after surgery, often around ten days, before your surgeon clears you to fly home. The exact length depends on your procedure and how you are healing, so confirm it during your consultation. FILL REQUIRED, DR. B: the ten-day figure is unverified.",
  },
  {
    q: "Do I need someone to travel with me?",
    a: "A companion is strongly encouraged. They help with daily tasks, drive you to appointments, and support you through the first weeks. If you plan to travel alone, mention it during your consultation so support can be arranged.",
  },
  {
    q: "Where do patients stay during treatment?",
    a: "Most patients stay in near-clinic housing arranged with help from a patient concierge, which keeps the daily drive to appointments short. Look for step-free access and room for a companion and mobility aids.",
  },
  {
    q: "Can I go home during the lengthening phase?",
    a: "Yes. After your local stay, most patients fly home and continue the lengthening phase there, staying in contact with the clinic for remote follow-up and any imaging near home.",
  },
  {
    q: "Can international patients have surgery here?",
    a: "Yes. International patients follow the same path with extra planning for travel documents and a longer trip. A visa support letter and a virtual first consultation are planned to help patients start from home.",
  },
] as const;

export default function TravelingForLimbLengtheningPage() {
  return (
    <>
      <NavV2 forceVisible />
      <DraftBanner
        owners={[
          "Dr. B (minimum stay, follow-up protocol)",
          "Legal and Jaime (concierge scope)",
          "Jaime (travel pricing, visa letter)",
        ]}
        note="Logistics deep-dive under the International Patients pillar. The ten-day minimum local stay is carried over unverified from the source draft and needs Dr. B to confirm or correct it before this goes anywhere near publication."
      />

      <article className="bg-paper-off">
        <section className="border-b border-ink pt-14 lg:pt-20 pb-16 lg:pb-20">
          <div className="mx-auto max-w-wrap px-6 lg:px-12">
            <span className="eyebrow mb-5">International Patients · Travel</span>
            <h1 className="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[20ch] text-[clamp(40px,6.4vw,104px)]">
              Traveling for Limb{" "}
              <em className="italic text-spine">Lengthening.</em>
            </h1>
            <p className="mt-4 font-mono uppercase tracking-[0.14em] text-[11px] text-muted">
              Medically reviewed by{" "}
              <a href="/dr-basmajian" className="underline">
                Dr. Hrayr Basmajian
              </a>
            </p>
            <p className="mt-7 max-w-[62ch] font-serif italic text-[19px] lg:text-[22px] leading-[1.4] text-ink-soft">
              Traveling for limb lengthening means flying into Ontario
              International Airport, staying near the Upland, California clinic
              for a short local period around surgery, then returning home for
              remote follow-up. A patient concierge helps you arrange near-clinic
              housing, so the logistics are handled before you ever board a plane.
            </p>
          </div>
        </section>

        <section className="bg-paper py-10 lg:py-16 border-b border-rule">
          <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <figure>
              <Image
                src="/images/your-surgery/how-much-taller-scale.webp"
                alt="Placeholder image, pending the ONT to Upland map"
                width={1024}
                height={1024}
                className="w-full h-auto border border-rule"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                Placeholder art. Replace with the map from Ontario International
                Airport to the Upland clinic.
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/your-surgery/how-much-taller-anatomy.webp"
                alt="Placeholder image, pending the trip timeline graphic"
                width={1024}
                height={1024}
                className="w-full h-auto border border-rule"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                Placeholder art. Replace with the trip timeline and the
                near-clinic housing checklist visual.
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
