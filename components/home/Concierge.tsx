import {
  Arrow,
  Button,
  Container,
  Eyebrow,
  Rule,
  StatGrid,
} from "@/components/primitives";

/**
 * Concierge — the white-glove travel program section.
 * All copy verbatim from scraped_content/netlify_homepage.md.
 * Bullets keep their original heading→description structure (bold lead-in).
 */

const pillars = [
  {
    title: "Travel Coordination",
    body:
      "Flight booking assistance, airport transfers, and ground transportation throughout your stay in Southern California.",
  },
  {
    title: "Recovery Accommodations",
    body:
      "Pre-vetted, surgeon-approved extended-stay housing near our Pomona facility. Wheelchair-accessible, fully furnished, discounted rates.",
  },
  {
    title: "PT & Follow-Up Scheduling",
    body:
      "Your physical therapy schedule is set before you arrive. All post-op visits coordinated. Nothing falls through the cracks.",
  },
  {
    title: "Dedicated Patient Coordinator",
    body:
      "One person. One phone number. From your first call through your final follow-up. Available 7 days a week during your recovery.",
  },
  {
    title: "Virtual Pre-Op & Remote Follow-Up",
    body:
      "Initial consultation via secure video. Post-op check-ins from home once you return. Minimizes trips to California.",
  },
] as const;

export function Concierge() {
  return (
    <section className="bg-paper-off border-b border-rule py-section lg:py-section-xl">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] xl:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>The Concierge Program · § 04</Eyebrow>
            {/* Clamp keeps the headline from collapsing into 7 stubby lines at
                tablet-l. Range 32-56px scales with the column width. */}
            <h2 className="font-serif font-medium mt-7 text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.02] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine">
              You focus on your <em>transformation.</em><br />We handle everything else.
            </h2>
            <p className="mt-8 max-w-prose text-t-l text-ink-soft leading-[1.65]">
              Most limb lengthening patients travel for their procedure — and most
              clinics leave you to figure out the logistics alone. Not here.
              Premier Limb Lengthening is the only practice offering a full
              white-glove concierge program that coordinates every detail of your
              surgical journey.
            </p>

            <div className="mt-10 flex flex-wrap gap-3.5">
              <Button variant="spine" as="a" href="/concierge">
                Learn About Our Concierge Program <Arrow />
              </Button>
              <Button variant="ghost" as="a" href="/consult#virtual">
                Schedule a Virtual Consultation <Arrow />
              </Button>
            </div>

            <div className="mt-12">
              <StatGrid
                items={[
                  { n: <><em>50+</em></>, label: "States & Countries Served" },
                  { n: <em>100%</em>, label: "Logistics Handled" },
                ]}
              />
            </div>
          </div>

          <ol className="flex flex-col">
            {pillars.map((p, i) => (
              // Hover lift: editorial 3px translate, accompanied by a spine
              // rule that sweeps in from the left and a color shift on the
              // numeral + heading. Stays restrained per the brand voice.
              <li
                key={p.title}
                className="
                  group relative grid grid-cols-[auto_1fr] gap-7 py-8
                  border-b border-rule last:border-b-0
                  transition-transform duration-300 ease-out
                  hover:-translate-y-[3px]
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0
                "
              >
                {/* Leading spine accent — animates in on hover. */}
                <span
                  aria-hidden
                  className="
                    pointer-events-none absolute left-0 top-9
                    h-px bg-spine
                    w-0 group-hover:w-5
                    transition-[width] duration-300 ease-out
                    motion-reduce:transition-none
                  "
                />
                <div
                  className="
                    font-mono text-eyebrow tracking-eyebrow uppercase text-spine pt-1
                    transition-transform duration-300 ease-out
                    group-hover:translate-x-1
                    motion-reduce:transition-none motion-reduce:group-hover:translate-x-0
                  "
                >
                  Nº 0{i + 1}
                </div>
                <div>
                  <h3 className="font-serif font-medium text-d-s leading-[1.15] tracking-[-0.01em] transition-colors duration-300 group-hover:text-spine">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-t-l text-ink-soft leading-[1.65]">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Rule weight="hair" className="mt-section" />
      </Container>
    </section>
  );
}
