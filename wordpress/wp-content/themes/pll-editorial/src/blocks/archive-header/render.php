<?php
/**
 * Render pll/archive-header — port of the category archive header in
 * app/category/[slug]/page.tsx, with author/search variants.
 *
 * @package pll-editorial
 */

$pll_label       = '';
$pll_description = '';

if ( is_category() ) {
	$pll_label       = single_cat_title( '', false );
	$pll_description = trim( wp_strip_all_tags( category_description() ) );
} elseif ( is_author() ) {
	$pll_label       = get_the_author_meta( 'display_name', (int) get_query_var( 'author' ) );
	$pll_description = sprintf( 'Articles by %s for the Premier Limb Lengthening Blog.', $pll_label );
} elseif ( is_search() ) {
	$pll_label       = sprintf( 'Search: %s', get_search_query() );
	$pll_description = sprintf( 'Results for “%s”.', get_search_query() );
} else {
	$pll_label = get_the_archive_title();
}
?>
<section class="bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-12 lg:pb-14">
	<div class="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
		<div class="js-reveal col-span-12 lg:col-span-8">
			<nav aria-label="<?php esc_attr_e( 'Breadcrumb', 'pll-editorial' ); ?>" class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted mb-5">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-spine transition-colors"><?php esc_html_e( 'Home', 'pll-editorial' ); ?></a>
				<span aria-hidden="true" class="mx-2">·</span>
				<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="hover:text-spine transition-colors"><?php esc_html_e( 'Blog', 'pll-editorial' ); ?></a>
				<span aria-hidden="true" class="mx-2">·</span>
				<span class="text-ink"><?php echo esc_html( $pll_label ); ?></span>
			</nav>
			<h1 class="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[18ch] text-[clamp(40px,6vw,88px)]"><?php echo esc_html( $pll_label ); ?>.</h1>
		</div>
		<?php if ( $pll_description ) : ?>
		<div class="js-reveal pll-delay-100 col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule lg:self-end">
			<p class="font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft"><?php echo esc_html( $pll_description ); ?></p>
		</div>
		<?php endif; ?>
	</div>
</section>
