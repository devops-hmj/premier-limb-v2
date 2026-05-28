import type { Metadata } from "next";
import { AddOns } from "@/components/v2/pricing/AddOns";
import { Financing } from "@/components/v2/pricing/Financing";
import { FooterV2 } from "@/components/v2/FooterV2";
import { IncludedExcluded } from "@/components/v2/pricing/IncludedExcluded";
import { NavV2 } from "@/components/v2/NavV2";
import { PricingHero } from "@/components/v2/pricing/PricingHero";
import { PricingPlans } from "@/components/v2/pricing/PricingPlans";

import "../v2.css";

export const metadata: Metadata = {
  title: "Limb Lengthening Cost — Pricing & Financing",
  description:
    "Transparent 2026 pricing for cosmetic limb lengthening. Every quote bundles implants, OR time, hospitalization, anesthesia, follow-up care, and physical therapy.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Limb Lengthening Cost — Pricing & Financing",
    description:
      "Transparent 2026 pricing for cosmetic limb lengthening. Bundled implants, OR time, hospitalization, anesthesia, follow-up care, and physical therapy.",
    url: "/pricing",
    type: "website",
  },
  robots: { index: true, follow: true },
};

/**
 * /pricing — full editorial pricing page.
 *
 * Content + dollar amounts mirrored from limblengthening.org/leg-lengthening-surgery
 * (Paley Stature Center 2026 schedule). These are PLACEHOLDER numbers for
 * the design review; Premier's actual pricing must be substituted before
 * publishing externally.
 *
 * Composition:
 *   NavV2 (forceVisible) → no hero on this page, so the sticky bar shows
 *                          from scroll position 0.
 *   PricingHero          → eyebrow + h1 + intro paragraph
 *   PricingPlans         → 6 procedure tiers in a 3-column editorial grid
 *   AddOns               → optional corrections + hardware removal tables
 *   IncludedExcluded     → two-column dossier of bundled vs. separate costs
 *   Financing            → spine-blue CTA callout with monthly + CareCredit
 *   FooterV2             → ink-ground footer (site-wide)
 */
export default function V2PricingPage() {
  return (
    <>
      <NavV2 forceVisible />
      <PricingHero />
      <PricingPlans />
      <AddOns />
      <IncludedExcluded />
      <Financing />
      <FooterV2 />
    </>
  );
}
