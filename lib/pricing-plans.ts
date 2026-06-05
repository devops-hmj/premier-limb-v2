/**
 * The four procedure tiers shown on /limb-lengthening-pricing-options.
 *
 * Femur, Tibia, and Combined prices are Premier's confirmed 2026 numbers
 * (client review, batch 1). Maximum Height retains the prior reference figure
 * and is still pending client confirmation before external publishing.
 *
 * Single source of truth for both the rendered pricing grid
 * (components/v2/pricing/PricingPlans.tsx, a client component) and the
 * JSON-LD ItemList schema emitted from app/limb-lengthening-pricing-options/page.tsx
 * (a server component). Kept out of the client component so the server
 * page can import without crossing the "use client" boundary.
 */
export const plans = [
  {
    bar: "Plan 01 · Bilateral Femur",
    title: "Bilateral Femur Lengthening",
    gen: "Up to 8 cm / 3.2 in. (single surgery)",
    price: "$95,500",
    from: "Single surgery, both femurs",
    features: [
      "2 PRECICE internal nail implants",
      "Hospitalization",
      "Surgical & anesthesiologist fees",
      "Office follow-up + x-rays through 12 weeks",
      "60 on-site sessions",
    ],
  },
  {
    bar: "Plan 02 · Bilateral Tibia",
    title: "Bilateral Tibia Lengthening",
    gen: "Up to 5 cm / 2 in. (single surgery)",
    price: "$105,500",
    from: "Single surgery, both tibias",
    features: [
      "2 PRECICE internal nail implants",
      "Hospitalization",
      "Surgical & anesthesiologist fees",
      "12 weeks of follow-up care",
      "60 on-site sessions",
    ],
  },
  {
    bar: "Plan 03 · Combined · Most Selected",
    badge: "Most Selected",
    title: "Combined Tibia + Femur",
    gen: "Up to 10 cm / 4 in. total (5 cm per leg)",
    price: "$195,000",
    from: "Two surgeries, three weeks apart",
    featured: true,
    features: [
      "4 PRECICE internal nail implants",
      "All hospitalization across both stays",
      "All surgical & anesthesia fees",
      "14 weeks follow-up care",
      "70 on-site sessions",
    ],
  },
  {
    bar: "Plan 04 · Maximum Height",
    title: "Maximum Height Increase",
    gen: "Up to 16 cm / 6.3 in. (three surgeries)",
    price: "$293,000",
    from: "Three staged surgeries over time",
    features: [
      "Three procedures, staged lengthening",
      "All implants, hospitalization, surgical fees, anesthesia",
      "Full follow-up + extended PT block",
      "For candidates seeking the largest possible result",
      "Height gain: up to 16 cm / 6.3 in. total",
    ],
  },
] as const;
