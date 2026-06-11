import { Article } from "./Article";
import { Bio } from "./Bio";
import { Candidate } from "./Candidate";
import { Concierge } from "./Concierge";
import { FaqV2 } from "./FaqV2";
import { FinalCta } from "./FinalCta";
import { FooterV2 } from "./FooterV2";
import { HeroStage } from "./HeroStage";
import { NavV2 } from "./NavV2";
import { Pillars } from "./Pillars";
import { Pricing } from "./Pricing";
import { Process } from "./Process";
import { Results } from "./Results";
import { Testimonials } from "./Testimonials";

/**
 * V2HomePage — the canonical V2 homepage composition.
 *
 * Rendered by /page.tsx (the canonical homepage at /).
 *
 * Composition (top → bottom), per the J Cubed homepage handoff v2
 * (the surgeon is the product — Bio sits directly after the hero):
 *   1. HeroStage      → video-backed masthead + headline (NavV2Overlay inside)
 *   2. Article        → paper-off lede + 5-up trust strip (hero continuation)
 *   3. Bio            → Dr. Basmajian feature (moved up from position 4)
 *   4. Pillars        → 4 reasons patients choose us
 *   5. Process        → 3-phase timeline on spine blue
 *   6. Candidate      → 8-item list + blue aside CTA
 *   7. Concierge      → 5-row program list + sticky aside
 *   8. Results        → 3 metrics on ink black
 *   9. Pricing        → 3-plan editorial table
 *  10. Testimonials   → 3 patient stories
 *  11. FaqV2          → animated accordion
 *  12. FinalCta       → spine-blue closing
 *  13. FooterV2       → ink-ground footer
 *
 * NavV2 (the condensed sticky bar that fades in post-scroll) is mounted at
 * the top so it can layer above every section as the user scrolls.
 */
export function V2HomePage() {
  return (
    <>
      <NavV2 />
      <HeroStage />
      <Article />
      <Bio />
      <Pillars />
      <Process />
      <Candidate />
      <Concierge />
      <Results />
      <Pricing />
      <Testimonials />
      <FaqV2 />
      <FinalCta />
      <FooterV2 />
    </>
  );
}
