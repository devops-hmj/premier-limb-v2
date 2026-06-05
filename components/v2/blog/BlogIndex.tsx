"use client";

import { useMemo, useState } from "react";
import { Reveal } from "../Reveal";
import { PostCard, type PostDTO } from "./PostCard";

type CategoryDef = { slug: string; label: string; count: number };

const PAGE_SIZE = 9;

/**
 * BlogIndex — client controller for the blog index: client-side search +
 * category filtering over the build-time post set, plus load-more pagination.
 * The server page (app/blog/page.tsx) loads the posts and passes a plain DTO
 * array, mirroring how a WordPress Query Loop separates query from presentation.
 */
export function BlogIndex({
  posts,
  categories,
}: {
  posts: PostDTO[];
  categories: CategoryDef[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [posts, query, activeCategory]);

  const visible = filtered.slice(0, visibleCount);

  const resetPaging = () => setVisibleCount(PAGE_SIZE);
  const clearAll = () => {
    setQuery("");
    setActiveCategory("all");
    resetPaging();
  };

  return (
    <>
      {/* Toolbar: search + live result count */}
      <section className="bg-paper-off border-b border-rule">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 py-5 lg:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <div className="relative w-full sm:max-w-[400px]">
            <label htmlFor="blog-search" className="sr-only">Search articles</label>
            <span aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-[15px]">⌕</span>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPaging();
              }}
              placeholder="SEARCH ARTICLES"
              className="w-full border border-ink bg-paper pl-9 pr-9 py-3 font-mono uppercase tracking-[0.14em] text-[11px] text-ink placeholder:text-muted focus:outline-none focus:border-spine"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-spine text-[16px] leading-none"
              >
                ×
              </button>
            )}
          </div>
          <div
            aria-live="polite"
            className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted"
          >
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            {query ? ` for “${query}”` : ""}
          </div>
        </div>
      </section>

      {/* Category navigation tabs */}
      <section className="bg-paper-off border-b border-rule">
        <div className="mx-auto max-w-wrap px-6 lg:px-12 py-4 lg:py-5">
          <div className="flex gap-5 lg:gap-6 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => {
              const active = activeCategory === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setActiveCategory(c.slug);
                    resetPaging();
                  }}
                  className={`shrink-0 pb-1.5 font-mono uppercase tracking-[0.18em] text-[11px] border-b-2 transition-colors focus:outline-none focus-visible:text-spine ${
                    active
                      ? "text-spine border-spine"
                      : "text-muted border-transparent hover:text-ink"
                  }`}
                >
                  {c.label}
                  {c.slug !== "all" ? ` · ${c.count}` : ""}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid / empty state */}
      <section className="bg-paper-off py-16 lg:py-20">
        <div className="mx-auto max-w-wrap px-6 lg:px-12">
          {visible.length === 0 ? (
            <div className="py-16 text-center border-t border-rule">
              <div className="font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted mb-4">
                No results
              </div>
              <p className="font-serif text-[22px] lg:text-[26px] text-ink mb-6">
                Nothing here yet for{" "}
                <em className="italic text-spine">“{query || activeCategory}”</em>.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-2 px-5 py-3 border border-ink font-mono uppercase tracking-[0.18em] text-[11px] text-ink hover:bg-spine hover:text-paper hover:border-spine transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 border-t border-rule pt-10">
                {visible.map((p, i) => (
                  <Reveal key={p.route} delay={Math.min(i, 5) * 0.06} as="article">
                    <PostCard post={p} />
                  </Reveal>
                ))}
              </div>

              {visible.length < filtered.length && (
                <div className="mt-12 lg:mt-16 flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                    className="inline-flex items-center gap-3 px-6 py-3.5 border border-ink font-mono uppercase tracking-[0.18em] text-[11px] text-ink hover:bg-spine hover:text-paper hover:border-spine transition-colors"
                  >
                    Load more articles
                    <span className="font-serif italic text-[15px]" aria-hidden>↓</span>
                  </button>
                  <div className="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted">
                    Showing {visible.length} of {filtered.length}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
