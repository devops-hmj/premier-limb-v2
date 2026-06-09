"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const rows = [
  { n: "01", h: "Travel Coordination",          p: "Flight booking assistance, airport transfers, and ground transportation throughout your stay in Southern California.", mk: "Global" },
  { n: "02", h: "Recovery Accommodations",      p: "Pre-vetted, surgeon-approved extended-stay housing near our Upland facility. Wheelchair-accessible, fully furnished, discounted rates.", mk: "Vetted" },
  { n: "03", h: "PT & Follow-Up Scheduling",    p: "Your physical therapy schedule is set before you arrive. All post-op visits coordinated. Nothing falls through the cracks.", mk: "Pre-Set" },
  { n: "04", h: "Dedicated Patient Coordinator", p: "One agent. One phone number. From your first call through your final follow-up. Available 7 days a week during your recovery.", mk: "1-to-1" },
  { n: "05", h: "Virtual Pre-Op & Remote Follow-Up", p: "Initial consultation via secure video or in-person. Post-op check-ins from home once you return. Minimizes trips to California.", mk: "Remote" },
] as const;

export function Concierge() {
  return (
    <section id="concierge" className="bg-paper-off py-20 lg:py-28 border-b border-rule">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="pb-8 mb-12 border-b border-ink">
            <span className="eyebrow mb-4">Only at Premier</span>
            <h2
              className="mt-4 font-serif font-medium tracking-[-0.025em] text-ink leading-[0.98]"
              style={{ fontSize: "clamp(40px, 6.4vw, 86px)" }}
            >
              Your surgery. <em className="italic text-spine">Our concierge.</em>
            </h2>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16 items-start">
          <Reveal>
            <p className="font-serif italic text-[24px] lg:text-[26px] leading-[1.25] text-ink py-5 border-t border-ink border-b border-rule max-w-[32ch] mb-7">
              You focus on your transformation. We handle everything else.
            </p>
            <p className="text-[15.5px] leading-[1.7] text-ink-soft max-w-[54ch] mb-10">
              Most limb lengthening patients travel for their procedure, and
              most clinics leave you to figure out the logistics alone. Not
              here. Premier Limb Lengthening offers a full white-glove
              concierge program that coordinates every detail of your surgery.
            </p>

            <div className="border-t border-ink">
              {rows.map((r, i) => (
                <motion.div
                  key={r.n}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ backgroundColor: "rgba(243, 246, 248, 1)" }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="grid grid-cols-[40px_1fr] sm:grid-cols-[36px_1.2fr_2fr_80px] gap-x-6 gap-y-2 items-baseline py-6 border-b border-rule"
                >
                  <div className="font-serif italic text-spine text-[22px]">{r.n}</div>
                  <h4 className="font-serif font-medium text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink">
                    {r.h}
                  </h4>
                  <p className="col-span-2 sm:col-span-1 text-[14px] leading-[1.6] text-ink-soft">{r.p}</p>
                  <div className="col-start-2 sm:col-start-4 font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine sm:text-right whitespace-nowrap">
                    {r.mk}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex gap-3.5 flex-wrap">
              <a
                href="#concierge-full"
                className="group inline-flex items-center gap-3 px-5 py-3.5 bg-spine text-paper uppercase tracking-wide text-[12px] font-medium border border-spine hover:bg-spine-deep hover:border-spine-deep transition-colors"
              >
                Learn About Our Concierge Program
                <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
              <a
                href="#virtual"
                className="group inline-flex items-center gap-3 px-5 py-3.5 bg-transparent text-spine border border-spine uppercase tracking-wide text-[12px] font-medium hover:bg-spine hover:text-paper transition-colors"
              >
                Schedule a Virtual Consultation
                <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} as="aside" className="lg:sticky lg:top-24">
            <figure
              className="v2-portrait v2-portrait-diag aspect-[4/5] bg-paper-warm border border-rule mb-4 relative overflow-hidden"
              aria-label="Dr. Basmajian reviewing an X-ray"
            >
              <Image
                src="/dr-xray.jpg"
                alt="Dr. Hrayr Basmajian reviewing an X-ray of a patient's femur"
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover"
              />
              <span className="absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper-off">
                Reviewing Imaging
              </span>
            </figure>
            <div className="grid grid-cols-2 border border-ink bg-paper">
              <div className="px-4 py-5 border-r border-rule">
                <div className="font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink">
                  <em className="italic text-spine">50</em>+
                </div>
                <div className="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">
                  States &amp; Countries
                </div>
              </div>
              <div className="px-4 py-5">
                <div className="font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink">
                  <em className="italic text-spine">100</em>%
                </div>
                <div className="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">
                  Logistics Handled
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
