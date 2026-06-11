/**
 * md-to-blocks — converts scraped_content/*.md into Gutenberg block markup.
 *
 * Faithfully replicates the Next.js rendering pipeline:
 *   - lib/content.ts parseMarkdown(): strips the leading `# title`, the
 *     `**URL:**` line, the legacy "Related Articles" tail, the scraped
 *     preamble (everything through the "In THis Post" marker), orphan
 *     Setext `===` rows; derives the 157-char meta description.
 *   - components/content/Prose.tsx semantics: h1 suppressed, h2/h3 anchor
 *     ids via toSlug(), same-site links rewritten root-relative (trailing
 *     slash kept — WordPress canonical form), external links target=_blank,
 *     REMOTE images dropped (the hero renders as the featured image),
 *     local images kept (src rewritten via opts.rewriteImageSrc),
 *     blockquote → pll-callout style, GFM tables preserved.
 *
 * Output blocks carry NO presentation classes — single/page templates wrap
 * post content in `.pll-prose`, whose CSS replicates Prose.tsx styling, so
 * posts written later in Gutenberg inherit the same look.
 *
 * Usage as a module: import { convertMarkdown } from './md-to-blocks.mjs'
 * Usage as a CLI (golden testing): node scripts/md-to-blocks.mjs <file.md>
 */
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { readFileSync } from "node:fs";

const SAME_SITE = /^https?:\/\/(www\.)?premierlimblengthening\.com/i;

/* ------------------------------------------------------------------ *
 * Pre-processing — port of lib/content.ts parseMarkdown()
 * ------------------------------------------------------------------ */

export function preprocessMarkdown(raw) {
	const lines = raw.split(/\r?\n/);
	let rawTitle = "";
	const keep = [];
	for (const line of lines) {
		if (!rawTitle && line.startsWith("# ")) {
			rawTitle = line.slice(2).trim();
			continue;
		}
		if (line.startsWith("**URL:**")) continue;
		keep.push(line);
	}
	let body = keep.join("\n").trim();

	const relatedIdx = body.search(/^###\s+Related Articles\s*$/m);
	if (relatedIdx !== -1) {
		body = body.slice(0, relatedIdx).trim();
	}

	const inThisPost = body.match(/^In Th?is Post\s*$/im);
	if (inThisPost?.index !== undefined) {
		body = body.slice(inThisPost.index + inThisPost[0].length).trim();
	}

	body = body.replace(/^={3,}\s*$/gm, "").replace(/\n{3,}/g, "\n\n").trim();

	const firstParaMatch = body.match(/^(?!#|!\[|>|\*|-|_|=)(.{40,}?)(?=\n\n|\n#|$)/m);
	const firstPara = firstParaMatch?.[1] ?? body.slice(0, 220);
	const stripped = firstPara
		.replace(/!\[[^\]]*\]\([^)]*\)/g, "")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/[*_`>#]/g, "")
		.replace(/\s+/g, " ")
		.trim();
	const description =
		stripped.length > 160 ? stripped.slice(0, 157).trimEnd() + "…" : stripped;

	return { rawTitle, body, description };
}

/** Port of lib/content.ts cleanTitle(). */
export function cleanTitle(raw) {
	return raw.replace(/\s*\|\s*Premier Limb Lengthening( Institute)?$/i, "").trim();
}

/** Port of Prose.tsx toSlug() — heading anchor ids. */
export function toSlug(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

/* ------------------------------------------------------------------ *
 * mdast → block markup
 * ------------------------------------------------------------------ */

const esc = (s) =>
	s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");

const escAttr = (s) => esc(s).replace(/"/g, "&quot;");

function nodeText(node) {
	if (!node) return "";
	if (node.type === "text" || node.type === "inlineCode") return node.value ?? "";
	return (node.children ?? []).map(nodeText).join("");
}

/**
 * Render mdast phrasing content to inline HTML matching Prose.tsx:
 * same-site links → root-relative WITH trailing slash; external links →
 * target=_blank rel=noopener; remote inline images dropped.
 */
function renderInline(nodes, opts) {
	let out = "";
	for (const node of nodes ?? []) {
		switch (node.type) {
			case "text":
				out += esc(node.value);
				break;
			case "strong":
				out += `<strong>${renderInline(node.children, opts)}</strong>`;
				break;
			case "emphasis":
				out += `<em>${renderInline(node.children, opts)}</em>`;
				break;
			case "delete":
				out += `<s>${renderInline(node.children, opts)}</s>`;
				break;
			case "inlineCode":
				out += `<code>${esc(node.value)}</code>`;
				break;
			case "break":
				out += "<br>";
				break;
			case "link": {
				const raw = node.url ?? "";
				const stripped = raw.replace(SAME_SITE, "");
				const isSameSite = stripped !== raw;
				let href = raw;
				let external = false;
				if (isSameSite) {
					// WordPress canonical form: root-relative, trailing slash.
					href = stripped || "/";
					if (!href.startsWith("/")) href = "/" + href;
					if (!href.endsWith("/") && !href.includes("#") && !href.includes("?")) {
						href += "/";
					}
				} else {
					external = /^https?:\/\//i.test(raw);
				}
				const attrs = external
					? ` target="_blank" rel="noopener noreferrer"`
					: "";
				out += `<a href="${escAttr(href)}"${attrs}>${renderInline(node.children, opts)}</a>`;
				break;
			}
			case "image": {
				// Inline images inside a paragraph with other content: same policy
				// as block-level (remote dropped, local rewritten) but rendered
				// inline-less — Prose renders all images as block figures, so an
				// inline image with siblings is effectively dropped here too.
				break;
			}
			case "html":
				// Raw inline HTML from the scrape (rare). Drop — Prose's
				// react-markdown does not render raw HTML without rehype-raw.
				break;
			default:
				out += renderInline(node.children, opts);
		}
	}
	return out;
}

function imageBlock(node, opts) {
	const src = node.url ?? "";
	if (!src || /^https?:\/\//i.test(src)) {
		return null; // Prose suppresses remote images — featured image handles the hero.
	}
	const rewritten = opts.rewriteImageSrc ? opts.rewriteImageSrc(src) : src;
	if (!rewritten) return null;
	const caption = (node.alt ?? "").replace(/^[\\>]+/, "").trim();
	const alt = caption || "Limb Lengthening Surgery";
	const captionHtml = caption
		? `<figcaption class="wp-block-image-caption">${esc(caption)}</figcaption>`
		: "";
	return (
		`<!-- wp:image {"sizeSlug":"full"} -->\n` +
		`<figure class="wp-block-image size-full"><img src="${escAttr(rewritten)}" alt="${escAttr(alt)}"/>${captionHtml}</figure>\n` +
		`<!-- /wp:image -->`
	);
}

function listBlock(node, opts) {
	const ordered = Boolean(node.ordered);
	const items = (node.children ?? [])
		.map((li) => {
			// listItem children are paragraphs/lists; flatten paragraph wrappers.
			const parts = [];
			for (const child of li.children ?? []) {
				if (child.type === "paragraph") {
					parts.push(renderInline(child.children, opts));
				} else if (child.type === "list") {
					parts.push(listBlock(child, opts));
				} else {
					parts.push(renderInline([child], opts));
				}
			}
			return (
				`<!-- wp:list-item -->\n<li>${parts.join("")}</li>\n<!-- /wp:list-item -->`
			);
		})
		.join("\n");

	const tag = ordered ? "ol" : "ul";
	const attrs = ordered ? `{"ordered":true} ` : "";
	return (
		`<!-- wp:list ${attrs}-->\n<${tag} class="wp-block-list">\n${items}\n</${tag}>\n<!-- /wp:list -->`
	);
}

function tableBlock(node, opts) {
	const rows = node.children ?? [];
	if (!rows.length) return null;
	const [head, ...body] = rows;
	const cell = (c, tag) => `<${tag}>${renderInline(c.children, opts)}</${tag}>`;
	const row = (r, tag) =>
		`<tr>${(r.children ?? []).map((c) => cell(c, tag)).join("")}</tr>`;
	const thead = `<thead>${row(head, "th")}</thead>`;
	const tbody = `<tbody>${body.map((r) => row(r, "td")).join("")}</tbody>`;
	return (
		`<!-- wp:table -->\n<figure class="wp-block-table"><table class="has-fixed-layout">${thead}${tbody}</table></figure>\n<!-- /wp:table -->`
	);
}

/**
 * Convert preprocessed markdown body → Gutenberg block markup.
 *
 * @param {string} body Preprocessed markdown (preprocessMarkdown().body).
 * @param {object} opts { rewriteImageSrc?: (src) => string|null }
 * @returns {string} Block markup for post_content.
 */
export function bodyToBlocks(body, opts = {}) {
	const tree = unified().use(remarkParse).use(remarkGfm).parse(body);
	const blocks = [];

	for (const node of tree.children ?? []) {
		switch (node.type) {
			case "heading": {
				if (node.depth === 1) break; // h1 suppressed (template owns the H1)
				const level = Math.min(node.depth, 6);
				const inline = renderInline(node.children, opts);
				if (level === 2 || level === 3) {
					const id = toSlug(nodeText(node));
					const attrs =
						level === 2
							? `{"anchor":"${id}"}`
							: `{"anchor":"${id}","level":3}`;
					blocks.push(
						`<!-- wp:heading ${attrs} -->\n<h${level} class="wp-block-heading" id="${escAttr(id)}">${inline}</h${level}>\n<!-- /wp:heading -->`
					);
				} else {
					blocks.push(
						`<!-- wp:heading {"level":${level}} -->\n<h${level} class="wp-block-heading">${inline}</h${level}>\n<!-- /wp:heading -->`
					);
				}
				break;
			}
			case "paragraph": {
				// Image-only paragraph → image block (or dropped if remote).
				const meaningful = (node.children ?? []).filter(
					(c) => !(c.type === "text" && !c.value.trim())
				);
				if (meaningful.length === 1 && meaningful[0].type === "image") {
					const img = imageBlock(meaningful[0], opts);
					if (img) blocks.push(img);
					break;
				}
				const inline = renderInline(node.children, opts).trim();
				if (inline) {
					blocks.push(
						`<!-- wp:paragraph -->\n<p>${inline}</p>\n<!-- /wp:paragraph -->`
					);
				}
				break;
			}
			case "list":
				blocks.push(listBlock(node, opts));
				break;
			case "blockquote": {
				const inner = (node.children ?? [])
					.map((child) =>
						child.type === "paragraph"
							? `<!-- wp:paragraph -->\n<p>${renderInline(child.children, opts)}</p>\n<!-- /wp:paragraph -->`
							: ""
					)
					.filter(Boolean)
					.join("\n");
				blocks.push(
					`<!-- wp:quote {"className":"is-style-pll-callout"} -->\n<blockquote class="wp-block-quote is-style-pll-callout">\n${inner}\n</blockquote>\n<!-- /wp:quote -->`
				);
				break;
			}
			case "thematicBreak":
				blocks.push(
					`<!-- wp:separator {"className":"is-style-pll-hair"} -->\n<hr class="wp-block-separator has-alpha-channel-opacity is-style-pll-hair"/>\n<!-- /wp:separator -->`
				);
				break;
			case "table": {
				const table = tableBlock(node, opts);
				if (table) blocks.push(table);
				break;
			}
			case "code":
				blocks.push(
					`<!-- wp:code -->\n<pre class="wp-block-code"><code>${esc(node.value ?? "")}</code></pre>\n<!-- /wp:code -->`
				);
				break;
			case "html":
				break; // raw HTML dropped (parity with react-markdown default)
			default:
				break;
		}
	}

	return blocks.join("\n\n");
}

/**
 * Full conversion: raw scraped markdown → { title, blocksHtml, description }.
 */
export function convertMarkdown(raw, opts = {}) {
	const { rawTitle, body, description } = preprocessMarkdown(raw);
	return {
		rawTitle,
		title: cleanTitle(rawTitle),
		description,
		blocksHtml: bodyToBlocks(body, opts),
	};
}

/* CLI: node scripts/md-to-blocks.mjs <file.md> — prints the block markup. */
if (process.argv[1] && process.argv[1].endsWith("md-to-blocks.mjs") && process.argv[2]) {
	const raw = readFileSync(process.argv[2], "utf8");
	const result = convertMarkdown(raw, {
		rewriteImageSrc: (src) =>
			src.startsWith("/images/") || src.startsWith("/dr-")
				? "/wp-content/uploads/pll" + src.replace(/^\/images/, "")
				: src,
	});
	console.log("TITLE:", result.title);
	console.log("DESCRIPTION:", result.description);
	console.log("---");
	console.log(result.blocksHtml);
}
