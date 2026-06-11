/**
 * smoke-test — fresh-zip verification of the HIPAA Vault handoff path.
 *
 * Unpacks dist/pll-wordpress-handoff-*.zip into a temp dir, builds individual
 * theme/plugin zips, boots a clean Playground (no --mount flags), and verifies
 * every key route returns HTTP 200 with a non-empty HTML body.
 *
 * Usage: node scripts/smoke-test.mjs
 * Prerequisite: npm run package must have been run first.
 */
import { spawnSync, spawn } from "node:child_process";
import { mkdir, rm, readdir, writeFile, readFile } from "node:fs/promises";
import { createWriteStream, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import archiver from "archiver";
import fg from "fast-glob";

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

async function retry(fn, times = 5, delayMs = 2000) {
	for (let i = 0; i < times; i++) {
		try { return await fn(); } catch (e) {
			if (i === times - 1) throw e;
			await new Promise((r) => setTimeout(r, delayMs));
		}
	}
}

async function httpGet(url) {
	const resp = await fetch(url, { redirect: "follow" });
	return resp;
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

// Wait for Playground to be ready (it prints the URL once booted)
await new Promise((resolve, reject) => {
	const timeout = setTimeout(() => reject(new Error("Playground boot timeout (90s)")), 90000);
	const check = setInterval(() => {
		if (bootLog.includes(`127.0.0.1:${PLAYGROUND_PORT}`) ||
			bootLog.includes(`localhost:${PLAYGROUND_PORT}`) ||
			bootLog.includes("Ready!") || bootLog.includes("Server started")) {
			clearInterval(check); clearTimeout(timeout); resolve();
		}
	}, 500);
});

console.log("\nPlayground up — running route checks…\n");

// Extra settle time for blueprint steps to finish
await new Promise((r) => setTimeout(r, 5000));

// ── 6. verify routes ─────────────────────────────────────────────────────────

const BASE = `http://127.0.0.1:${PLAYGROUND_PORT}`;
const ROUTES = [
	"/",
	"/blog/",
	"/about/",
	"/consult/",
	"/dr-basmajian/",
	"/limb-lengthening-pricing-options/",
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

for (const route of ROUTES) {
	try {
		const resp = await retry(() => httpGet(BASE + route), 3, 1500);
		const text = await resp.text();
		const ok = resp.status === 200 && text.length > 500 && text.includes("<html");
		if (ok) {
			console.log(`  ✓ ${route} — HTTP ${resp.status} (${(text.length / 1024).toFixed(0)} KB)`);
			passed++;
		} else {
			console.error(`  ✗ ${route} — HTTP ${resp.status}, body ${text.length}B`);
			failed++;
		}
	} catch (e) {
		console.error(`  ✗ ${route} — ${e.message}`);
		failed++;
	}
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
