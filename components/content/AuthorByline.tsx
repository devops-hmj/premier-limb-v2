import { cn } from "@/lib/cn";

type AuthorBylineProps = {
  /** Optional. Defaults to the practice as publisher. */
  author?: string;
  /** ISO date string when available. */
  date?: string;
  readingTime?: number;
  variant?: "inline" | "footer";
  className?: string;
};

/**
 * AuthorByline — inline meta row for article headers + a fuller footer card.
 * Renders a monogram avatar when no portrait is available (no avatar
 * assets shipped yet — see content pipeline).
 */
export function AuthorByline({
  author = "Premier Limb Lengthening",
  date,
  readingTime,
  variant = "inline",
  className,
}: AuthorBylineProps) {
  const initials = author
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center flex-wrap gap-x-4 gap-y-2 font-mono text-eyebrow tracking-eyebrow uppercase text-muted", className)}>
        <span className="flex items-center gap-2">
          <span aria-hidden className="grid place-items-center w-7 h-7 bg-spine-wash text-spine font-serif italic text-[14px]">
            {initials}
          </span>
          <span className="text-spine">{author}</span>
        </span>
        {date && (
          <>
            <span aria-hidden className="text-rule">·</span>
            <time dateTime={date}>{formatDate(date)}</time>
          </>
        )}
        {readingTime && (
          <>
            <span aria-hidden className="text-rule">·</span>
            <span>{readingTime} min read</span>
          </>
        )}
      </div>
    );
  }

  // footer variant
  return (
    <aside className={cn("surface px-7 py-8 flex items-start gap-5", className)}>
      <div aria-hidden className="grid place-items-center w-14 h-14 bg-spine-wash text-spine font-serif italic text-[28px] shrink-0">
        {initials}
      </div>
      <div className="min-w-0">
        <div className="font-mono text-eyebrow tracking-eyebrow uppercase text-muted">
          Written by
        </div>
        <div className="mt-1 font-serif text-d-s tracking-[-0.01em]">{author}</div>
        {date && (
          <div className="mt-2 font-mono text-eyebrow tracking-eyebrow uppercase text-muted">
            <time dateTime={date}>{formatDate(date)}</time>
            {readingTime && <span aria-hidden className="text-rule">{" · "}</span>}
            {readingTime && <span>{readingTime} min read</span>}
          </div>
        )}
      </div>
    </aside>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
