import type { Metadata } from "next";
import { V2HomePage } from "@/components/v2/HomePage";

import "./v2.css";

export const metadata: Metadata = {
  title: "Cosmetic Limb Lengthening — Premier Limb Lengthening",
  description:
    "Premier Limb Lengthening — video-led editorial homepage. Concierge care from your first consultation through full recovery.",
  alternates: { canonical: "/v2" },
};

export default function Page() {
  return <V2HomePage />;
}
