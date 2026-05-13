import { Container } from "@/components/primitives";

/**
 * BragBar — "Key Stats / Features" strip below the hero.
 * Labels are verbatim from scraped_content/netlify_homepage.md.
 *
 * The wireframe specified emoji prefixes (🏥 ⚙️ ✈️ 💰). The brand voice
 * forbids emoji in product copy — see DESIGN_SYSTEM.md §4. We honor the
 * editorial discipline with mono numeral markers (No 01 …) which preserves
 * the "four equal pillars" intent and reads as a periodical, not a brochure.
 */

// All four numerals in Cream (#F4F0E6) — warmer than green, still reads
// cleanly on the ink ground. Single accent, no alternation.
const features = [
  { n: "01", label: "Hundreds of Procedures Performed" },
  { n: "02", label: "Precice Nail Technology" },
  { n: "03", label: "Concierge Travel Program" },
  { n: "04", label: "Transparent Pricing" },
] as const;

export function BragBar() {
  return (
    <section className="bg-ink text-paper border-b border-ink">
      <Container>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <li
              key={f.n}
              className={[
                "flex items-center gap-4 py-7 px-2 lg:px-6",
                // Top/left/bottom dividers form an editorial grid frame.
                i > 0 && "border-t sm:border-t-0 border-paper/15",
                i % 2 === 1 && "sm:border-l border-paper/15",
                i >= 2 && "sm:border-t lg:border-t-0 border-paper/15",
                i >= 1 && "lg:border-l lg:border-t-0 border-paper/15",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="font-serif italic font-medium text-d-s text-cream">
                Nº {f.n}
              </span>
              <span className="font-serif font-medium text-t-l lg:text-t-xl leading-[1.25] tracking-[-0.005em] [text-wrap:balance]">
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
