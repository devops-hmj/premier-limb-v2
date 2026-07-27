# Premier Limb Lengthening (PLL) Project Status & Instructions

## Project Overview
This repository contains the Next.js 15 App Router codebase, design system tokens, and scraped content needed to rebuild the Premier Limb Lengthening website.

## Current Status

- **Phase 1 (Foundation): ✅ DONE**
- **Phase 2 (Homepage): ✅ DONE** (V2 editorial design is canonical: [components/v2/HomePage.tsx](components/v2/HomePage.tsx) assembled at [app/page.tsx](app/page.tsx))
- **Phase 3 (Shared Layouts): ✅ DONE** ([components/v2/NavV2.tsx](components/v2/NavV2.tsx) + [components/v2/FooterV2.tsx](components/v2/FooterV2.tsx) used on every route)
- **Phase 4 (Content Migration): ✅ DONE** (16 articles via [app/[slug]/page.tsx](app/[slug]/page.tsx); 7 surgery sub-pages via [app/your-surgery/[slug]/page.tsx](app/your-surgery/[slug]/page.tsx); surfaces: /about, /consult, /dr-basmajian, /limb-lengthening-pricing-options, /your-surgery, /blog)
- **Phase 5 (QA & Polish): 🟡 IN PROGRESS**
  - ✅ Pre-launch SEO baseline: noindex flags lifted, hand-written metadata, expanded sitemap (see [SEO_AUDIT.md](SEO_AUDIT.md))
  - ✅ **Option A + literal path preservation (2026-05-28)**: dropped the `/v2/` prefix AND kept every URL slug exactly as it appears on the legacy WordPress site (`scraped_content/sitemap_data.json`). **Zero redirect hops** for every legacy URL that has a built destination, including the long legacy slugs `/consult`, `/blog`, and `/limb-lengthening-pricing-options`. URL slugs and UI labels are decoupled: `/consult` ⇒ label "Contact", `/blog` ⇒ label "Resources", `/limb-lengthening-pricing-options` ⇒ label "Pricing". A defensive `/v2/:path*` catch-all and interim 302s for the 9 not-yet-built category/author/video pages stay in [next.config.mjs](next.config.mjs).
  - ✅ Brand copy compliance: procedure-count claim → "thousands"; "Up to" qualifier on height claims; project-wide no-dash rule applied to homepage flow
  - ✅ **Legal pages built (2026-06-08)**: `/privacy` (Privacy Policy), `/terms` (Terms of Service), and `/accessibility` (Accessibility Statement) now exist, resolving all three of the footer's previously-broken legal links and a HIPAA-audit release-blocker. All three render through the shared [components/v2/legal/LegalDocument.tsx](components/v2/legal/LegalDocument.tsx) shell (article-style chrome + sticky auto-TOC built from `##` headings + `Prose` markdown body). Content is **GHL A2P 10DLC compliant**: the Privacy Policy carries the carrier-mandated mobile-data clause ("No mobile information will be shared with third parties or affiliates for marketing or promotional purposes" + originator opt-in/consent never shared) and the ToS carries the SMS program terms (STOP/HELP, msg & data rates, frequency varies, consent-not-a-condition, carriers-not-liable). Also covers HIPAA (PHI governed by NPP), CCPA/CPRA, a medical disclaimer, and WCAG 2.1 AA. Brand copy rules honored (no em dashes, no semicolons). All three added to [app/sitemap.ts](app/sitemap.ts) and verified via `next build` (static prerender, TOC anchors resolve). Placeholders resolved: website-form data retention = **90 days**; telehealth platform left generic (name TBD); liability cap and binding arbitration **intentionally omitted** for launch (see code comment in [app/terms/page.tsx](app/terms/page.tsx)). **⚠️ Still open before/at launch: (a) counsel review of all three; (b) confirm the SMS/HELP contact number — code uses `(909) 563-8653` per [lib/site.ts](lib/site.ts), consistent with the rest of the site, but the June-2026 marketing handoff cited `(909) 461-4984`; (c) provision the `privacy@premierlimblengthening.com` inbox (owner confirmed they will).** A Notice of Privacy Practices (`/notice-of-privacy-practices`) is still unbuilt.
  - ✅ **Homepage handoff v2 implemented (2026-06-10)** per J Cubed Marketing's `PLL_Homepage_Handoff_v2.docx` (internal doc, intentionally NOT committed): section reorder (Bio to position 2 directly after the hero/Article lede; Candidate before Concierge), credential-led hero H1 + 3-sentence deck, "Dr. Basmajian personally performs every procedure" in the Article lede, 5th trust pill (Fellowship-Trained, two programs), Bio rewrite (fellowship institutions named: Sonoran/Scottsdale + Hannover under Prof. Krettek; Level II trauma center; PT/imaging infrastructure) + 6-row credential dossier block, Pillar 02 reframed "Surgical Judgment, Not Just Technology", Concierge "transformation"→"recovery", testimonials reordered (James K. revision patient leads; "medical retreat" phrase cut), FinalCta scarcity rewrite ("limited number of cases" + "No associates. No rotating surgeons."), homepage meta title/description/OG per handoff §08 (title set `absolute` to dodge the layout template suffix), keyword weaves per §09 (height lengthening in FAQ 2; "Upland, California" in the footer tagline; pricing CTA anchor "View Limb Lengthening Surgery Costs"). Doc's 3 "critical" flags (461-4984 phone / Pomona address / "A Premier Orthopaedic Clinic" footer) were verified ALREADY RESOLVED on current staging — the client had reviewed a stale deploy. Phone stays (909) 563-8653 pending Jaime's confirmation.
  - ✅ **Contact/booking split (2026-07-27)**: booking is a separate flow from contact. New `/book-a-consultation` page ([app/book-a-consultation/page.tsx](app/book-a-consultation/page.tsx)) embeds the branded GHL scheduler inline (server-rendered iframe + `form_embed.js` auto-sizing) beside the shared contact card, now extracted to [components/v2/ContactCard.tsx](components/v2/ContactCard.tsx). `/consult` stays the contact page (form + card) and BOTH pages lost the oversized hero band — a compact header (eyebrow + small H1 + support line) keeps the approved copy and cross-links the two flows. All three "Schedule Consultation" nav CTAs (sticky bar, mobile sheet, hero overlay) + footer Resources link + Concierge "Schedule a Virtual Consultation" now point at `/book-a-consultation`; sitemap entry added. `/consult` retitled "Contact Premier Limb Lengthening · Upland, California" (absolute), booking page owns the "Book a Limb Lengthening Consultation" title. Verified via `next build` (static prerender) + 17 SSR HTML assertions. Mirrors the WordPress build's split on `theme-editability` (pattern `pll/booking-page` + `pll/booking-calendar` block).
  - ⬜ JSON-LD builders not yet wired per-page (see [SEO_AUDIT.md §5.3](SEO_AUDIT.md))
  - ✅ **Em-dash sweep complete site-wide (2026-06-10)**: zero em dashes in rendered output. Covered pricing components ([AddOns.tsx](components/v2/pricing/AddOns.tsx) labels → `·`, [IncludedExcluded.tsx](components/v2/pricing/IncludedExcluded.tsx)), page titles/OG titles (layout default, /dr-basmajian, /limb-lengthening-pricing-options, /your-surgery, /category/[slug] → `·`), NavV2 aria-labels, /consult hero copy, and ~33 punctuation-only swaps across the 10 rendered article markdown files (word-for-word otherwise; comma/period/colon/parens, no semicolons). Non-rendered source docs (netlify_homepage.md, author_edusenbury.md) intentionally untouched. Code comments untouched (not rendered).
  - ⬜ Open-graph imagery not set per page
  - ⬜ Canonical domain confirmation before production sitemap

## Pending validation
- `npm install` + `npm run dev` smoke test against every route (`/`, `/about`, `/consult`, `/dr-basmajian`, `/limb-lengthening-pricing-options`, `/your-surgery`, `/blog`, plus one article + one surgery sub-page).
- Spot-check direct-hit (legacy URL = new URL, expect 200): `/blog/`, `/consult/`, `/limb-lengthening-pricing-options/`, `/are-you-a-good-candidate-for-limb-lengthening/`.
- Spot-check the defensive `/v2` catch-all (expect 308 to root): `/v2/about` → `/about`; `/v2/blog` → `/blog`.

## Developer / Agent Instructions

1. **Context first.** Read [project_plan.md](project_plan.md) for phase details. Read [SKILLS.md](SKILLS.md) to pick the right skill from [Skills/](Skills/) before doing the work.
2. **Design compliance.** Use semantic Tailwind tokens from [tailwind.config.ts](tailwind.config.ts) (`text-spine`, `bg-action`, `text-d-xl`, etc.). Never reach for random utility colors. Three-tier CTA hierarchy is non-negotiable — see [DESIGN_SYSTEM.md §2](DESIGN_SYSTEM.md).
3. **Italic spine accent.** Headlines wrap one word in `<em className="em-spine">…</em>`. This is identity, not decoration.
4. **Medical accuracy / no paraphrasing.** Use exact text from `scraped_content/*.md`. For the homepage that's `netlify_homepage.md`; for subpages, the respective markdown file. Do not invent statistics, credentials, or patient stories.
5. **Update status.** When you complete a phase or milestone, edit the "Current Status" section above so the next agent knows where to pick up.

## Key Resources

- **Project plan:** [project_plan.md](project_plan.md)
- **Skills guide:** [SKILLS.md](SKILLS.md)
- **Design system docs:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- **Sitemap & extracted content:** [scraped_content/sitemap.md](scraped_content/sitemap.md), [scraped_content/*.md](scraped_content/)
- **Homepage source-of-truth content:** [scraped_content/netlify_homepage.md](scraped_content/netlify_homepage.md)

## File layout (current)

```
PLL-design/
├── app/
│   ├── globals.css          # Tokens + base + editorial utilities
│   ├── v2.css               # Editorial / video-stage page styles
│   ├── layout.tsx           # Root layout (fonts, site-wide JSON-LD)
│   ├── page.tsx             # Homepage (renders V2HomePage)
│   ├── about/                                  # /about (new; no legacy URL)
│   ├── blog/                                   # /blog        — UI label "Resources"
│   ├── consult/                                # /consult     — UI label "Contact"
│   ├── dr-basmajian/                           # /dr-basmajian
│   ├── limb-lengthening-pricing-options/       # legacy slug — UI label "Pricing"
│   ├── your-surgery/                           # /your-surgery + [slug]/ (7 sub-pages)
│   ├── privacy/                                # /privacy — Privacy Policy (HIPAA + CCPA + A2P)
│   ├── terms/                                  # /terms — Terms of Service (+ SMS A2P program terms)
│   ├── [slug]/                                 # /<article-slug> (16 articles, direct WP slugs)
│   ├── sitemap.ts
│   ├── robots.ts
│   └── design-system/       # /design-system (internal dossier)
├── components/
│   ├── v2/                  # Current/canonical design components
│   │   ├── NavV2.tsx        # Sticky nav + overlay variant
│   │   ├── FooterV2.tsx
│   │   ├── HomePage.tsx     # Top-level homepage composition
│   │   ├── HeroStage.tsx, Article.tsx, Pillars.tsx, Bio.tsx,
│   │   │   Process.tsx, Concierge.tsx, Candidate.tsx, Pricing.tsx,
│   │   │   Results.tsx, Testimonials.tsx, FaqV2.tsx, FinalCta.tsx
│   │   ├── pricing/         # AddOns, Financing, IncludedExcluded,
│   │   │                    # PricingPlans, PricingHero
│   │   └── legal/           # LegalDocument.tsx — shared shell for /privacy + /terms
│   ├── primitives/          # Design-system primitives
│   ├── content/Prose.tsx    # Markdown renderer for scraped articles
│   ├── home/                # Legacy V1 homepage components (unused)
│   └── layout/              # Legacy V1 nav/footer (unused)
├── lib/
│   ├── content.ts           # Scraped-markdown loader
│   ├── jsonld.ts            # Schema.org builders
│   ├── cn.ts, fonts.ts, site.ts, tokens.ts
├── scraped_content/         # Verbatim source-of-truth content
├── Skills/                  # Reference skills (catalog, not runtime)
├── next.config.mjs          # Redirects (Option A in effect)
├── tailwind.config.ts, tsconfig.json, package.json
├── CLAUDE.md (this), SKILLS.md, DESIGN_SYSTEM.md, README.md
├── SEO_AUDIT.md, HIPAA_AUDIT.md, project_plan.md
└── ghl-form-styles.css      # GHL embedded-form custom CSS
```
