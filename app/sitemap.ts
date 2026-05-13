import type { MetadataRoute } from "next";
import { getAllPages, ORIGIN } from "@/lib/content";

/**
 * Sitemap — Next.js native route. Enumerates every published page from
 * the markdown inventory plus the static top-level routes.
 *
 * Priorities are hand-tuned: homepage and the four conversion-critical
 * pages get the highest weight; articles default to 0.6; taxonomy pages
 * to 0.4.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = getAllPages();

  return pages.map((p) => {
    let priority = 0.5;
    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly";

    if (p.route === "/") {
      priority = 1.0;
      changeFrequency = "weekly";
    } else if (
      p.route === "/consult" ||
      p.route === "/dr-basmajian" ||
      p.route === "/your-surgery" ||
      p.route === "/limb-lengthening-pricing-options"
    ) {
      priority = 0.9;
      changeFrequency = "monthly";
    } else if (p.kind === "service-sub") {
      priority = 0.7;
    } else if (p.kind === "article" || p.kind === "video") {
      priority = 0.6;
    } else if (p.kind === "category" || p.kind === "author" || p.kind === "blog-index") {
      priority = 0.4;
      changeFrequency = "weekly";
    }

    return {
      url: `${ORIGIN}${p.route}`,
      lastModified: now,
      changeFrequency,
      priority,
    };
  });
}
