<?php
/**
 * Media helpers.
 *
 * @package pll-editorial
 */

/**
 * Resolve a media-library attachment URL by its original filename.
 *
 * Patterns use this to point at seeded media (hero video, poster) without
 * hardcoding upload paths. Returns '' when the asset has not been imported
 * yet, in which case blocks fall back gracefully (e.g. the hero shows its
 * gradient placeholder).
 *
 * @param string $filename e.g. 'home-hero.mp4'.
 * @return string URL or ''.
 */
function pll_media_url( $filename ) {
	$cache_key = 'pll_media_' . md5( $filename );
	$cached    = wp_cache_get( $cache_key, 'pll-editorial' );
	if ( false !== $cached ) {
		return $cached;
	}

	global $wpdb;
	$attachment_id = $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$wpdb->prepare(
			"SELECT post_id FROM $wpdb->postmeta WHERE meta_key = '_wp_attached_file' AND meta_value LIKE %s LIMIT 1",
			'%' . $wpdb->esc_like( $filename )
		)
	);

	$url = $attachment_id ? (string) wp_get_attachment_url( (int) $attachment_id ) : '';
	wp_cache_set( $cache_key, $url, 'pll-editorial', MINUTE_IN_SECONDS * 5 );
	return $url;
}
