/**
 * pll/consult-form — client controller. Port of the React state machine in
 * ConsultForm.tsx: idle → submitting → success | error. Posts JSON to the
 * pll/v1/consult endpoint (data-endpoint on the wrapper).
 */
document.querySelectorAll('.pll-consult').forEach((root) => {
	const form = root.querySelector('.pll-consult-form');
	const success = root.querySelector('.pll-consult-success');
	const errorEl = root.querySelector('.pll-consult-error');
	const button = root.querySelector('.pll-consult-submit');
	const label = root.querySelector('.pll-consult-submit-label');
	if (!form || !button) return;

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		const fd = new FormData(form);
		const payload = {
			first_name: fd.get('first'),
			last_name: fd.get('last'),
			email: fd.get('email'),
			phone: fd.get('phone'),
			city: fd.get('city'),
			age: fd.get('age'),
			message: fd.get('message'),
			consent: fd.get('consent') === 'on',
			source: 'Website consultation form',
			website: fd.get('website'),
			rendered_at: fd.get('rendered_at'),
		};

		errorEl.hidden = true;
		button.disabled = true;
		label.textContent = 'Sending…';

		try {
			const res = await fetch(root.dataset.endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error('request failed');
			form.reset();

			// The lead is now captured in GHL. If a booking calendar is
			// configured, hand the visitor straight to it with their contact
			// details prefilled; otherwise show the inline confirmation.
			const calendar = root.dataset.calendar;
			if (calendar) {
				try {
					const url = new URL(calendar, window.location.origin);
					const prefill = {
						first_name: payload.first_name,
						last_name: payload.last_name,
						email: payload.email,
						phone: payload.phone,
					};
					for (const [key, value] of Object.entries(prefill)) {
						if (value) url.searchParams.set(key, value);
					}
					label.textContent = 'Opening scheduler…';
					window.location.assign(url.toString());
					return;
				} catch {
					// Malformed calendar URL: fall back to the inline panel.
				}
			}

			form.hidden = true;
			success.hidden = false;
		} catch {
			errorEl.hidden = false;
		} finally {
			button.disabled = false;
			label.textContent = 'Send Inquiry';
		}
	});
});
