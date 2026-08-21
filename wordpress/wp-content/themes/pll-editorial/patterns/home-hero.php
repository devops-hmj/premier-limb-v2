<?php
/**
 * Title: Homepage — Hero Video Stage
 * Slug: pll/home-hero
 * Categories: pll-sections
 * Block Types: pll/hero-video
 *
 * Port of components/v2/HeroStage.tsx content. The stage chrome (video,
 * scrim, plate, sound toggle, overlay nav) is rendered by pll/hero-video;
 * everything here is the editable text layer.
 *
 * @package pll-editorial
 */

$pll_video  = pll_media_url( 'home-hero.mp4' );
$pll_poster = pll_media_url( 'home-hero-poster.jpg' );
?>
<!-- wp:pll/hero-video {"videoUrl":"<?php echo esc_url( $pll_video ); ?>","posterUrl":"<?php echo esc_url( $pll_poster ); ?>","lock":{"move":true,"remove":true},"templateLock":"contentOnly"} -->
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"className":"relative z-10 flex-1 flex flex-col mx-auto max-w-wrap w-full px-6 lg:px-12 pt-4 sm:pt-5 lg:pt-6 pb-5 sm:pb-6 lg:pb-8"} -->
<section class="wp-block-group relative z-10 flex-1 flex flex-col mx-auto max-w-wrap w-full px-6 lg:px-12 pt-4 sm:pt-5 lg:pt-6 pb-5 sm:pb-6 lg:pb-8">
	<!-- wp:heading {"level":1,"className":"js-reveal font-serif font-normal text-white tracking-[-0.025em] leading-[0.98] max-w-[19ch] !mt-auto [text-wrap:balance] text-[clamp(40px,min(5.6vw,9.5vh),118px)] [text-shadow:0_2px_30px_rgba(0,0,0,0.4)]"} -->
	<h1 class="wp-block-heading js-reveal font-serif font-normal text-white tracking-[-0.025em] leading-[0.98] max-w-[19ch] !mt-auto [text-wrap:balance] text-[clamp(40px,min(5.6vw,9.5vh),118px)] [text-shadow:0_2px_30px_rgba(0,0,0,0.4)]">Cosmetic limb lengthening, performed by a <em class="italic text-gold">fellowship-trained trauma surgeon.</em></h1>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"className":"js-reveal pll-delay-100 font-serif italic text-[24px] lg:text-[26px] leading-[1.1] text-gold mt-4"} -->
	<p class="js-reveal pll-delay-100 font-serif italic text-[24px] lg:text-[26px] leading-[1.1] text-gold mt-4">“Confidence you can stand behind.”</p>
	<!-- /wp:paragraph -->

	<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-300 mt-auto max-sm:!mt-6 pt-5 pb-5 border-t border-white/35 border-b grid grid-cols-12 gap-4 items-baseline"} -->
	<div class="wp-block-group js-reveal pll-delay-300 mt-auto max-sm:!mt-6 pt-5 pb-5 border-t border-white/35 border-b grid grid-cols-12 gap-4 items-baseline">
		<!-- wp:paragraph {"className":"col-span-12 lg:col-span-7 max-sm:pr-24 font-serif italic text-white leading-[1.3] text-[clamp(16px,1.7vw,21px)]"} -->
		<p class="col-span-12 lg:col-span-7 max-sm:pr-24 font-serif italic text-white leading-[1.3] text-[clamp(16px,1.7vw,21px)]">Dr. Hrayr Basmajian has performed thousands of procedures across trauma, cosmetic, and revision settings. Gain up to 6 inches, with the surgical depth to back it.</p>
		<!-- /wp:paragraph -->

		<!-- wp:group {"layout":{"type":"default"},"className":"max-sm:hidden col-span-12 lg:col-span-5 font-mono uppercase text-[10.5px] tracking-[0.18em] text-white/85 leading-[1.7]"} -->
		<div class="wp-block-group max-sm:hidden col-span-12 lg:col-span-5 font-mono uppercase text-[10.5px] tracking-[0.18em] text-white/85 leading-[1.7]">
			<!-- wp:paragraph -->
			<p><strong class="text-white font-medium">Surgeon</strong> &nbsp; Dr. Hrayr Basmajian, MD</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p><strong class="text-white font-medium">Practice</strong> &nbsp; Premier Limb Lengthening</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph -->
			<p><strong class="text-white font-medium">Location</strong> &nbsp; Upland, Southern California</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
<!-- /wp:pll/hero-video -->
