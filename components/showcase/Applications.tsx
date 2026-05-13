import { Badge, Section, SectionHead } from "@/components/primitives";

export function Applications() {
  return (
    <Section id="sec-07">
      <SectionHead numeral="vii" label="§ 07 · Applications">
        In <em>application.</em>
      </SectionHead>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <BusinessCard />
        <Letterhead />
        <InstagramPost />
      </div>
    </Section>
  );
}

function BusinessCard() {
  return (
    <div className="surface aspect-[3/4] p-7 flex flex-col justify-between relative">
      <span className="absolute top-3.5 right-3.5 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
        Card
      </span>
      <div className="flex justify-between items-center pb-3 border-b-2 border-spine">
        <div className="font-serif font-medium text-[18px] tracking-[-0.01em]">
          Premier <em className="em-spine">LL</em>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-eyebrow text-muted">
          N° 0142
        </span>
      </div>
      <div>
        <div className="font-serif font-medium text-[32px] leading-[1.05] tracking-[-0.015em] [&_em]:italic [&_em]:text-spine">
          Dr. Hrayr<br/><em>Basmajian.</em>
        </div>
        <div className="mt-2 font-serif italic text-[15px] text-ink-soft">
          Orthopaedic Trauma Surgeon
        </div>
      </div>
      <div className="pt-3.5 border-t border-rule font-mono text-[10px] uppercase tracking-wide text-muted leading-[2]">
        1798 N. Garey Ave · Pomona<br/>
        (909) 461-4984<br/>
        premierlimblengthening.com
      </div>
    </div>
  );
}

function Letterhead() {
  return (
    <div className="surface aspect-[3/4] flex flex-col relative bg-paper">
      <span className="absolute top-3.5 right-3.5 font-mono text-[10px] uppercase tracking-eyebrow text-muted z-10">
        Letter
      </span>
      <div className="bg-ink text-[#D4D6D8] font-mono text-[9px] uppercase tracking-eyebrow px-3.5 py-1.5 flex justify-between">
        <span className="inline-flex items-center gap-2 before:content-[''] before:w-[7px] before:h-[7px] before:bg-spine">
          PMS 2168 C
        </span>
        <span>N° 0142</span>
      </div>
      <div className="px-6 pt-5 pb-3.5 border-b-2 border-ink flex justify-between items-baseline">
        <div className="font-serif font-medium text-[22px] tracking-[-0.01em] [&_em]:italic [&_em]:text-spine">
          Premier <em>Limb Lengthening</em>
        </div>
        <Badge variant="outline">Confidential</Badge>
      </div>
      <div className="px-6 py-5 font-serif text-[14px] leading-[1.55] text-ink-soft flex-1 [&_em]:italic [&_em]:text-spine">
        <p className="mb-3">Dear M—,</p>
        <p className="mb-3">
          Thank you for your inquiry. We have reviewed your imaging and history.
          Dr. Basmajian would be glad to schedule a confidential consultation to
          discuss your <em>candidacy</em>.
        </p>
        <p className="mb-3">
          Enclosed: our concierge program brochure and a preliminary itinerary
          for your consideration.
        </p>
        <p className="mt-4">With consideration,</p>
        <p className="font-serif italic font-medium text-[17px] mt-1">The Patient Coordinator</p>
      </div>
      <div className="mt-auto px-6 py-3 border-t border-rule font-mono text-[9px] uppercase tracking-wider text-muted flex justify-between">
        <span>Pomona · CA</span>
        <span>04 · 2026</span>
      </div>
    </div>
  );
}

function InstagramPost() {
  return (
    <div className="bg-paper-off border border-ink aspect-[3/4] p-7 flex flex-col justify-between relative">
      <span className="absolute top-3.5 right-3.5 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
        Instagram
      </span>
      <div>
        <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b-2 border-spine">
          <div className="font-mono text-[9.5px] uppercase tracking-eyebrow text-spine inline-flex items-center gap-2 before:content-[''] before:w-[7px] before:h-[7px] before:bg-spine">
            Patient Story · 03
          </div>
          <div className="font-serif italic text-[14px] text-ink-soft">
            <em className="em-spine">Marcus T.</em>
          </div>
        </div>
        <div className="font-serif font-medium text-[28px] leading-[1.18] tracking-[-0.01em] [&_em]:italic [&_em]:text-spine">
          “His honesty about what to expect — <em>including the hard parts</em> —
          is what convinced me.”
        </div>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted pt-3.5 border-t border-rule leading-[1.8]">
        <div>Software Engineer</div>
        <div>San Francisco · 2026</div>
      </div>
    </div>
  );
}
