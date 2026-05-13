import { Container } from "@/components/primitives";

export function Footer() {
  return (
    <footer className="bg-spine text-paper py-20 pb-14">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-10">
          <div className="font-serif font-medium text-[clamp(36px,5vw,60px)] leading-none tracking-[-0.02em] [&_em]:italic [&_em]:text-cream">
            Premier Limb<br />Lengthening — <em>The Dossier.</em>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-paper/70 text-right leading-[2]">
            <div className="inline-flex items-center gap-2.5 text-paper">
              <span className="w-2.5 h-2.5 bg-paper" />
              Pantone 2168 C · #254A5D
            </div>
            <div>Brand Kit · Direction II · v1.0</div>
            <div>Issued May 2026</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
