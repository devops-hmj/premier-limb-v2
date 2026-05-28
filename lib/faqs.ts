/**
 * Homepage FAQ entries — single source of truth for both the rendered
 * accordion (components/v2/FaqV2.tsx, a client component) and the JSON-LD
 * FAQPage schema emitted from app/page.tsx (a server component).
 *
 * Kept out of FaqV2.tsx so the server page can import without crossing
 * the "use client" boundary: data imported from a "use client" module
 * resolves to a ClientReference on the server side, which is not the
 * actual array (Array.prototype.map fails at build time).
 */
export const faqs = [
  {
    q: "How much does limb lengthening surgery cost?",
    a: "Femur lengthening starts at $77,500 (Precice 2.2) or $80,000 (Precice MAX). Tibia lengthening ranges from $83,000 to $85,000. Every quote includes surgery, implant, anesthesia, hospitalization, and follow-up care. Financing available through CareCredit.",
  },
  {
    q: "How much height can I gain?",
    a: "Femur lengthening typically adds 2 to 3 inches. Tibia lengthening adds another 2 to 3 inches. Combined staged procedures can achieve up to 6 inches total. Results are permanent.",
  },
  {
    q: "How long is the recovery?",
    a: "Active lengthening takes 3 to 4 months. Most patients return to daily activities within 3 to 4 months and full activity by 6 to 12 months.",
  },
  {
    q: "Will there be visible scars or hardware?",
    a: "The Precice system is entirely internal (no external frames, no visible hardware). Small incisions heal to minimal scars.",
  },
  {
    q: "Do you accept out-of-state & international patients?",
    a: "Yes. Our concierge program coordinates flights, ground transportation, extended-stay housing, and physical therapy. We've served patients from 50+ states and countries.",
  },
  {
    q: "Can you handle revision cases?",
    a: "Yes. Dr. Basmajian's trauma reconstruction expertise means we accept revision cases many surgeons decline. We will review your history and imaging before committing to any plan.",
  },
] as const;
