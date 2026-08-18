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

## Site-wide footer credential block: built, published, removed

**Removed 2026-08-18. Do not rebuild it without a new decision.**

A second mechanism used to exist alongside the per-page byline above: a
"Medically Reviewed By" credential block in the site footer, naming
Dr. Basmajian and three credential lines on every front-end view. It was built
2026-08-14 behind an off-by-default option, switched on in production
2026-08-17, and deleted three days later at the client's direction (Jaime):
per-page attribution on the pages that were actually clinically reviewed is
enough, and a site-wide claim was more than the scope called for.

What was removed, all of it:

| Piece | Where it lived |
|---|---|
| Block markup (heading, name, three credential lines, link) | `themes/pll-editorial/patterns/footer.php` |
| `pll_medical_review_footer_enabled()`, `pll_medical_review_footer_excluded()`, and the `render_block_core/group` suppression filter | `themes/pll-editorial/inc/setup.php` |
| Registered setting, "Medical review attribution" section, checkbox field, `pll_render_medical_review_field()` | `themes/pll-editorial/inc/settings.php` |
| `pll_medical_review_footer` option row | production database |

**What deliberately survives, because it is the originally scoped work:** the
per-page "Medically reviewed by Dr. Hrayr Basmajian" byline driven by
`pll_seo_review_dates()`, live on `/height-surgery/` and
`/leg-lengthening-surgery/`, and the `MedicalWebPage` + `reviewedBy` JSON-LD on
those same two paths. Both are covered by the July 2026 sign-off
(`PLL_Pillar_Pages_Clinical_Review.docx`) and are unaffected by this removal.
Everything above the "Policy" heading still applies.

The reason worth carrying forward: a site-wide credential block is a public
claim about a named physician's review of *all* the site's medical content,
which is a broader assertion than any per-page sign-off supports. That is why
it shipped switched off, and it is why the written approval never materialised
before it was cut. If it is ever revisited, it needs its own written sign-off
on the exact credential strings, not an extension of a per-page approval.

### The exact copy, for the record

| Element | Exact string |
|---|---|
| Eyebrow heading (`h4`) | `Medically Reviewed By` |
| Name | `Dr. Hrayr Basmajian, MD` |
| Credential line 1 | `Board-Certified Orthopedic Surgeon` |
| Credential line 2 | `Orthopedic Trauma Medical Director` |
| Credential line 3 | `Fellowship-Trained Limb Reconstruction Specialist` |
| Link label | `View Full Credentials` (to `/dr-basmajian/`) |

It was suppressed by design on `/privacy/`, `/terms/`, `/accessibility/`, 404
and search, since a clinical-review claim on a counsel-authored legal document
would have been affirmatively false.

### Site-wide sign-off record

| Approved (Y/N) | Date | Approver | Artifact | Final state |
|---|---|---|---|---|
| Withdrawn | 2026-08-18 | Client direction (Jaime), relayed by the site owner | n/a | REMOVED from code and database |
