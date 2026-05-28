"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "How much does limb lengthening surgery cost?",
    a: "Femur lengthening starts at $77,500 (Precice 2.2) or $80,000 (Precice MAX). Tibia lengthening ranges from $83,000–$85,000. Every quote includes surgery, implant, anesthesia, hospitalization, and follow-up care. Financing available through CareCredit.",
  },
  {
    q: "How much height can I gain?",
    a: "Femur lengthening typically adds 2–3 inches. Tibia lengthening adds another 2–3 inches. Combined staged procedures can achieve up to 5–6 inches total. Results are permanent.",
  },
  {
    q: "How long is the recovery?",
    a: "Active lengthening takes 3 to 4 months. Most patients return to daily activities within 3 to 4 months and full activity by 6 to 12 months.",
  },
  {
    q: "Will there be visible scars or hardware?",
    a: "The Precice system is entirely internal (no external frames, no visible hardware). Small incisions heal to minimal scars.",
  },
  {
    q: "Do you accept out-of-state & international patients?",
    a: "Yes. Our concierge program coordinates flights, ground transportation, extended-stay housing, and physical therapy. We've served patients from 50+ states and countries.",
  },
  {
    q: "Can you handle revision cases?",
    a: "Yes. Dr. Basmajian's trauma reconstruction expertise means we accept revision cases many surgeons decline. We will review your history and imaging before committing to any plan.",
  },
] as const;

export function FaqV2() {
  // First item open by default — mirrors the reference dossier.
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper-off py-20 lg:py-28">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="pb-8 mb-12 border-b border-ink">
            <span className="eyebrow mb-4">Common Questions</span>
            <h2
              className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98]"
              style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
            >
              Frequently asked <em className="italic text-spine">questions.</em>
            </h2>
          </header>
        </Reveal>

        <div className="max-w-[1020px] mx-auto border-t border-ink">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={f.q} className="border-b border-rule">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full text-left py-7 grid grid-cols-[44px_1fr_36px] sm:grid-cols-[60px_1fr_36px] items-baseline gap-4 sm:gap-6 cursor-pointer"
                >
                  <span className="font-serif italic text-spine text-[20px] sm:text-[24px] leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif font-medium text-[20px] sm:text-[24px] leading-[1.25] tracking-[-0.01em] text-ink">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.2, 0.65, 0.3, 1] }}
                    className="justify-self-end font-serif italic text-spine text-[28px] sm:text-[30px] leading-none"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-[44px] sm:pl-[84px] pr-4 sm:pr-11 max-w-[72ch] text-[14.5px] leading-[1.7] text-ink-soft">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
