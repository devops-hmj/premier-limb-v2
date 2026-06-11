# Parity contract — Next.js site vs WordPress recreation

## Head parity (exact — `npm run parity:head`)

Per route: `<title>`, meta description, canonical, `og:*`, `twitter:*`, robots, and all
JSON-LD (parsed, key-sorted, host-normalized) must be identical. Accepted systematic
diffs live in `scripts/parity-allow.json`; each must be explainable:

1. **Trailing slashes** — Next canonicals are slashless, WordPress's canonical form is
   slashed. Normalized before comparison; both stacks 301 the other form.
2. **og:image on /dr-basmajian/ and the your-surgery tree** — Next pointed at public/
   asset paths; in WP those are theme-asset/uploads URLs. Post featured-image OG URLs
   are identical (original upload paths preserved).
3. **Visible H1 on 6 posts** — WordPress restores the live legacy headline (`liveH1`)
   as the post title while keeping the SEO title in `_pll_seo_title`. `<title>` output
   is identical; only the on-page H1 differs from the Next build (which showed the SEO
   title). This matches the original WordPress site, deliberately.
4. **Sitemap format** — `app/sitemap.ts` priorities/changefreq are dropped (core
   wp-sitemap.xml; Google ignores both fields). URL set must still match.
5. **/video/will-i-be-a-better-athlete** — 301 to the athletics article (Next used an
   interim 302 to /blog; the page had no body content on the legacy site).

## Pixel parity (budgeted — `npm run parity:check`)

Playwright captures every route at 390×844 and 1440×900 with animations disabled,
reduced motion, fonts loaded, and the hero video masked. pixelmatch threshold 0.1.

| Class | Budget (differing pixels / total) |
|---|---|
| Content/article/legal pages | ≤ 1.5% per viewport |
| Homepage, pricing, consult | ≤ 3.0% |
| Hard fail | height delta > 5% or any layout-shift-class diff |

Do not chase 0%: identical woff2 files still rasterize with slightly different
subpixel antialiasing across stacking contexts; 0.1–1% text-edge noise is expected.
Anything over budget goes to **manual review**, not auto-reject.

**Routes that legitimately exceed budget:** /blog/, /category/*, and post pages
show the six `liveH1` posts under their restored legacy headlines while the Next
build shows the SEO titles (head-parity allowlist item 3). Different card/heading
text plus its knock-on reflow dominates those diffs — verify those routes by
reading the side-by-side report, not the percentage.

### Capture-harness gotchas (cost a day — read before re-running)

1. **Playground auto-logs every browser session in as admin.** The admin bar's
   `html { margin-top: 32px }` shifts the whole WP page down 32px vs Next, so
   *every* pixel below the hero misaligns and even identical pages read 7-17%
   different. parity-capture.mjs masks `#wpadminbar` and zeroes that margin.
2. **framer-motion leaves below-fold `whileInView` content at inline
   `opacity:0`** in headless full-page shots on the Next side. The fix is a JS
   settle pass that forces in-flow content visible but skips `fixed`/`sticky`
   elements — a blanket `[style*="opacity"] { opacity:1 !important }` un-hides
   the scrolled-state sticky navs on BOTH stacks and paints them mid-page.
3. **Audit drift with the helper scripts, not by eyeballing screenshots:**
   `parity-sections.mjs` (heading-offset map; constant offset = admin bar,
   growing offset = real layout drift), `parity-bands.mjs` (which y-bands
   diverge), `parity-els.mjs` (per-element box diff; beware text-pairing noise
   when the same string appears in several sections), `parity-imgs.mjs`,
   `parity-rules.mjs` (CDP matched-rules dump — resolves "which CSS rule wins"
   without guessing), `parity-slice.mjs` (crop a y-band from both captures).

### Pixel-parity root causes found and fixed (2026-06-11)

These five account for an 854px cumulative page-height drift on the homepage
(and equivalents on every route) — all fixed in source, kept here so nobody
re-introduces them:

1. **Stylesheet print order.** Core prints per-block styles and theme.json
   global styles as `<style>` tags AFTER every enqueued `<link>`, so
   `:root :where(.wp-element-button, .wp-block-button__link)` won every
   specificity tie against single-class Tailwind utilities (CTA buttons
   collapsed 56px → 28px). pll.css is therefore printed manually at
   `wp_head` priority 9999 (inc/enqueue.php) — last in head, deterministic.
2. **Un-layered theme resets out-cascading utilities in the same file.** The
   core-chrome neutralizers (`.wp-block-button__link { padding:0 ... }`,
   `.wp-block-group { margin-block:0 }`) sat after `@tailwind utilities` in
   the output and killed `py-3.5`/`mb-12`/`mt-10` on the same elements
   (section headers lost their 48px margin site-wide). They live inside
   `@layer components` now — emitted before utilities, losing ties to them,
   while still beating core's rules via print order.
3. **Core's `(0,2,0)`/`(0,1,1)` rules need explicit counters** — no
   single-class utility can beat `.wp-block-buttons .wp-block-button__link
   { width:100% }` or `.wp-block-image img { height:auto }`. Countered at
   equal-or-higher specificity in the un-layered tail (`width:auto`,
   `img.h-full { height:100% }`).
4. **Font binaries must be byte-identical to the Next build.** The Google
   Fonts API serves different artifacts than next/font ships (Newsreader
   wght-only 132 KB vs Next's 58 KB with the opsz axis intact). Metric
   deltas flip wrap decisions at boundary strings ("Concierge Experience"
   wrapped to 2 lines on one stack, 1 on the other). fetch-fonts.mjs mirrors
   the running Next build.
5. **`.pll-prose ul > li` cannot use the Prose.tsx grid.** Next wraps li
   content in a single div, WP list items hold raw inline content — grid
   turns each inline run into its own item and explodes the layout (118px
   items vs 53px). Bullet geometry is reproduced with padding + absolute
   `::before` instead.

## Manual checklist (run before handoff)

- [ ] Three-tier CTA hierarchy intact: at most one Action-Green CTA per viewport
- [ ] `em-spine`/`em-cream`/gold italic accents present in every section headline
- [ ] Sticky nav: hidden at top of homepage, fades in past 120px; force-visible on inner pages
- [ ] Mobile menu opens/closes (hamburger ↔ X), Your Surgery expands inline, Escape closes
- [ ] Hero video autoplays muted; sound toggle works; unmutes on first interaction
- [ ] FAQ: first item open, single-open accordion, + rotates, items addable in editor
- [ ] Consult form: required validation, success panel, error path shows phone fallback
- [ ] Consent text + legal copy **verbatim** (no em dashes introduced, no paraphrasing)
- [ ] Spot-check 3 random articles against `scraped_content/*.md` — zero copy drift
- [ ] Footer legal links resolve; "Results may vary." present
- [ ] No third-party requests except the GHL chat loader on /consult/ (check DevTools)
- [ ] prefers-reduced-motion: reveals render instantly, no transforms
- [ ] No-JS: all content visible (reveals don't hide content), form degrades gracefully

## Known intentional divergences (beyond the allowlist)

- Entrance-animation timing differs slightly (CSS reveal vs framer-motion spring); final
  layout identical.
- The legal-page TOC link size is 14px (article TOC component reused) vs 13.5px in the
  Next LegalDocument — sub-pixel at render.
- `/#testimonials` footer link has no matching anchor — true in the Next build as well
  (Testimonials.tsx has no id); kept for parity, flagged upstream.
