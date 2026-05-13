# Premier Limb Lengthening Institute — Marketing Site

Marketing website for **Premier Limb Lengthening Institute**, the limb lengthening practice of Dr. Hrayr Basmajian (orthopaedic surgeon, Pomona CA). Built as a Next.js 15 App Router app on a custom editorial-clinical design system.

The site replaces the existing WordPress/Netlify build with a typed, statically generated React app that is faster, easier to maintain, and structured for AI / generative-search retrieval (GEO) as well as classical SEO.

---

## Purpose & goals

This is a **lead-generation marketing site** — every page is built to bring qualified candidates to a paid consultation with Dr. Basmajian.

1. **Convert candidates into consults.** Three-tier CTA hierarchy is enforced site-wide: a single primary "Schedule Consultation" action (Action Green), secondary "Call" action (Signal Blue), and tertiary in-text links (Spine Blue).
2. **Answer the questions patients actually ask.** ~38 long-form pages migrated verbatim from the scraped WordPress site — candidacy, cost, recovery, pain, age limits, external vs. internal devices — with no paraphrasing (medical-accuracy mandate, see [CLAUDE.md](CLAUDE.md)).
3. **Rank in classical SEO.** Per-page canonical URLs, structured `Metadata`, OpenGraph + Twitter cards, an auto-generated `/sitemap.xml` with priority weighting, and a clean `/robots.txt`.
4. **Be visible to AI-driven search (GEO).** Site-wide `MedicalBusiness` + `Physician` JSON-LD, per-article `Article` schema, per-FAQ `FAQPage` schema, `MedicalProcedure` schema on the surgery overview, `BreadcrumbList` on every interior page, and `CollectionPage` schema on index pages — so Gemini / ChatGPT / Perplexity / Google AI Overviews can cite the practice as a source.
5. **Look like an editorial publication, not a clinic stock site.** Newsreader serif, italic-spine accent word in every headline, hairline rules instead of shadows, sharp corners, oversized type, generous whitespace.
6. **Stay accurate.** All medical copy is taken verbatim from `scraped_content/*.md` — agents are explicitly forbidden from paraphrasing claims, credentials, or statistics.

---

## Stack

| Layer            | Choice                                                |
|------------------|-------------------------------------------------------|
| Framework        | **Next.js 15** (App Router, React 19, RSC)            |
| Language         | TypeScript (strict)                                   |
| Styling          | Tailwind CSS v3 with custom semantic tokens           |
| Type / fonts     | `next/font/google` — Newsreader, Inter Tight, JetBrains Mono |
| Content          | Markdown in `scraped_content/`, rendered with `react-markdown` + `remark-gfm` |
| Schema / SEO     | Native Next.js `Metadata`, `sitemap.ts`, `robots.ts`; custom JSON-LD generators in `lib/jsonld.ts` |
| Deployment       | **Netlify** (continuous deployment from `main`)       |
| Domain           | `premierlimblengthening.com`                          |

Netlify CD is configured manually outside this repo — pushes to `main` trigger a production deploy.

---

## Getting started

```bash
npm install
npm run dev
```

- Site → http://localhost:3000/
- Design system dossier → http://localhost:3000/design-system

### Scripts

| Command             | What it does                                      |
|---------------------|---------------------------------------------------|
| `npm run dev`       | Next.js dev server (HMR, port 3000)               |
| `npm run build`     | Production static build                           |
| `npm run start`     | Serve the production build                        |
| `npm run typecheck` | TypeScript-only check (`tsc --noEmit`)            |
| `npm run lint`      | ESLint (`next/core-web-vitals`)                   |

### Netlify build settings

When connecting the GitHub repo to Netlify, use:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Branch to deploy:** `main`
- **Node version:** 20 or newer

The official `@netlify/plugin-nextjs` plugin handles SSR/ISR routing automatically — no `netlify.toml` is required for a vanilla setup.

---

## Routes

| Path                                   | Template                  | Purpose                                                  |
|----------------------------------------|---------------------------|----------------------------------------------------------|
| `/`                                    | Homepage                  | Hero · BragBar · Candidate · CTA · Concierge · Testimonials · Pricing · FAQ · AEO |
| `/dr-basmajian`                        | ProfileTemplate           | Surgeon profile + credentials + `Physician` JSON-LD       |
| `/your-surgery`                        | ServiceOverviewTemplate   | Surgery overview with sub-page index                     |
| `/your-surgery/[slug]`                 | ServiceSubTemplate        | Answer-first FAQ-style sub-pages (pain, age limit, etc.) |
| `/limb-lengthening-pricing-options`    | PricingTemplate           | Full pricing with `ItemList` JSON-LD                     |
| `/consult`                             | ConsultTemplate           | Intake form + clinic address                             |
| `/blog`                                | IndexTemplate             | Journal index with category filters                      |
| `/category/[slug]`                     | IndexTemplate             | Articles filed by category                               |
| `/author/[slug]`                       | IndexTemplate             | Articles by author                                       |
| `/video/[slug]`                        | (video page)              | Embedded patient / education videos                      |
| `/[slug]`                              | ArticleTemplate           | Long-form articles (catch-all for ~16 root-level posts)  |
| `/design-system`                       | Internal dossier          | Live design-system reference (do not link from prod nav) |
| `/sitemap.xml`, `/robots.txt`          | Auto-generated            | Priority-tuned sitemap + crawler policy                  |

All dynamic routes use `generateStaticParams` + `dynamicParams: false` — the entire site is statically generated.

---

## Repo layout

```
PLL-design/
├── app/                       # Next.js App Router routes
│   ├── layout.tsx             #   Root layout (Nav + Footer + site-wide JSON-LD)
│   ├── page.tsx               #   Homepage
│   ├── globals.css            #   Tokens + base + editorial utilities
│   ├── sitemap.ts             #   /sitemap.xml generator
│   ├── robots.ts              #   /robots.txt generator
│   ├── design-system/         #   /design-system — brand dossier
│   ├── dr-basmajian/          #   Surgeon profile
│   ├── your-surgery/          #   Surgery overview + [slug] sub-pages
│   ├── blog/                  #   Journal index
│   ├── category/[slug]/       #   Category index
│   ├── author/[slug]/         #   Author index
│   ├── video/[slug]/          #   Video pages
│   ├── consult/               #   Consultation form
│   ├── limb-lengthening-pricing-options/  # Pricing
│   └── [slug]/                #   Root-level article catch-all
├── components/
│   ├── layout/                # Nav, SiteFooter
│   ├── home/                  # Homepage sections (Hero, BragBar, Candidate, ...)
│   ├── primitives/            # 14 design-system building blocks
│   ├── content/               # Breadcrumbs, Prose, ArticleCard, JsonLd, CtaBanner, ...
│   ├── templates/             # 7 page-archetype templates
│   └── showcase/              # Sections used only on /design-system
├── lib/
│   ├── content.ts             # Markdown loader + typed Page model
│   ├── jsonld.ts              # Schema.org JSON-LD generators
│   ├── seo.ts                 # pageMetadata() helper
│   ├── site.ts                # Site constants + nav data (single source of truth)
│   ├── tokens.ts              # Typed design tokens
│   ├── fonts.ts               # next/font config
│   └── cn.ts                  # clsx + tailwind-merge
├── scraped_content/           # Verbatim source-of-truth markdown (38 pages + sitemap)
├── public/                    # Static assets (logo, hero video, doctor photo)
├── Skills/                    # Reference skills catalog (not runtime)
├── CLAUDE.md                  # Agent / developer instructions + phase status
├── DESIGN_SYSTEM.md           # Design system docs
├── SKILLS.md                  # Skill catalog
├── project_plan.md            # Original phase plan
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

---

## Design system

Three documents describe the design language; they are aligned and any one of them is enough to get oriented:

- **Live reference:** http://localhost:3000/design-system — every token, primitive, and pattern, rendered.
- **Written spec:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — voice, color, type, CTA hierarchy.
- **Tokens in code:** [tailwind.config.ts](tailwind.config.ts), [app/globals.css](app/globals.css), [lib/tokens.ts](lib/tokens.ts).

Key non-negotiables:

1. **Three-tier CTA hierarchy.** Exactly one Action Green primary CTA per viewport; Signal Blue for secondary; Spine Blue for tertiary. Never invent a fourth.
2. **Italic-spine accent.** Every h1/h2 wraps one word in `<em className="em-spine">…</em>`. This is brand identity, not decoration.
3. **Semantic Tailwind tokens only.** Use `text-spine`, `bg-action`, `text-d-xl`, `bg-paper-off` — never raw `text-blue-700` or `bg-gray-100`.
4. **No paraphrasing of medical copy.** Pull text verbatim from `scraped_content/*.md`. If a claim isn't in the source, it doesn't ship.

---

## Content & SEO

- All page copy lives in `scraped_content/*.md` and is loaded at build time by `lib/content.ts`. Editing an MD file and rebuilding is the entire content workflow.
- Per-page `Metadata` is generated by `lib/seo.ts` (`pageMetadata`), so every page has a canonical URL, OG card, and Twitter card without per-route boilerplate.
- JSON-LD generators in `lib/jsonld.ts` emit Schema.org graphs for `MedicalBusiness`, `Physician`, `Article`, `FAQPage`, `MedicalProcedure`, `CollectionPage`, `BreadcrumbList`, and `ItemList`. The site-wide graph is mounted in `app/layout.tsx` so it appears on every page.
- `app/sitemap.ts` weights priority: homepage `1.0`, conversion pages (`/consult`, `/dr-basmajian`, `/limb-lengthening-pricing-options`) `0.9`, service sub-pages `0.7`, articles `0.6`, taxonomy indexes `0.4`.

---

## Status & contribution

Phase status, what's done, and what's still open is tracked in [CLAUDE.md](CLAUDE.md). Read it before picking up work — it is the source of truth for which phase the codebase is in.

Known open items (as of this commit):

- Featured images on `ArticleCard` are gradient placeholders — the WordPress image URLs are not yet migrated to local optimized assets in `public/`.
- Author → article mapping is a fallback (shows all articles) until an `author:` field is added to the markdown frontmatter.
- The `/consult` form is semantic and accessible but is not yet wired to a backend / email provider.
- `HeroVideo` on `ClosingCta` needs a `poster` attribute to avoid the blank first frame.

---

## Conventions for agents and humans

1. **Read [CLAUDE.md](CLAUDE.md) first** — it has the phase status, medical-accuracy mandate, and design rules.
2. **Use semantic tokens, not raw colors.** Three-tier CTA hierarchy is mandatory.
3. **Don't paraphrase medical copy.** Use the verbatim source in `scraped_content/`.
4. **Keep `lib/site.ts` as the single source of truth** for nav, phone, address. Don't hard-code these elsewhere.
5. **Update CLAUDE.md's "Current Status"** when you finish a phase or milestone.
