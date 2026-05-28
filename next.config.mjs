/**
 * Next.js config.
 *
 * The `redirects()` block preserves SEO authority for every URL that
 * existed on the WordPress site (`https://premierlimblengthening.com`)
 * but now lives at a different path in the new Next.js codebase.
 *
 * Source: scraped_content/sitemap_data.json (38 URLs).
 * See: SEO_AUDIT.md, section 3, "Option B — Keep `/v2/` and add a
 * comprehensive 301 map."
 *
 * If/when the `/v2/` prefix is dropped, delete the redirects for
 * the 23 articles + service-sub + service-overview rows and keep
 * only the cross-route ones (consult, blog, category, author, video).
 */

/** Top-level articles — 16 pages. WP URL `/<slug>/` → `/v2/<slug>`. */
const articleSlugs = [
  "limb-lengthening-what-you-gain-what-you-risk",
  "rewriting-the-body-norm-stigmas-around-limb-lengthening",
  "can-i-get-a-leg-lengthening-procedure-for-cosmetic-reasons",
  "leg-up-or-let-down-can-you-gain-height-without-surgery",
  "am-i-too-old-for-limb-lengthening",
  "is-leg-lengthening-off-limits-for-athletes",
  "fixation-methods-in-limb-lengthening-internal-vs-external",
  "will-leg-lengthening-be-obvious",
  "limb-lengthening-pain-the-truth",
  "is-limb-lengthening-covered-by-insurance",
  "the-importance-of-physical-therapy-in-limb-lengthening",
  "tips-for-traveling-for-the-holidays-after-limb-lengthening-surgery",
  "bone-health-and-nutrition-before-and-after-limb-lengthening",
  "the-science-behind-bone-regeneration-and-limb-lengthening",
  "what-happens-to-muscle-during-and-after-limb-lengthening",
  "are-you-a-good-candidate-for-limb-lengthening",
];

/** "Your Surgery" sub-pages — 7. WP `/your-surgery/<slug>/` → `/v2/your-surgery/<slug>`. */
const surgerySubSlugs = [
  "will-limb-lengthening-hurt",
  "is-there-an-age-limit-for-limb-lengthening",
  "can-i-bend-my-lengthening-nail",
  "external-internal-lengthening",
  "exercise-after-limb-lengthening",
  "how-much-taller-can-i-get-with-limb-lengthening",
  "limb-lengthening-expectations",
];

/** Category pages — not yet built. Land them on the journal index. */
const categorySlugs = [
  "limb-lengthening",
  "bone-health",
  "after-limb-lengthening",
  "paying-for-limb-lengthening",
  "impact-on-the-body",
];

/** Author pages — not yet built. Land them on the journal index. */
const authorSlugs = ["ccatandella", "cjpeters", "edusenbury"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      // Renamed surface pages
      { source: "/consult",      destination: "/v2/contact",      permanent: true },
      { source: "/consult/",     destination: "/v2/contact",      permanent: true },
      { source: "/blog",         destination: "/v2/journal",      permanent: true },
      { source: "/blog/",        destination: "/v2/journal",      permanent: true },
      { source: "/dr-basmajian", destination: "/v2/dr-basmajian", permanent: true },
      { source: "/dr-basmajian/", destination: "/v2/dr-basmajian", permanent: true },
      { source: "/your-surgery", destination: "/v2/your-surgery", permanent: true },
      { source: "/your-surgery/", destination: "/v2/your-surgery", permanent: true },
      { source: "/limb-lengthening-pricing-options",  destination: "/v2/pricing", permanent: true },
      { source: "/limb-lengthening-pricing-options/", destination: "/v2/pricing", permanent: true },

      // Top-level articles
      ...articleSlugs.flatMap((slug) => [
        { source: `/${slug}`,  destination: `/v2/${slug}`, permanent: true },
        { source: `/${slug}/`, destination: `/v2/${slug}`, permanent: true },
      ]),

      // Your Surgery sub-pages
      ...surgerySubSlugs.flatMap((slug) => [
        { source: `/your-surgery/${slug}`,  destination: `/v2/your-surgery/${slug}`, permanent: true },
        { source: `/your-surgery/${slug}/`, destination: `/v2/your-surgery/${slug}`, permanent: true },
      ]),

      // Category pages — interim: route to the journal index until built
      ...categorySlugs.flatMap((slug) => [
        { source: `/category/${slug}`,  destination: "/v2/journal", permanent: false },
        { source: `/category/${slug}/`, destination: "/v2/journal", permanent: false },
      ]),

      // Author pages — interim: route to the journal index until built
      ...authorSlugs.flatMap((slug) => [
        { source: `/author/${slug}`,  destination: "/v2/journal", permanent: false },
        { source: `/author/${slug}/`, destination: "/v2/journal", permanent: false },
      ]),

      // Single video page — route to the journal index until rebuilt
      { source: "/video/will-i-be-a-better-athlete",  destination: "/v2/journal", permanent: false },
      { source: "/video/will-i-be-a-better-athlete/", destination: "/v2/journal", permanent: false },
    ];
  },
};

export default nextConfig;
