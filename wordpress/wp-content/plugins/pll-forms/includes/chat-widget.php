<?php
/**
 * GoHighLevel chat widget — loaded site-wide (owner decision 2026-06-12;
 * launched consult-only, expanded for lead capture on pricing/surgery
 * surfaces). Still the ONLY third-party script on the site, and it must
 * stay under the GHL HIPAA tier + BAA (docs/MIGRATION.md §9/§10).
 *
 * @package pll-forms
 */

defined( 'ABSPATH' ) || exit;

const PLL_FORMS_CHAT_WIDGET_ID = '6a20bb6795223f3846a01136';

add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_script(
			'pll-ghl-chat',
			'https://beta.leadconnectorhq.com/loader.js',
			array(),
			null, // phpcs:ignore WordPress.WP.EnqueuedResourceParameters -- third-party loader, unversioned by design.
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
