import type { Metadata } from "next";
import Image from "next/image";
import { FooterV2 } from "@/components/v2/FooterV2";
import { NavV2 } from "@/components/v2/NavV2";
import { Reveal } from "@/components/v2/Reveal";
import { FinalCta } from "@/components/v2/FinalCta";
import { JsonLd } from "@/components/content/JsonLd";
import { breadcrumb, physicianSchema } from "@/lib/jsonld";

import "../v2.css";

export const metadata: Metadata = {
  title: "Dr. Hrayr Basmajian — Limb Lengthening Surgeon",
  description:
    "Board-certified orthopaedic trauma surgeon and Medical Director of Orthopaedic Trauma at Pomona Valley Hospital. Thousands of limb lengthening procedures performed.",
  alternates: { canonical: "/dr-basmajian" },
  openGraph: {
    title: "Dr. Hrayr Basmajian — Limb Lengthening Surgeon",
    description:
      "Board-certified orthopaedic trauma surgeon. Director, Orthopaedic Trauma at Pomona Valley Hospital. Thousands of limb lengthening procedures performed.",
    url: "/dr-basmajian",
    type: "profile",
    images: [{ url: "/dr-picture.jpg", width: 800, height: 1000, alt: "Dr. Hrayr Basmajian" }],
  },
  robots: { index: true, follow: true },
};

const credentials = [
  { label: "Board Certified", value: "American Board of Orthopaedic Surgery" },
  { label: "Director", value: "Orthopaedic Trauma · Pomona Valley Hospital Medical Center" },
  { label: "Faculty", value: "Assistant Professor of Orthopaedic Surgery" },
  { label: "Previously", value: "Chair of Orthopaedic Trauma · Loma Linda University Medical Center" },
  { label: "Procedures", value: "Thousands of limb lengthening procedures performed" },
  { label: "Teaching", value: "Lectures regularly to residents and surgeons on advanced trauma care" },
] as const;

/**
 * /dr-basmajian — extended editorial bio page.
 *
 * Composition:
 *   Hero band         → eyebrow + h1 + portrait
 *   Lede + intro      → drop-cap paragraph + supporting body
 *   Pull quote        → Dr. Basmajian's mission statement, set as a feature quote
 *   Continued body    → training-other-surgeons paragraph
 *   Credentials       → dossier-style two-column table
 *   CV link           → editorial download CTA
 *   FinalCta          → shared closing
 */
export default function V2DrBasmajianPage() {
  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={[
          physicianSchema(),
          breadcrumb([
            { name: "Home", url: "/" },
            { name: "Dr. Basmajian", url: "/dr-basmajian" },
          ]),
        ]}
      />

      <section className="bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8 items-end">
          <Reveal className="col-span-12 lg:col-span-7">
            <span className="eyebrow mb-5">Profile · Your Surgeon</span>
            <h1
              className="mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.94] max-w-[16ch]"
              style={{ fontSize: "clamp(48px, 8vw, 132px)" }}
            >
              Dr. Hrayr <em className="italic text-spine">Basmajian.</em>
            </h1>
            <div className="mt-6 pt-4 border-t border-rule font-mono uppercase tracking-[0.18em] text-[12px] text-ink">
              Orthopaedic Trauma Surgeon · Fellowship-Trained · Director, PVHMC
            </div>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-5">
            <figure className="v2-portrait aspect-[4/5] bg-paper-warm border border-rule relative overflow-hidden max-w-[90%]">
              <Image
                src="/dr-picture.jpg"
                alt="Dr. Hrayr Basmajian, Orthopaedic Trauma Surgeon"
                fill
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="object-cover"
                priority
              />
              <span className="absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper">
                Plate · Profile
              </span>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-off py-20 lg:py-28">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
          <Reveal className="col-span-12 lg:col-span-7">
            <p className="v2-dropcap text-[18px] leading-[1.6] text-ink mb-7 max-w-[58ch]">
              Dr. Basmajian is a board-certified orthopaedic surgeon
              specializing in trauma and non-trauma musculoskeletal concerns.
              He is the Orthopaedic Trauma Medical Director at Pomona Valley
              Hospital Medical Center — one of the busiest trauma centers in
              Los Angeles — and an assistant professor of orthopaedic surgery.
              Previously, he was Chair of Orthopaedic Trauma at Loma Linda
              University Medical Center.
            </p>
            <p className="text-[15.5px] leading-[1.7] text-ink-soft mb-5 max-w-[58ch]">
              Dr. Basmajian&rsquo;s career has been punctuated by an
              insatiable drive toward quality improvement in the orthopaedic
              programs he helms as well as always striving to hone his own
              skills. His knowledge, compassion, and deep understanding of
              orthopaedic surgery and patient needs have made him a go-to
              provider across Southern California and the United States.
            </p>
            <p className="text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch]">
              Dr. Basmajian has developed a particular interest in limb
              lengthening for several reasons, not least of which is the
              stunning transformation a patient undergoes physically and
              emotionally. Further, as a trauma surgeon, safe and effective
              limb lengthening is a cornerstone of his practice, with
              thousands of these procedures performed successfully over his
              time in practice. Dr. Basmajian has also seen the effects of
              improper limb lengthening that can result in deformity and a
              need for costly and painful correction.
            </p>
            <p className="mt-5 font-serif font-medium text-[20px] text-ink max-w-[58ch]">
              Doing it right the first time is an integral part of his practice.
            </p>
          </Reveal>

          <Reveal delay={0.1} as="aside" className="col-span-12 lg:col-span-5 lg:pl-2">
            <blockquote className="relative bg-paper border-l-2 border-spine p-7 lg:p-9">
              <span aria-hidden className="font-serif italic text-spine text-[88px] leading-[0.4] block mb-3">&ldquo;</span>
              <p className="font-serif italic text-[20px] lg:text-[22px] leading-[1.4] text-ink">
                The need for quality care in orthopaedic surgery, limb
                lengthening, and medicine in general is as significant today as
                ever. Despite technological advances, a surgeon&rsquo;s
                dedication to their craft can still be the difference between
                good and great results. At Premier&rsquo;s Limb-lengthening
                Institute, each patient is integral to our practice and
                deserves the utmost in attention and care. Our patients always
                come first and know they will receive direct and honest advice
                from our team.
              </p>
              <footer className="mt-6 pt-4 border-t border-rule font-mono uppercase tracking-[0.18em] text-[11px] text-muted">
                <span className="text-spine font-medium">Dr. Hrayr Basmajian</span>
                <br />Founder · Premier Limb Lengthening
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 lg:py-28 border-t border-b border-rule">
        <div className="mx-auto max-w-wrap px-6 lg:px-12">
          <Reveal>
            <header className="pb-8 mb-12 border-b border-ink">
              <span className="eyebrow mb-4">Credentials</span>
              <h2
                className="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[22ch]"
                style={{ fontSize: "clamp(36px, 5.4vw, 76px)" }}
              >
                A career built on <em className="italic text-spine">trauma precision.</em>
              </h2>
            </header>
          </Reveal>

          <Reveal>
            <div className="border-t border-ink">
              {credentials.map((row, i) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 py-5 border-b border-rule items-baseline"
                >
                  <div className="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine">
                    {String(i + 1).padStart(2, "0")} · {row.label}
                  </div>
                  <div className="font-serif text-[18px] lg:text-[20px] leading-[1.35] text-ink max-w-[60ch]">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-10 text-[15.5px] leading-[1.7] text-ink-soft max-w-[62ch]">
              In addition to his private practice endeavors, Dr. Basmajian
              trains other surgeons in the most advanced and newest
              orthopaedic techniques to improve outcomes and decrease
              complications. He works with various surgical programs and
              medical centers to enhance quality of care through novel
              operating room procedures and setups.
            </p>

            <a
              href="https://premierlimblengthening.com/wp-content/uploads/2023/09/Basmajian-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 px-5 py-3.5 bg-ink text-paper uppercase tracking-wide text-[12px] font-medium hover:bg-spine transition-colors"
            >
              Curriculum Vitae &amp; PubMed Articles
              <span className="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <FinalCta />
      <FooterV2 />
    </>
  );
}
