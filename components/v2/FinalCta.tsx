import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

/**
 * FinalCta — full-bleed spine-blue closing CTA. Two-column at lg.
 */
export function FinalCta() {
  return (
    <section id="consult" className="bg-spine text-paper py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8 items-end">
        <Reveal className="col-span-12 lg:col-span-7">
          <span className="font-mono uppercase text-[11px] tracking-[0.2em] inline-flex items-center gap-3" style={{ color: "#F4D88A" }}>
            <span aria-hidden className="inline-block w-[22px] h-px" style={{ background: "#F4D88A" }} />
            Begin
          </span>
          <h2
            className="mt-5 font-serif font-medium tracking-[-0.03em] text-paper leading-[1.04] [text-wrap:balance]"
            style={{ fontSize: "clamp(34px, 4.6vw, 72px)" }}
          >
            Dr. Basmajian takes a limited number of cosmetic limb lengthening
            cases. <em className="italic" style={{ color: "#F4D88A" }}>This is where you start.</em>
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="col-span-12 lg:col-span-5 lg:pl-6 lg:border-l border-white/25"
        >
          <p className="font-serif italic text-[20px] lg:text-[22px] text-paper/95 mb-7 leading-[1.3]">
            Consultations are confidential, held virtually or in-person, and
            carry no obligation. Dr. Basmajian evaluates every patient
            personally. No associates. No rotating surgeons.
          </p>
          <div className="flex flex-col gap-3 items-start">
            <a
              href="/consult"
              className="group inline-flex items-center gap-3 px-5 py-3.5 text-ink uppercase tracking-wide text-[12px] font-medium hover:bg-paper transition-colors"
              style={{ background: "#F4D88A" }}
            >
              Schedule a Confidential Consultation
              <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
            <a
              href={site.phoneHref}
              className="group inline-flex items-center gap-3 px-5 py-3.5 bg-transparent text-paper border border-white/40 uppercase tracking-wide text-[12px] font-medium hover:bg-paper hover:text-spine hover:border-paper transition-colors"
            >
              Call {site.phone}
              <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
