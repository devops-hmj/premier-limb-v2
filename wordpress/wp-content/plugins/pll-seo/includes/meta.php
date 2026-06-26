<?php
/**
 * SEO meta fields. Seeded by the content pipeline (WXR/setup.php); override
 * per entity. Underscore-prefixed (protected) so they don't clutter the
 * Custom Fields UI; exposed over REST for future editor UI.
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	function () {
		$keys = array( '_pll_seo_title', '_pll_seo_description', '_pll_og_title', '_pll_og_description' );
		foreach ( array( 'post', 'page' ) as $type ) {
			foreach ( $keys as $key ) {
				register_post_meta(
					$type,
					$key,
					array(
						'show_in_rest'      => true,
						'single'            => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
						'auth_callback'     => function () {
							return current_user_can( 'edit_posts' );
						},
					)
				);
			}
		}
	}
);

/**
 * Hand-written metadata for the marketing pages — extracted from each
 * page.tsx `metadata` export in the Next.js app (the parity source).
 * Post meta wins over these defaults; these win over generated fallbacks.
 *
 * @return array<string, array{title?: string, description?: string, og_title?: string, og_description?: string, og_type?: string}>
 */
function pll_seo_page_defaults() {
	return array(
		// Absolute (no site-name suffix): the template would push it past
		// 100 chars. Keyword-first per homepage handoff v2 §08.
		'/'                                  => array(
			'title'          => 'Cosmetic Limb Lengthening Surgery · Dr. Hrayr Basmajian · Southern California',
			'title_absolute' => true,
			'description'    => 'Cosmetic limb lengthening surgery performed by Dr. Hrayr Basmajian, a fellowship-trained orthopaedic trauma surgeon in Southern California. Precice internal nail. Revision cases accepted. Concierge care included.',
			'og_title'       => 'Cosmetic Limb Lengthening Surgery · Dr. Hrayr Basmajian · Southern California',
			'og_description' => 'Cosmetic limb lengthening performed by a fellowship-trained orthopaedic trauma surgeon. Precice internal nail. Revision cases accepted. Concierge care included.',
			'og_type'        => 'website',
		),
		'/about/'                            => array(
			'title'          => 'About Premier Limb Lengthening, Founded by Dr. Hrayr Basmajian',
			'description'    => 'Premier Limb Lengthening is a cosmetic and reconstructive surgery practice created by Dr. Hrayr Basmajian, founder of Premier Orthopaedic & Trauma Specialists, based in Upland, California.',
			'og_title'       => 'About Premier Limb Lengthening, Founded by Dr. Hrayr Basmajian',
			'og_description' => 'A cosmetic and reconstructive surgery practice created by Dr. Hrayr Basmajian, founder of Premier Orthopaedic & Trauma Specialists, based in Upland, California.',
			'og_type'        => 'website',
		),
		'/consult/'                          => array(
			'title'          => 'Schedule a Limb Lengthening Consultation',
			'description'    => 'Schedule a consultation with Premier Limb Lengthening in Upland, California. Confidential intake, virtual visits, and white-glove travel coordination.',
			'og_title'       => 'Schedule a Limb Lengthening Consultation · Premier',
			'og_description' => 'Confidential intake, virtual visits, and white-glove travel coordination from Upland, California.',
			'og_type'        => 'website',
		),
		'/dr-basmajian/'                     => array(
			'title'          => 'Dr. Hrayr Basmajian · Limb Lengthening Surgeon',
			'description'    => 'Board-certified orthopaedic trauma surgeon and Medical Director of Orthopaedic Trauma at Pomona Valley Hospital. Thousands of limb lengthening procedures performed.',
			'og_title'       => 'Dr. Hrayr Basmajian · Limb Lengthening Surgeon',
			'og_description' => 'Board-certified orthopaedic trauma surgeon. Director, Orthopaedic Trauma at Pomona Valley Hospital. Thousands of limb lengthening procedures performed.',
			'og_type'        => 'profile',
		),
		'/limb-lengthening-pricing-options/' => array(
			'title'          => 'Limb Lengthening Cost · Pricing & Financing',
			'description'    => 'Transparent 2026 pricing for cosmetic limb lengthening. Every quote bundles implants, OR time, hospitalization, anesthesia, follow-up care, and on-site sessions.',
			'og_title'       => 'Limb Lengthening Cost · Pricing & Financing',
			'og_description' => 'Transparent 2026 pricing for cosmetic limb lengthening. Bundled implants, OR time, hospitalization, anesthesia, follow-up care, and on-site sessions.',
			'og_type'        => 'website',
		),
		'/your-surgery/'                     => array(
			'title'          => 'Limb Lengthening Surgery · How It Works',
			'description'    => 'How limb lengthening works: distraction osteogenesis, Precice internal nail placement, gradual distraction, and a recovery timeline you can plan your life around.',
			'og_title'       => 'Limb Lengthening Surgery · How It Works',
			'og_description' => 'Distraction osteogenesis, internal Precice technology, and a recovery timeline you can plan your life around.',
			'og_type'        => 'article',
		),
		'/blog/'                             => array(
			'title'          => 'Limb Lengthening Blog, Articles & Patient Guides',
			'description'    => 'Honest, plain-language coverage of cosmetic limb lengthening: candidacy, recovery, pricing, and the science of bone regeneration, written to help patients decide with confidence.',
			'og_title'       => 'Limb Lengthening Blog, Articles & Patient Guides',
			'og_description' => 'Patient-grade articles on candidacy, recovery, pricing, and the science of bone regeneration.',
			'og_type'        => 'website',
		),
		'/privacy/'                          => array(
			'title'          => 'Privacy Policy',
			'description'    => 'How Premier Limb Lengthening collects, uses, and protects website data, our HIPAA commitments, and our SMS and mobile messaging practices.',
			'og_title'       => 'Privacy Policy · Premier Limb Lengthening',
			'og_description' => 'Our privacy practices for website data, HIPAA-protected health information, and SMS and mobile messaging.',
			'og_type'        => 'website',
		),
		'/terms/'                            => array(
			'title'          => 'Terms of Service',
			'description'    => 'The terms of use for the Premier Limb Lengthening website, including our medical disclaimer, individual-results notice, and SMS text messaging program terms.',
			'og_title'       => 'Terms of Service · Premier Limb Lengthening',
			'og_description' => 'Website terms of use, medical disclaimer, and SMS text messaging terms for Premier Limb Lengthening.',
			'og_type'        => 'website',
		),
		'/accessibility/'                    => array(
			'title'          => 'Accessibility Statement',
			'description'    => "Premier Limb Lengthening's commitment to website accessibility, our work toward WCAG 2.1 Level AA, and how to request an accommodation.",
			'og_title'       => 'Accessibility Statement · Premier Limb Lengthening',
			'og_description' => 'Our commitment to an accessible website, our WCAG 2.1 AA goal, and how to reach us for help or accommodations.',
			'og_type'        => 'website',
		),
	);
}

/**
 * Current request path, root-relative with trailing slash ('/about/').
 *
 * @return string
 */
function pll_seo_current_path() {
	if ( is_front_page() ) {
		return '/';
	}
	$url  = pll_seo_current_url();
	$path = wp_parse_url( $url, PHP_URL_PATH );
	return $path ? $path : '/';
}

/**
 * Canonical URL for the current view, on the production origin.
 *
 * @return string
 */
function pll_seo_current_url() {
	global $wp;
	if ( is_front_page() ) {
		return PLL_SEO_ORIGIN . '/';
	}
	$local = home_url( add_query_arg( array(), trailingslashit( $wp->request ) ) );
	$path  = wp_parse_url( $local, PHP_URL_PATH );
	return PLL_SEO_ORIGIN . ( $path ? $path : '/' );
}

/**
 * Curated SEO overrides for the surgery sub-pages and articles.
 *
 * These pages were imported with weak, auto-derived post meta (the description
 * was often the first body sentence, or the title repeated). This map restores
 * the optimized, keyword-aligned titles and descriptions (ported from
 * lib/seo_metadata.ts) and is authoritative for the paths it covers. Brand
 * rules honored: no em dashes, no semicolons.
 *
 * @return array<string, array{title?: string, description?: string}>
 */
function pll_seo_overrides() {
	return array(
		// Your Surgery sub-pages.
		'/your-surgery/how-much-taller-can-i-get-with-limb-lengthening/' => array(
			'title'       => 'How Much Taller Can I Get With Limb Lengthening?',
			'description' => 'Most patients gain 3 to 6 inches across one or two procedures. The exact figure depends on bone segment, soft-tissue tolerance, and your starting anatomy.',
		),
		'/your-surgery/is-there-an-age-limit-for-limb-lengthening/' => array(
			'title'       => 'Is There an Age Limit for Limb Lengthening?',
			'description' => 'There is no fixed cutoff for cosmetic limb lengthening. What matters is bone density, joint health, and overall fitness, and here is how Dr. Basmajian evaluates candidacy.',
		),
		'/your-surgery/can-i-bend-my-lengthening-nail/' => array(
			'title'       => 'Can I Bend My Lengthening Nail?',
			'description' => 'What happens if you over-stress the Precice internal nail during recovery, and the daily-life precautions that keep your hardware safe through full bone healing.',
		),
		'/your-surgery/external-internal-lengthening/' => array(
			'title'       => 'External vs. Internal Lengthening: A Comparison',
			'description' => 'Internal magnetic nails versus external fixator frames, and the trade-offs in pain, infection risk, mobility, scarring, and recovery time. Premier uses internal nails only.',
		),
		'/your-surgery/exercise-after-limb-lengthening/' => array(
			'title'       => 'When Can I Exercise After Limb Lengthening?',
			'description' => 'A week-by-week guide to returning to walking, swimming, cycling, and strength training after limb lengthening, plus the activities to delay until full consolidation.',
		),
		'/your-surgery/will-limb-lengthening-hurt/' => array(
			'title'       => 'Will Limb Lengthening Hurt? Pain Levels Explained',
			'description' => 'An honest answer to the most asked question about limb lengthening: how much pain to expect during distraction, how it is managed, and when it fades.',
		),
		'/your-surgery/limb-lengthening-expectations/' => array(
			'title'       => 'Limb Lengthening: What to Expect Before & After Surgery',
			'description' => 'A realistic timeline for surgery, distraction, consolidation, and physical therapy, plus the lifestyle changes to plan for in the first six months.',
		),
		'/your-surgery/instructions/' => array(
			'title'       => 'Patient Instructions: Pre-Op, Discharge & First 3 Weeks',
			'description' => 'Clinical pre-op preparation, discharge equipment checklist, daily rehabilitation exercises, and warning signs for Premier Limb Lengthening patients.',
		),

		// Articles.
		'/are-you-a-good-candidate-for-limb-lengthening/' => array(
			'title'       => 'Is Limb Lengthening Right for You? Candidacy Explained',
			'description' => 'A surgeon-written guide to the four factors that decide candidacy for cosmetic limb lengthening: age, bone health, lifestyle, and mental preparation.',
		),
		'/am-i-too-old-for-limb-lengthening/' => array(
			'title'       => 'Am I Too Old for Limb Lengthening?',
			'description' => 'Adults in their 40s and 50s are routinely good candidates for limb lengthening. What matters is biological readiness, not chronological age, and here is how we screen for it.',
		),
		'/limb-lengthening-what-you-gain-what-you-risk/' => array(
			'title'       => 'Pros and Cons of Limb Lengthening',
			'description' => 'The honest trade-offs: height gain, posture change, and confidence weighed against pain, downtime, hardware, and complication risk. Read both sides before deciding.',
		),
		'/rewriting-the-body-norm-stigmas-around-limb-lengthening/' => array(
			'title'       => 'Dealing With Limb Lengthening-Related Stigma',
			'description' => 'Dealing with the social stigma and judgment around cosmetic limb lengthening. How patients respond, and what clinical and psychological data actually shows.',
		),
		'/can-i-get-a-leg-lengthening-procedure-for-cosmetic-reasons/' => array(
			'title'       => 'Can I Get Leg Lengthening for Cosmetic Reasons?',
			'description' => 'Yes, cosmetic limb lengthening is a legitimate, surgeon-performed orthopaedic procedure. Here is how the screening, surgery, and recovery differ from medical cases.',
		),
		'/leg-up-or-let-down-can-you-gain-height-without-surgery/' => array(
			'title'       => 'Can You Gain Height Without Surgery?',
			'description' => 'Posture work, footwear, and growth hormone all have ceilings. A clear-eyed look at every non-surgical method patients try before booking limb lengthening.',
		),
		'/is-leg-lengthening-off-limits-for-athletes/' => array(
			'title'       => 'Is Leg Lengthening Off-Limits for Athletes?',
			'description' => 'Athletes can return to running, lifting, and most sports after limb lengthening, but timing and biomechanics matter. What to plan for and what to avoid.',
		),
		'/fixation-methods-in-limb-lengthening-internal-vs-external/' => array(
			'title'       => 'Fixation Methods in Limb Lengthening: Internal vs. External',
			'description' => 'Internal Precice nails versus external Ilizarov-style frames, and how each method holds bone, distributes load, and shapes your recovery.',
		),
		'/will-leg-lengthening-be-obvious/' => array(
			'title'       => 'Will My Leg Lengthening Be Obvious?',
			'description' => 'With internal nails and modern post-op care, leg lengthening leaves no visible hardware and minimal scarring. Here is what people notice, and what they do not.',
		),
		'/limb-lengthening-pain-the-truth/' => array(
			'title'       => 'Limb Lengthening Pain: What to Expect & How It Is Managed',
			'description' => 'Pain peaks during the first two weeks of distraction, then fades. The medications, nerve blocks, and physical-therapy strategy that keep patients comfortable.',
		),
		'/is-limb-lengthening-covered-by-insurance/' => array(
			'title'       => 'Is Limb Lengthening Covered by Insurance?',
			'description' => 'Cosmetic limb lengthening is almost never covered by insurance. Reconstructive cases, like limb-length discrepancy or congenital deformity, sometimes are. What to ask.',
		),
		'/the-importance-of-physical-therapy-in-limb-lengthening/' => array(
			'title'       => 'Why Physical Therapy Is Critical in Limb Lengthening',
			'description' => 'PT is the difference between full mobility and lasting stiffness. The Premier protocol: daily sessions during distraction, tapering through consolidation.',
		),
		'/tips-for-traveling-for-the-holidays-after-limb-lengthening-surgery/' => array(
			'title'       => 'Traveling After Limb Lengthening: Holiday & Flight Tips',
			'description' => 'When it is safe to fly, what to pack, and how to arrange airport assistance and TSA hardware notifications after limb lengthening surgery.',
		),
		'/bone-health-and-nutrition-before-and-after-limb-lengthening/' => array(
			'title'       => 'Nutrition for Limb Lengthening Recovery',
			'description' => 'Calcium, vitamin D, protein, and collagen support new bone formation. A practical pre-op and post-op nutrition plan from the Premier care team.',
		),
		'/the-science-behind-bone-regeneration-and-limb-lengthening/' => array(
			'title'       => 'The Science of Bone Regeneration',
			'description' => 'Distraction osteogenesis: how slow, controlled separation triggers your body to grow new bone in the gap. A patient-friendly explainer.',
		),
		'/what-happens-to-muscle-during-and-after-limb-lengthening/' => array(
			'title'       => 'Limb Lengthening and Its Effect on Soft Tissues',
			'description' => 'Bone is not the only tissue that lengthens. Muscles, nerves, and tendons adapt too. What that adaptation feels like, and how PT supports it.',
		),
	);
}

/**
 * Resolve a metadata field for the current view: curated overrides → post meta
 * → page defaults map → generated fallback.
 *
 * @param string $field 'title'|'description'|'og_title'|'og_description'|'og_type'.
 * @return string
 */
function pll_seo_value( $field ) {
	$meta_keys = array(
		'title'          => '_pll_seo_title',
		'description'    => '_pll_seo_description',
		'og_title'       => '_pll_og_title',
		'og_description' => '_pll_og_description',
	);

	// Curated overrides are authoritative for the paths they cover, so the
	// optimized titles and descriptions win even where the WXR seeded weak,
	// auto-derived post meta. og_* fields inherit via the fallbacks below.
	$overrides = pll_seo_overrides();
	$ov_path   = pll_seo_current_path();
	if ( isset( $overrides[ $ov_path ][ $field ] ) ) {
		return $overrides[ $ov_path ][ $field ];
	}

	if ( is_singular() && isset( $meta_keys[ $field ] ) ) {
		$meta = (string) get_post_meta( get_queried_object_id(), $meta_keys[ $field ], true );
		if ( $meta ) {
			return $meta;
		}
	}

	$defaults = pll_seo_page_defaults();
	$path     = pll_seo_current_path();
	if ( isset( $defaults[ $path ][ $field ] ) ) {
		return $defaults[ $path ][ $field ];
	}

	// OG fields fall back to the SEO fields.
	if ( 'og_title' === $field ) {
		return pll_seo_value( 'title' );
	}
	if ( 'og_description' === $field ) {
		return pll_seo_value( 'description' );
	}
	return '';
}
