<?php
/**
 * PLL site configuration + content seeding. IDEMPOTENT — safe to re-run.
 *
 * What it does:
 *   1. Core options (title, tagline, timezone, permalinks, comments off)
 *   2. Sideloads bundled media (content/media/*) into the media library
 *   3. Composes the marketing pages from the theme's registered block
 *      patterns (single source of truth: wp-content/themes/pll-editorial/patterns/)
 *   4. Reading settings: static front page "Home", posts page "Blog"
 *   5. Flushes rewrite rules
 *
 * How to run:
 *   - Local dev: executed automatically by the Playground blueprint (runPHP)
 *   - HIPAA Vault: `wp eval-file wp-content/../setup.php` (or place beside
 *     wp-config and run `wp eval-file setup.php`) AFTER activating the
 *     pll-editorial theme and importing content/pll-content.wxr
 *
 * Define PLL_SEED_FORCE=true to overwrite existing page content from the
 * current pattern files (used when iterating on patterns in dev).
 *
 * @package pll
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'pll_media_url' ) ) {
	// Theme not active — seeding depends on the pll-editorial theme.
	if ( defined( 'WP_CLI' ) && WP_CLI ) {
		WP_CLI::error( 'Activate the pll-editorial theme before running setup.php.' );
	}
	return;
}

/**
 * 1) Core options.
 */
update_option( 'blogname', 'Premier Limb Lengthening' );
update_option( 'blogdescription', 'Cosmetic limb lengthening, founded by Dr. Hrayr Basmajian' );
update_option( 'timezone_string', 'America/Los_Angeles' );
update_option( 'permalink_structure', '/%postname%/' );
update_option( 'default_comment_status', 'closed' );
update_option( 'default_ping_status', 'closed' );

/**
 * 2) Media sideloading.
 */
function pll_seed_media() {
	$dir = defined( 'PLL_SEED_MEDIA_DIR' ) ? PLL_SEED_MEDIA_DIR : __DIR__ . '/media';
	if ( ! is_dir( $dir ) ) {
		return;
	}

	require_once ABSPATH . 'wp-admin/includes/image.php';
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';

	foreach ( glob( $dir . '/*' ) as $file ) {
		if ( ! is_file( $file ) ) {
			continue;
		}
		$name = basename( $file );
		if ( pll_media_url( $name ) ) {
			continue; // Already imported.
		}

		$tmp = wp_tempnam( $name );
		if ( ! $tmp || ! copy( $file, $tmp ) ) {
			continue;
		}

		$attachment_id = media_handle_sideload(
			array(
				'name'     => $name,
				'tmp_name' => $tmp,
			),
			0
		);

		// pll_media_url caches negative lookups for the request — clear it.
		wp_cache_delete( 'pll_media_' . md5( $name ), 'pll-editorial' );

		if ( is_wp_error( $attachment_id ) ) {
			// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			error_log( 'pll seed: media sideload failed for ' . $name . ': ' . $attachment_id->get_error_message() );
		}
	}
}
pll_seed_media();

/**
 * 2b) Verbatim-path uploads + featured images.
 *
 * content/media-uploads/ holds assets whose URL paths must survive the
 * migration byte-for-byte: blog hero images at their original
 * /wp-content/uploads/YYYY/MM/<file> paths (zero-redirect for anything
 * indexed in Google Images) and the your-surgery diagrams under a stable
 * pll/ namespace referenced by the generated post content.
 */
function pll_seed_uploads() {
	$src = defined( 'PLL_SEED_MEDIA_DIR' ) ? dirname( PLL_SEED_MEDIA_DIR ) . '/media-uploads' : __DIR__ . '/media-uploads';
	if ( ! is_dir( $src ) ) {
		return;
	}

	require_once ABSPATH . 'wp-admin/includes/image.php';

	$uploads  = wp_get_upload_dir();
	$iterator = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $src, FilesystemIterator::SKIP_DOTS ) );

	foreach ( $iterator as $file ) {
		if ( ! $file->isFile() ) {
			continue;
		}
		$rel    = str_replace( '\\', '/', ltrim( substr( $file->getPathname(), strlen( $src ) ), '/\\' ) );
		$target = trailingslashit( $uploads['basedir'] ) . $rel;

		if ( ! file_exists( $target ) ) {
			wp_mkdir_p( dirname( $target ) );
			copy( $file->getPathname(), $target );
		}

		if ( pll_attachment_id_by_relpath( $rel ) ) {
			continue;
		}

		$filetype      = wp_check_filetype( basename( $rel ) );
		$attachment_id = wp_insert_attachment(
			array(
				'post_title'     => sanitize_text_field( pathinfo( $rel, PATHINFO_FILENAME ) ),
				'post_status'    => 'inherit',
				'post_mime_type' => $filetype['type'] ? $filetype['type'] : 'application/octet-stream',
			),
			$target
		);
		if ( ! is_wp_error( $attachment_id ) && $attachment_id ) {
			update_post_meta( $attachment_id, '_wp_attached_file', $rel );
			$meta = wp_generate_attachment_metadata( $attachment_id, $target );
			if ( $meta ) {
				wp_update_attachment_metadata( $attachment_id, $meta );
			}
		}
	}
}

/**
 * Find an attachment by its uploads-relative path.
 *
 * @param string $rel e.g. '2025/07/Am-I-Too-Old.jpeg' or 'pll/your-surgery/x.webp'.
 * @return int Attachment ID or 0.
 */
function pll_attachment_id_by_relpath( $rel ) {
	global $wpdb;
	$id = $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$wpdb->prepare(
			"SELECT post_id FROM $wpdb->postmeta WHERE meta_key = '_wp_attached_file' AND meta_value = %s LIMIT 1",
			$rel
		)
	);
	return $id ? (int) $id : 0;
}

/**
 * Wire featured images + alt text from media-manifest.json (slug → file/alt).
 */
function pll_seed_featured_images() {
	$manifest_path = ( defined( 'PLL_SEED_MEDIA_DIR' ) ? dirname( PLL_SEED_MEDIA_DIR ) : __DIR__ ) . '/media-manifest.json';
	if ( ! file_exists( $manifest_path ) ) {
		return;
	}
	$manifest = json_decode( (string) file_get_contents( $manifest_path ), true );
	if ( empty( $manifest['featured'] ) ) {
		return;
	}

	foreach ( $manifest['featured'] as $slug => $info ) {
		$post = get_page_by_path( $slug, OBJECT, 'post' );
		if ( ! $post ) {
			continue;
		}
		$attachment_id = pll_attachment_id_by_relpath( $info['file'] );
		if ( ! $attachment_id ) {
			continue;
		}
		set_post_thumbnail( $post->ID, $attachment_id );
		if ( ! empty( $info['alt'] ) ) {
			update_post_meta( $attachment_id, '_wp_attachment_image_alt', sanitize_text_field( $info['alt'] ) );
		}
	}
}

pll_seed_uploads();
pll_seed_featured_images();

/**
 * 3) Marketing pages composed from theme patterns.
 */

/**
 * Compose post_content from an ordered list of registered pattern slugs.
 *
 * @param string[] $pattern_slugs Pattern slugs.
 * @return string Block markup.
 */
function pll_compose_patterns( $pattern_slugs ) {
	$registry = WP_Block_Patterns_Registry::get_instance();
	$content  = '';
	foreach ( $pattern_slugs as $slug ) {
		$pattern = $registry->get_registered( $slug );
		if ( $pattern && ! empty( $pattern['content'] ) ) {
			$content .= "\n" . trim( $pattern['content'] ) . "\n";
		} else {
			// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			error_log( 'pll seed: pattern not registered: ' . $slug );
		}
	}
	return trim( $content );
}

/**
 * Create or (when PLL_SEED_FORCE) refresh a page.
 *
 * @param string $slug     Page slug.
 * @param string $title    Page title.
 * @param string $content  Block markup.
 * @param array  $extra    Extra wp_insert_post fields (post_parent, meta_input…).
 * @return int Page ID (0 on failure).
 */
function pll_seed_page( $slug, $title, $content, $extra = array() ) {
	$existing = get_page_by_path( $slug, OBJECT, 'page' );
	$force    = defined( 'PLL_SEED_FORCE' ) && PLL_SEED_FORCE;

	if ( $existing && ! $force ) {
		return (int) $existing->ID;
	}

	$postarr = array_merge(
		array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_name'    => $slug,
			'post_title'   => $title,
			'post_content' => $content,
		),
		$extra
	);

	if ( $existing ) {
		$postarr['ID'] = $existing->ID;
	}

	$page_id = wp_insert_post( wp_slash( $postarr ), true );
	if ( is_wp_error( $page_id ) ) {
		// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
		error_log( 'pll seed: page failed for ' . $slug . ': ' . $page_id->get_error_message() );
		return 0;
	}
	return (int) $page_id;
}

$pll_home_id = pll_seed_page(
	'home',
	'Home',
	pll_compose_patterns(
		array(
			'pll/home-hero',
			'pll/home-article',
			'pll/home-pillars',
			'pll/home-bio',
			'pll/home-process',
			'pll/home-concierge',
			'pll/home-candidate',
			'pll/home-results',
			'pll/home-pricing',
			'pll/home-testimonials',
			'pll/home-faq',
			'pll/final-cta',
		)
	)
);

// Posts page — content is ignored by WP (the home.html template renders the loop).
$pll_blog_id = pll_seed_page( 'blog', 'Blog', '' );

// Marketing pages — composed from theme patterns (single source of truth).
pll_seed_page(
	'about',
	'About',
	pll_compose_patterns( array( 'pll/about-page', 'pll/final-cta' ) )
);

pll_seed_page(
	'dr-basmajian',
	'Dr. Basmajian',
	pll_compose_patterns(
		array(
			'pll/profile-hero',
			'pll/profile-intro',
			'pll/profile-credentials',
			'pll/profile-training',
			'pll/profile-memberships',
			'pll/profile-research',
			'pll/final-cta',
		)
	)
);

// No FinalCta on consult (the page goes straight to the footer in Next).
pll_seed_page( 'consult', 'Contact', pll_compose_patterns( array( 'pll/consult-page' ) ) );

// Section order per app/limb-lengthening-pricing-options/page.tsx:
// hero → plans → add-ons → included/excluded → financing. No FinalCta.
pll_seed_page(
	'limb-lengthening-pricing-options',
	'Pricing',
	pll_compose_patterns(
		array(
			'pll/pricing-hero',
			'pll/pricing-plans',
			'pll/pricing-addons',
			'pll/pricing-included',
			'pll/pricing-financing',
		)
	)
);

/**
 * 3b) Authors — restore the legacy /author/<nicename>/ archives.
 *
 * The WXR importer creates users keyed by login; the public nicename must
 * differ from the login (blunts login enumeration) and match the legacy
 * archive slugs. ccatandella authored 4 posts (per the scraped author
 * archive); edusenbury authored the rest. cjpeters had zero posts live and
 * is intentionally absent (the legacy archive already 404'd).
 */
function pll_seed_authors() {
	$ccatandella_posts = array(
		'the-science-behind-bone-regeneration-and-limb-lengthening',
		'bone-health-and-nutrition-before-and-after-limb-lengthening',
		'limb-lengthening-what-you-gain-what-you-risk',
		'rewriting-the-body-norm-stigmas-around-limb-lengthening',
	);

	$authors = array(
		array(
			'login'    => 'pll-ccatandella',
			'nicename' => 'ccatandella',
			'display'  => 'C. Catandella',
			'email'    => 'ccatandella@premierlimblengthening.com',
		),
		array(
			'login'    => 'pll-edusenbury',
			'nicename' => 'edusenbury',
			'display'  => 'E. Dusenbury',
			'email'    => 'edusenbury@premierlimblengthening.com',
		),
	);

	$ids = array();
	foreach ( $authors as $author ) {
		$user = get_user_by( 'login', $author['login'] );
		if ( ! $user ) {
			$user_id = wp_insert_user(
				array(
					'user_login'   => $author['login'],
					'user_pass'    => wp_generate_password( 32 ),
					'user_email'   => $author['email'],
					'display_name' => $author['display'],
					'role'         => 'author',
				)
			);
			if ( is_wp_error( $user_id ) ) {
				continue;
			}
		} else {
			$user_id = $user->ID;
		}
		wp_update_user(
			array(
				'ID'            => $user_id,
				'user_nicename' => $author['nicename'],
				'display_name'  => $author['display'],
			)
		);
		$ids[ $author['login'] ] = (int) $user_id;
	}

	if ( empty( $ids ) ) {
		return;
	}

	$posts = get_posts(
		array(
			'post_type'      => 'post',
			'posts_per_page' => -1,
		)
	);
	foreach ( $posts as $post ) {
		$target = in_array( $post->post_name, $ccatandella_posts, true )
			? ( $ids['pll-ccatandella'] ?? 0 )
			: ( $ids['pll-edusenbury'] ?? 0 );
		if ( $target && (int) $post->post_author !== $target ) {
			wp_update_post(
				array(
					'ID'          => $post->ID,
					'post_author' => $target,
				)
			);
		}
	}
}
pll_seed_authors();

/**
 * 4) Reading settings.
 */
if ( $pll_home_id ) {
	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $pll_home_id );
}
if ( $pll_blog_id ) {
	update_option( 'page_for_posts', $pll_blog_id );
}

/**
 * 5) Permalinks.
 */
flush_rewrite_rules();
