<?php
/**
 * Title: Pillar — Leg Lengthening Surgery
 * Slug: pll/leg-lengthening-surgery
 * Categories: pll-pages
 * Block Types: core/post-content
 * Post Types: page
 *
 * SEO pillar page for /leg-lengthening-surgery/. Copy incorporates
 * Dr. Basmajian's clinical review (PLL_Pillar_Pages_Clinical_Review.docx,
 * signed off July 2026). The H1 and title MUST lead with "Leg Lengthening
 * Surgery" and NEVER "Limb Lengthening Surgery" — that clinical umbrella term
 * belongs to the /your-surgery/ hub, and reusing it here would cannibalize
 * (SEO audit, Critical 1). Owns the consumer terms "leg lengthening surgery" /
 * "leg extension surgery"; links UP to /your-surgery/. No pricing table
 * (guardrail). The "Medically reviewed by" byline is now LIVE
 * (pll_seo_review_dates() in the pll-seo plugin).
 *
 * @package pll-editorial
 */

$pll_img_nail = get_theme_file_uri( 'assets/images/pillars/leg-lengthening-internal-nail-diagram.webp' );
$pll_img_pt   = get_theme_file_uri( 'assets/images/pillars/leg-lengthening-physical-therapy.webp' );
?>
<!-- wp:group {"tagName":"article","layout":{"type":"default"},"className":"bg-paper-off"} -->
<article class="wp-block-group bg-paper-off">
	<!-- wp:group {"tagName":"section","layout":{"type":"default"},"className":"border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20"} -->
	<section class="wp-block-group border-b border-ink pt-28 lg:pt-36 pb-16 lg:pb-20">
		<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12"} -->
		<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12">
			<!-- wp:paragraph {"className":"eyebrow mb-5"} -->
			<p class="eyebrow mb-5">Procedure · Leg Lengthening</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":1,"className":"font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[20ch] text-[clamp(40px,6.4vw,104px)]"} -->
			<h1 class="wp-block-heading font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[20ch] text-[clamp(40px,6.4vw,104px)]">Leg Lengthening Surgery: Procedure, Recovery, and <em class="italic text-spine">What to Expect.</em></h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"mt-7 max-w-[62ch] font-serif italic text-[19px] lg:text-[22px] leading-[1.4] text-ink-soft"} -->
			<p class="mt-7 max-w-[62ch] font-serif italic text-[19px] lg:text-[22px] leading-[1.4] text-ink-soft">Leg lengthening surgery increases the length of the thigh bone, the shin bone, or both, to make a person permanently taller. A surgeon cuts the bone in a controlled way, then uses an internal nail to slowly separate the two segments while the body fills the gap with new bone. A single femur procedure typically adds 2 to 3.5 inches, and a combined femur and tibia approach can add 4 to 6 inches total, as a combined surgery or staged as two separate surgeries.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</section>
	<!-- /wp:group -->

	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-12 gap-6 lg:gap-8"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-12 gap-6 lg:gap-8">
		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal col-span-12 lg:col-span-8 pll-prose"} -->
		<div class="wp-block-group js-reveal col-span-12 lg:col-span-8 pll-prose">
			<!-- wp:paragraph -->
			<p>The cosmetic version of this procedure uses an internal telescopic nail that sits entirely inside the bone, with no external frame. This is the same distraction osteogenesis technique orthopedic surgeons have used for decades to treat limb length discrepancies and reconstruct bone after trauma, applied to healthy adults who want to increase their height. To understand exactly how the underlying procedure works clinically, see our overview of <a href="/your-surgery/">how limb lengthening works</a>.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"what-it-can-and-cannot-do"} -->
			<h2 class="wp-block-heading" id="what-it-can-and-cannot-do">What Leg Lengthening Surgery Can and Cannot Do</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>A single femur procedure adds 2 to 3.5 inches, and a second tibia procedure can add another 2 to 3 inches, for a typical combined total of 4 to 6 inches. Lengthening beyond these amounts in one bone raises the risk of complications, so most surgeons cap each segment conservatively. Concerns about looking disproportionate are common but largely unfounded within these limits. The muscles, tendons, and soft tissue stretch gradually alongside the bone, so a femur gain reads as natural, not out of proportion.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"the-procedure-step-by-step"} -->
			<h2 class="wp-block-heading" id="the-procedure-step-by-step">The Procedure Step by Step</h2>
			<!-- /wp:heading -->

			<!-- wp:pll/figure {"url":"<?php echo esc_url( $pll_img_nail ); ?>","alt":"Diagram of an internal telescopic nail inside the femur during leg lengthening surgery, with new bone forming in the lengthening gap","width":1024,"height":1024,"figClass":"wp-block-image"} /-->

			<!-- wp:paragraph {"className":"pll-img-caption"} -->
			<p class="pll-img-caption">The internal magnetic nail extends about 1 millimeter per day while the body fills the gap with new bone.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"before-surgery","level":3} -->
			<h3 class="wp-block-heading" id="before-surgery">Before Surgery</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>The surgeon performs a full evaluation: physical exam, full-length standing X-rays, and blood work. Surgeon and patient agree on a target length based on anatomy, goals, and risk tolerance.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"surgery-day","level":3} -->
			<h3 class="wp-block-heading" id="surgery-day">Surgery Day</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>The procedure runs 1 to 2 hours per bone under general anesthesia. The surgeon performs the osteotomy, inserts the internal nail into the marrow canal, and closes the small incisions. Most patients go home the same day but some stay one night.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"lengthening-phase","level":3} -->
			<h3 class="wp-block-heading" id="lengthening-phase">Lengthening Phase, 2 to 3 Months</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Starting 7 to 10 days after surgery (depending on the bone lengthened and patient factors), the patient activates the nail about 1 millimeter per day with an external controller. Physical therapy runs throughout. Patients use crutches or a walker during this phase.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"consolidation-phase","level":3} -->
			<h3 class="wp-block-heading" id="consolidation-phase">Consolidation Phase, 3 to 6 Months</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>After reaching target length, the bone hardens. Patients move from partial to full weight-bearing and are typically walking unaided within 3 to 4 months of finishing lengthening. Return to running and sports usually comes 6 to 12 months after surgery.</p>
			<!-- /wp:paragraph -->

			<!-- wp:pll/figure {"url":"<?php echo esc_url( $pll_img_pt ); ?>","alt":"Patient practicing gait training with an orthopedic physical therapist during leg lengthening recovery","width":1024,"height":1024,"figClass":"wp-block-image"} /-->

			<!-- wp:paragraph {"className":"pll-img-caption"} -->
			<p class="pll-img-caption">Physical therapy runs through the lengthening and consolidation phases, from range-of-motion work to full weight-bearing.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"how-much-it-hurts"} -->
			<h2 class="wp-block-heading" id="how-much-it-hurts">How Much Leg Lengthening Surgery Hurts</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>The most intense pain lasts the first 5 to 7 days after surgery and is controlled with prescribed medication. After that, most patients describe the lengthening phase as muscle tightness and aching rather than sharp pain. The daily 1 millimeter adjustment itself is not painful. The discomfort comes from soft tissue stretching to match the new bone length, and physical therapy is the main tool for managing it. Pain tolerance varies widely. For a fuller account of <a href="/limb-lengthening-pain-the-truth/">what recovery pain is actually like</a>, read our detailed guide.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"femur-tibia-or-combined"} -->
			<h2 class="wp-block-heading" id="femur-tibia-or-combined">Femur, Tibia, or Combined?</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Femur lengthening is the most common cosmetic procedure, with the most predictable results and lower complication rates than the tibia. Tibia lengthening is usually done as a combined surgery or as a second procedure, and carries a higher risk of ankle stiffness.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"internal-nail-vs-external-fixator"} -->
			<h2 class="wp-block-heading" id="internal-nail-vs-external-fixator">Internal Nail vs. External Fixator</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Modern cosmetic leg lengthening almost always uses an internal nail, the PRECICE Max or PRECICE 2 from NuVasive. The nail sits inside the bone with no pins through the skin, which lowers infection risk and lets patients wear normal clothing. External fixators, metal frames attached through the skin, are still used for certain complex cases and remain available on a case-by-case basis for patients who are not candidates for an internal nail.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"risks-of-leg-lengthening-surgery"} -->
			<h2 class="wp-block-heading" id="risks-of-leg-lengthening-surgery">Risks of Leg Lengthening Surgery</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Leg lengthening surgery carries real risks. Common, manageable ones include joint stiffness, muscle tightness during lengthening, and delayed bone healing. Less common but serious risks include nerve injury, deep infection, hardware failure, and nonunion, where the bone fails to harden. Serious complications are uncommon when an experienced surgeon performs the procedure and the patient follows the therapy and follow-up schedule. For the <a href="/limb-lengthening-what-you-gain-what-you-risk/">full risk breakdown</a> weighed against the benefits, read our dedicated guide. The most important risk-reduction step is choosing a surgeon with fellowship training in orthopedic trauma.</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"anchor":"what-to-ask-before-you-commit"} -->
			<h2 class="wp-block-heading" id="what-to-ask-before-you-commit">What to Ask Before You Commit</h2>
			<!-- /wp:heading -->

			<!-- wp:pll/faq -->
			<!-- wp:pll/faq-item {"question":"What is the surgeon's training in limb reconstruction?"} -->
			<!-- wp:paragraph -->
			<p>Fellowship training in orthopedic trauma or limb reconstruction is the relevant credential, not general board certification alone.</p>
			<!-- /wp:paragraph -->
			<!-- /wp:pll/faq-item -->

			<!-- wp:pll/faq-item {"question":"Does the surgeon personally perform the procedure?"} -->
			<!-- wp:paragraph -->
			<p>Ask directly.</p>
			<!-- /wp:paragraph -->
			<!-- /wp:pll/faq-item -->

			<!-- wp:pll/faq-item {"question":"Which nail is in the quoted price?"} -->
			<!-- wp:paragraph -->
			<p>PRECICE Max and PRECICE 2 differ in cost and performance. Know which you are being quoted.</p>
			<!-- /wp:paragraph -->
			<!-- /wp:pll/faq-item -->

			<!-- wp:pll/faq-item {"question":"What happens if a complication occurs?"} -->
			<!-- wp:paragraph -->
			<p>Can the practice manage it internally, and does the surgeon accept revision cases from other practices?</p>
			<!-- /wp:paragraph -->
			<!-- /wp:pll/faq-item -->

			<!-- wp:pll/faq-item {"question":"What does the quote include?"} -->
			<!-- wp:paragraph -->
			<p>Itemize surgeon fee, implant, anesthesia, facility, hospitalization, therapy, imaging, and nail removal.</p>
			<!-- /wp:paragraph -->
			<!-- /wp:pll/faq-item -->
			<!-- /wp:pll/faq -->

			<!-- wp:heading {"anchor":"leg-lengthening-in-southern-california"} -->
			<h2 class="wp-block-heading" id="leg-lengthening-in-southern-california">Leg Lengthening in Southern California</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph -->
			<p>Premier Limb Lengthening is in Upland, California, serving the Inland Empire, Los Angeles, Orange County, and Southern California, with a concierge program for out-of-state and international patients that coordinates flights, accommodations, physical therapy, and recovery. International patients receive the same support as domestic, and the practice provides medical appointment letters for visa applications. Virtual consultations are available worldwide as a first step. Every procedure is performed personally by <a href="/dr-basmajian/">Dr. Hrayr Basmajian</a>, a dual fellowship-trained orthopedic trauma surgeon trained at Sonoran Orthopedic Trauma Surgeons and Hannover Medical School under Prof. Christian Krettek. See transparent <a href="/limb-lengthening-pricing-options/">pricing for every procedure type</a>, or call <a href="tel:+19516205663">(951) 620-5663</a> to schedule a confidential consultation.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</article>
<!-- /wp:group -->
