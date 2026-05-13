const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const xml2js = require('xml2js');
const TurndownService = require('turndown');

const turndownService = new TurndownService();

const SITEMAP_URL = 'https://premierlimblengthening.com/sitemap.xml';
const OUT_DIR = path.join(__dirname, '../scraped_content');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function fetchXml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const text = await res.text();
  const parser = new xml2js.Parser();
  return parser.parseStringPromise(text);
}

async function getUrls() {
  const urls = [];
  const sitemapIndex = await fetchXml(SITEMAP_URL);
  
  if (sitemapIndex.sitemapindex) {
    for (const sm of sitemapIndex.sitemapindex.sitemap) {
      const loc = sm.loc[0];
      console.log(`Fetching sub-sitemap: ${loc}`);
      try {
          const subSitemap = await fetchXml(loc);
          if (subSitemap.urlset) {
            for (const url of subSitemap.urlset.url) {
              urls.push(url.loc[0]);
            }
          }
      } catch (e) {
          console.error(`Error fetching sub-sitemap ${loc}:`, e.message);
      }
    }
  } else if (sitemapIndex.urlset) {
    for (const url of sitemapIndex.urlset.url) {
      urls.push(url.loc[0]);
    }
  }
  return [...new Set(urls)]; // Ensure uniqueness
}

async function scrapePage(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36' } });
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Remove unwanted elements
    $('nav, header, footer, script, style, noscript, iframe').remove();
    
    const title = $('title').text().trim() || 'No Title';
    
    let contentHtml = '';
    const mainContent = $('main');
    if (mainContent.length) {
        contentHtml = mainContent.html();
    } else {
        const bodyContent = $('body');
        if (bodyContent.length) {
            contentHtml = bodyContent.html();
        }
    }
    
    const content = turndownService.turndown(contentHtml || '');
    
    return { url, title, content };
  } catch (e) {
    console.error(`Error scraping ${url}:`, e.message);
    return null;
  }
}

async function run() {
  console.log('Fetching sitemaps...');
  const urls = await getUrls();
  console.log(`Found ${urls.length} URLs.`);
  
  const sitemapData = [];
  
  for (const url of urls) {
    console.log(`Scraping ${url}...`);
    const data = await scrapePage(url);
    if (data) {
      const urlObj = new URL(url);
      let p = urlObj.pathname.replace(/\/$/, '').replace(/^\//, '');
      if (!p) p = 'index';
      
      const safePath = p.replace(/[\/\\]/g, '_');
      const filePath = path.join(OUT_DIR, `${safePath}.md`);
      
      fs.writeFileSync(filePath, `# ${data.title}\n\n**URL:** ${data.url}\n\n${data.content}`);
      
      sitemapData.push({
        title: data.title,
        url: data.url,
        file: `${safePath}.md`
      });
      // sleep a bit to be polite
      await new Promise(r => setTimeout(r, 200));
    }
  }
  
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap_data.json'), JSON.stringify(sitemapData, null, 2));
  
  let sitemapMd = '# Site Structure & Sitemap\\n\\n';
  sitemapData.forEach(item => {
    sitemapMd += `- [${item.title}](${item.url}) (Local: ${item.file})\\n`;
  });
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.md'), sitemapMd);
  
  console.log('Done!');
}

run().catch(console.error);
