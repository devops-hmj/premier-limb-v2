/**
 * parity-capture — Playwright screenshot walker. Captures every route on the
 * Next.js site (:3000) and the WordPress recreation (:9400) at 390px and
 * 1440px, with animations/motion disabled and the hero video masked, into
 * .parity/<route>/<width>-<source>.png. parity-report.mjs diffs the pairs.
 *
 * Usage: node scripts/parity-capture.mjs [--routes /a/,/b/]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const NEXT_BASE = process.env.NEXT_URL || "http://localhost:3000";
const WP_BASE = process.env.PLAYGROUND_URL || "http://127.0.0.1:9400";

const ROUTES = [
	"/", "/blog/", "/about/", "/consult/", "/dr-basmajian/",
	"/limb-lengthening-pricing-options/", "/your-surgery/",
	"/your-surgery/will-limb-lengthening-hurt/", "/your-surgery/limb-lengthening-expectations/",
	"/category/limb-lengthening/", "/am-i-too-old-for-limb-lengthening/",
	"/privacy/", "/terms/", "/accessibility/",
];

const VIEWPORTS = [
	{ width: 390, height: 844, tag: "390" },
	{ width: 1440, height: 900, tag: "1440" },
];

const MASK_CSS = `
	*, *::before, *::after {
		animation-duration: 0s !important;
		animation-delay: 0s !important;
		transition-duration: 0s !important;
		transition-delay: 0s !important;
	}
	html.js .js-reveal { opacity: 1 !important; transform: none !important; }
	/* Playground auto-logs every session in as admin; the admin bar's
	   html{margin-top:32px} would shift the whole WP page 32px vs Next,
	   misaligning every pixel below it. */
	#wpadminbar { display: none !important; }
	html { margin-top: 0 !important; }
	/* The position:fixed nav bars repaint at nondeterministic offsets during
	   full-page capture stitching (observed mid-hero at different y on each
	   stack at 390). Their geometry parity is verified separately
	   (docs/PARITY.md); mask them on BOTH stacks for deterministic diffs. */
	header.fixed, .pll-sticky-bar { display: none !important; }
	.v2-video-stage video, .v2-vbg { visibility: hidden !important; }
	.v2-video-stage { background: #0a1218 !important; }
`;

const cliRoutes = process.argv.find((a) => a.startsWith("--routes"))?.split("=")[1];
const routes = cliRoutes ? cliRoutes.split(",") : ROUTES;

const browser = await chromium.launch();

for (const [source, base] of [["next", NEXT_BASE], ["wp", WP_BASE]]) {
	const context = await browser.newContext({ reducedMotion: "reduce" });
	for (const viewport of VIEWPORTS) {
		const page = await context.newPage();
		await page.setViewportSize({ width: viewport.width, height: viewport.height });
		for (const route of routes) {
			const dir = path.resolve(".parity", route.replaceAll("/", "_") || "_root");
			await mkdir(dir, { recursive: true });
			try {
				// "load" not "networkidle": the hero video stream keeps the
				// network busy indefinitely on the homepage.
				await page.goto(base + route, { waitUntil: "load", timeout: 45000 });
				await page.addStyleTag({ content: MASK_CSS });
				await page.evaluate(() => document.fonts.ready);
				// Scroll-prime: whileInView/IntersectionObserver sections only
				// become visible once they enter the viewport — walk the page
				// so below-the-fold content renders on BOTH stacks, then
				// return to the top before the full-page shot.
				await page.evaluate(async () => {
					const step = window.innerHeight;
					for (let y = 0; y < document.body.scrollHeight; y += step) {
						window.scrollTo(0, y);
						await new Promise((r) => setTimeout(r, 120));
					}
					window.scrollTo(0, document.body.scrollHeight);
					await new Promise((r) => setTimeout(r, 250));
					window.scrollTo(0, 0);
				});
				await page.waitForTimeout(600);
				// framer-motion leaves below-fold whileInView content at inline
				// opacity:0 in headless full-page shots. Force in-flow content
				// visible, but leave fixed/sticky chrome (scroll-state navs,
				// overlays) in its natural scrollY=0 hidden state — a CSS
				// [style*=…] hammer here painted hidden navs mid-page.
				await page.evaluate(() => {
					for (const el of document.querySelectorAll("[style*='opacity'], [style*='transform']")) {
						const pos = getComputedStyle(el).position;
						if (pos === "fixed" || pos === "sticky") continue;
						if (el.style.opacity !== "" && Number(el.style.opacity) < 1) el.style.opacity = "1";
						if (el.style.transform && el.style.transform !== "none") el.style.transform = "none";
					}
				});
				await page.waitForTimeout(150);
				await page.screenshot({
					path: path.join(dir, `${viewport.tag}-${source}.png`),
					fullPage: true,
				});
				console.log(`✓ ${source} ${viewport.tag} ${route}`);
			} catch (err) {
				console.error(`✗ ${source} ${viewport.tag} ${route}: ${err.message}`);
				process.exitCode = 1;
			}
		}
		await page.close();
	}
	await context.close();
}

await browser.close();
