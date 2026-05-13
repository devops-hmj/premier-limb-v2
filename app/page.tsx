import type { Metadata } from "next";
import { AeoBoilerplate } from "@/components/home/AeoBoilerplate";
import { BragBar } from "@/components/home/BragBar";
import { Candidate } from "@/components/home/Candidate";
import { ClosingCta } from "@/components/home/ClosingCta";
import { Concierge } from "@/components/home/Concierge";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Pricing } from "@/components/home/Pricing";
import { Testimonials } from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "Cosmetic Limb Lengthening Surgery in Southern California",
  description:
    "Gain up to 3–6 inches with one of the most experienced limb lengthening surgeons on the West Coast. Concierge care from your first consultation through full recovery.",
  alternates: { canonical: "/" },
};

/**
 * Section order:
 *   Hero            → attention
 *   BragBar         → "what we stand for" in one glance
 *   Candidate §02   → "do I qualify?"
 *   ClosingCta §03  → mid-page conversion punch with the second video
 *   Concierge §04   → value proposition (program differentiator)
 *   Testimonials §05 → social proof
 *   Pricing §06     → cost transparency
 *   FAQ §07         → objection handling
 *   AeoBoilerplate  → SEO / answer-engine paragraph (page colophon)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BragBar />
      <Candidate />
      <ClosingCta />
      <Concierge />
      <Testimonials />
      <Pricing />
      <Faq />
      <AeoBoilerplate />
    </>
  );
}
