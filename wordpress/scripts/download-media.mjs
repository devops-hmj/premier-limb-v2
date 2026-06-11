/**
 * download-media — gathers every content asset the WordPress site needs into
 * wordpress/content/media-uploads/, preserving paths so image URLs survive
 * the migration with ZERO redirects.
 *
 * 1. Blog featured images: downloaded from the LIVE site now (at cutover the
 *    domain will point at the new install, so deferred import-by-URL would
 *    break). Saved at their original /wp-content/uploads/YYYY/MM/<file> path.
 * 2. your-surgery diagrams + dr-woman-talking.jpg: copied from the Next.js
 *    public/ folder into a stable pll/ namespace, matching the src rewrites
 *    in md-to-blocks.mjs (/images/your-surgery/x.webp →
 *    /wp-content/uploads/pll/your-surgery/x.webp).
 * 3. Writes media-manifest.json (slug → uploads-relative path + alt) which
 *    content/setup.php uses to register attachments and set featured images.
 *
 * Run once, commit the output: npm run fetch:media
 */
import { mkdir, writeFile, copyFile, readdir, access } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";

const REPO_ROOT = path.resolve("..");
const OUT = path.resolve("content/media-uploads");
const MANIFEST_PATH = path.resolve("content/media-manifest.json");

const featured = JSON.parse(
	await (await import("node:fs/promises")).readFile(
		path.join(REPO_ROOT, "scraped_content/blog_featured_images.json"),
		"utf8"
	)
);

const manifest = { featured: {}, uploads: [] };

async function exists(p) {
	try {
		await access(p);
		return true;
	} catch {
		return false;
	}
}

async function download(url, dest) {
	if (await exists(dest)) return "cached";
	await mkdir(path.dirname(dest), { recursive: true });
	const res = await fetch(url, { redirect: "follow" });
	if (!res.ok) throw new Error(`${res.status} for ${url}`);
	await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
	return "downloaded";
}

// 1) Featured images at their original upload paths.
for (const post of featured.posts) {
	const url = new URL(post.heroUrl);
	const rel = url.pathname.replace(/^\/wp-content\/uploads\//, "");
	const dest = path.join(OUT, rel);
	try {
		const status = await download(post.heroUrl, dest);
		console.log(`✓ featured ${post.slug} (${status})`);
		manifest.featured[post.slug] = { file: rel.replace(/\\/g, "/"), alt: post.alt };
		manifest.uploads.push(rel.replace(/\\/g, "/"));
	} catch (err) {
		console.error(`✗ featured ${post.slug}: ${err.message}`);
		process.exitCode = 1;
	}
}

// 2) Local content images referenced by your-surgery page bodies.
const surgeryDir = path.join(REPO_ROOT, "public/images/your-surgery");
for (const file of await readdir(surgeryDir)) {
	if (!/\.(webp|png|jpe?g)$/i.test(file)) continue;
	const rel = `pll/your-surgery/${file}`;
	const dest = path.join(OUT, rel);
	await mkdir(path.dirname(dest), { recursive: true });
	if (!(await exists(dest))) await copyFile(path.join(surgeryDir, file), dest);
	manifest.uploads.push(rel);
}
const portrait = "dr-woman-talking.jpg";
const portraitRel = `pll/${portrait}`;
await mkdir(path.join(OUT, "pll"), { recursive: true });
if (!(await exists(path.join(OUT, portraitRel)))) {
	await copyFile(path.join(REPO_ROOT, "public", portrait), path.join(OUT, portraitRel));
}
manifest.uploads.push(portraitRel);

manifest.uploads = [...new Set(manifest.uploads)].sort();
await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, "\t") + "\n");
console.log(`✓ media-manifest.json (${manifest.uploads.length} uploads, ${Object.keys(manifest.featured).length} featured)`);
