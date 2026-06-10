import type { Metadata } from "next";
import { AddOns } from "@/components/v2/pricing/AddOns";
import { Financing } from "@/components/v2/pricing/Financing";
import { FooterV2 } from "@/components/v2/FooterV2";
import { IncludedExcluded } from "@/components/v2/pricing/IncludedExcluded";
import { NavV2 } from "@/components/v2/NavV2";
import { PricingHero } from "@/components/v2/pricing/PricingHero";
import { PricingPlans } from "@/components/v2/pricing/PricingPlans";
import { plans } from "@/lib/pricing-plans";
import { JsonLd } from "@/components/content/JsonLd";
import { breadcrumb, pricingSchema } from "@/lib/jsonld";

import "../v2.css";

export const metadata: Metadata = {
  title: "Limb Lengthening Cost · Pricing & Financing",
  description:
    "Transparent 2026 pricing for cosmetic limb lengthening. Every quote bundles implants, OR time, hospitalization, anesthesia, follow-up care, and on-site sessions.",
  alternates: { canonical: "/limb-lengthening-pricing-options" },
  openGraph: {
    title: "Limb Lengthening Cost · Pricing & Financing",
    description:
      "Transparent 2026 pricing for cosmetic limb lengthening. Bundled implants, OR time, hospitalization, anesthesia, follow-up care, and on-site sessions.",
    url: "/limb-lengthening-pricing-options",
    type: "website",
  },
  robots: { index: true, follow: true },
};

/**
 * /limb-lengthening-pricing-options — full editorial pricing page.
 *
 * Dollar amounts live in lib/pricing-plans.ts. Femur, Tibia, and Combined are
 * Premier's confirmed 2026 prices (client review, batch 1); Maximum Height is
 * still a reference figure pending confirmation before external publishing.
 *
 * Composition:
 *   NavV2 (forceVisible) → no hero on this page, so the sticky bar shows
 *                          from scroll position 0.
 *   PricingHero          → eyebrow + h1 + intro paragraph
 *   PricingPlans         → 3 procedure tiers in a 3-column grid
 *   AddOns               → optional corrections + hardware removal tables
 *   IncludedExcluded     → two-column dossier of bundled vs. separate costs
 *   Financing            → spine-blue CTA callout with monthly + CareCredit
 *   FooterV2             → ink-ground footer (site-wide)
 */
export default function V2PricingPage() {
  return (
    <>
      <NavV2 forceVisible />
      <JsonLd
        data={[
          pricingSchema(plans.map((p) => ({ name: p.title, price: p.price }))),
          breadcrumb([
            { name: "Home", url: "/" },
            { name: "Pricing", url: "/limb-lengthening-pricing-options" },
          ]),
        ]}
      />
      <PricingHero />
      <PricingPlans />
      <AddOns />
      <IncludedExcluded />
      <Financing />
      <FooterV2 />
    </>
  );
}
