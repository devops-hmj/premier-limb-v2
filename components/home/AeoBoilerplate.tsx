import Image from "next/image";
import { Container } from "@/components/primitives";

/**
 * AeoBoilerplate — the Answer-Engine-Optimization paragraph that summarizes
 * the practice for crawlers and LLM-driven search.
 *
 * Verbatim from scraped_content/netlify_homepage.md. DO NOT paraphrase:
 * this string is medical/marketing canon and is consumed by AEO crawlers
 * that compare it across pages. Edits require coordinator confirmation.
 */
export function AeoBoilerplate() {
  return (
    <section
      aria-label="About Premier Limb Lengthening"
      className="bg-paper border-b border-rule"
    >
      <Container className="py-section">
        {/* Cap the colophon content to ~1040px so on 1440/1920 it reads as
            a centered editorial block instead of orphaning the left rail. */}
        <div className="grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,72ch)] xl:grid-cols-[260px_minmax(0,76ch)] gap-10 mx-auto max-w-[1040px] lg:max-w-[1200px]">
          {/* Left column: portrait + label — stacks vertically on mobile,
              portrait sits above the eyebrow on desktop. */}
          <div className="flex flex-col gap-5">
            <Image
              src="/dr-picture.jpg"
              alt="Dr. Hrayr Basmajian"
              width={400}
              height={534}
              sizes="(min-width: 1024px) 220px, 140px"
              className="block w-[140px] lg:w-[200px] xl:w-[240px] h-auto border border-ink"
            />
            <div className="font-mono text-eyebrow tracking-eyebrow uppercase text-muted">
              About the Practice
            </div>
          </div>
          <p className="font-serif text-d-s leading-[1.4] text-ink-soft [&_strong]:font-medium [&_strong]:text-ink">
            <strong>Premier Limb Lengthening</strong>, led by{" "}
            <strong>Dr. Hrayr Basmajian</strong>, is a cosmetic and medical limb
            lengthening practice in Southern California specializing in Precice
            internal nail technology. With hundreds of procedures performed and a
            full concierge travel program for out-of-state patients, Premier Limb
            Lengthening offers transparent pricing starting at{" "}
            <strong>$77,500</strong>. A division of Premier Orthopaedic &amp;
            Trauma Specialists. Schedule a consultation at{" "}
            <strong>(909) 461-4984</strong> or visit{" "}
            <strong>premierlimblengthening.com</strong>.
          </p>
        </div>
      </Container>
    </section>
  );
}
