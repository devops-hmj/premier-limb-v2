<?php
/**
 * Title: Footer
 * Slug: pll/footer
 * Categories: pll-sections
 * Inserter: no
 *
 * Port of components/v2/FooterV2.tsx. Lives in the footer template part —
 * link labels/columns are editable in the Site Editor. The year inside
 * .pll-year is kept current by a render_block filter (inc/setup.php).
 *
 * @package pll-editorial
 */

$pll_info = pll_site_info();
$pll_logo = get_theme_file_uri( 'assets/images/PLL-white-logo.png' );
?>
<!-- wp:group {"tagName":"div","layout":{"type":"default"},"className":"bg-ink text-paper/85 pt-16 pb-8"} -->
<div class="wp-block-group bg-ink text-paper/85 pt-16 pb-8">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12">
		<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-14 pb-14 border-b border-white/15"} -->
		<div class="wp-block-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-14 pb-14 border-b border-white/15">
			<!-- wp:group {"layout":{"type":"default"},"className":"md:col-span-2 lg:col-span-1"} -->
			<div class="wp-block-group md:col-span-2 lg:col-span-1">
				<!-- wp:image {"sizeSlug":"full","className":"mb-6"} -->
				<?php // w/h utilities (not h-auto w-auto): the Next build honors the 220x68 attrs, upscaling the 202x62 source. ?>
				<figure class="wp-block-image size-full mb-6"><img src="<?php echo esc_url( $pll_logo ); ?>" alt="<?php esc_attr_e( 'Premier Limb Lengthening Institute', 'pll-editorial' ); ?>" width="220" height="68" class="block w-[220px] h-[68px] max-w-full"/></figure>
				<!-- /wp:image -->

				<!-- wp:paragraph {"className":"font-serif italic text-[18px] text-paper/90 max-w-[34ch] mb-6"} -->
				<p class="font-serif italic text-[18px] text-paper/90 max-w-[34ch] mb-6">Cosmetic limb lengthening in Upland, California, founded by Dr. Hrayr Basmajian</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"not-italic text-[13px] leading-[1.8] text-paper/85"} -->
				<p class="not-italic text-[13px] leading-[1.8] text-paper/85"><?php echo esc_html( $pll_info['street'] ); ?><br><?php echo esc_html( $pll_info['city'] ); ?>, <?php echo esc_html( $pll_info['state'] ); ?> <?php echo esc_html( $pll_info['zip'] ); ?><br><a href="<?php echo esc_url( $pll_info['phone_href'] ); ?>" class="text-cream hover:text-paper transition-colors"><?php echo esc_html( $pll_info['phone'] ); ?></a></p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"}} -->
			<div class="wp-block-group">
				<!-- wp:heading {"level":4,"className":"font-mono uppercase tracking-[0.24em] text-[10.5px] text-cream mb-5 font-medium"} -->
				<h4 class="wp-block-heading font-mono uppercase tracking-[0.24em] text-[10.5px] text-cream mb-5 font-medium">The Practice</h4>
				<!-- /wp:heading -->

				<!-- wp:list {"className":"list-none"} -->
				<ul class="wp-block-list list-none"><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/dr-basmajian/" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Dr. Basmajian</a></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/about/" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">About the Practice</a></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/limb-lengthening-pricing-options/" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Pricing</a></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/consult/" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Contact</a></li>
				<!-- /wp:list-item --></ul>
				<!-- /wp:list -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"}} -->
			<div class="wp-block-group">
				<!-- wp:heading {"level":4,"className":"font-mono uppercase tracking-[0.24em] text-[10.5px] text-cream mb-5 font-medium"} -->
				<h4 class="wp-block-heading font-mono uppercase tracking-[0.24em] text-[10.5px] text-cream mb-5 font-medium">On the Homepage</h4>
				<!-- /wp:heading -->

				<!-- wp:list {"className":"list-none"} -->
				<ul class="wp-block-list list-none"><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/#surgery" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Your Surgery</a></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/#results" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Results</a></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/#concierge" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Concierge Program</a></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/#testimonials" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Testimonials</a></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/#faq" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">FAQ</a></li>
				<!-- /wp:list-item --></ul>
				<!-- /wp:list -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"}} -->
			<div class="wp-block-group">
				<!-- wp:heading {"level":4,"className":"font-mono uppercase tracking-[0.24em] text-[10.5px] text-cream mb-5 font-medium"} -->
				<h4 class="wp-block-heading font-mono uppercase tracking-[0.24em] text-[10.5px] text-cream mb-5 font-medium">Resources</h4>
				<!-- /wp:heading -->

				<!-- wp:list {"className":"list-none"} -->
				<ul class="wp-block-list list-none"><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/blog/" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Blog</a></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/consult/" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Schedule Consultation</a></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"py-1.5"} -->
				<li class="py-1.5"><a href="/limb-lengthening-pricing-options/#financing" class="text-[13.5px] text-paper/85 hover:text-cream transition-colors">Financing Options</a></li>
				<!-- /wp:list-item --></ul>
				<!-- /wp:list -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->

		<!-- wp:paragraph {"className":"pt-6 font-mono uppercase tracking-[0.14em] text-[10px] text-paper/55"} -->
		<p class="pt-6 font-mono uppercase tracking-[0.14em] text-[10px] text-paper/55">Results may vary.</p>
		<!-- /wp:paragraph -->

		<!-- wp:group {"layout":{"type":"default"},"className":"pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 font-mono uppercase text-[10.5px] tracking-[0.14em] text-paper/80"} -->
		<div class="wp-block-group pt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 font-mono uppercase text-[10.5px] tracking-[0.14em] text-paper/80">
			<!-- wp:paragraph -->
			<p>© <span class="pll-year"><?php echo esc_html( gmdate( 'Y' ) ); ?></span> Premier Limb Lengthening. All rights reserved.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"flex flex-wrap items-center gap-3"} -->
			<p class="flex flex-wrap items-center gap-3"><a href="/privacy/" class="hover:text-cream transition-colors">Privacy Policy</a><span aria-hidden="true">·</span><a href="/terms/" class="hover:text-cream transition-colors">Terms</a><span aria-hidden="true">·</span><a href="/accessibility/" class="hover:text-cream transition-colors">Accessibility</a></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
