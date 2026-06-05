import type { Metadata } from "next";
import { FinalCta } from "@/components/v2/FinalCta";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { JsonLd } from "@/components/content/JsonLd";
import { breadcrumb } from "@/lib/jsonld";

import "../v2.css";

export const metadata: Metadata = {
  title: "About Premier Limb Lengthening, Founded by Dr. Hrayr Basmajian",
  description:
    "Premier Limb Lengthening is a cosmetic and reconstructive surgery practice created by Dr. Hrayr Basmajian, founder of Premier Orthopaedic & Trauma Specialists, based in Upland, Southern California.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Premier Limb Lengthening, Founded by Dr. Hrayr Basmajian",
    description:
      "A cosmetic and reconstructive surgery practice created by Dr. Hrayr Basmajian, founder of Premier Orthopaedic & Trauma Specialists, based in Upland, Southern California.",
    url: "/about",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const pillars = [
  {
    n: "01",
    title: "Trauma-Trained",
    body: "Our founder is a fellowship-trained orthopaedic trauma and limb lengthening surgeon, and Director of Orthopaedic Trauma at Pomona Valley Hospital Medical Center, one of the busiest Level II trauma centers in Los Angeles County.",
  },
  {
    n: "02",
    title: "Institutional Depth",
    body: "Dr. Basmajian is the founder of Premier Orthopaedic & Trauma Specialists, a 17+ surgeon orthopaedic group with in-house physical therapy and on-site imaging. Premier Limb Lengthening patients have direct access to that infrastructure through Dr. Basmajian's network.",
  },
  {
    n: "03",
    title: "Internal Nail Only",
    body: "Every procedure uses the Precice internal magnetic nail. No external frames. No visible hardware. Faster mobilisation and a virtually invisible long-term result.",
  },
  {
    n: "04",
    title: "Concierge by Default",
    body: "From your first virtual consult through your final follow-up, a dedicated coordinator owns the logistics: flights, housing, physical therapy schedule, and family communication.",
  },
] as const;

const stats = [
  { value: "1,000s", italic: true, label: "Procedures Performed" },
  { value: "17+",  italic: false, label: "Surgeon Group" },
  { value: "1",    italic: true,  label: "Dedicated Coordinator" },
  { value: "50+",  italic: true,  label: "States & Countries Served" },
] as const;

export default function V2AboutPage() {
  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={breadcrumb([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <section className="bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-8">
            <span className="eyebrow mb-5">About · The Practice</span>
            <h1
              className="mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[18ch]"
              style={{ fontSize: "clamp(44px, 7.4vw, 120px)" }}
            >
              Trauma-trained precision, <em className="italic text-spine">applied to limb lengthening.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule lg:self-end">
            <p className="font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft">
              Premier Limb Lengthening is a cosmetic and reconstructive
              surgery practice created by Dr. Hrayr Basmajian, founder of
              Premier Orthopaedic &amp; Trauma Specialists, based in Upland,
              Southern California.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-off py-20 lg:py-28">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-7">
            <p className="v2-dropcap text-[18px] leading-[1.6] text-ink mb-7 max-w-[58ch]">
              Premier Limb Lengthening exists because cosmetic limb lengthening
              deserves to be performed in a setting designed around the
              patient, not as an afterthought to a high-volume surgical
              schedule. Our practice combines the precision of Dr. Basmajian&rsquo;s
              Level II trauma surgery training with the discretion and continuity
              of private concierge care.
            </p>
            <p className="text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch] mb-5">
              Dr. Basmajian founded Premier Orthopaedic &amp; Trauma Specialists,
              a 17+ surgeon orthopaedic group with in-house physical therapy
              and on-site imaging. That institutional depth is what Premier Limb
              Lengthening was built on, and it is why we accept cases other
              practices decline: revision surgery, limb-length discrepancy
              correction, and complex reconstructions.
            </p>
            <p className="text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch]">
              And because most patients travel for limb lengthening, we built
              the concierge program from the first call: flights, lodging,
              physical therapy schedule, post-op check-ins, and one dedicated
              coordinator owning the entire process.
            </p>
          </Reveal>

          <Reveal delay={0.1} as="aside" className="col-span-12 lg:col-span-5 lg:pl-2">
            <div className="border border-ink bg-paper">
              <div className="bg-spine text-paper p-6 lg:p-8">
                <div
                  className="font-mono uppercase tracking-[0.22em] text-[10.5px] inline-flex items-center gap-2.5"
                  style={{ color: "#F4D88A" }}
                >
                  <span aria-hidden className="inline-block w-[22px] h-px" style={{ background: "#F4D88A" }} />
                  By the numbers
                </div>
                <h2 className="mt-3 font-serif font-medium text-[26px] lg:text-[30px] leading-[1.1] tracking-[-0.01em]">
                  Experience that <em className="italic" style={{ color: "#F4D88A" }}>holds up.</em>
                </h2>
              </div>
              <dl className="grid grid-cols-2">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`p-6 lg:p-7 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} border-rule`}
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <div className="font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink">
                        {s.italic ? <em className="italic text-spine">{s.value}</em> : s.value}
                      </div>
                      <div className="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">
                        {s.label}
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-28 border-t border-b border-rule">
        <div className="mx-auto max-w-wrap px-6 lg:px-12">
          <Reveal>
            <header className="pb-8 mb-12 border-b border-ink">
              <span className="eyebrow mb-4">How We Practice</span>
              <h2
                className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[22ch]"
                style={{ fontSize: "clamp(36px, 5.4vw, 76px)" }}
              >
                Four convictions <em className="italic text-spine">that shape the work.</em>
              </h2>
            </header>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-ink">
            {pillars.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 0.08}
                className={`py-10 ${i % 2 === 0 ? "md:pr-10" : "md:pl-10 md:border-l"} ${i < 2 ? "md:border-b" : ""} border-rule`}
              >
                <div className="font-serif italic text-spine text-[44px] lg:text-[52px] leading-none mb-5">
                  {p.n}
                </div>
                <h3 className="font-serif font-medium text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink mb-4 max-w-[18ch]">
                  {p.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-ink-soft max-w-[44ch]">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
      <FooterV2 />
    </>
  );
}
