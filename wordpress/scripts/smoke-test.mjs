/**
 * smoke-test — fresh-zip verification of the HIPAA Vault handoff path.
 *
 * Unpacks dist/pll-wordpress-handoff-*.zip into a temp dir, builds individual
 * theme/plugin zips, boots a clean Playground (no --mount flags), and verifies
 * every key route returns HTTP 200 with a non-empty HTML body.
 *
 * Usage: node scripts/smoke-test.mjs
 *        PLL_SMOKE_KEEP=1 node scripts/smoke-test.mjs   leave the instance up
 * Prerequisite: npm run package must have been run first.
 *
 * PLL_SMOKE_KEEP holds the Playground open on :9401 after the route checks and
 * skips the temp-dir cleanup, so other guards can be pointed at the PACKAGED
 * build rather than at the mounted dev server. That distinction matters: a fix
 * that only works with --mount is not a fix. Example:
 *     PLL_SMOKE_KEEP=1 node scripts/smoke-test.mjs &
 *     PLL_BASE=http://127.0.0.1:9401 npm run verify:paa
 * Ctrl-C, or kill the process, to release it.
 */
import { spawnSync, spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import archiver from "archiver";
import fg from "fast-glob";
import { chromium, request as pwRequest } from "playwright";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dir, "..");
const DIST = path.join(ROOT, "dist");
const SMOKE_DIR = path.join(ROOT, "dist", "smoke-tmp");
const PLAYGROUND_PORT = 9401; // different from dev :9400 so they don't collide

// ── helpers ────────────────────────────────────────────────────────────────

async function zipDir(srcDir, destZip) {
	const output = createWriteStream(destZip);
	const archive = archiver("zip", { zlib: { level: 6 } });
	archive.pipe(output);
	archive.directory(srcDir, path.basename(srcDir));
	await archive.finalize();
	await new Promise((r) => output.on("close", r));
}

// ── 1. find the latest handoff zip ─────────────────────────────────────────

const zips = (await fg("pll-wordpress-handoff-*.zip", { cwd: DIST })).sort();
if (!zips.length) {
	console.error("✗ No handoff zip found in dist/. Run: npm run package");
	process.exit(1);
}
const HANDOFF_ZIP = path.join(DIST, zips.at(-1));
console.log(`\nSmoke-testing: ${path.basename(HANDOFF_ZIP)}`);

// ── 2. extract the zip ──────────────────────────────────────────────────────

await rm(SMOKE_DIR, { recursive: true, force: true });
await mkdir(SMOKE_DIR, { recursive: true });

// Use Node's built-in unzip (Playground CLI ships yauzl transitively, but
// we can use the native unzip via spawnSync with PowerShell Expand-Archive)
console.log("Extracting handoff zip…");
const extract = spawnSync(
	"powershell.exe",
	["-NoProfile", "-NonInteractive", "-Command",
		`Expand-Archive -Path '${HANDOFF_ZIP}' -DestinationPath '${SMOKE_DIR}' -Force`],
	{ stdio: "inherit" }
);
if (extract.status !== 0) {
	console.error("✗ Extraction failed");
	process.exit(1);
}

// ── 3. create individual theme/plugin zips ──────────────────────────────────

console.log("Building theme + plugin zips…");
const themeDir = path.join(SMOKE_DIR, "wp-content", "themes", "pll-editorial");
const themeSeoDir = path.join(SMOKE_DIR, "wp-content", "plugins", "pll-seo");
const themeFormsDir = path.join(SMOKE_DIR, "wp-content", "plugins", "pll-forms");

const themeZip = path.join(SMOKE_DIR, "pll-editorial.zip");
const seoZip = path.join(SMOKE_DIR, "pll-seo.zip");
const formsZip = path.join(SMOKE_DIR, "pll-forms.zip");

await Promise.all([
	zipDir(themeDir, themeZip),
	zipDir(themeSeoDir, seoZip),
	zipDir(themeFormsDir, formsZip),
]);
console.log("  ✓ pll-editorial.zip, pll-seo.zip, pll-forms.zip");

// ── 4. write smoke blueprint ─────────────────────────────────────────────────

// Paths relative to blueprint file (--blueprint-may-read-adjacent-files)
const blueprint = {
	$schema: "https://playground.wordpress.net/blueprint-schema.json",
	preferredVersions: { php: "8.2", wp: "latest" },
	landingPage: "/",
	features: { networking: false },
	constants: {
		WP_DEBUG: true,
		PLL_GHL_WEBHOOK_URL: "https://example.invalid/smoke-test-dummy",
	},
	steps: [
		{ step: "login", username: "admin" },
		{
			step: "setSiteOptions",
			options: {
				blogname: "Premier Limb Lengthening",
				blogdescription: "Cosmetic limb lengthening, founded by Dr. Hrayr Basmajian",
				timezone_string: "America/Los_Angeles",
				permalink_structure: "/%postname%/",
				default_comment_status: "closed",
				default_ping_status: "closed",
			},
		},
		{
			step: "installTheme",
			themeData: { resource: "bundled", path: "./pll-editorial.zip" },
			options: { activate: true },
		},
		{
			step: "installPlugin",
			pluginData: { resource: "bundled", path: "./pll-seo.zip" },
			options: { activate: true },
		},
		{
			step: "installPlugin",
			pluginData: { resource: "bundled", path: "./pll-forms.zip" },
			options: { activate: true },
		},
		{
			step: "importWxr",
			file: { resource: "bundled", path: "./content/pll-content.wxr" },
		},
		// Create parent dir, write setup.php into the Playground VFS, then execute it
		{
			step: "runPHP",
			code: "<?php mkdir('/wordpress/pll-seed', 0755, true);",
		},
		{
			step: "writeFile",
			path: "/wordpress/pll-seed/setup.php",
			data: { resource: "bundled", path: "./content/setup.php" },
		},
		{
			step: "runPHP",
			code: "<?php require '/wordpress/wp-load.php'; require '/wordpress/pll-seed/setup.php';",
		},
	],
};

const blueprintPath = path.join(SMOKE_DIR, "blueprint.smoke.json");
await writeFile(blueprintPath, JSON.stringify(blueprint, null, 2));
console.log("  ✓ blueprint.smoke.json written");

// ── 5. boot playground ───────────────────────────────────────────────────────

console.log(`\nBooting clean Playground on :${PLAYGROUND_PORT} (no mounts)…`);

// Invoke via node directly to avoid shebang/shell quoting issues on Windows.
const cliEntry = path.join(ROOT, "node_modules/@wp-playground/cli/wp-playground.js");
const playground = spawn(
	process.execPath,
	[cliEntry, "server",
		`--blueprint=${blueprintPath}`,
		`--port=${PLAYGROUND_PORT}`,
		"--blueprint-may-read-adjacent-files",
	],
	{ cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] }
);

let bootLog = "";
playground.stdout.on("data", (d) => { bootLog += d; process.stdout.write(d); });
playground.stderr.on("data", (d) => { bootLog += d; process.stderr.write(d); });

// Wait for Playground to be SEEDED, not merely to be answering HTTP.
//
// Three separate traps live here, and this harness fell into all of them.
//
// 1. The original check scraped stdout for a readiness banner and gave up after
//    90s. Booting from the handoff zip installs a theme and two plugin zips,
//    imports the WXR and runs setup.php; on Windows that is roughly ten
//    minutes. So the check timed out on a perfectly healthy boot and AC-14
//    could never be run against the packaged build, which is the only build
//    that matters.
//
// 2. Polling the port instead is too eager in the other direction. PHP answers
//    as soon as WordPress is installed, long before setup.php has composed the
//    pattern-built pages, so /about/, /consult/, the pillars and the pricing
//    page all 404 on a boot that simply is not finished.
//
// 3. The CLI's own "Ready!" banner means the HTTP server is up, NOT that the
//    blueprint finished. Accepting it produced six 30s page.goto timeouts on
//    the routes that had not been seeded yet.
//
// The honest signal is a route that cannot exist until setup.php has run.
// /limb-lengthening-pricing-options/ is composed from patterns by the seeder,
// so a 200 there means the seed completed. Nothing else is accepted.
const BOOT_TIMEOUT_MS = 900000;
const SEEDED_ROUTE = "/limb-lengthening-pricing-options/";
const bootStart = Date.now();

// Polled with Playwright's request client rather than node's fetch. Undici
// surfaces the connection resets a mid-boot Playground hands out as an
// unhandled error rather than a rejected promise, which killed this script
// with a bare exit 1 and no message. Playwright also keeps a cookie jar, which
// the auto-login redirect needs.
let bootDied = null;
playground.on("exit", (code) => { bootDied = code; });
const bootCtx = await pwRequest.newContext({ ignoreHTTPSErrors: true });
try {
	for (;;) {
		if (bootDied !== null) {
			throw new Error(`Playground exited with code ${bootDied} during boot. Last log:\n${bootLog.slice(-800)}`);
		}
		if (Date.now() - bootStart > BOOT_TIMEOUT_MS) {
			throw new Error(`Playground boot timeout (${BOOT_TIMEOUT_MS / 1000}s). Last log:\n${bootLog.slice(-800)}`);
		}
		try {
			const r = await bootCtx.get(`http://127.0.0.1:${PLAYGROUND_PORT}${SEEDED_ROUTE}`, { timeout: 15000 });
			if (r.status() === 200) {
				console.log(`  \u2713 seeded after ${Math.round((Date.now() - bootStart) / 1000)}s (HTTP 200 on ${SEEDED_ROUTE})`);
				break;
			}
		} catch {
			// connection refused, reset, or still seeding: keep waiting
		}
		await new Promise((r) => setTimeout(r, 5000));
	}
} finally {
	await bootCtx.dispose();
}

console.log("\nPlayground up — running route checks via Playwright…\n");

// ── 6. verify routes via Playwright ──────────────────────────────────────────
// Use a real browser instead of fetch() to avoid Windows loopback quirks.

const BASE = `http://127.0.0.1:${PLAYGROUND_PORT}`;
const ROUTES = [
	"/",
	"/blog/",
	"/about/",
	"/consult/",
	"/book-a-consultation/",
	"/dr-basmajian/",
	"/limb-lengthening-pricing-options/",
	"/height-surgery/",
	"/leg-lengthening-surgery/",
	"/evaluate-your-surgeon/",
	"/your-surgery/",
	"/your-surgery/will-limb-lengthening-hurt/",
	"/privacy/",
	"/terms/",
	"/accessibility/",
	"/are-you-a-good-candidate-for-limb-lengthening/",
	"/am-i-too-old-for-limb-lengthening/",
	"/category/limb-lengthening/",
];

let passed = 0;
let failed = 0;

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

for (const route of ROUTES) {
	try {
		const resp = await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 30000 });
		const status = resp?.status() ?? 0;
		const html = await page.content();
		const ok = status === 200 && html.length > 500 && html.includes("<html");
		if (ok) {
			const title = await page.title().catch(() => "");
			console.log(`  ✓ ${route} — HTTP ${status} "${title}" (${(html.length / 1024).toFixed(0)} KB)`);
			passed++;
		} else {
			console.error(`  ✗ ${route} — HTTP ${status}, body ${html.length}B`);
			failed++;
		}
	} catch (e) {
		console.error(`  ✗ ${route} — ${e.message.split("\n")[0]}`);
		failed++;
	}
}

await browser.close();

// ── 6b. optional hold ─────────────────────────────────────────

if (process.env.PLL_SMOKE_KEEP) {
	console.log(`
${passed}/${ROUTES.length} routes passed the smoke test`);
	if (failed > 0) console.error(`✗ ${failed} route(s) returned unexpected responses`);
	console.log(`
PLL_SMOKE_KEEP set — holding the PACKAGED instance on ${BASE}`);
	console.log(`Point the guards at it, e.g. PLL_BASE=${BASE} npm run verify:paa`);
	console.log("Ctrl-C to stop. dist/smoke-tmp/ is left in place on purpose.");
	const release = () => {
		playground.kill();
		process.exit(failed > 0 ? 1 : 0);
	};
	process.on("SIGINT", release);
	process.on("SIGTERM", release);
	await new Promise(() => {});
}

// ── 7. teardown ───────────────────────────────────────────────────────────────

playground.kill();

console.log(`\n${passed}/${ROUTES.length} routes passed the smoke test`);

if (failed > 0) {
	console.error(`\n✗ Smoke test FAILED — ${failed} route(s) returned unexpected responses`);
	process.exit(1);
} else {
	console.log(`\n✓ Smoke test PASSED — handoff zip is import-ready for HIPAA Vault`);
}

// cleanup temp dir
await rm(SMOKE_DIR, { recursive: true, force: true });
console.log("  Cleaned up smoke-tmp/");
