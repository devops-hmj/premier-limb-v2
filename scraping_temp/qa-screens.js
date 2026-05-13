const puppeteer = require('puppeteer');
const path = require('path');

const OUT = path.resolve(__dirname, '..', 'qa-screenshots');
const URL = 'http://localhost:3000';

const viewports = [
  { name: 'mobile-s', width: 375,  height: 667  },
  { name: 'mobile-l', width: 414,  height: 896  },
  { name: 'tablet-p', width: 768,  height: 1024 },
  { name: 'tablet-l', width: 1024, height: 768  },
  { name: 'laptop',   width: 1440, height: 900  },
  { name: 'desktop',  width: 1920, height: 1080 },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  try {
    for (const v of viewports) {
      const page = await browser.newPage();
      await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 1 });
      try {
        await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
      } catch (e) {
        console.warn(`networkidle0 timeout for ${v.name}, falling back`);
        await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(r => setTimeout(r, 4000));
      }
      await new Promise(r => setTimeout(r, 1500)); // settle
      // above the fold
      await page.screenshot({
        path: path.join(OUT, `${v.name}-fold.png`),
        fullPage: false,
      });
      // full page
      await page.screenshot({
        path: path.join(OUT, `${v.name}.png`),
        fullPage: true,
      });
      console.log(`captured ${v.name} (${v.width}x${v.height})`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
})();
