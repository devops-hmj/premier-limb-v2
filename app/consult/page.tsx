import type { Metadata } from "next";
import Script from "next/script";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { ConsultForm } from "@/components/v2/ConsultForm";
import { ContactCard } from "@/components/v2/ContactCard";
import { JsonLd } from "@/components/content/JsonLd";
import { site } from "@/lib/site";
import { breadcrumb } from "@/lib/jsonld";

import "../v2.css";

export const metadata: Metadata = {
  // Absolute: the brand name IS the title, so the layout template suffix
  // would double it.
  title: { absolute: "Contact Premier Limb Lengthening · Upland, California" },
  description:
    "Contact Premier Limb Lengthening in Upland, California. Send a confidential message and we respond within one business day, or call " +
    site.phone +
    ".",
  alternates: { canonical: "/consult" },
  openGraph: {
    title: "Contact Premier Limb Lengthening · Upland, California",
    description:
      "Send us a confidential message. We respond within one business day. Virtual visits and white-glove travel coordination from Upland, California.",
    url: "/consult",
    type: "website",
  },
  robots: { index: true, follow: true },
};

/**
 * /consult — editorial contact page.
 *
 * Reshaped 2026-07 when booking split off to /book-a-consultation (which
 * carries the embedded GHL calendar): the hero band was removed (owner
 * request) — a compact page header keeps the approved H1 copy, then the
 * two-column body follows immediately: form on the left, the shared sticky
 * contact card on the right. The form reads as the primary action and the
 * meta stays as supporting reference.
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

      <section className="bg-paper-off pt-28 lg:pt-32 pb-20 lg:pb-28">
        <div className="mx-auto max-w-wrap px-6 lg:px-12">
          <Reveal as="header" className="mb-10 lg:mb-12">
            <span className="eyebrow mb-4">Contacts · Locations · Hours</span>
            <h1 className="mt-2 font-serif font-normal tracking-[-0.02em] text-ink leading-[1.05] max-w-[24ch] text-[clamp(34px,4vw,52px)]">
              Start the conversation. <em className="italic text-spine">We&rsquo;ll handle the rest.</em>
            </h1>
            <p className="mt-4 text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch]">
              Tell us about your goals. We&rsquo;ll respond within one business
              day. Or call{" "}
              <a href={site.phoneHref} className="text-spine border-b border-spine pb-0.5">
                {site.phone}
              </a>{" "}
              for an immediate response. Ready to pick a time?{" "}
              <a href="/book-a-consultation" className="text-spine border-b border-spine pb-0.5">
                Book your consultation online
              </a>
              .
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16 items-start">
            <Reveal>
              <ConsultForm />
            </Reveal>

            <Reveal delay={0.1} as="aside" className="lg:sticky lg:top-24">
              <ContactCard />
            </Reveal>
          </div>
        </div>
      </section>

      <FooterV2 />
    </>
  );
}
