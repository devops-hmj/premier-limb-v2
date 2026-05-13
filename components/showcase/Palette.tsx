import { Section, SectionHead, Swatch } from "@/components/primitives";

export function Palette() {
  return (
    <Section id="sec-02">
      <SectionHead numeral="ii" label="§ 02 · Color">
        The <em>palette.</em>
      </SectionHead>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-4">
        <Swatch
          role="Spine · Primary"
          name={<>Premier <em>Blue</em></>}
          chipClassName="bg-spine text-paper"
          meta={[
            { k: "HEX", v: "#254A5D" },
            { k: "RGB", v: "37 · 74 · 93" },
            { k: "CMYK", v: "85 / 60 / 40 / 25" },
            { k: "Pantone", v: "2168 C" },
          ]}
        />
        <Swatch
          role="Foundation · Type"
          name={<em>Ink</em>}
          chipClassName="bg-ink text-paper"
          meta={[
            { k: "HEX", v: "#0F1417" },
            { k: "RGB", v: "15 · 20 · 23" },
            { k: "CMYK", v: "35 / 0 / 0 / 91" },
            { k: "Pantone", v: "426 C" },
          ]}
        />
        <Swatch
          role="Foundation · Ground"
          name={<em>Newsprint</em>}
          chipClassName="bg-paper-off text-ink border-b border-rule"
          meta={[
            { k: "HEX", v: "#F8F6F1" },
            { k: "RGB", v: "248 · 246 · 241" },
            { k: "CMYK", v: "2 / 2 / 5 / 0" },
            { k: "Pantone", v: "11-0507 TCX" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr_1fr] gap-4 mt-4">
        <Swatch
          role="Action · Conversion"
          name={<>Action <em>Green</em></>}
          chipClassName="bg-action text-action-ink"
          meta={[
            { k: "HEX", v: "#2BBE7B" },
            { k: "RGB", v: "43 · 190 · 123" },
            { k: "Use", v: "Primary CTA" },
            { k: "Token", v: "--action" },
          ]}
        />
        <Swatch
          role="Accent · Interactive"
          name={<>Signal <em>Blue</em></>}
          chipClassName="bg-signal text-paper"
          meta={[
            { k: "HEX", v: "#1E6FE5" },
            { k: "RGB", v: "30 · 111 · 229" },
            { k: "Use", v: "Secondary action · phone" },
            { k: "Token", v: "--signal" },
          ]}
        />
        <Swatch
          role="Hover · Press"
          name={<>Blue <em>Deep</em></>}
          chipClassName="bg-spine-deep text-paper"
          meta={[
            { k: "HEX", v: "#18323F" },
            { k: "Use", v: "Spine pressed state" },
            { k: "Token", v: "--spine-deep" },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Swatch
          size="compact"
          role="Surface · Pure"
          name={<em>Paper</em>}
          chipClassName="bg-paper text-ink border-b border-rule"
          meta={[{ k: "HEX", v: "#FFFFFF" }, { k: "Use", v: "Cards" }]}
        />
        <Swatch
          size="compact"
          role="Surface · Warm"
          name={<em>Cream</em>}
          chipClassName="bg-cream text-ink border-b border-rule"
          meta={[{ k: "HEX", v: "#F4F0E6" }, { k: "Use", v: "Quiet panels" }]}
        />
        <Swatch
          size="compact"
          role="Wash · Pull-out"
          name={<em>Blue Wash</em>}
          chipClassName="bg-spine-wash text-spine"
          meta={[{ k: "HEX", v: "#EAF0F3" }, { k: "Use", v: "Sidebars" }]}
        />
        <Swatch
          size="compact"
          role="Action · Pressed"
          name={<span className="text-paper">Green <em className="em-action">Deep</em></span>}
          chipClassName="text-[#D8EFE2]"
          meta={[{ k: "HEX", v: "#1F9C63" }, { k: "Use", v: "Hover states" }]}
        />
      </div>

      <aside className="mt-8 surface-wash px-8 py-7 max-w-[80ch]">
        <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-spine mb-3">
          Use Discipline · The Three-Tier Hierarchy
        </div>
        <p className="font-serif italic text-[22px] leading-[1.4] [&_em]:not-italic">
          <em className="em-spine">Premier Blue</em> is the editorial spine — mastheads,
          eyebrows, italic accents, structural rules.{" "}
          <em className="em-action">Action Green</em> is reserved for the single
          highest-intent CTA on any surface: book, schedule, apply.{" "}
          <em className="em-signal">Signal Blue</em> belongs to phone numbers, secondary
          actions, and live links. Each does one job. They do not overlap.
        </p>
      </aside>
    </Section>
  );
}
