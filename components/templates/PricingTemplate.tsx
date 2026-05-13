import { Container, Eyebrow } from "@/components/primitives";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { CtaBanner } from "@/components/content/CtaBanner";
import { JsonLd } from "@/components/content/JsonLd";
import { pricingSchema } from "@/lib/jsonld";
import type { Page } from "@/lib/content";

type Props = { page: Page; crumbs: { name: string; href: string }[] };

/**
 * PricingTemplate — full pricing detail page.
 *
 * Renders the full pricing markdown verbatim via Prose (it already contains
 * the four tiers, inclusions, nail removal costs, etc.). Adds a heading and
 * a closing CTA. Emits ItemList of Service offers for rich-snippet eligibility.
 */
export function PricingTemplate({ page, crumbs }: Props) {
  return (
    <article>
      <section className="bg-paper-off border-b border-rule">
        <Container className="py-section">
          <Breadcrumbs items={crumbs} />

          <header className="mt-8 max-w-prose">
            <Eyebrow>Pricing · § Detail</Eyebrow>
            <h1 className="mt-5 font-serif font-medium text-[clamp(2.5rem,5vw,5rem)] leading-[0.96] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine [text-wrap:balance]">
              Limb Lengthening <em>Pricing</em> Options.
            </h1>
            <p className="mt-6 font-serif italic text-d-s leading-[1.4] text-ink-soft">
              {page.description}
            </p>
          </header>

          <div className="mt-12 max-w-prose">
            <Prose skipFirstParagraph>{page.body}</Prose>
          </div>
        </Container>
      </section>

      <CtaBanner
        headline={
          <>
            Pricing is a starting point — <em>not the conversation.</em>
          </>
        }
        body="Schedule a confidential consultation to discuss your specific case and the total investment."
      />

      <JsonLd
        data={pricingSchema([
          { name: "Precice 4th-Gen (Max) Femur Lengthening", price: "$80,000", available: "https://schema.org/PreOrder" },
          { name: "Precice 4th-Gen (Max) Tibia Lengthening", price: "$85,000", available: "https://schema.org/PreOrder" },
          { name: "Precice 2.2 Femur Lengthening", price: "$77,500" },
          { name: "Precice 2.2 Tibia Lengthening", price: "$83,000" },
        ])}
      />
    </article>
  );
}
