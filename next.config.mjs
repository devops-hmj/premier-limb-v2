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
 *      /consult/, /blog/, /limb-lengthening-pricing-options/
 *   2. Not-yet-built pages (category, author, video): interim 302s to
 *      /resources, so the site does not 404 against legacy backlinks.
 *   3. A defensive /v2/:path* catch-all that 308s any cached or
 *      pre-launch shared link back to its root-level home.
 *
 * Source inventory: scraped_content/sitemap_data.json (38 URLs).
 * See: SEO_AUDIT.md §3 "Option A".
 */

/** Category pages, not yet built. Land on /resources. */
const categorySlugs = [
  "limb-lengthening",
  "bone-health",
  "after-limb-lengthening",
  "paying-for-limb-lengthening",
  "impact-on-the-body",
];

/** Author pages, not yet built. Land on /resources. */
const authorSlugs = ["ccatandella", "cjpeters", "edusenbury"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      // Cross-route renames (slug differs from WP).
      { source: "/consult",      destination: "/contact",   permanent: true },
      { source: "/consult/",     destination: "/contact",   permanent: true },
      { source: "/blog",         destination: "/resources", permanent: true },
      { source: "/blog/",        destination: "/resources", permanent: true },
      { source: "/limb-lengthening-pricing-options",  destination: "/pricing", permanent: true },
      { source: "/limb-lengthening-pricing-options/", destination: "/pricing", permanent: true },

      // Category pages, interim until built.
      ...categorySlugs.flatMap((slug) => [
        { source: `/category/${slug}`,  destination: "/resources", permanent: false },
        { source: `/category/${slug}/`, destination: "/resources", permanent: false },
      ]),

      // Author pages, interim until built.
      ...authorSlugs.flatMap((slug) => [
        { source: `/author/${slug}`,  destination: "/resources", permanent: false },
        { source: `/author/${slug}/`, destination: "/resources", permanent: false },
      ]),

      // Single legacy video page, interim until rebuilt.
      { source: "/video/will-i-be-a-better-athlete",  destination: "/resources", permanent: false },
      { source: "/video/will-i-be-a-better-athlete/", destination: "/resources", permanent: false },

      // Defensive: catch any cached link still pointing at the /v2 prefix.
      { source: "/v2",         destination: "/",           permanent: true },
      { source: "/v2/journal", destination: "/resources",  permanent: true },
      { source: "/v2/:path*",  destination: "/:path*",     permanent: true },
    ];
  },
};

export default nextConfig;
