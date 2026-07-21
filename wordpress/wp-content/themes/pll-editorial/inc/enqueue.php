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
				// Content hash, not filemtime — see the stylesheet note below.
				substr( (string) md5_file( $reveal ), 0, 12 )
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
		// Cache-bust by CONTENT hash, not filemtime: deploy tools that preserve
		// file modification times (observed on the 2026-07 HIPAA Vault upload)
		// leave an mtime-based ?ver unchanged, so returning browsers keep
		// serving their stale cached stylesheet against new markup. The hash
		// changes iff the bytes change. Cached per-request via static.
		static $pll_css_ver = null;
		if ( null === $pll_css_ver ) {
			$pll_css_ver = substr( (string) md5_file( $css ), 0, 12 );
		}
		printf(
			// phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedStylesheet -- deliberate: wp_enqueue_style() prints before core's per-block <style> tags and loses the cascade (docs/PARITY.md root cause 1).
			'<link rel="stylesheet" id="pll-editorial-css" href="%s" media="all" />' . "\n",
			esc_url( get_theme_file_uri( 'assets/css/pll.css' ) . '?ver=' . $pll_css_ver )
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
		// All four above-the-fold faces (see the note above). Newsreader italic
		// is the hero H1 accent (<em class="text-spine">) and the LCP text, and
		// JetBrains Mono backs the ch-unit clamps described above. A 2026-07
		// change trimmed this list to two, which reintroduced first-paint FOUT
		// and headline reflow (the exact ch-unit shift the note warns about), so
		// the italic and mono faces are restored here.
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
