/**
 * Mirrors the brand fonts from a RUNNING Next.js build (NEXT_URL, default
 * :3000) into the theme as self-hosted woff2 files. Replaces the Google
 * Fonts CDN dependency — the HIPAA/GDPR-correct posture is zero third-party
 * requests.
 *
 * Why mirror the build instead of fetching from the Google Fonts API: the
 * API serves different artifacts than next/font ships (observed: Newsreader
 * wght-only 132 KB vs Next's 58 KB file with the opsz axis intact). The
 * metric differences are tiny but flip text-wrap decisions at boundary
 * strings, which breaks pixel parity. Byte-identical binaries are the only
 * guarantee both stacks rasterize the same.
 *
 * next/font loads no italic Inter Tight / JetBrains Mono faces; for those
 * the existing committed files are kept (used only as progressive
 * enhancement where the design calls for true italics).
 *
 * Run once against the canonical Next build, commit the output:
 *   node scripts/fetch-fonts.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const NEXT_BASE = process.env.NEXT_URL || "http://localhost:3000";
const OUT_DIR = path.resolve("wp-content/themes/pll-editorial/assets/fonts");

// family/style → theme filename (theme.json fontFace src values)
const WANTED = {
	"Newsreader|normal": "newsreader-latin-wght-normal.woff2",
	"Newsreader|italic": "newsreader-latin-wght-italic.woff2",
	"Inter Tight|normal": "inter-tight-latin-wght-normal.woff2",
	"Inter Tight|italic": "inter-tight-latin-wght-italic.woff2",
	"JetBrains Mono|normal": "jetbrains-mono-latin-wght-normal.woff2",
	"JetBrains Mono|italic": "jetbrains-mono-latin-wght-italic.woff2",
};

const html = await (await fetch(NEXT_BASE + "/")).text();
const cssHrefs = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+\.css)"/g)].map((m) => m[1]);
if (!cssHrefs.length) throw new Error("No Next CSS bundles found — is the Next build running at " + NEXT_BASE + "?");

// family|style → latin woff2 URL (the @font-face block whose unicode-range
// starts at u+00?? is the latin subset; next/font emits one per weight, all
// pointing at the same variable file).
const latin = new Map();
for (const href of cssHrefs) {
	const css = await (await fetch(NEXT_BASE + href)).text();
	for (const m of css.matchAll(/@font-face\{([^}]+)\}/g)) {
		const block = m[1];
		if (!/unicode-range:u\+00\?\?/.test(block)) continue;
		const family = block.match(/font-family:([^;]+);/)?.[1]?.replace(/["']/g, "").trim();
		const style = block.match(/font-style:(\w+);/)?.[1];
		const src = block.match(/src:url\(([^)]+\.woff2)\)/)?.[1];
		if (family && style && src) latin.set(`${family}|${style}`, src);
	}
}

await mkdir(OUT_DIR, { recursive: true });
for (const [key, filename] of Object.entries(WANTED)) {
	const src = latin.get(key);
	if (!src) {
		console.log(`· ${filename} — not served by the Next build, keeping committed file`);
		continue;
	}
	const res = await fetch(NEXT_BASE + src);
	if (!res.ok) throw new Error(`Font fetch failed (${res.status}): ${src}`);
	const buffer = Buffer.from(await res.arrayBuffer());
	await writeFile(path.join(OUT_DIR, filename), buffer);
	console.log(`✓ ${filename} (${(buffer.length / 1024).toFixed(0)} KB) ← ${src}`);
}

const OFL_NOTE = `The fonts in this directory are redistributed under the SIL Open Font License 1.1.
They are byte-identical mirrors of the woff2 files served by the project's
Next.js build (next/font/google output, latin subset, variable axes intact)
so both stacks rasterize text identically.

- Newsreader — Copyright 2020 The Newsreader Project Authors (https://github.com/productiontype/Newsreader)
- Inter Tight — Copyright 2016 The Inter Project Authors (https://github.com/rsms/inter)
- JetBrains Mono — Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)

Full license text: https://openfontlicense.org/open-font-license-official-text/
`;
await writeFile(path.join(OUT_DIR, "OFL.txt"), OFL_NOTE);
console.log("✓ OFL.txt");
