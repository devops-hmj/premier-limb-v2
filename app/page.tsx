import type { Metadata } from "next";
import { JsonLd } from "@/components/content/JsonLd";
import { V2HomePage } from "@/components/v2/HomePage";
import { faqs } from "@/lib/faqs";
import { faqPageSchema } from "@/lib/jsonld";

import "./v2.css";

export const metadata: Metadata = {
  // Absolute: the root layout's title template would append the site name and
  // push this past 100 chars. Keyword-first per homepage handoff v2 §08.
  title: {
    absolute: "Cosmetic Limb Lengthening Surgeon in Southern California · Dr. Hrayr Basmajian",
  },
  description:
    "Cosmetic limb lengthening surgery performed by Dr. Hrayr Basmajian, a fellowship-trained orthopaedic trauma surgeon in Southern California. Precice internal nail. Revision cases accepted. Concierge care included.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cosmetic Limb Lengthening Surgeon in Southern California · Dr. Hrayr Basmajian",
    description:
      "Cosmetic limb lengthening performed by a fellowship-trained orthopaedic trauma surgeon. Precice internal nail. Revision cases accepted. Concierge care included.",
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
