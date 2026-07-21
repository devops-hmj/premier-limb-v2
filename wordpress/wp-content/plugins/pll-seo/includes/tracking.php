<?php
/**
 * Third-party compliance tracking — the Curve (ComplyTrack) snippet, emitted
 * into <head> on every page.
 *
 * PRODUCTION-GATED: the snippet only renders when the site is being served
 * from the production domain, so local Playground boots and staging hosts
 * never send dev traffic into Curve's compliance logs. Override with the
 * `pll_seo_curve_enabled` filter for testing.
 *
 * The snippet is vendor-supplied verbatim (Curve, July 2026). If Curve issues
 * an updated snippet or site key, replace PLL_SEO_CURVE_SNIPPET below in full.
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

const PLL_SEO_CURVE_SNIPPET = <<<'HTML'
<!-- Curve Tracking Script -->
<script>
(function(w,d,s,a){
  w.Curve=w.Curve||function(){(w.Curve.q=w.Curve.q||[]).push(arguments)};
  w.Curve.l=1*new Date();
  a=d.createElement(s);
  a.async=1;
  a.src='https://complytrack-be-production.up.railway.app/tracking/tracking-min.js';
  a.onload=function(){
    Curve('init','d105ae784cd2c51563fde0932d3226faf9017d55f17092995660af56dcaf071e');
  };
  d.getElementsByTagName('head')[0].appendChild(a);
})(window,document,'script');
</script>
<!-- End Curve Tracking Script -->
HTML;

/**
 * Whether the Curve snippet should render for this request: production host
 * only (with or without www), unless overridden by filter.
 *
 * @return bool
 */
function pll_seo_curve_enabled() {
	$host       = (string) wp_parse_url( home_url(), PHP_URL_HOST );
	$production = in_array( strtolower( $host ), array( 'premierlimblengthening.com', 'www.premierlimblengthening.com' ), true );

	/**
	 * Filter whether the Curve tracking snippet renders.
	 *
	 * @param bool $production True when the site is served from the production domain.
	 */
	return (bool) apply_filters( 'pll_seo_curve_enabled', $production );
}

add_action(
	'wp_footer',
	function () {
		if ( ! pll_seo_curve_enabled() ) {
			return;
		}
		echo PLL_SEO_CURVE_SNIPPET . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- vendor-supplied script emitted verbatim.
	},
	20
);
