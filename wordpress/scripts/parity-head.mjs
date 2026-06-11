/**
 * parity-head — exact head-tag parity between the Next.js site and the
 * WordPress recreation. For every route: <title>, meta description,
 * canonical, og:*, twitter:*, robots, and parsed JSON-LD are compared after
 * normalization (hosts → production origin, trailing slashes unified).
 *
 * Run with both servers up:
 *   Next:       npm run build && npm run start   (repo root, :3000)
 *   WordPress:  npm run dev                      (wordpress/, :9400)
 *
 * Usage: node scripts/parity-head.mjs [--routes /a/,/b/]
 * Allowlisted systematic diffs live in scripts/parity-allow.json.
 */
import { parse } from "node-html-parser";
import { readFileSync } from "node:fs";
import path from "node:path";

const NEXT_BASE = process.env.NEXT_URL || "http://localhost:3000";
const WP_BASE = process.env.PLAYGROUND_URL || "http://127.0.0.1:9400";
const ORIGIN = "https://premierlimblengthening.com";

const ROUTES = [
	"/",
	"/blog/",
	"/about/",
	"/consult/",
	"/dr-basmajian/",
	"/limb-lengthening-pricing-options/",
	"/your-surgery/",
	"/privacy/",
	"/terms/",
	"/accessibility/",
	"/your-surgery/will-limb-lengthening-hurt/",
	"/your-surgery/is-there-an-age-limit-for-limb-lengthening/",
	"/your-surgery/can-i-bend-my-lengthening-nail/",
	"/your-surgery/external-internal-lengthening/",
	"/your-surgery/exercise-after-limb-lengthening/",
	"/your-surgery/how-much-taller-can-i-get-with-limb-lengthening/",
	"/your-surgery/limb-lengthening-expectations/",
	"/category/limb-lengthening/",
	"/category/bone-health/",
	"/category/impact-on-the-body/",
	"/category/after-limb-lengthening/",
	"/category/paying-for-limb-lengthening/",
	"/are-you-a-good-candidate-for-limb-lengthening/",
	"/what-happens-to-muscle-during-and-after-limb-lengthening/",
	"/the-science-behind-bone-regeneration-and-limb-lengthening/",
	"/bone-health-and-nutrition-before-and-after-limb-lengthening/",
	"/tips-for-traveling-for-the-holidays-after-limb-lengthening-surgery/",
	"/the-importance-of-physical-therapy-in-limb-lengthening/",
	"/is-limb-lengthening-covered-by-insurance/",
	"/limb-lengthening-pain-the-truth/",
	"/will-leg-lengthening-be-obvious/",
	"/fixation-methods-in-limb-lengthening-internal-vs-external/",
	"/is-leg-lengthening-off-limits-for-athletes/",
	"/am-i-too-old-for-limb-lengthening/",
	"/leg-up-or-let-down-can-you-gain-height-without-surgery/",
	"/can-i-get-a-leg-lengthening-procedure-for-cosmetic-reasons/",
	"/limb-lengthening-what-you-gain-what-you-risk/",
	"/rewriting-the-body-norm-stigmas-around-limb-lengthening/",
];

let allow = { fields: {}, notes: [] };
try {
	allow = JSON.parse(readFileSync(path.resolve("scripts/parity-allow.json"), "utf8"));
} catch {
	/* no allowlist yet */
}

/** Normalize URL-ish values: any host → production origin; add trailing slash. */
function normUrl(value) {
	if (typeof value !== "string") return value;
	let v = value
		.replace(/^https?:\/\/(localhost:3000|127\.0\.0\.1:9400|localhost:9400)/, ORIGIN)
		.replace(/^https?:\/\/(www\.)?premierlimblengthening\.com/, ORIGIN);
	if (v.startsWith(ORIGIN)) {
		const [base, hash] = v.split("#");
		if (!base.match(/\.[a-z]{2,4}$/i) && !base.endsWith("/")) v = base + "/" + (hash ? "#" + hash : "");
	}
	return v;
}

function deepNormalize(node) {
	if (Array.isArray(node)) return node.map(deepNormalize);
	if (node && typeof node === "object") {
		const out = {};
		for (const key of Object.keys(node).sort()) out[key] = deepNormalize(node[key]);
		return out;
	}
	return normUrl(node);
}

function extractHead(html) {
	const root = parse(html);
	const meta = (sel, attr = "content") => root.querySelector(sel)?.getAttribute(attr) ?? null;
	const jsonld = root
		.querySelectorAll('script[type="application/ld+json"]')
		.map((s) => {
			try {
				return deepNormalize(JSON.parse(s.text));
			} catch {
				return { PARSE_ERROR: s.text.slice(0, 120) };
			}
		})
		.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

	return {
		title: root.querySelector("title")?.text?.trim() ?? null,
		description: meta('meta[name="description"]'),
		canonical: normUrl(meta('link[rel="canonical"]', "href")),
		ogTitle: meta('meta[property="og:title"]'),
		ogDescription: meta('meta[property="og:description"]'),
		ogUrl: normUrl(meta('meta[property="og:url"]')),
		ogType: meta('meta[property="og:type"]'),
		ogSiteName: meta('meta[property="og:site_name"]'),
		ogImage: normUrl(meta('meta[property="og:image"]')),
		twitterCard: meta('meta[name="twitter:card"]'),
		robots: meta('meta[name="robots"]'),
		jsonld,
	};
}

async function fetchHead(base, route) {
	const res = await fetch(base + route, { redirect: "manual", headers: { Accept: "text/html" } });
	if (res.status >= 300 && res.status < 400) {
		// follow one local redirect (Playground auto-login)
		const res2 = await fetch(base + route, { headers: { Accept: "text/html" } });
		return { status: res.status, head: extractHead(await res2.text()) };
	}
	return { status: res.status, head: extractHead(await res.text()) };
}

const FIELDS = [
	"title", "description", "canonical", "ogTitle", "ogDescription",
	"ogUrl", "ogType", "ogSiteName", "ogImage", "twitterCard", "robots",
];

const cliRoutes = process.argv.find((a) => a.startsWith("--routes"))?.split("=")[1];
const routes = cliRoutes ? cliRoutes.split(",") : ROUTES;

let failures = 0;
for (const route of routes) {
	const [next, wp] = await Promise.all([fetchHead(NEXT_BASE, route), fetchHead(WP_BASE, route)]);
	const diffs = [];

	for (const field of FIELDS) {
		const allowed = allow.fields[field] === "any" || (allow.fields[field] || []).includes(route);
		if (allowed) continue;
		const a = next.head[field];
		const b = wp.head[field];
		if ((a ?? "") !== (b ?? "")) diffs.push(`${field}:\n    next: ${a}\n    wp:   ${b}`);
	}

	const aLd = JSON.stringify(next.head.jsonld);
	const bLd = JSON.stringify(wp.head.jsonld);
	if (aLd !== bLd && allow.fields.jsonld !== "any" && !(allow.fields.jsonld || []).includes(route)) {
		diffs.push(`jsonld: ${next.head.jsonld.length} vs ${wp.head.jsonld.length} blobs differ`);
	}

	if (diffs.length) {
		failures++;
		console.log(`✗ ${route}`);
		for (const d of diffs) console.log(`  ${d}`);
	} else {
		console.log(`✓ ${route}`);
	}
}

console.log(`\n${routes.length - failures}/${routes.length} routes pass head parity`);
process.exit(failures ? 1 : 0);
