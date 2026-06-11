<?php
/**
 * Front-end asset loading.
 *
 * @package pll-editorial
 */

add_action(
	'wp_enqueue_scripts',
	function () {
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
 * Print the compiled Tailwind bundle as the LAST stylesheet in <head>.
 *
 * It cannot go through wp_enqueue_style: core prints per-block styles and
 * the theme.json global styles as standalone <style> tags AFTER every
 * enqueued <link>, so rules like
 * `:root :where(.wp-element-button, .wp-block-button__link)` (padding,
 * inherited font-size, core grey background) tie the single-class Tailwind
 * utilities on specificity and win on document order — observed as every
 * CTA button collapsing from 56px to 28px. Printing the bundle at wp_head
 * priority 9999 puts the design system after all core CSS deterministically.
 * The editor canvas gets the same file via add_editor_style (inc/editor.php).
 */
add_action(
	'wp_head',
	function () {
		$css = get_theme_file_path( 'assets/css/pll.css' );
		if ( ! file_exists( $css ) ) {
			return;
		}
		printf(
			'<link rel="stylesheet" id="pll-editorial-css" href="%s" media="all" />' . "\n",
			esc_url( get_theme_file_uri( 'assets/css/pll.css' ) . '?ver=' . filemtime( $css ) )
		);
	},
	9999
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

/**
 * Preload the above-the-fold font files (the Next build does the same via
 * next/font). Besides first-paint performance, this is load-bearing for
 * layout parity: with lazy font loading Chromium resolves ch units against
 * the FALLBACK font at first style resolution and keeps that width after
 * the swap — every max-w-[Nch] clamp measured Consolas zeros instead of
 * JetBrains Mono and wrapped differently than the Next build.
 */
add_action(
	'wp_head',
	function () {
		$fonts = array(
			'newsreader-latin-wght-normal.woff2',
			'newsreader-latin-wght-italic.woff2',
			'inter-tight-latin-wght-normal.woff2',
			'jetbrains-mono-latin-wght-normal.woff2',
		);
		foreach ( $fonts as $font ) {
			printf(
				'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin />' . "\n",
				esc_url( get_theme_file_uri( 'assets/fonts/' . $font ) )
			);
		}
	},
	1
);
