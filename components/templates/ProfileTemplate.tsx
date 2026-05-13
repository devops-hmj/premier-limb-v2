import Image from "next/image";
import { Arrow, Button, Container, Eyebrow, StatGrid } from "@/components/primitives";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { CtaBanner } from "@/components/content/CtaBanner";
import { JsonLd } from "@/components/content/JsonLd";
import { physicianSchema } from "@/lib/jsonld";
import type { Page } from "@/lib/content";

type Props = { page: Page; crumbs: { name: string; href: string }[] };

/**
 * ProfileTemplate — Dr. Basmajian's bio page (single page).
 *
 * Hero: portrait on the left at lg+, eyebrow + h1 + credentials + CTA row on
 * the right. Body below in prose. Stat grid + CV download card sit between
 * body sections.
 */
export function ProfileTemplate({ page, crumbs }: Props) {
  return (
    <article>
      <section className="bg-paper-off border-b border-rule">
        <Container className="py-section">
          <Breadcrumbs items={crumbs} />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-14 items-start">
            <div className="surface bg-paper">
              <Image
                src="/dr-picture.jpg"
                alt="Dr. Hrayr Basmajian — Orthopaedic Trauma Surgeon"
                width={400}
                height={534}
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="block w-full h-auto"
              />
              <figcaption className="px-5 py-4 border-t border-ink font-mono text-eyebrow tracking-eyebrow uppercase text-muted">
                Dr. Hrayr Basmajian · Pomona, CA
              </figcaption>
            </div>

            <div>
              <Eyebrow>Surgeon Profile · § 01</Eyebrow>
              <h1 className="mt-5 font-serif font-medium text-[clamp(2.5rem,5vw,5rem)] leading-[0.96] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine [text-wrap:balance]">
                Meet Dr. Hrayr <em>Basmajian.</em>
              </h1>
              <p className="mt-6 font-serif italic text-d-s leading-[1.4] text-ink-soft max-w-prose">
                {page.description}
              </p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {[
                  "Board-certified Orthopaedic",
                  "Trauma Medical Director · Pomona Valley Hospital",
                  "Assistant Professor of Orthopaedic Surgery",
                  "Former Chair · Loma Linda Orthopaedic Trauma",
                ].map((credential) => (
                  <li
                    key={credential}
                    className="font-mono text-[10.5px] tracking-wide uppercase text-spine border border-spine px-3 py-1.5"
                  >
                    {credential}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button variant="action" as="a" href="/consult">
                  Schedule a Consultation <Arrow />
                </Button>
                <Button
                  variant="spine"
                  as="a"
                  href="https://premierlimblengthening.com/wp-content/uploads/2023/09/Basmajian-CV.pdf"
                >
                  Read CV (PDF) <Arrow />
                </Button>
              </div>

              <div className="mt-10">
                <StatGrid
                  items={[
                    { n: <em>100s</em>, label: "Procedures performed" },
                    { n: "17+", label: "Year surgeon group" },
                    { n: <em>L1</em>, label: "Trauma Center · LA County" },
                  ]}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream border-b border-rule">
        <Container className="py-section">
          <div className="max-w-prose mx-auto">
            <Prose>{page.body}</Prose>
          </div>
        </Container>
      </section>

      <CtaBanner
        headline={
          <>
            Direct and honest advice — <em>from the surgeon himself.</em>
          </>
        }
      />

      <JsonLd data={physicianSchema()} />
    </article>
  );
}
