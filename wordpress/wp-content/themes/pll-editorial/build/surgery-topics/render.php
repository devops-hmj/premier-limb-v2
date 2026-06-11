<?php
/**
 * Render pll/surgery-topics — the two topic grids from app/your-surgery/page.tsx
 * ("all": every sub-page, numbered, with the editorial border lattice) and
 * app/your-surgery/[slug]/page.tsx ("siblings": three other topics).
 *
 * @package pll-editorial
 */

$pll_post    = get_post();
$pll_variant = $attributes['variant'] ?? 'siblings';

// The your-surgery parent: the overview page itself, or the current page's parent.
$pll_parent_id = 0;
if ( $pll_post ) {
	$pll_parent_id = $pll_post->post_parent ? (int) $pll_post->post_parent : (int) $pll_post->ID;
}
if ( ! $pll_parent_id ) {
	return;
}

$pll_topics = get_pages(
	array(
		'parent'      => $pll_parent_id,
		'sort_column' => 'menu_order',
		'sort_order'  => 'asc',
	)
);
if ( 'siblings' === $pll_variant && $pll_post ) {
	$pll_topics = array_values(
		array_filter(
			$pll_topics,
			static function ( $pll_t ) use ( $pll_post ) {
				return (int) $pll_t->ID !== (int) $pll_post->ID;
			}
		)
	);
	$pll_topics = array_slice( $pll_topics, 0, 3 );
}
if ( ! $pll_topics ) {
	return;
}

$pll_count = count( $pll_topics );
?>
<section class="bg-paper <?php echo 'all' === $pll_variant ? 'py-20 lg:py-28' : 'py-20 lg:py-24'; ?> border-t border-rule">
	<div class="mx-auto max-w-wrap px-6 lg:px-12">
		<?php if ( 'all' === $pll_variant ) : ?>
		<header class="js-reveal pb-8 mb-12 border-b border-ink">
			<p class="eyebrow mb-4"><?php esc_html_e( 'Read Further', 'pll-editorial' ); ?></p>
			<h2 class="mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[22ch] text-[clamp(36px,5.4vw,76px)]"><?php esc_html_e( 'Topics across', 'pll-editorial' ); ?> <em class="italic text-spine"><?php esc_html_e( 'your surgery journey.', 'pll-editorial' ); ?></em></h2>
		</header>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-ink">
			<?php foreach ( $pll_topics as $pll_i => $pll_topic ) : ?>
				<?php
				$pll_classes = array( 'js-reveal', 'py-10', 'pr-6' );
				if ( 0 !== $pll_i % 3 ) {
					$pll_classes[] = 'lg:pl-6';
				}
				if ( 0 !== ( $pll_i + 1 ) % 3 && $pll_i !== $pll_count - 1 ) {
					$pll_classes[] = 'lg:border-r';
				}
				if ( $pll_i < $pll_count - ( $pll_count % 3 ? $pll_count % 3 : 3 ) ) {
					$pll_classes[] = 'border-b';
				}
				$pll_classes[] = 'border-rule';
				?>
			<article class="<?php echo esc_attr( implode( ' ', $pll_classes ) ); ?>" style="--reveal-delay:<?php echo esc_attr( (string) ( ( $pll_i % 3 ) * 0.08 ) ); ?>s">
				<a href="<?php echo esc_url( get_permalink( $pll_topic ) ); ?>" class="group block">
					<div class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine mb-3"><?php echo esc_html( str_pad( (string) ( $pll_i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?> · <?php echo (int) pll_reading_time( $pll_topic ); ?> min read</div>
					<h3 class="font-serif font-medium text-[22px] lg:text-[24px] leading-[1.18] tracking-[-0.01em] text-ink mb-3 group-hover:text-spine transition-colors max-w-[26ch]"><?php echo esc_html( get_the_title( $pll_topic ) ); ?></h3>
					<p class="text-[14px] leading-[1.6] text-ink-soft max-w-[40ch] mb-4"><?php echo esc_html( (string) get_post_meta( $pll_topic->ID, '_pll_seo_description', true ) ); ?></p>
					<span class="font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine inline-flex items-center gap-2 border-b border-spine pb-0.5"><?php esc_html_e( 'Read', 'pll-editorial' ); ?><span class="font-serif italic text-[14px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>
				</a>
			</article>
			<?php endforeach; ?>
		</div>
		<?php else : ?>
		<header class="js-reveal pb-6 mb-10 border-b border-ink flex items-end justify-between gap-6 flex-wrap">
			<h2 class="font-serif font-normal tracking-[-0.02em] text-ink leading-[1] text-[clamp(28px,3.8vw,48px)]"><?php esc_html_e( 'Other', 'pll-editorial' ); ?> <em class="italic text-spine"><?php esc_html_e( 'surgery topics.', 'pll-editorial' ); ?></em></h2>
			<a href="<?php echo esc_url( home_url( '/your-surgery/' ) ); ?>" class="font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine pb-1 hover:text-spine-deep"><?php esc_html_e( 'Back to overview →', 'pll-editorial' ); ?></a>
		</header>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-rule pt-10">
			<?php foreach ( $pll_topics as $pll_i => $pll_topic ) : ?>
			<article class="js-reveal" style="--reveal-delay:<?php echo esc_attr( (string) ( $pll_i * 0.08 ) ); ?>s">
				<a href="<?php echo esc_url( get_permalink( $pll_topic ) ); ?>" class="group block">
					<div class="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted mb-3"><?php esc_html_e( 'Your Surgery', 'pll-editorial' ); ?> · <?php echo (int) pll_reading_time( $pll_topic ); ?> min</div>
					<h3 class="font-serif font-medium text-[22px] lg:text-[24px] leading-[1.18] tracking-[-0.01em] text-ink mb-3 group-hover:text-spine transition-colors"><?php echo esc_html( get_the_title( $pll_topic ) ); ?></h3>
					<p class="text-[14px] leading-[1.6] text-ink-soft mb-4"><?php echo esc_html( (string) get_post_meta( $pll_topic->ID, '_pll_seo_description', true ) ); ?></p>
					<span class="font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine inline-flex items-center gap-2 border-b border-spine pb-0.5"><?php esc_html_e( 'Read', 'pll-editorial' ); ?><span class="font-serif italic text-[14px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>
				</a>
			</article>
			<?php endforeach; ?>
		</div>
		<?php endif; ?>
	</div>
</section>
