"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * PillarFaq — compact question accordion for the SEO pillar pages
 * (/height-surgery, /leg-lengthening-surgery). Same interaction language as
 * the homepage FaqV2 (numbered serif rows, plus toggle) scaled down to sit
 * inside the article prose column. Mirrors the live site's pll/faq block.
 */
export function PillarFaq({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="my-8 border-t border-ink">
      {items.map((f, i) => {
        const open = openIdx === i;
        return (
          <div key={f.q} className="border-b border-rule">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIdx(open ? null : i)}
              className="w-full text-left py-5 grid grid-cols-[40px_1fr_32px] items-baseline gap-4 cursor-pointer"
            >
              <span className="font-serif italic text-spine text-[17px] leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif font-medium text-[18px] sm:text-[20px] leading-[1.3] tracking-[-0.005em] text-ink">
                {f.q}
              </span>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.2, 0.65, 0.3, 1] }}
                className="justify-self-end font-serif italic text-spine text-[24px] leading-none"
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
                  transition={{ duration: 0.3, ease: [0.2, 0.65, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-[56px] pr-8 max-w-[62ch] text-[15px] leading-[1.7] text-ink-soft">
                    {f.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
