<?php
/**
 * Custom block registration.
 *
 * Blocks are authored in src/blocks/ and compiled by @wordpress/scripts into
 * build/, which is committed so the theme deploys without Node.
 *
 * @package pll-editorial
 */

add_action(
	'init',
	function () {
		$build_dir = get_theme_file_path( 'build' );
		if ( ! is_dir( $build_dir ) ) {
			return;
		}

		foreach ( glob( $build_dir . '/*/block.json' ) as $block_json ) {
			register_block_type( dirname( $block_json ) );
		}
	}
);
