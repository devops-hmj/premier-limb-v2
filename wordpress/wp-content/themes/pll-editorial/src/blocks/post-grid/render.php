<?php
/**
 * Render pll/post-grid — archive card grid from app/category/[slug]/page.tsx.
 * Renders the main query (category/author/search archives).
 *
 * @package pll-editorial
 */

global $wp_query;
$pll_archive_posts = $wp_query->posts ?? array();
$pll_found         = (int) ( $wp_query->found_posts ?? count( $pll_archive_posts ) );
?>
<section class="bg-paper-off py-16 lg:py-20">
	<div class="mx-auto max-w-wrap px-6 lg:px-12">
		<div class="font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted mb-6"><?php echo (int) $pll_found; ?> <?php echo esc_html( 1 === $pll_found ? 'article' : 'articles' ); ?></div>
		<?php if ( $pll_archive_posts ) : ?>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 border-t border-rule pt-10">
			<?php
			foreach ( $pll_archive_posts as $pll_i => $pll_p ) {
				echo pll_post_card_html( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- helper escapes.
					$pll_p,
					array( 'delay' => min( $pll_i, 5 ) * 0.06 )
				);
			}
			?>
		</div>
			<?php
		else :
			?>
		<p class="font-serif text-[22px] text-ink border-t border-rule pt-10"><?php esc_html_e( 'No articles found.', 'pll-editorial' ); ?></p>
		<?php endif; ?>
		<div class="mt-12 pt-8 border-t border-rule">
			<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine pb-1 hover:text-spine-deep"><?php esc_html_e( '← All articles', 'pll-editorial' ); ?></a>
		</div>
	</div>
</section>
