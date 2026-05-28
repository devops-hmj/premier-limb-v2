import { Reveal } from "./Reveal";

const results = [
  { prefix: "Up to",  emph: "3-6", suffix: "″", sub: "Total Height Gain (Staged)", desc: "Across femur and tibia procedures." },
  { prefix: "",       emph: "3-4", suffix: "",  sub: "Months Active Lengthening",  desc: "Approximately 1 mm per day via internal magnetic nail." },
  { prefix: "Approx", emph: "6-12", suffix: "", sub: "Months to Full Recovery",    desc: "Physical therapy from day one." },
] as const;

export function Results() {
  return (
    <section id="results" className="bg-ink text-paper py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="pb-8 mb-12 border-b border-white/30">
            <span className="font-mono uppercase text-[11px] tracking-[0.2em] inline-flex items-center gap-3" style={{ color: "#F4D88A" }}>
              <span aria-hidden className="inline-block w-[22px] h-px" style={{ background: "#F4D88A" }} />
              What to Expect
            </span>
            <h2
              className="mt-4 font-serif font-normal tracking-[-0.02em] text-paper leading-[0.98]"
              style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
            >
              Results you can <em className="italic" style={{ color: "#F4D88A" }}>measure.</em>
            </h2>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-white/25 mb-8">
          {results.map((r, i) => (
            <Reveal
              key={r.sub}
              delay={i * 0.08}
              className={`py-14 pr-7 ${i < results.length - 1 ? "lg:border-r border-white/12" : ""}`}
            >
              <div className="font-serif text-paper leading-[0.88] tracking-[-0.035em]">
                {r.prefix && (
                  <div
                    className="font-mono uppercase tracking-[0.22em] not-italic text-paper/75 mb-3"
                    style={{ fontSize: "clamp(12px, 1.1vw, 16px)" }}
                  >
                    {r.prefix}
                  </div>
                )}
                <div style={{ fontSize: "clamp(72px, 11vw, 168px)" }}>
                  <em className="italic" style={{ color: "#F4D88A" }}>{r.emph}</em>
                  {r.suffix}
                </div>
              </div>
              <div className="mt-5 font-mono uppercase tracking-[0.2em] text-[11px] text-paper/80">
                {r.sub}
              </div>
              <div className="mt-3.5 text-[14px] leading-[1.65] text-paper/85 max-w-[30ch]">{r.desc}</div>
            </Reveal>
          ))}
        </div>

        <Reveal className="pt-5 border-t border-white/15 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
          <p className="max-w-[60ch] text-[14.5px] leading-[1.65] text-paper/85">
            Femur lengthening typically adds 2 to 3 inches. Tibia lengthening
            adds an additional 2 to 3 inches. Combined staged procedures can
            achieve up to 6 inches total. Results are permanent.
          </p>
          <a
            href="#ba"
            className="group self-start lg:self-auto inline-flex items-center gap-3 px-5 py-3.5 text-ink uppercase tracking-wide text-[12px] font-medium hover:bg-paper transition-colors"
            style={{ background: "#F4D88A" }}
          >
            See Before &amp; After Results
            <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
