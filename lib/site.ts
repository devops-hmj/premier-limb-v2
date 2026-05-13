/**
 * Site-level constants. Single source of truth for nav, phone, address, etc.
 * Pulled verbatim from scraped_content/netlify_homepage.md — do not edit
 * without source-of-truth confirmation. Medical-accuracy mandate applies.
 */

export const site = {
  name: "Premier Limb Lengthening",
  tagline: "A Premier Orthopaedic & Trauma Specialists Clinic",
  phone: "(909) 461-4984",
  phoneHref: "tel:+19094614984",
  address: {
    street: "160 E Artesia Street, Suite 255",
    city: "Pomona",
    state: "CA",
    zip: "91767",
  },
  domain: "premierlimblengthening.com",
} as const;

export const primaryNav = [
  { label: "Your Surgery", href: "/your-surgery" },
  { label: "Pricing", href: "/limb-lengthening-pricing-options" },
  { label: "Dr. Basmajian", href: "/dr-basmajian" },
  { label: "Journal", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
] as const;

/**
 * Footer link groups — labels and target slugs taken from
 * scraped_content/netlify_homepage.md and scraped_content/sitemap.md.
 */
export const footerNav = {
  procedures: [
    { label: "Limb Lengthening Surgery", href: "/your-surgery" },
    { label: "Recovery Timeline", href: "/your-surgery/limb-lengthening-expectations" },
    { label: "External vs. Internal", href: "/your-surgery/external-internal-lengthening" },
    { label: "Will It Hurt?", href: "/your-surgery/will-limb-lengthening-hurt" },
    { label: "Age Limit", href: "/your-surgery/is-there-an-age-limit-for-limb-lengthening" },
  ],
  resources: [
    { label: "Pricing", href: "/limb-lengthening-pricing-options" },
    { label: "Journal", href: "/blog" },
    { label: "Bone Health", href: "/category/bone-health" },
    { label: "After Surgery", href: "/category/after-limb-lengthening" },
    { label: "Insurance & Cost", href: "/category/paying-for-limb-lengthening" },
  ],
  patients: [
    { label: "Schedule Consultation", href: "/consult" },
    { label: "About Dr. Basmajian", href: "/dr-basmajian" },
    { label: "Are You a Candidate?", href: "/are-you-a-good-candidate-for-limb-lengthening" },
    { label: "Insurance Coverage", href: "/is-limb-lengthening-covered-by-insurance" },
    { label: "FAQ", href: "/#faq" },
  ],
} as const;
