import type { Metadata } from "next";
import { V2HomePage } from "@/components/v2/HomePage";

import "./v2/v2.css";

export const metadata: Metadata = {
  title: "Cosmetic Limb Lengthening Surgery in Southern California",
  description:
    "Gain up to 6 inches with one of the most experienced limb lengthening surgeons on the West Coast. Concierge care from your first consultation through full recovery.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <V2HomePage />;
}
