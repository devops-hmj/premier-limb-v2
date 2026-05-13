import { Section, SectionHead } from "@/components/primitives";

const principles = [
  {
    n: "i",
    h: <><em className="em-spine">Editorial,</em> not promotional.</>,
    p: "We write like a periodical, not a brochure. Decks, captions, datelines, foliage. The reader is treated as an intelligent adult, not a customer to be persuaded.",
  },
  {
    n: "ii",
    h: <><em className="em-spine">Evidenced,</em> not asserted.</>,
    p: '“Hundreds of procedures.” “Pomona Valley Hospital.” “Marcus T., San Francisco.” Every claim earns its place with a number, a credential, or a named patient. Specificity is the proof.',
  },
  {
    n: "iii",
    h: <><em className="em-spine">Direct,</em> not theatrical.</>,
    p: "Short sentences. Active voice. No hedging, no superlatives, no urgency theatre. The Premier blue speaks volume; the language stays measured.",
  },
];

export function Voice() {
  return (
    <Section id="sec-04">
      <SectionHead numeral="iv" label="§ 04 · Tone">
        The <em>voice.</em>
      </SectionHead>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {principles.map((v) => (
          <article key={v.n} className="surface p-9 min-h-[280px] flex flex-col">
            <div className="font-serif italic font-medium text-[38px] text-spine mb-4">
              {v.n}
            </div>
            <h3 className="font-serif font-medium text-[28px] leading-[1.1] mb-4 tracking-[-0.01em]">
              {v.h}
            </h3>
            <p className="text-ink-soft text-[14.5px] leading-[1.65]">{v.p}</p>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <DoList />
        <DontList />
      </div>
    </Section>
  );
}

function DoList() {
  const items = [
    "“Confidence you can stand behind.”",
    "“Hundreds of procedures performed.”",
    "“Cases other surgeons won't take on.”",
    "“Confidential consultation.”",
    "“Results are permanent.”",
  ];
  return (
    <div className="surface p-9">
      <h4 className="font-serif italic font-medium text-[28px] pb-3.5 mb-4 border-b border-ink">
        <em>Say</em> this
      </h4>
      <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-spine mb-1.5">
        Aligned with the voice
      </div>
      <ul className="list-none">
        {items.map((t, i) => (
          <li key={i} className="grid grid-cols-[32px_1fr] items-baseline py-3.5 border-b border-rule last:border-b-0 text-[14.5px] leading-[1.6]">
            <span className="font-serif italic font-medium text-[18px] text-spine">{toRoman(i + 1)}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DontList() {
  const items = [
    "“World-class!” — unsubstantiated superlatives",
    "“Transform your life today!” — urgency theatre",
    "“#1 surgeon in California” — unverifiable claims",
    "“Limited time offer!” — discounts cheapen the brand",
    "Emoji. Exclamation marks. Hashtags. ALL CAPS sentences.",
  ];
  return (
    <div className="surface p-9">
      <h4 className="font-serif italic font-medium text-[28px] pb-3.5 mb-4 border-b border-ink">
        <em>Never</em> this
      </h4>
      <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-warn mb-1.5">
        Breaks the voice
      </div>
      <ul className="list-none">
        {items.map((t, i) => (
          <li key={i} className="grid grid-cols-[32px_1fr] items-baseline py-3.5 border-b border-rule last:border-b-0 text-[14.5px] leading-[1.6]">
            <span className="font-serif italic font-medium text-[18px] text-warn">{toRoman(i + 1)}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function toRoman(n: number) {
  return ["i","ii","iii","iv","v","vi","vii","viii","ix","x"][n - 1] ?? String(n);
}
