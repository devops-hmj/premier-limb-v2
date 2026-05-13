import {
  Arrow,
  Button,
  Container,
  Eyebrow,
  Rule,
} from "@/components/primitives";

/**
 * Candidate — "Who is a good candidate for limb lengthening?"
 *
 * Structural twin of the Concierge section but inverted by intent:
 *   • Concierge: left = sticky pitch · right = 5 numbered pillars
 *   • Candidate: left = pitch + the 8-item checklist · right = sticky aside
 *
 * Lives at § 03, directly after Concierge — the question "do I qualify?"
 * naturally follows the program pitch.
 *
 * Copy is verbatim from the supplied wireframe. The bullets are medical
 * eligibility criteria — do not paraphrase without sign-off.
 */

const criteria = [
  "Generally healthy adults aged 18–55 (older patients evaluated case-by-case)",
  "Non-smoker or willing to quit 6 weeks before surgery",
  "BMI under 35 (ideal under 30)",
  "No active bone disease or uncontrolled diabetes",
  "Able to commit to 3–6 months of recovery and physical therapy",
  'Realistic expectations about height gain (2–3" per bone, up to 6" combined)',
  "Cosmetic height enhancement OR limb-length discrepancy correction",
  "Revision patients: previous surgery complications or unsatisfactory results",
] as const;

export function Candidate() {
  return (
    <section
      id="candidate"
      className="bg-paper-off border-b border-rule py-section lg:py-section-xl"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">
          {/* ===== Left column — heading, intro, eligibility checklist ===== */}
          <div>
            <Eyebrow>Am I a Candidate? · § 02</Eyebrow>
            <h2
              className="
                font-serif font-medium mt-7
                text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.98]
                tracking-[-0.02em] [&_em]:italic [&_em]:text-spine
                [text-wrap:balance]
              "
            >
              Who Is a <em>Good Candidate</em> for Limb Lengthening?
            </h2>
            <p className="mt-7 max-w-prose text-t-l text-ink-soft leading-[1.65]">
              Most healthy adults are candidates. Here&rsquo;s what Dr. Basmajian
              evaluates during your consultation.
            </p>

            <ul className="mt-10 flex flex-col">
              {criteria.map((c) => (
                <li
                  key={c}
                  className="grid grid-cols-[auto_1fr] gap-5 py-5 border-b border-rule last:border-b-0 items-start"
                >
                  <Check aria-hidden className="mt-1.5 text-action shrink-0" />
                  <span className="text-t-l text-ink leading-[1.55]">{c}</span>
                </li>
              ))}
            </ul>

            <Rule weight="hair" className="mt-section" />
          </div>

          {/* ===== Right column — sticky qualifying aside ===== */}
          <aside className="lg:sticky lg:top-28">
            <div className="surface-wash p-8 sm:p-10">
              <h3 className="font-serif font-medium text-d-s leading-[1.2] tracking-[-0.01em]">
                Not sure if you <em className="em-spine">qualify?</em>
              </h3>
              <p className="mt-5 text-t-m text-ink-soft leading-[1.65]">
                The best way to find out is through a confidential consultation.
                Dr. Basmajian evaluates each patient individually — many
                patients who were told &ldquo;no&rdquo; by other surgeons are
                candidates at our practice due to our trauma reconstruction
                expertise.
              </p>
              <div className="mt-8">
                <Button variant="action" as="a" href="/consult">
                  Schedule Your Assessment <Arrow />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      {...props}
    >
      <path d="M3 9.5 L7 13.5 L15 4.5" />
    </svg>
  );
}
