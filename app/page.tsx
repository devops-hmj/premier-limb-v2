import type { Metadata } from "next";
import { JsonLd } from "@/components/content/JsonLd";
import { V2HomePage } from "@/components/v2/HomePage";
import { faqs } from "@/lib/faqs";
import { faqPageSchema } from "@/lib/jsonld";

import "./v2.css";

export const metadata: Metadata = {
  title: "Limb Lengthening Surgery in Southern California · Dr. Hrayr Basmajian",
  description:
    "Cosmetic limb lengthening surgery with one of the West Coast's most experienced surgeons. Gain up to 6 inches with concierge care from first consult through full recovery.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Limb Lengthening Surgery in Southern California · Premier",
    description:
      "Gain up to 6 inches with one of the most experienced limb lengthening surgeons on the West Coast. Concierge care, transparent pricing.",
    url: "/",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <V2HomePage />
      <JsonLd data={faqPageSchema(faqs.map(({ q, a }) => ({ q, a })))} />
    </>
  );
}
