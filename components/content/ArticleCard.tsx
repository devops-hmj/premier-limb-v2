import Link from "next/link";
import type { Page } from "@/lib/content";
import { cn } from "@/lib/cn";

type ArticleCardProps = {
  article: Page;
  variant?: "default" | "featured" | "compact";
  className?: string;
};

/**
 * ArticleCard — used in Index pages and the RelatedArticles row.
 *
 *   default  — standard 4:3 thumb + serif headline + meta
 *   featured — larger thumb (16:9) + slightly larger heading
 *   compact  — text-only, used in sidebars / lists
 *
 * Hover-rise mirrors the homepage testimonial cards.
 */
export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  return (
    <Link
      href={article.route}
      className={cn(
        "group block surface h-full flex flex-col",
        "transition-transform duration-300 ease-out",
        "hover:-translate-y-[3px] hover:shadow-edge-blue",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {variant !== "compact" && (
        <div className={cn("relative w-full bg-paper-warm", variant === "featured" ? "aspect-[16/9]" : "aspect-[4/3]")}>
          {/* No featured image until scraped assets are migrated — use an
              editorial gradient placeholder so the layout reads correctly. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #EAF0F3 0%, #F4F0E6 60%, #ECE8DE 100%)",
            }}
          />
          <div aria-hidden className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
            {article.category ?? "Article"}
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 p-6 sm:p-7 gap-4">
        {variant === "compact" && (
          <div className="font-mono text-eyebrow tracking-eyebrow uppercase text-spine">
            {article.category ?? "Article"}
          </div>
        )}
        <h3
          className={cn(
            "font-serif font-medium tracking-[-0.01em] leading-[1.18] flex-1",
            "transition-colors duration-300 group-hover:text-spine",
            "[&_em]:italic [&_em]:text-spine",
            variant === "featured" ? "text-d-m" : "text-d-s",
            variant === "compact" && "text-[20px]",
          )}
        >
          {article.title}
        </h3>
        {variant !== "compact" && article.description && (
          <p className="text-t-m text-ink-soft leading-[1.6] line-clamp-3">
            {article.description}
          </p>
        )}
        <div className="mt-2 flex items-center gap-3 pt-3 border-t border-rule font-mono text-eyebrow tracking-eyebrow uppercase text-muted">
          <span>{article.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
