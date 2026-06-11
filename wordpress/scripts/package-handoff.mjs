/**
 * package-handoff — builds the HIPAA Vault deliverable zip:
 *   dist/pll-wordpress-handoff-<YYYYMMDD>.zip
 *     ├── MIGRATION.md           (install runbook)
 *     ├── CHECKSUMS.txt          (sha256 of every file)
 *     ├── wp-content/themes/pll-editorial/   (built assets included)
 *     ├── wp-content/plugins/pll-seo/
 *     ├── wp-content/plugins/pll-forms/      (build/ included — no Node needed)
 *     └── content/               (pll-content.wxr, media bundles, setup.php, manifest)
 *
 * Run `npm run package` (rebuilds everything first via the package script).
 */
import archiver from "archiver";
import fg from "fast-glob";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const date = process.env.PLL_PACKAGE_DATE || new Date().toISOString().slice(0, 10).replaceAll("-", "");
const OUT_DIR = path.resolve("dist");
const OUT_ZIP = path.join(OUT_DIR, `pll-wordpress-handoff-${date}.zip`);

const INCLUDE = [
	"wp-content/themes/pll-editorial/**",
	"wp-content/plugins/pll-seo/**",
	"wp-content/plugins/pll-forms/**",
	"content/**",
	"docs/MIGRATION.md",
];
const EXCLUDE = ["**/node_modules/**", "**/src/**/*.map"];

await mkdir(OUT_DIR, { recursive: true });

const files = await fg(INCLUDE, { ignore: EXCLUDE, dot: false });
files.sort();

let checksums = "";
for (const file of files) {
	const hash = createHash("sha256").update(await readFile(file)).digest("hex");
	checksums += `${hash}  ${file}\n`;
}
await writeFile(path.resolve("dist/CHECKSUMS.txt"), checksums);

const output = createWriteStream(OUT_ZIP);
const archive = archiver("zip", { zlib: { level: 9 } });
archive.pipe(output);

for (const file of files) {
	// MIGRATION.md goes to the zip root for visibility.
	const dest = file === "docs/MIGRATION.md" ? "MIGRATION.md" : file;
	archive.file(file, { name: dest });
}
archive.file(path.resolve("dist/CHECKSUMS.txt"), { name: "CHECKSUMS.txt" });

await archive.finalize();
await new Promise((resolve) => output.on("close", resolve));
console.log(`✓ ${OUT_ZIP} (${(archive.pointer() / 1024 / 1024).toFixed(1)} MB, ${files.length} files)`);
