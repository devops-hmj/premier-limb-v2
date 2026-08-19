<?php
/**
 * Render pll/faq-item front-end render.
 *
 * One accordion row from components/v2/FaqV2.tsx: numbered serif index
 * (CSS counter on .pll-faq-num), question, rotating +, and the animated
 * answer panel. The parent pll/faq block injects this item's index into
 * data-wp-context and opens the first item.
 *
 * The question is a real <h3> wrapping the toggle button, per the WAI-ARIA APG
 * accordion pattern (heading wraps button, button owns the expanded state).
 * Every pll/faq usage on the site sits under an H2 section title, so h3 is the
 * correct level everywhere and the document outline stays valid. The <h3> is a
 * bare wrapper: all type and grid styling stays on the button and its spans,
 * and .pll-faq .pll-faq-q (src/css/tailwind.css) resets the prose heading spec
 * that would otherwise leak in on the in-article PAA sections.
 *
 * @package pll-editorial
 *
 * @var array  $attributes Block attributes.
 * @var string $content    Inner blocks markup (the answer).
 */

$pll_question = $attributes['question'] ?? '';
?>
<div class="pll-faq-item border-b border-rule" data-wp-class--is-open="state.isOpen">
	<h3 class="pll-faq-q">
		<button
			type="button"
			aria-expanded="false"
			data-wp-bind--aria-expanded="state.isOpen"
			data-wp-on--click="actions.toggle"
			class="w-full text-left py-7 grid grid-cols-[44px_1fr_36px] sm:grid-cols-[60px_1fr_36px] items-baseline gap-4 sm:gap-6 cursor-pointer"
		>
			<span class="pll-faq-num font-serif italic text-spine text-[20px] sm:text-[24px] leading-none" aria-hidden="true"></span>
			<span class="font-serif font-medium text-[20px] sm:text-[24px] leading-[1.25] tracking-[-0.01em] text-ink"><?php echo wp_kses_post( $pll_question ); ?></span>
			<span class="pll-faq-plus justify-self-end font-serif italic text-spine text-[28px] sm:text-[30px] leading-none" aria-hidden="true">+</span>
		</button>
	</h3>
	<div class="pll-faq-panel">
		<div>
			<div class="pb-7 pl-[44px] sm:pl-[84px] pr-4 sm:pr-11 max-w-[72ch] text-[14.5px] leading-[1.7] text-ink-soft">
				<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- inner blocks markup. ?>
			</div>
		</div>
	</div>
</div>
