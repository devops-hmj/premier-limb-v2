import Image from "next/image";

/**
 * CoverHero — React equivalent of the WordPress `wp:cover` hero that opens the
 * pll/seo-landing-page pattern.
 *
 * Mirrors the block's settings exactly so the two builds render the same hero:
 *   minHeight 620px, contentPosition center, overlayColor ink at dimRatio 70,
 *   border-b border-ink, and the same type scale on eyebrow, H1 and deck.
 *
 * The background image is the same file the WordPress pages reference
 * (pll/heroes/how-much-taller-hero.jpg), copied into public/images/heroes/ so
 * the Netlify build serves a byte-identical asset. It is placeholder art on
 * every page that uses it, exactly as it is on the WordPress side.
 *
 * The image is decorative, so alt is empty: the H1 already carries the meaning.
 * Layering is DOM order rather than z-index, image then scrim then content, so
 * the section needs no stacking context of its own.
 */
export function CoverHero({
  eyebrow,
  title,
  accent,
  deck,
}: {
  eyebrow: string;
  /** Leading part of the H1, rendered in white. */
  title: string;
  /** Trailing part of the H1, rendered as the gold italic accent. */
  accent: string;
  deck: string;
}) {
  return (
    <section className="relative flex items-center min-h-[620px] border-b border-ink">
      <Image
        src="/images/heroes/how-much-taller-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-ink/70" />

      <div className="relative mx-auto max-w-wrap px-6 lg:px-12 w-full pt-24 lg:pt-32 pb-14 lg:pb-16">
        <p className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-white/70 mb-5">
          {eyebrow}
        </p>
        <h1 className="font-serif font-normal tracking-[-0.025em] text-white leading-[0.94] max-w-[18ch] text-[clamp(44px,7.4vw,108px)] [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]">
          {title} <em className="italic text-gold">{accent}</em>
        </h1>
        <p className="mt-7 max-w-[58ch] font-serif italic text-[20px] lg:text-[24px] leading-[1.35] text-white/90">
          {deck}
        </p>
      </div>
    </section>
  );
}
