# Premier Limb Lengthening (PLL) Project Status & Instructions

## Project Overview
This repository contains the Next.js 15 App Router codebase, design system tokens, and scraped content needed to rebuild the Premier Limb Lengthening website.

## Current Status

- **Phase 1 (Foundation): ✅ DONE**
- **Phase 2 (Homepage): ✅ DONE** (V2 editorial design is canonical: [components/v2/HomePage.tsx](components/v2/HomePage.tsx) assembled at [app/page.tsx](app/page.tsx))
- **Phase 3 (Shared Layouts): ✅ DONE** ([components/v2/NavV2.tsx](components/v2/NavV2.tsx) + [components/v2/FooterV2.tsx](components/v2/FooterV2.tsx) used on every route)
- **Phase 4 (Content Migration): ✅ DONE** (16 articles via [app/[slug]/page.tsx](app/[slug]/page.tsx); 7 surgery sub-pages via [app/your-surgery/[slug]/page.tsx](app/your-surgery/[slug]/page.tsx); surfaces: /about, /contact, /dr-basmajian, /pricing, /your-surgery, /journal)
- **Phase 5 (QA & Polish): 🟡 IN PROGRESS**
  - ✅ Pre-launch SEO baseline: noindex flags lifted, hand-written metadata, expanded sitemap (see [SEO_AUDIT.md](SEO_AUDIT.md))
  - ✅ **Option A executed (2026-05-28)**: dropped the `/v2/` prefix; every legacy WordPress URL now matches its new path 1:1 with zero redirect hops. The 23 carry-over pages are direct hits. Cross-route renames (`/consult/ → /contact`, `/blog/ → /journal`, `/limb-lengthening-pricing-options/ → /pricing`) keep a single-hop 301 — slugs come from the live-site audit ([SEO_AUDIT.md §2a](SEO_AUDIT.md)), not brand preference. The journal section is labeled **"Resources"** in nav, hero, and page title; the URL stays `/journal` to preserve the audit-aligned single hop from legacy `/blog/`. A defensive `/v2/:path*` catch-all stays in [next.config.mjs](next.config.mjs).
  - ✅ Brand copy compliance: procedure-count claim → "thousands"; "Up to" qualifier on height claims; project-wide no-dash rule applied to homepage flow
  - ⬜ JSON-LD builders not yet wired per-page (see [SEO_AUDIT.md §5.3](SEO_AUDIT.md))
  - ⬜ Em-dash sweep still pending across pricing detail components ([AddOns.tsx](components/v2/pricing/AddOns.tsx), [Financing.tsx](components/v2/pricing/Financing.tsx), [IncludedExcluded.tsx](components/v2/pricing/IncludedExcluded.tsx), [PricingPlans.tsx](components/v2/pricing/PricingPlans.tsx)) and subpage body copy
  - ⬜ Open-graph imagery not set per page
  - ⬜ Canonical domain confirmation before production sitemap

## Pending validation
- `npm install` + `npm run dev` smoke test against the consolidated routes (`/`, `/about`, `/contact`, `/dr-basmajian`, `/pricing`, `/your-surgery`, `/resources`, plus one article + one surgery sub-page).
- Spot-check redirects with `curl -I`: `/blog/` → 308 `/resources`; `/consult/` → 308 `/contact`; `/v2/about` → 308 `/about`; one legacy article slug → 200 direct hit.

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
│   ├── about/               # /about
│   ├── contact/             # /contact
│   ├── dr-basmajian/        # /dr-basmajian
│   ├── pricing/             # /pricing
│   ├── journal/             # /journal (URL stays /journal per audit; UI label is "Resources")
│   ├── your-surgery/        # /your-surgery + [slug]/
│   ├── [slug]/              # /<article-slug> (16 articles)
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
│   │   └── pricing/         # AddOns, Financing, IncludedExcluded,
│   │                        # PricingPlans, PricingHero
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
