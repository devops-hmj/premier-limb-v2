import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Logo } from "@/components/primitives/Logo";
import { footerNav, site } from "@/lib/site";

/**
 * SiteFooter — the global footer.
 * Editorial: spine-blue ground, mono lists, italic em accent in the wordmark.
 * Content lifted verbatim from scraped_content/netlify_homepage.md.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-spine text-paper">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 py-section-lg">
          {/* Brand block — spans both columns at md (2×2 layout), one column at lg. */}
          <div className="md:col-span-2 lg:col-span-1">
            <Logo tone="dark" width={240} />
            <address className="mt-8 not-italic font-mono text-t-s tracking-wide uppercase leading-[2] text-paper/80">
              {site.address.street}<br />
              {site.address.city}, {site.address.state} {site.address.zip}<br />
              {/* tel: is not an in-app route — plain anchor. */}
              <a href={site.phoneHref} className="hover:text-paper">
                {site.phone}
              </a>
            </address>
          </div>

          <FooterColumn title="Procedures" items={footerNav.procedures} />
          <FooterColumn title="Resources" items={footerNav.resources} />
          <FooterColumn title="For Patients" items={footerNav.patients} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 border-t border-paper/20">
          <p className="font-mono text-eyebrow tracking-wide uppercase text-paper/70">
            © {year} Premier Limb Lengthening. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4 font-mono text-eyebrow tracking-wide uppercase text-paper/70">
            <li><Link href="/privacy" className="hover:text-paper">Privacy Policy</Link></li>
            <li aria-hidden>·</li>
            <li><Link href="/terms" className="hover:text-paper">Terms</Link></li>
            <li aria-hidden>·</li>
            <li><Link href="/accessibility" className="hover:text-paper">Accessibility</Link></li>
            <li aria-hidden>·</li>
            <li><Link href="/sitemap" className="hover:text-paper">Sitemap</Link></li>
          </ul>
        </div>
      </Container>
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
      <h3 className="font-mono text-eyebrow tracking-eyebrow uppercase text-paper/60 mb-5 pb-3 border-b border-paper/20">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-serif text-t-xl leading-[1.3] tracking-[-0.01em] text-paper hover:text-cream transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
