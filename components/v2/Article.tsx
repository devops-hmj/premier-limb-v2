import Image from "next/image";
import { Reveal } from "./Reveal";

/**
 * Article — the paper-off lede that docks under the video stage.
 * Editorial portrait + drop-cap lead + 2-column running body + CTA row.
 * Concludes with the 4-up trust strip flush bordered on top + bottom.
 */
export function Article() {
  return (
    <section className="bg-paper-off">
      <div className="mx-auto max-w-wrap px-6 lg:px-12 pt-16 pb-6">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-5" as="div">
            <figure
              className="v2-portrait aspect-[4/5] border border-rule bg-paper-warm relative overflow-hidden max-w-[85%]"
              aria-label="Portrait of Dr. Basmajian"
            >
              <Image
                src="/dr-picture.jpg"
                alt="Dr. Hrayr Basmajian examining a femur model in his Pomona clinic"
                fill
                sizes="(min-width: 1024px) 34vw, 85vw"
                className="object-cover"
              />
              <span className="absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper-off">
                Plate 01
              </span>
              <figcaption className="absolute z-10 bottom-3 left-3 right-3 px-3 py-2 bg-paper-off/95 backdrop-blur-sm border-t-2 border-spine font-serif italic text-[14px] lg:text-[15px] text-ink-soft">
                Dr. Basmajian, examining a femur in clinic. Pomona, California.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-7" delay={0.1}>
            <p className="v2-dropcap text-[18px] leading-[1.6] text-ink mb-7 max-w-[54ch]">
              Concierge care from your first consultation through full recovery.
              We combine a trauma surgeon&rsquo;s precision with a private-clinic&rsquo;s
              level of discretion. The result is a practice that accepts cases
              others decline, in a setting designed around the patient.
            </p>

            <div className="v2-cols text-[14.5px] leading-[1.7] text-ink-soft pt-4 border-t border-rule">
              <p>
                Our program is the only US limb lengthening practice offering a
                full white-glove travel and recovery coordination service:
                flights, housing, physical therapy, and a single dedicated
                coordinator from first call to final follow-up.
              </p>
              <p>
                Every procedure uses the latest internal Precice® nail
                technology: no external hardware, no visible frame, faster
                recovery, and a virtually invisible result once healed.
              </p>
            </div>

            <div className="mt-8 pt-7 border-t border-rule flex flex-wrap gap-3">
              <a
                href="#consult"
                className="group inline-flex items-center gap-3 px-5 py-3.5 bg-spine text-paper uppercase tracking-wide text-[12px] font-medium border border-spine hover:bg-spine-deep hover:border-spine-deep transition-colors"
              >
                Schedule a Confidential Consultation
                <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
              <a
                href="/pricing"
                className="group inline-flex items-center gap-3 px-5 py-3.5 bg-transparent text-spine border border-spine uppercase tracking-wide text-[12px] font-medium hover:bg-spine hover:text-paper transition-colors"
              >
                View Pricing Options
                <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className="mx-auto max-w-wrap px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-ink py-7">
          {trust.map((t, i) => (
            <div
              key={t.n}
              className={`px-4 lg:pr-6 flex flex-col gap-1.5 ${i < trust.length - 1 ? "lg:border-r border-rule" : ""} ${i % 2 === 0 ? "border-r border-rule lg:border-r" : ""} ${i < 2 ? "border-b border-rule pb-5 lg:border-b-0 lg:pb-0" : "pt-5 lg:pt-0"}`}
            >
              <div className="font-mono uppercase text-[10px] tracking-[0.22em] text-muted">{t.n}</div>
              <div className="font-serif text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink">
                <em className="italic text-spine">{t.emph}</em> {t.rest}
              </div>
              <div className="text-[12px] text-muted leading-[1.55]">{t.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const trust = [
  { n: "01", emph: "Thousands", rest: "of procedures", desc: "Trauma, cosmetic, and revision combined." },
  { n: "02", emph: "Precice®", rest: "nail technology", desc: "Internal magnetic lengthening (no external frame)." },
  { n: "03", emph: "Concierge", rest: "travel program", desc: "White-glove logistics, domestic & international." },
  { n: "04", emph: "Transparent", rest: "pricing", desc: "Fully itemised quote before you commit." },
] as const;
