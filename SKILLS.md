# SKILLS — When to reach for which `Skills/` folder

A map from project phase / situation → the skill(s) that produce the best work. Read this **before** invoking a skill so it's used at the right moment, not reflexively.

The skills folder is a catalog of methodology and rules — it is not code that ships. Treat each skill as a checklist consulted **before** writing, not as a tool to defer thinking to.

---

## How to use this file

1. Identify what you're about to do (writing copy, building a component, reviewing perf, etc.).
2. Look up the situation in the "Reach for…" table below.
3. Open the matching `Skills/<name>/SKILL.md` and skim it before touching code or content.
4. If multiple skills apply, prefer the **more specific** one (e.g. `react-best-practices` over `react-ui-patterns` for perf questions).

---

## Reach-for table

| Situation                                                                                  | Primary skill                                  | Also useful                  |
|--------------------------------------------------------------------------------------------|------------------------------------------------|------------------------------|
| Designing a new feature or section from scratch                                            | `brainstorming`                                | `ui-ux-designer`             |
| Building or extending a component in `components/primitives/`                              | `tailwind-design-system`                       | `react-best-practices`, `ui-skills` |
| Picking colors, fonts, layouts, hierarchy for a new page                                   | `ui-ux-pro-max`                                | `ui-ux-designer`, `tailwind-patterns` |
| Adding loading / empty / error states or async data UX                                     | `react-ui-patterns`                            | `react-best-practices`       |
| Performance review (server / client / bundle / waterfalls)                                 | `react-best-practices`                         | —                            |
| Writing new marketing copy for a section                                                   | `copywriting`                                  | `marketing-psychology`       |
| Editing or proofreading copy already on the page                                           | `copy-editing`                                 | —                            |
| Deciding *what* to say — choosing claims, framing, persuasion levers                       | `marketing-psychology`                         | `copywriting`                |
| Writing or improving unit tests / TDD cycle                                                | `testing-patterns`                             | `testing`                    |
| Adding E2E or integration tests, setting up the QA pipeline                                | `testing-qa`                                   | `testing-patterns`           |
| Modernizing Tailwind to v4 (CSS-first config, container queries)                           | `tailwind-patterns`                            | `tailwind-design-system`     |
| Cross-cutting interface guardrails (accessibility, motion, hierarchy, density)             | `ui-skills`                                    | `ui-ux-pro-max`              |
| Smart contracts / blockchain                                                               | _none — skip `web3-testing`, not in scope_     | —                            |

---

## Skill-by-skill notes

### `brainstorming` — design ideation
Use **before** committing to an implementation when the requirements are vague (e.g., "how should the patient story carousel work?"). Transforms vague ideas into validated designs through disciplined reasoning. Do not skip directly to code on ambiguous tasks.

### `copy-editing` — review and polish existing copy
Triggered when the user says "edit this," "review my copy," "proofread," "polish this," "make this sharper." Pairs well with the **voice** discipline in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#4--voice): editorial, evidenced, direct.

### `copywriting` — write new marketing copy
**Strict no-fabrication rule.** Aligns directly with this project's medical-accuracy mandate: do not invent claims, statistics, credentials, or patient stories. Confirm brief before writing. Use exact text from `scraped_content/*.md` whenever available.

### `marketing-psychology` — behavioral / persuasion strategy
Use when **deciding what to say**, not when wording it. Scoring system for psychological leverage × feasibility. Useful for prioritizing which proof points to lead with on the homepage, ordering objections in the FAQ, etc.

### `react-best-practices` — Vercel's 45-rule perf guide
Reach for on any non-trivial component. Eight rule categories, prioritized:
1. Eliminating waterfalls (CRITICAL)
2. Bundle size optimization (CRITICAL)
3. Server-side performance
4. Client-side data fetching
5. Re-render optimization
6. Rendering performance
7. JavaScript performance
8. Advanced patterns

Especially relevant once we start Phase 4 (subpage migration) — keep pages as React Server Components by default, lazy-load anything heavy.

### `react-ui-patterns` — UI state patterns
Loading / error / empty states, optimistic UI, async data fetching patterns. Use when wiring up forms, search, blog index, etc.

### `tailwind-design-system` — Tailwind for design systems
Read this if extending [`tailwind.config.ts`](tailwind.config.ts), adding new design tokens, or introducing variants. Already informed the v1 token set.

### `tailwind-patterns` — Tailwind v4 idioms
We're on v3 today; consult before any Tailwind v4 migration. CSS-first config, container queries, `@theme` block.

### `testing-patterns` — Jest / TDD discipline
Factory functions, mocking strategies, red-green-refactor. Read before writing the first test in this repo.

### `testing-qa` — broader QA workflow
Unit + integration + E2E + browser automation. Relevant in Phase 5 (QA & polish).

### `ui-skills` — opinionated UI guardrails
Cross-cutting rules for accessibility, motion, density, hierarchy. Read alongside `tailwind-design-system` when building new primitives.

### `ui-ux-designer` — wireframes / IA / accessibility
Use when designing **new pages** from a content brief. The homepage already has a wireframe in [scraped_content/netlify_homepage.md](scraped_content/netlify_homepage.md), so we don't need this for Phase 2.

### `ui-ux-pro-max` — design intelligence library
A reference catalog: 50 styles, 21 palettes, 50 font pairings, 20 chart types, 9 stacks. Useful as inspiration / a sanity check when introducing a new layout pattern. Do not blindly apply — we have a strict editorial-clinical direction that should not drift toward trendy patterns.

### `testing`, `web3-testing` — out of scope for this turn
`testing` is methodology docs only (read it before authoring _new_ skills, not before writing app tests). `web3-testing` is not relevant — no blockchain in this project.

---

## Phase-by-phase priority

| Phase                                  | Read first                                                |
|----------------------------------------|-----------------------------------------------------------|
| **1 · Foundation & Design System**     | `tailwind-design-system`, `ui-skills`                     |
| **2 · Homepage**                       | `copywriting` (use exact copy), `marketing-psychology`, `react-best-practices` |
| **3 · Shared Layouts & Navigation**    | `react-ui-patterns`, `ui-ux-designer`                     |
| **4 · Subpage Content Migration**      | `copy-editing` (don't paraphrase), `react-best-practices` |
| **5 · QA, Polish, Handoff**            | `testing-qa`, `testing-patterns`, `react-best-practices`  |

---

## Project-specific overrides

These take precedence over any skill's general advice:

1. **No paraphrasing of medical content.** `scraped_content/*.md` is the canonical text. `copywriting` says confirm brief; this project's brief is: "lift verbatim."
2. **The Three-Tier CTA hierarchy** in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#2--color--the-three-tier-hierarchy) overrides `ui-ux-pro-max`'s general advice on button colors.
3. **Sharp corners, no shadows.** If a skill suggests rounded corners or drop shadows for a card, defer to the editorial-clinical direction in the design system instead.
4. **Italic spine accent.** Headlines wrap one word in `<em className="em-spine">…</em>`. This is non-negotiable identity, not a stylistic suggestion.
