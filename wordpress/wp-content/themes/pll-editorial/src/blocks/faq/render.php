<?php
/**
 * Render pll/faq front-end render.
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

// Server-side twin of the `isOpen` getter in src/blocks/faq/view.js. Without
// it the directive processor evaluates state.isOpen to null on the server and
// STRIPS the bound attribute, so every toggle shipped with no aria-expanded at
// all until JavaScript hydrated. A PHP closure is derived state: WordPress
// evaluates it while processing directives and does not serialize it to the
// client, so view.js stays the single source of truth after hydration.
wp_interactivity_state(
	'pll/faq',
	array(
		'isOpen' => static function () {
			$ctx = wp_interactivity_get_context( 'pll/faq' );
			return isset( $ctx['index'] ) && array_key_exists( 'openIndex', $ctx ) && $ctx['openIndex'] === $ctx['index'];
		},
	)
);

$pll_processor = new WP_HTML_Tag_Processor( $content );
$pll_index     = 0;
while ( $pll_processor->next_tag( array( 'class_name' => 'pll-faq-item' ) ) ) {
	$pll_processor->set_attribute( 'data-wp-context', wp_json_encode( array( 'index' => $pll_index ) ) );
	if ( 0 === $pll_index ) {
		$pll_processor->add_class( 'is-open' );
	}
	++$pll_index;
}
$pll_faq_html = $pll_processor->get_updated_html();
?>
<div
	class="pll-faq max-w-[1020px] mx-auto border-t border-ink"
	data-wp-interactive="pll/faq"
	data-wp-context='{"openIndex":0}'
>
	<?php echo $pll_faq_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- inner blocks markup. ?>
</div>
