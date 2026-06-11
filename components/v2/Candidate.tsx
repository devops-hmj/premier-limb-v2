import Image from "next/image";
import { Reveal } from "./Reveal";

const items = [
  "Generally healthy adults aged 18 to 55 (older patients evaluated case by case).",
  "Non-smoker or willing to quit 6 weeks before surgery.",
  "BMI under 35 (ideal under 30).",
  "No active bone disease or uncontrolled diabetes.",
  "Able to commit to 3 to 6 months of recovery and physical therapy.",
  "Realistic expectations about height gain (up to 3″ per bone, up to 6″ combined).",
  "Cosmetic height enhancement OR limb-length discrepancy correction.",
  "Revision patients: previous surgery complications or unsatisfactory results.",
] as const;

export function Candidate() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        {/* Two-column intro: portrait left, title right (title first on
            mobile via order classes). The figure is a vertical 4/5 crop with
            a capped width so it can't overwhelm the section. */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center pb-10 lg:pb-12 mb-12 border-b border-ink">
          <Reveal className="order-2 lg:order-1">
            <figure
              className="v2-portrait aspect-[4/5] bg-paper-warm border border-rule relative overflow-hidden max-w-[420px] lg:max-w-[85%]"
              aria-label="Portrait of a prospective limb lengthening candidate"
            >
              <Image
                src="/candidate-portrait.webp"
                alt="A professional considering cosmetic limb lengthening"
                fill
                sizes="(min-width: 1024px) 34vw, 85vw"
                className="object-cover"
              />
              <span className="absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper">
                The Candidate
              </span>
            </figure>
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={0.05}>
            <header>
              <span className="eyebrow mb-4">Am I a Candidate?</span>
              <h2
                className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[18ch] [text-wrap:balance]"
                style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
              >
                Who is a good candidate for <em className="italic text-spine">limb lengthening?</em>
              </h2>
            </header>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-14 items-start">
          <Reveal>
            <ul className="border-t border-ink">
              {items.map((line, i) => (
                <li
                  key={i}
                  className="list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"
                >
                  <span className="font-serif italic text-spine text-[20px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} as="aside">
            <div className="relative bg-spine text-paper p-10 lg:p-12">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: "#F4D88A" }} />
              <span className="font-mono uppercase text-[11px] tracking-[0.2em] inline-flex items-center gap-3" style={{ color: "#F4D88A" }}>
                <span aria-hidden className="inline-block w-[22px] h-px" style={{ background: "#F4D88A" }} />
                Not sure if you qualify?
              </span>
              <h3 className="mt-5 mb-5 font-serif font-medium text-[28px] lg:text-[36px] leading-[1.1] tracking-[-0.01em] max-w-[16ch]">
                Many patients told <em className="italic" style={{ color: "#F4D88A" }}>&ldquo;no&rdquo;</em> elsewhere are candidates here.
              </h3>
              <p className="text-[15px] leading-[1.7] text-paper/95 mb-7">
                The best way to find out is through a confidential consultation.
                Dr. Basmajian evaluates each patient individually. Many
                patients who were told &ldquo;no&rdquo; by other surgeons are candidates
                at our practice due to our trauma reconstruction expertise.
              </p>
              <a
                href="#consult"
                className="group inline-flex items-center gap-3 px-5 py-3.5 text-ink uppercase tracking-wide text-[12px] font-medium hover:bg-paper transition-colors"
                style={{ background: "#F4D88A" }}
              >
                Schedule Your Assessment
                <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
