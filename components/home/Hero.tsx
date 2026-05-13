import Image from "next/image";
import { Arrow, Button, Container, Eyebrow } from "@/components/primitives";
import { HeroVideo } from "./HeroVideo";

/**
 * Hero — section 1 of the homepage.
 *
 * Sized to fit ONE viewport height (minus the sticky nav) across:
 *   • 24" monitors (≥1920w, ≥1080h) — headline caps at clamp upper bound
 *   • 16" laptops (≈1536w, ≈800-960h) — comfortable balance
 *   • tablets (768-1024w) — single column, visual shrinks
 *   • smartphones (≤480w) — single column, visual collapses to banner
 *
 * Visual: <video> loop in the right column at native 9:16 (720×1280). Sized
 * height-first so width is derived from aspect — that keeps `object-cover`
 * flush with the figure and the video uncropped and unupscaled.
 *
 * Copy is verbatim from the wireframe.
 */
export function Hero() {
  return (
    <section className="relative bg-paper-off border-b-2 border-ink">
      {/* `100svh` (small-viewport-height) keeps mobile browser chrome stable.
          Subtracting ~72px reserves room for the sticky <Nav>. */}
      <Container
        className="
          grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12
          py-10 sm:py-12 lg:py-14
          min-h-[calc(100svh-72px)] items-center
        "
      >
        {/* min-w-0 lets the wide headline word-break instead of overflowing the column.
            NOTE: max-width is applied to the TEXT children individually, not the column.
            Otherwise the CTA row inherits it and can't fit the badge to its right. */}
        <div className="flex flex-col justify-center min-w-0">
          <div className="max-w-[44ch]">
            {/* [text-wrap:balance] keeps the eyebrow from creating an orphan
                "SOUTHERN CALIFORNIA" line at mid widths (tablet-p). */}
            <Eyebrow className="[text-wrap:balance]">
              Cosmetic Limb Lengthening Surgery in Southern California
            </Eyebrow>

            {/* Headline scales 40 → 96px via clamp; balanced wrap on supporting browsers. */}
            <h1
              className="
                font-serif font-medium mt-5 sm:mt-6
                text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.96]
                tracking-[-0.02em] [&_em]:italic [&_em]:text-spine
                [text-wrap:balance]
              "
            >
              Confidence You Can <em>Stand</em> Behind.
            </h1>

            <p
              className="
                mt-5 sm:mt-7 max-w-[34ch]
                font-serif italic font-normal text-ink-soft
                text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.4]
                pt-4 sm:pt-6 border-t border-ink
              "
            >
              Gain up to 3–6 inches with one of the most experienced limb
              lengthening surgeons on the West Coast. Concierge care from your
              first consultation through full recovery.
            </p>
          </div>

          {/* CTA row — now back to a single max-width-capped row. The FAAOS
              badge lives inside the video figure (above the doctor caption). */}
          <div className="mt-6 sm:mt-8 max-w-[44ch] flex flex-wrap gap-3 items-center">
            <Button variant="action" as="a" href="/consult">
              {/* Shorter label on the smallest screens so the button doesn't
                  wrap and orphan the trailing arrow on row 1. */}
              <span className="sm:hidden">Schedule Consultation</span>
              <span className="hidden sm:inline">Schedule a Confidential Consultation</span>
              <Arrow />
            </Button>
            <Button variant="ghost" as="a" href="/limb-lengthening-pricing-options">
              View Pricing Options <Arrow />
            </Button>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

/**
 * HeroVisual — the looping 9:16 video at native quality.
 *
 * The figure is HEIGHT-driven (`h-[…]`) so width derives from the 9:16
 * aspect ratio. Combined with `object-cover` on the <video>, the asset fills
 * the figure flush — no crop (figure aspect matches asset aspect) and no
 * upscale on screens smaller than the native 720px width.
 *
 * The gradient + grain layers stay behind/above as a graceful fallback
 * while the video buffers and as caption legibility scrim.
 */
function HeroVisual() {
  return (
    // Mobile: left-align so the figure's left edge sits flush with the
    // CTAs above (visually unifies the column). Desktop: center inside
    // its own grid track.
    <div className="min-w-0 flex items-center justify-start lg:justify-center">
      <figure
        className="
          relative surface overflow-hidden bg-ink
          aspect-[9/16]
          w-full max-w-[20rem]
          sm:max-w-[22rem]
          md:w-auto md:h-[60svh] md:max-w-none
          lg:h-[calc(100svh-160px)]
          max-h-[820px]
        "
        aria-label="Dr. Basmajian in a clinical setting — looping video"
      >
        {/* Native 720×1280 9:16 video + sound toggle (client component). */}
        <HeroVideo src="/Limb-Lenghthening_Video.mp4" />

        {/* Editorial gradient — fallback ground before the video first paint. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 80% at 75% 30%, #1E6FE5 0%, #254A5D 38%, #18323F 70%, #0F1417 100%)",
          }}
        />

        {/* Subtle bottom scrim — guarantees caption contrast over bright frames. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3"
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
          {/* FAAOS credential badge sits above the doctor name. Sized to
              stay legible — rendered up to the asset's native 150 px so we
              never upscale. Drop-shadow keeps the shield readable over
              any frame. */}
          <div className="flex flex-col items-start gap-3">
            <Image
              src="/FAAOS-Badge-150x150.png"
              alt="Fellow of the American Academy of Orthopaedic Surgeons — Designated Member"
              width={150}
              height={150}
              sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 80px"
              className="block w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 drop-shadow-[0_2px_8px_rgba(15,20,23,0.55)]"
            />
            <div className="font-mono text-[10px] sm:text-eyebrow tracking-eyebrow uppercase text-paper/90">
              Dr. Hrayr Basmajian · Pomona, CA
            </div>
          </div>
          <div className="font-mono text-[10px] sm:text-eyebrow tracking-eyebrow uppercase text-paper/90 text-right">
            Premier Orthopaedic<br />&amp; Trauma Specialists
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
