<?php
/**
 * Render pll/related-posts — port of the "Keep reading." grid in app/[slug]/page.tsx.
 * Selection mirrors lib/content.ts getRelatedArticles(): same-category first
 * (newest first), then any other articles, excluding the current post, max 3.
 *
 * @package pll-editorial
 */

$pll_post = get_post();
if ( ! $pll_post ) {
	return;
}

$pll_cat_ids = wp_get_post_categories( $pll_post->ID );
$pll_related = array();

if ( $pll_cat_ids ) {
	$pll_related = get_posts(
		array(
			'post_type'      => 'post',
			'posts_per_page' => 3,
			'post__not_in'   => array( $pll_post->ID ),
			'category__in'   => $pll_cat_ids,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);
}

if ( count( $pll_related ) < 3 ) {
	$pll_exclude = array_merge( array( $pll_post->ID ), wp_list_pluck( $pll_related, 'ID' ) );
	$pll_fill    = get_posts(
		array(
			'post_type'      => 'post',
			'posts_per_page' => 3 - count( $pll_related ),
			'post__not_in'   => $pll_exclude,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);
	$pll_related = array_merge( $pll_related, $pll_fill );
}

if ( ! $pll_related ) {
	return;
}
?>
<section class="bg-paper py-20 lg:py-24 border-t border-rule">
	<div class="mx-auto max-w-wrap px-6 lg:px-12">
		<header class="js-reveal pb-6 mb-10 border-b border-ink flex items-end justify-between gap-6 flex-wrap">
			<h2 class="font-serif font-normal tracking-[-0.02em] text-ink leading-[1] text-[clamp(28px,3.8vw,48px)]">Keep <em class="italic text-spine">reading.</em></h2>
			<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine pb-1 hover:text-spine-deep"><?php esc_html_e( 'All articles →', 'pll-editorial' ); ?></a>
		</header>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-rule pt-10">
			<?php foreach ( $pll_related as $pll_i => $pll_rel ) : ?>
				<?php
				$pll_rel_cat  = pll_primary_category( $pll_rel );
				$pll_rel_desc = pll_card_description( $pll_rel );
				?>
			<article class="js-reveal" style="--reveal-delay:<?php echo esc_attr( (string) ( $pll_i * 0.08 ) ); ?>s">
				<a href="<?php echo esc_url( get_permalink( $pll_rel ) ); ?>" class="group block">
					<div class="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted mb-3"><?php echo esc_html( strtolower( str_replace( '-', ' ', $pll_rel_cat['slug'] ) ) ); ?> · <?php echo (int) pll_reading_time( $pll_rel ); ?> min</div>
					<h3 class="font-serif font-medium text-[22px] lg:text-[24px] leading-[1.15] tracking-[-0.01em] text-ink mb-3 group-hover:text-spine transition-colors"><?php echo esc_html( get_the_title( $pll_rel ) ); ?></h3>
					<p class="text-[14px] leading-[1.6] text-ink-soft mb-4 break-words line-clamp-3"><?php echo esc_html( $pll_rel_desc ); ?></p>
					<span class="font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine inline-flex items-center gap-2 border-b border-spine pb-0.5"><?php esc_html_e( 'Read', 'pll-editorial' ); ?><span class="font-serif italic text-[14px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>
				</a>
			</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>
