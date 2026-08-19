/**
 * verify-paa — regression guard for the "Patients Also Ask" contract on the six
 * pages named in PLL_Content_Schema_Package.docx.
 *
 * The visible blocks and the FAQPage JSON-LD were already live when this guard
 * was written. What was NOT true, and what this file exists to keep true, is:
 *
 *   P1  every PAA question is a real <h3> wrapping its toggle button, not a
 *       bare <span>. Zero of nineteen were, so the questions were invisible to
 *       outline parsers and to screen-reader heading navigation.
 *   P2  the visible answer text and the FAQPage JSON-LD are identical by
 *       codepoint. They were not: post_content is texturized on render and the
 *       schema was built straight off the PHP array, so
 *       /is-leg-lengthening-off-limits-for-athletes/ published individual’s in
 *       its copy and individual's in its structured data.
 *   P3  the section title stays an <h2> reading "Patients also ask.", one level
 *       above the questions, so the document outline is valid on all six.
 *   P4  aria-expanded is present in the SERVER HTML. WordPress strips a bound
 *       attribute whose expression cannot be resolved server-side, and
 *       state.isOpen was a JS-only getter, so every accordion on the site
 *       shipped with no exposed expanded state until hydration.
 *   P5  the section renders on one measure on all six pages. Five nest it in
 *       the 8-column reading well, one renders it full bleed.
 *   P6  the brand copy rules hold: no em dashes, no en dashes, no semicolons.
 *   P7  the section appears on exactly those six paths and nowhere else. It
 *       must NOT be on the two pillar pages, which carry their own FAQ.
 *
 * Static checks parse the source files and need no network and no WordPress.
 * The rendered checks need an origin and are OPT-IN, because the assertions
 * they make can only be answered by real HTML:
 *
 *   node scripts/verify-paa.mjs                        static only
 *   PLL_BASE=http://127.0.0.1:9400 node scripts/verify-paa.mjs    local dev
 *   PLL_VERIFY_LIVE=1 node scripts/verify-paa.mjs      production
 *
 * Four outcome classes, same contract as verify-seo-meta.mjs: pass, fail, SKIP
 * (did not run, never counted as a pass) and ACTION REQUIRED. Exit code is
 * non-zero if any error-severity check failed.
 */
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEO = path.join(ROOT, "wp-content/plugins/pll-seo");
const THEME = path.join(ROOT, "wp-content/themes/pll-editorial");

// The six paths, and the question count each one owns. Straight from the docx
// ("6 PAGES | 3-4 Q&A EACH"). Nineteen questions in total.
const EXPECTED = {
	"/your-surgery/how-much-taller-can-i-get-with-limb-lengthening/": 4,
	"/limb-lengthening-pricing-options/": 3,
	"/limb-lengthening-what-you-gain-what-you-risk/": 3,
	"/is-leg-lengthening-off-limits-for-athletes/": 3,
	"/limb-lengthening-pain-the-truth/": 3,
	"/is-limb-lengthening-covered-by-insurance/": 3,
};
const PAA_PATHS = Object.keys(EXPECTED);
const TOTAL_QUESTIONS = Object.values(EXPECTED).reduce((a, b) => a + b, 0);

// Pages that share the pll/faq renderer but must NEVER carry a PAA section.
// The pillars have their own page-specific Q&A; the docx does not name them.
const MUST_NOT_HAVE_PAA = [
	"/",
	"/height-surgery/",
	"/leg-lengthening-surgery/",
	"/evaluate-your-surgeon/",
];

const SECTION_TITLE = "Patients also ask.";

// The locked-copy snapshot. data/paa.php is the source of truth for the words;
// this file is the tripwire that says nobody changed them by accident.
//
// Everything else in the static section is STRUCTURAL: counts, path keys, the
// presence of wptexturize(), the <h3> wrapper, the CSS selectors. None of it
// ties the Q&A text to anything, so before this lock existed a static run
// scored 26/26 with an answer rewritten. That is the wrong failure mode for
// copy that is mapped to real GSC impression volume, clinically reviewed, and
// published on a medical site.
//
// Hashes, not prose, on purpose: a second copy of the text could be "fixed" to
// match a bad edit without anyone noticing. A hash mismatch cannot be resolved
// by editing prose, only by deliberately regenerating the lock, which shows up
// in review as a diff to this file.
//
// To change the copy on purpose: edit data/paa.php, then
//     node scripts/verify-paa.mjs --write-lock
// and put BOTH files in the same commit, with the sign-off in the message.
// SHA-256 over the 19 pairs, normalized: `path|q|a` in file order, joined with
// a newline, UTF-8. Amendment A1.4 requires this to live as a committed
// constant so that changing locked copy cannot be done without a deliberate,
// reviewable edit to THIS line.
const PAA_COPY_DIGEST = "e45e6baca47fdcee1eea6fa5c6e21c1acbfb1c88dcb5fa6bbf4c6b9067409ed0";
const digestOf = (parsed) =>
	sha256(
		Object.entries(parsed)
			.flatMap(([p, pairs]) => pairs.map((x) => `${p}|${x.q}|${x.a}`))
			.join("\n")
	);

const LOCK_PATH = path.join(ROOT, "scripts/paa-copy.lock.json");
const WRITE_LOCK = process.argv.includes("--write-lock");
const SELF_TEST = process.argv.includes("--self-test");
const sha256 = (t) => createHash("sha256").update(t, "utf8").digest("hex");

/** The lock shape for one parsed PAA map. */
const lockOf = (parsed) => {
	const paths = {};
	for (const [p, pairs] of Object.entries(parsed)) {
		paths[p] = pairs.map((x) => ({
			q: x.q,
			q_sha256: sha256(x.q),
			a_sha256: sha256(x.a),
			a_chars: [...x.a].length,
		}));
	}
	return {
		paths,
		totals: { paths: Object.keys(paths).length, pairs: Object.values(paths).reduce((n, v) => n + v.length, 0) },
	};
};

// ── reporting ──────────────────────────────────────────────────────────────
const results = [];
const check = (name, cond, detail = []) => {
	results.push([name, cond ? "pass" : "fail", "error"]);
	console.log(`${cond ? "✓" : "✗"} ${name}`);
	for (const d of detail) console.log(`    ${d}`);
};
const skip = (name, why) => {
	results.push([name, "skip", "skip"]);
	console.log(`- ${name}  SKIPPED: ${why}`);
};
const action = (name, detail = []) => {
	results.push([name, "action", "action"]);
	console.log(`⚑ ACTION REQUIRED: ${name}`);
	for (const d of detail) console.log(`    ${d}`);
};

// ── PHP string reader ──────────────────────────────────────────────────────
// Enough to pull the q/a pairs out of data/paa.php. Single-quoted PHP only,
// which is all that file uses, and it decodes \' and \\ the way PHP does.
function readPhpString(src, i) {
	const q = src[i];
	let v = "";
	i += 1;
	while (i < src.length && src[i] !== q) {
		if (src[i] === "\\") {
			const n = src[i + 1];
			v += n === q || n === "\\" ? n : "\\" + n;
			i += 2;
			continue;
		}
		v += src[i];
		i += 1;
	}
	return [v, i + 1];
}

/** Parse pll_seo_paa_all() into { path: [{q, a}, …] } in source order. */
function parsePaa(src) {
	const out = {};
	// Keys are the only single-quoted strings that start with a slash and are
	// immediately followed by =>, which the q/a values never are.
	const keyRe = /'(\/[^']*\/)'\s*=>/g;
	const keys = [...src.matchAll(keyRe)];
	for (let k = 0; k < keys.length; k += 1) {
		const from = keys[k].index + keys[k][0].length;
		const to = k + 1 < keys.length ? keys[k + 1].index : src.length;
		const chunk = src.slice(from, to);
		const pairs = [];
		const fieldRe = /'(q|a)'\s*=>\s*'/g;
		let m;
		while ((m = fieldRe.exec(chunk))) {
			const [value] = readPhpString(chunk, m.index + m[0].length - 1);
			if (m[1] === "q") pairs.push({ q: value, a: "" });
			else if (pairs.length) pairs[pairs.length - 1].a = value;
		}
		out[keys[k][1]] = pairs;
	}
	return out;
}

// ── --self-test: prove the guard actually fails on a copy edit ────────────
// AC-13 requires this guard to exit 0 clean AND non-zero on a corrupted answer,
// for the SAME invocation. Doing that by hand means editing locked clinical
// copy on disk, running, and remembering to put it back. That went wrong once
// already: a corruption marker sat in data/paa.php for ~20 minutes and was
// still there when the next reader picked the tree up, while MIGRATION section
// 6g tells a deployer to ship that exact file FROM DISK.
//
// So the mutation is never a manual step. This mode writes the file, runs a
// child process, and restores the original bytes in a finally, including on
// SIGINT. The original is captured in memory before anything is written.
if (SELF_TEST) {
	const { spawnSync } = await import("node:child_process");
	const target = path.join(SEO, "includes/data/paa.php");
	const original = await readFile(target, "utf8");
	let restored = false;
	const restore = () => {
		if (restored) return;
		restored = true;
		// Synchronous on purpose: this must also work from a signal handler.
		writeFileSync(target, original, "utf8");
	};
	process.on("SIGINT", () => { restore(); process.exit(130); });
	process.on("SIGTERM", () => { restore(); process.exit(143); });
	let ok = false;
	let childOut = "";
	try {
		const marker = "PLL SELF TEST MUTATION ";
		const mutated = original.replace(
			"'a' => 'The surgery itself is performed under general anesthesia,",
			"'a' => '" + marker + "The surgery itself is performed under general anesthesia,"
		);
		if (mutated === original) throw new Error("self-test could not find the answer it mutates");
		await writeFile(target, mutated, "utf8");
		const r = spawnSync(process.execPath, [path.join(ROOT, "scripts/verify-paa.mjs")], { encoding: "utf8" });
		childOut = `${r.stdout ?? ""}${r.stderr ?? ""}`;
		ok = r.status !== 0;
	} finally {
		restore();
	}
	const after = await readFile(target, "utf8");
	const clean = after === original;
	console.log("── verify-paa --self-test ─────────────────────────────────────");
	const failLine = childOut.split("\n").find((l) => l.startsWith("✗")) ?? "(no failing check reported)";
	console.log(`${ok ? "✓" : "✗"} a mutated answer makes the STATIC run exit non-zero`);
	console.log(`    ${failLine.trim()}`);
	console.log(`${clean ? "✓" : "✗"} data/paa.php restored byte-for-byte`);
	if (!clean) console.error("    RESTORE FAILED. Run: git checkout -- wp-content/plugins/pll-seo/includes/data/paa.php");
	process.exit(ok && clean ? 0 : 1);
}

// ── read the sources ───────────────────────────────────────────────────────
const [paaSrc, schemaSrc, pluginSrc, setupSrc, itemSrcRender, itemBuildRender, faqSrcRender, faqBuildRender, cssSrc, cssBuilt] =
	await Promise.all([
		readFile(path.join(SEO, "includes/data/paa.php"), "utf8"),
		readFile(path.join(SEO, "includes/schema.php"), "utf8"),
		readFile(path.join(SEO, "pll-seo.php"), "utf8"),
		readFile(path.join(ROOT, "content/setup.php"), "utf8"),
		readFile(path.join(THEME, "src/blocks/faq-item/render.php"), "utf8"),
		readFile(path.join(THEME, "build/faq-item/render.php"), "utf8"),
		readFile(path.join(THEME, "src/blocks/faq/render.php"), "utf8"),
		readFile(path.join(THEME, "build/faq/render.php"), "utf8"),
		readFile(path.join(THEME, "src/css/tailwind.css"), "utf8"),
		readFile(path.join(THEME, "assets/css/pll.css"), "utf8"),
	]);

const paa = parsePaa(paaSrc);

console.log("── PAA content contract ───────────────────────────────────────");
console.log(`   ${Object.keys(paa).length} paths, ${Object.values(paa).reduce((a, v) => a + v.length, 0)} questions in data/paa.php`);

// ── S1: the data file covers exactly the six paths, with the right counts ──
{
	const got = Object.keys(paa).sort();
	const want = [...PAA_PATHS].sort();
	check(
		"S1 data/paa.php defines exactly the six ticket paths",
		JSON.stringify(got) === JSON.stringify(want),
		got.filter((p) => !want.includes(p)).map((p) => `unexpected: ${p}`)
			.concat(want.filter((p) => !got.includes(p)).map((p) => `missing: ${p}`))
	);
	const wrong = PAA_PATHS
		.filter((p) => (paa[p]?.length ?? 0) !== EXPECTED[p])
		.map((p) => `${p}  expected ${EXPECTED[p]}, got ${paa[p]?.length ?? 0}`);
	check(`S1 question counts are 4/3/3/3/3/3 (${TOTAL_QUESTIONS} total)`, wrong.length === 0, wrong);
	const empty = PAA_PATHS.flatMap((p) =>
		(paa[p] ?? []).filter((x) => !x.q.trim() || !x.a.trim()).map((x) => `${p}  q="${x.q.slice(0, 40)}" a="${x.a.slice(0, 40)}"`)
	);
	check("S1 every question has a non-empty answer", empty.length === 0, empty);
}

// ── S8: the locked copy has not drifted (no network) ──────────────────────
// This is the check that makes `node scripts/verify-paa.mjs` alone able to
// catch a copy edit. Before it, only the RENDERED comparison (R6) could, and
// that needs a live origin whose seeded post_content still holds the original
// text. A future agent editing data/paa.php on a laptop got a green run.
{
	// The single committed digest (A1.4). The per-pair lock below exists to
	// NAME what changed; this is the tripwire that says something did.
	const actualDigest = digestOf(paa);
	check(
		`S8 locked-copy digest matches (${PAA_COPY_DIGEST.slice(0, 12)}…)`,
		actualDigest === PAA_COPY_DIGEST,
		actualDigest === PAA_COPY_DIGEST ? [] : [
			`expected: ${PAA_COPY_DIGEST}`,
			`actual  : ${actualDigest}`,
			"The locked Q&A copy in data/paa.php changed. It is mapped to real GSC",
			"impression volume and clinically reviewed, so this is a stop, not a nit.",
			"If the change is intentional AND signed off: update PAA_COPY_DIGEST in",
			"this file and run `node scripts/verify-paa.mjs --write-lock`, in one commit.",
		]
	);

	const current = lockOf(paa);
	if (WRITE_LOCK) {
		await writeFile(LOCK_PATH, JSON.stringify(current, null, "\t") + "\n", "utf8");
		console.log(`⚑ REGENERATED ${path.relative(ROOT, LOCK_PATH)} from data/paa.php`);
		console.log("    Commit it together with the copy change and name the sign-off in the message.");
	}
	let locked = null;
	try {
		locked = JSON.parse(await readFile(LOCK_PATH, "utf8"));
	} catch {
		// fall through: reported as a failure below
	}
	check(
		"S8 the locked-copy snapshot exists",
		!!locked,
		locked ? [] : [`missing or unreadable: ${path.relative(ROOT, LOCK_PATH)}`, "Regenerate with: node scripts/verify-paa.mjs --write-lock"]
	);
	if (locked) {
		const drift = [];
		const allPaths = new Set([...Object.keys(locked.paths ?? {}), ...Object.keys(current.paths)]);
		for (const p of allPaths) {
			const was = locked.paths?.[p];
			const now = current.paths[p];
			if (!was) { drift.push(`${p}: not in the lock (new path)`); continue; }
			if (!now) { drift.push(`${p}: in the lock but gone from data/paa.php`); continue; }
			if (was.length !== now.length) { drift.push(`${p}: ${was.length} pairs locked, ${now.length} now`); continue; }
			for (let i = 0; i < now.length; i += 1) {
				if (was[i].q_sha256 !== now[i].q_sha256) {
					drift.push(`${p} Q${i + 1} CHANGED\n      locked: ${was[i].q}\n      now   : ${now[i].q}`);
				}
				if (was[i].a_sha256 !== now[i].a_sha256) {
					drift.push(
						`${p} A${i + 1} CHANGED (${was[i].a_chars} chars locked, ${now[i].a_chars} now)\n` +
						`      question: ${now[i].q}`
					);
				}
			}
		}
		check(
			`S8 all ${current.totals.pairs} question/answer pairs match the locked copy`,
			drift.length === 0,
			drift.length
				? [...drift, "", "This copy is mapped to real GSC impression volume and is clinically reviewed.", "If the change is intentional and signed off: node scripts/verify-paa.mjs --write-lock"]
				: []
		);
		check(
			"S8 the lock still covers 6 paths and 19 pairs",
			locked.totals?.paths === 6 && locked.totals?.pairs === 19,
			[`lock totals: ${JSON.stringify(locked.totals)}`]
		);
	}
}

// ── S2: the plugin actually loads the data file ────────────────────────────
// This is the defect that made a clean checkout fatal: schema.php called
// pll_seo_paa() on ~20 URLs while data/paa.php was neither included nor even
// tracked, and the file_exists() guard swallowed it silently.
{
	check("S2 pll-seo.php includes data/paa", /'data\/paa'/.test(pluginSrc));
	check("S2 data/paa.php defines pll_seo_paa() and pll_seo_paa_all()",
		/function\s+pll_seo_paa_all\s*\(/.test(paaSrc) && /function\s+pll_seo_paa\s*\(/.test(paaSrc));
}

// ── S3: the schema builder texturizes both fields (P2) ─────────────────────
// The visible copy is post_content and the_content runs wptexturize() on every
// request. The schema is built off the raw PHP array. Unless the builder
// texturizes too, any apostrophe in the copy is a published schema mismatch.
{
	const fn = schemaSrc.slice(schemaSrc.indexOf("function pll_seo_faqpage_from"));
	const body = fn.slice(0, fn.indexOf("\n}"));
	check(
		"S3 pll_seo_faqpage_from() texturizes the question",
		/wptexturize\(\s*\$faq\['q'\]\s*\)/.test(body),
		["Without it, a straight apostrophe in data/paa.php ships as a schema/copy divergence."]
	);
	check(
		"S3 pll_seo_faqpage_from() texturizes the answer",
		/wptexturize\(\s*\$faq\['a'\]\s*\)/.test(body)
	);
	// The three call sites must all be guarded, or a missing key publishes an
	// empty FAQPage instead of no FAQPage.
	check(
		"S3 no unguarded pll_seo_faqpage_from( pll_seo_paa( … ) ) call site",
		!/pll_seo_faqpage_from\(\s*pll_seo_paa\(/.test(schemaSrc),
		["An unguarded call emits mainEntity: [] when the path key goes missing."]
	);
}

// ── S4: the renderer wraps the question in a heading, and keeps aria (P1/P4) ─
{
	for (const [label, src] of [["src", itemSrcRender], ["build", itemBuildRender]]) {
		check(
			`S4 faq-item/render.php (${label}) wraps the toggle button in <h3 class="pll-faq-q">`,
			/<h3\s+class="pll-faq-q">\s*<button/.test(src)
		);
		check(
			`S4 faq-item/render.php (${label}) keeps a server-rendered aria-expanded default`,
			/aria-expanded="false"/.test(src)
		);
		check(
			`S4 faq-item/render.php (${label}) does not emit h2 or h4 for the question`,
			!/<h2|<h4/.test(src)
		);
	}
	check(
		"S4 src/ and build/ copies of faq-item/render.php are identical",
		itemSrcRender.replace(/\r\n/g, "\n") === itemBuildRender.replace(/\r\n/g, "\n"),
		["build/ is what WordPress serves. Regenerate with npm run build:blocks, never hand-edit."]
	);
	// P4: the bound attribute is only kept by the server-side directive
	// processor if state.isOpen resolves in PHP too.
	check(
		"S4 faq/render.php registers the pll/faq isOpen state in PHP (aria-expanded survives)",
		/wp_interactivity_state\(\s*\n?\s*'pll\/faq'/.test(faqSrcRender) && /isOpen/.test(faqSrcRender),
		["Without PHP-side derived state the directive processor evaluates state.isOpen to null and REMOVES aria-expanded."]
	);
	check(
		"S4 src/ and build/ copies of faq/render.php are identical",
		faqSrcRender.replace(/\r\n/g, "\n") === faqBuildRender.replace(/\r\n/g, "\n")
	);
}

// ── S5: the CSS reset and the section normalization exist, compiled (P5) ───
// Both halves matter. .pll-prose h3 is 24px with a 32px top margin and would
// otherwise land on the new <h3> and blow the accordion apart on the five
// in-article pages, which is a visible regression on live URLs.
{
	for (const [label, css] of [["src", cssSrc], ["compiled", cssBuilt]]) {
		check(
			`S5 (${label}) .pll-faq .pll-faq-q resets the prose heading spec`,
			/\.pll-faq\s+\.pll-faq-q\s*\{/.test(css)
		);
		check(
			`S5 (${label}) #patients-also-ask drops the no-op background and the stray border-top`,
			/#patients-also-ask\s*\{[^}]*border-top:\s*0/.test(css.replace(/\s*\n\s*/g, " "))
		);
		check(
			`S5 (${label}) .pll-prose #patients-also-ask h2 restores the section-title clamp`,
			/\.pll-prose\s+#patients-also-ask\s+h2\s*\{/.test(css)
		);
	}
}

// ── S6: the seeder stays idempotent (AC-9's static half) ───────────────────
// The marker guard is the only thing standing between a re-seed and six pages
// with two PAA sections each.
{
	check(
		"S6 setup.php still guards the PAA injection on the patients-also-ask marker",
		/false === strpos\(\s*\$content,\s*'patients-also-ask'\s*\)/.test(setupSrc),
		["Removing this guard duplicates the section on every re-seed."]
	);
	check(
		"S6 the seeded section title is still level 2 and reads \"Patients also ask.\"",
		/"level":2/.test(setupSrc) && /Patients also <em class="italic text-spine">ask\.<\/em>/.test(setupSrc)
	);
}

// ── S7: brand copy rules in the source copy (P6) ───────────────────────────
{
	const offenders = [];
	for (const p of PAA_PATHS) {
		for (const { q, a } of paa[p] ?? []) {
			for (const [label, s] of [["q", q], ["a", a]]) {
				if (s.includes("—")) offenders.push(`${p} ${label}: em dash`);
				if (s.includes("–")) offenders.push(`${p} ${label}: en dash`);
				if (s.includes(";")) offenders.push(`${p} ${label}: semicolon`);
			}
		}
	}
	check("S7 no em dash, en dash or semicolon in any PAA question or answer", offenders.length === 0, offenders);
}

// ── rendered checks ────────────────────────────────────────────────────────
const LIVE_BASE = process.env.PLL_BASE || (process.env.PLL_VERIFY_LIVE ? "https://premierlimblengthening.com" : "");

// Two reasons this is Playwright's request context and not node's fetch.
// Production sits behind a WAF that 403s unrecognized user agents, and node
// sends `User-Agent: node` (verify-seo-meta.mjs learned that the hard way and
// scored a WAF block page as a result). The local Playground fronts the first
// request with an auto-login cookie redirect, which a cookie-less client
// follows in a loop forever. A browser request context fixes both: it carries
// a real UA and it keeps a cookie jar across requests.
const LIVE_UA =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
let httpCtx = null;
async function fetchHtml(url) {
	if (!httpCtx) {
		const { request } = await import("playwright");
		httpCtx = await request.newContext({
			extraHTTPHeaders: { "user-agent": LIVE_UA, accept: "text/html,application/xhtml+xml" },
		});
	}
	const r = await httpCtx.get(url, { timeout: 60000 });
	if (r.status() !== 200) throw new Error(`HTTP ${r.status()}`);
	return r.text();
}

// Entity decoding, then whitespace collapse. Deliberately does NOT fold
// apostrophes: telling ' from ’ is the entire point of the AC-5 comparison.
const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”" };
const decode = (s) =>
	s
		.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
		.replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
		.replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m);
const textOf = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** The <section id="patients-also-ask"> … </section> slice, or "". */
function paaSection(html) {
	const start = html.search(/<section[^>]*\bid="patients-also-ask"/);
	if (start < 0) return "";
	// Nested <section> is not used inside the block, so the next </section>
	// closes it. Fall back to the rest of the document if it is unclosed.
	const end = html.indexOf("</section>", start);
	return end < 0 ? html.slice(start) : html.slice(start, end + 10);
}

/** All heading tags in document order, as { level, html, at }. */
const headings = (html) =>
	[...html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({ level: Number(m[1][1]), html: m[2], at: m.index }));

/** The FAQPage node out of every ld+json block on the page. */
function faqPageOf(html) {
	for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
		let data;
		try {
			data = JSON.parse(decode(m[1].trim()));
		} catch {
			continue;
		}
		const nodes = Array.isArray(data) ? data : data["@graph"] ?? [data];
		for (const n of nodes) if (n && n["@type"] === "FAQPage") return n;
	}
	return null;
}

if (!LIVE_BASE) {
	// A1.4 item 2: name every blind spot out loud. One lumped skip line let a
	// static-only pass read as full coverage, which is exactly how "26/26
	// passed" was reported for a tree with a rewritten answer. Static mode can
	// never do these, and saying so per check is the honest form of that.
	const why = "needs a rendered origin: PLL_BASE=http://127.0.0.1:9400 for local dev, or PLL_VERIFY_LIVE=1 for production";
	skip("R1 the section renders exactly once per page", why);
	skip("R2 every question is an <h3> wrapping its toggle button", why);
	skip("R3 the section title renders as <h2> \"Patients also ask.\"", why);
	skip("R4 document heading order is valid on the six", why);
	skip("R5 aria-expanded is present in the server HTML on all 19 toggles", why);
	skip(
		"R6 visible answer text matches the FAQPage JSON-LD by codepoint",
		why + ". This is the ONE thing static mode structurally cannot check: there is no rendered page and no wp_head. S8 guards the source copy against edits, but only a rendered origin can prove the published text and the published schema agree"
	);
	skip("R7 rendered PAA copy and schema carry no em dash, en dash or semicolon", why);
	skip("R8 no PAA section on the homepage, the pillars or /evaluate-your-surgeon/", why);
	skip("R9 the shared pll/faq accordions did not regress, heading order included", why);
	skip("R10 sitemap crawl: PAA appears on exactly the six ticket paths", why);
} else {
	console.log(`\n── rendered, against ${LIVE_BASE} ─────────────────────────────`);

	// A local Playground serves HTTP while the WXR import and setup.php are
	// still running, so a page fetched too early is a half-seeded page and
	// every assertion below reads as a code failure. Poll the first target
	// until its PAA section actually exists. On production the first poll
	// satisfies this immediately.
	for (let i = 0; i < 60; i += 1) {
		try {
			const probe = await fetchHtml(new URL(PAA_PATHS[0], LIVE_BASE).href);
			if (probe.includes('id="patients-also-ask"')) break;
		} catch {}
		await new Promise((r) => setTimeout(r, 3000));
	}

	const footerNotes = [];
	const pages = new Map();
	for (const p of [...PAA_PATHS, ...MUST_NOT_HAVE_PAA]) {
		try {
			pages.set(p, await fetchHtml(new URL(p, LIVE_BASE).href));
		} catch (err) {
			check(`fetch ${p}`, false, [err.message]);
		}
	}

	for (const p of PAA_PATHS) {
		const html = pages.get(p);
		if (!html) continue;
		const section = paaSection(html);
		if (!section) {
			check(`R1 ${p} renders a #patients-also-ask section`, false);
			continue;
		}

		// R1 — the section exists exactly once.
		const occurrences = (html.match(/id="patients-also-ask"/g) ?? []).length;
		check(`R1 ${p} carries exactly one PAA section (got ${occurrences})`, occurrences === 1);

		// R2 — every question is an <h3> wrapping a <button>, none are spans.
		const h3Buttons = (section.match(/<h3[^>]*>\s*<button/gi) ?? []).length;
		const buttons = (section.match(/<button/gi) ?? []).length;
		check(
			`R2 ${p} all ${EXPECTED[p]} questions are <h3><button> (got ${h3Buttons} of ${buttons} toggles)`,
			h3Buttons === EXPECTED[p] && buttons === EXPECTED[p]
		);
		check(
			`R2 ${p} no question is an h4 or an h2 inside the accordion`,
			!/<h4/i.test(section) && (section.match(/<h2/gi) ?? []).length === 1
		);

		// R3 — the section title is an h2 and the copy is untouched.
		const sectionHeadings = headings(section);
		const first = sectionHeadings[0] ?? { level: 0, html: "" };
		const titleOk = first.level === 2 && textOf(first.html) === SECTION_TITLE;
		check(
			`R3 ${p} section title is <h2> reading "${SECTION_TITLE}"`,
			titleOk,
			titleOk ? [] : [`got h${first.level}: "${textOf(first.html)}"`]
		);
		check(
			`R3 ${p} the title keeps the italic spine accent`,
			/<em class="italic text-spine">ask\.<\/em>/.test(section)
		);

		// R4 — document outline: one h1, no skipped level, PAA h3s under the h2.
		// The site footer's column headings are <h4> under an <h2>, a
		// pre-existing site-wide outline defect on every route, this section
		// included. It is a real bug and it is not this ticket's: asserting it
		// here would bake a permanent failure into the guard. The content
		// region is what this ticket owns, so that is what is asserted, and
		// the footer is reported on its own line below.
		const footerAt = html.search(/<footer/i);
		const doc = headings(footerAt > 0 ? html.slice(0, footerAt) : html);
		const levels = doc.map((h) => h.level);
		const h1s = levels.filter((l) => l === 1).length;
		check(`R4 ${p} has exactly one <h1> (got ${h1s})`, h1s === 1);
		const jumps = [];
		for (let i = 1; i < levels.length; i += 1) {
			if (levels[i] > levels[i - 1] + 1) {
				jumps.push(`h${levels[i - 1]} → h${levels[i]}: "${textOf(doc[i].html).slice(0, 60)}"`);
			}
		}
		check(`R4 ${p} no skipped heading level anywhere in the content region`, jumps.length === 0, jumps);
		const footerJumps = [];
		const foot = footerAt > 0 ? headings(html.slice(footerAt)) : [];
		let prev = doc.length ? doc[doc.length - 1].level : 0;
		for (const h of foot) {
			if (h.level > prev + 1) footerJumps.push(`h${prev} → h${h.level}: "${textOf(h.html).slice(0, 40)}"`);
			prev = h.level;
		}
		if (footerJumps.length) footerNotes.push(...footerJumps.map((j) => `${p}  ${j}`));
		const sectionAt = html.search(/<section[^>]*\bid="patients-also-ask"/);
		const h1At = doc.find((h) => h.level === 1)?.at ?? -1;
		const paaTitle = doc.find((h) => h.at > sectionAt);
		check(
			`R4 ${p} the PAA <h2> comes after the <h1>`,
			h1At >= 0 && !!paaTitle && paaTitle.level === 2 && paaTitle.at > h1At
		);
		const sectionLevels = sectionHeadings.map((h) => h.level);
		check(
			`R4 ${p} every PAA question <h3> follows the section <h2>`,
			sectionLevels[0] === 2 && sectionLevels.length === EXPECTED[p] + 1 && sectionLevels.slice(1).every((l) => l === 3)
		);

		// R5 — aria-expanded is in the server HTML on every toggle.
		const ariaCount = (section.match(/aria-expanded="(true|false)"/g) ?? []).length;
		check(
			`R5 ${p} all ${EXPECTED[p]} toggles carry aria-expanded in the raw HTML (got ${ariaCount})`,
			ariaCount === EXPECTED[p],
			ariaCount === EXPECTED[p] ? [] : ["The Interactivity API removes a bound attribute it cannot resolve server-side."]
		);
		check(
			`R5 ${p} exactly one toggle is expanded on load`,
			(section.match(/aria-expanded="true"/g) ?? []).length === 1
		);

		// R6 — visible text vs FAQPage JSON-LD, strict codepoint equality.
		// Questions and answers are read from the two containers the renderer
		// owns, in document order: the <h3> wrapper and the answer well inside
		// .pll-faq-panel. Splitting on the item wrapper instead would drag the
		// opening tag of the NEXT item into the previous answer.
		const questions = [...section.matchAll(/<h3 class="pll-faq-q">([\s\S]*?)<\/h3>/g)].map((m) =>
			// The button carries two aria-hidden spans, the counter and the +.
			textOf(m[1].replace(/<span[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/gi, ""))
		);
		const answers = [...section.matchAll(/<div class="pb-7 pl-\[44px\][^"]*">([\s\S]*?)<\/div>/g)].map((m) => textOf(m[1]));
		const rows = questions.map((q, i) => ({ q, a: answers[i] ?? "" }));
		const faqPage = faqPageOf(html);
		const schemaRows = (faqPage?.mainEntity ?? []).map((e) => ({
			q: (e?.name ?? "").replace(/\s+/g, " ").trim(),
			a: (e?.acceptedAnswer?.text ?? "").replace(/\s+/g, " ").trim(),
		}));
		check(`R6 ${p} emits a FAQPage with ${EXPECTED[p]} entries (got ${schemaRows.length})`, schemaRows.length === EXPECTED[p]);
		const mismatches = [];
		for (let i = 0; i < Math.max(rows.length, schemaRows.length); i += 1) {
			const v = rows[i] ?? { q: "", a: "" };
			const s = schemaRows[i] ?? { q: "", a: "" };
			if (v.q !== s.q) mismatches.push(`Q${i + 1}\n      visible: ${v.q}\n      schema : ${s.q}`);
			if (v.a !== s.a) mismatches.push(`A${i + 1}\n      visible: ${v.a}\n      schema : ${s.a}`);
		}
		check(
			`R6 ${p} visible copy and FAQPage JSON-LD are identical by codepoint`,
			mismatches.length === 0 && rows.length === EXPECTED[p],
			mismatches
		);

		// R7 — brand copy rules in what actually shipped, copy and schema alike.
		const rendered = textOf(section) + " " + schemaRows.map((r) => r.q + " " + r.a).join(" ");
		const bad = [];
		if (rendered.includes("—")) bad.push("em dash (U+2014)");
		if (rendered.includes("–")) bad.push("en dash (U+2013)");
		if (rendered.includes(";")) bad.push("semicolon");
		check(`R7 ${p} rendered PAA copy and schema carry no em dash, en dash or semicolon`, bad.length === 0, bad);
	}

	// R8 — nothing outside the six carries a PAA section.
	for (const p of MUST_NOT_HAVE_PAA) {
		const html = pages.get(p);
		if (!html) continue;
		check(`R8 ${p} carries no PAA section`, !/id="patients-also-ask"/.test(html));
	}

	// R9 — the shared renderer did not regress the other accordions.
	//
	// Two things this used to get wrong, both found in QA review.
	//
	// It skipped silently when a page had no pll/faq block, so
	// /evaluate-your-surgeon/ scored two passes on `0 === 0` and `7 >= 0`.
	// Neither assertion could ever fail there. A check that cannot fail is not
	// a check, so the page is now an explicit SKIP naming the reason.
	//
	// And it asserted only toggle and aria counts, never heading order, while
	// AC-11 requires "heading order is valid per AC-4" on these pages. That is
	// asserted here now, on the same content region AC-4 uses.
	for (const p of MUST_NOT_HAVE_PAA) {
		const html = pages.get(p);
		if (!html) continue;
		const items = (html.match(/class="pll-faq-item/g) ?? []).length;

		if (!/class="pll-faq /.test(html) || items === 0) {
			skip(
				`R9 ${p} shared pll/faq accordion assertions`,
				"this page renders no pll/faq-item blocks, so the renderer fix cannot reach it and every count-based assertion here would pass trivially"
			);
		} else {
			const toggles = (html.match(/<h3 class="pll-faq-q">\s*<button/g) ?? []).length;
			check(
				`R9 ${p} all ${items} shared-accordion questions are <h3> too (got ${toggles})`,
				toggles === items
			);
			const aria = (html.match(/aria-expanded="(true|false)"/g) ?? []).length;
			check(`R9 ${p} every accordion toggle carries aria-expanded (got ${aria} for ${items} items)`, aria >= items);
		}

		// AC-11's heading-order half, on the same content region as AC-4.
		const footerAt = html.search(/<footer/i);
		const docH = headings(footerAt > 0 ? html.slice(0, footerAt) : html);
		const lv = docH.map((h) => h.level);

		// AC-4's first clause, which R9 was omitting: exactly one <h1>.
		const h1s = lv.filter((l) => l === 1).length;
		check(`R9 ${p} has exactly one <h1> (got ${h1s})`, h1s === 1);

		const skips = [];
		for (let i = 1; i < lv.length; i += 1) {
			if (lv[i] > lv[i - 1] + 1) skips.push({ text: textOf(docH[i].html).slice(0, 50), jump: `h${lv[i - 1]} → h${lv[i]}` });
		}

		// The homepage concierge cards are a CONTENT-SHADOW defect, not a code
		// one, and the difference decides whether a deployer sees a red line at
		// rollback pressure over something no deploy can fix.
		//
		// patterns/home-concierge.php now emits <h3>. But pll_compose_patterns()
		// inlines pattern markup into post_content at seed time, so a seeded
		// site keeps the old <h4> until a human repeats the edit in the block
		// editor. A fresh install is already correct, which is why this passes
		// locally and fails against production.
		//
		// So: this exact signature is ACTION REQUIRED, the same class as the
		// footer. Everything else is still a hard failure, and the match is
		// narrow enough that a real regression cannot hide behind it.
		const SHADOWED = new Set([
			"Travel Coordination",
			"Recovery Accommodations",
			"PT Follow-Up Scheduling",
			"Dedicated Patient Coordinator",
			"Virtual Pre-Op Remote Follow-Up",
		]);
		const shadowed = p === "/" ? skips.filter((x) => x.jump === "h2 → h4" && SHADOWED.has(x.text)) : [];
		const real = skips.filter((x) => !shadowed.includes(x));

		check(
			`R9 ${p} content-region heading order is valid (AC-11 via AC-4)`,
			real.length === 0,
			real.map((x) => `${x.jump}: "${x.text}"`)
		);
		if (shadowed.length) {
			action(
				`homepage concierge cards still <h4> on this origin: block-editor pass needed`,
				[
					...shadowed.map((x) => `${x.jump}: "${x.text}"`),
					"",
					"NOT fixable by deploying code. patterns/home-concierge.php already emits",
					"<h3>, but pll_compose_patterns() inlined the old markup into post_content",
					"at seed time, so this origin keeps <h4> until someone repeats the change in",
					"the block editor. Same trap as MIGRATION.md section 6f.",
					"",
					"DO: wp-admin → Pages → Home → the 'Your surgery. Our concierge.' section →",
					"    each of the five card titles → change H4 to H3 → Update.",
					"    Verified visually identical: 0 computed-style and 0 geometry differences.",
					"DO NOT: PLL_SEED_FORCE. It recomposes Home and destroys owner edits,",
					"    including the FAQ cost answer that section 6f exists to protect.",
					"",
					"Optional. Nothing else in this release depends on it.",
				]
			);
		}
	}

	// R10 — the whole sitemap, so nothing outside the six ever grows a PAA
	// section by accident (a mis-keyed path in data/paa.php plus a re-seed is
	// all it would take).
	if (process.env.PLL_SKIP_CRAWL) {
		skip("R10 sitemap crawl: PAA appears on exactly the six paths", "PLL_SKIP_CRAWL is set");
	} else {
		const index = await fetchHtml(new URL("/wp-sitemap.xml", LIVE_BASE).href).catch(() => "");
		const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
		const urls = new Set();
		for (const sub of locs(index)) {
			const body = await fetchHtml(sub).catch(() => "");
			for (const u of locs(body)) urls.add(u);
		}
		const found = [];
		for (const u of urls) {
			const rel = new URL(u).pathname;
			const html = pages.get(rel) ?? (await fetchHtml(u).catch(() => ""));
			if (html.includes('id="patients-also-ask"')) found.push(rel);
		}
		const want = [...PAA_PATHS].sort();
		const got = found.sort();
		check(
			`R10 sitemap crawl (${urls.size} URLs): PAA appears on exactly the six ticket paths`,
			JSON.stringify(got) === JSON.stringify(want) && urls.size > 0,
			got.filter((x) => !want.includes(x)).map((x) => `unexpected PAA on: ${x}`)
				.concat(want.filter((x) => !got.includes(x)).map((x) => `PAA missing from: ${x}`))
				.concat(urls.size ? [] : ["sitemap returned no URLs"])
		);
	}

	if (footerNotes.length) {
		action("site footer heading order (pre-existing, NOT this ticket)", [
			"parts/footer.html labels its link columns <h4> directly under an <h2>,",
			"so every route on the site skips a level in the footer. Out of scope",
			"here (no PAA markup involved) and recorded so it is not lost:",
			...footerNotes,
		]);
	}

	if (!process.env.PLL_VERIFY_LIVE) {
		action("run this against production once the deploy lands", [
			"PLL_VERIFY_LIVE=1 npm run verify:paa",
			"Purge WP Rocket FIRST. The PAA markup is fully cached and a stale",
			"page reads exactly like a code failure (SCOPE risk R-8).",
		]);
	}
}

if (httpCtx) await httpCtx.dispose();

// ── summary ────────────────────────────────────────────────────────────────
const errors = results.filter(([, st, sev]) => st === "fail" && sev === "error");
const skipped = results.filter(([, st]) => st === "skip");
const actions = results.filter(([, st]) => st === "action");
const passed = results.filter(([, st]) => st === "pass");
const ran = passed.length + errors.length;
console.log(
	`\n${passed.length}/${ran} checks passed  (${errors.length} error${errors.length === 1 ? "" : "s"}, ` +
		`${skipped.length} skipped, ${actions.length} action-required)`
);
if (skipped.length) console.log(`  skipped: ${skipped.map(([nm]) => nm.split(" ")[0]).join(", ")}  — did NOT run, not counted as passes`);
if (actions.length) {
	console.log("  ⚑ manual steps outstanding:");
	for (const [nm] of actions) console.log(`      ${nm}`);
}
process.exit(errors.length ? 1 : 0);
