<?php
/**
 * pll/faq front-end render.
 *
 * Port of the accordion shell in components/v2/FaqV2.tsx. Children are
 * pll/faq-item blocks; this wrapper assigns each item its index (for the
 * single-open accordion context) and opens the first item by default,
 * mirroring the React `openIdx = 0` initial state. Question numbering is a
 * CSS counter, so reordering items in the editor renumbers automatically.
 *
 * @package pll-editorial
 *
 * @var string $content Inner blocks markup (pll/faq-item).
 */

$pll_processor = new WP_HTML_Tag_Processor( $content );
$pll_index     = 0;
while ( $pll_processor->next_tag( array( 'class_name' => 'pll-faq-item' ) ) ) {
	$pll_processor->set_attribute( 'data-wp-context', wp_json_encode( array( 'index' => $pll_index ) ) );
	if ( 0 === $pll_index ) {
		$pll_processor->add_class( 'is-open' );
	}
	++$pll_index;
}
$content = $pll_processor->get_updated_html();
?>
<div
	class="pll-faq max-w-[1020px] mx-auto border-t border-ink"
	data-wp-interactive="pll/faq"
	data-wp-context='{"openIndex":0}'
>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- inner blocks markup. ?>
</div>
