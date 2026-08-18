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
- composes the marketing pages (Home, About, Contact, Book a Consultation, Dr. Basmajian,
  Pricing) from the theme's block patterns, creates the Blog posts page
- fixes author nicenames for deterministic post ownership (the `/author/…/`
  archives themselves are retired: they 301 to `/blog/` and every public
  byline reads "Dr. Hrayr Basmajian" — owner decision 2026-07-28)
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

### 6c. Deploying the contact/booking split (2026-07)

Booking and contact are now separate flows: `/consult/` is the contact page
(form + contact card, hero removed) and `/book-a-consultation/` is the booking
page (embedded GHL calendar + the same contact card). The site-wide "Schedule
Consultation" button targets the booking page. On an already-seeded live site,
after uploading the updated theme + pll-forms + pll-seo:

1. **Create the booking page** — a plain, non-forced re-run of setup.php
   creates only the missing page and touches nothing else:

   ```
   wp eval-file content/setup.php
   ```

2. **Recompose the contact page from the updated pattern** (targeted — avoids
   `PLL_SEED_FORCE`, which would also overwrite the owner-edited Home and
   Pricing pages):

   ```
   wp eval '
   $pattern = WP_Block_Patterns_Registry::get_instance()->get_registered( "pll/consult-page" );
   $page    = get_page_by_path( "consult" );
   wp_update_post( array( "ID" => $page->ID, "post_content" => wp_slash( trim( $pattern["content"] ) ) ) );
   '
   ```

3. **Retarget every homepage schedule CTA** — ALL scheduling buttons now go to
   the booking page (owner request 2026-07-28). Four buttons were frozen into
   the seeded homepage content, and confirmed via live-site inspection
   2026-07-29 to still read: "Schedule a Confidential Consultation" (Article
   lede, `/#consult`), "Schedule Your Assessment" (Candidate, `/#consult`),
   "Schedule a Virtual Consultation" (Concierge, ALSO frozen at `/#consult`
   despite the pattern file having read `/book-a-consultation/` for a while —
   editing a pattern file never touches an already-seeded page's saved
   content), and the FinalCta gold button (frozen at seed-time `cta_href`, an
   absolute `…/consult/` URL). Preferred: recompose the Home page from the
   current patterns, the same targeted way as the consult page in step 2
   (diff first if editors have touched it — the patterns already carry every
   approved homepage edit). Fallback, string-surgical (verify the actual
   frozen values with a `wp post get <id> --field=content` dump first if this
   doesn't match — frozen strings drift with whatever version last seeded
   Home):

   ```
   wp eval '
   $home = get_post( (int) get_option( "page_on_front" ) );
   $new  = str_replace(
       array(
           "\"label\":\"Schedule a Confidential Consultation\",\"url\":\"/#consult\"",
           "\"label\":\"Schedule Your Assessment\",\"url\":\"/#consult\"",
           "\"label\":\"Schedule a Virtual Consultation\",\"url\":\"/#consult\"",
           "\"label\":\"Schedule a Confidential Consultation\",\"url\":\"" . home_url( "/consult/" ) . "\"",
       ),
       array(
           "\"label\":\"Schedule a Confidential Consultation\",\"url\":\"/book-a-consultation/\"",
           "\"label\":\"Schedule Your Assessment\",\"url\":\"/book-a-consultation/\"",
           "\"label\":\"Schedule a Virtual Consultation\",\"url\":\"/book-a-consultation/\"",
           "\"label\":\"Schedule a Confidential Consultation\",\"url\":\"" . home_url( "/book-a-consultation/" ) . "\"",
       ),
       $home->post_content
   );
   if ( $new !== $home->post_content ) {
       wp_update_post( array( "ID" => $home->ID, "post_content" => wp_slash( $new ) ) );
       echo "Home page updated.\n";
   } else {
       echo "No changes made -- none of the expected old strings matched. Dump wp post get " . $home->ID . " --field=content and check the live button text/URLs.\n";
   }
   '
   ```

3b. **Contact form no longer opens the calendar** (2026-07-28): the
   pll/consult-form block's post-submit inline booking widget and calendar
   redirect are now OFF by default — the form ends in a thank-you that links
   to `/book-a-consultation/`. This ships with the updated pll-forms plugin
   and needs **no content change** (the consult page saved the block without
   attributes, so the new defaults apply). An editor can re-enable either
   behavior per-block in the inspector. The fax line was also dropped from the
   contact cards and PLL Site Settings — the step-2 recompose applies both to
   the live consult page.

4. **Point the site-wide CTA at the booking page**: Settings → PLL Site →
   clear the "Primary CTA URL" field (blank now falls back to the new theme
   default `/book-a-consultation/`), or type `/book-a-consultation/`
   explicitly. The live override that sent the button straight to the external
   scheduler is what this replaces.

5. **Refresh the contact page's SEO meta** (post meta is authoritative and was
   seeded with the old "Schedule a…" copy; the new booking page needs nothing —
   it reads the plugin's runtime defaults):

   ```
   wp eval '
   $p = get_page_by_path( "consult" );
   update_post_meta( $p->ID, "_pll_seo_title", "Contact Premier Limb Lengthening · Upland, California" );
   update_post_meta( $p->ID, "_pll_seo_description", "Contact Premier Limb Lengthening in Upland, California. Send a confidential message and we respond within one business day, or call (951) 620-5663." );
   update_post_meta( $p->ID, "_pll_og_title", "Contact Premier Limb Lengthening · Upland, California" );
   update_post_meta( $p->ID, "_pll_og_description", "Send us a confidential message. We respond within one business day. Virtual visits and white-glove travel coordination from Upland, California." );
   '
   ```

6. **Footer**: the footer template part renders the `pll/footer` pattern live,
   so the new "Book a Consultation" link appears with the theme upload — unless
   the footer was customized in the Site Editor (then reset or re-apply it, §6e).

7. **Verify**: `/book-a-consultation/` loads the branded scheduler iframe
   (CSP `frame-src` already allows `schedule.premierlimblengthening.com`, §9);
   the header button and footer link point at it; `/consult/` shows the form
   with the compact header (no hero band). Scriptable:
   `PLL_BASE=https://<host> node scripts/verify-booking-split.mjs`
   (the header-CTA assertion only passes after step 4).

### 6d. Remove the stale web-root sitemap.xml (HOST ACTION — blocking Google indexing)

A hand-authored static `sitemap.xml` sits in the production web root (last
modified 2026-06-17, NOT part of this package — `package-handoff.mjs` ships no
sitemap). It lists 38 URLs without trailing slashes on a trailing-slash
permalink site, so every submitted URL 301s: Google has excluded 35 pages as
"Page with redirect" and never discovered `/height-surgery/` or
`/leg-lengthening-surgery/`. The pll-seo plugin already 301s `/sitemap.xml`
and `/sitemap_index.xml` to WordPress's native `/wp-sitemap.xml`, but a
static file is served before PHP boots, so the redirect can never fire while
the file exists. Deleting the file IS the fix — nothing replaces it.

1. **Delete the stale file**: remove `<webroot>/sitemap.xml` on the host.
   Do not replace it — WordPress publishes the correct sitemap natively at
   `/wp-sitemap.xml`, and `robots.txt` already points there (no change
   needed).

2. **Verify the plugin redirect takes over:**

   ```bash
   curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://premierlimblengthening.com/sitemap.xml
   # expect: 301 https://premierlimblengthening.com/wp-sitemap.xml
   ```

3. **Install a server-level guard** so a re-uploaded file can never shadow
   the redirect again. On Apache the rule must sit **above** the
   `# BEGIN WordPress` block and must NOT carry a
   `RewriteCond %{REQUEST_FILENAME} !-f` guard — that condition is exactly
   what would let a static file win again.

   Apache (`.htaccess`, above `# BEGIN WordPress`):

   ```apache
   # BEGIN PLL legacy sitemap guard
   <IfModule mod_rewrite.c>
   RewriteEngine On
   RewriteRule ^sitemap\.xml$ /wp-sitemap.xml [R=301,L]
   RewriteRule ^sitemap_index\.xml$ /wp-sitemap.xml [R=301,L]
   </IfModule>
   # END PLL legacy sitemap guard
   ```

   nginx (server block — exact-match `location =` outranks `try_files`):

   ```nginx
   location = /sitemap.xml       { return 301 /wp-sitemap.xml; }
   location = /sitemap_index.xml { return 301 /wp-sitemap.xml; }
   ```

4. **Search Console follow-up** (human step, practice side, not automatable):
   - Submit `https://premierlimblengthening.com/wp-sitemap.xml` (non-www).
   - Remove the existing `https://www.premierlimblengthening.com/sitemap.xml`
     submission — it lives on the www host, which itself 301s to non-www.
   - Request indexing for `/height-surgery/` and `/leg-lengthening-surgery/`.
   - Hit **Validate Fix** on the "Blocked due to access forbidden (403)"
     report to force a recrawl of the two stale URLs (transient WAF 403s from
     2026-06-28/29; also ask the host to audit Cloud Armor for Googlebot 403s
     on those dates).

5. **Post-deploy verification:**

   ```bash
   PLL_BASE=https://premierlimblengthening.com npm run verify:sitemap
   ```

   All checks green = both aliases 301 to `/wp-sitemap.xml`, the stale body is
   gone, every advertised URL is a terminal 200 with a trailing slash, and
   both pillar pages are present. The two `/sitemap.xml` checks fail by
   design until step 1 is done.

### 6e. Header/footer pattern changes: clear Site Editor customizations first

**Run this before ANY deploy that changes `patterns/footer.php` or another
template-part pattern.** `parts/footer.html` is one line — a `wp:pattern`
reference the theme resolves live — which is why footer edits normally ship with
the theme upload and need no re-seed. That breaks the moment someone opens
Appearance → Editor → Footer and saves: WordPress writes a `wp_template_part`
post to the database, flattens the pattern reference into literal blocks at save
time, and from then on the DB copy wins. The theme file is still deployed and
still correct, and **nothing on the site changes**. It fails silently, so check
rather than assume.

1. **Check the target install** (before uploading, or any time footer changes
   fail to appear):

   ```
   wp post list --post_type=wp_template_part --format=table
   ```

   No rows = nothing shadows the theme, deploy normally. A `footer` (or
   `header`) row = that part is customized and pinned to whatever it looked
   like when it was saved.

2. **If a row exists, pick one:**

   - **Reset** (preferred, restores live pattern resolution): Site Editor →
     Patterns → Manage all template parts → Footer → three-dot menu → **Clear
     customizations**. The part reverts to `parts/footer.html` and picks up the
     current pattern immediately. Equivalent from the CLI, after confirming the
     ID from step 1 and taking a DB snapshot:

     ```
     wp post delete <id> --force
     ```

   - **Re-apply by hand** if the customization is wanted: keep the DB copy and
     make the same edit in the Site Editor. Diff the saved part against
     `patterns/footer.php` first so you carry over every change, not just the
     newest one.

3. **Verify** on the front end that the change is actually rendered. View
   source and search for a string unique to the new markup rather than trusting
   the deploy.

Same caveat, shorter, in §6c step 6. Applies to every future footer pattern
change. It used to call out the "Medically Reviewed By" credential block, which
was removed on 2026-08-18 (docs/MEDICAL_REVIEW_LOG.md). That removal was itself
a footer pattern change, and this check ran clean before it shipped.

### 6f. Homepage cost FAQ: the visible paragraph must be edited by hand (2026-08)

**DONE on production 2026-08-17**, in the same release as the code. The paragraph
was replaced with a targeted `wp eval-file` against page 166 (assert the old
string appears exactly once, `str_replace`, `wp_update_post`, which leaves a
revision to roll back to) rather than a site-wide `search-replace`. `V13` now
passes against live. The instructions below stand for any future environment or
any repeat of this class of change.

**Blocking. Do this BEFORE or WITH the code deploy, never after.**

The homepage cost FAQ answer now quotes both nail generations starting at the
real `$75,500` floor instead of only the PRECICE Max tier. That answer exists in
**three** places, and only two of them are in this repo:

| Copy | Where | Reaches production by |
|---|---|---|
| FAQPage **JSON-LD** | `plugins/pll-seo/includes/data/faqs.php` | **code deploy** |
| Pattern source | `themes/pll-editorial/patterns/home-faq.php` | **nothing** on a seeded site |
| **Visible text** | `post_content` of the Home page, **in the database** | manual editor edit |

`content/setup.php` `pll_compose_patterns()` inlines pattern content into
`post_content` at seed time rather than emitting a `wp:pattern` reference, so
editing the pattern file does not touch an already-seeded homepage. Same trap as
§6c step 3 and §6e, in a third place.

**If you deploy the code without doing this, the homepage publishes structured
data that contradicts its own visible text** — `$75,500` in the JSON-LD, `$95,500`
on the page. That is a worse defect than the one this change set out to fix, and
it is exactly the kind of mismatch Google's structured-data policy targets.

1. **Edit the visible paragraph.** wp-admin → Pages → **Home** → the
   `How much does limb lengthening surgery cost?` FAQ item → replace the
   paragraph with the answer in `data/faqs.php` (byte for byte) → Update.

   **Do NOT run `PLL_SEED_FORCE`.** It recomposes the whole Home page from
   patterns and overwrites every editorial change made since launch.

   WP-CLI alternative, if available on the host (take a DB snapshot and run with
   `--dry-run` first):

   ```
   wp search-replace 'Bilateral femur lengthening is $95,500 and bilateral tibia lengthening is $105,500. A combined tibia and femur procedure is $195,000, with maximum-height options up to 6 inches discussed during consultation.' 'Bilateral femur lengthening is $75,500 with the PRECICE 2 nail and $95,500 with PRECICE Max. Bilateral tibia is $85,500 and $105,500. Combined tibia and femur is $150,000 and $195,000.' --precise --all-tables
   ```

2. **Verify** the visible text and the JSON-LD agree:

   ```
   PLL_VERIFY_LIVE=1 npm run verify:seo-meta      # V13
   ```

3. **Clear the tripwire.** Update `SEEDED_HOMEPAGE_FAQ_COST` in
   `scripts/verify-seo-meta.mjs` to the new string. Until you do, every run
   prints an `⚑ ACTION REQUIRED` banner for this step, which is the point.

Related sitewide changes in the same deploy, both plain code with no manual step:

- `pll-seo/includes/schema.php` `priceRange` floor moved from `$95,500` to
  `$75,500` to match the cheapest published tier.
- **Combined Tibia + Femur with PRECICE 2 corrected from `$175,000` to
  `$150,000`** in `data/pricing.php` AND in the `$packages` array in
  `schema.php` (two hardcoded copies of the same tier), plus the
  `pricing-plans.php` pattern. Production had been serving `"price":"175000"`
  in the pricing page's Offer JSON-LD while the visible card on that same page
  read `$150,000`. `$150,000` is the correct figure (owner, 2026-08-17), and it
  is what the pricing page and the Evaluate-Your-Surgeon cost table already
  showed. `verify-seo-meta.mjs` V14 now compares the two price lists to each
  other, which is what nothing was doing before.

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
- [ ] `/consult/`: compact header (no hero band), submit a test inquiry → arrives in GHL,
      form ends in a thank-you linking the booking page (NO inline calendar; requires
      `PLL_GHL_WEBHOOK_URL` set to the real GHL inbound webhook in wp-config.php);
      GHL chat bubble loads site-wide (owner decision 2026-06-12; launched consult-only)
- [ ] `/book-a-consultation/`: branded scheduler calendar renders inline and a test
      booking lands in GHL; the header "Schedule Consultation" button and the footer
      "Book a Consultation" link both point here
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
      https://*.filesafe.space
      https://storage.googleapis.com
      https://firebasestorage.googleapis.com;
  style-src 'self' 'unsafe-inline'
      https://*.leadconnectorhq.com
      https://fonts.googleapis.com
      https://fonts.bunny.net;
  font-src 'self' data: https://fonts.gstatic.com https://fonts.bunny.net;
  media-src 'self'
      https://*.leadconnectorhq.com
      https://*.msgsndr.com
      https://*.filesafe.space
      https://storage.googleapis.com
      https://firebasestorage.googleapis.com;
  worker-src 'self' blob:;
  ```

  Notes on this policy:
  - **Serialize to a single header line** — raw newlines are invalid in header values;
    the block above is formatted for readability only.
  - **Scope it to the front end — do NOT send this header for `/wp-admin/*` or
    `wp-login.php`.** Confirmed on production (2026-07-22): with the CSP applied
    site-wide, the block editor's canvas iframe (which loads via `blob:` URLs)
    is blocked and every page shows a gray crashed canvas, making the site
    uneditable. Gravatar avatars (`secure.gravatar.com`) also break under this
    `img-src`. Serve the header only on front-end responses (web-server
    location/path rules), keep `X-Frame-Options: SAMEORIGIN` everywhere.
  - `cdn.jsdelivr.net` is required by the Curve tracker: when session recording or
    heatmaps are enabled on the Curve account it dynamically loads `rrweb` and
    `html2canvas` from jsDelivr. **rrweb is full-DOM session recording** — on a
    medical intake site that capability must be covered by the Curve BAA (see the
    tracking-technologies bullet above). If Curve confirms those features are off
    for this account, the jsDelivr entry can be dropped.
  - `storage.googleapis.com` / `firebasestorage.googleapis.com` / `*.msgsndr.com` /
    `*.filesafe.space` cover the GHL media CDN (chat avatar images, attachments,
    voice notes). The hosts below were confirmed against the live production
    console on 2026-07-22 — each produced a `Refused to load…` violation under
    the interim policy: `assets.cdn.filesafe.space` (the configured chat avatar
    image), `widgets.leadconnectorhq.com` (default avatar), `fonts.bunny.net`
    (the chat widget's Inter Tight stylesheet + font files → `style-src` AND
    `font-src`), `stcdn.leadconnectorhq.com` (the intl-tel-input stylesheet the
    consult form's phone field needs → `style-src`), and
    `services.msgsndr.com` (attribution session → `connect-src`).
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
