import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { JsonLd } from "@/components/content/JsonLd";
import { siteGraph } from "@/lib/jsonld";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: "Premier Limb Lengthening — Cosmetic Limb Lengthening Surgery in Southern California",
    template: "%s · Premier Limb Lengthening",
  },
  description:
    "Premier Limb Lengthening, led by Dr. Hrayr Basmajian, is a cosmetic and medical limb lengthening practice in Southern California specializing in Precice internal nail technology.",
  applicationName: site.name,
  authors: [{ name: "Premier Orthopaedic & Trauma Specialists" }],
  openGraph: {
    title: "Premier Limb Lengthening — Cosmetic Limb Lengthening Surgery",
    description:
      "Hundreds of procedures performed. Transparent pricing. Concierge travel program for patients nationwide.",
    url: `https://${site.domain}`,
    siteName: site.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

/**
 * Root layout — minimal shell now that the V2 design is canonical.
 *
 * Every route mounts its own NavV2 + FooterV2 inline, so the root layout
 * holds only:
 *   • the fonts + globals
 *   • the accessibility skip-link
 *   • the site-wide MedicalBusiness + WebSite JSON-LD
 *
 * No more <Nav /> / <SiteFooter /> / <ConditionalChrome /> — those were
 * the legacy chrome and have been deleted alongside the legacy routes.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-paper-off text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-spine text-paper px-4 py-2 font-mono text-t-s"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
