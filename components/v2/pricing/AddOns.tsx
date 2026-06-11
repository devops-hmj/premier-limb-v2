import { Reveal } from "../Reveal";

const addOns = [
  { code: "A.01", label: "Rotation Correction · Femur",  price: "$10,000", note: "Performed simultaneously with femur lengthening." },
  { code: "A.02", label: "Rotation Correction · Tibial", price: "$10,000", note: "Performed simultaneously with tibia lengthening." },
  { code: "A.03", label: "Bowlegged Correction · Tibial", price: "$15,000", note: "Standalone or paired with tibia lengthening." },
  { code: "A.04", label: "Bowlegged Correction · Tibia during Femur", price: "$50,000", note: "Combined tibia bow correction during a femur procedure." },
] as const;

const hardware = [
  { code: "H.01", label: "Hardware Removal · Bilateral Femur",            price: "$18,000", note: "Performed 1–2 years post-surgery." },
  { code: "H.02", label: "Hardware Removal · Bilateral Tibia",            price: "$22,500", note: "Performed 1–2 years post-surgery." },
  { code: "H.03", label: "Hardware Removal · Bilateral Femur + Tibia",    price: "$28,000", note: "Combined removal for staged or combined cases." },
] as const;

/**
 * AddOns — two stacked editorial tables (optional corrections + hardware
 * removal). Mirrors the dossier "ledger" feel: mono labels, italic body,
 * spine-blue prices, top + bottom rules per row.
 */
export function AddOns() {
  return (
    <section className="bg-paper py-20 lg:py-28 border-t border-b border-rule">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="pb-8 mb-12 border-b border-ink">
            <span className="eyebrow mb-4">Optional + Aftercare</span>
            <h2
              className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[24ch]"
              style={{ fontSize: "clamp(36px, 5.4vw, 76px)" }}
            >
              Add-ons and <em className="italic text-spine">hardware removal.</em>
            </h2>
          </header>
        </Reveal>

        <Reveal className="mb-16">
          <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted mb-4">
            Concurrent Corrections
          </div>
          <div className="border-t border-ink">
            {addOns.map((row) => (
              <div
                key={row.code}
                className="grid grid-cols-[64px_1fr_120px] sm:grid-cols-[80px_2fr_3fr_140px] gap-x-4 sm:gap-x-6 items-baseline py-5 border-b border-rule"
              >
                <div className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine">{row.code}</div>
                <h3 className="font-serif font-medium text-[18px] lg:text-[20px] leading-[1.25] tracking-[-0.01em] text-ink">
                  {row.label}
                </h3>
                <p className="hidden sm:block text-[13.5px] leading-[1.6] text-ink-soft">{row.note}</p>
                <div className="font-serif text-[22px] lg:text-[26px] leading-none tracking-[-0.02em] text-ink text-right">
                  {row.price}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted mb-4">
            Hardware Removal (1–2 years post-surgery)
          </div>
          <div className="border-t border-ink">
            {hardware.map((row) => (
              <div
                key={row.code}
                className="grid grid-cols-[64px_1fr_120px] sm:grid-cols-[80px_2fr_3fr_140px] gap-x-4 sm:gap-x-6 items-baseline py-5 border-b border-rule"
              >
                <div className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine">{row.code}</div>
                <h3 className="font-serif font-medium text-[18px] lg:text-[20px] leading-[1.25] tracking-[-0.01em] text-ink">
                  {row.label}
                </h3>
                <p className="hidden sm:block text-[13.5px] leading-[1.6] text-ink-soft">{row.note}</p>
                <div className="font-serif text-[22px] lg:text-[26px] leading-none tracking-[-0.02em] text-ink text-right">
                  {row.price}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
