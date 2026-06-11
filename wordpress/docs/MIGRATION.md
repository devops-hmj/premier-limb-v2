# PLL WordPress — HIPAA Vault Migration Runbook

This package is a 1:1 WordPress recreation of premierlimblengthening.com (currently a
Next.js build). It contains an FSE block theme, two small custom plugins, and a content
seed. **No build tools are required on the server** — every compiled asset is included.

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
   Provided out-of-band — never commit or email in plaintext.
   ⚠️ The previous webhook URL exists in the old repo's git history:
   generate a NEW webhook in GHL at cutover and use it here. */
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

## 7. URL parity contract (do not change)

- Permalinks **must** stay `/%postname%/` and the category base must stay `category` —
  every legacy URL then resolves with **zero redirects**.
- The only redirects shipped: `/video/will-i-be-a-better-athlete` → 301 to the athletics
  article; `/sitemap.xml` and `/sitemap_index.xml` → 301 to `/wp-sitemap.xml`.

## 8. Post-install verification

- [ ] `/` renders the video hero (sound toggle bottom-right), all 12 sections, footer
- [ ] `/blog/` shows 16 cards with images; search and category tabs filter client-side
- [ ] An article (e.g. `/am-i-too-old-for-limb-lengthening/`) shows breadcrumb, "In This
      Post" TOC, featured image, body, "Keep reading." grid
- [ ] `/your-surgery/` + the 7 sub-pages (note `/your-surgery/limb-lengthening-expectations/`
      uses the full-bleed photo header)
- [ ] `/consult/`: submit a test inquiry → arrives in GHL; GHL chat bubble loads on this page only
- [ ] `view-source` on any page: one `<title>` ending in "· Premier Limb Lengthening",
      meta description, canonical on `https://premierlimblengthening.com`, JSON-LD blocks
      (MedicalBusiness graph everywhere; Article on posts; FAQPage on home)
- [ ] `/robots.txt`, `/wp-sitemap.xml`
- [ ] Log in as an **Editor**: pages open in content-only mode (text/images editable,
      structure locked); FAQ items can be added/removed; posts edit freely

## 9. HIPAA hardening (HIPAA Vault side)

- The form pipeline stores **no PHI in WordPress** — payloads pass through to the GHL
  webhook only. Confirm the **BAA covers the GoHighLevel intake path** (release blocker
  per HIPAA_AUDIT.md §1.1).
- **No analytics or pixels anywhere** — the site ships zero third-party scripts except
  the GHL chat loader on `/consult/`. Per HHS OCR guidance, do not add GA4/Meta Pixel;
  any future analytics must be BAA-covered or self-hosted.
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
- [ ] Confirm the SMS/HELP contact number: site uses (909) 563-8653; the June-2026
      marketing handoff cited (909) 461-4984
- [ ] Provision privacy@premierlimblengthening.com
- [ ] BAA inventory: hosting, GHL/LeadConnector, telehealth, CareCredit, email/CRM
