# Medical Review Attribution: Policy and Tracking Log

Source of truth for the "Medically reviewed by Dr. Hrayr Basmajian" byline.
Ported from `schema_updates/PLL_Medical_Review_Policy_and_Log.docx`.

The byline is **built but held**: the mechanism is implemented, but it publishes
on a page only after Dr. Basmajian reviews that page's clinical content and the
row below is marked `Reviewed = Y` with a real date.

**Status (July 2026):** `/height-surgery/` and `/leg-lengthening-surgery/` are
signed off (PLL_Pillar_Pages_Clinical_Review.docx) and their byline is LIVE. All
other clinical pages remain held pending review.

## How to publish a byline (per page, after sign-off)

1. Confirm Dr. Basmajian has reviewed the page's clinical content.
2. In [`wp-content/plugins/pll-seo/includes/schema.php`](../wp-content/plugins/pll-seo/includes/schema.php)
   → `pll_seo_review_dates()`, add the page's path with the real review month,
   e.g. `'/height-surgery/' => 'July 2026',`.
3. Re-seed with `PLL_SEED_FORCE` (see [MIGRATION.md](MIGRATION.md) §6b) so the
   byline is injected directly under the H1.
4. Mark the row below `Reviewed = Y` and record the date.

**Never ship a placeholder date.** The map is the gate: a path absent from
`pll_seo_review_dates()` renders no byline and no `MedicalWebPage` schema, so
`[INSERT DATE]` cannot reach production. The byline links Dr. Basmajian's name to
`/dr-basmajian/`.

Implementation note: the byline is rendered by `pll_render_review_byline()` and
injected by `pll_seed_clinical_additions()` in `content/setup.php` (one source),
rather than as a static pattern, because the "Last reviewed" date is per-page and
gated on sign-off. The FAQ/PAA schema and visible copy share the `pll_seo_paa()`
data source in the pll-seo plugin.

**There is exactly one review-date map, `pll_seo_review_dates()` in the pll-seo
plugin.** It lives in the plugin rather than in `content/setup.php` because
`content/setup.php` runs at seed time only and is never loaded on a front-end
request, so a map kept there could not feed the schema. One map drives two
outputs: the seeded visible byline, and the `MedicalWebPage` + `reviewedBy`
JSON-LD that `pll_seo_schemas_for_view()` emits on those same paths. Nothing
needs to be kept in sync, and there is no second copy to edit. If the plugin is
inactive, `pll_seed_clinical_additions()` injects nothing at all, so the byline
and the schema can never disagree.

The JSON-LD `lastReviewed` is the ISO form of the same month (`July 2026` becomes
`2026-07-01`, first of the month) while the visible byline keeps the human
string. A signed-off pillar page therefore emits BOTH its `MedicalProcedure` and
the `MedicalWebPage`.

## Policy

- **Rule 1 - Clinical pages only.** The byline appears only on pages that make
  clinical claims (procedure, risks, recovery, pain, candidacy, outcomes).
- **Rule 2 - Never on non-clinical pages.** No byline on pricing, contact,
  about, concierge, or editorial pages. (Pricing gets the PAA block but not the
  review line - its PAA answers are financial/administrative.)
- **Rule 3 - Attribution must be true.** A page shows the byline only after
  Dr. Basmajian has actually reviewed that page. Added page by page, not
  site-wide.
- **Rule 4 - Reviewer, not author.** Wording is "Medically reviewed by
  Dr. Hrayr Basmajian", content authored by the practice team.
- **Rule 5 - Re-review on material change.** Changes to clinical claims,
  timelines, or risks trigger re-review and a new date. Typos/formatting do not.

Wording: `Medically reviewed by Dr. Hrayr Basmajian, dual fellowship-trained
orthopedic trauma surgeon. Last reviewed: [Month Year].` placed directly below
the H1.

## Tracking log

Update `Reviewed` and `Review Date` as Dr. B signs off, then add the path to
`pll_seo_review_dates()` (pll-seo plugin) and re-seed. Insurance page is
optional (currently administrative PAA only, so no byline).

| Page path | Clinical? | Needs byline? | Reviewed (Y/N) | Review date | Re-review trigger |
|---|---|---|---|---|---|
| `/height-surgery/` (new) | Yes | Yes | **Y** | **July 2026** | Content change |
| `/leg-lengthening-surgery/` (new) | Yes | Yes | **Y** | **July 2026** | Content change |
| `/your-surgery/how-much-taller-can-i-get-with-limb-lengthening/` | Yes | Yes | N |  | Content change |
| `/limb-lengthening-what-you-gain-what-you-risk/` | Yes | Yes | N |  | Content change |
| `/is-leg-lengthening-off-limits-for-athletes/` | Yes | Yes | N |  | Content change |
| `/limb-lengthening-pain-the-truth/` | Yes | Yes | N |  | Content change |
| `/your-surgery/` (hub) | Yes | Yes | N |  | Content change |
| `/is-limb-lengthening-covered-by-insurance/` | Partial | Optional | N |  | If clinical claims added |
| `/limb-lengthening-pricing-options/` | No | No | N/A | N/A | N/A (PAA only, no byline) |
| `/dr-basmajian/` | No (bio) | No | N/A | N/A | N/A |
| `/about/` | No | No | N/A | N/A | N/A |
| `/consult/` | No | No | N/A | N/A | N/A |

## Site-wide footer credential block

A second, separate mechanism. The per-page byline above attributes review of one
page's clinical content. The footer block attributes clinical review of the
site's medical content generally, and it is a public claim about a named
physician, so it carries its own approval and its own switch.

**Status: PUBLISHED on production since 2026-08-17.** `pll_medical_review_footer`
is `1`. Verified live the same day: the block renders on `/`,
`/limb-lengthening-pricing-options/` and `/dr-basmajian/`, and is absent from
`/privacy/`, `/terms/` and `/accessibility/`.

The shipped default in code is still `0`, so a fresh install, a Playground boot
or the handoff zip still render nothing until someone turns it on deliberately.

⚠️ **Open: attach the written approval artifact.** Sign-off was confirmed by the
site owner on 2026-08-17 and the switch was flipped on that confirmation. The
record below has no document reference yet. Attach the email, doc or meeting
note from Dr. Basmajian and fill in the Artifact column. Until then the row is
an assertion without evidence, which is the one thing this log exists to
prevent. The earlier position stands for context: the July 2026 approval covers
`/height-surgery/` and `/leg-lengthening-surgery/` only, and a per-page approval
does not by itself authorise the site-wide claim.

Both may appear on the same page. That is intentional and must not be
"deduplicated": the byline is a per-page review date under the H1, the footer
block is a site-wide credential attribution.

### What it is

A credential block in the site footer, below the four-column link grid and above
the "Results may vary." line, on every front-end view that uses the footer
template part. Markup lives in
[`wp-content/themes/pll-editorial/patterns/footer.php`](../wp-content/themes/pll-editorial/patterns/footer.php).
Plain core blocks with no `templateLock` and no `lock`, so an editor-role user
can change every string and the link URL in Appearance > Editor > Patterns >
Footer with no code access.

Exact copy. Approve it as a set, or line by line, but nothing here is a
placeholder:

| Element | Exact string |
|---|---|
| Eyebrow heading (`h4`) | `Medically Reviewed By` |
| Name | `Dr. Hrayr Basmajian, MD` |
| Credential line 1 | `Board-Certified Orthopedic Surgeon` |
| Credential line 2 | `Orthopedic Trauma Medical Director` |
| Credential line 3 | `Fellowship-Trained Limb Reconstruction Specialist` |
| Link label | `View Full Credentials` |

The link points to `/dr-basmajian/`, the same destination as the per-page
byline and the same URL the Physician schema `@id` is built on.

### Where it never renders

`/privacy/`, `/terms/`, `/accessibility/`, any 404 view, and any search-results
view. The three legal documents are counsel-authored and carry no medical
content, so a clinical-review claim there would be affirmatively false. 404 and
search have no content to attribute. Suppression removes the markup entirely
rather than hiding it with CSS, because a hidden but present "Medically Reviewed
By" on a Terms page is still a crawlable false claim. The exclusion list lives in
`pll_medical_review_footer_excluded()`
([`inc/setup.php`](../wp-content/themes/pll-editorial/inc/setup.php)).

### The switch

| Path | How |
|---|---|
| **Owner (primary, no deploy)** | Settings > PLL Site > "Medical review attribution" > check "Show 'Medically Reviewed By' in the footer" > Save Changes. Takes effect on the next page load. Unchecking removes the block just as fast. |
| **Developer (one line)** | `add_filter( 'pll_medical_review_footer_enabled', '__return_true' );` in a mu-plugin. `'__return_false'` forces it off regardless of the checkbox, which is the emergency kill switch. |
| **WP-CLI** | `wp option update pll_medical_review_footer 1` to publish, `wp option update pll_medical_review_footer 0` to hide. |
| **Shipped default** | `0`, hidden. A fresh install, a fresh Playground boot, and the handoff zip all render nothing until someone deliberately turns it on. |

### Procedure at go-live

1. Ask Dr. Basmajian to approve the exact six strings above as an accurate
   description of his credentials and of his clinical-review role over the
   site's medical content. Get it in writing.
2. Record the approval in the table below: date, approver, and the artifact
   (email, doc, or meeting note).
3. Flip the checkbox on production.
4. Spot-check `/` and `/privacy/` on production. The block must be present on
   the first and absent from the second.
5. If Dr. B declines one credential line, edit that line in the Site Editor
   rather than turning the whole block off. If he declines the site-wide
   attribution entirely, leave the switch off. Per-page attribution is already
   covered by `pll_seo_review_dates()` above.

**Never enable the switch on production before step 1 is complete.**

Deploy note: if anyone has saved a Footer customisation in the Site Editor on the
target install, WordPress stores a `wp_template_part` post that shadows the theme
file and the block will not appear. It fails silently. Run the pre-deploy check
in [MIGRATION.md](MIGRATION.md) §6e before deploying this block.

### Site-wide sign-off record

| Approved (Y/N) | Date | Approver | Artifact | Switch state |
|---|---|---|---|---|
| **Y** | 2026-08-17 | Dr. Basmajian, relayed by the site owner | **MISSING — attach the written approval** | ON (production, `pll_medical_review_footer = 1`) |
