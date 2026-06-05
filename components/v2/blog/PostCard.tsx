import Link from "next/link";

export type PostDTO = {
  route: string;
  title: string;
  description: string;
  readingTime: number;
  category: string;
  categoryLabel: string;
  image?: { src: string; alt: string };
};

/**
 * PostCard — image-led blog card. Field order (image → terms → title → excerpt
 * → read-more) intentionally mirrors a WordPress Query Loop inner-block stack
 * so it transfers cleanly when the blog migrates to Gutenberg.
 */
export function PostCard({ post }: { post: PostDTO }) {
  return (
    <Link href={post.route} className="group block">
      <div className="relative aspect-[3/2] border border-ink overflow-hidden bg-paper-warm">
        {post.image ? (
          // Remote hero served from the live WordPress media library.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image.src}
            alt={post.image.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-spine-tint">
            <span className="font-serif italic text-spine text-[28px]">PLL</span>
          </div>
        )}
      </div>

      <div className="mt-4 font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted">
        {post.categoryLabel} · {post.readingTime} min
      </div>
      <h3 className="mt-2 font-serif font-medium text-[22px] lg:text-[24px] leading-[1.15] tracking-[-0.01em] text-ink group-hover:text-spine transition-colors max-w-[40ch]">
        {post.title}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft break-words line-clamp-2 max-w-[52ch]">
        {post.description}
      </p>
      <span className="mt-3 inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine border-b border-spine pb-0.5">
        Read
        <span className="font-serif italic text-[14px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
      </span>
    </Link>
  );
}
