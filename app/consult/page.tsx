import type { Metadata } from "next";
import Script from "next/script";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { JsonLd } from "@/components/content/JsonLd";
import { site } from "@/lib/site";
import { breadcrumb } from "@/lib/jsonld";

import "../v2.css";

export const metadata: Metadata = {
  title: "Schedule a Limb Lengthening Consultation",
  description:
    "Schedule a consultation with Premier Limb Lengthening in Pomona, Southern California. Confidential intake, virtual visits, and white-glove travel coordination.",
  alternates: { canonical: "/consult" },
  openGraph: {
    title: "Schedule a Limb Lengthening Consultation · Premier",
    description:
      "Confidential intake, virtual visits, and white-glove travel coordination from Pomona, Southern California.",
    url: "/consult",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const directions =
  "http://www.google.com/maps/dir/160+E+Artesia+St,+Pomona,+CA+91767/@34.0764064,-117.7535405,15z/";

/**
 * /consult — editorial contact page.
 *
 * Two-column body: form on the left, structured contact card on the right
 * (address, phone, fax, hours, directions link, virtual consult CTA). Sits
 * on paper-off with a paper inset card so the form reads as the primary
 * action and the meta stays as supporting reference.
 */
export default function V2ContactPage() {
  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={breadcrumb([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/consult" },
        ])}
      />

      <section className="bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-8">
            <span className="eyebrow mb-5">Contacts · Locations · Hours</span>
            <h1
              className="mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[18ch]"
              style={{ fontSize: "clamp(44px, 7vw, 112px)" }}
            >
              Start the conversation. <em className="italic text-spine">We&rsquo;ll handle the rest.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule lg:self-end">
            <p className="font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft">
              Tell us about your goals — we&rsquo;ll respond within one business
              day. Or call {site.phone} for an immediate response.
            </p>
          </Reveal>
        </div>
      </section>

      {/*
        GoHighLevel (LeadConnector) chat widget. Renders a floating chat
        bubble for live chat / lead capture. Loaded after the page is
        interactive so it never blocks first paint of the form below.
      */}
      <Script
        src="https://beta.leadconnectorhq.com/loader.js"
        data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a20bb6795223f3846a01136"
        strategy="afterInteractive"
      />

      <section className="bg-paper-off py-20 lg:py-28">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <form
              method="post"
              action="#"
              className="border border-ink bg-paper p-8 lg:p-10"
              aria-label="Consultation request"
            >
              <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine mb-5 inline-flex items-center gap-2.5">
                <span className="inline-block w-[22px] h-px bg-spine" aria-hidden />
                Consultation Request
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <Field name="first" label="First name" required />
                <Field name="last" label="Last name" required />
                <Field name="email" label="Email" type="email" required />
                <Field name="phone" label="Phone" type="tel" required />
                <Field name="city" label="City of residence" />
                <Field name="age" label="Age" type="number" />
              </div>

              <div className="mt-6">
                <label className="block font-mono uppercase tracking-[0.18em] text-[11px] text-muted mb-2">
                  How can we help?
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-paper-off border border-rule px-4 py-3 font-sans text-[14px] text-ink leading-[1.55] focus:outline-none focus:border-spine focus:ring-2 focus:ring-spine/20 transition-colors"
                  placeholder="Tell us briefly about your goals, timeline, and any prior consultations."
                />
              </div>

              <div className="mt-6 flex items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-1.5 w-4 h-4 accent-spine"
                />
                <label htmlFor="consent" className="text-[13px] leading-[1.55] text-ink-soft">
                  I consent to be contacted by Premier Limb Lengthening regarding
                  my inquiry. My information is private and never sold.
                </label>
              </div>

              <button
                type="submit"
                className="group mt-8 inline-flex items-center gap-3 px-6 py-3.5 bg-spine text-paper uppercase tracking-wide text-[12px] font-medium hover:bg-spine-deep transition-colors"
              >
                Send Inquiry
                <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1} as="aside" className="lg:sticky lg:top-24">
            <div className="border border-ink bg-paper">
              <div className="bg-spine text-paper p-6 lg:p-7">
                <div
                  className="font-mono uppercase tracking-[0.22em] text-[10.5px] inline-flex items-center gap-2.5"
                  style={{ color: "#F4D88A" }}
                >
                  <span aria-hidden className="inline-block w-[22px] h-px" style={{ background: "#F4D88A" }} />
                  Premier Offices
                </div>
                <h2 className="mt-3 font-serif font-medium text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.01em] text-paper">
                  Pomona, <em className="italic" style={{ color: "#F4D88A" }}>Southern California.</em>
                </h2>
              </div>

              <dl className="p-6 lg:p-7 divide-y divide-rule">
                <Row label="Address">
                  <div className="font-serif text-[17px] leading-[1.4] text-ink">
                    {site.address.street}<br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </div>
                  <a
                    href={directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine border-b border-spine pb-0.5"
                  >
                    Get Directions
                    <span className="font-serif italic text-[14px]" aria-hidden>→</span>
                  </a>
                </Row>

                <Row label="Phone">
                  <a
                    href={site.phoneHref}
                    className="font-serif italic text-[22px] text-spine hover:text-spine-deep"
                  >
                    {site.phone}
                  </a>
                  <div className="mt-1 text-[13px] text-muted">Fax · (909) 596-4344</div>
                </Row>

                <Row label="Hours">
                  <div className="font-serif text-[16px] leading-[1.55] text-ink">
                    Mon–Fri · 8:00 AM – 5:00 PM<br />
                    Sat–Sun · By appointment
                  </div>
                </Row>

                <Row label="Virtual">
                  <p className="text-[14px] leading-[1.6] text-ink-soft">
                    Out of state? We hold initial consultations by secure video so you can travel only when surgery requires.
                  </p>
                </Row>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <FooterV2 />
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono uppercase tracking-[0.18em] text-[11px] text-muted mb-2"
      >
        {label}
        {required && <span aria-hidden className="text-spine"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-paper-off border border-rule px-4 py-3 font-sans text-[14px] text-ink focus:outline-none focus:border-spine focus:ring-2 focus:ring-spine/20 transition-colors"
      />
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start">
      <dt className="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1">
        {label}
      </dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
