<?php
/**
 * Render pll/blog-index — port of components/v2/blog/BlogIndex.tsx.
 *
 * Server renders the toolbar, category tabs (with counts), every post card
 * (filterable data attributes), the load-more control, and the empty state.
 * view.js drives search/filter/pagination exactly like the React original
 * (PAGE_SIZE 9, filter over title+description+category label).
 *
 * @package pll-editorial
 */

$pll_posts = get_posts(
	array(
		'post_type'      => 'post',
		'posts_per_page' => -1,
		'orderby'        => 'date',
		'order'          => 'DESC',
	)
);

$pll_counts = array();
foreach ( $pll_posts as $pll_p ) {
	$pll_c                        = pll_primary_category( $pll_p );
	$pll_counts[ $pll_c['slug'] ] = $pll_counts[ $pll_c['slug'] ] ?? array(
		'label' => $pll_c['label'],
		'count' => 0,
	);
	++$pll_counts[ $pll_c['slug'] ]['count'];
}

// Mirror lib/content.ts CATEGORY_ORDER for tab ordering.
$pll_order = array( 'limb-lengthening', 'bone-health', 'impact-on-the-body', 'after-limb-lengthening', 'paying-for-limb-lengthening' );
$pll_tabs  = array(
	array(
		'slug'  => 'all',
		'label' => 'All',
		'count' => count( $pll_posts ),
	),
);
foreach ( $pll_order as $pll_slug ) {
	if ( isset( $pll_counts[ $pll_slug ] ) ) {
		$pll_tabs[] = array(
			'slug'  => $pll_slug,
			'label' => $pll_counts[ $pll_slug ]['label'],
			'count' => $pll_counts[ $pll_slug ]['count'],
		);
	}
}
foreach ( $pll_counts as $pll_slug => $pll_info ) {
	if ( ! in_array( $pll_slug, $pll_order, true ) ) {
		$pll_tabs[] = array(
			'slug'  => $pll_slug,
			'label' => $pll_info['label'],
			'count' => $pll_info['count'],
		);
	}
}

$pll_total     = count( $pll_posts );
$pll_page_size = 9;
?>
<div class="pll-blog-index" data-page-size="<?php echo (int) $pll_page_size; ?>">
	<section class="bg-paper-off border-b border-rule">
		<div class="mx-auto max-w-wrap px-6 lg:px-12 py-5 lg:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
			<div class="relative w-full sm:max-w-[400px]">
				<label for="blog-search" class="sr-only"><?php esc_html_e( 'Search articles', 'pll-editorial' ); ?></label>
				<span aria-hidden="true" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-[15px]">⌕</span>
				<input id="blog-search" type="search" placeholder="SEARCH ARTICLES" class="pll-blog-search w-full border border-ink bg-paper pl-9 pr-9 py-3 font-mono uppercase tracking-[0.14em] text-[11px] text-ink placeholder:text-muted focus:outline-none focus:border-spine"/>
				<button type="button" aria-label="<?php esc_attr_e( 'Clear search', 'pll-editorial' ); ?>" class="pll-blog-clear absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-spine text-[16px] leading-none" hidden>×</button>
			</div>
			<div aria-live="polite" class="pll-blog-count font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted"><?php echo (int) $pll_total; ?> <?php echo esc_html( 1 === $pll_total ? 'article' : 'articles' ); ?></div>
		</div>
	</section>

	<section class="bg-paper-off border-b border-rule">
		<div class="mx-auto max-w-wrap px-6 lg:px-12 py-4 lg:py-5">
			<div class="flex gap-5 lg:gap-6 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				<?php foreach ( $pll_tabs as $pll_i => $pll_tab ) : ?>
				<button type="button" data-category="<?php echo esc_attr( $pll_tab['slug'] ); ?>" aria-pressed="<?php echo 0 === $pll_i ? 'true' : 'false'; ?>" class="pll-blog-tab shrink-0 pb-1.5 font-mono uppercase tracking-[0.18em] text-[11px] border-b-2 transition-colors focus:outline-none focus-visible:text-spine <?php echo 0 === $pll_i ? 'text-spine border-spine' : 'text-muted border-transparent hover:text-ink'; ?>">
					<?php echo esc_html( $pll_tab['label'] ); ?><?php echo 'all' !== $pll_tab['slug'] ? ' · ' . (int) $pll_tab['count'] : ''; ?>
				</button>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<section class="bg-paper-off py-16 lg:py-20">
		<div class="mx-auto max-w-wrap px-6 lg:px-12">
			<div class="pll-blog-empty py-16 text-center border-t border-rule" hidden>
				<div class="font-mono uppercase tracking-[0.22em] text-[10.5px] text-muted mb-4"><?php esc_html_e( 'No results', 'pll-editorial' ); ?></div>
				<p class="font-serif text-[22px] lg:text-[26px] text-ink mb-6"><?php esc_html_e( 'Nothing here yet for', 'pll-editorial' ); ?> <em class="pll-blog-empty-term italic text-spine"></em>.</p>
				<button type="button" class="pll-blog-reset inline-flex items-center gap-2 px-5 py-3 border border-ink font-mono uppercase tracking-[0.18em] text-[11px] text-ink hover:bg-spine hover:text-paper hover:border-spine transition-colors"><?php esc_html_e( 'Clear filters', 'pll-editorial' ); ?></button>
			</div>

			<div class="pll-blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 border-t border-rule pt-10">
				<?php
				foreach ( $pll_posts as $pll_i => $pll_p ) {
					echo pll_post_card_html( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- helper escapes.
						$pll_p,
						array(
							'delay'      => min( $pll_i, 5 ) * 0.06,
							'filterable' => true,
						)
					);
				}
				?>
			</div>

			<div class="pll-blog-more mt-12 lg:mt-16 flex flex-col items-center gap-3"<?php echo $pll_total <= $pll_page_size ? ' hidden' : ''; ?>>
				<button type="button" class="pll-blog-more-btn inline-flex items-center gap-3 px-6 py-3.5 border border-ink font-mono uppercase tracking-[0.18em] text-[11px] text-ink hover:bg-spine hover:text-paper hover:border-spine transition-colors">
					<?php esc_html_e( 'Load more articles', 'pll-editorial' ); ?>
					<span class="font-serif italic text-[15px]" aria-hidden="true">↓</span>
				</button>
				<div class="pll-blog-showing font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted"></div>
			</div>
		</div>
	</section>
</div>
