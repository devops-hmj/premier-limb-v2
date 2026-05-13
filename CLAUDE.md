# Premier Limb Lengthening (PLL) Project Status & Instructions

## Project Overview
This repository contains the Next.js 15 App Router codebase, design system tokens, and scraped content needed to rebuild the Premier Limb Lengthening website.

## Current Status

- **Phase 1 (Foundation): ✅ DONE**
  - Design tokens live in [tailwind.config.ts](tailwind.config.ts), [app/globals.css](app/globals.css), and [lib/tokens.ts](lib/tokens.ts).
  - Typography: `next/font` loads Newsreader (serif), Inter Tight (sans), JetBrains Mono (mono) → see [lib/fonts.ts](lib/fonts.ts).
  - Core primitives (`Button`, `Card`, `SectionHead`, `Logo`, `Eyebrow`, `Swatch`, `Input`, `PullQuote`, `Stat`, `Rule`, `Badge`, `Container`, `Section`, `CoverStrip`) shipped in [components/primitives/](components/primitives/).
  - Live design-system dossier rendered at **`/design-system`** ([app/design-system/page.tsx](app/design-system/page.tsx)).
- **Phase 2 (Homepage): ✅ DONE**
  - Hero, BragBar, Concierge, ClosingCta, AeoBoilerplate built in [components/home/](components/home/) and assembled in [app/page.tsx](app/page.tsx).
  - Copy lifted **verbatim** from [scraped_content/netlify_homepage.md](scraped_content/netlify_homepage.md). No paraphrasing.
  - Global Nav and SiteFooter in [components/layout/](components/layout/) wired into [app/layout.tsx](app/layout.tsx).
- **Phase 3 (Shared Layouts): 🟡 PARTIAL** — Nav + Footer + root layout done; per-route shells (article view, service-detail view) not yet built.
- **Phase 4 (Content Migration): ⬜ NOT STARTED**
  - 38 pages of content + JSON sitemap exist in [scraped_content/](scraped_content/).
- **Phase 5 (QA & Polish): ⬜ NOT STARTED**

## Pending validation
- `npm install` and `npm run dev` have **not** been run. First agent to pick up should `cd` to the project, install, and verify the homepage + `/design-system` render cleanly. Type-check with `npm run typecheck`.

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
│   ├── layout.tsx           # Root layout (Nav + Footer + fonts)
│   ├── page.tsx             # Homepage
│   └── design-system/
│       └── page.tsx         # /design-system — the brand dossier
├── components/
│   ├── layout/
│   │   ├── Nav.tsx          # Global nav (desktop + mobile)
│   │   └── SiteFooter.tsx   # Global footer
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── BragBar.tsx
│   │   ├── Concierge.tsx
│   │   ├── ClosingCta.tsx
│   │   └── AeoBoilerplate.tsx
│   ├── primitives/          # 14 design-system components
│   └── showcase/            # Brand-dossier sections (rendered at /design-system)
├── lib/
│   ├── cn.ts                # clsx + tailwind-merge
│   ├── fonts.ts             # next/font config
│   ├── site.ts              # Site constants + nav data
│   └── tokens.ts            # Typed design tokens
├── scraped_content/         # Verbatim source-of-truth content
├── Skills/                  # Reference skills (catalog, not runtime)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
├── package.json
├── CLAUDE.md                # This file
├── SKILLS.md
├── DESIGN_SYSTEM.md
├── README.md
└── project_plan.md
```
