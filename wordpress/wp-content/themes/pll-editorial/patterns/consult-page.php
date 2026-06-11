<?php
/**
 * Title: Consult — Full Page
 * Slug: pll/consult-page
 * Categories: pll-sections
 * Block Types: pll/consult-form
 *
 * Port of app/consult/page.tsx. Hero band + two-column body: the
 * consultation form (dynamic pll/consult-form block; internals rendered by
 * the plugin) on the left and the sticky contact card (address, phone, fax,
 * hours, directions, virtual consult note) on the right. The GHL chat
 * widget <Script> is handled by a plugin and intentionally omitted here.
 * Practice details come from pll_site_info().
 *
 * @package pll-editorial
 */

$pll_info = pll_site_info();
?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20"} -->
<section class="wp-block-group bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal col-span-12 lg:col-span-8"} -->
		<div class="wp-block-group js-reveal col-span-12 lg:col-span-8">
			<!-- wp:paragraph {"className":"eyebrow mb-5"} -->
			<p class="eyebrow mb-5">Contacts · Locations · Hours</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":1,"className":"mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[18ch] text-[clamp(44px,7vw,112px)]"} -->
			<h1 class="wp-block-heading mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[18ch] text-[clamp(44px,7vw,112px)]">Start the conversation. <em class="italic text-spine">We’ll handle the rest.</em></h1>
			<!-- /wp:heading -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-100 col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule lg:self-end"} -->
		<div class="wp-block-group js-reveal pll-delay-100 col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule lg:self-end">
			<!-- wp:paragraph {"className":"font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft"} -->
			<p class="font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft">Tell us about your goals — we’ll respond within one business day. Or call <?php echo esc_html( $pll_info['phone'] ); ?> for an immediate response.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper-off py-20 lg:py-28"} -->
<section class="wp-block-group bg-paper-off py-20 lg:py-28">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16 items-start"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-16 items-start">
		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal"} -->
		<div class="wp-block-group js-reveal">
			<!-- wp:pll/consult-form /-->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"tagName":"aside","layout":{"type":"default"},"className":"js-reveal pll-delay-100 lg:sticky lg:top-24"} -->
		<aside class="wp-block-group js-reveal pll-delay-100 lg:sticky lg:top-24">
			<!-- wp:group {"layout":{"type":"default"},"className":"border border-ink bg-paper"} -->
			<div class="wp-block-group border border-ink bg-paper">
				<!-- wp:group {"layout":{"type":"default"},"className":"bg-spine text-paper p-6 lg:p-7"} -->
				<div class="wp-block-group bg-spine text-paper p-6 lg:p-7">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.22em] text-[10.5px] inline-flex items-center gap-2.5 text-gold"} -->
					<p class="font-mono uppercase tracking-[0.22em] text-[10.5px] inline-flex items-center gap-2.5 text-gold"><span aria-hidden="true" class="inline-block w-[22px] h-px bg-gold"></span>Premier Offices</p>
					<!-- /wp:paragraph -->

					<!-- wp:heading {"level":2,"className":"mt-3 font-serif font-medium text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.01em] text-paper"} -->
					<h2 class="wp-block-heading mt-3 font-serif font-medium text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.01em] text-paper">Upland, <em class="italic text-gold">California.</em></h2>
					<!-- /wp:heading -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"p-6 lg:p-7 divide-y divide-rule"} -->
				<div class="wp-block-group p-6 lg:p-7 divide-y divide-rule">
					<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start"} -->
					<div class="wp-block-group grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start">
						<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1"} -->
						<p class="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1">Address</p>
						<!-- /wp:paragraph -->

						<!-- wp:group {"layout":{"type":"default"},"className":"text-ink"} -->
						<div class="wp-block-group text-ink">
							<!-- wp:paragraph {"className":"font-serif text-[17px] leading-[1.4] text-ink"} -->
							<p class="font-serif text-[17px] leading-[1.4] text-ink"><?php echo esc_html( $pll_info['street'] ); ?><br><?php echo esc_html( $pll_info['city'] ); ?>, <?php echo esc_html( $pll_info['state'] ); ?> <?php echo esc_html( $pll_info['zip'] ); ?></p>
							<!-- /wp:paragraph -->

							<!-- wp:buttons -->
							<div class="wp-block-buttons">
								<!-- wp:button {"linkTarget":"_blank","rel":"noopener noreferrer"} -->
								<div class="wp-block-button"><a class="wp-block-button__link wp-element-button mt-2 inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine border-b border-spine pb-0.5" href="https://www.google.com/maps/dir/400+N.+Mountain+Ave.+Suite+305,+Upland,+CA+91786/" target="_blank" rel="noopener noreferrer">Get Directions<span class="font-serif italic text-[14px]" aria-hidden="true">→</span></a></div>
								<!-- /wp:button -->
							</div>
							<!-- /wp:buttons -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:group -->

					<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start"} -->
					<div class="wp-block-group grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start">
						<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1"} -->
						<p class="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1">Phone</p>
						<!-- /wp:paragraph -->

						<!-- wp:group {"layout":{"type":"default"},"className":"text-ink"} -->
						<div class="wp-block-group text-ink">
							<!-- wp:paragraph -->
							<p><a href="<?php echo esc_url( $pll_info['phone_href'] ); ?>" class="font-serif italic text-[22px] text-spine hover:text-spine-deep"><?php echo esc_html( $pll_info['phone'] ); ?></a></p>
							<!-- /wp:paragraph -->

							<!-- wp:paragraph {"className":"mt-1 text-[13px] text-muted"} -->
							<p class="mt-1 text-[13px] text-muted">Fax · (909) 596-4344</p>
							<!-- /wp:paragraph -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:group -->

					<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start"} -->
					<div class="wp-block-group grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start">
						<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1"} -->
						<p class="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1">Hours</p>
						<!-- /wp:paragraph -->

						<!-- wp:group {"layout":{"type":"default"},"className":"text-ink"} -->
						<div class="wp-block-group text-ink">
							<!-- wp:paragraph {"className":"font-serif text-[16px] leading-[1.55] text-ink"} -->
							<p class="font-serif text-[16px] leading-[1.55] text-ink">Mon–Fri · 8:00 AM – 5:00 PM<br>Sat–Sun · By appointment</p>
							<!-- /wp:paragraph -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:group -->

					<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start"} -->
					<div class="wp-block-group grid grid-cols-[88px_1fr] gap-4 py-4 first:pt-0 last:pb-0 items-start">
						<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1"} -->
						<p class="font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted pt-1">Virtual</p>
						<!-- /wp:paragraph -->

						<!-- wp:group {"layout":{"type":"default"},"className":"text-ink"} -->
						<div class="wp-block-group text-ink">
							<!-- wp:paragraph {"className":"text-[14px] leading-[1.6] text-ink-soft"} -->
							<p class="text-[14px] leading-[1.6] text-ink-soft">Out of state? We hold initial consultations by secure video so you can travel only when surgery requires.</p>
							<!-- /wp:paragraph -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</aside>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
