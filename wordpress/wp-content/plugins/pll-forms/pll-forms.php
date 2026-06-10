<?php
/**
 * Plugin Name: PLL Forms
 * Plugin URI: https://premierlimblengthening.com
 * Description: Consultation form for Premier Limb Lengthening. Provides the pll/consult-form block and a REST endpoint that validates submissions and forwards them server-side to the GoHighLevel webhook defined by the PLL_GHL_WEBHOOK_URL constant in wp-config.php. No PHI is ever stored in WordPress. Also loads the GHL chat widget on the consult page only.
 * Version: 1.0.0
 * Requires at least: 6.7
 * Requires PHP: 8.1
 * Author: Premier Limb Lengthening
 * License: GPL-2.0-or-later
 * Text Domain: pll-forms
 *
 * @package pll-forms
 */

defined( 'ABSPATH' ) || exit;

define( 'PLL_FORMS_VERSION', '1.0.0' );
define( 'PLL_FORMS_DIR', plugin_dir_path( __FILE__ ) );
define( 'PLL_FORMS_URL', plugin_dir_url( __FILE__ ) );

foreach ( array( 'endpoint', 'block', 'chat-widget' ) as $pll_forms_include ) {
	$pll_forms_file = PLL_FORMS_DIR . 'includes/' . $pll_forms_include . '.php';
	if ( file_exists( $pll_forms_file ) ) {
		require_once $pll_forms_file;
	}
}
unset( $pll_forms_include, $pll_forms_file );
