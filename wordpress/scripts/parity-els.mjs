/**
 * parity-els — debugging helper. Lists every text-bearing element inside a
 * container on both stacks (matched by text prefix) with its rendered box
 * height, exposing wrap/line-count differences element by element.
 *
 * Usage: node scripts/parity-els.mjs <route> <containerSelector> [width=1440] [height=900]
 */
import { chromium } from "playwright";

const [route = "/", container = "body", w = "1440", h = "900"] = process.argv.slice(2);
const TARGETS = [
	["next", process.env.NEXT_URL || "http://localhost:3000"],
	["wp", process.env.PLAYGROUND_URL || "http://127.0.0.1:9400"],
];

const browser = await chromium.launch();
const sides = {};
for (const [name, base] of TARGETS) {
	const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
	await page.goto(base + route, { waitUntil: "load", timeout: 45000 });
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(400);
	sides[name] = await page.evaluate((sel) => {
		const root = document.querySelector(sel);
		if (!root) return [];
		const out = [];
		for (const el of root.querySelectorAll("p, h1, h2, h3, h4, a, li, figure, img, video, blockquote, div, span")) {
			let tag = el.tagName.toLowerCase();
			if (tag === "div" || tag === "span") {
				// Only leaf-ish containers with their own text (Next renders
				// stats/labels as divs where WP uses p) — skip big wrappers.
				const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim();
				if (!own) continue;
				tag = "p";
			}
			const r = el.getBoundingClientRect();
			if (!r.height) continue;
			const text = el.textContent.trim().replace(/\s+/g, " ").slice(0, 38) || `<${el.tagName.toLowerCase()}>`;
			out.push({ tag, text, h: Math.round(r.height), w: Math.round(r.width) });
		}
		return out;
	}, container);
	await page.close();
}
await browser.close();

const wpPool = [...sides.wp];
console.log("tag   next-h  wp-h    Δh  next-w  wp-w  text");
for (const item of sides.next) {
	const idx = wpPool.findIndex((c) => c.tag === item.tag && c.text === item.text);
	const match = idx >= 0 ? wpPool.splice(idx, 1)[0] : null;
	const dh = match ? match.h - item.h : null;
	const flag = dh === null ? " ?" : Math.abs(dh) > 2 ? " *" : "";
	console.log(
		`${item.tag.padEnd(6)}${String(item.h).padStart(5)} ${String(match ? match.h : "—").padStart(5)} ${String(dh ?? "—").padStart(5)}${flag} ${String(item.w).padStart(6)} ${String(match ? match.w : "—").padStart(5)}  ${item.text}`
	);
}
if (wpPool.length) {
	console.log("\nunmatched on WP:");
	for (const c of wpPool) console.log(`  ${c.tag} h=${c.h} ${c.text}`);
}
