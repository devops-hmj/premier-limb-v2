/**
 * Next.js config.
 *
 * Option A executed: every route that existed on the legacy WordPress
 * site at `https://premierlimblengthening.com` now lives at the same
 * path in the new Next.js app (no `/v2/` prefix). So the per-article
 * and per-surgery-sub redirect rows from the previous version have been
 * deleted: those URLs are direct hits, zero hops.
 *
 * The redirects that remain cover:
 *   1. Cross-route renames where the new slug differs from WP:
 *      /consult/ → /contact, /blog/ → /journal,
 *      /limb-lengthening-pricing-options/ → /pricing.
 *      These three mappings come from SEO_AUDIT.md §2a (the live-site
 *      crawl), NOT brand preference. The journal section is labeled
 *      "Resources" in the UI but the URL slug stays /journal to match
 *      the audit-approved one-hop path from legacy /blog/.
 *   2. Not-yet-built pages (category, author, video): interim 302s land
 *      on /journal (the section home) so the site does not 404 against
 *      legacy backlinks. Switch to 301 + specific paths once the pages
 *      get built (SEO_AUDIT.md §2d-e proposes the target paths).
 *   3. A defensive /v2/:path* catch-all that 308s any cached or
 *      pre-launch shared link back to its root-level home.
 *
 * Source inventory: scraped_content/sitemap_data.json (38 URLs).
 * See: SEO_AUDIT.md §3 "Option A".
 */

/** Category pages, not yet built. Land on /journal. */
const categorySlugs = [
  "limb-lengthening",
  "bone-health",
  "after-limb-lengthening",
  "paying-for-limb-lengthening",
  "impact-on-the-body",
];

/** Author pages, not yet built. Land on /journal. */
const authorSlugs = ["ccatandella", "cjpeters", "edusenbury"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      // Cross-route renames (slug differs from WP, per audit §2a).
      { source: "/consult",      destination: "/contact", permanent: true },
      { source: "/consult/",     destination: "/contact", permanent: true },
      { source: "/blog",         destination: "/journal", permanent: true },
      { source: "/blog/",        destination: "/journal", permanent: true },
      { source: "/limb-lengthening-pricing-options",  destination: "/pricing", permanent: true },
      { source: "/limb-lengthening-pricing-options/", destination: "/pricing", permanent: true },

      // Category pages, interim until built (audit §2d).
      ...categorySlugs.flatMap((slug) => [
        { source: `/category/${slug}`,  destination: "/journal", permanent: false },
        { source: `/category/${slug}/`, destination: "/journal", permanent: false },
      ]),

      // Author pages, interim until built (audit §2e).
      ...authorSlugs.flatMap((slug) => [
        { source: `/author/${slug}`,  destination: "/journal", permanent: false },
        { source: `/author/${slug}/`, destination: "/journal", permanent: false },
      ]),

      // Single legacy video page, interim until rebuilt (audit §2e).
      { source: "/video/will-i-be-a-better-athlete",  destination: "/journal", permanent: false },
      { source: "/video/will-i-be-a-better-athlete/", destination: "/journal", permanent: false },

      // Defensive: catch any cached link still pointing at the /v2 prefix.
      // The catch-all handles /v2/journal too (folds to /journal).
      { source: "/v2",        destination: "/",       permanent: true },
      { source: "/v2/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
