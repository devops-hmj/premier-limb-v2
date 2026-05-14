"use client";

import { motion } from "framer-motion";
import { Reveal } from "../Reveal";

/**
 * The six procedure tiers, lifted verbatim from limblengthening.org/leg-lengthening-surgery.
 * Numbers reflect the Paley Stature Center 2026 schedule — review against
 * Premier's actual pricing before publishing.
 */
const plans = [
  {
    bar: "Plan 01 · Bilateral Femur",
    title: "Bilateral Femur Lengthening",
    gen: "Up to 8 cm / 3.2 in. — single surgery",
    price: "$104,500",
    from: "Single surgery, both femurs",
    features: [
      "2 PRECICE internal nail implants",
      "Hospitalization",
      "Surgical & anesthesiologist fees",
      "Office follow-up + x-rays through 12 weeks",
      "60 physical therapy sessions",
    ],
  },
  {
    bar: "Plan 02 · Bilateral Tibia",
    title: "Bilateral Tibia Lengthening",
    gen: "Up to 5 cm / 2 in. — single surgery",
    price: "$115,000",
    from: "Single surgery, both tibias",
    features: [
      "2 PRECICE internal nail implants",
      "Hospitalization",
      "Surgical & anesthesiologist fees",
      "12 weeks of follow-up care",
      "60 physical therapy sessions",
    ],
  },
  {
    bar: "Plan 03 · Combined · Most Selected",
    badge: "Most Selected",
    title: "Combined Tibia + Femur",
    gen: "Up to 5 cm each (3 weeks apart) — 10 cm / 4 in. total",
    price: "$209,500",
    from: "Two surgeries, three weeks apart",
    featured: true,
    features: [
      "4 PRECICE internal nail implants",
      "All hospitalization across both stays",
      "All surgical & anesthesia fees",
      "14 weeks follow-up care",
      "70 physical therapy sessions",
    ],
  },
  {
    bar: "Plan 04 · Staged Femur → Tibia",
    title: "Femur, then Tibia (1 year apart)",
    gen: "Up to 13 cm / 5.5 in. total",
    price: "$201,500 – $219,500",
    from: "Two staged surgeries, twelve months apart",
    features: [
      "Two complete procedures with all associated costs",
      "Implants, hospitalization, surgical fees, anesthesia twice",
      "Follow-up + PT block for each stage",
      "Range reflects the implant generation selected",
    ],
  },
  {
    bar: "Plan 05 · Maximum Height",
    title: "Maximum Height Increase",
    gen: "Up to 16 cm / 6.3 in. total — three surgeries",
    price: "$293,000",
    from: "Three staged surgeries over time",
    features: [
      "Three procedures, staged lengthening",
      "All implants, hospitalization, surgical fees, anesthesia",
      "Full follow-up + extended PT block",
      "For candidates seeking the largest possible result",
    ],
  },
  {
    bar: "Plan 06 · Bilateral Humeral",
    title: "Bilateral Humeral Lengthening",
    gen: "Arms — up to 5 cm / 2 in.",
    price: "$96,500",
    from: "2-week stay, then remote lengthening",
    features: [
      "2 PRECICE implants",
      "Initial 2-week stay for surgery + activation",
      "Remote lengthening with periodic follow-ups",
      "PT and follow-up support",
    ],
  },
] as const;

export function PricingPlans() {
  return (
    <section id="plans" className="bg-paper-off py-20 lg:py-28">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="pb-8 mb-12 border-b border-ink grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <span className="eyebrow mb-4">By Procedure</span>
              <h2
                className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98]"
                style={{ fontSize: "clamp(36px, 5.4vw, 76px)" }}
              >
                Six procedures. <em className="italic text-spine">One transparent rate card.</em>
              </h2>
            </div>
            <p className="hidden lg:block col-span-4 text-[14.5px] leading-[1.65] text-ink-soft">
              Each price is the complete surgical bundle — implant, OR time,
              anesthesia, recovery oversight, and physical therapy block.
              Accommodation and home health care are billed separately.
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-b border-ink">
          {plans.map((p, i) => {
            const isLastCol = i % 3 === 2;
            const isLastRow = i >= plans.length - 3;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.2, 0.65, 0.3, 1] }}
                className={`
                  relative py-10 px-7 md:px-0 md:pr-7 ${i % 3 !== 0 ? "lg:pl-6" : ""}
                  ${!isLastCol ? "lg:border-r" : ""}
                  ${i % 2 === 0 ? "md:border-r lg:border-r-0" : ""}
                  ${(i % 3 === 0 || i % 3 === 1) && !isLastCol ? "lg:border-r" : ""}
                  ${!isLastRow ? "border-b lg:border-b" : ""}
                  border-rule
                  ${"featured" in p && p.featured ? "bg-paper md:px-7 lg:px-6" : "bg-paper-off"}
                `}
              >
                <div className="mb-5 flex items-center gap-2.5 font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted">
                  {"featured" in p && p.featured && "badge" in p && (
                    <span className="bg-spine text-paper font-medium px-2.5 py-1 tracking-[0.22em]">
                      {p.badge}
                    </span>
                  )}
                  <span>{p.bar}</span>
                </div>
                <h3 className="font-serif font-medium text-[24px] lg:text-[26px] leading-[1.15] tracking-[-0.01em] text-ink mb-1.5 max-w-[20ch]">
                  {p.title}
                </h3>
                <div className="font-serif italic text-[14.5px] text-muted mb-7 max-w-[36ch]">
                  {p.gen}
                </div>
                <div className="pt-6 border-t border-rule">
                  <div className="font-serif text-[42px] lg:text-[50px] leading-none tracking-[-0.025em] text-ink">
                    {p.price}
                  </div>
                  <div className="mt-2 mb-7 font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted">
                    {p.from}
                  </div>
                </div>
                <ul className="border-t border-rule">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="grid grid-cols-[20px_1fr] gap-1.5 items-baseline py-3 border-b border-rule text-[13.5px] text-ink-soft last:border-b-0"
                    >
                      <span aria-hidden className="font-serif font-medium text-spine text-[15px]">+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
