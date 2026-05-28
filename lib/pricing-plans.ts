/**
 * The six procedure tiers, lifted verbatim from limblengthening.org/leg-lengthening-surgery.
 * Numbers reflect the Paley Stature Center 2026 schedule, review against
 * Premier's actual pricing before publishing.
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
    price: "$104,500",
    from: "Single surgery, both femurs",
    features: [
      "2 PRECICE internal nail implants",
      "Hospitalization",
      "Surgical & anesthesiologist fees",
      "Office follow-up + x-rays through 12 weeks",
      "60 physical therapy sessions",
    ],
  },
  {
    bar: "Plan 02 · Bilateral Tibia",
    title: "Bilateral Tibia Lengthening",
    gen: "Up to 5 cm / 2 in. (single surgery)",
    price: "$115,000",
    from: "Single surgery, both tibias",
    features: [
      "2 PRECICE internal nail implants",
      "Hospitalization",
      "Surgical & anesthesiologist fees",
      "12 weeks of follow-up care",
      "60 physical therapy sessions",
    ],
  },
  {
    bar: "Plan 03 · Combined · Most Selected",
    badge: "Most Selected",
    title: "Combined Tibia + Femur",
    gen: "Up to 10 cm / 4 in. total (5 cm per leg)",
    price: "$209,500",
    from: "Two surgeries, three weeks apart",
    featured: true,
    features: [
      "4 PRECICE internal nail implants",
      "All hospitalization across both stays",
      "All surgical & anesthesia fees",
      "14 weeks follow-up care",
      "70 physical therapy sessions",
    ],
  },
  {
    bar: "Plan 04 · Staged Femur to Tibia",
    title: "Femur, then Tibia (1 year apart)",
    gen: "Up to 13 cm / 5.5 in. total",
    price: "$201k to $220k",
    from: "Two staged surgeries, twelve months apart",
    features: [
      "Two complete procedures with all associated costs",
      "Implants, hospitalization, surgical fees, anesthesia twice",
      "Follow-up + PT block for each stage",
      "Range reflects the implant generation selected",
      "Height gain: up to 13 cm / 5.5 in. total",
    ],
  },
  {
    bar: "Plan 05 · Maximum Height",
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
  {
    bar: "Plan 06 · Bilateral Humeral",
    title: "Bilateral Humeral Lengthening",
    gen: "Arms, up to 5 cm / 2 in.",
    price: "$96,500",
    from: "2-week stay, then remote lengthening",
    features: [
      "2 PRECICE implants",
      "Initial 2-week stay for surgery + activation",
      "Remote lengthening with periodic follow-ups",
      "PT and follow-up support",
      "Height gain: up to 5 cm / 2 in.",
    ],
  },
] as const;
