<?php
/**
 * Register the pll/consult-form block from the committed build output.
 *
 * @package pll-forms
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	function () {
		$block = PLL_FORMS_DIR . 'build/consult-form/block.json';
		if ( file_exists( $block ) ) {
			register_block_type( dirname( $block ) );
		}
	}
);
