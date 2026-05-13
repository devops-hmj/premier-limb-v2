import { Logo, LogoLockup, Monogram, Section, SectionHead } from "@/components/primitives";

export function Identity() {
  return (
    <Section id="sec-01">
      <SectionHead numeral="i" label="§ 01 · Identity">
        The <em>mark.</em>
      </SectionHead>

      {/* Primary lockups — the OFFICIAL PNG wordmark in both tones. */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
        <LogoTile tag="Primary Lockup · Black" dim="Light grounds · 2170 × 725 native">
          <Logo width={320} />
        </LogoTile>
        <LogoTile tag="Reverse · Premier Blue" dim="Default for collateral" tone="spine">
          <Logo tone="dark" width={260} />
        </LogoTile>
      </div>

      {/* Secondary variants — typographic study lockups documenting the editorial system. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <LogoTile tag="Stacked Study" dim="Typographic system" tone="cream" minH="180px">
          <LogoLockup layout="stack" emphasizeName tagline="Pomona, CA" />
        </LogoTile>
        <LogoTile tag="Reverse · Ink Study" dim="Typographic system" tone="ink" minH="180px">
          <LogoLockup size="sm" variant="reverse-ink" tagline="Pomona, CA" />
        </LogoTile>
        <LogoTile tag="Monogram" dim="Avatar · favicon · seal" minH="180px">
          <Monogram size={100} />
        </LogoTile>
        <LogoTile tag="Wordmark · Editorial" dim="Mastheads · folios" minH="180px">
          <div className="font-serif font-medium text-[30px] leading-none tracking-[-0.01em] text-center">
            Premier <em className="em-spine">Limb Lengthening</em>
          </div>
        </LogoTile>
      </div>

      <h3 className="font-serif font-medium text-[28px] mt-14 mb-2">Misuse</h3>
      <p className="text-muted text-[14px] mb-6">
        The mark depends on the blue spine, the hard rule, and exact proportions.
        These violations break the system.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Do not change the spine color", style: { background: "#c5a05e" } as const },
          { label: "Do not round the mark", style: { borderRadius: "50%" } as const },
          { label: "Do not stretch the lockup", style: { transform: "scaleX(0.7)" } as const },
        ].map((d) => (
          <div
            key={d.label}
            className="relative surface p-8 min-h-[160px] grid place-items-center"
          >
            <div className="absolute top-3.5 right-3.5 w-[18px] h-[18px] rounded-full border-[1.5px] border-warn"
                 style={{ background: "linear-gradient(45deg, transparent 47%, #B03A3A 47%, #B03A3A 53%, transparent 53%)" }} />
            <div className="flex items-center gap-[18px]">
              <div className="w-10 h-10 grid place-items-center font-serif italic font-medium text-[22px] text-paper pb-1 bg-spine" style={d.style as React.CSSProperties}>P</div>
              <div className="leading-[1.05]">
                <div className="font-serif font-medium text-[22px] tracking-[-0.01em]">Premier Limb Lengthening</div>
                <div className="mt-1 font-mono uppercase text-[10px] tracking-eyebrow text-muted">Endorsement line</div>
              </div>
            </div>
            <span className="absolute bottom-3.5 left-3.5 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function LogoTile({
  children,
  tag,
  dim,
  tone = "paper",
  minH = "320px",
}: {
  children: React.ReactNode;
  tag: string;
  dim: string;
  tone?: "paper" | "spine" | "ink" | "cream";
  minH?: string;
}) {
  const toneClass = {
    paper: "bg-paper",
    spine: "bg-spine",
    ink: "bg-ink",
    cream: "bg-cream",
  }[tone];
  const dark = tone === "spine" || tone === "ink";
  return (
    <div
      style={{ minHeight: minH }}
      className={`relative border border-ink p-[60px] grid place-items-center ${toneClass}`}
    >
      <span
        className={`absolute top-3.5 left-3.5 font-mono text-[10px] uppercase tracking-eyebrow ${
          dark ? "text-paper/60" : "text-muted"
        }`}
      >
        {tag}
      </span>
      {children}
      <span
        className={`absolute bottom-3.5 right-3.5 font-mono text-[10px] uppercase tracking-wide ${
          dark ? "text-paper/45" : "text-muted"
        }`}
      >
        {dim}
      </span>
    </div>
  );
}
