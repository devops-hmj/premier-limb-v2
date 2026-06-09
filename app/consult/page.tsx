import type { Metadata } from "next";
import Script from "next/script";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { ConsultForm } from "@/components/v2/ConsultForm";
import { JsonLd } from "@/components/content/JsonLd";
import { site } from "@/lib/site";
import { breadcrumb } from "@/lib/jsonld";

import "../v2.css";

export const metadata: Metadata = {
  title: "Schedule a Limb Lengthening Consultation",
  description:
    "Schedule a consultation with Premier Limb Lengthening in Upland, California. Confidential intake, virtual visits, and white-glove travel coordination.",
  alternates: { canonical: "/consult" },
  openGraph: {
    title: "Schedule a Limb Lengthening Consultation · Premier",
    description:
      "Confidential intake, virtual visits, and white-glove travel coordination from Upland, California.",
    url: "/consult",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const directions =
  "https://www.google.com/maps/dir/400+N.+Mountain+Ave.+Suite+305,+Upland,+CA+91786/";

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
            <ConsultForm />
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
                  Upland, <em className="italic" style={{ color: "#F4D88A" }}>California.</em>
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
