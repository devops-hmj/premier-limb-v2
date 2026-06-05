import fs from "node:fs";
import path from "node:path";

/**
 * Content loader for scraped markdown.
 * Server-only — uses `fs`, so do not import into client components.
 *
 * Reads from `scraped_content/` and from `scraped_content/sitemap_data.json`
 * to expose:
 *   • a strongly-typed inventory of every published page
 *   • per-page markdown + a derived stripped-summary for SEO descriptions
 *   • slug-to-file mapping helpers for the dynamic routes
 */

const CONTENT_DIR = path.join(process.cwd(), "scraped_content");

export type PageKind =
  | "article"
  | "service-overview"
  | "service-sub"
  | "profile"
  | "pricing"
  | "consult"
  | "blog-index"
  | "category"
  | "author"
  | "video"
  | "home";

export type Page = {
  /** Full local route, including leading slash. */
  route: string;
  /** Original wordpress URL (for canonicals + sitemap reference). */
  legacyUrl: string;
  /** Markdown filename in scraped_content/. */
  file: string;
  /** Source title from sitemap_data.json. */
  rawTitle: string;
  /** SEO-friendly title (without the trailing site name). */
  title: string;
  /** First paragraph stripped of markdown — used for OG/meta descriptions. */
  description: string;
  /** Reading time in minutes (rounded, min 1). */
  readingTime: number;
  /** Page archetype — drives template selection. */
  kind: PageKind;
  /** For articles: derived category slug (best-effort). */
  category?: string;
  /** For categories/authors/services: the slug fragment after the prefix. */
  slug: string;
  /** Raw markdown body (with the `**URL:**` line removed). */
  body: string;
};

type SitemapEntry = { title: string; url: string; file: string };

/** Read once at module load — server-side, runs at build time. */
const sitemapRaw: SitemapEntry[] = JSON.parse(
  fs.readFileSync(path.join(CONTENT_DIR, "sitemap_data.json"), "utf8"),
);

/** Map a legacy WordPress URL to a local Next.js route. */
function urlToRoute(url: string): string {
  const u = new URL(url);
  let p = u.pathname.replace(/\/$/, "");
  if (p === "") p = "/";
  return p;
}

/** Heuristic mapping from filename → archetype. */
function detectKind(file: string, route: string): PageKind {
  if (route === "/") return "home";
  if (file === "dr-basmajian.md") return "profile";
  if (file === "your-surgery.md") return "service-overview";
  if (file === "limb-lengthening-pricing-options.md") return "pricing";
  if (file === "consult.md") return "consult";
  if (file === "blog.md") return "blog-index";
  if (file.startsWith("category_")) return "category";
  if (file.startsWith("author_")) return "author";
  if (file.startsWith("video_")) return "video";
  if (file.startsWith("your-surgery_")) return "service-sub";
  return "article";
}

/** Strip the leading `# Title`, `**URL:** …` lines, and the trailing
 *  "Related Articles" block (we render our own related-articles card grid
 *  at the bottom of every article template, which links to local routes.
 *  Keeping the legacy section in-body would duplicate it as broken-image
 *  blue text links to the old WP URLs). */
function parseMarkdown(raw: string): {
  rawTitle: string;
  body: string;
  description: string;
} {
  const lines = raw.split(/\r?\n/);
  let rawTitle = "";
  const keep: string[] = [];
  for (const line of lines) {
    if (!rawTitle && line.startsWith("# ")) {
      rawTitle = line.slice(2).trim();
      continue;
    }
    if (line.startsWith("**URL:**")) continue;
    keep.push(line);
  }
  let body = keep.join("\n").trim();

  // Drop the "### Related Articles" section and everything after it.
  // The scraped articles end with a legacy related-articles widget that
  // links back to the WordPress origin — we replace it with our own
  // properly-routed related grid in the template.
  const relatedIdx = body.search(/^###\s+Related Articles\s*$/m);
  if (relatedIdx !== -1) {
    body = body.slice(0, relatedIdx).trim();
  }

  // Drop the scraped article preamble. The WordPress export prefixes every
  // article body with a duplicate Setext title, a "### <Category>" line, an
  // "![icon] Share" line, and a row of social-share links, ending in a stray
  // "In This Post" marker just before the real content. When that marker is
  // present, slice it (and everything above it) away. Guarded on the marker so
  // non-article pages — which have no such preamble — are left untouched.
  const inThisPostMatch = body.match(/^In Th?is Post\s*$/im);
  if (inThisPostMatch?.index !== undefined) {
    body = body.slice(inThisPostMatch.index + inThisPostMatch[0].length).trim();
  }

  // Remove orphan Setext-underline rows ("====") left over from scraped image
  // headings. They are not real headings here, and would otherwise leak into
  // the auto-description (and render as a stray full-width rule in the body).
  body = body.replace(/^={3,}\s*$/gm, "").replace(/\n{3,}/g, "\n\n").trim();

  // First meaningful paragraph — strip markdown syntax for the meta description.
  // Exclude lines starting with markup chars (and "=" Setext underlines).
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

/** Slightly tighter SEO title — strip the site-name suffix that some scraped titles carry. */
function cleanTitle(raw: string): string {
  return raw
    .replace(/\s*\|\s*Premier Limb Lengthening( Institute)?$/i, "")
    .trim();
}

function readingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function deriveCategory(file: string): string | undefined {
  // Crude mapping; can be refined when category metadata is added to MD frontmatter.
  if (file.includes("bone-health") || file.includes("nutrition"))
    return "bone-health";
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

function slugFromFile(file: string, kind: PageKind): string {
  const base = file.replace(/\.md$/, "");
  if (kind === "category") return base.replace(/^category_/, "");
  if (kind === "author") return base.replace(/^author_/, "");
  if (kind === "video") return base.replace(/^video_/, "");
  if (kind === "service-sub") return base.replace(/^your-surgery_/, "");
  return base;
}

let _allCache: Page[] | null = null;

/** Load every page, parsed and typed. Cached for the lifetime of the build. */
export function getAllPages(): Page[] {
  if (_allCache) return _allCache;
  const pages: Page[] = sitemapRaw.map((entry) => {
    const route = urlToRoute(entry.url);
    const kind = detectKind(entry.file, route);
    const raw = fs.readFileSync(path.join(CONTENT_DIR, entry.file), "utf8");
    const { rawTitle, body, description } = parseMarkdown(raw);
    return {
      route,
      legacyUrl: entry.url,
      file: entry.file,
      rawTitle: rawTitle || entry.title,
      title: cleanTitle(rawTitle || entry.title),
      description,
      readingTime: readingMinutes(body),
      kind,
      category: kind === "article" ? deriveCategory(entry.file) : undefined,
      slug: slugFromFile(entry.file, kind),
      body,
    };
  });
  _allCache = pages;
  return pages;
}

export function getPageByRoute(route: string): Page | undefined {
  return getAllPages().find((p) => p.route === route);
}

export function getPagesByKind(kind: PageKind): Page[] {
  return getAllPages().filter((p) => p.kind === kind);
}

export function getArticles(): Page[] {
  // Top-level articles only (kind === "article"). Service sub-pages and videos
  // intentionally excluded — those have their own listing surfaces.
  return getAllPages().filter((p) => p.kind === "article");
}

export function getRelatedArticles(currentSlug: string, category?: string, limit = 3): Page[] {
  const all = getArticles().filter((p) => p.slug !== currentSlug);
  const sameCategory = category ? all.filter((p) => p.category === category) : [];
  // Fall back to any articles if there aren't enough in-category.
  return [...sameCategory, ...all.filter((p) => !sameCategory.includes(p))].slice(0, limit);
}

export const ORIGIN = "https://premierlimblengthening.com";

/** All published routes — used by the sitemap. */
export function getAllRoutes(): string[] {
  return getAllPages().map((p) => p.route);
}
