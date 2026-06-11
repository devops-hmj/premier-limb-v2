<?php
/**
 * GoHighLevel chat widget — loaded ONLY on the consult page, mirroring the
 * Next.js app (app/consult/page.tsx loads it afterInteractive). No other
 * third-party scripts ship anywhere on the site.
 *
 * @package pll-forms
 */

defined( 'ABSPATH' ) || exit;

const PLL_FORMS_CHAT_WIDGET_ID = '6a20bb6795223f3846a01136';

add_action(
	'wp_enqueue_scripts',
	function () {
		if ( ! is_page( 'consult' ) ) {
			return;
		}
		wp_enqueue_script( // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- third-party loader, unversioned by design.
			'pll-ghl-chat',
			'https://beta.leadconnectorhq.com/loader.js',
			array(),
			null,
			array( 'in_footer' => true )
		);
	}
);

add_filter(
	'script_loader_tag',
	function ( $tag, $handle ) {
		if ( 'pll-ghl-chat' !== $handle ) {
			return $tag;
		}
		return str_replace(
			' src=',
			' defer data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="' . esc_attr( PLL_FORMS_CHAT_WIDGET_ID ) . '" src=',
			$tag
		);
	},
	10,
	2
);
