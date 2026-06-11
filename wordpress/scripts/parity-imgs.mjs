/**
 * parity-imgs — debugging helper. Lists every <img>/<video> on a route on
 * both stacks: src tail, rendered box, intrinsic size. Pinpoints media that
 * renders at different dimensions.
 *
 * Usage: node scripts/parity-imgs.mjs <route> [width=1440] [height=900]
 */
import { chromium } from "playwright";

const [route = "/", w = "1440", h = "900"] = process.argv.slice(2);
const TARGETS = [
	["next", process.env.NEXT_URL || "http://localhost:3000"],
	["wp", process.env.PLAYGROUND_URL || "http://127.0.0.1:9400"],
];

const browser = await chromium.launch();
for (const [name, base] of TARGETS) {
	const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
	await page.goto(base + route, { waitUntil: "load", timeout: 45000 });
	await page.waitForTimeout(600);
	const imgs = await page.evaluate(() => {
		const out = [];
		for (const el of document.querySelectorAll("img, video")) {
			const r = el.getBoundingClientRect();
			const src = (el.currentSrc || el.src || "").split("/").slice(-2).join("/").slice(-58);
			out.push({
				src,
				box: `${Math.round(r.width)}x${Math.round(r.height)}@y${Math.round(r.top + window.scrollY)}`,
				nat: el.tagName === "IMG" ? `${el.naturalWidth}x${el.naturalHeight}` : "video",
			});
		}
		return out;
	});
	console.log(`--- ${name}`);
	for (const i of imgs) console.log(`  ${i.box.padEnd(22)} nat ${i.nat.padEnd(11)} ${i.src}`);
	await page.close();
}
await browser.close();
