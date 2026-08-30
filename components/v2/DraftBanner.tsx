/**
 * DraftBanner — a loud, unmissable strip marking a page that is staged for
 * review and must not be treated as live copy.
 *
 * These four marketing-sprint pages exist on production only as unpublished,
 * noindex WordPress drafts. The Netlify copies are review surfaces for Pastel
 * annotation, so the banner states plainly who still owes copy and that the
 * page is not signed off. It is deliberately not subtle: a reviewer who
 * screenshots this page should never mistake it for finished work.
 *
 * Delete the banner (and the blockquote fill notes in the body) when the page
 * is approved for publication.
 */
export function DraftBanner({
  owners,
  note,
}: {
  /** Who still owes something, e.g. ["Dr. B", "Legal", "Jaime"]. */
  owners: ReadonlyArray<string>;
  /** One sentence on what specifically is outstanding. */
  note: string;
}) {
  return (
    <div
      role="note"
      aria-label="Draft page, not approved for publication"
      className="bg-ink text-paper border-b-4 border-gold"
    >
      <div className="mx-auto max-w-wrap px-6 lg:px-12 py-4 lg:py-5">
        <p className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-gold mb-2">
          Draft for review · not published · noindex
        </p>
        <p className="max-w-[80ch] text-[15px] leading-[1.6] text-paper/90">
          {note}
        </p>
        <p className="mt-3 font-mono uppercase tracking-[0.14em] text-[10.5px] text-paper/70">
          Sign-off still required from: {owners.join(" · ")}
        </p>
        <p className="mt-3 text-[13.5px] leading-[1.6] text-paper/60">
          Highlighted callouts in the body mark the exact copy a human still
          owes. Nothing on this page is approved, and every figure inside a
          callout is unverified.
        </p>
      </div>
    </div>
  );
}
