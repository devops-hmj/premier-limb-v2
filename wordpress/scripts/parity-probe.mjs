/**
 * parity-probe — debugging helper. Loads a route on both stacks at a fixed
 * viewport (no fullPage tricks) and reports computed metrics for a selector,
 * so capture-pipeline artifacts can be separated from real CSS differences.
 *
 * Usage: node scripts/parity-probe.mjs <route> <selector> [width=1440] [height=900]
 */
import { chromium } from "playwright";

const [route = "/", selector = "h1", w = "1440", h = "900"] = process.argv.slice(2);
const TARGETS = [
	["next", process.env.NEXT_URL || "http://localhost:3000"],
	["wp", process.env.PLAYGROUND_URL || "http://127.0.0.1:9400"],
];

const browser = await chromium.launch();
for (const [name, base] of TARGETS) {
	const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
	await page.goto(base + route, { waitUntil: "load", timeout: 45000 });
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(400);
	const info = await page.evaluate((sel) => {
		const el = document.querySelector(sel);
		if (!el) return null;
		const cs = getComputedStyle(el);
		const r = el.getBoundingClientRect();
		return {
			fontSize: cs.fontSize,
			lineHeight: cs.lineHeight,
			fontFamily: cs.fontFamily.slice(0, 60),
			rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
			innerViewport: { w: window.innerWidth, h: window.innerHeight },
			pageHeight: document.body.scrollHeight,
		};
	}, selector);
	console.log(name, JSON.stringify(info));
	await page.close();
}
await browser.close();
