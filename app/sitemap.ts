import type { MetadataRoute } from "next";
import { CATEGORY_ORDER, getArticles, getPagesByKind, ORIGIN } from "@/lib/content";

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
    { url: `${ORIGIN}/limb-lengthening-pricing-options`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/consult`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/book-a-consultation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/dr-basmajian`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${ORIGIN}/your-surgery`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${ORIGIN}/about`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${ORIGIN}/blog`,        lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${ORIGIN}/evaluate-your-surgeon`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${ORIGIN}/privacy`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${ORIGIN}/terms`,            lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${ORIGIN}/accessibility`,    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const articles: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: `${ORIGIN}/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categories: MetadataRoute.Sitemap = CATEGORY_ORDER.map((slug) => ({
    url: `${ORIGIN}/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const surgerySub: MetadataRoute.Sitemap = getPagesByKind("service-sub").map((s) => ({
    url: `${ORIGIN}/your-surgery/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...surfaces, ...articles, ...surgerySub, ...categories];
}
