/**
 * Site-level constants. Single source of truth for the practice details
 * (name, phone, address). Nav data lives co-located inside each nav/footer
 * component, since the V2 design is the canonical chrome.
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
