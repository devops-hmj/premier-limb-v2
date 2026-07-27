import type { Metadata } from "next";
import Script from "next/script";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { ContactCard } from "@/components/v2/ContactCard";
import { JsonLd } from "@/components/content/JsonLd";
import { site } from "@/lib/site";
import { breadcrumb } from "@/lib/jsonld";

import "../v2.css";

export const metadata: Metadata = {
  title: "Book a Limb Lengthening Consultation",
  description:
    "Book your limb lengthening consultation online. Pick a time for a secure video or in-office visit with Dr. Hrayr Basmajian in Upland, California.",
  alternates: { canonical: "/book-a-consultation" },
  openGraph: {
    title: "Book a Limb Lengthening Consultation · Premier",
    description:
      "Pick a time online for a secure video or in-office consultation with Dr. Hrayr Basmajian in Upland, California.",
    url: "/book-a-consultation",
    type: "website",
  },
  robots: { index: true, follow: true },
};

/**
 * GoHighLevel booking widget (Premier's branded scheduler). Public URL, fine
 * in the repo. Mirrors the WordPress build's pll/booking-calendar block.
 */
const bookingCalendar =
  "https://schedule.premierlimblengthening.com/widget/booking/1gQtrWlkfJPO7iBeztZt";

/**
 * /book-a-consultation — the booking page.
 *
 * Booking is a separate flow from contact (owner request 2026-07): the
 * visitor schedules directly on the embedded GHL calendar, while /consult
 * carries the message form. Deliberately NO hero band — a compact page
 * header, then the two-column body: calendar left, the same sticky contact
 * card as the contact page right. The site-wide "Schedule Consultation"
 * CTA (nav, mobile sheet, hero overlay) lands here.
 */
export default function BookConsultationPage() {
  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={breadcrumb([
          { name: "Home", url: "/" },
          { name: "Book a Consultation", url: "/book-a-consultation" },
        ])}
      />

      {/*
        GoHighLevel (LeadConnector) chat widget — same bubble as /consult, so
        a visitor who hesitates at the calendar can ask a question instead.
      */}
      <Script
        src="https://beta.leadconnectorhq.com/loader.js"
        data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a20bb6795223f3846a01136"
        strategy="afterInteractive"
      />

      {/*
        GHL's embed helper auto-grows the booking iframe to the widget's
        current step (the "Enter Details" form is far taller than the month
        grid). Its load-time scan only registers iframes that already carry a
        booking src — true here, the src is server-rendered.
      */}
      <Script
        src="https://schedule.premierlimblengthening.com/js/form_embed.js"
        strategy="afterInteractive"
      />

      <section className="bg-paper-off pt-28 lg:pt-32 pb-20 lg:pb-28">
        <div className="mx-auto max-w-wrap px-6 lg:px-12">
          <Reveal as="header" className="mb-10 lg:mb-12">
            <span className="eyebrow mb-4">Scheduling · Virtual & In-Office</span>
            <h1 className="mt-2 font-serif font-normal tracking-[-0.02em] text-ink leading-[1.05] max-w-[22ch] text-[clamp(34px,4vw,52px)]">
              Book your <em className="italic text-spine">consultation.</em>
            </h1>
            <p className="mt-4 text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch]">
              Choose a time that works for you. Initial consultations are held
              by secure video or in our Upland office. Prefer to talk first?
              Call{" "}
              <a href={site.phoneHref} className="text-spine border-b border-spine pb-0.5">
                {site.phone}
              </a>{" "}
              or{" "}
              <a href="/consult" className="text-spine border-b border-spine pb-0.5">
                send us a message
              </a>
              .
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16 items-start">
            <Reveal>
              {/*
                scrolling="yes" + overflow:auto are the no-script fallback: if
                the embed helper is ever blocked, the widget's taller steps
                stay reachable by scrolling inside the frame. Not lazy-loaded —
                the calendar IS the page's primary content.
              */}
              <iframe
                src={bookingCalendar}
                title="Schedule your consultation"
                className="w-full"
                style={{ width: "100%", border: "none", overflow: "auto", minHeight: 720 }}
                scrolling="yes"
              />
              <p className="mt-4 text-[13px] leading-[1.55] text-muted">
                Trouble loading the calendar?{" "}
                <a
                  href={bookingCalendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-spine border-b border-spine pb-0.5"
                >
                  Open the scheduler in a new tab
                </a>{" "}
                or call{" "}
                <a href={site.phoneHref} className="text-spine border-b border-spine pb-0.5">
                  {site.phone}
                </a>
                .
              </p>
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
