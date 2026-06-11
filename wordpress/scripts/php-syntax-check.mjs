/**
 * php-syntax-check — local `php -l` equivalent with no PHP install: boots a
 * Playground blueprint that runs scripts/lint.php (token_get_all TOKEN_PARSE)
 * over every theme/plugin/content .php file. CI still runs parallel-lint;
 * this is the fast local pre-push check.
 *
 * Usage: node scripts/php-syntax-check.mjs
 */
import { spawnSync } from "node:child_process";
import { writeFile, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const blueprint = {
	steps: [
		{ step: "runPHP", code: "<?php require '/lint-scripts/lint.php';" },
	],
};
const blueprintPath = path.join(ROOT, "scripts", ".lint-blueprint.json");
await writeFile(blueprintPath, JSON.stringify(blueprint));

const cliEntry = path.join(ROOT, "node_modules/@wp-playground/cli/wp-playground.js");
const result = spawnSync(
	process.execPath,
	[cliEntry, "run-blueprint",
		`--blueprint=${blueprintPath}`,
		"--mount=./wp-content:/lint-src/wp-content",
		"--mount=./content:/lint-src/content",
		"--mount=./scripts:/lint-scripts",
	],
	{ cwd: ROOT, encoding: "utf8" }
);

await rm(blueprintPath, { force: true });

// runPHP stdout is not piped back by run-blueprint; lint.php reports
// through the bidirectional scripts/ mount instead.
const resultFile = path.join(ROOT, "scripts", ".lint-result.txt");
let report = "";
try {
	report = await readFile(resultFile, "utf8");
	await rm(resultFile, { force: true });
} catch {
	// fall through — missing report = the blueprint itself failed
}

process.stdout.write(report);
if (result.status !== 0 || report.includes("PARSE ERROR") || !report.includes("parse failures")) {
	process.stderr.write(result.stderr ?? "");
	console.error("\n✗ PHP syntax check FAILED");
	process.exit(1);
}
console.log("\n✓ PHP syntax check passed");
