/**
 * parity-slice — debugging helper. Crops the same y-band out of a captured
 * next/wp screenshot pair so the region can be inspected at full resolution.
 *
 * Usage: node scripts/parity-slice.mjs <dir> <tag> <y0> <y1> [outPrefix]
 *   e.g. node scripts/parity-slice.mjs _ 1440 0 1100 C:/tmp/hero
 * Writes <outPrefix>-next.png and <outPrefix>-wp.png.
 */
import { PNG } from "pngjs";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const [dir, tag, y0s, y1s, outPrefix = "C:/tmp/slice"] = process.argv.slice(2);
const y0 = Number(y0s);
const y1 = Number(y1s);

for (const side of ["next", "wp"]) {
	const file = path.resolve(".parity", dir, `${tag}-${side}.png`);
	const png = PNG.sync.read(readFileSync(file));
	const h = Math.min(y1, png.height) - y0;
	const out = new PNG({ width: png.width, height: h });
	PNG.bitblt(png, out, 0, y0, png.width, h, 0, 0);
	writeFileSync(`${outPrefix}-${side}.png`, PNG.sync.write(out));
	console.log(`${side}: ${png.width}x${png.height} -> ${outPrefix}-${side}.png (y ${y0}-${y0 + h})`);
}
