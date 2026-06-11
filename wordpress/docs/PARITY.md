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
