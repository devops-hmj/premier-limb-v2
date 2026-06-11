# Pattern porting conventions — JSX → Gutenberg block markup

These rules are the pixel-parity contract for porting `components/v2/*.tsx` React
sections into theme patterns at `wordpress/wp-content/themes/pll-editorial/patterns/`.
Follow them exactly; deviations break either the Tailwind scan, the editor locking
model, or visual parity.

## File shape

```php
<?php
/**
 * Title: Homepage — <Section Name>
 * Slug: pll/home-<name>
 * Categories: pll-sections
 *
 * Port of components/v2/<Name>.tsx.
 *
 * @package pll-editorial
 */
?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"anchor":"<id-if-any>","className":"<verbatim classes>"} -->
<section class="wp-block-group <verbatim classes>" id="<id-if-any>">
	… core blocks …
</section>
<!-- /wp:group -->
```

- The OUTER group of every section carries `"templateLock":"contentOnly"` and
  `"lock":{"move":true,"remove":true}`. Nothing else carries `lock`.
- If the JSX section element has an `id` (e.g. `id="surgery"`), put it in the
  group's `"anchor"` attribute AND as `id="…"` on the rendered element.
- The serialized HTML inside the comment must match what the block editor would
  produce: groups render `class="wp-block-group …yourclasses"`, headings render
  `class="wp-block-heading …"`, lists `class="wp-block-list …"`, images
  `<figure class="wp-block-image …"><img …/></figure>`.

## Block vocabulary (nothing else)

| JSX construct | Block |
|---|---|
| `<section>/<div>` layout wrapper | `core/group` (`"tagName":"section"` when the JSX uses `<section>`; default div otherwise). NEVER `core/columns`, NEVER `core/spacer`. Grid/flex comes from the Tailwind classes. |
| `<p>`, small text runs, address lines | `core/paragraph` |
| `<h2>/<h3>/<h4>` | `core/heading` with `"level":N` |
| `<ul>/<ol>` | `core/list` + `core/list-item` |
| `<img>` (content photo) | `core/image` (`{"sizeSlug":"full"}`) with `<figure class="wp-block-image size-full …">` |
| Block-level CTA link (`<a>` styled as a button/standalone link) | `core/buttons` > `core/button`: `<div class="wp-block-button"><a class="wp-block-button__link wp-element-button <verbatim classes>" href="…">label</a></div>`. Theme CSS zeroes core button chrome, so the verbatim utility classes fully control appearance. Keep `→` arrows as text inside a `<span class="font-serif italic" aria-hidden="true">→</span>`. |
| Inline `<em>`, `<strong>`, inline `<a>` in copy | Keep inline inside the paragraph HTML (e.g. `<em class="em-spine">…</em>`) |
| Decorative `<span aria-hidden>` dashes/rules inside flow | Keep inline within the nearest paragraph/heading markup; if standalone, use a `core/separator`-free `core/group` with the rule class (e.g. `className:"rule-thin"`) and empty content: `<div class="wp-block-group rule-thin"></div>` |

## Class strings

- Copy `className` strings **verbatim** from the JSX — same order, same values.
- `style={{ … }}` inline styles must become Tailwind arbitrary classes — NEVER
  inline `style=""` in pattern markup:
  - `style={{ fontSize: "clamp(40px, 6vw, 84px)" }}` → `text-[clamp(40px,6vw,84px)]` (strip ALL spaces inside the brackets)
  - `style={{ color: "#F4D88A" }}` → `text-gold` (use the token when one exists: #254A5D spine, #1E6FE5 signal, #2BBE7B action, #F4D88A gold, #F4F0E6 cream, #0F1417 ink…)
  - `style={{ textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}` → `[text-shadow:0_2px_30px_rgba(0,0,0,0.4)]` (spaces → underscores)
- `cn("a b", cond && "c")` conditionals: flatten every variant into a literal
  class list per concrete element (e.g. the featured pricing card gets its own
  full class string; no runtime branching).

## Animations (framer-motion → CSS)

- `<Reveal>` wrappers and `motion.*` elements with `whileInView`/mount fade-ups:
  add `js-reveal` to the element's class list. Stagger (`delay={0.1}` etc.) →
  add `pll-delay-100` / `pll-delay-200` / `pll-delay-300` / `pll-delay-400`
  (round to the nearest available).
- `whileHover={{ y: -6 }}` → `transition-transform duration-300 hover:-translate-y-1.5`
  (match the px: -6px = -translate-y-1.5; -4px = -translate-y-1).
- Hover background/color changes → the JSX usually already has `hover:` classes;
  copy them. If the JSX did it with motion variants, translate to `hover:` utilities
  + `transition-colors`.

## Images

- Marketing-page photography (dr-picture.jpg, Dr-ig-pic.jpg, dr-xray.jpg,
  dr-woman-talking.jpg, FAAOS badge) is a THEME asset: reference with
  `<?php echo esc_url( get_theme_file_uri( 'assets/images/<file>' ) ); ?>`.
  Keep the JSX's alt text, aspect-ratio classes (`aspect-[4/5]` etc.), and any
  `v2-portrait` / `v2-portrait-diag` texture classes on the figure.
- next/image `fill`/`sizes` props disappear; emit a plain `<img>` with
  `class="… w-full h-full object-cover"` when the JSX used `fill` + object-cover.

## Text content

- Copy ALL copy verbatim — medical accuracy rule: no paraphrasing, no em dashes
  introduced, keep typographic quotes (’ “ ”) exactly as the JSX renders them
  (`&rsquo;` → `’`, `&ldquo;` → `“`).
- `&nbsp;` stays `&nbsp;`.

## PHP usage inside patterns

- Allowed: `pll_site_info()` for phone/address, `get_theme_file_uri()` for theme
  assets, `pll_media_url('<file>')` for media-library assets, `home_url('/path/')`
  for internal links, with `esc_url`/`esc_html`/`esc_attr`.
- Internal links: root-relative with trailing slash (`/consult/`,
  `/limb-lengthening-pricing-options/`, `/your-surgery/`, `/blog/`,
  `/dr-basmajian/`, `/about/`). Hash links on the homepage stay as `/#surgery` form.

## Editor sanity

- No raw `<svg>` in pattern markup (KSES strips it for editor-role saves). If the
  JSX renders an SVG glyph, replace with the equivalent text glyph (`→`, `+`, `·`)
  or a CSS pseudo-element class that already exists (`.eyebrow::before` dash).
- Repeating cards: each card is its own `core/group` so contentOnly exposes its
  text fields individually.
- Eyebrows: `<p class="eyebrow">Label</p>` (the dash comes from CSS). Variants:
  `eyebrow--muted`, `eyebrow--paper`.

## Definition of done (per pattern)

1. `php -l`-clean (no syntax errors — CI runs parallel-lint).
2. Every class string traceable to the JSX original (or a documented conversion
   from inline style / token).
3. All copy verbatim.
4. Anchors preserved.
5. The block-comment JSON is valid (double quotes, no trailing commas) and every
   `<!-- wp:x -->` has its `<!-- /wp:x -->` (self-closing `/-->` for void blocks).
