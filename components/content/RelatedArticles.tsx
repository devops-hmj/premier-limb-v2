import { Container, Eyebrow } from "@/components/primitives";
import { getRelatedArticles } from "@/lib/content";
import { ArticleCard } from "./ArticleCard";

type RelatedArticlesProps = {
  currentSlug: string;
  category?: string;
  limit?: number;
};

/**
 * RelatedArticles — 3-card row appended to the bottom of articles.
 * Pulls in-category siblings first, then any other articles to fill.
 */
export function RelatedArticles({ currentSlug, category, limit = 3 }: RelatedArticlesProps) {
  const items = getRelatedArticles(currentSlug, category, limit);
  if (items.length === 0) return null;

  return (
    <section className="bg-cream border-t border-rule">
      <Container className="py-section">
        <Eyebrow>Continue reading · § 07</Eyebrow>
        <h2 className="mt-5 font-serif font-medium text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.04] tracking-[-0.02em] [&_em]:italic [&_em]:text-spine [text-wrap:balance]">
          More from the <em>Premier Limb Lengthening</em> journal.
        </h2>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((article) => (
            <li key={article.route} className="h-full">
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
