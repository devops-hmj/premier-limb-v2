"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Logo } from "@/components/primitives/Logo";

/**
 * NavV2 — the V2 masthead.
 *
 * Two states:
 *   • Over hero: transparent ground, white text, sits inside the video stage.
 *   • Post-scroll (>120px): condensed sticky bar on paper-off with ink text.
 *
 * The "over hero" version is rendered as a child of HeroStage so the cover
 * strip + main row sit naturally above the video. The "condensed" version
 * is mounted here as a fixed-top bar that fades in once the user scrolls.
 */
const navLinks = [
  { label: "Pricing", href: "/v2/pricing" },
  { label: "Dr. Basmajian", href: "/v2/dr-basmajian" },
  { label: "About", href: "/v2/about" },
  { label: "Journal", href: "/v2/journal" },
  { label: "Contact", href: "/v2/contact" },
] as const;

/**
 * NavV2 sticky bar.
 *
 * - On the homepage: hidden initially (the hero has its own `NavV2Overlay`),
 *   slides down once the user scrolls past 120 px.
 * - On inner pages with no hero: pass `forceVisible` so the bar shows
 *   immediately from scroll position 0.
 */
export function NavV2({ forceVisible = false }: { forceVisible?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(forceVisible);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (forceVisible) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceVisible]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.header
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-50 bg-paper-off/95 backdrop-blur border-b border-ink"
          >
            <div className="mx-auto max-w-wrap px-6 lg:px-12 py-3 flex items-center justify-between gap-6">
              <Link href="/v2" aria-label="Premier Limb Lengthening — home" className="flex items-center shrink-0">
                <Logo tone="light" width={170} priority />
              </Link>

              <nav className="hidden lg:flex items-center gap-7 text-[13.5px] text-ink font-medium" aria-label="Primary">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="hover:text-spine transition-colors">
                    {l.label}
                  </a>
                ))}
              </nav>

              <div className="hidden md:flex items-center gap-3">
                <a
                  href={site.phoneHref}
                  className="font-serif italic text-[16px] text-spine hover:text-spine-deep transition-colors"
                >
                  {site.phone}
                </a>
                <a
                  href="#consult"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-spine text-paper font-medium uppercase tracking-wide text-[11.5px] hover:bg-spine-deep transition-colors"
                >
                  Schedule Consultation
                  <span className="font-serif italic text-[15px]" aria-hidden>→</span>
                </a>
              </div>

              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-ink"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span aria-hidden className="block w-5 h-px bg-ink relative">
                  <span className={cn("absolute left-0 right-0 top-0 h-px bg-ink transition-transform", open ? "rotate-45" : "-translate-y-1.5")} />
                  <span className={cn("absolute left-0 right-0 top-0 h-px bg-ink transition-transform", open ? "-rotate-45" : "translate-y-1.5")} />
                </span>
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-paper-off md:hidden"
          >
            <div className="px-6 pt-20 pb-10 flex flex-col gap-6">
              <nav aria-label="Primary mobile" className="flex flex-col">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-[28px] py-4 border-b border-rule tracking-[-0.01em] text-ink"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3 pt-2">
                <a href="#consult" className="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-spine text-paper font-medium uppercase tracking-wide text-[11.5px]">
                  Schedule Consultation <span className="font-serif italic" aria-hidden>→</span>
                </a>
                <a href={site.phoneHref} className="inline-flex items-center justify-center gap-2.5 px-5 py-3 border border-spine text-spine font-medium uppercase tracking-wide text-[11.5px]">
                  Call {site.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * NavV2Overlay — the version that sits inside the hero/video stage.
 * Pure markup, no scroll state — keeps the dark-ground variant decoupled.
 */
export function NavV2Overlay() {
  return (
    <header className="relative z-10 border-b border-white/15">
      <div className="mx-auto max-w-wrap px-6 lg:px-12 py-4 lg:py-5 grid grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10">
        <Link href="/v2" aria-label="Premier Limb Lengthening — home" className="flex items-center shrink-0">
          <Logo
            tone="dark"
            width={210}
            priority
            className="drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          />
        </Link>

        <nav
          className="hidden lg:flex items-center justify-center gap-7 text-[13.5px] font-medium text-white/90"
          aria-label="Primary"
        >
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-cream transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-5 justify-self-end">
          <a
            href={site.phoneHref}
            className="hidden sm:inline-block font-serif italic text-[17px] lg:text-[18px] hover:text-white transition-colors"
            style={{ color: "#F4D88A" }}
          >
            {site.phone}
          </a>
          <a
            href="#consult"
            className="inline-flex items-center gap-2.5 px-4 lg:px-5 py-3 lg:py-3.5 bg-spine text-paper font-medium uppercase tracking-wide text-[11px] lg:text-[12px] hover:bg-spine-deep transition-colors"
          >
            <span className="hidden sm:inline">Schedule Consultation</span>
            <span className="sm:hidden">Consult</span>
            <span className="font-serif italic text-[15px]" aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
