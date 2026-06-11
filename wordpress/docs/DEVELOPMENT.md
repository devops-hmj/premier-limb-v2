# Development guide — PLL WordPress workspace

Everything runs from `wordpress/` with Node 20+. **No PHP, Composer, or Docker is
required locally** — WordPress runs in-process via WordPress Playground (PHP-in-WASM),
and PHP linting is enforced by CI.

## Daily loop

```powershell
cd wordpress
npm install            # once
npm run build          # tailwind CSS + theme blocks + form block + WXR
npm run dev            # WordPress Playground at http://127.0.0.1:9400
npm run watch:css      # in a second terminal while editing patterns/templates
```

Playground is **deliberately ephemeral**: every boot re-runs `blueprint.json` →
activates the theme/plugins, imports `content/pll-content.wxr`, runs
`content/setup.php` (media, marketing pages from patterns, authors, reading settings).
That is byte-for-byte the HIPAA Vault install path, so "works locally" means "works
on the host". To persist a change, put it in a pattern, the WXR generator, or setup.php
— never hand-edit the running instance and expect it to survive a restart.

Theme/plugin PHP edits are live (mounted); block JS/CSS changes need a rebuild;
pattern changes need a server restart to re-seed the composed pages.

## Where things live

| Concern | Location |
|---|---|
| Design tokens | `wp-content/themes/pll-editorial/theme.json` + `tailwind.config.js` (keep identical to the root Next config — pixel-parity contract) |
| All CSS | `…/src/css/tailwind.css` → compiled to `…/assets/css/pll.css` (committed) |
| Section markup (editable content) | `…/patterns/*.php` — single source of truth; `setup.php` composes pages from these |
| Interactive blocks | `…/src/blocks/*` (theme) + `wp-content/plugins/pll-forms/src/consult-form` |
| Template chrome | `…/templates/*.html` + render-only blocks (post-header, post-toc, related-posts, blog-index, archive-header, post-grid, surgery-*, legal-header) |
| Navigation menu | `…/inc/nav.php` (PHP array — menu changes are a dev task by design; the bespoke dropdown is not expressible in core/navigation) |
| Content pipeline | `scripts/md-to-blocks.mjs` (markdown → blocks, mirrors lib/content.ts + Prose.tsx), `scripts/build-wxr.mjs`, `content/setup.php` |
| SEO | `wp-content/plugins/pll-seo/includes/*` (titles, head, schema port of lib/jsonld.ts, sitemap, robots, redirects) |
| Forms | `wp-content/plugins/pll-forms/` (REST forwarder to `PLL_GHL_WEBHOOK_URL`, no PHI stored) |

## Conventions

- Pattern porting rules: [PATTERN_CONVENTIONS.md](PATTERN_CONVENTIONS.md). The short version:
  verbatim Tailwind class strings, no inline styles in pattern markup, contentOnly
  locking on every section, copy is medical content — never paraphrase.
- Build artifacts (`assets/css/pll.css`, `build/`, `content/pll-content.wxr`, fonts) are
  **committed** so HIPAA Vault never needs Node. CI rebuilds them and fails on drift
  (`git diff --exit-code`) — if CI fails there, run `npm run build` and commit.
- PHP standard: WPCS (`composer lint` — see below), prefix `pll_`, text domains
  `pll-editorial` / `pll-seo` / `pll-forms`.

## PHP linting without local PHP

CI (`.github/workflows/wordpress-ci.yml`, wordpress branch only) is the enforcement
point: parallel-lint + PHPCS (WordPress + WordPress-Extra + PHPCompatibilityWP 8.1+)
+ PHPStan (advisory). To lint locally (optional):

```powershell
winget install PHP.PHP.8.3 ; winget install Composer.Composer   # or scoop
cd wordpress ; composer install ; composer lint
```

## Parity verification

With the Next.js production build on :3000 (`npm run build && npm run start` at the
repo root) and Playground on :9400:

```powershell
npm run parity:head      # exact head/JSON-LD diff per route
npm run parity:check     # + Playwright screenshots + pixelmatch report (.parity/report.html)
```

Thresholds and the manual checklist: [PARITY.md](PARITY.md).

## Branch rules

This folder exists only on the `wordpress` branch. Never merge into `main` (Netlify).
Sync FROM main with `git merge origin/main` (safe — main has no `wordpress/`), then
`npm run generate:content` if `scraped_content/` changed.
