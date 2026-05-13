import { Arrow, Button, Container, Eyebrow } from "@/components/primitives";
import { site } from "@/lib/site";
import { HeroVideo } from "./HeroVideo";

/**
 * ClosingCta — the "Ready to Stand Taller?" section.
 * Headline and body copy verbatim from scraped_content/netlify_homepage.md.
 *
 * Layout:
 *   • Left  (narrower)  — Eyebrow · heading · body · CTAs stacked vertically.
 *   • Right (wider)     — 16:9 looping video (1280×720 native).
 *   On mobile both stack into a single column (text first, then video).
 */
export function ClosingCta() {
  return (
    <section className="bg-ink text-paper border-b border-ink">
      <Container className="py-section lg:py-section-xl">
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_7fr] gap-10 lg:gap-14 items-center">
          {/* ===== Left column — copy + CTAs ===== */}
          <div className="flex flex-col max-w-[52ch]">
            {/* Cream eyebrow — warmer than signal blue and reads cleanly on the
                ink ground. Matches the BragBar numeral color. */}
            <Eyebrow className="!text-cream">The Next Step · § 03</Eyebrow>

            {/* Two-line headline: "Ready" / "to Stand Taller?". The explicit
                <br> is correct on every breakpoint; the inner span keeps the
                second phrase from breaking again so "Taller?" never wraps
                to its own line at desktop widths. Clamp ceiling lowered to
                4rem so the phrase actually fits the 6fr text column. */}
            <h2
              className="
                font-serif font-medium mt-6
                text-[clamp(2.25rem,4vw,4rem)] leading-[1]
                tracking-[-0.02em] [&_em]:italic [&_em]:text-cream
              "
            >
              Ready<br />
              <span className="whitespace-nowrap">to <em>Stand</em> Taller?</span>
            </h2>

            <p
              className="
                mt-6 max-w-[40ch]
                font-serif italic text-paper/85
                text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.4]
              "
            >
              Schedule a confidential consultation with Dr. Basmajian. In-person
              or virtual appointments available for patients nationwide.
            </p>

            {/* CTAs sit BELOW the text. Stack on mobile, row from sm+. */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Button variant="action" as="a" href="/consult">
                Schedule a Confidential Consultation <Arrow />
              </Button>
              <Button variant="accent" as="a" href={site.phoneHref}>
                Call {site.phone}
              </Button>
            </div>
          </div>

          {/* ===== Right column — horizontal 16:9 video ===== */}
          <ClosingVisual />
        </div>
      </Container>
    </section>
  );
}

/**
 * ClosingVisual — the 16:9 looping video tied to the closing CTA.
 *
 * Sized width-first via the column grid, with aspect-[16/9] driving height.
 * A height cap prevents the figure from running away on ultrawide screens
 * where the column gets very wide.
 */
function ClosingVisual() {
  return (
    <figure
      className="
        relative w-full surface overflow-hidden bg-ink
        aspect-[16/9]
        max-h-[640px]
      "
      aria-label="Premier Limb Lengthening — clinical reel"
    >
      {/* Reuses the hero video player but defers playback until the section
          enters the viewport (only the hero autoplays on page load). */}
      <HeroVideo src="/PLL-video-horizontal.mp4" autoplay="in-view" />

      {/* Bottom scrim — guarantees caption contrast on bright frames. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(15,20,23,0.65) 0%, rgba(15,20,23,0) 100%)",
        }}
      />

      {/* Editorial grain — subtle texture honoring the print direction. */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex justify-between items-end gap-4 z-10">
        <div className="font-mono text-[10px] sm:text-eyebrow tracking-eyebrow uppercase text-paper/90">
          Premier Limb Lengthening Institute
        </div>
        <div className="font-mono text-[10px] sm:text-eyebrow tracking-eyebrow uppercase text-paper/90 text-right">
          Concierge consultations<br />nationwide
        </div>
      </figcaption>
    </figure>
  );
}
