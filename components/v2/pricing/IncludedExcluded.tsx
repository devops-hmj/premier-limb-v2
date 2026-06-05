import { Reveal } from "../Reveal";

const included = [
  "PRECICE internal nail implants (count varies by procedure)",
  "Operating room time + surgical fees",
  "Anesthesiologist fees",
  "Defined block of on-site sessions (60–70)",
  "Coordination with our patient concierge from first call",
] as const;

const excluded = [
  "Extended-stay accommodations near our facility",
  "Home health care, if required after discharge",
  "Travel to and from Upland",
  "Out-of-network insurance reimbursement claims",
  "Optional corrections (rotation, bowleg) — see add-ons",
  "Hardware removal — see the schedule above",
] as const;

/**
 * IncludedExcluded — two side-by-side dossier panels. Spine-blue on the
 * "included" side (positive), warn-red eyebrow on the "excluded" side
 * (transparency about what's billed separately).
 */
export function IncludedExcluded() {
  return (
    <section className="bg-paper-off py-20 lg:py-28">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="pb-8 mb-12 border-b border-ink">
            <span className="eyebrow mb-4">Plain Numbers</span>
            <h2
              className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[24ch]"
              style={{ fontSize: "clamp(36px, 5.4vw, 76px)" }}
            >
              What every quote <em className="italic text-spine">does and does not include.</em>
            </h2>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-b border-ink">
          <Reveal className="py-10 pr-0 lg:pr-10 lg:border-r border-rule">
            <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine mb-5 inline-flex items-center gap-2.5">
              <span className="inline-block w-[22px] h-px bg-spine" aria-hidden />
              Included in every quote
            </div>
            <ul className="border-t border-rule">
              {included.map((line) => (
                <li
                  key={line}
                  className="grid grid-cols-[24px_1fr] gap-2 items-baseline py-4 border-b border-rule text-[15px] leading-[1.55] text-ink"
                >
                  <span aria-hidden className="font-serif font-medium text-spine text-[18px]">+</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="py-10 lg:pl-10">
            <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-warn mb-5 inline-flex items-center gap-2.5">
              <span className="inline-block w-[22px] h-px bg-warn" aria-hidden />
              Billed separately
            </div>
            <ul className="border-t border-rule">
              {excluded.map((line) => (
                <li
                  key={line}
                  className="grid grid-cols-[24px_1fr] gap-2 items-baseline py-4 border-b border-rule text-[15px] leading-[1.55] text-ink-soft"
                >
                  <span aria-hidden className="font-serif font-medium text-warn text-[18px]">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
