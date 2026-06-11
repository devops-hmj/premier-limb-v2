<?php
/**
 * pll/faq-item front-end render.
 *
 * One accordion row from components/v2/FaqV2.tsx: numbered serif index
 * (CSS counter on .pll-faq-num), question, rotating +, and the animated
 * answer panel. The parent pll/faq block injects this item's index into
 * data-wp-context and opens the first item.
 *
 * @package pll-editorial
 *
 * @var array  $attributes Block attributes.
 * @var string $content    Inner blocks markup (the answer).
 */

$pll_question = $attributes['question'] ?? '';
?>
<div class="pll-faq-item border-b border-rule" data-wp-class--is-open="state.isOpen">
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
	<div class="pll-faq-panel">
		<div>
			<div class="pb-7 pl-[44px] sm:pl-[84px] pr-4 sm:pr-11 max-w-[72ch] text-[14.5px] leading-[1.7] text-ink-soft">
				<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- inner blocks markup. ?>
			</div>
		</div>
	</div>
</div>
