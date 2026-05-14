import type { MetadataRoute } from "next";
import { getArticles, ORIGIN } from "@/lib/content";

/**
 * Sitemap — Next.js native route. Now V2-only.
 *
 * Enumerates:
 *   • the homepage (`/`)
 *   • the V2 surface pages (about, contact, dr-basmajian, journal, pricing)
 *   • each article at `/v2/<slug>`
 *
 * Priorities are hand-tuned: homepage 1.0; pricing + contact + bio 0.9;
 * journal index 0.7; articles 0.6.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const surfaces: MetadataRoute.Sitemap = [
    { url: `${ORIGIN}/`,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${ORIGIN}/v2/pricing`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/v2/contact`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/v2/dr-basmajian`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/v2/about`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${ORIGIN}/v2/journal`,        lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
  ];

  const articles: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: `${ORIGIN}/v2/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...surfaces, ...articles];
}
