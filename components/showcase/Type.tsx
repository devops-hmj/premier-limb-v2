import { Section, SectionHead } from "@/components/primitives";

export function Type() {
  return (
    <Section id="sec-03">
      <SectionHead numeral="iii" label="§ 03 · Typography">
        The <em>type.</em>
      </SectionHead>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <article className="surface p-11">
          <div className="flex justify-between items-baseline pb-3.5 mb-7 border-b border-ink">
            <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-muted">
              Display · Editorial
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-spine">
              Newsreader · 400/500
            </div>
          </div>
          <div className="font-serif font-medium text-[100px] leading-[0.94] tracking-[-0.02em]">
            Aa <em className="em-spine">Aa</em>
          </div>
          <div className="mt-6 font-serif italic text-[22px] leading-[1.3] text-ink-soft">
            Confidence you can <em className="em-spine">stand</em> behind.
          </div>
          <div className="mt-7 pt-4 border-t border-rule grid grid-cols-8 gap-1.5">
            {["A","B","C","D","E","F","G","H","0","1","2","3","4","5","6","7"].map((c) => (
              <span key={c} className="font-serif text-[22px] font-medium text-center py-1.5 text-ink-soft">
                {c}
              </span>
            ))}
          </div>
        </article>
        <article className="surface p-11">
          <div className="flex justify-between items-baseline pb-3.5 mb-7 border-b border-ink">
            <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-muted">
              Text · Functional
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-spine">
              Inter Tight · 300–600
            </div>
          </div>
          <div className="font-sans font-normal text-[64px] leading-none tracking-[-0.025em]">
            Aa Aa
          </div>
          <div className="mt-6 font-sans text-[22px] leading-[1.3] text-ink-soft">
            Body, navigation, eyebrows, captions, controls.
          </div>
          <div className="mt-7 pt-4 border-t border-rule grid grid-cols-8 gap-1.5">
            {["A","B","C","D","E","F","G","H","0","1","2","3","4","5","6","7"].map((c) => (
              <span key={c} className="font-sans text-[22px] text-center py-1.5 text-ink-soft">
                {c}
              </span>
            ))}
          </div>
        </article>
      </div>

      <div className="surface mt-8">
        {[
          { tag: "D-XL", px: "120 / 0.92 · serif", role: "Hero · cover",
            sample: <span style={{ fontSize: 86 }} className="font-serif font-medium tracking-[-0.02em] leading-none [&_em]:italic [&_em]:text-spine">Editorial <em>Display</em></span> },
          { tag: "D-L", px: "76 / 0.96 · serif", role: "Section heads",
            sample: <span style={{ fontSize: 56 }} className="font-serif font-medium tracking-[-0.02em] leading-none [&_em]:italic [&_em]:text-spine">Section <em>Title</em></span> },
          { tag: "D-M", px: "36 / 1.15 · serif italic", role: "Pull quotes",
            sample: <span style={{ fontSize: 32 }} className="font-serif font-medium tracking-[-0.02em] leading-none [&_em]:italic [&_em]:text-spine">Subhead Italic <em>Voice</em></span> },
          { tag: "T-L", px: "16 / 1.6 · sans", role: "Paragraphs",
            sample: <span className="font-sans text-[16px] leading-[1.6]">Body — long-form reading copy. Inter Tight, 16 / 1.6.</span> },
          { tag: "T-S", px: "13 / 1.55 · sans", role: "UI",
            sample: <span className="font-sans text-[13px] leading-[1.55]">Caption · meta · navigation links.</span> },
          { tag: "EB", px: "11 / 0.2em · mono", role: "Labels",
            sample: <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-spine">— Eyebrow · Section Label</span> },
        ].map((r) => (
          <div
            key={r.tag}
            className="grid grid-cols-[90px_140px_1fr_140px] items-baseline gap-6 px-8 py-5 border-b border-rule last:border-b-0"
          >
            <div className="font-mono text-[11px] tracking-wide text-muted">{r.tag}</div>
            <div className="font-mono text-[11px] tracking-wide text-muted">{r.px}</div>
            <div>{r.sample}</div>
            <div className="text-right font-mono text-[11px] uppercase tracking-wide text-spine">
              {r.role}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
