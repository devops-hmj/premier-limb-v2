<?php
/**
 * Title: Dr. Basmajian — Hero
 * Slug: pll/profile-hero
 * Categories: pll-sections
 *
 * Port of app/dr-basmajian/page.tsx (hero band): eyebrow + h1 + credential
 * strip + specialty chips + FAAOS badge, with the editorial portrait on the
 * right. Portrait + badge are theme assets (assets/images/dr-picture.jpg,
 * assets/images/FAAOS-Badge-150x150.png).
 *
 * @package pll-editorial
 */

$pll_portrait = get_theme_file_uri( 'assets/images/dr-picture.jpg' );
$pll_badge    = get_theme_file_uri( 'assets/images/FAAOS-Badge-150x150.png' );
?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20"} -->
<section class="wp-block-group bg-paper-off border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8 items-end"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8 items-end">
		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal col-span-12 lg:col-span-7"} -->
		<div class="wp-block-group js-reveal col-span-12 lg:col-span-7">
			<!-- wp:paragraph {"className":"eyebrow mb-5"} -->
			<p class="eyebrow mb-5">Profile · Your Surgeon</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":1,"className":"mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.94] max-w-[16ch] text-[clamp(48px,8vw,132px)]"} -->
			<h1 class="wp-block-heading mt-5 font-serif font-normal tracking-[-0.025em] text-ink leading-[0.94] max-w-[16ch] text-[clamp(48px,8vw,132px)]">Dr. Hrayr <em class="italic text-spine">Basmajian.</em></h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"mt-6 pt-4 border-t border-rule font-mono uppercase tracking-[0.18em] text-[12px] text-ink"} -->
			<p class="mt-6 pt-4 border-t border-rule font-mono uppercase tracking-[0.18em] text-[12px] text-ink">MD · Fellowship-Trained Trauma Surgeon · Director, PVHMC</p>
			<!-- /wp:paragraph -->

			<!-- wp:list {"className":"mt-5 flex flex-wrap gap-2"} -->
			<ul class="wp-block-list mt-5 flex flex-wrap gap-2">
				<!-- wp:list-item {"className":"font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5"} -->
				<li class="font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5">Cosmetic &amp; Reconstructive Limb Lengthening</li>
				<!-- /wp:list-item -->

				<!-- wp:list-item {"className":"font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5"} -->
				<li class="font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5">Orthopaedic Trauma</li>
				<!-- /wp:list-item -->

				<!-- wp:list-item {"className":"font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5"} -->
				<li class="font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5">Joint Reconstruction</li>
				<!-- /wp:list-item -->

				<!-- wp:list-item {"className":"font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5"} -->
				<li class="font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5">Fragility &amp; Complex Fracture Care</li>
				<!-- /wp:list-item -->

				<!-- wp:list-item {"className":"font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5"} -->
				<li class="font-mono uppercase tracking-[0.16em] text-[10px] text-spine border border-spine/40 px-2.5 py-1.5">Revision &amp; Deformity Correction</li>
				<!-- /wp:list-item -->
			</ul>
			<!-- /wp:list -->

			<!-- wp:group {"layout":{"type":"default"},"className":"mt-6 inline-flex items-center gap-3"} -->
			<div class="wp-block-group mt-6 inline-flex items-center gap-3">
				<!-- wp:image {"sizeSlug":"full","className":"border border-rule bg-paper"} -->
				<figure class="wp-block-image size-full border border-rule bg-paper"><img src="<?php echo esc_url( $pll_badge ); ?>" alt="Fellow of the American Academy of Orthopaedic Surgeons" width="54" height="54"/></figure>
				<!-- /wp:image -->

				<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.16em] text-[10px] leading-[1.4] text-muted max-w-[22ch]"} -->
				<p class="font-mono uppercase tracking-[0.16em] text-[10px] leading-[1.4] text-muted max-w-[22ch]">Fellow, American Academy of Orthopaedic Surgeons</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-100 col-span-12 lg:col-span-5"} -->
		<div class="wp-block-group js-reveal pll-delay-100 col-span-12 lg:col-span-5">
			<!-- wp:group {"layout":{"type":"default"},"className":"v2-portrait aspect-[4/5] bg-paper-warm border border-rule relative overflow-hidden max-w-[90%]"} -->
			<div class="wp-block-group v2-portrait aspect-[4/5] bg-paper-warm border border-rule relative overflow-hidden max-w-[90%]">
				<!-- wp:image {"sizeSlug":"full","className":"absolute inset-0"} -->
				<figure class="wp-block-image size-full absolute inset-0"><img src="<?php echo esc_url( $pll_portrait ); ?>" alt="Dr. Hrayr Basmajian, Orthopaedic Trauma Surgeon" class="w-full h-full object-cover"/></figure>
				<!-- /wp:image -->

				<!-- wp:paragraph {"className":"absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper"} -->
				<p class="absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper">Dr. Basmajian</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
