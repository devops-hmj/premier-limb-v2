/**
 * parity-report — pixelmatch diff of the screenshot pairs captured by
 * parity-capture.mjs. Emits .parity/report.html (side-by-side + diff) and
 * prints a pass/fail table.
 *
 * Budgets (docs/PARITY.md): content pages ≤ 1.5% differing pixels per
 * viewport, homepage/pricing/consult ≤ 3%. Font antialiasing makes exact-0
 * impossible; pixelmatch threshold 0.1 absorbs subpixel noise.
 */
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const PARITY_DIR = path.resolve(".parity");
const LOOSE = new Set(["_root", "_limb-lengthening-pricing-options_", "_consult_"]);

function loadPng(file) {
	return PNG.sync.read(readFileSync(file));
}

/** Pad to common dimensions (white background). */
function pad(png, width, height) {
	if (png.width === width && png.height === height) return png;
	const out = new PNG({ width, height, fill: true });
	out.data.fill(255);
	PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0);
	return out;
}

const rows = [];
let failures = 0;

for (const dir of readdirSync(PARITY_DIR, { withFileTypes: true })) {
	if (!dir.isDirectory()) continue;
	for (const tag of ["390", "1440"]) {
		const nextFile = path.join(PARITY_DIR, dir.name, `${tag}-next.png`);
		const wpFile = path.join(PARITY_DIR, dir.name, `${tag}-wp.png`);
		if (!existsSync(nextFile) || !existsSync(wpFile)) continue;

		let a = loadPng(nextFile);
		let b = loadPng(wpFile);
		const width = Math.max(a.width, b.width);
		const height = Math.max(a.height, b.height);
		const heightDelta = Math.abs(a.height - b.height) / Math.max(a.height, b.height);
		a = pad(a, width, height);
		b = pad(b, width, height);

		const diff = new PNG({ width, height });
		const differing = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1 });
		const ratio = differing / (width * height);
		const budget = LOOSE.has(dir.name) ? 0.03 : 0.015;
		const pass = ratio <= budget && heightDelta <= 0.05;
		if (!pass) failures++;

		const diffFile = path.join(PARITY_DIR, dir.name, `${tag}-diff.png`);
		writeFileSync(diffFile, PNG.sync.write(diff));
		rows.push({ route: dir.name, tag, ratio, heightDelta, budget, pass });
		console.log(
			`${pass ? "✓" : "✗"} ${dir.name} @${tag}: ${(ratio * 100).toFixed(2)}% diff (budget ${(budget * 100).toFixed(1)}%), height Δ ${(heightDelta * 100).toFixed(1)}%`
		);
	}
}

const html = `<!doctype html><meta charset="utf-8"><title>PLL parity report</title>
<style>body{font-family:monospace;background:#111;color:#eee;padding:20px}
.row{margin-bottom:40px}.imgs{display:flex;gap:8px}.imgs div{flex:1}
img{width:100%;border:1px solid #444}h2{font-size:14px}
.pass{color:#5f5}.fail{color:#f55}</style>
${rows
	.map(
		(r) => `<div class="row"><h2 class="${r.pass ? "pass" : "fail"}">${r.pass ? "PASS" : "FAIL"} ${r.route} @${r.tag} — ${(r.ratio * 100).toFixed(2)}%</h2>
<div class="imgs"><div><p>next</p><img loading="lazy" src="${r.route}/${r.tag}-next.png"></div>
<div><p>wp</p><img loading="lazy" src="${r.route}/${r.tag}-wp.png"></div>
<div><p>diff</p><img loading="lazy" src="${r.route}/${r.tag}-diff.png"></div></div></div>`
	)
	.join("\n")}`;
writeFileSync(path.join(PARITY_DIR, "report.html"), html);

console.log(`\n${rows.length - failures}/${rows.length} comparisons within budget`);
console.log(`Report: .parity/report.html`);
process.exit(failures ? 1 : 0);
