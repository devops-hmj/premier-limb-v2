import { Rule, Section, SectionHead } from "@/components/primitives";

const spaceScale = [
  { k: "XS", pct: 4, px: "8 px" },
  { k: "S", pct: 8, px: "16 px" },
  { k: "M", pct: 14, px: "24 px" },
  { k: "L", pct: 24, px: "40 px" },
  { k: "XL", pct: 36, px: "64 px" },
  { k: "2XL", pct: 56, px: "96 px" },
  { k: "3XL", pct: 80, px: "160 px" },
];

export function Spacing() {
  return (
    <Section id="sec-05">
      <SectionHead numeral="v" label="§ 05 · Layout">
        Space &amp; <em>rules.</em>
      </SectionHead>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="surface p-10">
          <h3 className="font-serif font-medium text-[26px] mb-6 pb-3.5 border-b border-ink">
            Spacing <em className="em-spine">scale</em>
          </h3>
          <div className="flex flex-col gap-3">
            {spaceScale.map((r) => (
              <div key={r.k} className="grid grid-cols-[60px_1fr_80px] items-center gap-5 py-2">
                <div className="font-mono text-[11px] tracking-wide uppercase text-muted">{r.k}</div>
                <div className="h-4 bg-spine" style={{ width: `${r.pct}%` }} />
                <div className="font-mono text-[11px] text-ink text-right">{r.px}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface p-10">
          <h3 className="font-serif font-medium text-[26px] mb-6 pb-3.5 border-b border-ink">
            Rules &amp; <em className="em-spine">dividers</em>
          </h3>
          <div className="flex flex-col gap-5">
            {[
              { k: "Hairline", weight: "hair" as const },
              { k: "Default", weight: "thin" as const },
              { k: "Section", weight: "bold" as const },
              { k: "Masthead", weight: "thick" as const },
              { k: "Spine", weight: "spine" as const },
            ].map((r) => (
              <div key={r.k} className="grid grid-cols-[110px_1fr] gap-4 items-center">
                <div className="font-mono text-[10.5px] uppercase tracking-wider text-muted">{r.k}</div>
                <Rule weight={r.weight} />
              </div>
            ))}
          </div>

          <h3 className="font-serif font-medium text-[26px] mt-10 mb-6 pb-3.5 border-b border-ink">
            Grid &amp; <em className="em-spine">margins</em>
          </h3>
          <div className="grid grid-cols-2 gap-3.5 font-mono text-[12px]">
            {[
              ["Container", "1320 px max"],
              ["Gutter", "48 px desktop"],
              ["Columns", "12-col magazine grid"],
              ["Section padding", "96–150 px vertical"],
            ].map(([k, v]) => (
              <div key={k} className="border border-ink p-3.5">
                <div className="text-muted text-[10.5px] uppercase tracking-wider mb-1.5">{k}</div>
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
