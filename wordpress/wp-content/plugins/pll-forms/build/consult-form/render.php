<?php
/**
 * pll/consult-form front-end render — markup port of components/v2/ConsultForm.tsx.
 * The success panel is pre-rendered (hidden); view.js swaps states.
 *
 * @package pll-forms
 *
 * @var array $attributes Block attributes.
 */

$pll_phone      = '(909) 563-8653';
$pll_phone_href = 'tel:+19095638653';
if ( function_exists( 'pll_site_info' ) ) {
	$pll_info       = pll_site_info();
	$pll_phone      = $pll_info['phone'];
	$pll_phone_href = $pll_info['phone_href'];
}

$pll_endpoint   = esc_url( rest_url( 'pll/v1/consult' ) );
$pll_disclaimer = ! empty( $attributes['showEmergencyDisclaimer'] );
?>
<div class="pll-consult" data-endpoint="<?php echo $pll_endpoint; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above. ?>">
	<?php if ( $pll_disclaimer ) : ?>
	<p class="mb-4 text-[13px] leading-[1.55] text-warn font-medium"><?php esc_html_e( 'Do not use this form for medical emergencies. If you are experiencing a medical emergency, call 911 or go to the nearest emergency room.', 'pll-forms' ); ?></p>
	<?php endif; ?>

	<form class="pll-consult-form border border-ink bg-paper p-8 lg:p-10" aria-label="<?php esc_attr_e( 'Consultation request', 'pll-forms' ); ?>">
		<div class="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine mb-5 inline-flex items-center gap-2.5">
			<span class="inline-block w-[22px] h-px bg-spine" aria-hidden="true"></span>
			<?php esc_html_e( 'Consultation Request', 'pll-forms' ); ?>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
			<?php
			$pll_fields = array(
				array( 'first', __( 'First name', 'pll-forms' ), 'text', true ),
				array( 'last', __( 'Last name', 'pll-forms' ), 'text', true ),
				array( 'email', __( 'Email', 'pll-forms' ), 'email', true ),
				array( 'phone', __( 'Phone', 'pll-forms' ), 'tel', true ),
				array( 'city', __( 'City of residence', 'pll-forms' ), 'text', false ),
				array( 'age', __( 'Age', 'pll-forms' ), 'number', false ),
			);
			foreach ( $pll_fields as $pll_field ) :
				list( $pll_name, $pll_label, $pll_type, $pll_required ) = $pll_field;
				?>
			<div>
				<label for="<?php echo esc_attr( $pll_name ); ?>" class="block font-mono uppercase tracking-[0.18em] text-[11px] text-muted mb-2"><?php echo esc_html( $pll_label ); ?><?php echo $pll_required ? '<span aria-hidden="true" class="text-spine"> *</span>' : ''; ?></label>
				<input id="<?php echo esc_attr( $pll_name ); ?>" name="<?php echo esc_attr( $pll_name ); ?>" type="<?php echo esc_attr( $pll_type ); ?>" <?php echo $pll_required ? 'required' : ''; ?> class="w-full bg-paper-off border border-rule px-4 py-3 font-sans text-[14px] text-ink focus:outline-none focus:border-spine focus:ring-2 focus:ring-spine/20 transition-colors"/>
			</div>
			<?php endforeach; ?>
		</div>

		<div class="mt-6">
			<label for="message" class="block font-mono uppercase tracking-[0.18em] text-[11px] text-muted mb-2"><?php esc_html_e( 'How can we help?', 'pll-forms' ); ?></label>
			<textarea id="message" name="message" rows="5" required class="w-full bg-paper-off border border-rule px-4 py-3 font-sans text-[14px] text-ink leading-[1.55] focus:outline-none focus:border-spine focus:ring-2 focus:ring-spine/20 transition-colors" placeholder="<?php esc_attr_e( 'Tell us briefly about your goals, timeline, and any prior consultations.', 'pll-forms' ); ?>"></textarea>
		</div>

		<div class="mt-6 flex items-start gap-3">
			<input id="consent" name="consent" type="checkbox" required class="mt-1.5 w-4 h-4 accent-spine"/>
			<label for="consent" class="text-[13px] leading-[1.55] text-ink-soft"><?php esc_html_e( 'I consent to be contacted by Premier Limb Lengthening regarding my inquiry. My information is private and never sold.', 'pll-forms' ); ?></label>
		</div>

		<?php // Honeypot + signed time-trap (anti-spam; invisible to people). ?>
		<div class="hidden" aria-hidden="true">
			<label for="website"><?php esc_html_e( 'Website', 'pll-forms' ); ?></label>
			<input id="website" name="website" type="text" tabindex="-1" autocomplete="off"/>
		</div>
		<input type="hidden" name="rendered_at" value="<?php echo esc_attr( pll_forms_time_token() ); ?>"/>

		<p class="pll-consult-error mt-5 text-[13px] leading-[1.55] text-warn" hidden>
			<?php esc_html_e( 'Something went wrong sending your request. Please try again, or call', 'pll-forms' ); ?>
			<a href="<?php echo esc_url( $pll_phone_href ); ?>" class="underline"><?php echo esc_html( $pll_phone ); ?></a>.
		</p>

		<button type="submit" class="pll-consult-submit group mt-8 inline-flex items-center gap-3 px-6 py-3.5 bg-spine text-paper uppercase tracking-wide text-[12px] font-medium hover:bg-spine-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
			<span class="pll-consult-submit-label"><?php esc_html_e( 'Send Inquiry', 'pll-forms' ); ?></span>
			<span class="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
		</button>
	</form>

	<div class="pll-consult-success border border-ink bg-paper p-8 lg:p-10" hidden>
		<div class="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine mb-4 inline-flex items-center gap-2.5">
			<span class="inline-block w-[22px] h-px bg-spine" aria-hidden="true"></span>
			<?php esc_html_e( 'Request Received', 'pll-forms' ); ?>
		</div>
		<h2 class="font-serif font-normal text-[28px] lg:text-[34px] leading-[1.12] tracking-[-0.01em] text-ink mb-4 max-w-[20ch]"><?php esc_html_e( 'Thank you.', 'pll-forms' ); ?> <em class="italic text-spine"><?php esc_html_e( 'We’ll be in touch.', 'pll-forms' ); ?></em></h2>
		<p class="text-[15px] leading-[1.65] text-ink-soft max-w-[46ch]">
			<?php esc_html_e( 'Your request reached our team. We respond within one business day. For anything urgent, call', 'pll-forms' ); ?>
			<a href="<?php echo esc_url( $pll_phone_href ); ?>" class="text-spine border-b border-spine"><?php echo esc_html( $pll_phone ); ?></a>.
		</p>
	</div>
</div>
