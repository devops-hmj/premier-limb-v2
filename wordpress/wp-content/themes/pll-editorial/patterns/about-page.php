<?php
/**
 * Title: About — Full Page
 * Slug: pll/about-page
 * Categories: pll-sections
 *
 * Port of app/about/page.tsx. Three sections: hero band (eyebrow + h1 +
 * serif lede), mission copy + "By the numbers" stat card, and the four
 * practice pillars. Reveal/motion mapped to js-reveal + pll-delay-* per
 * docs/PATTERN_CONVENTIONS.md; conditional card borders flattened per index.
 *
 * @package pll-editorial
 */
?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20"} -->
<section class="wp-block-group bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal col-span-12 lg:col-span-8"} -->
		<div class="wp-block-group js-reveal col-span-12 lg:col-span-8">
			<!-- wp:paragraph {"className":"eyebrow mb-5"} -->
			<p class="eyebrow mb-5">About · The Practice</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":1,"className":"mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[18ch] text-[clamp(44px,7.4vw,120px)]"} -->
			<h1 class="wp-block-heading mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.95] max-w-[18ch] text-[clamp(44px,7.4vw,120px)]">Trauma-trained precision, <em class="italic text-spine">applied to limb lengthening.</em></h1>
			<!-- /wp:heading -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-100 col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule lg:self-end"} -->
		<div class="wp-block-group js-reveal pll-delay-100 col-span-12 lg:col-span-4 lg:pl-6 lg:border-l border-rule lg:self-end">
			<!-- wp:paragraph {"className":"font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft"} -->
			<p class="font-serif italic text-[20px] lg:text-[22px] leading-[1.35] text-ink-soft">Premier Limb Lengthening is a cosmetic and reconstructive surgery practice created by Dr. Hrayr Basmajian, founder of Premier Orthopaedic &amp; Trauma Specialists, based in Upland, California.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->

<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper-off py-20 lg:py-28"} -->
<section class="wp-block-group bg-paper-off py-20 lg:py-28">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal col-span-12 lg:col-span-7"} -->
		<div class="wp-block-group js-reveal col-span-12 lg:col-span-7">
			<!-- wp:paragraph {"className":"v2-dropcap text-[18px] leading-[1.6] text-ink mb-7 max-w-[58ch]"} -->
			<p class="v2-dropcap text-[18px] leading-[1.6] text-ink mb-7 max-w-[58ch]">Premier Limb Lengthening exists because cosmetic limb lengthening deserves to be performed in a setting designed around the patient, not as an afterthought to a high-volume surgical schedule. Our practice combines the precision of Dr. Basmajian’s Level II trauma surgery training with the discretion and continuity of private concierge care.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch] mb-5"} -->
			<p class="text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch] mb-5">Dr. Basmajian founded Premier Orthopaedic &amp; Trauma Specialists, a 17+ surgeon orthopaedic group with in-house physical therapy and on-site imaging. That institutional depth is what Premier Limb Lengthening was built on, and it is why we accept cases other practices decline: revision surgery, limb-length discrepancy correction, and complex reconstructions.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch]"} -->
			<p class="text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch]">And because most patients travel for limb lengthening, we built the concierge program from the first call: flights, lodging, physical therapy schedule, post-op check-ins, and one dedicated coordinator owning the entire process.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"tagName":"aside","layout":{"type":"default"},"className":"js-reveal pll-delay-100 col-span-12 lg:col-span-5 lg:pl-2"} -->
		<aside class="wp-block-group js-reveal pll-delay-100 col-span-12 lg:col-span-5 lg:pl-2">
			<!-- wp:group {"layout":{"type":"default"},"className":"border border-ink bg-paper"} -->
			<div class="wp-block-group border border-ink bg-paper">
				<!-- wp:group {"layout":{"type":"default"},"className":"bg-spine text-paper p-6 lg:p-8"} -->
				<div class="wp-block-group bg-spine text-paper p-6 lg:p-8">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.22em] text-[10.5px] inline-flex items-center gap-2.5 text-gold"} -->
					<p class="font-mono uppercase tracking-[0.22em] text-[10.5px] inline-flex items-center gap-2.5 text-gold"><span aria-hidden="true" class="inline-block w-[22px] h-px bg-gold"></span>By the numbers</p>
					<!-- /wp:paragraph -->

					<!-- wp:heading {"level":2,"className":"mt-3 font-serif font-medium text-[26px] lg:text-[30px] leading-[1.1] tracking-[-0.01em]"} -->
					<h2 class="wp-block-heading mt-3 font-serif font-medium text-[26px] lg:text-[30px] leading-[1.1] tracking-[-0.01em]">Experience that <em class="italic text-gold">holds up.</em></h2>
					<!-- /wp:heading -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-2"} -->
				<div class="wp-block-group grid grid-cols-2">
					<!-- wp:group {"layout":{"type":"default"},"className":"p-6 lg:p-7 border-r border-b border-rule"} -->
					<div class="wp-block-group p-6 lg:p-7 border-r border-b border-rule">
						<!-- wp:paragraph {"className":"font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink"} -->
						<p class="font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink"><em class="italic text-spine">1,000s</em></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
						<p class="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">Procedures Performed</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->

					<!-- wp:group {"layout":{"type":"default"},"className":"p-6 lg:p-7 border-b border-rule"} -->
					<div class="wp-block-group p-6 lg:p-7 border-b border-rule">
						<!-- wp:paragraph {"className":"font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink"} -->
						<p class="font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink">2</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
						<p class="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">Fellowship Programs Completed</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->

					<!-- wp:group {"layout":{"type":"default"},"className":"p-6 lg:p-7 border-r border-rule"} -->
					<div class="wp-block-group p-6 lg:p-7 border-r border-rule">
						<!-- wp:paragraph {"className":"font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink"} -->
						<p class="font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink"><em class="italic text-spine">1</em></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
						<p class="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">Dedicated Coordinator</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->

					<!-- wp:group {"layout":{"type":"default"},"className":"p-6 lg:p-7 border-rule"} -->
					<div class="wp-block-group p-6 lg:p-7 border-rule">
						<!-- wp:paragraph {"className":"font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink"} -->
						<p class="font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] text-ink"><em class="italic text-spine">50+</em></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
						<p class="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">States &amp; Countries Served</p>
						<!-- /wp:paragraph -->
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

<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper py-20 lg:py-28 border-t border-b border-rule"} -->
<section class="wp-block-group bg-paper py-20 lg:py-28 border-t border-b border-rule">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12">
		<!-- wp:group {"tagName":"header","layout":{"type":"default"},"className":"js-reveal pb-8 mb-12 border-b border-ink"} -->
		<header class="wp-block-group js-reveal pb-8 mb-12 border-b border-ink">
			<!-- wp:paragraph {"className":"eyebrow mb-4"} -->
			<p class="eyebrow mb-4">How We Practice</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"className":"mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[22ch] text-[clamp(36px,5.4vw,76px)]"} -->
			<h2 class="wp-block-heading mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[22ch] text-[clamp(36px,5.4vw,76px)]">Four convictions <em class="italic text-spine">that shape the work.</em></h2>
			<!-- /wp:heading -->
		</header>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 md:grid-cols-2 border-t border-ink"} -->
		<div class="wp-block-group grid grid-cols-1 md:grid-cols-2 border-t border-ink">
			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal py-10 md:pr-10 md:border-b border-rule"} -->
			<div class="wp-block-group js-reveal py-10 md:pr-10 md:border-b border-rule">
				<!-- wp:paragraph {"className":"font-serif italic text-spine text-[44px] lg:text-[52px] leading-none mb-5"} -->
				<p class="font-serif italic text-spine text-[44px] lg:text-[52px] leading-none mb-5">01</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":3,"className":"font-serif font-medium text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink mb-4 max-w-[18ch]"} -->
				<h3 class="wp-block-heading font-serif font-medium text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink mb-4 max-w-[18ch]">Trauma-Trained</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"text-[15px] leading-[1.7] text-ink-soft max-w-[44ch]"} -->
				<p class="text-[15px] leading-[1.7] text-ink-soft max-w-[44ch]">Our founder is a fellowship-trained orthopaedic trauma and limb lengthening surgeon, and Director of Orthopaedic Trauma at Pomona Valley Hospital Medical Center, one of the busiest Level II trauma centers in Los Angeles County.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-100 py-10 md:pl-10 md:border-l md:border-b border-rule"} -->
			<div class="wp-block-group js-reveal pll-delay-100 py-10 md:pl-10 md:border-l md:border-b border-rule">
				<!-- wp:paragraph {"className":"font-serif italic text-spine text-[44px] lg:text-[52px] leading-none mb-5"} -->
				<p class="font-serif italic text-spine text-[44px] lg:text-[52px] leading-none mb-5">02</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":3,"className":"font-serif font-medium text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink mb-4 max-w-[18ch]"} -->
				<h3 class="wp-block-heading font-serif font-medium text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink mb-4 max-w-[18ch]">Institutional Depth</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"text-[15px] leading-[1.7] text-ink-soft max-w-[44ch]"} -->
				<p class="text-[15px] leading-[1.7] text-ink-soft max-w-[44ch]">Dr. Basmajian is the founder of Premier Orthopaedic &amp; Trauma Specialists, a 17+ surgeon orthopaedic group with in-house physical therapy and on-site imaging. Premier Limb Lengthening patients have direct access to that infrastructure through Dr. Basmajian's network.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-200 py-10 md:pr-10 border-rule"} -->
			<div class="wp-block-group js-reveal pll-delay-200 py-10 md:pr-10 border-rule">
				<!-- wp:paragraph {"className":"font-serif italic text-spine text-[44px] lg:text-[52px] leading-none mb-5"} -->
				<p class="font-serif italic text-spine text-[44px] lg:text-[52px] leading-none mb-5">03</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":3,"className":"font-serif font-medium text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink mb-4 max-w-[18ch]"} -->
				<h3 class="wp-block-heading font-serif font-medium text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink mb-4 max-w-[18ch]">Internal Nail Only</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"text-[15px] leading-[1.7] text-ink-soft max-w-[44ch]"} -->
				<p class="text-[15px] leading-[1.7] text-ink-soft max-w-[44ch]">Every procedure uses the Precice internal magnetic nail. No external frames. No visible hardware. Faster mobilisation and a virtually invisible long-term result.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-300 py-10 md:pl-10 md:border-l border-rule"} -->
			<div class="wp-block-group js-reveal pll-delay-300 py-10 md:pl-10 md:border-l border-rule">
				<!-- wp:paragraph {"className":"font-serif italic text-spine text-[44px] lg:text-[52px] leading-none mb-5"} -->
				<p class="font-serif italic text-spine text-[44px] lg:text-[52px] leading-none mb-5">04</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":3,"className":"font-serif font-medium text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink mb-4 max-w-[18ch]"} -->
				<h3 class="wp-block-heading font-serif font-medium text-[26px] lg:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink mb-4 max-w-[18ch]">Concierge by Default</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"text-[15px] leading-[1.7] text-ink-soft max-w-[44ch]"} -->
				<p class="text-[15px] leading-[1.7] text-ink-soft max-w-[44ch]">From your first virtual consult through your final follow-up, a dedicated coordinator owns the logistics: flights, housing, physical therapy schedule, and family communication.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
