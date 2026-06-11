"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const pillars = [
  {
    tag: "01 · Expertise",
    title: "Surgical Expertise",
    body: "Thousands of procedures performed in trauma, cosmetic, and revisional settings by Dr. Hrayr Basmajian.",
    link: { label: "Meet Dr. Basmajian", href: "#dr" },
  },
  {
    tag: "02 · Judgment",
    title: "Surgical Judgment, Not Just Technology",
    body: "The Precice nail is only as precise as the surgeon placing it. Dr. Basmajian's trauma fellowship training gives him the bone mechanics expertise to manage complications, revisions, and edge cases that a lengthening-only practice cannot handle.",
    link: { label: "How It Works", href: "#surgery" },
  },
  {
    tag: "03 · Service",
    title: "Concierge Experience",
    body: "We coordinate flights, hotels, ground transportation, and recovery housing for out-of-area patients. White-glove care, start to finish.",
    link: { label: "Travel Program", href: "#concierge" },
  },
  {
    tag: "04 · Institution",
    title: "Institutional Depth",
    body: "Founded by Dr. Basmajian, who also founded Premier Orthopaedic & Trauma Specialists, a 17+ surgeon group with in-house physical therapy and on-site imaging. Our patients access that infrastructure through his network.",
    link: { label: "About Our Practice", href: "#practice" },
  },
] as const;

export function Pillars() {
  return (
    <section id="why" className="bg-paper-off py-20 lg:py-28 border-b border-rule">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="mb-12">
            <span className="eyebrow mb-4">Why Premier Limb Lengthening</span>
            <h2 className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[24ch] [text-wrap:balance]" style={{ fontSize: "clamp(40px, 6vw, 84px)" }}>
              Four reasons patients <em className="italic text-spine">choose us.</em>
            </h2>
          </header>
        </Reveal>

        {/* Mobile: edge-bled swipe row (client request); md+ keeps the grid. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-ink max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-6 max-md:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.65, 0.3, 1] }}
              className={`group py-9 pr-7 flex flex-col gap-4 min-h-[300px] lg:min-h-[340px] max-md:w-[84%] max-md:shrink-0 max-md:snap-start ${i > 0 ? "max-md:border-l max-md:pl-6" : ""} ${i % 2 === 1 ? "md:pl-5" : ""} ${i > 0 ? "lg:pl-5" : "lg:pl-0"} ${i < pillars.length - 1 ? "lg:border-r" : ""} ${i % 2 === 0 ? "md:border-r" : ""} ${i < 2 ? "md:border-b lg:border-b-0" : ""} border-rule lg:border-b-0`}
            >
              <div className="inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">
                <span className="inline-block w-2 h-2 bg-spine group-hover:bg-spine-deep transition-colors" aria-hidden />
                {p.tag}
              </div>
              <h3 className="font-serif font-medium text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink">
                {p.title}
              </h3>
              <p className="flex-1 text-[14.5px] text-ink-soft leading-[1.65]">{p.body}</p>
              <a
                href={p.link.href}
                className="self-start inline-flex items-center gap-2.5 pb-1 font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine"
              >
                {p.link.label}
                <span className="font-serif italic text-[16px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
