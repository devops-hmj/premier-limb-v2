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
