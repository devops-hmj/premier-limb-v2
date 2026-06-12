<?php
/**
 * Schema.org JSON-LD — 1:1 PHP port of lib/jsonld.ts, emitted in the same
 * page contexts the Next.js app used.
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

/**
 * MedicalBusiness + WebSite graph — every page (Next mounts it in app/layout.tsx).
 *
 * @return array
 */
function pll_seo_site_graph() {
	$org_id  = PLL_SEO_ORIGIN . '/#organization';
	$site_id = PLL_SEO_ORIGIN . '/#website';
	return array(
		'@context' => 'https://schema.org',
		'@graph'   => array(
			array(
				'@type'              => 'MedicalBusiness',
				'@id'                => $org_id,
				'name'               => 'Premier Limb Lengthening Institute',
				'legalName'          => 'Premier Limb Lengthening',
				'url'                => PLL_SEO_ORIGIN,
				'telephone'          => '+1-951-620-5663',
				'faxNumber'          => '+1-909-596-4344',
				'priceRange'         => '$95,500–$195,000',
				'medicalSpecialty'   => array( 'Orthopedic', 'Trauma' ),
				'address'            => array(
					'@type'           => 'PostalAddress',
					'streetAddress'   => '400 N. Mountain Ave. Suite 305',
					'addressLocality' => 'Upland',
					'addressRegion'   => 'CA',
					'postalCode'      => '91786',
					'addressCountry'  => 'US',
				),
				'parentOrganization' => array(
					'@type' => 'Organization',
					'name'  => 'Premier Orthopaedic & Trauma Specialists',
				),
			),
			array(
				'@type'      => 'WebSite',
				'@id'        => $site_id,
				'url'        => PLL_SEO_ORIGIN,
				'name'       => 'Premier Limb Lengthening Institute',
				'publisher'  => array( '@id' => $org_id ),
				'inLanguage' => 'en-US',
			),
		),
	);
}

/**
 * BreadcrumbList.
 *
 * @param array<int, array{name: string, url: string}> $items Crumbs (url = path with trailing slash).
 * @return array
 */
function pll_seo_breadcrumb( $items ) {
	$elements = array();
	foreach ( $items as $i => $item ) {
		$elements[] = array(
			'@type'    => 'ListItem',
			'position' => $i + 1,
			'name'     => $item['name'],
			'item'     => PLL_SEO_ORIGIN . $item['url'],
		);
	}
	return array(
		'@context'        => 'https://schema.org',
		'@type'           => 'BreadcrumbList',
		'itemListElement' => $elements,
	);
}

/**
 * Article schema for a post or your-surgery sub-page.
 *
 * @param WP_Post $post Post.
 * @return array
 */
function pll_seo_article( $post ) {
	$path     = wp_parse_url( get_permalink( $post ), PHP_URL_PATH );
	$thumb_id = get_post_thumbnail_id( $post );
	$image    = $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'full' ) : null;
	$title    = (string) get_post_meta( $post->ID, '_pll_seo_title', true );
	if ( ! $title ) {
		$title = get_the_title( $post );
	}

	$schema = array(
		'@context'         => 'https://schema.org',
		'@type'            => 'Article',
		'headline'         => $title,
		'description'      => (string) get_post_meta( $post->ID, '_pll_seo_description', true ),
		'mainEntityOfPage' => array(
			'@type' => 'WebPage',
			'@id'   => PLL_SEO_ORIGIN . $path,
		),
		'author'           => array(
			'@type' => 'Person',
			'name'  => 'Dr. Hrayr Basmajian',
			'@id'   => PLL_SEO_ORIGIN . '/dr-basmajian#physician',
		),
		'publisher'        => array( '@id' => PLL_SEO_ORIGIN . '/#organization' ),
		'inLanguage'       => 'en-US',
	);

	if ( $image ) {
		$schema['image'] = $image;
	}
	// Dates only for blog posts (the dateless service-subs omit them, matching Next).
	if ( 'post' === $post->post_type ) {
		$date                    = get_post_time( 'c', false, $post, true );
		$schema['datePublished'] = $date;
		$schema['dateModified']  = $date;
	}
	return $schema;
}

/**
 * FAQPage from the homepage FAQ entries.
 *
 * @return array
 */
function pll_seo_faq_schema() {
	$entities = array();
	foreach ( pll_seo_faqs() as $faq ) {
		$entities[] = array(
			'@type'          => 'Question',
			'name'           => $faq['q'],
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => $faq['a'],
			),
		);
	}
	return array(
		'@context'   => 'https://schema.org',
		'@type'      => 'FAQPage',
		'mainEntity' => $entities,
	);
}

/**
 * Physician (dr-basmajian page).
 *
 * @return array
 */
function pll_seo_physician() {
	return array(
		'@context'         => 'https://schema.org',
		'@type'            => 'Physician',
		'@id'              => PLL_SEO_ORIGIN . '/dr-basmajian#physician',
		'name'             => 'Dr. Hrayr Basmajian',
		'medicalSpecialty' => array( 'Orthopedic', 'Trauma' ),
		'image'            => PLL_SEO_ORIGIN . '/dr-picture.jpg',
		'affiliation'      => array(
			array(
				'@type' => 'Hospital',
				'name'  => 'Pomona Valley Hospital Medical Center',
			),
		),
		'worksFor'         => array( '@id' => PLL_SEO_ORIGIN . '/#organization' ),
	);
}

/**
 * MedicalProcedure (your-surgery overview).
 *
 * @return array
 */
function pll_seo_procedure() {
	return array(
		'@context'      => 'https://schema.org',
		'@type'         => 'MedicalProcedure',
		'name'          => 'Limb Lengthening Surgery',
		'procedureType' => 'https://schema.org/SurgicalProcedure',
		'bodyLocation'  => array( 'Femur', 'Tibia' ),
		'howPerformed'  => 'Distraction osteogenesis via the Precice internal nail system: the bone is cut and gradually pulled apart while new bone regenerates in the gap.',
		'preparation'   => 'Pre-operative consultation, imaging, and health assessment.',
		'followup'      => 'On-site therapy in Upland, CA. Surgical follow-up visits. Active lengthening over 3-4 months, full recovery in 6-12 months.',
	);
}

/**
 * Pricing ItemList.
 *
 * @return array
 */
function pll_seo_pricing_schema() {
	$elements = array();
	foreach ( pll_seo_pricing_tiers() as $i => $tier ) {
		$elements[] = array(
			'@type'    => 'Service',
			'position' => $i + 1,
			'name'     => $tier['name'],
			'offers'   => array(
				'@type'         => 'Offer',
				'priceCurrency' => 'USD',
				'price'         => preg_replace( '/[^0-9]/', '', $tier['price'] ),
				'availability'  => 'https://schema.org/InStock',
			),
			'provider' => array( '@id' => PLL_SEO_ORIGIN . '/#organization' ),
		);
	}
	return array(
		'@context'        => 'https://schema.org',
		'@type'           => 'ItemList',
		'name'            => 'Limb Lengthening Procedure Pricing',
		'itemListElement' => $elements,
	);
}

/**
 * CollectionPage for the blog index / category archives.
 *
 * @param string    $name  Collection name.
 * @param WP_Post[] $posts Posts, newest first.
 * @return array
 */
function pll_seo_collection( $name, $posts ) {
	$elements = array();
	foreach ( $posts as $i => $post ) {
		$title = (string) get_post_meta( $post->ID, '_pll_seo_title', true );
		if ( ! $title ) {
			$title = get_the_title( $post );
		}
		$elements[] = array(
			'@type'    => 'ListItem',
			'position' => $i + 1,
			'url'      => PLL_SEO_ORIGIN . wp_parse_url( get_permalink( $post ), PHP_URL_PATH ),
			'name'     => $title,
		);
	}
	return array(
		'@context'   => 'https://schema.org',
		'@type'      => 'CollectionPage',
		'name'       => $name,
		'mainEntity' => array(
			'@type'           => 'ItemList',
			'itemListElement' => $elements,
		),
	);
}

/**
 * Schemas for the current view, mirroring the JsonLd usage per route.
 *
 * @return array[]
 */
function pll_seo_schemas_for_view() {
	$schemas = array( pll_seo_site_graph() );

	if ( is_front_page() ) {
		$schemas[] = pll_seo_faq_schema();
		return $schemas;
	}

	if ( is_home() ) {
		$posts     = get_posts(
			array(
				'post_type'      => 'post',
				'posts_per_page' => -1,
				'orderby'        => 'date',
				'order'          => 'DESC',
			)
		);
		$schemas[] = pll_seo_collection( 'Limb Lengthening Blog', $posts );
		$schemas[] = pll_seo_breadcrumb(
			array(
				array(
					'name' => 'Home',
					'url'  => '/',
				),
				array(
					'name' => 'Blog',
					'url'  => '/blog/',
				),
			)
		);
		return $schemas;
	}

	if ( is_category() ) {
		$term      = get_queried_object();
		$posts     = get_posts(
			array(
				'post_type'      => 'post',
				'posts_per_page' => -1,
				'category__in'   => array( $term->term_id ),
				'orderby'        => 'date',
				'order'          => 'DESC',
			)
		);
		$label     = $term->name;
		$schemas[] = pll_seo_collection( $label . ' · Limb Lengthening Articles', $posts );
		$schemas[] = pll_seo_breadcrumb(
			array(
				array(
					'name' => 'Home',
					'url'  => '/',
				),
				array(
					'name' => 'Blog',
					'url'  => '/blog/',
				),
				array(
					'name' => $label,
					'url'  => '/category/' . $term->slug . '/',
				),
			)
		);
		return $schemas;
	}

	if ( is_singular( 'post' ) ) {
		$post   = get_post( get_queried_object_id() );
		$cat    = pll_seo_primary_category_for( $post );
		$crumbs = array(
			array(
				'name' => 'Home',
				'url'  => '/',
			),
			array(
				'name' => 'Blog',
				'url'  => '/blog/',
			),
		);
		if ( $cat ) {
			$crumbs[] = array(
				'name' => $cat->name,
				'url'  => '/category/' . $cat->slug . '/',
			);
		}
		$title     = (string) get_post_meta( $post->ID, '_pll_seo_title', true );
		$crumbs[]  = array(
			'name' => $title ? $title : get_the_title( $post ),
			'url'  => '/' . $post->post_name . '/',
		);
		$schemas[] = pll_seo_article( $post );
		$schemas[] = pll_seo_breadcrumb( $crumbs );
		return $schemas;
	}

	if ( is_page() ) {
		$post = get_post( get_queried_object_id() );
		$path = pll_seo_current_path();

		if ( '/dr-basmajian/' === $path ) {
			$schemas[] = pll_seo_physician();
		} elseif ( '/your-surgery/' === $path ) {
			$schemas[] = pll_seo_procedure();
		} elseif ( '/limb-lengthening-pricing-options/' === $path ) {
			$schemas[] = pll_seo_pricing_schema();
		} elseif ( $post->post_parent ) {
			$parent = get_post( $post->post_parent );
			if ( $parent && 'your-surgery' === $parent->post_name ) {
				$schemas[] = pll_seo_article( $post );
				$schemas[] = pll_seo_breadcrumb(
					array(
						array(
							'name' => 'Home',
							'url'  => '/',
						),
						array(
							'name' => 'Your Surgery',
							'url'  => '/your-surgery/',
						),
						array(
							'name' => get_the_title( $post ),
							'url'  => $path,
						),
					)
				);
				return $schemas;
			}
		} elseif ( in_array( $path, array( '/privacy/', '/terms/', '/accessibility/' ), true ) ) {
			$schemas[] = array(
				'@context'   => 'https://schema.org',
				'@type'      => 'WebPage',
				'name'       => get_the_title( $post ),
				'url'        => PLL_SEO_ORIGIN . $path,
				'inLanguage' => 'en-US',
				'isPartOf'   => array( '@id' => PLL_SEO_ORIGIN . '/#website' ),
				'publisher'  => array( '@id' => PLL_SEO_ORIGIN . '/#organization' ),
			);
		}

		$schemas[] = pll_seo_breadcrumb(
			array(
				array(
					'name' => 'Home',
					'url'  => '/',
				),
				array(
					'name' => get_the_title( $post ),
					'url'  => $path,
				),
			)
		);
		return $schemas;
	}

	return $schemas;
}

/**
 * First category of a post (the content model assigns one).
 *
 * @param WP_Post $post Post.
 * @return WP_Term|null
 */
function pll_seo_primary_category_for( $post ) {
	$terms = get_the_category( $post->ID );
	return ( $terms && ! is_wp_error( $terms ) ) ? $terms[0] : null;
}

add_action(
	'wp_head',
	function () {
		if ( is_404() || is_search() ) {
			// Only the site graph on utility views.
			$schemas = array( pll_seo_site_graph() );
		} else {
			$schemas = pll_seo_schemas_for_view();
		}
		foreach ( $schemas as $schema ) {
			echo '<script type="application/ld+json">' .
				wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) .
				'</script>' . "\n";
		}
	},
	5
);
