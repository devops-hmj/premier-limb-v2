<?php
/**
 * "PLL Site Settings" — a single admin screen for the contact facts and the
 * primary CTA, so a non-developer can change the phone, address, map
 * link, and the site-wide "Schedule Consultation" button (label + destination)
 * in one place. The values are stored in the `pll_site_info` option and read
 * by pll_site_info() (inc/setup.php), which every live-rendered surface
 * (header, hero overlay, footer) already uses.
 *
 * Blank fields fall back to the theme default (shown as the placeholder), so
 * clearing a field restores the shipped value rather than blanking the site.
 *
 * @package pll-editorial
 */

defined( 'ABSPATH' ) || exit;

/**
 * The editable fields, in display order: key => [label, help, type].
 * type 'url' sanitises as a URL; everything else as plain text.
 *
 * @return array<string, array{0:string,1:string,2:string}>
 */
function pll_site_settings_fields() {
	return array(
		'phone'     => array( __( 'Phone (display)', 'pll-editorial' ), __( 'e.g. (951) 620-5663. The tel: link is derived from these digits automatically.', 'pll-editorial' ), 'text' ),
		'cta_url'   => array( __( 'Primary CTA URL', 'pll-editorial' ), __( 'Where the "Schedule Consultation" button points. A path like /book-a-consultation/ (the on-site booking page), a full https:// booking URL, or a #anchor.', 'pll-editorial' ), 'text' ),
		'cta_label' => array( __( 'Primary CTA label', 'pll-editorial' ), __( 'The text on the site-wide primary button.', 'pll-editorial' ), 'text' ),
		'street'    => array( __( 'Street address', 'pll-editorial' ), '', 'text' ),
		'city'      => array( __( 'City', 'pll-editorial' ), '', 'text' ),
		'state'     => array( __( 'State', 'pll-editorial' ), '', 'text' ),
		'zip'       => array( __( 'ZIP', 'pll-editorial' ), '', 'text' ),
		'maps_url'  => array( __( 'Google Maps directions URL', 'pll-editorial' ), '', 'url' ),
		'tagline'   => array( __( 'Tagline', 'pll-editorial' ), '', 'text' ),
		'domain'    => array( __( 'Canonical domain', 'pll-editorial' ), __( 'Bare domain, no scheme. e.g. premierlimblengthening.com', 'pll-editorial' ), 'text' ),
	);
}

add_action(
	'admin_menu',
	function () {
		add_options_page(
			__( 'PLL Site Settings', 'pll-editorial' ),
			__( 'PLL Site', 'pll-editorial' ),
			'manage_options',
			'pll-site-settings',
			'pll_render_site_settings_page'
		);
	}
);

add_action(
	'admin_init',
	function () {
		register_setting(
			'pll_site_settings',
			'pll_site_info',
			array(
				'type'              => 'array',
				'sanitize_callback' => 'pll_sanitize_site_info',
				'default'           => array(),
			)
		);

		add_settings_section(
			'pll_site_info_section',
			__( 'Contact & primary CTA', 'pll-editorial' ),
			static function () {
				echo '<p>' . esc_html__( 'These values feed the header, hero overlay, and footer on every page. Leave a field blank to use the theme default.', 'pll-editorial' ) . '</p>';
			},
			'pll-site-settings'
		);

		foreach ( pll_site_settings_fields() as $key => $meta ) {
			add_settings_field(
				'pll_si_' . $key,
				esc_html( $meta[0] ),
				'pll_render_site_field',
				'pll-site-settings',
				'pll_site_info_section',
				array(
					'key'   => $key,
					'help'  => $meta[1],
					'type'  => $meta[2],
					'label' => $meta[0],
				)
			);
		}
	}
);

/**
 * Sanitise the submitted option: whitelist known keys, sanitise per type, and
 * drop empties so pll_site_info() falls back to the defaults for them.
 *
 * @param mixed $input Raw submitted value.
 * @return array<string, string>
 */
function pll_sanitize_site_info( $input ) {
	$fields = pll_site_settings_fields();
	$clean  = array();
	if ( ! is_array( $input ) ) {
		return $clean;
	}
	foreach ( $fields as $key => $meta ) {
		if ( ! isset( $input[ $key ] ) ) {
			continue;
		}
		$value = trim( (string) $input[ $key ] );
		if ( '' === $value ) {
			continue;
		}
		$clean[ $key ] = ( 'url' === $meta[2] ) ? esc_url_raw( $value ) : sanitize_text_field( $value );
	}
	return $clean;
}

/**
 * Render one field: current stored value, with the theme default as placeholder.
 *
 * @param array $args {key, help, type, label}.
 */
function pll_render_site_field( $args ) {
	$key      = $args['key'];
	$saved    = get_option( 'pll_site_info', array() );
	$value    = is_array( $saved ) && isset( $saved[ $key ] ) ? (string) $saved[ $key ] : '';
	$defaults = pll_site_info_defaults();
	$default  = isset( $defaults[ $key ] ) ? (string) $defaults[ $key ] : '';

	printf(
		'<input type="%s" class="regular-text" id="pll_si_%s" name="pll_site_info[%s]" value="%s" placeholder="%s" />',
		'url' === $args['type'] ? 'url' : 'text',
		esc_attr( $key ),
		esc_attr( $key ),
		esc_attr( $value ),
		esc_attr( $default )
	);
	if ( ! empty( $args['help'] ) ) {
		echo '<p class="description">' . esc_html( $args['help'] ) . '</p>';
	}
}

/**
 * Render the settings page shell.
 */
function pll_render_site_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="wrap">
		<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
		<form action="options.php" method="post">
			<?php
			settings_fields( 'pll_site_settings' );
			do_settings_sections( 'pll-site-settings' );
			submit_button();
			?>
		</form>
	</div>
	<?php
}
