"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Logo } from "@/components/primitives/Logo";

/**
 * NavV2 — the V2 nav system.
 *
 *   <NavV2 />              → homepage sticky bar that fades in past 120 px.
 *   <NavV2 forceVisible /> → inner-page bar that shows immediately at y=0.
 *   <NavV2Overlay />       → transparent variant rendered inside HeroStage.
 *
 * "Your Surgery" is the only nav item with a sub-menu. On desktop it opens
 * on hover; on mobile it expands inline inside the sheet.
 */

type NavItem = {
  label: string;
  href: string;
  submenu?: ReadonlyArray<{ label: string; href: string }>;
};

const surgerySubmenu = [
  { label: "Surgery Overview", href: "/your-surgery" },
  { label: "External vs. Internal Lengthening", href: "/your-surgery/external-internal-lengthening" },
  { label: "Recovery & Expectations", href: "/your-surgery/limb-lengthening-expectations" },
  { label: "Will Limb Lengthening Hurt?", href: "/your-surgery/will-limb-lengthening-hurt" },
  { label: "Is There an Age Limit?", href: "/your-surgery/is-there-an-age-limit-for-limb-lengthening" },
  { label: "How Much Taller Can I Get?", href: "/your-surgery/how-much-taller-can-i-get-with-limb-lengthening" },
  { label: "Can I Bend My Lengthening Nail?", href: "/your-surgery/can-i-bend-my-lengthening-nail" },
  { label: "Exercise After Limb Lengthening", href: "/your-surgery/exercise-after-limb-lengthening" },
] as const;

const navItems: NavItem[] = [
  { label: "Your Surgery", href: "/your-surgery", submenu: surgerySubmenu },
  { label: "Pricing", href: "/limb-lengthening-pricing-options" },
  { label: "Dr. Basmajian", href: "/dr-basmajian" },
  { label: "About PLL", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/consult" },
];

export function NavV2({ forceVisible = false }: { forceVisible?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(forceVisible);
  const [open, setOpen] = useState(false);
  const [openSubKey, setOpenSubKey] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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
              <Link href="/" aria-label="Premier Limb Lengthening — home" className="flex items-center shrink-0">
                <Logo tone="light" width={170} priority />
              </Link>

              <nav className="hidden lg:flex items-center gap-7 text-[13.5px] text-ink font-medium" aria-label="Primary">
                {navItems.map((item) =>
                  item.submenu ? (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setOpenSubKey(item.href)}
                      onMouseLeave={() => setOpenSubKey(null)}
                    >
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 hover:text-spine transition-colors"
                        aria-haspopup="true"
                        aria-expanded={openSubKey === item.href}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "font-serif italic text-[14px] transition-transform",
                            openSubKey === item.href && "rotate-180",
                          )}
                        >
                          ⌄
                        </span>
                      </Link>
                      <AnimatePresence>
                        {openSubKey === item.href && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2, ease: [0.2, 0.65, 0.3, 1] }}
                            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
                          >
                            <div className="min-w-[360px] bg-paper border border-ink shadow-[0_24px_48px_-12px_rgba(15,20,23,0.25)]">
                              <div className="px-6 pt-5 pb-2 border-b border-rule">
                                <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine inline-flex items-center gap-2.5">
                                  <span aria-hidden className="inline-block w-[22px] h-px bg-spine" />
                                  Your Surgery · Overview
                                </div>
                              </div>
                              <ul className="list-none py-2">
                                {item.submenu.map((s, i) => (
                                  <li key={s.href}>
                                    <Link
                                      href={s.href}
                                      className="group flex items-baseline gap-4 px-6 py-2.5 hover:bg-spine-tint transition-colors"
                                    >
                                      <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted shrink-0 w-6">
                                        {String(i + 1).padStart(2, "0")}
                                      </span>
                                      <span className="font-serif text-[15.5px] leading-[1.3] tracking-[-0.005em] text-ink group-hover:text-spine transition-colors">
                                        {s.label}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link key={item.href} href={item.href} className="hover:text-spine transition-colors">
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="hidden md:flex items-center gap-3">
                <a
                  href={site.phoneHref}
                  className="font-serif italic text-[16px] text-spine hover:text-spine-deep transition-colors"
                >
                  {site.phone}
                </a>
                <a
                  href="/consult"
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
            className="fixed inset-0 z-40 bg-paper-off md:hidden overflow-y-auto"
          >
            <div className="px-6 pt-20 pb-10 flex flex-col gap-2">
              <nav aria-label="Primary mobile" className="flex flex-col">
                {navItems.map((item) =>
                  item.submenu ? (
                    <div key={item.href} className="border-b border-rule">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.href ? null : item.href)
                        }
                        aria-expanded={mobileExpanded === item.href}
                        className="w-full text-left flex items-baseline justify-between gap-4 py-4 font-serif text-[28px] tracking-[-0.01em] text-ink"
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "font-serif italic text-[20px] text-spine transition-transform",
                            mobileExpanded === item.href && "rotate-45",
                          )}
                        >
                          +
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileExpanded === item.href && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="list-none pb-4 pl-4 border-l-2 border-spine">
                              {item.submenu.map((s, i) => (
                                <li key={s.href}>
                                  <Link
                                    href={s.href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-baseline gap-3 py-2.5 font-serif text-[17px] leading-[1.3] tracking-[-0.005em] text-ink"
                                  >
                                    <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted shrink-0 w-6">
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span>{s.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-serif text-[28px] py-4 border-b border-rule tracking-[-0.01em] text-ink"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>
              <div className="flex flex-col gap-3 pt-6">
                <a href="/consult" className="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-spine text-paper font-medium uppercase tracking-wide text-[11.5px]">
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
 * Pure markup, no scroll state — the dark-ground variant decoupled from
 * the sticky bar. Submenu opens on hover here too.
 */
export function NavV2Overlay() {
  const [openSubKey, setOpenSubKey] = useState<string | null>(null);

  return (
    <header className="relative z-30">
      <div className="mx-auto max-w-wrap px-6 lg:px-12 py-4 lg:py-5 grid grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10">
        <Link href="/" aria-label="Premier Limb Lengthening — home" className="flex items-center shrink-0">
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
          {navItems.map((item) =>
            item.submenu ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenSubKey(item.href)}
                onMouseLeave={() => setOpenSubKey(null)}
              >
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 hover:text-cream transition-colors"
                  aria-haspopup="true"
                  aria-expanded={openSubKey === item.href}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "font-serif italic text-[14px] transition-transform",
                      openSubKey === item.href && "rotate-180",
                    )}
                  >
                    ⌄
                  </span>
                </Link>
                <AnimatePresence>
                  {openSubKey === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.2, 0.65, 0.3, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
                    >
                      <div className="min-w-[360px] bg-paper border border-ink shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]">
                        <div className="px-6 pt-5 pb-2 border-b border-rule">
                          <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine inline-flex items-center gap-2.5">
                            <span aria-hidden className="inline-block w-[22px] h-px bg-spine" />
                            Your Surgery · Overview
                          </div>
                        </div>
                        <ul className="list-none py-2">
                          {item.submenu.map((s, i) => (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                className="group flex items-baseline gap-4 px-6 py-2.5 hover:bg-spine-tint transition-colors"
                              >
                                <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted shrink-0 w-6">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="font-serif text-[15.5px] leading-[1.3] tracking-[-0.005em] text-ink group-hover:text-spine transition-colors">
                                  {s.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="hover:text-cream transition-colors">
                {item.label}
              </Link>
            ),
          )}
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
            href="/consult"
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
