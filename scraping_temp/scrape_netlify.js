const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

const OUT_DIR = path.join(__dirname, '../scraped_content');

async function scrapeWithPassword() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('https://premierlimblengthening.netlify.app/');
  
  // Wait for the password input
  try {
    await page.waitForSelector('input[type="password"]', { timeout: 5000 });
    console.log('Password prompt found. Entering password...');
    await page.type('input[type="password"]', 'PRemierLimb');
    
    // Submit the form
    await Promise.all([
      page.keyboard.press('Enter'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]);
    console.log('Password submitted successfully.');
  } catch (e) {
    console.log('No password prompt or error:', e.message);
  }

  // Get content
  const html = await page.evaluate(() => {
    // Remove scripts, styles, etc.
    document.querySelectorAll('script, style, noscript, iframe').forEach(el => el.remove());
    return document.body.innerHTML;
  });
  
  const title = await page.title();
  
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(html);
  
  const filePath = path.join(OUT_DIR, 'netlify_homepage.md');
  fs.writeFileSync(filePath, `# ${title}\n\n**URL:** https://premierlimblengthening.netlify.app/\n\n${markdown}`);
  
  console.log('Scraped homepage saved to', filePath);
  
  await browser.close();
}

scrapeWithPassword().catch(console.error);
