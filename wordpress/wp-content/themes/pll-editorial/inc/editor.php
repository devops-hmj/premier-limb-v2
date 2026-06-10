<?php
/**
 * Editor hardening: keep the content-only locking model intact for editors.
 *
 * @package pll-editorial
 */

/**
 * Editors get the simplified content-only experience. Only administrators may
 * unlock blocks or open the code editor — the two escape hatches that would
 * let layout drift from the design system.
 */
add_filter(
	'block_editor_settings_all',
	function ( $settings ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			$settings['canLockBlocks']      = false;
			$settings['codeEditingEnabled'] = false;
		}
		return $settings;
	}
);

/**
 * New blog posts start from the editorial long-form shape (lede with drop cap,
 * then body copy). Posts stay unlocked — design parity for articles comes from
 * the single template chrome + .pll-prose styling, not from locking prose.
 */
add_action(
	'init',
	function () {
		$post_type = get_post_type_object( 'post' );
		if ( $post_type ) {
			$post_type->template = array(
				array(
					'core/paragraph',
					array(
						'className'   => 'v2-dropcap',
						'placeholder' => __( 'Open with the lede — the first letter renders as a drop cap.', 'pll-editorial' ),
					),
				),
				array( 'core/paragraph', array() ),
			);
		}
	},
	20
);
