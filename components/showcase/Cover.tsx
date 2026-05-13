import { Container, CoverStrip, Eyebrow, Logo } from "@/components/primitives";

export function Cover() {
  return (
    <>
      <CoverStrip
        left={<>Spine #254A5D · Action #2BBE7B · Accent #1E6FE5</>}
        center={<>Brand Kit · Direction II</>}
        right={<>v1.1 · May 2026</>}
      />

      <section className="bg-paper-off pt-12 pb-20 border-b-[3px] border-ink">
        <Container>
          <header className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-10 pb-7 border-b-2 border-ink mb-16">
            <Logo width={240} priority />
            <div className="font-mono text-[10.5px] uppercase tracking-widest text-muted text-center">
              <div>The Identity Dossier</div>
              <div className="inline-block bg-spine text-paper px-3 py-1 tracking-wider mt-1.5">
                № 02
              </div>
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-wider text-muted text-right leading-[1.9]">
              <div>Issued · May 2026</div>
              <div>Pomona, California</div>
              <div>Confidential</div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
            <div>
              <Eyebrow>Brand Kit · Direction II</Eyebrow>
              <h1 className="font-serif font-medium text-hero mt-6 [&_em]:italic [&_em]:text-spine">
                The <em>Dossier.</em>
              </h1>
              <p className="mt-8 max-w-deck font-serif italic text-[clamp(22px,2.4vw,30px)] leading-[1.3] text-ink-soft pt-7 border-t border-ink">
                An editorial, evidence-based identity for the limb lengthening
                surgeon trusted by patients who have already done their research.
              </p>
            </div>

            <aside className="border-l border-ink pl-7 flex flex-col gap-6 text-[13px]">
              {[
                { k: "Direction", v: <>Editorial <em className="em-spine">Clinical</em></> },
                { k: "Spine Color", v: <><em className="em-spine">Premier Blue</em> · 2168 C</> },
                { k: "Display Type", v: <em className="em-spine">Newsreader</em> },
                { k: "Issued", v: <>May <em className="em-spine">2026</em></> },
              ].map(({ k, v }) => (
                <div key={k} className="grid gap-1 pb-4 border-b border-rule">
                  <div className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">{k}</div>
                  <div className="font-serif text-[22px] leading-[1.2] tracking-[-0.01em]">{v}</div>
                </div>
              ))}

              <nav className="font-mono text-[11px] uppercase tracking-wide text-muted leading-[2.1]">
                {[
                  ["The Mark", "§ 01"],
                  ["Color", "§ 02"],
                  ["Typography", "§ 03"],
                  ["Voice", "§ 04"],
                  ["Layout", "§ 05"],
                  ["Components", "§ 06"],
                  ["Applications", "§ 07"],
                ].map(([title, n]) => (
                  <a href={`#sec-${n.replace(/[§ ]/g, "").toLowerCase()}`} key={n} className="flex justify-between hover:text-spine">
                    <span>{title}</span>
                    <span className="text-spine">{n}</span>
                  </a>
                ))}
              </nav>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
