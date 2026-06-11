<?php
/**
 * robots.txt — translation of the Next.js app/robots.ts for a WordPress
 * origin (/api → /wp-json, /_next → wp internals).
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

add_filter(
	'robots_txt',
	function () {
		$lines = array(
			'User-agent: *',
			'Allow: /',
			'Disallow: /wp-admin/',
			'Allow: /wp-admin/admin-ajax.php',
			'Disallow: /wp-json/',
			'Disallow: /?s=',
			'',
			'Sitemap: ' . PLL_SEO_ORIGIN . '/wp-sitemap.xml',
		);
		return implode( "\n", $lines ) . "\n";
	},
	20
);
