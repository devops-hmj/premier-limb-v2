import { Container, Eyebrow } from "@/components/primitives";

/**
 * Faq — frequently asked questions section.
 *
 * Implementation: native `<details>/<summary>` so the section works without
 * JavaScript, is keyboard-accessible by default, and is announced correctly
 * by screen readers. Markers and focus rings styled to match the editorial
 * system (sharp corners, mono eyebrow, italic-spine accent).
 *
 * For SEO: emits FAQPage JSON-LD so Google can show rich snippets.
 *
 * Content captured verbatim from the source FAQ — do not paraphrase medical
 * details. If you need to update an answer, edit the `items` array.
 */

type FaqItemData = { q: string; a: string };

const items: FaqItemData[] = [
  {
    q: "How much does limb lengthening surgery cost?",
    a: "Femur lengthening starts at $77,500 and tibia lengthening at $83,000 at Premier Limb Lengthening. This includes surgery, anesthesia, the Precice nail implant, hospitalization, and follow-up care. Financing through CareCredit is available.",
  },
  {
    q: "How much taller can limb lengthening make me?",
    a: "Femur lengthening can add up to 3 inches (8cm). Tibia lengthening adds another 2–3 inches. Combined staged procedures can achieve 5–6 inches total. Dr. Basmajian will discuss realistic expectations for your body during your consultation.",
  },
  {
    q: "Does limb lengthening hurt?",
    a: "Internal nail technology (Precice) is significantly less painful than older external fixation methods. Most patients describe discomfort rather than severe pain. Dr. Basmajian provides a comprehensive pain management protocol tailored to each patient.",
  },
  {
    q: "How long is the recovery?",
    a: "Active lengthening takes 3–4 months. Most patients return to desk work within 2–4 weeks and daily activities within 3–4 months. Full recovery to unrestricted activity takes 6–12 months. Physical therapy begins immediately after surgery.",
  },
  {
    q: "Is there an age limit for limb lengthening?",
    a: "Most patients are between 18 and 55, but there is no strict upper age limit. Dr. Basmajian evaluates each patient individually based on overall health, bone density, and lifestyle. Patients over 50 may be excellent candidates with proper evaluation.",
  },
  {
    q: "Does insurance cover limb lengthening?",
    a: "Cosmetic limb lengthening is not covered by insurance. However, insurance may cover related expenses such as physical therapy, medications, and treatment of complications. Limb lengthening for medical conditions (limb-length discrepancy) may have partial coverage.",
  },
  {
    q: "What if I live out of state?",
    a: "Premier Limb Lengthening offers a full concierge travel program for out-of-area patients. We coordinate flights, accommodations, ground transportation, and recovery housing. Virtual consultations are available for your initial evaluation.",
  },
  {
    q: "Can I get limb lengthening if a previous surgery failed?",
    a: "Yes. Dr. Basmajian's background in orthopaedic trauma reconstruction makes him uniquely qualified for revision cases. He regularly treats patients who experienced complications or unsatisfactory results from surgery performed elsewhere, including internationally.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-cream border-b border-rule">
      <Container className="py-section lg:py-section-lg">
        <header className="text-center mb-12 lg:mb-16">
          <div className="inline-flex">
            <Eyebrow>Common Questions · § 07</Eyebrow>
          </div>
          <h2
            className="
              font-serif font-medium mt-6
              text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.98]
              tracking-[-0.02em] [&_em]:italic [&_em]:text-spine
              [text-wrap:balance]
            "
          >
            Frequently <em>Asked</em> Questions
          </h2>
          <p className="mt-6 mx-auto max-w-prose font-serif italic text-ink-soft text-t-xl leading-[1.5]">
            Get answers to the most common limb lengthening questions. For a
            complete list,{" "}
            <a
              href="/faq"
              className="not-italic font-medium text-spine underline decoration-spine/40 underline-offset-4 hover:decoration-spine transition-colors"
            >
              visit our full FAQ page
            </a>
            .
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {items.map((item, i) => (
            <li key={i} className="h-full">
              <FaqItem item={item} />
            </li>
          ))}
        </ul>
      </Container>

      {/* Rich-result schema. Sits inside the section so it's co-located with
          the visible content; Google ingests it for FAQ rich snippets. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}

function FaqItem({ item }: { item: FaqItemData }) {
  return (
    <details className="group bg-paper border border-ink h-full">
      <summary
        className="
          flex items-center justify-between gap-4
          p-6 sm:p-7
          min-h-[120px] sm:min-h-[140px]
          cursor-pointer list-none
          [&::-webkit-details-marker]:hidden
          hover:bg-spine-tint transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spine focus-visible:ring-offset-2 focus-visible:ring-offset-cream
        "
      >
        {/* Subhead Italic Voice — design system D-M (serif italic, leading 1.15).
            <em> inside a question (if any) reverts to non-italic spine accent. */}
        <span className="font-serif italic font-medium text-[clamp(1.375rem,1.7vw,1.75rem)] leading-[1.15] tracking-[-0.005em] pr-2 [&_em]:not-italic [&_em]:text-spine">
          {item.q}
        </span>
        {/* Plus glyph rotates 45° to become an × when the panel is open.
            `aria-hidden` because <summary> already announces the toggle role. */}
        <span
          aria-hidden
          className="
            shrink-0 mt-1 select-none
            font-mono text-spine text-[24px] leading-none
            transition-transform duration-200 ease-out
            group-open:rotate-45
            motion-reduce:transition-none
          "
        >
          +
        </span>
      </summary>
      <div className="px-6 pb-6 sm:px-7 sm:pb-7">
        <div className="border-t border-rule pt-5">
          <p className="text-t-m text-ink-soft leading-[1.65]">{item.a}</p>
        </div>
      </div>
    </details>
  );
}
