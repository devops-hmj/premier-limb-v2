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
 * /international-patients — canonical international-patient pillar and future
 * parent of the country spokes. Mirrors the unpublished WordPress draft
 * (post 361) built from the pll/seo-landing-page pattern.
 *
 * YMYL, LEGAL-REVIEW GATED. No treatment-outcome claim, success rate, or
 * guarantee appears anywhere on this page. Every legally sensitive statement
 * is left as a visible callout for a named human to write, never drafted here.
 * noindex until Legal and Dr. B sign off.
 */
export const metadata: Metadata = {
  title: "Limb Lengthening for International Patients in the USA",
  description:
    "Limb lengthening for international patients traveling to the United States. How remote consultation, surgery, the in-country stay, and telehealth follow-up work.",
  alternates: { canonical: "/international-patients" },
  robots: { index: false, follow: false },
};

const body = `
Patients search for this care under several phrases, including limb lengthening for international patients, international limb lengthening in the USA, and traveling to the US for limb lengthening. They describe the same path: a patient whose home is in another country choosing to have the procedure performed in the United States. This page explains why patients make that choice, how the practice supports an international stay, and what the process looks like from first contact to the flight home.

## Why patients travel to the United States

Patients travel from abroad for limb lengthening for reasons that are practical rather than promotional. The most common are access to the internal lengthening method, the experience of a board-certified US surgical and anesthesia team, and the availability of care for patients who need revision of surgery performed elsewhere. The procedure itself is the same operation described in full on the procedure pillar.

- Access to the internal lengthening method, in which the hardware sits inside the bone rather than in an external frame.
- Care delivered by a board-certified US orthopedic surgeon and a US anesthesia team.
- Experience with patients who are seeking revision of a prior limb lengthening performed in another setting.
- A care team accustomed to coordinating treatment for patients who live outside the United States.

> **Fill required, Legal, do not guess:** if this section is to say anything about device availability, regulatory clearance, or how care in the United States compares to care in other countries, insert the legal-approved cross-border and medical-tourism language here verbatim. Do not draft comparative-regulatory statements. Until Legal supplies this language, the reasons above stay framed only as what the practice offers, with no claim about other countries.

## The concierge program

A patient who travels from another country is away from home for an extended treatment period, so the practice runs a coordinated concierge program alongside the medical care. The program exists to handle the practical side of an international stay with the same care applied to the surgery, so the patient can focus on treatment and recovery.

> **Fill required, Legal, do not guess:** legal-approved concierge-scope language goes here, the exact statement of what Premier Limb Lengthening arranges versus what the patient arranges, covering housing, local and airport transport, visa and travel-document support, translation, companion support, and post-return aftercare. Must match legal-approved language verbatim, including whether any element is included versus an add-on. Do not list specific services as commitments until Legal signs off.

## How the process works for a patient flying in

The process is built around one reality: the patient is coordinating international travel around a months-long course of treatment. It runs in a set sequence, from the first remote consultation to follow-up after the return flight. The clinical detail of the operation and its phases lives on the procedure pillar. The sequence below is the international-travel view of that same care.

1. Remote consultation and imaging review. The patient shares imaging and history and meets the care team by video before making any travel plans.
2. Planning and scheduling. Once the patient is a candidate, a surgery date is set and travel and documentation planning begins.
3. Arrival and surgery. The patient travels to the practice in California and has the procedure.
4. The in-country stay. The patient remains in the United States through the early lengthening period so the team can monitor progress in person.
5. Return home. When the care team clears the patient to travel, the patient flies home to continue the consolidation period.
6. Telehealth follow-up. Follow-up continues by video with the care team after the patient is home.

> **Fill required, Dr. B, do not guess:** confirm the minimum in-country stay and the point at which an international patient is typically cleared to fly home. Do not state any week count, distraction distance, or total timeline on this page until confirmed. Where a figure is needed, defer to the procedure and recovery pillars rather than restating it here.

## Dr. Basmajian's international training

International patients often ask about the surgeon's background. Dr. Basmajian completed a fellowship in Hannover, Germany, where he trained under Prof. Krettek. His full biography, credentials, and approach are on [his surgeon page](/dr-basmajian).

> **Fill required, Dr. B:** confirm the exact wording of the Hannover fellowship and the Prof. Krettek attribution, stated plainly with no embellishment. Separately, link the Hannover Story page here once it is built. That page does not exist yet, so do not create a placeholder URL.

## Planning your travel and stay

The day-to-day logistics of an international stay, including what to arrange for the time in California, are covered in full on the traveling page so this pillar stays focused on the medical decision. That companion page is the place for the practical checklist. This page is the place to understand why patients travel and how the care is structured.

Full guide: [traveling for limb lengthening](/traveling-for-limb-lengthening).

## What it costs

Cost is a bundle rather than a single figure, and it belongs on its own page so the numbers stay current. In short, limb lengthening in the United States is an out-of-pocket procedure whose price depends on the surgical plan. The full breakdown of what is included and how patients finance it lives on the pricing page.

Full guide: [limb lengthening pricing and options](/limb-lengthening-pricing-options).
`;

const faqItems = [
  {
    q: "Can international patients have limb lengthening in the United States?",
    a: "Yes. Patients travel to the United States from other countries for limb lengthening. The care is coordinated around an extended stay, with a remote consultation before travel, surgery and the early lengthening period in California, and telehealth follow-up after the patient returns home.",
  },
  {
    q: "How long do international patients need to stay in the United States?",
    a: "International patients stay through the early lengthening period and travel home once the care team clears them. FILL REQUIRED, DR. B: confirm the minimum in-country stay range. Do not state a week count until confirmed.",
  },
  {
    q: "Does the practice help international patients with travel, housing, and visas?",
    a: "A coordinated concierge program supports patients traveling from abroad. FILL REQUIRED, LEGAL: insert the legal-approved statement of exactly what the practice arranges versus what the patient arranges. Do not describe specific services as commitments until Legal signs off.",
  },
  {
    q: "What happens with follow-up after I return to my home country?",
    a: "Follow-up continues by telehealth with the care team after the patient returns home. The patient completes the consolidation period at home and stays in contact with the team by video.",
  },
  {
    q: "Who performs the procedure and what is his international training?",
    a: "Dr. Basmajian performs the procedure. He completed a fellowship in Hannover, Germany, under Prof. Krettek. His full background is on the surgeon page.",
  },
] as const;

export default function InternationalPatientsPage() {
  return (
    <>
      <NavV2 forceVisible />
      <DraftBanner
        owners={[
          "Legal (concierge scope, cross-border, visa)",
          "Dr. B (in-country stay, credentials)",
          "Jaime (brand and voice)",
        ]}
        note="YMYL, legal-review gated. The concierge-scope statement and any cross-border or regulatory language must be written verbatim by Legal, not drafted. Two FAQ answers are deliberately incomplete and say so inline."
      />

      <article className="bg-paper-off">
        <section className="border-b border-ink pt-20 lg:pt-28 pb-16 lg:pb-20">
          <div className="mx-auto max-w-wrap px-6 lg:px-12">
            <span className="eyebrow mb-5">International Patients</span>
            <h1 className="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[20ch] text-[clamp(40px,6.4vw,104px)]">
              Limb Lengthening for International{" "}
              <em className="italic text-spine">Patients.</em>
            </h1>
            <p className="mt-4 font-mono uppercase tracking-[0.14em] text-[11px] text-muted">
              Medically reviewed by{" "}
              <a href="/dr-basmajian" className="underline">
                Dr. Hrayr Basmajian
              </a>
            </p>
            <p className="mt-7 max-w-[62ch] font-serif italic text-[19px] lg:text-[22px] leading-[1.4] text-ink-soft">
              Limb lengthening for international patients is the same
              internal-nail procedure offered to patients who travel to the
              United States from another country. Patients complete imaging
              review and consultation remotely, travel to the practice in
              California for surgery, stay through the early lengthening period,
              and continue follow-up by telehealth after returning home.
            </p>
          </div>
        </section>

        <section className="bg-paper py-10 lg:py-16 border-b border-rule">
          <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <figure>
              <Image
                src="/images/your-surgery/how-much-taller-scale.webp"
                alt="Placeholder image, pending the process timeline graphic"
                width={1024}
                height={1024}
                className="w-full h-auto border border-rule"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                Placeholder art. Replace with the process timeline: remote
                consult, travel, surgery, in-country stay, return, telehealth.
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/images/your-surgery/how-much-taller-anatomy.webp"
                alt="Placeholder image, pending the world-map motif"
                width={1024}
                height={1024}
                className="w-full h-auto border border-rule"
              />
              <figcaption className="mt-3 font-serif italic text-[14.5px] leading-[1.5] text-muted">
                Placeholder art. Replace with the world-map motif. No outcome
                imagery and no before and after on this page.
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
