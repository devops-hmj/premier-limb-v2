<?php
/**
 * Front-end asset loading.
 *
 * @package pll-editorial
 */

add_action(
	'wp_enqueue_scripts',
	function () {
		$css = get_theme_file_path( 'assets/css/pll.css' );

		// Compiled Tailwind ships after wp-block-library so single-class utilities
		// win the cascade against core block styles.
		wp_enqueue_style(
			'pll-editorial',
			get_theme_file_uri( 'assets/css/pll.css' ),
			array( 'wp-block-library' ),
			file_exists( $css ) ? (string) filemtime( $css ) : '1.0.0'
		);

		$reveal = get_theme_file_path( 'assets/js/reveal.js' );
		if ( file_exists( $reveal ) ) {
			wp_enqueue_script_module(
				'pll/reveal',
				get_theme_file_uri( 'assets/js/reveal.js' ),
				array(),
				(string) filemtime( $reveal )
			);
		}
	}
);

/**
 * Progressive-enhancement marker: reveal animations only engage when JS runs.
 * Must execute before first paint, hence an inline script at the top of <head>.
 */
add_action(
	'wp_head',
	function () {
		echo "<script>document.documentElement.classList.add('js');</script>\n";
	},
	0
);
