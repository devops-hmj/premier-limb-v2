/**
 * Next.js config.
 *
 * Option A + literal-path preservation executed: every route that
 * existed on the legacy WordPress site at premierlimblengthening.com
 * now lives at the SAME path in the new app, including the long
 * legacy slugs. No more cross-route renames: /blog/, /consult/, and
 * /limb-lengthening-pricing-options/ are all direct hits at the new
 * site (the UI labels them "Resources", "Contact", "Pricing" — labels
 * and URL slugs are decoupled).
 *
 * Result: zero redirect hops for ANY legacy URL that has a built
 * destination. Maximum link-equity preservation; cleanest path for
 * the live-site SEO authority to flow into the new app.
 *
 * The redirects that remain cover:
 *   1. Not-yet-built pages (category, author, video): interim 302s land
 *      on /blog (the section home) so the site does not 404 against
 *      legacy backlinks. SEO_AUDIT.md §2d-e proposes target paths for
 *      when these get built.
 *   2. A defensive /v2/:path* catch-all that 308s any cached or
 *      pre-launch shared link back to its root-level home.
 *
 * Source inventory: scraped_content/sitemap_data.json (38 URLs).
 * See: SEO_AUDIT.md §3 "Option A".
 */

/** Category pages, not yet built. Land on /blog. */
const categorySlugs = [
  "limb-lengthening",
  "bone-health",
  "after-limb-lengthening",
  "paying-for-limb-lengthening",
  "impact-on-the-body",
];

/** Author pages, not yet built. Land on /blog. */
const authorSlugs = ["ccatandella", "cjpeters", "edusenbury"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      // Category pages, interim until built (audit §2d).
      ...categorySlugs.flatMap((slug) => [
        { source: `/category/${slug}`,  destination: "/blog", permanent: false },
        { source: `/category/${slug}/`, destination: "/blog", permanent: false },
      ]),

      // Author pages, interim until built (audit §2e).
      ...authorSlugs.flatMap((slug) => [
        { source: `/author/${slug}`,  destination: "/blog", permanent: false },
        { source: `/author/${slug}/`, destination: "/blog", permanent: false },
      ]),

      // Single legacy video page, interim until rebuilt (audit §2e).
      { source: "/video/will-i-be-a-better-athlete",  destination: "/blog", permanent: false },
      { source: "/video/will-i-be-a-better-athlete/", destination: "/blog", permanent: false },

      // Defensive: catch any cached link still pointing at the /v2 prefix.
      { source: "/v2",        destination: "/",       permanent: true },
      { source: "/v2/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
