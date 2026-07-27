import { site } from "@/lib/site";

const directions =
  "https://www.google.com/maps/dir/400+N.+Mountain+Ave.+Suite+305,+Upland,+CA+91786/";

/**
 * ContactCard — the bordered practice card (address, phone, fax, hours,
 * directions link, virtual consult note). Shared by the contact page
 * (/consult) and the booking page (/book-a-consultation) so the two flows
 * present identical practice details; callers own the sticky/Reveal wrapper.
 */
export function ContactCard() {
  return (
    <div className="border border-ink bg-paper">
      <div className="bg-spine text-paper p-6 lg:p-7">
        <div
          className="font-mono uppercase tracking-[0.22em] text-[10.5px] inline-flex items-center gap-2.5"
          style={{ color: "#F4D88A" }}
        >
          <span aria-hidden className="inline-block w-[22px] h-px" style={{ background: "#F4D88A" }} />
          Premier Offices
        </div>
        <h2 className="mt-3 font-serif font-medium text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.01em] text-paper">
          Upland, <em className="italic" style={{ color: "#F4D88A" }}>California.</em>
        </h2>
      </div>

      <dl className="p-6 lg:p-7 divide-y divide-rule">
        <Row label="Address">
          <div className="font-serif text-[17px] leading-[1.4] text-ink">
            {site.address.street}<br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </div>
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine border-b border-spine pb-0.5"
          >
            Get Directions
            <span className="font-serif italic text-[14px]" aria-hidden>→</span>
          </a>
        </Row>

        <Row label="Phone">
          <a
            href={site.phoneHref}
            className="font-serif italic text-[22px] text-spine hover:text-spine-deep"
          >
            {site.phone}
          </a>
          <div className="mt-1 text-[13px] text-muted">Fax · (909) 596-4344</div>
        </Row>

        <Row label="Hours">
          <div className="font-serif text-[16px] leading-[1.55] text-ink">
            Mon–Fri · 8:00 AM – 5:00 PM<br />
            Sat–Sun · By appointment
          </div>
        </Row>

        <Row label="Virtual">
          <p className="text-[14px] leading-[1.6] text-ink-soft">
            Out of state? We hold initial consultations by secure video so you can travel only when surgery requires.
          </p>
        </Row>
      </dl>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start">
      <dt className="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1">
        {label}
      </dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
