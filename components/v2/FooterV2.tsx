import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/primitives/Logo";

const sections = {
  practice: [
    { label: "Dr. Basmajian", href: "/v2/dr-basmajian" },
    { label: "About the Practice", href: "/v2/about" },
    { label: "Pricing", href: "/v2/pricing" },
    { label: "Contact", href: "/v2/contact" },
  ],
  homepage: [
    { label: "Your Surgery", href: "/v2#surgery" },
    { label: "Results", href: "/v2#results" },
    { label: "Concierge Program", href: "/v2#concierge" },
    { label: "Testimonials", href: "/v2#testimonials" },
    { label: "FAQ", href: "/v2#faq" },
  ],
  resources: [
    { label: "Journal", href: "/v2/journal" },
    { label: "Schedule Consultation", href: "/v2/contact" },
    { label: "Financing Options", href: "/v2/pricing#financing" },
  ],
} as const;

export function FooterV2() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper/85 pt-16 pb-8">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-14 pb-14 border-b border-white/15">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Logo tone="dark" width={220} />
            </div>
            <p className="font-serif italic text-[18px] text-paper/90 max-w-[34ch] mb-6">
              A Premier Orthopaedic &amp; Trauma Specialists Clinic
            </p>
            <address className="not-italic text-[13px] leading-[1.8] text-paper/85">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
              <br />
              <a href={site.phoneHref} className="text-cream hover:text-paper transition-colors">
                {site.phone}
              </a>
            </address>
          </div>
          <FooterColumn title="The Practice" items={sections.practice} />
          <FooterColumn title="On the Homepage" items={sections.homepage} />
          <FooterColumn title="Resources" items={sections.resources} />
        </div>
        <div className="pt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 font-mono uppercase text-[10.5px] tracking-[0.14em] text-paper/80">
          <div>© {year} Premier Limb Lengthening. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/v2/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <span aria-hidden>·</span>
            <Link href="/v2/terms" className="hover:text-cream transition-colors">Terms</Link>
            <span aria-hidden>·</span>
            <Link href="/v2/accessibility" className="hover:text-cream transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="font-mono uppercase tracking-[0.24em] text-[10.5px] text-cream mb-5 font-medium">
        {title}
      </h4>
      <ul className="list-none">
        {items.map((it) => (
          <li key={it.href} className="py-1.5">
            <Link href={it.href} className="text-[13.5px] text-paper/85 hover:text-cream transition-colors">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
