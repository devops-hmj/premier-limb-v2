# PLL WordPress — HIPAA Vault Migration Runbook

This package is a 1:1 WordPress recreation of premierlimblengthening.com (currently a
Next.js build). It contains an FSE block theme, two small custom plugins, and a content
seed. **No build tools are required on the server** — every compiled asset is included.

> ### What changed in the 2026-07-21 build (since the 20260720 handoff)
> All in commit `e06ce29` and the follow-up SEO-recovery fixes:
> - **On-page SEO restore + editable meta**: curated titles/descriptions are promoted into
>   editable post meta; new `/height-surgery/` and `/leg-lengthening-surgery/` pillar pages.
> - **New 301**: `/your-visit` → `/your-surgery/` (a legacy orphan URL, a soft 404 at GSC
>   position ~49 with no destination page).
> - **Core Web Vitals**: font preload restored to all four above-the-fold faces (a prior
>   trim to two reintroduced hero FOUT/reflow); CSS/JS cache-bust by **content hash** (survives
>   the mtime-preserving upload observed on HIPAA Vault); `preconnect`/`dns-prefetch` added for
>   the Curve origin.
> - **Curve (ComplyTrack) tracker**: production-gated, async in the footer (see §9).
>
> **Two steps the operator MUST run on the ALREADY-LIVE site** (a fresh install does both
> automatically):
> 1. **Re-seed the pages** so the restored keyword H1s (pricing, surgery, blog) reach the
>    database. They live in theme patterns; uploading theme files alone does not rewrite page
>    content already in the DB. Use the force-reseed in **§6b** (diff first if editors touched
>    those pages).
> 2. Be aware the **one-time SEO-meta seeding migration** in `pll-seo` runs once on this deploy
>    and **overwrites** any titles/descriptions an editor set in the "SEO (PLL)" panel since
>    launch, replacing them with the curated defaults. If editors have hand-edited SEO fields,
>    export those values first. (See `pll_seo` `meta.php`; guarded by `pll_seo_meta_seeded`.)

## 1. What you receive

```
pll-wordpress-handoff-<date>.zip
├── MIGRATION.md                      ← this file
├── CHECKSUMS.txt                     ← sha256 of every file
├── wp-content/
│   ├── themes/pll-editorial/         ← block theme (compiled CSS/JS committed)
│   └── plugins/
│       ├── pll-seo/                  ← titles, meta, canonicals, JSON-LD, sitemap, robots, redirects
│       └── pll-forms/                ← consultation form block + REST forwarder + GHL chat widget
└── content/
    ├── pll-content.wxr               ← 16 posts, 5 categories, your-surgery pages, legal pages
    ├── media/                        ← hero video + poster (sideloaded by setup.php)
    ├── media-uploads/                 ← featured images at their ORIGINAL /wp-content/uploads paths
    ├── media-manifest.json           ← slug → image/alt map
    └── setup.php                     ← idempotent configuration + page composition (wp eval-file)
```

## 2. Server requirements

- PHP **8.1+** (developed against 8.2; tested on WordPress Playground PHP 8.2)
- WordPress **6.7+** (block theme, Interactivity API, viewScriptModule)
- MySQL 8 / MariaDB equivalent
- HTTPS mandatory (HIPAA), TLS 1.2+, HSTS recommended
- ⚠️ **Please confirm your exact PHP version before install** — phpcs targets 8.1+, nothing exotic is used (`wp_remote_post`, no curl extension calls, no MySQL-isms).

## 3. Install order

1. Copy `wp-content/themes/pll-editorial` and both plugins into `wp-content/`.
2. **Activate the `pll-editorial` theme** (Appearance → Themes).
3. Activate **PLL SEO** and **PLL Forms** (Plugins).
4. Add the wp-config constants (§4).
5. Import content (§5).
6. Run `setup.php` (§6).
7. Verify (§8).

## 4. wp-config.php constants

```php
/* GoHighLevel inbound webhook for the consultation form.
   Provided out-of-band via the secure file drop — keep it out of the
   repo and out of plaintext email. */
define( 'PLL_GHL_WEBHOOK_URL', '<provided separately>' );

define( 'DISALLOW_FILE_EDIT', true );
```

Without `PLL_GHL_WEBHOOK_URL` the form endpoint returns 503 (it never stores
submissions in WordPress).

## 5. Content import

1. Tools → Import → WordPress (install the importer), upload `content/pll-content.wxr`.
   - When asked about authors, **import the authors from the file** (do not map to admin).
   - "Download and import file attachments" can stay unchecked — media ships in this package.
2. Or via WP-CLI: `wp import content/pll-content.wxr --authors=create`

## 6. Run setup.php

Copy the `content/` folder somewhere readable by WP-CLI and run:

```
wp eval-file content/setup.php
```

It is **idempotent** (safe to re-run) and does what WXR cannot:
- site title/tagline, timezone America/Los_Angeles, permalinks `/%postname%/`, comments off
- sideloads `content/media/` (hero video) into the media library
- copies `content/media-uploads/` into `wp-content/uploads/` **preserving the original
  `/wp-content/uploads/YYYY/MM/…` paths** (image URLs survive with zero redirects)
  and registers everything as attachments
- sets each post's featured image + alt text from `media-manifest.json`
- composes the marketing pages (Home, About, Contact, Dr. Basmajian, Pricing) from the
  theme's block patterns, creates the Blog posts page
- fixes author nicenames so `/author/ccatandella/` and `/author/edusenbury/` resolve
- sets Reading: front page = Home, posts page = Blog; flushes rewrite rules

### 6b. Updating an ALREADY-SEEDED (live) site after a copy change

Marketing-page copy is composed from theme patterns **at seed time** and the legal
pages come from the WXR, so updating theme/plugin files alone does not change page
content already in the database. After uploading the updated theme + plugins:

1. Recompose the marketing pages from the current patterns (**overwrites any manual
   wp-admin edits to those pages** — diff first if editors have touched them):

   ```
   wp eval "define( 'PLL_SEED_FORCE', true ); require 'content/setup.php';"
   ```

2. Fix literal strings inside imported content (legal pages, posts) with
   search-replace, e.g. the 2026-06-12 phone change:

   ```
   wp search-replace '(909) 563-8653' '(951) 620-5663' --all-tables --precise
   wp search-replace 'tel:+19095638653' 'tel:+19516205663' --all-tables --precise
   ```

   Always run with `--dry-run` first and take a DB snapshot before the real pass.

## 7. URL parity contract (do not change)

- Permalinks **must** stay `/%postname%/` and the category base must stay `category` —
  every legacy URL then resolves with **zero redirects**.
- Redirects shipped (all 301): `/video/will-i-be-a-better-athlete` → the athletics article;
  `/your-visit` → `/your-surgery/` (legacy orphan, no destination page); `/sitemap.xml` and
  `/sitemap_index.xml` → `/wp-sitemap.xml`. These fire only on an otherwise-404 request, so
  they never shadow a real page.

## 8. Post-install verification

- [ ] `/` renders the video hero (sound toggle bottom-right), all 12 sections, footer
- [ ] `/blog/` shows 16 cards with images; search and category tabs filter client-side
- [ ] An article (e.g. `/am-i-too-old-for-limb-lengthening/`) shows breadcrumb, "In This
      Post" TOC, featured image, body, "Keep reading." grid
- [ ] `/your-surgery/` + the 7 sub-pages (note `/your-surgery/limb-lengthening-expectations/`
      uses the full-bleed photo header)
- [ ] `/consult/`: submit a test inquiry → arrives in GHL; GHL chat bubble loads site-wide
      (owner decision 2026-06-12; launched consult-only)
- [ ] `view-source` on any page: one `<title>` ending in "· Premier Limb Lengthening",
      meta description, canonical on `https://premierlimblengthening.com`, JSON-LD blocks
      (MedicalBusiness graph everywhere; Article on posts; FAQPage on home)
- [ ] `/robots.txt`, `/wp-sitemap.xml`
- [ ] `/height-surgery/` and `/leg-lengthening-surgery/` render with the "Medically
      reviewed by Dr. Hrayr Basmajian … July 2026" byline under the H1; the pricing
      page shows all six packages (three PRECICE Max + three PRECICE 2); the footer
      Resources column links both guides
- [ ] `view-source` on the production domain includes the Curve Tracking Script in
      `<head>` (absent on any staging host — that is the production gate working)
- [ ] Log in as an **Editor**: pages open in content-only mode (text/images editable,
      structure locked); FAQ items can be added/removed; posts edit freely

## 9. HIPAA hardening (HIPAA Vault side)

- The form pipeline stores **no PHI in WordPress** — payloads pass through to the GHL
  webhook only. Confirm the **BAA covers the GoHighLevel intake path** (release blocker
  per HIPAA_AUDIT.md §1.1).
- **Third-party scripts (exactly two, both shipped in code)** — the GHL chat loader
  (site-wide as of 2026-06-12; BAA-covered vendor) and the **Curve (ComplyTrack)
  compliance tracker** (added 2026-07-17, `pll-seo/includes/tracking.php`). Curve loads
  from `https://complytrack-be-production.up.railway.app` and is **production-gated**:
  it renders only when the site is served from `premierlimblengthening.com` (with or
  without www), so staging/preview hosts emit nothing. Confirm the practice's BAA with
  Curve is on file. Per HHS OCR guidance on tracking technologies, do not add GA4/Meta
  Pixel or any other tracker directly; additional analytics go in **only after a
  signed BAA** with that vendor, with CSP extended for the new domains.
- **Content-Security-Policy (complete reference policy).** A `default-src 'self'`
  policy MUST also open the directives below or it breaks shipped functionality:
  the GHL chat widget loads its avatar/attachment images from GHL CDNs (`img-src`),
  the post-submit booking widget is an iframe on the branded scheduler domain
  (`frame-src` — with `default-src 'self'` and no `frame-src`, the calendar is
  blocked entirely), and the iframe auto-resize helper `form_embed.js` loads from
  that same scheduler domain (`script-src`). Reference policy, known-good for
  everything this package ships:

  ```
  default-src 'self';
  script-src 'self' 'unsafe-inline'
      https://complytrack-be-production.up.railway.app
      https://cdn.jsdelivr.net
      https://*.leadconnectorhq.com
      https://schedule.premierlimblengthening.com;
  connect-src 'self'
      https://complytrack-be-production.up.railway.app
      https://*.leadconnectorhq.com
      wss://*.leadconnectorhq.com
      https://*.msgsndr.com
      https://storage.googleapis.com
      https://firebasestorage.googleapis.com;
  frame-src 'self'
      https://schedule.premierlimblengthening.com
      https://*.leadconnectorhq.com
      https://*.msgsndr.com;
  img-src 'self' data: blob:
      https://*.leadconnectorhq.com
      https://*.msgsndr.com
      https://storage.googleapis.com
      https://firebasestorage.googleapis.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  media-src 'self'
      https://*.leadconnectorhq.com
      https://*.msgsndr.com
      https://storage.googleapis.com
      https://firebasestorage.googleapis.com;
  worker-src 'self' blob:;
  ```

  Notes on this policy:
  - **Serialize to a single header line** — raw newlines are invalid in header values;
    the block above is formatted for readability only.
  - **Scope it to the front end.** If the header also covers `/wp-admin`, Gravatar
    avatars (`secure.gravatar.com`) break under this `img-src` and admin screens are
    untested under it. Front-end-only scoping avoids both.
  - `cdn.jsdelivr.net` is required by the Curve tracker: when session recording or
    heatmaps are enabled on the Curve account it dynamically loads `rrweb` and
    `html2canvas` from jsDelivr. **rrweb is full-DOM session recording** — on a
    medical intake site that capability must be covered by the Curve BAA (see the
    tracking-technologies bullet above). If Curve confirms those features are off
    for this account, the jsDelivr entry can be dropped.
  - `storage.googleapis.com` / `firebasestorage.googleapis.com` / `*.msgsndr.com`
    cover the GHL media CDN (chat avatar images, attachments, voice notes).
  - `'unsafe-eval'` is NOT required — nothing shipped (theme, plugins, Curve, GHL
    loader, form_embed.js) uses eval. `'unsafe-inline'` IS required (the Curve
    snippet and the theme's no-js class flip are inline), which means this policy is
    resource allowlisting, not XSS protection — set `frame-ancestors`, `base-uri`,
    `object-src 'none'`, and `form-action` per host policy on top.

  After deploying a CSP change, verify **on the production domain** (the Curve
  tracker is production-gated and never fires on staging): browse `/consult/`
  end-to-end (submit a test entry, confirm the booking calendar renders in the
  success panel, chat avatars load, and send a test chat attachment) with the
  browser console open — any residual `Refused to load…` message names the exact
  origin still missing.
- Disable XML-RPC, block REST user enumeration (`/wp-json/wp/v2/users`), disable
  pingbacks, standard managed-WP hardening.
- Fonts are self-hosted (theme `assets/fonts/`, SIL OFL) — no fonts.googleapis.com calls.
- Optional Cloudflare Turnstile on the form: define `PLL_TURNSTILE_SITE_KEY` /
  `PLL_TURNSTILE_SECRET` (degrades to honeypot+time-trap without them — current default).
- Pre-launch: enable the form's **emergency disclaimer** (edit the Contact page → select
  the Consultation Form block → toggle "Show emergency disclaimer"). Required by the
  HIPAA audit; shipped off for pixel-parity with the current site.

## 10. Open items carried over from HIPAA_AUDIT.md (practice/counsel side)

- [ ] Signed §164.508 marketing authorizations for the three homepage testimonials
      (Marcus T. / David R. / James K.) — or re-anonymize/remove
- [ ] Provenance/authorization for `dr-xray.jpg` and the hero video footage
- [ ] Counsel review of Privacy Policy, Terms, Accessibility (imported as published pages)
- [ ] Notice of Privacy Practices page (`/notice-of-privacy-practices`) still unbuilt
- [x] SMS/HELP contact number confirmed by the owner (2026-06-12): **(951) 620-5663**,
      applied site-wide (was (909) 563-8653; the June-2026 handoff's (909) 461-4984
      is superseded). On an already-seeded site, also run the search-replace in §6b.
- [ ] Provision privacy@premierlimblengthening.com
- [ ] BAA inventory: hosting, GHL/LeadConnector, telehealth, CareCredit, email/CRM
