/**
 * Site-level constants. Single source of truth for the practice details
 * (name, phone, address). Nav data lives co-located inside each nav/footer
 * component, since the V2 design is the canonical chrome.
 */

export const site = {
  name: "Premier Limb Lengthening",
  tagline: "Cosmetic limb lengthening, founded by Dr. Hrayr Basmajian",
  phone: "(909) 563-8653",
  phoneHref: "tel:+19095638653",
  address: {
    street: "400 N. Mountain Ave. Suite 305",
    city: "Upland",
    state: "CA",
    zip: "91786",
  },
  domain: "premierlimblengthening.com",
} as const;
