/**
 * Downloads the three brand font families as self-hosted variable woff2 files
 * (latin subset) into the theme. Replaces the Google Fonts CDN dependency —
 * the HIPAA/GDPR-correct posture is zero third-party requests.
 *
 * Sources the exact same variable fonts next/font serves, via the Google
 * Fonts CSS2 API (a Chrome UA is required to receive woff2 + unicode-range).
 *
 * Run once, commit the output: node scripts/fetch-fonts.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("wp-content/themes/pll-editorial/assets/fonts");

const CHROME_UA =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const FAMILIES = [
	{
		css: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap",
		out: { normal: "newsreader-latin-wght-normal.woff2", italic: "newsreader-latin-wght-italic.woff2" },
	},
	{
		css: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap",
		out: { normal: "inter-tight-latin-wght-normal.woff2", italic: "inter-tight-latin-wght-italic.woff2" },
	},
	{
		css: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap",
		out: { normal: "jetbrains-mono-latin-wght-normal.woff2", italic: "jetbrains-mono-latin-wght-italic.woff2" },
	},
];

/**
 * Pull the latin-subset woff2 URL for each style out of a CSS2 response.
 * The API emits one @font-face block per subset; the latin block is the one
 * whose unicode-range covers U+0000-00FF.
 */
function extractLatinUrls(cssText) {
	const urls = { normal: null, italic: null };
	const blocks = cssText.split("@font-face").slice(1);
	for (const block of blocks) {
		if (!block.includes("U+0000-00FF")) continue;
		const url = block.match(/src:\s*url\((https:[^)]+\.woff2)\)/)?.[1];
		const style = block.includes("font-style: italic") ? "italic" : "normal";
		if (url) urls[style] = url;
	}
	return urls;
}

await mkdir(OUT_DIR, { recursive: true });

for (const family of FAMILIES) {
	const res = await fetch(family.css, { headers: { "User-Agent": CHROME_UA } });
	if (!res.ok) throw new Error(`CSS fetch failed (${res.status}): ${family.css}`);
	const urls = extractLatinUrls(await res.text());

	for (const style of ["normal", "italic"]) {
		if (!urls[style]) throw new Error(`No latin ${style} woff2 found for ${family.css}`);
		const fontRes = await fetch(urls[style]);
		if (!fontRes.ok) throw new Error(`Font fetch failed (${fontRes.status}): ${urls[style]}`);
		const buffer = Buffer.from(await fontRes.arrayBuffer());
		const target = path.join(OUT_DIR, family.out[style]);
		await writeFile(target, buffer);
		console.log(`✓ ${family.out[style]} (${(buffer.length / 1024).toFixed(0)} KB)`);
	}
}

const OFL_NOTE = `The fonts in this directory are redistributed under the SIL Open Font License 1.1.

- Newsreader — Copyright 2020 The Newsreader Project Authors (https://github.com/productiontype/Newsreader)
- Inter Tight — Copyright 2016 The Inter Project Authors (https://github.com/rsms/inter)
- JetBrains Mono — Copyright 2020 The JetBrains Mono Project Authors (https://github.com/JetBrains/JetBrainsMono)

Full license text: https://openfontlicense.org/open-font-license-official-text/
`;
await writeFile(path.join(OUT_DIR, "OFL.txt"), OFL_NOTE);
console.log("✓ OFL.txt");
