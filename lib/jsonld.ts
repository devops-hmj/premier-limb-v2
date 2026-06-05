import { ORIGIN, type Page } from "./content";

/**
 * Schema.org JSON-LD builders.
 *
 * Each helper returns a plain object that gets serialized into a single
 * <script type="application/ld+json"> via the <JsonLd> component.
 * Multiple entities per page are exposed as @graph arrays.
 */

const ORG_ID = `${ORIGIN}/#organization`;
const SITE_ID = `${ORIGIN}/#website`;

/** Site-wide MedicalBusiness + WebSite — emitted from app/layout.tsx. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": ORG_ID,
        name: "Premier Limb Lengthening Institute",
        legalName: "Premier Limb Lengthening",
        url: ORIGIN,
        telephone: "+1-909-461-4984",
        faxNumber: "+1-909-596-4344",
        priceRange: "$95,500–$293,000",
        medicalSpecialty: ["Orthopedic", "Trauma"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "160 E Artesia Street, Suite 255",
          addressLocality: "Pomona",
          addressRegion: "CA",
          postalCode: "91767",
          addressCountry: "US",
        },
        parentOrganization: { "@type": "Organization", name: "Premier Orthopaedic & Trauma Specialists" },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: ORIGIN,
        name: "Premier Limb Lengthening Institute",
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
    ],
  };
}

export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${ORIGIN}${it.url}`,
    })),
  };
}

export function articleSchema(p: Page) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${ORIGIN}${p.route}` },
    author: {
      "@type": "Person",
      name: "Dr. Hrayr Basmajian",
      "@id": `${ORIGIN}/dr-basmajian#physician`,
    },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function physicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${ORIGIN}/dr-basmajian#physician`,
    name: "Dr. Hrayr Basmajian",
    medicalSpecialty: ["Orthopedic", "Trauma"],
    image: `${ORIGIN}/dr-picture.jpg`,
    affiliation: [
      { "@type": "Hospital", name: "Pomona Valley Hospital Medical Center" },
    ],
    worksFor: { "@id": ORG_ID },
  };
}

export function medicalProcedureSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Limb Lengthening Surgery",
    procedureType: "https://schema.org/SurgicalProcedure",
    bodyLocation: ["Femur", "Tibia"],
    howPerformed:
      "Distraction osteogenesis via the Precice internal nail system: the bone is cut and gradually pulled apart while new bone regenerates in the gap.",
    preparation: "Pre-operative consultation, imaging, and health assessment.",
    followup:
      "On-site physical therapy in Upland, CA. Surgical follow-up visits. Active lengthening over 3-4 months, full recovery in 6-12 months.",
  };
}

export function pricingSchema(tiers: { name: string; price: string; available?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Limb Lengthening Procedure Pricing",
    itemListElement: tiers.map((t, i) => ({
      "@type": "Service",
      position: i + 1,
      name: t.name,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: t.price.replace(/[^0-9]/g, ""),
        availability: t.available ?? "https://schema.org/InStock",
      },
      provider: { "@id": ORG_ID },
    })),
  };
}

export function collectionPageSchema(name: string, articles: Page[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${ORIGIN}${a.route}`,
        name: a.title,
      })),
    },
  };
}
