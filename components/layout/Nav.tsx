"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { primaryNav, site } from "@/lib/site";
import { Arrow, Button } from "@/components/primitives/Button";
import { Logo } from "@/components/primitives/Logo";

// `Logo` here is the OFFICIAL PNG wordmark — see components/primitives/Logo.tsx.

/**
 * Nav — the site's global navigation.
 *   • Desktop: row of links, phone in Signal Blue, primary CTA in Action Green.
 *   • Mobile:  hamburger that opens a full-screen sheet.
 *
 * Renders an editorial cover-strip-style sub-bar above the main nav on lg+
 * to reinforce the dossier identity on every page.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  // Close the mobile sheet on route change / escape / resize-to-desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-paper-off/95 backdrop-blur-sm border-b border-ink">
      <div className="wrap flex items-center justify-between gap-6 py-4 lg:py-5">
        <Link href="/" aria-label="Premier Limb Lengthening Institute — home" className="shrink-0">
          <Logo width={180} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-t-s tracking-wide text-ink hover:text-spine transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        {/* Color override per product direction: CTA → Signal Blue, Phone → brand red.
            Diverges from DESIGN_SYSTEM.md Three-Tier Hierarchy by request. */}
        <div className="hidden lg:flex items-center gap-3">
          {/* tel: is not an in-app route — use a plain anchor, not next/link. */}
          <a
            href={site.phoneHref}
            className="font-mono text-t-s tracking-wide text-warn hover:text-warn/80 transition-colors"
            aria-label={`Call ${site.phone}`}
          >
            {site.phone}
          </a>
          <Button variant="accent" as="a" href="/consult">
            Schedule Consultation <Arrow />
          </Button>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 border border-ink"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden className="block w-5 h-px bg-ink relative">
            <span
              className={cn(
                "absolute left-0 right-0 top-0 h-px bg-ink transition-transform",
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "absolute left-0 right-0 top-0 h-px bg-ink transition-transform",
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className={cn(
          "lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-paper-off border-t border-ink",
          "overflow-y-auto",
        )}
      >
        <div className="wrap py-8 flex flex-col gap-6">
          <nav aria-label="Primary mobile" className="flex flex-col">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-d-s py-4 border-b border-rule tracking-[-0.01em]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-2">
            <Button variant="accent" as="a" href="/consult">
              Schedule Consultation <Arrow />
            </Button>
            <Button variant="warn" as="a" href={site.phoneHref}>
              {site.phone}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
