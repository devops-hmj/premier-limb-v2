import Image from "next/image";
import { Reveal } from "./Reveal";

/**
 * Bio — feature layout: editorial portrait + credentials + 3 paragraphs +
 * inline CTA + 3-up stat strip. Paper ground.
 */
export function Bio() {
  return (
    <section id="dr" className="bg-paper py-20 lg:py-28 border-t border-b border-rule">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="pb-8 mb-12 border-b border-ink">
            <span className="eyebrow mb-4">Your Surgeon</span>
            <h2
              className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98]"
              style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
            >
              Dr. Hrayr <em className="italic text-spine">Basmajian.</em>
            </h2>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-start">
          <Reveal className="self-start">
            <figure
              className="v2-portrait aspect-[4/5] bg-paper-warm border border-rule relative overflow-hidden max-w-[85%]"
              aria-label="Editorial portrait of Dr. Basmajian"
            >
              <Image
                src="/Dr-ig-pic.jpg"
                alt="Dr. Hrayr Basmajian consulting with a patient at Pomona Valley Hospital"
                fill
                sizes="(min-width: 1024px) 32vw, 85vw"
                className="object-cover"
              />
              <span className="absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper">
                Plate 02
              </span>
              <figcaption className="absolute z-10 bottom-3 left-3 right-3 px-3.5 py-2.5 bg-paper/95 backdrop-blur-sm border-l-2 border-spine font-serif italic text-[15px] lg:text-[16px] text-ink">
                &ldquo;A rare combination of trauma precision and cosmetic judgment.&rdquo;
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="py-3.5 mb-7 border-t border-b border-rule font-mono uppercase tracking-[0.14em] text-[12px] text-ink">
              Orthopaedic Trauma Surgeon · Fellowship-Trained · Director, PVHMC
            </div>

            <p className="font-serif text-[18px] leading-[1.5] text-ink mb-4 max-w-[62ch]">
              Dr. Basmajian brings a rare combination of precision trauma
              surgery and cosmetic limb lengthening expertise to every procedure.
            </p>
            <p className="text-[15.5px] leading-[1.7] text-ink-soft mb-4 max-w-[62ch]">
              His fellowship training in complex fracture reconstruction gives
              him an unmatched ability to manage the nuances of bone lengthening
              — including revision cases other surgeons won&rsquo;t take on.
            </p>
            <p className="text-[15.5px] leading-[1.7] text-ink-soft mb-7 max-w-[62ch]">
              As Director of Orthopaedic Trauma at Pomona Valley Hospital
              Medical Center and a leading surgeon at Premier Orthopaedic &amp;
              Trauma Specialists, he operates with the institutional support of
              a 17+ surgeon orthopaedic group.
            </p>

            <a
              href="#dr-full"
              className="group inline-flex items-center gap-3 px-5 py-3.5 bg-ink text-paper uppercase tracking-wide text-[12px] font-medium border border-ink hover:bg-spine hover:border-spine transition-colors"
            >
              Learn more about Dr. Basmajian
              <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>

            <div className="mt-10 grid grid-cols-3 border-t border-ink">
              <div className="pt-6 pb-2 pr-4 border-r border-rule">
                <div className="font-serif text-[36px] lg:text-[48px] leading-none tracking-[-0.02em] text-ink">
                  <em className="italic text-spine">100s</em>
                </div>
                <div className="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">
                  Procedures
                </div>
              </div>
              <div className="pt-6 pb-2 pr-4 border-r border-rule">
                <div className="font-serif text-[36px] lg:text-[48px] leading-none tracking-[-0.02em] text-ink">
                  17+
                </div>
                <div className="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">
                  Surgeon Group
                </div>
              </div>
              <div className="pt-6 pb-2 pr-4">
                <div className="font-serif text-[36px] lg:text-[48px] leading-none tracking-[-0.02em] text-ink">
                  <em className="italic text-spine">3–6</em>″
                </div>
                <div className="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">
                  Height Gain
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
