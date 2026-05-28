import { Reveal } from "./Reveal";

const quotes = [
  {
    body: (
      <>
        I researched for two years and consulted three surgeons before choosing
        Dr. Basmajian. His honesty about what to expect (
        <em className="italic text-spine">including the hard parts</em>) is
        what convinced me. I gained 3 inches and my only regret is not doing it
        sooner.
      </>
    ),
    name: "Marcus T.",
    role: "Software Engineer · San Francisco",
  },
  {
    body: (
      <>
        I traveled from New York for the concierge program. They handled my
        flights, hotel, and even had a PT schedule ready before I landed. The
        whole experience{" "}
        <em className="italic text-spine">felt like a medical retreat</em>, not
        a surgery trip.
      </>
    ),
    name: "David R.",
    role: "Finance · New York",
  },
  {
    body: (
      <>
        I had a failed surgery in Turkey and was terrified to try again. Dr.
        Basmajian&rsquo;s trauma background gave me confidence. He was honest
        about what he could fix and what he couldn&rsquo;t.{" "}
        <em className="italic text-spine">I&rsquo;m walking normally again.</em>
      </>
    ),
    name: "James K.",
    role: "Revision Patient · Texas",
  },
] as const;

export function Testimonials() {
  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-wrap px-6 lg:px-12">
        <Reveal>
          <header className="pb-8 mb-12 border-b border-ink">
            <span className="eyebrow mb-4">Patient Stories</span>
            <h2
              className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98]"
              style={{ fontSize: "clamp(40px, 6vw, 84px)" }}
            >
              What our patients <em className="italic text-spine">say.</em>
            </h2>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 border-t border-ink pt-12">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.1} as="article">
              <div className="font-serif italic text-spine text-[88px] leading-[0.6] mb-3">&ldquo;</div>
              <blockquote className="font-serif text-[20px] lg:text-[23px] leading-[1.35] tracking-[-0.005em] text-ink mb-6">
                {q.body}
              </blockquote>
              <figcaption className="pt-4 border-t border-rule font-mono uppercase text-[11px] tracking-[0.14em] text-muted leading-[1.7]">
                <div className="text-spine font-medium">{q.name}</div>
                <div>{q.role}</div>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <a
            href="#stories"
            className="group inline-flex items-center gap-3 px-5 py-3.5 bg-transparent text-spine border border-spine uppercase tracking-wide text-[12px] font-medium hover:bg-spine hover:text-paper transition-colors"
          >
            Read More Patient Stories
            <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
