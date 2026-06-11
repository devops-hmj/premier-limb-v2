/**
 * parity-sections — debugging helper. Maps every h1-h3 heading (plus footer)
 * to its document offsetTop on both stacks and prints an aligned table of
 * the gaps, pinpointing which section absorbs a page-height difference.
 *
 * Usage: node scripts/parity-sections.mjs <route> [width=1440] [height=900]
 */
import { chromium } from "playwright";

const [route = "/", w = "1440", h = "900"] = process.argv.slice(2);
const TARGETS = [
	["next", process.env.NEXT_URL || "http://localhost:3000"],
	["wp", process.env.PLAYGROUND_URL || "http://127.0.0.1:9400"],
];

const browser = await chromium.launch();
const results = {};
for (const [name, base] of TARGETS) {
	const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
	await page.goto(base + route, { waitUntil: "load", timeout: 45000 });
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(400);
	results[name] = await page.evaluate(() => {
		const out = [];
		for (const el of document.querySelectorAll("h1, h2, h3, footer")) {
			const r = el.getBoundingClientRect();
			if (r.height === 0) continue;
			const text = (el.tagName === "FOOTER" ? "<footer>" : el.textContent.trim().replace(/\s+/g, " ").slice(0, 44)) || "(empty)";
			out.push({ tag: el.tagName.toLowerCase(), text, top: Math.round(r.top + window.scrollY) });
		}
		out.push({ tag: "end", text: "<page end>", top: document.body.scrollHeight });
		return out;
	});
	await page.close();
}
await browser.close();

// Align by heading text (first occurrence), print side-by-side offsets.
const wpByText = new Map();
for (const item of results.wp) if (!wpByText.has(item.text)) wpByText.set(item.text, item);
console.log("delta = wp.top - next.top (how far WP has drifted at that point)");
console.log("tag  next-top  wp-top   delta  text");
for (const item of results.next) {
	const wp = wpByText.get(item.text);
	const delta = wp ? wp.top - item.top : null;
	console.log(
		`${item.tag.padEnd(4)} ${String(item.top).padStart(7)}  ${String(wp ? wp.top : "—").padStart(7)} ${String(delta ?? "—").padStart(7)}  ${item.text}`
	);
}
const nextTexts = new Set(results.next.map((i) => i.text));
const wpOnly = results.wp.filter((i) => !nextTexts.has(i.text));
if (wpOnly.length) {
	console.log("\nheadings only on WP:");
	for (const item of wpOnly) console.log(`  ${item.tag} @${item.top}  ${item.text}`);
}
