/**
 * parity-bands — debugging helper. Pixelmatches one captured pair and prints
 * the contiguous y-bands where the pages diverge, so slices can be aimed at
 * the actual differences instead of scanning 13000px screenshots by eye.
 *
 * Usage: node scripts/parity-bands.mjs <dir> <tag> [rowThreshold=0.05]
 *   e.g. node scripts/parity-bands.mjs _ 1440
 */
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { readFileSync } from "node:fs";
import path from "node:path";

const [dir, tag, thresholdArg] = process.argv.slice(2);
const ROW_THRESHOLD = Number(thresholdArg || 0.05);

function load(side) {
	return PNG.sync.read(readFileSync(path.resolve(".parity", dir, `${tag}-${side}.png`)));
}
function pad(png, width, height) {
	if (png.width === width && png.height === height) return png;
	const out = new PNG({ width, height, fill: true });
	out.data.fill(255);
	PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0);
	return out;
}

let a = load("next");
let b = load("wp");
console.log(`next ${a.width}x${a.height}  wp ${b.width}x${b.height}  (Δh ${b.height - a.height}px)`);
const width = Math.max(a.width, b.width);
const height = Math.max(a.height, b.height);
a = pad(a, width, height);
b = pad(b, width, height);

const diff = new PNG({ width, height });
pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1 });

// Per-row ratio of differing pixels (diff output paints red on differing px).
const rows = new Float32Array(height);
for (let y = 0; y < height; y++) {
	let n = 0;
	for (let x = 0; x < width; x++) {
		const i = (y * width + x) * 4;
		if (diff.data[i] === 255 && diff.data[i + 1] < 100) n++;
	}
	rows[y] = n / width;
}

// Group hot rows (ratio > ROW_THRESHOLD) into bands separated by >40px gaps.
const bands = [];
let start = -1, last = -1, peak = 0;
for (let y = 0; y < height; y++) {
	if (rows[y] > ROW_THRESHOLD) {
		if (start === -1) { start = y; peak = 0; }
		last = y;
		peak = Math.max(peak, rows[y]);
	} else if (start !== -1 && y - last > 40) {
		bands.push({ start, end: last, peak });
		start = -1;
	}
}
if (start !== -1) bands.push({ start, end: last, peak });

console.log(`${bands.length} divergence bands (row >${ROW_THRESHOLD * 100}% differing):`);
for (const bd of bands) {
	console.log(`  y ${String(bd.start).padStart(5)} – ${String(bd.end).padStart(5)}  (${String(bd.end - bd.start + 1).padStart(4)}px, peak ${(bd.peak * 100).toFixed(0)}%)`);
}
