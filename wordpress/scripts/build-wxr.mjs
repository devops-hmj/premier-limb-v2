/**
 * build-wxr — generates content/pll-content.wxr, the canonical content seed
 * for the WordPress migration (imported by the Playground blueprint locally
 * and via Tools → Import / `wp import` on HIPAA Vault).
 *
 * Contents:
 *   - 16 blog posts (block markup via md-to-blocks, real publish dates from
 *     the legacy WordPress post list, single category each, excerpt, SEO meta)
 *   - 5 categories with term descriptions (from lib/content.ts)
 *   - 2 authors reconstructed from the scraped author archives
 *     (ccatandella: 4 posts, edusenbury: 12; cjpeters had zero posts live)
 *   - your-surgery parent page + 7 child pages (block markup from markdown)
 *   - privacy / terms / accessibility pages (extracted from the Next.js
 *     page.tsx template literals — the source of truth for legal copy)
 *
 * Marketing pages (home, blog, about, consult, dr-basmajian, pricing) are
 * NOT in the WXR: they are composed from theme patterns by content/setup.php
 * so the pattern files stay the single source of truth.
 *
 * Run: npm run generate:content
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { convertMarkdown } from "./md-to-blocks.mjs";

const REPO = path.resolve("..");
const CONTENT_DIR = path.join(REPO, "scraped_content");
const OUT = path.resolve("content/pll-content.wxr");

const ORIGIN = "https://premierlimblengthening.com";

/* ---- site constants (mirror lib/site.ts) ---- */
const SITE = {
	name: "Premier Limb Lengthening",
	phone: "(909) 563-8653",
	domain: "premierlimblengthening.com",
	address: { street: "400 N. Mountain Ave. Suite 305", city: "Upland", state: "CA", zip: "91786" },
};

/* ---- publish dates (lib/content.ts PUBLISH_DATES, ISO 8601 Pacific) ---- */
const PUBLISH_DATES = {
	"are-you-a-good-candidate-for-limb-lengthening": "2025-12-25T21:14:00-08:00",
	"what-happens-to-muscle-during-and-after-limb-lengthening": "2025-12-11T20:36:00-08:00",
	"the-science-behind-bone-regeneration-and-limb-lengthening": "2025-11-27T15:34:00-08:00",
	"bone-health-and-nutrition-before-and-after-limb-lengthening": "2025-11-13T15:17:00-08:00",
	"tips-for-traveling-for-the-holidays-after-limb-lengthening-surgery": "2025-10-23T00:36:00-07:00",
	"the-importance-of-physical-therapy-in-limb-lengthening": "2025-10-09T00:20:00-07:00",
	"is-limb-lengthening-covered-by-insurance": "2025-09-25T19:25:00-07:00",
	"limb-lengthening-pain-the-truth": "2025-09-11T19:12:00-07:00",
	"will-leg-lengthening-be-obvious": "2025-08-28T17:25:00-07:00",
	"fixation-methods-in-limb-lengthening-internal-vs-external": "2025-08-14T22:29:00-07:00",
	"is-leg-lengthening-off-limits-for-athletes": "2025-07-24T02:18:00-07:00",
	"am-i-too-old-for-limb-lengthening": "2025-07-10T00:43:00-07:00",
	"leg-up-or-let-down-can-you-gain-height-without-surgery": "2025-06-26T17:28:00-07:00",
	"can-i-get-a-leg-lengthening-procedure-for-cosmetic-reasons": "2025-06-12T17:22:00-07:00",
	"limb-lengthening-what-you-gain-what-you-risk": "2025-05-22T16:57:00-07:00",
	"rewriting-the-body-norm-stigmas-around-limb-lengthening": "2025-05-08T17:00:00-07:00",
};

/* ---- categories (lib/content.ts) ---- */
const CATEGORY_LABELS = {
	"limb-lengthening": "Limb Lengthening",
	"bone-health": "Bone Health",
	"impact-on-the-body": "Impact on the Body",
	"after-limb-lengthening": "After Limb Lengthening",
	"paying-for-limb-lengthening": "Paying for Limb Lengthening",
};
const CATEGORY_DESCRIPTIONS = {
	"limb-lengthening": "Guides to cosmetic and reconstructive limb lengthening: candidacy, the procedure, and what to expect.",
	"bone-health": "How bone regenerates, and the nutrition that supports lengthening and recovery.",
	"impact-on-the-body": "What limb lengthening means for your muscles, pain, and the rest of the body.",
	"after-limb-lengthening": "Recovery, on-site therapy, travel, and life after limb lengthening surgery.",
	"paying-for-limb-lengthening": "Cost, insurance, and financing for limb lengthening.",
};

/** Port of lib/content.ts deriveCategory() — order of checks matters. */
function deriveCategory(file) {
	if (file.includes("bone-health") || file.includes("nutrition")) return "bone-health";
	if (file.includes("insurance") || file.includes("pricing") || file.includes("cost"))
		return "paying-for-limb-lengthening";
	if (file.includes("muscle") || file.includes("pain") || file.includes("recovery"))
		return "impact-on-the-body";
	if (
		file.includes("travel") ||
		file.includes("physical-therapy") ||
		file.includes("recovery") ||
		file.includes("exercise")
	)
		return "after-limb-lengthening";
	return "limb-lengthening";
}

/* ---- authors (reconstructed from scraped author archives) ---- */
const CCATANDELLA_POSTS = new Set([
	"the-science-behind-bone-regeneration-and-limb-lengthening",
	"bone-health-and-nutrition-before-and-after-limb-lengthening",
	"limb-lengthening-what-you-gain-what-you-risk",
	"rewriting-the-body-norm-stigmas-around-limb-lengthening",
]);
const AUTHORS = [
	// user_login differs from the public nicename to blunt login enumeration.
	{ login: "pll-ccatandella", nicename: "ccatandella", display: "C. Catandella", email: "ccatandella@premierlimblengthening.com" },
	{ login: "pll-edusenbury", nicename: "edusenbury", display: "E. Dusenbury", email: "edusenbury@premierlimblengthening.com" },
];
const authorForSlug = (slug) =>
	CCATANDELLA_POSTS.has(slug) ? "pll-ccatandella" : "pll-edusenbury";

/* ---- helpers ---- */
const cdata = (s) => `<![CDATA[${String(s).replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
const escXml = (s) =>
	String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** "2025-12-25T21:14:00-08:00" → { local: "2025-12-25 21:14:00", gmt: "2025-12-26 05:14:00", rfc: "Fri, 26 Dec 2025 05:14:00 +0000" } */
function splitDate(iso) {
	const local = iso.replace("T", " ").replace(/[-+]\d{2}:\d{2}$/, "");
	const d = new Date(iso);
	const pad = (n) => String(n).padStart(2, "0");
	const gmt = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
	return { local, gmt, rfc: d.toUTCString().replace("GMT", "+0000") };
}

const rewriteImageSrc = (src) => {
	if (src.startsWith("/images/")) return "/wp-content/uploads/pll" + src.replace(/^\/images/, "");
	if (src.startsWith("/dr-")) return "/wp-content/uploads/pll" + src;
	return src;
};

let nextId = 100;
const items = [];

function pushItem({
	title, slug, type, content, excerpt = "", date, author = "", parent = 0,
	categories = [], meta = {}, link, menuOrder = 0,
}) {
	const id = nextId++;
	const dates = splitDate(date ?? "2026-01-05T09:00:00-08:00");
	const catXml = categories
		.map(
			(c) =>
				`\t\t<category domain="category" nicename="${escXml(c)}">${cdata(CATEGORY_LABELS[c] ?? c)}</category>`
		)
		.join("\n");
	const metaXml = Object.entries(meta)
		.filter(([, v]) => v !== undefined && v !== null && v !== "")
		.map(
			([k, v]) =>
				`\t\t<wp:postmeta>\n\t\t\t<wp:meta_key>${cdata(k)}</wp:meta_key>\n\t\t\t<wp:meta_value>${cdata(v)}</wp:meta_value>\n\t\t</wp:postmeta>`
		)
		.join("\n");

	items.push(`\t<item>
\t\t<title>${cdata(title)}</title>
\t\t<link>${escXml(link)}</link>
\t\t<pubDate>${dates.rfc}</pubDate>
\t\t<dc:creator>${cdata(author || AUTHORS[1].login)}</dc:creator>
\t\t<guid isPermaLink="false">${escXml(`${ORIGIN}/?p=${id}`)}</guid>
\t\t<description></description>
\t\t<content:encoded>${cdata(content)}</content:encoded>
\t\t<excerpt:encoded>${cdata(excerpt)}</excerpt:encoded>
\t\t<wp:post_id>${id}</wp:post_id>
\t\t<wp:post_date>${cdata(dates.local)}</wp:post_date>
\t\t<wp:post_date_gmt>${cdata(dates.gmt)}</wp:post_date_gmt>
\t\t<wp:post_modified>${cdata(dates.local)}</wp:post_modified>
\t\t<wp:post_modified_gmt>${cdata(dates.gmt)}</wp:post_modified_gmt>
\t\t<wp:comment_status>${cdata("closed")}</wp:comment_status>
\t\t<wp:ping_status>${cdata("closed")}</wp:ping_status>
\t\t<wp:post_name>${cdata(slug)}</wp:post_name>
\t\t<wp:status>${cdata("publish")}</wp:status>
\t\t<wp:post_parent>${parent}</wp:post_parent>
\t\t<wp:menu_order>${menuOrder}</wp:menu_order>
\t\t<wp:post_type>${cdata(type)}</wp:post_type>
\t\t<wp:post_password></wp:post_password>
\t\t<wp:is_sticky>0</wp:is_sticky>
${catXml ? catXml + "\n" : ""}${metaXml ? metaXml + "\n" : ""}\t</item>`);
	return id;
}

/* ------------------------------------------------------------------ *
 * 1) Blog posts
 * ------------------------------------------------------------------ */
const featuredManifest = JSON.parse(
	readFileSync(path.join(CONTENT_DIR, "blog_featured_images.json"), "utf8")
);
const liveH1BySlug = new Map(featuredManifest.posts.map((p) => [p.slug, p.liveH1]));

for (const [slug, iso] of Object.entries(PUBLISH_DATES)) {
	const raw = readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
	const { title: seoTitle, description, blocksHtml } = convertMarkdown(raw, { rewriteImageSrc });
	// Visible H1 = the live site's headline (restores original WP behavior for
	// the 6 h1-drift posts); the SEO title from the markdown drives <title>.
	const postTitle = liveH1BySlug.get(slug) || seoTitle;

	pushItem({
		title: postTitle,
		slug,
		type: "post",
		content: blocksHtml,
		excerpt: description,
		date: iso,
		author: authorForSlug(slug),
		categories: [deriveCategory(`${slug}.md`)],
		link: `${ORIGIN}/${slug}/`,
		meta: {
			_pll_seo_title: seoTitle,
			_pll_seo_description: description,
		},
	});
}

/* ------------------------------------------------------------------ *
 * 2) your-surgery parent + 7 children
 * ------------------------------------------------------------------ */
const SURGERY_CHILDREN = [
	"will-limb-lengthening-hurt",
	"is-there-an-age-limit-for-limb-lengthening",
	"can-i-bend-my-lengthening-nail",
	"external-internal-lengthening",
	"exercise-after-limb-lengthening",
	"how-much-taller-can-i-get-with-limb-lengthening",
	"limb-lengthening-expectations",
];

const surgeryRaw = readFileSync(path.join(CONTENT_DIR, "your-surgery.md"), "utf8");
const surgery = convertMarkdown(surgeryRaw, { rewriteImageSrc });
// Title "Your Surgery" (nav/breadcrumb label); the hand-written SEO title and
// description live in pll-seo's page-defaults map, so no meta is seeded here —
// seeded meta would override the better hand-written values.
const surgeryParentId = pushItem({
	title: "Your Surgery",
	slug: "your-surgery",
	type: "page",
	content: surgery.blocksHtml,
	date: "2026-01-05T09:00:00-08:00",
	link: `${ORIGIN}/your-surgery/`,
	meta: {
		_wp_page_template: "page-your-surgery",
	},
});

// These two render their first body image as a full-bleed hero background
// (app/your-surgery/[slug]/page.tsx HERO_BG_SLUGS): the image is pulled out
// of the content into _pll_hero_image so it isn't shown twice.
const HERO_BG_SLUGS = new Set(["limb-lengthening-expectations", "exercise-after-limb-lengthening"]);

function extractHeroImage(blocksHtml) {
	const match = blocksHtml.match(
		/<!-- wp:image [^>]*-->\s*<figure class="wp-block-image[^"]*"><img src="([^"]+)"[^>]*\/?>(?:<figcaption[^>]*>.*?<\/figcaption>)?<\/figure>\s*<!-- \/wp:image -->/s
	);
	if (!match) return { blocksHtml, heroImage: null };
	return {
		blocksHtml: blocksHtml.replace(match[0], "").replace(/\n{3,}/g, "\n\n").trim(),
		heroImage: match[1],
	};
}

SURGERY_CHILDREN.forEach((slug, i) => {
	const raw = readFileSync(path.join(CONTENT_DIR, `your-surgery_${slug}.md`), "utf8");
	const page = convertMarkdown(raw, { rewriteImageSrc });

	let blocksHtml = page.blocksHtml;
	let heroImage = null;
	if (HERO_BG_SLUGS.has(slug)) {
		({ blocksHtml, heroImage } = extractHeroImage(blocksHtml));
	}

	pushItem({
		title: page.title,
		slug,
		type: "page",
		content: blocksHtml,
		date: "2026-01-05T09:30:00-08:00",
		parent: surgeryParentId,
		menuOrder: i + 1,
		link: `${ORIGIN}/your-surgery/${slug}/`,
		meta: {
			_wp_page_template: "page-service-sub",
			_pll_seo_title: page.title,
			_pll_seo_description: page.description,
			_pll_hero_image: heroImage ?? undefined,
		},
	});
});

/* ------------------------------------------------------------------ *
 * 3) Legal pages — extracted from the Next.js page.tsx template literals
 * ------------------------------------------------------------------ */
function extractLegalMarkdown(tsxPath, constName) {
	const src = readFileSync(path.join(REPO, tsxPath), "utf8");
	const start = src.indexOf(`const ${constName} = \``);
	if (start === -1) throw new Error(`${constName} not found in ${tsxPath}`);
	const open = src.indexOf("`", start) + 1;
	const close = src.indexOf("`;", open);
	let body = src.slice(open, close);
	// Substitute the lib/site.ts interpolations used by these pages.
	body = body
		.replaceAll("${site.name.toUpperCase()}", SITE.name.toUpperCase())
		.replaceAll("${site.name}", SITE.name)
		.replaceAll("${site.phone}", SITE.phone)
		.replaceAll("${site.domain}", SITE.domain)
		.replaceAll("${site.address.street}", SITE.address.street)
		.replaceAll("${site.address.city}", SITE.address.city)
		.replaceAll("${site.address.state}", SITE.address.state)
		.replaceAll("${site.address.zip}", SITE.address.zip);
	if (body.includes("${")) {
		throw new Error(`Unsubstituted interpolation remains in ${constName}`);
	}
	return body;
}

// Masthead copy mirrors the LegalDocument props in each page.tsx.
const LEGAL_PAGES = [
	{
		slug: "privacy", title: "Privacy Policy", tsx: "app/privacy/page.tsx", constName: "PRIVACY_BODY",
		eyebrow: "Legal · Privacy", titleLead: "Privacy", titleAccent: "Policy",
		lede: "How Premier Limb Lengthening handles website data, protected health information, and text messaging, written in plain language for patients.",
		effective: "June 8, 2026",
	},
	{
		slug: "terms", title: "Terms of Service", tsx: "app/terms/page.tsx", constName: "TERMS_BODY",
		eyebrow: "Legal · Terms", titleLead: "Terms of", titleAccent: "Service",
		lede: "The rules for using the Premier Limb Lengthening website, written in plain English, covering our medical disclaimer, individual-results notice, and text messaging program.",
		effective: "June 8, 2026",
	},
	{
		slug: "accessibility", title: "Accessibility Statement", tsx: "app/accessibility/page.tsx", constName: "ACCESSIBILITY_BODY",
		eyebrow: "Legal · Accessibility", titleLead: "Accessibility", titleAccent: "Statement",
		lede: "Our commitment to an accessible website, our work toward WCAG 2.1 Level AA, and how to reach us for help or an accommodation.",
		effective: "June 8, 2026",
	},
];

for (const legal of LEGAL_PAGES) {
	const md = extractLegalMarkdown(legal.tsx, legal.constName);
	const page = convertMarkdown(`# ${legal.title}\n\n${md}`, { rewriteImageSrc });
	// No _pll_seo_description seeded: the hand-written description in
	// pll-seo's defaults map is the parity source; seeded meta would override it.
	pushItem({
		title: legal.title,
		slug: legal.slug,
		type: "page",
		content: page.blocksHtml,
		date: "2026-06-08T09:00:00-07:00",
		link: `${ORIGIN}/${legal.slug}/`,
		meta: {
			_wp_page_template: "page-legal",
			_pll_legal_eyebrow: legal.eyebrow,
			_pll_legal_title_lead: legal.titleLead,
			_pll_legal_title_accent: legal.titleAccent,
			_pll_legal_lede: legal.lede,
			_pll_legal_effective: legal.effective,
		},
	});
}

/* ------------------------------------------------------------------ *
 * Assemble the WXR
 * ------------------------------------------------------------------ */
const authorsXml = AUTHORS.map(
	(a, i) => `\t<wp:author>
\t\t<wp:author_id>${i + 2}</wp:author_id>
\t\t<wp:author_login>${cdata(a.login)}</wp:author_login>
\t\t<wp:author_email>${cdata(a.email)}</wp:author_email>
\t\t<wp:author_display_name>${cdata(a.display)}</wp:author_display_name>
\t\t<wp:author_first_name>${cdata("")}</wp:author_first_name>
\t\t<wp:author_last_name>${cdata("")}</wp:author_last_name>
\t</wp:author>`
).join("\n");

const categoriesXml = Object.keys(CATEGORY_LABELS)
	.map(
		(slug, i) => `\t<wp:category>
\t\t<wp:term_id>${i + 10}</wp:term_id>
\t\t<wp:category_nicename>${cdata(slug)}</wp:category_nicename>
\t\t<wp:category_parent>${cdata("")}</wp:category_parent>
\t\t<wp:cat_name>${cdata(CATEGORY_LABELS[slug])}</wp:cat_name>
\t\t<wp:category_description>${cdata(CATEGORY_DESCRIPTIONS[slug])}</wp:category_description>
\t</wp:category>`
	)
	.join("\n");

const wxr = `<?xml version="1.0" encoding="UTF-8" ?>
<!-- Generated by wordpress/scripts/build-wxr.mjs — do not edit by hand.
     Source of truth: scraped_content/*.md + app/{privacy,terms,accessibility}/page.tsx -->
<rss version="2.0"
\txmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
\txmlns:content="http://purl.org/rss/1.0/modules/content/"
\txmlns:wfw="http://wellformedweb.org/CommentAPI/"
\txmlns:dc="http://purl.org/dc/elements/1.1/"
\txmlns:wp="http://wordpress.org/export/1.2/">
<channel>
\t<title>Premier Limb Lengthening</title>
\t<link>${ORIGIN}</link>
\t<description>Cosmetic limb lengthening, founded by Dr. Hrayr Basmajian</description>
\t<pubDate>${new Date("2026-06-10T12:00:00Z").toUTCString().replace("GMT", "+0000")}</pubDate>
\t<language>en-US</language>
\t<wp:wxr_version>1.2</wp:wxr_version>
\t<wp:base_site_url>${ORIGIN}</wp:base_site_url>
\t<wp:base_blog_url>${ORIGIN}</wp:base_blog_url>
${authorsXml}
${categoriesXml}
${items.join("\n")}
</channel>
</rss>
`;

writeFileSync(OUT, wxr);
console.log(`✓ ${path.relative(process.cwd(), OUT)} — ${items.length} items (16 posts expected + ${1 + SURGERY_CHILDREN.length} surgery pages + ${LEGAL_PAGES.length} legal pages)`);
