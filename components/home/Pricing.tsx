import {
  Arrow,
  Button,
  Container,
  Eyebrow,
} from "@/components/primitives";

/**
 * Pricing — the transparent-pricing section.
 *
 * Layout: three tier cards in a row, the middle highlighted as MOST POPULAR
 * with a spine-blue top band. Sharp corners and ink borders per the design
 * system; the middle card uses a ring offset so it lifts off the page
 * without breaking the editorial surface rules.
 *
 * Copy is verbatim from the supplied wireframe. Prices, financing terms,
 * and inclusions are medical/financial canon — DO NOT paraphrase.
 *
 * Customer-journey slot (§ 05): sits between Testimonials (proof) and FAQ
 * (objection-handling) — once value and proof are established, cost goes
 * here, transparency-first.
 */

type Tier = {
  name: string;
  subName: string;
  price: string;
  priceNote: string;
  features: readonly string[];
  highlighted?: boolean;
};

const tiers: readonly Tier[] = [
  {
    name: "Femur Lengthening",
    subName: "Precice 2.2 Internal Nail",
    price: "$77,500",
    priceNote: "Starting from",
    features: [
      "Surgery + anesthesia",
      "Precice 2.2 nail implant",
      "Hospital stay (1–2 nights)",
      "Post-op follow-up visits",
      "Height gain: up to 3 inches",
    ],
  },
  {
    name: "Femur Lengthening",
    subName: "Precice 4th-Gen (MAX) Nail",
    price: "$80,000",
    priceNote: "Latest technology",
    features: [
      "Surgery + anesthesia",
      "Precice MAX nail (4th gen)",
      "Hospital stay (1–2 nights)",
      "Post-op follow-up visits",
      "Height gain: up to 3 inches",
    ],
    highlighted: true,
  },
  {
    name: "Tibia Lengthening",
    subName: "Precice Internal Nail",
    price: "$83,000–$85,000",
    priceNote: "Depending on nail generation",
    features: [
      "Surgery + anesthesia",
      "Precice nail implant",
      "Hospital stay (1–2 nights)",
      "Post-op follow-up visits",
      "Height gain: up to 2–3 inches",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="
        scroll-mt-24
        bg-paper-off border-b border-rule
        py-8 sm:py-10 lg:py-12
        lg:min-h-[calc(100svh-72px)] lg:flex lg:flex-col lg:justify-center
      "
    >
      <Container>
        <header className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
          <div className="inline-flex">
            <Eyebrow>Transparent Pricing · § 06</Eyebrow>
          </div>
          <h2
            className="
              font-serif font-medium mt-3
              text-[clamp(1.5rem,2.4vw,2.5rem)] leading-[1.04]
              tracking-[-0.02em] [&_em]:italic [&_em]:text-spine
              [text-wrap:balance]
            "
          >
            Limb Lengthening Surgery <em>Cost.</em>
          </h2>
          <p className="mt-3 mx-auto max-w-prose font-serif italic text-ink-soft text-t-s sm:text-t-m leading-[1.5]">
            No hidden fees. Every quote includes surgery, implant, anesthesia,
            hospitalization, and follow-up care.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {tiers.map((t, i) => (
            <li key={i} className="flex">
              <TierCard tier={t} />
            </li>
          ))}
        </ul>

        <footer className="mt-6 lg:mt-8 flex flex-col items-center gap-3">
          <p className="font-serif italic text-t-s text-ink-soft text-center max-w-prose">
            Financing available through CareCredit. As low as $1,200/month with
            approved credit.
          </p>
          <Button variant="spine" as="a" href="/limb-lengthening-pricing-options">
            View Full Pricing Details <Arrow />
          </Button>
        </footer>
      </Container>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <article
      className={`
        group/card relative flex flex-col w-full bg-paper border border-ink
        transition-transform duration-300 ease-out
        hover:-translate-y-2
        motion-reduce:transition-none motion-reduce:hover:translate-y-0
        ${tier.highlighted ? "lg:-translate-y-2 lg:hover:-translate-y-4 shadow-edge-blue" : ""}
      `}
    >
      {tier.highlighted && (
        <div className="bg-spine text-paper text-center py-1.5 font-mono text-eyebrow tracking-eyebrow uppercase">
          Most Popular
        </div>
      )}

      <div className="flex-1 flex flex-col p-4 sm:p-5">
        <header className="text-center">
          <h3 className="font-serif font-medium text-[20px] leading-[1.15] tracking-[-0.01em] [&_em]:italic [&_em]:text-spine transition-colors duration-300 group-hover/card:text-spine">
            {tier.name}
          </h3>
          <p className="mt-1 font-mono text-[10px] tracking-eyebrow uppercase text-muted">
            {tier.subName}
          </p>

          <div className="mt-4">
            <div className="font-serif font-medium text-[clamp(1.5rem,2.3vw,2rem)] leading-none tracking-[-0.02em] text-ink">
              {tier.price}
            </div>
            <p className="mt-1.5 font-mono text-[10px] tracking-eyebrow uppercase text-muted">
              {tier.priceNote}
            </p>
          </div>
        </header>

        <ul className="mt-4 flex flex-col gap-2 border-t border-rule pt-4">
          {tier.features.map((f) => (
            <li key={f} className="grid grid-cols-[auto_1fr] gap-2 items-start">
              <Check aria-hidden className="mt-0.5 text-action shrink-0" />
              <span className="text-[13px] text-ink leading-[1.5]">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
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
