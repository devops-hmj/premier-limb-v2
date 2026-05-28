import type { MetadataRoute } from "next";
import { getArticles, getPagesByKind, ORIGIN } from "@/lib/content";

/**
 * Sitemap, Next.js native route.
 *
 * Enumerates every customer-facing URL that should be indexed:
 *   homepage (`/`)
 *   surface pages (about, contact, dr-basmajian, journal, pricing, your-surgery)
 *   each top-level article at `/<slug>`
 *   each "Your Surgery" sub-page at `/your-surgery/<slug>`
 *
 * `/design-system` is intentionally excluded (internal dossier, also
 * disallowed in `robots.ts`).
 *
 * Priorities are hand-tuned: homepage 1.0; pricing, contact, bio 0.9;
 * your-surgery, about, journal 0.7; articles 0.6; surgery sub-pages 0.6.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const surfaces: MetadataRoute.Sitemap = [
    { url: `${ORIGIN}/`,                 lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${ORIGIN}/pricing`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/contact`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/dr-basmajian`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/your-surgery`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${ORIGIN}/about`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${ORIGIN}/journal`,        lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
  ];

  const articles: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: `${ORIGIN}/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const surgerySub: MetadataRoute.Sitemap = getPagesByKind("service-sub").map((s) => ({
    url: `${ORIGIN}/your-surgery/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...surfaces, ...articles, ...surgerySub];
}
