import type { Metadata } from "next";
import { ORIGIN, type Page } from "./content";

/**
 * Build per-page <Metadata> from a Page object so every route exports a
 * canonical URL, OG/Twitter card, and a concise meta description.
 *
 * Use as:  export const metadata = pageMetadata(page);
 * or:      export async function generateMetadata({ params }) { ... }
 */
export function pageMetadata(p: Page, overrides: Partial<Metadata> = {}): Metadata {
  const canonical = `${ORIGIN}${p.route}`;
  const ogType = p.kind === "article" || p.kind === "video" ? "article" : "website";
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical },
    openGraph: {
      title: p.title,
      description: p.description,
      url: canonical,
      siteName: "Premier Limb Lengthening Institute",
      type: ogType,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
    },
    robots: { index: true, follow: true },
    ...overrides,
  };
}
