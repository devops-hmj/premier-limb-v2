# Premier Limb Lengthening — Design System

**Direction:** _Editorial Clinical._
A periodical, evidence-based identity for the limb lengthening surgeon trusted by patients who have already done their research. The design system is sharp, restrained, and load-bearing: every choice does one job.

> **One sentence.** A medical periodical for adults who have already done their homework — sharp typography, controlled color, evidence on every page.

---

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite** (dev / build)
- **Tailwind CSS v3** with the brand theme in [`tailwind.config.js`](tailwind.config.js)
- **CSS variables** for non-Tailwind consumers — see [`src/styles/globals.css`](src/styles/globals.css)
- **Typed tokens** for code-driven use — see [`src/lib/tokens.ts`](src/lib/tokens.ts)

```bash
npm install
npm run dev      # http://localhost:5173 — full design system showcase
npm run build
```

---

## 1 · The mark

The lockup is a square-set italic serif **P** on Premier Blue, paired with the wordmark in Newsreader 500 and a mono-tagged tagline.

- Default: blue mark on paper.
- Reverse · Premier Blue: paper mark on spine.
- Reverse · Ink: paper mark on ink ground.
- Stacked: square-format collateral (favicons, avatars, IG profile).
- Monogram: avatar / favicon / seal only.

**Never:**
- Change the spine color of the mark.
- Round the mark.
- Stretch, skew, or tint the lockup.

Component: [`<Logo />`](src/components/primitives/Logo.tsx), [`<Monogram />`](src/components/primitives/Logo.tsx).

---

## 2 · Color — The Three-Tier Hierarchy

Every CTA color does **one** job. They never overlap.

| Tier | Role                             | Color         | Token / Tailwind        | Example                  |
|------|----------------------------------|---------------|-------------------------|--------------------------|
| 01   | Conversion (book / schedule)     | Action Green  | `--action` / `bg-action`| Single primary CTA       |
| 02   | Interactive accent (phone, links)| Signal Blue   | `--signal` / `bg-signal`| Phone, secondary action  |
| 03   | Editorial spine                  | Premier Blue  | `--spine` / `bg-spine`  | In-body editorial CTA    |

### Full palette

| Name           | Token            | Hex      | Use                                  |
|----------------|------------------|----------|--------------------------------------|
| Premier Blue   | `--spine`        | #254A5D  | Mastheads, eyebrows, italic accents  |
| Blue Deep      | `--spine-deep`   | #18323F  | Spine hover / pressed                |
| Blue Wash      | `--spine-wash`   | #EAF0F3  | Sidebar pull-outs                    |
| Blue Tint      | `--spine-tint`   | #F3F6F8  | Quietest panels                      |
| Signal Blue    | `--signal`       | #1E6FE5  | Secondary action · phone             |
| Signal Deep    | `--signal-deep`  | #1556B8  | Signal hover                         |
| Action Green   | `--action`       | #2BBE7B  | Tier-01 CTA only                     |
| Action Deep    | `--action-deep`  | #1F9C63  | Action hover                         |
| Ink            | `--ink`          | #0F1417  | Body type, hard rules                |
| Ink Soft       | `--ink-soft`     | #3A4047  | Subdued body type                    |
| Paper          | `--paper`        | #FFFFFF  | Card surfaces                        |
| Newsprint      | `--paper-off`    | #F8F6F1  | **Primary page ground**              |
| Cream          | `--cream`        | #F4F0E6  | Quiet panels                         |
| Rule           | `--rule`         | #D9D5C9  | Hairline dividers                    |
| Muted          | `--muted`        | #6B6F72  | Mono labels, captions                |
| Warn           | `--warn`         | #B03A3A  | Errors, "do not" markers             |

---

## 3 · Typography

Three families, each with a defined role:

| Family             | Use                                            | Weights        |
|--------------------|------------------------------------------------|----------------|
| **Newsreader**     | Display, section heads, italic accents, quotes | 400 / 500      |
| **Inter Tight**    | Body, navigation, UI                           | 300–600        |
| **JetBrains Mono** | Eyebrows, metadata, technical labels           | 400 / 500 / 600|

### Scale (Tailwind tokens)

| Token       | Size · LH        | Use            |
|-------------|------------------|----------------|
| `text-hero` | clamp(80, 11vw, 168) / 0.9 | Cover hero |
| `text-d-2xl`| 120 / 0.92       | Display XL     |
| `text-d-xl` | 80  / 0.94       | Section heads  |
| `text-d-l`  | 56  / 0.96       | Section heads  |
| `text-d-m`  | 36  / 1.15       | Pull quotes    |
| `text-d-s`  | 24  / 1.2        | Card heads     |
| `text-t-l`  | 16  / 1.6        | Body           |
| `text-t-m`  | 15  / 1.6        | Body small     |
| `text-t-s`  | 13  / 1.55       | UI             |
| `text-eyebrow` | 11 / 0.2em    | Mono labels    |

### The italic spine accent

The system's signature typographic move: one word in headlines is italicized and painted **Premier Blue**.

```tsx
<h2 className="font-serif font-medium text-d-xl">
  The <em className="em-spine">mark.</em>
</h2>
```

Helpers: `em-spine`, `em-signal`, `em-action`, `em-cream`.

---

## 4 · Voice

Three principles:

1. **Editorial,** not promotional. Decks, captions, datelines. Treat the reader as an intelligent adult.
2. **Evidenced,** not asserted. Every claim earns its place with a number, a credential, or a named patient.
3. **Direct,** not theatrical. Short sentences. Active voice. No urgency theatre.

**Say:** "Confidence you can stand behind." · "Hundreds of procedures performed." · "Cases other surgeons won't take on." · "Confidential consultation."

**Never:** "World-class!" · "Transform your life today!" · "#1 surgeon in California" · emoji · exclamation marks · ALL CAPS sentences.

---

## 5 · Space & Rules

### Spacing scale (Tailwind tokens)

`xs` 8 · `s` 16 · `m` 24 · `l` 40 · `xl` 64 · `2xl` 96 · `3xl` 160 (px).

Section vertical padding: 96 / 120 / 150 — via `py-section` / `py-section-lg` / `py-section-xl`.

### Layout

- Container: **1320 px** max (`max-w-wrap`)
- Gutter: **48 px** desktop, 24 px mobile
- Grid: **12-column** magazine grid (`grid-cols-edit-12`)
- Sharp corners only — `rounded-*` reset to 0 by theme.

### Rules

`<Rule weight="hair|thin|bold|thick|spine" />` — 1px → 4px hierarchy. The spine rule (4px blue) is reserved for color-coded structural moments.

---

## 6 · Components

All components live in [`src/components/primitives/`](src/components/primitives/) and re-export from `primitives/index.ts`.

| Component       | What it is                                                  |
|-----------------|-------------------------------------------------------------|
| `Container`     | Max-1320 wrap with responsive gutter                        |
| `Section`       | Page block with vertical rhythm + hairline rule, dark variant |
| `SectionHead`   | Numeral · serif heading · mono section label                |
| `Eyebrow`       | Mono · uppercase · spine, with leading rule                 |
| `Button`        | 5 variants — `action`, `accent`, `spine`, `ghost`, `ink`    |
| `Card`          | Pillar card with spine top bar                              |
| `StatGrid`      | 2–4 column numerical proof grid                             |
| `Logo`/`Monogram`| Lockup with size + reverse variants                        |
| `Swatch`        | Magazine-style color card with hex/rgb/cmyk meta            |
| `Input`         | Form field — sharp border, mono label                       |
| `Badge`         | Mono uppercase metadata chip                                |
| `PullQuote`     | Serif italic pull-out on blue-wash spine                    |
| `Rule`          | Divider, 5 weights                                          |
| `CoverStrip`    | Ink masthead bar                                            |

### Button — the contract

```tsx
import { Button, Arrow } from "@/components/primitives";

// Tier 01 — ONE per surface
<Button variant="action" as="a" href="/book">
  Schedule Consultation <Arrow />
</Button>

// Tier 02 — phone, secondary
<Button variant="accent" as="a" href="tel:9095964346">(909) 596-4346</Button>

// Tier 03 — in-body editorial
<Button variant="spine" as="a" href="/about">Learn About Dr. Basmajian <Arrow /></Button>
<Button variant="ghost" as="a" href="/pricing">View Pricing <Arrow /></Button>
<Button variant="ink"  as="a" href="/contact">Confidential Inquiry <Arrow /></Button>
```

---

## 7 · Applications

Reference layouts in [`src/showcase/Applications.tsx`](src/showcase/Applications.tsx):

- **Business card** — sharp 3:4 with spine top-bar.
- **Letterhead** — ink masthead strip + editorial body.
- **Instagram post** — newsprint ground with patient quote.

---

## File structure

```
PLL-design/
├── tailwind.config.js         # Tokens as first-class theme values
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── index.html                 # Google Fonts preconnect (Newsreader, Inter Tight, JetBrains Mono)
├── DESIGN_SYSTEM.md           # This file
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── styles/
    │   └── globals.css        # CSS vars + base + editorial utilities
    ├── lib/
    │   ├── cn.ts              # clsx + tailwind-merge helper
    │   └── tokens.ts          # Typed tokens
    ├── components/
    │   └── primitives/        # All shipping components
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Container.tsx
    │       ├── CoverStrip.tsx
    │       ├── Eyebrow.tsx
    │       ├── Input.tsx
    │       ├── Badge.tsx
    │       ├── Logo.tsx
    │       ├── PullQuote.tsx
    │       ├── Rule.tsx
    │       ├── Section.tsx
    │       ├── SectionHead.tsx
    │       ├── Stat.tsx
    │       ├── Swatch.tsx
    │       └── index.ts
    └── showcase/              # The dossier itself — App.tsx renders it
        ├── Cover.tsx
        ├── Identity.tsx
        ├── Palette.tsx
        ├── Type.tsx
        ├── Voice.tsx
        ├── Spacing.tsx
        ├── Components.tsx
        ├── Applications.tsx
        └── Footer.tsx
```

---

## Authoring conventions

- **Tailwind first.** Components reach for theme tokens (`bg-spine`, `text-d-xl`); they do not hardcode hex.
- **Sharp corners.** The default `borderRadius` is 0. Only the dark-context icon dot uses `rounded-pill`.
- **No shadows.** Hard 1px ink borders. The system communicates depth with rule weight and color, not blur.
- **Accessibility.** All form controls are labelled; focus rings ride the spine. Buttons announce as buttons (not divs).
- **Italic discipline.** `<em>` inside headlines is reserved for the spine accent; do not use `<i>` for cosmetics.

---

## What's intentionally _not_ here

- No dark mode toggle. The system has a dark **variant** (`<Section variant="dark">`) used as an editorial device, not as a theme.
- No motion library. The brand is editorial-clinical; movement is restrained — let typography do the talking.
- No icon set yet. Add a small custom icon family once the website IA is decided (recommend a 24×24 outline set at 1.5px stroke, drawn in `--ink`).
