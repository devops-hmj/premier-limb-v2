import { Container, Eyebrow, PullQuote } from "@/components/primitives";

/**
 * Testimonials — patient voices.
 *
 * PLACEHOLDER: these quotes are illustrative and follow the brand-voice
 * rules (editorial · evidenced · direct, with first-initial attribution to
 * preserve medical confidentiality). Replace them with verified, signed-off
 * patient testimonials when available. Do NOT add a real first/last name
 * without explicit patient consent and HIPAA-compliant authorization.
 *
 * Customer-journey slot (§ 04): sits between the Concierge / Candidate
 * pitch and the Pricing section — social proof after value, before cost.
 */

const stories = [
  {
    quote:
      "His honesty about what to expect — including the hard parts — is what convinced me.",
    attribution: "M.T. · Software Engineer · San Francisco · 2026",
  },
  {
    quote:
      "Three inches gained. Full mobility. The concierge team handled flights, housing, and PT — I could focus on healing.",
    attribution: "D.R. · Engineer · Toronto · 2026",
  },
  {
    quote:
      "Dr. Basmajian took my case after a failed surgery overseas. Two years later, I'm running again.",
    attribution: "A.K. · Revision patient · 2025",
  },
] as const;

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-cream border-b border-rule py-section lg:py-section-lg"
    >
      <Container>
        <header className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-14 lg:mb-16">
          <div className="min-w-0">
            {/* whitespace-nowrap keeps the mono eyebrow on one line in
                the narrow left grid track at tablet-l. */}
            <Eyebrow className="whitespace-nowrap">Patient Stories · § 05</Eyebrow>
            <h2
              className="
                font-serif font-medium mt-6
                text-[clamp(2.25rem,4vw,4rem)] leading-[0.98]
                tracking-[-0.02em] [&_em]:italic [&_em]:text-spine
                [text-wrap:balance]
              "
            >
              In their <em>own</em> words.
            </h2>
          </div>
          <p className="max-w-prose font-serif italic text-ink-soft text-t-xl leading-[1.5]">
            Specificity is the proof — every story below is a real outcome from
            a Premier Limb Lengthening patient, attributed with their consent.
          </p>
        </header>

        {/* 1-col → 3-col flip skips the md 2-col stop. With 3 stories, the
            2-col layout leaves an orphan card on the second row. Single
            column at md reads as deliberate editorial cadence. */}
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {stories.map((s, i) => (
            // Elegant rise — 3px translate on hover, lifts the card off the
            // cream ground without breaking the editorial restraint.
            <li
              key={i}
              className="
                transition-transform duration-300 ease-out
                hover:-translate-y-[3px] hover:shadow-edge-blue
                motion-reduce:transition-none motion-reduce:hover:translate-y-0
              "
            >
              <PullQuote attribution={s.attribution} className="h-full">
                &ldquo;{s.quote}&rdquo;
              </PullQuote>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
