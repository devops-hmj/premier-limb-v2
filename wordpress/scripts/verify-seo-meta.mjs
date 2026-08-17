/**
 * verify-seo-meta — static linter for the SEO metadata contract
 * (02-SEO-TECH-SPEC.md §5.7, assertions V1-V9). Parses the PHP maps directly:
 * no WordPress boot, no Playground, no packaged zip, so it is cheap enough to
 * run on every change. This is deliberately NOT part of smoke-test.mjs, which
 * needs `npm run package` to have produced a handoff zip first.
 *
 * What it guards, and why each check exists:
 *   V1  no en/em dashes in any metadata value or in the JSON-LD priceRange
 *   V2  no semicolons and no pipes in any metadata value
 *   V3  no brand token in a title (titles.php appends one, so it double-brands)
 *   V4  no two pages share a meta description
 *   V5  every dollar figure in metadata or schema matches data/pricing.php
 *   V6  pixel budgets, because character counts lie on wide characters
 *   V7  the PHP map and production agree (opt-in, needs the network)
 *   V8  PLL_SEO_VERSION is unchanged, so no full re-seed was triggered
 *   V9  the overrides map defines no og_* keys, so OG falls back correctly
 *   V10 the homepage cost FAQ is in sync between JSON-LD and the pattern
 *   V11 the pricing page's four fields, tier disclosure, and no stale $95k
 *   V12 the JSON-LD priceRange floor agrees with the price we advertise
 *   V13 the LIVE homepage's visible FAQ matches its JSON-LD (opt-in, network)
 *   V14 the two hardcoded tier price lists agree with each other
 *   V15 no LIVE title repeats the head term or carries the sub-page segment
 *       (opt-in, network, crawls the whole sitemap)
 *
 * Outcomes are reported in four classes: pass, fail, SKIP (did not run, never
 * counted as a pass) and ACTION REQUIRED (a human step outside this repo that
 * no static check can confirm).
 *
 * Usage:
 *   node scripts/verify-seo-meta.mjs              static checks only
 *   PLL_VERIFY_LIVE=1 node scripts/verify-seo-meta.mjs   also runs V7 and V13
 *   PLL_BASE=https://staging.example node scripts/verify-seo-meta.mjs
 *
 * V7 is opt-in because it asserts that an editor has already applied the
 * strings through the wp-admin "SEO (PLL)" panel. Post meta beats the PHP map
 * (see the pll_seo_value docblock), so the panel pass is what actually reaches
 * Google and the map is only what a fresh install or a re-seed would produce.
 * Until that panel pass happens, V7 is expected to fail and reports as SKIP.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEO = path.join(ROOT, "wp-content/plugins/pll-seo");
const THEME = path.join(ROOT, "wp-content/themes/pll-editorial");

// ── the seven URLs this ticket owns (SEO spec §3.3) ────────────────────────
const IN_SCOPE = [
	"/your-surgery/how-much-taller-can-i-get-with-limb-lengthening/",
	"/limb-lengthening-pricing-options/",
	"/is-limb-lengthening-covered-by-insurance/",
	"/leg-up-or-let-down-can-you-gain-height-without-surgery/",
	"/is-leg-lengthening-off-limits-for-athletes/",
	"/limb-lengthening-pain-the-truth/",
	"/your-surgery/exercise-after-limb-lengthening/",
];

// ── the homepage FAQ, and why a source-file check is not enough ────────────
// content/setup.php pll_compose_patterns() INLINES pattern content into
// post_content at seed time. It does not emit a pattern reference. So the
// visible homepage FAQ text lives in the production DATABASE, written once at
// seed, and editing patterns/home-faq.php does not change an already-seeded
// site. MIGRATION.md §6c step 3 says the same thing about the homepage CTAs.
//
// The consequence for this ticket: faqs.php (JSON-LD) DOES take effect on
// deploy, home-faq.php (visible) does NOT. Deploying only the half that works
// leaves the homepage advertising $75,500 in structured data while its own
// visible text still says $95,500. That is a worse defect than the one
// REQ-13(b) set out to fix.
//
// This is the string production is believed to be serving. While the repo
// disagrees with it, the linter raises an ACTION REQUIRED for the manual
// block-editor step. Clear it by updating this constant once the edit is done
// and confirmed with PLL_VERIFY_LIVE=1.
//
// CLEARED 2026-08-17: the Home page's post_content was updated on production
// (wp eval-file, one targeted str_replace on page 166) in the same release as
// faqs.php, and V13 confirmed the visible text and the JSON-LD now agree.
const SEEDED_HOMEPAGE_FAQ_COST =
	"Bilateral femur lengthening is $75,500 with the PRECICE 2 nail and $95,500 with PRECICE Max. " +
	"Bilateral tibia is $85,500 and $105,500. Combined tibia and femur is $150,000 and $195,000. " +
	"Every quote includes surgery, implants, anesthesia, hospitalization, and follow-up care. " +
	"Financing is available through SoFi and CareCredit.";

// ── V3 waivers ─────────────────────────────────────────────────────────────
// Pre-existing entries that carry a brand token in the title without the
// title_absolute flag. NOT in this ticket's scope and NOT baselined in GSC, so
// they are recorded rather than silently rewritten. Each one is a real defect
// and needs its own ticket. No in-scope path may ever appear here.
// Every waiver MUST carry a ticket id. An untracked waiver is how c508bf7
// happened: a suppression with no owner and no expiry becomes permanent.
const BRAND_TOKEN_WAIVERS = {
	"/about/": {
		ticket: "3bd5f209-46ca-81c7-957e-dd3f781df9d9", // T8, Master Task Database
		why:
			"pre-existing double-brand. Renders as 'About Premier Limb Lengthening, " +
			"Founded by Dr. Hrayr Basmajian · Premier Limb Lengthening'. Same defect " +
			"class as D2. NOT fixed here on purpose: /about/ carries live traffic " +
			"(367 impressions, position 8.2, 28d) with no captured GSC baseline, and " +
			"rewriting a live listing outside the measured set during the attribution " +
			"window is the contamination REQ-9 exists to prevent. Fix after day 28: " +
			"drop the brand token, or set title_absolute as /consult/ already does.",
	},
};

// ── V6 baselines ───────────────────────────────────────────────────────────
// Entries that already exceeded the pixel budget before this ticket, with their
// measured width on 2026-08-14. Recorded as a CEILING, not an exemption: the
// current width must be less than or equal to the figure below, so any of these
// getting worse is still a hard failure and shortening one is always allowed.
//
// This table IS the Wave 2 copy backlog. Seventeen meta descriptions on this
// site overflow a two-line SERP snippet and get truncated today.
//
// A live value on one of the seven in-scope paths can never be baselined (the
// linter refuses to look here for those), so this ticket's own copy is always
// held to the full budget.
const PIXEL_BASELINE = {
	// Deliberate, per homepage handoff v2 §08. Explicitly cut from scope (SEO spec §2).
	"/::title": [708, "homepage, title_absolute, deliberate per homepage handoff v2 §08"],
	"/::description": [1332, "homepage, deliberate per homepage handoff v2 §08"],
	// Pre-existing page defaults, out of scope for this ticket.
	"/about/::title": [595, "pre-existing. Also the V3 brand-token defect, see BRAND_TOKEN_WAIVERS"],
	"/about/::description": [1190, "pre-existing, out of scope"],
	"/dr-basmajian/::description": [1062, "pre-existing, out of scope"],
	"/height-surgery/::description": [1022, "SEO pillar copy, out of scope"],
	"/leg-lengthening-surgery/::description": [1062, "SEO pillar copy, out of scope"],
	"/your-surgery/::description": [993, "pre-existing, out of scope"],
	"/blog/::description": [1103, "pre-existing, out of scope"],
	"/terms/::description": [990, "legal page, out of scope"],
	"/evaluate-your-surgeon/::title": [584, "title_absolute, keyword-first by design. 4px over, landed with the evaluate-your-surgeon port"],
	// (The price-free fallback description used to need an entry here at 998px.
	// The SEO replaced that string with a 144 char / 895px rewrite, so it now
	// passes on its own and the waiver is gone. No in-scope path is baselined.)
	// Restored to their pre-c508bf7 production values per SEO spec REQ-7. These
	// are what production serves today, so they are not a new regression.
	"/your-surgery/is-there-an-age-limit-for-limb-lengthening/::description": [1044, "reverted to the pre-c508bf7 production value per SEO spec REQ-7"],
	"/your-surgery/external-internal-lengthening/::description": [1014, "reverted to the pre-c508bf7 production value per SEO spec REQ-7"],
	"/am-i-too-old-for-limb-lengthening/::description": [1061, "reverted to the pre-c508bf7 production value per SEO spec REQ-7"],
	"/limb-lengthening-what-you-gain-what-you-risk/::description": [1037, "reverted to the pre-c508bf7 production value per SEO spec REQ-7"],
	"/will-leg-lengthening-be-obvious/::description": [990, "reverted to the pre-c508bf7 production value per SEO spec REQ-7"],
	// Untouched by c508bf7 and by this ticket.
	"/your-surgery/can-i-bend-my-lengthening-nail/::description": [983, "pre-existing, out of scope"],
	"/rewriting-the-body-norm-stigmas-around-limb-lengthening/::description": [984, "pre-existing, out of scope"],
	"/can-i-get-a-leg-lengthening-procedure-for-cosmetic-reasons/::description": [1029, "pre-existing, out of scope"],
};

// ── Arial advance widths, units per 1000 em ────────────────────────────────
// Arial is metrically compatible with Helvetica, so these are the Helvetica AFM
// advance widths. This is the whole point of the pixel budget: 'W' is 944 and
// 'l' is 222, a 4.25x spread that a character count cannot see.
const ARIAL = {
	" ": 278, "!": 278, '"': 355, "#": 556, $: 556, "%": 889, "&": 667, "'": 191,
	"(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
	0: 556, 1: 556, 2: 556, 3: 556, 4: 556, 5: 556, 6: 556, 7: 556, 8: 556, 9: 556,
	":": 278, ";": 278, "<": 584, "=": 584, ">": 584, "?": 556, "@": 1015,
	A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500,
	K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611,
	U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
	"[": 278, "\\": 278, "]": 278, "^": 469, _: 556, "`": 333,
	a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222,
	k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278,
	u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
	"{": 334, "|": 260, "}": 334, "~": 584,
	" ": 278, "·": 278, "–": 556, "—": 1000,
	"‘": 222, "’": 222, "“": 333, "”": 333, "…": 1000,
};
const px = (s, size) => Math.round([...s].reduce((a, c) => a + (ARIAL[c] ?? 556), 0) * size / 1000);
const titlePx = (s) => px(s, 20); // Google desktop blue-link line, 580px fold
const descPx = (s) => px(s, 14); // two-line snippet, 960px budget
const TITLE_BUDGET = 580;
const DESC_BUDGET = 960;

// ── a very small PHP reader ────────────────────────────────────────────────
// Enough to read literal array maps out of the plugin. It does not handle
// heredocs or variable interpolation, neither of which these files use.

/** Blank out comments while leaving string literals and line count intact. */
function stripComments(src) {
	let out = "";
	for (let i = 0; i < src.length; ) {
		const c = src[i];
		if (c === "'" || c === '"') {
			const q = c;
			out += c;
			i += 1;
			while (i < src.length) {
				if (src[i] === "\\") {
					out += src.slice(i, i + 2);
					i += 2;
					continue;
				}
				out += src[i];
				i += 1;
				if (src[i - 1] === q) break;
			}
			continue;
		}
		if (c === "/" && src[i + 1] === "/") {
			while (i < src.length && src[i] !== "\n") { out += " "; i += 1; }
			continue;
		}
		if (c === "#") {
			while (i < src.length && src[i] !== "\n") { out += " "; i += 1; }
			continue;
		}
		if (c === "/" && src[i + 1] === "*") {
			while (i < src.length && !(src[i] === "*" && src[i + 1] === "/")) {
				out += src[i] === "\n" ? "\n" : " ";
				i += 1;
			}
			out += "  ";
			i += 2;
			continue;
		}
		out += c;
		i += 1;
	}
	return out;
}

/** Decode a PHP quoted string starting at src[i]. Returns [value, nextIndex]. */
function readString(src, i) {
	const q = src[i];
	let v = "";
	i += 1;
	while (i < src.length && src[i] !== q) {
		if (src[i] === "\\") {
			const n = src[i + 1];
			if (q === "'") v += n === "'" || n === "\\" ? n : "\\" + n;
			else v += { n: "\n", t: "\t", r: "\r", '"': '"', "\\": "\\", $: "$" }[n] ?? "\\" + n;
			i += 2;
			continue;
		}
		v += src[i];
		i += 1;
	}
	return [v, i + 1];
}

const skipWs = (src, i) => {
	while (i < src.length && /\s/.test(src[i])) i += 1;
	return i;
};

/** Parse `array( 'k' => <scalar|array>, ... )` at src[i]. Returns [obj, next]. */
function readArray(src, i) {
	i = skipWs(src, i);
	i = src.slice(i, i + 6).toLowerCase() === "array(" ? i + 6 : i + 1; // array( or [
	const obj = {};
	for (;;) {
		i = skipWs(src, i);
		if (i >= src.length) break;
		if (src[i] === ")" || src[i] === "]") { i += 1; break; }
		if (src[i] === ",") { i += 1; continue; }
		if (src[i] !== "'" && src[i] !== '"') { i += 1; continue; }
		const [key, afterKey] = readString(src, i);
		let j = skipWs(src, afterKey);
		if (src.slice(j, j + 2) !== "=>") { i = afterKey; continue; }
		j = skipWs(src, j + 2);
		if (src[j] === "'" || src[j] === '"') {
			const [val, next] = readString(src, j);
			obj[key] = val;
			i = next;
		} else if (/^(true|false)/i.test(src.slice(j, j + 5))) {
			obj[key] = /^true/i.test(src.slice(j, j + 4));
			i = j + (/^true/i.test(src.slice(j, j + 4)) ? 4 : 5);
		} else if (src.slice(j, j + 6).toLowerCase() === "array(" || src[j] === "[") {
			const [, next] = readArray(src, j);
			i = next;
		} else {
			while (j < src.length && src[j] !== "," && src[j] !== ")") j += 1;
			i = j;
		}
	}
	return [obj, i];
}

/** Body of `function NAME() { ... }`, comments already stripped. */
function functionBody(src, name) {
	const at = src.indexOf(`function ${name}(`);
	if (at < 0) return "";
	let i = src.indexOf("{", at);
	let depth = 0;
	const start = i;
	for (; i < src.length; i += 1) {
		const c = src[i];
		if (c === "'" || c === '"') { [, i] = readString(src, i); i -= 1; continue; }
		if (c === "{") depth += 1;
		else if (c === "}") { depth -= 1; if (depth === 0) return src.slice(start + 1, i); }
	}
	return "";
}

/**
 * Pull `'/path/' => array(...)` entries out of a map function body. Also
 * understands the one ternary form the pricing gate uses:
 *   '/path/' => CONSTANT ? array(...approved...) : array(...fallback...)
 * Both branches are returned so the linter checks the copy we are NOT shipping
 * as well as the copy we are, and `active` records which one is live.
 */
function parseMap(body, constants) {
	const entries = {};
	const re = /'(\/[^']*)'\s*=>/g;
	let m;
	while ((m = re.exec(body))) {
		let i = skipWs(body, m.index + m[0].length);
		if (body.slice(i, i + 6).toLowerCase() === "array(") {
			const [obj] = readArray(body, i);
			entries[m[1]] = { active: obj, variants: [["", obj]] };
			continue;
		}
		const tern = /^([A-Z_][A-Z0-9_]*)\s*\?/.exec(body.slice(i));
		if (!tern) continue;
		const name = tern[1];
		i = skipWs(body, i + tern[0].length);
		const [approved, afterA] = readArray(body, i);
		let j = skipWs(body, afterA);
		if (body[j] !== ":") continue;
		const [fallback] = readArray(body, skipWs(body, j + 1));
		// Fail safe, mirroring the PHP: only an explicit `true` counts as
		// approved. If the define cannot be resolved at all we do NOT guess
		// that the risky branch is live — `resolved` records that and V0 turns
		// it into a hard error, because an unreadable gate is a broken gate.
		const resolved = name in constants;
		const on = constants[name] === true;
		entries[m[1]] = {
			active: on ? approved : fallback,
			gatedBy: name,
			gateOn: on,
			gateResolved: resolved,
			variants: [[`${name}=true`, approved], [`${name}=false`, fallback]],
		};
	}
	return entries;
}

// ── load ───────────────────────────────────────────────────────────────────
const read = async (p) => stripComments(await readFile(p, "utf8"));
const raw = async (p) => readFile(p, "utf8");

const metaSrc = await read(path.join(SEO, "includes/meta.php"));
// Comments intact, so the gate's approval record stays readable.
const pluginMetaRaw = await raw(path.join(SEO, "includes/meta.php"));
const schemaSrc = await read(path.join(SEO, "includes/schema.php"));
const pricingSrc = await read(path.join(SEO, "includes/data/pricing.php"));
const faqsSrc = await read(path.join(SEO, "includes/data/faqs.php"));
const pluginRaw = await raw(path.join(SEO, "pll-seo.php"));
const faqsRaw = await raw(path.join(SEO, "includes/data/faqs.php"));
const homeFaqRaw = await raw(path.join(THEME, "patterns/home-faq.php"));

const constants = {};
for (const m of metaSrc.matchAll(/define\(\s*'([A-Z_][A-Z0-9_]*)'\s*,\s*(true|false)\s*\)/g)) {
	constants[m[1]] = m[2] === "true";
}

const defaults = parseMap(functionBody(metaSrc, "pll_seo_page_defaults"), constants);
const overrides = parseMap(functionBody(metaSrc, "pll_seo_overrides"), constants);

// Merged view, matching how the seeding migration builds it: page-defaults
// first, overrides layered on top.
const merged = {};
for (const [p, e] of Object.entries(defaults)) merged[p] = { ...e.active };
for (const [p, e] of Object.entries(overrides)) merged[p] = { ...(merged[p] ?? {}), ...e.active };

// Every string this linter is responsible for, including the inactive branch of
// the price gate, tagged with where it came from.
const allValues = [];
for (const [map, set] of [["page_defaults", defaults], ["overrides", overrides]]) {
	for (const [p, e] of Object.entries(set)) {
		for (const [variant, obj] of e.variants) {
			// For a gated entry only one branch is live. Both are linted, but
			// only the live one is held to the in-scope (un-waivable) standard.
			const active = !e.gatedBy || variant === `${e.gatedBy}=${e.gateOn}`;
			for (const [field, val] of Object.entries(obj)) {
				if (typeof val === "string") allValues.push({ map, path: p, field, val, variant, active });
			}
		}
	}
}

// data/pricing.php is a numerically-indexed list of {name, price}, so read the
// prices straight out. This set is the single source of truth for V5.
const tierPrices = new Set([...pricingSrc.matchAll(/'price'\s*=>\s*'([^']+)'/g)].map((m) => m[1]));

// ── reporting ──────────────────────────────────────────────────────────────
// Four outcome classes, counted separately. A SKIP is NOT a pass: a check that
// did not run must never make the suite look healthier than it is.
const results = [];
const check = (name, cond, detail = []) => {
	results.push([name, cond ? "pass" : "fail", "error"]);
	console.log(`${cond ? "✓" : "✗"} ${name}`);
	for (const d of detail) console.log(`    ${d}`);
};
const warn = (name, cond, detail = []) => {
	results.push([name, cond ? "pass" : "fail", "warn"]);
	console.log(`${cond ? "✓" : "!"} ${name}${cond ? "" : "  (warning)"}`);
	for (const d of detail) console.log(`    ${d}`);
};
const skip = (name, why) => {
	results.push([name, "skip", "skip"]);
	console.log(`- ${name}  SKIPPED: ${why}`);
};
// A step a HUMAN must perform outside this repo, which no static check can
// confirm. Never a pass and never a silent failure: it prints loudly, is
// counted on its own line, and stays until someone does the work.
const action = (name, detail = []) => {
	results.push([name, "action", "action"]);
	console.log(`⚑ ACTION REQUIRED: ${name}`);
	for (const d of detail) console.log(`    ${d}`);
};

const TEXT_FIELDS = new Set(["title", "description", "og_title", "og_description"]);

console.log("── pll-seo metadata contract ──────────────────────────────────");
console.log(`   ${Object.keys(defaults).length} page defaults, ${Object.keys(overrides).length} overrides, ${Object.keys(merged).length} merged paths`);
const gate = Object.values(defaults).find((e) => e.gatedBy);
if (gate) {
	console.log(
		`   PRICE ANCHOR GATE ${gate.gatedBy} = ${gate.gateOn}` +
			`  →  shipping: "${gate.active.title}"`
	);
	console.log(
		gate.gateOn
			? "   ⚠️  PENDING CLIENT APPROVAL (Jaime). Must not reach production unapproved."
			: "   price-free fallback is active."
	);
}
console.log("");

// ── V0: structural sanity ──────────────────────────────────────────────────
// php -l is not always available on a dev machine. A broken quote or escape in
// this file shows up here first, as entries going missing.
check(
	`V0 all 7 in-scope paths parsed with a non-empty title and description`,
	IN_SCOPE.every((p) => merged[p]?.title && merged[p]?.description),
	IN_SCOPE.filter((p) => !(merged[p]?.title && merged[p]?.description)).map((p) => `missing or empty: ${p}`)
);
check("V0 the price gate parsed both variants", !!gate && gate.variants.length === 2);
// An unreadable gate is a broken gate. If the define cannot be resolved we do
// not guess which branch is live, we fail.
check(
	"V0 the price gate constant resolved to an explicit true or false",
	!!gate && gate.gateResolved === true,
	gate && !gate.gateResolved ? [`could not resolve define( '${gate.gatedBy}', true|false ) in meta.php`] : []
);
// The gate must fail safe: absent an explicit decision, the price-free copy
// ships. A fresh install, staging rebuild, or re-seed that never defines this
// constant must never publish an unapproved elective-surgery price to Google.
//
// `true` is still reachable, because approval is a real event that has to be
// expressible. But it must carry an approval record in the docblock, so the
// value and the evidence for it cannot drift apart, and so nobody has to weaken
// this check in order to ship a legitimate approval.
{
	const dflt = metaSrc.match(/define\(\s*'PLL_SEO_PRICE_ANCHOR_APPROVED'\s*,\s*(true|false)\s*\)/)?.[1];
	// Take the first Approved-By line that is not the angle-bracket template.
	// Validated in JS rather than in the pattern on purpose: a `\s*([^\n<]…)`
	// regex silently backtracks and lets `Approved-By: <name>` through, because
	// the space itself satisfies the negated class.
	const approvedBy = [...pluginMetaRaw.matchAll(/Approved-By:[ \t]*([^\n]*)/g)]
		.map((m) => m[1].trim())
		.find((v) => v.length > 0 && !v.startsWith("<"));
	if (dflt === "false") {
		check("V0 price gate default is fail-safe (false)", true);
	} else if (dflt === "true" && approvedBy) {
		warn(`V0 price gate is APPROVED and OPEN — record: ${approvedBy}`, false, [
			"A dollar figure is being published to Google. Confirm this record is real.",
		]);
	} else {
		check(
			`V0 price gate default is fail-safe (found ${dflt ?? "nothing"})`,
			false,
			[
				dflt === "true"
					? "Gate is true with NO 'Approved-By:' record in the meta.php docblock. An unapproved elective-surgery price would publish on any fresh install or re-seed."
					: "Could not read the gate default. An unreadable gate is a broken gate.",
				"Set it to false, or add: Approved-By: <name>, <YYYY-MM-DD>, <where recorded>",
			]
		);
	}
}

// ── V1: no en dashes, no em dashes ─────────────────────────────────────────
{
	const bad = allValues.filter((v) => /[–—]/.test(v.val));
	const priceRange = schemaSrc.match(/'priceRange'\s*=>\s*'([^']*)'/)?.[1] ?? "";
	if (/[–—]/.test(priceRange)) bad.push({ map: "schema.php", path: "priceRange", field: "priceRange", val: priceRange });
	check(
		"V1 no en dash or em dash in any metadata value or in schema priceRange",
		bad.length === 0,
		bad.map((v) => `${v.path} [${v.field}]: ${v.val}`)
	);
}

// ── V2: no semicolons, no pipes ────────────────────────────────────────────
{
	const bad = allValues.filter((v) => TEXT_FIELDS.has(v.field) && /[;|]/.test(v.val));
	check(
		"V2 no semicolon and no pipe in any title or description value",
		bad.length === 0,
		bad.map((v) => `${v.path} [${v.field}]: ${v.val}`)
	);
}

// ── V3: no brand token in a title unless title_absolute ────────────────────
{
	const bad = [];
	const waived = [];
	for (const [map, set] of [["page_defaults", defaults], ["overrides", overrides]]) {
		for (const [p, e] of Object.entries(set)) {
			for (const [variant, obj] of e.variants) {
				if (typeof obj.title !== "string" || !/Premier/.test(obj.title)) continue;
				if (obj.title_absolute === true) continue;
				const row = `${p}${variant ? ` (${variant})` : ""} [${map}]: ${obj.title}`;
				const w = BRAND_TOKEN_WAIVERS[p];
				// A waiver without a ticket id is not a waiver.
				if (w?.ticket && !IN_SCOPE.includes(p)) waived.push(`${row}\n      WAIVED [ticket ${w.ticket}]: ${w.why}`);
				else bad.push(row);
			}
		}
	}
	check(
		"V3 no brand token in a title without title_absolute",
		bad.length === 0,
		bad
	);
	if (waived.length) {
		warn(`V3 waived pre-existing brand-token titles (${waived.length})`, false, waived);
	}
}

// ── V4: descriptions are mutually unique ───────────────────────────────────
{
	const byDesc = new Map();
	for (const [p, e] of Object.entries(merged)) {
		if (!e.description) continue;
		byDesc.set(e.description, [...(byDesc.get(e.description) ?? []), p]);
	}
	const dupes = [...byDesc.entries()].filter(([, ps]) => ps.length > 1);
	check(
		"V4 no two pages share a meta description",
		dupes.length === 0,
		dupes.map(([d, ps]) => `${ps.join("  +  ")}\n      "${d}"`)
	);
}

// ── V5: every dollar figure traces to data/pricing.php ─────────────────────
{
	const PRICE = /\$\d[\d,]*(?:\.\d+)?k?/gi;
	const scanned = [
		...allValues.map((v) => ({ where: `meta.php ${v.path} [${v.field}]`, val: v.val })),
		{ where: "schema.php priceRange", val: schemaSrc.match(/'priceRange'\s*=>\s*'([^']*)'/)?.[1] ?? "" },
		...[...faqsSrc.matchAll(/'a'\s*=>\s*'((?:[^'\\]|\\.)*)'/g)].map((m, n) => ({ where: `data/faqs.php answer ${n + 1}`, val: m[1] })),
	];
	const bad = [];
	for (const { where, val } of scanned) {
		for (const tok of val.match(PRICE) ?? []) {
			if (!tierPrices.has(tok)) bad.push(`${where}: ${tok}  (not a tier in data/pricing.php)`);
		}
	}
	check(
		`V5 every dollar figure matches a tier in data/pricing.php (${tierPrices.size} tiers)`,
		bad.length === 0,
		bad
	);
}

// ── V6: pixel budgets ──────────────────────────────────────────────────────
{
	// title and description only. The 580px and 960px budgets are Google SERP
	// geometry (the blue link line, and a two-line snippet). og_* fields are
	// social cards rendered by Facebook, LinkedIn and X, which have completely
	// different geometry, so measuring them against a SERP budget would be
	// meaningless. Their widths are printed as information instead.
	const bad = [];
	const baselined = [];
	const regressed = [];
	for (const v of allValues) {
		const isTitle = v.field === "title";
		const isDesc = v.field === "description";
		if (!isTitle && !isDesc) continue;
		const w = isTitle ? titlePx(v.val) : descPx(v.val);
		const budget = isTitle ? TITLE_BUDGET : DESC_BUDGET;
		if (w <= budget) continue;
		const key = `${v.path}::${v.field}${v.variant ? `::${v.variant}` : ""}`;
		const base = PIXEL_BASELINE[key];
		const row = `${v.path}${v.variant ? ` (${v.variant})` : ""} [${v.field}] ${w}px > ${budget}px  "${v.val.slice(0, 60)}…"`;
		// This ticket's own copy on an in-scope path can never be waived: fix
		// the string, not the linter.
		//
		// The narrow exception is the DORMANT branch of the price gate, which
		// must also carry its own variant-keyed baseline entry to be waivable
		// at all. The LIVE branch is never waivable, whichever way the gate is
		// set, so the copy actually being published on the most important page
		// in the ticket always faces the full budget. (An earlier revision
		// keyed this on `!!v.variant` alone, which left the live branch of the
		// pricing page waivable. It was not being waived, but the hole was
		// real.)
		const waivable = !IN_SCOPE.includes(v.path) || (!!v.variant && !v.active);
		if (!waivable || !base) bad.push(row);
		else if (w > base[0]) regressed.push(`${row}\n      REGRESSION: baseline was ${base[0]}px`);
		else baselined.push(`${v.path}${v.variant ? ` (${v.variant})` : ""} [${v.field}] ${w}px (ceiling ${base[0]}px) — ${base[1]}`);
	}
	check(
		`V6 pixel budget: titles ≤ ${TITLE_BUDGET}px @Arial 20, descriptions ≤ ${DESC_BUDGET}px @Arial 14`,
		bad.length === 0 && regressed.length === 0,
		[...bad, ...regressed]
	);
	if (baselined.length) {
		warn(`V6 baselined pre-existing overflows, none regressed (${baselined.length})`, false, baselined);
	}
	console.log("    in-scope widths:");
	for (const p of IN_SCOPE) {
		const e = merged[p];
		console.log(
			`      ${String(titlePx(e.title)).padStart(3)}px / ${String(descPx(e.description)).padStart(3)}px  ${p}`
		);
	}
}

// ── V7: the PHP map and production agree ───────────────────────────────────
const LIVE_BASE = process.env.PLL_BASE || (process.env.PLL_VERIFY_LIVE ? "https://premierlimblengthening.com" : "");

// Production sits behind a WAF (Patchstack) that 403s unrecognized user agents,
// and Node's fetch sends `User-Agent: node`. Every live check was therefore
// parsing a block page instead of the site: V7 reported `live: 403` for all
// eight in-scope paths, and V13 "passed" its stale-price check because the
// block page contains no prices at all. Send a browser UA, and treat a non-2xx
// as a hard error rather than letting an error body score as a result.
const LIVE_UA =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
async function fetchLive(url) {
	const r = await fetch(url, {
		redirect: "follow",
		headers: { "user-agent": LIVE_UA, accept: "text/html,application/xhtml+xml" },
	});
	if (!r.ok) throw new Error(`HTTP ${r.status} (WAF block, or the page is gone)`);
	return r.text();
}

// Titles and descriptions come back HTML-escaped; compare them as authored.
const decodeEntities = (s) =>
	s
		.replace(/&#0?39;|&apos;|&#x27;/gi, "'")
		.replace(/&quot;/g, '"')
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&");
{
	const base = LIVE_BASE;
	if (!base) {
		skip(
			"V7 panel/map parity against live HTML",
			"needs PLL_VERIFY_LIVE=1 or PLL_BASE. Expected to FAIL until the SEO (PLL) panel pass has been applied in wp-admin, because post meta beats the PHP map."
		);
	} else {
		const bad = [];
		for (const p of IN_SCOPE) {
			const e = merged[p];
			let html = "";
			try {
				html = await fetchLive(new URL(p, base).href);
			} catch (err) {
				bad.push(`${p}: fetch failed (${err.message})`);
				continue;
			}
			const live = {
				title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "",
				description: html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "",
			};
			const decode = decodeEntities;
			if (!decode(live.title).startsWith(e.title)) bad.push(`${p} title\n      map:  ${e.title}\n      live: ${decode(live.title)}`);
			if (decode(live.description) !== e.description) bad.push(`${p} description\n      map:  ${e.description}\n      live: ${decode(live.description)}`);
		}
		check(`V7 panel/map parity against ${base}`, bad.length === 0, bad);
	}
}

// ── V8: no full re-seed ────────────────────────────────────────────────────
{
	const ver = pluginRaw.match(/define\(\s*'PLL_SEO_VERSION'\s*,\s*'([^']+)'\s*\)/)?.[1];
	check(
		`V8 PLL_SEO_VERSION unchanged at 1.0.0 (found ${ver ?? "nothing"})`,
		ver === "1.0.0",
		ver === "1.0.0" ? [] : ["Bumping this re-runs the seeding migration across the whole map and overwrites every SEO field any editor has set since launch."]
	);
}

// ── V9: overrides must not define og_* ─────────────────────────────────────
{
	const bad = [];
	for (const [p, e] of Object.entries(overrides)) {
		for (const k of Object.keys(e.active)) if (k.startsWith("og_")) bad.push(`${p}: ${k}`);
	}
	warn(
		"V9 pll_seo_overrides defines no og_* keys, so OG falls back to the SEO fields",
		bad.length === 0,
		bad
	);
}

// ── V10: the homepage cost FAQ is in sync ──────────────────────────────────
// Added for SEO spec Gate 1.7. faqs.php drives the FAQPage JSON-LD, home-faq.php
// is the visible copy, and the file header says to keep them in sync. They had
// drifted from the pricing page by quoting the PRECICE Max tier only.
const faqJsonLd = faqsRaw.match(/'a'\s*=>\s*'(Bilateral femur[^']*)'/)?.[1] ?? "";
{
	const visible = homeFaqRaw.match(/<p>(Bilateral femur[\s\S]*?)<\/p>/)?.[1] ?? "";
	check(
		"V10 homepage cost FAQ: JSON-LD copy is byte-identical to the pattern copy",
		!!faqJsonLd && faqJsonLd === visible,
		faqJsonLd === visible ? [] : [`faqs.php:     ${faqJsonLd}`, `home-faq.php: ${visible}`]
	);
	check(
		"V10 homepage cost FAQ quotes the PRECICE 2 floor, not just PRECICE Max",
		faqJsonLd.includes("$75,500") && visible.includes("$75,500")
	);

	// V10 above compares two SOURCE FILES to each other. Neither is what the
	// live homepage renders — see the SEEDED_HOMEPAGE_FAQ_COST note at the top.
	// This is the blind spot, made visible.
	if (faqJsonLd !== SEEDED_HOMEPAGE_FAQ_COST) {
		action(
			"homepage FAQ: update the visible paragraph in the wp-admin block editor",
			[
				"patterns/home-faq.php is INERT on an already-seeded site. The visible text",
				"lives in post_content in the DB. faqs.php (JSON-LD) DOES deploy, so shipping",
				"the code without this step leaves the homepage's structured data contradicting",
				"its own visible text.",
				"",
				"DO: wp-admin → Pages → Home → the 'How much does limb lengthening surgery",
				"    cost?' FAQ paragraph → paste the faqs.php answer → Update.",
				"    Runbook: wordpress/docs/MIGRATION.md §6f.",
				"DO NOT: PLL_SEED_FORCE. It overwrites every editorial change on Home.",
				"",
				"Order: do this BEFORE or WITH the code deploy, never after.",
				"Then confirm with PLL_VERIFY_LIVE=1 and clear SEEDED_HOMEPAGE_FAQ_COST.",
			]
		);
	}
}

// ── V13: the live homepage's VISIBLE FAQ vs its own JSON-LD ────────────────
// The only check that can actually catch F2, because it is the only one that
// looks at rendered output instead of source files. Same opt-in gate as V7.
{
	if (!LIVE_BASE) {
		skip(
			"V13 live homepage visible FAQ matches its JSON-LD",
			"needs PLL_VERIFY_LIVE=1 or PLL_BASE. This is the check that proves the block-editor step was done, because patterns/home-faq.php cannot reach an already-seeded homepage."
		);
	} else {
		let html = "";
		try {
			html = await fetchLive(new URL("/", LIVE_BASE).href);
		} catch (err) {
			check("V13 live homepage visible FAQ matches its JSON-LD", false, [`fetch failed: ${err.message}`]);
		}
		if (html) {
			const text = html
				.replace(/<script[\s\S]*?<\/script>/gi, " ")
				.replace(/<[^>]+>/g, " ")
				.replace(/&amp;/g, "&").replace(/&#0?39;|&apos;|&#x27;/gi, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ")
				.replace(/\s+/g, " ");
			const want = faqJsonLd.replace(/\s+/g, " ").trim();
			const inJsonLd = html.replace(/\s+/g, " ").includes(want.slice(0, 80));
			check(
				"V13 live homepage VISIBLE cost FAQ matches the deployed JSON-LD",
				text.includes(want),
				text.includes(want) ? [] : [
					"The visible homepage text does not match faqs.php. If the code is deployed,",
					"the homepage is publishing structured data that contradicts its own copy.",
					`expected: ${want.slice(0, 120)}…`,
					`Fix in the block editor (MIGRATION.md §6f), NOT with PLL_SEED_FORCE.`,
				]
			);
			check("V13 live homepage emits the cost FAQ in JSON-LD", inJsonLd);
			const stalePrice = /Bilateral femur lengthening is \$95,500/.test(text);
			check("V13 live homepage visible FAQ no longer leads with the $95,500 tier", !stalePrice);
		}
	}
}

// ── V11: the pricing page's four fields ────────────────────────────────────
// Added for SEO spec REQ-10, REQ-11 and Gate 3.1/3.3/3.4. This is the only
// in-scope path whose og_* post meta was already seeded, so setting just the
// SEO pair would leave a stale OG title on every social share. REQ-11 requires
// OG to stay byte-identical to the SEO fields, price included.
{
	const p = "/limb-lengthening-pricing-options/";
	const e = merged[p];
	check(
		"V11 pricing page defines all four meta fields (stale-OG trap)",
		!!(e?.title && e?.description && e?.og_title && e?.og_description),
		["title", "description", "og_title", "og_description"].filter((f) => !e?.[f]).map((f) => `missing: ${f}`)
	);
	// SEO spec §4.1: "From" is only defensible disclosure if the description
	// says which of the six tiers that price buys.
	const anchored = /\$75,500/.test(e?.title ?? "");
	// REQ-11 requires OG to stay in lockstep with the SEO fields specifically
	// so a share card cannot show a different price from the SERP. That only
	// binds when a price is being published. The fallback branch keeps the two
	// production strings, which were deliberately written to differ.
	if (anchored) {
		check(
			"V11 pricing page og_* are byte-identical to the SEO pair (REQ-11)",
			e?.og_title === e?.title && e?.og_description === e?.description
		);
	} else {
		skip("V11 og_* byte-identity", "price anchor is not active, REQ-11 lockstep does not bind");
	}
	if (anchored) {
		check(
			"V11 price anchor is live, so the description names the tier (spec §4.1)",
			/bilateral femur with PRECICE 2/i.test(e?.description ?? ""),
			[`description: ${e?.description}`]
		);
	} else {
		skip("V11 tier-name disclosure", "price anchor is not active, no dollar figure to qualify");
	}
	const stale = [e?.title, e?.description, e?.og_title, e?.og_description].filter((s) => /\$95k|\$95,500/.test(s ?? ""));
	check(
		"V11 no $95k or $95,500 anywhere in the pricing page metadata (defect D1)",
		stale.length === 0,
		stale
	);

	// ── V12: the sitewide priceRange floor must agree with what we advertise ──
	// REQ-13(a). V1 only catches the dash and V5 only checks that a figure is a
	// legitimate tier, so both pass on '$95,500 to $195,000' while the title
	// says "From $75,500". That is the original defect, undetected. This binds
	// the two: whatever dollar figure the LIVE title publishes must be the
	// floor the sitewide MedicalBusiness node declares.
	const range = schemaSrc.match(/'priceRange'\s*=>\s*'([^']*)'/)?.[1] ?? "";
	const floor = range.match(/\$[\d,]+/)?.[0] ?? "";
	const ceiling = range.match(/\$[\d,]+(?!.*\$[\d,]+)/)?.[0] ?? "";
	const anchorFigure = (e?.title ?? "").match(/\$[\d,]+/)?.[0] ?? "";
	const tiers = [...tierPrices].map((t) => Number(t.replace(/[$,]/g, "")));
	const lowestTier = `$${Math.min(...tiers).toLocaleString("en-US")}`;
	const highestTier = `$${Math.max(...tiers).toLocaleString("en-US")}`;
	if (anchorFigure) {
		check(
			`V12 schema priceRange floor equals the advertised anchor (${anchorFigure})`,
			floor === anchorFigure,
			floor === anchorFigure ? [] : [
				`priceRange: '${range}'  floor=${floor || "none"}`,
				`live title advertises: ${anchorFigure}`,
				"The sitewide MedicalBusiness node would contradict the SERP listing.",
			]
		);
	} else {
		// No price advertised, so nothing to contradict. The floor must still
		// be the real cheapest tier, or the site understates or overstates its
		// own entry price to every crawler on every page.
		check(
			`V12 schema priceRange floor equals the cheapest tier (${lowestTier})`,
			floor === lowestTier,
			floor === lowestTier ? [] : [`priceRange: '${range}'  floor=${floor || "none"}  expected ${lowestTier}`]
		);
	}
	check(
		`V12 schema priceRange ceiling equals the most expensive tier (${highestTier})`,
		ceiling === highestTier,
		ceiling === highestTier ? [] : [`priceRange: '${range}'  ceiling=${ceiling || "none"}  expected ${highestTier}`]
	);
}

// ── V14: the two hardcoded price lists must agree ──────────────────────────
// Every tier price exists twice: data/pricing.php (the ItemList) and the
// $packages array in schema.php pll_seo_pricing_procedures() (the per-procedure
// Offers). Both render into the SAME page. They drifted on the combined
// PRECICE 2 tier and production published price 175000 in JSON-LD while the
// visible card on that page read $150,000, for weeks, with every other check
// green — because V5 and V12 both read the tier list and so agreed with
// themselves. This is the check that compares the two sources to each other.
{
	const tierNums = new Set([...tierPrices].map((t) => t.replace(/[$,]/g, "")));
	const offerNums = new Set(
		[...schemaSrc.matchAll(/'price'\s*=>\s*'(\d+)'/g)].map((m) => m[1])
	);
	const missingOffer = [...tierNums].filter((p) => !offerNums.has(p));
	const orphanOffer = [...offerNums].filter((p) => !tierNums.has(p));
	const fmt = (p) => `$${Number(p).toLocaleString("en-US")}`;
	check(
		`V14 schema.php Offer prices match the ${tierNums.size} tiers in data/pricing.php`,
		missingOffer.length === 0 && orphanOffer.length === 0,
		[
			...missingOffer.map((p) => `${fmt(p)} is a tier but has no MedicalProcedure Offer`),
			...orphanOffer.map((p) => `${fmt(p)} is offered as a MedicalProcedure but is not a tier`),
			...(missingOffer.length || orphanOffer.length
				? ["Both lists render on /limb-lengthening-pricing-options/. Fix whichever is wrong, in both files."]
				: []),
		]
	);
}

// ── V15: no live title says the head term twice ────────────────────────────
// titles.php appends ' · Premier Limb Lengthening' to every page, and the brand
// name contains the head term, so any title that already says "limb lengthening"
// says it twice. 31 of 43 indexed pages did, three said it three times, and 32
// ran past the ~65-character SERP cutoff — spending the truncation budget on a
// brand that drew 17 impressions in 90 days. V3 only guards the map's own
// strings; nothing looked at the assembled title, which is where the repetition
// actually happens. Crawls the real sitemap so new pages are covered
// automatically rather than against a list that goes stale.
{
	if (!LIVE_BASE) {
		skip(
			"V15 live titles do not repeat the head term",
			"needs PLL_VERIFY_LIVE=1 or PLL_BASE. The title is assembled in PHP at render time, so only rendered HTML can prove it."
		);
	} else {
		const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
		let urls = [];
		try {
			const index = await fetchLive(new URL("/sitemap.xml", LIVE_BASE).href);
			const children = locs(index);
			// A sitemap index points at sub-sitemaps; a flat sitemap points at pages.
			urls = children.some((u) => /sitemap.*\.xml$/i.test(u))
				? (await Promise.all(children.map((c) => fetchLive(c).then(locs).catch(() => [])))).flat()
				: children;
		} catch (err) {
			check("V15 live titles do not repeat the head term", false, [`sitemap fetch failed: ${err.message}`]);
			urls = [];
		}

		if (urls.length) {
			// Bounded concurrency: polite to the origin, and the WAF throttles bursts.
			const titles = [];
			const queue = [...urls];
			await Promise.all(
				Array.from({ length: 6 }, async () => {
					for (let u = queue.shift(); u; u = queue.shift()) {
						try {
							const html = await fetchLive(u);
							titles.push([u, decodeEntities(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "")]);
						} catch {
							titles.push([u, null]);
						}
					}
				})
			);

			const unreachable = titles.filter(([, t]) => t === null).map(([u]) => `${u}: unreachable`);
			const reached = titles.filter(([, t]) => t !== null);
			check(`V15 crawled every sitemap URL (${reached.length}/${urls.length})`, unreachable.length === 0, unreachable);

			const headTerm = /(limb|leg) lengthening/gi;
			const repeated = reached
				.filter(([, t]) => (t.match(headTerm) || []).length > 1)
				.map(([u, t]) => `${(t.match(headTerm) || []).length}×  ${t}\n      ${u}`);
			check(
				`V15 no live title says "limb lengthening" more than once (${reached.length} pages)`,
				repeated.length === 0,
				repeated.length ? [...repeated, "titles.php appends the brand suffix unconditionally. Make it conditional."] : []
			);

			const segmented = reached.filter(([, t]) => t.includes("· Your Surgery")).map(([u, t]) => `${t}\n      ${u}`);
			check(
				"V15 no live title carries the '· Your Surgery' segment",
				segmented.length === 0,
				segmented.length ? [...segmented, "42 characters of suffix before the title starts, on the site's highest-impression sub-pages."] : []
			);

			// Regression guard for the suffix change above: '· Your Surgery' and
			// '· Premier Limb Lengthening' were disambiguating some titles for
			// free. Dropping them must not leave two pages competing under one
			// title. Asserted before the change so a collision it introduces is
			// visible as a change in this result, not as a mystery later.
			const byTitle = new Map();
			for (const [u, t] of reached) byTitle.set(t, [...(byTitle.get(t) ?? []), u]);
			const collisions = [...byTitle.entries()]
				.filter(([, us]) => us.length > 1)
				.map(([t, us]) => `"${t}"\n      ${us.join("\n      ")}`);
			check(
				"V15 no two live pages share a title",
				collisions.length === 0,
				collisions
			);
		}
	}
}

// ── summary ────────────────────────────────────────────────────────────────
const errors = results.filter(([, st, sev]) => st === "fail" && sev === "error");
const warnings = results.filter(([, st, sev]) => st === "fail" && sev === "warn");
const skipped = results.filter(([, st]) => st === "skip");
const actions = results.filter(([, st]) => st === "action");
const passed = results.filter(([, st]) => st === "pass");
const ran = passed.length + errors.length + warnings.length;
const n = (c, w) => `${c} ${w}${c === 1 ? "" : "s"}`;
console.log(
	`\n${passed.length}/${ran} checks passed` +
		`  (${n(errors.length, "error")}, ${n(warnings.length, "warning")}` +
		`, ${skipped.length} skipped, ${actions.length} action-required)`
);
if (skipped.length) console.log(`  skipped: ${skipped.map(([nm]) => nm.split(" ")[0]).join(", ")}  — did NOT run, not counted as passes`);
if (actions.length) {
	console.log("  ⚑ manual steps outstanding:");
	for (const [nm] of actions) console.log(`      ${nm}`);
}
process.exit(errors.length ? 1 : 0);
