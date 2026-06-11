<?php
/**
 * Consultation form endpoint: POST /wp-json/pll/v1/consult.
 *
 * Port of app/api/consult/route.ts — validates the submission server-side
 * and forwards JSON to the GoHighLevel (LeadConnector) inbound webhook so
 * the webhook URL never reaches the browser. The URL comes from the
 * PLL_GHL_WEBHOOK_URL constant in wp-config.php (set by the host; never
 * stored in the database or the repository).
 *
 * No PHI is ever persisted in WordPress: the payload passes through to the
 * BAA-covered GHL pipeline and is not written to any table or log.
 *
 * Anti-abuse (no nonce by design — anonymous endpoint + full-page caching
 * would serve stale nonces to real patients): field allowlist, email-or-phone
 * guard, honeypot, signed time-trap, transient rate limit.
 *
 * @package pll-forms
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'pll/v1',
			'/consult',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => 'pll_forms_handle_submission',
			)
		);
	}
);

/**
 * Issue a signed timestamp for the time-trap field (rendered into the form).
 *
 * @return string "timestamp|hmac"
 */
function pll_forms_time_token() {
	$now = (string) time();
	return $now . '|' . wp_hash( 'pll-consult-' . $now );
}

/**
 * @param string $token Token from the form.
 * @return bool Whether the token is valid and at least 3 seconds old.
 */
function pll_forms_time_token_ok( $token ) {
	$parts = explode( '|', (string) $token );
	if ( 2 !== count( $parts ) ) {
		return false;
	}
	list( $issued, $sig ) = $parts;
	if ( ! hash_equals( wp_hash( 'pll-consult-' . $issued ), $sig ) ) {
		return false;
	}
	return ( time() - (int) $issued ) >= 3;
}

/**
 * Handle a submission.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
function pll_forms_handle_submission( WP_REST_Request $request ) {
	// Rate limit: 5 submissions / 10 minutes / IP.
	$ip       = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$rate_key = 'pll_rl_' . md5( $ip );
	$count    = (int) get_transient( $rate_key );
	if ( $count >= 5 ) {
		return new WP_REST_Response( array( 'ok' => false ), 429 );
	}
	set_transient( $rate_key, $count + 1, 10 * MINUTE_IN_SECONDS );

	// Honeypot: bots fill the hidden "website" field → pretend success.
	if ( '' !== trim( (string) $request->get_param( 'website' ) ) ) {
		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	// Time-trap: sub-3-second submissions are dropped silently.
	if ( ! pll_forms_time_token_ok( (string) $request->get_param( 'rendered_at' ) ) ) {
		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	// Field allowlist — mirrors the ConsultForm.tsx payload.
	$email = sanitize_email( (string) $request->get_param( 'email' ) );
	$phone = sanitize_text_field( (string) $request->get_param( 'phone' ) );

	// Basic guard: require an email or phone so we don't forward empty spam.
	if ( ! $email && ! $phone ) {
		return new WP_REST_Response(
			array(
				'ok'    => false,
				'error' => 'missing contact',
			),
			400
		);
	}

	$payload = array(
		'first_name'   => mb_substr( sanitize_text_field( (string) $request->get_param( 'first_name' ) ), 0, 200 ),
		'last_name'    => mb_substr( sanitize_text_field( (string) $request->get_param( 'last_name' ) ), 0, 200 ),
		'email'        => $email,
		'phone'        => mb_substr( $phone, 0, 50 ),
		'city'         => mb_substr( sanitize_text_field( (string) $request->get_param( 'city' ) ), 0, 200 ),
		'age'          => mb_substr( sanitize_text_field( (string) $request->get_param( 'age' ) ), 0, 10 ),
		'message'      => mb_substr( sanitize_textarea_field( (string) $request->get_param( 'message' ) ), 0, 5000 ),
		'consent'      => (bool) $request->get_param( 'consent' ),
		'source'       => 'Website consultation form',
		'submitted_at' => gmdate( 'c' ),
	);

	if ( ! defined( 'PLL_GHL_WEBHOOK_URL' ) || ! PLL_GHL_WEBHOOK_URL ) {
		return new WP_REST_Response( array( 'ok' => false ), 503 );
	}

	$response = wp_remote_post(
		PLL_GHL_WEBHOOK_URL,
		array(
			'headers' => array( 'Content-Type' => 'application/json' ),
			'body'    => wp_json_encode( $payload ),
			'timeout' => 8,
		)
	);

	if ( is_wp_error( $response ) ) {
		return new WP_REST_Response( array( 'ok' => false ), 500 );
	}
	$code = (int) wp_remote_retrieve_response_code( $response );
	if ( $code < 200 || $code >= 300 ) {
		return new WP_REST_Response( array( 'ok' => false ), 502 );
	}
	return new WP_REST_Response( array( 'ok' => true ), 200 );
}
