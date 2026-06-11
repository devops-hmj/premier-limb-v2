<?php
/**
 * pll/post-header — port of the article header in app/[slug]/page.tsx.
 *
 * @package pll-editorial
 */

$pll_post = get_post();
if ( ! $pll_post ) {
	return;
}
$pll_cat  = pll_primary_category( $pll_post );
$pll_date = pll_card_date( $pll_post );
?>
<header class="border-b border-ink pt-28 lg:pt-36 pb-12 lg:pb-16">
	<div class="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
		<div class="js-reveal col-span-12 lg:col-span-9">
			<nav aria-label="<?php esc_attr_e( 'Breadcrumb', 'pll-editorial' ); ?>" class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted mb-5">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-spine transition-colors"><?php esc_html_e( 'Home', 'pll-editorial' ); ?></a>
				<span aria-hidden="true" class="mx-2">·</span>
				<a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="hover:text-spine transition-colors"><?php esc_html_e( 'Blog', 'pll-editorial' ); ?></a>
				<span aria-hidden="true" class="mx-2">·</span>
				<a href="<?php echo esc_url( get_category_link( get_cat_ID( $pll_cat['label'] ) ) ); ?>" class="text-ink hover:text-spine transition-colors"><?php echo esc_html( $pll_cat['label'] ); ?></a>
			</nav>
			<h1 class="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[22ch] text-[clamp(36px,5.8vw,96px)]"><?php echo esc_html( get_the_title( $pll_post ) ); ?></h1>
			<div class="mt-7 pt-5 border-t border-rule flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono uppercase tracking-[0.18em] text-[11px] text-muted">
				<span><span class="text-ink font-medium"><?php esc_html_e( 'Reading', 'pll-editorial' ); ?></span> · <?php echo (int) pll_reading_time( $pll_post ); ?> min</span>
				<span><span class="text-ink font-medium"><?php esc_html_e( 'Category', 'pll-editorial' ); ?></span> · <a href="<?php echo esc_url( get_category_link( get_cat_ID( $pll_cat['label'] ) ) ); ?>" class="hover:text-spine transition-colors"><?php echo esc_html( $pll_cat['label'] ); ?></a></span>
				<span><span class="text-ink font-medium"><?php esc_html_e( 'By', 'pll-editorial' ); ?></span> · Dr. Hrayr Basmajian</span>
				<span><span class="text-ink font-medium"><?php esc_html_e( 'Published', 'pll-editorial' ); ?></span> · <time datetime="<?php echo esc_attr( get_post_time( 'c', false, $pll_post, true ) ); ?>"><?php echo esc_html( $pll_date ); ?></time></span>
			</div>
		</div>
	</div>
</header>
