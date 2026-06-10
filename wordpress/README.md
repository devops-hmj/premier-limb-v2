# Premier Limb Lengthening — WordPress Recreation

A pixel-perfect WordPress rebuild of [premierlimblengthening.com](https://premierlimblengthening.com)
(the Next.js app at the repo root), packaged for handoff to **HIPAA Vault** managed WordPress hosting.

> ⚠️ **Branch rule: this folder exists only on the `wordpress` branch. Never merge this
> branch into `main`.** `main` deploys to Netlify (the Next.js staging site), which cannot
> run WordPress. All WordPress work happens locally via WordPress Playground and ships to
> HIPAA Vault as a standard `wp-content` package.

## What's in here

| Path | Purpose |
|---|---|
| `wp-content/themes/pll-editorial/` | FSE block theme. Content-only locked patterns: editors change every text/image in WP admin, structure is protected. |
| `wp-content/plugins/pll-seo/` | Titles, meta descriptions, canonicals, Open Graph, JSON-LD (MedicalBusiness, Physician, Article, FAQPage…), sitemap + robots tweaks, legacy redirects. No Yoast needed. |
| `wp-content/plugins/pll-forms/` | Consultation form block + REST endpoint that forwards to the GoHighLevel webhook (URL from a `wp-config.php` constant — never in the DB or repo). GHL chat widget on /consult only. |
| `scripts/` | Content pipeline (markdown → Gutenberg blocks → WXR), font/media fetchers, parity-verification harness. |
| `content/` | Generated `pll-content.wxr` seed + bundled media + `setup.php` (idempotent site configuration). |
| `standards/` | Vendored 10up Engineering Best Practices (reference). WPCS enforced via `composer.json` + CI. |
| `docs/` | `MIGRATION.md` (HIPAA Vault handoff), `DEVELOPMENT.md`, `PARITY.md`. |

## Quick start (local dev — no PHP or Docker required)

```powershell
cd wordpress
npm install
npm run build        # compile Tailwind CSS, blocks, and the content WXR
npm run dev          # WordPress Playground at http://127.0.0.1:9400 (PHP-in-WASM)
```

The Playground instance is **deliberately ephemeral**: every boot rebuilds from
`blueprint.json` + the WXR, which is exactly the import path HIPAA Vault will use.
If you need a change to persist, add it to the blueprint or `content/setup.php`.

## Build artifacts are committed on purpose

`assets/css/pll.css`, `build/`, fonts, and `content/pll-content.wxr` are committed so that
HIPAA Vault never needs Node. CI rebuilds them and fails if a committed artifact is stale
(`.github/workflows/wordpress-ci.yml`).

## Keeping up with `main`

```powershell
git switch wordpress
git merge origin/main     # safe: main never contains wordpress/
cd wordpress; npm run generate:content   # if scraped_content/ changed
```
