# CTR Metadata Proposal — Top Pages (Title + Meta Description)

**Status:** Proposed, NOT yet applied. Awaiting owner sign-off on public-facing wording (and the price figure in item 2).
**Source data:** `premierlimblengthening.com-Performance-on-Search-2026-07-21.xlsx` (90-day GSC export: 147,444 impressions, 770 clicks, **site CTR 0.52%**).
**Where these live if approved:** `pll_seo_overrides()` in [`wordpress/wp-content/plugins/pll-seo/includes/meta.php`](../wp-content/plugins/pll-seo/includes/meta.php).

---

## How to read this

- **Titles auto-append a brand suffix.** [`titles.php`](../wp-content/plugins/pll-seo/includes/titles.php) adds ` · Premier Limb Lengthening` to every title, and `/your-surgery/*` sub-pages *also* get ` · Your Surgery` before that. So the override string must **not** contain a brand token (the audit's `| Premier LL` would double-brand). All proposed titles below are the **base string**; the "Rendered in SERP" line shows what Google actually receives.
- **Brand copy rules honored:** no em dashes, no semicolons, ranges spelled out ("3 to 6 inches"), `·` never `|`.
- **The audit's `$95k` price was wrong.** The true floor from [`data/pricing.php`](../wp-content/plugins/pll-seo/includes/data/pricing.php) is **$75,500** (Bilateral Femur with PRECICE 2). Item 2 uses the correct figure.
- **Projected clicks are directional, per-90-days**, using standard organic CTR-by-position curves against each page's current average position. They illustrate the size of the gap, not a guarantee. CTR also depends on ranking holding.

---

## Summary of the opportunity

These 8 pages carry **~122,600 impressions (83% of the site)** but convert at **~0.46% CTR**. Every one sits well below the CTR its *current ranking position* should earn. Closing even half the gap is worth an estimated **+1,500 to +2,000 clicks per 90 days** — a larger lever than any single ranking gain, because the impressions already exist.

| # | Page | Impr (90d) | Pos | Current CTR | Benchmark @ pos | Est. clicks left on table (90d) |
|---|---|---:|---:|---:|---:|---:|
| 1 | how-much-taller-can-i-get | 47,352 | 10.1 | 0.39% | ~1.8% | ~+400 |
| 2 | limb-lengthening-pricing-options | 20,811 | 8.5 | 0.47% | ~2.5% | ~+215 |
| 3 | is-...-covered-by-insurance ⚠️ | 7,014 | 4.4 | 0.51% | ~6% | ~+380 |
| 4 | gain-height-without-surgery | 18,604 | 8.4 | 0.75% | ~3% | ~+230 |
| 5 | off-limits-for-athletes | 10,831 | 5.9 | 0.51% | ~4.5% | ~+270 |
| 6 | limb-lengthening-pain | 6,417 | 6.1 | 0.37% | ~4.5% | ~+135 |
| 7 | exercise-after (sub-page) | 6,535 | 6.5 | 0.32% | ~4% | ~+110 |
| 8 | age-limit (sub-page) | 5,025 | 16.4 | 0.44% | n/a (page 2) | small until rank improves |

**Item 3 (insurance) is the single highest-value fix**: it ranks at position 4.4 — where CTR should be 6 to 7% — but earns 0.51%. That is the biggest click loss on the site relative to position.

---

## Proposed changes

### 1. `/your-surgery/how-much-taller-can-i-get-with-limb-lengthening/` — highest traffic (32% of all site impressions)

| | Current | Proposed |
|---|---|---|
| **Title (base)** | `How Much Taller Can I Get With Limb Lengthening?` | `How Much Taller Can You Get? 3 to 6 Inches` |
| **Rendered in SERP** | How Much Taller Can I Get With Limb Lengthening? · Your Surgery · Premier Limb Lengthening | How Much Taller Can You Get? 3 to 6 Inches · Your Surgery · … |
| **Description** | Most patients gain 3 to 6 inches across one or two procedures. The exact figure depends on bone segment, soft-tissue tolerance, and your starting anatomy. | Most patients gain 3 to 6 inches over one or two procedures. See femur vs. tibia height gains, the realistic limits, and how Dr. Basmajian sets a target for you. |

**Why:** The current title just restates the query with no differentiator, and the number (the thing every searcher wants) is buried mid-description. Leading the title with **"3 to 6 Inches"** gives the SERP a concrete number to anchor on (numeric titles measurably lift CTR), and the description adds femur/tibia specificity plus surgeon authority.
**Expected:** 0.39% is far below even the ~1.8% pos-10 benchmark; halving that gap on 47k impressions ≈ **+400 clicks/90d**.

---

### 2. `/limb-lengthening-pricing-options/` — commercial intent ⚠️ price sign-off needed

| | Current | Proposed |
|---|---|---|
| **Title (base)** | `Limb Lengthening Cost · Pricing & Financing` | `Limb Lengthening Cost: 2026 Pricing From $75,500` |
| **Rendered in SERP** | Limb Lengthening Cost · Pricing & Financing · Premier Limb Lengthening | Limb Lengthening Cost: 2026 Pricing From $75,500 · Premier Limb Lengthening |
| **Description** | Transparent 2026 pricing for cosmetic limb lengthening. Every quote bundles implants, OR time, hospitalization, anesthesia, follow-up care, and on-site sessions. | Transparent 2026 pricing for cosmetic leg lengthening, from $75,500. Every quote bundles the implant, OR time, hospital stay, anesthesia, and follow-up care. View financing options. |

**Why:** A **dollar figure + year** is the strongest CTR lever for "cost"/"price" queries — competitors show ranges, and a blank price cedes the click. `$75,500` is the true PRECICE 2 floor from `data/pricing.php` (the audit's `$95k` was the PRECICE Max femur tier, not the floor).
**⚠️ Requires owner sign-off** (publishes a price in the SERP) and **must be kept in sync with `data/pricing.php`** if tiers change.
**Expected:** ~+215 clicks/90d at a conservative 1.5% CTR.

---

### 3. `/is-limb-lengthening-covered-by-insurance/` — 🚨 biggest single lever

| | Current | Proposed |
|---|---|---|
| **Title (base)** | `Is Limb Lengthening Covered by Insurance?` | `Does Insurance Cover Limb Lengthening? Cosmetic vs. Medical` |
| **Rendered in SERP** | Is Limb Lengthening Covered by Insurance? · Premier Limb Lengthening | Does Insurance Cover Limb Lengthening? Cosmetic vs. Medical · Premier … |
| **Description** | Cosmetic limb lengthening is almost never covered by insurance. Reconstructive cases, like limb-length discrepancy or congenital deformity, sometimes are. What to ask. | Cosmetic limb lengthening is almost never covered, but reconstructive cases (limb-length discrepancy, deformity) sometimes qualify. Exactly what to ask your insurer, and your cost options. |

**Why:** This page ranks **4.4** — where CTR should be 6 to 7% — but earns 0.51%. The current title answers the query but gives no reason to click over competitors. Signposting **"Cosmetic vs. Medical"** tells the searcher the page resolves the exact ambiguity behind the query.
**Expected:** the largest opportunity on the site — even a lift to 4% ≈ **280 clicks/90d vs 36 today**.

---

### 4. `/leg-up-or-let-down-can-you-gain-height-without-surgery/`

| | Current | Proposed |
|---|---|---|
| **Title (base)** | `Can You Gain Height Without Surgery?` | `Can You Gain Height Without Surgery? Fact vs. Myth` |
| **Description** | Posture work, footwear, and growth hormone all have ceilings. A clear-eyed look at every non-surgical method patients try before booking limb lengthening. | Do posture work, insoles, and growth hormone actually add height? A surgeon's clear-eyed breakdown of what each method can and cannot do, and where the real ceiling is. |

**Why:** "Fact vs. Myth" adds tension/curiosity; the description reframes the concrete methods as the question people actually type.
**Expected:** ~+230 clicks/90d toward a ~2% CTR.

---

### 5. `/is-leg-lengthening-off-limits-for-athletes/`

| | Current | Proposed |
|---|---|---|
| **Title (base)** | `Is Leg Lengthening Off-Limits for Athletes?` | `Can Athletes Get Leg Lengthening? Running & Lifting` |
| **Description** | Athletes can return to running, lifting, and most sports after limb lengthening, but timing and biomechanics matter. What to plan for and what to avoid. | Can you still run, sprint, and lift after limb lengthening? How athletes rebuild full function and biomechanics after the nail consolidates, and the timeline to expect. |

**Why:** Front-loads the specific activities (running, lifting) athlete searchers care about. At pos 5.9, 0.51% is far below the ~4.5% benchmark.
**Expected:** ~+270 clicks/90d.

---

### 6. `/limb-lengthening-pain-the-truth/` — lighter touch

| | Current | Proposed |
|---|---|---|
| **Title (base)** | `Limb Lengthening Pain: What to Expect & How It Is Managed` | `How Painful Is Limb Lengthening? An Honest Answer` |
| **Description** | Pain peaks during the first two weeks of distraction, then fades. The medications, nerve blocks, and physical-therapy strategy that keep patients comfortable. | How painful is limb lengthening, really? Pain peaks in the first two weeks of distraction, then fades. Inside the nerve blocks, medication, and PT that keep patients comfortable. |

**Why:** The current title is already decent; this reframes it as the exact question with an "honest" trust hook that matches the brand voice. Lower-priority change.
**Expected:** ~+135 clicks/90d.

---

### 7. `/your-surgery/exercise-after-limb-lengthening/` (sub-page)

| | Current | Proposed |
|---|---|---|
| **Title (base)** | `When Can I Exercise After Limb Lengthening?` | `When Can You Exercise After Limb Lengthening? Week by Week` |
| **Description** | A week-by-week guide to returning to walking, swimming, cycling, and strength training after limb lengthening, plus the activities to delay until full consolidation. | A week-by-week return-to-exercise timeline after limb lengthening: walking, swimming, cycling, then strength training, and when full bone consolidation clears the gym. |

**Why:** "Week by Week" promises the structure searchers want.
**Expected:** ~+110 clicks/90d.

---

### 8. `/your-surgery/is-there-an-age-limit-for-limb-lengthening/` (sub-page, page 2)

| | Current | Proposed |
|---|---|---|
| **Title (base)** | `Is There an Age Limit for Limb Lengthening?` | `Is There an Age Limit for Limb Lengthening? Ages 20 to 50+` |
| **Description** | There is no fixed cutoff for cosmetic limb lengthening. What matters is bone density, joint health, and overall fitness, and here is how Dr. Basmajian evaluates candidacy. | Am I too old for limb lengthening? Bone density and joint health matter more than age. How Dr. Basmajian evaluates candidates in their 20s, 30s, 40s, and 50s. |

**Why:** Adds concrete age brackets. **Caveat:** at position 16.4 (page 2), a title change has limited CTR upside until the page ranks better — the real fix here is *ranking* (internal links + content depth), not metadata.

---

## Structural recommendation — ✅ DONE 2026-08-17

The two highest-value sub-pages (item 1 = 32% of all site impressions, item 7) carry a **compounded suffix** ` · Your Surgery · Premier Limb Lengthening` (43 chars) that pushes the useful part of the title past the SERP fold. Options:

1. **Drop the ` · Your Surgery` segment** in [`titles.php`](../wp-content/plugins/pll-seo/includes/titles.php) `pll_seo_title_part()` — simplest, benefits all sub-pages.
2. **Support a `title_absolute` flag in the overrides map** (currently only `pll_seo_page_defaults()` honors it) so individual high-value pages can control their full title.

Recommend option 1 unless the "· Your Surgery" breadcrumb-style suffix is deliberate for brand reasons.

**Shipped 2026-08-17, going further than option 1.** Measuring the assembled
titles rather than the map showed the problem was bigger than the sub-page
segment: the brand suffix itself contains the head term, so 31 of 43 indexed
titles published "limb lengthening" twice and three category archives published
it three times, while 32 titles ran past the SERP cutoff. Search Console for the
90 days to 2026-08-16 put brand queries at **1.2% of impressions and 4.6% of
clicks** (`premier limb lengthening`: 17 impressions), so the suffix was spending
the truncation budget on demand that does not exist.

`titles.php` now:

1. skips ` · Premier Limb Lengthening` when the title already carries the head
   term (`pll_seo_title_has_head_term()`) — a condition, not a deletion, so a
   future page like "Patient Financing Options" is still branded;
2. no longer appends ` · Your Surgery` (option 1 above); and
3. shortens the category archive label to ` · Articles` when the category name
   already says it.

Result across all 43 pages: average title 72.5 → 49.1 characters, titles past
the cutoff 32 → 4, head-term repeats 31 → 0, and 9 pages correctly kept the
brand. `verify-seo-meta.mjs` **V15** crawls the sitemap and enforces all of it,
including a no-duplicate-titles guard, since dropping a disambiguating segment
could otherwise collide two pages. Change report:
https://claude.ai/code/artifact/df974b63-32fc-442a-a296-2b5962ad51d6

Unlike the per-page rewrites below, this was a template change, so it took effect
on deploy rather than needing the post-meta pass.

---

## Rollout notes (when approved)

1. These are edits to `pll_seo_overrides()` (and page-defaults for pricing) in `meta.php`.
2. Because post meta is now authoritative (commit `e06ce29`) and the one-time seeding migration promotes overrides into post meta, **either** bump `PLL_SEO_VERSION` so the migration re-seeds, **or** apply the titles directly in the block editor "SEO (PLL)" panel per page. Editing only the PHP map will *not* change a page whose post meta is already seeded.
3. Verify in `view-source` on production, then request re-indexing for these URLs in GSC to speed re-crawl.
4. Reassess CTR in GSC after ~2 to 4 weeks; keep the winners, iterate the laggards.
