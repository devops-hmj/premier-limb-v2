# Provenance

These documents are vendored from the 10up Engineering Best Practices repository.

- **Source:** https://github.com/10up/Engineering-Best-Practices
- **Branch:** `gh-pages` (the repo is a Jekyll site; the guideline documents live in `_includes/markdown/`)
- **Commit:** `5786df903085d1457332478ccac9ca3eb7b1a6f8`
- **Vendored:** 2026-06-09
- **License:** MIT (see [LICENSE.md](LICENSE.md), which must travel with these files)

## Why vendored (not a submodule or subtree)

- Submodules break zip/`git archive` handoffs and require `--recurse-submodules` from every collaborator.
- A subtree would pull in the entire Jekyll site (layouts, SCSS, config) for ~16 markdown docs.
- A plain copy keeps the handoff self-contained for HIPAA Vault.

## How to refresh

```powershell
git clone --depth 1 https://github.com/10up/Engineering-Best-Practices $env:TEMP\10up-ebp
Copy-Item $env:TEMP\10up-ebp\_includes\markdown\*.md wordpress\standards\10up-engineering-best-practices\
Copy-Item $env:TEMP\10up-ebp\LICENSE.md wordpress\standards\10up-engineering-best-practices\
Remove-Item -Recurse -Force $env:TEMP\10up-ebp
```

Then update the commit SHA and date above.

## Companion standard

PHP linting is enforced by the official WordPress Coding Standards (WPCS,
https://github.com/WordPress/WordPress-Coding-Standards), consumed as a Composer
dev-dependency (`wordpress/composer.json` + `wordpress/phpcs.xml.dist`) and run in CI
(`.github/workflows/wordpress-ci.yml`). WPCS is the enforceable ruleset; these 10up
documents are the prose reference for architecture, workflows, and review culture.
