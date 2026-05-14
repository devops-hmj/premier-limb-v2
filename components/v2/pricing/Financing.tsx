import { Reveal } from "../Reveal";
import { site } from "@/lib/site";

/**
 * Financing — spine-blue editorial callout. Mirrors the FinalCta layout
 * style (two-column on lg) so the page closes with the same rhythm as the
 * homepage. Numeric stats double as visual hooks.
 */
export function Financing() {
  return (
    <section id="financing" className="bg-spine text-paper py-24 lg:py-32">
      <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8 items-end">
        <Reveal className="col-span-12 lg:col-span-7">
          <span className="font-mono uppercase text-[11px] tracking-[0.2em] inline-flex items-center gap-3" style={{ color: "#F4D88A" }}>
            <span aria-hidden className="inline-block w-[22px] h-px" style={{ background: "#F4D88A" }} />
            Financing
          </span>
          <h2
            className="mt-5 font-serif font-medium tracking-[-0.03em] text-paper leading-[0.98]"
            style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
          >
            Pay it down over time <em className="italic" style={{ color: "#F4D88A" }}>—&nbsp;not all at once.</em>
          </h2>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-0 border-t border-white/25">
            <div className="py-6 pr-5 border-r border-white/15">
              <div className="font-serif text-[40px] lg:text-[52px] leading-none tracking-[-0.02em]">
                <em style={{ color: "#F4D88A" }} className="italic">$1,200</em>
                <span className="text-[24px] lg:text-[28px] align-baseline">/mo</span>
              </div>
              <div className="mt-2 font-mono uppercase tracking-[0.18em] text-[10.5px] text-paper/80">
                Indicative monthly
              </div>
            </div>
            <div className="py-6 pr-5 sm:border-r border-white/15">
              <div className="font-serif text-[40px] lg:text-[52px] leading-none tracking-[-0.02em]">
                <em style={{ color: "#F4D88A" }} className="italic">CareCredit</em>
              </div>
              <div className="mt-2 font-mono uppercase tracking-[0.18em] text-[10.5px] text-paper/80">
                Primary partner
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 py-6 pr-5">
              <div className="font-serif text-[40px] lg:text-[52px] leading-none tracking-[-0.02em]">
                <em style={{ color: "#F4D88A" }} className="italic">0&nbsp;%</em>
                <span className="text-[24px] lg:text-[28px] align-baseline">&nbsp;intro</span>
              </div>
              <div className="mt-2 font-mono uppercase tracking-[0.18em] text-[10.5px] text-paper/80">
                With approved credit
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="col-span-12 lg:col-span-5 lg:pl-6 lg:border-l border-white/25"
        >
          <p className="font-serif italic text-[20px] lg:text-[22px] text-paper/95 mb-7 leading-[1.3]">
            Most patients combine personal savings with a CareCredit plan.
            We&rsquo;ll walk you through the math during your consultation —
            no obligation, no sales pressure.
          </p>
          <div className="flex flex-col gap-3 items-start">
            <a
              href="#consult"
              className="group inline-flex items-center gap-3 px-5 py-3.5 uppercase tracking-wide text-[12px] font-medium text-ink hover:bg-paper transition-colors"
              style={{ background: "#F4D88A" }}
            >
              Schedule a Pricing Consultation
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
