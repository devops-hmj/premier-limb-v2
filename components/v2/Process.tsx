import { Reveal } from "./Reveal";

const steps = [
  {
    phase: "Phase 01",
    n: "01",
    titleA: "Consultation",
    titleB: "& Planning",
    body: "Confidential in-person or virtual consultation. Dr. Basmajian evaluates your health, discusses realistic expectations, and creates a personalized surgical plan.",
  },
  {
    phase: "Phase 02",
    n: "02",
    titleA: "Surgery",
    titleB: "& Lengthening",
    body: "A Precice internal nail is surgically placed. Over 3 to 4 months, the nail gradually lengthens your bone by approximately 1 mm per day using an external magnetic remote. No visible hardware.",
  },
  {
    phase: "Phase 03",
    n: "03",
    titleA: "Recovery",
    titleB: "& Results",
    body: "Physical therapy begins immediately. Most patients return to daily activities within 3 to 4 months and full activity by 6 to 12 months. Final height gain: up to 6 inches.",
  },
] as const;

export function Process() {
  return (
    <section id="surgery" className="bg-spine text-paper py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="pb-8 mb-12 border-b border-white/40">
            <span className="font-mono uppercase text-[11px] tracking-[0.2em] inline-flex items-center gap-3" style={{ color: "#F4D88A" }}>
              <span aria-hidden className="inline-block w-[22px] h-px" style={{ background: "#F4D88A" }} />
              The Process
            </span>
            <h2
              className="mt-4 font-serif font-normal tracking-[-0.02em] text-paper leading-[0.98]"
              style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
            >
              How limb lengthening <em className="italic" style={{ color: "#F4D88A" }}>works.</em>
            </h2>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-white/30">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.08}
              as="article"
              className={`relative py-12 pr-8 ${i < steps.length - 1 ? "lg:border-r border-white/15" : ""}`}
            >
              <div className="mb-7 flex items-center gap-3.5 font-mono uppercase text-[11px] tracking-[0.22em] text-paper/90">
                {s.phase}
                <span aria-hidden className="flex-1 h-px bg-white/15" />
              </div>
              <div className="v2-step-ghost" aria-hidden>{s.n}</div>
              <h3 className="font-serif font-medium text-[28px] lg:text-[34px] leading-[1.08] tracking-[-0.01em] mb-5 max-w-[14ch]">
                <em className="italic" style={{ color: "#F4D88A" }}>{s.titleA}</em> {s.titleB}
              </h3>
              <p className="text-[14.5px] leading-[1.7] text-paper/90 max-w-[36ch]">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
