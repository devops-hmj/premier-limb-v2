<?php
/**
 * pll/post-hero — featured-image figure from app/[slug]/page.tsx.
 *
 * @package pll-editorial
 */

$pll_post     = get_post();
$pll_thumb_id = $pll_post ? get_post_thumbnail_id( $pll_post ) : 0;
if ( ! $pll_thumb_id ) {
	return;
}
$pll_src = wp_get_attachment_image_url( $pll_thumb_id, 'full' );
$pll_alt = (string) get_post_meta( $pll_thumb_id, '_wp_attachment_image_alt', true );
if ( ! $pll_src ) {
	return;
}
?>
<figure class="mb-10 lg:mb-12">
	<div class="relative aspect-[16/9] border border-ink overflow-hidden bg-paper-warm">
		<img src="<?php echo esc_url( $pll_src ); ?>" alt="<?php echo esc_attr( $pll_alt ); ?>" class="absolute inset-0 w-full h-full object-cover"/>
	</div>
	<?php if ( $pll_alt ) : ?>
	<figcaption class="mt-3 font-mono uppercase tracking-[0.16em] text-[10px] text-muted"><?php echo esc_html( $pll_alt ); ?></figcaption>
	<?php endif; ?>
</figure>
