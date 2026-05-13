import { Arrow, Button, Container, Eyebrow, Input } from "@/components/primitives";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { CtaBanner } from "@/components/content/CtaBanner";
import { JsonLd } from "@/components/content/JsonLd";
import { site } from "@/lib/site";
import type { Page } from "@/lib/content";

type Props = { page: Page; crumbs: { name: string; href: string }[] };

/**
 * ConsultTemplate — contact page with sticky address aside + intake form.
 *
 * Notably: no external maps API. The address card includes a "Get Directions"
 * deep-link to Google Maps but the page itself only renders a styled card.
 */
export function ConsultTemplate({ crumbs }: Props) {
  return (
    <article>
      <section className="bg-paper-off border-b border-rule">
        <Container className="py-section">
          <Breadcrumbs items={crumbs} />

          <header className="mt-8 max-w-prose">
            <Eyebrow>Consultation · § Schedule</Eyebrow>
            <h1 className="mt-5 font-serif font-medium text-[clamp(2.5rem,5vw,5rem)] leading-[0.96] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine [text-wrap:balance]">
              Contacts, locations <em>&amp; hours.</em>
            </h1>
            <p className="mt-6 font-serif italic text-d-s leading-[1.4] text-ink-soft">
              Use the form below to learn more about our limb lengthening
              program. You can also call us at{" "}
              <a href={site.phoneHref} className="not-italic text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal">
                {site.phone}
              </a>{" "}
              for an immediate response.
            </p>
          </header>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-14 items-start">
            {/* Address aside */}
            <aside className="lg:sticky lg:top-24 surface px-7 py-8 space-y-7">
              <div>
                <Eyebrow>Premier Offices · Pomona</Eyebrow>
                <address className="mt-5 not-italic font-serif text-d-s leading-[1.4] tracking-[-0.005em] [&_em]:italic [&_em]:text-spine">
                  {site.address.street}<br />
                  <em>{site.address.city}, {site.address.state} {site.address.zip}</em>
                </address>
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-mono text-eyebrow tracking-wider uppercase">
                <dt className="text-muted">Tel</dt>
                <dd>
                  <a href={site.phoneHref} className="text-signal hover:text-signal-deep transition-colors">
                    {site.phone}
                  </a>
                </dd>
                <dt className="text-muted">Fax</dt>
                <dd className="text-ink">(909) 596-4344</dd>
              </dl>
              <Button
                variant="spine"
                as="a"
                href="https://www.google.com/maps/dir//160+E+Artesia+St,+Pomona,+CA+91767"
              >
                Get Directions <Arrow />
              </Button>
            </aside>

            {/* Intake form */}
            <form
              className="surface px-7 py-9 grid grid-cols-1 sm:grid-cols-2 gap-5"
              aria-label="Confidential consultation intake"
            >
              <Eyebrow className="sm:col-span-2 mb-2">Confidential intake</Eyebrow>
              <Input label="Full Name" name="name" required placeholder="First and last" />
              <Input label="Email" type="email" name="email" required placeholder="you@example.com" />
              <Input label="Phone" type="tel" name="phone" placeholder="(___) ___-____" />
              <Input label="Best Time to Reach" name="contactTime" placeholder="e.g. Weekday afternoons" />
              <Input
                label="Procedure of Interest"
                name="procedure"
                hint="Optional — for triage"
                placeholder="e.g. Cosmetic femur"
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label
                  htmlFor="consult-message"
                  className="font-mono text-[10.5px] uppercase tracking-eyebrow text-muted"
                >
                  Tell us about your case
                </label>
                <textarea
                  id="consult-message"
                  name="message"
                  rows={6}
                  placeholder="Briefly describe your goal, prior surgeries, and any imaging you have."
                  className="px-3.5 py-3 bg-paper border border-ink text-[15px] font-sans text-ink placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spine focus-visible:border-spine"
                />
              </div>
              <label className="sm:col-span-2 flex items-start gap-3 font-mono text-[11px] tracking-wider uppercase text-muted leading-[1.6]">
                <input type="checkbox" required name="consent" className="mt-0.5 w-4 h-4 border border-ink" />
                <span>
                  I acknowledge this inquiry is not protected health information
                  and consent to a confidential follow-up by the practice.
                </span>
              </label>
              <div className="sm:col-span-2 mt-2 flex flex-wrap gap-3 items-center">
                <Button variant="action" type="submit">
                  Send Confidential Inquiry <Arrow />
                </Button>
                <p className="font-mono text-[11px] tracking-wider uppercase text-muted">
                  Response within one business day.
                </p>
              </div>
            </form>
          </div>
        </Container>
      </section>

      <CtaBanner
        headline={<>Prefer to talk? <em>Call us.</em></>}
        body="A patient coordinator answers Monday through Friday during business hours."
        primaryHref={site.phoneHref}
        primaryLabel={`Call ${site.phone}`}
        showPhone={false}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          mainEntity: {
            "@type": "MedicalBusiness",
            name: "Premier Limb Lengthening Institute",
            telephone: "+1-909-461-4984",
            faxNumber: "+1-909-596-4344",
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address.street,
              addressLocality: site.address.city,
              addressRegion: site.address.state,
              postalCode: site.address.zip,
              addressCountry: "US",
            },
          },
        }}
      />
    </article>
  );
}
