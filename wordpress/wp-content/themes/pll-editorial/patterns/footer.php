<?php
/**
 * Title: Footer
 * Slug: pll/footer
 * Categories: pll-sections
 * Inserter: no
 *
 * Placeholder — replaced with the full editorial footer in Stage 2.
 *
 * @package pll-editorial
 */

$pll_info = pll_site_info();
?>
<!-- wp:group {"layout":{"type":"default"},"className":"bg-ink text-cream"} -->
<div class="wp-block-group bg-ink text-cream">
	<!-- wp:group {"layout":{"type":"default"},"className":"wrap py-2xl"} -->
	<div class="wp-block-group wrap py-2xl">
		<!-- wp:paragraph {"className":"font-mono uppercase text-t-xs tracking-wide"} -->
		<p class="font-mono uppercase text-t-xs tracking-wide"><?php echo esc_html( $pll_info['name'] ); ?> · <?php echo esc_html( $pll_info['phone'] ); ?></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
