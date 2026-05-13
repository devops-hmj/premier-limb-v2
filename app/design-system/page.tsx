import type { Metadata } from "next";
import { Applications } from "@/components/showcase/Applications";
import { Components } from "@/components/showcase/Components";
import { Cover } from "@/components/showcase/Cover";
import { Footer as DossierFooter } from "@/components/showcase/Footer";
import { Identity } from "@/components/showcase/Identity";
import { Palette } from "@/components/showcase/Palette";
import { Spacing } from "@/components/showcase/Spacing";
import { Type } from "@/components/showcase/Type";
import { Voice } from "@/components/showcase/Voice";

export const metadata: Metadata = {
  title: "Brand Kit · The Dossier",
  description:
    "The Premier Limb Lengthening design system — color, typography, voice, layout, components, and applications.",
  robots: { index: false, follow: false }, // internal reference only
};

/**
 * /design-system — the editorial-clinical brand dossier, served as a live
 * Next.js route. Acts as both documentation and the canonical visual
 * reference when building new pages.
 *
 * Note: this route bypasses the global Nav/Footer chrome conceptually
 * (the cover/footer of the dossier replace them) but Next.js still renders
 * them from app/layout.tsx. Decision deferred: a future segment-specific
 * layout could remove them, but for now the dossier is a normal route.
 */
export default function DesignSystemPage() {
  return (
    <>
      <Cover />
      <Identity />
      <Palette />
      <Type />
      <Voice />
      <Spacing />
      <Components />
      <Applications />
      <DossierFooter />
    </>
  );
}
