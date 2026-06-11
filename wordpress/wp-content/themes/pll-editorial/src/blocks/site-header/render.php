<?php
/**
 * pll/site-header front-end render.
 *
 * Port of components/v2/NavV2.tsx: fixed bar that fades in past 120px
 * (or immediately when forceVisible), desktop hover dropdown for
 * "Your Surgery", mobile hamburger sheet with inline submenu expansion,
 * Escape-to-close + scroll lock. Interactivity API store: view.js.
 *
 * @package pll-editorial
 *
 * @var array $attributes Block attributes.
 */

$pll_force = ! empty( $attributes['forceVisible'] );
$pll_info  = pll_site_info();
$pll_items = pll_nav_items();

$pll_context = array(
	'open'         => false,
	'scrolled'     => false,
	'forceVisible' => $pll_force,
);
?>
<div
	<?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-wp-interactive="pll/header"
	<?php echo wp_interactivity_data_wp_context( $pll_context ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-wp-init="callbacks.init"
	data-wp-on-window--scroll="callbacks.onScroll"
	data-wp-on-document--keydown="callbacks.onKeydown"
>
	<header
		class="pll-sticky-bar fixed inset-x-0 top-0 z-50 bg-paper-off/95 backdrop-blur border-b border-ink<?php echo $pll_force ? ' is-visible' : ''; ?>"
		data-wp-class--is-visible="state.isVisible"
	>
		<div class="mx-auto max-w-wrap px-6 lg:px-12 py-3 flex items-center justify-between gap-6">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( 'Premier Limb Lengthening, home', 'pll-editorial' ); ?>" class="flex items-center shrink-0">
				<?php echo pll_logo_img( 'light', 170 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</a>

			<nav class="hidden lg:flex items-center gap-7 text-[13.5px] text-ink font-medium" aria-label="<?php esc_attr_e( 'Primary', 'pll-editorial' ); ?>">
				<?php foreach ( $pll_items as $pll_item ) : ?>
					<?php if ( ! empty( $pll_item['submenu'] ) ) : ?>
						<div
							class="pll-subnav relative"
							data-wp-context='{"subOpen":false}'
							data-wp-on--mouseenter="actions.openSub"
							data-wp-on--mouseleave="actions.closeSub"
							data-wp-class--is-open="context.subOpen"
						>
							<a
								href="<?php echo esc_url( home_url( $pll_item['href'] ) ); ?>"
								class="inline-flex items-center gap-1.5 hover:text-spine transition-colors"
								aria-haspopup="true"
								data-wp-bind--aria-expanded="context.subOpen"
							>
								<?php echo esc_html( $pll_item['label'] ); ?>
								<span aria-hidden="true" class="pll-chevron font-serif italic text-[14px]">⌄</span>
							</a>
							<div class="pll-dropdown">
								<?php echo pll_nav_dropdown_panel(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</div>
						</div>
					<?php else : ?>
						<a href="<?php echo esc_url( home_url( $pll_item['href'] ) ); ?>" class="hover:text-spine transition-colors"><?php echo esc_html( $pll_item['label'] ); ?></a>
					<?php endif; ?>
				<?php endforeach; ?>
			</nav>

			<div class="hidden md:flex items-center gap-3">
				<a href="<?php echo esc_url( $pll_info['phone_href'] ); ?>" class="font-serif italic text-[16px] text-spine hover:text-spine-deep transition-colors"><?php echo esc_html( $pll_info['phone'] ); ?></a>
				<a href="<?php echo esc_url( home_url( '/consult/' ) ); ?>" class="inline-flex items-center gap-2.5 px-5 py-2.5 bg-spine text-paper font-medium uppercase tracking-wide text-[11.5px] hover:bg-spine-deep transition-colors">
					<?php esc_html_e( 'Schedule Consultation', 'pll-editorial' ); ?>
					<span class="font-serif italic text-[15px]" aria-hidden="true">→</span>
				</a>
			</div>

			<button
				type="button"
				class="md:hidden inline-flex items-center justify-center w-10 h-10 border border-ink"
				aria-controls="pll-mobile-menu"
				data-wp-on--click="actions.toggleMenu"
				data-wp-bind--aria-expanded="context.open"
				data-wp-bind--aria-label="state.menuLabel"
				data-wp-class--is-open="context.open"
			>
				<span aria-hidden="true" class="block w-5 h-px bg-ink relative">
					<span class="pll-burger-a absolute left-0 right-0 top-0 h-px bg-ink"></span>
					<span class="pll-burger-b absolute left-0 right-0 top-0 h-px bg-ink"></span>
				</span>
			</button>
		</div>
	</header>

	<div id="pll-mobile-menu" class="pll-mobile-sheet fixed inset-0 z-40 bg-paper-off md:hidden overflow-y-auto" data-wp-class--is-open="context.open">
		<div class="px-6 pt-20 pb-10 flex flex-col gap-2">
			<nav aria-label="<?php esc_attr_e( 'Primary mobile', 'pll-editorial' ); ?>" class="flex flex-col">
				<?php foreach ( $pll_items as $pll_item ) : ?>
					<?php if ( ! empty( $pll_item['submenu'] ) ) : ?>
						<div
							class="pll-mobile-group border-b border-rule"
							data-wp-context='{"expanded":false}'
							data-wp-class--is-expanded="context.expanded"
						>
							<button
								type="button"
								data-wp-on--click="actions.toggleMobileSub"
								data-wp-bind--aria-expanded="context.expanded"
								class="w-full text-left flex items-baseline justify-between gap-4 py-4 font-serif text-[28px] tracking-[-0.01em] text-ink"
							>
								<?php echo esc_html( $pll_item['label'] ); ?>
								<span aria-hidden="true" class="pll-plus font-serif italic text-[20px] text-spine">+</span>
							</button>
							<div class="pll-collapse">
								<div>
									<ul class="list-none pb-4 pl-4 border-l-2 border-spine">
										<?php foreach ( $pll_item['submenu'] as $pll_i => $pll_sub ) : ?>
											<li>
												<a href="<?php echo esc_url( home_url( $pll_sub['href'] ) ); ?>" class="flex items-baseline gap-3 py-2.5 font-serif text-[17px] leading-[1.3] tracking-[-0.005em] text-ink">
													<span class="font-mono uppercase tracking-[0.18em] text-[10px] text-muted shrink-0 w-6"><?php echo esc_html( str_pad( (string) ( $pll_i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
													<span><?php echo esc_html( $pll_sub['label'] ); ?></span>
												</a>
											</li>
										<?php endforeach; ?>
									</ul>
								</div>
							</div>
						</div>
					<?php else : ?>
						<a href="<?php echo esc_url( home_url( $pll_item['href'] ) ); ?>" class="font-serif text-[28px] py-4 border-b border-rule tracking-[-0.01em] text-ink"><?php echo esc_html( $pll_item['label'] ); ?></a>
					<?php endif; ?>
				<?php endforeach; ?>
			</nav>
			<div class="flex flex-col gap-3 pt-6">
				<a href="<?php echo esc_url( home_url( '/consult/' ) ); ?>" class="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-spine text-paper font-medium uppercase tracking-wide text-[11.5px]">
					<?php esc_html_e( 'Schedule Consultation', 'pll-editorial' ); ?> <span class="font-serif italic" aria-hidden="true">→</span>
				</a>
				<a href="<?php echo esc_url( $pll_info['phone_href'] ); ?>" class="inline-flex items-center justify-center gap-2.5 px-5 py-3 border border-spine text-spine font-medium uppercase tracking-wide text-[11.5px]">
					<?php
					/* translators: %s: phone number */
					echo esc_html( sprintf( __( 'Call %s', 'pll-editorial' ), $pll_info['phone'] ) );
					?>
				</a>
			</div>
		</div>
	</div>
</div>
