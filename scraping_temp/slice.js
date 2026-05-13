const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUT = path.resolve(__dirname, '..', 'qa-screenshots');

const files = [
  'mobile-s.png',
  'mobile-l.png',
  'tablet-p.png',
  'tablet-l.png',
  'laptop.png',
  'desktop.png',
];

(async () => {
  for (const f of files) {
    const inputPath = path.join(OUT, f);
    const meta = await sharp(inputPath).metadata();
    const base = f.replace('.png', '');
    const SLICE = 1400; // pixel height of each slice
    const total = Math.ceil(meta.height / SLICE);
    console.log(`${f}: ${meta.width}x${meta.height} -> ${total} slices`);
    for (let i = 0; i < total; i++) {
      const top = i * SLICE;
      const height = Math.min(SLICE, meta.height - top);
      const out = path.join(OUT, `${base}-slice-${i+1}.png`);
      await sharp(inputPath)
        .extract({ left: 0, top, width: meta.width, height })
        .toFile(out);
    }
  }
})().catch(e => { console.error(e); process.exit(1); });
